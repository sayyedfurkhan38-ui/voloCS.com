import React from 'react';
import { X, ExternalLink, Copy, Check, Star, Shield, Play } from 'lucide-react';
import { AppItem } from '../data/appsData';

interface AppModalProps {
  app: AppItem | null;
  onClose: () => void;
  onLaunchLiveApp: (app: AppItem) => void;
  onNotify: (msg: string) => void;
}

export const AppModal: React.FC<AppModalProps> = ({ 
  app, 
  onClose, 
  onLaunchLiveApp, 
  onNotify 
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!app) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(app.name);
    setCopied(true);
    onNotify(`Copied "${app.name}" to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLaunch = () => {
    onClose();
    onLaunchLiveApp(app);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {app.categoryCode ? `Category ${app.categoryCode} · ` : ''}{app.category}
                </span>
                {app.popular && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Key Application
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{app.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Suite: {app.suite === 'sales_enterprise' ? 'VoloSC Sales & Enterprise (84 Apps Suite)' : 'VoloSC Apps & Cloud (50 Apps Suite)'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Overview</h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              {app.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Enterprise Capabilities</h4>
            <ul className="space-y-2">
              {app.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Target Audiences</h4>
            <div className="flex flex-wrap gap-1.5">
              {app.audience.map((aud) => (
                <span
                  key={aud}
                  className="capitalize px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                >
                  For {aud}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-100 flex items-center justify-between gap-3 text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Full enterprise single sign-on & live cloud connection active</span>
            </div>
            <span className="font-semibold text-blue-700 shrink-0">v2026.4</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            {copied ? 'Copied' : 'Copy Name'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleLaunch}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" /> Launch Live Workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
