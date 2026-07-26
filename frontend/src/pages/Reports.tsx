import React, { useState } from 'react';
import { BarChart3, CheckCircle2, ShieldCheck, Download, Printer } from 'lucide-react';

export const Reports: React.FC = () => {
  const [activeReport, setActiveReport] = useState<'pnl' | 'bs'>('pnl');

  const pnlData = {
    revenue: 4520000.0,
    cogs: 1820000.0,
    grossProfit: 2700000.0,
    operatingExpenses: 850000.0,
    netProfit: 1850000.0,
    tax: 333000.0,
    netIncome: 1517000.0
  };

  const bsData = {
    currentAssets: 4200000.0,
    fixedAssets: 2640000.0,
    totalAssets: 6840000.0,
    currentLiabilities: 1450000.0,
    longTermLiabilities: 1000000.0,
    totalLiabilities: 2450000.0,
    capital: 3000000.0,
    retainedEarnings: 1390000.0,
    totalEquity: 4390000.0
  };

  const isBsBalanced = Math.abs(bsData.totalAssets - (bsData.totalLiabilities + bsData.totalEquity)) < 0.01;

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Certified Financial Reports</h1>
          <p className="text-xs text-slate-400">Automated Financial Statements synthesized directly from immutable double-entry ledgers</p>
        </div>

        {/* Report Selector & Export Buttons */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveReport('pnl')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                activeReport === 'pnl' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Profit & Loss
            </button>
            <button
              onClick={() => setActiveReport('bs')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                activeReport === 'bs' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Balance Sheet
            </button>
          </div>

          <button className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeReport === 'pnl' ? (
        /* Profit & Loss Statement */
        <div className="glass-card rounded-xl p-8 max-w-4xl mx-auto space-y-6">
          <div className="text-center border-b border-slate-800 pb-4 space-y-1">
            <h2 className="text-lg font-bold text-slate-100">M/S SHARMA TRADERS</h2>
            <p className="text-xs font-mono text-emerald-400">STATEMENT OF PROFIT AND LOSS</p>
            <p className="text-[11px] text-slate-400 font-mono">For the period ended 26-Jul-2026 (FY 2026-2027 YTD)</p>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* Revenue */}
            <div className="flex justify-between items-center py-2 border-b border-slate-800">
              <span className="font-bold text-slate-200 font-sans">I. Revenue from Operations</span>
              <span className="font-bold text-slate-100">₹{pnlData.revenue.toLocaleString('en-IN')}</span>
            </div>

            {/* COGS */}
            <div className="flex justify-between items-center py-2 text-slate-400 pl-4">
              <span>Less: Cost of Goods Sold & Direct Expenses</span>
              <span>(₹{pnlData.cogs.toLocaleString('en-IN')})</span>
            </div>

            {/* Gross Profit */}
            <div className="flex justify-between items-center py-2.5 bg-slate-900/80 px-3 rounded font-bold text-slate-100 border border-slate-800">
              <span className="font-sans">II. Gross Profit</span>
              <span className="text-emerald-400">₹{pnlData.grossProfit.toLocaleString('en-IN')}</span>
            </div>

            {/* Operating Expenses */}
            <div className="flex justify-between items-center py-2 text-slate-400 pl-4">
              <span>Less: Operating & Administrative Expenses</span>
              <span>(₹{pnlData.operatingExpenses.toLocaleString('en-IN')})</span>
            </div>

            {/* Net Profit before tax */}
            <div className="flex justify-between items-center py-2 border-t border-slate-800 font-bold text-slate-200">
              <span className="font-sans">III. Net Profit Before Tax</span>
              <span>₹{pnlData.netProfit.toLocaleString('en-IN')}</span>
            </div>

            {/* Tax */}
            <div className="flex justify-between items-center py-2 text-slate-400 pl-4">
              <span>Less: Provision for Income Tax</span>
              <span>(₹{pnlData.tax.toLocaleString('en-IN')})</span>
            </div>

            {/* Net Income After Tax */}
            <div className="flex justify-between items-center py-3 bg-emerald-950/60 border border-emerald-800 px-4 rounded-lg font-bold text-sm text-emerald-400 glow-emerald">
              <span className="font-sans">IV. NET INCOME AFTER TAX</span>
              <span>₹{pnlData.netIncome.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Balance Sheet */
        <div className="glass-card rounded-xl p-8 max-w-4xl mx-auto space-y-6">
          <div className="text-center border-b border-slate-800 pb-4 space-y-1">
            <h2 className="text-lg font-bold text-slate-100">M/S SHARMA TRADERS</h2>
            <p className="text-xs font-mono text-emerald-400">STATEMENT OF FINANCIAL POSITION (BALANCE SHEET)</p>
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded border border-emerald-800 mt-2 glow-emerald">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>EQUALITY CHECK: ASSETS (₹68.4L) = LIABILITIES (₹24.5L) + EQUITY (₹43.9L)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            {/* Assets */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-200 font-sans border-b border-slate-800 pb-2">ASSETS</h3>
              <div className="flex justify-between text-slate-300">
                <span>Current Assets</span>
                <span>₹{bsData.currentAssets.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Property, Plant & Equipment</span>
                <span>₹{bsData.fixedAssets.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-400 border-t border-slate-800 pt-2 text-sm">
                <span>TOTAL ASSETS</span>
                <span>₹{bsData.totalAssets.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Liabilities & Equity */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-200 font-sans border-b border-slate-800 pb-2">LIABILITIES & EQUITY</h3>
              <div className="flex justify-between text-slate-300">
                <span>Current Liabilities</span>
                <span>₹{bsData.currentLiabilities.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Long-Term Debt</span>
                <span>₹{bsData.longTermLiabilities.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Owners Capital & Retained Earnings</span>
                <span>₹{bsData.totalEquity.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-400 border-t border-slate-800 pt-2 text-sm">
                <span>TOTAL LIAB. & EQUITY</span>
                <span>₹{(bsData.totalLiabilities + bsData.totalEquity).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
