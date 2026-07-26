# Product Vision - Vyapar Mandap

## Executive Summary
**Vyapar Mandap** is structured as a decoupled, asynchronous, event-driven, multi-agent AI SaaS platform. It bridges unstructured financial inputs (PDF vendor bills, scanned receipts, messy bank CSV dumps, natural language queries) with deterministic, mathematically immutable double-entry accounting cores tailored for Indian accounting standards (GST, TDS, HSN/SAC codes).

---

## 🎯 The Core Problem
Indian businesses and Chartered Accountants (CAs) spend hundreds of hours manually parsing vendor bills, verifying GSTIN statuses on the GST portal, matching Input Tax Credit (ITC) against GSTR-2B, calculating TDS under sections 194C/194J, and reconciling bank statement dumps line-by-line. Standard accounting software requires manual entry, while naive LLM tools hallucinate financial numbers.

## 💡 The Solution
Vyapar Mandap combines **Vision OCR + 10 Specialized AI Agents** with a **Deterministic Double-Entry Ledger Engine**. 

1. **Unstructured to Structured**: PDF invoices are extracted with high precision.
2. **Deterministic Compliance**: Tax splits (CGST/SGST/IGST), HSN codes, and TDS rates are calculated mathematically, not guessed by AI.
3. **Human-in-the-Loop Safeguard**: No AI action posts directly to the immutable ledger without a 1-click human sign-off.
4. **Modern Linear-Style UX**: Sleek Slate dark mode interface with real-time agent activity tickers and global `Cmd+K` command palette.

---

## 👥 Target Audience
- **Chartered Accountants (CAs)** managing multi-firm client books.
- **Indian Small & Medium Businesses (SMBs)** seeking automated GST and TDS compliance.
- **Enterprise Finance Teams** needing automated bank reconciliation and real-time P&L / Balance Sheet reporting.
