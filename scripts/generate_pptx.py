import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    # Set standard 16:9 widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    
    # Colors
    C_BLUE = RGBColor(29, 78, 216)       # #1D4ED8 Primary Trust Blue
    C_DARK = RGBColor(15, 23, 42)       # #0F172A Dark Slate Text
    C_SLATE = RGBColor(71, 85, 105)     # #475569 Muted Text
    C_BG = RGBColor(248, 250, 252)      # #F8FAFC Light Background
    C_WHITE = RGBColor(255, 255, 255)
    C_EMERALD = RGBColor(5, 150, 105)   # #059669 Success Green
    C_AMBER = RGBColor(217, 119, 6)     # #D97706 Warning Amber
    C_CARD_BG = RGBColor(241, 245, 249) # #F1F5F9 Card Background

    blank_layout = prs.slide_layouts[6]

    def add_header(slide, title_text, category_text="VYAPAR MANDAP PRESENTATION"):
        # Header shape background
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(1.0))
        tf = header_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        p_cat = tf.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = C_BLUE
        p_cat.font.name = "Inter"

        p_title = tf.add_paragraph()
        p_title.text = title_text
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = C_DARK
        p_title.font.name = "Inter"

    # ==========================================
    # SLIDE 1: Title Slide (Cover)
    # ==========================================
    slide1 = prs.slides.add_slide(blank_layout)
    
    # Background card shape
    bg_shape = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg_shape.fill.solid()
    bg_shape.fill.fore_color.rgb = C_DARK
    bg_shape.line.fill.background()

    # Title box
    t_box = slide1.shapes.add_textbox(Inches(1.2), Inches(2.2), Inches(11.0), Inches(4.0))
    tf1 = t_box.text_frame
    tf1.word_wrap = True
    
    p0 = tf1.paragraphs[0]
    p0.text = "VYAPAR MANDAP"
    p0.font.size = Pt(44)
    p0.font.bold = True
    p0.font.color.rgb = C_WHITE
    p0.font.name = "Inter"

    p1 = tf1.add_paragraph()
    p1.text = "Event-Driven Multi-Agent AI SaaS Platform for Double-Entry Accounting & Indian Compliance"
    p1.font.size = Pt(20)
    p1.font.color.rgb = RGBColor(191, 219, 254) # Light Blue
    p1.font.name = "Inter"
    p1.space_before = Pt(14)

    p2 = tf1.add_paragraph()
    p2.text = "Architected & Generated with OpenAI Codex • GST, TDS & Bank Reconciliation Engine"
    p2.font.size = Pt(14)
    p2.font.color.rgb = RGBColor(148, 163, 184) # Muted Slate
    p2.font.name = "Inter"
    p2.space_before = Pt(28)

    # ==========================================
    # SLIDE 2: Problem & Vision
    # ==========================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_header(slide2, "The Core Problem & Value Proposition", "EXECUTIVE SUMMARY")

    # Left Card: Problem
    card1 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2))
    card1.fill.solid()
    card1.fill.fore_color.rgb = C_CARD_BG
    card1.line.color.rgb = RGBColor(226, 232, 240)
    
    tf_c1 = card1.text_frame
    tf_c1.word_wrap = True
    tf_c1.margin_left = tf_c1.margin_top = Inches(0.3)
    p_c1_t = tf_c1.paragraphs[0]
    p_c1_t.text = "🚨 The Manual Compliance Nightmare"
    p_c1_t.font.size = Pt(18)
    p_c1_t.font.bold = True
    p_c1_t.font.color.rgb = C_DARK
    
    bullets_p = [
        "100+ Hours Wasted: Manual entry of PDF vendor bills and scanned paper receipts.",
        "GSTR-2B Mismatches: Loss of Input Tax Credit (ITC) due to active supplier filing discrepancies.",
        "Complex TDS Rules: Manual tracking of Section 194C/194J statutory payment thresholds.",
        "Naive AI Hallucinations: Standard LLMs guess financial numbers and break balancing rules."
    ]
    for b in bullets_p:
        pb = tf_c1.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(13)
        pb.font.color.rgb = C_SLATE
        pb.space_before = Pt(10)

    # Right Card: Solution
    card2 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.2))
    card2.fill.solid()
    card2.fill.fore_color.rgb = RGBColor(239, 246, 255) # Light Blue Tint
    card2.line.color.rgb = RGBColor(191, 219, 254)
    
    tf_c2 = card2.text_frame
    tf_c2.word_wrap = True
    tf_c2.margin_left = tf_c2.margin_top = Inches(0.3)
    p_c2_t = tf_c2.paragraphs[0]
    p_c2_t.text = "💡 The Vyapar Mandap Solution"
    p_c2_t.font.size = Pt(18)
    p_c2_t.font.bold = True
    p_c2_t.font.color.rgb = C_BLUE

    bullets_s = [
        "Vision OCR Extraction: Automated field parsing with confidence scoring (<0.85 flags review).",
        "Deterministic Double-Entry: Enforces mathematical balancing formula (Debits = Credits).",
        "Human-in-the-Loop Safety: 1-click human signoff required before immutable ledger commit.",
        "Reliance & Trust UI: Clean Slate & Royal Blue light mode interface designed for CAs."
    ]
    for b in bullets_s:
        pb = tf_c2.add_paragraph()
        pb.text = "✓ " + b
        pb.font.size = Pt(13)
        pb.font.color.rgb = C_DARK
        pb.space_before = Pt(10)

    # ==========================================
    # SLIDE 3: System Architecture
    # ==========================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_header(slide3, "Decoupled Multi-Agent SaaS Architecture", "SYSTEM DESIGN")

    # 3 Layers Grid
    layers = [
        ("Client Tier (React 18 + Vite)", "Slate Light Theme, Command Palette (Cmd+K), Real-time Activity Ticker, PDF Canvas Viewer", C_BLUE),
        ("FastAPI Application Cluster", "Python 3.11+, Async REST API endpoints, WebSockets streaming (/ws/ai/stream), Pydantic v2", C_DARK),
        ("Core Storage & Multi-Agent Pool", "PostgreSQL 16 (Relational Ledger), 10 Specialized AI Agents, Redis Queue, S3 Document Storage", C_EMERALD)
    ]
    for i, (l_title, l_desc, l_color) in enumerate(layers):
        c_shape = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6 + i*1.7), Inches(11.7), Inches(1.4))
        c_shape.fill.solid()
        c_shape.fill.fore_color.rgb = C_WHITE
        c_shape.line.color.rgb = RGBColor(226, 232, 240)
        
        tf = c_shape.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = Inches(0.25)
        
        p = tf.paragraphs[0]
        p.text = l_title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = l_color

        p2 = tf.add_paragraph()
        p2.text = l_desc
        p2.font.size = Pt(13)
        p2.font.color.rgb = C_SLATE
        p2.space_before = Pt(4)

    # ==========================================
    # SLIDE 4: 10 Specialized AI Agents
    # ==========================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_header(slide4, "The 10 Specialized AI Agents Roster", "MULTI-AGENT ENGINE")

    agent_grid = [
        ("Supervisor Agent", "Orchestrates execution graph & human checkpoints"),
        ("Invoice Agent", "Vision OCR field extraction & HSN classification"),
        ("Ledger Agent", "Enforces immutable double-entry balance equality"),
        ("GST Agent", "Validates GSTINs & GSTR-2B ITC eligibility"),
        ("TDS Agent", "Section 194C/194J payment threshold calculator"),
        ("Bank Rec Agent", "Fuzzy transaction string & amount matcher"),
        ("Compliance Agent", "Statutory filing calendar & penalty risk auditor"),
        ("Reporting Agent", "Synthesizes certified P&L and Balance Sheet"),
        ("Notification Agent", "Real-time WebSocket alert event broadcaster"),
        ("Analytics Agent", "Business Health Index (92/100) & cash runway")
    ]

    for idx, (a_name, a_desc) in enumerate(agent_grid):
        col = idx % 2
        row = idx // 2
        
        box = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + col*5.9), Inches(1.5 + row*1.1), Inches(5.7), Inches(0.95))
        box.fill.solid()
        box.fill.fore_color.rgb = C_CARD_BG
        box.line.color.rgb = RGBColor(226, 232, 240)
        
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = Inches(0.15)
        
        p = tf.paragraphs[0]
        p.text = a_name
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_BLUE
        
        p2 = tf.add_paragraph()
        p2.text = a_desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_SLATE

    # ==========================================
    # SLIDE 5: Golden Path Workflow
    # ==========================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_header(slide5, "Golden Path: Invoice to Immutable Ledger", "WORKFLOW STEP-BY-STEP")

    steps = [
        ("1. Ingestion", "Upload PDF invoice / receipt stream"),
        ("2. Vision OCR", "Invoice Agent parses line items & GSTIN"),
        ("3. Tax Audit", "GST Agent verifies 18% IGST in GSTR-2B"),
        ("4. Human Signoff", "CA reviews split-screen journal proposal"),
        ("5. Immutable Post", "Double-entry entry committed to ledger")
    ]

    for idx, (s_title, s_desc) in enumerate(steps):
        s_box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + idx*2.4), Inches(2.5), Inches(2.2), Inches(2.8))
        s_box.fill.solid()
        s_box.fill.fore_color.rgb = C_WHITE if idx < 3 else (RGBColor(239, 246, 255) if idx==3 else RGBColor(236, 253, 245))
        s_box.line.color.rgb = C_BLUE if idx==3 else RGBColor(226, 232, 240)
        
        tf = s_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = Inches(0.2)
        
        p = tf.paragraphs[0]
        p.text = s_title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = C_BLUE if idx==3 else C_DARK

        p2 = tf.add_paragraph()
        p2.text = s_desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = C_SLATE
        p2.space_before = Pt(12)

    # ==========================================
    # SLIDE 6: Indian Tax & Statutory Compliance
    # ==========================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_header(slide6, "Deep Indian Statutory Compliance Engine", "GST & TDS COMPLIANCE")

    c1 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2))
    c1.fill.solid()
    c1.fill.fore_color.rgb = C_WHITE
    c1.line.color.rgb = RGBColor(226, 232, 240)
    tf1 = c1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = tf1.margin_top = Inches(0.3)
    p = tf1.paragraphs[0]
    p.text = "🧾 Goods & Services Tax (GST)"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = C_BLUE
    
    g_bullets = [
        "15-Character GSTIN syntax regex validation.",
        "CGST + SGST (Intra-state) vs IGST (Inter-state) place of supply split.",
        "GSTR-1 Outward Summary & GSTR-3B Return liability calculator.",
        "GSTR-2B Input Tax Credit (ITC) eligibility & supplier filing auditor."
    ]
    for b in g_bullets:
        pb = tf1.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(13)
        pb.font.color.rgb = C_SLATE
        pb.space_before = Pt(12)

    c2 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.2))
    c2.fill.solid()
    c2.fill.fore_color.rgb = C_WHITE
    c2.line.color.rgb = RGBColor(226, 232, 240)
    tf2 = c2.text_frame
    tf2.word_wrap = True
    tf2.margin_left = tf2.margin_top = Inches(0.3)
    p = tf2.paragraphs[0]
    p.text = "💰 Tax Deducted at Source (TDS)"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = C_DARK

    t_bullets = [
        "Section 194C (Contractors): 1% / 2% rate application.",
        "Section 194J (Professional & Technical Fees): 10% rate application.",
        "Cumulative Vendor Limit Monitor: Alerts when annual payments cross statutory thresholds.",
        "Quarterly Challan Tracker: Automated Q1/Q2/Q3/Q4 deduction summary."
    ]
    for b in t_bullets:
        pb = tf2.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(13)
        pb.font.color.rgb = C_SLATE
        pb.space_before = Pt(12)

    # ==========================================
    # SLIDE 7: Financial Control & Reporting
    # ==========================================
    slide7 = prs.slides.add_slide(blank_layout)
    add_header(slide7, "Financial Control & Certified Reporting", "FINANCIAL STATEMENTS")

    box1 = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(11.7), Inches(2.4))
    box1.fill.solid()
    box1.fill.fore_color.rgb = RGBColor(239, 246, 255)
    box1.line.color.rgb = RGBColor(191, 219, 254)
    tf = box1.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = Inches(0.3)
    p = tf.paragraphs[0]
    p.text = "⚖️ Dynamic Balance Sheet Verification"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = C_BLUE
    
    p2 = tf.add_paragraph()
    p2.text = "Equality Check Formula: Total Assets (₹68.4L) = Total Liabilities (₹24.5L) + Total Equity (₹43.9L)\nAutomatically verified on every ledger entry with green audit mark."
    p2.font.size = Pt(14)
    p2.font.color.rgb = C_DARK
    p2.space_before = Pt(8)

    box2 = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.3), Inches(11.7), Inches(2.5))
    box2.fill.solid()
    box2.fill.fore_color.rgb = C_WHITE
    box2.line.color.rgb = RGBColor(226, 232, 240)
    tf = box2.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = Inches(0.3)
    p = tf.paragraphs[0]
    p.text = "📈 Executive Profit & Loss Statement"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = C_DARK
    
    p2 = tf.add_paragraph()
    p2.text = "Revenue from Operations (YTD): ₹45,20,000 | Gross Profit: ₹27,00,000 | Operating Expenses: ₹8,50,000\nNet Income After Tax: ₹15,17,000 (Synthesized directly from immutable ledgers)."
    p2.font.size = Pt(14)
    p2.font.color.rgb = C_SLATE
    p2.space_before = Pt(8)

    # ==========================================
    # SLIDE 8: Codex Integration & Tools
    # ==========================================
    slide8 = prs.slides.add_slide(blank_layout)
    add_header(slide8, "OpenAI Codex Integration & Custom Tools", "DEVELOPER PRODUCTIVITY")

    box = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(11.7), Inches(5.2))
    box.fill.solid()
    box.fill.fore_color.rgb = C_WHITE
    box.line.color.rgb = RGBColor(226, 232, 240)
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = Inches(0.3)
    
    p = tf.paragraphs[0]
    p.text = "🛠️ Codex Code Manipulation & Search Suite (tools/)"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = C_BLUE

    tool_items = [
        "codex_tools.py SDK: High-performance functions for searching, replacing text, inserting lines, and parsing file outlines.",
        "cli.py Wrapper: CLI utilities for automated agent code editing (python tools/cli.py find|replace|add-line|outline).",
        "100% Test Coverage: 6 passing automated unit tests in test_codex_tools.py.",
        "Agentic Self-Healing: Allows agents to safely inspect AST symbols and update configuration files."
    ]
    for item in tool_items:
        pb = tf.add_paragraph()
        pb.text = "• " + item
        pb.font.size = Pt(14)
        pb.font.color.rgb = C_DARK
        pb.space_before = Pt(14)

    # ==========================================
    # SLIDE 9: Roadmap & Future Vision
    # ==========================================
    slide9 = prs.slides.add_slide(blank_layout)
    add_header(slide9, "Product Roadmap & Enterprise Scale", "FUTURE MILESTONES")

    phases = [
        ("Phase 1: Hackathon MVP", "Completed", "10 AI Agents, Double-Entry Engine, GST/TDS calculation, Light Grey & Trust Blue UX", C_EMERALD),
        ("Phase 2: Post-Hackathon", "Q3 2026", "Direct GST Portal Sandbox APIs, Account Aggregator live bank feeds, Automated Inventory", C_BLUE),
        ("Phase 3: Enterprise Scale", "Q4 2026 - Q1 2027", "Custom ICAI LLM fine-tuning, CA Multi-Firm Client Portal, Predictive Working Capital Credit", C_DARK)
    ]
    for i, (p_title, p_time, p_desc, p_color) in enumerate(phases):
        p_box = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6 + i*1.7), Inches(11.7), Inches(1.4))
        p_box.fill.solid()
        p_box.fill.fore_color.rgb = C_WHITE
        p_box.line.color.rgb = RGBColor(226, 232, 240)
        
        tf = p_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = Inches(0.25)
        
        p = tf.paragraphs[0]
        p.text = f"{p_title} ({p_time})"
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = p_color

        p2 = tf.add_paragraph()
        p2.text = p_desc
        p2.font.size = Pt(13)
        p2.font.color.rgb = C_SLATE
        p2.space_before = Pt(4)

    # ==========================================
    # SLIDE 10: Conclusion & Call to Action
    # ==========================================
    slide10 = prs.slides.add_slide(blank_layout)
    
    bg10 = slide10.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg10.fill.solid()
    bg10.fill.fore_color.rgb = C_DARK
    bg10.line.fill.background()

    t_box10 = slide10.shapes.add_textbox(Inches(1.2), Inches(2.0), Inches(11.0), Inches(4.0))
    tf10 = t_box10.text_frame
    tf10.word_wrap = True
    
    p0 = tf10.paragraphs[0]
    p0.text = "VYAPAR MANDAP"
    p0.font.size = Pt(44)
    p0.font.bold = True
    p0.font.color.rgb = C_WHITE
    p0.font.name = "Inter"

    p1 = tf10.add_paragraph()
    p1.text = "Experience the Future of Multi-Agent AI Double-Entry Accounting"
    p1.font.size = Pt(22)
    p1.font.color.rgb = RGBColor(191, 219, 254)
    p1.font.name = "Inter"
    p1.space_before = Pt(14)

    p2 = tf10.add_paragraph()
    p2.text = "GitHub Repository: https://github.com/Abhitech-st/Vyapar-Mandap.git\nWeb Dashboard: http://localhost:3000 | FastAPI API: http://127.0.0.1:8000"
    p2.font.size = Pt(15)
    p2.font.color.rgb = RGBColor(226, 232, 240)
    p2.font.name = "Inter"
    p2.space_before = Pt(28)

    output_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "Vyapar_Mandap_Presentation.pptx")
    prs.save(output_path)
    print(f"Successfully generated presentation at: {output_path}")

if __name__ == "__main__":
    create_presentation()
