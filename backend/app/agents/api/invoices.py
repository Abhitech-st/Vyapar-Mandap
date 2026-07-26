from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Invoice, Vendor, InvoiceItem, GSTRecord, JournalEntry, Organization
from app.agents.invoice_agent import InvoiceAgent
from app.agents.ledger_agent import LedgerAgent

router = APIRouter(prefix="/invoices", tags=["Invoices"])

@router.get("")
def list_invoices(db: Session = Depends(get_db)):
    org = db.query(Organization).first()
    org_id = org.id if org else ""
    invoices = db.query(Invoice).filter(Invoice.organization_id == org_id).order_by(Invoice.created_at.desc()).all()
    
    result = []
    for inv in invoices:
        vendor = db.query(Vendor).filter(Vendor.id == inv.vendor_id).first()
        result.append({
            "id": inv.id,
            "invoice_number": inv.invoice_number,
            "vendor_name": vendor.name if vendor else "Vendor",
            "invoice_date": inv.invoice_date,
            "due_date": inv.due_date,
            "subtotal": inv.subtotal,
            "tax_total": inv.tax_total,
            "grand_total": inv.grand_total,
            "status": inv.status,
            "ai_confidence": inv.ai_confidence
        })
    return result

@router.get("/{invoice_id}")
def get_invoice_detail(invoice_id: str, db: Session = Depends(get_db)):
    inv = db.query(Invoice).filter(Invoice.id == invoice_id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
        
    vendor = db.query(Vendor).filter(Vendor.id == inv.vendor_id).first()
    items = db.query(InvoiceItem).filter(InvoiceItem.invoice_id == inv.id).all()
    gst = db.query(GSTRecord).filter(GSTRecord.invoice_id == inv.id).first()
    je = db.query(JournalEntry).filter(JournalEntry.invoice_id == inv.id).first()

    return {
        "invoice": {
            "id": inv.id,
            "invoice_number": inv.invoice_number,
            "invoice_date": inv.invoice_date,
            "due_date": inv.due_date,
            "subtotal": inv.subtotal,
            "tax_total": inv.tax_total,
            "grand_total": inv.grand_total,
            "status": inv.status,
            "ai_confidence": inv.ai_confidence
        },
        "vendor": {
            "id": vendor.id if vendor else "",
            "name": vendor.name if vendor else "",
            "gstin": vendor.gstin if vendor else "",
            "pan": vendor.pan if vendor else ""
        } if vendor else None,
        "items": [
            {
                "description": item.description,
                "hsn_sac_code": item.hsn_sac_code,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
                "tax_rate": item.tax_rate,
                "tax_amount": item.tax_amount,
                "total_amount": item.total_amount
            } for item in items
        ],
        "gst_record": {
            "gstin": gst.gstin,
            "taxable_value": gst.taxable_value,
            "cgst": gst.cgst,
            "sgst": gst.sgst,
            "igst": gst.igst,
            "itc_status": gst.itc_status
        } if gst else None,
        "proposed_journal": {
            "entry_number": je.entry_number if je else "JE-DRAFT-PROPOSAL",
            "narration": je.narration if je else f"Purchase bill from {vendor.name if vendor else 'Vendor'}"
        }
    }

@router.post("/upload")
def upload_invoice(file: UploadFile = File(...), db: Session = Depends(get_db)):
    org = db.query(Organization).first()
    org_id = org.id if org else ""
    agent = InvoiceAgent(db, org_id)
    result = agent.process_document(file.filename)
    return result

@router.post("/{invoice_id}/approve")
def approve_invoice(invoice_id: str, db: Session = Depends(get_db)):
    org = db.query(Organization).first()
    org_id = org.id if org else ""
    agent = LedgerAgent(db, org_id)
    journal = agent.create_journal_from_invoice(invoice_id)
    return {"message": "Invoice approved & journal committed immutably.", "journal_id": journal.id if journal else ""}
