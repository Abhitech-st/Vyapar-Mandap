from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import User, Organization

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login(payload: dict, db: Session = Depends(get_db)):
    email = payload.get("email", "ca.sharma@vyapar.in")
    user = db.query(User).filter(User.email == email).first()
    if not user:
        # Default fallback for demo login
        user = db.query(User).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    org = db.query(Organization).filter(Organization.id == user.organization_id).first()
    return {
        "access_token": "demo-jwt-token-vyapar-2026",
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role,
            "organization_id": user.organization_id,
            "organization_name": org.legal_name if org else "Vyapar Mandap Entity"
        }
    }
