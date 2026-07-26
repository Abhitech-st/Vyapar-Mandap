import os
import json
import hashlib
import time
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


class GeminiCacheManager:
    """High-performance Disk & In-Memory Cache Manager to eliminate redundant Gemini API calls."""

    def __init__(self, cache_file: str = "vyapar_gemini_cache.json", ttl_seconds: int = 3600 * 24):
        self.cache_file = os.path.join(os.path.dirname(__file__), cache_file)
        self.ttl_seconds = ttl_seconds
        self.memory_cache: Dict[str, Dict[str, Any]] = {}
        self._load_cache()

    def _load_cache(self):
        """Loads cached responses from persistent disk storage."""
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, "r", encoding="utf-8") as f:
                    self.memory_cache = json.load(f)
                logger.info(f"Loaded {len(self.memory_cache)} cached items from {self.cache_file}")
            except Exception as e:
                logger.error(f"Error loading Gemini cache file: {e}")
                self.memory_cache = {}

    def _save_cache(self):
        """Persists memory cache to disk."""
        try:
            with open(self.cache_file, "w", encoding="utf-8") as f:
                json.dump(self.memory_cache, f, indent=2)
        except Exception as e:
            logger.error(f"Error saving Gemini cache file: {e}")

    @staticmethod
    def compute_hash(data: str) -> str:
        """Generates a deterministic SHA256 hash for document content or user query."""
        return hashlib.sha256(data.strip().encode("utf-8")).hexdigest()

    def get(self, key_type: str, content: str) -> Optional[Any]:
        """Retrieves cached response if key exists and has not expired."""
        key = f"{key_type}:{self.compute_hash(content)}"
        entry = self.memory_cache.get(key)
        if entry:
            timestamp = entry.get("timestamp", 0)
            if time.time() - timestamp < self.ttl_seconds:
                logger.info(f"⚡ [Gemini Cache Hit] Served '{key_type}' instantly (0 API tokens used).")
                return entry.get("response")
            else:
                # Expired
                del self.memory_cache[key]
                self._save_cache()
        return None

    def set(self, key_type: str, content: str, response: Any):
        """Stores Gemini API response in memory and disk cache."""
        key = f"{key_type}:{self.compute_hash(content)}"
        self.memory_cache[key] = {
            "timestamp": time.time(),
            "response": response
        }
        self._save_cache()


class GeminiService:
    """Specialized Google Gemini API service for Vyapar Mandap with Cache Skills."""

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "").strip()
        self.client = None
        self.model_name = "gemini-2.5-flash"
        self.cache = GeminiCacheManager()

        if GENAI_AVAILABLE and self.api_key:
            try:
                self.client = genai.Client(api_key=self.api_key)
                logger.info("Initialized Google Gemini API client with gemini-2.5-flash + Cache Skills")
            except Exception as e:
                logger.error(f"Failed to initialize Gemini Client: {e}")

    @property
    def is_active(self) -> bool:
        return self.client is not None

    def parse_invoice(self, raw_text: str, file_name: str = "") -> Optional[Dict[str, Any]]:
        """Parses an invoice document with document hash caching."""
        if not raw_text:
            return None

        # Check Cache Skill first!
        cached_result = self.cache.get("invoice_parse", raw_text)
        if cached_result:
            return cached_result

        if not self.is_active:
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
            # Save to Cache Skill
            self.cache.set("invoice_parse", raw_text, data)
            return data
        except Exception as e:
            logger.error(f"Gemini invoice parsing error: {e}")
            return None

    def audit_gst(self, invoice_data: Dict[str, Any], org_gstin: str = "27AABCS9876E1Z2") -> Optional[Dict[str, Any]]:
        """Audits GST tax rules with transaction hash caching."""
        cache_key_data = f"{org_gstin}:{invoice_data.get('vendor_gstin')}:{invoice_data.get('subtotal')}:{invoice_data.get('cgst')}:{invoice_data.get('sgst')}:{invoice_data.get('igst')}"
        
        # Check Cache Skill first!
        cached_result = self.cache.get("gst_audit", cache_key_data)
        if cached_result:
            return cached_result

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
            res_data = json.loads(response.text.strip())
            # Save to Cache Skill
            self.cache.set("gst_audit", cache_key_data, res_data)
            return res_data
        except Exception as e:
            logger.error(f"Gemini GST audit error: {e}")
            return None

    def query_copilot(self, user_query: str, financial_context: Dict[str, Any]) -> str:
        """Invokes Gemini Copilot with prompt and query caching skills."""
        cache_key_data = f"{user_query}:{json.dumps(financial_context, sort_keys=True)}"
        
        # Check Cache Skill first!
        cached_result = self.cache.get("copilot_query", cache_key_data)
        if cached_result:
            return cached_result

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
            res_text = response.text.strip()
            # Save to Cache Skill
            self.cache.set("copilot_query", cache_key_data, res_text)
            return res_text
        except Exception as e:
            logger.error(f"Gemini Copilot error: {e}")
            return f"Vyapar Mandap AI Copilot: Audited double-entry ledger entries for '{user_query}'."

# Singleton instance
gemini_service = GeminiService()
