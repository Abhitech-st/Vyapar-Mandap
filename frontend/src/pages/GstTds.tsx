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

  const supplierData = [
    { gstin: "27AABCA1234F1Z5", name: "Apex Technologies Pvt Ltd", taxable: 40000.0, tax: 7200.0, status: "Filed in 2B", itc: "Eligible" },
    { gstin: "27AAACT2727Q1ZW", name: "Tata Consultancy Services", taxable: 125000.0, tax: 22500.0, status: "Filed in 2B", itc: "Eligible" }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-slate-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">Tax Compliance — GST & TDS Engine</h1>
          <p className="text-xs text-slate-600 font-medium">GSTR-1 Outward Summary, GSTR-3B Tax Liability & Section 194C/194J Deductions</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button 
            onClick={runItcAudit}
            disabled={isAuditing}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
          >
            {isAuditing ? <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" /> : <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
            <span>{isAuditing ? 'Auditing GSTR-2B...' : 'Run GSTR-2B ITC Audit'}</span>
          </button>
          
          <button 
            onClick={() => setIsFilingModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 cursor-pointer"
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
        <div className="glass-card rounded-xl p-4 sm:p-5 space-y-1.5 shadow-xs bg-white border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold">Taxable Value (July 2026)</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">₹ 40,00,000</div>
          <div className="text-[11px] text-blue-700 font-semibold">GSTR-1 Outward Verified</div>
        </div>

        <div className="glass-card rounded-xl p-4 sm:p-5 space-y-1.5 shadow-xs bg-white border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold">Input Tax Credit (ITC Claimed)</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-700">₹ 7,20,000</div>
          <div className="text-[11px] text-slate-600 font-medium">Verified against GSTR-2B</div>
        </div>

        <div className="glass-card rounded-xl p-4 sm:p-5 space-y-1.5 shadow-xs bg-white border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold">Net Estimated Liability</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-800">₹ 2,45,000</div>
          <div className="text-[11px] text-amber-800 font-semibold">
            {isFiled ? "Filed & Paid" : "Due 20-Aug-2026"}
          </div>
        </div>
      </div>

      {/* GSTR-2B Matching Directory */}
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
        <div className="px-4 sm:px-5 py-3.5 border-b border-slate-200 font-bold text-xs sm:text-sm text-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white">
          <span>GSTR-2B Input Tax Credit (ITC) Matching Directory</span>
          <span className="text-[10px] sm:text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 self-start sm:self-auto">
            100% Active Supplier GSTINs
          </span>
        </div>

        {/* Mobile Screen View (<640px): Clean Mobile Cards */}
        <div className="block sm:hidden divide-y divide-slate-100">
          {supplierData.map((item, idx) => (
            <div key={idx} className="p-4 space-y-2 hover:bg-blue-50/40 transition">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-blue-700">{item.gstin}</span>
                <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                  {item.status}
                </span>
              </div>

              <div className="font-bold text-xs text-slate-900">{item.name}</div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <div className="text-slate-600">
                  Taxable: <span className="font-mono font-bold text-slate-900">₹{item.taxable.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-slate-600">
                  Tax: <span className="font-mono font-bold text-blue-700">₹{item.tax.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="text-right text-[11px] font-bold text-emerald-700">
                ITC Status: {item.itc}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View (>=640px): Responsive Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-slate-100 text-slate-700 font-sans font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap">Supplier GSTIN</th>
                <th className="py-3 px-4 whitespace-nowrap">Supplier Name</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Taxable Amount</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">CGST + SGST</th>
                <th className="py-3 px-4 text-center whitespace-nowrap">GSTR-2B Portal Status</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">ITC Claim Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {supplierData.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/50 transition">
                  <td className="py-3.5 px-4 font-mono text-blue-700 font-bold whitespace-nowrap">{item.gstin}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.name}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-900 font-medium whitespace-nowrap">₹{item.taxable.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-900 font-medium whitespace-nowrap">₹{item.tax.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-700 font-bold whitespace-nowrap">
                    {item.itc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TDS Section Summary */}
      <div className="glass-card rounded-2xl p-5 space-y-4 shadow-sm bg-white border border-slate-200">
        <h3 className="font-bold text-xs sm:text-sm text-slate-800">TDS Tax Deduction at Source (Quarter 2)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-xs">
            <div className="text-slate-800 font-bold font-sans">Section 194J - Professional & Technical Fees</div>
            <div className="text-slate-600 font-medium">Deduction Rate: <span className="text-blue-700 font-bold">10%</span></div>
            <div className="text-slate-900 font-medium">Total Deducted: <span className="text-slate-900 font-bold">₹ 4,000</span></div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-xs">
            <div className="text-slate-800 font-bold font-sans">Section 194C - Contractors & Sub-contractors</div>
            <div className="text-slate-600 font-medium">Deduction Rate: <span className="text-blue-700 font-bold">1% / 2%</span></div>
            <div className="text-slate-900 font-medium">Total Deducted: <span className="text-slate-900 font-bold">₹ 1,250</span></div>
          </div>
        </div>
      </div>

      {/* GSTR-3B Return Filing Modal (Fixed Alignment: Scrollable, Never Top-Clipped) */}
      {isFilingModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 overflow-y-auto p-4 flex items-center justify-center min-h-full">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden space-y-4 p-6 max-h-[85vh] overflow-y-auto my-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-base text-slate-900">Prepare GSTR-3B Return (July 2026)</h3>
              <button onClick={() => setIsFilingModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-600">Outward Tax Payable (GSTR-1):</span>
                <span className="font-bold text-slate-900">₹4,90,000.00</span>
              </div>
              <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-600">Eligible ITC Credit (GSTR-2B):</span>
                <span className="font-bold text-emerald-700">- ₹2,45,000.00</span>
              </div>
              <div className="flex justify-between bg-blue-50 p-3 rounded-xl border border-blue-200 font-bold text-sm">
                <span className="text-blue-900 font-sans">Net Cash Tax Payable:</span>
                <span className="text-blue-700">₹2,45,000.00</span>
              </div>
            </div>

            <div className="pt-3 flex justify-end space-x-3 border-t border-slate-100 sticky bottom-0 bg-white z-10">
              <button 
                onClick={() => setIsFilingModalOpen(false)} 
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleFileReturn} 
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md shadow-blue-500/20 cursor-pointer"
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
