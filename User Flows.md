# User Journey Flows - Vyapar Mandap

## 🔗 Related Knowledge Nodes
- Interface Views: [[Pages]], [[UI Components]]
- Intelligence Layer: [[AI Agents]]
- Ledger Integrity: [[Database Schema]]
- System Requirements: [[Requirements]]

---

## 1. Journey 1: Uploading, Validating & Posting an Invoice

```
┌─────────────┐     ┌────────────────┐     ┌─────────────────┐
│ User uploads│────►│ Invoice Agent  │────►│ GST Agent       │
│ PDF bill    │     │ OCR extraction │     │ validates GSTIN │
└─────────────┘     └────────────────┘     └────────┬────────┘
                                                    │
┌─────────────┐     ┌────────────────┐              │
│ Immutable   │◄────│ Human clicks   │◄─────────────┘
│ Ledger Post │     │ Approve & Post │  Proposes Double-Entry
└─────────────┘     └────────────────┘  Journal Draft
```

1. **Upload**: User drags and drops a vendor PDF invoice into the upload zone ([[Pages]]).
2. **OCR Parsing**: [[AI Agents]] scan file, extract Vendor, GSTIN (`27AABCA1234F1Z5`), line items, and taxes (Subtotal ₹40,000 + CGST ₹3,600 + SGST ₹3,600 = ₹47,200).
3. **Tax & Ledger Mapping**: GST Agent checks GSTIN validity; Ledger Agent constructs double-entry draft journal (#JE-402) in [[Database Schema]].
4. **Human Review**: Notification alerts user; user opens split-screen review modal to inspect AI reasoning.
5. **Commit**: User clicks "Approve & Post". Journal entry is written immutably to database, updating dashboard metrics instantly.

---

## 2. Journey 2: Bank Statement Reconciliation

1. **Upload**: User uploads bank CSV / MT940 file for HDFC Current A/c 4092.
2. **Matching Engine**: [[AI Agents]] compare amounts, dates, and descriptions against recorded payment vouchers using fuzzy logic.
3. **Queue Classification**: Transactions $>90\%$ confidence auto-match; transactions between $70-89\%$ land in the Review Queue.
4. **Confirmation**: User reviews ambiguous matches and clicks "Confirm Match" with 1 click.
