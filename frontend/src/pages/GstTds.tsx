import React from 'react';
import { Receipt, AlertTriangle, CheckCircle2, FileText, ArrowUpRight } from 'lucide-react';

export const GstTds: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-100">GST & TDS Compliance Engine</h1>
        <p className="text-xs text-slate-400">GSTR-1 Outward Summary, GSTR-3B Tax Liability & Section 194C/194J Deductions</p>
      </div>

      {/* GST Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 space-y-2">
          <div className="text-xs text-slate-400">Taxable Value (July 2026)</div>
          <div className="text-2xl font-bold font-mono text-slate-100">₹ 40,00,000</div>
          <div className="text-[11px] font-mono text-emerald-400">GSTR-1 Outward Verified</div>
        </div>

        <div className="glass-card rounded-xl p-5 space-y-2">
          <div className="text-xs text-slate-400">Input Tax Credit (ITC Claimed)</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">₹ 7,20,000</div>
          <div className="text-[11px] font-mono text-slate-400">Verified against GSTR-2B</div>
        </div>

        <div className="glass-card rounded-xl p-5 space-y-2">
          <div className="text-xs text-slate-400">Net Estimated Liability</div>
          <div className="text-2xl font-bold font-mono text-amber-400">₹ 2,45,000</div>
          <div className="text-[11px] font-mono text-amber-400">Due 20-Aug-2026</div>
        </div>
      </div>

      {/* ITC Mismatch Auditor Table */}
      <div className="glass-card rounded-xl overflow-hidden border border-slate-800">
        <div className="px-5 py-4 border-b border-slate-800 font-semibold text-sm text-slate-200 flex justify-between items-center">
          <span>GSTR-2B Input Tax Credit (ITC) Matching Directory</span>
          <span className="text-xs font-mono text-emerald-400">100% Active Supplier GSTINs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Supplier GSTIN</th>
                <th className="py-3 px-4">Supplier Name</th>
                <th className="py-3 px-4 text-right">Taxable Amount</th>
                <th className="py-3 px-4 text-right">CGST + SGST</th>
                <th className="py-3 px-4 text-center">GSTR-2B Portal Status</th>
                <th className="py-3 px-4 text-right">ITC Claim Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr className="hover:bg-slate-900/40 transition">
                <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">27AABCA1234F1Z5</td>
                <td className="py-3.5 px-4 font-medium text-slate-200">Apex Technologies Pvt Ltd</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-200">₹40,000.00</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-200">₹7,200.00</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono text-[10px]">
                    Filed in 2B
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-400 font-semibold">
                  Eligible
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition">
                <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">27AAACT2727Q1ZW</td>
                <td className="py-3.5 px-4 font-medium text-slate-200">Tata Consultancy Services</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-200">₹1,25,000.00</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-200">₹22,500.00</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono text-[10px]">
                    Filed in 2B
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-400 font-semibold">
                  Eligible
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TDS Section Summary */}
      <div className="glass-card rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-sm text-slate-200">TDS Tax Deduction at Source (Quarter 2)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
            <div className="text-slate-400 font-semibold">Section 194J - Professional & Technical Fees</div>
            <div className="text-slate-200">Deduction Rate: <span className="text-emerald-400 font-bold">10%</span></div>
            <div className="text-slate-200">Total Deducted: <span className="text-slate-100 font-bold">₹ 4,000</span></div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
            <div className="text-slate-400 font-semibold">Section 194C - Contractors & Sub-contractors</div>
            <div className="text-slate-200">Deduction Rate: <span className="text-emerald-400 font-bold">1% / 2%</span></div>
            <div className="text-slate-200">Total Deducted: <span className="text-slate-100 font-bold">₹ 1,250</span></div>
          </div>
        </div>
      </div>

    </div>
  );
};
