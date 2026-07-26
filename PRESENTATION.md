# 📊 Vyapar Mandap — Master PowerPoint Presentation Slide Deck

> **Downloadable PowerPoint File**: [Vyapar_Mandap_Presentation.pptx](file:///d:/projects/vyapar-mandap/Vyapar_Mandap_Presentation.pptx)

---

## Slide 1: Title Slide (Cover)
- **Title**: VYAPAR MANDAP (व्यापार मंडप)
- **Subtitle**: Event-Driven Multi-Agent AI SaaS Platform for Double-Entry Accounting & Indian Compliance
- **Footer**: Built with OpenAI Codex & Agentic Architecture • Light Grey & Trust Blue Palette
- **Links**: [GitHub Repository](https://github.com/Abhitech-st/Vyapar-Mandap.git)

---

## Slide 2: Executive Summary & The Core Problem
### 🚨 The Indian Financial Compliance Nightmare
- **100+ Hours Wasted**: Manual entry of PDF vendor bills, physical invoices, and scanned paper receipts.
- **GSTR-2B Mismatches**: Loss of Input Tax Credit (ITC) due to active supplier filing discrepancies.
- **Complex TDS Rules**: Manual tracking of Section 194C (1%/2%) & Section 194J (10%) statutory payment thresholds.
- **Naive AI Hallucinations**: Standard LLMs guess financial numbers and break strict accounting balance rules.

### 💡 The Vyapar Mandap Solution
- **Vision OCR Extraction**: Automated field parsing with confidence scoring (<0.85 flags review).
- **Deterministic Double-Entry**: Enforces mathematical balancing formula ($Debits = Credits$).
- **Human-in-the-Loop Safety**: 1-click human signoff required before immutable ledger commit.
- **Reliance & Trust UI**: Clean Slate & Royal Blue light mode interface designed for CAs and CFOs.

---

## Slide 3: System Architecture
- **Client Layer**: React 18 + Vite + Tailwind CSS (Light Grey & Trust Blue UI), Command Palette (`Cmd+K`), PDF Canvas Viewer.
- **FastAPI Core Engine**: Async Python 3.11+ server, WebSockets streaming (`/ws/ai/stream`), Pydantic v2 schemas.
- **Storage & Multi-Agent Pool**: PostgreSQL 16 (Relational Ledger), 10 Specialized AI Agents, Redis Vector Memory, S3 Storage.

---

## Slide 4: The 10 Deployed AI Agents Roster
1. **Supervisor Agent**: Orchestrates execution graph & human checkpoints.
2. **Invoice Agent**: Vision OCR field extraction & HSN classification.
3. **Ledger Agent**: Enforces immutable double-entry balance equality ($Dr. = Cr.$).
4. **GST Agent**: Validates GSTINs & GSTR-2B ITC eligibility.
5. **TDS Agent**: Section 194C/194J payment threshold calculator.
6. **Bank Rec Agent**: Fuzzy transaction string & amount similarity engine.
7. **Compliance Agent**: Statutory filing calendar & penalty risk auditor.
8. **Reporting Agent**: Synthesizes certified P&L and Balance Sheet.
9. **Notification Agent**: Real-time WebSocket alert event broadcaster.
10. **Analytics Agent**: Business Health Index (92/100) & cash runway estimator.

---

## Slide 5: Golden Path Workflow (Invoice to Immutable Ledger)
```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ 1. Ingestion    │ ───► │ 2. Vision OCR   │ ───► │ 3. Tax Audit    │ ───► │ 4. Human Signoff│ ───► │ 5. Immutable    │
│ Upload PDF Bill │      │ Invoice Agent   │      │ GST Agent 2B    │      │ CA 1-Click      │      │ Journal Commit  │
└─────────────────┘      └─────────────────┘      └─────────────────┘      └─────────────────┘      └─────────────────┘
```

---

## Slide 6: Indian Statutory Compliance Engine
- **Goods & Services Tax (GST)**:
  - 15-Character GSTIN syntax regex validation.
  - CGST + SGST (Intra-state) vs IGST (Inter-state) place of supply split.
  - GSTR-1 Outward Summary & GSTR-3B Return liability calculator.
  - GSTR-2B Input Tax Credit (ITC) eligibility & supplier filing auditor.
- **Tax Deducted at Source (TDS)**:
  - Section 194C (Contractors): 1% / 2% rate application.
  - Section 194J (Professional & Technical Fees): 10% rate application.
  - Cumulative Vendor Limit Monitor & Quarterly Challan Tracker.

---

## Slide 7: Financial Control & Certified Reporting
- **Dynamic Balance Sheet Verification**:
  - $Equality\ Check\ Formula:\ Total\ Assets\ (₹68.4L) = Total\ Liabilities\ (₹24.5L) + Total\ Equity\ (₹43.9L)$
  - Automatically verified on every ledger entry with green audit mark.
- **Executive Profit & Loss Statement**:
  - Revenue: ₹45,20,000 | Gross Profit: ₹27,00,000 | Net Income After Tax: ₹15,17,000.

---

## Slide 8: OpenAI Codex Integration & Custom Tools
- **`tools/codex_tools.py` SDK**: High-performance functions for searching, replacing text, inserting lines, and parsing file outlines.
- **`tools/cli.py` Wrapper**: CLI utilities for automated agent code editing (`python tools/cli.py find|replace|add-line|outline`).
- **100% Unit Test Coverage**: 6 passing unit tests in `test_codex_tools.py`.

---

## Slide 9: Product Roadmap
- **Phase 1: Hackathon MVP (Completed)**: 10 AI Agents, Double-Entry Engine, GST/TDS calculation, Light Grey & Trust Blue UX.
- **Phase 2: Post-Hackathon (Q3 2026)**: Direct GST Portal Sandbox APIs, Account Aggregator live bank feeds, Automated Inventory.
- **Phase 3: Enterprise Scale (Q4 2026)**: Custom ICAI LLM fine-tuning, CA Multi-Firm Client Portal.

---

## Slide 10: Conclusion & Demo Access
- **GitHub Repository**: [https://github.com/Abhitech-st/Vyapar-Mandap.git](https://github.com/Abhitech-st/Vyapar-Mandap.git)
- **Web UI**: `http://localhost:3000`
- **FastAPI API**: `http://127.0.0.1:8000`
