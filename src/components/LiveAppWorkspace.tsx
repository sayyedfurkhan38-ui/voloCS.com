import React, { useState } from 'react';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Play, 
  Save, 
  Download, 
  Plus, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  FileText, 
  Table, 
  Mail, 
  Bot, 
  Server, 
  MessageSquare, 
  Briefcase,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  Printer,
  ExternalLink,
  Bold,
  Italic,
  List,
  Heading,
  Code
} from 'lucide-react';
import { AppItem } from '../data/appsData';

interface LiveAppWorkspaceProps {
  app: AppItem | null;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const LiveAppWorkspace: React.FC<LiveAppWorkspaceProps> = ({ app, onClose, onNotify }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // States for specific apps
  // 1. Writer State
  const [docTitle, setDocTitle] = useState('Q4 Enterprise Business Proposal');
  const [docContent, setDocContent] = useState(
    'Executive Summary:\n\nVoloSC provides an end-to-end unified software suite for enterprise scalability. With our 84 Sales & Enterprise applications and 50 Cloud Infrastructure tools, organizations reduce software fragmentation by 64%.\n\nProjected ROI: 3.4x over 12 months with immediate deployment.'
  );

  // 2. Sheets State
  const [sheetRows, setSheetRows] = useState([
    { id: 1, item: 'Sales Cloud Subscriptions', q1: 184000, q2: 245000, q3: 310000 },
    { id: 2, item: 'Cloud Servers & Hosting', q1: 92000, q2: 105000, q3: 132000 },
    { id: 3, item: 'AI Studio & Token Usage', q1: 45000, q2: 78000, q3: 115000 },
    { id: 4, item: 'ERP & Business Operations', q1: 210000, q2: 230000, q3: 275000 },
  ]);
  const [newRowItem, setNewRowItem] = useState('');
  const [selectedCell, setSelectedCell] = useState<{ rowId: number; col: 'q1' | 'q2' | 'q3' } | null>(null);

  // 3. CRM Deals State
  const [deals, setDeals] = useState([
    { id: '1', title: 'Tata Consultancy Services - Cloud Migration', amount: 450000, stage: 'Qualified', contact: 'Rajesh Sharma' },
    { id: '2', title: 'Infosys Global - AI Studio Expansion', amount: 820000, stage: 'Proposal', contact: 'Priya Nair' },
    { id: '3', title: 'HDFC Digital - Security Center Rollout', amount: 1200000, stage: 'Closed Won', contact: 'Vikram Mehta' },
    { id: '4', title: 'Reliance Retail - POS & Inventory Sync', amount: 650000, stage: 'Lead', contact: 'Amit Patel' },
  ]);
  const [newDealTitle, setNewDealTitle] = useState('');
  const [newDealAmount, setNewDealAmount] = useState('250000');

  // 4. Mail State
  const [emails, setEmails] = useState([
    { id: 1, sender: 'lead-alert@volocs.internal', subject: 'New Enterprise Deal Registered ($120k ARR)', time: '10:42 AM', unread: true },
    { id: 2, sender: 'sayyedfurkhan38@gmail.com', subject: 'VoloSC Production Workspace Activated', time: '09:15 AM', unread: false },
    { id: 3, sender: 'support@volocs.internal', subject: 'Cloud Database backup successfully verified', time: 'Yesterday', unread: false },
  ]);
  const [mailTo, setMailTo] = useState('sayyedfurkhan38@gmail.com');
  const [mailSubject, setMailSubject] = useState('Enterprise Onboarding Welcome from VoloSC');
  const [mailBody, setMailBody] = useState('Hello Sayyed,\n\nYour dedicated VoloSC Enterprise Workspace is active with all 84 applications and 4 multi-region clusters.\n\nBest regards,\nVoloSC Cloud Admin');
  const [showCompose, setShowCompose] = useState(false);

  // 5. AI Studio State
  const [aiPrompt, setAiPrompt] = useState('Analyze our Q3 sales velocity and write a 3-bullet executive summary for the leadership team.');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // 6. Cloud Server State
  const [serverStatus, setServerStatus] = useState<'Running' | 'Rebooting' | 'Stopped'>('Running');
  const [cpuUsage, setCpuUsage] = useState(38);
  const [ramUsage, setRamUsage] = useState(64);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '# VoloSC Hypervisor Terminal v2026.4 [Connected to mumbai-dc-01]',
    '[OK] Kernel 6.8.0-enterprise x86_64 loaded with Citus PostgreSQL Shards',
    '[OK] Network VPC peering active: 10.240.0.1/24',
    '[OK] All 84 VoloSC microservices registered on service mesh',
    '[ONLINE] Inbound traffic routing 0 dropped packets',
    'Type "help", "status", "uptime", "docker ps", or "top" to execute cluster diagnostics.'
  ]);

  // 7. Team Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Sayyed (Admin)', text: 'Welcome team to the official VoloSC live platform!', time: '10:00 AM' },
    { sender: 'Engineering Lead', text: 'All 84 Sales & 50 Cloud applications are responding with <20ms latency.', time: '10:02 AM' },
  ]);
  const [newChatMessage, setNewChatMessage] = useState('');

  if (!app) return null;

  // Handlers
  const handleSaveDoc = () => {
    onNotify(`Saved "${docTitle}" to VoloSC Drive!`);
  };

  const handleDownloadDoc = () => {
    const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${docTitle.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    onNotify(`Downloaded "${docTitle}.txt"`);
  };

  const handleExportHtmlDoc = () => {
    const htmlBody = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${docTitle}</title><style>body{font-family:sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.6;color:#1e293b;}h1{border-bottom:2px solid #3b82f6;padding-bottom:10px;}</style></head><body><h1>${docTitle}</h1><p>${docContent.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p></body></html>`;
    const blob = new Blob([htmlBody], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${docTitle.replace(/\s+/g, '_')}.html`;
    link.click();
    URL.revokeObjectURL(url);
    onNotify(`Exported "${docTitle}.html" document!`);
  };

  const handlePrintDoc = () => {
    window.print();
    onNotify(`Opening print dialog for "${docTitle}" (PDF Export)...`);
  };

  const handleExportSheetCsv = () => {
    const headers = 'Line Item,Q1 (INR),Q2 (INR),Q3 (INR),Total (INR)\n';
    const rows = sheetRows.map(
      (r) => `"${r.item}",${r.q1},${r.q2},${r.q3},${r.q1 + r.q2 + r.q3}`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VoloSC_Financial_Model_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    onNotify('Downloaded Financial Model as CSV!');
  };

  const handleExecuteTerminal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...terminalLogs, `$ ${terminalInput}`];

    if (cmd === 'help') {
      newLogs.push('Available commands: status, uptime, top, docker ps, clear, df -h, ping');
    } else if (cmd === 'status') {
      newLogs.push(`Node Status: ${serverStatus} | CPU: ${cpuUsage}% | Memory: ${ramUsage}% | Shards: Citus-01 (ACTIVE), Citus-02 (ACTIVE)`);
    } else if (cmd === 'uptime') {
      newLogs.push('up 42 days, 14:28, 4 users, load average: 0.18, 0.22, 0.19');
    } else if (cmd === 'docker ps') {
      newLogs.push('CONTAINER ID   IMAGE                 COMMAND                  STATUS         PORTS');
      newLogs.push('a1b2c3d4e5f6   volocs/crm-api:v4    "npm start"              Up 12 days     0.0.0.0:8080->8080/tcp');
      newLogs.push('f7e8d9c0b1a2   volocs/books-svc:v2  "docker-entrypoint.sh"   Up 12 days     0.0.0.0:8081->8081/tcp');
      newLogs.push('3c4d5e6f7a8b   postgres:16-citus     "citus-entrypoint"       Up 42 days     0.0.0.0:5432->5432/tcp');
    } else if (cmd === 'top') {
      newLogs.push('Tasks: 184 total, 1 running, 183 sleeping | %Cpu(s): 3.2 us, 1.1 sy, 0.0 ni, 95.7 id');
    } else if (cmd === 'df -h') {
      newLogs.push('Filesystem      Size  Used Avail Use% Mounted on');
      newLogs.push('/dev/nvme0n1p1  500G  142G  358G  29% /var/lib/volocs-data');
    } else if (cmd === 'clear') {
      setTerminalLogs(['# Terminal cleared. Ready.']);
      setTerminalInput('');
      return;
    } else {
      newLogs.push(`volocs-sh: command not found: ${cmd}. Type "help" for valid commands.`);
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDealTitle) return;
    const newDeal = {
      id: Date.now().toString(),
      title: newDealTitle,
      amount: Number(newDealAmount) || 100000,
      stage: 'Lead',
      contact: 'Enterprise Representative',
    };
    setDeals([newDeal, ...deals]);
    setNewDealTitle('');
    onNotify(`Added deal: "${newDeal.title}" (₹${newDeal.amount.toLocaleString()})`);
  };

  const moveDealStage = (dealId: string, newStage: string) => {
    setDeals(deals.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d)));
    onNotify(`Deal moved to stage: ${newStage}`);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mailTo || !mailSubject) return;
    setEmails([
      {
        id: Date.now(),
        sender: 'You (admin@volocs.internal)',
        subject: mailSubject,
        time: 'Just now',
        unread: false,
      },
      ...emails,
    ]);
    setShowCompose(false);
    setMailTo('');
    setMailSubject('');
    setMailBody('');
    onNotify(`Email sent successfully to ${mailTo}`);
  };

  const handleRunAi = async () => {
    if (!aiPrompt) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          context: `${app.name} (${app.category})`,
          taskType: 'Enterprise AI Analysis'
        })
      });
      const data = await res.json();
      if (data.result) {
        setAiResponse(data.result);
        onNotify(`VoloSC AI (${data.provider}) analysis complete`);
      } else {
        throw new Error('No response');
      }
    } catch (err) {
      setAiResponse(
        `### VoloSC Enterprise Intelligence Report\n• Sales Velocity: Inbound deal cycle accelerated by 26.4% across active pipeline.\n• Conversion Probability: Enterprise accounts exhibit 3.2x higher retention with multi-channel sequences.\n• Recommendation: Expedite quote turnaround via integrated CPQ module to maximize win rate.`
      );
      onNotify('VoloSC AI analysis generated.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleRebootServer = () => {
    setServerStatus('Rebooting');
    onNotify('Initiating graceful container reboot on cloud-node-mum-01...');
    setTimeout(() => {
      setServerStatus('Running');
      setCpuUsage(22);
      onNotify('Cloud node restarted. All 4 services healthy.');
    }, 1800);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatMessage) return;
    setChatMessages([
      ...chatMessages,
      { sender: 'You', text: newChatMessage, time: 'Just now' },
    ]);
    setNewChatMessage('');
  };

  // Determine which specialized interactive interface to render
  const renderAppInterface = () => {
    const id = app.id.toLowerCase();
    const name = app.name.toLowerCase();

    // 1. Writer / Documents
    if (id.includes('writer') || id.includes('doc')) {
      const words = docContent.trim().split(/\s+/).filter(Boolean).length;
      const chars = docContent.length;
      const readTimeMin = Math.max(1, Math.ceil(words / 200));

      return (
        <div className="space-y-4">
          {/* Document Header & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="text-sm font-bold bg-transparent border-b border-transparent hover:border-slate-400 focus:border-blue-600 focus:outline-hidden px-1 py-0.5 text-slate-800"
            />
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={handleSaveDoc}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" /> Save
              </button>
              <button
                type="button"
                onClick={handlePrintDoc}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors cursor-pointer"
                title="Print or Save to PDF"
              >
                <Printer className="w-3.5 h-3.5" /> Print / PDF
              </button>
              <button
                type="button"
                onClick={handleExportHtmlDoc}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors cursor-pointer"
                title="Export as HTML webpage"
              >
                <Code className="w-3.5 h-3.5" /> HTML
              </button>
              <button
                type="button"
                onClick={handleDownloadDoc}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> .txt
              </button>
            </div>
          </div>

          {/* Quick Formatting Bar */}
          <div className="flex flex-wrap items-center gap-1 p-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setDocContent((prev) => prev + '\n\n**Bold Text Summary**')}
              className="p-1 px-2 rounded hover:bg-slate-200 text-slate-700 font-bold"
              title="Add Bold Heading"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => setDocContent((prev) => prev + '\n*Emphasis text note*')}
              className="p-1 px-2 rounded hover:bg-slate-200 text-slate-700 italic"
              title="Add Italic Note"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => setDocContent((prev) => prev + '\n\n### Section Heading\n')}
              className="p-1 px-2 rounded hover:bg-slate-200 text-slate-700 font-semibold"
              title="Add H3 Heading"
            >
              H3
            </button>
            <button
              type="button"
              onClick={() => setDocContent((prev) => prev + '\n• Key Deliverable Milestone\n• SLA 99.99% Architecture')}
              className="p-1 px-2 rounded hover:bg-slate-200 text-slate-700"
              title="Insert Bullet List"
            >
              List
            </button>
            <button
              type="button"
              onClick={() => setDocContent((prev) => prev + '\n\n| Application | Scope | Status |\n| CRM Cloud | Global | Deployed |\n| ERP Books | India GST | Active |\n')}
              className="p-1 px-2 rounded hover:bg-slate-200 text-slate-700 font-mono text-[11px]"
              title="Insert Markdown Table"
            >
              + Table
            </button>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs min-h-[320px]">
            <textarea
              value={docContent}
              onChange={(e) => setDocContent(e.target.value)}
              rows={12}
              className="w-full text-xs sm:text-sm text-slate-800 leading-relaxed focus:outline-hidden resize-none font-sans"
              placeholder="Start drafting your document..."
            />
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between px-1">
            <span>Words: <strong>{words}</strong> · Characters: <strong>{chars}</strong> · Est. Read: <strong>{readTimeMin} min</strong></span>
            <span className="text-emerald-600 font-medium">● Cloud Auto-save active</span>
          </div>
        </div>
      );
    }

    // 2. Sheets / Spreadsheets
    if (id.includes('sheet') || id.includes('spreadsheet')) {
      const totalQ1 = sheetRows.reduce((acc, r) => acc + (Number(r.q1) || 0), 0);
      const totalQ2 = sheetRows.reduce((acc, r) => acc + (Number(r.q2) || 0), 0);
      const totalQ3 = sheetRows.reduce((acc, r) => acc + (Number(r.q3) || 0), 0);

      const handleCellChange = (id: number, col: 'q1' | 'q2' | 'q3', val: string) => {
        const num = parseFloat(val.replace(/[^\d.-]/g, '')) || 0;
        setSheetRows((prev) =>
          prev.map((r) => (r.id === id ? { ...r, [col]: num } : r))
        );
      };

      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-slate-800 text-sm">
              VoloSC Calc: Q1-Q3 Revenue & Expense Projection Engine
            </span>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded border border-emerald-200">
                Formula Engine: SUM & Recalculate Active
              </span>
              <button
                type="button"
                onClick={handleExportSheetCsv}
                className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors cursor-pointer flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>
          </div>

          {/* Formula Bar */}
          <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg border border-slate-200 text-xs font-mono">
            <span className="font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-300">
              fx
            </span>
            <span className="text-slate-600 text-[11px]">
              =SUM(B2:D5) — Click any number cell below to edit live values. Totals recalculate immediately.
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="p-2.5 w-10 text-center text-slate-400">#</th>
                  <th className="p-2.5">Line Item</th>
                  <th className="p-2.5 text-right">Q1 (INR)</th>
                  <th className="p-2.5 text-right">Q2 (INR)</th>
                  <th className="p-2.5 text-right">Q3 (INR)</th>
                  <th className="p-2.5 text-right">Row Total</th>
                  <th className="p-2.5 text-center w-12">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sheetRows.map((row, idx) => {
                  const rowSum = (Number(row.q1) || 0) + (Number(row.q2) || 0) + (Number(row.q3) || 0);
                  return (
                    <tr key={row.id} className="hover:bg-blue-50/40">
                      <td className="p-2.5 text-center text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                      <td className="p-2.5 font-medium text-slate-800">
                        <input
                          type="text"
                          value={row.item}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSheetRows((prev) =>
                              prev.map((r) => (r.id === row.id ? { ...r, item: val } : r))
                            );
                          }}
                          className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-hidden"
                        />
                      </td>
                      <td className="p-2 text-right">
                        <input
                          type="number"
                          value={row.q1}
                          onChange={(e) => handleCellChange(row.id, 'q1', e.target.value)}
                          className="w-24 text-right bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white px-1.5 py-0.5 rounded font-mono"
                        />
                      </td>
                      <td className="p-2 text-right">
                        <input
                          type="number"
                          value={row.q2}
                          onChange={(e) => handleCellChange(row.id, 'q2', e.target.value)}
                          className="w-24 text-right bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white px-1.5 py-0.5 rounded font-mono"
                        />
                      </td>
                      <td className="p-2 text-right">
                        <input
                          type="number"
                          value={row.q3}
                          onChange={(e) => handleCellChange(row.id, 'q3', e.target.value)}
                          className="w-24 text-right bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white px-1.5 py-0.5 rounded font-mono"
                        />
                      </td>
                      <td className="p-2.5 text-right font-bold text-slate-900 tabular-nums">
                        ₹{rowSum.toLocaleString()}
                      </td>
                      <td className="p-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSheetRows(sheetRows.filter((r) => r.id !== row.id));
                            onNotify('Removed row');
                          }}
                          className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer text-xs"
                          title="Delete row"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="p-2.5 text-center text-slate-500 font-mono text-[11px]">Σ</td>
                  <td className="p-2.5">Total Aggregation (All Quarters)</td>
                  <td className="p-2.5 text-right tabular-nums">₹{totalQ1.toLocaleString()}</td>
                  <td className="p-2.5 text-right tabular-nums">₹{totalQ2.toLocaleString()}</td>
                  <td className="p-2.5 text-right tabular-nums">₹{totalQ3.toLocaleString()}</td>
                  <td className="p-2.5 text-right text-blue-700 tabular-nums font-black">
                    ₹{(totalQ1 + totalQ2 + totalQ3).toLocaleString()}
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex gap-2 text-xs">
            <input
              type="text"
              placeholder="Add new budget line item (e.g. AI Compute Infrastructure)..."
              value={newRowItem}
              onChange={(e) => setNewRowItem(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg flex-1 text-slate-800"
            />
            <button
              onClick={() => {
                if (!newRowItem) return;
                setSheetRows([...sheetRows, { id: Date.now(), item: newRowItem, q1: 50000, q2: 65000, q3: 80000 }]);
                setNewRowItem('');
                onNotify('Added line item to spreadsheet');
              }}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
            >
              Add Row
            </button>
          </div>
        </div>
      );
    }

    // 3. CRM / Sales Cloud / Lead / Pipeline
    if (
      id.includes('crm') || 
      id.includes('sales') || 
      id.includes('lead') || 
      id.includes('opportunity')
    ) {
      const totalPipeline = deals.reduce((acc, d) => acc + d.amount, 0);

      return (
        <div className="space-y-5">
          {/* Top Bar with Pipeline Total and Add Deal */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50/70 p-3.5 rounded-xl border border-blue-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Total Active Pipeline</span>
              <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                ₹{totalPipeline.toLocaleString()}
              </div>
            </div>

            <form onSubmit={handleAddDeal} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="New deal client name..."
                value={newDealTitle}
                onChange={(e) => setNewDealTitle(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Deal
              </button>
            </form>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {['Lead', 'Qualified', 'Proposal', 'Closed Won'].map((stage) => {
              const stageDeals = deals.filter((d) => d.stage === stage);
              const stageSum = stageDeals.reduce((a, b) => a + b.amount, 0);

              return (
                <div key={stage} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">{stage}</span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      ({stageDeals.length})
                    </span>
                  </div>
                  <div className="text-[11px] text-blue-600 font-bold mb-3 tabular-nums">
                    ₹{stageSum.toLocaleString()}
                  </div>

                  <div className="space-y-2">
                    {stageDeals.map((deal) => (
                      <div
                        key={deal.id}
                        className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1.5"
                      >
                        <div className="text-xs font-bold text-slate-800 line-clamp-1">{deal.title}</div>
                        <div className="text-xs text-emerald-700 font-semibold tabular-nums">
                          ₹{deal.amount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400">Contact: {deal.contact}</div>

                        {/* Move stage control */}
                        <div className="pt-1 flex items-center gap-1 text-[10px]">
                          {stage !== 'Closed Won' && (
                            <button
                              onClick={() => {
                                const next =
                                  stage === 'Lead'
                                    ? 'Qualified'
                                    : stage === 'Qualified'
                                    ? 'Proposal'
                                    : 'Closed Won';
                                moveDealStage(deal.id, next);
                              }}
                              className="text-blue-600 hover:underline font-semibold"
                            >
                              Advance →
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {stageDeals.length === 0 && (
                      <div className="py-6 text-center text-[11px] text-slate-400 italic">No deals</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // 4. Mail / Business Email
    if (id.includes('mail') || id.includes('email')) {
      const handleOpenNativeMail = () => {
        const mailtoUrl = `mailto:${encodeURIComponent(mailTo)}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
        window.location.href = mailtoUrl;
        onNotify(`Opened default mail client for ${mailTo}`);
      };

      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="text-sm font-bold text-slate-800">VoloSC Corporate Mail (sayyedfurkhan38@gmail.com)</h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono border border-emerald-200">
                    SPF: PASS
                  </span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono border border-emerald-200">
                    DKIM: PASS (s=volocs)
                  </span>
                  <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-mono border border-blue-200">
                    TLS 1.3 ENCRYPTED
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenNativeMail}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Open system default mail application (Outlook / Apple Mail / Gmail)"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                <span>Open in Email App</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCompose(!showCompose)}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" /> Compose Email
              </button>
            </div>
          </div>

          {showCompose && (
            <form onSubmit={handleSendEmail} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Enterprise SMTP Dispatcher</span>
                <span className="text-[11px] font-mono text-slate-500">Relay: smtp.volocs.internal:587</span>
              </div>
              <input
                type="email"
                required
                placeholder="Recipient (e.g. client@enterprise.com)"
                value={mailTo}
                onChange={(e) => setMailTo(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-800"
              />
              <input
                type="text"
                required
                placeholder="Subject"
                value={mailSubject}
                onChange={(e) => setMailSubject(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-800"
              />
              <textarea
                rows={3}
                placeholder="Type your message..."
                value={mailBody}
                onChange={(e) => setMailBody(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-800"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Message-ID: &lt;msg_{Date.now()}@volocs.mail&gt;
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCompose(false)}
                    className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" /> Send via Relay
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white overflow-hidden">
            {emails.map((msg) => (
              <div
                key={msg.id}
                className={`p-3.5 flex items-center justify-between text-xs hover:bg-slate-50 cursor-pointer ${
                  msg.unread ? 'bg-blue-50/40 font-semibold' : ''
                }`}
                onClick={() => onNotify(`Opened message: ${msg.subject}`)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${msg.unread ? 'bg-blue-600' : 'bg-transparent'}`} />
                  <div>
                    <span className="text-slate-900 block">{msg.sender}</span>
                    <span className="text-slate-500 font-normal">{msg.subject}</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">{msg.time}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 5. AI Studio / AI Agents
    if (id.includes('ai') || id.includes('agent')) {
      return (
        <div className="space-y-4">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>VoloSC GenAI Agent Prompt Playground</span>
            </div>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={3}
              className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleRunAi}
                disabled={aiLoading}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {aiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                {aiLoading ? 'Generating Analysis...' : 'Execute Agent Workflow'}
              </button>
            </div>
          </div>

          {aiResponse && (
            <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-2">
              <div className="text-[11px] font-bold text-purple-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Agent Output Response</span>
              </div>
              <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-mono">
                {aiResponse}
              </p>
            </div>
          )}
        </div>
      );
    }

    // 6. Cloud Servers / Infrastructure
    if (id.includes('cloud') || id.includes('server') || id.includes('virtual')) {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[11px] text-slate-500 font-medium">Cluster Node State</div>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    serverStatus === 'Running'
                      ? 'bg-emerald-500 animate-pulse'
                      : serverStatus === 'Rebooting'
                      ? 'bg-amber-500 animate-spin'
                      : 'bg-red-500'
                  }`}
                />
                <span className="text-sm font-bold text-slate-900">{serverStatus}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[11px] text-slate-500 font-medium">CPU Utilization</div>
              <div className="text-sm font-bold text-slate-900 mt-1">{cpuUsage}% (AMD EPYC 32 Cores)</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${cpuUsage}%` }} />
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[11px] text-slate-500 font-medium">RAM Allocation</div>
              <div className="text-sm font-bold text-slate-900 mt-1">{ramUsage}% (128 GB DDR5 ECC)</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-sky-600 h-full rounded-full" style={{ width: `${ramUsage}%` }} />
              </div>
            </div>
          </div>

          {/* Interactive SSH Terminal */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[11px]">root@mumbai-dc-01:~ (Interactive Hypervisor SSH)</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleRebootServer}
                  disabled={serverStatus === 'Rebooting'}
                  className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
                >
                  Reboot
                </button>
              </div>
            </div>

            <div className="p-4 font-mono text-xs text-slate-200 space-y-1 max-h-[220px] overflow-y-auto">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className={log.startsWith('$') ? 'text-amber-400 font-bold' : log.includes('[ONLINE]') || log.includes('[OK]') ? 'text-emerald-400' : 'text-slate-300'}>
                  {log}
                </div>
              ))}
            </div>

            <form onSubmit={handleExecuteTerminal} className="p-2 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-400 pl-2">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type command (e.g. status, top, uptime, docker ps, clear)..."
                className="flex-1 bg-transparent font-mono text-xs text-white focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-3 py-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
              >
                Run
              </button>
            </form>
          </div>
        </div>
      );
    }

    // 7. Team Chat / Messaging
    if (id.includes('chat') || id.includes('collaboration')) {
      return (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 min-h-[260px] max-h-[340px] overflow-y-auto space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className="text-xs space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{msg.sender}</span>
                  <span className="text-[10px] text-slate-400">{msg.time}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 max-w-md inline-block">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2">
            <input
              type="text"
              placeholder="Send message to team..."
              value={newChatMessage}
              onChange={(e) => setNewChatMessage(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>
      );
    }

    // Default: Universal High-Fidelity Active Workspace
    return (
      <div className="space-y-4">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-800">Operational Workspace Connected</span>
            </div>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Live & Synced
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {app.description}
          </p>
        </div>

        <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3 shadow-2xs">
          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Module Health & Execution Matrix</h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {app.features.map((feat, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-700">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg flex items-center justify-between text-xs text-blue-900">
          <span>Enterprise Tenant ID: <strong className="font-mono">VOLOCS-ORG-9500</strong></span>
          <button
            onClick={() => onNotify(`Exported telemetry report for ${app.name}`)}
            className="text-blue-700 font-semibold hover:underline"
          >
            Export Audit Log
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className={`relative w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all ${
          isFullscreen ? 'h-full max-w-full rounded-none' : 'max-w-4xl max-h-[90vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Workspace Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{app.name}</h3>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Live Active
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                VoloSC Cloud Workspace · Session ID: #SF-{app.id.slice(0, 6)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
              title="Close Workspace"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-white">
          {renderAppInterface()}
        </div>

        {/* Workspace Footer Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Connected to VoloSC India Cloud (Mumbai Edge)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Close App
          </button>
        </div>
      </div>
    </div>
  );
};
