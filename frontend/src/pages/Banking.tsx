import React, { useState } from 'react';
import { Landmark, ArrowUpRight, CheckCircle2, RefreshCw, Upload, Sparkles, X } from 'lucide-react';

export const Banking: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAutoMatching, setIsAutoMatching] = useState(false);
  const [matchSuccess, setMatchSuccess] = useState<string | null>(null);

  const runAutoMatch = () => {
    setIsAutoMatching(true);
    setMatchSuccess(null);
    setTimeout(() => {
      setIsAutoMatching(false);
      setMatchSuccess("AI Auto-Reconciliation Complete: Matched 12 of 15 bank lines with 98.4% confidence.");
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-slate-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">Reconciliation — Bank Statements</h1>
          <p className="text-xs text-slate-600 font-medium">Fuzzy string matching & payment voucher reconciliation engine</p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <button 
            onClick={runAutoMatch}
            disabled={isAutoMatching}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center space-x-2 shadow-xs cursor-pointer"
          >
            <Sparkles className={`w-3.5 h-3.5 text-blue-600 ${isAutoMatching ? 'animate-spin' : ''}`} />
            <span>{isAutoMatching ? 'Matching Lines...' : 'Run AI Auto-Match'}</span>
          </button>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md shadow-blue-500/20 flex items-center space-x-2 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Statement</span>
          </button>
        </div>
      </div>

      {matchSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{matchSuccess}</span>
        </div>
      )}

      {/* Account Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 space-y-2 bg-white border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">HDFC Bank Current Account</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">₹ 42,00,000</div>
          <div className="text-[11px] font-mono text-emerald-700 font-semibold">A/c #4092 • Active Feed</div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 bg-white border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Unmatched Statement Lines</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-800">3 Transactions</div>
          <div className="text-[11px] text-amber-800 font-semibold">Requires Human Review</div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 bg-white border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Auto-Reconciled Today</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-blue-700">12 Vouchers</div>
          <div className="text-[11px] text-blue-700 font-semibold">98.4% Average Score</div>
        </div>
      </div>

      {/* Unreconciled Transactions Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
        <div className="px-5 py-4 border-b border-slate-200 font-bold text-xs sm:text-sm text-slate-800 flex justify-between items-center bg-white">
          <span>Unreconciled Bank Feed Queue</span>
          <span className="text-xs font-mono text-slate-500">3 items pending</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[600px]">
            <thead className="bg-slate-100 text-slate-700 font-sans font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Bank Narration / Reference</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Suggested Ledger Voucher</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-blue-50/50 transition">
                <td className="py-3.5 px-4 font-mono font-medium text-slate-600">26-Jul-2026</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">NEFT/APEX-TECH/INV089/JUL26</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">₹47,200.00</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                    Apex Tech #INV-2026-089 (98.4%)
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button onClick={runAutoMatch} className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition">
                    Match & Post
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Statement Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 my-8 relative animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-bold text-base text-slate-900">Upload Bank Statement (MT940 / CSV)</h3>
                <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center space-y-2 hover:border-blue-500 transition cursor-pointer">
                <Upload className="w-8 h-8 text-blue-600 mx-auto" />
                <div className="text-xs font-bold text-slate-900">Choose CSV or MT940 statement file</div>
                <p className="text-[11px] text-slate-500 font-medium">HDFC, ICICI, SBI & Axis bank formats supported</p>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold">Cancel</button>
                <button onClick={() => { setIsUploadModalOpen(false); runAutoMatch(); }} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20">Process File</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
