# Database Schema - Vyapar Mandap

Vyapar Mandap utilizes a 3NF normalized relational schema supporting multi-tenant isolation via `organization_id`.

---

## 🔗 Related Knowledge Nodes
- Functional Specifications: [[Requirements]], [[Product Vision]]
- API Layer: [[API Contracts]]
- Intelligent Operators: [[AI Agents]]
- Engineering Core: [[Tech Stack]], [[CODEX_ARCHITECTURE]]

---

## Entity Relationship Summary

```
[organizations] 1 ----- * [users]
[organizations] 1 ----- * [clients]
[organizations] 1 ----- * [vendors]
[organizations] 1 ----- * [ledger_accounts]
[organizations] 1 ----- * [invoices]
[organizations] 1 ----- * [bank_statements]
[organizations] 1 ----- * [journal_entries]
[organizations] 1 ----- * [reports]

[invoices] 1 ----- * [invoice_items]
[invoices] 0..1 ----- 1 [gst_records]
[invoices] 0..1 ----- 1 [tds_records]
[invoices] 1 ----- * [journal_entries]

[bank_statements] 1 ----- * [bank_transactions]
[bank_transactions] 0..1 ----- 1 [payments]

[journal_entries] 1 ----- * [journal_entry_lines]
[journal_entries] 1 ----- * [audit_logs]

[agent_tasks] 1 ----- * [agent_logs]
```

---

## Table Definitions (22 Tables)

1. `organizations`: Root entity (id, legal_name, trade_name, gstin, pan, state_code, currency).
2. `users`: System users (id, organization_id, email, password_hash, full_name, role).
3. `roles`: RBAC definitions (id, name, permissions_json).
4. `clients`: Customer directory (id, organization_id, name, gstin, credit_limit).
5. `vendors`: Supplier directory (id, organization_id, name, gstin, pan, tds_section, tds_rate).
6. `ledger_accounts`: Chart of Accounts (id, organization_id, code, name, account_type, sub_type, balance).
7. `documents`: File uploads metadata (id, organization_id, file_name, mime_type, s3_key).
8. `invoices`: Header parsed invoice records (id, organization_id, vendor_id, invoice_number, subtotal, tax_total, grand_total, status, ai_confidence) - Processed by [[AI Agents]].
9. `invoice_items`: Invoice line items (id, invoice_id, description, hsn_sac_code, quantity, unit_price, tax_rate, total_amount).
10. `journal_entries`: Double-entry master headers (id, organization_id, invoice_id, entry_number, entry_date, narration, status, is_immutable) - Driven by [[User Flows]].
11. `journal_entry_lines`: Line-item debits and credits (id, journal_entry_id, ledger_account_id, debit, credit).
12. `gst_records`: GST return tracking (id, organization_id, invoice_id, gstin, return_period, taxable_value, cgst, sgst, igst, itc_status).
13. `tds_records`: TDS deduction tracking (id, organization_id, vendor_id, section_code, base_amount, tds_rate, tds_amount).
14. `bank_statements`: Uploaded bank statement headers (id, organization_id, bank_name, account_number).
15. `bank_transactions`: Parsed bank lines (id, bank_statement_id, transaction_date, description, amount, transaction_type, matched_status).
16. `payments`: Payment matching vouchers (id, organization_id, invoice_id, bank_transaction_id, amount).
17. `reports`: Cached P&L / Balance Sheet snapshots (id, organization_id, report_type, payload_json) - Exposed in [[Pages]].
18. `notifications`: Alert notifications (id, organization_id, title, message, type, is_read).
19. `agent_tasks`: Multi-agent task execution graphs (id, organization_id, agent_name, task_type, status).
20. `agent_logs`: Step-by-step execution traces (id, agent_task_id, step_name, log_level, message).
21. `audit_logs`: Immutable security mutation logs (id, organization_id, user_id, action, entity_type, entity_id).
22. `ai_conversations`: RAG chat history and vector memory (id, organization_id, user_id, messages_json).
