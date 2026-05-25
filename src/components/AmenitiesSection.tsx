import React, { useState } from 'react';
import { AMENITIES } from '../data';
import { Clock, MapPin, CheckCircle, ShieldAlert, Sparkles, Star } from 'lucide-react';

export const AmenitiesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAmenity = AMENITIES[activeIndex];

  return (
    <section className="bg-stone-50 py-16 md:py-24 px-6 border-b border-stone-200/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="block font-mono text-[10px] tracking-[0.3em] text-gold-500 font-semibold uppercase animate-pulse">EXCLUSIVE ENTITLEMENT</span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal-900 font-normal leading-[1.15]">
            Spaces crafted around <span className="italic text-gold-600 font-serif">sensory experience</span>
          </h2>
          <p className="text-xs md:text-sm text-stone-800/70 font-light leading-relaxed">
            The Halo isn't merely a residential tower—it's a sanctuary of premium utilities curated to elevate your physical, mental, and social health.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-12">
          {AMENITIES.map((amenity, idx) => (
            <button
              key={amenity.id}
              onClick={() => setActiveIndex(idx)}
              className={`w-full sm:w-auto px-6 py-3.5 text-left sm:text-center text-[10px] font-mono tracking-widest border cursor-pointer transition-all duration-300 relative ${
                activeIndex === idx
                  ? 'bg-stone-800 text-stone-50 border-stone-800 font-semibold shadow-md'
                  : 'bg-stone-100/60 text-stone-800/70 border-stone-200 hover:bg-stone-200/20'
              }`}
              id={`amenity-tab-${amenity.id}`}
            >
              {amenity.title.toUpperCase()}
              {activeIndex === idx && (
                <span className="hidden sm:block absolute bottom-0 left-0 right-0 h-[3px] bg-gold-500" />
              )}
            </button>
          ))}
        </div>

        {/* Featured Content Dynamic Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-stone-100 p-6 md:p-10 border border-stone-200/40">
          
          {/* Amenity Image Frame (5 columns) */}
          <div className="lg:col-span-5 relative flex flex-col justify-between">
            <div className="relative w-full aspect-[4/3] lg:h-full lg:aspect-auto overflow-hidden bg-stone-200 shadow-xl border border-stone-200">
              <img
                src={activeAmenity.image}
                alt={activeAmenity.title}
                className="w-full h-full object-cover select-none object-center"
                referrerPolicy="no-referrer"
                id={`amenity-img-${activeAmenity.id}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/45 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Quick Specs overlay on Mobile */}
            <div className="absolute top-4 right-4 bg-stone-50/95 backdrop-blur-md border border-stone-200 px-3 py-1.5 flex items-center gap-1.5 text-[9px] font-mono text-stone-800">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>SUPERIOR TIERS COGNIZANCE</span>
            </div>
          </div>

          {/* Amenity Descriptive Detail Block (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              {/* Technical indicators */}
              <div className="flex flex-wrap gap-4 text-[10px] font-mono text-stone-800/80 border-b border-stone-200/50 pb-5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  <span className="font-semibold uppercase">LOCATION:</span>
                  <span className="bg-stone-200/60 px-2 py-0.5">{activeAmenity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-500" />
                  <span className="font-semibold uppercase">HOURS IN SERVICE:</span>
                  <span className="bg-stone-200/60 px-2 py-0.5">{activeAmenity.hours}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal-900 font-normal">{activeAmenity.title}</h3>
                <p className="text-xs md:text-sm text-stone-800/80 font-light leading-relaxed">
                  {activeAmenity.description}
                </p>
              </div>

              {/* Features checkmarks */}
              <div className="space-y-4 pt-2">
                <h4 className="text-[10px] font-mono tracking-widest text-[#8E867C] font-semibold uppercase">PREMIUM INCLUSIONS OR RIGHTS:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeAmenity.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500/30 mt-0.5 shrink-0" />
                      <span className="text-xs text-stone-800/90 font-light leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Exclusive Club Entitlement Disclosure */}
            <div className="border-t border-stone-200/60 pt-6 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono">
              <div className="flex items-center gap-2 text-stone-800/60">
                <ShieldAlert className="w-4 h-4 text-gold-500" />
                <span>Restricted to residents and VIP guests only</span>
              </div>
              <div className="text-right text-[#C5A880] font-semibold tracking-wider">
                COFFEE & CONCIERGE LEVEL STEWARD IN SERVICE
              </div>
            </div>

          </div>

        </div>

        {/* Decorative architectural grid overview summary tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-stone-100 p-6 border border-stone-200/30 text-center space-y-2">
            <span className="block font-serif text-3xl font-normal text-gold-500">24/7</span>
            <span className="block text-[10px] font-mono tracking-widest text-stone-800/60 uppercase">CONCIERGE STEWARDSHIP</span>
            <p className="text-[11px] text-stone-800/50 font-light leading-relaxed">An expert steward team standing by to satisfy restaurant reservations, wine deliveries, or valet bookings.</p>
          </div>
          <div className="bg-stone-100 p-6 border border-stone-200/30 text-center space-y-2">
            <span className="block font-serif text-3xl font-normal text-gold-500">HEALTH</span>
            <span className="block text-[10px] font-mono tracking-widest text-stone-800/60 uppercase">THERMODYNAMIC RECOVERY</span>
            <p className="text-[11px] text-stone-800/50 font-light leading-relaxed">Complete dry Finnish saunas, rapid plunge basins, and herbal skin towels available directly within our fitness complex.</p>
          </div>
          <div className="bg-stone-100 p-6 border border-stone-200/30 text-center space-y-2">
            <span className="block font-serif text-3xl font-normal text-gold-500">SECURE</span>
            <span className="block text-[10px] font-mono tracking-widest text-stone-800/60 uppercase">BIOMETRIC PRIVACY KEY</span>
            <p className="text-[11px] text-stone-800/50 font-light leading-relaxed">Secure double-auth fob and fingerprint entry limits all lifts and amenities strictly to verified occupants.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
