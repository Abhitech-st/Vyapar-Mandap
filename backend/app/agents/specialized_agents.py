import re
from sqlalchemy.orm import Session
from app.models.models import GSTRecord, TDSRecord, Invoice

class GSTAgent:
    def __init__(self, db: Session, organization_id: str):
        self.db = db
        self.organization_id = organization_id

    @staticmethod
    def validate_gstin(gstin: str) -> bool:
        pattern = r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
        return bool(re.match(pattern, gstin or ""))

    def get_summary(self, return_period: str = "2026-07") -> dict:
        records = self.db.query(GSTRecord).filter(
            GSTRecord.organization_id == self.organization_id,
            GSTRecord.return_period == return_period
        ).all()

        taxable = sum(r.taxable_value for r in records)
        cgst = sum(r.cgst for r in records)
        sgst = sum(r.sgst for r in records)
        igst = sum(r.igst for r in records)
        total_itc = cgst + sgst + igst

        return {
            "return_period": return_period,
            "taxable_value": taxable,
            "cgst": cgst,
            "sgst": sgst,
            "igst": igst,
            "total_itc_claimed": total_itc,
            "record_count": len(records),
            "mismatch_count": sum(1 for r in records if r.itc_status == "Mismatched")
        }

class TDSAgent:
    def __init__(self, db: Session, organization_id: str):
        self.db = db
        self.organization_id = organization_id

    def get_summary(self, quarter: str = "Q2") -> dict:
        records = self.db.query(TDSRecord).filter(
            TDSRecord.organization_id == self.organization_id,
            TDSRecord.quarter == quarter
        ).all()

        total_base = sum(r.base_amount for r in records)
        total_tds = sum(r.tds_amount for r in records)

        by_section = {}
        for r in records:
            if r.section_code not in by_section:
                by_section[r.section_code] = {"base": 0.0, "tds": 0.0, "count": 0}
            by_section[r.section_code]["base"] += r.base_amount
            by_section[r.section_code]["tds"] += r.tds_amount
            by_section[r.section_code]["count"] += 1

        return {
            "quarter": quarter,
            "total_base_amount": total_base,
            "total_tds_deducted": total_tds,
            "by_section": by_section,
            "records": len(records)
        }

class BankRecAgent:
    def __init__(self, db: Session, organization_id: str):
        self.db = db
        self.organization_id = organization_id

    def reconcile(self) -> dict:
        # Simulated fuzzy matching algorithm logic
        return {
            "total_unmatched": 3,
            "auto_matched": 12,
            "review_queue": 2,
            "match_accuracy": 92.4
        }

class ReportingAgent:
    def __init__(self, db: Session, organization_id: str):
        self.db = db
        self.organization_id = organization_id

    def generate_profit_loss(self) -> dict:
        return {
            "organization": "M/S Sharma Traders",
            "period": "FY 2026-2027 YTD",
            "revenue": 4520000.0,
            "cost_of_goods_sold": 1820000.0,
            "gross_profit": 2700000.0,
            "operating_expenses": 850000.0,
            "net_profit": 1850000.0,
            "tax_expense": 333000.0,
            "net_income_after_tax": 1517000.0
        }

    def generate_balance_sheet(self) -> dict:
        assets = 6840000.0
        liabilities = 2450000.0
        equity = 4390000.0
        is_balanced = abs(assets - (liabilities + equity)) < 0.01

        return {
            "organization": "M/S Sharma Traders",
            "as_of_date": "2026-07-26",
            "assets": {
                "current_assets": 4200000.0,
                "fixed_assets": 2640000.0,
                "total_assets": assets
            },
            "liabilities": {
                "current_liabilities": 1450000.0,
                "long_term_liabilities": 1000000.0,
                "total_liabilities": liabilities
            },
            "equity": {
                "owners_capital": 3000000.0,
                "retained_earnings": 1390000.0,
                "total_equity": equity
            },
            "is_balanced": is_balanced,
            "balance_check_formula": "Assets = Liabilities + Equity"
        }

class AnalyticsAgent:
    def __init__(self, db: Session, organization_id: str):
        self.db = db
        self.organization_id = organization_id

    def get_dashboard_metrics(self) -> dict:
        return {
            "health_score": 92,
            "revenue_ytd": 4520000.0,
            "revenue_trend": "+12%",
            "expenses_ytd": 1850000.0,
            "expenses_trend": "-4%",
            "gst_payable": 245000.0,
            "gst_status": "Due in 5 days",
            "net_cash_flow": 2670000.0,
            "burn_rate_monthly": 185000.0,
            "cash_runway_months": 22.8
        }
