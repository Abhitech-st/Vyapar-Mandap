import React from 'react';
import { FileText, Download, ZoomIn, ZoomOut, Eye } from 'lucide-react';

interface DocumentViewerProps {
  invoiceNumber?: string;
  vendorName?: string;
  subtotal?: number;
  taxTotal?: number;
  grandTotal?: number;
  date?: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  invoiceNumber = "INV-2026-089",
  vendorName = "Apex Technologies Pvt Ltd",
  subtotal = 40000.0,
  taxTotal = 7200.0,
  grandTotal = 47200.0,
  date = "24-Jul-2026"
}) => {
  return (
    <div className="bg-slate-100 border border-slate-200 rounded-xl overflow-hidden flex flex-col h-full shadow-inner">
      {/* Top Toolbar */}
      <div className="bg-white px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono font-medium">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>{invoiceNumber}.pdf</span>
        </div>
        <div className="flex items-center space-x-3 text-slate-500">
          <button className="hover:text-blue-600 transition"><ZoomIn className="w-3.5 h-3.5" /></button>
          <button className="hover:text-blue-600 transition"><ZoomOut className="w-3.5 h-3.5" /></button>
          <button className="hover:text-blue-600 transition"><Download className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Rendered Tax Invoice Preview Canvas */}
      <div className="p-6 bg-slate-200/60 overflow-y-auto flex-1 flex justify-center">
        <div className="w-full max-w-md bg-white text-slate-900 rounded-lg shadow-xl p-6 font-sans text-xs space-y-4 border border-slate-300">
          
          {/* Invoice Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div>
              <h2 className="font-bold text-sm text-slate-900 tracking-tight">{vendorName}</h2>
              <p className="text-[10px] text-slate-500 font-mono">GSTIN: 27AABCA1234F1Z5</p>
              <p className="text-[10px] text-slate-500">Electronic City, Bengaluru, KA</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-base text-blue-700 tracking-wider">TAX INVOICE</span>
              <p className="text-[10px] text-slate-600 font-mono mt-0.5">#{invoiceNumber}</p>
              <p className="text-[10px] text-slate-500">Date: {date}</p>
            </div>
          </div>

          {/* Billed To */}
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px]">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">Billed To:</div>
            <div className="font-bold text-slate-800">M/S Sharma Traders</div>
            <div className="text-slate-600 text-[10px] font-mono">GSTIN: 27AABCS9876E1Z2</div>
            <div className="text-slate-600 text-[10px]">Bandra West, Mumbai, MH</div>
          </div>

          {/* Item Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-700">
                <th className="py-1.5 px-2">Description</th>
                <th className="py-1.5 px-2 font-mono">HSN</th>
                <th className="py-1.5 px-2 text-right">Rate</th>
                <th className="py-1.5 px-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              <tr>
                <td className="py-2 px-2 text-slate-800">Cloud Server Hosting & Maintenance</td>
                <td className="py-2 px-2 font-mono text-[10px] text-slate-600">998315</td>
                <td className="py-2 px-2 text-right font-mono text-slate-700">₹{subtotal.toLocaleString('en-IN')}</td>
                <td className="py-2 px-2 text-right font-mono font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div className="pt-2 border-t border-slate-200 space-y-1 text-[11px] text-right font-mono">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>CGST (9%):</span>
              <span>₹{(taxTotal/2).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>SGST (9%):</span>
              <span>₹{(taxTotal/2).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-slate-900 border-t border-slate-200 pt-1">
              <span>Grand Total:</span>
              <span className="text-blue-700">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Stamp / Verification Footer */}
          <div className="pt-4 text-center border-t border-slate-200 text-[10px] text-slate-400 font-mono">
            Digitally Signed & Validated via Vyapar Mandap OCR
          </div>

        </div>
      </div>
    </div>
  );
};
