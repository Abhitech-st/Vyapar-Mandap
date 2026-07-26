import React, { useState } from 'react';
import { Landmark, RefreshCw, CheckCircle2, AlertTriangle, ArrowRight, Upload, Sparkles } from 'lucide-react';

export const Banking: React.FC = () => {
  const [reconciled, setReconciled] = useState<string[]>([]);

  const transactions = [
    {
      id: "tx-101",
      date: "2026-07-24",
      description: "NEFT - APEX TECHNOLOGIES PVT LTD - INVOICE 089",
      amount: 47200.0,
      type: "DR",
      matchScore: 0.98,
      status: "Auto_Matched",
      matchedBill: "INV-2026-089 (Apex Tech)"
    },
    {
      id: "tx-102",
      date: "2026-07-22",
      description: "UPI/TATA CONSULTANCY SERVICES/CHQ902182",
      amount: 125000.0,
      type: "DR",
      matchScore: 0.76,
      status: "Review_Required",
      matchedBill: "INV-2026-042 (TCS Bill)"
    },
    {
      id: "tx-103",
      date: "2026-07-20",
      description: "HDFC BANK CHARGES & ANNUAL MAINTENANCE",
      amount: 1450.0,
      type: "DR",
      matchScore: 0.0,
      status: "Unmatched",
      matchedBill: "None (Unmatched Bank Line)"
    }
  ];

  const handleMatch = (id: string) => {
    setReconciled([...reconciled, id]);
  };

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Bank Statement Reconciliation</h1>
          <p className="text-xs text-slate-400">Automated Fuzzy String & Amount Matching Engine (HDFC Current A/c 4092)</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition border border-slate-700">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload MT940 / CSV</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition shadow-lg shadow-emerald-600/20">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Run AI Auto-Match</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="text-xs text-slate-400">Total Statement Lines</div>
          <div className="text-xl font-bold font-mono text-slate-100 mt-1">15 Lines</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-xs text-slate-400">Auto-Matched High Confidence</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">12 (80%)</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-xs text-slate-400">Human Review Queue</div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">2 Lines</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-xs text-slate-400">Fuzzy Match Accuracy</div>
          <div className="text-xl font-bold font-mono text-slate-100 mt-1">92.4%</div>
        </div>
      </div>

      {/* Matching Queue Workspace */}
      <div className="glass-card rounded-xl overflow-hidden border border-slate-800">
        <div className="px-5 py-4 border-b border-slate-800 font-semibold text-sm text-slate-200 flex justify-between items-center">
          <span>Bank Transaction Reconciliation Queue</span>
          <span className="text-xs font-mono text-slate-400">HDFC A/c #4092</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Tx Date</th>
                <th className="py-3 px-4">Statement Description</th>
                <th className="py-3 px-4 text-right">Amount (INR)</th>
                <th className="py-3 px-4">Matched Ledger Line</th>
                <th className="py-3 px-4 text-center">Fuzzy Confidence</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {transactions.map((tx) => {
                const isMatched = reconciled.includes(tx.id) || tx.status === "Auto_Matched";
                return (
                  <tr key={tx.id} className="hover:bg-slate-900/40 transition">
                    <td className="py-3.5 px-4 font-mono text-slate-400">{tx.date}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200 max-w-xs truncate">{tx.description}</div>
                      <div className="text-[10px] text-slate-500 font-mono">Reference: {tx.id}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-100">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-300 font-medium">{tx.matchedBill}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] border ${
                        tx.matchScore >= 0.9 ? "bg-emerald-950 text-emerald-400 border-emerald-800" :
                        tx.matchScore >= 0.7 ? "bg-amber-950 text-amber-400 border-amber-800" :
                        "bg-slate-900 text-slate-400 border-slate-700"
                      }`}>
                        {(tx.matchScore * 100).toFixed(0)}% Match
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isMatched ? (
                        <span className="text-emerald-400 text-xs font-mono flex items-center justify-end space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Matched</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleMatch(tx.id)}
                          className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition"
                        >
                          Confirm Match
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
