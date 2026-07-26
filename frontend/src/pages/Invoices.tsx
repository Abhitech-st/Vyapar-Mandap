import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Check, CheckCircle2, Eye, FileUp, Loader2, Sparkles, Upload, X } from 'lucide-react';
import { DocumentViewer } from '../components/DocumentViewer';
import {
  approveInvoice,
  fetchInvoiceDetail,
  fetchInvoices,
  InvoiceDetail,
  InvoiceSummary,
  uploadInvoice,
} from '../services/api';

interface InvoicesProps {
  selectedReviewId?: string | null;
  onClearReviewId?: () => void;
}

const money = (value: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
}).format(value);

const dateLabel = (value: string) => new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', {
  day: '2-digit', month: 'short', year: 'numeric',
});

export const Invoices: React.FC<InvoicesProps> = ({ selectedReviewId, onClearReviewId }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [invoices, setInvoices] = useState<InvoiceSummary[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetail | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadInvoices = async () => {
    setIsLoading(true);
    try {
      setInvoices(await fetchInvoices());
      setError(null);
    } catch {
      setError('The invoice service is unavailable. Start the FastAPI backend and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openReview = async (invoiceId: string) => {
    try {
      setError(null);
      setSelectedInvoice(await fetchInvoiceDetail(invoiceId));
      setSuccess(null);
      setIsReviewOpen(true);
    } catch {
      setError('Unable to load the invoice review workspace.');
    }
  };

  useEffect(() => {
    void loadInvoices();
  }, []);

  useEffect(() => {
    if (selectedReviewId) {
      void openReview(selectedReviewId);
    }
  }, [selectedReviewId]);

  const closeReview = () => {
    setIsReviewOpen(false);
    setSelectedInvoice(null);
    onClearReviewId?.();
  };

  const processFile = async (file?: File) => {
    if (!file) return;
    setIsUploading(true);
    setError(null);
    try {
      const result = await uploadInvoice(file);
      await loadInvoices();
      await openReview(result.invoice_id);
    } catch {
      setError('The document could not be processed. Use a non-empty PDF, image, or text invoice and try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const approveSelectedInvoice = async () => {
    if (!selectedInvoice) return;
    setIsPosting(true);
    setError(null);
    try {
      const result = await approveInvoice(selectedInvoice.invoice.id);
      const refreshed = await fetchInvoiceDetail(selectedInvoice.invoice.id);
      setSelectedInvoice(refreshed);
      await loadInvoices();
      setSuccess(`${result.entry_number} posted as an immutable journal entry.`);
    } catch {
      setError('Posting was rejected. The proposed journal remains unchanged for review.');
    } finally {
      setIsPosting(false);
    }
  };

  const journal = selectedInvoice?.proposed_journal;
  const isPosted = selectedInvoice?.invoice.status === 'Posted' || journal?.status === 'Posted';

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Invoices & Vendor Bills</h1>
          <p className="text-xs text-slate-600 font-medium">OCR extraction, GSTIN verification, and human-approved double-entry posting.</p>
        </div>
        <button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs transition shadow-md shadow-blue-500/20 cursor-pointer">
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <span>{isUploading ? 'AI parsing invoice...' : 'Upload vendor invoice'}</span>
        </button>
        <input ref={fileInputRef} className="hidden" type="file" accept="application/pdf,image/*,.txt" onChange={(event) => void processFile(event.target.files?.[0])} />
      </div>

      {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-800 font-semibold flex gap-2"><AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />{error}</div>}

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => { event.preventDefault(); void processFile(event.dataTransfer.files[0]); }}
        className="glass-card rounded-2xl p-8 border-2 border-dashed border-slate-300 hover:border-blue-500 transition cursor-pointer text-center space-y-3 group shadow-xs"
      >
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 group-hover:border-blue-400 text-blue-600 flex items-center justify-center mx-auto transition"><FileUp className="w-6 h-6" /></div>
        <div>
          <div className="text-sm font-bold text-slate-900">Drop an invoice PDF, image, or text file</div>
          <p className="text-xs text-slate-600 mt-1 font-medium">The Invoice, GST, and Ledger agents prepare a reviewable double-entry proposal.</p>
        </div>
        <div className="text-[11px] font-mono text-blue-800 bg-blue-50 inline-block px-3 py-1 rounded border border-blue-200 font-semibold">Human signoff is required before posting</div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 font-bold text-sm text-slate-800 flex justify-between items-center bg-white"><span>Processed document directory</span><span className="text-xs font-mono text-slate-500">{invoices.length} invoices</span></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[10px]"><tr><th className="py-3 px-4">Invoice #</th><th className="py-3 px-4">Vendor & GSTIN</th><th className="py-3 px-4">Date</th><th className="py-3 px-4 text-right">Grand Total</th><th className="py-3 px-4 text-center">AI confidence</th><th className="py-3 px-4">Status</th><th className="py-3 px-4 text-right">Action</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading && <tr><td className="py-8 text-center text-slate-500 font-medium" colSpan={7}>Loading financial documents...</td></tr>}
              {!isLoading && invoices.length === 0 && <tr><td className="py-8 text-center text-slate-500 font-medium" colSpan={7}>No invoices yet. Upload the first vendor bill to begin.</td></tr>}
              {invoices.map((invoice) => {
                const posted = invoice.status === 'Posted';
                return <tr key={invoice.id} className="hover:bg-blue-50/50 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{invoice.invoice_number}</td>
                  <td className="py-3.5 px-4"><div className="font-bold text-slate-900">{invoice.vendor_name}</div><div className="text-[10px] font-mono text-slate-500">{invoice.vendor_gstin}</div></td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono font-medium">{dateLabel(invoice.invoice_date)}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">{money(invoice.grand_total)}</td>
                  <td className="py-3.5 px-4 text-center"><span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-mono text-[10px] font-semibold">{(invoice.ai_confidence * 100).toFixed(1)}%</span></td>
                  <td className="py-3.5 px-4"><span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-semibold ${posted ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-amber-50 text-amber-900 border-amber-300'}`}>{posted ? 'Posted & balanced' : 'Pending human signoff'}</span></td>
                  <td className="py-3.5 px-4 text-right"><button onClick={() => void openReview(invoice.id)} className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold transition inline-flex items-center space-x-1"><Eye className="w-3.5 h-3.5 text-blue-600" /><span>Inspect</span></button></td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isReviewOpen && selectedInvoice && journal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50"><div className="flex items-center space-x-3"><span className="font-bold text-base text-slate-900">Review invoice: {selectedInvoice.invoice.invoice_number}</span><span className="bg-blue-50 text-blue-800 border border-blue-200 text-xs px-2.5 py-0.5 rounded font-mono font-semibold">AI confidence: {(selectedInvoice.invoice.ai_confidence * 100).toFixed(1)}%</span></div><button onClick={closeReview} className="p-1 rounded text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              <div className="p-4 bg-slate-50 flex flex-col h-full overflow-hidden"><DocumentViewer invoiceNumber={selectedInvoice.invoice.invoice_number} vendorName={selectedInvoice.vendor?.name} subtotal={selectedInvoice.invoice.subtotal} taxTotal={selectedInvoice.invoice.tax_total} grandTotal={selectedInvoice.invoice.grand_total} date={dateLabel(selectedInvoice.invoice.invoice_date)} /></div>
              <div className="p-6 overflow-y-auto space-y-6 bg-white">
                {success && <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />{success}</div>}
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2"><div className="flex items-center space-x-2 text-blue-700 font-bold text-xs"><CheckCircle2 className="w-4 h-4 text-blue-600" /><span>OCR extraction and GST rule verification complete</span></div><p className="text-xs text-slate-700 font-medium">GSTIN {selectedInvoice.vendor?.gstin || 'unavailable'} is included in the review trail. ITC status: {selectedInvoice.gst_record?.itc_status || 'Not assessed'}.</p></div>
                <div className="grid grid-cols-2 gap-3 text-xs"><div className="bg-slate-50 p-3 rounded-lg border border-slate-200"><span className="text-slate-500 text-[10px] font-semibold">Vendor</span><div className="font-bold text-slate-900 mt-0.5">{selectedInvoice.vendor?.name}</div></div><div className="bg-slate-50 p-3 rounded-lg border border-slate-200"><span className="text-slate-500 text-[10px] font-semibold">Tax split</span><div className="font-bold text-blue-700 mt-0.5">{money(selectedInvoice.gst_record?.cgst || 0)} CGST + {money(selectedInvoice.gst_record?.sgst || 0)} SGST</div></div></div>
                <div className="space-y-3"><div className="flex items-center justify-between"><h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-mono">Proposed journal entry</h3><span className={`text-[10px] font-mono font-bold ${journal.total_debit === journal.total_credit ? 'text-blue-700' : 'text-rose-700'}`}>Dr {money(journal.total_debit)} = Cr {money(journal.total_credit)}</span></div><div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs shadow-xs"><table className="w-full text-left font-mono"><thead className="bg-slate-100 text-slate-700 text-[10px] font-bold"><tr><th className="py-2 px-3">Account</th><th className="py-2 px-3 text-right">Debit</th><th className="py-2 px-3 text-right">Credit</th></tr></thead><tbody className="divide-y divide-slate-100">{journal.lines.map((line) => <tr key={`${line.account_code}-${line.narration}`}><td className="py-2.5 px-3"><div className="text-slate-900 font-bold">{line.account_code} - {line.account_name}</div><div className="text-[10px] text-slate-500 font-sans font-medium">{line.narration}</div></td><td className="py-2.5 px-3 text-right text-slate-900 font-semibold">{line.debit ? money(line.debit) : '-'}</td><td className="py-2.5 px-3 text-right text-blue-700 font-bold">{line.credit ? money(line.credit) : '-'}</td></tr>)}</tbody></table></div></div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4"><button onClick={closeReview} className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold transition">Close review</button><button onClick={() => void approveSelectedInvoice()} disabled={isPosted || isPosting || journal.total_debit !== journal.total_credit} className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs transition shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 cursor-pointer">{isPosting ? <Loader2 className="w-4 h-4 animate-spin" /> : isPosted ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}<span>{isPosted ? 'Posted to immutable ledger' : 'Approve and post double-entry journal'}</span></button></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
