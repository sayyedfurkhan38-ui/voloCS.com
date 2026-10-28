export interface DataCenterNode {
  id: string;
  name: string;
  location: string;
  region: string;
  status: 'Operational' | 'Syncing' | 'Degraded';
  latencyMs: number;
  cpuPercent: number;
  memoryPercent: number;
  activeTenants: number;
  storageTb: number;
  role: 'Primary Master' | 'Read Replica & Hot Standby' | 'Edge Gateway';
}

export interface DatabaseClusterShard {
  id: string;
  shardName: string;
  engine: string;
  tenantRange: string;
  recordsCount: number;
  iops: number;
  replicationLagMs: number;
  status: 'Healthy' | 'Rebalancing';
}

export const DATA_CENTERS: DataCenterNode[] = [
  {
    id: 'dc-mum-01',
    name: 'Mumbai DC-01 (Equinix MBX)',
    location: 'Mumbai, India',
    region: 'ap-south-1',
    status: 'Operational',
    latencyMs: 8,
    cpuPercent: 32,
    memoryPercent: 58,
    activeTenants: 1420,
    storageTb: 148.5,
    role: 'Primary Master',
  },
  {
    id: 'dc-fra-02',
    name: 'Frankfurt DC-02 (Interxion FRA)',
    location: 'Frankfurt, Germany',
    region: 'eu-central-1',
    status: 'Operational',
    latencyMs: 44,
    cpuPercent: 24,
    memoryPercent: 42,
    activeTenants: 890,
    storageTb: 82.0,
    role: 'Read Replica & Hot Standby',
  },
  {
    id: 'dc-iad-03',
    name: 'Virginia DC-03 (CoreSite VA-2)',
    location: 'Ashburn, VA, USA',
    region: 'us-east-1',
    status: 'Operational',
    latencyMs: 76,
    cpuPercent: 28,
    memoryPercent: 51,
    activeTenants: 1105,
    storageTb: 112.4,
    role: 'Read Replica & Hot Standby',
  },
  {
    id: 'dc-sin-04',
    name: 'Singapore DC-04 (Telstra SG-1)',
    location: 'Singapore',
    region: 'ap-southeast-1',
    status: 'Operational',
    latencyMs: 32,
    cpuPercent: 19,
    memoryPercent: 38,
    activeTenants: 640,
    storageTb: 54.2,
    role: 'Edge Gateway',
  },
];

export const DB_SHARDS: DatabaseClusterShard[] = [
  {
    id: 'shard-01',
    shardName: 'citus-node-crm-01',
    engine: 'Distributed PostgreSQL 16.4 (Citus Extension)',
    tenantRange: 'Tenants #1000 - #4999 (Includes TCS, Infosys, HDFC)',
    recordsCount: 4892040,
    iops: 12400,
    replicationLagMs: 0.4,
    status: 'Healthy',
  },
  {
    id: 'shard-02',
    shardName: 'citus-node-finance-02',
    engine: 'Distributed PostgreSQL 16.4 + Ledger Extension',
    tenantRange: 'Tenants #5000 - #9999 (Includes Books Invoices, GST)',
    recordsCount: 3218900,
    iops: 18200,
    replicationLagMs: 0.2,
    status: 'Healthy',
  },
  {
    id: 'shard-03',
    shardName: 'citus-node-cloud-03',
    engine: 'TimescaleDB + PostgreSQL IoT TimeSeries',
    tenantRange: 'Tenants #10000 - #15000 (Cloud Servers, Audit Logs)',
    recordsCount: 8920100,
    iops: 24500,
    replicationLagMs: 0.6,
    status: 'Healthy',
  },
];
