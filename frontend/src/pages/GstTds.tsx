import React, { useState } from 'react';
import { Receipt, AlertTriangle, CheckCircle2, FileText, ArrowUpRight, Sparkles, Download, X, Loader2 } from 'lucide-react';

export const GstTds: React.FC = () => {
  const [isFilingModalOpen, setIsFilingModalOpen] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState<string | null>(null);
  const [isFiled, setIsFiled] = useState(false);

  const runItcAudit = () => {
    setIsAuditing(true);
    setAuditSuccess(null);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditSuccess("GSTR-2B Input Tax Credit Audit Complete: 100% of claimed ITC (₹7.20L) verified against portal supplier filings.");
    }, 1200);
  };

  const handleFileReturn = () => {
    setIsFiled(true);
    setIsFilingModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">GST & TDS Compliance Engine</h1>
          <p className="text-xs text-slate-600 font-medium">GSTR-1 Outward Summary, GSTR-3B Tax Liability & Section 194C/194J Deductions</p>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={runItcAudit}
            disabled={isAuditing}
            className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center space-x-2 shadow-xs cursor-pointer"
          >
            {isAuditing ? <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" /> : <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
            <span>{isAuditing ? 'Auditing GSTR-2B...' : 'Run GSTR-2B ITC Audit'}</span>
          </button>
          
          <button 
            onClick={() => setIsFilingModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md shadow-blue-500/20 flex items-center space-x-2 cursor-pointer"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>{isFiled ? 'GSTR-3B Filed (ACK #90218)' : 'Prepare & File GSTR-3B Return'}</span>
          </button>
        </div>
      </div>

      {auditSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{auditSuccess}</span>
        </div>
      )}

      {/* GST Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 space-y-2 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Taxable Value (July 2026)</div>
          <div className="text-2xl font-bold font-mono text-slate-900">₹ 40,00,000</div>
          <div className="text-[11px] font-mono text-blue-700 font-semibold">GSTR-1 Outward Verified</div>
        </div>

        <div className="glass-card rounded-xl p-5 space-y-2 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Input Tax Credit (ITC Claimed)</div>
          <div className="text-2xl font-bold font-mono text-emerald-700">₹ 7,20,000</div>
          <div className="text-[11px] font-mono text-slate-600 font-medium">Verified against GSTR-2B</div>
        </div>

        <div className="glass-card rounded-xl p-5 space-y-2 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Net Estimated Liability</div>
          <div className="text-2xl font-bold font-mono text-amber-800">₹ 2,45,000</div>
          <div className="text-[11px] font-mono text-amber-800 font-semibold">
            {isFiled ? "Filed & Paid" : "Due 20-Aug-2026"}
          </div>
        </div>
      </div>

      {/* ITC Mismatch Auditor Table */}
      <div className="glass-card rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 font-bold text-sm text-slate-800 flex justify-between items-center bg-white">
          <span>GSTR-2B Input Tax Credit (ITC) Matching Directory</span>
          <span className="text-xs font-mono text-blue-700 font-semibold">100% Active Supplier GSTINs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Supplier GSTIN</th>
                <th className="py-3 px-4">Supplier Name</th>
                <th className="py-3 px-4 text-right">Taxable Amount</th>
                <th className="py-3 px-4 text-right">CGST + SGST</th>
                <th className="py-3 px-4 text-center">GSTR-2B Portal Status</th>
                <th className="py-3 px-4 text-right">ITC Claim Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-blue-50/50 transition">
                <td className="py-3.5 px-4 font-mono text-blue-700 font-bold">27AABCA1234F1Z5</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">Apex Technologies Pvt Ltd</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-900 font-medium">₹40,000.00</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-900 font-medium">₹7,200.00</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                    Filed in 2B
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-700 font-bold">
                  Eligible
                </td>
              </tr>
              <tr className="hover:bg-blue-50/50 transition">
                <td className="py-3.5 px-4 font-mono text-blue-700 font-bold">27AAACT2727Q1ZW</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">Tata Consultancy Services</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-900 font-medium">₹1,25,000.00</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-900 font-medium">₹22,500.00</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                    Filed in 2B
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-700 font-bold">
                  Eligible
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TDS Section Summary */}
      <div className="glass-card rounded-xl p-5 space-y-4 shadow-sm">
        <h3 className="font-bold text-sm text-slate-800">TDS Tax Deduction at Source (Quarter 2)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2 shadow-xs">
            <div className="text-slate-800 font-bold font-sans">Section 194J - Professional & Technical Fees</div>
            <div className="text-slate-600 font-medium">Deduction Rate: <span className="text-blue-700 font-bold">10%</span></div>
            <div className="text-slate-900 font-medium">Total Deducted: <span className="text-slate-900 font-bold">₹ 4,000</span></div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2 shadow-xs">
            <div className="text-slate-800 font-bold font-sans">Section 194C - Contractors & Sub-contractors</div>
            <div className="text-slate-600 font-medium">Deduction Rate: <span className="text-blue-700 font-bold">1% / 2%</span></div>
            <div className="text-slate-900 font-medium">Total Deducted: <span className="text-slate-900 font-bold">₹ 1,250</span></div>
          </div>
        </div>
      </div>

      {/* GSTR-3B Return Filing Modal */}
      {isFilingModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">Prepare GSTR-3B Return (July 2026)</h3>
              <button onClick={() => setIsFilingModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-slate-600">Outward Tax Payable (GSTR-1):</span>
                <span className="font-bold text-slate-900">₹4,90,000.00</span>
              </div>
              <div className="flex justify-between bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-slate-600">Eligible ITC Credit (GSTR-2B):</span>
                <span className="font-bold text-emerald-700">- ₹2,45,000.00</span>
              </div>
              <div className="flex justify-between bg-blue-50 p-3 rounded border border-blue-200 font-bold text-sm">
                <span className="text-blue-900 font-sans">Net Cash Tax Payable:</span>
                <span className="text-blue-700">₹2,45,000.00</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button 
                onClick={() => setIsFilingModalOpen(false)} 
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleFileReturn} 
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md shadow-blue-500/20"
              >
                Submit & Sign GSTR-3B Return
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
