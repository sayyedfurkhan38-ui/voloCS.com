import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Package, 
  HeartHandshake, 
  Megaphone, 
  Headphones, 
  FolderKanban, 
  FileText, 
  Table as TableIcon, 
  Presentation, 
  Mail, 
  Calendar as CalendarIcon, 
  Video, 
  HardDrive, 
  Bot, 
  Zap, 
  Database, 
  Server, 
  ShieldCheck, 
  CreditCard, 
  Search, 
  Plus, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Upload, 
  Trash2, 
  Edit, 
  Eye, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Bell, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Pause, 
  Send, 
  X,
  Building,
  RefreshCw,
  QrCode,
  Copy,
  Check,
  Globe2,
  Store,
  FileCheck2,
  Lock,
  Layers,
  Cpu,
  Activity,
  ArrowRightLeft,
  Code2,
  LifeBuoy,
  Key,
  Webhook,
  SlidersHorizontal,
  ShieldAlert,
  Smartphone
} from 'lucide-react';

import { 
  Lead, 
  Contact, 
  Account, 
  Deal, 
  Invoice, 
  InventoryProduct, 
  Employee, 
  SupportTicket, 
  ProjectTask, 
  AuditLogEntry, 
  WorkflowRule,
  INITIAL_LEADS,
  INITIAL_CONTACTS,
  INITIAL_ACCOUNTS,
  INITIAL_DEALS,
  INITIAL_INVOICES,
  INITIAL_PRODUCTS,
  INITIAL_EMPLOYEES,
  INITIAL_TICKETS,
  INITIAL_PROJECT_TASKS,
  INITIAL_AUDIT_LOGS,
  INITIAL_WORKFLOWS
} from './enterpriseStore';

import { MARKETPLACE_APPS, MarketplaceApp } from '../data/marketplaceData';
import { COMPLIANCE_AUDITS, ComplianceAuditItem } from '../data/complianceData';
import { DATA_CENTERS, DB_SHARDS, DataCenterNode } from '../data/infrastructureData';
import { SUBSCRIPTION_PLANS, UPI_PAYMENT_CONFIG } from '../data/appsData';
import { VoloSCLogo } from '../components/VoloSCLogo';

interface EnterpriseWorkspaceProps {
  onBackToPortal: () => void;
  onNotify: (msg: string) => void;
  initialTab?: string;
}

export const EnterpriseWorkspace: React.FC<EnterpriseWorkspaceProps> = ({
  onBackToPortal,
  onNotify,
  initialTab = 'dashboard'
}) => {
  // Navigation active module
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Relational Application States
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [products, setProducts] = useState<InventoryProduct[]>(INITIAL_PRODUCTS);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [tasks, setTasks] = useState<ProjectTask[]>(INITIAL_PROJECT_TASKS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [workflows, setWorkflows] = useState<WorkflowRule[]>(INITIAL_WORKFLOWS);

  // Third-party Marketplace State
  const [marketplaceApps, setMarketplaceApps] = useState<MarketplaceApp[]>(MARKETPLACE_APPS);
  const [marketplaceCategory, setMarketplaceCategory] = useState<string>('All');

  // Infrastructure State
  const [dataCenters, setDataCenters] = useState<DataCenterNode[]>(DATA_CENTERS);
  const [isProbingLatency, setIsProbingLatency] = useState(false);

  // Common UI states (Standard 21 Features)
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewRecord, setViewRecord] = useState<any | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showTenantInfoModal, setShowTenantInfoModal] = useState(false);

  // Active Enterprise Client Profile
  const clientProfile = useMemo(() => {
    try {
      const savedClient = localStorage.getItem('volocs_enterprise_client');
      if (savedClient) return JSON.parse(savedClient);
      const savedUser = localStorage.getItem('volocs_user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        return {
          fullName: u.name || 'Sayyed Furkhan',
          workEmail: u.email || 'sayyedfurkhan38@gmail.com',
          mobile: '+91 8862059500',
          companyName: u.company || 'VoloSC Global Tech',
          tenantId: u.tenantId || 'org_9500',
          region: 'Mumbai DC-01 (ap-south-1)',
          role: 'Super Administrator',
          license: 'Active (7-Day Enterprise Free Trial)'
        };
      }
    } catch {}
    return {
      fullName: 'Sayyed Furkhan',
      workEmail: 'sayyedfurkhan38@gmail.com',
      mobile: '+91 8862059500',
      companyName: 'VoloSC Global Tech',
      tenantId: 'org_9500',
      region: 'Mumbai DC-01 (ap-south-1)',
      role: 'Super Administrator',
      license: 'Active (7-Day Enterprise Free Trial)'
    };
  }, []);

  // Office Suite interactive states
  const [docContent, setDocContent] = useState('VoloSC Enterprise Executive Memo:\n\nUnified Business Operations v2026.4 is now operating across all subsidiaries. Cross-module data integration connects CRM Deals to Accounting Invoices and Inventory Fulfillment with zero latency.');
  const [sheetData, setSheetData] = useState([
    { row: 'Q1 Revenue', sales: 1250000, cloud: 650000, profit: 480000 },
    { row: 'Q2 Revenue', sales: 1680000, cloud: 890000, profit: 710000 },
    { row: 'Q3 Revenue', sales: 2150000, cloud: 1120000, profit: 980000 },
  ]);

  // HR Attendance
  const [attendanceClockedIn, setAttendanceClockedIn] = useState(true);

  // AI Assistant Chat state
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', text: 'Hello Sayyed! I am your VoloSC Enterprise AI Copilot. Ask me to analyze Q3 pipeline velocity, forecast cashflow, inspect database shards, or check compliance audit logs.' }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // 1. One-Click Data Migration State (Replacing Salesforce, Microsoft, Zoho)
  const [migrationSource, setMigrationSource] = useState<'salesforce' | 'microsoft' | 'zoho'>('salesforce');
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationProgress, setMigrationProgress] = useState(0);
  const [migrationStage, setMigrationStage] = useState('');
  const [migrationCompleted, setMigrationCompleted] = useState(false);
  const [migratedStats, setMigratedStats] = useState({ leads: 3420, accounts: 1180, deals: 890, invoices: 4200, files: 1540 });

  // 2. API Gateway & Webhooks State
  const [activeApiKeyType, setActiveApiKeyType] = useState<'live' | 'test'>('live');
  const [selectedApiEndpoint, setSelectedApiEndpoint] = useState('/v1/crm/leads');
  const [apiTestResponse, setApiTestResponse] = useState('');
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [webhooksList, setWebhooksList] = useState([
    { id: 'wh_01', url: 'https://api.enterprise.com/hooks/volocs-sync', events: ['lead.created', 'deal.won'], status: 'Active', latency: '42ms' },
    { id: 'wh_02', url: 'https://hooks.slack.com/services/T00/B00/X9500', events: ['invoice.paid'], status: 'Active', latency: '28ms' },
  ]);

  // 3. Scalable Kubernetes Microservices Mesh
  const [k8sPods, setK8sPods] = useState([
    { name: 'volocs-api-gateway', replicas: '8/8', cpu: '24%', mem: '1.2 GB', status: 'Running', restarts: 0 },
    { name: 'volocs-crm-svc', replicas: '6/6', cpu: '38%', mem: '2.1 GB', status: 'Running', restarts: 0 },
    { name: 'volocs-books-ledger', replicas: '4/4', cpu: '18%', mem: '1.8 GB', status: 'Running', restarts: 0 },
    { name: 'volocs-citus-router', replicas: '4/4', cpu: '45%', mem: '4.8 GB', status: 'Running', restarts: 0 },
    { name: 'volocs-ai-agent-mesh', replicas: '8/8', cpu: '62%', mem: '8.4 GB', status: 'Running', restarts: 0 },
    { name: 'volocs-kafka-eventbus', replicas: '3/3', cpu: '15%', mem: '3.2 GB', status: 'Running', restarts: 0 },
  ]);
  const [isRollingRestart, setIsRollingRestart] = useState(false);

  // 4. Autonomous AI Agents (Einstein / Copilot Parity)
  const [activeAutonomousAgent, setActiveAutonomousAgent] = useState('lead_qualifier');
  const [isAgentExecuting, setIsAgentExecuting] = useState(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);

  // 5. 24/7 Enterprise Support & Change Management
  const [supportMessages, setSupportMessages] = useState([
    { sender: 'Sayyed Furkhan (Technical Account Manager)', text: 'Hello! I am your dedicated Enterprise Technical Account Manager. Our 24/7 SLA ensures <15 min response time for all Tier-1 systems.', time: '10:00 AM' },
    { sender: 'VoloSC Support Bot', text: 'Zero data loss migration from Salesforce/Microsoft is available with 1 click.', time: '10:01 AM' }
  ]);
  const [supportInput, setSupportInput] = useState('');

  // 6. RBAC Permissions Matrix
  const [rbacMatrix, setRbacMatrix] = useState([
    { role: 'Super Administrator', crm: true, books: true, k8s: true, billing: true, audit: true },
    { role: 'Security & Compliance Officer', crm: false, books: false, k8s: true, billing: false, audit: true },
    { role: 'Finance / Billing Admin', crm: false, books: true, k8s: false, billing: true, audit: true },
    { role: 'Sales & Department Manager', crm: true, books: false, k8s: false, billing: false, audit: false },
    { role: 'Read-Only Auditor', crm: false, books: false, k8s: false, billing: false, audit: true },
  ]);

  // Helper log audit
  const logAudit = (action: string, entity: string, details: string) => {
    const newLog: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      user: 'Sayyed Furkhan',
      action,
      entity,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Convert Lead
  const handleConvertLead = (lead: Lead) => {
    const newContact: Contact = {
      id: `CNT-${Date.now().toString().slice(-4)}`,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      jobTitle: 'Enterprise Lead Buyer',
      company: lead.company,
      owner: lead.owner,
    };
    const newAccount: Account = {
      id: `ACC-${Date.now().toString().slice(-4)}`,
      companyName: lead.company,
      industry: 'Enterprise Software',
      website: `https://${lead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      address: 'Corporate Headquarters, India',
      revenue: `₹${(lead.value * 20).toLocaleString()}`,
      owner: lead.owner,
    };
    const newDeal: Deal = {
      id: `DEAL-${Date.now().toString().slice(-4)}`,
      dealName: `${lead.company} - VoloSC Enterprise Rollout`,
      value: lead.value,
      stage: 'Proposal',
      probability: 75,
      closingDate: '2026-11-20',
      accountName: lead.company,
      owner: lead.owner,
    };

    setContacts((prev) => [newContact, ...prev]);
    setAccounts((prev) => [newAccount, ...prev]);
    setDeals((prev) => [newDeal, ...prev]);
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status: 'Converted' } : l)));

    logAudit('Lead Converted', lead.id, `Converted ${lead.name} (${lead.company}) into Contact, Account & Deal`);
    onNotify(`Lead "${lead.name}" converted into Contact, Account & Deal!`);
    if (viewRecord?.id === lead.id) setViewRecord(null);
  };

  // Mark Deal Won -> Creates Books Invoice & Deducts Stock
  const handleMarkDealWon = (deal: Deal) => {
    const newInvoice: Invoice = {
      id: `INV-2026-${Date.now().toString().slice(-4)}`,
      invoiceNumber: `INV-2026-${Date.now().toString().slice(-4)}`,
      customerName: deal.accountName,
      customerEmail: `billing@${deal.accountName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      items: [
        { description: `${deal.dealName} (Annual Enterprise Subscription)`, quantity: 1, unitPrice: deal.value, discount: 10, taxRate: 18 }
      ],
      subtotal: Math.round(deal.value * 0.9),
      taxTotal: Math.round(deal.value * 0.9 * 0.18),
      grandTotal: Math.round(deal.value * 0.9 * 1.18),
      dueDate: '2026-11-30',
      status: 'Sent',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setDeals((prev) => prev.map((d) => (d.id === deal.id ? { ...d, stage: 'Closed Won', probability: 100 } : d)));
    setInvoices((prev) => [newInvoice, ...prev]);
    setProducts((prev) => prev.map((p) => (p.id === 'PRD-02' ? { ...p, stockQty: Math.max(0, p.stockQty - 10) } : p)));

    logAudit('Deal Closed Won', deal.id, `Generated Books Invoice ${newInvoice.invoiceNumber} for ₹${newInvoice.grandTotal.toLocaleString()} and deducted stock.`);
    onNotify(`Deal Won! Books Invoice ${newInvoice.invoiceNumber} generated automatically.`);
  };

  // Record payment
  const handleRecordPayment = (inv: Invoice) => {
    const updated = { ...inv, status: 'Paid' as const, paymentId: `PAY-UPI-${UPI_PAYMENT_CONFIG.vpa}-${Date.now().toString().slice(-4)}` };
    setInvoices((prev) => prev.map((i) => (i.id === inv.id ? updated : i)));
    logAudit('Payment Recorded', inv.invoiceNumber, `₹${inv.grandTotal.toLocaleString()} received via UPI (${UPI_PAYMENT_CONFIG.vpa}). Invoice marked Paid.`);
    onNotify(`Payment recorded for ${inv.invoiceNumber} (₹${inv.grandTotal.toLocaleString()}) via ${UPI_PAYMENT_CONFIG.vpa}`);
    if (viewRecord?.id === inv.id) setViewRecord(updated);
  };

  // Toggle Marketplace app install
  const handleToggleMarketplaceApp = (appId: string) => {
    setMarketplaceApps((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          const newStatus = !a.installed;
          logAudit(newStatus ? 'Marketplace App Installed' : 'Marketplace App Uninstalled', a.name, `Permissions granted: ${a.permissions.join(', ')}`);
          onNotify(newStatus ? `Installed "${a.name}" by ${a.vendor}` : `Uninstalled "${a.name}"`);
          return { ...a, installed: newStatus };
        }
        return a;
      })
    );
  };

  // Latency prober simulation
  const handleProbeLatency = () => {
    setIsProbingLatency(true);
    setTimeout(() => {
      setDataCenters((prev) =>
        prev.map((dc) => ({
          ...dc,
          latencyMs: Math.max(6, Math.floor(dc.latencyMs + (Math.random() * 4 - 2))),
        }))
      );
      setIsProbingLatency(false);
      onNotify('Global health probe completed: All 4 Multi-Tenant Regions healthy with 0 packet drops.');
    }, 700);
  };

  // CSV Export utility
  const handleExportCSV = (dataset: any[], filename: string) => {
    if (!dataset.length) {
      onNotify('No records available to export.');
      return;
    }
    const headers = Object.keys(dataset[0]).join(',');
    const rows = dataset.map((item) =>
      Object.values(item)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    logAudit('Export CSV', filename, `Exported ${dataset.length} records to CSV`);
    onNotify(`Exported ${dataset.length} records to ${filename}.csv`);
  };

  // CSV Import simulation
  const handleImportCSV = () => {
    const importedLead: Lead = {
      id: `LEAD-IMP-${Date.now().toString().slice(-3)}`,
      name: 'Aditya Birla Group',
      email: 'procurement@adityabirla.com',
      phone: '+91 98330 11223',
      company: 'Aditya Birla Chemicals',
      source: 'CSV Import Batch',
      status: 'Qualified',
      owner: 'Sayyed Furkhan',
      value: 620000,
      createdAt: new Date().toISOString().slice(0, 16),
    };
    setLeads((prev) => [importedLead, ...prev]);
    logAudit('Import CSV', importedLead.id, `Imported batch record: ${importedLead.company}`);
    onNotify(`Successfully imported 1 verified record from CSV: ${importedLead.company}`);
  };

  // Bulk actions
  const handleBulkDelete = (type: 'leads' | 'deals' | 'invoices') => {
    if (!selectedIds.length) return;
    if (type === 'leads') setLeads((prev) => prev.filter((l) => !selectedIds.includes(l.id)));
    if (type === 'deals') setDeals((prev) => prev.filter((d) => !selectedIds.includes(d.id)));
    if (type === 'invoices') setInvoices((prev) => prev.filter((i) => !selectedIds.includes(i.id)));
    onNotify(`Deleted ${selectedIds.length} records.`);
    logAudit('Bulk Delete', `${selectedIds.length} items`, `Deleted IDs: ${selectedIds.join(', ')}`);
    setSelectedIds([]);
  };

  // AI Chat Handler
  const handleSendAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiChatInput.trim()) return;
    const userText = aiChatInput;
    setAiMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setAiChatInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      let reply = `Based on live VoloSC data across CRM, Books, and Inventory:\n• Total Pipeline: ₹${deals.reduce((a, b) => a + b.value, 0).toLocaleString()} across ${deals.length} active opportunities.\n• Outstanding Invoices: ₹${invoices.filter((i) => i.status !== 'Paid').reduce((a, b) => a + b.grandTotal, 0).toLocaleString()}.\n• Infrastructure: All 4 global regions operational with 99.99% uptime.`;
      if (userText.toLowerCase().includes('lead') || userText.toLowerCase().includes('tcs')) {
        reply = `TCS (Tata Consultancy Services) currently has 1 Lead (LEAD-101: ₹4,50,000) and 1 Qualified Deal (DEAL-301: ₹3,58,200). Sharded on citus-node-crm-01.`;
      }
      setAiMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setIsAiThinking(false);
      onNotify('VoloSC AI Copilot formulated analytical response.');
    }, 800);
  };

  // Calculated Dashboard Metrics
  const totalRevenueWon = deals.filter((d) => d.stage === 'Closed Won').reduce((acc, d) => acc + d.value, 0);
  const openDealsValue = deals.filter((d) => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost').reduce((acc, d) => acc + d.value, 0);
  const paidInvoicesTotal = invoices.filter((i) => i.status === 'Paid').reduce((acc, i) => acc + i.grandTotal, 0);
  const outstandingInvoicesTotal = invoices.filter((i) => i.status !== 'Paid').reduce((acc, i) => acc + i.grandTotal, 0);

  // Migration runner (Replacing Salesforce, Microsoft, Zoho)
  const handleStartMigration = (source: 'salesforce' | 'microsoft' | 'zoho') => {
    setIsMigrating(true);
    setMigrationProgress(10);
    setMigrationStage(`Connecting to ${source.toUpperCase()} REST API & OAuth Gateway...`);

    setTimeout(() => {
      setMigrationProgress(35);
      setMigrationStage('Extracting customer leads, contacts, opportunities, and custom fields...');
    }, 700);

    setTimeout(() => {
      setMigrationProgress(65);
      setMigrationStage('Auto-mapping relational schema & resolving foreign key dependencies...');
    }, 1400);

    setTimeout(() => {
      setMigrationProgress(90);
      setMigrationStage('Writing encrypted data to PostgreSQL Citus sharded cluster...');
    }, 2100);

    setTimeout(() => {
      setMigrationProgress(100);
      setIsMigrating(false);
      setMigrationCompleted(true);
      setMigrationStage('Migration completed successfully with ZERO data loss!');

      const migratedLead: Lead = {
        id: `MIG-${source.slice(0, 2).toUpperCase()}-${Date.now().toString().slice(-3)}`,
        name: source === 'salesforce' ? 'Reliance Jio Infocomm' : source === 'microsoft' ? 'Wipro Digital' : 'HCL Technologies',
        company: source === 'salesforce' ? 'Reliance Industries' : source === 'microsoft' ? 'Wipro Global' : 'HCL Enterprise',
        email: `procurement@${source}-client.com`,
        phone: '+91 98201 95000',
        source: `${source.toUpperCase()} Seamless Migration`,
        status: 'Qualified',
        owner: 'Sayyed Furkhan',
        value: 1450000,
        createdAt: new Date().toISOString().slice(0, 16),
      };
      setLeads((prev) => [migratedLead, ...prev]);
      logAudit('Data Migration Completed', source.toUpperCase(), `Imported 12,450 records from ${source.toUpperCase()} with 0 errors. Added ${migratedLead.company}.`);
      onNotify(`Migration from ${source.toUpperCase()} complete! 12,450 records seamlessly synced to VoloSC.`);
    }, 2800);
  };

  // API Tester
  const handleTestApi = () => {
    setIsTestingApi(true);
    setTimeout(() => {
      let sampleData = {};
      if (selectedApiEndpoint === '/v1/crm/leads') {
        sampleData = { status: 'success', count: leads.length, data: leads.slice(0, 2) };
      } else if (selectedApiEndpoint === '/v1/books/invoices') {
        sampleData = { status: 'success', count: invoices.length, data: invoices.slice(0, 2) };
      } else {
        sampleData = { status: 'success', shards: DB_SHARDS, tenant: clientProfile.tenantId };
      }
      setApiTestResponse(JSON.stringify(sampleData, null, 2));
      setIsTestingApi(false);
      onNotify(`200 OK: Response received from ${selectedApiEndpoint}`);
    }, 400);
  };

  // Autonomous Agent Runner (Einstein/Copilot Parity)
  const handleRunAutonomousAgent = (agentType: string) => {
    setIsAgentExecuting(true);
    setAgentLogs([
      `[Autonomous Agent Engine initialized for ${agentType}]`,
      '1. Reading active Citus PostgreSQL data shards for unassigned leads...',
      '2. Querying Gemini model for sentiment scoring & buying intent...',
    ]);

    setTimeout(() => {
      setAgentLogs((prev) => [
        ...prev,
        '3. Intent score: 94/100 (HIGH). Generated personalized ROI pitch and proposal.',
        '4. Autonomously converted lead to Deal (Won) and generated Books Tax Invoice...',
        '5. Triggered webhook notification to customer & assigned to Sayyed Furkhan.'
      ]);
      setIsAgentExecuting(false);

      if (leads.length > 0 && leads[0].status !== 'Converted') {
        handleConvertLead(leads[0]);
      } else {
        onNotify('Autonomous Agent completed business workflow across CRM & Books!');
      }
    }, 1500);
  };

  // K8s Rolling Restart
  const handleRollingRestartK8s = () => {
    setIsRollingRestart(true);
    onNotify('Initiating zero-downtime rolling restart across 6 microservice deployments...');
    setTimeout(() => {
      setIsRollingRestart(false);
      onNotify('All Kubernetes pods healthy and traffic balanced.');
    }, 1200);
  };

  // TAM Support message
  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const txt = supportInput;
    setSupportMessages((prev) => [...prev, { sender: clientProfile.fullName, text: txt, time: 'Just now' }]);
    setSupportInput('');

    setTimeout(() => {
      setSupportMessages((prev) => [
        ...prev,
        {
          sender: 'Sayyed Furkhan (Technical Account Manager)',
          text: `Thank you for reaching out! Your organization (${clientProfile.companyName}) has Tier-1 VIP status with a 15-minute resolution SLA. I have flagged your request and verified your multi-tenant shard health.`,
          time: 'Just now'
        }
      ]);
      onNotify('Technical Account Manager replied in live support console.');
    }, 800);
  };

  // Sub-navigation Module List (Comprehensive 18 Enterprise Modules)
  const modulesList = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3 },
    { id: 'crm', label: 'CRM & Sales Pipeline', icon: Users, badge: leads.length + deals.length },
    { id: 'migration', label: '1-Click Data Migration', icon: ArrowRightLeft, badge: 'Salesforce/MS' },
    { id: 'api_gateway', label: 'API Gateway & Webhooks', icon: Code2, badge: 'REST / SDK' },
    { id: 'books', label: 'Books — Accounting', icon: BookOpen, badge: invoices.length },
    { id: 'inventory', label: 'Inventory & Stock', icon: Package, badge: products.length },
    { id: 'people', label: 'People — HR', icon: HeartHandshake, badge: employees.length },
    { id: 'campaigns', label: 'Campaigns — Marketing', icon: Megaphone },
    { id: 'desk', label: 'Desk — Support', icon: Headphones, badge: tickets.filter((t) => t.status !== 'Resolved').length },
    { id: 'projects', label: 'Projects & Tasks', icon: FolderKanban, badge: tasks.length },
    { id: 'office', label: 'Writer, Sheets & Slides', icon: FileText },
    { id: 'mail_meetings', label: 'Mail, Calendar & Video', icon: Mail },
    { id: 'ai_automation', label: 'Autonomous AI Copilot', icon: Bot, badge: 'Copilot' },
    { id: 'infrastructure', label: 'K8s Mesh & Cloud DB', icon: Server, badge: '4 Regions' },
    { id: 'marketplace', label: 'App Marketplace (1,000+)', icon: Store, badge: `${marketplaceApps.filter((a) => a.installed).length} Active` },
    { id: 'compliance', label: 'Security & Legal Audits', icon: ShieldCheck, badge: 'ISO / SOC 2' },
    { id: 'audit_security', label: 'Audit Trail & RBAC Matrix', icon: FileCheck2, badge: auditLogs.length },
    { id: 'support_change', label: '24/7 TAM Support & SLA', icon: LifeBuoy, badge: '15m SLA' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Top Global Command Bar */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortal}
            className="px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            ← Public Portal & Pricing
          </button>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center gap-2.5">
            <VoloSCLogo size="sm" variant="compact" theme="dark" showSubtitle={false} />
            <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded font-mono hidden sm:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              7 Days Free Trial Active
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative hidden md:block w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search CRM, Invoices, Tasks, Stock..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
          />
        </div>

        {/* Right Admin Controls */}
        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => setShowTenantInfoModal(true)}
            className="hidden sm:flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700/80 px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
            title="Inspect Client Organization & Multi-Tenant Credentials"
          >
            <span className="text-slate-400">Org:</span>
            <span className="font-semibold text-white">{clientProfile.companyName}</span>
            <span className="text-slate-500">·</span>
            <span className="font-semibold text-emerald-400 font-mono">{clientProfile.tenantId}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTenantInfoModal(true)}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
            title="View User Details"
          >
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              {clientProfile.fullName.charAt(0) || 'S'}
            </span>
            <span className="font-semibold text-slate-200 hidden sm:inline">{clientProfile.fullName}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side Navigation Matrix */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="p-3 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5">
              Enterprise Operating Matrix
            </div>

            {modulesList.map((m) => {
              const Icon = m.icon;
              const isActive = activeTab === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveTab(m.id);
                    setViewRecord(null);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                    <span className="truncate">{m.label}</span>
                  </div>
                  {m.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {m.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Trial & Cloud status */}
          <div className="p-3 m-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px]">
              <span>7-Day Trial Mode</span>
              <span className="bg-emerald-950 px-1.5 py-0.2 rounded">7 Days Left</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Full enterprise features unlocked across all 134 apps.
            </p>
          </div>
        </aside>

        {/* Right Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900">

          {/* 1. EXECUTIVE DASHBOARD MODULE */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  VoloSC Unified Executive Cockpit
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time operational sync across CRM, Finance, Warehousing, and Cloud compute.
                </p>
              </div>

              {/* 4 Primary KPI Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Closed Won Revenue</div>
                  <div className="text-2xl font-extrabold text-emerald-400 mt-1 tabular-nums">
                    ₹{totalRevenueWon.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> +38% from previous quarter
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Active Pipeline Value</div>
                  <div className="text-2xl font-extrabold text-blue-400 mt-1 tabular-nums">
                    ₹{openDealsValue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {deals.filter((d) => d.stage !== 'Closed Won').length} active enterprise opportunities
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Verified Paid Invoices</div>
                  <div className="text-2xl font-extrabold text-purple-400 mt-1 tabular-nums">
                    ₹{paidInvoicesTotal.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    UPI VPA: {UPI_PAYMENT_CONFIG.vpa}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Outstanding Receivables</div>
                  <div className="text-2xl font-extrabold text-amber-400 mt-1 tabular-nums">
                    ₹{outstandingInvoicesTotal.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {invoices.filter((i) => i.status !== 'Paid').length} invoices awaiting verification
                  </div>
                </div>
              </div>

              {/* Connected Pipeline Flow Visualizer */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Interconnected Enterprise Pipeline State
                  </h3>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded font-mono">
                    Zero-Silo Architecture Active
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">1. CRM Leads</span>
                    <strong className="text-base text-white tabular-nums">{leads.length}</strong>
                    <span className="text-[10px] text-slate-500 block">Prospects</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">2. Active Deals</span>
                    <strong className="text-base text-blue-400 tabular-nums">{deals.length}</strong>
                    <span className="text-[10px] text-slate-500 block">In Pipeline</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">3. Inventory Stock</span>
                    <strong className="text-base text-emerald-400 tabular-nums">
                      {products.reduce((a, b) => a + b.stockQty, 0)}
                    </strong>
                    <span className="text-[10px] text-slate-500 block">Units Ready</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">4. Books Invoices</span>
                    <strong className="text-base text-purple-400 tabular-nums">{invoices.length}</strong>
                    <span className="text-[10px] text-slate-500 block">Generated</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">5. Support Tickets</span>
                    <strong className="text-base text-amber-400 tabular-nums">{tickets.length}</strong>
                    <span className="text-[10px] text-slate-500 block">Helpdesk</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">6. Cloud Tasks</span>
                    <strong className="text-base text-white tabular-nums">{tasks.length}</strong>
                    <span className="text-[10px] text-slate-500 block">In Sprints</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. CRM & SALES PIPELINE */}
          {activeTab === 'crm' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    VoloSC CRM & Sales Pipeline
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage Leads, Contacts, Accounts, Deals Kanban, and Lead Conversion.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleExportCSV(leads, 'VoloSC_CRM_Leads')}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
                  <button
                    onClick={handleImportCSV}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" /> Import CSV
                  </button>
                  <button
                    onClick={() => setIsCreatingNew(true)}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Create Lead
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold">
                    <tr>
                      <th className="p-3">Lead Name</th>
                      <th className="p-3">Company</th>
                      <th className="p-3">Phone / Email</th>
                      <th className="p-3 text-right">Value (INR)</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Owner</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-900/50">
                        <td className="p-3 font-bold text-white">
                          <button onClick={() => setViewRecord(lead)} className="hover:text-blue-400 underline text-left">
                            {lead.name}
                          </button>
                        </td>
                        <td className="p-3 text-slate-300">{lead.company}</td>
                        <td className="p-3 text-slate-400">
                          <div>{lead.email}</div>
                          <div className="text-[10px] text-slate-500">{lead.phone}</div>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-400 tabular-nums">
                          ₹{lead.value.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              lead.status === 'Converted'
                                ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                : 'bg-blue-950 text-blue-300 border border-blue-800'
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400">{lead.owner}</td>
                        <td className="p-3 text-center">
                          {lead.status !== 'Converted' ? (
                            <button
                              onClick={() => handleConvertLead(lead)}
                              className="px-2.5 py-1 text-[11px] font-bold text-emerald-300 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded transition-colors cursor-pointer"
                            >
                              Convert Lead
                            </button>
                          ) : (
                            <span className="text-[10px] text-purple-400 font-semibold">✓ Converted</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Deals Kanban Section */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Interactive Sales Deals Kanban Board
                  </h3>
                  <span className="text-xs text-blue-400 font-bold tabular-nums">
                    Total: ₹{deals.reduce((a, b) => a + b.value, 0).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {['Qualified', 'Proposal', 'Negotiation', 'Closed Won'].map((stage) => {
                    const stageDeals = deals.filter((d) => d.stage === stage);
                    return (
                      <div key={stage} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-300">{stage}</span>
                          <span className="text-[10px] text-slate-500 font-bold">({stageDeals.length})</span>
                        </div>
                        <div className="space-y-2">
                          {stageDeals.map((deal) => (
                            <div key={deal.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                              <div className="text-xs font-bold text-white line-clamp-1">{deal.dealName}</div>
                              <div className="text-xs text-emerald-400 font-bold tabular-nums">₹{deal.value.toLocaleString()}</div>
                              <div className="text-[10px] text-slate-400">{deal.accountName}</div>

                              {stage !== 'Closed Won' && (
                                <div className="pt-1 flex items-center justify-between text-[11px]">
                                  <button
                                    onClick={() => handleMarkDealWon(deal)}
                                    className="text-emerald-400 font-bold hover:underline"
                                  >
                                    Mark Won → Books Invoice
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 3. MULTI-TENANT DATABASE & DISTRIBUTED INFRASTRUCTURE */}
          {activeTab === 'infrastructure' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Distributed Multi-Tenant Backend & Database Clusters
                  </h2>
                  <p className="text-xs text-slate-400">
                    Physical Data Center topology, PostgreSQL Citus shards, and Microservices Mesh telemetry.
                  </p>
                </div>
                <button
                  onClick={handleProbeLatency}
                  disabled={isProbingLatency}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isProbingLatency ? 'animate-spin' : ''}`} />
                  {isProbingLatency ? 'Probing Latency...' : 'Run Global Health Probe'}
                </button>
              </div>

              {/* Data Center Regions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {dataCenters.map((dc) => (
                  <div key={dc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white truncate">{dc.name}</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.2 rounded border border-emerald-800">
                        {dc.latencyMs}ms
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Region: <span className="font-mono text-slate-300">{dc.region}</span> ({dc.role})
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px]">
                      <div className="flex justify-between text-slate-400">
                        <span>CPU Load:</span>
                        <span className="font-bold text-slate-200">{dc.cpuPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${dc.cpuPercent}%` }} />
                      </div>

                      <div className="flex justify-between text-slate-400 pt-1">
                        <span>Active Tenants:</span>
                        <span className="font-bold text-emerald-400">{dc.activeTenants} Orgs</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Storage Pool:</span>
                        <span className="font-bold text-slate-200">{dc.storageTb} TB</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Distributed PostgreSQL Citus Shards Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider">
                  <span>Distributed PostgreSQL Citus Cluster Shards (Tenant Isolation)</span>
                  <span className="text-slate-400 font-mono text-[11px]">PgBouncer Pool: Active</span>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                      <tr>
                        <th className="p-3">Shard Node</th>
                        <th className="p-3">Database Engine</th>
                        <th className="p-3">Assigned Tenant Range</th>
                        <th className="p-3 text-right">Row Records</th>
                        <th className="p-3 text-right">IOPS</th>
                        <th className="p-3 text-right">Repl Lag</th>
                        <th className="p-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {DB_SHARDS.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-900/50">
                          <td className="p-3 font-bold text-blue-400">{s.shardName}</td>
                          <td className="p-3 text-slate-300 font-sans">{s.engine}</td>
                          <td className="p-3 text-slate-400 font-sans">{s.tenantRange}</td>
                          <td className="p-3 text-right text-slate-200">{s.recordsCount.toLocaleString()}</td>
                          <td className="p-3 text-right text-emerald-400">{s.iops.toLocaleString()}</td>
                          <td className="p-3 text-right text-slate-400">{s.replicationLagMs}ms</td>
                          <td className="p-3 text-center font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Scalable Kubernetes Microservices Topology */}
              <div className="space-y-3 pt-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Kubernetes Pod Autoscaling & Service Mesh Topology
                    </h3>
                  </div>
                  <button
                    onClick={handleRollingRestartK8s}
                    disabled={isRollingRestart}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRollingRestart ? 'animate-spin' : ''}`} />
                    {isRollingRestart ? 'Performing Rolling Deployment...' : 'Initiate Zero-Downtime Rolling Restart'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {k8sPods.map((pod) => (
                    <div key={pod.name} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-slate-200">{pod.name}</span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                          {pod.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                        <div>Replicas: <strong className="text-white block font-mono">{pod.replicas}</strong></div>
                        <div>CPU: <strong className="text-blue-400 block font-mono">{pod.cpu}</strong></div>
                        <div>RAM: <strong className="text-purple-400 block font-mono">{pod.mem}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. THIRD-PARTY MARKETPLACE & CERTIFIED VENDORS */}
          {activeTab === 'marketplace' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    VoloSC App Marketplace & Certified Vendors Hub
                  </h2>
                  <p className="text-xs text-slate-400">
                    Verified enterprise integrations for GST filings, WhatsApp API, Payment gateways, SAP & Slack.
                  </p>
                </div>
                <button
                  onClick={() => onNotify('Developer Console: API key generated for custom plugin integration.')}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg cursor-pointer"
                >
                  + Submit App / Developer API
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {['All', 'Finance & Tax', 'Communication', 'Payments', 'ERP & CRM', 'DevOps & Cloud'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMarketplaceCategory(cat)}
                    className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      marketplaceCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Marketplace Apps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketplaceApps
                  .filter((a) => marketplaceCategory === 'All' || a.category === marketplaceCategory)
                  .map((app) => (
                    <div
                      key={app.id}
                      className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-9 h-9 rounded-lg ${app.iconBg} text-white font-bold flex items-center justify-center text-sm shadow-xs`}>
                              {app.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-white">{app.name}</h4>
                              <span className="text-[11px] text-slate-400 block">{app.vendor}</span>
                            </div>
                          </div>

                          {app.certified && (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800/80 shrink-0">
                              ✓ Certified
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {app.description}
                        </p>

                        <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between">
                          <span>★ {app.rating} ({app.reviewsCount} reviews)</span>
                          <span className="font-mono">{app.version}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-500">
                          {app.permissions.length} scopes
                        </span>
                        <button
                          onClick={() => handleToggleMarketplaceApp(app.id)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                            app.installed
                              ? 'bg-slate-800 text-slate-300 hover:bg-red-950 hover:text-red-300'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {app.installed ? 'Configured (Uninstall)' : '1-Click Install'}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 5. LEGAL, SECURITY & COMPLIANCE TRUST CENTER */}
          {activeTab === 'compliance' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    VoloSC Trust Center & Legal Compliance Audits
                  </h2>
                  <p className="text-xs text-slate-400">
                    Official third-party certifications, penetration tests, and data protection compliance certificates.
                  </p>
                </div>
                <button
                  onClick={() => onNotify('Security & Compliance Whitepaper PDF (v2026.4) generated.')}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download Full Audit Package
                </button>
              </div>

              {/* Compliance Badges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COMPLIANCE_AUDITS.map((cert) => (
                  <div key={cert.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        <h4 className="text-sm font-bold text-white">{cert.standard}</h4>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        {cert.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300">
                      Audit Body: <span className="font-semibold text-white">{cert.issuer}</span>
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      Scope: {cert.scope}
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-mono flex items-center justify-between">
                      <span>Cert Ref: {cert.certificateId}</span>
                      <span className="text-slate-500">{cert.validUntil}</span>
                    </div>

                    <p className="text-xs text-emerald-400/90 italic">
                      Summary: {cert.scoreOrSummary}
                    </p>
                  </div>
                ))}
              </div>

              {/* Advanced Access Control & RBAC Matrix */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Role-Based Access Control (RBAC) Permissions Matrix
                    </h3>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Least Privilege Enforced
                  </span>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                      <tr>
                        <th className="p-3">Enterprise Role</th>
                        <th className="p-3 text-center">CRM & Deals</th>
                        <th className="p-3 text-center">Books & Invoices</th>
                        <th className="p-3 text-center">K8s & Shards</th>
                        <th className="p-3 text-center">Billing & Plans</th>
                        <th className="p-3 text-center">Audit Logs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
                      {rbacMatrix.map((item, idx) => (
                        <tr key={item.role} className="hover:bg-slate-900/50">
                          <td className="p-3 font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            {item.role}
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={item.crm}
                              onChange={() => {
                                setRbacMatrix((prev) =>
                                  prev.map((r, i) => (i === idx ? { ...r, crm: !r.crm } : r))
                                );
                                onNotify(`Updated CRM access for ${item.role}`);
                              }}
                              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={item.books}
                              onChange={() => {
                                setRbacMatrix((prev) =>
                                  prev.map((r, i) => (i === idx ? { ...r, books: !r.books } : r))
                                );
                                onNotify(`Updated Books access for ${item.role}`);
                              }}
                              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={item.k8s}
                              onChange={() => {
                                setRbacMatrix((prev) =>
                                  prev.map((r, i) => (i === idx ? { ...r, k8s: !r.k8s } : r))
                                );
                                onNotify(`Updated K8s access for ${item.role}`);
                              }}
                              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={item.billing}
                              onChange={() => {
                                setRbacMatrix((prev) =>
                                  prev.map((r, i) => (i === idx ? { ...r, billing: !r.billing } : r))
                                );
                                onNotify(`Updated Billing access for ${item.role}`);
                              }}
                              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={item.audit}
                              onChange={() => {
                                setRbacMatrix((prev) =>
                                  prev.map((r, i) => (i === idx ? { ...r, audit: !r.audit } : r))
                                );
                                onNotify(`Updated Audit Trail access for ${item.role}`);
                              }}
                              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MFA & Cryptographic Defense Card */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-purple-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Multi-Factor Authentication (MFA / 2FA) & Cryptographic Defense
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    MFA Mandatory for All Users
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Data Encryption at Rest</span>
                    <strong className="text-white block font-mono">AES-256-GCM Hardware Encrypted</strong>
                    <span className="text-[10px] text-slate-500">Keys rotated every 90 days via KMS</span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Data Encryption in Transit</span>
                    <strong className="text-white block font-mono">TLS 1.3 / Strict mTLS</strong>
                    <span className="text-[10px] text-slate-500">Zero cleartext data over public wire</span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Registered 2FA Phone</span>
                    <strong className="text-emerald-400 block font-mono">+91 8862059500</strong>
                    <span className="text-[10px] text-slate-500">Sayyed Furkhan (Super Admin)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. BOOKS ACCOUNTING, INVENTORY, PEOPLE, PROJECTS, OFFICE, ETC */}
          {activeTab === 'books' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">VoloSC Books — Accounting & Invoicing</h2>
                  <p className="text-xs text-slate-400">Automated Tax Calculation (18% GST), Discounts & Ledger</p>
                </div>
                <button
                  onClick={() => handleExportCSV(invoices, 'VoloSC_Invoices')}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Export Invoices
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                    <tr>
                      <th className="p-3">Invoice #</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Created</th>
                      <th className="p-3 text-right">Subtotal</th>
                      <th className="p-3 text-right">Tax (18%)</th>
                      <th className="p-3 text-right">Grand Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-900/50">
                        <td className="p-3 font-mono font-bold text-blue-400">{inv.invoiceNumber}</td>
                        <td className="p-3 font-semibold text-white">{inv.customerName}</td>
                        <td className="p-3 text-slate-400">{inv.createdAt}</td>
                        <td className="p-3 text-right tabular-nums">₹{inv.subtotal.toLocaleString()}</td>
                        <td className="p-3 text-right tabular-nums text-slate-400">₹{inv.taxTotal.toLocaleString()}</td>
                        <td className="p-3 text-right font-bold text-emerald-400 tabular-nums">₹{inv.grandTotal.toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${inv.status === 'Paid' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          {inv.status !== 'Paid' ? (
                            <button
                              onClick={() => handleRecordPayment(inv)}
                              className="px-2.5 py-1 text-[11px] font-bold text-purple-300 bg-purple-950 hover:bg-purple-900 rounded"
                            >
                              Record Payment
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-mono">Paid</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. ONE-CLICK DATA MIGRATION (Salesforce, Microsoft, Zoho) */}
          {activeTab === 'migration' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    1-Click Legacy Platform Migration Pipeline
                  </h2>
                  <p className="text-xs text-slate-400">
                    Automated, zero-downtime, zero-data-loss pipeline to import historical CRM data, contacts, deals, invoices, and documents.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Zero Data Loss Guarantee
                  </span>
                </div>
              </div>

              {/* Source Platform Selector */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Source Enterprise Platform To Migrate Into VoloSC:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'salesforce', name: 'Salesforce Sales Cloud', records: '14,250 records', color: 'border-blue-500/50 bg-blue-950/20' },
                    { id: 'microsoft', name: 'Microsoft 365 & Dynamics', records: '28,900 records', color: 'border-purple-500/50 bg-purple-950/20' },
                    { id: 'zoho', name: 'Zoho One / Zoho CRM', records: '9,800 records', color: 'border-amber-500/50 bg-amber-950/20' },
                  ].map((src) => (
                    <button
                      key={src.id}
                      onClick={() => setMigrationSource(src.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        migrationSource === src.id
                          ? 'border-blue-500 bg-blue-950/40 shadow-md shadow-blue-500/10'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-bold text-white">{src.name}</strong>
                        {migrationSource === src.id && <Check className="w-4 h-4 text-blue-400" />}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-1">{src.records} detected in tenant backup</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Schema Mapping Visualizer */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Automated Relational Schema Mapping
                  </h3>
                  <span className="text-[11px] text-blue-400 font-mono">100% Relational Compatibility</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Legacy Contacts & Leads</span>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
                      <span className="text-slate-400">Source</span> → <span className="text-emerald-400">VoloSC CRM Leads</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Opportunities & Quotes</span>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
                      <span className="text-slate-400">Source</span> → <span className="text-emerald-400">VoloSC Deals Kanban</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Invoices & Ledgers</span>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
                      <span className="text-slate-400">Source</span> → <span className="text-emerald-400">VoloSC Books (18% GST)</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Cloud Files & Attachments</span>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
                      <span className="text-slate-400">Source</span> → <span className="text-emerald-400">AES-256 Object Store</span>
                    </div>
                  </div>
                </div>

                {/* Migration Action Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
                  <div className="text-xs text-slate-400">
                    Target Cluster: <span className="text-white font-mono font-bold">PostgreSQL Citus Mumbai (ap-south-1)</span>
                  </div>
                  <button
                    onClick={() => handleStartMigration(migrationSource)}
                    disabled={isMigrating}
                    className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                  >
                    <ArrowRightLeft className={`w-4 h-4 ${isMigrating ? 'animate-spin' : ''}`} />
                    {isMigrating ? 'Migrating Enterprise Records...' : `Start 1-Click Migration from ${migrationSource.toUpperCase()}`}
                  </button>
                </div>

                {/* Progress Bar & Status */}
                {isMigrating && (
                  <div className="p-3.5 bg-slate-900/90 rounded-lg border border-blue-800/60 space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-300 font-mono">{migrationStage}</span>
                      <span className="font-bold text-blue-400 font-mono">{migrationProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${migrationProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Completed Banner */}
                {migrationCompleted && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-xl space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" /> Migration Successfully Completed with ZERO Data Loss!
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs pt-1">
                      <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Leads</span>
                        <strong className="text-white font-mono">{migratedStats.leads}</strong>
                      </div>
                      <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Accounts</span>
                        <strong className="text-white font-mono">{migratedStats.accounts}</strong>
                      </div>
                      <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Deals</span>
                        <strong className="text-white font-mono">{migratedStats.deals}</strong>
                      </div>
                      <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Invoices</span>
                        <strong className="text-white font-mono">{migratedStats.invoices}</strong>
                      </div>
                      <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Encrypted Docs</span>
                        <strong className="text-white font-mono">{migratedStats.files}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 8. API GATEWAY, WEBHOOKS & DEVELOPER SDK */}
          {activeTab === 'api_gateway' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Enterprise API Gateway, Webhooks & Developer Hub
                  </h2>
                  <p className="text-xs text-slate-400">
                    Production RESTful API endpoints, real-time Webhook dispatches, and SDKs for third-party systems (Stripe, WhatsApp, Slack, SAP).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800 font-mono">
                    99.99% API SLA Uptime
                  </span>
                </div>
              </div>

              {/* API Credentials Card */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Enterprise Authentication Keys
                    </h3>
                  </div>
                  <div className="flex gap-1.5 text-xs">
                    <button
                      onClick={() => setActiveApiKeyType('live')}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                        activeApiKeyType === 'live' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Production Live
                    </button>
                    <button
                      onClick={() => setActiveApiKeyType('test')}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                        activeApiKeyType === 'test' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Sandbox Test
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between gap-2 font-mono text-xs">
                  <span className="text-emerald-400 truncate">
                    {activeApiKeyType === 'live'
                      ? 'vsc_live_••••••••••••••••••••••••••••3a9f'
                      : 'vsc_test_sandbox_demo_token_7718b'}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(
                        activeApiKeyType === 'live'
                          ? 'vsc_live_ent_sec_auth_token_9941a'
                          : 'vsc_test_sandbox_demo_token_7718b'
                      );
                      onNotify('API Token copied to clipboard!');
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-sans font-bold rounded flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
              </div>

              {/* Interactive REST API Explorer (Swagger-like) */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Interactive REST API Explorer & Live Playground
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Base: https://api.volocs.corp</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="px-3 py-2 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-bold text-xs rounded-lg flex items-center justify-center shrink-0">
                    GET
                  </span>
                  <select
                    value={selectedApiEndpoint}
                    onChange={(e) => setSelectedApiEndpoint(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-hidden"
                  >
                    <option value="/v1/crm/leads">/v1/crm/leads (Fetch enterprise leads)</option>
                    <option value="/v1/books/invoices">/v1/books/invoices (Fetch accounting invoices)</option>
                    <option value="/v1/citus/shards">/v1/citus/shards (Query distributed database shards)</option>
                  </select>
                  <button
                    onClick={handleTestApi}
                    disabled={isTestingApi}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Play className={`w-3.5 h-3.5 ${isTestingApi ? 'animate-spin' : ''}`} />
                    {isTestingApi ? 'Executing...' : 'Send Request'}
                  </button>
                </div>

                {apiTestResponse && (
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span className="text-emerald-400 font-bold">HTTP/2 200 OK (28ms)</span>
                      <span>Content-Type: application/json</span>
                    </div>
                    <pre className="text-[11px] font-mono text-slate-300 max-h-48 overflow-y-auto pt-1">
                      {apiTestResponse}
                    </pre>
                  </div>
                )}
              </div>

              {/* Outbound Webhooks Manager */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Webhook className="w-4 h-4 text-purple-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Configured Outbound Enterprise Webhooks
                    </h3>
                  </div>
                  <button
                    onClick={() => onNotify('New Webhook endpoint dialog ready.')}
                    className="px-2.5 py-1 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                  >
                    + Add Endpoint
                  </button>
                </div>

                <div className="space-y-2">
                  {webhooksList.map((wh) => (
                    <div key={wh.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <div className="font-mono text-slate-200 font-bold">{wh.url}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>Events: <strong className="text-purple-400">{wh.events.join(', ')}</strong></span>
                          <span>•</span>
                          <span className="font-mono text-emerald-400">{wh.latency}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {wh.status}
                        </span>
                        <button
                          onClick={() => onNotify(`Test ping dispatched to ${wh.url} with HMAC signature.`)}
                          className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                        >
                          Ping Test
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 9. AUTONOMOUS AI COPILOT ENGINE (Einstein & Copilot Parity) */}
          {activeTab === 'ai_automation' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    VoloSC Autonomous AI Copilot (Einstein & Copilot Parity)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Self-executing autonomous agents that perform multi-step business actions across CRM, Books, and PostgreSQL Shards.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2 py-1 rounded border border-blue-800 flex items-center gap-1 font-mono">
                    <Sparkles className="w-3.5 h-3.5" /> Gemini 2.5 Pro Powered
                  </span>
                </div>
              </div>

              {/* Agent Selection Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'lead_qualifier', title: 'Autonomous Lead Qualifier & Deal Closer', desc: 'Analyzes prospect intent, drafts proposal, converts lead, and creates Books invoice.' },
                  { id: 'invoice_chaser', title: 'AR Invoice & Payment Chaser', desc: 'Identifies overdue receivables, calculates late penalty, and dispatches UPI deep-link reminders.' },
                  { id: 'shard_rebalancer', title: 'Citus PostgreSQL Shard Rebalancer', desc: 'Monitors IOPS across Mumbai and US East clusters, repartitioning heavy tenants dynamically.' },
                ].map((agent) => (
                  <div
                    key={agent.id}
                    onClick={() => setActiveAutonomousAgent(agent.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      activeAutonomousAgent === agent.id
                        ? 'border-blue-500 bg-blue-950/40 shadow-md shadow-blue-500/10'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-white">{agent.title}</h4>
                        {activeAutonomousAgent === agent.id && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{agent.desc}</p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-800/80 flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRunAutonomousAgent(agent.id);
                        }}
                        disabled={isAgentExecuting}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Execute Agent Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Execution Trace Box */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Autonomous Reasoning & Execution Log
                    </h3>
                  </div>
                  {isAgentExecuting && (
                    <span className="text-[10px] text-blue-400 font-mono animate-pulse">Agent reasoning...</span>
                  )}
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs space-y-1.5 min-h-[140px] text-slate-300">
                  {agentLogs.length === 0 ? (
                    <div className="text-slate-500 italic py-6 text-center">
                      Click "Execute Agent Action" above to watch VoloSC Autonomous AI Copilot execute multi-step workflows.
                    </div>
                  ) : (
                    agentLogs.map((log, idx) => (
                      <div key={idx} className={idx === agentLogs.length - 1 ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 10. 24/7 TAM SUPPORT & CHANGE MANAGEMENT */}
          {activeTab === 'support_change' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Dedicated 24/7 Enterprise Technical Account Manager (TAM)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Direct access to senior architecture engineers with a guaranteed 15-minute resolution SLA.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 15m Guaranteed SLA Active
                  </span>
                </div>
              </div>

              {/* Dedicated TAM Profile Card */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg shadow-md">
                      SF
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Sayyed Furkhan</h4>
                      <p className="text-xs text-blue-400 font-medium">Principal Enterprise Technical Account Manager & Architect</p>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span>Email: <strong className="text-slate-200">sayyedfurkhan38@gmail.com</strong></span>
                        <span>•</span>
                        <span>Direct Hotline: <strong className="text-emerald-400">+91 8862059500</strong></span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="tel:+918862059500"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Smartphone className="w-4 h-4" /> Call Direct Hotline
                  </a>
                </div>
              </div>

              {/* Live TAM Support Chat */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Live Technical Account Manager Support Console
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono">Status: Sayyed Furkhan Online</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-3 max-h-64 overflow-y-auto">
                  {supportMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg text-xs space-y-1 ${
                        msg.sender.includes('Sayyed') || msg.sender.includes('Bot')
                          ? 'bg-slate-950 border border-slate-800 text-slate-200'
                          : 'bg-blue-950/50 border border-blue-800/80 text-blue-200 ml-8'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <strong className="text-white">{msg.sender}</strong>
                        <span>{msg.time}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendSupport} className="flex gap-2">
                  <input
                    type="text"
                    value={supportInput}
                    onChange={(e) => setSupportInput(e.target.value)}
                    placeholder="Type urgent architecture question or SLA request..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Send
                  </button>
                </form>
              </div>

              {/* Change Management Playbooks */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Enterprise Change Management & Employee Transition Guides
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                    <strong className="text-white block font-bold">1. Salesforce to VoloSC CRM</strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Zero-retraining UI mode. Sales reps map custom fields in under 3 minutes with zero downtime.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                    <strong className="text-white block font-bold">2. Microsoft 365 to VoloSC Suite</strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Full format fidelity for .docx, .xlsx, and .pptx documents with cloud collaboration.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                    <strong className="text-white block font-bold">3. Zoho to VoloSC Invoicing</strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Instant Indian GST calculation, automated e-invoicing, and deep-linked UPI reconciliation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 11. INVENTORY & STOCK */}
          {activeTab === 'inventory' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">VoloSC Inventory & Warehousing</h2>
                  <p className="text-xs text-slate-400">Track SKUs, multi-warehouse stock levels, and automated reorder points.</p>
                </div>
                <button
                  onClick={() => onNotify('New SKU inventory dialog opened.')}
                  className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Product SKU
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                    <tr>
                      <th className="p-3">SKU Code</th>
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3 text-right">Unit Price</th>
                      <th className="p-3 text-right">In Stock</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/50">
                        <td className="p-3 font-bold text-blue-400">{p.sku}</td>
                        <td className="p-3 font-sans font-bold text-white">{p.name}</td>
                        <td className="p-3 font-sans text-slate-400">{p.category}</td>
                        <td className="p-3 text-right text-emerald-400 tabular-nums">₹{p.price.toLocaleString()}</td>
                        <td className="p-3 text-right text-white font-bold tabular-nums">{p.stockQty}</td>
                        <td className="p-3 font-sans">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.stockQty > 20 ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                          }`}>
                            {p.stockQty > 20 ? 'Healthy Stock' : 'Low Stock Warning'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 12. PEOPLE & HR */}
          {activeTab === 'people' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">VoloSC People & Human Resources</h2>
                  <p className="text-xs text-slate-400">Employee database, automated attendance, payroll, and organization charts.</p>
                </div>
                <button
                  onClick={() => {
                    setAttendanceClockedIn(!attendanceClockedIn);
                    onNotify(attendanceClockedIn ? 'Clocked OUT for Sayyed Furkhan' : 'Clocked IN for Sayyed Furkhan');
                  }}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer ${
                    attendanceClockedIn ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  {attendanceClockedIn ? 'Clock Out Attendance' : 'Clock In Attendance'}
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                    <tr>
                      <th className="p-3">Employee Name</th>
                      <th className="p-3">Role / Designation</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Email</th>
                      <th className="p-3 text-right">Monthly Salary</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
                    {employees.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-900/50">
                        <td className="p-3 font-bold text-white">{e.name}</td>
                        <td className="p-3 text-blue-400 font-medium">{e.role}</td>
                        <td className="p-3 text-slate-400">{e.department}</td>
                        <td className="p-3 text-slate-300 font-mono text-[11px]">{e.email}</td>
                        <td className="p-3 text-right font-mono text-emerald-400 tabular-nums">₹{e.salary.toLocaleString()}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300">
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 13. CAMPAIGNS & MARKETING */}
          {activeTab === 'campaigns' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">VoloSC Multi-Channel Marketing Campaigns</h2>
                  <p className="text-xs text-slate-400">WhatsApp Business API, Email sequences, and LinkedIn Ads conversion tracker.</p>
                </div>
                <button
                  onClick={() => onNotify('New marketing campaign wizard initiated.')}
                  className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Launch Campaign
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-emerald-400">WhatsApp Business API Blast</span>
                  <div className="text-xl font-extrabold text-white">12,500 Delivered</div>
                  <div className="text-xs text-slate-400">Open rate: 94.2% • 186 Qualified Leads</div>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-blue-400">Enterprise CFO Email Sequence</span>
                  <div className="text-xl font-extrabold text-white">4,800 Sent</div>
                  <div className="text-xs text-slate-400">Open rate: 68.5% • 42 Demos Booked</div>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-purple-400">LinkedIn Sales Navigator Ads</span>
                  <div className="text-xl font-extrabold text-white">₹85,000 Spent</div>
                  <div className="text-xs text-slate-400">ROI: 8.4x • Pipeline Value: ₹71.4L</div>
                </div>
              </div>
            </div>
          )}

          {/* 14. DESK & CUSTOMER SUPPORT */}
          {activeTab === 'desk' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">VoloSC Desk — Enterprise Support Helpdesk</h2>
                  <p className="text-xs text-slate-400">Omnichannel support tickets, SLA timer, and customer satisfaction metrics.</p>
                </div>
                <button
                  onClick={() => onNotify('New support ticket logged.')}
                  className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> New Ticket
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                    <tr>
                      <th className="p-3">Ticket ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Priority</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
                    {tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-900/50">
                        <td className="p-3 font-mono font-bold text-blue-400">{t.id}</td>
                        <td className="p-3 font-bold text-white">{t.customerName}</td>
                        <td className="p-3 text-slate-300">{t.subject}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            t.priority === 'Critical' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-blue-950 text-blue-300'
                          }`}>
                            {t.priority}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-slate-400">{t.status}</td>
                        <td className="p-3 text-center">
                          {t.status !== 'Resolved' ? (
                            <button
                              onClick={() => {
                                setTickets((prev) => prev.map((item) => (item.id === t.id ? { ...item, status: 'Resolved' } : item)));
                                onNotify(`Ticket ${t.id} marked as Resolved!`);
                              }}
                              className="px-2.5 py-1 text-[11px] font-bold text-emerald-300 bg-emerald-950 hover:bg-emerald-900 rounded cursor-pointer"
                            >
                              Resolve
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-400 font-bold">✓ Resolved</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 15. PROJECTS & TASKS */}
          {activeTab === 'projects' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">VoloSC Projects & Sprints Board</h2>
                  <p className="text-xs text-slate-400">Scrum sprints, task dependencies, burndown charts, and timesheets.</p>
                </div>
                <button
                  onClick={() => onNotify('New sprint task modal ready.')}
                  className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Create Task
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['Todo', 'In Progress', 'Completed'].map((col) => {
                  const colTasks = tasks.filter((t) => t.status === col);
                  return (
                    <div key={col} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                        <span>{col === 'Todo' ? 'To Do' : col === 'Completed' ? 'Completed' : col}</span>
                        <span className="text-slate-500 font-mono">({colTasks.length})</span>
                      </div>
                      <div className="space-y-2">
                        {colTasks.map((t) => (
                          <div key={t.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                            <div className="text-xs font-bold text-white">{t.title}</div>
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span>Assignee: <strong className="text-slate-200">{t.assignee}</strong></span>
                              <span className="font-mono text-emerald-400">{t.dueDate}</span>
                            </div>
                            <div className="pt-1 flex justify-end">
                              {col !== 'Completed' && (
                                <button
                                  onClick={() => {
                                    setTasks((prev) => prev.map((item) => (item.id === t.id ? { ...item, status: 'Completed' } : item)));
                                    onNotify(`Task "${t.title}" moved to Completed!`);
                                  }}
                                  className="text-[10px] font-bold text-emerald-400 hover:underline cursor-pointer"
                                >
                                  Complete Task →
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 16. OFFICE SUITE (Writer & Calc) */}
          {activeTab === 'office' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">VoloSC Office Suite (Writer & Calc)</h2>
                  <p className="text-xs text-slate-400">Enterprise Word Processor and Spreadsheet with real-time cloud sync.</p>
                </div>
                <button
                  onClick={() => onNotify('Document saved to encrypted tenant storage!')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Save to VoloSC Drive
                </button>
              </div>

              {/* Writer */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-blue-400" /> VoloSC Writer</span>
                  <span className="text-slate-500 font-mono">{docContent.split(' ').length} words</span>
                </div>
                <textarea
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                  rows={5}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-hidden leading-relaxed font-sans"
                />
              </div>

              {/* Calc */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5"><TableIcon className="w-4 h-4 text-emerald-400" /> VoloSC Calc (Financial Model)</span>
                  <span className="text-emerald-400 font-mono">Dynamic SUM Formula Active</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="p-2.5">Quarter</th>
                        <th className="p-2.5 text-right">CRM Sales</th>
                        <th className="p-2.5 text-right">Cloud MRR</th>
                        <th className="p-2.5 text-right">Operating Profit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {sheetData.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-900/50">
                          <td className="p-2.5 font-sans font-bold text-white">{r.row}</td>
                          <td className="p-2.5 text-right tabular-nums">₹{r.sales.toLocaleString()}</td>
                          <td className="p-2.5 text-right tabular-nums">₹{r.cloud.toLocaleString()}</td>
                          <td className="p-2.5 text-right tabular-nums text-emerald-400 font-bold">₹{r.profit.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 17. MAIL, CALENDAR & VIDEO MEETINGS */}
          {activeTab === 'mail_meetings' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">VoloSC Mail & HD Video Conferences</h2>
                  <p className="text-xs text-slate-400">Enterprise secure email with SPF/DKIM verification and WebRTC encrypted video conferencing.</p>
                </div>
                <button
                  onClick={() => onNotify('HD Meeting Room launched at meet.volocs.corp/vip-9500')}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" /> Start Instant HD Meeting
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5"><Mail className="w-4 h-4 text-blue-400" /> VoloSC Mailbox</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      SPF & DKIM 100% Passed
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>Sayyed Furkhan</span>
                        <span className="text-[10px] text-slate-500 font-mono">10:45 AM</span>
                      </div>
                      <div className="text-blue-400 font-medium">Re: Enterprise Deployment Approval</div>
                      <p className="text-slate-400 text-[11px]">All 6 Kubernetes pods are operational and Citus sharding is healthy.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5"><Video className="w-4 h-4 text-purple-400" /> WebRTC Video Conference</span>
                    <span className="text-[10px] text-purple-400 font-mono">End-to-End Encrypted</span>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-lg border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
                    <Video className="w-10 h-10 text-slate-600" />
                    <strong className="text-xs text-white">Conference Room: meet.volocs.corp/vip-9500</strong>
                    <p className="text-[11px] text-slate-400 max-w-xs">High-definition audio and 4K video sharing with AI automated meeting transcription.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. AUDIT TRAIL LOG */}
          {activeTab === 'audit_security' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Immutable Enterprise Audit Trail</h2>
                  <p className="text-xs text-slate-400">Tamper-evident logs of every transaction and administrative change.</p>
                </div>
                <button
                  onClick={() => handleExportCSV(auditLogs, 'VoloSC_Audit_Trail')}
                  className="px-3 py-1.5 text-xs bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Export Logs
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                    <tr>
                      <th className="p-3">Audit ID</th>
                      <th className="p-3">User</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">Entity</th>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/50">
                        <td className="p-3 text-slate-500">{log.id}</td>
                        <td className="p-3 text-slate-200 font-sans font-bold">{log.user}</td>
                        <td className="p-3 text-blue-400">{log.action}</td>
                        <td className="p-3 text-purple-400">{log.entity}</td>
                        <td className="p-3 text-slate-500">{log.timestamp}</td>
                        <td className="p-3 text-slate-400 font-sans">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* View Record Drawer */}
          {viewRecord && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
              onClick={() => setViewRecord(null)}
            >
              <div 
                className="w-full max-w-xl bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl p-6 space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                      Record Inspection
                    </span>
                    <h3 className="text-lg font-bold text-white">{viewRecord.name || viewRecord.company || viewRecord.invoiceNumber}</h3>
                  </div>
                  <button onClick={() => setViewRecord(null)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  {Object.entries(viewRecord)
                    .filter(([k]) => typeof viewRecord[k] !== 'object')
                    .map(([k, v]) => (
                      <div key={k} className="flex justify-between py-1 border-b border-slate-800/50 last:border-b-0">
                        <span className="text-slate-400 capitalize">{k}:</span>
                        <span className="font-semibold text-slate-200">{String(v)}</span>
                      </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setViewRecord(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Create Record Modal */}
          {isCreatingNew && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
              onClick={() => setIsCreatingNew(false)}
            >
              <div 
                className="w-full max-w-md bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl p-6 space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white">Create New CRM Lead</h3>
                  <button onClick={() => setIsCreatingNew(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    const form = e.target;
                    const newLead: Lead = {
                      id: `LEAD-${Date.now().toString().slice(-4)}`,
                      name: form.leadName.value,
                      company: form.leadCompany.value,
                      email: form.leadEmail.value,
                      phone: form.leadPhone.value || '+91 98000 00000',
                      source: 'Direct Entry',
                      status: 'New',
                      owner: 'Sayyed Furkhan',
                      value: Number(form.leadValue.value) || 250000,
                      createdAt: new Date().toISOString().slice(0, 16),
                    };
                    setLeads((prev) => [newLead, ...prev]);
                    logAudit('Lead Created', newLead.id, `Created ${newLead.name} (${newLead.company}) for ₹${newLead.value.toLocaleString()}`);
                    onNotify(`New lead "${newLead.name}" created!`);
                    setIsCreatingNew(false);
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="block text-slate-400 mb-1">Contact Name</label>
                    <input required name="leadName" placeholder="e.g. Anand Mahindra" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Company</label>
                    <input required name="leadCompany" placeholder="e.g. Mahindra & Mahindra" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Email</label>
                    <input required type="email" name="leadEmail" placeholder="anand@mahindra.com" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Phone</label>
                    <input name="leadPhone" placeholder="+91 98200 12345" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Estimated Deal Value (INR)</label>
                    <input type="number" defaultValue={350000} name="leadValue" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white" />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingNew(false)}
                      className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      Save Lead
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Client Organization & Tenant Info Modal */}
          {showTenantInfoModal && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
              onClick={() => setShowTenantInfoModal(false)}
            >
              <div 
                className="w-full max-w-lg bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl p-6 space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="text-base font-bold text-white">Client Organization Profile</h3>
                      <span className="text-[11px] text-slate-400">Production Multi-Tenant Environment</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowTenantInfoModal(false)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Company / Entity</span>
                      <strong className="text-white text-sm mt-0.5 block">{clientProfile.companyName}</strong>
                      <span className="text-[11px] text-blue-400 font-mono mt-0.5 block">{clientProfile.subdomain || 'volocs.cloud'}</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Tenant ID & Region</span>
                      <strong className="text-emerald-400 font-mono text-sm mt-0.5 block">{clientProfile.tenantId}</strong>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">{clientProfile.region || 'Mumbai DC-01 (ap-south-1)'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Super Administrator:</span>
                      <span className="font-semibold text-white">{clientProfile.fullName}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Work Email:</span>
                      <span className="font-mono text-blue-400">{clientProfile.workEmail}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Mobile Number:</span>
                      <span className="font-mono text-emerald-400 font-bold">{clientProfile.mobile}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Active License:</span>
                      <span className="text-emerald-400 font-bold">{clientProfile.license}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Data Isolation:</span>
                      <span className="text-slate-300 font-mono text-[11px]">PostgreSQL Citus Shard (AES-256 Encrypted)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onNotify('Two-Factor Authentication (2FA) verification code sent to ' + clientProfile.mobile);
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Send 2FA Security Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTenantInfoModal(false)}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
