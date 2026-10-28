import React from 'react';
import { User, LogOut, Sparkles, LayoutGrid, Terminal } from 'lucide-react';
import { VoloSCLogo } from './VoloSCLogo';

interface NavbarProps {
  onOpenProducts: () => void;
  onOpenSalesEnterprise: () => void;
  onOpenAppsCloud: () => void;
  onSelectAudience: (audience: 'individuals' | 'business' | 'enterprise') => void;
  onScrollToPricing: () => void;
  onScrollToTop: () => void;
  onOpenAuth: () => void;
  onLaunchEnterpriseOS: () => void;
  onOpen72AppsLauncher?: () => void;
  user: { name: string; email: string } | null;
  onSignOut: () => void;
  activeMenu: 'products' | 'sales_enterprise' | 'apps_cloud' | null;
  activeAudienceFilter: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProducts,
  onOpenSalesEnterprise,
  onOpenAppsCloud,
  onSelectAudience,
  onScrollToPricing,
  onScrollToTop,
  onOpenAuth,
  onLaunchEnterpriseOS,
  onOpen72AppsLauncher,
  user,
  onSignOut,
  activeMenu,
  activeAudienceFilter,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* 7-Days Free Trial Announcement Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white text-[11px] py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Enterprise Announcement: <strong>7 Days Free Trial</strong> on all 72 VoloSC Cloud Applications. No credit card required.</span>
        <button
          onClick={onScrollToPricing}
          className="underline font-bold text-amber-200 hover:text-white cursor-pointer ml-1"
        >
          Claim 7-Day Trial
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16 gap-2 sm:gap-4">
          
          {/* Brand Logo: VoloSC + 9-Dot Waffle */}
          <div className="flex items-center gap-2">
            {onOpen72AppsLauncher && (
              <button
                onClick={onOpen72AppsLauncher}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer group"
                title="Open 72 Apps Launcher (Waffle)"
              >
                <div className="grid grid-cols-3 gap-0.5 w-4 h-4">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-xs bg-slate-700 group-hover:bg-blue-600 transition-colors" />
                  ))}
                </div>
              </button>
            )}

            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1.5 focus:outline-hidden group cursor-pointer shrink-0"
              title="VoloSC Home"
            >
              <VoloSCLogo size="md" variant="compact" theme="light" showSubtitle={false} />
            </button>
          </div>

          {/* Navigation Buttons Row - Matching User Screenshot */}
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2 no-scrollbar scroll-smooth">
            {/* 72 Apps Launcher Button */}
            {onOpen72AppsLauncher && (
              <button
                type="button"
                onClick={onOpen72AppsLauncher}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-md bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
                <span>All 72 Apps</span>
              </button>
            )}

            {/* 1. Products ▾ */}
            <button
              type="button"
              onClick={onOpenProducts}
              className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeMenu === 'products'
                  ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>Products</span>
              <span className="text-[10px] text-slate-400">▾</span>
            </button>

            {/* 2. Sales & Enterprise ▾ */}
            <button
              type="button"
              onClick={onOpenSalesEnterprise}
              className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeMenu === 'sales_enterprise'
                  ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>Sales & Enterprise</span>
              <span className="text-[10px] text-slate-400">▾</span>
            </button>

            {/* 3. Apps & Cloud ▾ */}
            <button
              type="button"
              onClick={onOpenAppsCloud}
              className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeMenu === 'apps_cloud'
                  ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>Apps & Cloud</span>
              <span className="text-[10px] text-slate-400">▾</span>
            </button>

            {/* 4. Individuals */}
            <button
              type="button"
              onClick={() => onSelectAudience('individuals')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeAudienceFilter === 'individuals'
                  ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Individuals
            </button>

            {/* 5. Business */}
            <button
              type="button"
              onClick={() => onSelectAudience('business')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeAudienceFilter === 'business'
                  ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Business
            </button>

            {/* 6. Enterprise */}
            <button
              type="button"
              onClick={() => onSelectAudience('enterprise')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeAudienceFilter === 'enterprise'
                  ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Enterprise
            </button>

            {/* 7. Pricing */}
            <button
              type="button"
              onClick={onScrollToPricing}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Pricing
            </button>
          </nav>

          {/* Right Action: Enterprise OS Switcher & Auth */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onLaunchEnterpriseOS}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors shadow-2xs cursor-pointer"
              title="Launch Full Enterprise Cloud Console"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-blue-400" />
              <span>Launch VoloSC OS</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-xs">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px]">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="hidden sm:inline font-semibold text-slate-800 max-w-[120px] truncate">
                  {user.name}
                </span>
                <button
                  onClick={onSignOut}
                  title="Sign Out"
                  className="text-slate-400 hover:text-slate-700 cursor-pointer ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign in</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
