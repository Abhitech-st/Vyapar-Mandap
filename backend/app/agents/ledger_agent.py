import datetime
import uuid

from sqlalchemy.orm import Session

from app.agents.supervisor import SupervisorAgent
from app.models.models import GSTRecord, Invoice, JournalEntry, JournalEntryLine, LedgerAccount, Vendor


class LedgerAgent:
    """Builds and posts deterministic purchase journals for approved invoices."""

    def __init__(self, db: Session, organization_id: str):
        self.db = db
        self.organization_id = organization_id
        self.supervisor = SupervisorAgent(db, organization_id)

    def build_proposal(self, invoice: Invoice) -> list[dict]:
        gst = self.db.query(GSTRecord).filter(GSTRecord.invoice_id == invoice.id).first()
        tax_lines = []
        if gst:
            tax_lines = [("1310", "Input CGST", gst.cgst), ("1320", "Input SGST", gst.sgst), ("1330", "Input IGST", gst.igst)]
        elif invoice.tax_total:
            tax_lines = [("1310", "Input CGST", invoice.tax_total / 2), ("1320", "Input SGST", invoice.tax_total / 2)]

        account_codes = ["5100", "2100", *[code for code, _, amount in tax_lines if amount > 0]]
        accounts = {
            account.code: account
            for account in self.db.query(LedgerAccount)
            .filter(LedgerAccount.organization_id == self.organization_id, LedgerAccount.code.in_(account_codes))
            .all()
        }
        default_accounts = {
            "5100": ("Computer & Server Expenses", "Expense", "Indirect Expense"),
            "2100": ("Accounts Payable (Vendors)", "Liability", "Current Liability"),
            "1310": ("Input CGST Asset", "Asset", "Tax Credit"),
            "1320": ("Input SGST Asset", "Asset", "Tax Credit"),
            "1330": ("Input IGST Asset", "Asset", "Tax Credit"),
        }
        missing = [code for code in account_codes if code not in accounts]
        for code in missing:
            name, acc_type, sub_type = default_accounts.get(code, (f"Account {code}", "Expense", "Indirect Expense"))
            new_acc = LedgerAccount(
                id=str(uuid.uuid4()),
                organization_id=self.organization_id,
                code=code,
                name=name,
                account_type=acc_type,
                sub_type=sub_type,
                balance=0.0
            )
            self.db.add(new_acc)
            self.db.commit()
            self.db.refresh(new_acc)
            accounts[code] = new_acc

        vendor = self.db.query(Vendor).filter(Vendor.id == invoice.vendor_id).first()
        vendor_name = vendor.name if vendor else "Vendor Payable"
        proposal = [
            {
                "ledger_account_id": accounts["5100"].id,
                "account_code": "5100",
                "account_name": accounts["5100"].name,
                "debit": round(invoice.subtotal, 2),
                "credit": 0.0,
                "narration": "Purchase expense",
            }
        ]
        for code, label, amount in tax_lines:
            if amount > 0:
                proposal.append(
                    {
                        "ledger_account_id": accounts[code].id,
                        "account_code": code,
                        "account_name": accounts[code].name,
                        "debit": round(amount, 2),
                        "credit": 0.0,
                        "narration": f"{label} credit",
                    }
                )
        proposal.append(
            {
                "ledger_account_id": accounts["2100"].id,
                "account_code": "2100",
                "account_name": accounts["2100"].name,
                "debit": 0.0,
                "credit": round(invoice.grand_total, 2),
                "narration": f"Accounts payable - {vendor_name}",
            }
        )
        return proposal

    def create_journal_from_invoice(self, invoice_id: str, user_id: str | None = None) -> JournalEntry:
        task = self.supervisor.create_task("Ledger Agent", "Double-Entry Posting", {"invoice_id": invoice_id})
        invoice = self.db.query(Invoice).filter(Invoice.id == invoice_id).first()
        if not invoice:
            self.supervisor.log_step(task.id, "Invoice lookup", "ERROR", f"Invoice {invoice_id} not found.")
            raise ValueError("Invoice not found")

        existing = self.db.query(JournalEntry).filter(JournalEntry.invoice_id == invoice.id).order_by(JournalEntry.created_at.desc()).first()
        if existing and existing.status == "Posted":
            self.supervisor.complete_task(task.id, {"entry_number": existing.entry_number, "status": "Already posted"})
            return existing

        proposal = self.build_proposal(invoice)
        total_debit = round(sum(line["debit"] for line in proposal), 2)
        total_credit = round(sum(line["credit"] for line in proposal), 2)
        if total_debit != total_credit:
            self.supervisor.log_step(task.id, "Balancing check", "ERROR", f"Debit {total_debit} does not equal credit {total_credit}.")
            raise ValueError("Journal proposal is not balanced")

        vendor = self.db.query(Vendor).filter(Vendor.id == invoice.vendor_id).first()
        vendor_name = vendor.name if vendor else "Vendor"
        journal = existing or JournalEntry(
            id=str(uuid.uuid4()),
            organization_id=self.organization_id,
            invoice_id=invoice.id,
            created_by=user_id,
            entry_number=f"JE-{datetime.datetime.now():%Y%m%d}-{uuid.uuid4().hex[:6].upper()}",
            entry_date=invoice.invoice_date,
            narration=f"Purchase bill #{invoice.invoice_number} from {vendor_name}",
        )
        if not existing:
            self.db.add(journal)
        else:
            self.db.query(JournalEntryLine).filter(JournalEntryLine.journal_entry_id == journal.id).delete()

        journal.status = "Posted"
        journal.is_immutable = True
        for line in proposal:
            self.db.add(
                JournalEntryLine(
                    id=str(uuid.uuid4()),
                    journal_entry_id=journal.id,
                    ledger_account_id=line["ledger_account_id"],
                    debit=line["debit"],
                    credit=line["credit"],
                    narration=line["narration"],
                )
            )
            account = self.db.query(LedgerAccount).filter(LedgerAccount.id == line["ledger_account_id"]).first()
            account.balance += line["debit"] - line["credit"]

        invoice.status = "Posted"
        try:
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise

        self.db.refresh(journal)
        self.supervisor.log_step(task.id, "Double-entry balance verified", "SUCCESS", f"Posted {journal.entry_number}: Dr. {total_debit:,.2f} = Cr. {total_credit:,.2f} [IMMUTABLE]")
        self.supervisor.complete_task(task.id, {"entry_number": journal.entry_number, "status": "Posted"})
        return journal
