import React from 'react';
import { Sparkles, CheckCircle2, Clock, ShieldCheck, FileCheck, Layers } from 'lucide-react';

export const AiPipelineBreakdown: React.FC = () => {
  const timelineSteps = [
    { time: "09:42", label: "Invoice Uploaded", status: "completed", desc: "PDF ingested & SHA256 hashed" },
    { time: "09:42", label: "OCR Extraction", status: "completed", conf: "99%", desc: "Gemini 2.5 Flash extracted line items" },
    { time: "09:43", label: "Vendor Matched", status: "completed", conf: "96%", desc: "Apex Technologies Pvt Ltd identified" },
    { time: "09:43", label: "GST Verified", status: "completed", conf: "100%", desc: "GSTIN syntax & GSTR-2B ITC matched" },
    { time: "09:44", label: "Journal Generated", status: "completed", conf: "94%", desc: "Dr. Server Exp + Dr. Tax = Cr. Payable" },
    { time: "09:45", label: "Awaiting Signoff", status: "pending", desc: "CA approval required before posting" }
  ];

  const validationRules = [
    { rule: "15-Char GSTIN Syntax", result: "Valid (27AABCA1234F1Z5)", status: "passed" },
    { rule: "GSTR-2B ITC Eligibility", result: "100% Eligible (Verified)", status: "passed" },
    { rule: "Double-Entry Balance", result: "Dr ₹47,200 = Cr ₹47,200", status: "passed" },
    { rule: "Section 194J TDS Check", result: "Below ₹30,000 threshold", status: "passed" },
    { rule: "Duplicate Invoice Guard", result: "No matching hash found", status: "passed" }
  ];

  const confBreakdown = [
    { label: "OCR Vision Extraction", value: 99, color: "bg-emerald-600" },
    { label: "GST Rule Validation", value: 100, color: "bg-emerald-600" },
    { label: "Vendor Account Match", value: 96, color: "bg-blue-600" },
    { label: "Ledger Proposal Accuracy", value: 94, color: "bg-blue-600" }
  ];

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 space-y-4 bg-white border border-slate-200 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-slate-900">AI Processing Pipeline & Compliance Rules</h3>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Traceable audit trail and automated checks for #INV-2026-089</p>
          </div>
        </div>

        <span className="text-[9px] sm:text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-bold">
          Gemini 2.5 Flash
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Step-by-Step Execution Timeline */}
        <div className="space-y-2.5">
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 block">Execution Pipeline</span>
          <div className="space-y-2 relative pl-3 border-l-2 border-slate-200">
            {timelineSteps.map((st, idx) => (
              <div key={idx} className="relative pl-2.5 space-y-0.5">
                <div className={`absolute -left-[17px] top-1 w-2 h-2 rounded-full ${
                  st.status === 'completed' ? 'bg-emerald-600' : 'bg-amber-500 animate-pulse'
                }`} />
                <div className="flex items-center space-x-1.5 text-[11px] sm:text-xs">
                  <span className="font-mono text-[9px] text-slate-400 font-medium">{st.time}</span>
                  <span className="font-bold text-slate-900">{st.label}</span>
                  {st.conf && (
                    <span className="text-[9px] bg-slate-100 text-slate-700 px-1 py-0.2 rounded font-bold">
                      {st.conf}
                    </span>
                  )}
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium leading-tight">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Validation Checklist */}
        <div className="space-y-2.5">
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 block">Automated Rule Checks</span>
          <div className="space-y-1.5">
            {validationRules.map((v, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] sm:text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-800">{v.rule}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{v.result}</div>
                </div>
                <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded border text-[9px] sm:text-[10px] font-bold bg-emerald-50 text-emerald-700 border-emerald-200">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>Passed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Confidence Metrics */}
        <div className="space-y-2.5">
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 block">AI Confidence Metrics</span>
          <div className="space-y-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
            {confBreakdown.map((cf, idx) => (
              <div key={idx} className="space-y-1 text-[11px] sm:text-xs">
                <div className="flex justify-between text-slate-700 font-semibold">
                  <span>{cf.label}</span>
                  <span className="font-bold text-slate-900">{cf.value}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full ${cf.color}`} 
                    style={{ width: `${cf.value}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
