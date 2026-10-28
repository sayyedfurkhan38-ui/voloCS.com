import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Building2,
  User,
  Users,
  Compass,
  Play,
  QrCode,
  LayoutGrid
} from 'lucide-react';

import { 
  ALL_APPLICATIONS, 
  ALL_84_SALES_APPS, 
  ALL_50_APPS_CLOUD,
  SALES_ENTERPRISE_CATEGORIES, 
  APPS_CLOUD_CATEGORIES, 
  SUBSCRIPTION_PLANS,
  UPI_PAYMENT_CONFIG,
  AppItem,
  CategoryGroup,
  PlanPricing
} from './data/appsData';

import { Navbar } from './components/Navbar';
import { ProductsMegaMenu } from './components/ProductsMegaMenu';
import { SalesEnterpriseMegaMenu } from './components/SalesEnterpriseMegaMenu';
import { AppsCloudMegaMenu } from './components/AppsCloudMegaMenu';
import { AppModal } from './components/AppModal';
import { PricingModal } from './components/PricingModal';
import { LiveAppWorkspace } from './components/LiveAppWorkspace';
import { AuthModal } from './components/AuthModal';
import { EnterpriseWorkspace } from './enterprise/EnterpriseWorkspace';
import { VoloSCLogo } from './components/VoloSCLogo';
import { VOLO_72_APPS, VoloAppDefinition, getAppById } from './data/appsRegistry';
import { VoloAppWorkspace } from './components/VoloAppWorkspace';
import { CrossAppFlowEngine } from './components/CrossAppFlowEngine';
import { Volo72AppLauncherModal } from './components/Volo72AppLauncherModal';
import { Volo72AppsSection } from './components/Volo72AppsSection';

export default function App() {
  // View mode: Public Portal vs Full Enterprise OS Console
  const [viewMode, setViewMode] = useState<'portal' | 'enterprise_os'>('portal');
  const [enterpriseInitialTab, setEnterpriseInitialTab] = useState('dashboard');

  // Active 72 App Full Workspace
  const [activeVolo72App, setActiveVolo72App] = useState<VoloAppDefinition | null>(null);
  const [show72LauncherModal, setShow72LauncherModal] = useState<boolean>(false);

  // Mega menu states
  const [activeMenu, setActiveMenu] = useState<'products' | 'sales_enterprise' | 'apps_cloud' | null>(null);

  // App details modal state
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);

  // Live Workspace Simulator state
  const [liveWorkspaceApp, setLiveWorkspaceApp] = useState<AppItem | null>(null);

  // Pricing checkout modal state
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PlanPricing | null>(null);
  const [pricingModalMode, setPricingModalMode] = useState<'trial' | 'purchase'>('trial');

  // Currency State for pricing display
  const [billingCurrency, setBillingCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'AED'>('INR');

  // Auth User State with automatic migration from legacy storage keys
  const [user, setUser] = useState<{ name: string; email: string; company?: string; tenantId?: string } | null>(() => {
    try {
      const active = localStorage.getItem('volosc_user');
      if (active) return JSON.parse(active);

      // Automated migration from legacy keys
      const legacy = localStorage.getItem('volocs_user') || localStorage.getItem('saasify_user');
      if (legacy) {
        const parsed = JSON.parse(legacy);
        localStorage.setItem('volosc_user', JSON.stringify(parsed));
        localStorage.removeItem('saasify_user');
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Directory Search & Filter state
  const [directorySearch, setDirectorySearch] = useState('');
  const [audienceFilter, setAudienceFilter] = useState<'all' | 'individuals' | 'business' | 'enterprise'>('all');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Section references for smooth scrolling
  const pricingRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);
  const individualsRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const enterpriseRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleSignInSuccess = (newUser: { name: string; email: string }) => {
    setUser(newUser);
    try {
      localStorage.setItem('volosc_user', JSON.stringify(newUser));
      localStorage.removeItem('volocs_user');
    } catch {}
  };

  const handleSignOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('volosc_user');
      localStorage.removeItem('volosc_token');
      localStorage.removeItem('volocs_user');
    } catch {}
    showToast('Signed out of VoloSC account.');
  };

  // Launch full Enterprise OS Console directly
  const handleLaunchEnterpriseOS = (tab = 'dashboard') => {
    setEnterpriseInitialTab(tab);
    setViewMode('enterprise_os');
    showToast(`Launched VoloSC OS (${tab.toUpperCase()} Console)`);
  };

  // Smooth scroll helpers
  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
    showToast('Navigated to VoloSC Subscription Plans (10% Off Applied)');
  };

  const scrollToDirectory = () => {
    directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAudienceFilter('all');
    setDirectorySearch('');
  };

  const handleAudienceClick = (audience: 'individuals' | 'business' | 'enterprise') => {
    setAudienceFilter(audience);
    if (audience === 'individuals') {
      individualsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (audience === 'business') {
      businessRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (audience === 'enterprise') {
      enterpriseRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Filtered applications for: For ${audience.charAt(0).toUpperCase() + audience.slice(1)}`);
  };

  // Filtered applications for the live directory
  const filteredDirectoryApps = useMemo(() => {
    return ALL_APPLICATIONS.filter((app) => {
      const matchesSearch =
        directorySearch.trim() === '' ||
        app.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
        app.description.toLowerCase().includes(directorySearch.toLowerCase()) ||
        app.category.toLowerCase().includes(directorySearch.toLowerCase());

      const matchesAudience =
        audienceFilter === 'all' || app.audience.includes(audienceFilter);

      return matchesSearch && matchesAudience;
    });
  }, [directorySearch, audienceFilter]);

  const handleResetFilters = () => {
    setDirectorySearch('');
    setAudienceFilter('all');
    showToast('Filters reset. Showing all 134 VoloSC applications.');
  };

  // IF in Enterprise OS Mode: Render the full unified Enterprise OS Console
  if (viewMode === 'enterprise_os') {
    return (
      <EnterpriseWorkspace
        initialTab={enterpriseInitialTab}
        onBackToPortal={() => setViewMode('portal')}
        onNotify={showToast}
      />
    );
  }

  // If user opened any of the 72 full VoloSC applications
  if (activeVolo72App) {
    return (
      <VoloAppWorkspace
        app={activeVolo72App}
        onClose={() => setActiveVolo72App(null)}
        onSwitchApp={(appId) => {
          const next = getAppById(appId);
          if (next) setActiveVolo72App(next);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-sm">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
          <span className="flex-1">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onOpenProducts={() => setActiveMenu((prev) => (prev === 'products' ? null : 'products'))}
        onOpenSalesEnterprise={() => setActiveMenu((prev) => (prev === 'sales_enterprise' ? null : 'sales_enterprise'))}
        onOpenAppsCloud={() => setActiveMenu((prev) => (prev === 'apps_cloud' ? null : 'apps_cloud'))}
        onSelectAudience={handleAudienceClick}
        onScrollToPricing={scrollToPricing}
        onScrollToTop={scrollToTop}
        onOpenAuth={() => setShowAuthModal(true)}
        onLaunchEnterpriseOS={() => handleLaunchEnterpriseOS('dashboard')}
        onOpen72AppsLauncher={() => setShow72LauncherModal(true)}
        user={user}
        onSignOut={handleSignOut}
        activeMenu={activeMenu}
        activeAudienceFilter={audienceFilter}
      />

      {/* Auth Modal (Sign in / Sign up) */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleSignInSuccess}
        onNotify={showToast}
      />

      {/* Modals & Mega Menus */}
      <ProductsMegaMenu
        isOpen={activeMenu === 'products'}
        onClose={() => setActiveMenu(null)}
        onSelectApp={(app) => setLiveWorkspaceApp(app)}
        onNotify={showToast}
      />

      <SalesEnterpriseMegaMenu
        isOpen={activeMenu === 'sales_enterprise'}
        onClose={() => setActiveMenu(null)}
        onSelectApp={(app) => setLiveWorkspaceApp(app)}
        onNotify={showToast}
      />

      <AppsCloudMegaMenu
        isOpen={activeMenu === 'apps_cloud'}
        onClose={() => setActiveMenu(null)}
        onSelectApp={(app) => setLiveWorkspaceApp(app)}
        onNotify={showToast}
      />

      <AppModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onLaunchLiveApp={(app) => setLiveWorkspaceApp(app)}
        onNotify={showToast}
      />

      <PricingModal
        plan={selectedPlanForCheckout}
        currency={billingCurrency}
        initialMode={pricingModalMode}
        onClose={() => setSelectedPlanForCheckout(null)}
        onNotify={showToast}
      />

      {/* Real Interactive Live Workspace Simulator */}
      <LiveAppWorkspace
        app={liveWorkspaceApp}
        onClose={() => setLiveWorkspaceApp(null)}
        onNotify={showToast}
      />

      {/* VoloSC 72 Applications Waffle Launcher Modal */}
      <Volo72AppLauncherModal
        isOpen={show72LauncherModal}
        onClose={() => setShow72LauncherModal(false)}
        onSelectApp={(app) => setActiveVolo72App(app)}
      />

      {/* Main Page Content */}
      <main>
        {/* HERO SECTION - Exact layout from screenshots */}
        <section className="relative pt-12 pb-14 md:pt-18 md:pb-20 text-center px-4 max-w-5xl mx-auto">
          {/* Blue kicker text */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
              ONE SUITE. MANY POSSIBILITIES.
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/90 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              7-Day Free Trial Available
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto text-balance">
            All your business software in one place.
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            One comprehensive suite for CRM, marketing, commerce, finance, collaboration, and HR. Replaces Salesforce, Microsoft 365, and Zoho with 72 interconnected cloud applications.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShow72LauncherModal(true)}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <LayoutGrid className="w-4 h-4 text-blue-200" />
              <span>Launch 72 Apps Suite</span>
            </button>
            <button
              onClick={() => {
                const crm = getAppById('volosc-crm');
                if (crm) setActiveVolo72App(crm);
              }}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              Open VoloSC CRM
            </button>
            <button
              onClick={() => {
                setPricingModalMode('trial');
                setSelectedPlanForCheckout(SUBSCRIPTION_PLANS[1] || SUBSCRIPTION_PLANS[0]);
              }}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Start 7-Day Free Trial</span>
              <span className="text-[10px] bg-emerald-800/60 px-1.5 py-0.5 rounded font-mono">₹0</span>
            </button>
            <button
              onClick={scrollToPricing}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              View Plans (7 Days Free)
            </button>
          </div>
        </section>

        {/* CROSS-APP DATA FLOW CONNECTOR (7 STAGES: CRM -> DEAL -> ORDER -> INVENTORY -> INVOICE -> PAYMENT -> BOOKS) */}
        <section className="max-w-6xl mx-auto px-4 py-4">
          <CrossAppFlowEngine
            onOpenApp={(appId) => {
              const target = getAppById(appId);
              if (target) {
                setActiveVolo72App(target);
              } else {
                showToast(`Opening ${appId}...`);
              }
            }}
          />
        </section>

        {/* 72 APPLICATIONS DIRECTORY & LIVE WORKSPACE LAUNCHER */}
        <Volo72AppsSection
          onOpenAppWorkspace={(app) => setActiveVolo72App(app)}
        />

        {/* APPLICATION DIRECTORY SEARCH & FILTER BAR - Exact layout from screenshots */}
        <section ref={directoryRef} className="max-w-4xl mx-auto px-4 pb-12">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              APPLICATION DIRECTORY
            </p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Find the right tools for your work
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Search and explore VoloSC application listings.
            </p>
          </div>

          {/* The Search + Audience Dropdown + Reset Row matching screenshot */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white p-2 rounded-xl">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search applications..."
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400 shadow-2xs"
              />
            </div>

            {/* Audience Dropdown */}
            <div className="w-full sm:w-56 shrink-0">
              <select
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value as any)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-700 shadow-2xs cursor-pointer"
              >
                <option value="all">All audiences</option>
                <option value="individuals">For Individuals</option>
                <option value="business">For Business</option>
                <option value="enterprise">For Enterprise</option>
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="w-full sm:w-auto px-5 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs shrink-0 cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Search Results Display if user has searched or filtered */}
          {(directorySearch || audienceFilter !== 'all') && (
            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                <span>
                  Found <strong className="text-slate-900">{filteredDirectoryApps.length}</strong> applications matching your filter
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset view
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto pr-1">
                {filteredDirectoryApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setLiveWorkspaceApp(app)}
                    className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                      <span className="font-semibold text-blue-600">{app.category}</span>
                      <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium">Click to Launch</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {app.name}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {app.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* AUDIENCE OVERVIEW TILES - For Individuals, For Business, For Enterprise */}
        <section className="max-w-4xl mx-auto px-4 py-8 space-y-10">
          
          {/* 1. For Individuals */}
          <div ref={individualsRef} className="text-center group scroll-mt-20">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              For Individuals
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
              Everyday tools for personal productivity and organization.
            </p>
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => handleLaunchEnterpriseOS('office')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-100 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                Launch Writer, Sheets, Drive & Personal Tasks
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. For Business */}
          <div ref={businessRef} className="text-center group scroll-mt-20">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              For Business
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
              Tools for teams, customers, operations and growth.
            </p>
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => handleLaunchEnterpriseOS('crm')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-100 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                Launch CRM Leads, Books Invoicing & HR Portal
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. For Enterprise */}
          <div ref={enterpriseRef} className="text-center group scroll-mt-20">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              For Enterprise
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
              Explore security, analytics, automation and scalable business tools.
            </p>
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => handleLaunchEnterpriseOS('dashboard')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-100 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                Launch Executive Cockpit, Cloud Nodes & Security Audit
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </section>

        {/* SECTION 1: BUSINESS APPLICATIONS - Sales & Enterprise Categories (8 Groups A-H) */}
        <section className="max-w-5xl mx-auto px-4 py-12 border-t border-slate-100">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              BUSINESS APPLICATIONS
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Sales & Enterprise Categories
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse all eight business application groups.
            </p>
          </div>

          {/* 8 Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SALES_ENTERPRISE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-bold">
                      {cat.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {cat.apps.length} apps
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {cat.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {cat.subtitle}
                  </p>

                  {/* Quick Preview of First 3 Apps with Direct Launch */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                    {cat.apps.slice(0, 3).map((app) => (
                      <button
                        key={app.id}
                        onClick={() => setLiveWorkspaceApp(app)}
                        className="w-full text-left text-[11px] text-slate-600 hover:text-blue-600 font-medium truncate block transition-colors cursor-pointer"
                        title="Click to launch live app"
                      >
                        • {app.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <button
                    onClick={() => setActiveMenu('sales_enterprise')}
                    className="w-full py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/70 hover:bg-blue-100/70 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View All {cat.apps.length} Tools</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Banner trigger for the 84 applications paragraph */}
          <div className="mt-6 p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <h5 className="text-xs font-bold text-blue-900">
                Want to view or copy all 84 VoloSC applications in one continuous paragraph?
              </h5>
              <p className="text-xs text-blue-700 mt-0.5">
                Click "Open 84 Apps Menu" and select "Paragraph List" to view and copy the complete directory!
              </p>
            </div>
            <button
              onClick={() => setActiveMenu('products')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              Open 84 Apps Menu
            </button>
          </div>
        </section>

        {/* SECTION 2: PRODUCTIVITY & INFRASTRUCTURE - Apps & Cloud Categories (4 Groups A-D) */}
        <section className="max-w-5xl mx-auto px-4 py-12 border-t border-slate-100">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
              PRODUCTIVITY & INFRASTRUCTURE
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Apps & Cloud Categories
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse productivity, cloud, business and developer tools.
            </p>
          </div>

          {/* 4 Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {APPS_CLOUD_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white border border-slate-200 hover:border-sky-300 rounded-xl p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-md bg-sky-50 text-sky-700 flex items-center justify-center text-xs font-bold">
                      {cat.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {cat.apps.length} apps
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {cat.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {cat.subtitle}
                  </p>

                  {/* Quick Preview of First 3 Apps with Direct Launch */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                    {cat.apps.slice(0, 3).map((app) => (
                      <button
                        key={app.id}
                        onClick={() => setLiveWorkspaceApp(app)}
                        className="w-full text-left text-[11px] text-slate-600 hover:text-sky-600 font-medium truncate block transition-colors cursor-pointer"
                        title="Click to launch live app"
                      >
                        • {app.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <button
                    onClick={() => setActiveMenu('apps_cloud')}
                    className="w-full py-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50/70 hover:bg-sky-100/70 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View All {cat.apps.length} Tools</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PLANS & PRICING SECTION - Multi-currency & 10% Off Applied */}
        <section ref={pricingRef} className="max-w-5xl mx-auto px-4 py-16 border-t border-slate-100 scroll-mt-10">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              SUBSCRIPTION PLANS & PRICING
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Choose your VoloSC subscription
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Special 10% off applied on all yearly plans. Multi-currency billing supported.
            </p>

            {/* Currency Switcher */}
            <div className="mt-6 inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-2xs">
              {(['INR', 'USD', 'EUR', 'GBP', 'AED'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setBillingCurrency(curr);
                    showToast(`Billing currency set to ${curr}`);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    billingCurrency === curr
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {curr} {curr === 'INR' ? '₹ (India)' : curr === 'USD' ? '$ (USA)' : curr === 'EUR' ? '€ (EU)' : curr === 'GBP' ? '£ (UK)' : '(UAE)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const pricing = plan.currencies[billingCurrency];
              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                    plan.recommended
                      ? 'border-2 border-blue-600 shadow-md ring-2 ring-blue-100'
                      : 'border border-slate-200 shadow-xs'
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-2xs">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                        {plan.discountBadge}
                      </span>
                      {billingCurrency === 'INR' && (
                        <span className="text-[10px] font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60">
                          UPI Available
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mt-2.5">
                      {plan.name}
                    </h4>

                    <div className="mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900">
                          {pricing.price}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {pricing.originalPrice}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {pricing.period}
                      </div>
                    </div>

                    <div className="mt-6 space-y-2.5">
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.recommended ? 'text-blue-600' : 'text-slate-800'}`} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 space-y-2">
                    <button
                      onClick={() => {
                        setPricingModalMode('trial');
                        setSelectedPlanForCheckout(plan);
                      }}
                      className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Start 7-Day Free Trial (₹0)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setPricingModalMode('purchase');
                        setSelectedPlanForCheckout(plan);
                      }}
                      className={`w-full py-2 px-4 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        plan.recommended
                          ? 'text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200'
                          : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      <span>Subscribe Yearly with {billingCurrency} (10% Off)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* UPI Information Banner for India */}
          <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl border border-blue-200 bg-blue-600 text-white flex flex-col items-center justify-center shadow-2xs shrink-0 font-bold">
                <span className="text-[10px] tracking-wider text-amber-300">VOLOSC</span>
                <span className="text-xs">PAY</span>
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-slate-900 text-sm block">
                  Corporate Enterprise Billing VPA: {UPI_PAYMENT_CONFIG.vpa}
                </span>
                <span className="text-slate-500 mt-0.5 block">
                  Payee: {UPI_PAYMENT_CONFIG.payeeName} · PhonePe / GPay / Paytm / BHIM supported.
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPlanForCheckout(SUBSCRIPTION_PLANS[0])}
              className="px-4 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4" /> Scan & Subscribe via UPI
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER - Matching VoloSC platform */}
      <footer className="bg-slate-950 text-white py-12 px-4 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <div className="flex items-center justify-center mb-2">
            <VoloSCLogo size="lg" variant="full" theme="dark" showSubtitle={true} />
          </div>

          <h4 className="text-base font-bold tracking-tight text-slate-200">
            VoloSC Unified Business Cloud Platform
          </h4>
          <p className="text-xs text-slate-400">
            Unified enterprise software, autonomous AI agents, and cloud infrastructure.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <button
              onClick={() => handleLaunchEnterpriseOS('dashboard')}
              className="text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer"
            >
              ⚡ Launch Enterprise OS
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveMenu('products')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              All 84 Applications
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveMenu('sales_enterprise')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Sales & Enterprise Suite
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveMenu('apps_cloud')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Apps & Cloud Suite
            </button>
            <span>·</span>
            <button
              onClick={scrollToPricing}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Subscription Plans (10% Off)
            </button>
          </div>
          <p className="text-[11px] text-slate-600 pt-3">
            © VoloSC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
