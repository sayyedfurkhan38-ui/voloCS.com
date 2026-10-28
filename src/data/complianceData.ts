export interface ComplianceAuditItem {
  id: string;
  standard: string;
  issuer: string;
  status: 'Certified' | 'Passed' | 'Compliant';
  validUntil: string;
  scope: string;
  certificateId: string;
  scoreOrSummary: string;
}

export const COMPLIANCE_AUDITS: ComplianceAuditItem[] = [
  {
    id: 'CMP-ISO27001',
    standard: 'ISO/IEC 27001:2022',
    issuer: 'BSI Global Assurance Services',
    status: 'Certified',
    validUntil: '2027-12-31',
    scope: 'VoloSC Unified Multi-Tenant Cloud Platform, CRM, Books, AI Services and Microservices Mesh',
    certificateId: 'IS-784912-VOLOCS',
    scoreOrSummary: '114/114 Annex A security controls verified with zero non-conformities.',
  },
  {
    id: 'CMP-SOC2',
    standard: 'SOC 2 Type II (Security, Availability & Confidentiality)',
    issuer: 'Ernst & Young LLP (Independent Auditor)',
    status: 'Certified',
    validUntil: '2027-06-30',
    scope: 'Trust Services Criteria evaluation across 12-month operational window (continuous monitoring)',
    certificateId: 'SOC2-EY-2026-IND-091',
    scoreOrSummary: 'Unqualified clean audit opinion with 100% control testing success rate.',
  },
  {
    id: 'CMP-HIPAA',
    standard: 'HIPAA & HITECH Healthcare Compliance',
    issuer: 'KPMG Cyber Trust Practice',
    status: 'Compliant',
    validUntil: '2027-04-15',
    scope: 'PHI / ePHI Encryption at Rest (AES-256), TLS 1.3, and Business Associate Agreements (BAA)',
    certificateId: 'HIPAA-COMP-SAAS-2026',
    scoreOrSummary: 'Strict tenant cryptographic isolation with automatic audit logging.',
  },
  {
    id: 'CMP-DPDP',
    standard: 'Digital Personal Data Protection Act 2023 (India DPDP)',
    issuer: 'Data Security Council of India (DSCI)',
    status: 'Compliant',
    validUntil: 'Annual Review (2027)',
    scope: 'Indian Citizen Data Residency inside Mumbai DC-01, Right to Erasure, and Consent Architecture',
    certificateId: 'DPDP-IN-9500-CERT',
    scoreOrSummary: '100% in-country data sovereignty guaranteed for Indian enterprise customers.',
  },
  {
    id: 'CMP-VAPT',
    standard: 'Quarterly Penetration Testing & VAPT Audit',
    issuer: 'Synopsys Software Integrity Group',
    status: 'Passed',
    validUntil: 'Q1 2027 (Quarterly cycle)',
    scope: 'Black-box & Gray-box penetration test across API gateway, Auth flows, and DB Citus cluster',
    certificateId: 'VAPT-Q4-2026-PASS',
    scoreOrSummary: '0 Critical, 0 High, 0 Medium vulnerabilities. OWASP Top 10 fully mitigated.',
  },
];
