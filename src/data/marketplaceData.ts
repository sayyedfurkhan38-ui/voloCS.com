export interface MarketplaceApp {
  id: string;
  name: string;
  vendor: string;
  category: 'Finance & Tax' | 'Communication' | 'DevOps & Cloud' | 'Payments' | 'ERP & CRM' | 'Security';
  rating: number;
  reviewsCount: number;
  description: string;
  installed: boolean;
  certified: boolean;
  version: string;
  iconBg: string;
  permissions: string[];
}

export const MARKETPLACE_APPS: MarketplaceApp[] = [
  {
    id: 'mkt-gst',
    name: 'India GST & E-Way Bill Auto-Filer',
    vendor: 'ClearTax Certified Partner',
    category: 'Finance & Tax',
    rating: 4.9,
    reviewsCount: 1420,
    description: 'Direct GSTR-1, GSTR-3B reconciliation with NIC portal and automated E-Invoice QR generation.',
    installed: true,
    certified: true,
    version: 'v4.2.0',
    iconBg: 'bg-emerald-600',
    permissions: ['Read Invoices', 'Write Tax Filings', 'Export Books Records'],
  },
  {
    id: 'mkt-whatsapp',
    name: 'WhatsApp Cloud Business API',
    vendor: 'Meta Business Solution Partner',
    category: 'Communication',
    rating: 4.8,
    reviewsCount: 3890,
    description: 'Send automated invoice PDFs, deal follow-ups, and support updates via official green-tick WhatsApp.',
    installed: true,
    certified: true,
    version: 'v3.5.1',
    iconBg: 'bg-emerald-500',
    permissions: ['Send Messages', 'Webhook Inbound Events', 'CRM Contacts Sync'],
  },
  {
    id: 'mkt-razorpay',
    name: 'Razorpay Auto-Settlement Gateway',
    vendor: 'Razorpay Payments Inc.',
    category: 'Payments',
    rating: 4.9,
    reviewsCount: 5120,
    description: 'Instant UPI, Cards, and NetBanking automated webhook reconciliation with VoloSC Books ledger.',
    installed: true,
    certified: true,
    version: 'v5.1.0',
    iconBg: 'bg-blue-600',
    permissions: ['Process Payments', 'Create Refunds', 'Bank Settlement Logs'],
  },
  {
    id: 'mkt-tally',
    name: 'Tally Prime Two-Way Synchronizer',
    vendor: 'Apex Solutions India',
    category: 'ERP & CRM',
    rating: 4.7,
    reviewsCount: 890,
    description: 'Seamlessly bi-directionally sync ledgers, vouchers, and inventory items with on-premises Tally Prime.',
    installed: false,
    certified: true,
    version: 'v2.8.4',
    iconBg: 'bg-amber-600',
    permissions: ['Sync Journal Entries', 'Inventory Stock Read/Write'],
  },
  {
    id: 'mkt-sap',
    name: 'SAP S/4HANA Enterprise Connector',
    vendor: 'SAP Certified Partner Alliance',
    category: 'ERP & CRM',
    rating: 4.8,
    reviewsCount: 420,
    description: 'Enterprise RFC & OData adapter connecting VoloSC Sales Orders and Procurement to SAP core.',
    installed: false,
    certified: true,
    version: 'v6.0.2',
    iconBg: 'bg-sky-700',
    permissions: ['Master Data Sync', 'BAPI Order Execution', 'IDoc Queue Access'],
  },
  {
    id: 'mkt-slack',
    name: 'Slack Multi-Workspace Bridge',
    vendor: 'Salesforce & Slack Ecosystem',
    category: 'Communication',
    rating: 4.9,
    reviewsCount: 6200,
    description: 'Receive real-time lead conversion alerts, ticket escalations, and high-priority approvals inside Slack.',
    installed: true,
    certified: true,
    version: 'v4.1.0',
    iconBg: 'bg-purple-600',
    permissions: ['Channel Notifications', 'Slash Commands', 'User Directory Sync'],
  },
  {
    id: 'mkt-docusign',
    name: 'DocuSign Digital Signatures',
    vendor: 'DocuSign Certified Systems',
    category: 'Finance & Tax',
    rating: 4.9,
    reviewsCount: 4100,
    description: 'Legally compliant cryptographic digital signatures on VoloSC Quotes, Invoices, and NDA contracts.',
    installed: false,
    certified: true,
    version: 'v3.9.0',
    iconBg: 'bg-blue-700',
    permissions: ['Sign Documents', 'Audit Trail Storage', 'Download Sealed PDFs'],
  },
  {
    id: 'mkt-aws',
    name: 'AWS S3 & Glacier Vault Archive',
    vendor: 'Amazon Web Services Partner',
    category: 'DevOps & Cloud',
    rating: 4.8,
    reviewsCount: 1840,
    description: 'Automated policy-driven cold tier archiving for enterprise database backups and compliance logs.',
    installed: false,
    certified: true,
    version: 'v2.5.0',
    iconBg: 'bg-amber-700',
    permissions: ['Write Object Storage', 'Lifecycle Management', 'KMS Encryption'],
  },
];
