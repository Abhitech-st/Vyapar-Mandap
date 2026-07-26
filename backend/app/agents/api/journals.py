from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import JournalEntry, JournalEntryLine, LedgerAccount, Organization

router = APIRouter(prefix="/journals", tags=["Journals"])

@router.get("")
def list_journals(db: Session = Depends(get_db)):
    org = db.query(Organization).first()
    org_id = org.id if org else ""
    entries = db.query(JournalEntry).filter(JournalEntry.organization_id == org_id).order_by(JournalEntry.created_at.desc()).all()
    
    res = []
    for entry in entries:
        lines = db.query(JournalEntryLine).filter(JournalEntryLine.journal_entry_id == entry.id).all()
        line_details = []
        for line in lines:
            acc = db.query(LedgerAccount).filter(LedgerAccount.id == line.ledger_account_id).first()
            line_details.append({
                "account_name": acc.name if acc else "Account",
                "account_code": acc.code if acc else "",
                "debit": line.debit,
                "credit": line.credit,
                "narration": line.narration
            })
            
        res.append({
            "id": entry.id,
            "entry_number": entry.entry_number,
            "entry_date": entry.entry_date,
            "narration": entry.narration,
            "status": entry.status,
            "is_immutable": entry.is_immutable,
            "total_debit": sum(l.debit for l in lines),
            "total_credit": sum(l.credit for l in lines),
            "lines": line_details
        })
    return res

@router.get("/accounts")
def list_ledger_accounts(db: Session = Depends(get_db)):
    org = db.query(Organization).first()
    org_id = org.id if org else ""
    accounts = db.query(LedgerAccount).filter(LedgerAccount.organization_id == org_id).order_by(LedgerAccount.code.asc()).all()
    return [
        {
            "id": acc.id,
            "code": acc.code,
            "name": acc.name,
            "account_type": acc.account_type,
            "sub_type": acc.sub_type,
            "balance": acc.balance
        } for acc in accounts
    ]
