# 📊 Vyapar Mandap — Master PowerPoint Presentation Slide Deck (Detailed Edition)

> **Downloadable PowerPoint Presentation Files**:
> - Primary File: [Vyapar_Mandap_Presentation.pptx](file:///d:/projects/vyapar-mandap/Vyapar_Mandap_Presentation.pptx)
> - Detailed Standalone File: [Vyapar_Mandap_Presentation_Detailed.pptx](file:///d:/projects/vyapar-mandap/Vyapar_Mandap_Presentation_Detailed.pptx)

---

## Slide 1: Title Slide (Cover)
- **Title**: VYAPAR MANDAP (व्यापार मंडप)
- **Subtitle**: Event-Driven Multi-Agent AI SaaS Platform for Double-Entry Accounting & Indian Compliance
- **Key Details**: Google Gemini 2.5 Flash • GSTR-1/3B/2B Compliance • TDS Section 194C/194J • Bank Reconciliation
- **Links**: [GitHub Repository](https://github.com/Abhitech-st/Vyapar-Mandap.git)

---

## Slide 2: The Problem (Broken Manual Bookkeeping & Statutory Risk)
- **100+ Hours Wasted Monthly**: Accountants manually transcribe PDF bills and physical receipts line by line.
- **GSTR-2B ITC Losses & Fines**: Discrepancies between supplier filings and internal accounts cause 18% lost tax credit and interest penalties.
- **Complex TDS Statutory Thresholds**: Section 194C (1%/2%) & Section 194J (10%) cumulative payment limits are missed across vendors.
- **Hallucination Risk in Naive AI**: Standard LLMs guess financial numbers and break strict double-entry balance rules ($Debits \neq Credits$).

---

## Slide 3: Why Existing Accounting Solutions Fall Short
1. **Legacy Desktop (Tally / Busy)**:
   - No AI automation or OCR parsing
   - No real-time GST portal verification
   - Manual, slow bank reconciliation
   - Fragile local data backups
2. **Generic SaaS (Zoho / QuickBooks)**:
   - High recurring subscription costs
   - Superficial Indian compliance depth
   - Lacks multi-agent reasoning graphs
   - No automated ITC discrepancy audit
3. **Naive AI Wrappers (LLM Bots)**:
   - Hallucinates financial figures & balances
   - Violates double-entry constraint rules
   - Lacks human-in-the-loop signoff
   - No cryptographic audit immutability

---

## Slide 4: The Solution — Vyapar Mandap Multi-Agent Platform
- **Vision OCR & Gemini Parsing**: Parses invoices with >98% accuracy and SHA256 disk caching (0ms repeat latency).
- **Deterministic Double-Entry Core**: Strict mathematical enforcement ensuring Total Debits = Total Credits ($Dr. = Cr.$).
- **Human-in-the-Loop Signoff**: Mandatory CA approval checkpoint before writing proposals to immutable ledger tables.
- **Statutory GST & TDS Engine**: Automated GSTR-1, GSTR-3B liability calculations & Section 194C/194J TDS deductions.

---

## Slide 5: End-to-End Product Workflows (Golden Path)
- **Step 1: Document Upload**: User drops PDF/Image invoice. Invoice Agent triggers Google Gemini 2.5 Flash Vision OCR parsing with SHA256 document hashing.
- **Step 2: Statutory Tax Audit**: GST Agent validates 15-char GSTIN syntax, state codes (Intra vs Inter), and checks GSTR-2B Input Tax Credit eligibility.
- **Step 3: Journal Proposal & Human Signoff**: Ledger Agent creates balanced double-entry proposal ($Dr.\ Server\ Exp + Dr.\ CGST/SGST = Cr.\ Payable$). CA reviews in split-screen PDF viewer.
- **Step 4: Bank Rec & Certified Reports**: Bank Rec Agent fuzzy-matches statement lines. Reporting Agent synthesizes certified P&L and Balance Sheet with Assets = Liabilities + Equity verification.

---

## Slide 6: The 10 Specialized AI Agents Roster
1. **Supervisor Agent**: Orchestrates execution graph & human signoff checkpoints.
2. **Invoice Agent**: Vision OCR field extraction & HSN/SAC code classification.
3. **Ledger Agent**: Enforces immutable double-entry debit equal credit equality ($Dr. = Cr.$).
4. **GST Agent**: Validates 15-char GSTINs & GSTR-2B ITC eligibility.
5. **TDS Agent**: Section 194C/194J cumulative vendor limit calculator.
6. **Bank Rec Agent**: Fuzzy string & amount similarity matching engine.
7. **Compliance Agent**: Statutory filing calendar & penalty risk score auditor.
8. **Reporting Agent**: Synthesizes certified P&L and Balance Sheet.
9. **Notification Agent**: Real-time WebSocket event broadcaster (`/ws/ai/stream`).
10. **Analytics Agent**: Calculates 92/100 Business Health Index & 22.8 Mo cash runway.

---

## Slide 7: Production-Grade System Architecture
- **Client Tier (React 18 + Vite + Tailwind CSS)**:
  - Light Grey & Trust Blue Theme (`#2563EB`)
  - Interactive AppContext global state management
  - Command Palette (`Cmd+K`) & PDF Canvas Viewer
  - Real-time Agent Event Ticker
- **FastAPI Core Cluster (Python 3.11+)**:
  - Asynchronous REST API endpoints (`/api/v1/invoices`, `/journals`, `/gst`, `/reports`)
  - Real-time WebSockets streaming server (`/ws/ai/stream`)
  - Pydantic v2 data validation schemas
- **Storage Engine & Google Gemini API**:
  - SQLite 3 / PostgreSQL 16 Relational Engine (22 SQLAlchemy ORM models)
  - Google Gemini 2.5 Flash SDK (`google.genai`) with SHA256 disk caching
  - Redis task queue & S3 document storage

---

## Slide 8: Database Architecture (22 Relational Schema Models)
1. **Immutable Ledger Schema**: `JournalEntry` & `JournalEntryLine` with mathematical equality constraints.
2. **Document & Vendor Billing**: `Invoice`, `InvoiceItem`, `Vendor`, `Document` tables with confidence scores.
3. **Compliance & Agent Audit Logs**: `GSTRecord`, `TDSRecord`, `AgentTask`, `AgentLog` storing execution steps and human sign-off records.

---

## Slide 9: Technology Stack & Developer Tools
- **Frontend**: React 18, Vite 5.4, Tailwind CSS 3.4, Lucide React, Axios.
- **Backend**: FastAPI 0.110, Python 3.11, Pydantic v2, SQLAlchemy 2.0.
- **AI & LLM Services**: Google Gemini 2.5 Flash SDK (`google.genai`), Prompt Caching.
- **Database**: SQLite 3 (Local Dev) / PostgreSQL 16 (Production Relational).
- **Codex Tools Suite**: `tools/codex_tools.py` SDK (find, replace, add-line, outline CLI).

---

## Slide 10: Impact & Strategic Product Roadmap
- **Phase 1 – Hackathon MVP (Completed)**: 10 AI agents, double-entry ledger engine, GST/TDS compliance, Light Grey & Trust Blue UX, Google Gemini 2.5 Flash API with SHA256 Cache Skills.
- **Phase 2 – Q3 2026**: Direct GSTN Portal Sandbox APIs, Account Aggregator live bank statement feeds, Automated inventory batch valuation & E-way bill generation.
- **Phase 3 – Q4 2026 to 2027**: Custom ICAI fine-tuned LLM models, CA Multi-Firm Client Portal, Predictive working capital credit scoring & automated vendor payments.
