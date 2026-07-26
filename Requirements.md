# Requirements Specification - Vyapar Mandap

## 1. Functional Requirements

### FR-1: Invoice OCR & Extraction
- Support PDF, PNG, JPG invoice file ingestion.
- Extract Vendor Name, GSTIN, Invoice Number, Date, Subtotal, Tax Amounts (CGST, SGST, IGST), and Line Items with HSN/SAC codes.
- Calculate AI Confidence Score. Flag scores $<0.85$ for manual review.

### FR-2: Immutable Double-Entry Ledger
- Enforce strict mathematical balancing rule: $\sum \text{Debits} = \sum \text{Credits}$.
- Prevent direct editing or deletion of posted entries; enforce reversal vouchers for corrections.
- Maintain full audit trail (`audit_logs`) recording IP address, timestamp, old values, and new values.

### FR-3: Indian Tax Compliance (GST & TDS)
- Validate 15-character GSTIN format against official syntax regex.
- Determine Place of Supply to split taxes into intra-state (CGST + SGST) or inter-state (IGST).
- Map invoices to GSTR-1 (Outward) and GSTR-3B (Summary) return formats.
- Calculate TDS deductions based on Section 194C (1%/2%) and Section 194J (10%) when cumulative payments cross statutory limits.

### FR-4: Bank Reconciliation
- Parse bank statement files (CSV, MT940).
- Run fuzzy matching algorithm on dates, amounts, and transaction strings against payment vouchers.
- Group matches into Auto-Matched ($>0.90$), Review Queue ($0.70-0.89$), and Unmatched ($<0.70$).

### FR-5: Human-in-the-Loop Signoff
- Present proposed journal entries in a split-screen review modal before ledger commit.
- Allow 1-click "Approve & Post" or manual field overrides.

### FR-6: AI Natural Language Copilot & Agent Monitor
- Natural language query endpoint (`/api/v1/ai/chat`) answering ledger questions.
- Real-time agent event stream broadcasted over WebSocket (`/ws/ai/stream`).

---

## 2. Non-Functional Requirements

- **Performance**: Invoice OCR parsing under 2.5 seconds; API response time under 150ms.
- **Reliability**: Zero variance in debit/credit balancing.
- **Security**: JWT authentication, role-based access control (RBAC), multi-tenant isolation by `organization_id`.
- **Aesthetics**: Slate dark mode theme (`slate-950`), JetBrains Mono monospace fonts for monetary figures.
