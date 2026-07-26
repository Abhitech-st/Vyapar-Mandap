# Screen-by-Screen UI Specification - Vyapar Mandap

## 1. Dashboard (`Dashboard.tsx`)
- **Top Row**: 4 KPI Cards (Revenue YTD ₹45.2L, Expenses YTD ₹18.5L, GST Liability ₹2.45L, Net Cash Runway 22.8 Mo).
- **Middle Left**: Linear-style AI Agent Activity Ticker.
- **Middle Right**: Business Health Score Gauge (92/100) & Pending Human Approvals Queue card.

## 2. Invoices & Bills (`Invoices.tsx`)
- Drag-and-Drop file upload zone supporting multi-page PDFs and images.
- Document directory table displaying vendor name, GSTIN, AI confidence score, and status.
- **Split-Screen Review Modal**: Document Viewer canvas on left; Extracted JSON fields + AI reasoning + proposed double-entry journal entry ($Dr. Expense / Cr. Vendor$) on right with 1-click **Approve & Post**.

## 3. Banking & Reconciliation (`Banking.tsx`)
- Dual-column bank transaction statement lines vs payment vouchers matcher.
- Match score badges (Auto-Matched 98%, Review Required 76%, Unmatched).

## 4. Accounting & Ledger Explorer (`Accounting.tsx`)
- Sub-tab toggle between **Journal Entries Log** and **Chart of Accounts Tree**.
- Manual journal entry poster with live $Debits = Credits$ balance check indicator.

## 5. GST & TDS Filing (`GstTds.tsx`)
- Summary cards for GSTR-1, GSTR-3B liability, and Input Tax Credit (ITC).
- GSTR-2B ITC matching table with supplier filing status.
- TDS Section 194C / 194J tracker.

## 6. Financial Reports (`Reports.tsx`)
- Certified Profit & Loss Statement.
- Balance Sheet with dynamic $Assets = Liabilities + Equity$ check mark.

## 7. AI Copilot Workspace (`AiCopilot.tsx`)
- Natural language AI Assistant chat interface.
- 10-Agent deployment directory and status monitor.

## 8. Settings (`Settings.tsx`)
- Business entity profile, GST setup, and human-in-the-loop safety thresholds.
