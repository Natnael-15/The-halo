import React, { useState, useEffect } from 'react';
import { RESIDENCES } from '../data';
import { ViewingRequest } from '../types';
import { Calendar, Clock, Send, ShieldCheck, Ticket, RefreshCw, Printer, AlertCircle } from 'lucide-react';

interface BookingFormProps {
  selectedResidenceId: string;
  onBookingSuccess: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedResidenceId,
  onBookingSuccess
}) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [residenceId, setResidenceId] = useState(selectedResidenceId);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00'); // Default to afternoon
  const [notes, setNotes] = useState('');

  // UI States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<ViewingRequest | null>(null);

  // Sync state if selectedResidenceId changes externally
  useEffect(() => {
    if (selectedResidenceId) {
      setResidenceId(selectedResidenceId);
    }
  }, [selectedResidenceId]);

  // Handle pre-filled default tomorrow date for convenience
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setPreferredDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your contact phone.';
    } else if (phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid telephone number.';
    }
    if (!preferredDate) newErrors.preferredDate = 'Please select a date.';
    if (!residenceId) newErrors.residenceId = 'Please select a residence suite.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate luxury API response lag
    setTimeout(() => {
      const suiteName = RESIDENCES.find(r => r.id === residenceId)?.name || 'Executive Suite';
      const booking: ViewingRequest = {
        id: `HALO-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName,
        email,
        phone,
        preferredDate,
        preferredTime,
        residenceId,
        notes,
        confirmed: true
      };

      setCreatedBooking(booking);
      setIsSubmitting(false);
      onBookingSuccess();
    }, 1500);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setCreatedBooking(null);
    setErrors({});
  };

  const activeRes = RESIDENCES.find(r => r.id === (createdBooking?.residenceId || residenceId));

  // Visual options for appointment times (corresponds to lighting/mood)
  const timeOptions = [
    { value: '10:00', label: '10:00 AM — Dawn Serenity Corridor', desc: 'Optimal natural ambient morning backlight' },
    { value: '14:00', label: '02:00 PM — Sunlight Architectural Reveal', desc: 'High stark overhead glass projection' },
    { value: '17:00', label: '05:00 PM — Sunset Golden Hour Highlight', desc: 'Stunning warm rays bouncing off travertine stone panels' }
  ];

  const handlePrint = () => {
    window.print();
  };

  if (createdBooking) {
    return (
      <div className="bg-stone-100 p-6 md:p-12 border border-stone-200/50 max-w-3xl mx-auto my-12 animate-fade-in" id="booking-success-block">
        <div className="text-center space-y-3 mb-8">
          <div className="w-12 h-12 bg-gold-500/10 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-2 border border-gold-500">
            <Ticket className="w-6 h-6" />
          </div>
          <span className="block font-mono text-[9px] tracking-widest text-gold-500 font-bold uppercase">ACCESS CODE ASSIGNED</span>
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal-900 font-normal">Your Private Viewing is Confirmed</h3>
          <p className="text-xs text-stone-800/60 font-light max-w-md mx-auto">
            A confirmation pass and diagnostic address itinerary have been registered under your profile. Please present this credential upon arriving at the main gatehouse.
          </p>
        </div>

        {/* ELEGANT CONFIDENTIAL INVITATION PASS */}
        <div className="bg-[#100F0D] text-stone-50 border border-gold-500/35 p-6 md:p-8 relative overflow-hidden shadow-2xl rounded-none flex flex-col justify-between select-none">
          {/* Accent corner gold triangles */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-gold-500 to-transparent opacity-20 pointer-events-none" />
          <div className="absolute -left-6 -top-6 w-12 h-12 border border-gold-500 rotate-45 opacity-25" />
          <div className="absolute -right-6 -bottom-6 w-12 h-12 border border-gold-500 rotate-45 opacity-25" />

          {/* Header watermark */}
          <div className="border-b border-stone-800/80 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="block text-[8px] font-mono tracking-[0.3em] text-[#C5A880] leading-none">THE HALO RESIDENCES</span>
              <span className="block text-sm font-serif tracking-widest text-stone-100 font-medium mt-1 uppercase">VIP VIEWING CREDENTIAL</span>
            </div>
            <div className="font-mono text-left sm:text-right">
              <span className="block text-[8px] text-stone-500 uppercase tracking-widest">REG NO / PASS</span>
              <span className="block text-xs font-semibold text-[#FAF7F2] font-semibold">{createdBooking.id}</span>
            </div>
          </div>

          {/* Core Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b border-stone-800/80 my-2 items-center">
            
            {/* VIP Holder */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="block text-[8px] font-mono tracking-widest text-[#8E867C] uppercase">REGISTERED ATTENDEE</span>
                <span className="block text-sm text-[#FAF7F2] font-semibold tracking-wide capitalize">{createdBooking.fullName}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] font-mono tracking-widest text-[#8E867C] uppercase">PORTFOLIO ASSIGNED</span>
                <span className="block text-sm text-[#FAF7F2] font-medium">{activeRes?.name || 'Executive Area'}</span>
              </div>
              <div className="space-y-1 pt-2">
                <span className="block text-[8px] font-mono tracking-widest text-[#8E867C] uppercase">APPOINTMENT DATE</span>
                <span className="block text-xs text-[#FAF7F2] font-mono tracking-wide">{createdBooking.preferredDate}</span>
              </div>
              <div className="space-y-1 pt-2 font-mono">
                <span className="block text-[8px] font-mono tracking-widest text-[#8E867C] uppercase font-bold text-gold-500">LIGHTING & TIME EXPERIENCE</span>
                <span className="block text-[11px] text-[#FAF7F2] tracking-wide">
                  {timeOptions.find(t => t.value === createdBooking.preferredTime)?.label.split(' — ')[1] || 'Afternoon Segment'} ({createdBooking.preferredTime})
                </span>
              </div>
            </div>

            {/* Custom SVG QR Code / Barcode visualization */}
            <div className="md:col-span-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-stone-800/80 pt-6 md:pt-0 md:pl-6 text-center">
              <div className="w-24 h-24 bg-stone-50 p-2 border border-gold-500/20 rounded-none flex items-center justify-center">
                {/* Clean inline structural SVG QR Mockup */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-stone-900 fill-current">
                  <path d="M0 0h30v30H0zm10 10h10v10H10zm60-10h30v30H70zm10 10h10v10H10v10zM0 70h30v30H0zm10 10h10v10H10zm35-35h10v10H45zm15 15h10v10H60zm10-10h10v10H70zm10 15h10v10H80zm5 5h10v10H85zm-45 5h10v10H40zm15 5h10v10H55zm20 5h10v10H75z" />
                </svg>
              </div>
              <span className="block text-[7px] font-mono tracking-[0.25em] text-[#8E867C] mt-2 uppercase">GENUINE ATTEST PROTOCOL</span>
            </div>

          </div>

          {/* Footer Terms */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 text-[9px] font-mono text-stone-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span>Complimentary private garage valet access authorized.</span>
            </span>
            <span className="italic">THE HALO STEWARD COGNIZANCE REGISTRY</span>
          </div>

        </div>

        {/* Action Controls for Successful Print */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-3 border border-stone-800/20 hover:border-stone-800 text-stone-800 text-[10px] tracking-widest font-semibold cursor-pointer transition-colors bg-stone-50"
            id="btn-print-invite"
          >
            <Printer className="w-3.5 h-3.5" />
            PRINT PASS
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-3 bg-stone-800 hover:bg-gold-500 text-stone-50 text-[10px] tracking-widest font-semibold cursor-pointer transition-colors"
            id="btn-register-another"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            REGISTER ANOTHER APPOINTMENT
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-stone-100 py-16 md:py-24 px-6" id="scheduling-anchor">
      <div className="max-w-4xl mx-auto">
        
        {/* Dynamic Frame Banner */}
        <div className="bg-stone-50 p-8 md:p-12 border border-stone-200/50 shadow-sm relative overflow-hidden">
          
          <div className="space-y-4 mb-8">
            <span className="block font-mono text-[10px] tracking-[0.3em] text-gold-500 font-semibold uppercase">PRIVATE DIALOG PORTAL</span>
            <h2 className="font-serif text-3xl text-charcoal-900 font-normal">
              Schedule a <span className="italic text-gold-600 font-serif">private showing</span>
            </h2>
            <p className="text-xs md:text-sm text-stone-800/70 font-light max-w-xl leading-relaxed">
              Appointments are held strictly under discretion. Choose a preferred floor residence model below to receive your biometric invitation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Split row inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-mono tracking-widest text-[#8E867C] uppercase font-semibold">YOUR FULL NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Sterling Hunter"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full bg-[#FAF7F2] p-3 text-sm border focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-none placeholder-stone-400 ${
                    errors.fullName ? 'border-red-500/50' : 'border-stone-200'
                  }`}
                  id="field-fullname"
                />
                {errors.fullName && (
                  <p className="text-[10px] text-red-500 font-mono flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-mono tracking-widest text-[#8E867C] uppercase font-semibold">EMAIL CORRESPONDENCE</label>
                <input
                  type="email"
                  placeholder="e.g. sterling@luxury.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-[#FAF7F2] p-3 text-sm border focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-none placeholder-stone-400 ${
                    errors.email ? 'border-red-500/50' : 'border-stone-200'
                  }`}
                  id="field-email"
                />
                {errors.email && (
                  <p className="text-[10px] text-red-500 font-mono flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Contact Phone */}
              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-mono tracking-widest text-[#8E867C] uppercase font-semibold">TELEPHONE CONNECTION</label>
                <input
                  type="tel"
                  placeholder="e.g. +44 20 7946 0192"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full bg-[#FAF7F2] p-3 text-sm border focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-none placeholder-stone-400 ${
                    errors.phone ? 'border-red-500/50' : 'border-stone-200'
                  }`}
                  id="field-phone"
                />
                {errors.phone && (
                  <p className="text-[10px] text-red-500 font-mono flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Selected Suite Dropdown */}
              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-mono tracking-widest text-[#8E867C] uppercase font-semibold">PREFERRED RESIDENCE</label>
                <select
                  value={residenceId}
                  onChange={(e) => setResidenceId(e.target.value)}
                  className={`w-full bg-[#FAF7F2] p-3 text-sm border focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-none cursor-pointer ${
                    errors.residenceId ? 'border-red-500/50' : 'border-stone-200'
                  }`}
                  id="field-residence"
                >
                  <option value="">Select Suite Layout...</option>
                  {RESIDENCES.map((res) => (
                    <option key={res.id} value={res.id}>
                      {res.name} — FL {res.floor} (£{res.price.toLocaleString()})
                    </option>
                  ))}
                </select>
                {errors.residenceId && (
                  <p className="text-[10px] text-red-500 font-mono flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.residenceId}
                  </p>
                )}
              </div>

            </div>

            {/* Appointment Date and Time Experience choices */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
              
              {/* Date Input */}
              <div className="space-y-1.5 text-left md:col-span-4">
                <label className="block text-[10px] font-mono tracking-widest text-[#8E867C] uppercase font-semibold">PREFERRED DATE</label>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className={`w-full bg-[#FAF7F2] p-3 text-sm border focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-none cursor-pointer ${
                      errors.preferredDate ? 'border-red-500/50' : 'border-stone-200'
                    }`}
                    id="field-preferreddate"
                  />
                </div>
                {errors.preferredDate && (
                  <p className="text-[10px] text-red-500 font-mono flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              {/* Time Lighting Experience Selector */}
              <div className="space-y-1.5 text-left md:col-span-8">
                <label className="block text-[10px] font-mono tracking-widest text-[#8E867C] uppercase font-semibold">DAYLIGHT EXPERIENCE FOCUS</label>
                <div className="space-y-2">
                  {timeOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-start justify-between p-3 border cursor-pointer select-none transition-all duration-300 ${
                        preferredTime === opt.value
                          ? 'bg-stone-800 text-stone-50 border-stone-800'
                          : 'bg-[#FAF7F2] border-stone-200 hover:bg-stone-200/10'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredTime"
                        value={opt.value}
                        checked={preferredTime === opt.value}
                        onChange={() => setPreferredTime(opt.value)}
                        className="sr-only"
                      />
                      <div className="space-y-0.5">
                        <span className="block text-xs font-semibold tracking-wide">{opt.label}</span>
                        <span className={`block text-[10px] font-light ${preferredTime === opt.value ? 'text-[#C5A880]' : 'text-stone-800/60'}`}>
                          {opt.desc}
                        </span>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center mt-1 shrink-0 ${
                        preferredTime === opt.value ? 'border-gold-500 bg-gold-500' : 'border-stone-400'
                      }`}>
                        {preferredTime === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-stone-50" />}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Special Requests / Notes */}
            <div className="space-y-1.5 text-left pt-2">
              <label className="block text-[10px] font-mono tracking-widest text-[#8E867C] uppercase font-semibold">ACCOMMODATION OR SPECIFIC DIALOG NOTES (OPTIONAL)</label>
              <textarea
                rows={3}
                placeholder="e.g., Requesting custom wine tasting briefing, private lift access parameters, or bespoke master bathroom marble revisions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#FAF7F2] p-3 text-sm border border-stone-200 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-none placeholder-stone-400"
                id="field-notes"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#8E867C]/80 italic">🛡️ Discretion and data protection secured under contract</span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-[#2C2621] hover:bg-[#C5A880] text-[#FAF7F2] hover:text-stone-900 font-semibold tracking-wider text-[10px] px-8 py-3.5 transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
                id="btn-submit-booking"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3 h-3 rounded-full border-t border-r border-[#FAF7F2] animate-spin" />
                    <span>TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <span>REGISTER SECURE VIEWING</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
