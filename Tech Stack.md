# Technology Stack - Vyapar Mandap

## 1. Backend Core
- **Programming Language**: Python 3.11+
- **API Framework**: FastAPI (Async, Automatic Swagger OpenAPI docs)
- **ORM & Data Layer**: SQLAlchemy 2.0 & Alembic database migrations
- **Data Validation**: Pydantic v2
- **Database Engine**: SQLite (Zero-config development & testing) / PostgreSQL 16 + TimescaleDB (Production relational ledger)
- **Background Queue**: Redis Cluster & Celery worker pool
- **Real-Time Stream**: WebSockets (`/ws/ai/stream`)

## 2. Frontend Web Application
- **Core Framework**: React 18 + Vite (TypeScript)
- **Styling & Theme**: Tailwind CSS with custom Slate dark mode palette (`slate-950`)
- **Iconography**: Lucide React
- **Animations**: Framer Motion micro-interactions
- **Visual Analytics**: Recharts
- **HTTP Client**: Axios
- **Typography**: Google Fonts (Inter & JetBrains Mono)

## 3. AI & Tooling Suite
- **Multi-Agent Engine**: Supervisor Orchestrator, Vision OCR, LangGraph state machine, RAG Vector memory
- **Codex Search & Edit Tools**: Custom Python & CLI tools suite (`tools/codex_tools.py` & `tools/cli.py`)
