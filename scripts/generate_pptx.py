import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Modern Fintech Palette
    C_EMERALD = RGBColor(5, 150, 105)   # #059669 Success Green
    C_NAVY = RGBColor(15, 23, 42)        # #0F172A Dark Slate
    C_INDIGO = RGBColor(37, 99, 235)     # #2563EB Royal Blue (Trust Accent)
    C_WHITE = RGBColor(255, 255, 255)
    C_LIGHT = RGBColor(248, 250, 252)    # #F8FAFC Light Background
    C_SLATE = RGBColor(71, 85, 105)     # #475569 Muted Text
    C_CARD_BG = RGBColor(241, 245, 249) # #F1F5F9 Card Background

    blank = prs.slide_layouts[6]

    def add_header(slide, title, subtitle=None):
        header = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(1.0))
        tf = header.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(26)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.font.name = "Inter"

        if subtitle:
            p2 = tf.add_paragraph()
            p2.text = subtitle
            p2.font.size = Pt(13)
            p2.font.color.rgb = C_SLATE
            p2.space_before = Pt(4)

    # ==========================================
    # SLIDE 1: Title
    # ==========================================
    slide1 = prs.slides.add_slide(blank)
    bg = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = C_NAVY
    bg.line.fill.background()

    t = slide1.shapes.add_textbox(Inches(1.2), Inches(2.2), Inches(10.9), Inches(4.0))
    tf = t.text_frame
    p = tf.paragraphs[0]
    p.text = "VYAPAR MANDAP (VYAPAR MANDAP)"
    p.font.size = Pt(48)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.font.name = "Inter"

    p2 = tf.add_paragraph()
    p2.text = "Event-Driven Multi-Agent AI SaaS Platform for Double-Entry Accounting"
    p2.font.size = Pt(22)
    p2.font.color.rgb = RGBColor(191, 219, 254)
    p2.space_before = Pt(14)

    p3 = tf.add_paragraph()
    p3.text = "Google Gemini 2.5 Flash • GSTR-1/3B/2B Compliance • TDS Section 194C/194J • Bank Reconciliation"
    p3.font.size = Pt(14)
    p3.font.color.rgb = RGBColor(148, 163, 184)
    p3.space_before = Pt(16)

    # ==========================================
    # SLIDE 2: The Problem
    # ==========================================
    slide2 = prs.slides.add_slide(blank)
    add_header(slide2, "The Problem: Broken Manual Bookkeeping & Statutory Risk", "Operational inefficiencies faced by 63+ Million MSMEs in India")

    visual = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(11.7), Inches(1.8))
    visual.fill.solid()
    visual.fill.fore_color.rgb = RGBColor(254, 242, 242)
    visual.line.color.rgb = RGBColor(254, 202, 202)

    v_text = visual.text_frame
    v_text.word_wrap = True
    v_text.margin_left = v_text.margin_top = Inches(0.25)
    p = v_text.paragraphs[0]
    p.text = "[!] Critical Bottlenecks in Indian Small Business Accounting:"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = RGBColor(185, 28, 28)

    p_sub = v_text.add_paragraph()
    p_sub.text = "Unstructured inputs (PDF invoices, messy bank CSVs, WhatsApp receipts) are manually processed across disconnected spreadsheets, leading to high error rates and tax audit penalties."
    p_sub.font.size = Pt(12)
    p_sub.font.color.rgb = C_NAVY
    p_sub.space_before = Pt(6)

    bullets = [
        "100+ Hours Wasted Monthly: Accountants manually transcribe PDF bills and physical receipts line by line.",
        "GSTR-2B ITC Losses & Fines: Discrepancies between supplier filings and internal accounts cause 18% lost tax credit.",
        "Complex TDS Statutory Thresholds: Section 194C (1%/2%) & Section 194J (10%) limits are missed across vendors.",
        "Hallucination Risk in Naive AI: Standard LLMs guess financial numbers and break strict accounting balance rules (Debits != Credits)."
    ]
    for i, b in enumerate(bullets):
        box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(3.5 + i*0.9), Inches(11.7), Inches(0.8))
        box.fill.solid()
        box.fill.fore_color.rgb = C_WHITE
        box.line.color.rgb = RGBColor(226, 232, 240)
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.15)
        p = tf.paragraphs[0]
        p.text = "- " + b
        p.font.size = Pt(13)
        p.font.color.rgb = C_NAVY

    # ==========================================
    # SLIDE 3: Why Existing Software Falls Short
    # ==========================================
    slide3 = prs.slides.add_slide(blank)
    add_header(slide3, "Why Existing Accounting Solutions Fall Short", "Comparison across Legacy Desktop software, General SaaS, and Naive AI wrappers")

    cards = [
        ("Legacy Desktop (Tally / Busy)", "- No AI automation or OCR parsing\n- No real-time GST portal verification\n- Manual, slow bank reconciliation\n- Fragile local data backups", RGBColor(185, 28, 28)),
        ("Generic SaaS (Zoho / QuickBooks)", "- High recurring subscription costs\n- Superficial Indian compliance depth\n- Lacks multi-agent reasoning graphs\n- No automated ITC discrepancy audit", C_INDIGO),
        ("Naive AI Wrappers (LLM Bots)", "- Hallucinates financial figures & balances\n- Violates double-entry constraint rules\n- Lacks human-in-the-loop signoff\n- No cryptographic audit immutability", C_EMERALD)
    ]

    for i, (title, desc, color) in enumerate(cards):
        card = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + i*3.9), Inches(1.6), Inches(3.7), Inches(5.3))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = RGBColor(226, 232, 240)

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.25)
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = color

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(13)
        p2.font.color.rgb = C_NAVY
        p2.space_before = Pt(14)

    # ==========================================
    # SLIDE 4: Solution – Vyapar Mandap
    # ==========================================
    slide4 = prs.slides.add_slide(blank)
    add_header(slide4, "The Solution: Vyapar Mandap Multi-Agent Platform", "Decoupled architecture bridging unstructured inputs with deterministic double-entry accounting cores")

    visual = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(11.7), Inches(1.8))
    visual.fill.solid()
    visual.fill.fore_color.rgb = RGBColor(239, 246, 255)
    visual.line.color.rgb = RGBColor(191, 219, 254)
    v = visual.text_frame
    v.margin_left = v.margin_top = Inches(0.25)
    p = v.paragraphs[0]
    p.text = "[+] Core Platform Pillars:"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_INDIGO

    p_sub = v.add_paragraph()
    p_sub.text = "Vyapar Mandap combines Google Gemini 2.5 Flash Vision OCR, a strict mathematical double-entry engine, and mandatory 1-click human approval into a clean Light Grey & Trust Blue UX."
    p_sub.font.size = Pt(12)
    p_sub.font.color.rgb = C_NAVY
    p_sub.space_before = Pt(6)

    bullets = [
        "Vision OCR & Gemini Parsing: Parses invoices with >98% accuracy and SHA256 disk caching (0ms repeat latency).",
        "Deterministic Double-Entry Core: Strict mathematical enforcement ensuring Total Debits = Total Credits (Dr. = Cr.).",
        "Human-in-the-Loop Signoff: Mandatory CA approval checkpoint before writing proposals to immutable ledger tables.",
        "Statutory GST & TDS Engine: Automated GSTR-1, GSTR-3B liability calculations & Section 194C/194J TDS deductions."
    ]
    for i, b in enumerate(bullets):
        box = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(3.5 + i*0.9), Inches(11.7), Inches(0.8))
        box.fill.solid()
        box.fill.fore_color.rgb = C_WHITE
        box.line.color.rgb = RGBColor(226, 232, 240)
        tf = box.text_frame
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.15)
        p = tf.paragraphs[0]
        p.text = "[OK]  " + b
        p.font.size = Pt(13)
        p.font.color.rgb = C_NAVY

    # ==========================================
    # SLIDE 5: Product Demo & Core Workflows
    # ==========================================
    slide5 = prs.slides.add_slide(blank)
    add_header(slide5, "End-to-End Product Workflows & User Experience", "Golden Path: PDF Invoice Ingestion to Immutable Ledger Commit")

    demo_steps = [
        ("Step 1: Document Upload", "User drops PDF/Image invoice. Invoice Agent triggers Google Gemini 2.5 Flash Vision OCR parsing with SHA256 document hashing.", C_INDIGO),
        ("Step 2: Statutory Tax Audit", "GST Agent validates 15-char GSTIN syntax, state codes (Intra vs Inter), and checks GSTR-2B Input Tax Credit eligibility.", C_NAVY),
        ("Step 3: Journal Proposal & Human Signoff", "Ledger Agent creates balanced double-entry proposal (Dr. Server Exp + Dr. CGST/SGST = Cr. Payable). CA reviews in split-screen PDF viewer.", C_EMERALD),
        ("Step 4: Bank Rec & Certified Reports", "Bank Rec Agent fuzzy-matches statement lines. Reporting Agent synthesizes certified P&L and Balance Sheet with Assets = Liabilities + Equity verification.", C_NAVY)
    ]

    for i, (title, desc, color) in enumerate(demo_steps):
        box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5 + i*1.4), Inches(11.7), Inches(1.25))
        box.fill.solid()
        box.fill.fore_color.rgb = C_WHITE
        box.line.color.rgb = RGBColor(226, 232, 240)

        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.15)
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = color

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = C_SLATE
        p2.space_before = Pt(4)

    # ==========================================
    # SLIDE 6: AI Agent Architecture
    # ==========================================
    slide6 = prs.slides.add_slide(blank)
    add_header(slide6, "The 10 Specialized AI Agents Roster", "Decoupled execution graph with focused context scoping and zero token bloat")

    agents = [
        ("Supervisor Agent", "Orchestrates execution graph & human signoff checkpoints"),
        ("Invoice Agent", "Vision OCR extraction & HSN/SAC code classification"),
        ("Ledger Agent", "Enforces immutable double-entry debit equal credit equality"),
        ("GST Agent", "Validates 15-char GSTINs & GSTR-2B ITC eligibility"),
        ("TDS Agent", "Section 194C/194J cumulative vendor limit calculator"),
        ("Bank Rec Agent", "Fuzzy string & amount similarity matching engine"),
        ("Compliance Agent", "Statutory filing calendar & penalty risk score auditor"),
        ("Reporting Agent", "Synthesizes certified P&L and Balance Sheet"),
        ("Notification Agent", "Real-time WebSocket event broadcaster (/ws/ai/stream)"),
        ("Analytics Agent", "Calculates 92/100 Health Score & 22.8 Mo cash runway")
    ]

    for i, (name, desc) in enumerate(agents):
        col = i % 5
        row = i // 5
        card = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + col*2.4), Inches(1.5 + row*2.7), Inches(2.2), Inches(2.5))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = RGBColor(226, 232, 240)

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.15)
        tf.margin_top = Inches(0.15)
        p = tf.paragraphs[0]
        p.text = name
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_INDIGO

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(10)
        p2.font.color.rgb = C_SLATE
        p2.space_before = Pt(6)

    # ==========================================
    # SLIDE 7: System Architecture
    # ==========================================
    slide7 = prs.slides.add_slide(blank)
    add_header(slide7, "Production-Grade System Architecture", "Decoupled full-stack SaaS platform built with FastAPI, React 18, and Google Gemini 2.5 Flash")

    layers = [
        ("Client Tier (React 18 + Vite + Tailwind CSS)", "- Light Grey & Trust Blue Theme (#2563EB)\n- Interactive AppContext global state management\n- Command Palette (Cmd+K) & PDF Canvas Viewer\n- Real-time Agent Event Ticker"),
        ("FastAPI Core Cluster (Python 3.11+)", "- Asynchronous REST API endpoints (/api/v1/invoices, /journals, /gst, /reports)\n- Real-time WebSockets streaming server (/ws/ai/stream)\n- Pydantic v2 data validation schemas"),
        ("Storage Engine & Google Gemini API", "- SQLite 3 / PostgreSQL 16 Relational Engine (22 SQLAlchemy ORM models)\n- Google Gemini 2.5 Flash SDK (google.genai) with SHA256 disk caching\n- Redis task queue & S3 document storage")
    ]

    for i, (layer, desc) in enumerate(layers):
        box = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5 + i*1.8), Inches(11.7), Inches(1.65))
        box.fill.solid()
        box.fill.fore_color.rgb = C_WHITE
        box.line.color.rgb = RGBColor(226, 232, 240)

        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.15)
        p = tf.paragraphs[0]
        p.text = layer
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = C_EMERALD if i == 2 else C_INDIGO

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = C_NAVY
        p2.space_before = Pt(4)

    # ==========================================
    # SLIDE 8: Database Architecture & Relational Schema
    # ==========================================
    slide8 = prs.slides.add_slide(blank)
    add_header(slide8, "Database Architecture: 22 Relational ORM Models", "Immutable double-entry ledger design with complete audit trail persistence")

    db_cards = [
        ("Immutable Ledger Schema", "- JournalEntry (id, entry_number, is_immutable)\n- JournalEntryLine (debit, credit, narration)\n- LedgerAccount (code, account_type, balance)\n- Enforces mathematical debit/credit equality", C_INDIGO),
        ("Document & Vendor Billing", "- Invoice (invoice_number, subtotal, tax_total)\n- InvoiceItem (description, hsn_sac, tax_rate)\n- Vendor (gstin, pan, tds_section, tds_rate)\n- Document (file_path, file_hash, OCR text)", C_NAVY),
        ("Compliance & Agent Audit Logs", "- GSTRecord (gstin, taxable_value, cgst, sgst, itc)\n- TDSRecord (section, base_amount, tds_deducted)\n- AgentTask (task_type, status, output_payload)\n- AgentLog (step_name, log_level, message)", C_EMERALD)
    ]

    for i, (title, desc, color) in enumerate(db_cards):
        card = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + i*3.9), Inches(1.5), Inches(3.7), Inches(5.4))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = RGBColor(226, 232, 240)

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.25)
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = color

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = C_NAVY
        p2.space_before = Pt(12)

    # ==========================================
    # SLIDE 9: Technology Stack
    # ==========================================
    slide9 = prs.slides.add_slide(blank)
    add_header(slide9, "Technology Stack & Developer Tools", "Enterprise-grade modern stack with custom Codex code manipulation tools")

    stack = [
        ("Frontend Framework", "React 18, Vite 5.4, Tailwind CSS 3.4, Lucide React, Axios"),
        ("Backend Framework", "FastAPI 0.110, Python 3.11, Pydantic v2, SQLAlchemy 2.0"),
        ("AI & LLM Services", "Google Gemini 2.5 Flash SDK (google.genai), Prompt Caching"),
        ("Database Storage", "SQLite 3 (Local Dev) / PostgreSQL 16 (Production Relational)"),
        ("Codex Tools Suite", "tools/codex_tools.py SDK (find, replace, add-line, outline CLI)")
    ]

    for i, (cat, tech) in enumerate(stack):
        col = i % 3
        row = i // 3
        card = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + col*4.0), Inches(1.5 + row*2.7), Inches(3.8), Inches(2.4))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = RGBColor(226, 232, 240)

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.25)
        p = tf.paragraphs[0]
        p.text = cat
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = C_INDIGO

        p2 = tf.add_paragraph()
        p2.text = tech
        p2.font.size = Pt(12)
        p2.font.color.rgb = C_SLATE
        p2.space_before = Pt(10)

    # ==========================================
    # SLIDE 10: Impact & Future Roadmap
    # ==========================================
    slide10 = prs.slides.add_slide(blank)
    add_header(slide10, "Impact & Strategic Product Roadmap", "Phased deployment plan for enterprise scaling across Chartered Accountancies")

    phases = [
        ("Phase 1 - MVP (Completed)", "10 AI agents, double-entry ledger engine, GST/TDS compliance, Light Grey & Trust Blue UX, Google Gemini 2.5 Flash API with SHA256 Cache Skills."),
        ("Phase 2 - Q3 2026", "Direct GSTN Portal Sandbox APIs, Account Aggregator live bank statement feeds, Automated inventory batch valuation & E-way bill generation."),
        ("Phase 3 - Q4 2026 to 2027", "Custom ICAI fine-tuned LLM models, CA Multi-Firm Client Portal, Predictive working capital credit scoring & automated vendor payments.")
    ]

    for i, (title, desc) in enumerate(phases):
        card = slide10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5 + i*1.8), Inches(11.7), Inches(1.65))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = RGBColor(226, 232, 240)

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.15)
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = C_EMERALD if i == 0 else C_INDIGO

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = C_NAVY
        p2.space_before = Pt(4)

    # Save handling for open/locked files
    output_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target_path = os.path.join(output_dir, "Vyapar_Mandap_Presentation.pptx")
    try:
        prs.save(target_path)
        print(f"[OK] Presentation saved to: {target_path}")
    except PermissionError:
        fallback_path = os.path.join(output_dir, "Vyapar_Mandap_Presentation_Detailed.pptx")
        prs.save(fallback_path)
        print(f"[INFO] Primary file was locked. Detailed presentation saved to: {fallback_path}")

if __name__ == "__main__":
    create_presentation()
