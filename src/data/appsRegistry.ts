// VoloSC Cloud Operating System - Enterprise 72 Apps Master Registry
// Built with complete database schemas, audit fields, custom menus, action buttons, and live sample records

export interface SchemaField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select' | 'date' | 'currency' | 'status';
  options?: string[];
  required?: boolean;
}

export interface StandardAuditFields {
  id: string;
  organization_id: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  owner_id: string;
  status: string;
  deleted_at: string | null;
}

export type VoloRecord = StandardAuditFields & Record<string, any>;

export interface VoloAppDefinition {
  id: string;
  appNumber: number;
  name: string;
  category: 'Sales & CRM' | 'Marketing' | 'Commerce & Customer Service' | 'Finance' | 'Education & Collaboration' | 'HR';
  tagline: string;
  iconName: string;
  menus: string[];
  buttons: string[];
  functions: string;
  schemaFields: SchemaField[];
  kpis: { label: string; value: string; change: string; isPositive: boolean }[];
  initialRecords: VoloRecord[];
}

const DEFAULT_ORG = 'org_volo_global_01';
const DEFAULT_USER = 'admin@volosc.com';
const TODAY = '2025-05-18T10:30:00Z';

export const VOLO_72_APPS: VoloAppDefinition[] = [
  // ==========================================
  // 1. Sales & CRM Applications (Apps 1 - 21)
  // ==========================================
  {
    id: 'volosc-crm',
    appNumber: 1,
    name: 'VoloSC CRM',
    category: 'Sales & CRM',
    tagline: 'Complete 360° customer relationship management & pipeline forecasting',
    iconName: 'Building2',
    menus: ['Dashboard', 'All Records', 'Leads', 'Contacts', 'Accounts', 'Deals', 'Activities', 'Products', 'Quotes', 'Reports', 'Settings'],
    buttons: ['Add', 'Edit', 'Delete', 'Search', 'Filter', 'Import', 'Export', 'Assign', 'Convert Lead', 'Create Deal'],
    functions: 'Customer management, sales tracking, follow-ups, pipeline aur forecasting.',
    schemaFields: [
      { key: 'customer_id', label: 'Customer ID', type: 'text', required: true },
      { key: 'lead_id', label: 'Lead ID', type: 'text' },
      { key: 'name', label: 'Contact Name', type: 'text', required: true },
      { key: 'company', label: 'Company', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'email', required: true },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'deal_value', label: 'Deal Value ($)', type: 'currency', required: true },
      { key: 'stage', label: 'Stage', type: 'select', options: ['Qualification', 'Needs Analysis', 'Proposal/Quote', 'Negotiation', 'Closed Won', 'Closed Lost'] },
      { key: 'owner', label: 'Account Owner', type: 'text', required: true },
      { key: 'activity_history', label: 'Latest Activity', type: 'text' }
    ],
    kpis: [
      { label: 'Total Active Leads', value: '1,428', change: '+14.2%', isPositive: true },
      { label: 'Pipeline Deals Value', value: '$4.28M', change: '+22.5%', isPositive: true },
      { label: 'Conversion Rate', value: '28.4%', change: '+3.1%', isPositive: true },
      { label: 'Avg Deal Velocity', value: '18 Days', change: '-4 Days', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-CRM-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Active',
        deleted_at: null,
        customer_id: 'CUST-7001',
        lead_id: 'LEAD-101',
        name: 'Alex Mercer',
        company: 'Starlight Global Technologies',
        email: 'a.mercer@starlight.io',
        phone: '+1 415 892 4110',
        deal_value: 245000,
        stage: 'Proposal/Quote',
        owner: 'Sarah Chen',
        activity_history: 'Product demo presentation completed with VP of Eng.'
      },
      {
        id: 'REC-CRM-002',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_marcus_vance',
        status: 'Active',
        deleted_at: null,
        customer_id: 'CUST-7002',
        lead_id: 'LEAD-102',
        name: 'Elena Rostova',
        company: 'Hyperion Logistics Cloud',
        email: 'elena@hyperioncloud.com',
        phone: '+44 20 7946 0912',
        deal_value: 120000,
        stage: 'Negotiation',
        owner: 'Marcus Vance',
        activity_history: 'MSA sent for enterprise security compliance review.'
      },
      {
        id: 'REC-CRM-003',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Closed Won',
        deleted_at: null,
        customer_id: 'CUST-7003',
        lead_id: 'LEAD-103',
        name: 'David Patel',
        company: 'Apex BioResearch Labs',
        email: 'd.patel@apexbio.org',
        phone: '+1 650 334 1928',
        deal_value: 380000,
        stage: 'Closed Won',
        owner: 'Sarah Chen',
        activity_history: 'Contract signed; migrated to Commerce & Invoicing.'
      }
    ]
  },
  {
    id: 'volosc-bigin',
    appNumber: 2,
    name: 'VoloSC Bigin',
    category: 'Sales & CRM',
    tagline: 'Streamlined pipeline-centric CRM tailored for high-speed small & growing teams',
    iconName: 'Sparkles',
    menus: ['Dashboard', 'All Records', 'Pipelines', 'Contacts', 'Companies', 'Activities', 'Products', 'Reports', 'Settings'],
    buttons: ['Add Contact', 'Create Deal', 'Move Stage', 'Schedule Call', 'Add Note', 'Filter', 'Export'],
    functions: 'Small businesses ke liye simplified CRM, visual stages aur follow-ups.',
    schemaFields: [
      { key: 'contact_id', label: 'Contact ID', type: 'text', required: true },
      { key: 'company_id', label: 'Company ID', type: 'text', required: true },
      { key: 'deal_id', label: 'Deal ID', type: 'text' },
      { key: 'pipeline_stage', label: 'Pipeline Stage', type: 'select', options: ['Inbox', 'Contact Made', 'Meeting Scheduled', 'Proposal Sent', 'Won'] },
      { key: 'amount', label: 'Amount ($)', type: 'currency', required: true },
      { key: 'follow_up_date', label: 'Follow-up Date', type: 'date', required: true }
    ],
    kpis: [
      { label: 'Active Deals', value: '42', change: '+8%', isPositive: true },
      { label: 'Pipeline Total', value: '$340,000', change: '+15%', isPositive: true },
      { label: 'Follow-ups Today', value: '11', change: 'On Track', isPositive: true },
      { label: 'Win Rate', value: '38%', change: '+4%', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-BGN-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_jordan_lee',
        status: 'Active',
        deleted_at: null,
        contact_id: 'CNT-901',
        company_id: 'CMP-401',
        deal_id: 'DEAL-BGN-01',
        pipeline_stage: 'Meeting Scheduled',
        amount: 28000,
        follow_up_date: '2025-05-20'
      }
    ]
  },
  {
    id: 'volosc-leads',
    appNumber: 3,
    name: 'VoloSC Leads',
    category: 'Sales & CRM',
    tagline: 'High-volume lead acquisition, intent scoring & instant qualification routing',
    iconName: 'UserCheck',
    menus: ['Dashboard', 'All Records', 'All Leads', 'My Leads', 'Unassigned', 'Qualified', 'Unqualified', 'Reports', 'Settings'],
    buttons: ['Add Lead', 'Assign', 'Qualify', 'Convert', 'Merge Duplicate', 'Export', 'Bulk Update'],
    functions: 'Potential customers capture aur qualify karna, lead score engine ke saath.',
    schemaFields: [
      { key: 'lead_id', label: 'Lead ID', type: 'text', required: true },
      { key: 'name', label: 'Full Name', type: 'text', required: true },
      { key: 'email', label: 'Email Address', type: 'email', required: true },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'source', label: 'Source', type: 'select', options: ['Google Ads', 'Organic Search', 'Webinar', 'LinkedIn', 'Referral', 'Trade Show'] },
      { key: 'score', label: 'Lead Score', type: 'number', required: true },
      { key: 'owner', label: 'Assigned Specialist', type: 'text' }
    ],
    kpis: [
      { label: 'New Leads Today', value: '84', change: '+19%', isPositive: true },
      { label: 'Avg Lead Score', value: '78 / 100', change: '+5', isPositive: true },
      { label: 'Qualification Rate', value: '44.8%', change: '+2.4%', isPositive: true },
      { label: 'Unassigned Queue', value: '6', change: '-12', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-LED-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Qualified',
        deleted_at: null,
        lead_id: 'LEAD-901',
        name: 'Carlos Mendoza',
        email: 'c.mendoza@solarsolutions.co',
        phone: '+1 305 555 0192',
        source: 'LinkedIn',
        score: 92,
        owner: 'Sarah Chen'
      }
    ]
  },
  {
    id: 'volosc-contacts',
    appNumber: 4,
    name: 'VoloSC Contacts',
    category: 'Sales & CRM',
    tagline: 'Enterprise directory, interaction chronology & communication intelligence',
    iconName: 'Users',
    menus: ['Dashboard', 'All Records', 'All Contacts', 'My Contacts', 'Tags', 'Recently Added', 'Import', 'Export', 'Settings'],
    buttons: ['Add Contact', 'Edit', 'Call', 'Email', 'Add Note', 'Link Company', 'Delete'],
    functions: 'Customer contact details aur communication history manage karna.',
    schemaFields: [
      { key: 'contact_id', label: 'Contact ID', type: 'text', required: true },
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'email', required: true },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'job_title', label: 'Job Title', type: 'text', required: true },
      { key: 'company_id', label: 'Company / Org ID', type: 'text', required: true },
      { key: 'address', label: 'Office Address', type: 'text' }
    ],
    kpis: [
      { label: 'Total Contacts', value: '18,420', change: '+320 this mo', isPositive: true },
      { label: 'Enriched Profiles', value: '96.2%', change: '+1.5%', isPositive: true },
      { label: 'Active Interactions', value: '1,204', change: '+18%', isPositive: true },
      { label: 'Bounce Rate', value: '0.4%', change: 'Low', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-CNT-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_marcus_vance',
        status: 'Active',
        deleted_at: null,
        contact_id: 'CNT-801',
        name: 'Rachel Sterling',
        email: 'rchel@sterlingfinancial.com',
        phone: '+1 212 901 8400',
        job_title: 'Chief Technology Officer',
        company_id: 'CMP-801',
        address: '55 Hudson Yards, New York, NY'
      }
    ]
  },
  {
    id: 'volosc-deals',
    appNumber: 5,
    name: 'VoloSC Deals',
    category: 'Sales & CRM',
    tagline: 'Multi-stage opportunity manager, weighted probability forecasting & win analytics',
    iconName: 'BadgeDollarSign',
    menus: ['Dashboard', 'All Records', 'Pipeline', 'All Deals', 'Won Deals', 'Lost Deals', 'Forecast', 'Reports', 'Settings'],
    buttons: ['Create Deal', 'Change Stage', 'Add Product', 'Mark Won', 'Mark Lost', 'Filter', 'Export'],
    functions: 'Sales opportunities ko track karna, probability aur expected revenue ke saath.',
    schemaFields: [
      { key: 'deal_id', label: 'Deal ID', type: 'text', required: true },
      { key: 'customer_id', label: 'Customer ID', type: 'text', required: true },
      { key: 'deal_name', label: 'Deal Name', type: 'text', required: true },
      { key: 'value', label: 'Deal Value ($)', type: 'currency', required: true },
      { key: 'probability', label: 'Probability (%)', type: 'number', required: true },
      { key: 'stage', label: 'Stage', type: 'select', options: ['Discovery', 'Demo', 'Proposal', 'Contract Negotiation', 'Closed Won', 'Closed Lost'] },
      { key: 'closing_date', label: 'Target Close Date', type: 'date', required: true },
      { key: 'lost_reason', label: 'Lost Reason (if applicable)', type: 'text' }
    ],
    kpis: [
      { label: 'Total Open Pipeline', value: '$8,450,000', change: '+24%', isPositive: true },
      { label: 'Weighted Forecast', value: '$5,915,000', change: '+18%', isPositive: true },
      { label: 'Closed Won Q2', value: '$3,180,000', change: '+35%', isPositive: true },
      { label: 'Avg Deal Size', value: '$145,000', change: '+12%', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-DEA-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Active',
        deleted_at: null,
        deal_id: 'DEAL-4001',
        customer_id: 'CUST-7001',
        deal_name: 'Starlight Global Enterprise Suite Deployment',
        value: 245000,
        probability: 80,
        stage: 'Proposal',
        closing_date: '2025-06-30',
        lost_reason: ''
      }
    ]
  },
  {
    id: 'volosc-salesiq',
    appNumber: 6,
    name: 'VoloSC SalesIQ',
    category: 'Sales & CRM',
    tagline: 'Live visitor intent tracking, real-time proactive chat & AI routing bot',
    iconName: 'MessageSquareCode',
    menus: ['Dashboard', 'All Records', 'Live Visitors', 'Chats', 'Operators', 'Departments', 'Bots', 'Reports', 'Settings'],
    buttons: ['Start Chat', 'Assign Operator', 'Transfer Chat', 'End Chat', 'Block Visitor', 'Export Logs'],
    functions: 'Website visitors ke saath live chat aur engagement analytics.',
    schemaFields: [
      { key: 'visitor_id', label: 'Visitor ID', type: 'text', required: true },
      { key: 'page_url', label: 'Current Page URL', type: 'text', required: true },
      { key: 'chat_transcript', label: 'Chat Transcript Summary', type: 'text' },
      { key: 'operator_id', label: 'Assigned Operator ID', type: 'text' },
      { key: 'duration_seconds', label: 'Duration (sec)', type: 'number' },
      { key: 'location', label: 'Geo Location', type: 'text' }
    ],
    kpis: [
      { label: 'Active Live Visitors', value: '412', change: 'Real-time', isPositive: true },
      { label: 'Ongoing Chats', value: '28', change: '8 operators online', isPositive: true },
      { label: 'Avg Response Time', value: '14s', change: '-6s faster', isPositive: true },
      { label: 'Chat CSAT Score', value: '98.4%', change: '+1.2%', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SIQ-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_bot_01',
        status: 'Active',
        deleted_at: null,
        visitor_id: 'VIS-9021',
        page_url: 'https://volosc.com/pricing',
        chat_transcript: 'Visitor inquired about Enterprise SSO and HIPAA add-on.',
        operator_id: 'usr_jordan_lee',
        duration_seconds: 240,
        location: 'Frankfurt, DE'
      }
    ]
  },
  {
    id: 'volosc-salesinbox',
    appNumber: 7,
    name: 'VoloSC SalesInbox',
    category: 'Sales & CRM',
    tagline: 'Deal-organized email client unifying communication threads directly with CRM records',
    iconName: 'Inbox',
    menus: ['Dashboard', 'All Records', 'Inbox', 'Customers', 'Deals', 'Follow-ups', 'Sent', 'Settings'],
    buttons: ['Reply', 'Forward', 'Create Task', 'Link Deal', 'Add Note', 'Archive', 'Sync Mailbox'],
    functions: 'Customer emails ko sales records aur deal stages ke saath organize karna.',
    schemaFields: [
      { key: 'email_id', label: 'Email ID', type: 'text', required: true },
      { key: 'sender', label: 'From Email', type: 'email', required: true },
      { key: 'recipient', label: 'To Email', type: 'email', required: true },
      { key: 'subject', label: 'Subject', type: 'text', required: true },
      { key: 'thread_id', label: 'Thread ID', type: 'text', required: true },
      { key: 'contact_id', label: 'Linked Contact ID', type: 'text' },
      { key: 'deal_id', label: 'Linked Deal ID', type: 'text' }
    ],
    kpis: [
      { label: 'Connected Mailboxes', value: '48', change: '100% Synced', isPositive: true },
      { label: 'Pending Customer Emails', value: '14', change: '-8 resolved', isPositive: true },
      { label: 'Email Open Rate', value: '64.2%', change: '+4.8%', isPositive: true },
      { label: 'Linked Deal Revenue', value: '$6.8M', change: 'Active', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SIB-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Read',
        deleted_at: null,
        email_id: 'EML-7701',
        sender: 'a.mercer@starlight.io',
        recipient: 'sarah.chen@volosc.com',
        subject: 'Re: Enterprise Agreement review comments for VoloSC',
        thread_id: 'TH-9901',
        contact_id: 'CUST-7001',
        deal_id: 'DEAL-4001'
      }
    ]
  },
  {
    id: 'volosc-sales-forecast',
    appNumber: 8,
    name: 'VoloSC Sales Forecast',
    category: 'Sales & CRM',
    tagline: 'Predictive revenue forecasting, quota tracking and AI win/loss predictions',
    iconName: 'TrendingUp',
    menus: ['Dashboard', 'All Records', 'Targets', 'Team Forecast', 'Pipeline', 'History', 'Export', 'Settings'],
    buttons: ['Set Target', 'Generate Forecast', 'Adjust', 'Approve', 'Export', 'Model What-If'],
    functions: 'Expected sales aur revenue forecast calculate aur analyze karna.',
    schemaFields: [
      { key: 'employee_id', label: 'Employee / Rep ID', type: 'text', required: true },
      { key: 'period', label: 'Period', type: 'text', required: true },
      { key: 'target', label: 'Target Quota ($)', type: 'currency', required: true },
      { key: 'pipeline_value', label: 'Pipeline Value ($)', type: 'currency', required: true },
      { key: 'expected_revenue', label: 'Projected Expected ($)', type: 'currency', required: true },
      { key: 'achievement_pct', label: 'Achievement Projection (%)', type: 'number' }
    ],
    kpis: [
      { label: 'Q2 Overall Quota', value: '$12.0M', change: 'Target', isPositive: true },
      { label: 'AI Predicted Close', value: '$13.4M', change: '111.6%', isPositive: true },
      { label: 'Committed Deals', value: '$9.8M', change: 'High Confidence', isPositive: true },
      { label: 'Risk Variance', value: '-$320K', change: 'Low Risk', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SFC-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Active',
        deleted_at: null,
        employee_id: 'EMP-101',
        period: 'Q2 2025',
        target: 800000,
        pipeline_value: 1450000,
        expected_revenue: 920000,
        achievement_pct: 115
      }
    ]
  },
  {
    id: 'volosc-sales-commission',
    appNumber: 9,
    name: 'VoloSC Sales Commission',
    category: 'Sales & CRM',
    tagline: 'Automated commission tier calculations, SPIF management & payout approvals',
    iconName: 'Coins',
    menus: ['Dashboard', 'All Records', 'Commission Plans', 'Earnings', 'Payouts', 'Disputes', 'Reports', 'Settings'],
    buttons: ['Add Plan', 'Calculate Commission', 'Approve Payout', 'Export Payroll', 'Recalculate'],
    functions: 'Sales team ke incentive, quota attainment aur commission calculations automate karna.',
    schemaFields: [
      { key: 'employee_id', label: 'Employee ID', type: 'text', required: true },
      { key: 'plan_name', label: 'Plan Name', type: 'text', required: true },
      { key: 'base_commission_rate', label: 'Base Rate (%)', type: 'number', required: true },
      { key: 'earned_amount', label: 'Earned Amount ($)', type: 'currency', required: true },
      { key: 'payout_status', label: 'Payout Status', type: 'select', options: ['Accruing', 'Pending Approval', 'Approved', 'Paid'] }
    ],
    kpis: [
      { label: 'Total Commissions Accrued', value: '$342,800', change: 'Q2 YTD', isPositive: true },
      { label: 'Pending Approvals', value: '4 Plans', change: '$48,200', isPositive: true },
      { label: 'Top Earner Attainment', value: '184%', change: 'Sarah Chen', isPositive: true },
      { label: 'Average Commission Rate', value: '8.5%', change: 'Standard', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SCM-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Approved',
        deleted_at: null,
        employee_id: 'EMP-101',
        plan_name: 'Enterprise Growth Tier 1',
        base_commission_rate: 10,
        earned_amount: 38000,
        payout_status: 'Approved'
      }
    ]
  },
  {
    id: 'volosc-territory-management',
    appNumber: 10,
    name: 'VoloSC Territory Management',
    category: 'Sales & CRM',
    tagline: 'Geographic & account-based territory routing, quota mapping & conflict prevention',
    iconName: 'MapPin',
    menus: ['Dashboard', 'All Records', 'Territories', 'Assignments', 'Rules', 'Hierarchy', 'Reports', 'Settings'],
    buttons: ['Create Territory', 'Assign Rep', 'Rebalance', 'Simulate Boundary', 'Export Mapping'],
    functions: 'Territory mapping, regional quotas aur automated account assignments manage karna.',
    schemaFields: [
      { key: 'territory_id', label: 'Territory ID', type: 'text', required: true },
      { key: 'territory_name', label: 'Territory Name', type: 'text', required: true },
      { key: 'region', label: 'Region', type: 'select', options: ['North America East', 'North America West', 'EMEA Central', 'APAC South', 'LATAM'] },
      { key: 'assigned_lead', label: 'Territory Director', type: 'text', required: true },
      { key: 'target_quota', label: 'Target Quota ($)', type: 'currency', required: true }
    ],
    kpis: [
      { label: 'Active Territories', value: '18', change: 'Global', isPositive: true },
      { label: 'Assigned Accounts', value: '4,890', change: '99.4% Covered', isPositive: true },
      { label: 'Territory Balance Score', value: '94/100', change: '+3pts', isPositive: true },
      { label: 'Unassigned Conflicts', value: '0', change: 'Clean', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-TER-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_marcus_vance',
        status: 'Active',
        deleted_at: null,
        territory_id: 'TER-NA-WEST',
        territory_name: 'Pacific Enterprise Tech',
        region: 'North America West',
        assigned_lead: 'Marcus Vance',
        target_quota: 5000000
      }
    ]
  },
  {
    id: 'volosc-routeiq',
    appNumber: 11,
    name: 'VoloSC RouteIQ',
    category: 'Sales & CRM',
    tagline: 'Smart field sales route optimization, multi-stop GPS planning & check-in verification',
    iconName: 'Navigation',
    menus: ['Dashboard', 'All Records', 'Trip Planner', 'Today Route', 'Check-ins', 'Mileage Logs', 'Fleet Settings'],
    buttons: ['Optimize Route', 'Start Navigation', 'Check-in', 'Log Expense', 'Export Mileage'],
    functions: 'Field sales reps ke traveling routes optimize karna aur GPS check-ins verify karna.',
    schemaFields: [
      { key: 'route_id', label: 'Route ID', type: 'text', required: true },
      { key: 'rep_id', label: 'Sales Rep ID', type: 'text', required: true },
      { key: 'total_stops', label: 'Total Stops', type: 'number', required: true },
      { key: 'total_distance_km', label: 'Distance (KM)', type: 'number', required: true },
      { key: 'estimated_time', label: 'Est. Duration', type: 'text', required: true },
      { key: 'route_status', label: 'Status', type: 'select', options: ['Planned', 'In Progress', 'Completed'] }
    ],
    kpis: [
      { label: 'Fuel & Time Saved', value: '28.4%', change: 'Optimization Engine', isPositive: true },
      { label: 'Completed Visits', value: '142', change: 'Today', isPositive: true },
      { label: 'Avg Visit Duration', value: '45 mins', change: 'On schedule', isPositive: true },
      { label: 'Active Field Reps', value: '26', change: 'Live GPS', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-RTQ-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_field_01',
        status: 'In Progress',
        deleted_at: null,
        route_id: 'RT-2025-0518',
        rep_id: 'EMP-204',
        total_stops: 6,
        total_distance_km: 74.5,
        estimated_time: '4h 20m',
        route_status: 'In Progress'
      }
    ]
  },
  {
    id: 'volosc-sign',
    appNumber: 12,
    name: 'VoloSC Sign',
    category: 'Sales & CRM',
    tagline: 'Cryptographically secure e-signatures, legally binding contracts & audit trails',
    iconName: 'FileSignature',
    menus: ['Dashboard', 'All Records', 'In Signing', 'Completed', 'Templates', 'Declined', 'Audit Trails', 'Settings'],
    buttons: ['Send for Sign', 'Add Signers', 'Place Fields', 'Download Signed PDF', 'Void Document'],
    functions: 'Digital signatures, secure legal documents execution aur ESIGN/eIDAS compliance.',
    schemaFields: [
      { key: 'document_id', label: 'Document ID', type: 'text', required: true },
      { key: 'document_title', label: 'Document Title', type: 'text', required: true },
      { key: 'recipient_email', label: 'Signer Email', type: 'email', required: true },
      { key: 'signing_status', label: 'Signing Status', type: 'select', options: ['Draft', 'Sent', 'Viewed', 'Signed', 'Declined', 'Expired'] },
      { key: 'hash_sha256', label: 'Audit SHA-256 Hash', type: 'text' }
    ],
    kpis: [
      { label: 'Completed Documents', value: '3,840', change: '+290 this mo', isPositive: true },
      { label: 'Avg Turnaround Time', value: '3.4 Hours', change: '-45% faster', isPositive: true },
      { label: 'Legal Compliance', value: '100% Valid', change: 'ESIGN & eIDAS', isPositive: true },
      { label: 'Pending Signatures', value: '24', change: 'Active', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SGN-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Signed',
        deleted_at: null,
        document_id: 'DOC-MSA-8801',
        document_title: 'Enterprise Master Services Agreement - Apex Bio',
        recipient_email: 'd.patel@apexbio.org',
        signing_status: 'Signed',
        hash_sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      }
    ]
  },
  {
    id: 'volosc-voice',
    appNumber: 13,
    name: 'VoloSC Voice',
    category: 'Sales & CRM',
    tagline: 'Enterprise cloud telephony, interactive IVR, call recording & AI sentiment transcription',
    iconName: 'PhoneCall',
    menus: ['Dashboard', 'All Records', 'Live Dialpad', 'Call Logs', 'Recordings', 'IVR Flows', 'Numbers', 'Analytics'],
    buttons: ['Make Call', 'Transfer Call', 'Record Call', 'Generate AI Summary', 'Buy Phone Number'],
    functions: 'Inbound aur outbound telephony calls handle karna, automatic call logs aur transcriptions ke saath.',
    schemaFields: [
      { key: 'call_id', label: 'Call ID', type: 'text', required: true },
      { key: 'phone_number', label: 'Phone Number', type: 'text', required: true },
      { key: 'direction', label: 'Direction', type: 'select', options: ['Inbound', 'Outbound'] },
      { key: 'duration_seconds', label: 'Duration (sec)', type: 'number', required: true },
      { key: 'recording_url', label: 'Recording Storage Link', type: 'text' },
      { key: 'sentiment', label: 'AI Sentiment', type: 'select', options: ['Positive', 'Neutral', 'Escalation'] }
    ],
    kpis: [
      { label: 'Total Calls Today', value: '1,240', change: '+12%', isPositive: true },
      { label: 'First Call Resolution', value: '88.5%', change: '+3.2%', isPositive: true },
      { label: 'Avg Call Handle Time', value: '3m 12s', change: '-18s', isPositive: true },
      { label: 'Positive Sentiment', value: '92.1%', change: 'High', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-VOI-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_jordan_lee',
        status: 'Completed',
        deleted_at: null,
        call_id: 'CALL-2025-901',
        phone_number: '+1 415 892 4110',
        direction: 'Outbound',
        duration_seconds: 410,
        recording_url: 's3://volo-voice/calls/CALL-2025-901.wav',
        sentiment: 'Positive'
      }
    ]
  },
  {
    id: 'volosc-forms',
    appNumber: 14,
    name: 'VoloSC Forms',
    category: 'Sales & CRM',
    tagline: 'Drag-and-drop form builder, conditional branching logic & instant CRM record insertion',
    iconName: 'ClipboardList',
    menus: ['Dashboard', 'All Records', 'My Forms', 'Submissions', 'Form Analytics', 'Webhooks', 'Integrations'],
    buttons: ['Create Form', 'Share Link', 'Embed Code', 'Export CSV', 'Setup Webhook'],
    functions: 'Online data capture forms create karna aur responses ko automatic CRM me map karna.',
    schemaFields: [
      { key: 'form_id', label: 'Form ID', type: 'text', required: true },
      { key: 'form_title', label: 'Form Title', type: 'text', required: true },
      { key: 'total_submissions', label: 'Submissions', type: 'number', required: true },
      { key: 'conversion_pct', label: 'Conversion (%)', type: 'number', required: true },
      { key: 'target_crm_module', label: 'Target CRM Module', type: 'text', required: true }
    ],
    kpis: [
      { label: 'Live Active Forms', value: '32', change: 'Online', isPositive: true },
      { label: 'Submissions This Week', value: '2,940', change: '+28%', isPositive: true },
      { label: 'Avg Completion Rate', value: '74.2%', change: '+5.1%', isPositive: true },
      { label: 'CRM Sync Latency', value: '< 200ms', change: 'Instant', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-FRM-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_marketing_01',
        status: 'Active',
        deleted_at: null,
        form_id: 'FORM-REQ-DEMO',
        form_title: 'Enterprise Demo Request Form 2025',
        total_submissions: 1420,
        conversion_pct: 68,
        target_crm_module: 'VoloSC Leads'
      }
    ]
  },
  {
    id: 'volosc-bookings',
    appNumber: 15,
    name: 'VoloSC Bookings',
    category: 'Sales & CRM',
    tagline: 'Multi-staff appointment scheduling, automated calendar sync & automated reminders',
    iconName: 'CalendarCheck',
    menus: ['Dashboard', 'All Records', 'Upcoming Appointments', 'Staff Calendars', 'Services', 'Availability Rules', 'Settings'],
    buttons: ['Book Slot', 'Reschedule', 'Cancel Booking', 'Send Reminder SMS', 'Export Calendar'],
    functions: 'Clients ke appointments schedule aur sync karna across Google Calendar, Outlook aur VoloSC Calendar.',
    schemaFields: [
      { key: 'booking_id', label: 'Booking ID', type: 'text', required: true },
      { key: 'customer_name', label: 'Customer Name', type: 'text', required: true },
      { key: 'customer_email', label: 'Customer Email', type: 'email', required: true },
      { key: 'service_name', label: 'Service / Event', type: 'text', required: true },
      { key: 'assigned_staff', label: 'Staff Member', type: 'text', required: true },
      { key: 'booking_time', label: 'Booking Timestamp', type: 'date', required: true }
    ],
    kpis: [
      { label: 'Booked This Month', value: '890', change: '+14%', isPositive: true },
      { label: 'No-Show Rate', value: '2.1%', change: '-3.8% (Reminders)', isPositive: true },
      { label: 'Customer Satisfaction', value: '99.1%', change: 'Excellent', isPositive: true },
      { label: 'Available Slots', value: '140', change: 'Live Calendar', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-BKG-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Confirmed',
        deleted_at: null,
        booking_id: 'BKG-2025-101',
        customer_name: 'Alex Mercer',
        customer_email: 'a.mercer@starlight.io',
        service_name: 'Architectural Blueprint Deep-Dive (60m)',
        assigned_staff: 'Sarah Chen',
        booking_time: '2025-05-19T15:00:00Z'
      }
    ]
  },
  {
    id: 'volosc-trainercentral',
    appNumber: 16,
    name: 'VoloSC TrainerCentral',
    category: 'Sales & CRM',
    tagline: 'Course creation, student enrollment, interactive virtual classrooms & certifications',
    iconName: 'GraduationCap',
    menus: ['Dashboard', 'All Records', 'Courses', 'Learners', 'Live Classes', 'Assessments', 'Certificates', 'Revenue'],
    buttons: ['Create Course', 'Enroll Learner', 'Publish Lesson', 'Issue Certificate', 'Host Class'],
    functions: 'Training academies aur live workshop portals run karna monetization ke sath.',
    schemaFields: [
      { key: 'course_id', label: 'Course ID', type: 'text', required: true },
      { key: 'title', label: 'Course Title', type: 'text', required: true },
      { key: 'instructor', label: 'Lead Instructor', type: 'text', required: true },
      { key: 'total_students', label: 'Enrolled Students', type: 'number', required: true },
      { key: 'price', label: 'Course Fee ($)', type: 'currency', required: true },
      { key: 'rating', label: 'Avg Rating', type: 'number' }
    ],
    kpis: [
      { label: 'Active Students', value: '5,420', change: '+410 this term', isPositive: true },
      { label: 'Published Courses', value: '46', change: 'Enterprise LMS', isPositive: true },
      { label: 'Completion Rate', value: '83.4%', change: '+6.2%', isPositive: true },
      { label: 'Course Revenue', value: '$284,500', change: '+28%', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-TRC-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_edu_01',
        status: 'Published',
        deleted_at: null,
        course_id: 'CRS-CLOUD-101',
        title: 'Mastering VoloSC Enterprise Cloud Architecture',
        instructor: 'Dr. Evelyn Ward',
        total_students: 1240,
        price: 499,
        rating: 4.9
      }
    ]
  },
  {
    id: 'volosc-pos',
    appNumber: 17,
    name: 'VoloSC POS',
    category: 'Sales & CRM',
    tagline: 'Retail point of sale, barcode hardware scanning, multi-register cash and split payments',
    iconName: 'Store',
    menus: ['Dashboard', 'All Records', 'Active Register', 'Transactions', 'Daily Closing', 'Receipts', 'Hardware Devices'],
    buttons: ['New Sale', 'Scan Barcode', 'Hold Bill', 'Apply Coupon', 'Print Receipt', 'Close Register'],
    functions: 'Retail aur brick-and-mortar storefronts ke live sales aur cashier checkout operations.',
    schemaFields: [
      { key: 'transaction_id', label: 'Transaction ID', type: 'text', required: true },
      { key: 'register_id', label: 'Register / Till ID', type: 'text', required: true },
      { key: 'cashier_name', label: 'Cashier Name', type: 'text', required: true },
      { key: 'items_count', label: 'Items Sold', type: 'number', required: true },
      { key: 'total_amount', label: 'Total Paid ($)', type: 'currency', required: true },
      { key: 'payment_method', label: 'Payment Method', type: 'select', options: ['Credit Card', 'Cash', 'UPI / QR', 'Split', 'Store Credit'] }
    ],
    kpis: [
      { label: 'Today In-Store Sales', value: '$41,290', change: '+18.4%', isPositive: true },
      { label: 'Transactions Processed', value: '624', change: 'Avg 48s checkout', isPositive: true },
      { label: 'Average Basket Size', value: '$66.20', change: '+4.1%', isPositive: true },
      { label: 'Register Balance Diff', value: '$0.00', change: '100% Balanced', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-POS-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_cashier_01',
        status: 'Completed',
        deleted_at: null,
        transaction_id: 'TXN-POS-4401',
        register_id: 'REG-SF-FLAGSHIP-01',
        cashier_name: 'Liam Foster',
        items_count: 4,
        total_amount: 320.50,
        payment_method: 'Credit Card'
      }
    ]
  },
  {
    id: 'volosc-thrive',
    appNumber: 18,
    name: 'VoloSC Thrive',
    category: 'Sales & CRM',
    tagline: 'Customer loyalty rewards, tiered cashback points, affiliate referral campaigns',
    iconName: 'Award',
    menus: ['Dashboard', 'All Records', 'Loyalty Members', 'Rewards Catalog', 'Point Balances', 'Referral Links', 'Settings'],
    buttons: ['Issue Points', 'Redeem Reward', 'Tier Upgrade', 'Add Campaign', 'Export Balances'],
    functions: 'Customer retention, loyalty points engine aur affiliate partner incentives run karna.',
    schemaFields: [
      { key: 'member_id', label: 'Member ID', type: 'text', required: true },
      { key: 'customer_name', label: 'Customer Name', type: 'text', required: true },
      { key: 'tier', label: 'Loyalty Tier', type: 'select', options: ['Silver', 'Gold', 'Platinum', 'Black Diamond'] },
      { key: 'points_balance', label: 'Points Balance', type: 'number', required: true },
      { key: 'lifetime_spend', label: 'Lifetime Spend ($)', type: 'currency', required: true }
    ],
    kpis: [
      { label: 'Active Loyalty Members', value: '28,940', change: '+1,240 this month', isPositive: true },
      { label: 'Points Redeemed', value: '1.4M Pts', change: '$72K value', isPositive: true },
      { label: 'Repeat Purchase Uplift', value: '+34.8%', change: 'Proven ROI', isPositive: true },
      { label: 'Top Tier Members', value: '1,890', change: 'Platinum+', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-THR-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_marketing_01',
        status: 'Active',
        deleted_at: null,
        member_id: 'MEM-THR-889',
        customer_name: 'Elena Rostova',
        tier: 'Platinum',
        points_balance: 14200,
        lifetime_spend: 18500
      }
    ]
  },
  {
    id: 'volosc-dap',
    appNumber: 19,
    name: 'VoloSC DAP',
    category: 'Sales & CRM',
    tagline: 'Digital Adoption Platform, interactive in-app user walkthroughs & product tours',
    iconName: 'Compass',
    menus: ['Dashboard', 'All Records', 'Active Tours', 'Feature Tooltips', 'User Analytics', 'Drop-off Funnels', 'Editor'],
    buttons: ['Create Walkthrough', 'Deploy Tooltip', 'A/B Test Tour', 'Preview Onboarding', 'Export Analytics'],
    functions: 'Software product onboarding, in-app guiding beacons aur employee feature adoption rate increase karna.',
    schemaFields: [
      { key: 'tour_id', label: 'Tour ID', type: 'text', required: true },
      { key: 'tour_name', label: 'Tour / Guide Name', type: 'text', required: true },
      { key: 'target_url', label: 'Target App URL', type: 'text', required: true },
      { key: 'steps_count', label: 'Total Steps', type: 'number', required: true },
      { key: 'completion_rate', label: 'Completion Rate (%)', type: 'number', required: true }
    ],
    kpis: [
      { label: 'Onboarding Completion', value: '89.2%', change: '+12.4%', isPositive: true },
      { label: 'Support Ticket Reduction', value: '-38%', change: 'Self-guided', isPositive: true },
      { label: 'Active Guides Deployed', value: '14', change: 'Multi-app', isPositive: true },
      { label: 'Engaged Users', value: '44,200', change: 'Past 30d', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-DAP-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_prod_01',
        status: 'Active',
        deleted_at: null,
        tour_id: 'TOUR-CRM-WELCOME',
        tour_name: 'First Deal Pipeline Setup Walkthrough',
        target_url: '/apps/volosc-crm',
        steps_count: 5,
        completion_rate: 91
      }
    ]
  },
  {
    id: 'volosc-commandcenter',
    appNumber: 20,
    name: 'VoloSC CommandCenter',
    category: 'Sales & CRM',
    tagline: 'Cross-department business process orchestration, state transitions & multi-app triggers',
    iconName: 'Cpu',
    menus: ['Dashboard', 'All Records', 'Active Blueprints', 'State Machines', 'Trigger Logs', 'Failed Transitions', 'Settings'],
    buttons: ['Create Blueprint', 'Simulate Flow', 'Deploy Rule', 'Retry Failed Step', 'Export Logic'],
    functions: 'Complex multi-system customer lifecycle journeys aur autonomous rules automate karna.',
    schemaFields: [
      { key: 'blueprint_id', label: 'Blueprint ID', type: 'text', required: true },
      { key: 'name', label: 'Journey Name', type: 'text', required: true },
      { key: 'trigger_event', label: 'Trigger Event', type: 'text', required: true },
      { key: 'connected_apps', label: 'Connected Apps Count', type: 'number', required: true },
      { key: 'executions_24h', label: 'Executions (24h)', type: 'number', required: true }
    ],
    kpis: [
      { label: 'Automated Journeys', value: '26 Active', change: 'Zero Downtime', isPositive: true },
      { label: 'Transitions Processed', value: '184,200', change: '99.98% Success', isPositive: true },
      { label: 'Hours Saved Monthly', value: '1,480 hrs', change: 'Autonomous', isPositive: true },
      { label: 'Average Execution Time', value: '84ms', change: 'Lightning Fast', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-CMD-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_architect_01',
        status: 'Active',
        deleted_at: null,
        blueprint_id: 'BP-CLOSED-WON-ECOSYSTEM',
        name: 'Deal Won -> Auto Create Inventory Allocation & Invoice',
        trigger_event: 'VoloSC Deals: Stage == Closed Won',
        connected_apps: 5,
        executions_24h: 312
      }
    ]
  },
  {
    id: 'volosc-touchpoint',
    appNumber: 21,
    name: 'VoloSC TouchPoint',
    category: 'Sales & CRM',
    tagline: 'Self-service customer portal, ticket updates, quotes acceptance & knowledge base',
    iconName: 'LayoutGrid',
    menus: ['Dashboard', 'All Records', 'Active Portals', 'Client Accounts', 'Shared Quotes', 'Portal Branding', 'Settings'],
    buttons: ['Invite Client', 'Grant Access', 'Publish Article', 'Revoke Access', 'View Audit'],
    functions: 'Customers ko unke bills, tickets aur quotes ke liye secure self-service access dena.',
    schemaFields: [
      { key: 'portal_user_id', label: 'Portal User ID', type: 'text', required: true },
      { key: 'client_company', label: 'Client Company', type: 'text', required: true },
      { key: 'contact_email', label: 'Client Email', type: 'email', required: true },
      { key: 'last_login', label: 'Last Login', type: 'date' },
      { key: 'role_access', label: 'Access Level', type: 'select', options: ['Billing Only', 'Support & Tickets', 'Full Enterprise Admin'] }
    ],
    kpis: [
      { label: 'Active Client Portals', value: '340', change: '+35 this quarter', isPositive: true },
      { label: 'Monthly Active Clients', value: '8,290', change: '+18%', isPositive: true },
      { label: 'Self-Serve Bill Payments', value: '78%', change: '+14%', isPositive: true },
      { label: 'Portal CSAT', value: '96.8%', change: 'Excellent', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-TP-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_admin',
        status: 'Active',
        deleted_at: null,
        portal_user_id: 'PORTAL-USR-101',
        client_company: 'Starlight Global Technologies',
        contact_email: 'a.mercer@starlight.io',
        last_login: '2025-05-18T09:15:00Z',
        role_access: 'Full Enterprise Admin'
      }
    ]
  },

  // ==========================================
  // 2. Marketing Applications (Apps 22 - 35)
  // ==========================================
  {
    id: 'volosc-campaigns',
    appNumber: 22,
    name: 'VoloSC Campaigns',
    category: 'Marketing',
    tagline: 'Omni-channel marketing campaigns, email automation, subscriber segmentations & A/B testing',
    iconName: 'Megaphone',
    menus: ['Dashboard', 'All Records', 'All Campaigns', 'Mailing Lists', 'Templates', 'A/B Tests', 'Reports', 'Settings'],
    buttons: ['Create Campaign', 'Send Test', 'Schedule Broadcast', 'Import Contacts', 'View Analytics'],
    functions: 'Email marketing campaigns run karna, automated drip sequences aur open-rate analytics track karna.',
    schemaFields: [
      { key: 'campaign_id', label: 'Campaign ID', type: 'text', required: true },
      { key: 'campaign_name', label: 'Campaign Name', type: 'text', required: true },
      { key: 'channel', label: 'Channel', type: 'select', options: ['Email', 'SMS', 'WhatsApp', 'Push Notification'] },
      { key: 'recipients_count', label: 'Audience Size', type: 'number', required: true },
      { key: 'open_rate_pct', label: 'Open Rate (%)', type: 'number' },
      { key: 'click_rate_pct', label: 'Click Rate (%)', type: 'number' }
    ],
    kpis: [
      { label: 'Emails Sent This Month', value: '1.85M', change: '+22%', isPositive: true },
      { label: 'Average Open Rate', value: '38.6%', change: '+5.2%', isPositive: true },
      { label: 'Click-Through Rate', value: '7.8%', change: '+1.4%', isPositive: true },
      { label: 'Direct Attributed Revenue', value: '$840,000', change: 'Q2', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-CMP-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_marketing_01',
        status: 'Sent',
        deleted_at: null,
        campaign_id: 'CMP-2025-Q2-LAUNCH',
        campaign_name: 'VoloSC Enterprise Cloud v4 Launch Newsletter',
        channel: 'Email',
        recipients_count: 48500,
        open_rate_pct: 42.1,
        click_rate_pct: 9.4
      }
    ]
  },
  {
    id: 'volosc-social',
    appNumber: 23,
    name: 'VoloSC Social',
    category: 'Marketing',
    tagline: 'Multi-network social media scheduler, brand listening, comment moderation & analytics',
    iconName: 'Share2',
    menus: ['Dashboard', 'All Records', 'Publishing Calendar', 'Listening & Mentions', 'Unified Inbox', 'Channels', 'Analytics'],
    buttons: ['New Post', 'Schedule Multi-Network', 'Respond', 'Approve Post', 'Export Social ROI'],
    functions: 'LinkedIn, Twitter/X, Instagram aur Facebook par ek sath posts schedule aur monitor karna.',
    schemaFields: [
      { key: 'post_id', label: 'Post ID', type: 'text', required: true },
      { key: 'network', label: 'Social Network', type: 'select', options: ['LinkedIn', 'Twitter/X', 'YouTube', 'Instagram', 'Facebook'] },
      { key: 'content_snippet', label: 'Post Content', type: 'text', required: true },
      { key: 'scheduled_time', label: 'Publish Time', type: 'date', required: true },
      { key: 'impressions', label: 'Impressions', type: 'number' },
      { key: 'engagement_rate', label: 'Engagement Rate (%)', type: 'number' }
    ],
    kpis: [
      { label: 'Total Social Audience', value: '240,000+', change: '+18.5%', isPositive: true },
      { label: 'Weekly Engagements', value: '34,800', change: '+29%', isPositive: true },
      { label: 'Brand Sentiment', value: '94% Positive', change: 'Strong', isPositive: true },
      { label: 'Scheduled Ahead', value: '42 Posts', change: '2 Weeks Out', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SOC-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_social_lead',
        status: 'Published',
        deleted_at: null,
        post_id: 'SOC-POST-902',
        network: 'LinkedIn',
        content_snippet: 'Proud to announce VoloSC is now SOC2 Type II and ISO 27001 Certified! #EnterpriseSecurity',
        scheduled_time: '2025-05-18T14:00:00Z',
        impressions: 48900,
        engagement_rate: 6.8
      }
    ]
  },
  {
    id: 'volosc-backstage',
    appNumber: 24,
    name: 'VoloSC Backstage',
    category: 'Marketing',
    tagline: 'End-to-end corporate event & conference management, badge printing, sponsors & agendas',
    iconName: 'Ticket',
    menus: ['Dashboard', 'All Records', 'Events', 'Ticket Sales', 'Speakers', 'Sponsors', 'Badges & Check-in', 'Reports'],
    buttons: ['Create Event', 'Sell Tickets', 'Add Speaker', 'Design Badge', 'Export Attendees'],
    functions: 'In-person aur hybrid business conferences organize karna, ticket sales aur ticketing desk ke sath.',
    schemaFields: [
      { key: 'event_id', label: 'Event ID', type: 'text', required: true },
      { key: 'event_title', label: 'Event Title', type: 'text', required: true },
      { key: 'venue', label: 'Venue / Location', type: 'text', required: true },
      { key: 'event_date', label: 'Event Date', type: 'date', required: true },
      { key: 'registered_count', label: 'Attendees Registered', type: 'number', required: true },
      { key: 'gross_tickets_usd', label: 'Gross Ticket Sales ($)', type: 'currency' }
    ],
    kpis: [
      { label: 'Annual Summits Hosted', value: '12 Events', change: 'Global', isPositive: true },
      { label: 'Total Registered Guests', value: '14,800', change: '+44%', isPositive: true },
      { label: 'Onsite Check-in Speed', value: '4 sec/badge', change: 'Instant QR', isPositive: true },
      { label: 'Sponsorship Revenue', value: '$680,000', change: 'Exceeded', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-BKS-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_events_01',
        status: 'Active',
        deleted_at: null,
        event_id: 'EVT-GLOBAL-SUMMIT-2025',
        event_title: 'VoloSC Global Enterprise Summit - San Francisco',
        venue: 'Moscone West Center, San Francisco, CA',
        event_date: '2025-09-15',
        registered_count: 3200,
        gross_tickets_usd: 480000
      }
    ]
  },
  {
    id: 'volosc-survey',
    appNumber: 25,
    name: 'VoloSC Survey',
    category: 'Marketing',
    tagline: 'Enterprise customer satisfaction surveys, NPS scoring, sentiment analysis & polling',
    iconName: 'ListChecks',
    menus: ['Dashboard', 'All Records', 'All Surveys', 'NPS Dashboard', 'Question Bank', 'Responses', 'Analytics'],
    buttons: ['Create Survey', 'Send via Email', 'Calculate NPS', 'Export CSV', 'Filter Responses'],
    functions: 'CSAT surveys create karna, NPS calculate karna aur market research insights collect karna.',
    schemaFields: [
      { key: 'survey_id', label: 'Survey ID', type: 'text', required: true },
      { key: 'title', label: 'Survey Title', type: 'text', required: true },
      { key: 'total_responses', label: 'Responses', type: 'number', required: true },
      { key: 'nps_score', label: 'NPS Score (-100 to +100)', type: 'number', required: true },
      { key: 'csat_percentage', label: 'CSAT (%)', type: 'number' }
    ],
    kpis: [
      { label: 'Overall Net Promoter Score', value: '+74 NPS', change: 'World-Class', isPositive: true },
      { label: 'Completed Responses', value: '12,410', change: '+24%', isPositive: true },
      { label: 'Survey Completion Rate', value: '81.2%', change: '+3.5%', isPositive: true },
      { label: 'Detractor Alerts Sent', value: '8', change: 'Auto Escalated', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SRV-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_cx_lead',
        status: 'Active',
        deleted_at: null,
        survey_id: 'SRV-NPS-2025-Q2',
        title: 'Customer Experience & Onboarding Feedback Survey',
        total_responses: 3890,
        nps_score: 76,
        csat_percentage: 94
      }
    ]
  },
  {
    id: 'volosc-sites',
    appNumber: 26,
    name: 'VoloSC Sites',
    category: 'Marketing',
    tagline: 'Enterprise website CMS, visual block builder, global edge CDN & SEO suite',
    iconName: 'Globe',
    menus: ['Dashboard', 'All Records', 'Websites', 'Page Tree', 'Asset Library', 'Forms', 'SEO Settings', 'Domains'],
    buttons: ['Create Site', 'New Page', 'Publish to CDN', 'A/B Test Design', 'Purge Cache'],
    functions: 'Corporate websites build karna, content management system aur instant edge deployment.',
    schemaFields: [
      { key: 'site_id', label: 'Site ID', type: 'text', required: true },
      { key: 'site_name', label: 'Website Name', type: 'text', required: true },
      { key: 'primary_domain', label: 'Primary Domain', type: 'text', required: true },
      { key: 'pages_count', label: 'Published Pages', type: 'number', required: true },
      { key: 'monthly_traffic', label: 'Monthly Visitors', type: 'number' },
      { key: 'ssl_status', label: 'SSL Status', type: 'select', options: ['Active (TLS 1.3)', 'Pending', 'Renewing'] }
    ],
    kpis: [
      { label: 'Active Hosted Sites', value: '18 Sites', change: 'Multi-Tenant', isPositive: true },
      { label: 'Edge Cache Hit Rate', value: '99.4%', change: 'Cloud CDN', isPositive: true },
      { label: 'Core Web Vitals', value: '99/100', change: 'Perfect LCP', isPositive: true },
      { label: 'Monthly Bandwidth', value: '8.4 TB', change: 'Global', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SIT-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_webmaster',
        status: 'Published',
        deleted_at: null,
        site_id: 'SITE-CORP-PORTAL',
        site_name: 'VoloSC Global Enterprise Portal',
        primary_domain: 'https://volosc.com',
        pages_count: 64,
        monthly_traffic: 680000,
        ssl_status: 'Active (TLS 1.3)'
      }
    ]
  },
  {
    id: 'volosc-domains',
    appNumber: 27,
    name: 'VoloSC Domains',
    category: 'Marketing',
    tagline: 'Custom corporate domain manager, Anycast DNS zone management & automated SSL/TLS renewals',
    iconName: 'Layers',
    menus: ['Dashboard', 'All Records', 'Managed Domains', 'DNS Records', 'SSL Certificates', 'Nameservers', 'Settings'],
    buttons: ['Add Domain', 'Add DNS Record', 'Renew SSL', 'Verify Ownership', 'Export Zone File'],
    functions: 'DNS records (A, CNAME, MX, TXT), SPF/DKIM verification aur SSL certificates manage karna.',
    schemaFields: [
      { key: 'domain_id', label: 'Domain ID', type: 'text', required: true },
      { key: 'domain_name', label: 'Domain Name', type: 'text', required: true },
      { key: 'dns_records_count', label: 'DNS Records', type: 'number', required: true },
      { key: 'ssl_expiry', label: 'SSL Expiry Date', type: 'date', required: true },
      { key: 'spf_dkim_status', label: 'SPF & DKIM Status', type: 'select', options: ['Verified', 'Pending', 'Failed'] }
    ],
    kpis: [
      { label: 'Managed Domains', value: '38 Domains', change: '100% Online', isPositive: true },
      { label: 'DNS Query Response', value: '11ms', change: 'Anycast Global', isPositive: true },
      { label: 'SSL Auto-Renewals', value: '38 / 38 Active', change: 'No Expirations', isPositive: true },
      { label: 'DMARC Enforcement', value: 'p=reject', change: 'Maximum Security', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-DOM-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sec_admin',
        status: 'Active',
        deleted_at: null,
        domain_id: 'DOM-001',
        domain_name: 'volosc.com',
        dns_records_count: 24,
        ssl_expiry: '2026-05-18',
        spf_dkim_status: 'Verified'
      }
    ]
  },
  {
    id: 'volosc-marketing-automation',
    appNumber: 28,
    name: 'VoloSC Marketing Automation',
    category: 'Marketing',
    tagline: 'Visual customer journey builder, behavioral lead nurturing & automated email drips',
    iconName: 'GitBranch',
    menus: ['Dashboard', 'All Records', 'Active Journeys', 'Workflow Triggers', 'Conversion Goals', 'Audience Rules', 'Logs'],
    buttons: ['Create Journey', 'Add Branching Node', 'Test Path', 'Activate Journey', 'View Drop-offs'],
    functions: 'Automated multi-stage marketing journeys build karna based on user actions.',
    schemaFields: [
      { key: 'journey_id', label: 'Journey ID', type: 'text', required: true },
      { key: 'journey_title', label: 'Journey Title', type: 'text', required: true },
      { key: 'active_leads_in_flow', label: 'Leads in Flow', type: 'number', required: true },
      { key: 'touchpoints_count', label: 'Touchpoints', type: 'number', required: true },
      { key: 'goal_conversion_rate', label: 'Conversion Rate (%)', type: 'number', required: true }
    ],
    kpis: [
      { label: 'Active Automated Flows', value: '24 Journeys', change: 'Running 24/7', isPositive: true },
      { label: 'Enrolled Prospects', value: '64,200', change: '+18%', isPositive: true },
      { label: 'Conversion Lift', value: '+31.4%', change: 'Compared to static', isPositive: true },
      { label: 'Nurture Cycle Velocity', value: '14 Days', change: '-5 Days', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-MKA-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_marketing_01',
        status: 'Active',
        deleted_at: null,
        journey_id: 'JRN-NEW-SIGNUP-ONBOARD',
        journey_title: 'Enterprise 7-Day Trial Activation Drip',
        active_leads_in_flow: 4890,
        touchpoints_count: 6,
        goal_conversion_rate: 28.5
      }
    ]
  },
  {
    id: 'volosc-webinar',
    appNumber: 29,
    name: 'VoloSC Webinar',
    category: 'Marketing',
    tagline: 'Interactive enterprise webinar hosting, live Q&A, attendee polls & cloud recording',
    iconName: 'Video',
    menus: ['Dashboard', 'All Records', 'Scheduled Webinars', 'Past Recordings', 'Polls & Surveys', 'Registrants', 'Analytics'],
    buttons: ['Schedule Webinar', 'Start Broadcast', 'Launch Poll', 'Download Cloud Video', 'Export Registrants'],
    functions: 'Live corporate webinars host karna, high-capacity streaming aur instant lead sync.',
    schemaFields: [
      { key: 'webinar_id', label: 'Webinar ID', type: 'text', required: true },
      { key: 'title', label: 'Webinar Title', type: 'text', required: true },
      { key: 'presenter_name', label: 'Presenter', type: 'text', required: true },
      { key: 'registrants_count', label: 'Registrants', type: 'number', required: true },
      { key: 'live_attendees', label: 'Live Attendees', type: 'number' },
      { key: 'broadcast_date', label: 'Broadcast Date', type: 'date', required: true }
    ],
    kpis: [
      { label: 'Webinars Hosted Q2', value: '16 Sessions', change: 'Global Broadcast', isPositive: true },
      { label: 'Total Registrations', value: '19,200', change: '+41%', isPositive: true },
      { label: 'Attendance Rate', value: '62.4%', change: 'Industry Leading', isPositive: true },
      { label: 'MQLs Generated', value: '1,840', change: 'Qualified', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-WBN-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_events_01',
        status: 'Scheduled',
        deleted_at: null,
        webinar_id: 'WBN-AI-FINANCE-2025',
        title: 'Autonomous Financial ERP & Real-Time Closing in VoloSC',
        presenter_name: 'David Vance & Sarah Chen',
        registrants_count: 2840,
        live_attendees: 0,
        broadcast_date: '2025-05-28T18:00:00Z'
      }
    ]
  },
  {
    id: 'volosc-pagesense',
    appNumber: 30,
    name: 'VoloSC PageSense',
    category: 'Marketing',
    tagline: 'Heatmaps, click tracking, session replays & web A/B testing conversion optimization',
    iconName: 'Activity',
    menus: ['Dashboard', 'All Records', 'Heatmaps', 'Session Recordings', 'A/B Experiments', 'Funnels', 'Form Analytics'],
    buttons: ['New Heatmap', 'Launch A/B Test', 'Play Session', 'Create Funnel', 'Export Findings'],
    functions: 'Website visitor mouse movements, scroll heatmaps aur UX bottlenecks diagnose karna.',
    schemaFields: [
      { key: 'experiment_id', label: 'Experiment ID', type: 'text', required: true },
      { key: 'page_url', label: 'Target Page URL', type: 'text', required: true },
      { key: 'test_type', label: 'Test Type', type: 'select', options: ['Heatmap', 'A/B Split Test', 'Scroll Map', 'Funnel Analysis'] },
      { key: 'sample_size', label: 'Recorded Visitors', type: 'number', required: true },
      { key: 'conversion_delta', label: 'Conversion Lift (%)', type: 'number' }
    ],
    kpis: [
      { label: 'Tracked Sessions', value: '2.4M', change: 'Last 30d', isPositive: true },
      { label: 'Active A/B Tests', value: '8 Experiments', change: 'Statistical Significance', isPositive: true },
      { label: 'Conversion Lift', value: '+14.8%', change: 'On Pricing Page', isPositive: true },
      { label: 'Average Scroll Depth', value: '72%', change: '+6%', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-PGS-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_cro_specialist',
        status: 'Active',
        deleted_at: null,
        experiment_id: 'EXP-HERO-CTA-2025',
        page_url: 'https://volosc.com/',
        test_type: 'A/B Split Test',
        sample_size: 48000,
        conversion_delta: 18.2
      }
    ]
  },
  {
    id: 'volosc-landingpage',
    appNumber: 31,
    name: 'VoloSC LandingPage',
    category: 'Marketing',
    tagline: 'High-converting landing page creator, responsive templates & instant form captures',
    iconName: 'Layout',
    menus: ['Dashboard', 'All Records', 'All Pages', 'Templates', 'Lead Captures', 'Custom Scripts', 'Settings'],
    buttons: ['Create Page', 'Open Visual Editor', 'Publish Page', 'A/B Variant', 'Download Code'],
    functions: 'PPC aur ad campaigns ke liye lightning-fast landing pages build aur publish karna.',
    schemaFields: [
      { key: 'page_id', label: 'Page ID', type: 'text', required: true },
      { key: 'title', label: 'Page Title', type: 'text', required: true },
      { key: 'slug', label: 'URL Slug', type: 'text', required: true },
      { key: 'visitors_count', label: 'Visitors', type: 'number', required: true },
      { key: 'lead_submissions', label: 'Form Leads Captured', type: 'number', required: true },
      { key: 'conversion_rate', label: 'Conversion Rate (%)', type: 'number' }
    ],
    kpis: [
      { label: 'Active Landing Pages', value: '42 Pages', change: 'Ad Optimized', isPositive: true },
      { label: 'Leads Captured Q2', value: '8,420', change: '+34%', isPositive: true },
      { label: 'Average Page Speed', value: '0.6s', change: 'Fast Global Edge', isPositive: true },
      { label: 'Top Page Conversion', value: '31.2%', change: 'Webinar Squeeze', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-LDP-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_growth_marketer',
        status: 'Published',
        deleted_at: null,
        page_id: 'LP-ENTERPRISE-PROMO',
        title: 'Replace Salesforce & Zoho with VoloSC Cloud',
        slug: '/switch-to-volosc',
        visitors_count: 32000,
        lead_submissions: 5120,
        conversion_rate: 16.0
      }
    ]
  },
  {
    id: 'volosc-leadchain',
    appNumber: 32,
    name: 'VoloSC LeadChain',
    category: 'Marketing',
    tagline: 'B2B lead intelligence, verified contact data enrichment, firmographics & intent signals',
    iconName: 'Link',
    menus: ['Dashboard', 'All Records', 'Company Database', 'Contact Search', 'Intent Feeds', 'Export Lists', 'Integrations'],
    buttons: ['Search Companies', 'Enrich Record', 'Export to CRM', 'Setup Intent Alert', 'Verify Email'],
    functions: 'High-intent B2B prospect companies aur decision-maker emails uncover karna.',
    schemaFields: [
      { key: 'prospect_id', label: 'Prospect ID', type: 'text', required: true },
      { key: 'company_name', label: 'Company Name', type: 'text', required: true },
      { key: 'industry', label: 'Industry', type: 'text', required: true },
      { key: 'employee_count', label: 'Headcount', type: 'number', required: true },
      { key: 'intent_topic', label: 'Detected Intent Topic', type: 'text' },
      { key: 'intent_score', label: 'Intent Score (1-100)', type: 'number' }
    ],
    kpis: [
      { label: 'Verified B2B Profiles', value: '45M Records', change: 'Global Index', isPositive: true },
      { label: 'Monthly Enriched Leads', value: '84,000', change: 'High Accuracy', isPositive: true },
      { label: 'Email Deliverability', value: '99.1%', change: 'Live SMTP verified', isPositive: true },
      { label: 'Intent Signal Triggers', value: '1,420 / wk', change: 'High Buying Propensity', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-LDC-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_bdr_01',
        status: 'Active',
        deleted_at: null,
        prospect_id: 'PRSP-901',
        company_name: 'Nexus Dynamics Aerospace',
        industry: 'Aviation & Defense',
        employee_count: 4200,
        intent_topic: 'Migrating from Salesforce to Unified ERP',
        intent_score: 95
      }
    ]
  },
  {
    id: 'volosc-publish',
    appNumber: 33,
    name: 'VoloSC Publish',
    category: 'Marketing',
    tagline: 'Corporate content editorial calendar, multi-author workflows & cross-platform syndication',
    iconName: 'Send',
    menus: ['Dashboard', 'All Records', 'Editorial Calendar', 'Articles', 'Drafts in Review', 'Syndications', 'Settings'],
    buttons: ['Draft Article', 'Submit for Review', 'Publish Now', 'Schedule', 'Syndicate to Medium'],
    functions: 'Corporate blog, articles, whitepapers aur thought leadership content manage karna.',
    schemaFields: [
      { key: 'article_id', label: 'Article ID', type: 'text', required: true },
      { key: 'title', label: 'Article Title', type: 'text', required: true },
      { key: 'author', label: 'Author', type: 'text', required: true },
      { key: 'category', label: 'Content Category', type: 'text', required: true },
      { key: 'views_count', label: 'Total Views', type: 'number' },
      { key: 'published_date', label: 'Publish Date', type: 'date' }
    ],
    kpis: [
      { label: 'Articles Published', value: '184', change: '+12 this mo', isPositive: true },
      { label: 'Monthly Readers', value: '310,000', change: '+24%', isPositive: true },
      { label: 'Organic Search Keywords', value: '4,290 Top 10', change: 'High SEO Rank', isPositive: true },
      { label: 'Subscribers Gained', value: '2,840', change: '+18%', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-PUB-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_editor_01',
        status: 'Published',
        deleted_at: null,
        article_id: 'ART-2025-001',
        title: 'Why Cloud Operating Systems Are Replacing Fragmented SaaS Stacks',
        author: 'Marcus Vance',
        category: 'Thought Leadership',
        views_count: 24800,
        published_date: '2025-05-10'
      }
    ]
  },
  {
    id: 'volosc-communityspaces',
    appNumber: 34,
    name: 'VoloSC CommunitySpaces',
    category: 'Marketing',
    tagline: 'Branded customer community forums, peer discussions, product ideation & gamification',
    iconName: 'MessageCircle',
    menus: ['Dashboard', 'All Records', 'Discussion Boards', 'Ideas & Feature Requests', 'Top Members', 'Moderation Queue', 'Settings'],
    buttons: ['Create Space', 'Post Thread', 'Mark as Solved', 'Promote Moderator', 'Export Feedback'],
    functions: 'User community forums build karna, customer peer discussions aur product feedback loops facilitate karna.',
    schemaFields: [
      { key: 'thread_id', label: 'Thread ID', type: 'text', required: true },
      { key: 'space_name', label: 'Community Space', type: 'text', required: true },
      { key: 'topic_title', label: 'Topic Title', type: 'text', required: true },
      { key: 'author_name', label: 'User Author', type: 'text', required: true },
      { key: 'replies_count', label: 'Replies', type: 'number', required: true },
      { key: 'upvotes', label: 'Upvotes', type: 'number' }
    ],
    kpis: [
      { label: 'Active Community Members', value: '42,000', change: '+3,800 this mo', isPositive: true },
      { label: 'Questions Solved by Peers', value: '82%', change: 'Reduced Support Load', isPositive: true },
      { label: 'Feature Ideas Voted', value: '1,420 Ideas', change: 'Direct Product Input', isPositive: true },
      { label: 'Community CSAT', value: '98.1%', change: 'Thriving', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-COM-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_community_mgr',
        status: 'Active',
        deleted_at: null,
        thread_id: 'TH-COMM-440',
        space_name: 'Developers & API Integration',
        topic_title: 'Best practices for webhooks sync between VoloSC CRM and Inventory',
        author_name: 'Devin Thorne',
        replies_count: 28,
        upvotes: 142
      }
    ]
  },
  {
    id: 'volosc-linkthread',
    appNumber: 35,
    name: 'VoloSC Linkthread',
    category: 'Marketing',
    tagline: 'Enterprise short links, branded URLs, dynamic QR codes, UTM builders & click attribution',
    iconName: 'QrCode',
    menus: ['Dashboard', 'All Records', 'All Links', 'Dynamic QR Codes', 'UTM Campaign Builder', 'Analytics', 'Settings'],
    buttons: ['Create Link', 'Generate QR Code', 'Add UTM Tags', 'Archive Link', 'Export Clickstream'],
    functions: 'Short links generate karna, campaign tracking UTMs aur dynamic printable QR codes.',
    schemaFields: [
      { key: 'link_id', label: 'Link ID', type: 'text', required: true },
      { key: 'short_slug', label: 'Short URL', type: 'text', required: true },
      { key: 'destination_url', label: 'Destination URL', type: 'text', required: true },
      { key: 'clicks_count', label: 'Total Clicks', type: 'number', required: true },
      { key: 'utm_campaign', label: 'UTM Campaign', type: 'text' }
    ],
    kpis: [
      { label: 'Active Short Links', value: '1,280 Links', change: 'Enterprise Domain', isPositive: true },
      { label: 'Total Clicks Tracked', value: '8.4M Clicks', change: '+32%', isPositive: true },
      { label: 'Scanned QR Codes', value: '420,000 Scans', change: 'Print & Packaging', isPositive: true },
      { label: 'Top Geo Location', value: 'USA (48%), EU (32%)', change: 'Global', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-LKT-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_growth_marketer',
        status: 'Active',
        deleted_at: null,
        link_id: 'LNK-2025-01',
        short_slug: 'vsc.link/enterprise-demo',
        destination_url: 'https://volosc.com/enterprise/trial?utm_source=linkedin&utm_campaign=q2_launch',
        clicks_count: 14280,
        utm_campaign: 'q2_launch'
      }
    ]
  },

  // ==========================================
  // 3. Commerce & Customer Service (Apps 36 - 41)
  // ==========================================
  {
    id: 'volosc-commerce',
    appNumber: 36,
    name: 'VoloSC Commerce',
    category: 'Commerce & Customer Service',
    tagline: 'Omnichannel B2B/B2C digital store, multi-currency checkout, orders & catalog management',
    iconName: 'ShoppingCart',
    menus: ['Dashboard', 'All Records', 'Orders', 'Products Catalog', 'Customers', 'Discounts', 'Shipments', 'Reports', 'Settings'],
    buttons: ['New Order', 'Fulfill Order', 'Refund Payment', 'Add Product', 'Export Orders', 'Sync Stock'],
    functions: 'E-commerce storefront manage karna, product catalogs aur connected order checkout transactions.',
    schemaFields: [
      { key: 'order_id', label: 'Order ID', type: 'text', required: true },
      { key: 'customer_id', label: 'Customer ID', type: 'text', required: true },
      { key: 'customer_name', label: 'Customer Name', type: 'text', required: true },
      { key: 'sku', label: 'Product SKU', type: 'text', required: true },
      { key: 'quantity', label: 'Quantity', type: 'number', required: true },
      { key: 'total_price', label: 'Total Price ($)', type: 'currency', required: true },
      { key: 'fulfillment_status', label: 'Fulfillment Status', type: 'select', options: ['Unfulfilled', 'Allocated', 'Shipped', 'Delivered', 'Cancelled'] }
    ],
    kpis: [
      { label: 'Gross Merchandise Value', value: '$2,840,000', change: '+29.4%', isPositive: true },
      { label: 'Total Orders Processed', value: '4,890', change: '+18%', isPositive: true },
      { label: 'Avg Order Value (AOV)', value: '$580.80', change: '+9.2%', isPositive: true },
      { label: 'Cart Abandonment Rate', value: '31.2%', change: '-6.4% lower', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-COM-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_commerce_ops',
        status: 'Active',
        deleted_at: null,
        order_id: 'ORD-9001',
        customer_id: 'CUST-7001',
        customer_name: 'Alex Mercer',
        sku: 'SKU-PRO-01',
        quantity: 50,
        total_price: 245000,
        fulfillment_status: 'Allocated'
      }
    ]
  },
  {
    id: 'volosc-desk',
    appNumber: 37,
    name: 'VoloSC Desk',
    category: 'Commerce & Customer Service',
    tagline: 'Enterprise customer support helpdesk, SLA automated routing, tickets & macro resolutions',
    iconName: 'Headphones',
    menus: ['Dashboard', 'All Records', 'Tickets', 'My Open Tickets', 'Unassigned Queue', 'SLA Breaches', 'Knowledge Base', 'Reports', 'Settings'],
    buttons: ['Create Ticket', 'Assign Agent', 'Resolve Ticket', 'Escalate SLA', 'Apply Macro', 'Export Tickets'],
    functions: 'Support ticketing system manage karna, multi-channel tickets solve karna SLA contracts ke sath.',
    schemaFields: [
      { key: 'ticket_id', label: 'Ticket ID', type: 'text', required: true },
      { key: 'customer_name', label: 'Customer Name', type: 'text', required: true },
      { key: 'subject', label: 'Issue Subject', type: 'text', required: true },
      { key: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Urgent / P1'] },
      { key: 'assigned_agent', label: 'Assigned Agent', type: 'text' },
      { key: 'sla_due_hours', label: 'SLA Remaining (Hours)', type: 'number' }
    ],
    kpis: [
      { label: 'Tickets Resolved Today', value: '184', change: '+14%', isPositive: true },
      { label: 'SLA Adherence Rate', value: '99.2%', change: 'Target 98%', isPositive: true },
      { label: 'Customer CSAT', value: '97.8%', change: '+1.4%', isPositive: true },
      { label: 'First Reply Time', value: '8 mins', change: '-4m faster', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-DSK-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_agent_01',
        status: 'Open',
        deleted_at: null,
        ticket_id: 'TCK-8812',
        customer_name: 'Elena Rostova',
        subject: 'Custom Webhook Payload Validation for Inventory Events',
        priority: 'High',
        assigned_agent: 'Marcus Vance',
        sla_due_hours: 4
      }
    ]
  },
  {
    id: 'volosc-assist',
    appNumber: 38,
    name: 'VoloSC Assist',
    category: 'Commerce & Customer Service',
    tagline: 'Secure remote desktop support, screen sharing, unattended access & technician diagnostics',
    iconName: 'Laptop',
    menus: ['Dashboard', 'All Records', 'Remote Sessions', 'Unattended Computers', 'Technicians', 'Session Recordings', 'Security Logs'],
    buttons: ['Start Remote Session', 'Invite Customer', 'Transfer File', 'Record Session', 'Reboot & Reconnect'],
    functions: 'Remote desktop assistance dena, technicians ke liye secure screen sharing provide karna.',
    schemaFields: [
      { key: 'session_id', label: 'Session ID', type: 'text', required: true },
      { key: 'technician_name', label: 'Technician', type: 'text', required: true },
      { key: 'client_os', label: 'Client OS', type: 'select', options: ['Windows 11', 'macOS Sonoma', 'Ubuntu Linux', 'iOS', 'Android'] },
      { key: 'duration_minutes', label: 'Session Duration (min)', type: 'number', required: true },
      { key: 'session_key', label: 'One-Time Session Key', type: 'text', required: true }
    ],
    kpis: [
      { label: 'Remote Sessions Run', value: '1,420', change: 'This Month', isPositive: true },
      { label: 'Avg Connection Speed', value: '1.2s', change: 'Ultra Low Latency', isPositive: true },
      { label: 'Technician Rating', value: '4.95 / 5', change: 'High CSAT', isPositive: true },
      { label: 'Zero-Install Web Sessions', value: '88%', change: 'WebRTC Pure', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-AST-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_tech_01',
        status: 'Completed',
        deleted_at: null,
        session_id: 'REM-2025-99',
        technician_name: 'Liam Foster',
        client_os: 'Windows 11',
        duration_minutes: 22,
        session_key: 'KEY-948-281-332'
      }
    ]
  },
  {
    id: 'volosc-fsm',
    appNumber: 39,
    name: 'VoloSC FSM',
    category: 'Commerce & Customer Service',
    tagline: 'Field Service Management, work order dispatches, mobile technician tracking & spare parts',
    iconName: 'Wrench',
    menus: ['Dashboard', 'All Records', 'Work Orders', 'Dispatch Board', 'Field Technicians', 'Service Contracts', 'Parts Inventory'],
    buttons: ['New Work Order', 'Dispatch Tech', 'Complete Job', 'Capture Signature', 'Invoice Job'],
    functions: 'Field service technicians dispatch karna, on-site jobs track karna aur repair verification.',
    schemaFields: [
      { key: 'work_order_id', label: 'Work Order ID', type: 'text', required: true },
      { key: 'client_name', label: 'Client / Site', type: 'text', required: true },
      { key: 'service_type', label: 'Service Type', type: 'text', required: true },
      { key: 'assigned_tech', label: 'Assigned Field Tech', type: 'text', required: true },
      { key: 'job_status', label: 'Job Status', type: 'select', options: ['Unscheduled', 'Dispatched', 'On-Site', 'Work Completed', 'Closed'] },
      { key: 'scheduled_date', label: 'Schedule Date', type: 'date', required: true }
    ],
    kpis: [
      { label: 'Work Orders Dispatched', value: '348 Jobs', change: 'This Week', isPositive: true },
      { label: 'First-Time Fix Rate', value: '92.4%', change: '+4.2%', isPositive: true },
      { label: 'Average On-Site Time', value: '1h 15m', change: 'Optimal', isPositive: true },
      { label: 'Customer Sign-off', value: '100% Digital', change: 'ESIGN Verified', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-FSM-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_fsm_dispatch',
        status: 'Dispatched',
        deleted_at: null,
        work_order_id: 'WO-2025-441',
        client_name: 'Apex BioResearch Labs - Campus B',
        service_type: 'Quarterly Cloud Server Hardware Maintenance',
        assigned_tech: 'Carlos Gomez',
        job_status: 'Dispatched',
        scheduled_date: '2025-05-19'
      }
    ]
  },
  {
    id: 'volosc-lens',
    appNumber: 40,
    name: 'VoloSC Lens',
    category: 'Commerce & Customer Service',
    tagline: 'Augmented reality interactive remote assistance, 3D spatial annotations & smart glass feeds',
    iconName: 'Glasses',
    menus: ['Dashboard', 'All Records', 'Live AR Sessions', 'Annotated Snapshots', 'Spatial Models', 'Device Feeds', 'Settings'],
    buttons: ['Start AR Session', 'Place 3D Arrow', 'Freeze Frame', 'Measure Distance', 'Export Report'],
    functions: 'Camera screen par live AR 3D drawings aur visual guidance dena field repairs ke liye.',
    schemaFields: [
      { key: 'ar_session_id', label: 'AR Session ID', type: 'text', required: true },
      { key: 'device_model', label: 'Client Device', type: 'text', required: true },
      { key: 'expert_name', label: 'Remote Specialist', type: 'text', required: true },
      { key: 'annotations_count', label: '3D Annotations Placed', type: 'number', required: true },
      { key: 'resolution_status', label: 'Status', type: 'select', options: ['Live', 'Resolved', 'Archived'] }
    ],
    kpis: [
      { label: 'AR Sessions Completed', value: '480', change: '+35%', isPositive: true },
      { label: 'Travel Cost Reduction', value: '$120,000', change: 'Saved Trips', isPositive: true },
      { label: 'Issue Resolution Speed', value: '14 mins', change: '-60% faster', isPositive: true },
      { label: 'Annotation Accuracy', value: 'Sub-millimeter', change: 'Spatial AR', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-LNS-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_ar_lead',
        status: 'Resolved',
        deleted_at: null,
        ar_session_id: 'AR-SESSION-301',
        device_model: 'iPad Pro LiDAR / Smart Glasses',
        expert_name: 'Dr. Evelyn Ward',
        annotations_count: 8,
        resolution_status: 'Resolved'
      }
    ]
  },
  {
    id: 'volosc-solo',
    appNumber: 41,
    name: 'VoloSC Solo',
    category: 'Commerce & Customer Service',
    tagline: 'Unified solo-entrepreneur and micro-business all-in-one invoicing, expenses & bookings hub',
    iconName: 'User',
    menus: ['Dashboard', 'All Records', 'My Work', 'Client Invoices', 'Quick Quotes', 'Appointments', 'Expenses', 'Reports'],
    buttons: ['Create Invoice', 'Log Expense', 'Book Client', 'Accept Payment', 'Export Taxes'],
    functions: 'Freelancers aur sole proprietors ke liye simple financial aur customer control desk.',
    schemaFields: [
      { key: 'solo_record_id', label: 'Record ID', type: 'text', required: true },
      { key: 'client_name', label: 'Client Name', type: 'text', required: true },
      { key: 'service_provided', label: 'Service Provided', type: 'text', required: true },
      { key: 'amount', label: 'Amount ($)', type: 'currency', required: true },
      { key: 'payment_status', label: 'Payment Status', type: 'select', options: ['Unpaid', 'Paid', 'Overdue'] }
    ],
    kpis: [
      { label: 'Solo Invoices Issued', value: '$84,500', change: 'This Month', isPositive: true },
      { label: 'Instant Payment Payout', value: 'Under 1 hour', change: 'UPI / Stripe', isPositive: true },
      { label: 'Active Solo Businesses', value: '14,200', change: '+22%', isPositive: true },
      { label: 'Estimated Tax Saved', value: '$12,400', change: 'Automated', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SOLO-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_solo_user',
        status: 'Paid',
        deleted_at: null,
        solo_record_id: 'SLO-INV-109',
        client_name: 'Horizon Creative Studio',
        service_provided: 'Brand Identity & Web Architecture Consultation',
        amount: 4500,
        payment_status: 'Paid'
      }
    ]
  },

  // ==========================================
  // 4. Finance Applications (Apps 42 - 52)
  // ==========================================
  {
    id: 'volosc-books',
    appNumber: 42,
    name: 'VoloSC Books',
    category: 'Finance',
    tagline: 'Double-entry enterprise accounting, general ledger, bank reconciliations & financial statements',
    iconName: 'BookOpen',
    menus: ['Dashboard', 'All Records', 'General Ledger', 'Chart of Accounts', 'Journal Entries', 'Bank Feeds', 'Balance Sheet', 'P&L Reports', 'Settings'],
    buttons: ['Add Journal Entry', 'Reconcile Bank', 'Generate P&L', 'Export Audit Trail', 'Close Month'],
    functions: 'Compliant financial accounting, tax reports (GST/VAT/Sales Tax) aur general ledgers maintain karna.',
    schemaFields: [
      { key: 'journal_id', label: 'Journal ID', type: 'text', required: true },
      { key: 'account_code', label: 'Account Code', type: 'text', required: true },
      { key: 'account_name', label: 'Account Name', type: 'text', required: true },
      { key: 'debit', label: 'Debit ($)', type: 'currency', required: true },
      { key: 'credit', label: 'Credit ($)', type: 'currency', required: true },
      { key: 'narration', label: 'Transaction Narration', type: 'text' }
    ],
    kpis: [
      { label: 'Net Profit Margin', value: '28.4%', change: '+3.1% YoY', isPositive: true },
      { label: 'Operating Revenue', value: '$14,280,000', change: '+24.5%', isPositive: true },
      { label: 'Bank Feeds Synced', value: '100% Reconciled', change: 'Zero Discrepancy', isPositive: true },
      { label: 'Quick Ratio', value: '2.4x', change: 'High Liquidity', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-BKS-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_cfo',
        status: 'Posted',
        deleted_at: null,
        journal_id: 'JE-2025-0042',
        account_code: '1010-CASH-CHASE',
        account_name: 'Enterprise Operating Treasury',
        debit: 245000,
        credit: 0,
        narration: 'Payment received for Invoice INV-3001 (Starlight Global Tech)'
      }
    ]
  },
  {
    id: 'volosc-expense',
    appNumber: 43,
    name: 'VoloSC Expense',
    category: 'Finance',
    tagline: 'Corporate expense tracking, multi-currency OCR receipt scanning & approval hierarchies',
    iconName: 'Receipt',
    menus: ['Dashboard', 'All Records', 'Expense Reports', 'Receipt Inbox', 'Corporate Cards', 'Approvals Queue', 'Mileage', 'Settings'],
    buttons: ['Upload Receipt', 'Create Report', 'Approve Expense', 'Reimburse', 'Export to Books'],
    functions: 'Employee receipts scan karna (OCR), corporate cards sync aur travel reimbursements approve karna.',
    schemaFields: [
      { key: 'expense_id', label: 'Expense ID', type: 'text', required: true },
      { key: 'employee_name', label: 'Employee Name', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'select', options: ['Travel & Lodging', 'Client Meals', 'Software Subscriptions', 'Office Supplies', 'Hardware'] },
      { key: 'amount', label: 'Amount ($)', type: 'currency', required: true },
      { key: 'merchant', label: 'Merchant', type: 'text', required: true },
      { key: 'approval_status', label: 'Approval Status', type: 'select', options: ['Draft', 'Submitted', 'Approved', 'Reimbursed', 'Rejected'] }
    ],
    kpis: [
      { label: 'Expenses Processed Q2', value: '$184,200', change: 'Under Budget', isPositive: true },
      { label: 'OCR Extraction Accuracy', value: '99.4%', change: 'Instant Scan', isPositive: true },
      { label: 'Avg Approval Time', value: '1.4 Days', change: '-2 Days faster', isPositive: true },
      { label: 'Reimbursement Speed', value: 'Next-Day ACH', change: 'Automated', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-EXP-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Approved',
        deleted_at: null,
        expense_id: 'EXP-2025-881',
        employee_name: 'Sarah Chen',
        category: 'Travel & Lodging',
        amount: 840.50,
        merchant: 'Hyatt Regency San Francisco',
        approval_status: 'Approved'
      }
    ]
  },
  {
    id: 'volosc-inventory',
    appNumber: 44,
    name: 'VoloSC Inventory',
    category: 'Finance',
    tagline: 'Multi-warehouse stock control, SKU batch tracking, barcode scanning & auto-reorder points',
    iconName: 'Package',
    menus: ['Dashboard', 'All Records', 'Inventory Items', 'Warehouses', 'Stock Movements', 'Low Stock Alerts', 'Purchase Orders', 'Settings'],
    buttons: ['Add SKU', 'Adjust Stock', 'Transfer Warehouse', 'Scan Barcode', 'Generate Purchase Order', 'Export Stock'],
    functions: 'Stock levels track karna across multi-location warehouses, automatic low-stock alerts aur reordering.',
    schemaFields: [
      { key: 'sku', label: 'Product SKU', type: 'text', required: true },
      { key: 'product_name', label: 'Product Name', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'text', required: true },
      { key: 'cost_price', label: 'Cost Price ($)', type: 'currency', required: true },
      { key: 'selling_price', label: 'Selling Price ($)', type: 'currency', required: true },
      { key: 'stock_quantity', label: 'Stock On Hand', type: 'number', required: true },
      { key: 'warehouse_location', label: 'Warehouse Hub', type: 'select', options: ['Main Hub (Dallas)', 'West Coast (Reno)', 'Europe (Rotterdam)', 'APAC (Singapore)'] },
      { key: 'reorder_level', label: 'Min Reorder Point', type: 'number', required: true }
    ],
    kpis: [
      { label: 'Total Stock Valuation', value: '$6,420,000', change: '+8.4%', isPositive: true },
      { label: 'Active SKUs Managed', value: '4,280 SKUs', change: '100% Tracked', isPositive: true },
      { label: 'Stockout Rate', value: '0.2%', change: 'Near Zero', isPositive: true },
      { label: 'Turnover Ratio', value: '6.8x / yr', change: 'High Velocity', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-INV-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_inventory_mgr',
        status: 'In Stock',
        deleted_at: null,
        sku: 'SKU-PRO-01',
        product_name: 'VoloSC Edge Cloud Server Appliance v4',
        category: 'Hardware & Infrastructure',
        cost_price: 3200,
        selling_price: 4900,
        stock_quantity: 450,
        warehouse_location: 'Main Hub (Dallas)',
        reorder_level: 50
      }
    ]
  },
  {
    id: 'volosc-payroll',
    appNumber: 45,
    name: 'VoloSC Payroll',
    category: 'Finance',
    tagline: 'Automated employee salary disbursements, tax withholdings, direct deposits & payslips',
    iconName: 'CreditCard',
    menus: ['Dashboard', 'All Records', 'Payroll Runs', 'Salary Structures', 'Tax Deductions', 'Payslips', 'Direct Deposits', 'Compliance'],
    buttons: ['Run Payroll', 'Approve Salaries', 'Download Payslip PDF', 'Disburse Direct Deposit', 'Generate Tax W2/1099'],
    functions: 'Monthly payroll run karna, statutory tax calculations aur direct bank transfers automate karna.',
    schemaFields: [
      { key: 'payroll_run_id', label: 'Payroll Run ID', type: 'text', required: true },
      { key: 'pay_period', label: 'Pay Period', type: 'text', required: true },
      { key: 'total_employees', label: 'Employees Paid', type: 'number', required: true },
      { key: 'gross_payroll', label: 'Gross Payroll ($)', type: 'currency', required: true },
      { key: 'tax_withholding', label: 'Tax Withheld ($)', type: 'currency', required: true },
      { key: 'net_disbursed', label: 'Net Disbursed ($)', type: 'currency', required: true }
    ],
    kpis: [
      { label: 'Total Disbursed This Month', value: '$1,240,000', change: 'On Schedule', isPositive: true },
      { label: 'Employees On Payroll', value: '248 Staff', change: 'Global Multi-Country', isPositive: true },
      { label: 'Tax Accuracy', value: '100% Compliant', change: 'Statutory Filings', isPositive: true },
      { label: 'Direct Deposit Processing', value: 'Instant ACH', change: 'Zero Delays', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-PAY-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_payroll_admin',
        status: 'Completed',
        deleted_at: null,
        payroll_run_id: 'PR-2025-MAY',
        pay_period: 'May 01 - May 15, 2025',
        total_employees: 248,
        gross_payroll: 620000,
        tax_withholding: 136400,
        net_disbursed: 483600
      }
    ]
  },
  {
    id: 'volosc-billing',
    appNumber: 46,
    name: 'VoloSC Billing',
    category: 'Finance',
    tagline: 'Recurring subscription billing, usage metering, smart dunning & automated credit card charges',
    iconName: 'Repeat',
    menus: ['Dashboard', 'All Records', 'Subscriptions', 'Plans & Pricing', 'Usage Meters', 'Dunning Management', 'Invoices', 'Settings'],
    buttons: ['Create Subscription', 'Change Plan', 'Pause Subscription', 'Retry Failed Charge', 'Export MRR'],
    functions: 'SaaS recurring subscriptions, usage-based meter billing aur automated card charging manage karna.',
    schemaFields: [
      { key: 'subscription_id', label: 'Subscription ID', type: 'text', required: true },
      { key: 'customer_name', label: 'Customer Name', type: 'text', required: true },
      { key: 'plan_name', label: 'Plan Name', type: 'select', options: ['Starter Cloud ($29/mo)', 'Professional OS ($79/mo)', 'Enterprise Suite ($199/mo)', 'Custom Enterprise'] },
      { key: 'billing_cycle', label: 'Billing Cycle', type: 'select', options: ['Monthly', 'Annual (20% Off)'] },
      { key: 'recurring_mrr', label: 'MRR Value ($)', type: 'currency', required: true },
      { key: 'next_billing_date', label: 'Next Charge Date', type: 'date', required: true }
    ],
    kpis: [
      { label: 'Monthly Recurring Revenue (MRR)', value: '$920,400', change: '+18.2%', isPositive: true },
      { label: 'Annual Run Rate (ARR)', value: '$11.04M', change: '+22.8%', isPositive: true },
      { label: 'Net Revenue Retention', value: '124%', change: 'Best in Class', isPositive: true },
      { label: 'Churn Rate', value: '0.48%', change: 'Ultra Low', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-BIL-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_billing_ops',
        status: 'Active',
        deleted_at: null,
        subscription_id: 'SUB-ENTERPRISE-701',
        customer_name: 'Starlight Global Technologies',
        plan_name: 'Custom Enterprise',
        billing_cycle: 'Annual (20% Off)',
        recurring_mrr: 20416,
        next_billing_date: '2026-05-18'
      }
    ]
  },
  {
    id: 'volosc-procurement',
    appNumber: 47,
    name: 'VoloSC Procurement',
    category: 'Finance',
    tagline: 'Vendor purchase requisitions, RFQ bidding, 3-way matching & PO approval pipelines',
    iconName: 'ShoppingBag',
    menus: ['Dashboard', 'All Records', 'Purchase Requisitions', 'Vendor Quotes (RFQ)', 'Purchase Orders', '3-Way Match', 'Suppliers'],
    buttons: ['Create Requisition', 'Send RFQ', 'Approve PO', 'Verify Goods Receipt', 'Match Invoice'],
    functions: 'Enterprise vendor purchases track karna, budget approvals aur 3-way invoice matching.',
    schemaFields: [
      { key: 'po_number', label: 'PO Number', type: 'text', required: true },
      { key: 'vendor_name', label: 'Vendor / Supplier', type: 'text', required: true },
      { key: 'items_summary', label: 'Items Summary', type: 'text', required: true },
      { key: 'total_cost', label: 'Total Cost ($)', type: 'currency', required: true },
      { key: 'approval_stage', label: 'Approval Stage', type: 'select', options: ['Submitted', 'Manager Approved', 'Finance Approved', 'Goods Received', 'Closed'] }
    ],
    kpis: [
      { label: 'Procurement Spend Q2', value: '$1,840,000', change: 'Cost Optimized', isPositive: true },
      { label: 'Negotiated Savings', value: '$240,000', change: '13% Saved', isPositive: true },
      { label: 'PO Cycle Time', value: '2.1 Days', change: '-3 Days', isPositive: true },
      { label: 'Approved Suppliers', value: '142 Vendors', change: 'SOC2 Verified', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-PRO-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_procure_lead',
        status: 'Approved',
        deleted_at: null,
        po_number: 'PO-2025-901',
        vendor_name: 'Supermicro Server Compute Inc.',
        items_summary: '24x High-Density NVMe GPU Cluster Nodes',
        total_cost: 380000,
        approval_stage: 'Finance Approved'
      }
    ]
  },
  {
    id: 'volosc-checkout',
    appNumber: 48,
    name: 'VoloSC Checkout',
    category: 'Finance',
    tagline: 'Hosted payment checkout pages, 1-click buy, UPI, Apple Pay & fraud protection',
    iconName: 'CheckSquare',
    menus: ['Dashboard', 'All Records', 'Checkout Pages', 'Transactions', 'Conversion Funnels', 'Payment Methods', 'Settings'],
    buttons: ['Build Checkout Page', 'Embed Button', 'Test Card', 'Simulate UPI QR', 'Export Conversions'],
    functions: 'High-conversion checkout payment pages create karna, fraud detection aur split transactions.',
    schemaFields: [
      { key: 'checkout_session_id', label: 'Checkout Session ID', type: 'text', required: true },
      { key: 'product_name', label: 'Product / Plan', type: 'text', required: true },
      { key: 'amount', label: 'Checkout Amount ($)', type: 'currency', required: true },
      { key: 'customer_email', label: 'Customer Email', type: 'email', required: true },
      { key: 'gateway_status', label: 'Gateway Status', type: 'select', options: ['Initiated', 'Authorized', 'Captured', 'Failed'] }
    ],
    kpis: [
      { label: 'Checkout Conversion Rate', value: '88.6%', change: '+8.2%', isPositive: true },
      { label: 'Avg Time to Pay', value: '24 Seconds', change: '1-Click Accelerated', isPositive: true },
      { label: 'Fraud Chargeback Rate', value: '0.01%', change: '3D Secure 2.0', isPositive: true },
      { label: 'Supported Payment Rails', value: '135+ Currencies', change: 'Global', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-CHK-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_gateway_01',
        status: 'Captured',
        deleted_at: null,
        checkout_session_id: 'CHK-SES-88210',
        product_name: 'VoloSC Enterprise Cloud OS Annual License',
        amount: 245000,
        customer_email: 'a.mercer@starlight.io',
        gateway_status: 'Captured'
      }
    ]
  },
  {
    id: 'volosc-spend',
    appNumber: 49,
    name: 'VoloSC Spend',
    category: 'Finance',
    tagline: 'Corporate virtual card issuance, per-department budgets & automated spend limits',
    iconName: 'CreditCard',
    menus: ['Dashboard', 'All Records', 'Virtual Cards', 'Physical Cards', 'Department Budgets', 'Live Spend Feed', 'Settings'],
    buttons: ['Issue Virtual Card', 'Freeze Card', 'Set Spend Limit', 'Approve Request', 'Export Spend'],
    functions: 'Teams ke liye instant corporate debit/credit cards issue karna with strict budget controls.',
    schemaFields: [
      { key: 'card_id', label: 'Card ID', type: 'text', required: true },
      { key: 'cardholder_name', label: 'Cardholder', type: 'text', required: true },
      { key: 'last_four', label: 'Last 4 Digits', type: 'text', required: true },
      { key: 'monthly_limit', label: 'Monthly Limit ($)', type: 'currency', required: true },
      { key: 'current_spend', label: 'Current Spend ($)', type: 'currency', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true }
    ],
    kpis: [
      { label: 'Total Cards Active', value: '142 Cards', change: 'Virtual & Physical', isPositive: true },
      { label: 'Monthly Spend Controlled', value: '$420,000', change: '100% on Budget', isPositive: true },
      { label: 'Out-of-Policy Blocks', value: '18 Prevented', change: 'Saved $34K', isPositive: true },
      { label: 'Card Cashback Earned', value: '1.8%', change: '$7,560 YTD', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SPD-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_cfo',
        status: 'Active',
        deleted_at: null,
        card_id: 'V-CARD-7712',
        cardholder_name: 'Marcus Vance',
        last_four: '9012',
        monthly_limit: 25000,
        current_spend: 8420,
        department: 'Sales & Business Dev'
      }
    ]
  },
  {
    id: 'volosc-practice',
    appNumber: 50,
    name: 'VoloSC Practice',
    category: 'Finance',
    tagline: 'Practice management for CPAs, chartered accountants, client tax filings & audit tracking',
    iconName: 'Briefcase',
    menus: ['Dashboard', 'All Records', 'Client Accounts', 'Tax Filings', 'Statutory Deadlines', 'Timesheets', 'Billing', 'Settings'],
    buttons: ['Add Client', 'Start Tax Return', 'Assign Task', 'File Statutory Return', 'Generate Bill'],
    functions: 'Accounting firms aur CPAs ke multiple corporate clients ke tax filings manage karna.',
    schemaFields: [
      { key: 'practice_client_id', label: 'Client ID', type: 'text', required: true },
      { key: 'client_name', label: 'Client Corporate Entity', type: 'text', required: true },
      { key: 'tax_year', label: 'Tax Year', type: 'text', required: true },
      { key: 'filing_status', label: 'Filing Status', type: 'select', options: ['Data Collection', 'In Review', 'Partner Sign-off', 'E-Filed Accepted'] },
      { key: 'lead_cpa', label: 'Lead CPA', type: 'text', required: true }
    ],
    kpis: [
      { label: 'Managed Client Firms', value: '88 Clients', change: 'Enterprise', isPositive: true },
      { label: 'On-Time Filing Rate', value: '100%', change: 'Zero Penalties', isPositive: true },
      { label: 'Audit Readiness Score', value: '99/100', change: 'Top Tier', isPositive: true },
      { label: 'Billable Hours Logged', value: '4,280 hrs', change: '+12%', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-PRC-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_partner_cpa',
        status: 'In Review',
        deleted_at: null,
        practice_client_id: 'CPA-CL-104',
        client_name: 'Starlight Global Technologies Inc.',
        tax_year: 'FY 2024-2025',
        filing_status: 'Partner Sign-off',
        lead_cpa: 'Eleanor Vance, CPA'
      }
    ]
  },
  {
    id: 'volosc-invoice',
    appNumber: 51,
    name: 'VoloSC Invoice',
    category: 'Finance',
    tagline: 'Professional client invoicing, multi-currency taxes, auto-reminders & PDF exports',
    iconName: 'FileText',
    menus: ['Dashboard', 'All Records', 'All Invoices', 'Recurring Invoices', 'Estimates & Quotes', 'Payments Received', 'Overdue Alerts', 'Reports'],
    buttons: ['Create Invoice', 'Send via Email', 'Download PDF', 'Record Payment', 'Send Reminder', 'Cancel Invoice'],
    functions: 'Invoices issue karna, PDF export karna, payment gateway link karna aur payment status track karna.',
    schemaFields: [
      { key: 'invoice_id', label: 'Invoice ID', type: 'text', required: true },
      { key: 'customer_id', label: 'Customer ID', type: 'text', required: true },
      { key: 'customer_name', label: 'Customer Name', type: 'text', required: true },
      { key: 'amount', label: 'Invoice Amount ($)', type: 'currency', required: true },
      { key: 'tax_amount', label: 'Tax / GST ($)', type: 'currency', required: true },
      { key: 'due_date', label: 'Due Date', type: 'date', required: true },
      { key: 'payment_status', label: 'Status', type: 'select', options: ['Draft', 'Sent', 'Partially Paid', 'Paid', 'Overdue'] }
    ],
    kpis: [
      { label: 'Total Invoiced Q2', value: '$3,420,000', change: '+28%', isPositive: true },
      { label: 'Paid & Settled', value: '$3,180,000', change: '93% Collected', isPositive: true },
      { label: 'Average Days Sales Outstanding (DSO)', value: '18 Days', change: '-6 Days', isPositive: true },
      { label: 'Overdue Balance', value: '$34,000', change: 'Under 1%', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-INV-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_billing_ops',
        status: 'Paid',
        deleted_at: null,
        invoice_id: 'INV-3001',
        customer_id: 'CUST-7001',
        customer_name: 'Alex Mercer (Starlight Global)',
        amount: 245000,
        tax_amount: 19600,
        due_date: '2025-06-15',
        payment_status: 'Paid'
      }
    ]
  },
  {
    id: 'volosc-payments',
    appNumber: 52,
    name: 'VoloSC Payments',
    category: 'Finance',
    tagline: 'Multi-rail payment gateway, UPI instant settlement, ACH/SEPA bank payouts & dispute handling',
    iconName: 'CreditCard',
    menus: ['Dashboard', 'All Records', 'Captured Payments', 'Settlements & Payouts', 'Refunds', 'UPI QR Transactions', 'Disputes', 'Settings'],
    buttons: ['Charge Card', 'Issue Refund', 'Initiate Bank Payout', 'Generate QR Code', 'Export Settlement'],
    functions: 'Online payments capture karna, merchant payouts settle karna aur financial receipts generate karna.',
    schemaFields: [
      { key: 'payment_id', label: 'Payment ID', type: 'text', required: true },
      { key: 'invoice_id', label: 'Linked Invoice ID', type: 'text', required: true },
      { key: 'customer_name', label: 'Payer Name', type: 'text', required: true },
      { key: 'amount', label: 'Amount Settled ($)', type: 'currency', required: true },
      { key: 'gateway_reference', label: 'Gateway Ref / UTR', type: 'text', required: true },
      { key: 'settlement_status', label: 'Settlement Status', type: 'select', options: ['Authorized', 'Settled', 'Refunded', 'In Escrow'] }
    ],
    kpis: [
      { label: 'Gross Volume Settled', value: '$8,940,000', change: '+32.4%', isPositive: true },
      { label: 'Settlement Speed', value: 'T+0 Instant', change: 'Zero Wait', isPositive: true },
      { label: 'Payment Success Rate', value: '99.8%', change: 'Highest Rail', isPositive: true },
      { label: 'Dispute Win Rate', value: '94.2%', change: 'Protected', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-PAY-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_settlements',
        status: 'Settled',
        deleted_at: null,
        payment_id: 'PAY-1001',
        invoice_id: 'INV-3001',
        customer_name: 'Starlight Global Technologies',
        amount: 245000,
        gateway_reference: 'STRIPE_PI_994827104_SETTLED',
        settlement_status: 'Settled'
      }
    ]
  },

  // ==========================================
  // 5. Education & Collaboration (Apps 53 - 71)
  // ==========================================
  {
    id: 'volosc-classes',
    appNumber: 53,
    name: 'VoloSC Classes',
    category: 'Education & Collaboration',
    tagline: 'Virtual classroom sessions, attendance tracking, whiteboard notes & student quizzes',
    iconName: 'GraduationCap',
    menus: ['Dashboard', 'All Records', 'Active Classrooms', 'Class Schedules', 'Attendance Logs', 'Quizzes', 'Assignments'],
    buttons: ['Start Class', 'Take Attendance', 'Share Whiteboard', 'Launch Quiz', 'Export Grades'],
    functions: 'Interactive virtual classes conduct karna, student attendance track karna aur digital quizzes manage karna.',
    schemaFields: [
      { key: 'class_id', label: 'Class ID', type: 'text', required: true },
      { key: 'class_name', label: 'Class Subject', type: 'text', required: true },
      { key: 'instructor_name', label: 'Instructor', type: 'text', required: true },
      { key: 'enrolled_count', label: 'Enrolled Students', type: 'number', required: true },
      { key: 'attendance_pct', label: 'Attendance Rate (%)', type: 'number' }
    ],
    kpis: [
      { label: 'Classes Conducted', value: '620 Classes', change: '+24%', isPositive: true },
      { label: 'Active Students', value: '18,400', change: 'Global', isPositive: true },
      { label: 'Avg Attendance', value: '94.2%', change: '+3.1%', isPositive: true },
      { label: 'Quiz Completion', value: '91.8%', change: 'High', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-CLS-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_instructor_01',
        status: 'In Progress',
        deleted_at: null,
        class_id: 'CLS-CS-401',
        class_name: 'Distributed Systems & Database Sharding',
        instructor_name: 'Prof. Alan Vance',
        enrolled_count: 65,
        attendance_pct: 96
      }
    ]
  },
  {
    id: 'volosc-mail',
    appNumber: 54,
    name: 'VoloSC Mail',
    category: 'Education & Collaboration',
    tagline: 'Enterprise ad-free custom domain email, S/MIME encryption, zero-spam filter & aliases',
    iconName: 'Mail',
    menus: ['Dashboard', 'All Records', 'Inbox', 'Sent', 'Drafts', 'Starred', 'Spam Quarantine', 'Archive', 'Settings'],
    buttons: ['Compose', 'Reply', 'Forward', 'Archive', 'Mark as Spam', 'Sync Domain Mail'],
    functions: 'Enterprise secure corporate email communication host aur deliver karna.',
    schemaFields: [
      { key: 'message_id', label: 'Message ID', type: 'text', required: true },
      { key: 'from_address', label: 'From', type: 'email', required: true },
      { key: 'to_address', label: 'To', type: 'email', required: true },
      { key: 'subject', label: 'Subject', type: 'text', required: true },
      { key: 'body_snippet', label: 'Message Preview', type: 'text' },
      { key: 'sent_at', label: 'Timestamp', type: 'date', required: true }
    ],
    kpis: [
      { label: 'Mailboxes Hosted', value: '2,480 Inboxes', change: '100% Uptime', isPositive: true },
      { label: 'Spam Blocked', value: '99.99%', change: 'Zero False Positives', isPositive: true },
      { label: 'Daily Emails Processed', value: '142,000', change: 'Sub-second delivery', isPositive: true },
      { label: 'Storage Allocated', value: '48 TB', change: 'Cloud Replicated', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-MAL-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Read',
        deleted_at: null,
        message_id: 'MSG-2025-001',
        from_address: 'a.mercer@starlight.io',
        to_address: 'sarah.chen@volosc.com',
        subject: 'Confirmed Purchase Order & Architecture Approval',
        body_snippet: 'We have approved PO-9001 and signed the MSA. Ready for onboarding.',
        sent_at: TODAY
      }
    ]
  },
  {
    id: 'volosc-workdrive',
    appNumber: 55,
    name: 'VoloSC WorkDrive',
    category: 'Education & Collaboration',
    tagline: 'Team file cloud storage, granular role permissions, real-time sync & enterprise document preview',
    iconName: 'HardDrive',
    menus: ['Dashboard', 'All Records', 'Team Folders', 'My Drive', 'Shared With Me', 'Recent Files', 'Trash', 'Admin Audit'],
    buttons: ['Upload File', 'New Folder', 'Share Secure Link', 'Manage Permissions', 'Restore Version'],
    functions: 'Cloud document storage, team folder sharing aur version control manage karna.',
    schemaFields: [
      { key: 'file_id', label: 'File ID', type: 'text', required: true },
      { key: 'file_name', label: 'File Name', type: 'text', required: true },
      { key: 'folder_path', label: 'Folder Path', type: 'text', required: true },
      { key: 'size_mb', label: 'Size (MB)', type: 'number', required: true },
      { key: 'file_type', label: 'File Type', type: 'select', options: ['PDF Document', 'Spreadsheet', 'Presentation', 'ZIP Archive', 'Design File'] },
      { key: 'uploaded_by', label: 'Uploader', type: 'text', required: true }
    ],
    kpis: [
      { label: 'Total Files Stored', value: '380,000 Files', change: '24 TB Used', isPositive: true },
      { label: 'Virus & Ransomware Scan', value: '100% Clean', change: 'Encrypted at Rest', isPositive: true },
      { label: 'Active Collaborators', value: '4,280', change: '+18%', isPositive: true },
      { label: 'Link Share Views', value: '64,000 / mo', change: 'Fast Global CDN', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-WKD-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Active',
        deleted_at: null,
        file_id: 'FILE-MSA-STARLIGHT-V4',
        file_name: 'Starlight_Global_Enterprise_Contract_Signed.pdf',
        folder_path: '/Enterprise Contracts/2025/Q2',
        size_mb: 4.8,
        file_type: 'PDF Document',
        uploaded_by: 'Sarah Chen'
      }
    ]
  },
  {
    id: 'volosc-learn',
    appNumber: 56,
    name: 'VoloSC Learn',
    category: 'Education & Collaboration',
    tagline: 'Corporate employee learning management system, onboarding modules & skill tracks',
    iconName: 'BookMarked',
    menus: ['Dashboard', 'All Records', 'Training Modules', 'Employee Progress', 'Skills Matrix', 'Certificates', 'Reports'],
    buttons: ['Assign Training', 'Create Module', 'Track Completion', 'Issue Badge', 'Export Compliance'],
    functions: 'Internal employee compliance training, onboarding courses aur skill development track karna.',
    schemaFields: [
      { key: 'module_id', label: 'Module ID', type: 'text', required: true },
      { key: 'module_title', label: 'Course / Module Title', type: 'text', required: true },
      { key: 'department', label: 'Target Department', type: 'text', required: true },
      { key: 'completion_rate', label: 'Completion Rate (%)', type: 'number', required: true },
      { key: 'duration_hours', label: 'Duration (Hours)', type: 'number' }
    ],
    kpis: [
      { label: 'Mandatory Compliance Rate', value: '99.4%', change: 'SOC2 Compliant', isPositive: true },
      { label: 'Hours of Learning Completed', value: '8,420 hrs', change: '+29%', isPositive: true },
      { label: 'Certificates Issued', value: '640 Badges', change: 'Verified', isPositive: true },
      { label: 'Active Courses', value: '38 Modules', change: 'Self-paced', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-LRN-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_hr_lead',
        status: 'Active',
        deleted_at: null,
        module_id: 'MOD-SEC-SOC2',
        module_title: 'Annual Information Security & HIPAA Compliance 2025',
        department: 'All Departments',
        completion_rate: 98,
        duration_hours: 2.5
      }
    ]
  },
  {
    id: 'volosc-cliq',
    appNumber: 57,
    name: 'VoloSC Cliq',
    category: 'Education & Collaboration',
    tagline: 'Team business chat, persistent channels, bot integrations & audio/video huddles',
    iconName: 'MessageSquare',
    menus: ['Dashboard', 'All Records', 'Channels', 'Direct Messages', 'Bots & Shortcuts', 'Huddles', 'Search Messages'],
    buttons: ['Create Channel', 'Send Message', 'Start Huddle', 'Add Bot', 'Mute Notifications'],
    functions: 'Fast company chat channels, team direct messaging aur bot automation workflows.',
    schemaFields: [
      { key: 'channel_id', label: 'Channel ID', type: 'text', required: true },
      { key: 'channel_name', label: 'Channel Name', type: 'text', required: true },
      { key: 'members_count', label: 'Members', type: 'number', required: true },
      { key: 'is_private', label: 'Visibility', type: 'select', options: ['Public Channel', 'Private Channel', 'Announcement Only'] },
      { key: 'latest_activity', label: 'Last Message Snippet', type: 'text' }
    ],
    kpis: [
      { label: 'Messages Sent Today', value: '84,200', change: '+12%', isPositive: true },
      { label: 'Active Team Channels', value: '148', change: 'Cross-functional', isPositive: true },
      { label: 'Huddles Hosted', value: '64 Today', change: 'Instant Audio/Video', isPositive: true },
      { label: 'Bot Automations Executed', value: '12,900', change: 'Auto Alerts', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-CLQ-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_admin',
        status: 'Active',
        deleted_at: null,
        channel_id: 'CHN-SALES-WINS',
        channel_name: '#sales-announcements',
        members_count: 88,
        is_private: 'Public Channel',
        latest_activity: '🎉 Congrats Sarah Chen for closing $245K deal with Starlight Global!'
      }
    ]
  },
  {
    id: 'volosc-connect',
    appNumber: 58,
    name: 'VoloSC Connect',
    category: 'Education & Collaboration',
    tagline: 'Internal corporate social network, CEO townhall feeds, employee recognition & polls',
    iconName: 'Share2',
    menus: ['Dashboard', 'All Records', 'Company Feed', 'Townhalls', 'Kudos & Recognition', 'Polls', 'Groups', 'Settings'],
    buttons: ['Share Post', 'Give Kudos', 'Create Poll', 'Schedule Townhall', 'Comment'],
    functions: 'Company-wide updates share karna, employee appreciation aur culture building feeds.',
    schemaFields: [
      { key: 'post_id', label: 'Post ID', type: 'text', required: true },
      { key: 'author_name', label: 'Author', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'content', label: 'Announcement / Post', type: 'text', required: true },
      { key: 'likes_count', label: 'Likes & Reactions', type: 'number' },
      { key: 'comments_count', label: 'Comments', type: 'number' }
    ],
    kpis: [
      { label: 'Employee Engagement', value: '94.2%', change: '+8.4%', isPositive: true },
      { label: 'Kudos Given This Month', value: '412 Badges', change: 'High Morale', isPositive: true },
      { label: 'Townhall Attendees', value: '100% Live Attendance', change: 'Company-wide', isPositive: true },
      { label: 'Active Work Groups', value: '34 Groups', change: 'Collaborative', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-CON-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_ceo',
        status: 'Pinned',
        deleted_at: null,
        post_id: 'PST-CONNECT-101',
        author_name: 'CEO Office',
        department: 'Executive Leadership',
        content: 'Excited to announce our Q2 milestone: VoloSC has reached 10,000+ active enterprise users globally!',
        likes_count: 184,
        comments_count: 32
      }
    ]
  },
  {
    id: 'volosc-meeting',
    appNumber: 59,
    name: 'VoloSC Meeting',
    category: 'Education & Collaboration',
    tagline: 'HD encrypted video conferences, AI meeting summaries, screen share & breakout rooms',
    iconName: 'Video',
    menus: ['Dashboard', 'All Records', 'Upcoming Meetings', 'Past Recordings', 'Meeting Transcripts', 'Room Systems', 'Settings'],
    buttons: ['Start Instant Meeting', 'Schedule Call', 'Copy Invite Link', 'Download Transcript', 'Mute All'],
    functions: 'Video calls conduct karna, AI auto-summaries generate karna aur screen sharing facilitate karna.',
    schemaFields: [
      { key: 'meeting_id', label: 'Meeting ID', type: 'text', required: true },
      { key: 'topic', label: 'Meeting Topic', type: 'text', required: true },
      { key: 'host_name', label: 'Host', type: 'text', required: true },
      { key: 'participants_count', label: 'Participants', type: 'number', required: true },
      { key: 'scheduled_time', label: 'Time', type: 'date', required: true },
      { key: 'duration_minutes', label: 'Duration (min)', type: 'number' }
    ],
    kpis: [
      { label: 'Meetings Held This Month', value: '4,820 Calls', change: 'HD Video', isPositive: true },
      { label: 'Total Minutes Streamed', value: '184,000 mins', change: '99.99% Reliability', isPositive: true },
      { label: 'AI Summaries Generated', value: '3,890 Summaries', change: 'Saved 900 hrs', isPositive: true },
      { label: 'Zero Lag Audio/Video', value: 'WebRTC Low Latency', change: '< 45ms', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-MTG-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Completed',
        deleted_at: null,
        meeting_id: 'MTG-2025-441',
        topic: 'Executive Architecture Review & ERP Sign-off',
        host_name: 'Sarah Chen',
        participants_count: 8,
        scheduled_time: '2025-05-18T11:00:00Z',
        duration_minutes: 45
      }
    ]
  },
  {
    id: 'volosc-notebook',
    appNumber: 60,
    name: 'VoloSC Notebook',
    category: 'Education & Collaboration',
    tagline: 'Multi-card visual note-taking, rich text, audio memos, checklists & cloud sync',
    iconName: 'StickyNote',
    menus: ['Dashboard', 'All Records', 'All Notebooks', 'Checklists', 'Audio Memos', 'Web Clippings', 'Trash'],
    buttons: ['New Note', 'Create Notebook', 'Record Voice Note', 'Share Card', 'Tag Note'],
    functions: 'Quick notes take karna, voice recordings save karna aur idea cards organize karna.',
    schemaFields: [
      { key: 'note_id', label: 'Note ID', type: 'text', required: true },
      { key: 'notebook_name', label: 'Notebook Name', type: 'text', required: true },
      { key: 'title', label: 'Note Title', type: 'text', required: true },
      { key: 'card_type', label: 'Card Type', type: 'select', options: ['Rich Text', 'Checklist', 'Audio Memo', 'Code Snippet', 'Attachment'] },
      { key: 'snippet', label: 'Content Snippet', type: 'text' }
    ],
    kpis: [
      { label: 'Total Saved Notes', value: '28,400 Notes', change: 'Synced Cloud', isPositive: true },
      { label: 'Voice Memos Transcribed', value: '2,410 Memos', change: 'AI Speech-to-Text', isPositive: true },
      { label: 'Active Notebooks', value: '412', change: 'Organized', isPositive: true },
      { label: 'Tags Assigned', value: '1,890 Tags', change: 'Quick Search', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-NTB-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_marcus_vance',
        status: 'Active',
        deleted_at: null,
        note_id: 'NOTE-101',
        notebook_name: 'Enterprise Client Discovery',
        title: 'Key Security Requirements for Starlight Global',
        card_type: 'Checklist',
        snippet: '1. SOC2 Type II compliance check; 2. Customer-managed encryption keys (CMEK); 3. SSO SAML 2.0'
      }
    ]
  },
  {
    id: 'volosc-teaminbox',
    appNumber: 61,
    name: 'VoloSC TeamInbox',
    category: 'Education & Collaboration',
    tagline: 'Shared team email addresses (sales@, support@), collision detection & internal discussions',
    iconName: 'Inbox',
    menus: ['Dashboard', 'All Records', 'Shared Inboxes', 'Assigned to Me', 'Unassigned', 'Team Comments', 'Archived'],
    buttons: ['Assign Email', 'Internal Discussion', 'Reply Customer', 'Apply Tag', 'Close Thread'],
    functions: 'Shared group emails manage karna bina duplicate replies ya email collision ke.',
    schemaFields: [
      { key: 'thread_id', label: 'Thread ID', type: 'text', required: true },
      { key: 'shared_mailbox', label: 'Shared Mailbox', type: 'select', options: ['sales@volosc.com', 'support@volosc.com', 'billing@volosc.com', 'partners@volosc.com'] },
      { key: 'from_sender', label: 'Customer Sender', type: 'email', required: true },
      { key: 'subject', label: 'Subject', type: 'text', required: true },
      { key: 'assigned_rep', label: 'Assigned Specialist', type: 'text' },
      { key: 'thread_status', label: 'Status', type: 'select', options: ['Unassigned', 'In Progress', 'Waiting on Customer', 'Closed'] }
    ],
    kpis: [
      { label: 'Shared Inboxes Managed', value: '14 Mailboxes', change: 'Zero Clutter', isPositive: true },
      { label: 'Collision Prevention', value: '100% Guaranteed', change: 'Real-time Lock', isPositive: true },
      { label: 'Avg Resolution Time', value: '3.2 Hours', change: '-45% faster', isPositive: true },
      { label: 'Closed Threads This Week', value: '940', change: 'Resolved', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-TIB-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'In Progress',
        deleted_at: null,
        thread_id: 'TIN-4401',
        shared_mailbox: 'sales@volosc.com',
        from_sender: 'a.mercer@starlight.io',
        subject: 'Inquiry: Enterprise migration timeline and SLA commitments',
        assigned_rep: 'Sarah Chen',
        thread_status: 'In Progress'
      }
    ]
  },
  {
    id: 'volosc-tables',
    appNumber: 62,
    name: 'VoloSC Tables',
    category: 'Education & Collaboration',
    tagline: 'No-code relational database spreadsheet, formulas, linked record lookups & kanban views',
    iconName: 'Database',
    menus: ['Dashboard', 'All Records', 'All Tables', 'Kanban View', 'Calendar View', 'Grid View', 'Formulas', 'Automations'],
    buttons: ['New Row', 'Add Column', 'Switch View', 'Link Records', 'Import CSV', 'Export JSON'],
    functions: 'Airtable-style interactive database tables create karna, linked relationships aur automated formulas ke sath.',
    schemaFields: [
      { key: 'row_id', label: 'Row ID', type: 'text', required: true },
      { key: 'table_name', label: 'Table Name', type: 'text', required: true },
      { key: 'record_title', label: 'Record Name', type: 'text', required: true },
      { key: 'stage', label: 'Workflow Stage', type: 'select', options: ['Backlog', 'Design', 'In Development', 'Testing', 'Done'] },
      { key: 'assigned_lead', label: 'Assigned Lead', type: 'text' },
      { key: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] }
    ],
    kpis: [
      { label: 'Active Relational Tables', value: '142 Tables', change: 'Enterprise No-Code', isPositive: true },
      { label: 'Total Rows Managed', value: '2.8M Rows', change: 'High Performance', isPositive: true },
      { label: 'Linked Lookups Synced', value: '100% Real-time', change: 'Zero Latency', isPositive: true },
      { label: 'Active Views Configured', value: '540 Views', change: 'Kanban/Grid', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-TBL-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_pm_01',
        status: 'In Development',
        deleted_at: null,
        row_id: 'ROW-TBL-882',
        table_name: 'Product Roadmap 2025',
        record_title: 'Implement Multi-Region Cloud Database Replicas',
        stage: 'In Development',
        assigned_lead: 'Marcus Vance',
        priority: 'High'
      }
    ]
  },
  {
    id: 'volosc-writer',
    appNumber: 63,
    name: 'VoloSC Writer',
    category: 'Education & Collaboration',
    tagline: 'Distraction-free collaborative word processor, real-time multi-cursor editing & grammar assistant',
    iconName: 'FileText',
    menus: ['Dashboard', 'All Records', 'Documents', 'Templates', 'Track Changes', 'Version History', 'Export DOCX/PDF'],
    buttons: ['New Document', 'Share Link', 'Track Changes', 'Export Word (.docx)', 'Download PDF'],
    functions: 'Word documents create aur edit karna, real-time multi-user live editing aur change tracking.',
    schemaFields: [
      { key: 'doc_id', label: 'Document ID', type: 'text', required: true },
      { key: 'document_name', label: 'Document Title', type: 'text', required: true },
      { key: 'author', label: 'Primary Author', type: 'text', required: true },
      { key: 'collaborators_count', label: 'Active Collaborators', type: 'number', required: true },
      { key: 'word_count', label: 'Word Count', type: 'number' },
      { key: 'last_saved', label: 'Last Saved', type: 'date' }
    ],
    kpis: [
      { label: 'Documents Authored', value: '48,200 Docs', change: 'Cloud Word Processor', isPositive: true },
      { label: 'Real-Time Multi-Cursors', value: 'Up to 50 Co-Editors', change: 'Conflict-Free CRDT', isPositive: true },
      { label: 'Grammar Suggestions', value: '98% Accepted', change: 'AI Enhanced', isPositive: true },
      { label: 'Export Compatibility', value: '100% DOCX/PDF', change: 'Pixel Perfect', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-WRT-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Active',
        deleted_at: null,
        doc_id: 'DOC-EXEC-PROP-01',
        document_name: 'VoloSC Enterprise Cloud Executive Architecture Proposal.docx',
        author: 'Sarah Chen',
        collaborators_count: 4,
        word_count: 4250,
        last_saved: TODAY
      }
    ]
  },
  {
    id: 'volosc-vani',
    appNumber: 64,
    name: 'VoloSC Vani',
    category: 'Education & Collaboration',
    tagline: 'Infinite collaborative virtual whiteboard, sticky notes, architectural diagrams & user flow maps',
    iconName: 'Palette',
    menus: ['Dashboard', 'All Records', 'Canvas Boards', 'Diagrams', 'Sticky Notes', 'Architecture Templates', 'Export Image'],
    buttons: ['Create Board', 'Add Sticky Note', 'Draw Connector', 'Export High-Res PNG', 'Present Canvas'],
    functions: 'Virtual visual boards par brainstorm karna, flowcharts draw karna aur system architecture map karna.',
    schemaFields: [
      { key: 'board_id', label: 'Board ID', type: 'text', required: true },
      { key: 'board_title', label: 'Board Title', type: 'text', required: true },
      { key: 'diagram_type', label: 'Diagram Type', type: 'select', options: ['System Architecture', 'Flowchart', 'Mind Map', 'Sprint Retro', 'Wireframe'] },
      { key: 'elements_count', label: 'Canvas Elements', type: 'number', required: true },
      { key: 'created_by_user', label: 'Owner', type: 'text', required: true }
    ],
    kpis: [
      { label: 'Active Visual Boards', value: '1,840 Boards', change: 'Infinite Canvas', isPositive: true },
      { label: 'Collaborative Sticky Notes', value: '64,000+', change: 'Real-time Brainstorming', isPositive: true },
      { label: 'Architecture Diagrams', value: '420 Blueprints', change: 'Engineering Standard', isPositive: true },
      { label: 'Export Quality', value: '4K Vector SVG/PNG', change: 'Crisp', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-VAN-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_architect_01',
        status: 'Active',
        deleted_at: null,
        board_id: 'BRD-ARCH-2025',
        board_title: 'VoloSC End-to-End Enterprise Data Flow Topology',
        diagram_type: 'System Architecture',
        elements_count: 142,
        created_by_user: 'Marcus Vance'
      }
    ]
  },
  {
    id: 'volosc-sheet',
    appNumber: 65,
    name: 'VoloSC Sheet',
    category: 'Education & Collaboration',
    tagline: 'Enterprise collaborative spreadsheet, 400+ mathematical formulas, pivot tables & chart generator',
    iconName: 'Sheet',
    menus: ['Dashboard', 'All Records', 'Worksheets', 'Formulas Library', 'Pivot Tables', 'Charts & Graphs', 'Data Validation', 'Export XLSX'],
    buttons: ['New Sheet', 'Insert Formula', 'Create Pivot Table', 'Insert Chart', 'Import CSV', 'Download XLSX'],
    functions: 'Complex financial modeling sheets create karna, 400+ spreadsheet formulas aur pivot tables ke sath.',
    schemaFields: [
      { key: 'sheet_id', label: 'Sheet ID', type: 'text', required: true },
      { key: 'sheet_name', label: 'Spreadsheet Name', type: 'text', required: true },
      { key: 'total_rows', label: 'Total Rows', type: 'number', required: true },
      { key: 'formulas_count', label: 'Formulas In Use', type: 'number', required: true },
      { key: 'pivots_count', label: 'Pivot Tables', type: 'number' },
      { key: 'last_modified', label: 'Last Modified', type: 'date' }
    ],
    kpis: [
      { label: 'Spreadsheets Maintained', value: '34,200 Sheets', change: 'High Precision', isPositive: true },
      { label: 'Supported Formulas', value: '450+ Excel Standard', change: 'SUMIFS, VLOOKUP, XLOOKUP', isPositive: true },
      { label: 'Max Row Capacity', value: '1,000,000 Rows/Sheet', change: 'In-Memory Engine', isPositive: true },
      { label: 'Real-time Calculations', value: '< 10ms', change: 'WebAssembly Powered', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SHT-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_cfo',
        status: 'Active',
        deleted_at: null,
        sheet_id: 'SHT-FIN-MODEL-2025',
        sheet_name: 'VoloSC Q2-Q4 Comprehensive Enterprise Revenue Model.xlsx',
        total_rows: 14500,
        formulas_count: 320,
        pivots_count: 6,
        last_modified: TODAY
      }
    ]
  },
  {
    id: 'volosc-show',
    appNumber: 66,
    name: 'VoloSC Show',
    category: 'Education & Collaboration',
    tagline: 'Professional presentation slides, smooth animations, presenter notes & remote broadcast',
    iconName: 'Presentation',
    menus: ['Dashboard', 'All Records', 'Slide Decks', 'Themes & Master Slides', 'Animations', 'Speaker Notes', 'Broadcast Mode', 'Export PPTX'],
    buttons: ['New Slide Deck', 'Add Slide', 'Present Fullscreen', 'Broadcast Link', 'Export PowerPoint (.pptx)'],
    functions: 'Corporate slide presentations build karna, animations add karna aur remote audience ko broadcast karna.',
    schemaFields: [
      { key: 'deck_id', label: 'Deck ID', type: 'text', required: true },
      { key: 'presentation_title', label: 'Presentation Title', type: 'text', required: true },
      { key: 'slides_count', label: 'Slides Count', type: 'number', required: true },
      { key: 'theme', label: 'Slide Theme', type: 'select', options: ['VoloSC Enterprise Midnight', 'Minimalist Clean', 'Corporate Blue', 'Gradient Dark'] },
      { key: 'presenter', label: 'Lead Presenter', type: 'text', required: true }
    ],
    kpis: [
      { label: 'Slide Decks Created', value: '8,410 Decks', change: 'Enterprise Presenter', isPositive: true },
      { label: 'Live Broadcast Audiences', value: '45,000 Viewers', change: 'Lag-Free', isPositive: true },
      { label: 'PPTX Export Fidelity', value: '100% Native', change: 'Full Formatting', isPositive: true },
      { label: 'Vector Icon Library', value: '10,000+ Assets', change: 'Built-in', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-SHW-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Active',
        deleted_at: null,
        deck_id: 'DECK-PITCH-2025',
        presentation_title: 'VoloSC Cloud Operating System - Enterprise Pitch Deck',
        slides_count: 24,
        theme: 'VoloSC Enterprise Midnight',
        presenter: 'Sarah Chen'
      }
    ]
  },
  {
    id: 'volosc-office-suite',
    appNumber: 67,
    name: 'VoloSC Office Suite',
    category: 'Education & Collaboration',
    tagline: 'Unified productivity office hub combining Writer, Sheet, Show & cloud documents in one portal',
    iconName: 'Briefcase',
    menus: ['Dashboard', 'All Records', 'Recent Office Files', 'Word Docs', 'Spreadsheets', 'Slide Decks', 'Shared Workspaces', 'Settings'],
    buttons: ['Create Document', 'Create Spreadsheet', 'Create Presentation', 'Bulk Share', 'Export All'],
    functions: 'Complete office suite productivity workspace replace karna Microsoft 365 aur Google Workspace ko.',
    schemaFields: [
      { key: 'workspace_file_id', label: 'File ID', type: 'text', required: true },
      { key: 'name', label: 'Workspace File Name', type: 'text', required: true },
      { key: 'app_type', label: 'Application', type: 'select', options: ['VoloSC Writer', 'VoloSC Sheet', 'VoloSC Show'] },
      { key: 'department', label: 'Department Access', type: 'text', required: true },
      { key: 'last_editor', label: 'Last Editor', type: 'text', required: true }
    ],
    kpis: [
      { label: 'Office Hub Users', value: '12,400 Staff', change: 'Unified Suite', isPositive: true },
      { label: 'Cross-App File Conversions', value: 'Instant', change: 'Zero Conversion Loss', isPositive: true },
      { label: 'License Cost Savings', value: '$840,000 / yr', change: 'Compared to M365', isPositive: true },
      { label: 'Cloud Documents Active', value: '94,000 Files', change: '100% Backed up', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-OFF-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_admin',
        status: 'Active',
        deleted_at: null,
        workspace_file_id: 'OFFICE-BUNDLE-01',
        name: 'Enterprise FY26 Strategic Plan & Financials',
        app_type: 'VoloSC Sheet',
        department: 'Corporate Strategy & Finance',
        last_editor: 'Marcus Vance'
      }
    ]
  },
  {
    id: 'volosc-office-integrator',
    appNumber: 68,
    name: 'VoloSC Office Integrator',
    category: 'Education & Collaboration',
    tagline: 'Headless document conversion APIs, programmatic template merging & document automation',
    iconName: 'Cpu',
    menus: ['Dashboard', 'All Records', 'API Keys', 'Conversion Pipelines', 'Template Generators', 'Webhook Logs', 'API Docs'],
    buttons: ['Generate API Token', 'Test Conversion Endpoint', 'Merge PDF Template', 'View Webhook Logs', 'Export Metrics'],
    functions: 'Third-party apps aur external codebases me document editing aur PDF conversions embed karna.',
    schemaFields: [
      { key: 'job_id', label: 'Conversion Job ID', type: 'text', required: true },
      { key: 'source_format', label: 'Source Format', type: 'select', options: ['DOCX', 'XLSX', 'PPTX', 'HTML', 'Markdown'] },
      { key: 'target_format', label: 'Target Format', type: 'select', options: ['PDF/A-1b', 'PNG', 'JSON', 'EPUB'] },
      { key: 'latency_ms', label: 'Conversion Latency (ms)', type: 'number', required: true },
      { key: 'api_client_name', label: 'Calling Client', type: 'text', required: true }
    ],
    kpis: [
      { label: 'Monthly API Document Jobs', value: '4.8M Conversions', change: '+28%', isPositive: true },
      { label: 'Average Render Latency', value: '88ms', change: 'Lightning Fast', isPositive: true },
      { label: 'API Uptime SLA', value: '99.999%', change: 'Mission Critical', isPositive: true },
      { label: 'Active Developer Keys', value: '640 Tokens', change: 'Global', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-OFI-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_dev_01',
        status: 'Completed',
        deleted_at: null,
        job_id: 'JOB-CONV-88219',
        source_format: 'DOCX',
        target_format: 'PDF/A-1b',
        latency_ms: 74,
        api_client_name: 'Starlight Auto-Billing Microservice'
      }
    ]
  },
  {
    id: 'volosc-calendar',
    appNumber: 69,
    name: 'VoloSC Calendar',
    category: 'Education & Collaboration',
    tagline: 'Enterprise multi-calendar scheduling, resource conference room bookings & timezone auto-shift',
    iconName: 'Calendar',
    menus: ['Dashboard', 'All Records', 'Month View', 'Week View', 'Day View', 'Resource Rooms', 'Shared Calendars', 'Settings'],
    buttons: ['New Event', 'Book Meeting Room', 'Share Calendar', 'Find Common Time', 'Sync CalDAV'],
    functions: 'Team calendars sync karna, conference rooms book karna aur automated timezone adjustments.',
    schemaFields: [
      { key: 'event_id', label: 'Event ID', type: 'text', required: true },
      { key: 'title', label: 'Event Title', type: 'text', required: true },
      { key: 'start_time', label: 'Start Time', type: 'date', required: true },
      { key: 'end_time', label: 'End Time', type: 'date', required: true },
      { key: 'location_or_room', label: 'Room / Video Link', type: 'text', required: true },
      { key: 'attendees_count', label: 'Attendees', type: 'number', required: true }
    ],
    kpis: [
      { label: 'Scheduled Events', value: '18,400', change: 'This Month', isPositive: true },
      { label: 'Room Utilization Rate', value: '84.2%', change: 'Optimal', isPositive: true },
      { label: 'Timezone Conflicts Avoided', value: '100% Synced', change: 'Auto-Adjusted', isPositive: true },
      { label: 'External Calendar Syncs', value: 'Google/Outlook CalDAV', change: 'Real-time', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-CAL-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'Confirmed',
        deleted_at: null,
        event_id: 'EVT-CAL-991',
        title: 'Quarterly Strategic Board of Directors Meeting',
        start_time: '2025-05-20T14:00:00Z',
        end_time: '2025-05-20T16:00:00Z',
        location_or_room: 'Boardroom West 4A / VoloSC Meeting Link',
        attendees_count: 12
      }
    ]
  },
  {
    id: 'volosc-todo',
    appNumber: 70,
    name: 'VoloSC ToDo',
    category: 'Education & Collaboration',
    tagline: 'Personal and team action items, priority matrices, sub-tasks & deadline notifications',
    iconName: 'CheckCircle2',
    menus: ['Dashboard', 'All Records', 'Today Tasks', 'Upcoming', 'Important & High Priority', 'Assigned to Me', 'Completed', 'Lists'],
    buttons: ['Add Task', 'Complete Task', 'Set Due Date', 'Assign Colleague', 'Prioritize P1'],
    functions: 'Daily action items track karna, deadlines aur reminder notifications manage karna.',
    schemaFields: [
      { key: 'task_id', label: 'Task ID', type: 'text', required: true },
      { key: 'task_title', label: 'Task Description', type: 'text', required: true },
      { key: 'due_date', label: 'Due Date', type: 'date', required: true },
      { key: 'priority', label: 'Priority', type: 'select', options: ['P1 - Urgent', 'P2 - High', 'P3 - Medium', 'P4 - Low'] },
      { key: 'assigned_user', label: 'Assigned User', type: 'text', required: true },
      { key: 'task_status', label: 'Task Status', type: 'select', options: ['Pending', 'In Progress', 'Completed'] }
    ],
    kpis: [
      { label: 'Tasks Completed Today', value: '412 Tasks', change: '+18%', isPositive: true },
      { label: 'On-Time Completion Rate', value: '94.8%', change: '+3.2%', isPositive: true },
      { label: 'Active Projects Monitored', value: '68 Lists', change: 'Organized', isPositive: true },
      { label: 'Overdue Tasks', value: '4 Tasks', change: 'Low Queue', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-TOD-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_sarah_chen',
        status: 'In Progress',
        deleted_at: null,
        task_id: 'TSK-9901',
        task_title: 'Finalize Starlight Global Enterprise Provisioning and Onboarding Checklist',
        due_date: '2025-05-19',
        priority: 'P1 - Urgent',
        assigned_user: 'Sarah Chen',
        task_status: 'In Progress'
      }
    ]
  },
  {
    id: 'volosc-pdf-editor',
    appNumber: 71,
    name: 'VoloSC PDF Editor',
    category: 'Education & Collaboration',
    tagline: 'Professional PDF document editing, page reordering, redacting, OCR text recognition & form filling',
    iconName: 'FileEdit',
    menus: ['Dashboard', 'All Records', 'My PDF Files', 'Page Organizers', 'Form Fillers', 'Redaction Tools', 'OCR Scans', 'Export'],
    buttons: ['Upload PDF', 'Edit Text', 'Add Form Field', 'Redact Sensitive Info', 'Split/Merge Pages', 'Download Final PDF'],
    functions: 'PDF documents edit karna, sensitive data redact karna aur fillable forms compile karna.',
    schemaFields: [
      { key: 'pdf_id', label: 'PDF ID', type: 'text', required: true },
      { key: 'file_name', label: 'PDF Document Name', type: 'text', required: true },
      { key: 'page_count', label: 'Pages', type: 'number', required: true },
      { key: 'is_encrypted', label: 'Encrypted Password Protected', type: 'select', options: ['Yes (AES-256)', 'No'] },
      { key: 'ocr_status', label: 'OCR Text Status', type: 'select', options: ['Extracted & Searchable', 'Pending', 'N/A'] }
    ],
    kpis: [
      { label: 'PDFs Processed This Month', value: '64,200 Files', change: '+35%', isPositive: true },
      { label: 'OCR Recognition Accuracy', value: '99.8%', change: 'Multi-Language', isPositive: true },
      { label: 'Average Processing Speed', value: '1.2s / 50 Pages', change: 'Instant WebAssembly', isPositive: true },
      { label: 'Redacted Sensitive Records', value: '14,800 PII Fields', change: 'HIPAA Compliant', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-PDF-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_legal_01',
        status: 'Completed',
        deleted_at: null,
        pdf_id: 'PDF-LEGAL-772',
        file_name: 'VoloSC_Master_SLA_Terms_Redacted.pdf',
        page_count: 32,
        is_encrypted: 'Yes (AES-256)',
        ocr_status: 'Extracted & Searchable'
      }
    ]
  },

  // ==========================================
  // 6. HR Applications (App 72)
  // ==========================================
  {
    id: 'volosc-people',
    appNumber: 72,
    name: 'VoloSC People',
    category: 'HR',
    tagline: 'Complete enterprise Human Resource Management System (HRMS), leave tracking, performance & directory',
    iconName: 'Users2',
    menus: ['Dashboard', 'All Records', 'Employee Directory', 'Leave & Attendance', 'Performance Reviews', 'Timesheets', 'Hiring & Onboarding', 'Org Chart', 'Settings'],
    buttons: ['Add Employee', 'Apply Leave', 'Approve Timeoff', 'Initiate Appraisal', 'Export HR Report', 'View Org Chart'],
    functions: 'Employee database, leave balance management, attendance tracking aur 360° performance appraisals.',
    schemaFields: [
      { key: 'employee_id', label: 'Employee ID', type: 'text', required: true },
      { key: 'first_name', label: 'First Name', type: 'text', required: true },
      { key: 'last_name', label: 'Last Name', type: 'text', required: true },
      { key: 'email', label: 'Work Email', type: 'email', required: true },
      { key: 'job_title', label: 'Job Title', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'select', options: ['Executive Leadership', 'Engineering & Cloud', 'Sales & Growth', 'Finance & Accounting', 'Customer Experience', 'Human Resources'] },
      { key: 'employment_type', label: 'Employment Type', type: 'select', options: ['Full-Time Permanent', 'Contractor', 'Part-Time', 'Executive'] },
      { key: 'manager', label: 'Reporting Manager', type: 'text', required: true },
      { key: 'date_of_joining', label: 'Joining Date', type: 'date', required: true },
      { key: 'leave_balance_days', label: 'Available Paid Leave (Days)', type: 'number' }
    ],
    kpis: [
      { label: 'Total Headcount', value: '248 Employees', change: '+14 this quarter', isPositive: true },
      { label: 'Employee Retention Rate', value: '96.4%', change: 'Top Quartile', isPositive: true },
      { label: 'Avg Leave Utilization', value: '14.2 Days', change: 'Healthy Work-Life', isPositive: true },
      { label: 'Performance Review Score', value: '4.6 / 5.0', change: '+0.2', isPositive: true }
    ],
    initialRecords: [
      {
        id: 'REC-PPL-001',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_hr_lead',
        status: 'Active',
        deleted_at: null,
        employee_id: 'EMP-001',
        first_name: 'Sarah',
        last_name: 'Chen',
        email: 'sarah.chen@volosc.com',
        job_title: 'VP of Enterprise Sales',
        department: 'Sales & Growth',
        employment_type: 'Full-Time Permanent',
        manager: 'Executive Leadership',
        date_of_joining: '2023-01-15',
        leave_balance_days: 18
      },
      {
        id: 'REC-PPL-002',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_hr_lead',
        status: 'Active',
        deleted_at: null,
        employee_id: 'EMP-002',
        first_name: 'Marcus',
        last_name: 'Vance',
        email: 'marcus.vance@volosc.com',
        job_title: 'Chief Solutions Architect',
        department: 'Engineering & Cloud',
        employment_type: 'Full-Time Permanent',
        manager: 'Executive Leadership',
        date_of_joining: '2023-03-01',
        leave_balance_days: 21
      },
      {
        id: 'REC-PPL-003',
        organization_id: DEFAULT_ORG,
        created_by: DEFAULT_USER,
        created_at: TODAY,
        updated_by: DEFAULT_USER,
        updated_at: TODAY,
        owner_id: 'usr_hr_lead',
        status: 'Active',
        deleted_at: null,
        employee_id: 'EMP-003',
        first_name: 'Elena',
        last_name: 'Rostova',
        email: 'elena.rostova@volosc.com',
        job_title: 'Head of Customer Success',
        department: 'Customer Experience',
        employment_type: 'Full-Time Permanent',
        manager: 'Executive Leadership',
        date_of_joining: '2023-06-10',
        leave_balance_days: 16
      }
    ]
  }
];

// Helper to look up any of the 72 apps by ID or app number
export function getAppById(appId: string): VoloAppDefinition | undefined {
  return VOLO_72_APPS.find((app) => app.id === appId);
}

export function getAppByNumber(num: number): VoloAppDefinition | undefined {
  return VOLO_72_APPS.find((app) => app.appNumber === num);
}

// Category summary breakdown
export const CATEGORY_SUMMARIES = [
  { name: 'Sales & CRM', count: 21, range: 'Apps 1 - 21', color: 'from-blue-600 to-indigo-600', border: 'border-blue-500/30' },
  { name: 'Marketing', count: 14, range: 'Apps 22 - 35', color: 'from-purple-600 to-pink-600', border: 'border-purple-500/30' },
  { name: 'Commerce & Customer Service', count: 6, range: 'Apps 36 - 41', color: 'from-emerald-600 to-teal-600', border: 'border-emerald-500/30' },
  { name: 'Finance', count: 11, range: 'Apps 42 - 52', color: 'from-amber-600 to-orange-600', border: 'border-amber-500/30' },
  { name: 'Education & Collaboration', count: 19, range: 'Apps 53 - 71', color: 'from-cyan-600 to-blue-600', border: 'border-cyan-500/30' },
  { name: 'HR', count: 1, range: 'App 72', color: 'from-rose-600 to-red-600', border: 'border-rose-500/30' },
];
