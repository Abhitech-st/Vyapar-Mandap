# 🌐 Vyapar Mandap — Production Deployment & Supabase Setup Guide

This guide details step-by-step instructions for deploying **Vyapar Mandap** to public hosting with a **Supabase PostgreSQL database** and a **Vercel static SPA frontend**.

---

## 🗄️ Step 1: Create Supabase Central Database

1. Go to [https://supabase.com](https://supabase.com) and click **New Project**.
2. Name your project (e.g. `vyapar-mandap-db`), set a database password, and select region (`South Asia / Mumbai`).
3. Open the **SQL Editor** in your Supabase Dashboard and paste/run the following schema creation script:

```sql
-- Profiles table for User Credentials
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  ca_membership_number TEXT
);

-- Organizations table for Firm Entity Master
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  gstin VARCHAR(15) NOT NULL,
  pan VARCHAR(10) NOT NULL,
  address TEXT,
  financial_year_start TEXT DEFAULT '01-April-2026'
);

-- Enable Row Level Security (RLS) & Public Policies for Demo
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert and select on profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public insert and select on organizations" ON organizations FOR ALL USING (true) WITH CHECK (true);
```

4. Go to **Project Settings $\rightarrow$ API** and copy:
   - `Project URL` (e.g. `https://xyz.supabase.co`)
   - `anon public key` (e.g. `eyJhbGciOiJKV1Qi...`)

---

## 🚀 Step 2: Deploy Frontend to Vercel

1. Push code to your GitHub repository.
2. Go to [https://vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your `vyapar-mandap` GitHub repository.
4. Set **Root Directory** to `frontend`.
5. Add **Environment Variables** in Vercel settings:
   - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-public-key`
   - `VITE_API_BASE_URL` = `https://your-api.onrender.com`
6. Click **Deploy**. Vercel will build and assign your production HTTPS domain (e.g. `https://vyapar-mandap.vercel.app`).

---

## ⚙️ Step 3: Deploy FastAPI Backend to Render / Railway

1. Go to [https://render.com](https://render.com) and click **New Web Service**.
2. Connect your GitHub repository and set:
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Add Environment Variables:
   - `GEMINI_API_KEY` = `your-google-gemini-api-key`
   - `DATABASE_URL` = `postgresql://postgres:password@db.supabase.co:5432/postgres`
4. Click **Create Web Service**.

---

## 🧪 Verification & Health Check

1. Open your live Vercel URL (`https://vyapar-mandap.vercel.app`).
2. The 2-Step **Onboarding Screen** will appear automatically.
3. Enter your Chartered Accountant credentials and Firm GSTIN.
4. Click **Save & Launch AI Workspace**.
5. Check your Supabase Dashboard under `profiles` and `organizations` tables to confirm record creation!
