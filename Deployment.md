# Deployment & Infrastructure Guide - Vyapar Mandap

## 🔗 Related Knowledge Nodes
- System Architecture: [[Tech Stack]], [[Folder Structure]]
- Execution Goals: [[Roadmap]]
- Database Persistence: [[Database Schema]]

---

## 🏗️ Infrastructure Overview

```
┌─────────────────┐       ┌─────────────────┐
│ React / Vite    │       │ Cloudflare CDN  │
│ (Vercel CDN)    │──────►│ & WAF           │
└─────────────────┘       └────────┬────────┘
                                   │
                                   ▼
┌─────────────────┐       ┌─────────────────┐
│ AWS ECS Cluster │◄──────│ Application     │
│ (FastAPI App)   │       │ Load Balancer   │
└────────┬────────┘       └─────────────────┘
         │
         ├───► AWS RDS PostgreSQL 16 (Relational Ledger Core)
         ├───► AWS ElastiCache Redis (Celery Broker & WebSockets)
         └───► AWS S3 Bucket (Encrypted PDF Invoice Storage)
```

---

## 🐋 Containerization (Docker)

### `backend/Dockerfile`
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables
- `DATABASE_URL`: `postgresql://user:pass@rds.amazonaws.com:5432/vyapar_db`
- `REDIS_URL`: `redis://elasticache.amazonaws.com:6379/0`
- `SECRET_KEY`: `super-secret-jwt-key`
- `S3_BUCKET_NAME`: `vyapar-mandap-invoices`

---

## ⚡ Deployment Commands

### Frontend Deployment (Vercel / Netlify)
```bash
cd frontend
npm run build
# Deploy output dist/ directory to CDN
```

### Backend Deployment (AWS / Render)
```bash
cd backend
docker build -t vyapar-backend:latest .
docker run -p 8000:8000 vyapar-backend:latest
```
