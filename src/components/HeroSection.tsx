import React from 'react';
import { Compass, Sparkles, MapPin, Milestone, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreResidences: () => void;
  onBookViewing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreResidences,
  onBookViewing
}) => {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-5rem)] bg-[#FAF7F2] flex flex-col justify-between py-12 md:py-20 px-6">
      {/* Structural Minimal Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#C5A880_1px,transparent_1px),linear-gradient(to_bottom,#C5A880_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Editorial Text Block */}
        <div className="lg:col-span-6 flex flex-col items-start gap-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200/50 text-[10px] tracking-[0.25em] text-gold-600 font-medium font-mono uppercase">
            <Sparkles className="w-3 h-3 text-gold-500 animate-pulse" />
            NOW LEASING PINNACLE SUITES
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-charcoal-900 leading-[1.1] font-normal" id="hero-tagline">
              <span className="block text-[13px] md:text-sm tracking-[0.3em] text-gold-500 font-sans uppercase font-medium mb-4">THE HALO RESIDENCES</span>
              <span className="block text-4xl sm:text-5xl md:text-6xl tracking-tight">Elevated city living,</span>
              <span className="block text-4xl sm:text-5xl md:text-6xl tracking-tight text-gold-500 italic font-serif">shaped around calm.</span>
            </h1>

            <p className="max-w-md text-stone-800/80 text-sm md:text-base font-light leading-relaxed pt-2">
              A private enclave in the sky, blending high-end architectural geometry with organic textures of travertine stone, Belgian white oak, and quiet luxury. Experience serenity at the pinnacle of metropolitan splendor.
            </p>
          </div>

          {/* Luxury CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-4">
            <button
              onClick={onExploreResidences}
              className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-[#FAF7F2] bg-stone-800 hover:bg-gold-500 px-8 py-4 transition-all duration-300 relative group overflow-hidden cursor-pointer shadow-md"
              id="hero-cta-residences"
            >
              <span>VIEW RESIDENCES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <button
              onClick={onBookViewing}
              className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-stone-800 bg-transparent hover:bg-stone-100 border border-stone-800/20 hover:border-stone-800/60 px-8 py-4 transition-colors duration-300 cursor-pointer"
              id="hero-cta-view"
            >
              BOOK A PRIVATE VIEWING
            </button>
          </div>

          {/* Quick Location Badge */}
          <div className="flex items-center gap-2.5 text-[11px] font-mono tracking-wider text-stone-800/60 pt-4">
            <MapPin className="w-3.5 h-3.5 text-gold-500" />
            <span>21 PARK LANE, MAYFAIR, LONDON W1K 1PR</span>
          </div>
        </div>

        {/* Framing Architectural Showcase */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          {/* Accent Gold Frame Offset */}
          <div className="absolute -inset-2.5 border border-gold-500/30 -translate-x-2 -translate-y-2 pointer-events-none rounded-none" />

          {/* Main Hero Shot Frame */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16:10] lg:aspect-[4/3] bg-stone-200 overflow-hidden shadow-2xl group border-4 border-stone-50">
            <img
              src="/images/halo-exterior-facade.jpeg"
              alt="The Halo Tower Exterior Mockup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
              id="hero-main-img"
            />
            {/* Absolute Ambient Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-60" />

            {/* Float Info Badge inside Image */}
            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-stone-50">
              <div className="font-serif">
                <span className="block text-[10px] tracking-[0.3em] uppercase opacity-70">ARCHITECT SERIES</span>
                <span className="block text-base tracking-wide mt-1">Travertine and Glass Facade</span>
              </div>
              <div className="bg-stone-50/10 backdrop-blur-md border border-stone-50/20 px-3 py-1 text-[10px] font-mono tracking-widest uppercase">
                EST. 2026
              </div>
            </div>
          </div>

          {/* Decorative Corner Lines */}
          <div className="absolute top-0 right-0 w-8 h-[1px] bg-gold-500" />
          <div className="absolute top-0 right-0 w-[1px] h-8 bg-gold-500" />
          <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-gold-500" />
          <div className="absolute bottom-0 left-0 w-[1px] h-8 bg-gold-500" />
        </div>
      </div>

      {/* Triple Quality Spec Ribbon */}
      <div className="max-w-7xl mx-auto w-full border-t border-stone-200/50 pt-10 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 text-left">
        <div>
          <span className="block font-mono text-[9px] tracking-widest text-gold-500 font-semibold mb-1">01 / HEIGHT OF LIVING</span>
          <h3 className="font-serif text-lg text-charcoal-900 font-normal">25 Levels of Pure Elevation</h3>
          <p className="text-[12px] text-stone-800/60 font-light mt-1">Double-height structural volumes overlooking continuous natural sunsets.</p>
        </div>
        <div className="border-t sm:border-t-0 sm:border-l border-stone-200/50 pt-6 sm:pt-0 sm:pl-10">
          <span className="block font-mono text-[9px] tracking-widest text-gold-500 font-semibold mb-1">02 / INTERIOR MASTERPLAN</span>
          <h3 className="font-serif text-lg text-charcoal-900 font-normal">Bespoke Travertine & Brass</h3>
          <p className="text-[12px] text-stone-800/60 font-light mt-1">Bespoke hand-selected Italian marble and native white-oak floor carpentry.</p>
        </div>
        <div className="border-t sm:border-t-0 sm:border-l border-stone-200/50 pt-6 sm:pt-0 sm:pl-10">
          <span className="block font-mono text-[9px] tracking-widest text-gold-500 font-semibold mb-1">03 / CONCIERGE LEVEL</span>
          <h3 className="font-serif text-lg text-charcoal-900 font-normal">Dedicated Club Sommelier</h3>
          <p className="text-[12px] text-stone-800/60 font-light mt-1">24-hour steward, climate wine cellar, and private rooftop sky basins.</p>
        </div>
      </div>
    </section>
  );
};
