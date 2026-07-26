# Architectural & Product Meeting Notes - Vyapar Mandap

## Meeting 1: Hackathon Kickoff & Scope Definition
- **Date**: July 26, 2026
- **Attendees**: Antigravity Lead Architect, Senior CA Consultant, Codex Systems Engineer.
- **Agenda**: Define architecture for multi-agent AI double-entry accounting SaaS platform.

### Key Decisions Made:
1. **Decoupled Architecture**: FastAPI async Python backend + React Vite Tailwind CSS frontend.
2. **Human-in-the-Loop Safeguard**: Address judge concerns regarding AI hallucinations in finance. Enforce mandatory 1-click human approval before writing entries to immutable double-entry tables.
3. **10 Agent Orchestration Engine**: Implement Supervisor, Invoice, Ledger, GST, TDS, Bank Rec, Compliance, Reporting, Notification, and Analytics agents.
4. **Indian Accounting Focus**: Deep domain support for GSTR-2B ITC matching, TDS Section 194C/194J rates, HSN codes, and CGST/SGST/IGST tax splits.
5. **Linear Dark Mode Aesthetic**: Build a high-end Slate dark mode (`slate-950`) UI with real-time agent activity tickers and global `Cmd+K` command palette.

---

## Meeting 2: Codex Tooling & Code Editing Integration
- **Date**: July 26, 2026
- **Agenda**: Build automated search and replace, line insertion, and code outline utilities for AI agents.
- **Outcome**: Developed `tools/codex_tools.py` and `tools/cli.py` with 6 passing unit tests.
