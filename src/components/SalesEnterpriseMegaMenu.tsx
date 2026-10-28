import React, { useState } from 'react';
import { X, Search, ChevronRight, Briefcase, Sparkles, Shield, ArrowUpRight } from 'lucide-react';
import { SALES_ENTERPRISE_CATEGORIES, AppItem } from '../data/appsData';

interface SalesEnterpriseMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (app: AppItem) => void;
  onNotify: (msg: string) => void;
}

export const SalesEnterpriseMegaMenu: React.FC<SalesEnterpriseMegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectApp,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(SALES_ENTERPRISE_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentCategory = SALES_ENTERPRISE_CATEGORIES.find((c) => c.id === activeCategoryId) || SALES_ENTERPRISE_CATEGORIES[0];

  const filteredApps = searchQuery
    ? SALES_ENTERPRISE_CATEGORIES.flatMap((c) => c.apps).filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentCategory.apps;

  return (
    <div 
      className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs flex justify-center items-start pt-16 md:pt-20 px-2 sm:px-4 pb-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                Sales & Enterprise Suite
              </span>
              <span className="text-xs font-semibold text-slate-500">
                8 Dedicated Categories · 84 Applications
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Sales, Service, Marketing & Enterprise Systems
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Select any of the 8 categories below to view its full roster of specialized applications.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Sales & Enterprise apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Navigation Bar / Sidebar Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
          {/* Left Category List (8 Categories A to H) */}
          <div className="md:col-span-4 bg-slate-50/80 border-r border-slate-200 p-3 sm:p-4 space-y-1 overflow-y-auto max-h-[60vh]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Select Category (A — H)
            </div>
            {SALES_ENTERPRISE_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategoryId && !searchQuery;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategoryId(cat.id);
                    setSearchQuery('');
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-700 hover:bg-white hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}
                    >
                      {cat.code}
                    </span>
                    <div className="truncate">
                      <div className="text-xs truncate">{cat.title}</div>
                      <div
                        className={`text-[10px] truncate ${
                          isActive ? 'text-blue-100' : 'text-slate-400'
                        }`}
                      >
                        {cat.apps.length} applications
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Applications Grid */}
          <div className="md:col-span-8 p-4 sm:p-6 overflow-y-auto max-h-[60vh] bg-white">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {searchQuery ? `Search Results (${filteredApps.length})` : `${currentCategory.code}. ${currentCategory.title}`}
                </h4>
                <p className="text-xs text-slate-500">
                  {searchQuery ? `Matching apps in Sales & Enterprise suite` : currentCategory.subtitle}
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                {filteredApps.length} Apps
              </span>
            </div>

            {filteredApps.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-medium text-slate-600">No applications found matching "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-xs text-blue-600 font-semibold hover:underline"
                >
                  Show all category apps
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      onClose();
                      onSelectApp(app);
                    }}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-semibold text-slate-500">
                          {app.category}
                        </span>
                        {app.popular && (
                          <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-medium border border-amber-200/50">
                            ★ Key App
                          </span>
                        )}
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                        <span>{app.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                      </h5>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {app.description}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Click to open details</span>
                      <span className="text-blue-600 font-medium group-hover:underline">Inspect</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Enterprise grade security · ISO 27001 · SOC 2 Type II</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
};
