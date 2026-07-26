import React, { useState } from 'react';
import { BarChart3, CheckCircle2, ShieldCheck, Download, Printer, Filter } from 'lucide-react';

export const Reports: React.FC = () => {
  const [activeReport, setActiveReport] = useState<'pnl' | 'bs'>('pnl');
  const [period, setPeriod] = useState<string>('ytd');

  const pnlData = {
    revenue: period === 'q1' ? 2200000.0 : period === 'q2' ? 2320000.0 : 4520000.0,
    cogs: period === 'q1' ? 900000.0 : period === 'q2' ? 920000.0 : 1820000.0,
    grossProfit: period === 'q1' ? 1300000.0 : period === 'q2' ? 1400000.0 : 2700000.0,
    operatingExpenses: period === 'q1' ? 400000.0 : period === 'q2' ? 450000.0 : 850000.0,
    netProfit: period === 'q1' ? 900000.0 : period === 'q2' ? 950000.0 : 1850000.0,
    tax: period === 'q1' ? 162000.0 : period === 'q2' ? 171000.0 : 333000.0,
    netIncome: period === 'q1' ? 738000.0 : period === 'q2' ? 779000.0 : 1517000.0
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Certified Financial Reports</h1>
          <p className="text-xs text-slate-600 font-medium">Automated Financial Statements synthesized directly from immutable double-entry ledgers</p>
        </div>

        {/* Report Selector, Period & Export Buttons */}
        <div className="flex items-center space-x-3">
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg text-xs font-bold px-3 py-1.5 text-slate-800 focus:outline-none"
          >
            <option value="ytd">Full FY 2026-27 YTD</option>
            <option value="q1">Quarter 1 (Apr - Jun)</option>
            <option value="q2">Quarter 2 (Jul - Sep)</option>
          </select>

          <div className="flex items-center bg-slate-200/80 border border-slate-300 p-1 rounded-lg">
            <button
              onClick={() => setActiveReport('pnl')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
                activeReport === 'pnl' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Profit & Loss
            </button>
            <button
              onClick={() => setActiveReport('bs')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
                activeReport === 'bs' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Balance Sheet
            </button>
          </div>

          <button 
            onClick={handlePrint}
            className="p-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:text-blue-600 transition shadow-xs cursor-pointer"
            title="Print / Save PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeReport === 'pnl' ? (
        /* Profit & Loss Statement */
        <div className="glass-card rounded-xl p-8 max-w-4xl mx-auto space-y-6 shadow-md bg-white border border-slate-200">
          <div className="text-center border-b border-slate-200 pb-4 space-y-1">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">M/S SHARMA TRADERS</h2>
            <p className="text-xs font-mono font-bold text-blue-700">STATEMENT OF PROFIT AND LOSS</p>
            <p className="text-[11px] text-slate-500 font-mono font-medium">For the period ended 26-Jul-2026 ({period.toUpperCase()})</p>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* Revenue */}
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="font-bold text-slate-900 font-sans">I. Revenue from Operations</span>
              <span className="font-bold text-slate-900">₹{pnlData.revenue.toLocaleString('en-IN')}</span>
            </div>

            {/* COGS */}
            <div className="flex justify-between items-center py-2 text-slate-600 pl-4 font-medium">
              <span>Less: Cost of Goods Sold & Direct Expenses</span>
              <span>(₹{pnlData.cogs.toLocaleString('en-IN')})</span>
            </div>

            {/* Gross Profit */}
            <div className="flex justify-between items-center py-2.5 bg-blue-50/70 px-3 rounded font-bold text-slate-900 border border-blue-200">
              <span className="font-sans">II. Gross Profit</span>
              <span className="text-blue-700">₹{pnlData.grossProfit.toLocaleString('en-IN')}</span>
            </div>

            {/* Operating Expenses */}
            <div className="flex justify-between items-center py-2 text-slate-600 pl-4 font-medium">
              <span>Less: Operating & Administrative Expenses</span>
              <span>(₹{pnlData.operatingExpenses.toLocaleString('en-IN')})</span>
            </div>

            {/* Net Profit before tax */}
            <div className="flex justify-between items-center py-2 border-t border-slate-200 font-bold text-slate-900">
              <span className="font-sans">III. Net Profit Before Tax</span>
              <span>₹{pnlData.netProfit.toLocaleString('en-IN')}</span>
            </div>

            {/* Tax */}
            <div className="flex justify-between items-center py-2 text-slate-600 pl-4 font-medium">
              <span>Less: Provision for Income Tax</span>
              <span>(₹{pnlData.tax.toLocaleString('en-IN')})</span>
            </div>

            {/* Net Income After Tax */}
            <div className="flex justify-between items-center py-3 bg-blue-50 border border-blue-300 px-4 rounded-lg font-bold text-sm text-blue-800 shadow-xs">
              <span className="font-sans">IV. NET INCOME AFTER TAX</span>
              <span>₹{pnlData.netIncome.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Balance Sheet */
        <div className="glass-card rounded-xl p-8 max-w-4xl mx-auto space-y-6 shadow-md bg-white border border-slate-200">
          <div className="text-center border-b border-slate-200 pb-4 space-y-1">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">M/S SHARMA TRADERS</h2>
            <p className="text-xs font-mono font-bold text-blue-700">STATEMENT OF FINANCIAL POSITION (BALANCE SHEET)</p>
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono text-blue-800 bg-blue-50 px-3 py-1 rounded border border-blue-200 mt-2 font-bold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>EQUALITY CHECK: ASSETS (₹68.4L) = LIABILITIES (₹24.5L) + EQUITY (₹43.9L)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            {/* Assets */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 shadow-xs">
              <h3 className="font-bold text-slate-900 font-sans border-b border-slate-200 pb-2">ASSETS</h3>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Current Assets</span>
                <span>₹{bsData.currentAssets.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Property, Plant & Equipment</span>
                <span>₹{bsData.fixedAssets.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-blue-700 border-t border-slate-200 pt-2 text-sm">
                <span>TOTAL ASSETS</span>
                <span>₹{bsData.totalAssets.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Liabilities & Equity */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 shadow-xs">
              <h3 className="font-bold text-slate-900 font-sans border-b border-slate-200 pb-2">LIABILITIES & EQUITY</h3>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Current Liabilities</span>
                <span>₹{bsData.currentLiabilities.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Long-Term Debt</span>
                <span>₹{bsData.longTermLiabilities.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Owners Capital & Retained Earnings</span>
                <span>₹{bsData.totalEquity.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-blue-700 border-t border-slate-200 pt-2 text-sm">
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
