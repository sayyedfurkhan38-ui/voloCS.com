import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Megaphone, 
  ShoppingCart, 
  BookOpen, 
  GraduationCap, 
  Users2, 
  Search, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Check, 
  SlidersHorizontal,
  ChevronRight,
  Database
} from 'lucide-react';
import { VOLO_72_APPS, VoloAppDefinition, CATEGORY_SUMMARIES } from '../data/appsRegistry';

interface Volo72AppsSectionProps {
  onOpenAppWorkspace: (app: VoloAppDefinition) => void;
}

export const Volo72AppsSection: React.FC<Volo72AppsSectionProps> = ({ onOpenAppWorkspace }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredApps = useMemo(() => {
    return VOLO_72_APPS.filter((app) => {
      const matchCat = activeCategory === 'All' || app.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.functions.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(app.appNumber) === searchQuery.trim();
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="volosc-72-apps" className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-800 my-10 text-white">
      <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Layers className="w-3.5 h-3.5" />
          The Complete VoloSC Operating System
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          72 Unified Cloud Applications
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          One unified subscription replacing Salesforce, Microsoft 365, and Zoho. All 72 apps share a single relational data model, authentication, and audit system.
        </p>
      </div>

      {/* Category Cards Carousel / Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {CATEGORY_SUMMARIES.map((cat) => {
          const isSelected = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`p-3.5 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <span className="text-[11px] font-mono text-blue-400 block">{cat.range}</span>
              <div className="font-bold text-white text-xs mt-1 truncate">{cat.name}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{cat.count} Applications</div>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 mb-8">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search all 72 apps by name, feature, or keyword (e.g., CRM, Bigin, Invoice, Voice, POS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {activeCategory !== 'All' && (
            <button
              onClick={() => setActiveCategory('All')}
              className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 font-semibold"
            >
              Show All 72
            </button>
          )}
          <span className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-white">{filteredApps.length}</strong> of 72 apps
          </span>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-blue-500/5"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-xs shadow-md shadow-blue-500/20">
                    {app.appNumber}
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">
                      {app.name}
                    </h3>
                    <span className="text-[10px] text-slate-400">{app.category}</span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400 font-mono">
                  Ready
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                {app.tagline}
              </p>

              {/* Menus & Buttons tags preview */}
              <div className="space-y-2 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-[11px]">
                <div>
                  <span className="text-slate-400 font-medium block mb-1">Menus & Views:</span>
                  <div className="flex flex-wrap gap-1">
                    {app.menus.slice(0, 4).map((m) => (
                      <span key={m} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {m}
                      </span>
                    ))}
                    {app.menus.length > 4 && (
                      <span className="text-slate-400 px-1">+{app.menus.length - 4} more</span>
                    )}
                  </div>
                </div>

                <div className="pt-1.5 border-t border-slate-800/60">
                  <span className="text-slate-400 font-medium block mb-1">Action Buttons:</span>
                  <div className="flex flex-wrap gap-1">
                    {app.buttons.slice(0, 3).map((b) => (
                      <span key={b} className="px-1.5 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-900/40">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                {app.schemaFields.length} Audit Schema Fields
              </span>
              <button
                onClick={() => onOpenAppWorkspace(app)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Launch Workspace
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};
