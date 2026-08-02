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

    # ========== DESIGN TOKENS (Polished Modern SaaS Palette) ==========
    C_EMERALD = RGBColor(16, 185, 129)    # Success / Green Accent
    C_NAVY = RGBColor(15, 23, 42)         # Primary Dark Text
    C_INDIGO = RGBColor(67, 56, 202)      # Primary Indigo Accent
    C_WHITE = RGBColor(255, 255, 255)
    C_BG_GRAY = RGBColor(248, 250, 252)   # Subtle Grey Background
    C_CARD_BG = RGBColor(255, 255, 255)
    C_BORDER = RGBColor(226, 232, 240)    # Subtle 1px Border
    C_TEXT_MUTED = RGBColor(100, 116, 139) # Secondary Muted Text
    C_ACCENT_RED = RGBColor(220, 38, 38)   # Warning Red
    C_ACCENT_BLUE = RGBColor(37, 99, 235)  # Trust Blue
    SHADOW_COLOR = RGBColor(235, 240, 245) # Soft Drop Shadow

    def add_drop_shadow(slide, x, y, width, height):
        """Draws subtle background drop-shadow rectangle behind cards"""
        shadow = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x + Inches(0.04), y + Inches(0.04), width, height)
        shadow.fill.solid()
        shadow.fill.fore_color.rgb = SHADOW_COLOR
        shadow.line.fill.background()
        return shadow

    def add_button(slide, text, x, y, width, height, color=C_INDIGO):
        """Draws crisp button element"""
        btn = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, width, height)
        btn.fill.solid()
        btn.fill.fore_color.rgb = color
        btn.line.color.rgb = color
        btn.line.width = Pt(0)
        
        txBox = slide.shapes.add_textbox(x, y, width, height)
        tf = txBox.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = text
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.font.name = "Inter"
        p.alignment = PP_ALIGN.CENTER
        return btn

    blank = prs.slide_layouts[6]

    def add_header(slide, title, subtitle, accent_color=C_INDIGO):
        """Header with top background bar and accent border"""
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(1.3))
        bar.fill.solid()
        bar.fill.fore_color.rgb = C_BG_GRAY
        bar.line.fill.background()

        accent_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.28), Inches(11.73), Pt(2))
        accent_line.fill.solid()
        accent_line.fill.fore_color.rgb = accent_color
        accent_line.line.fill.background()

        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.2), Inches(11.73), Inches(1.0))
        tf = header_box.text_frame
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
            p2.font.color.rgb = C_TEXT_MUTED
            p2.font.name = "Inter"

    # ==========================================
    # SLIDE 1: Hero / Title
    # ==========================================
    slide1 = prs.slides.add_slide(blank)
    
    bg = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = C_BG_GRAY
    bg.line.fill.background()

    # Left Column Text
    t_box = slide1.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(6.5), Inches(4.5))
    tf = t_box.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = "VYAPAR MANDAP"
    p.font.size = Pt(40)
    p.font.bold = True
    p.font.color.rgb = C_NAVY
    p.font.name = "Inter"

    p2 = tf.add_paragraph()
    p2.text = "Modern Multi-Agent Double-Entry Accounting Platform"
    p2.font.size = Pt(18)
    p2.font.bold = True
    p2.font.color.rgb = C_INDIGO
    p2.font.name = "Inter"
    p2.space_before = Pt(8)

    p3 = tf.add_paragraph()
    p3.text = "Powered by Google Gemini 2.5 Flash Vision OCR, deterministic ledger engine, and real-time GST/TDS compliance tracking."
    p3.font.size = Pt(13)
    p3.font.color.rgb = C_TEXT_MUTED
    p3.font.name = "Inter"
    p3.space_before = Pt(12)

    add_button(slide1, "Explore Live Platform", Inches(0.8), Inches(5.6), Inches(3.0), Inches(0.65), C_EMERALD)

    # Right Column Metrics
    metrics = [
        ("10 AI Agents", "Decoupled execution graph for invoice, ledger & tax audits"),
        ("22 ORM Models", "Immutable double-entry schema with complete audit logs"),
        ("Google Gemini 2.5", "Vision OCR extraction & RAG financial query copilot")
    ]

    for i, (val, desc) in enumerate(metrics):
        y_m = Inches(1.5) + i * 1.7
        add_drop_shadow(slide1, Inches(7.6), y_m, Inches(4.9), Inches(1.5))
        
        card = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.6), y_m, Inches(4.9), Inches(1.5))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER

        strip = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(7.6), y_m, Pt(4), Inches(1.5))
        strip.fill.solid()
        strip.fill.fore_color.rgb = C_INDIGO
        strip.line.fill.background()

        txBox = slide1.shapes.add_textbox(Inches(7.9), y_m + Inches(0.15), Inches(4.4), Inches(1.2))
        tf_m = txBox.text_frame
        tf_m.word_wrap = True
        
        pm = tf_m.paragraphs[0]
        pm.text = val
        pm.font.size = Pt(18)
        pm.font.bold = True
        pm.font.color.rgb = C_NAVY
        pm.font.name = "Inter"

        pm2 = tf_m.add_paragraph()
        pm2.text = desc
        pm2.font.size = Pt(11)
        pm2.font.color.rgb = C_TEXT_MUTED
        pm2.font.name = "Inter"
        pm2.space_before = Pt(4)

    # ==========================================
    # SLIDE 2: The Manual Trap (Problem)
    # ==========================================
    slide2 = prs.slides.add_slide(blank)
    add_header(slide2, "The Problem: Broken Manual Bookkeeping & Statutory Risk", "Operational inefficiencies faced by 63+ Million MSMEs in India", C_ACCENT_RED)
    
    # Alert Warning Box
    alert = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(11.73), Inches(0.75))
    alert.fill.solid()
    alert.fill.fore_color.rgb = RGBColor(254, 242, 242)
    alert.line.color.rgb = RGBColor(254, 202, 202)
    
    tf_alert = alert.text_frame
    tf_alert.word_wrap = True
    p = tf_alert.paragraphs[0]
    p.text = "[!] Critical Industry Warning: Manual invoice entry, un-tracked vendor TDS limits, and GSTR-2B discrepancies cause millions in lost tax credit and statutory audit notices."
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_ACCENT_RED
    p.font.name = "Inter"

    # Problem Cards
    issues = [
        ("100+ Hours Wasted Monthly", "Accountants manually transcribe PDF bills and paper receipts line-by-line across disconnected spreadsheets, causing high human error rates.", C_ACCENT_RED),
        ("GSTR-2B ITC Loss & Interest Fines", "Discrepancies between supplier filings and internal accounts result in 18% lost Input Tax Credit (ITC) and statutory interest penalties.", C_ACCENT_RED),
        ("Complex TDS Limits & Naive AI Risk", "Section 194C (1%/2%) & Section 194J (10%) limits are missed across vendors. Standard LLMs hallucinate numbers and break debit=credit balance rules.", C_ACCENT_RED)
    ]
    
    for i, (title, desc, col) in enumerate(issues):
        y_pos = Inches(2.55) + (i * 1.55)
        add_drop_shadow(slide2, Inches(0.8), y_pos, Inches(11.73), Inches(1.35))
        
        card = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y_pos, Inches(11.73), Inches(1.35))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER
        
        strip = slide2.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), y_pos, Pt(4), Inches(1.35))
        strip.fill.solid()
        strip.fill.fore_color.rgb = col
        strip.line.fill.background()
        
        tx = slide2.shapes.add_textbox(Inches(1.1), y_pos + Inches(0.15), Inches(11.2), Inches(1.05))
        tf_i = tx.text_frame
        tf_i.word_wrap = True
        
        p = tf_i.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.font.name = "Inter"
        
        p2 = tf_i.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_TEXT_MUTED
        p2.font.name = "Inter"
        p2.space_before = Pt(4)

    # ==========================================
    # SLIDE 3: Four Pillars (The Solution)
    # ==========================================
    slide3 = prs.slides.add_slide(blank)
    add_header(slide3, "The Solution: Four Pillars of Accounting Integrity", "Decoupled architecture bridging unstructured inputs with deterministic accounting cores", C_INDIGO)
    
    pillars = [
        ("1. Vision OCR & Gemini 2.5", "98%+ Accurate Invoice Extraction", ["Google Gemini 2.5 Flash Vision engine", "SHA256 disk caching (0ms repeat latency)", "Auto-flags low-confidence (<85%) fields"]),
        ("2. Double-Entry Core Engine", "Strict Debit = Credit Enforcement", ["Strict mathematical balance verification", "Zero balance violation guarantee ($Dr = Cr$)", "Cryptographic immutable transaction logs"]),
        ("3. Human-in-the-Loop Signoff", "CA Verified Ledger Approvals", ["Split-screen PDF viewer + proposed journal", "1-click approval or rejection comments", "Audit trail logs every reviewer action"]),
        ("4. Statutory GST & TDS Engine", "Automated Compliance & Audit", ["Real-time 15-char GSTIN syntax check", "GSTR-1, GSTR-3B & GSTR-2B ITC matching", "Section 194C (1%/2%) & 194J (10%) TDS tracker"])
    ]
    
    for i, (title, sub, feats) in enumerate(pillars):
        col = i % 2
        row = i // 2
        y = Inches(1.6) + row * 2.75
        x = Inches(0.8) + (col * 6.0)
        
        add_drop_shadow(slide3, x, y, Inches(5.7), Inches(2.55))
        
        card = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.7), Inches(2.55))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER
        
        top_bar = slide3.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, Inches(5.7), Pt(4))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = C_INDIGO
        top_bar.line.fill.background()
        
        tx = slide3.shapes.add_textbox(x + Inches(0.3), y + Inches(0.15), Inches(5.1), Inches(2.25))
        tf_p = tx.text_frame
        tf_p.word_wrap = True
        
        p = tf_p.paragraphs[0]
        p.text = title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.font.name = "Inter"
        
        p2 = tf_p.add_paragraph()
        p2.text = sub
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = C_INDIGO
        p2.font.name = "Inter"
        p2.space_before = Pt(2)
        p2.space_after = Pt(4)
        
        for feat in feats:
            p3 = tf_p.add_paragraph()
            p3.text = f"• {feat}"
            p3.font.size = Pt(10)
            p3.font.color.rgb = C_TEXT_MUTED
            p3.font.name = "Inter"

    # ==========================================
    # SLIDE 4: The Golden Path Workflow
    # ==========================================
    slide4 = prs.slides.add_slide(blank)
    add_header(slide4, "The Golden Path Workflow", "End-to-End PDF Document Ingestion to Immutable Ledger Commit", C_EMERALD)
    
    steps = [
        ("Step 1: Upload", "Ingest PDF / Image", ["User drops PDF bill or receipt image", "Generates unique SHA256 hash", "Prevents duplicate invoice ingestion"]),
        ("Step 2: AI Parse", "Extract & Audit Tax", ["Gemini 2.5 Flash extracts fields", "GST Agent validates 15-char GSTIN", "Verifies GSTR-2B ITC eligibility"]),
        ("Step 3: Human Review", "CA Signoff Checkpoint", ["Split-screen PDF viewer + journal", "Validates $Dr. Exp + Dr. Tax = Cr. AP$", "1-click approve or reject with comments"]),
        ("Step 4: Commit", "Immutable Ledger", ["Double-entry posted to database", "Journal marked immutable", "P&L and Balance Sheet update live"])
    ]
    
    y_pos = Inches(1.6)
    
    for i, (title, sub, feats) in enumerate(steps):
        x_pos = Inches(0.8) + (i * 2.95)
        
        add_drop_shadow(slide4, x_pos, y_pos, Inches(2.75), Inches(5.4))
        
        card = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, y_pos, Inches(2.75), Inches(5.4))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER
        
        badge = slide4.shapes.add_shape(MSO_SHAPE.OVAL, x_pos + Inches(1.05), y_pos + Inches(0.2), Inches(0.65), Inches(0.65))
        badge.fill.solid()
        badge.fill.fore_color.rgb = C_EMERALD
        badge.line.fill.background()

        badge_txt = slide4.shapes.add_textbox(x_pos + Inches(1.05), y_pos + Inches(0.2), Inches(0.65), Inches(0.65))
        tf_b = badge_txt.text_frame
        pb = tf_b.paragraphs[0]
        pb.text = str(i + 1)
        pb.font.size = Pt(14)
        pb.font.bold = True
        pb.font.color.rgb = C_WHITE
        pb.alignment = PP_ALIGN.CENTER
        
        tx = slide4.shapes.add_textbox(x_pos + Inches(0.2), y_pos + Inches(0.95), Inches(2.35), Inches(4.3))
        tf_s = tx.text_frame
        tf_s.word_wrap = True
        
        p = tf_s.paragraphs[0]
        p.text = title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.font.name = "Inter"
        
        p2 = tf_s.add_paragraph()
        p2.text = sub
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = C_EMERALD
        p2.font.name = "Inter"
        p2.space_before = Pt(2)
        p2.space_after = Pt(8)
        
        for feat in feats:
            p3 = tf_s.add_paragraph()
            p3.text = f"• {feat}"
            p3.font.size = Pt(10)
            p3.font.color.rgb = C_TEXT_MUTED
            p3.font.name = "Inter"
            p3.space_before = Pt(4)

    # ==========================================
    # SLIDE 5: Production System Architecture
    # ==========================================
    slide5 = prs.slides.add_slide(blank)
    add_header(slide5, "Production-Grade System Architecture", "Decoupled full-stack SaaS platform built with FastAPI, React 18 & Google Gemini 2.5", C_INDIGO)
    
    layers = [
        ("Client Tier (React 18 + Vite + Tailwind CSS)", "Light Grey & Trust Blue Theme (#2563EB) • Interactive AppContext global state • Command Palette (Cmd+K) & PDF Canvas Viewer • Real-time Agent Event Ticker"),
        ("FastAPI Core Cluster (Python 3.11+)", "Asynchronous REST API endpoints (/api/v1/invoices, /journals, /gst, /reports) • Real-time WebSockets streaming server (/ws/ai/stream) • Pydantic v2 data validation schemas"),
        ("AI & LLM Services (Google Gemini 2.5 Flash)", "Google Gemini 2.5 Flash SDK (google.genai) • Vision OCR invoice field extraction • Prompt caching & SHA256 disk cache (0ms repeat responses)"),
        ("Data & Storage Engine (22 Relational Models)", "PostgreSQL 16 / SQLite 3 Relational Engine (22 SQLAlchemy ORM models) • Redis task queue & S3 document storage • Immutable audit log table")
    ]
    
    for i, (layer, tech) in enumerate(layers):
        y = Inches(1.55) + i * 1.38
        add_drop_shadow(slide5, Inches(0.8), y, Inches(11.73), Inches(1.22))
        
        box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(11.73), Inches(1.22))
        box.fill.solid()
        box.fill.fore_color.rgb = C_CARD_BG
        box.line.color.rgb = C_BORDER
        
        strip = slide5.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), y, Pt(4), Inches(1.22))
        strip.fill.solid()
        strip.fill.fore_color.rgb = C_INDIGO
        strip.line.fill.background()
        
        tx = slide5.shapes.add_textbox(Inches(1.1), y + Inches(0.12), Inches(11.3), Inches(1.0))
        tf_l = tx.text_frame
        tf_l.word_wrap = True
        
        p = tf_l.paragraphs[0]
        p.text = layer
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.font.name = "Inter"
        
        p2 = tf_l.add_paragraph()
        p2.text = tech
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_TEXT_MUTED
        p2.font.name = "Inter"
        p2.space_before = Pt(4)

    # ==========================================
    # SLIDE 6: The 10 Specialized AI Agents Roster
    # ==========================================
    slide6 = prs.slides.add_slide(blank)
    add_header(slide6, "The 10 Specialized AI Agents Roster", "Decoupled execution graph with focused context scoping and zero token bloat", C_INDIGO)
    
    agents = [
        ("Supervisor Agent", "Orchestrates execution graph & human approval checkpoints"),
        ("Invoice Agent", "Vision OCR extraction & HSN/SAC code classification"),
        ("Ledger Agent", "Immutable double-entry debit equal credit equality"),
        ("GST Agent", "Validates 15-char GSTINs & GSTR-2B ITC eligibility"),
        ("TDS Agent", "Section 194C/194J cumulative vendor limit calculator"),
        ("Bank Rec Agent", "Fuzzy string & amount similarity matching engine"),
        ("Compliance Agent", "Statutory filing calendar & penalty risk score auditor"),
        ("Reporting Agent", "Synthesizes certified P&L and Balance Sheet"),
        ("Notification Agent", "Real-time WebSocket event stream broadcaster"),
        ("Analytics Agent", "Calculates 92/100 Health Score & cash runway")
    ]
    
    cols = 5
    for i, (name, desc) in enumerate(agents):
        col = i % cols
        row = i // cols
        x = Inches(0.8) + (col * 2.38)
        y = Inches(1.6) + (row * 2.65)
        
        add_drop_shadow(slide6, x, y, Inches(2.25), Inches(2.45))
        
        card = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(2.25), Inches(2.45))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER
        
        top_bar = slide6.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, Inches(2.25), Pt(4))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = C_INDIGO
        top_bar.line.fill.background()
        
        tx = slide6.shapes.add_textbox(x + Inches(0.12), y + Inches(0.15), Inches(2.0), Inches(2.15))
        tf_a = tx.text_frame
        tf_a.word_wrap = True
        
        p = tf_a.paragraphs[0]
        p.text = name
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.font.name = "Inter"
        
        p2 = tf_a.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(10)
        p2.font.color.rgb = C_TEXT_MUTED
        p2.font.name = "Inter"
        p2.space_before = Pt(6)

    # ==========================================
    # SLIDE 7: Strategic Roadmap & Product Vision
    # ==========================================
    slide7 = prs.slides.add_slide(blank)
    add_header(slide7, "Strategic Product Roadmap", "Phased deployment plan for enterprise scaling across Chartered Accountancies", C_EMERALD)
    
    milestones = [
        ("Phase 1: MVP (Completed)", "• 10 Specialized AI Agents operational\n• Immutable double-entry ledger core\n• GST & TDS compliance engine\n• Light Grey & Trust Blue UX\n• Google Gemini 2.5 Flash + SHA256 Cache", C_EMERALD, "COMPLETED"),
        ("Phase 2: Q3 2026 (In Progress)", "• Direct GSTN Portal Sandbox APIs\n• Account Aggregator live bank feeds\n• Automated inventory batch valuation\n• E-way bill generation pipeline\n• Multi-user permission roles", C_INDIGO, "IN PROGRESS"),
        ("Phase 3: 2027 (Planned)", "• ICAI fine-tuned accounting LLM\n• CA Multi-Firm Client Portal\n• Predictive working capital scoring\n• Automated vendor payouts via UPI/NEFT\n• Enterprise API Marketplace", C_ACCENT_BLUE, "PLANNED")
    ]
    
    for i, (title, desc, color, status) in enumerate(milestones):
        x_pos = Inches(0.8) + (i * 3.95)
        
        add_drop_shadow(slide7, x_pos, Inches(1.6), Inches(3.8), Inches(5.4))
        
        card = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, Inches(1.6), Inches(3.8), Inches(5.4))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER
        
        badge = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos + Inches(0.25), Inches(1.85), Inches(1.5), Inches(0.35))
        badge.fill.solid()
        badge.fill.fore_color.rgb = RGBColor(239, 246, 255) if status == "IN PROGRESS" else (RGBColor(240, 253, 244) if status == "COMPLETED" else RGBColor(248, 250, 252))
        badge.line.color.rgb = color
        
        tf_bg = badge.text_frame
        p_bg = tf_bg.paragraphs[0]
        p_bg.text = status
        p_bg.font.size = Pt(9)
        p_bg.font.bold = True
        p_bg.font.color.rgb = color
        p_bg.alignment = PP_ALIGN.CENTER
        
        tx = slide7.shapes.add_textbox(x_pos + Inches(0.25), Inches(2.35), Inches(3.3), Inches(4.5))
        tf_m = tx.text_frame
        tf_m.word_wrap = True
        
        p = tf_m.paragraphs[0]
        p.text = title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.font.name = "Inter"
        
        p2 = tf_m.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_TEXT_MUTED
        p2.font.name = "Inter"
        p2.space_before = Pt(8)

    # ==========================================
    # SLIDE 8: Final Call to Action
    # ==========================================
    slide8 = prs.slides.add_slide(blank)
    
    bg_cta = slide8.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg_cta.fill.solid()
    bg_cta.fill.fore_color.rgb = C_INDIGO
    bg_cta.line.fill.background()
    
    tx_cta = slide8.shapes.add_textbox(Inches(1.5), Inches(2.0), Inches(10.33), Inches(3.5))
    tf_c = tx_cta.text_frame
    tf_c.word_wrap = True
    
    p = tf_c.paragraphs[0]
    p.text = "Ready to Transform Your Indian Business Accounting?"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.alignment = PP_ALIGN.CENTER
    p.font.name = "Inter"
    
    p2 = tf_c.add_paragraph()
    p2.text = "Automate PDF invoice OCR, double-entry ledger posting, and statutory GST & TDS compliance."
    p2.font.size = Pt(18)
    p2.font.color.rgb = RGBColor(191, 219, 254)
    p2.alignment = PP_ALIGN.CENTER
    p2.space_before = Pt(16)
    p2.font.name = "Inter"
    
    add_button(slide8, "Explore Vyapar Mandap Live", Inches(4.66), Inches(5.2), Inches(4.0), Inches(0.75), C_EMERALD)

    # Save handling for local file
    output_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target_path = os.path.join(output_dir, "Vyapar_Mandap_Presentation.pptx")
    try:
        prs.save(target_path)
        print(f"[OK] Presentation saved to: {target_path}")
    except PermissionError:
        fallback = os.path.join(output_dir, "Vyapar_Mandap_Presentation_Fixed.pptx")
        prs.save(fallback)
        print(f"[INFO] Primary file was locked. Presentation saved to: {fallback}")

if __name__ == "__main__":
    create_presentation()
