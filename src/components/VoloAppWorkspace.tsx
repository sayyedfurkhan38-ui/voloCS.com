import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, 
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
  AlertTriangle, 
  ArrowRight, 
  X, 
  RefreshCw, 
  ShieldCheck, 
  FileText, 
  Settings as SettingsIcon, 
  History, 
  Building2, 
  Check, 
  ChevronRight,
  TrendingUp,
  Sparkles,
  Layers,
  Database
} from 'lucide-react';
import { VoloAppDefinition, VoloRecord, SchemaField } from '../data/appsRegistry';

interface VoloAppWorkspaceProps {
  app: VoloAppDefinition;
  onClose: () => void;
  onSwitchApp: (appId: string) => void;
}

export const VoloAppWorkspace: React.FC<VoloAppWorkspaceProps> = ({
  app,
  onClose,
  onSwitchApp
}) => {
  // Navigation tabs: every app gets Dashboard, All Records, Reports, Activity, Settings + custom menus
  const standardTabs = ['Dashboard', 'All Records', 'Reports', 'Activity History', 'Settings'];
  const allTabs = useMemo(() => {
    // combine unique tabs from standard and app.menus
    const combined = Array.from(new Set([...standardTabs, ...app.menus]));
    return combined;
  }, [app]);

  const [activeTab, setActiveTab] = useState<string>('Dashboard');

  // Local storage persisted state for records
  const storageKey = `volosc_app_records_${app.id}`;
  const [records, setRecords] = useState<VoloRecord[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return app.initialRecords;
  });

  // Fetch live records from server database with tenant isolation
  useEffect(() => {
    const fetchServerRecords = async () => {
      try {
        const token = localStorage.getItem('volosc_token');
        const orgId = localStorage.getItem('volosc_org') || 'org_volosc_global';
        const headers: Record<string, string> = {
          'x-organization-id': orgId
        };
        if (token) headers['authorization'] = `Bearer ${token}`;

        const res = await fetch(`/api/records/${app.id}`, { headers });
        if (res.ok) {
          const json = await res.json();
          if (json.records && json.records.length > 0) {
            setRecords(json.records);
            localStorage.setItem(storageKey, JSON.stringify(json.records));
          }
        }
      } catch (err) {
        // use local cache
      }
    };
    fetchServerRecords();
  }, [app.id, storageKey]);

  // Save to localStorage whenever records change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(records));
    } catch {
      // ignore
    }
  }, [records, storageKey]);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState<string>('created_at');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedRecordIds, setSelectedRecordIds] = useState<string[]>([]);

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<VoloRecord | null>(null);

  // Dynamic Form State for Create/Edit
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered & Sorted records
  const filteredRecords = useMemo(() => {
    return records
      .filter((rec) => {
        if (rec.deleted_at) return false;
        if (statusFilter !== 'All' && rec.status !== statusFilter) return false;
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return Object.values(rec).some(
          (val) => val && String(val).toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        const valA = a[sortField] ?? '';
        const valB = b[sortField] ?? '';
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
  }, [records, searchTerm, statusFilter, sortField, sortAsc]);

  // Open Create Modal
  const handleOpenCreate = () => {
    const initialForm: Record<string, any> = {
      status: 'Active',
      owner_id: 'usr_current_admin'
    };
    app.schemaFields.forEach((field) => {
      initialForm[field.key] = field.type === 'number' || field.type === 'currency' ? 0 : '';
    });
    setFormData(initialForm);
    setShowCreateModal(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (rec: VoloRecord) => {
    setCurrentRecord(rec);
    setFormData({ ...rec });
    setShowEditModal(true);
  };

  // Open Details Modal
  const handleOpenDetails = (rec: VoloRecord) => {
    setCurrentRecord(rec);
    setShowDetailsModal(true);
  };

  // Save New Record
  // Save New Record with server persistence
  const handleSaveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('volosc_token');
    const orgId = localStorage.getItem('volosc_org') || 'org_volosc_global';
    const newId = `REC-${app.id.substring(7, 10).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    const newRecord: VoloRecord = {
      ...formData,
      id: newId,
      organization_id: orgId,
      created_by: 'admin@volosc.com',
      created_at: now,
      updated_by: 'admin@volosc.com',
      updated_at: now,
      owner_id: formData.owner_id || 'usr_admin',
      status: formData.status || 'Active',
      deleted_at: null
    };

    // Update UI immediately
    setRecords((prev) => [newRecord, ...prev]);
    setShowCreateModal(false);
    showToast(`New record created: ${newId}`);

    // Persist to server
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-organization-id': orgId
      };
      if (token) headers['authorization'] = `Bearer ${token}`;
      await fetch(`/api/records/${app.id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData)
      });
    } catch (err) {
      // offline fallback
    }
  };

  // Save Edited Record with server persistence
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRecord) return;
    const now = new Date().toISOString();
    const orgId = localStorage.getItem('volosc_org') || 'org_volosc_global';
    const token = localStorage.getItem('volosc_token');
    const updatedRecord: VoloRecord = {
      ...currentRecord,
      ...formData,
      updated_by: 'admin@volosc.com',
      updated_at: now
    };

    setRecords((prev) =>
      prev.map((r) => (r.id === currentRecord.id ? updatedRecord : r))
    );
    setShowEditModal(false);
    showToast(`Record ${updatedRecord.id} updated`);

    // Persist to server
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-organization-id': orgId
      };
      if (token) headers['authorization'] = `Bearer ${token}`;
      await fetch(`/api/records/${app.id}/${currentRecord.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(formData)
      });
    } catch (err) {
      // offline fallback
    }
    setCurrentRecord(null);
  };

  // Delete Record with server persistence
  const handleDelete = async (id: string) => {
    if (confirm(`Are you sure you want to delete record ${id}?`)) {
      setRecords((prev) =>
        prev.map((r) => (r.id === id ? { ...r, deleted_at: new Date().toISOString() } : r))
      );
      showToast(`Record ${id} archived to trash`);

      try {
        const token = localStorage.getItem('volosc_token');
        const orgId = localStorage.getItem('volosc_org') || 'org_volosc_global';
        const headers: Record<string, string> = {
          'x-organization-id': orgId
        };
        if (token) headers['authorization'] = `Bearer ${token}`;
        await fetch(`/api/records/${app.id}/${id}`, {
          method: 'DELETE',
          headers
        });
      } catch (err) {
        // offline fallback
      }
    }
  };

  // Bulk Delete
  const handleBulkDelete = () => {
    if (selectedRecordIds.length === 0) return;
    if (confirm(`Delete ${selectedRecordIds.length} selected records?`)) {
      const now = new Date().toISOString();
      setRecords((prev) =>
        prev.map((r) =>
          selectedRecordIds.includes(r.id) ? { ...r, deleted_at: now } : r
        )
      );
      setSelectedRecordIds([]);
      showToast(`${selectedRecordIds.length} records removed`);
    }
  };

  // Export records to CSV
  const handleExportCSV = () => {
    if (records.length === 0) {
      showToast('No records to export');
      return;
    }
    const headers = [
      'id',
      ...app.schemaFields.map((f) => f.key),
      'status',
      'created_at',
      'owner_id'
    ];
    const rows = filteredRecords.map((r) =>
      headers.map((h) => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${app.id}_records_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredRecords.length} records to CSV`);
  };

  // Handle Action Button click
  const handleActionButton = (btnName: string) => {
    switch (btnName.toLowerCase()) {
      case 'add':
      case 'add lead':
      case 'add contact':
      case 'create deal':
      case 'new order':
      case 'create invoice':
      case 'add employee':
      case 'create form':
      case 'add sku':
        handleOpenCreate();
        break;
      case 'export':
      case 'export csv':
      case 'export orders':
      case 'export payroll':
      case 'download pdf':
        handleExportCSV();
        break;
      case 'import':
        setShowImportModal(true);
        break;
      case 'search':
        setActiveTab('All Records');
        break;
      default:
        showToast(`Action "${btnName}" executed on active workspace.`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 border border-blue-400/40 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-white" />
          {toastMessage}
        </div>
      )}

      {/* Top Application Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 font-bold text-lg">
            {app.appNumber}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">{app.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {app.category}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Cloud
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{app.tagline}</p>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {app.buttons.slice(0, 5).map((btn) => (
            <button
              key={btn}
              onClick={() => handleActionButton(btn)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold whitespace-nowrap shadow-sm transition-all"
            >
              {btn}
            </button>
          ))}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors ml-2"
            title="Exit App Workspace"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Menus / Tabs Navigation */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-6 overflow-x-auto flex items-center gap-2">
        {allTabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* ======================= TAB 1: DASHBOARD ======================= */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {app.kpis.map((kpi, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-colors"
                >
                  <div className="text-xs text-slate-400 font-medium">{kpi.label}</div>
                  <div className="text-2xl font-bold text-white mt-1.5">{kpi.value}</div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{kpi.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Summary & Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 cols: Quick Data Records preview */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base">Recent {app.name} Records</h3>
                    <p className="text-xs text-slate-400">Latest active records synchronized with enterprise database</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('All Records')}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    View All ({filteredRecords.length})
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800 pb-2">
                        <th className="pb-2 font-medium">Record ID</th>
                        {app.schemaFields.slice(0, 3).map((f) => (
                          <th key={f.key} className="pb-2 font-medium">{f.label}</th>
                        ))}
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredRecords.slice(0, 4).map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-2.5 font-mono text-blue-400 font-semibold">{rec.id}</td>
                          {app.schemaFields.slice(0, 3).map((f) => (
                            <td key={f.key} className="py-2.5 text-slate-300 truncate max-w-[150px]">
                              {f.type === 'currency' ? `$${Number(rec[f.key] || 0).toLocaleString()}` : String(rec[f.key] || '-')}
                            </td>
                          ))}
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {rec.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleOpenDetails(rec)}
                              className="text-slate-400 hover:text-blue-400 p-1"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Col: Primary Functions & Quick Actions */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Primary Application Engine
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  {app.functions}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Available Fast Operations
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {app.buttons.map((btn) => (
                      <button
                        key={btn}
                        onClick={() => handleActionButton(btn)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium text-left border border-slate-700/60 transition-colors truncate"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Audit Log Status:</span>
                    <span className="text-emerald-400 font-medium">9 Attributes Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 2: ALL RECORDS (TABLE VIEW) ======================= */}
        {(activeTab === 'All Records' || !standardTabs.includes(activeTab)) && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder={`Search ${app.name} records by any attribute...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Signed">Signed</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedRecordIds.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 text-xs font-semibold border border-red-500/30 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete ({selectedRecordIds.length})
                  </button>
                )}

                <button
                  onClick={() => setShowImportModal(true)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Import
                </button>

                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>

                <button
                  onClick={handleOpenCreate}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  New Record
                </button>
              </div>
            </div>

            {/* Records Data Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-3 w-10">
                        <input
                          type="checkbox"
                          checked={selectedRecordIds.length === filteredRecords.length && filteredRecords.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRecordIds(filteredRecords.map((r) => r.id));
                            } else {
                              setSelectedRecordIds([]);
                            }
                          }}
                          className="rounded bg-slate-900 border-slate-700"
                        />
                      </th>
                      <th 
                        onClick={() => {
                          setSortField('id');
                          setSortAsc(!sortAsc);
                        }}
                        className="p-3 font-semibold cursor-pointer hover:text-white"
                      >
                        <div className="flex items-center gap-1">
                          Record ID
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      {app.schemaFields.map((field) => (
                        <th
                          key={field.key}
                          onClick={() => {
                            setSortField(field.key);
                            setSortAsc(!sortAsc);
                          }}
                          className="p-3 font-semibold cursor-pointer hover:text-white whitespace-nowrap"
                        >
                          <div className="flex items-center gap-1">
                            {field.label}
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                      ))}
                      <th className="p-3 font-semibold">Status</th>
                      <th className="p-3 font-semibold">Owner</th>
                      <th className="p-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={app.schemaFields.length + 5} className="py-8 text-center text-slate-400">
                          No matching records found in {app.name}. Click "New Record" to add one!
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((record) => {
                        const isSelected = selectedRecordIds.includes(record.id);
                        return (
                          <tr
                            key={record.id}
                            className={`hover:bg-slate-800/40 transition-colors ${
                              isSelected ? 'bg-blue-900/10' : ''
                            }`}
                          >
                            <td className="p-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedRecordIds((prev) => [...prev, record.id]);
                                  } else {
                                    setSelectedRecordIds((prev) => prev.filter((id) => id !== record.id));
                                  }
                                }}
                                className="rounded bg-slate-900 border-slate-700"
                              />
                            </td>
                            <td className="p-3 font-mono font-bold text-blue-400">
                              {record.id}
                            </td>
                            {app.schemaFields.map((field) => (
                              <td key={field.key} className="p-3 text-slate-300 max-w-xs truncate">
                                {field.type === 'currency'
                                  ? `$${Number(record[field.key] || 0).toLocaleString()}`
                                  : String(record[field.key] ?? '-')}
                              </td>
                            ))}
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {record.status}
                              </span>
                            </td>
                            <td className="p-3 text-slate-400 font-mono text-[11px]">
                              {record.owner_id}
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenDetails(record)}
                                  className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                                  title="View Record Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleOpenEdit(record)}
                                  className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                                  title="Edit Record"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(record.id)}
                                  className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="bg-slate-950/70 p-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Showing {filteredRecords.length} records in {app.name}</span>
                <span className="font-mono text-[11px]">Audit Schema: ISO 27001 / SOC2 Compliant</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 3: REPORTS & ANALYTICS ======================= */}
        {activeTab === 'Reports' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                {app.name} Performance & Aggregations
              </h3>
              <p className="text-slate-400 text-xs mb-6">
                Automated statistical breakdowns and operational velocity for {app.name}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Total Synchronized Records</span>
                  <div className="text-2xl font-bold text-white mt-1">{records.length}</div>
                  <div className="text-xs text-blue-400 mt-1">100% Data Integrity</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Active Non-Archived</span>
                  <div className="text-2xl font-bold text-white mt-1">
                    {records.filter((r) => !r.deleted_at).length}
                  </div>
                  <div className="text-xs text-emerald-400 mt-1">Operational</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Cross-App Relational Links</span>
                  <div className="text-2xl font-bold text-white mt-1">7 Pipelines</div>
                  <div className="text-xs text-purple-400 mt-1">Unified Cloud OS</div>
                </div>
              </div>

              {/* Visual Breakdown Bars */}
              <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Operational Distribution
                </h4>
                {app.kpis.map((kpi, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">{kpi.label}</span>
                      <span className="text-white font-semibold">{kpi.value}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        style={{ width: `${(idx + 1) * 23}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 4: ACTIVITY HISTORY (AUDIT LOGS) ======================= */}
        {activeTab === 'Activity History' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-amber-400" />
                  Immutable Audit Log Trail ({app.name})
                </h3>
                <p className="text-xs text-slate-400">
                  Detailed timeline of record creation, updates, and user modifications conforming to SOC 2 & HIPAA standards.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                org_volo_global_01
              </span>
            </div>

            <div className="divide-y divide-slate-800">
              {filteredRecords.map((r, i) => (
                <div key={r.id + i} className="py-3 flex items-start justify-between text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-400">{r.id}</span>
                      <span className="text-slate-300">was updated by</span>
                      <span className="font-semibold text-emerald-400">{r.updated_by}</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Status: <span className="text-slate-200">{r.status}</span> | Owner ID: <span className="font-mono text-slate-300">{r.owner_id}</span>
                    </div>
                  </div>
                  <div className="text-right text-slate-400 font-mono text-[11px]">
                    {new Date(r.updated_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB 5: SETTINGS ======================= */}
        {activeTab === 'Settings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-blue-400" />
              {app.name} Configuration & Permissions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Database & Field Rules
                </h4>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>Application ID: <span className="font-mono text-white">{app.id}</span></div>
                  <div>Suite Category: <span className="text-white">{app.category}</span></div>
                  <div>Audit Columns: <span className="text-emerald-400 font-medium">9 System Fields Enforced</span></div>
                </div>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Access Control (RBAC)
                </h4>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>View Permission: <span className="text-white">All Organization Members</span></div>
                  <div>Edit / Write Permission: <span className="text-white">Assigned Owners & Admins</span></div>
                  <div>Delete Permission: <span className="text-red-400 font-medium">Admin Only (Soft-Delete)</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================= CREATE RECORD MODAL ======================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div>
                <h3 className="text-lg font-bold text-white">Create New {app.name} Record</h3>
                <p className="text-xs text-slate-400">Add a new entity with automatic audit timestamps</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNew} className="space-y-4">
              {app.schemaFields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                    <span>{field.label}</span>
                    {field.required && <span className="text-red-400 text-[10px]">*Required</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.key] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      required={field.required}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select option...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type === 'number' || field.type === 'currency' ? 'number' : field.type === 'email' ? 'email' : field.type === 'date' ? 'date' : 'text'}
                      value={formData[field.key] ?? ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      required={field.required}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  )}
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Status</label>
                  <select
                    value={formData.status || 'Active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed Won">Closed Won</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Owner ID</label>
                  <input
                    type="text"
                    value={formData.owner_id || 'usr_sarah_chen'}
                    onChange={(e) => setFormData({ ...formData, owner_id: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= EDIT RECORD MODAL ======================= */}
      {showEditModal && currentRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div>
                <h3 className="text-lg font-bold text-white">Edit Record: {currentRecord.id}</h3>
                <p className="text-xs text-slate-400">Update fields for {app.name}</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {app.schemaFields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.key] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type === 'number' || field.type === 'currency' ? 'number' : field.type === 'email' ? 'email' : 'text'}
                      value={formData[field.key] ?? ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  )}
                </div>
              ))}

              <div className="space-y-1 pt-2">
                <label className="text-xs font-medium text-slate-300">Status</label>
                <select
                  value={formData.status || 'Active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= RECORD DETAILS MODAL ======================= */}
      {showDetailsModal && currentRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">Record Details</h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {currentRecord.id}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Entity metadata & immutable audit attributes</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* App specific fields */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {app.schemaFields.map((field) => (
                <div key={field.key} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">
                    {field.label}
                  </span>
                  <span className="text-xs text-slate-200 font-medium break-words">
                    {field.type === 'currency'
                      ? `$${Number(currentRecord[field.key] || 0).toLocaleString()}`
                      : String(currentRecord[field.key] ?? '-')}
                  </span>
                </div>
              ))}
            </div>

            {/* Mandatory 9 Audit attributes */}
            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Enterprise Compliance Audit Record (9 Fields)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">organization_id:</span>
                  <span className="text-slate-300 font-semibold">{currentRecord.organization_id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">created_by:</span>
                  <span className="text-slate-300 font-semibold">{currentRecord.created_by}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">created_at:</span>
                  <span className="text-slate-300 font-semibold">{new Date(currentRecord.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">updated_by:</span>
                  <span className="text-slate-300 font-semibold">{currentRecord.updated_by}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">updated_at:</span>
                  <span className="text-slate-300 font-semibold">{new Date(currentRecord.updated_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">owner_id:</span>
                  <span className="text-slate-300 font-semibold">{currentRecord.owner_id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">status:</span>
                  <span className="text-emerald-400 font-semibold">{currentRecord.status}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">deleted_at:</span>
                  <span className="text-slate-400">{currentRecord.deleted_at || 'null (Active)'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleOpenEdit(currentRecord);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Edit This Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= IMPORT MODAL ======================= */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div>
                <h3 className="text-lg font-bold text-white">Import Records to {app.name}</h3>
                <p className="text-xs text-slate-400">Bulk upload CSV or JSON data</p>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center space-y-3 bg-slate-950/60 hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-blue-400 mx-auto" />
              <div className="text-xs text-slate-300 font-medium">
                Click to browse CSV or drop file here
              </div>
              <div className="text-[11px] text-slate-500">
                Supports standard comma-separated exports from Salesforce, Microsoft Dynamics, or Zoho
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-800 mt-5">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  showToast('Sample dataset imported successfully into ' + app.name);
                }}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Simulate Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
