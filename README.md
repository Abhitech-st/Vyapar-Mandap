# 🏛️ Vyapar Mandap (व्यापार मंडप)
> **AI-Powered SaaS Platform for Double-Entry Accounting & Statutory GST/TDS Compliance**

Built using **OpenAI Codex AI Architecture**, **Vyapar Mandap** bridges unstructured financial inputs (PDF invoices, scanned receipts, bank CSV statements, natural language queries) with a deterministic mathematical double-entry accounting core ($Total\ Debits = Total\ Credits$).

---

## 🎯 Table of Contents
- [⚠️ The Current Problem](#%EF%B8%8F-the-current-problem)
- [💡 Our Solution & Four Integrity Pillars](#-our-solution--four-integrity-pillars)
- [🔄 The Golden Path Workflow](#-the-golden-path-workflow)
- [🤖 AI Integration & Codex Task Engine](#-ai-integration--codex-task-engine)
- [🏗️ Hybrid Storage & Deployment Architecture](#%EF%B8%8F-hybrid-storage--deployment-architecture)
- [📊 Presentation & Documentation Links](#-presentation--documentation-links)
- [🚀 Quickstart Guide](#-quickstart-guide)

---

## ⚠️ The Current Problem

India's 63+ Million MSMEs and Chartered Accountancies face critical operational bottlenecks:

1. **100+ Hours Wasted Monthly on Manual Data Entry**: Accountants manually transcribe PDF bills, paper receipts, and vouchers line-by-line across disconnected spreadsheets, leading to high human error rates.
2. **18% GSTR-2B Input Tax Credit (ITC) Loss**: Discrepancies between supplier portal filings and internal ledger accounts cause lost Input Tax Credit (ITC) and statutory interest penalties.
3. **Complex Section 194C / 194J TDS Thresholds**: Cumulative vendor payment limits (Section 194C 1%/2% & Section 194J 10%) are missed across vendors.
4. **LLM Financial Hallucination Risk**: Standard LLMs guess financial numbers and break debit=credit mathematical equality.

---

## 💡 Our Solution & Four Integrity Pillars

Vyapar Mandap solves these challenges through **Four Pillars of Accounting Integrity**:

1. **Vision OCR & Codex AI Engine**: 98%+ accurate invoice field extraction with SHA256 document hashing (0ms repeat latency) and automated low-confidence (<85%) field flags.
2. **Double-Entry Core Engine**: Strict mathematical balance verification guaranteeing zero balance violation ($Total\ Debits = Total\ Credits$).
3. **Human-in-the-Loop Signoff**: Mandatory Chartered Accountant (CA) approval checkpoint featuring a split-screen PDF viewer + proposed journal entry.
4. **Statutory GST & TDS Engine**: Real-time 15-character GSTIN syntax validation, GSTR-1/3B filing calculations, GSTR-2B ITC matching, and Section 194C/194J TDS trackers.

---

## 🔄 The Golden Path Workflow

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ 1. UPLOAD PDF   │ ────► │ 2. AI PARSE     │ ────► │ 3. HUMAN REVIEW │ ────► │ 4. IMMUTABLE    │
│ Ingest Document │       │ Vision OCR &    │       │ Split-Screen    │       │ LEDGER COMMIT   │
│ SHA256 Hash     │       │ Rule Checks     │       │ CA Signoff      │       │ Debits = Credits│
└─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

1. **Step 1: Upload**: Ingest PDF/Image invoice or receipt, generate SHA256 hash to prevent duplicate ingestion.
2. **Step 2: AI Parse**: Codex AI engine extracts fields; GST engine validates 15-char GSTIN syntax & GSTR-2B ITC status.
3. **Step 3: Human Review**: CA reviews proposed entry ($Dr.\ Exp + Dr.\ Tax = Cr.\ AP$) in split viewer with 1-click approve or reject.
4. **Step 4: Commit**: Double-entry journal posted imutably to database; P&L and Balance Sheet update live.

---

## 🤖 AI Integration & Codex Task Engine

### 1-Tap Pre-Coded AI Financial Tasks
- **📊 Audit GSTR-2B Input Tax Credit**: Verifies 100% of claimed ITC (₹7.20L) against portal supplier filings.
- **⚖️ Check Trial Balance Equality**: Verifies mathematical balance ($Total\ Debits = Total\ Credits$).
- **📋 Section 194C/194J TDS Audit**: Calculates cumulative vendor payouts against 1% / 10% TDS limits.
- **🏦 Reconcile HDFC Bank Feed Queue**: Fuzzy string matches statement lines with payment vouchers.
- **📈 Generate Profit & Loss Highlights**: Synthesizes YTD Revenue (₹45.2L) and net operating margin.
- **💰 Analyze Cash Runway & Health Score**: Calculates monthly net burn rate, 22.8-month runway, and 92/100 business health score.

---

## 🏗️ Hybrid Storage & Deployment Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT DEVICE (BROWSER)                         │
│  Local Storage (Session, Draft Invoices, Workspace Cache, UI State)    │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ SYNC ON SIGN-UP / SAVE
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      SUPABASE CENTRAL DATABASE                         │
│  PostgreSQL Tables: `profiles` (User Credentials) & `organizations`    │
└────────────────────────────────────────────────────────────────────────┘
```

- **Frontend**: React 18 + Vite + Tailwind CSS hosted on **Vercel CDN**.
- **Backend API**: Python 3.11 FastAPI hosted on **Render** / **Railway**.
- **Central Database**: **Supabase Cloud PostgreSQL** (`profiles` & `organizations`).
- **Client Storage**: **Client Device Local Storage** (`localStorage`) for instant 0ms loads and offline resilience.

---

## 📊 Presentation & Documentation Links

- 📄 **Master Presentation Specification**: [PRESENTATION.md](PRESENTATION.md)
- ⚙️ **Production Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- 📊 **PowerPoint Presentation Deck (.pptx)**: [Vyapar_Mandap_Presentation.pptx](Vyapar_Mandap_Presentation.pptx)

---

## 🚀 Quickstart Guide

### 1. Backend Setup (FastAPI & Python 3.11)
```bash
cd backend
python -m venv venv

# On Windows:
.\venv\Scripts\activate
# On Unix/Mac:
source venv/bin/activate

pip install -r requirements.txt
python run.py
```
- **API Base**: `http://127.0.0.1:8000`
- **Swagger Documentation**: `http://127.0.0.1:8000/docs`

### 2. Frontend Setup (React 18 + Vite)
```bash
cd frontend
npm install
npm run dev
```
- **Live Local App**: `http://localhost:3000`
