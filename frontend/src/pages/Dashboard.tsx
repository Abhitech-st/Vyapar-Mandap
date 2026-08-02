import React from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Receipt, AlertCircle, 
  CheckCircle2, ArrowUpRight, ShieldCheck, Sparkles, Landmark, FileText, ArrowRight
} from 'lucide-react';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { AiPipelineBreakdown } from '../components/AiPipelineBreakdown';
import { useApp } from '../context/AppContext';

interface DashboardProps {
  onOpenInvoiceReview: (invId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onOpenInvoiceReview }) => {
  const { user, organization } = useApp();

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 bg-slate-50 min-h-screen">
      
      {/* Global Header & Operations Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 glass-card p-4 sm:p-5 rounded-2xl border-l-4 border-l-blue-600 shadow-sm bg-white">
        <div>
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-semibold text-blue-700 uppercase tracking-wider mb-0.5">
            <span>As of 26 July 2026</span>
            <span>•</span>
            <span>Financial Year 2026-2027 (Q2)</span>
          </div>
          <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
            AI Operations Center — {organization.name}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 font-medium">
            Posted journals balanced • 1 draft awaiting review ({user.name})
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-[10px] sm:text-xs flex items-center space-x-1.5 font-semibold shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>1 PENDING APPROVAL • 0 FAILURES</span>
          </div>
        </div>
      </div>

      {/* 👁️ DOMINANT HIGH-PRIORITY APPROVAL CARD */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 border-2 border-amber-400 bg-gradient-to-r from-amber-50/70 via-white to-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 shrink-0 shadow-xs">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs">
              <span className="bg-amber-100 text-amber-900 border border-amber-300 px-1.5 sm:px-2 py-0.5 rounded font-semibold text-[9px] sm:text-[10px]">
                HIGH PRIORITY ACTION ITEM
              </span>
              <span className="text-slate-600 font-medium">• Invoice Awaiting Signoff</span>
            </div>
            <h2 className="text-sm sm:text-lg font-bold text-slate-900">
              Approve Apex Technologies Invoice (#<span className="font-mono">INV-2026-089</span>)
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-700 font-medium leading-relaxed">
              Amount: <span className="font-mono font-bold text-blue-700">₹47,200</span> | Confidence: <span className="font-bold text-emerald-700">98.5%</span> | Tax: <span className="font-semibold text-slate-800">18% IGST</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenInvoiceReview("inv-1")}
          className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] sm:text-xs transition shadow-md shadow-amber-500/20 flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Review & Approve Now</span>
        </button>
      </div>

      {/* 📊 CONNECTED FINANCIAL PERFORMANCE SECTION */}
      <div className="bg-slate-100/70 border border-slate-200/80 p-4 sm:p-5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider">Financial Health & Cash Performance</span>
          <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold">Synced with Immutable Ledgers</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Revenue */}
          <div className="glass-card rounded-xl p-3.5 sm:p-4 bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-700 font-bold">
              <span>Revenue (YTD)</span>
              <div className="p-1 rounded-lg bg-blue-50 text-blue-600">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-base sm:text-xl font-bold font-mono text-slate-900 tracking-tight">
              ₹ 45.2L
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 flex items-center space-x-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>+12% YTD</span>
            </div>
          </div>

          {/* Cash Balance */}
          <div className="glass-card rounded-xl p-3.5 sm:p-4 bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-700 font-bold">
              <span>HDFC Balance</span>
              <div className="p-1 rounded-lg bg-blue-50 text-blue-600">
                <Landmark className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-base sm:text-xl font-bold font-mono text-slate-900 tracking-tight">
              ₹ 42.0L
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-amber-800 truncate">
              3 Unreconciled
            </div>
          </div>

          {/* Expenses */}
          <div className="glass-card rounded-xl p-3.5 sm:p-4 bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-700 font-bold">
              <span>Expenses (YTD)</span>
              <div className="p-1 rounded-lg bg-blue-50 text-blue-600">
                <TrendingDown className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-base sm:text-xl font-bold font-mono text-slate-900 tracking-tight">
              ₹ 18.5L
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-700">
              -4% vs Q1
            </div>
          </div>

          {/* Runway */}
          <div className="glass-card rounded-xl p-3.5 sm:p-4 bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-700 font-bold">
              <span>Cash Runway</span>
              <div className="p-1 rounded-lg bg-blue-50 text-blue-600">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-base sm:text-xl font-bold font-mono text-slate-900 tracking-tight">
              22.8 Mo
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 flex items-center space-x-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>+2.1 Mo</span>
            </div>
          </div>

        </div>
      </div>

      {/* 🤖 AI PROCESSING PIPELINE BREAKDOWN & AGENT SWARM STATUS */}
      <AiPipelineBreakdown />

      {/* Actionable GST Return Filing Card */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-amber-300 bg-gradient-to-r from-amber-50/40 via-white to-slate-50 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
              <Receipt className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs">
                <span className="font-bold text-amber-900 uppercase">GSTR-3B Return Filing</span>
                <span className="text-slate-600 font-medium">• July 2026</span>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold">
                  DUE 20 AUG
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                Estimated Net Tax Payable: <span className="font-mono text-amber-900 font-bold">₹ 2,45,000</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '#gst-tds'} 
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] sm:text-xs transition shadow flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
          >
            <span>Review Return</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] sm:text-xs pt-1">
          <div className="bg-slate-100 p-2 sm:p-2.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 text-[10px] font-semibold">Outward Tax (GSTR-1)</span>
            <div className="font-bold font-mono text-slate-900 mt-0.5">₹ 4,90,000</div>
          </div>
          <div className="bg-slate-100 p-2 sm:p-2.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 text-[10px] font-semibold">ITC Claim Offset (GSTR-2B)</span>
            <div className="font-bold font-mono text-emerald-700 mt-0.5">₹ 2,45,000</div>
          </div>
          <div className="bg-slate-100 p-2 sm:p-2.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 text-[10px] font-semibold">Filing Assignee</span>
            <div className="font-bold text-slate-800 mt-0.5">{user.role}: {user.name}</div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityTimeline />
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-4 sm:p-5 space-y-3 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-800">Business Health Index</span>
              <span className="text-[9px] sm:text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
                PRE-POSTING CHECK
              </span>
            </div>
            <div className="flex items-center space-x-3 pt-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-blue-600 flex items-center justify-center font-mono font-bold text-lg sm:text-xl text-blue-700 shadow-md shadow-blue-500/10">
                92
              </div>
              <div className="space-y-0.5 text-[11px] sm:text-xs">
                <div className="font-bold text-slate-900">Healthy State 🟢</div>
                <div className="text-slate-600 font-medium">Zero debit/credit variances.</div>
                <div className="text-slate-600 font-medium">100% active supplier GSTINs.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
