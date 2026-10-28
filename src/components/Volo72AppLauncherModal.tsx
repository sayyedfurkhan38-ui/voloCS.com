import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  Layers, 
  Building2, 
  Megaphone, 
  ShoppingCart, 
  BookOpen, 
  GraduationCap, 
  Users2, 
  ArrowRight,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { VOLO_72_APPS, VoloAppDefinition, CATEGORY_SUMMARIES } from '../data/appsRegistry';

interface Volo72AppLauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (app: VoloAppDefinition) => void;
}

export const Volo72AppLauncherModal: React.FC<Volo72AppLauncherModalProps> = ({
  isOpen,
  onClose,
  onSelectApp
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredApps = useMemo(() => {
    return VOLO_72_APPS.filter((app) => {
      const matchesCategory =
        selectedCategory === 'All' || app.category === selectedCategory;
      const matchesSearch =
        !search ||
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.tagline.toLowerCase().includes(search.toLowerCase()) ||
        app.functions.toLowerCase().includes(search.toLowerCase()) ||
        String(app.appNumber) === search.trim();
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider">
                VoloSC Cloud Operating System
              </span>
              <span className="text-xs text-slate-400 font-mono">
                72 Total Enterprise Applications
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Enterprise Suite App Launcher
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors self-end sm:self-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search across all 72 apps (e.g., CRM, Books, POS, Mail, Inventory)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-inner"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['All', 'Sales & CRM', 'Marketing', 'Commerce & Customer Service', 'Finance', 'Education & Collaboration', 'HR'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Category Summaries Quick Strip */}
        <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400 overflow-x-auto">
          <span>Found {filteredApps.length} applications</span>
          <span className="font-mono text-[11px] text-slate-500">
            Click any application to launch full interactive workspace
          </span>
        </div>

        {/* Apps Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 custom-scrollbar">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                onSelectApp(app);
                onClose();
              }}
              className="text-left p-3.5 rounded-2xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 transition-all group flex flex-col justify-between hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold flex items-center justify-center">
                    {app.appNumber}
                  </span>
                  <span className="text-[10px] text-slate-500 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                    {app.category.split(' ')[0]}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {app.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {app.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-slate-300">
                <span>{app.menus.length} Menus • {app.buttons.length} Actions</span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-400 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SOC 2 Type II, ISO 27001 & HIPAA Compliant Architecture</span>
          </div>
          <span className="font-mono text-slate-500 text-[11px]">
            Press ESC or click close to dismiss
          </span>
        </div>
      </div>
    </div>
  );
};
