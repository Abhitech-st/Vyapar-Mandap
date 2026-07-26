import React from 'react';
import { Bot, CheckCircle2, AlertTriangle, Info, Clock, Sparkles } from 'lucide-react';

interface ActivityItem {
  id: string;
  agent: string;
  step: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info';
  confidence?: number;
}

export const ActivityTimeline: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: 'act-1',
      agent: 'Invoice Agent',
      step: 'Vision OCR Extraction',
      message: 'Parsed bill INV-2026-089 from Apex Technologies (Grand Total: ₹47,200)',
      time: '2 mins ago',
      type: 'success',
      confidence: 0.985
    },
    {
      id: 'act-2',
      agent: 'GST Agent',
      step: 'GSTR-2B Registry Check',
      message: 'Verified 18% CGST/SGST input tax credit against supplier filing.',
      time: '2 mins ago',
      type: 'success'
    },
    {
      id: 'act-3',
      agent: 'Supervisor Agent',
      step: 'Human Signoff Checkpoint',
      message: 'Journal Entry proposal #JE-402 awaiting CA approval before ledger commit.',
      time: 'Just now',
      type: 'warning'
    },
    {
      id: 'act-4',
      agent: 'Bank Rec Agent',
      step: 'Fuzzy Matching Engine',
      message: 'Matched NEFT transaction ₹47,200 against payment voucher #PV-109.',
      time: '15 mins ago',
      type: 'info'
    }
  ];

  return (
    <div className="glass-card rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-slate-200 text-sm">AI Agent Activity Ticker</h3>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
          Linear Event Stream
        </span>
      </div>

      <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start space-x-3 relative group">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs z-10 ${
              act.type === 'success' ? 'bg-emerald-950 border border-emerald-600 text-emerald-400' :
              act.type === 'warning' ? 'bg-amber-950 border border-amber-600 text-amber-400' :
              'bg-slate-900 border border-slate-700 text-slate-300'
            }`}>
              {act.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {act.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
              {act.type === 'info' && <Bot className="w-3.5 h-3.5" />}
            </div>

            <div className="flex-1 bg-slate-900/60 border border-slate-800/80 rounded-lg p-3 group-hover:border-slate-700 transition">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                  <span>{act.agent}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({act.step})</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{act.time}</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{act.message}</p>
              {act.confidence && (
                <div className="mt-2 flex items-center space-x-2 text-[10px] font-mono text-emerald-400">
                  <span className="bg-emerald-950 border border-emerald-800 px-1.5 py-0.5 rounded">
                    AI Confidence: {(act.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
