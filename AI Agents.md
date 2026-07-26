# AI Multi-Agent Engine Architecture - Vyapar Mandap

Vyapar Mandap uses a decoupled, event-driven multi-agent graph architecture.

---

## 🔗 Related Knowledge Nodes
- Vision & System Architecture: [[Product Vision]], [[CODEX_ARCHITECTURE]]
- Data Persistence: [[Database Schema]]
- API Endpoints: [[API Contracts]]
- System Instructions: [[Prompts]]
- Operational Flows: [[User Flows]]

---

```
                  ┌──────────────────────┐
                  │   Supervisor Agent   │
                  └──────────┬───────────┘
                             │
       ┌───────────┬─────────┴─────────┬───────────┐
       │           │                   │           │
┌──────▼─────┐ ┌───▼────────┐   ┌──────▼─────┐ ┌───▼────────┐
│  Invoice   │ │   Ledger   │   │    GST     │ │    TDS     │
│   Agent    │ │   Agent    │   │   Agent    │ │   Agent    │
└────────────┘ └────────────┘   └────────────┘ └────────────┘
       │           │                   │           │
       └───────────┼───────────────────┴───────────┘
                   │
         ┌─────────▼────────┐
         │ Human Approval   │
         │   Checkpoint     │
         └─────────┬────────┘
                   │
         ┌─────────▼────────┐
         │ PostgreSQL Core  │
         └──────────────────┘
```

---

## Agent Roster & Specifications

1. **Supervisor Agent**: Classifies incoming tasks, orchestrates execution graphs, logs step traces in `agent_logs`, breaks circular failure loops, and halts execution for Human Sign-off ([[User Flows]]).
2. **Invoice Agent**: Runs Vision OCR engines on document streams, parses vendor, line items, and taxes, and checks duplicate file hashes. Flags confidence $<0.85$ ([[Prompts]]).
3. **Ledger Agent**: Maps extracted document items to Chart of Accounts (COA) and creates balanced double-entry draft vouchers ($Debits = Credits$) ([[Database Schema]]).
4. **GST Agent**: Validates GSTIN status against GSTN registry, calculates CGST/SGST/IGST splits, and maps invoices to GSTR-1 and GSTR-3B filings.
5. **TDS Agent**: Applies tax deduction rules (Section 194C / 194J) based on cumulative vendor payment thresholds.
6. **Bank Reconciliation Agent**: Executes fuzzy string matching and sliding date window logic to match bank lines against ledger payments.
7. **Compliance Agent**: Audits books for statutory deadline risks, compliance score (0-100), and missing filings.
8. **Reporting Agent**: Aggregates trial balance lines into certified Profit & Loss and Balance Sheet statements ([[Pages]]).
9. **Notification Agent**: Broadcasts real-time alert push messages and WebSocket logs to the React client UI ([[UI Components]]).
10. **Analytics Agent**: Computes Business Health Score (92/100), monthly burn rates, and cash runway projections.
