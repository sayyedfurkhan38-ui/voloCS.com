// VoloSC Enterprise Data Store & State Engine
// Implements unified relational data for CRM, Accounting, Inventory, HR, Support, Projects, Office, and Cloud

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Converted' | 'Lost';
  owner: string;
  value: number;
  createdAt: string;
  notes?: string[];
  activities?: string[];
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  accountId?: string;
  owner: string;
}

export interface Account {
  id: string;
  companyName: string;
  industry: string;
  website: string;
  address: string;
  revenue: string;
  owner: string;
}

export interface Deal {
  id: string;
  dealName: string;
  value: number;
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number;
  closingDate: string;
  accountName: string;
  owner: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxRate: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  grandTotal: number;
  dueDate: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  createdAt: string;
  paymentId?: string;
}

export interface Bill {
  id: string;
  vendorName: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Approved' | 'Paid';
  category: string;
}

export interface InventoryProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stockQty: number;
  minAlertQty: number;
  warehouse: string;
  barcode: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'Inbound' | 'Outbound' | 'Adjustment' | 'Transfer';
  quantity: number;
  reference: string;
  timestamp: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  joiningDate: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Terminated';
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'Present' | 'Late' | 'Half Day';
}

export interface SupportTicket {
  id: string;
  subject: string;
  customerName: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Pending' | 'In Progress' | 'Resolved';
  assignedAgent: string;
  createdAt: string;
  slaTarget: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  assignee: string;
  priority: 'Low' | 'Normal' | 'Urgent';
  dueDate: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Completed';
  projectId: string;
  loggedHours: number;
}

export interface AuditLogEntry {
  id: string;
  user: string;
  action: string;
  entity: string;
  timestamp: string;
  details: string;
}

export interface WorkflowRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'Active' | 'Paused';
  executionCount: number;
}

// Initial Enterprise State Data
export const INITIAL_LEADS: Lead[] = [
  {
    id: 'LEAD-101',
    name: 'Rajesh Sharma',
    email: 'r.sharma@tata.com',
    phone: '+91 98201 12345',
    company: 'Tata Consultancy Services',
    source: 'Enterprise Inbound',
    status: 'Qualified',
    owner: 'Sayyed Furkhan',
    value: 450000,
    createdAt: '2026-10-25 10:30',
    notes: ['Interested in VoloSC Cloud Servers + CRM migration.'],
    activities: ['Lead created from Website Contact', 'Demo call completed'],
  },
  {
    id: 'LEAD-102',
    name: 'Priya Nair',
    email: 'priya.nair@infosys.com',
    phone: '+91 97112 54321',
    company: 'Infosys Global Services',
    source: 'Partner Referral',
    status: 'Proposal',
    owner: 'Sayyed Furkhan',
    value: 820000,
    createdAt: '2026-10-26 14:15',
    notes: ['Requested custom SLA and data residency in Mumbai.'],
    activities: ['Proposal PDF dispatched via VoloSC Mail'],
  },
  {
    id: 'LEAD-103',
    name: 'Vikram Mehta',
    email: 'vikram.m@hdfcbank.com',
    phone: '+91 98220 99887',
    company: 'HDFC Digital Banking',
    source: 'Direct Sales',
    status: 'New',
    owner: 'Amit Patel',
    value: 1200000,
    createdAt: '2026-10-27 09:00',
    notes: ['Requires ISO 27001 and SOC 2 Type II audit packages.'],
    activities: ['Lead captured via API Gateway'],
  },
];

export const INITIAL_CONTACTS: Contact[] = [
  { id: 'CNT-01', name: 'Rajesh Sharma', email: 'r.sharma@tata.com', phone: '+91 98201 12345', jobTitle: 'VP Cloud Operations', company: 'Tata Consultancy Services', owner: 'Sayyed Furkhan' },
  { id: 'CNT-02', name: 'Priya Nair', email: 'priya.nair@infosys.com', phone: '+91 97112 54321', jobTitle: 'Head of Procurement', company: 'Infosys Global Services', owner: 'Sayyed Furkhan' },
  { id: 'CNT-03', name: 'Ananya Roy', email: 'a.roy@wipro.com', phone: '+91 99100 44332', jobTitle: 'Chief Digital Officer', company: 'Wipro Limited', owner: 'Sayyed Furkhan' },
];

export const INITIAL_ACCOUNTS: Account[] = [
  { id: 'ACC-01', companyName: 'Tata Consultancy Services', industry: 'Information Technology', website: 'https://tcs.com', address: 'Mumbai, Maharashtra', revenue: '₹18,000 Cr', owner: 'Sayyed Furkhan' },
  { id: 'ACC-02', companyName: 'Infosys Global Services', industry: 'Cloud & Software', website: 'https://infosys.com', address: 'Bengaluru, Karnataka', revenue: '₹14,500 Cr', owner: 'Sayyed Furkhan' },
  { id: 'ACC-03', companyName: 'HDFC Digital Banking', industry: 'Financial Services', website: 'https://hdfcbank.com', address: 'Mumbai, Maharashtra', revenue: '₹32,000 Cr', owner: 'Amit Patel' },
];

export const INITIAL_DEALS: Deal[] = [
  { id: 'DEAL-301', dealName: 'TCS - 150 User VoloSC Business Suite', value: 358200, stage: 'Qualified', probability: 70, closingDate: '2026-11-15', accountName: 'Tata Consultancy Services', owner: 'Sayyed Furkhan' },
  { id: 'DEAL-302', dealName: 'Infosys - AI Studio & Automation Engine', value: 820000, stage: 'Proposal', probability: 85, closingDate: '2026-11-30', accountName: 'Infosys Global Services', owner: 'Sayyed Furkhan' },
  { id: 'DEAL-303', dealName: 'HDFC - Security Center & Zero Trust MDM', value: 1200000, stage: 'Negotiation', probability: 90, closingDate: '2026-12-10', accountName: 'HDFC Digital Banking', owner: 'Sayyed Furkhan' },
  { id: 'DEAL-304', dealName: 'Wipro - Cloud Database & Hypervisor Slices', value: 450000, stage: 'Closed Won', probability: 100, closingDate: '2026-10-20', accountName: 'Wipro Limited', owner: 'Sayyed Furkhan' },
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2026-001',
    invoiceNumber: 'INV-2026-001',
    customerName: 'Wipro Limited',
    customerEmail: 'billing@wipro.com',
    items: [
      { description: 'VoloSC Business Standard License (Annual)', quantity: 50, unitPrice: 1760, discount: 10, taxRate: 18 },
      { description: 'Dedicated NVMe Cloud Server Instance', quantity: 2, unitPrice: 18500, discount: 0, taxRate: 18 },
    ],
    subtotal: 116200,
    taxTotal: 20916,
    grandTotal: 137116,
    dueDate: '2026-11-10',
    status: 'Paid',
    createdAt: '2026-10-20',
    paymentId: 'PAY-UPI-8862059500-1',
  },
  {
    id: 'INV-2026-002',
    invoiceNumber: 'INV-2026-002',
    customerName: 'Tata Consultancy Services',
    customerEmail: 'r.sharma@tata.com',
    items: [
      { description: 'VoloSC Enterprise Suite / All-in-One', quantity: 25, unitPrice: 3150, discount: 10, taxRate: 18 },
    ],
    subtotal: 70875,
    taxTotal: 12757,
    grandTotal: 83632,
    dueDate: '2026-11-25',
    status: 'Sent',
    createdAt: '2026-10-26',
  },
];

export const INITIAL_PRODUCTS: InventoryProduct[] = [
  { id: 'PRD-01', sku: 'SKU-SRV-NVME', name: 'VoloSC Cloud Compute Node (16 vCPU / 64GB)', category: 'Cloud Infrastructure', price: 24500, cost: 14000, stockQty: 48, minAlertQty: 10, warehouse: 'Mumbai DC-01', barcode: '890123450001' },
  { id: 'PRD-02', sku: 'SKU-LIC-STD', name: 'VoloSC Business Standard Annual Token Card', category: 'Software Licenses', price: 21120, cost: 8000, stockQty: 950, minAlertQty: 50, warehouse: 'Digital Vault', barcode: '890123450002' },
  { id: 'PRD-03', sku: 'SKU-LIC-ENT', name: 'VoloSC Enterprise Suite Perpetual Core Pack', category: 'Software Licenses', price: 37800, cost: 12000, stockQty: 180, minAlertQty: 25, warehouse: 'Digital Vault', barcode: '890123450003' },
  { id: 'PRD-04', sku: 'SKU-HW-RACK', name: 'Edge Gateway IoT Hub v2026', category: 'Hardware Appliances', price: 42000, cost: 28000, stockQty: 8, minAlertQty: 15, warehouse: 'Delhi Logistics Hub', barcode: '890123450004' },
];

export const INITIAL_EMPLOYEES: Employee[] = [
  { id: 'EMP-001', name: 'Sayyed Furkhan', email: 'sayyedfurkhan38@gmail.com', department: 'Executive Leadership', role: 'Chief Executive & Architect', joiningDate: '2024-01-01', salary: 250000, status: 'Active' },
  { id: 'EMP-002', name: 'Aarav Deshmukh', email: 'aarav.d@volocs.internal', department: 'Cloud Infrastructure', role: 'Lead DevOps Engineer', joiningDate: '2024-06-15', salary: 140000, status: 'Active' },
  { id: 'EMP-003', name: 'Sneha Kulkarni', email: 'sneha.k@volocs.internal', department: 'Enterprise Sales', role: 'Senior Account Executive', joiningDate: '2025-02-01', salary: 110000, status: 'Active' },
  { id: 'EMP-004', name: 'Tanmay Joshi', email: 'tanmay.j@volocs.internal', department: 'Customer Success', role: 'Support Lead', joiningDate: '2025-05-10', salary: 85000, status: 'Active' },
];

export const INITIAL_TICKETS: SupportTicket[] = [
  { id: 'TCK-501', subject: 'Custom domain SSL renewal auto-provisioning', customerName: 'Reliance Retail', priority: 'High', status: 'In Progress', assignedAgent: 'Tanmay Joshi', createdAt: '2026-10-27 08:30', slaTarget: '2 hours remaining' },
  { id: 'TCK-502', subject: 'Invoice PDF download watermark update request', customerName: 'Tata Consultancy Services', priority: 'Medium', status: 'Open', assignedAgent: 'Tanmay Joshi', createdAt: '2026-10-27 10:15', slaTarget: '4 hours remaining' },
  { id: 'TCK-503', subject: 'UPI webhook callback reconciliation delay', customerName: 'Wipro Limited', priority: 'Critical', status: 'Resolved', assignedAgent: 'Aarav Deshmukh', createdAt: '2026-10-26 16:20', slaTarget: 'Resolved within SLA' },
];

export const INITIAL_PROJECT_TASKS: ProjectTask[] = [
  { id: 'TSK-1', title: 'Complete Zoho & Salesforce workflow benchmark integration', assignee: 'Sayyed Furkhan', priority: 'Urgent', dueDate: '2026-10-28', status: 'In Progress', projectId: 'PRJ-VOLOCS-CORE', loggedHours: 14 },
  { id: 'TSK-2', title: 'Connect CRM Lead-to-Deal-to-Invoice automatic pipeline', assignee: 'Sayyed Furkhan', priority: 'Urgent', dueDate: '2026-10-29', status: 'Completed', projectId: 'PRJ-VOLOCS-CORE', loggedHours: 8 },
  { id: 'TSK-3', title: 'Deploy PhonePe UPI QR automated reconciliation engine', assignee: 'Aarav Deshmukh', priority: 'Urgent', dueDate: '2026-10-30', status: 'Completed', projectId: 'PRJ-VOLOCS-CORE', loggedHours: 6 },
  { id: 'TSK-4', title: 'Verify ISO 27001 data isolation between tenant organizations', assignee: 'Aarav Deshmukh', priority: 'Normal', dueDate: '2026-11-05', status: 'Todo', projectId: 'PRJ-VOLOCS-SECURITY', loggedHours: 0 },
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'AUD-01', user: 'Sayyed Furkhan', action: 'Lead Converted', entity: 'LEAD-101 (TCS)', timestamp: '2026-10-27 10:45', details: 'Generated Account ACC-01 & Deal DEAL-301' },
  { id: 'AUD-02', user: 'Billing Automation', action: 'Payment Verified', entity: 'INV-2026-001 (₹1,37,116)', timestamp: '2026-10-26 15:30', details: 'UPI VPA 8862059500@ybl confirmed via Bank of India gateway' },
  { id: 'AUD-03', user: 'Sayyed Furkhan', action: 'Price Model Updated', entity: 'All Subscription Tiers', timestamp: '2026-10-26 12:00', details: 'Applied 10% Off and configured multi-currency billing (INR, USD, EUR, GBP, AED)' },
];

export const INITIAL_WORKFLOWS: WorkflowRule[] = [
  { id: 'WF-01', name: 'When Deal is Won → Auto-generate Books Invoice & Deduct Inventory', trigger: 'Deal Stage = Closed Won', action: 'Create Invoice & Dispatch Stock Movement', status: 'Active', executionCount: 142 },
  { id: 'WF-02', name: 'When UPI Payment Received → Activate Plan & Send Welcome Mail', trigger: 'Payment Status = Verified', action: 'Issue License Key + Send Confirmation', status: 'Active', executionCount: 89 },
  { id: 'WF-03', name: 'When Inventory Stock < Min Alert → Create Purchase Order Draft', trigger: 'Product Stock < Alert Threshold', action: 'Notify Procurement Lead', status: 'Active', executionCount: 34 },
];
