import React, { useState, useEffect } from 'react';
import { RESIDENCES } from '../data';
import { Calculator, LandPlot, Percent, Landmark, HelpCircle, Receipt } from 'lucide-react';
import { motion } from 'motion/react';

export const InvestmentCalculator: React.FC = () => {
  // Pre-calculated options
  const [selectedResId, setSelectedResId] = useState<string>(RESIDENCES[0].id);
  const [customPrice, setCustomPrice] = useState<number>(RESIDENCES[0].price);
  const [isAdditionalHome, setIsAdditionalHome] = useState<boolean>(true); // Default high-end buyers buying additional homes
  const [isNonUkResident, setIsNonUkResident] = useState<boolean>(false);

  // Mortgage parameters
  const [ltvPercent, setLtvPercent] = useState<number>(50); // Default 50% LTV for premium high-net-worth buyers
  const [interestRate, setInterestRate] = useState<number>(4.2);
  const [mortgageTermYears, setMortgageTermYears] = useState<number>(20);

  // Synchronise customPrice when selected residence changes
  useEffect(() => {
    const res = RESIDENCES.find(r => r.id === selectedResId);
    if (res) {
      setCustomPrice(res.price);
    }
  }, [selectedResId]);

  // UK SDLT (Stamp Duty Land Tax) Calculation Formula (Current standard brackets)
  const calculateSdlt = (amount: number): number => {
    let tax = 0;
    
    // Standard Residential SDLT Rates (Primary/Self Occupied)
    // Up to £250k: 0%
    // £250k to £925k: 5%
    // £925k to £1.5M: 10%
    // Over £1.5M: 12%
    
    const brackets = [
      { limit: 250000, rate: 0 },
      { limit: 925000, rate: 0.05 },
      { limit: 1500000, rate: 0.10 },
      { limit: Infinity, rate: 0.12 }
    ];

    let remaining = amount;
    let previousLimit = 0;

    for (let i = 0; i < brackets.length; i++) {
      const currentBracket = brackets[i];
      const sliceSize = currentBracket.limit - previousLimit;
      const taxableSlice = Math.min(remaining, sliceSize);
      
      tax += taxableSlice * currentBracket.rate;
      remaining -= taxableSlice;
      previousLimit = currentBracket.limit;
      if (remaining <= 0) break;
    }

    // Additive surcharges for second properties or non-residents
    let surchargeRate = 0;
    if (isAdditionalHome) surchargeRate += 0.03; // +3% Surcharge for buy-to-let or second residence
    if (isNonUkResident) surchargeRate += 0.02; // +2% Surcharge for Non-UK residents

    if (surchargeRate > 0) {
      tax += amount * surchargeRate;
    }

    return Math.round(tax);
  };

  // Financial Estimates
  const sdltValue = calculateSdlt(customPrice);
  const loanAmount = customPrice * (ltvPercent / 100);
  const downpaymentValue = customPrice - loanAmount;

  // Monthly mortgage calculation formula
  const calculateMonthlyMortgage = (): number => {
    if (loanAmount === 0) return 0;
    const r = (interestRate / 100) / 12; // monthly rate
    const n = mortgageTermYears * 12; // total payments
    const monthlyPayment = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(monthlyPayment) ? 0 : Math.round(monthlyPayment);
  };

  const monthlyMortgage = calculateMonthlyMortgage();

  // Luxury service charge is estimated strictly as 0.75% of asset purchase price per annum
  const annualServiceCharge = Math.round(customPrice * 0.0075);
  const monthlyServiceCharge = Math.round(annualServiceCharge / 12);

  // Reservation fee required at exchange is usually 10%
  const exchangeReservationFee = Math.round(customPrice * 0.10);
  const estimatedLiquidityNeeded = exchangeReservationFee + sdltValue;

  return (
    <section className="bg-stone-50 py-20 md:py-28 px-6 border-b border-stone-200/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="block font-mono text-[10px] tracking-[0.3em] text-gold-500 font-semibold uppercase">PORTFOLIO INVESTMENT MATTERS</span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal-900 font-normal leading-[1.12]">
            Estate investment <span className="italic text-gold-600 font-serif">financial model</span>
          </h2>
          <p className="text-xs md:text-sm text-stone-800/70 font-light leading-relaxed">
            Acquiring premium London real estate involves careful tax planning. Use our custom calculator to measure stamp duties, amortisations, and estimated service charges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-white border border-stone-200 p-8 space-y-8 shadow-sm text-left">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-stone-200">
              <Calculator className="w-5 h-5 text-gold-500" />
              <h3 className="font-serif text-lg text-charcoal-900 font-medium">FINANCIAL MODEL PARAMETERS</h3>
            </div>

            {/* Price Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#8E867C] uppercase font-semibold mb-2">CHOOSE SUITE CATEGORY</label>
                <select
                  value={selectedResId}
                  onChange={(e) => setSelectedResId(e.target.value)}
                  className="w-full bg-[#FAF7F2] p-3 text-sm border border-stone-200 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-none cursor-pointer"
                  id="calc-residence-select"
                >
                  {RESIDENCES.map((res) => (
                    <option key={res.id} value={res.id}>
                      {res.name} — FL {res.floor} (£{res.price.toLocaleString()})
                    </option>
                  ))}
                  <option value="custom">Bespoke Custom Valuation Target...</option>
                </select>
              </div>

              {selectedResId === 'custom' && (
                <div className="animate-fade-in">
                  <label className="block text-[10px] font-mono tracking-widest text-[#8E867C] uppercase font-semibold mb-2">VALUATION AMOUNT (£)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 font-mono text-sm">£</span>
                    <input
                      type="number"
                      step={50000}
                      min={500000}
                      className="w-full bg-[#FAF7F2] pl-8 pr-4 py-3 text-sm border border-stone-200 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-none font-mono"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(Math.max(0, parseInt(e.target.value) || 0))}
                      id="calc-price-input"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Stamp Duty Surcharges (UK SDLT Specifics) */}
            <div className="space-y-3.5">
              <label className="block text-[10px] font-mono tracking-widest text-[#8E867C] uppercase font-semibold">UK STAMP DUTY TAX SURCHARGES (SDLT)</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <label className={`border p-4 flex items-start gap-3 cursor-pointer select-none transition-all duration-200 ${
                  isAdditionalHome ? 'border-gold-500 bg-[#FAF7F2]' : 'border-stone-200/60 bg-stone-50/50 hover:bg-stone-50'
                }`}>
                  <input
                    type="checkbox"
                    checked={isAdditionalHome}
                    onChange={(e) => setIsAdditionalHome(e.target.checked)}
                    className="mt-0.5 accent-gold-500 rounded-none"
                    id="calc-additional-surcharge"
                  />
                  <div>
                    <span className="block text-xs font-semibold text-stone-900 leading-none">Second Residence / Investor</span>
                    <span className="block text-[10px] text-stone-500 mt-1 font-light leading-relaxed">Adds standard +3% stamp duty surcharge for additional properties in the UK.</span>
                  </div>
                </label>

                <label className={`border p-4 flex items-start gap-3 cursor-pointer select-none transition-all duration-200 ${
                  isNonUkResident ? 'border-gold-500 bg-[#FAF7F2]' : 'border-stone-200/60 bg-stone-50/50 hover:bg-stone-50'
                }`}>
                  <input
                    type="checkbox"
                    checked={isNonUkResident}
                    onChange={(e) => setIsNonUkResident(e.target.checked)}
                    className="mt-0.5 accent-gold-500 rounded-none"
                    id="calc-nonuk-surcharge"
                  />
                  <div>
                    <span className="block text-xs font-semibold text-stone-900 leading-none">Non-UK Resident Status</span>
                    <span className="block text-[10px] text-stone-500 mt-1 font-light leading-relaxed">Adds +2% stamp duty surcharge applicable to buyers based offshore.</span>
                  </div>
                </label>

              </div>
            </div>

            {/* Mortgage & Leverage Amortization Sliders */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <label className="block text-[10px] font-mono tracking-widest text-[#8E867C] uppercase font-semibold">DEBT & LEVERAGE CAPABILITY</label>
              
              {/* LTV percentage */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-stone-800 font-light">Loan-to-Value (LTV) Ratio</span>
                  <span className="font-mono text-xs font-bold text-stone-950">{ltvPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  className="w-full accent-gold-500 h-1 bg-stone-200 cursor-pointer"
                  value={ltvPercent}
                  onChange={(e) => setLtvPercent(parseInt(e.target.value))}
                  id="calc-ltv-slider"
                />
                <div className="flex justify-between text-[9px] font-mono text-stone-400">
                  <span>OUT-OF-POCKET CASH DIRECT</span>
                  <span>MAX 80% LEVERAGE (ESTATE RANGE)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Interest rate slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-stone-800 font-light">Assumed Interest Rate</span>
                    <span className="font-mono text-xs font-bold text-stone-950">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.1"
                    className="w-full accent-gold-500 h-1 bg-stone-200 cursor-pointer"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    id="calc-rate-slider"
                  />
                </div>

                {/* Term slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-stone-800 font-light">Amortisation Tenure</span>
                    <span className="font-mono text-xs font-bold text-stone-950">{mortgageTermYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    className="w-full accent-gold-500 h-1 bg-stone-200 cursor-pointer"
                    value={mortgageTermYears}
                    onChange={(e) => setMortgageTermYears(parseInt(e.target.value))}
                    id="calc-term-slider"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Outputs / Calculations summary side profile */}
          <div className="lg:col-span-5 bg-stone-900 border border-gold-500/20 p-8 shadow-2xl relative text-left text-stone-50 overflow-hidden">
            
            {/* Background luxury watermark */}
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full border border-stone-800/20 flex items-center justify-center pointer-events-none select-none">
              <div className="w-56 h-56 rounded-full border border-stone-800/10" />
            </div>

            <div className="space-y-8 z-10 relative">

              <div className="flex items-center gap-2 pb-4 border-b border-stone-800">
                <Receipt className="w-5 h-5 text-gold-500" />
                <h3 className="font-serif text-lg leading-none">PRELIMINARY ASSET REPORT</h3>
              </div>

              {/* Major Asset Price Summary Block */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-[#C5A880] uppercase font-semibold leading-none">ESTIMATED INVESTMENT TARGET</span>
                <div className="text-3xl md:text-4xl font-serif text-stone-50 font-semibold mt-1">
                  £{customPrice.toLocaleString()}
                </div>
              </div>

              {/* Grid accounting metrics sheet row checks */}
              <div className="space-y-4 pt-2">
                
                <div className="flex justify-between items-baseline border-b border-stone-800/80 pb-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-light">
                    <LandPlot className="w-3.5 h-3.5 text-gold-500" />
                    <span>Downpayment Base ({100 - ltvPercent}%)</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-stone-50">£{downpaymentValue.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-baseline border-b border-stone-800/80 pb-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-light">
                    <Landmark className="w-3.5 h-3.5 text-gold-500" />
                    <span>Amortised Debt Capital ({ltvPercent}%)</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-stone-50">£{loanAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-baseline border-b border-stone-800/80 pb-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-light">
                    <Receipt className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>UK Stamp Duty (SDLT)</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-gold-400">£{sdltValue.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-baseline border-b border-stone-800/80 pb-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-light">
                    <Percent className="w-3.5 h-3.5 text-stone-400" />
                    <span>Annual Service Charge (Est.)</span>
                  </div>
                  <span className="font-mono text-xs text-stone-300">£{annualServiceCharge.toLocaleString()} (£{monthlyServiceCharge.toLocaleString()}/mo)</span>
                </div>

              </div>

              {/* Monthly Cost estimate Highlight Box */}
              <div className="bg-stone-950 border border-stone-800 p-5 space-y-2">
                <span className="block text-[8px] font-mono tracking-widest text-[#C5A880] uppercase font-bold leading-none">DEBT SERVICING PROFILE</span>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs text-stone-400 font-light">Principal & Interest Estimate</span>
                  <span className="font-mono text-lg font-bold text-stone-50">£{monthlyMortgage.toLocaleString()}<span className="text-[10px] text-stone-500 font-normal">/mo</span></span>
                </div>
                <p className="text-[9.5px] text-stone-500 font-light leading-relaxed pt-1.5 border-t border-stone-900">
                  Calculated based on {interestRate}% over a {mortgageTermYears}-year amortisation timeline.
                </p>
              </div>

              {/* Required Liquidity Summary box */}
              <div className="bg-[#C5A880]/15 border border-[#C5A880]/40 p-5 space-y-2 text-stone-100">
                <span className="block text-[8px] font-mono tracking-widest text-[#C5A880] uppercase font-bold leading-none">LIQUIDITY AT CONTRACT EXCHANGE</span>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs text-stone-300 font-light">Reservation (10%) + SDLT Tax</span>
                  <span className="font-mono text-lg font-bold text-stone-100">£{estimatedLiquidityNeeded.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[9px] text-[#FAF7F2]/60 pt-2 border-t border-stone-800 font-mono">
                  <span>RESERVATION FEE: £{exchangeReservationFee.toLocaleString()}</span>
                  <span>ESTIMATED SDLT CASH: £{sdltValue.toLocaleString()}</span>
                </div>
              </div>

              {/* Bottom security assurance footprint lines */}
              <div className="text-[8.5px] font-mono text-stone-500 space-y-1 pt-4 border-t border-stone-800 leading-normal">
                <p>REPORT STAGE KEY ID: SEC_X_2209</p>
                <p className="font-light">
                  All service configurations, stamp taxes, and finance profiles display estimated frameworks only. UK HM Revenue & Customs policies are subject to regulatory updates. Consultation with certified legal accountants in Mount Street is highly recommended.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
