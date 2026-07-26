# Folder Structure - Vyapar Mandap

```
vyapar-mandap/
├── backend/
│   ├── app/
│   │   ├── agents/                 # Multi-agent orchestrator & specialized sub-agents
│   │   │   ├── supervisor.py
│   │   │   ├── invoice_agent.py
│   │   │   ├── ledger_agent.py
│   │   │   └── specialized_agents.py (GST, TDS, BankRec, Reporting, Analytics)
│   │   ├── api/                    # FastAPI routers (v1)
│   │   │   ├── auth.py
│   │   │   ├── invoices.py
│   │   │   ├── journals.py
│   │   │   └── specialized_routers.py (GST, TDS, BankRec, Reports, AI, Tasks)
│   │   ├── core/                   # App config, database session setup
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   ├── models/                 # SQLAlchemy 22-table ORM models
│   │   │   └── models.py
│   │   └── main.py                 # FastAPI application entrypoint & WebSockets
│   ├── seed_data.py                # Database seeder script
│   ├── run.py                      # Uvicorn server launcher
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/             # UI primitives & layouts
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── CommandPalette.tsx
│   │   │   ├── ActivityTimeline.tsx
│   │   │   ├── AgentMonitor.tsx
│   │   │   └── DocumentViewer.tsx
│   │   ├── pages/                  # Workspace screens
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Invoices.tsx
│   │   │   ├── Banking.tsx
│   │   │   ├── Accounting.tsx
│   │   │   ├── GstTds.tsx
│   │   │   ├── Reports.tsx
│   │   │   ├── AiCopilot.tsx
│   │   │   └── Settings.tsx
│   │   ├── services/               # Axios API client integration
│   │   │   └── api.ts
│   │   ├── App.tsx                 # Main layout shell
│   │   ├── main.tsx
│   │   └── index.css               # Tailwind Slate dark mode tokens
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── tools/                          # Codex Search & Code Editing Utilities
│   ├── codex_tools.py
│   ├── cli.py
│   ├── test_codex_tools.py
│   └── README.md
├── Product Vision.md
├── Requirements.md
├── Roadmap.md
├── Database Schema.md
├── API Contracts.md
├── AI Agents.md
├── UI Components.md
├── Pages.md
├── User Flows.md
├── Prompts.md
├── Tech Stack.md
├── Folder Structure.md
├── Deployment.md
├── Meeting Notes.md
├── CODEX_ARCHITECTURE.md
└── README.md
```
