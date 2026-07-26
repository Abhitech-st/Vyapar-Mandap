import React from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Receipt, AlertCircle, 
  CheckCircle2, ArrowUpRight, ShieldCheck, Sparkles, Activity, Landmark, FileText, ArrowRight
} from 'lucide-react';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { useApp } from '../context/AppContext';

interface DashboardProps {
  onOpenInvoiceReview: (invId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onOpenInvoiceReview }) => {
  const { user, organization } = useApp();

  const kpis = [
    {
      title: 'Revenue (YTD)',
      value: '₹ 45,20,000',
      period: 'Period: Apr–Jul 2026 (YTD)',
      change: '+12% vs prior Q1 YTD',
      positive: true,
      icon: DollarSign
    },
    {
      title: 'Expenses (YTD)',
      value: '₹ 18,50,000',
      period: 'Period: Apr–Jul 2026 (YTD)',
      change: '-4% vs prior Q1 YTD',
      positive: true,
      icon: TrendingDown
    },
    {
      title: 'Net Cash Runway',
      value: '22.8 Months',
      period: 'Forward Estimate (Burn ₹1.85L/mo)',
      change: '+2.1 Mo vs Q1',
      positive: true,
      icon: TrendingUp
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      
      {/* Global Reporting Period Bar & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-5 rounded-2xl border-l-4 border-l-blue-600 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-700 font-bold uppercase tracking-wider mb-1">
            <span>As of 26 July 2026</span>
            <span>•</span>
            <span>Financial Year 2026-2027 (Q2)</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2 tracking-tight">
            <span>Welcome back, {organization.name} 👋</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Posted journals balanced • 1 draft awaiting review ({user.name}, {user.role})
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-mono text-xs flex items-center space-x-2 font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Audit Trail Active (1 Pending Approval)</span>
          </div>
        </div>
      </div>

      {/* Prominent High-Priority Approval Card Surfaced Right Near Top */}
      <div className="glass-card rounded-2xl p-5 border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50/60 via-white to-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 shrink-0 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-amber-800 font-bold uppercase tracking-wider">High Priority Action Item</span>
              <span className="text-slate-600 font-medium">• 1 Invoice Awaiting CA Signoff ({user.name})</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Approve Apex Technologies Invoice (#INV-2026-089)
            </h3>
            <p className="text-xs text-slate-700 mt-1 font-medium">
              Amount: <span className="font-mono font-bold text-blue-700">₹47,200</span> | Confidence: <span className="font-mono text-emerald-700 font-bold">98.5%</span> | Tax Split: <span className="font-mono text-slate-800">18% IGST / GSTR-2B Verified</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => onOpenInvoiceReview("inv-1")}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md shadow-blue-500/20 flex items-center space-x-2 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Review & Approve Now</span>
        </button>
      </div>

      {/* Financial Control Metrics + KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Cash Control Metric */}
        <div className="glass-card glass-card-hover rounded-xl p-5 space-y-3 relative border-l-2 border-l-blue-600">
          <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
            <span>HDFC Bank Balance</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 tracking-tight">
            ₹ 42,00,000
          </div>
          <div className="text-[11px] font-mono text-amber-800 flex items-center space-x-1 font-semibold">
            <span>3 Unreconciled Lines (₹1.25L)</span>
          </div>
        </div>

        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="glass-card glass-card-hover rounded-xl p-5 space-y-3 relative">
              <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
                <span>{kpi.title}</span>
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 tracking-tight">
                {kpi.value}
              </div>
              <div className="space-y-1">
                <div className="text-[11px] text-slate-500 font-mono font-medium">{kpi.period}</div>
                <div className="flex items-center justify-between text-xs font-mono">
                  {kpi.change && (
                    <span className={`flex items-center space-x-1 font-bold ${kpi.positive ? 'text-emerald-700' : 'text-rose-700'}`}>
                      <ArrowUpRight className="w-3 h-3" />
                      <span>{kpi.change}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actionable GST Filing Deadline Card */}
      <div className="glass-card rounded-2xl p-5 border border-amber-300 bg-gradient-to-r from-amber-50/40 via-white to-slate-50 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 border border-amber-300">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="font-bold text-amber-800 uppercase">GSTR-3B Return Filing</span>
                <span className="text-slate-600 font-medium">• Period: July 2026 (FY 2026-27)</span>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                  DUE 20 AUG 2026
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                Estimated Net Tax Payable: <span className="font-mono text-amber-800 font-bold">₹ 2,45,000</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '#gst-tds'} 
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition shadow flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <span>Review Return & Prepare Payment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono pt-1">
          <div className="bg-slate-100 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 text-[10px]">Outward Tax (GSTR-1)</span>
            <div className="font-bold text-slate-900 mt-0.5">₹ 4,90,000</div>
          </div>
          <div className="bg-slate-100 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 text-[10px]">ITC Claim Offset (GSTR-2B)</span>
            <div className="font-bold text-emerald-700 mt-0.5">₹ 2,45,000</div>
          </div>
          <div className="bg-slate-100 p-2.5 rounded border border-slate-200">
            <span className="text-slate-500 text-[10px]">Filing Assignee</span>
            <div className="font-bold text-slate-800 mt-0.5">{user.role}: {user.name}</div>
          </div>
        </div>
      </div>

      {/* Middle Section: Activity Ticker (Left) & Pre-Posting Check (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 spans): Activity Timeline */}
        <div className="lg:col-span-2">
          <ActivityTimeline />
        </div>

        {/* Right Column (1 span): Pre-Posting Check & Control Panel */}
        <div className="space-y-6">
          
          {/* Health Score Card */}
          <div className="glass-card rounded-xl p-5 space-y-3 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-800">Business Health Index</span>
              <span className="text-[10px] font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
                PRE-POSTING CHECK
              </span>
            </div>
            <div className="flex items-center space-x-4 pt-1">
              <div className="w-16 h-16 rounded-full border-4 border-blue-600 flex items-center justify-center font-mono font-bold text-xl text-blue-700 shadow-md shadow-blue-500/10">
                92
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-bold text-slate-900">Healthy Operational State 🟢</div>
                <div className="text-slate-600 font-medium">Zero debit/credit variances.</div>
                <div className="text-slate-600 font-medium">100% active supplier GSTINs.</div>
              </div>
            </div>
          </div>

          {/* Operational Control Metrics */}
          <div className="glass-card rounded-xl p-5 space-y-3">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-mono border-b border-slate-200 pb-2">
              Accounting Control Checks
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center bg-slate-100 p-2.5 rounded border border-slate-200">
                <span className="text-slate-700 font-medium">Overdue Payables</span>
                <span className="font-bold text-emerald-700">₹0.00 (Current)</span>
              </div>
              <div className="flex justify-between items-center bg-slate-100 p-2.5 rounded border border-slate-200">
                <span className="text-slate-700 font-medium">Bank Statement Variance</span>
                <span className="font-bold text-amber-800">3 Unmatched Lines</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
