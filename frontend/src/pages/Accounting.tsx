import React, { useState } from 'react';
import { BookOpen, Plus, CheckCircle2, AlertOctagon, Lock, Sparkles, FolderTree } from 'lucide-react';

export const Accounting: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'journals' | 'coa'>('journals');
  const [debitVal, setDebitVal] = useState<number>(47200);
  const [creditVal, setCreditVal] = useState<number>(47200);

  const accounts = [
    { code: "1000", name: "Cash in Hand", type: "Asset", balance: 125000.0 },
    { code: "1010", name: "HDFC Bank Current A/c 4092", type: "Asset", balance: 4200000.0 },
    { code: "1310", name: "Input CGST Asset", type: "Asset", balance: 145000.0 },
    { code: "1320", name: "Input SGST Asset", type: "Asset", balance: 145000.0 },
    { code: "2100", name: "Accounts Payable (Vendors)", type: "Liability", balance: 1450000.0 },
    { code: "4000", name: "Sales & Services Revenue", type: "Revenue", balance: 4520000.0 },
    { code: "5100", name: "Computer & Server Expenses", type: "Expense", balance: 450000.0 },
  ];

  const journals = [
    {
      number: "JE-2026-402",
      date: "24-Jul-2026",
      narration: "Bill #INV-2026-089 from Apex Technologies Pvt Ltd",
      status: "Posted",
      isImmutable: true,
      totalDebit: 47200.0,
      totalCredit: 47200.0,
      lines: [
        { acc: "5100 - Computer & Server Exp", dr: 40000.0, cr: 0.0 },
        { acc: "1310 - Input CGST 9%", dr: 3600.0, cr: 0.0 },
        { acc: "1320 - Input SGST 9%", dr: 3600.0, cr: 0.0 },
        { acc: "2100 - Accounts Payable Apex", dr: 0.0, cr: 47200.0 },
      ]
    }
  ];

  const isBalanced = Math.abs(debitVal - creditVal) < 0.01;

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Immutable Double-Entry Ledger Engine</h1>
          <p className="text-xs text-slate-400">Strict mathematical debit equals credit validation ($Debits = Credits$)</p>
        </div>

        {/* Sub-tab Toggle */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveSubTab('journals')}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition ${
              activeSubTab === 'journals' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Journal Entries
          </button>
          <button
            onClick={() => setActiveSubTab('coa')}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition ${
              activeSubTab === 'coa' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Chart of Accounts Tree
          </button>
        </div>
      </div>

      {activeSubTab === 'journals' ? (
        <div className="space-y-6">
          
          {/* Create Manual Entry Card */}
          <div className="glass-card rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-semibold text-sm text-slate-200 flex items-center space-x-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Post Manual Double-Entry Journal</span>
              </h3>
              <div className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-mono border ${
                isBalanced ? 'bg-emerald-950 text-emerald-400 border-emerald-800 glow-emerald' : 'bg-rose-950 text-rose-400 border-rose-800'
              }`}>
                {isBalanced ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertOctagon className="w-3.5 h-3.5" />}
                <span>{isBalanced ? "BALANCE EQUALITY VERIFIED" : "UNBALANCED DEBIT/CREDIT"}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <label className="text-slate-400">Total Debit (Dr.)</label>
                <input
                  type="number"
                  value={debitVal}
                  onChange={(e) => setDebitVal(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <label className="text-slate-400">Total Credit (Cr.)</label>
                <input
                  type="number"
                  value={creditVal}
                  onChange={(e) => setCreditVal(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              disabled={!isBalanced}
              className={`w-full py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${
                isBalanced
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Commit Entry Immutably to Ledger</span>
            </button>
          </div>

          {/* Journal Entries List */}
          <div className="glass-card rounded-xl overflow-hidden border border-slate-800">
            <div className="px-5 py-4 border-b border-slate-800 font-semibold text-sm text-slate-200">
              Immutable Financial Transaction Log
            </div>

            <div className="p-5 space-y-4">
              {journals.map((je, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold font-mono text-emerald-400 text-sm">{je.number}</span>
                      <span className="text-slate-400 font-mono">{je.date}</span>
                      <span className="bg-slate-950 border border-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono text-[10px] flex items-center space-x-1">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        <span>IMMUTABLE</span>
                      </span>
                    </div>
                    <div className="font-mono text-xs text-slate-300 font-bold">
                      Dr. ₹{je.totalDebit.toLocaleString('en-IN')} = Cr. ₹{je.totalCredit.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 italic">{je.narration}</p>

                  <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 text-xs font-mono space-y-1.5">
                    {je.lines.map((line, lIdx) => (
                      <div key={lIdx} className="flex justify-between items-center text-slate-300">
                        <span>{line.acc}</span>
                        <div className="space-x-4">
                          {line.dr > 0 && <span className="text-slate-100 font-bold">Dr. ₹{line.dr.toLocaleString('en-IN')}</span>}
                          {line.cr > 0 && <span className="text-emerald-400 font-bold">Cr. ₹{line.cr.toLocaleString('en-IN')}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Chart of Accounts Tree */
        <div className="glass-card rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-semibold text-sm text-slate-200 flex items-center space-x-2">
              <FolderTree className="w-4 h-4 text-emerald-400" />
              <span>Chart of Accounts Hierarchy (COA)</span>
            </h3>
          </div>

          <div className="divide-y divide-slate-800">
            {accounts.map((acc) => (
              <div key={acc.code} className="py-3 px-2 flex justify-between items-center hover:bg-slate-900/60 transition rounded">
                <div className="flex items-center space-x-4 font-mono text-xs">
                  <span className="text-emerald-400 font-bold">{acc.code}</span>
                  <span className="text-slate-200 font-sans font-medium">{acc.name}</span>
                </div>
                <div className="flex items-center space-x-6 text-xs font-mono">
                  <span className="text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    {acc.type}
                  </span>
                  <span className="font-bold text-slate-100">
                    ₹{acc.balance.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
