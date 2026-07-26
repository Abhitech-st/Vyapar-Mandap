import React from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Receipt, AlertCircle, 
  CheckCircle2, ArrowUpRight, ShieldCheck, Sparkles, Activity
} from 'lucide-react';
import { ActivityTimeline } from '../components/ActivityTimeline';

interface DashboardProps {
  onOpenInvoiceReview: (invId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onOpenInvoiceReview }) => {
  const kpis = [
    { title: 'Revenue (YTD)', value: '₹ 45,20,000', change: '+12%', positive: true, icon: DollarSign },
    { title: 'Expenses (YTD)', value: '₹ 18,50,000', change: '-4%', positive: true, icon: TrendingDown },
    { title: 'GST Liability (July)', value: '₹ 2,45,000', badge: 'Due 20 Aug', warning: true, icon: Receipt },
    { title: 'Net Cash Runway', value: '22.8 Months', change: '+2.1 Mo', positive: true, icon: TrendingUp },
  ];

  return (
    <div className="p-6 space-y-6">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-5 rounded-2xl border-l-4 border-l-emerald-500">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <span>Welcome back, M/S Sharma Traders 👋</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Decoupled multi-agent accounting engine active. All double-entry ledgers balanced and verified.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-400 font-mono text-xs flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Audit Trail Immutable</span>
          </div>
        </div>
      </div>

      {/* Top Row: 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="glass-card glass-card-hover rounded-xl p-5 space-y-3 relative">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{kpi.title}</span>
                <div className="p-2 rounded-lg bg-slate-900 text-slate-300">
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-100 tracking-tight">
                {kpi.value}
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                {kpi.change && (
                  <span className={`flex items-center space-x-1 ${kpi.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <ArrowUpRight className="w-3 h-3" />
                    <span>{kpi.change} vs last quarter</span>
                  </span>
                )}
                {kpi.badge && (
                  <span className="bg-amber-950 text-amber-400 border border-amber-800 px-2 py-0.5 rounded text-[10px] glow-amber">
                    {kpi.badge}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section: Activity Ticker (Left) & Pending Approvals Queue (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 spans): Activity Timeline */}
        <div className="lg:col-span-2">
          <ActivityTimeline />
        </div>

        {/* Right Column (1 span): Human Approvals Queue & Health Score */}
        <div className="space-y-6">
          
          {/* Health Score Card */}
          <div className="glass-card rounded-xl p-5 space-y-3 bg-gradient-to-br from-slate-900 to-slate-950">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-semibold text-slate-300">Business Health Score</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                AUDITED
              </span>
            </div>
            <div className="flex items-center space-x-4 pt-1">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-mono font-bold text-xl text-emerald-400 glow-emerald">
                92
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-medium text-slate-200">Excellent Standing 🟢</div>
                <div className="text-slate-400">Zero debit/credit variances.</div>
                <div className="text-slate-400">100% vendor GSTIN compliance.</div>
              </div>
            </div>
          </div>

          {/* Pending Approvals Queue */}
          <div className="glass-card rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2 text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <h3 className="font-semibold text-xs text-slate-200">Pending Human Approvals</h3>
              </div>
              <span className="text-[10px] font-mono bg-amber-950 text-amber-400 border border-amber-800 px-1.5 py-0.5 rounded">
                1 ITEM
              </span>
            </div>

            <div className="bg-slate-900/90 border border-amber-500/30 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start text-xs">
                <div>
                  <span className="font-semibold text-slate-200">Bill #INV-2026-089</span>
                  <p className="text-slate-400 text-[11px]">Apex Technologies Pvt Ltd</p>
                </div>
                <span className="font-mono text-emerald-400 font-bold">₹ 47,200</span>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-800 font-mono">
                Proposed Entry: Dr. Server Exp (₹40k) + Input CGST/SGST (₹7.2k) Cr. Vendor (₹47.2k)
              </div>

              <button
                onClick={() => onOpenInvoiceReview("inv-1")}
                className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Review & Approve Journal Entry</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
