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
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Bank Statement Reconciliation</h1>
          <p className="text-xs text-slate-600 font-medium">Automated Fuzzy String & Amount Matching Engine (HDFC Current A/c 4092)</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition shadow-xs">
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            <span>Upload MT940 / CSV</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md shadow-blue-500/20">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Run AI Auto-Match</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Total Statement Lines</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">15 Lines</div>
        </div>
        <div className="glass-card rounded-xl p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Auto-Matched High Confidence</div>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1">12 (80%)</div>
        </div>
        <div className="glass-card rounded-xl p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Human Review Queue</div>
          <div className="text-xl font-bold font-mono text-amber-800 mt-1">2 Lines</div>
        </div>
        <div className="glass-card rounded-xl p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Fuzzy Match Accuracy</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">92.4%</div>
        </div>
      </div>

      {/* Matching Queue Workspace */}
      <div className="glass-card rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 font-bold text-sm text-slate-800 flex justify-between items-center bg-white">
          <span>Bank Transaction Reconciliation Queue</span>
          <span className="text-xs font-mono text-blue-700 font-semibold">HDFC A/c #4092</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Tx Date</th>
                <th className="py-3 px-4">Statement Description</th>
                <th className="py-3 px-4 text-right">Amount (INR)</th>
                <th className="py-3 px-4">Matched Ledger Line</th>
                <th className="py-3 px-4 text-center">Fuzzy Confidence</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {transactions.map((tx) => {
                const isMatched = reconciled.includes(tx.id) || tx.status === "Auto_Matched";
                return (
                  <tr key={tx.id} className="hover:bg-blue-50/50 transition">
                    <td className="py-3.5 px-4 font-mono text-slate-600 font-medium">{tx.date}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 max-w-xs truncate">{tx.description}</div>
                      <div className="text-[10px] text-slate-500 font-mono font-medium">Reference: {tx.id}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800 font-semibold">{tx.matchedBill}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${
                        tx.matchScore >= 0.9 ? "bg-blue-50 text-blue-800 border-blue-200" :
                        tx.matchScore >= 0.7 ? "bg-amber-50 text-amber-900 border-amber-300" :
                        "bg-slate-100 text-slate-600 border-slate-300"
                      }`}>
                        {(tx.matchScore * 100).toFixed(0)}% Match
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isMatched ? (
                        <span className="text-blue-700 text-xs font-mono font-bold flex items-center justify-end space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Matched</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleMatch(tx.id)}
                          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
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
