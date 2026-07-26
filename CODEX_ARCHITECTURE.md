# Codex Architecture & Engineering Specifications
> **Vyapar Mandap — Generated & Architected using OpenAI Codex & Agentic Systems**

This document outlines how **OpenAI Codex** was leveraged to build the entire decoupled multi-agent SaaS architecture for **Vyapar Mandap**.

---

## 🔗 Related Knowledge Nodes
- Product Foundation: [[Product Vision]], [[Requirements]]
- Multi-Agent Intelligence: [[AI Agents]]
- Data Persistence: [[Database Schema]]
- API Services: [[API Contracts]]
- Code Tools: [[Folder Structure]], [[Tech Stack]]

---

## 🏗️ Architectural Core Built by Codex

### 1. Database Schema & Relational Integrity (22 Tables)
Codex constructed 3NF normalized relational schema models using **SQLAlchemy 2.0 ORM** representing all 22 domain tables ([[Database Schema]]):
- `organizations`, `users`, `roles`, `clients`, `vendors`, `ledger_accounts`
- `documents`, `invoices`, `invoice_items`
- `journal_entries`, `journal_entry_lines` (Double-entry core)
- `gst_records`, `tds_records`
- `bank_statements`, `bank_transactions`, `payments`
- `reports`, `notifications`, `agent_tasks`, `agent_logs`, `audit_logs`, `ai_conversations`

### 2. Multi-Agent Engine State Machines (`app/agents/`)
Codex implemented decoupled sub-agent pipelines ([[AI Agents]]):
- **Supervisor Agent (`supervisor.py`)**: Manages state transitions (`Running` $\rightarrow$ `Pending_Approval` $\rightarrow$ `Completed`), logs execution traces in `agent_logs`, and triggers human signoff checkpoints.
- **Invoice Agent (`invoice_agent.py`)**: Parses PDF document streams, calculates field extraction confidence scores, and flags items below $0.85$ confidence.
- **Ledger Agent (`ledger_agent.py`)**: Computes line-item debits and credits, verifying mathematical equality ($Total Debits = Total Credits$).
- **GST Agent (`gst_agent.py`)**: Validates 15-character GSTIN regex patterns and computes 18% CGST/SGST vs IGST splits.
- **Bank Reconciliation Agent (`specialized_agents.py`)**: Implements fuzzy string matching between statement descriptions and payment vouchers.

### 3. FastAPI REST & WebSocket Endpoints (`app/api/`)
Codex generated modular FastAPI routers ([[API Contracts]]):
- `/api/v1/auth/login`: JWT authentication flow.
- `/api/v1/invoices`: Document upload, list, and 1-click human signoff endpoint `/invoices/{id}/approve`.
- `/api/v1/journals`: Real-time Chart of Accounts tree and double-entry transaction posting.
- `/api/v1/reports`: Certified Profit & Loss and Balance Sheet balance checker ($Assets = Liabilities + Equity$).
- `/ws/ai/stream`: Real-time WebSocket event broadcaster for live linear agent timeline streaming.

### 4. React Vite Frontend with Linear Dark Mode (`frontend/src/`)
Codex designed the complete UI architecture using React, TypeScript, and Tailwind CSS ([[UI Components]], [[Pages]]):
- **`CommandPalette.tsx`**: `Cmd+K` keyboard shortcut event listener.
- **`ActivityTimeline.tsx`**: GitHub/Linear-style activity ticker rendering real-time AI step traces.
- **`DocumentViewer.tsx`**: HTML5 Canvas rendering engine for invoice previewing.
- **`Dashboard.tsx`**: 4 KPI cards with sparklines, Business Health Score gauge (92/100), and Pending Approvals queue.

---

## 🔒 Human-in-the-Loop Safeguards
To eliminate financial AI hallucinations, Codex embedded strict security checkpoints ([[User Flows]]):
1. No AI agent can write directly to immutable ledger tables without a human sign-off click.
2. Every proposed entry displays AI confidence, vendor GSTIN portal status, and debit/credit line breakdown.
3. Every mutation records an immutable entry in `audit_logs`.
