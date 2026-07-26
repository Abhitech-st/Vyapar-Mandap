import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # ========== DESIGN TOKENS (Polished SaaS Palette) ==========
    C_EMERALD = RGBColor(16, 185, 129)   # Success/Growth
    C_NAVY = RGBColor(15, 23, 42)        # Deep text
    C_INDIGO = RGBColor(79, 70, 229)     # Primary Brand
    C_WHITE = RGBColor(255, 255, 255)
    C_BG_GRAY = RGBColor(243, 244, 246)   # Subtle grey for slides
    C_CARD_BG = RGBColor(255, 255, 255)
    C_BORDER = RGBColor(226, 232, 240)   # Subtle borders
    C_TEXT_MUTED = RGBColor(107, 114, 128) 
    C_ACCENT_RED = RGBColor(239, 68, 68) 
    C_ACCENT_BLUE = RGBColor(59, 130, 246) 
    
    # Better Shadow Color (Solid dark grey instead of transparent alpha)
    SHADOW_COLOR = RGBColor(230, 230, 230)
    
    SPACING = Inches(0.8) # Increased margin for better breathing room

    # Helper: Create a realistic drop shadow
    def add_drop_shadow(slide, x, y, width, height):
        shadow = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, width, height)
        shadow.fill.solid()
        shadow.fill.fore_color.rgb = SHADOW_COLOR
        shadow.line.fill.background()
        return shadow

    # Helper: Robust Image Insertion
    def add_image_placeholder(slide, image_path, x, y, width, height, caption=""):
        try:
            if os.path.exists(image_path):
                pic = slide.shapes.add_picture(image_path, x, y, width=width, height=height)
                
                if caption:
                    txBox = slide.shapes.add_textbox(Inches(x), Inches(y) + Inches(height), Inches(width), Inches(0.6))
                    tf = txBox.text_frame
                    tf.text = caption
                    p = tf.paragraphs[0]
                    p.alignment = PP_ALIGN.CENTER
                    p.font.size = Pt(9)
                    p.font.color.rgb = C_TEXT_MUTED
                    p.font.italic = True
            else:
                # Draw a stylized placeholder
                shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, width, height)
                shape.fill.solid()
                shape.fill.fore_color.rgb = RGBColor(241, 245, 249)
                shape.line.color.rgb = RGBColor(203, 213, 225)
                shape.line.width = Pt(1)
                
                # Add icon text
                txBox = slide.shapes.add_textbox(Inches(x)+Inches(1), Inches(y)+Inches(1), width-Inches(2), height-Inches(2))
                tf = txBox.text_frame
                tf.text = "[Dashboard Preview Image]"
                p = tf.paragraphs[0]
                p.font.size = Pt(14)
                p.font.color.rgb = C_TEXT_MUTED
                p.alignment = PP_ALIGN.CENTER
        except Exception as e:
            print(f"Warning: Image load failed at {image_path}")

    # Helper: Add "Interactive" Button Style
    def add_button(slide, text, x, y, width, height, color=C_INDIGO):
        btn = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, width, height)
        btn.fill.solid()
        btn.fill.fore_color.rgb = color
        btn.line.color.rgb = color
        btn.line.width = Pt(0)
        
        txBox = slide.shapes.add_textbox(x + Inches(0.5), y, width - Inches(1), height)
        tf = txBox.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = text
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER
        return btn

    blank = prs.slide_layouts[6]

    def add_header(slide, title, subtitle, accent_color=C_INDIGO):
        # Subtle Background Bar
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(5))
        bar.fill.solid()
        bar.fill.fore_color.rgb = C_BG_GRAY
        bar.line.fill.background()

        # Text Container
        header_box = slide.shapes.add_textbox(Inches(1.0), Inches(0.4), Inches(11.33), Inches(1.5))
        tf = header_box.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(32)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.font.name = "Segoe UI"
        
        if subtitle:
            p2 = tf.add_paragraph()
            p2.text = subtitle
            p2.font.size = Pt(16)
            p2.font.color.rgb = C_TEXT_MUTED
            p2.font.name = "Segoe UI"

    # ==========================================
    # SLIDE 1: Hero
    # ==========================================
    slide1 = prs.slides.add_slide(blank)
    add_header(slide1, "VYAPAR MANDAP", "The AI Revolution in Indian Accounting", C_INDIGO)
    
    # Left: Text
    left_col = slide1.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(5.5), Inches(4.5))
    tf = left_col.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Experience the future of bookkeeping.\n\nDouble-entry precision meets Artificial Intelligence."
    p.font.size = Pt(20)
    p.font.color.rgb = C_NAVY
    p.space_after = Pt(20)
    
    # Button
    add_button(slide1, "Start Free Demo", Inches(1.0), Inches(5.8), Inches(3.0), Inches(0.7), C_EMERALD)

    # Right: Image
    add_image_placeholder(slide1, "images/dashboard_preview.png", Inches(7.0), Inches(1.8), Inches(5.5), Inches(4.5), "Live Dashboard Preview")

    # ==========================================
    # SLIDE 2: The Problem
    # ==========================================
    slide2 = prs.slides.add_slide(blank)
    add_header(slide2, "The Manual Trap", "Why current MSME tools fail", C_ACCENT_RED)
    
    # Alert Box
    alert = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.73), Inches(0.8))
    alert.fill.solid()
    alert.fill.fore_color.rgb = RGBColor(254, 242, 242)
    alert.line.color.rgb = RGBColor(254, 202, 202)
    
    tf_alert = alert.text_frame
    tf_alert.text = "[!] 63+ Million Indian Businesses lose 200+ hours annually due to manual invoice errors and GST discrepancies."
    tf_alert.paragraphs[0].font.size = Pt(13)
    tf_alert.paragraphs[0].font.bold = True
    tf_alert.paragraphs[0].font.color.rgb = C_ACCENT_RED

    # Problem Cards
    issues = [
        ("Manual Entry Fatigue", "Hours spent copying data from PDF to Excel", C_ACCENT_RED),
        ("GST Errors", "Missing ITC leads to 18% cash loss", C_ACCENT_RED),
        ("Audit Nightmare", "Unorganized ledgers cause tax notices", C_ACCENT_RED)
    ]
    
    for i, (title, desc, col) in enumerate(issues):
        y_pos = Inches(2.7) + (i * 1.5)
        # Shadow
        add_drop_shadow(slide2, Inches(0.8), y_pos, Inches(11.73), Inches(1.3))
        
        # Card Body
        card = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y_pos, Inches(11.73), Inches(1.3))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER
        
        # Color Strip
        strip = slide2.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), y_pos, Pt(4), Inches(1.3))
        strip.fill.solid()
        strip.fill.fore_color.rgb = col
        strip.line.fill.background()
        
        # Text
        tx = slide2.shapes.add_textbox(Inches(1.2), y_pos + Inches(0.15), Inches(11.33), Inches(1.0))
        tf = tx.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        
        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = C_TEXT_MUTED

    # ==========================================
    # SLIDE 3: The Solution (Pillars)
    # ==========================================
    slide3 = prs.slides.add_slide(blank)
    add_header(slide3, "The Promise", "Four pillars of accounting integrity", C_INDIGO)
    
    pillars = [
        ("Vision OCR", "99% Accurate Invoice Parsing", ["Gemini 2.5 Vision", "Auto-Field Extraction"]),
        ("Double-Entry Core", "Strict Dr = Cr Enforcement", ["Zero Balance Violations", "Immutable Records"]),
        ("Human Sign-off", "CA Verified Ledger", ["Split Screen Review", "Audit Trail"]),
        ("GST/TDS Engine", "Automated Compliance", ["Real-time GSTR", "Section 194C/J Track"])
    ]
    
    for i, (title, sub, feats) in enumerate(pillars):
        col = i % 2
        row = i // 2
        y = Inches(2.2) + row * 2.5
        x = Inches(0.8) + (col * 6.2)
        
        # Shadow
        add_drop_shadow(slide3, x, y, Inches(5.7), Inches(2.2))
        
        # Main Card
        card = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.7), Inches(2.2))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER
        
        # Top Bar
        top_bar = slide3.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, Inches(5.7), Pt(4))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = C_INDIGO
        top_bar.line.fill.background()
        
        # Text
        tx = slide3.shapes.add_textbox(x + Inches(0.4), y + Inches(0.2), Inches(4.9), Inches(1.8))
        tf = tx.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        
        p2 = tf.add_paragraph()
        p2.text = sub
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_INDIGO
        p2.space_after = Pt(4)
        
        for feat in feats:
            p3 = tf.add_paragraph()
            p3.text = f"- {feat}"
            p3.font.size = Pt(10)
            p3.font.color.rgb = C_TEXT_MUTED

    # ==========================================
    # SLIDE 4: Workflow
    # ==========================================
    slide4 = prs.slides.add_slide(blank)
    add_header(slide4, "The Golden Path", "From PDF to Profit in 4 steps", C_EMERALD)
    
    steps = [
        ("1. Upload", "Ingest PDF/Receipt", ["SHA256 Hash", "Auto-Detect"]),
        ("2. AI Parse", "Extract & Validate", ["98%+ Accuracy", "GSTIN Check"]),
        ("3. Human Review", "CA Approvals", ["Split View", "Audit Log"]),
        ("4. Commit", "Immutable Ledger", ["Dr=Cr", "Reports Ready"])
    ]
    
    y_pos = Inches(2.0)
    
    for i, (num, title, sub) in enumerate(steps):
        x_pos = Inches(0.5) + (i * 3.2)
        
        # Shadow
        add_drop_shadow(slide4, x_pos, y_pos, Inches(3.0), Inches(4.5))
        
        # Card
        card = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, y_pos, Inches(3.0), Inches(4.5))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER
        
        # Number Badge
        badge = slide4.shapes.add_shape(MSO_SHAPE.OVAL, x_pos + Inches(1.25), y_pos + Inches(0.3), Inches(0.5), Inches(0.5))
        badge.fill.solid()
        badge.fill.fore_color.rgb = C_EMERALD
        badge.line.fill.background()
        
        # Text Box
        tx = slide4.shapes.add_textbox(x_pos + Inches(0.2), y_pos + Inches(1.0), Inches(2.6), Inches(3.2))
        tf = tx.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(18)
        p.font.bold = True
        p.font.color.rgb = C_EMERALD
        
        p2 = tf.add_paragraph()
        p2.text = sub[0]
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_TEXT_MUTED
        p2.space_after = Pt(8)
        
        p3 = tf.add_paragraph()
        p3.text = sub[1]
        p3.font.size = Pt(11)
        p3.font.color.rgb = C_TEXT_MUTED

    # ==========================================
    # SLIDE 5: Architecture
    # ==========================================
    slide5 = prs.slides.add_slide(blank)
    add_header(slide5, "System Architecture", "Production-Ready Decoupled Stack", C_INDIGO)
    
    layers = [
        ("Frontend", "React 18 • Vite • Tailwind • WebSocket Client"),
        ("API Layer", "FastAPI • Pydantic v2 • Async Endpoints"),
        ("AI Engine", "Google Gemini 2.5 Flash • Vision OCR • Prompt Caching"),
        ("Database", "PostgreSQL 16 • 22 ORM Models • Immutable Ledger"),
        ("Storage", "S3 Document Buckets • Redis Queues")
    ]
    
    for i, (layer, tech) in enumerate(layers):
        y = Inches(1.8) + i * 1.05
        add_drop_shadow(slide5, Inches(0.8), y, Inches(11.7), Inches(0.9))
        
        box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(11.7), Inches(0.9))
        box.fill.solid()
        box.fill.fore_color.rgb = C_CARD_BG
        box.line.color.rgb = C_BORDER
        
        # Strip
        strip = slide5.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), y, Pt(4), Inches(0.9))
        strip.fill.solid()
        strip.fill.fore_color.rgb = C_INDIGO
        strip.line.fill.background()
        
        # Text
        tx = slide5.shapes.add_textbox(Inches(1.2), y + Inches(0.1), Inches(11.0), Inches(0.7))
        tf = tx.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = layer
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        
        p2 = tf.add_paragraph()
        p2.text = tech
        p2.font.size = Pt(10)
        p2.font.color.rgb = C_TEXT_MUTED

    # ==========================================
    # SLIDE 6: The 10 Agents
    # ==========================================
    slide6 = prs.slides.add_slide(blank)
    add_header(slide6, "10 Specialized Agents", "Modular Reasoning Engine", C_INDIGO)
    
    agents = [
        ("Supervisor", "Orchestrator"),
        ("Invoice Agent", "OCR & HSN"),
        ("Ledger Agent", "Dr/Cr Enforcement"),
        ("GST Agent", "GSTR-2B"),
        ("TDS Agent", "Threshold"),
        ("Bank Rec", "Matching"),
        ("Compliance", "Calendar"),
        ("Reporting", "P&L"),
        ("Notifications", "Events"),
        ("Analytics", "Health")
    ]
    
    cols = 5
    for i, (name, desc) in enumerate(agents):
        col = i % cols
        row = i // cols
        x = Inches(0.5) + (col * 2.5)
        y = Inches(2.0) + (row * 2.2)
        
        add_drop_shadow(slide6, x, y, Inches(2.3), Inches(2.0))
        
        card = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(2.3), Inches(2.0))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER
        
        # Icon Placeholder
        icon = slide6.shapes.add_shape(MSO_SHAPE.RECTANGLE, x + Inches(0.5), y + Inches(0.2), Inches(1.3), Inches(1.0))
        icon.fill.solid()
        icon.fill.fore_color.rgb = RGBColor(243, 244, 246)
        icon.line.fill.background()
        
        # Text
        tx = slide6.shapes.add_textbox(x + Inches(0.1), y + Inches(1.3), Inches(2.1), Inches(0.6))
        tf = tx.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = name
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        
        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(9)
        p2.font.color.rgb = C_TEXT_MUTED

    # ==========================================
    # SLIDE 7: Roadmap
    # ==========================================
    slide7 = prs.slides.add_slide(blank)
    add_header(slide7, "Strategic Roadmap", "Scaling from MVP to Enterprise", C_EMERALD)
    
    milestones = [
        ("Phase 1: MVP (Now)", "10 Agents • Double-Entry • GST/TDS", C_EMERALD, "Done"),
        ("Phase 2: Q3 2026", "GSTN API • Bank Feeds • Inventory", C_INDIGO, "In Progress"),
        ("Phase 3: 2027", "ICAI LLM • Multi-Firm Portal", C_ACCENT_BLUE, "Planned")
    ]
    
    timeline_y = Inches(2.5)
    
    for i, (title, desc, color, status) in enumerate(milestones):
        x_pos = Inches(0.5) + (i * 4.2)
        
        add_drop_shadow(slide7, x_pos, Inches(2.4), Inches(3.9), Inches(4.0))
        
        card = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, Inches(2.4), Inches(3.9), Inches(4.0))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_BORDER
        
        # Status Badge
        badge = slide7.shapes.add_shape(MSO_SHAPE.RECTANGLE, x_pos + Inches(0.3), Inches(2.6), Inches(1.4), Inches(0.4))
        badge.fill.solid()
        badge.fill.fore_color.rgb = RGBColor(220, 252, 231)
        badge.line.color.rgb = RGBColor(134, 239, 172)
        badge.text_frame.text = status
        badge.text_frame.paragraphs[0].font.size = Pt(9)
        badge.text_frame.paragraphs[0].font.bold = True
        badge.text_frame.paragraphs[0].font.color.rgb = C_EMERALD
        
        # Text
        tx = slide7.shapes.add_textbox(x_pos + Inches(0.3), Inches(3.2), Inches(3.3), Inches(3.0))
        tf = tx.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        
        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_TEXT_MUTED
        p2.space_before = Pt(8)

    # ==========================================
    # SLIDE 8: Final CTA
    # ==========================================
    slide8 = prs.slides.add_slide(blank)
    
    # Background
    bg = slide8.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = C_INDIGO
    bg.line.fill.background()
    
    # Center Content
    tx = slide8.shapes.add_textbox(Inches(2.0), Inches(1.8), Inches(9.33), Inches(3.5))
    tf = tx.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = "Ready to transform your business accounting?"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.alignment = PP_ALIGN.CENTER
    
    p2 = tf.add_paragraph()
    p2.text = "Join the 10,000+ MSMEs automating their books with Vyapar Mandap."
    p2.font.size = Pt(18)
    p2.font.color.rgb = C_WHITE
    p2.alignment = PP_ALIGN.CENTER
    p2.space_before = Pt(16)
    
    # Call to Action Button
    add_button(slide8, "Book a Demo", Inches(4.5), Inches(5.2), Inches(4.33), Inches(0.8), C_EMERALD)

    # Save
    output_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target_path = os.path.join(output_dir, "Vyapar_Mandap_Modern.pptx")
    try:
        prs.save(target_path)
        print(f"[OK] Modern Interactive Presentation created: {target_path}")
        print("[INFO] Tip: Insert your screenshots into the 'images' folder for the best effect.")
    except PermissionError:
        fallback = os.path.join(output_dir, "Vyapar_Mandap_Modern_v2.pptx")
        prs.save(fallback)
        print(f"[INFO] File locked. Saved to: {fallback}")

if __name__ == "__main__":
    create_presentation()
