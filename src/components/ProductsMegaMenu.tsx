import React, { useState, useMemo } from 'react';
import { Search, X, Copy, Check, Grid, AlignLeft, Sparkles, ChevronRight, Layers } from 'lucide-react';
import { ALL_84_SALES_APPS, SALES_ENTERPRISE_CATEGORIES, AppItem } from '../data/appsData';

interface ProductsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (app: AppItem) => void;
  onNotify: (msg: string) => void;
}

export const ProductsMegaMenu: React.FC<ProductsMegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectApp,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'paragraph'>('grid');
  const [copiedParagraph, setCopiedParagraph] = useState(false);

  // Filtered 84 applications
  const filteredApps = useMemo(() => {
    return ALL_84_SALES_APPS.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || app.categoryCode === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  // Construct paragraph text for all 84 applications
  const paragraphText = useMemo(() => {
    return SALES_ENTERPRISE_CATEGORIES.map((cat) => {
      const appNames = cat.apps.map((a) => a.name).join(', ');
      return `[${cat.code}. ${cat.title} (${cat.apps.length} Apps)]: ${appNames}.`;
    }).join('\n\n');
  }, []);

  const handleCopyParagraph = () => {
    navigator.clipboard.writeText(paragraphText);
    setCopiedParagraph(true);
    onNotify('All 84 product names copied to clipboard!');
    setTimeout(() => setCopiedParagraph(false), 2200);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs flex justify-center items-start pt-16 md:pt-20 px-2 sm:px-4 pb-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header of Menu */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                  Products Suite
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  84 Total Enterprise Applications
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                All 84 VoloSC Applications Directory
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Click any application to launch, inspect capabilities, or view developer specifications.
              </p>
            </div>

            {/* View Mode Toggle & Close */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  Grid View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('paragraph')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    viewMode === 'paragraph'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                  Paragraph List
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search bar inside Products Menu */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search across all 84 applications (e.g. Sales Cloud, CPQ, AI Agents, ERP)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder-slate-400 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {viewMode === 'paragraph' && (
              <button
                onClick={handleCopyParagraph}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors shrink-0"
              >
                {copiedParagraph ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copiedParagraph ? 'Copied 84 Apps!' : 'Copy Entire 84 Apps Paragraph'}
              </button>
            )}
          </div>

          {/* Category Filter Pills (Inside Menu) */}
          {viewMode === 'grid' && (
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                All (84)
              </button>
              {SALES_ENTERPRISE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.code)}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.code
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat.code}. {cat.title} ({cat.apps.length})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Menu Body */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {viewMode === 'paragraph' ? (
            /* Paragraph View - Specifically requested by user */
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Complete 84 Applications Paragraph: </span>
                  All 84 business tools listed in structured continuous prose with categories. You can read, select, or copy the entire text below.
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs sm:text-sm leading-relaxed font-normal text-slate-800 space-y-4 select-text">
                {SALES_ENTERPRISE_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="pb-3 border-b border-slate-200 last:border-b-0">
                    <span className="font-bold text-blue-700 uppercase tracking-wide text-xs block mb-1">
                      {cat.code}. {cat.title} ({cat.apps.length} Applications)
                    </span>
                    <p className="text-slate-700">
                      {cat.apps.map((app, idx) => (
                        <button
                          key={app.id}
                          onClick={() => {
                            onClose();
                            onSelectApp(app);
                          }}
                          className="hover:text-blue-600 hover:underline font-medium inline transition-colors text-left mr-1.5"
                        >
                          {app.name}
                          {idx < cat.apps.length - 1 ? ' ·' : '.'}
                        </button>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Grid View */
            <div>
              {filteredApps.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm font-semibold text-slate-700">No applications match your search "{searchQuery}"</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-2 text-xs text-blue-600 font-medium hover:underline"
                  >
                    Clear search filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => {
                        onClose();
                        onSelectApp(app);
                      }}
                      className="group p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md bg-white hover:bg-blue-50/20 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {app.category}
                          </span>
                          {app.popular && (
                            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium border border-amber-200/60">
                              Popular
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {app.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {app.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-blue-600">
                        <span>Click to inspect</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Showing {filteredApps.length} of 84 products</span>
          </div>
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
