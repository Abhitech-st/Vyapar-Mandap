import React, { useState } from 'react';
import { 
  Upload, FileText, CheckCircle2, AlertTriangle, Eye, Sparkles, 
  X, Check, ShieldCheck, FileUp, ArrowRight 
} from 'lucide-react';
import { DocumentViewer } from '../components/DocumentViewer';

interface InvoicesProps {
  selectedReviewId?: string | null;
  onClearReviewId?: () => void;
}

export const Invoices: React.FC<InvoicesProps> = ({ selectedReviewId, onClearReviewId }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(!!selectedReviewId);
  const [isPosted, setIsPosted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const mockInvoices = [
    {
      id: "inv-1",
      number: "INV-2026-089",
      vendor: "Apex Technologies Pvt Ltd",
      gstin: "27AABCA1234F1Z5",
      date: "24-Jul-2026",
      total: 47200.0,
      status: isPosted ? "Posted & Balanced" : "Pending Human Signoff",
      confidence: 0.985
    },
    {
      id: "inv-2",
      number: "TCS-BILL-402",
      vendor: "Tata Consultancy Services",
      gstin: "27AAACT2727Q1ZW",
      date: "20-Jul-2026",
      total: 147500.0,
      status: "Posted & Balanced",
      confidence: 0.99
    }
  ];

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsReviewOpen(true);
    }, 1200);
  };

  const handleApprove = () => {
    setIsPosted(true);
    setTimeout(() => {
      setIsReviewOpen(false);
      if (onClearReviewId) onClearReviewId();
    }, 800);
  };

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Invoices & Vendor Bills</h1>
          <p className="text-xs text-slate-400">OCR Extraction, GSTIN Verification & Double-Entry Journal Generator</p>
        </div>

        {/* Upload Trigger */}
        <button
          onClick={handleSimulateUpload}
          disabled={isUploading}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition shadow-lg shadow-emerald-600/20"
        >
          <Upload className="w-4 h-4" />
          <span>{isUploading ? "AI Parsing OCR Stream..." : "Upload Vendor Invoice"}</span>
        </button>
      </div>

      {/* Drag & Drop Zone */}
      <div 
        onClick={handleSimulateUpload}
        className="glass-card rounded-2xl p-8 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 transition cursor-pointer text-center space-y-3 group"
      >
        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto transition">
          <FileUp className="w-6 h-6" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-200">Drag & Drop Invoice PDF / Image here</div>
          <p className="text-xs text-slate-400 mt-1">Supports multi-page PDFs, scanned receipts, messy CSV statement exports</p>
        </div>
        <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950 inline-block px-3 py-1 rounded border border-emerald-800">
          Automated Vision OCR & HSN Code Classification Active
        </div>
      </div>

      {/* Invoice Table */}
      <div className="glass-card rounded-xl overflow-hidden border border-slate-800">
        <div className="px-5 py-4 border-b border-slate-800 font-semibold text-sm text-slate-200 flex justify-between items-center">
          <span>Processed Document Directory</span>
          <span className="text-xs font-mono text-slate-400">2 Invoices</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Vendor & GSTIN</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Grand Total</th>
                <th className="py-3 px-4 text-center">AI Confidence</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {mockInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-200">{inv.number}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-200">{inv.vendor}</div>
                    <div className="text-[10px] font-mono text-slate-500">{inv.gstin}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{inv.date}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-100">
                    ₹{inv.total.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono text-[10px]">
                      {(inv.confidence * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                      inv.status.includes("Posted")
                        ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                        : "bg-amber-950 text-amber-400 border-amber-800 glow-amber"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setIsReviewOpen(true)}
                      className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition inline-flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Split-Screen Review Modal */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-base text-slate-100">Review Invoice: INV-2026-089</span>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs px-2.5 py-0.5 rounded font-mono">
                  AI Confidence: 98.5%
                </span>
              </div>
              <button 
                onClick={() => {
                  setIsReviewOpen(false);
                  if (onClearReviewId) onClearReviewId();
                }} 
                className="p-1 rounded text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Screen Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
              
              {/* Left Column: PDF Document Viewer */}
              <div className="p-4 bg-slate-950 flex flex-col h-full overflow-hidden">
                <DocumentViewer />
              </div>

              {/* Right Column: AI Extraction & Proposed Double-Entry Entry */}
              <div className="p-6 overflow-y-auto space-y-6 bg-slate-900">
                
                {/* Status Alert */}
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>OCR Extraction & Tax Rule Verification Complete</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Invoice Agent extracted vendor details and tax splits. GST Agent verified active status on GST portal.
                  </p>
                </div>

                {/* Extracted Form Fields */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-xs text-slate-300 uppercase tracking-wider font-mono">Extracted Key Fields</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-500 text-[10px]">Vendor Name</span>
                      <div className="font-semibold text-slate-200 mt-0.5">Apex Technologies Pvt Ltd</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
                      <span className="text-slate-500 text-[10px]">Vendor GSTIN</span>
                      <div className="font-semibold text-emerald-400 mt-0.5 flex items-center space-x-1">
                        <span>27AABCA1234F1Z5</span>
                        <Check className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proposed Immutable Double-Entry Entry */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-xs text-slate-300 uppercase tracking-wider font-mono">Proposed Journal Entry</h3>
                    <span className="text-[10px] font-mono text-emerald-400">Debit = Credit Validated</span>
                  </div>

                  <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-xs">
                    <table className="w-full text-left font-mono">
                      <thead className="bg-slate-900 text-slate-400 text-[10px]">
                        <tr>
                          <th className="py-2 px-3">Account Code & Name</th>
                          <th className="py-2 px-3 text-right">Debit (Dr.)</th>
                          <th className="py-2 px-3 text-right">Credit (Cr.)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        <tr>
                          <td className="py-2.5 px-3">
                            <div className="text-slate-200 font-semibold">5100 - Computer & Server Exp</div>
                            <div className="text-[10px] text-slate-500 font-sans">Cloud Infrastructure</div>
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-200">₹40,000.00</td>
                          <td className="py-2.5 px-3 text-right text-slate-500">-</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3">
                            <div className="text-slate-200 font-semibold">1310 - Input CGST Asset</div>
                            <div className="text-[10px] text-slate-500 font-sans">9% CGST Claim</div>
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-200">₹3,600.00</td>
                          <td className="py-2.5 px-3 text-right text-slate-500">-</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3">
                            <div className="text-slate-200 font-semibold">1320 - Input SGST Asset</div>
                            <div className="text-[10px] text-slate-500 font-sans">9% SGST Claim</div>
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-200">₹3,600.00</td>
                          <td className="py-2.5 px-3 text-right text-slate-500">-</td>
                        </tr>
                        <tr className="bg-slate-900/60">
                          <td className="py-2.5 px-3">
                            <div className="text-emerald-400 font-semibold">2100 - Accounts Payable</div>
                            <div className="text-[10px] text-slate-500 font-sans">Apex Technologies Pvt Ltd</div>
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-500">-</td>
                          <td className="py-2.5 px-3 text-right font-bold text-emerald-400">₹47,200.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setIsReviewOpen(false)}
                    className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                  >
                    Reject & Edit Fields
                  </button>

                  <button
                    onClick={handleApprove}
                    disabled={isPosted}
                    className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>{isPosted ? "Posted to Ledger Immutably! ✅" : "Approve & Post Double-Entry Journal"}</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
