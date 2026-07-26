# Folder Structure - Vyapar Mandap

## 🔗 Related Knowledge Nodes
- System Technologies: [[Tech Stack]]
- Deployment Targets: [[Deployment]]
- Codex Architecture: [[CODEX_ARCHITECTURE]]
- Root Navigation: [[README]]

---

```
vyapar-mandap/
├── backend/
│   ├── app/
│   │   ├── agents/                 # Multi-agent orchestrator & specialized sub-agents ([[AI Agents]])
│   │   │   ├── supervisor.py
│   │   │   ├── invoice_agent.py
│   │   │   ├── ledger_agent.py
│   │   │   └── specialized_agents.py (GST, TDS, BankRec, Reporting, Analytics)
│   │   ├── api/                    # FastAPI routers ([[API Contracts]])
│   │   │   ├── auth.py
│   │   │   ├── invoices.py
│   │   │   ├── journals.py
│   │   │   └── specialized_routers.py (GST, TDS, BankRec, Reports, AI, Tasks)
│   │   ├── core/                   # App config, database session setup
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   ├── models/                 # SQLAlchemy 22-table ORM models ([[Database Schema]])
│   │   │   └── models.py
│   │   └── main.py                 # FastAPI application entrypoint & WebSockets
│   ├── seed_data.py                # Database seeder script
│   ├── run.py                      # Uvicorn server launcher
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/             # UI primitives & layouts ([[UI Components]])
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── CommandPalette.tsx
│   │   │   ├── ActivityTimeline.tsx
│   │   │   ├── AgentMonitor.tsx
│   │   │   └── DocumentViewer.tsx
│   │   ├── pages/                  # Workspace screens ([[Pages]])
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
├── tools/                          # Codex Search & Code Editing Utilities ([[CODEX_ARCHITECTURE]])
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
