import uuid
import datetime
from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey, Text, Integer, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    legal_name = Column(String(255), nullable=False)
    trade_name = Column(String(255), nullable=True)
    gstin = Column(String(15), nullable=True, index=True)
    pan = Column(String(10), nullable=True, index=True)
    address = Column(Text, nullable=True)
    state_code = Column(String(10), nullable=True)
    financial_year_start = Column(String(10), default="2026-04-01")
    currency = Column(String(10), default="INR")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    users = relationship("User", back_populates="organization")
    clients = relationship("Client", back_populates="organization")
    vendors = relationship("Vendor", back_populates="organization")
    ledger_accounts = relationship("LedgerAccount", back_populates="organization")
    invoices = relationship("Invoice", back_populates="organization")

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=True)
    role = Column(String(50), default="Accountant") # Owner, CA, Accountant, Staff
    is_active = Column(Boolean, default=True)
    last_login_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    organization = relationship("Organization", back_populates="users")

class Role(Base):
    __tablename__ = "roles"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(String(255), nullable=True)
    permissions_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Client(Base):
    __tablename__ = "clients"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    gstin = Column(String(15), nullable=True, index=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    billing_address = Column(Text, nullable=True)
    shipping_address = Column(Text, nullable=True)
    credit_limit = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    organization = relationship("Organization", back_populates="clients")

class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    gstin = Column(String(15), nullable=True, index=True)
    pan = Column(String(10), nullable=True, index=True)
    tds_section = Column(String(20), nullable=True, default="194C") # e.g. 194C, 194J
    tds_rate = Column(Float, default=1.0) # percentage e.g. 1.0 or 10.0
    email = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    address = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    organization = relationship("Organization", back_populates="vendors")

class LedgerAccount(Base):
    __tablename__ = "ledger_accounts"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    parent_id = Column(String(36), ForeignKey("ledger_accounts.id"), nullable=True)
    code = Column(String(50), nullable=False) # e.g., 1000, 2000, 4000
    name = Column(String(255), nullable=False)
    account_type = Column(String(50), nullable=False) # Asset, Liability, Equity, Revenue, Expense
    sub_type = Column(String(100), nullable=True) # Current Asset, Fixed Asset, Direct Expense, Indirect Expense
    is_active = Column(Boolean, default=True)
    balance = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    organization = relationship("Organization", back_populates="ledger_accounts")
    lines = relationship("JournalEntryLine", back_populates="ledger_account")

class Document(Base):
    __tablename__ = "documents"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    uploaded_by = Column(String(36), ForeignKey("users.id"), nullable=True)
    file_name = Column(String(255), nullable=False)
    file_size = Column(Integer, default=0)
    mime_type = Column(String(100), default="application/pdf")
    s3_key = Column(String(255), nullable=True)
    document_type = Column(String(50), default="Invoice") # Invoice, BankStatement, Receipt
    status = Column(String(50), default="Uploaded") # Uploaded, Processed, Error
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    vendor_id = Column(String(36), ForeignKey("vendors.id"), nullable=True)
    client_id = Column(String(36), ForeignKey("clients.id"), nullable=True)
    document_id = Column(String(36), ForeignKey("documents.id"), nullable=True)
    invoice_number = Column(String(100), nullable=False)
    invoice_type = Column(String(50), default="Purchase") # Purchase, Sales
    invoice_date = Column(String(20), nullable=False)
    due_date = Column(String(20), nullable=True)
    subtotal = Column(Float, default=0.0)
    tax_total = Column(Float, default=0.0)
    grand_total = Column(Float, default=0.0)
    status = Column(String(50), default="Pending_Approval") # Draft, Pending_Approval, Approved, Rejected, Posted
    ai_confidence = Column(Float, default=0.95)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    organization = relationship("Organization", back_populates="invoices")
    items = relationship("InvoiceItem", back_populates="invoice", cascade="all, delete-orphan")
    gst_record = relationship("GSTRecord", back_populates="invoice", uselist=False)
    tds_record = relationship("TDSRecord", back_populates="invoice", uselist=False)
    journal_entries = relationship("JournalEntry", back_populates="invoice")

class InvoiceItem(Base):
    __tablename__ = "invoice_items"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    invoice_id = Column(String(36), ForeignKey("invoices.id"), nullable=False)
    description = Column(String(255), nullable=False)
    hsn_sac_code = Column(String(20), nullable=True)
    quantity = Column(Float, default=1.0)
    unit_price = Column(Float, default=0.0)
    discount = Column(Float, default=0.0)
    tax_rate = Column(Float, default=18.0) # Percentage e.g. 18%
    tax_amount = Column(Float, default=0.0)
    total_amount = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    invoice = relationship("Invoice", back_populates="items")

class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    invoice_id = Column(String(36), ForeignKey("invoices.id"), nullable=True)
    created_by = Column(String(36), ForeignKey("users.id"), nullable=True)
    entry_number = Column(String(50), nullable=False) # e.g. JE-2026-001
    entry_date = Column(String(20), nullable=False)
    narration = Column(Text, nullable=True)
    status = Column(String(50), default="Draft") # Draft, Posted, Reversed
    is_immutable = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    invoice = relationship("Invoice", back_populates="journal_entries")
    lines = relationship("JournalEntryLine", back_populates="journal_entry", cascade="all, delete-orphan")

class JournalEntryLine(Base):
    __tablename__ = "journal_entry_lines"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    journal_entry_id = Column(String(36), ForeignKey("journal_entries.id"), nullable=False)
    ledger_account_id = Column(String(36), ForeignKey("ledger_accounts.id"), nullable=False)
    debit = Column(Float, default=0.0)
    credit = Column(Float, default=0.0)
    narration = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    journal_entry = relationship("JournalEntry", back_populates="lines")
    ledger_account = relationship("LedgerAccount", back_populates="lines")

class GSTRecord(Base):
    __tablename__ = "gst_records"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    invoice_id = Column(String(36), ForeignKey("invoices.id"), nullable=True)
    gstin = Column(String(15), nullable=True)
    return_period = Column(String(10), nullable=False) # e.g. "2026-07"
    taxable_value = Column(Float, default=0.0)
    cgst = Column(Float, default=0.0)
    sgst = Column(Float, default=0.0)
    igst = Column(Float, default=0.0)
    cess = Column(Float, default=0.0)
    itc_status = Column(String(50), default="Eligible") # Eligible, Ineligible, Mismatched
    filing_status = Column(String(50), default="Unfiled") # Unfiled, Filed, Pending
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    invoice = relationship("Invoice", back_populates="gst_record")

class TDSRecord(Base):
    __tablename__ = "tds_records"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    vendor_id = Column(String(36), ForeignKey("vendors.id"), nullable=True)
    invoice_id = Column(String(36), ForeignKey("invoices.id"), nullable=True)
    section_code = Column(String(20), nullable=False) # 194C, 194J, 194I
    base_amount = Column(Float, default=0.0)
    tds_rate = Column(Float, default=1.0)
    tds_amount = Column(Float, default=0.0)
    deposit_status = Column(String(50), default="Pending") # Pending, Deposited
    quarter = Column(String(10), default="Q2")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    invoice = relationship("Invoice", back_populates="tds_record")

class BankStatement(Base):
    __tablename__ = "bank_statements"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    document_id = Column(String(36), ForeignKey("documents.id"), nullable=True)
    bank_name = Column(String(100), default="HDFC Bank")
    account_number = Column(String(50), default="XXXXXXXX4092")
    statement_from = Column(String(20), nullable=False)
    statement_to = Column(String(20), nullable=False)
    opening_balance = Column(Float, default=0.0)
    closing_balance = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    transactions = relationship("BankTransaction", back_populates="bank_statement")

class BankTransaction(Base):
    __tablename__ = "bank_transactions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    bank_statement_id = Column(String(36), ForeignKey("bank_statements.id"), nullable=False)
    transaction_date = Column(String(20), nullable=False)
    value_date = Column(String(20), nullable=True)
    description = Column(Text, nullable=False)
    reference_number = Column(String(100), nullable=True)
    amount = Column(Float, default=0.0)
    transaction_type = Column(String(10), default="CR") # CR or DR
    matched_status = Column(String(50), default="Unmatched") # Unmatched, Auto_Matched, Manually_Matched, Review_Required
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    bank_statement = relationship("BankStatement", back_populates="transactions")
    payment = relationship("Payment", back_populates="bank_transaction", uselist=False)

class Payment(Base):
    __tablename__ = "payments"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    invoice_id = Column(String(36), ForeignKey("invoices.id"), nullable=True)
    bank_transaction_id = Column(String(36), ForeignKey("bank_transactions.id"), nullable=True)
    amount = Column(Float, default=0.0)
    payment_date = Column(String(20), nullable=False)
    payment_mode = Column(String(50), default="NEFT/RTGS")
    reference = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    bank_transaction = relationship("BankTransaction", back_populates="payment")

class Report(Base):
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    report_type = Column(String(50), nullable=False) # Profit_Loss, Balance_Sheet, Trial_Balance
    period_start = Column(String(20), nullable=False)
    period_end = Column(String(20), nullable=False)
    payload_json = Column(JSON, nullable=True)
    status = Column(String(50), default="Generated")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(50), default="Info") # Warning, Alert, Info, Success
    is_read = Column(Boolean, default=False)
    action_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AgentTask(Base):
    __tablename__ = "agent_tasks"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    agent_name = Column(String(100), nullable=False) # Supervisor, InvoiceAgent, etc.
    task_type = Column(String(100), nullable=False)
    status = Column(String(50), default="Running") # Running, Completed, Pending_Approval, Failed
    input_payload = Column(JSON, nullable=True)
    output_payload = Column(JSON, nullable=True)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    logs = relationship("AgentLog", back_populates="agent_task", cascade="all, delete-orphan")

class AgentLog(Base):
    __tablename__ = "agent_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    agent_task_id = Column(String(36), ForeignKey("agent_tasks.id"), nullable=False)
    step_name = Column(String(100), nullable=False)
    log_level = Column(String(20), default="INFO") # INFO, WARN, ERROR, SUCCESS
    message = Column(Text, nullable=False)
    metadata_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    agent_task = relationship("AgentTask", back_populates="logs")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    action = Column(String(100), nullable=False)
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(String(36), nullable=False)
    old_values_json = Column(JSON, nullable=True)
    new_values_json = Column(JSON, nullable=True)
    ip_address = Column(String(50), default="127.0.0.1")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AIConversation(Base):
    __tablename__ = "ai_conversations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    title = Column(String(255), default="Copilot Chat")
    messages_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
