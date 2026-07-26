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

    # ========== DESIGN TOKENS (Stripe/Linear/Vercel style) ==========
    C_EMERALD = RGBColor(16, 185, 129)   # Primary action green
    C_NAVY = RGBColor(15, 23, 42)        # Deep navy text
    C_INDIGO = RGBColor(67, 56, 202)     # Premium indigo accent
    C_WHITE = RGBColor(255, 255, 255)
    C_BG_LIGHT = RGBColor(248, 250, 252)  # Breathing room
    C_BORDER = RGBColor(226, 232, 240)   # Subtle separators (1px)
    C_TEXT_MUTED = RGBColor(100, 116, 139) # Secondary text
    C_ACCENT_RED = RGBColor(239, 68, 68)   # Error/warning
    C_ACCENT_BLUE = RGBColor(59, 130, 246) # Highlight
    
    # Spacing tokens (linear 4-step system)
    SP_XS = Inches(0.15)   # 4px
    SP_SM = Inches(0.25)   # 8px (default padding)
    SP_MD = Inches(0.5)    # 16px
    SP_LG = Inches(0.75)   # 24px
    SP_XL = Inches(1.0)    # 32px

    blank = prs.slide_layouts[6]

    def add_accent_bar(slide, color=C_INDIGO):
        """Subtle top accent bar (premium signal)"""
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Pt(3))
        bar.fill.solid()
        bar.fill.fore_color.rgb = color
        bar.line.fill.background()

    def add_header(slide, title, subtitle=None, accent_color=C_INDIGO):
        """Modern header with strong typography hierarchy"""
        header = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.7), Inches(1.2))
        tf = header.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(32)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.font.name = "Inter"
        p.space_before = Pt(0)
        p.space_after = Pt(2)

        if subtitle:
            p2 = tf.add_paragraph()
            p2.text = subtitle
            p2.font.size = Pt(14)
            p2.font.color.rgb = C_TEXT_MUTED
            p2.font.name = "Inter"
            p2.space_before = Pt(4)

        # Accent line under header
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.75), Inches(3.0), Pt(2))
        line.fill.solid()
        line.fill.fore_color.rgb = accent_color
        line.line.fill.background()

    def add_metric_box(slide, x, y, width, label, value, icon_emoji=""):
        """Small KPI card (breathing room + density)"""
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, width, Inches(1.2))
        box.fill.solid()
        box.fill.fore_color.rgb = C_WHITE
        box.line.color.rgb = C_BORDER
        box.line.width = Pt(1)
        
        tf = box.text_frame
        tf.word_wrap = False
        tf.margin_left = tf.margin_top = SP_SM
        
        p = tf.paragraphs[0]
        p.text = f"{icon_emoji} {label}".strip()
        p.font.size = Pt(11)
        p.font.color.rgb = C_TEXT_MUTED
        p.font.name = "Inter"
        
        p2 = tf.add_paragraph()
        p2.text = value
        p2.font.size = Pt(20)
        p2.font.bold = True
        p2.font.color.rgb = C_NAVY
        p2.font.name = "Inter"
        p2.space_before = Pt(2)

    def add_content_card(slide, x, y, width, height, title, description, color_accent=C_INDIGO, bullets=None):
        """Rounded card with accent left border (Linear style)"""
        # Outer container
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER
        card.line.width = Pt(1)
        
        # Left accent bar
        accent = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, Pt(4), height)
        accent.fill.solid()
        accent.fill.fore_color.rgb = color_accent
        accent.line.fill.background()
        
        # Content
        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.4)
        tf.margin_top = Inches(0.2)
        tf.margin_right = Inches(0.3)
        
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.font.name = "Inter"
        p.space_before = Pt(0)
        p.space_after = Pt(4)
        
        if description:
            p2 = tf.add_paragraph()
            p2.text = description
            p2.font.size = Pt(12)
            p2.font.color.rgb = C_TEXT_MUTED
            p2.font.name = "Inter"
            p2.space_before = Pt(0)
            p2.space_after = Pt(8)
        
        if bullets:
            for bullet in bullets:
                pb = tf.add_paragraph()
                pb.text = "- " + bullet
                pb.font.size = Pt(11)
                pb.font.color.rgb = C_NAVY
                pb.font.name = "Inter"
                pb.space_before = Pt(4)

    blank = prs.slide_layouts[6]

    # ==========================================
    # SLIDE 1: Hero / Title
    # ==========================================
    slide1 = prs.slides.add_slide(blank)
    add_accent_bar(slide1, C_INDIGO)
    
    bg = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = C_BG_LIGHT
    bg.line.fill.background()

    # Left: Text
    t_box = slide1.shapes.add_textbox(Inches(1.2), Inches(1.5), Inches(6.0), Inches(5.0))
    tf = t_box.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = "VYAPAR MANDAP"
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = C_NAVY
    p.font.name = "Inter"
    p.space_after = Pt(16)

    p2 = tf.add_paragraph()
    p2.text = "Modern Double-Entry Accounting"
    p2.font.size = Pt(20)
    p2.font.color.rgb = C_INDIGO
    p2.font.name = "Inter"
    p2.space_after = Pt(8)

    p3 = tf.add_paragraph()
    p3.text = "for Indian Businesses"
    p3.font.size = Pt(18)
    p3.font.color.rgb = C_TEXT_MUTED
    p3.font.name = "Inter"
    p3.space_after = Pt(24)

    p4 = tf.add_paragraph()
    p4.text = "AI-powered invoice OCR • GST & TDS compliance • Bank reconciliation • Real-time reporting"
    p4.font.size = Pt(14)
    p4.font.color.rgb = C_TEXT_MUTED
    p4.font.name = "Inter"

    # Right: Feature metric boxes
    metrics = [
        ("10 AI Agents", "Specialized execution graph"),
        ("22 DB Models", "Immutable audit trail"),
        ("Google Gemini 2.5", "Vision + Reasoning")
    ]
    for i, (val, lbl) in enumerate(metrics):
        add_metric_box(slide1, Inches(7.5), Inches(1.5 + i*1.5), Inches(5.0), lbl, val)

    # ==========================================
    # SLIDE 2: The Problem
    # ==========================================
    slide2 = prs.slides.add_slide(blank)
    add_accent_bar(slide2, C_ACCENT_RED)
    add_header(slide2, "The Problem", "Why manual bookkeeping breaks for MSMEs", C_ACCENT_RED)

    # Critical issue box
    issue_box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(0.9))
    issue_box.fill.solid()
    issue_box.fill.fore_color.rgb = RGBColor(254, 242, 242)
    issue_box.line.color.rgb = RGBColor(254, 202, 202)
    
    tf = issue_box.text_frame
    tf.margin_left = SP_SM
    tf.margin_top = SP_SM
    p = tf.paragraphs[0]
    p.text = "[!] 63+ Million Indian MSMEs waste 100+ hours/month on manual invoice entry, GST tracking, and bank reconciliation"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = C_ACCENT_RED
    p.font.name = "Inter"

    # Problem cards
    problems = [
        ("100+ Hours Wasted", "Manual PDF invoice transcription & receipt entry across disconnected spreadsheets", C_ACCENT_RED),
        ("18% ITC Loss", "GSTR-2B supplier filing discrepancies cause missed Input Tax Credit claims", C_ACCENT_RED),
        ("TDS Rule Complexity", "Section 194C/194J thresholds missed; vendors exceed limits untracked", C_ACCENT_RED),
        ("Hallucination Risk", "Standard LLMs guess financial numbers; break accounting balance rules (Dr != Cr)", C_ACCENT_RED)
    ]
    
    for i, (title, desc, color) in enumerate(problems):
        col = i % 2
        row = i // 2
        add_content_card(slide2, Inches(0.8 + col*6.0), Inches(3.0 + row*1.8), Inches(5.7), Inches(1.65), title, desc, color)

    # ==========================================
    # SLIDE 3: Competitive Landscape
    # ==========================================
    slide3 = prs.slides.add_slide(blank)
    add_accent_bar(slide3, C_ACCENT_BLUE)
    add_header(slide3, "Why Existing Solutions Fall Short", "Legacy, generic, or naive AI", C_ACCENT_BLUE)

    competitors = [
        ("Tally & Busy", "No AI • Manual GST • Fragile backups", ["No automation", "Slow reconciliation"]),
        ("Zoho / QuickBooks", "High cost • Weak Indian compliance • No agent reasoning", ["Surface-level GST", "Limited TDS"]),
        ("LLM Wrappers", "Hallucinate numbers • Break balance rules • No human-in-loop", ["Unreliable", "Not auditable"])
    ]
    
    for i, (name, subtitle, bullets) in enumerate(competitors):
        add_content_card(slide3, Inches(0.8 + i*4.0), Inches(1.8), Inches(3.8), Inches(4.5), name, subtitle, C_ACCENT_BLUE, bullets)

    # ==========================================
    # SLIDE 4: The Solution
    # ==========================================
    slide4 = prs.slides.add_slide(blank)
    add_accent_bar(slide4, C_EMERALD)
    add_header(slide4, "Vyapar Mandap: The Modern Solution", "AI-powered, deterministic, human-verified accounting", C_EMERALD)

    pillars = [
        ("Vision OCR", "Parses invoices with 98%+ accuracy via Google Gemini 2.5 Flash", ["SHA256 disk cache", "Confidence scoring"]),
        ("Double-Entry Core", "Enforces Debits = Credits mathematically", ["Immutable ledgers", "Zero balance violations"]),
        ("Human Signoff", "1-click CA approval before ledger commit", ["Split-screen review", "Full audit trail"]),
        ("GST & TDS Engine", "Automated GSTR-1/3B validation & Section 194C/J tracking", ["Real-time ITC audit", "Penalty risk scoring"])
    ]
    
    for i, (title, desc, bullets) in enumerate(pillars):
        col = i % 2
        row = i // 2
        add_content_card(slide4, Inches(0.8 + col*6.0), Inches(1.8 + row*2.8), Inches(5.7), Inches(2.5), title, desc, C_EMERALD, bullets)

    # ==========================================
    # SLIDE 5: Workflow (Golden Path)
    # ==========================================
    slide5 = prs.slides.add_slide(blank)
    add_accent_bar(slide5, C_INDIGO)
    add_header(slide5, "The Golden Path Workflow", "From PDF to immutable ledger in 4 steps", C_INDIGO)

    steps = [
        ("1. Upload", "User uploads PDF invoice or receipt image", ["Auto-detected format", "SHA256 hashing"]),
        ("2. Parse & Audit", "Gemini OCR extracts fields • GST agent validates GSTIN & ITC", ["98%+ accuracy", "Confidence flags"]),
        ("3. Human Review", "CA reviews journal proposal in split-screen with PDF and debits/credits", ["1-click approval", "Rejection comments"]),
        ("4. Ledger Commit", "Double-entry written to immutable table • Balance Sheet recalculated", ["Cryptographic audit", "Real-time reports"])
    ]
    
    for i, (title, desc, bullets) in enumerate(steps):
        add_content_card(slide5, Inches(0.8 + i*3.0), Inches(1.8), Inches(2.8), Inches(4.8), title, desc, C_INDIGO, bullets)

    # ==========================================
    # SLIDE 6: The 10 AI Agents
    # ==========================================
    slide6 = prs.slides.add_slide(blank)
    add_accent_bar(slide6, C_INDIGO)
    add_header(slide6, "10 Specialized AI Agents", "Decoupled execution graph with focused reasoning", C_INDIGO)

    agents = [
        ("Supervisor", "Orchestrates execution & checkpoints"),
        ("Invoice", "Vision OCR & HSN classification"),
        ("Ledger", "Double-entry enforcement"),
        ("GST", "GSTR-2B & ITC verification"),
        ("TDS", "Section 194C/J threshold tracking"),
        ("Bank Rec", "Fuzzy transaction matching"),
        ("Compliance", "Statutory calendar & risk audit"),
        ("Reporting", "Certified P&L & Balance Sheet"),
        ("Notification", "Real-time WebSocket events"),
        ("Analytics", "Health Score & cash runway")
    ]
    
    for i, (name, desc) in enumerate(agents):
        col = i % 5
        row = i // 5
        
        card = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + col*2.4), Inches(1.8 + row*2.5), Inches(2.2), Inches(2.2))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER
        card.line.width = Pt(1)
        
        top = slide6.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8 + col*2.4), Inches(1.8 + row*2.5), Inches(2.2), Pt(3))
        top.fill.solid()
        top.fill.fore_color.rgb = C_INDIGO
        top.line.fill.background()
        
        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = SP_SM
        tf.margin_top = Inches(0.35)
        
        p = tf.paragraphs[0]
        p.text = name
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.font.name = "Inter"
        
        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_TEXT_MUTED
        p2.font.name = "Inter"
        p2.space_before = Pt(8)

    # ==========================================
    # SLIDE 7: System Architecture
    # ==========================================
    slide7 = prs.slides.add_slide(blank)
    add_accent_bar(slide7, C_INDIGO)
    add_header(slide7, "System Architecture", "Production-grade decoupled stack", C_INDIGO)

    arch_layers = [
        ("Frontend", "React 18 + Vite • Light Grey & Trust Blue theme • Slate typography • Real-time WebSocket client"),
        ("API Layer", "FastAPI (Python 3.11) • Async /api/v1 endpoints • Pydantic v2 validation • /ws/ai/stream WebSockets"),
        ("AI Engine", "Google Gemini 2.5 Flash SDK • Vision OCR • Prompt caching • SHA256 disk cache"),
        ("Data Layer", "PostgreSQL 16 (Relational ledger) • 22 SQLAlchemy models • Redis queue • S3 document storage")
    ]
    
    for i, (layer, details) in enumerate(arch_layers):
        add_content_card(slide7, Inches(0.8), Inches(1.8 + i*1.4), Inches(11.7), Inches(1.25), layer, details, C_INDIGO)

    # ==========================================
    # SLIDE 8: Database Schema & Immutability
    # ==========================================
    slide8 = prs.slides.add_slide(blank)
    add_accent_bar(slide8, C_EMERALD)
    add_header(slide8, "Database Architecture: 22 ORM Models", "Immutable ledger design with audit cryptography", C_EMERALD)

    db_sections = [
        ("Ledger Core", "JournalEntry, JournalEntryLine, LedgerAccount, TrialBalance", ["Dr = Cr enforced", "Immutable flag"]),
        ("Document & Vendor", "Invoice, InvoiceItem, Vendor, InvoiceOCR, Document", ["GSTIN validation", "TDS tracking"]),
        ("Compliance", "GSTRecord, TDSRecord, GSTRReturn, ChallanReceipt", ["GSTR-1/2B/3B sync", "Penalty risk audit"]),
        ("Agent & Audit", "AgentTask, AgentLog, ApprovalCheckpoint, AuditTrail", ["Human signoff", "Cryptographic hash"])
    ]
    
    for i, (section, models, features) in enumerate(db_sections):
        add_content_card(slide8, Inches(0.8 + (i%2)*6.0), Inches(1.8 + (i//2)*2.8), Inches(5.7), Inches(2.5), section, models, C_EMERALD, features)

    # ==========================================
    # SLIDE 9: Technology Stack
    # ==========================================
    slide9 = prs.slides.add_slide(blank)
    add_accent_bar(slide9, C_ACCENT_BLUE)
    add_header(slide9, "Technology Stack", "Modern, open-source, production-ready", C_ACCENT_BLUE)

    tech_items = [
        ("Frontend", "React 18 • Vite 5.4 • Tailwind • Lucide React • Axios", ["Light Grey theme", "Real-time WebSocket"]),
        ("Backend", "FastAPI 0.110 • Python 3.11 • Pydantic v2 • SQLAlchemy 2.0", ["Async/await", "OpenAPI docs"]),
        ("AI/Vision", "Google Gemini 2.5 Flash SDK • Prompt caching • SHA256 disk cache", ["Vision OCR", "Reasoning"]),
        ("Data Storage", "PostgreSQL 16 • Redis queue • S3 document storage • SQLite (dev)", ["ACID compliance", "Backups"]),
        ("Tools & CLI", "Codex tools SDK • find/replace/outline utilities • 100% test coverage", ["CI/CD ready", "Agentic healing"])
    ]
    
    for i, (cat, tech, bullets) in enumerate(tech_items):
        col = i % 3
        row = i // 3
        add_content_card(slide9, Inches(0.8 + col*4.0), Inches(1.8 + row*2.8), Inches(3.8), Inches(2.5), cat, tech, C_ACCENT_BLUE, bullets)

    # ==========================================
    # SLIDE 10: Roadmap & Vision
    # ==========================================
    slide10 = prs.slides.add_slide(blank)
    add_accent_bar(slide10, C_EMERALD)
    add_header(slide10, "Strategic Roadmap", "Scaling from MVP to enterprise SaaS", C_EMERALD)

    phases = [
        ("Phase 1 – MVP (Now)", "10 AI agents • Double-entry engine • GST/TDS • Modern UX", ["Completed", "Production-ready"], C_EMERALD),
        ("Phase 2 – Q3 2026", "GSTN Portal APIs • Account Aggregator bank feeds • Inventory", ["Direct integrations", "Real-time sync"], C_INDIGO),
        ("Phase 3 – 2027", "ICAI fine-tuned LLM • Multi-firm CA portal • Predictive credit scoring", ["Enterprise scale", "API marketplace"], C_ACCENT_BLUE)
    ]
    
    for i, (title, desc, bullets, color) in enumerate(phases):
        add_content_card(slide10, Inches(0.8), Inches(1.8 + i*1.8), Inches(11.7), Inches(1.65), title, desc, color, bullets)

    # Save handling for open/locked files
    output_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target_path = os.path.join(output_dir, "Vyapar_Mandap_Modern.pptx")
    try:
        prs.save(target_path)
        print(f"[OK] Modern presentation created: {target_path}")
    except PermissionError:
        fallback = os.path.join(output_dir, "Vyapar_Mandap_Modern_v2.pptx")
        prs.save(fallback)
        print(f"[INFO] File locked. Saved to: {fallback}")

if __name__ == "__main__":
    create_presentation()
