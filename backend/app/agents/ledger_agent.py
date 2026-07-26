import uuid
import datetime
from sqlalchemy.orm import Session
from app.agents.supervisor import SupervisorAgent
from app.models.models import Invoice, JournalEntry, JournalEntryLine, LedgerAccount, Vendor

class LedgerAgent:
    def __init__(self, db: Session, organization_id: str):
        self.db = db
        self.organization_id = organization_id
        self.supervisor = SupervisorAgent(db, organization_id)

    def create_journal_from_invoice(self, invoice_id: str, user_id: str = None) -> JournalEntry:
        task = self.supervisor.create_task("Ledger Agent", "Double-Entry Posting", {"invoice_id": invoice_id})
        
        invoice = self.db.query(Invoice).filter(Invoice.id == invoice_id).first()
        if not invoice:
            self.supervisor.log_step(task.id, "Error", "ERROR", f"Invoice {invoice_id} not found.")
            return None

        vendor = self.db.query(Vendor).filter(Vendor.id == invoice.vendor_id).first()
        vendor_name = vendor.name if vendor else "Vendor Payable"

        # Find or create accounts
        exp_account = self.db.query(LedgerAccount).filter(LedgerAccount.organization_id == self.organization_id, LedgerAccount.code == "5100").first()
        cgst_account = self.db.query(LedgerAccount).filter(LedgerAccount.organization_id == self.organization_id, LedgerAccount.code == "1310").first()
        sgst_account = self.db.query(LedgerAccount).filter(LedgerAccount.organization_id == self.organization_id, LedgerAccount.code == "1320").first()
        ap_account = self.db.query(LedgerAccount).filter(LedgerAccount.organization_id == self.organization_id, LedgerAccount.code == "2100").first()

        subtotal = invoice.subtotal
        cgst = invoice.tax_total / 2.0
        sgst = invoice.tax_total / 2.0
        grand_total = invoice.grand_total

        # Create Journal Entry
        entry_number = f"JE-2026-{datetime.datetime.now().strftime('%M%S')}"
        je = JournalEntry(
            id=str(uuid.uuid4()),
            organization_id=self.organization_id,
            invoice_id=invoice.id,
            created_by=user_id,
            entry_number=entry_number,
            entry_date=invoice.invoice_date,
            narration=f"Purchase bill #{invoice.invoice_number} from {vendor_name}",
            status="Posted",
            is_immutable=True
        )
        self.db.add(je)
        self.db.commit()
        self.db.refresh(je)

        # Debit Lines
        lines = []
        if exp_account:
            l1 = JournalEntryLine(id=str(uuid.uuid4()), journal_entry_id=je.id, ledger_account_id=exp_account.id, debit=subtotal, credit=0.0, narration="Computer & Server Expenses")
            self.db.add(l1)
            exp_account.balance += subtotal
            lines.append(l1)

        if cgst_account and cgst > 0:
            l2 = JournalEntryLine(id=str(uuid.uuid4()), journal_entry_id=je.id, ledger_account_id=cgst_account.id, debit=cgst, credit=0.0, narration="Input CGST 9%")
            self.db.add(l2)
            cgst_account.balance += cgst
            lines.append(l2)

        if sgst_account and sgst > 0:
            l3 = JournalEntryLine(id=str(uuid.uuid4()), journal_entry_id=je.id, ledger_account_id=sgst_account.id, debit=sgst, credit=0.0, narration="Input SGST 9%")
            self.db.add(l3)
            sgst_account.balance += sgst
            lines.append(l3)

        # Credit Line
        if ap_account:
            l4 = JournalEntryLine(id=str(uuid.uuid4()), journal_entry_id=je.id, ledger_account_id=ap_account.id, debit=0.0, credit=grand_total, narration=f"Accounts Payable - {vendor_name}")
            self.db.add(l4)
            ap_account.balance += grand_total
            lines.append(l4)

        # Verify Double-Entry Balancing
        total_debit = sum(l.debit for l in lines)
        total_credit = sum(l.credit for l in lines)

        if abs(total_debit - total_credit) > 0.01:
            self.supervisor.log_step(task.id, "Balancing Check Failed", "ERROR", f"Total Debit (₹{total_debit}) != Total Credit (₹{total_credit})")
            je.status = "Draft"
            self.db.commit()
            return je

        invoice.status = "Approved"
        self.db.commit()

        self.supervisor.log_step(task.id, "Double-Entry Balance Verified", "SUCCESS", f"Posted Entry #{entry_number}: Dr. ₹{total_debit:,.2f} = Cr. ₹{total_credit:,.2f} [IMMUTABLE]")
        self.supervisor.complete_task(task.id, {"entry_number": entry_number, "status": "Posted"})
        return je
