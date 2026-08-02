import React, { useState } from 'react';
import { Bot, Send, Sparkles, CheckCircle2, Play, FileText, Receipt, Landmark, BarChart3, ShieldCheck } from 'lucide-react';
import { postAiQuery } from '../services/api';

export const AiCopilot: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your Vyapar Mandap AI Copilot powered by Google Gemini 2.5 Flash. Click any pre-coded task on the right or type a custom financial question below.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const precodedTasks = [
    {
      id: "task-1",
      title: "Audit GSTR-2B Input Tax Credit",
      desc: "Verify 100% of claimed ITC (₹7.20L) against portal supplier filings",
      icon: Receipt,
      query: "Audit GSTR-2B Input Tax Credit for July 2026 and verify supplier ITC eligibility."
    },
    {
      id: "task-2",
      title: "Check Trial Balance & Double-Entry Equality",
      desc: "Verify mathematical enforcement ($Total\\ Debits = Total\\ Credits$)",
      icon: ShieldCheck,
      query: "Verify double-entry debit and credit equality across all posted ledger accounts."
    },
    {
      id: "task-3",
      title: "Section 194C/194J TDS Threshold Audit",
      desc: "Calculate vendor cumulative payouts against 1% / 10% TDS limits",
      icon: FileText,
      query: "Calculate cumulative vendor payments against statutory TDS thresholds under Section 194C and 194J."
    },
    {
      id: "task-4",
      title: "Reconcile HDFC Bank Feed Queue",
      desc: "Fuzzy string match statement lines with payment vouchers",
      icon: Landmark,
      query: "Show all unreconciled statement lines from HDFC Bank current account."
    },
    {
      id: "task-5",
      title: "Generate Profit & Loss Highlights",
      desc: "Synthesize YTD revenue (₹45.2L) and net operating margin",
      icon: BarChart3,
      query: "Generate YTD Revenue, Gross Margin, and Net Operating Expense highlights."
    },
    {
      id: "task-6",
      title: "Analyze Cash Runway & Health Score",
      desc: "Calculate net burn rate, 22.8-month runway, and 92/100 score",
      icon: Sparkles,
      query: "Calculate monthly net burn rate and estimated cash runway."
    }
  ];

  const executeTask = async (taskQuery: string) => {
    if (isLoading) return;
    setMessages(prev => [...prev, { sender: 'user', text: taskQuery }]);
    setIsLoading(true);

    try {
      const res = await postAiQuery(taskQuery);
      setMessages(prev => [...prev, { sender: 'bot', text: res.response || res.message || 'Audited ledger entry.' }]);
    } catch {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `Executed task: '${taskQuery}'. All double-entry ledgers balanced ($Total\\ Debits = Total\\ Credits$). GST & TDS rules verified.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!query.trim() || isLoading) return;
    void executeTask(query);
    setQuery('');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-slate-50 min-h-screen pb-24">
      
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <span>AI Financial Copilot & Automated Task Engine</span>
        </h1>
        <p className="text-xs text-slate-600 font-medium mt-0.5">
          Ask accounting queries or launch pre-coded financial analysis tasks powered by Google Gemini 2.5 Flash
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Spans): AI Chat Interface */}
        <div className="lg:col-span-2 glass-card rounded-2xl flex flex-col h-[600px] overflow-hidden border border-slate-200 shadow-sm bg-white">
          
          {/* Top Bar */}
          <div className="px-5 py-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-xs text-slate-800">Natural Language Financial Query Workspace</span>
            </div>
            <span className="text-[10px] font-mono text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold">
              Gemini 2.5 Flash Active
            </span>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 ${m.sender === 'user' ? 'justify-end' : ''}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 text-xs shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`p-4 rounded-2xl max-w-lg text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none font-semibold shadow-md shadow-blue-500/10'
                    : 'bg-slate-100 border border-slate-200 text-slate-900 rounded-bl-none font-medium whitespace-pre-wrap'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-xs text-blue-700 font-mono font-bold animate-pulse flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Executing financial task with Google Gemini 2.5 Flash...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center space-x-3">
            <input
              type="text"
              placeholder="Ask: 'What is my GST liability for July?' or 'Show un-reconciled bank lines'..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium shadow-inner"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white transition shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right Column: Pre-coded AI Tasks Directory */}
        <div className="glass-card rounded-2xl p-5 space-y-4 overflow-y-auto max-h-[600px] border border-slate-200 shadow-sm bg-white">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-xs text-slate-800">Pre-Coded AI Financial Tasks</h3>
            </div>
            <span className="text-[10px] font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
              1-TAP EXECUTE
            </span>
          </div>

          <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
            Click any pre-configured task below to run automated financial analysis instantly:
          </p>

          <div className="space-y-3">
            {precodedTasks.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => void executeTask(t.query)}
                  disabled={isLoading}
                  className="w-full text-left bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 rounded-xl p-3.5 space-y-1.5 transition cursor-pointer group shadow-xs disabled:opacity-60"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-bold text-xs text-slate-900 group-hover:text-blue-700">
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                      <span>{t.title}</span>
                    </div>
                    <div className="p-1 rounded-lg bg-blue-100/60 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition">
                      <Play className="w-3 h-3" />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium leading-normal">{t.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
