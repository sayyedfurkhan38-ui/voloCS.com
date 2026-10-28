import React, { useState } from 'react';
import { 
  Building2, 
  BadgeDollarSign, 
  ShoppingCart, 
  Package, 
  FileText, 
  CreditCard, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { VoloAppDefinition } from '../data/appsRegistry';

interface CrossAppFlowEngineProps {
  onOpenApp: (appId: string) => void;
}

export interface FlowStep {
  stepNumber: number;
  appId: string;
  appName: string;
  icon: any;
  color: string;
  badge: string;
  title: string;
  description: string;
  dataKey: string;
  recordPayload: Record<string, any>;
  linkedKeys: { key: string; value: string }[];
}

export const LIFECYCLE_STEPS: FlowStep[] = [
  {
    stepNumber: 1,
    appId: 'volosc-crm',
    appName: 'VoloSC CRM',
    icon: Building2,
    color: 'from-blue-600 to-indigo-600',
    badge: 'Stage 1: Lead to Account',
    title: 'Customer Master Record Created',
    description: 'Lead Alex Mercer (Starlight Global) qualified and converted into Enterprise Customer entity.',
    dataKey: 'customer_id',
    recordPayload: {
      customer_id: 'CUST-7001',
      company: 'Starlight Global Technologies',
      contact_person: 'Alex Mercer',
      email: 'a.mercer@starlight.io',
      territory: 'Pacific Enterprise West',
      assigned_owner: 'Sarah Chen'
    },
    linkedKeys: [
      { key: 'customer_id', value: 'CUST-7001' },
      { key: 'lead_id', value: 'LEAD-101' }
    ]
  },
  {
    stepNumber: 2,
    appId: 'volosc-deals',
    appName: 'VoloSC Deals',
    icon: BadgeDollarSign,
    color: 'from-emerald-600 to-teal-600',
    badge: 'Stage 2: Opportunity Closure',
    title: 'Deal Won & Contract Executed',
    description: 'Enterprise agreement signed via VoloSC Sign; deal marked Closed Won for $245,000.',
    dataKey: 'deal_id',
    recordPayload: {
      deal_id: 'DEAL-4001',
      customer_id: 'CUST-7001',
      deal_name: 'Starlight Global Enterprise Suite Deployment',
      value: '$245,000',
      probability: '100%',
      stage: 'Closed Won'
    },
    linkedKeys: [
      { key: 'deal_id', value: 'DEAL-4001' },
      { key: 'customer_id', value: 'CUST-7001' }
    ]
  },
  {
    stepNumber: 3,
    appId: 'volosc-commerce',
    appName: 'VoloSC Commerce',
    icon: ShoppingCart,
    color: 'from-purple-600 to-pink-600',
    badge: 'Stage 3: Order Provisioning',
    title: 'Digital Order Generated',
    description: 'Contract terms mapped to commercial order with 50 license packages & hardware appliances.',
    dataKey: 'order_id',
    recordPayload: {
      order_id: 'ORD-9001',
      customer_id: 'CUST-7001',
      deal_id: 'DEAL-4001',
      sku: 'SKU-PRO-01',
      quantity: 50,
      total_price: '$245,000',
      fulfillment_status: 'Allocated'
    },
    linkedKeys: [
      { key: 'order_id', value: 'ORD-9001' },
      { key: 'customer_id', value: 'CUST-7001' },
      { key: 'sku', value: 'SKU-PRO-01' }
    ]
  },
  {
    stepNumber: 4,
    appId: 'volosc-inventory',
    appName: 'VoloSC Inventory',
    icon: Package,
    color: 'from-amber-600 to-orange-600',
    badge: 'Stage 4: Stock Reservation',
    title: 'Automated Stock Deduction',
    description: 'Warehouse automatically allocates 50 units of Edge Server SKU-PRO-01; remaining stock 450 units.',
    dataKey: 'sku',
    recordPayload: {
      sku: 'SKU-PRO-01',
      order_id: 'ORD-9001',
      warehouse_location: 'Main Hub (Dallas)',
      quantity_allocated: 50,
      remaining_stock: 450,
      stock_status: 'Reserved for Deployment'
    },
    linkedKeys: [
      { key: 'sku', value: 'SKU-PRO-01' },
      { key: 'order_id', value: 'ORD-9001' }
    ]
  },
  {
    stepNumber: 5,
    appId: 'volosc-invoice',
    appName: 'VoloSC Invoice',
    icon: FileText,
    color: 'from-indigo-600 to-blue-600',
    badge: 'Stage 5: Billing & Tax Engine',
    title: 'Tax Compliant Invoice Generated',
    description: 'System automatically calculates sales tax ($19,600) and sends PDF invoice to customer portal.',
    dataKey: 'invoice_id',
    recordPayload: {
      invoice_id: 'INV-3001',
      customer_id: 'CUST-7001',
      order_id: 'ORD-9001',
      subtotal: '$245,000',
      tax_amount: '$19,600',
      grand_total: '$264,600',
      payment_status: 'Paid'
    },
    linkedKeys: [
      { key: 'invoice_id', value: 'INV-3001' },
      { key: 'customer_id', value: 'CUST-7001' },
      { key: 'order_id', value: 'ORD-9001' }
    ]
  },
  {
    stepNumber: 6,
    appId: 'volosc-payments',
    appName: 'VoloSC Payments',
    icon: CreditCard,
    color: 'from-teal-600 to-emerald-600',
    badge: 'Stage 6: Multi-Rail Settlement',
    title: 'Automated Payment Settlement',
    description: 'Wire transaction settled instantly via corporate payment gateway; UTR captured.',
    dataKey: 'payment_id',
    recordPayload: {
      payment_id: 'PAY-1001',
      invoice_id: 'INV-3001',
      amount_settled: '$264,600',
      gateway_reference: 'STRIPE_PI_994827104_SETTLED',
      settlement_time: 'Instant T+0',
      status: 'Settled'
    },
    linkedKeys: [
      { key: 'payment_id', value: 'PAY-1001' },
      { key: 'invoice_id', value: 'INV-3001' }
    ]
  },
  {
    stepNumber: 7,
    appId: 'volosc-books',
    appName: 'VoloSC Books',
    icon: BookOpen,
    color: 'from-blue-700 to-violet-800',
    badge: 'Stage 7: Autonomous Ledger Posting',
    title: 'Double-Entry General Ledger Posted',
    description: 'Debit Cash $264,600; Credit Revenue $245,000 & Sales Tax Payable $19,600 with zero human intervention.',
    dataKey: 'journal_id',
    recordPayload: {
      journal_id: 'JE-2025-0042',
      invoice_id: 'INV-3001',
      payment_id: 'PAY-1001',
      debit_account: '1010-CASH-CHASE ($264,600)',
      credit_account_1: '4010-SOFTWARE-REVENUE ($245,000)',
      credit_account_2: '2020-TAX-PAYABLE ($19,600)',
      balanced: 'YES (Double-Entry Reconciled)'
    },
    linkedKeys: [
      { key: 'journal_id', value: 'JE-2025-0042' },
      { key: 'invoice_id', value: 'INV-3001' },
      { key: 'payment_id', value: 'PAY-1001' }
    ]
  }
];

export const CrossAppFlowEngine: React.FC<CrossAppFlowEngineProps> = ({ onOpenApp }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [lastServerTxn, setLastServerTxn] = useState<string | null>(null);

  const handleRunFullCycle = async () => {
    setIsSimulating(true);
    setCompletedSteps([]);
    setActiveStepIndex(0);

    // Call real server transaction pipeline
    try {
      const token = localStorage.getItem('volosc_token');
      const orgId = localStorage.getItem('volosc_org') || 'org_volosc_global';
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-organization-id': orgId
      };
      if (token) headers['authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/workflow/execute', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          customerName: 'Starlight Global Technologies',
          dealAmount: 245000,
          sku: 'SKU-VOLOSC-ENT-LIC',
          quantity: 50
        })
      });
      const data = await res.json();
      if (data.batchRef) {
        setLastServerTxn(data.batchRef);
      }
    } catch (e) {
      // offline fallback
    }

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < LIFECYCLE_STEPS.length) {
        setCompletedSteps(prev => [...prev, current - 1]);
        setActiveStepIndex(current);
      } else {
        setCompletedSteps([0, 1, 2, 3, 4, 5, 6]);
        setIsSimulating(false);
        clearInterval(interval);
      }
    }, 600);
  };

  const handleReset = () => {
    setActiveStepIndex(0);
    setCompletedSteps([0, 1, 2, 3, 4, 5, 6]);
    setIsSimulating(false);
  };

  const activeStep = LIFECYCLE_STEPS[activeStepIndex];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            Autonomous Cross-App Lifecycle Engine
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
            Unified Relational Data Flow Pipeline
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-normal">
              7 Integrated Stages
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Watch how customer IDs, deals, orders, SKUs, invoices, and payments stay synchronized in real time across VoloSC applications without duplicate entry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunFullCycle}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-blue-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? 'Processing Transaction...' : 'Run Live Transaction'}
          </button>
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors border border-slate-700"
            title="Reset Pipeline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pipeline Stepper Bar */}
      <div className="py-6 border-b border-slate-800 overflow-x-auto relative z-10">
        <div className="flex items-center min-w-[760px] justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-800 -z-0" />
          <div 
            className="absolute top-1/2 left-8 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transition-all duration-500 -z-0"
            style={{ width: `${(Math.max(activeStepIndex, completedSteps.length - 1) / (LIFECYCLE_STEPS.length - 1)) * 90}%` }}
          />

          {LIFECYCLE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.includes(idx);
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className="group relative z-10 flex flex-col items-center focus:outline-none"
              >
                <div 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                    isActive 
                      ? 'bg-blue-600 text-white scale-110 ring-4 ring-blue-500/30' 
                      : isCompleted 
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 hover:bg-slate-700' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                  }`}
                >
                  {isCompleted && !isActive ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="mt-2 text-center">
                  <span className={`block text-xs font-semibold ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {step.appName}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono">
                    Step 0{step.stepNumber}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Deep-Dive Container */}
      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left column: Step overview & actions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {activeStep.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Primary ID: <span className="text-amber-400 font-bold">{activeStep.recordPayload[activeStep.dataKey]}</span>
              </span>
            </div>

            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {activeStep.title}
            </h3>

            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              {activeStep.description}
            </p>

            {/* Linked foreign keys */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Relational Keys Synchronized:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeStep.linkedKeys.map((link) => (
                  <div 
                    key={link.key}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-200"
                  >
                    <span className="text-blue-400">{link.key}:</span>
                    <span className="font-semibold text-emerald-400">{link.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 flex items-center gap-3">
            <button
              onClick={() => onOpenApp(activeStep.appId)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              Open in {activeStep.appName}
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            </button>

            <button
              onClick={() => setActiveStepIndex((prev) => (prev + 1) % LIFECYCLE_STEPS.length)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
            >
              Next Step
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right column: Live JSON / Record Inspector */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800/90 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-300 font-semibold font-sans">
                Synchronized Entity Record ({activeStep.appName})
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              org_volo_global_01
            </span>
          </div>

          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
            {Object.entries(activeStep.recordPayload).map(([key, val]) => (
              <div key={key} className="flex items-start justify-between py-1 border-b border-slate-900/60">
                <span className="text-blue-400 font-medium">{key}:</span>
                <span className="text-slate-200 text-right font-medium max-w-[65%] truncate">
                  {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                </span>
              </div>
            ))}
            <div className="pt-2 text-[10px] text-slate-500 flex items-center justify-between">
              <span>audit_status: <span className="text-emerald-400 font-semibold">VERIFIED_IMMUTABLE</span></span>
              <span>latency: <span className="text-blue-400 font-semibold">1.4ms</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
