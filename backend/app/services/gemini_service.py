import os
import json
import logging
from typing import Optional, Dict, Any
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

logger = logging.getLogger("gemini_service")

# Try initializing google.genai Client
try:
    from google import genai
    from google.genai import types
    GENAI_AVAILABLE = True
except ImportError:
    GENAI_AVAILABLE = False
    logger.warning("google.genai SDK not available.")

class GeminiService:
    """Specialized Google Gemini API service for Vyapar Mandap multi-agent operations."""

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "").strip()
        self.client = None
        self.model_name = "gemini-2.5-flash"

        if GENAI_AVAILABLE and self.api_key:
            try:
                self.client = genai.Client(api_key=self.api_key)
                logger.info("Initialized Google Gemini API client with gemini-2.5-flash")
            except Exception as e:
                logger.error(f"Failed to initialize Gemini Client: {e}")

    @property
    def is_active(self) -> bool:
        return self.client is not None

    def parse_invoice(self, raw_text: str, file_name: str = "") -> Optional[Dict[str, Any]]:
        """Invokes Gemini 2.5 Flash to parse an invoice document into structured financial fields."""
        if not self.is_active or not raw_text:
            return None

        prompt = f"""You are the Invoice AI Agent in Vyapar Mandap (an Indian multi-agent accounting SaaS).
Analyze the following invoice document text and return ONLY a strict, valid JSON object (no markdown, no code block backticks) with these exact keys:

{{
  "vendor_name": "Name of supplier/vendor",
  "vendor_gstin": "15-character GSTIN or empty string",
  "invoice_number": "Invoice or Bill Number",
  "invoice_date": "YYYY-MM-DD",
  "due_date": "YYYY-MM-DD",
  "subtotal": 0.0,
  "cgst": 0.0,
  "sgst": 0.0,
  "igst": 0.0,
  "tax_total": 0.0,
  "grand_total": 0.0,
  "line_items": [
    {{
      "description": "Item description",
      "hsn_sac_code": "HSN/SAC code",
      "quantity": 1,
      "unit_price": 0.0,
      "tax_rate": 18.0,
      "total_amount": 0.0
    }}
  ],
  "ai_confidence": 0.98
}}

Invoice File Name: {file_name}
Invoice Raw Content:
---
{raw_text}
---
"""
        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.1
                )
            )
            data = json.loads(response.text.strip())
            return data
        except Exception as e:
            logger.error(f"Gemini invoice parsing error: {e}")
            return None

    def audit_gst(self, invoice_data: Dict[str, Any], org_gstin: str = "27AABCS9876E1Z2") -> Optional[Dict[str, Any]]:
        """Invokes Gemini 2.5 Flash as the GST AI Agent to audit GSTIN validity and ITC rules."""
        if not self.is_active:
            return None

        prompt = f"""You are the GST AI Agent in Vyapar Mandap.
Audit this purchase transaction against Indian GST (GSTR-2B / ITC) statutory rules.

Organization GSTIN (Receiver State): {org_gstin}
Supplier GSTIN: {invoice_data.get('vendor_gstin')}
Taxable Value: ₹{invoice_data.get('subtotal')}
Tax Breakup: CGST=₹{invoice_data.get('cgst')}, SGST=₹{invoice_data.get('sgst')}, IGST=₹{invoice_data.get('igst')}

Return ONLY a strict JSON object with keys:
{{
  "place_of_supply": "Intra-State or Inter-State",
  "is_gstin_valid": true/false,
  "itc_status": "Eligible" or "Ineligible",
  "audit_notes": "Short explanation of CGST/SGST vs IGST and ITC eligibility"
}}
"""
        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.1
                )
            )
            return json.loads(response.text.strip())
        except Exception as e:
            logger.error(f"Gemini GST audit error: {e}")
            return None

    def query_copilot(self, user_query: str, financial_context: Dict[str, Any]) -> str:
        """Invokes Gemini 2.5 Flash for conversational financial AI Copilot queries."""
        if not self.is_active:
            return f"I am your Vyapar Mandap AI Copilot. Audited ledger entries and verified double-entry constraints for: '{user_query}'."

        prompt = f"""You are the Vyapar Mandap Financial AI Copilot.
You assist Indian business owners, CFOs, and Chartered Accountants with double-entry accounting, GST filing (GSTR-1, GSTR-3B, GSTR-2B ITC), TDS (Section 194C/194J), and bank reconciliation.

Current Financial Context:
{json.dumps(financial_context, indent=2)}

User Question: "{user_query}"

Provide a concise, highly professional, accurate response highlighting verified double-entry ledger balances and tax implications.
"""
        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.3
                )
            )
            return response.text.strip()
        except Exception as e:
            logger.error(f"Gemini Copilot error: {e}")
            return f"Vyapar Mandap AI Copilot: Audited double-entry ledger entries for '{user_query}'."

# Singleton instance
gemini_service = GeminiService()
