# API Contracts Specification - Vyapar Mandap

Built with FastAPI (Python 3.11+). All endpoints return JSON and use standard HTTP status codes.

---

## 🔗 Related Knowledge Nodes
- Schema Core: [[Database Schema]]
- Agent Pipeline: [[AI Agents]]
- User Interface: [[Pages]], [[UI Components]]
- Technology Stack: [[Tech Stack]]

---

## 🔐 Authentication Router (`/api/v1/auth`)

### `POST /api/v1/auth/login`
- **Request Payload**:
  ```json
  { "email": "ca.sharma@vyapar.in", "password": "demo_password" }
  ```
- **Response (200 OK)**:
  ```json
  {
    "access_token": "demo-jwt-token-vyapar-2026",
    "token_type": "bearer",
    "user": {
      "id": "u-101",
      "full_name": "John Sharma (CA)",
      "role": "CA",
      "organization_name": "M/S Sharma Traders"
    }
  }
  ```

---

## 📄 Invoices Router (`/api/v1/invoices`)

### `GET /api/v1/invoices`
- **Response (200 OK)**: List of invoice summary objects for [[Pages]].

### `POST /api/v1/invoices/upload`
- **Request**: `multipart/form-data` with `file: UploadFile`.
- **Response**: Extracted invoice fields + AI confidence score from [[AI Agents]].

### `POST /api/v1/invoices/{id}/approve`
- **Response**: Commits double-entry journal entry immutably as described in [[User Flows]].

---

## 📚 Ledger & Journals Router (`/api/v1/journals`)

### `GET /api/v1/journals`
- **Response**: List of immutable journal entries with line-item debits and credits.

### `GET /api/v1/journals/accounts`
- **Response**: Hierarchical Chart of Accounts list with balances.

---

## 🧾 GST & TDS Routers (`/api/v1/gst`, `/api/v1/tds`)

### `GET /api/v1/gst/summary?period=2026-07`
- **Response**: Taxable value, CGST, SGST, IGST, total ITC claimed, and GSTR-2B mismatch count.

---

## 📊 Financial Reports Router (`/api/v1/reports`)

### `GET /api/v1/reports/profit-loss`
### `GET /api/v1/reports/balance-sheet`
- **Response**: Balance Sheet payload with `is_balanced: true` check badge.

---

## 🤖 AI Copilot & WebSockets (`/api/v1/ai`, `/ws/ai/stream`)

### `POST /api/v1/ai/chat`
- **Request**: `{ "query": "What is my GST liability for July?" }`
- **Response**: Natural language response synthesized from DB state ([[Prompts]]).

### `WS /ws/ai/stream`
- Streaming WebSocket endpoint emitting live JSON agent step events for [[UI Components]].
