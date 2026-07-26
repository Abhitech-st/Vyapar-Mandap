import React, { useState } from 'react';
import { Bot, CheckCircle2, AlertTriangle, Info, Clock, Sparkles, Filter } from 'lucide-react';

interface ActivityItem {
  id: string;
  agent: string;
  step: string;
  message: string;
  time: string;
  type: 'warning' | 'success' | 'info';
  isException?: boolean;
  confidence?: number;
  actionableText?: string;
}

export const ActivityTimeline: React.FC = () => {
  const [filterMode, setFilterMode] = useState<'all' | 'exceptions'>('all');

  const activities: ActivityItem[] = [
    {
      id: 'act-3',
      agent: 'Supervisor Agent',
      step: 'Human Signoff Checkpoint',
      message: 'Journal Entry proposal #JE-402 for Apex Technologies (₹47,200) requires CA sign-off before posting.',
      time: 'Just now',
      type: 'warning',
      isException: true,
      actionableText: 'Action Required: Approval Pending'
    },
    {
      id: 'act-1',
      agent: 'Invoice Agent',
      step: 'Vision OCR Extraction',
      message: 'Parsed bill INV-2026-089 from Apex Technologies (Subtotal: ₹40,000, Tax: ₹7,200)',
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
      id: 'act-4',
      agent: 'Bank Rec Agent',
      step: 'Fuzzy Matching Engine',
      message: 'Matched NEFT transaction ₹47,200 against payment voucher #PV-109.',
      time: '15 mins ago',
      type: 'info'
    }
  ];

  const displayedActivities = filterMode === 'exceptions'
    ? activities.filter(a => a.isException)
    : activities;

  return (
    <div className="glass-card rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-slate-100 text-sm">Agent Activity & Operational Trace</h3>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-md transition text-[11px] font-medium ${
              filterMode === 'all' ? 'bg-slate-800 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilterMode('exceptions')}
            className={`px-2.5 py-1 rounded-md transition text-[11px] font-medium flex items-center space-x-1 ${
              filterMode === 'exceptions' ? 'bg-amber-950 text-amber-300 border border-amber-800 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>Exceptions (1)</span>
          </button>
        </div>
      </div>

      <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
        {displayedActivities.map((act) => (
          <div key={act.id} className="flex items-start space-x-3 relative group">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs z-10 shrink-0 ${
              act.type === 'warning' ? 'bg-amber-950 border border-amber-500 text-amber-300 glow-amber' :
              act.type === 'success' ? 'bg-emerald-950 border border-emerald-600 text-emerald-400' :
              'bg-slate-900 border border-slate-700 text-slate-200'
            }`}>
              {act.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
              {act.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {act.type === 'info' && <Bot className="w-3.5 h-3.5" />}
            </div>

            <div className={`flex-1 rounded-lg p-3 border transition ${
              act.isException 
                ? 'bg-slate-900 border-amber-500/50 shadow-md' 
                : 'bg-slate-900/80 border-slate-800 group-hover:border-slate-700'
            }`}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-100 flex items-center space-x-1.5">
                  <span>{act.agent}</span>
                  <span className="text-[11px] text-slate-300 font-mono">({act.step})</span>
                </span>
                <span className="text-[11px] text-slate-300 font-mono flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{act.time}</span>
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-sans">{act.message}</p>

              <div className="mt-2 flex items-center space-x-2 text-[11px] font-mono">
                {act.actionableText && (
                  <span className="bg-amber-950/80 text-amber-300 border border-amber-700 px-2 py-0.5 rounded font-semibold">
                    ⚠️ {act.actionableText}
                  </span>
                )}
                {act.confidence && (
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded">
                    AI Confidence: {(act.confidence * 100).toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
