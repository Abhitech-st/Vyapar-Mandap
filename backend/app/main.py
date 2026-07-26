import asyncio
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.agents.api import auth, invoices, journals
from app.agents.api.specialized_routers import gst_router, tds_router, bank_router, reports_router, ai_router

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Vyapar Mandap - Event-Driven Multi-Agent AI SaaS Platform for Double-Entry Accounting & Compliance"
)

# Enable CORS for Next.js / Vite React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(invoices.router, prefix=settings.API_V1_STR)
app.include_router(journals.router, prefix=settings.API_V1_STR)
app.include_router(gst_router, prefix=settings.API_V1_STR)
app.include_router(tds_router, prefix=settings.API_V1_STR)
app.include_router(bank_router, prefix=settings.API_V1_STR)
app.include_router(reports_router, prefix=settings.API_V1_STR)
app.include_router(ai_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "app": settings.PROJECT_NAME,
        "status": "Online",
        "version": "1.0.0",
        "codex_engine": "OpenAI Multi-Agent Pipeline Enabled",
        "docs_url": "/docs"
    }

# Real-time agent event stream WebSocket endpoint
@app.websocket("/ws/ai/stream")
async def websocket_ai_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        # Stream mock real-time events simulating background agent execution graph
        events = [
            {"agent": "Supervisor Agent", "step": "Ingestion", "message": "Listening for multi-tenant webhooks & OCR uploads..."},
            {"agent": "Invoice Agent", "step": "Vision OCR", "message": "Parsing invoice stream: Confidence 98.5%"},
            {"agent": "GST Agent", "step": "Portal Audit", "message": "Verified GSTR-2B Input Tax Credit eligibility"},
            {"agent": "Ledger Agent", "step": "Balance Check", "message": "Double-entry verified: Dr. ₹47,200 = Cr. ₹47,200"}
        ]
        idx = 0
        while True:
            evt = events[idx % len(events)]
            await websocket.send_text(json.dumps(evt))
            await asyncio.sleep(8)
            idx += 1
    except WebSocketDisconnect:
        pass
