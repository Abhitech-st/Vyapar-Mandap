import React, { useState } from 'react';
import { BookOpen, Plus, CheckCircle2, AlertOctagon, Lock, Sparkles, FolderTree, X } from 'lucide-react';

export const Accounting: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'journals' | 'coa'>('journals');
  const [debitVal, setDebitVal] = useState<number>(47200);
  const [creditVal, setCreditVal] = useState<number>(47200);
  const [narration, setNarration] = useState<string>("Manual adjusting entry for July server expenses");
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [newAccCode, setNewAccCode] = useState("");
  const [newAccName, setNewAccName] = useState("");
  const [newAccType, setNewAccType] = useState("Expense");

  const [accounts, setAccounts] = useState([
    { code: "1000", name: "Cash in Hand", type: "Asset", balance: 125000.0 },
    { code: "1010", name: "HDFC Bank Current A/c 4092", type: "Asset", balance: 4200000.0 },
    { code: "1310", name: "Input CGST Asset", type: "Asset", balance: 145000.0 },
    { code: "1320", name: "Input SGST Asset", type: "Asset", balance: 145000.0 },
    { code: "2100", name: "Accounts Payable (Vendors)", type: "Liability", balance: 1450000.0 },
    { code: "4000", name: "Sales & Services Revenue", type: "Revenue", balance: 4520000.0 },
    { code: "5100", name: "Computer & Server Expenses", type: "Expense", balance: 450000.0 },
  ]);

  const [journals, setJournals] = useState([
    {
      number: "JE-2026-402",
      date: "24-Jul-2026",
      narration: "Bill #INV-2026-089 from Apex Technologies Pvt Ltd",
      status: "Posted",
      isImmutable: true,
      totalDebit: 47200.0,
      totalCredit: 47200.0,
      lines: [
        { acc: "5100 - Computer & Server Exp", dr: 40000.0, cr: 0.0 },
        { acc: "1310 - Input CGST 9%", dr: 3600.0, cr: 0.0 },
        { acc: "1320 - Input SGST 9%", dr: 3600.0, cr: 0.0 },
        { acc: "2100 - Accounts Payable Apex", dr: 0.0, cr: 47200.0 },
      ]
    }
  ]);

  const isBalanced = Math.abs(debitVal - creditVal) < 0.01 && debitVal > 0;

  const handlePostJournal = () => {
    if (!isBalanced) return;
    const newJe = {
      number: `JE-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: "26-Jul-2026",
      narration: narration || "Manual Double-Entry Journal Entry",
      status: "Posted",
      isImmutable: true,
      totalDebit: debitVal,
      totalCredit: creditVal,
      lines: [
        { acc: "5100 - Computer & Server Exp", dr: debitVal, cr: 0.0 },
        { acc: "2100 - Accounts Payable (Vendors)", dr: 0.0, cr: creditVal }
      ]
    };
    setJournals([newJe, ...journals]);
  };

  const handleAddAccount = () => {
    if (!newAccCode || !newAccName) return;
    setAccounts([...accounts, { code: newAccCode, name: newAccName, type: newAccType, balance: 0.0 }]);
    setIsAddAccountModalOpen(false);
    setNewAccCode("");
    setNewAccName("");
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-slate-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">Ledger Engine — Immutable Double-Entry</h1>
          <p className="text-xs text-slate-600 font-medium">Strict mathematical debit equals credit validation ($Debits = Credits$)</p>
        </div>

        {/* Sub-tab Toggle */}
        <div className="flex items-center bg-slate-200/80 border border-slate-300 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('journals')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'journals' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Journal Entries
          </button>
          <button
            onClick={() => setActiveSubTab('coa')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'coa' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Chart of Accounts Tree
          </button>
        </div>
      </div>

      {activeSubTab === 'journals' ? (
        <div className="space-y-6">
          
          {/* Create Manual Entry Card */}
          <div className="glass-card rounded-2xl p-5 space-y-4 shadow-sm bg-white border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
              <h3 className="font-bold text-xs sm:text-sm text-slate-800 flex items-center space-x-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Post Manual Double-Entry Journal</span>
              </h3>
              <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold border self-start sm:self-auto ${
                isBalanced ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-rose-50 text-rose-800 border-rose-300'
              }`}>
                {isBalanced ? <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> : <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />}
                <span>{isBalanced ? "BALANCE EQUALITY VERIFIED" : "UNBALANCED DEBIT/CREDIT"}</span>
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
                placeholder="Journal entry narration description..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-600 shadow-inner"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 space-y-1">
                  <label className="text-slate-600 font-sans font-semibold">Total Debit (Dr.)</label>
                  <input
                    type="number"
                    value={debitVal}
                    onChange={(e) => setDebitVal(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-bold focus:outline-none focus:border-blue-600 shadow-inner"
                  />
                </div>
                <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 space-y-1">
                  <label className="text-slate-600 font-sans font-semibold">Total Credit (Cr.)</label>
                  <input
                    type="number"
                    value={creditVal}
                    onChange={(e) => setCreditVal(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-bold focus:outline-none focus:border-blue-600 shadow-inner"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handlePostJournal}
              disabled={!isBalanced}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                isBalanced
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Commit Entry Immutably to Ledger</span>
            </button>
          </div>

          {/* Journal Entries List */}
          <div className="glass-card rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <div className="px-5 py-4 border-b border-slate-200 font-bold text-xs sm:text-sm text-slate-800 bg-white">
              Immutable Financial Transaction Log
            </div>

            <div className="p-4 sm:p-5 space-y-4 bg-white">
              {journals.map((je, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold font-mono text-blue-700 text-sm">{je.number}</span>
                      <span className="text-slate-600 font-mono font-medium">{je.date}</span>
                      <span className="bg-blue-50 border border-blue-200 text-blue-800 px-2 py-0.5 rounded font-mono text-[10px] font-bold flex items-center space-x-1">
                        <Lock className="w-3 h-3 text-blue-600" />
                        <span>IMMUTABLE</span>
                      </span>
                    </div>
                    <div className="font-mono text-xs text-slate-900 font-bold">
                      Dr. ₹{je.totalDebit.toLocaleString('en-IN')} = Cr. ₹{je.totalCredit.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 italic font-medium">{je.narration}</p>

                  <div className="bg-white rounded-xl p-3 border border-slate-200 text-xs font-mono space-y-1.5 shadow-xs">
                    {je.lines.map((line, lIdx) => (
                      <div key={lIdx} className="flex justify-between items-center text-slate-800">
                        <span className="font-semibold">{line.acc}</span>
                        <div className="space-x-4">
                          {line.dr > 0 && <span className="text-slate-900 font-bold">Dr. ₹{line.dr.toLocaleString('en-IN')}</span>}
                          {line.cr > 0 && <span className="text-blue-700 font-bold">Cr. ₹{line.cr.toLocaleString('en-IN')}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Chart of Accounts Tree */
        <div className="glass-card rounded-2xl p-5 space-y-4 shadow-sm bg-white border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-xs sm:text-sm text-slate-800 flex items-center space-x-2">
              <FolderTree className="w-4 h-4 text-blue-600" />
              <span>Chart of Accounts Hierarchy (COA)</span>
            </h3>

            <button 
              onClick={() => setIsAddAccountModalOpen(true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Account</span>
            </button>
          </div>

          <div className="divide-y divide-slate-200 bg-white rounded-xl border border-slate-200 overflow-hidden">
            {accounts.map((acc) => (
              <div key={acc.code} className="py-3 px-4 flex justify-between items-center hover:bg-blue-50/50 transition">
                <div className="flex items-center space-x-3 sm:space-x-4 font-mono text-xs">
                  <span className="text-blue-700 font-bold">{acc.code}</span>
                  <span className="text-slate-900 font-sans font-bold text-xs">{acc.name}</span>
                </div>
                <div className="flex items-center space-x-4 sm:space-x-6 text-xs font-mono">
                  <span className="text-slate-700 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded font-medium text-[10px]">
                    {acc.type}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">
                    ₹{acc.balance.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Account Modal */}
      {isAddAccountModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 my-8 relative animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-bold text-base text-slate-900">Add New Ledger Account</h3>
                <button onClick={() => setIsAddAccountModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Account Code</label>
                  <input type="text" value={newAccCode} onChange={(e) => setNewAccCode(e.target.value)} placeholder="e.g. 5210" className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Account Name</label>
                  <input type="text" value={newAccName} onChange={(e) => setNewAccName(e.target.value)} placeholder="e.g. Cloud Software Subscriptions" className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Account Type</label>
                  <select value={newAccType} onChange={(e) => setNewAccType(e.target.value)} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold">
                    <option value="Asset">Asset</option>
                    <option value="Liability">Liability</option>
                    <option value="Revenue">Revenue</option>
                    <option value="Expense">Expense</option>
                    <option value="Equity">Equity</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button onClick={() => setIsAddAccountModalOpen(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold">Cancel</button>
                <button onClick={handleAddAccount} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer">Create Account</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
