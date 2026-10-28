import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Smartphone, 
  AlertCircle,
  Building,
  User,
  Sparkles,
  Zap,
  Clock
} from 'lucide-react';
import { PlanPricing, UPI_PAYMENT_CONFIG } from '../data/appsData';

interface PricingModalProps {
  plan: PlanPricing | null;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';
  initialMode?: 'trial' | 'purchase';
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  plan,
  currency: initialCurrency,
  initialMode = 'trial',
  onClose,
  onNotify,
}) => {
  const [checkoutMode, setCheckoutMode] = useState<'trial' | 'purchase'>(initialMode);
  const [selectedCurrency, setSelectedCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'AED'>(initialCurrency);
  const [seatCount, setSeatCount] = useState<number>(1);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setCheckoutMode(initialMode);
    setIsSuccess(false);
  }, [plan, initialMode]);

  if (!plan) return null;

  const currentPricing = plan.currencies[selectedCurrency];
  const rawPriceStr = currentPricing.price.replace(/[^\d.]/g, '');
  const numericUnitPrice = parseFloat(rawPriceStr) || 1760;
  const totalPrice = (numericUnitPrice * seatCount).toLocaleString();

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_PAYMENT_CONFIG.vpa);
    setCopiedUpi(true);
    onNotify(`UPI ID ${UPI_PAYMENT_CONFIG.vpa} copied to clipboard!`);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleStartFreeTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      onNotify('Please enter your work email to start the 7-day free trial.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onNotify(`7-Day Free Trial activated for ${plan.name}! Welcome email sent to ${email}.`);
    }, 800);
  };

  const handleCompleteSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      onNotify('Please enter your billing email address.');
      return;
    }
    if (selectedCurrency === 'INR' && paymentMethod === 'upi' && !utrNumber) {
      onNotify('Please enter the 12-digit UPI Reference / UTR number after payment.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onNotify(
        `Subscription activated for ${plan.name} (${seatCount} seats)! Confirmation sent to ${email}.`
      );
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                7 Days Free Trial
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                {plan.discountBadge}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{plan.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {plan.includedAppsText}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs: 7-Day Free Trial vs Buy Subscription */}
        {!isSuccess && (
          <div className="p-3 bg-slate-100/80 border-b border-slate-200 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCheckoutMode('trial')}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                checkoutMode === 'trial'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Start 7 Days Free Trial (₹0 / $0)</span>
            </button>
            <button
              type="button"
              onClick={() => setCheckoutMode('purchase')}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                checkoutMode === 'purchase'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Subscribe Yearly (10% Off)</span>
            </button>
          </div>
        )}

        {isSuccess ? (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">
              {checkoutMode === 'trial' ? '7-Day Free Trial Active!' : 'Subscription Confirmed!'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Your organization account <strong className="text-slate-800">{companyName || 'VoloSC Organization'}</strong> now has full live enterprise access under {plan.name}.
            </p>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between text-slate-600">
                <span>Account Email:</span>
                <span className="font-semibold text-slate-900">{email}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Organization:</span>
                <span className="font-semibold text-slate-900">{companyName || 'VoloSC Organization'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Plan Status:</span>
                <span className="font-bold text-emerald-700">
                  {checkoutMode === 'trial' ? 'Active (7 Days Trial Remaining - ₹0)' : 'Annual Subscription Active (10% Off)'}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Included Applications:</span>
                <span className="font-semibold text-slate-900">{plan.includedAppsText}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Reference:</span>
                <span className="font-mono font-semibold text-purple-700">
                  {utrNumber ? `UTR: ${utrNumber}` : `UPI: ${UPI_PAYMENT_CONFIG.vpa}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-2">
                <span>Tax Invoice No:</span>
                <span className="font-mono font-bold text-slate-800">INV-2026-9500</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GSTIN / SAC:</span>
                <span className="font-mono text-slate-700">27AAFFS9500A1Z5 / 998313</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  window.print();
                  onNotify('Printing official VoloSC Tax Invoice...');
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
              >
                🖨️ Print / Download Tax Invoice
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Access My VoloSC Workspace
              </button>
            </div>
          </div>
        ) : checkoutMode === 'trial' ? (
          /* 7-DAY FREE TRIAL FAST ENROLLMENT */
          <form onSubmit={handleStartFreeTrial} className="p-5 sm:p-6 space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Zero Risk · 7 Days Full Feature Access · No Credit Card Required</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Experience all capabilities of <strong>{plan.name}</strong> for 7 days free. Includes full CRM pipeline, accounting, inventory, AI agents, and high-performance cloud tools.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Tech Labs"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Trial Includes:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> {plan.includedAppsText}
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Multi-Tenant DB Clusters
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Third-Party Marketplace
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> ISO 27001 & SOC 2 Security
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500">Billing: <strong>₹0 (No Card Needed)</strong></span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
                >
                  {isProcessing ? 'Setting Up Trial...' : 'Start 7-Day Free Trial Now'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* ANNUAL SUBSCRIPTION PURCHASE CHECKOUT */
          <form onSubmit={handleCompleteSubscription} className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            
            {/* Currency Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Billing Currency
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['INR', 'USD', 'EUR', 'GBP', 'AED'] as const).map((curr) => (
                  <button
                    type="button"
                    key={curr}
                    onClick={() => {
                      setSelectedCurrency(curr);
                      if (curr !== 'INR') setPaymentMethod('card');
                      else setPaymentMethod('upi');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedCurrency === curr
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {curr} {curr === 'INR' ? '(India)' : curr === 'USD' ? '(USA)' : curr === 'EUR' ? '(Europe)' : curr === 'GBP' ? '(UK)' : '(UAE)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Box with Seats Multiplier */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-500">Plan Rate:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">
                    {currentPricing.price}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {currentPricing.originalPrice}
                  </span>
                  <span className="text-[11px] text-slate-600">
                    {currentPricing.period}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <label className="text-xs font-semibold text-slate-700">Seats:</label>
                <select
                  value={seatCount}
                  onChange={(e) => setSeatCount(Number(e.target.value))}
                  className="px-2.5 py-1 text-xs font-bold bg-white border border-slate-300 rounded-lg text-slate-800 cursor-pointer shadow-2xs"
                >
                  <option value={1}>1 Seat</option>
                  <option value={5}>5 Seats</option>
                  <option value={10}>10 Seats</option>
                  <option value={25}>25 Seats</option>
                  <option value={50}>50 Seats</option>
                  <option value={100}>100 Seats</option>
                </select>
              </div>
            </div>

            {/* User & Company Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Corporate Billing Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="sayyedfurkhan38@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="VoloSC Enterprise"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Payment Channel
              </label>

              {selectedCurrency === 'INR' ? (
                <div className="space-y-3">
                  {/* PhonePe UPI Payment Mode */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-bold text-slate-900">
                          PhonePe & Universal UPI Payment
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Zero Processing Fee
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      {/* Corporate Dynamic QR Code */}
                      <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs shrink-0 text-center flex flex-col items-center">
                        <div className="w-36 h-36 bg-slate-950 p-2.5 rounded-lg flex flex-col justify-between relative overflow-hidden group">
                          {/* Outer QR Corner Finders */}
                          <div className="flex justify-between w-full">
                            <div className="w-8 h-8 border-4 border-blue-400 p-0.5 rounded-xs flex items-center justify-center">
                              <div className="w-3 h-3 bg-blue-400 rounded-2xs" />
                            </div>
                            <div className="w-8 h-8 border-4 border-blue-400 p-0.5 rounded-xs flex items-center justify-center">
                              <div className="w-3 h-3 bg-blue-400 rounded-2xs" />
                            </div>
                          </div>
                          {/* Inner Data Pattern */}
                          <div className="grid grid-cols-6 gap-1 my-1 px-1">
                            {[1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0].map((bit, idx) => (
                              <div key={idx} className={`w-2 h-2 rounded-2xs ${bit ? 'bg-amber-400' : 'bg-blue-500/30'}`} />
                            ))}
                          </div>
                          {/* Bottom QR Corner Finder */}
                          <div className="flex justify-between items-end w-full">
                            <div className="w-8 h-8 border-4 border-blue-400 p-0.5 rounded-xs flex items-center justify-center">
                              <div className="w-3 h-3 bg-blue-400 rounded-2xs" />
                            </div>
                            <span className="text-[9px] font-mono text-amber-300 font-bold tracking-widest">VOLO·SC</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium block mt-2">
                          Scan via any Banking / UPI App
                        </span>
                      </div>

                      {/* Payee Details & VPA */}
                      <div className="space-y-2.5 flex-1 w-full text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">
                            Registered Payee
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {UPI_PAYMENT_CONFIG.payeeName}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">
                            Official Subscription VPA / UPI ID
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200 select-all">
                              {UPI_PAYMENT_CONFIG.vpa}
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
                            >
                              {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              {copiedUpi ? 'Copied' : 'Copy UPI'}
                            </button>
                          </div>
                        </div>

                        <div className="pt-1 text-[11px] text-slate-600">
                          Payable Amount: <strong className="text-slate-900 font-bold">₹{totalPrice}</strong> for {seatCount} seat(s)
                        </div>

                        <div className="pt-2">
                          <a
                            href={`upi://pay?pa=${UPI_PAYMENT_CONFIG.vpa}&pn=${encodeURIComponent(UPI_PAYMENT_CONFIG.payeeName)}&am=${totalPrice.replace(/,/g, '')}&cu=INR&tn=VoloSC%20${encodeURIComponent(plan.name)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
                          >
                            <Smartphone className="w-3.5 h-3.5" />
                            <span>Open in PhonePe / GPay (Direct Pay on Mobile)</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Transaction / UTR Verification Input */}
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Enter 12-digit UTR / UPI Reference No. after scan <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 412895001234 or UPI-TXN-ID"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Card payment mode */
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>International Corporate Card / Wire Invoice</span>
                  </div>

                  <input
                    type="text"
                    placeholder="Card Number (•••• •••• •••• ••••)"
                    defaultValue="4532 8862 0595 4128"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 font-mono"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="10/28"
                      className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 font-mono"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      defaultValue="892"
                      className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Total: <strong className="text-slate-900 text-sm font-bold">
                  {selectedCurrency === 'INR' ? `₹${totalPrice}` : `${currentPricing.price} × ${seatCount}`}
                </strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
                >
                  {isProcessing ? 'Verifying...' : 'Confirm & Activate Plan'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
