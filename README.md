# Vyapar Mandap (vyapar-mandap)
> **Decoupled, Asynchronous, Multi-Agent AI SaaS Platform for Double-Entry Accounting & Indian Compliance**

Built with **OpenAI Codex** & advanced agentic workflows, **Vyapar Mandap** bridges unstructured financial inputs (PDF invoices, scanned receipts, bank CSV statements, natural language queries) with deterministic double-entry accounting cores.

---

## 🕸️ Obsidian Knowledge Vault Interconnected Graph
Explore the interactive Obsidian knowledge graph connecting all platform specifications:

- 🎯 **Vision & Requirements**: [[Product Vision]] | [[Requirements]] | [[Roadmap]] | [[Meeting Notes]]
- ⚙️ **Architecture & Data**: [[Database Schema]] | [[API Contracts]] | [[CODEX_ARCHITECTURE]]
- 🤖 **AI Multi-Agent Engine**: [[AI Agents]] | [[Prompts]] | [[User Flows]]
- 💻 **User Interface & UX**: [[UI Components]] | [[Pages]]
- 🛠️ **Infrastructure & Code**: [[Tech Stack]] | [[Folder Structure]] | [[Deployment]]

---

## 🌟 System Architecture Highlights

- **Decoupled Architecture**: FastAPI async Python backend paired with a modern React + Vite + Tailwind CSS (Slate dark mode) SPA frontend ([[Tech Stack]]).
- **10 Specialized AI Agents** ([[AI Agents]]):
  1. **Supervisor Agent**: Orchestrates task graph pipelines and manages circular fallbacks.
  2. **Invoice Agent**: Vision OCR field extraction (GSTIN, HSN codes, line items) with duplicate hash detection and confidence scoring.
  3. **Ledger Agent**: Enforces double-entry balancing ($Total Debits = Total Credits$) before committing entries to immutable tables.
  4. **GST Agent**: Validates GSTIN syntax, state code matrices, CGST/SGST/IGST tax splits, and GSTR-2B Input Tax Credit (ITC) eligibility.
  5. **TDS Agent**: Calculates TDS under Sections 194C / 194J based on cumulative vendor thresholds.
  6. **Bank Reconciliation Agent**: Fuzzy string and sliding date window transaction matcher ($0.70 - 0.89$ confidence review queue).
  7. **Compliance Agent**: Monitors statutory deadlines, statutory penalty risks, and audit trails.
  8. **Reporting Agent**: Synthesizes certified Profit & Loss, Balance Sheet, and Trial Balance.
  9. **Notification Agent**: Real-time event broadcasting via WebSocket endpoints.
  10. **Analytics Agent**: Computes Business Health Scores (0-100), monthly burn rates, and cash runways.

---

## 🚀 Quickstart Guide

### 1. Backend Setup (FastAPI & SQLite/PostgreSQL)
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Unix:
source venv/bin/activate

pip install -r requirements.txt
python run.py
```
*The backend automatically seeds the database with realistic data for **M/S Sharma Traders** (GSTIN: 27AABCS9876E1Z2) on launch.*

- **FastAPI API Base**: `http://127.0.0.1:8000`
- **Swagger Interactive API Documentation**: `http://127.0.0.1:8000/docs`
- **WebSocket Streaming Endpoint**: `ws://127.0.0.1:8000/ws/ai/stream`

### 2. Frontend Setup (React + Vite + Tailwind CSS)
```bash
cd frontend
npm install
npm run dev
```
- **Web App**: `http://127.0.0.1:3000`

---

## 🎨 UI & UX Features

- **Linear-Style Dark Mode Aesthetic**: Slate dark palette (`slate-950`), vibrant emerald accents for credits/success, rose for debits/liabilities, amber for review alerts, and JetBrains Mono font for monetary values ([[UI Components]]).
- **Global Command Palette (`Cmd+K`)**: Rapid navigation, OCR upload trigger, and instant AI Copilot queries.
- **Split-Screen Invoice Reviewer**: PDF Canvas document preview on left, parsed fields + AI confidence + proposed double-entry journal entry on right with 1-click **Approve & Post** ([[User Flows]]).
- **Real-Time Agent Activity Ticker**: Live event stream showing step-by-step agent traces and confidence metrics.
- **Financial Balance Verification**: Balance Sheet dynamically verifies $Assets = Liabilities + Equity$ with a green audit badge ([[Pages]]).
