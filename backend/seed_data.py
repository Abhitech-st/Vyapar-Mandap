import sys
import os
import uuid
import datetime

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine, Base
from app.models.models import (
    Organization, User, Vendor, Client, LedgerAccount, Document, Invoice, InvoiceItem,
    JournalEntry, JournalEntryLine, GSTRecord, TDSRecord, BankStatement, BankTransaction,
    Payment, AgentTask, AgentLog, Notification, AuditLog
)

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if already seeded
    if db.query(Organization).first():
        print("Database already seeded!")
        db.close()
        return

    print("Seeding Vyapar Mandap database with realistic Indian financial data...")

    # 1. Organization
    org = Organization(
        id=str(uuid.uuid4()),
        legal_name="M/S Sharma Traders",
        trade_name="Sharma Enterprises & Co.",
        gstin="27AABCS9876E1Z2",
        pan="AABCS9876E",
        address="Suite 402, Trade Tower, Bandra West, Mumbai, Maharashtra 400050",
        state_code="27",
        financial_year_start="2026-04-01",
        currency="INR"
    )
    db.add(org)
    db.commit()

    # 2. Users
    u1 = User(
        id=str(uuid.uuid4()),
        organization_id=org.id,
        email="ca.sharma@vyapar.in",
        password_hash="pbkdf2:sha256:demo_password_hash",
        full_name="John Sharma (CA)",
        phone="+91 98200 12345",
        role="CA"
    )
    u2 = User(
        id=str(uuid.uuid4()),
        organization_id=org.id,
        email="rahul.accountant@vyapar.in",
        password_hash="pbkdf2:sha256:demo_password_hash",
        full_name="Rahul Verma",
        phone="+91 98199 87654",
        role="Accountant"
    )
    db.add_all([u1, u2])
    db.commit()

    # 3. Chart of Accounts (COA)
    coa_data = [
        ("1000", "Cash in Hand", "Asset", "Current Asset"),
        ("1010", "HDFC Bank - Current A/c 4092", "Asset", "Current Asset"),
        ("1310", "Input CGST Asset", "Asset", "Tax Credit"),
        ("1320", "Input SGST Asset", "Asset", "Tax Credit"),
        ("1330", "Input IGST Asset", "Asset", "Tax Credit"),
        ("2100", "Accounts Payable (Vendors)", "Liability", "Current Liability"),
        ("2210", "Output CGST Payable", "Liability", "Tax Liability"),
        ("2220", "Output SGST Payable", "Liability", "Tax Liability"),
        ("2300", "TDS Payable (Section 194C/194J)", "Liability", "Tax Liability"),
        ("3000", "Owners Capital", "Equity", "Equity"),
        ("4000", "Sales & Services Revenue", "Revenue", "Direct Income"),
        ("5100", "Computer & Server Expenses", "Expense", "Indirect Expense"),
        ("5200", "Office Rent & Facilities", "Expense", "Indirect Expense"),
        ("5300", "Professional & Legal Fees", "Expense", "Indirect Expense")
    ]
    accounts_dict = {}
    for code, name, acc_type, sub_type in coa_data:
        acc = LedgerAccount(
            id=str(uuid.uuid4()),
            organization_id=org.id,
            code=code,
            name=name,
            account_type=acc_type,
            sub_type=sub_type,
            balance=100000.0 if "Asset" in acc_type else 0.0
        )
        db.add(acc)
        accounts_dict[code] = acc
    db.commit()

    # 4. Vendors
    v1 = Vendor(
        id=str(uuid.uuid4()),
        organization_id=org.id,
        name="Apex Technologies Pvt Ltd",
        gstin="27AABCA1234F1Z5",
        pan="AABCA1234F",
        tds_section="194J",
        tds_rate=10.0,
        email="billing@apextech.com",
        address="Electronic City, Bengaluru, Karnataka"
    )
    v2 = Vendor(
        id=str(uuid.uuid4()),
        organization_id=org.id,
        name="Tata Consultancy Services",
        gstin="27AAACT2727Q1ZW",
        pan="AAACT2727Q",
        tds_section="194C",
        tds_rate=1.0,
        email="enterprise@tcs.com",
        address="TCS House, Fort, Mumbai, Maharashtra"
    )
    db.add_all([v1, v2])
    db.commit()

    # 5. Invoices & Double-Entry Journal
    inv1 = Invoice(
        id=str(uuid.uuid4()),
        organization_id=org.id,
        vendor_id=v1.id,
        invoice_number="INV-2026-089",
        invoice_type="Purchase",
        invoice_date="2026-07-24",
        due_date="2026-08-24",
        subtotal=40000.0,
        tax_total=7200.0,
        grand_total=47200.0,
        status="Pending_Approval",
        ai_confidence=0.985
    )
    db.add(inv1)
    db.commit()

    inv_item1 = InvoiceItem(
        id=str(uuid.uuid4()),
        invoice_id=inv1.id,
        description="Cloud Server Hosting & Maintenance",
        hsn_sac_code="998315",
        quantity=1,
        unit_price=40000.0,
        tax_rate=18.0,
        tax_amount=7200.0,
        total_amount=47200.0
    )
    db.add(inv_item1)

    gst_rec1 = GSTRecord(
        id=str(uuid.uuid4()),
        organization_id=org.id,
        invoice_id=inv1.id,
        gstin=v1.gstin,
        return_period="2026-07",
        taxable_value=40000.0,
        cgst=3600.0,
        sgst=3600.0,
        igst=0.0,
        itc_status="Eligible",
        filing_status="Unfiled"
    )
    db.add(gst_rec1)

    tds_rec1 = TDSRecord(
        id=str(uuid.uuid4()),
        organization_id=org.id,
        vendor_id=v1.id,
        invoice_id=inv1.id,
        section_code="194J",
        base_amount=40000.0,
        tds_rate=10.0,
        tds_amount=4000.0,
        deposit_status="Pending",
        quarter="Q2"
    )
    db.add(tds_rec1)
    db.commit()

    # Draft Journal Entry for inv1
    je1 = JournalEntry(
        id=str(uuid.uuid4()),
        organization_id=org.id,
        invoice_id=inv1.id,
        entry_number="JE-2026-402",
        entry_date="2026-07-24",
        narration="Bill #INV-2026-089 from Apex Technologies Pvt Ltd - Cloud Hosting",
        status="Draft",
        is_immutable=False
    )
    db.add(je1)
    db.commit()

    jel1 = JournalEntryLine(id=str(uuid.uuid4()), journal_entry_id=je1.id, ledger_account_id=accounts_dict["5100"].id, debit=40000.0, credit=0.0, narration="Computer & Server Exp")
    jel2 = JournalEntryLine(id=str(uuid.uuid4()), journal_entry_id=je1.id, ledger_account_id=accounts_dict["1310"].id, debit=3600.0, credit=0.0, narration="Input CGST 9%")
    jel3 = JournalEntryLine(id=str(uuid.uuid4()), journal_entry_id=je1.id, ledger_account_id=accounts_dict["1320"].id, debit=3600.0, credit=0.0, narration="Input SGST 9%")
    jel4 = JournalEntryLine(id=str(uuid.uuid4()), journal_entry_id=je1.id, ledger_account_id=accounts_dict["2100"].id, debit=0.0, credit=47200.0, narration="Cr Apex Technologies")
    db.add_all([jel1, jel2, jel3, jel4])
    db.commit()

    # 6. Agent Tasks & Logs
    task1 = AgentTask(
        id=str(uuid.uuid4()),
        organization_id=org.id,
        agent_name="Invoice Agent",
        task_type="OCR & Field Extraction",
        status="Pending_Approval",
        input_payload={"file_name": "INV-2026-089.pdf"},
        output_payload={"vendor": "Apex Technologies", "confidence": 0.985, "grand_total": 47200.0}
    )
    db.add(task1)
    db.commit()

    l1 = AgentLog(id=str(uuid.uuid4()), agent_task_id=task1.id, step_name="OCR Processing", log_level="INFO", message="Vision LLM scanned PDF with 98.5% confidence")
    l2 = AgentLog(id=str(uuid.uuid4()), agent_task_id=task1.id, step_name="GST Validation", log_level="SUCCESS", message="GSTIN 27AABCA1234F1Z5 verified active on GSTN Portal")
    l3 = AgentLog(id=str(uuid.uuid4()), agent_task_id=task1.id, step_name="Human Approval", log_level="WARN", message="Journal proposal JE-2026-402 awaiting CA signoff")
    db.add_all([l1, l2, l3])
    db.commit()

    print("Successfully seeded Vyapar Mandap database!")
    db.close()

if __name__ == "__main__":
    seed_database()
