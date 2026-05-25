import React, { useState } from 'react';
import { RESIDENCES } from '../data';
import { Residence, ResidenceType } from '../types';
import { Layers, CheckCircle2, ChevronRight, Eye, Grid, List, Sparkles } from 'lucide-react';

interface ResidencesSectionProps {
  onSelectResidenceForBooking: (residenceId: string) => void;
}

export const ResidencesSection: React.FC<ResidencesSectionProps> = ({
  onSelectResidenceForBooking
}) => {
  const [selectedType, setSelectedType] = useState<ResidenceType | 'All'>('All');
  const [selectedResidence, setSelectedResidence] = useState<Residence>(RESIDENCES[3]); // Default to Penthouse
  const [viewMode, setViewMode] = useState<'interactive' | 'grid'>('interactive');
  
  // Interactive Floorplan Hotspots
  const [activeHotspot, setActiveHotspot] = useState<'living' | 'bedroom' | 'kitchen' | 'bathroom'>('living');
  const [finishingPreset, setFinishingPreset] = useState<'classic' | 'minimalist' | 'obsidian'>('minimalist');

  // Filter residences
  const filteredResidences = selectedType === 'All' 
    ? RESIDENCES 
    : RESIDENCES.filter(r => r.type === selectedType);

  // Hotspot definitions based on active room
  const roomDetails = {
    living: {
      name: "Grand Living Salon",
      size: "24' x 18'",
      specs: [
        "Floor-to-ceiling multi-glaze glass wrapping the perimeter",
        "Chevron-pattern soundproof absolute white oak wood flooring",
        "Dual-zoned climate controls integrated with custom discrete vents",
        "Statuario luxury marble fireplace mantlepiece with warm backlighting"
      ],
      finishes: {
        minimalist: "Travertine Warm Stone & Textured Linen Walls",
        classic: "Muted Champagne Gold Accents & Cream Silk Wallcloth",
        obsidian: "Obsidian Nero Marquina Columns & Rich Velvet Textures"
      }
    },
    bedroom: {
      name: "Master Rest Suite",
      size: "16' x 15'",
      specs: [
        "Acoustically triple-shielded partitioning for complete silence",
        "Integrated custom leather-wrapped bedframe headboard niche",
        "Rimadesio absolute full-height sliding glass closet enclosures",
        "Subtle step-lighting around floor boundaries for soft night guidance"
      ],
      finishes: {
        minimalist: "Bleached Ash Panelling & Soft Cashmere Drapery",
        classic: "Satin Walnut Moulding & Ivory Velvet Bed Niche",
        obsidian: "Charcoal Slatted Wood Accents & Bronze Glass Closets"
      }
    },
    kitchen: {
      name: "Culinary display Galley",
      size: "14' x 11'",
      specs: [
        "Monolithic Calacatta Gold premium natural stone kitchen island",
        "Gaggenau induction suite and master convection system",
        "Sub-Zero fully integrated refrigerator and dual-climate wine preservation",
        "Bespoke touchless hand-built matte gold water fixtures"
      ],
      finishes: {
        minimalist: "Honed Travertine Countertops & Sand-blasted Elm Cabinets",
        classic: "Arabescato Calacatta Marble & Antique Brass Hardware",
        obsidian: "Nero Soapstone Monolith & Dark Charcoal Anodized Metal Cabinets"
      }
    },
    bathroom: {
      name: "Travertine Spa Wetroom",
      size: "12' x 10'",
      specs: [
        "Exiled-single-block marble freestanding soaking bath vessel",
        "Heated travertine floor slabs with dynamic digital moisture monitoring",
        "Rain-shower system with ceiling flush fixture and side multi-jets",
        "Corian twin console sinks paired with anti-steam smart mirror glass"
      ],
      finishes: {
        minimalist: "Sandstone Honed Tub & Matte Light Travertine Facade",
        classic: "Calacatta Gold Book-matched Walls & Polished Brass Fixtures",
        obsidian: "Dark Slate Slabs & Brushed Antique Gunmetal Brassware"
      }
    }
  };

  const activeRoomData = roomDetails[activeHotspot];

  return (
    <section className="bg-stone-50 py-16 md:py-24 px-6 border-b border-stone-200/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="block font-mono text-[10px] tracking-[0.3em] text-gold-500 font-semibold uppercase">EXQUISITE BLUEPRINTS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 font-normal">
              Residences tailored for <span className="italic text-gold-600">absolute repose</span>
            </h2>
            <p className="max-w-xl text-xs md:text-sm text-stone-800/70 font-light leading-relaxed">
              Explore our curated portfolio of sky homes. Select from spatial studio flats, spacious multi-bedroom family suites, and the majestic full-floor penthouse.
            </p>
          </div>

          {/* Toggle View Engine */}
          <div className="flex bg-stone-100 p-1.5 border border-stone-200/50">
            <button 
              onClick={() => setViewMode('interactive')}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-semibold tracking-widest cursor-pointer transition-all duration-300 ${
                viewMode === 'interactive' 
                  ? 'bg-stone-800 text-[#FAF7F2] shadow-sm' 
                  : 'text-stone-800/60 hover:text-stone-800'
              }`}
              id="btn-view-interactive"
            >
              <Layers className="w-3.5 h-3.5" />
              INTERACTIVE REVEAL
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-semibold tracking-widest cursor-pointer transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-stone-800 text-[#FAF7F2] shadow-sm' 
                  : 'text-stone-800/60 hover:text-stone-800'
              }`}
              id="btn-view-grid"
            >
              <Grid className="w-3.5 h-3.5" />
              SUITE GRID (LIST)
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap items-center gap-3 border-b border-stone-200/50 pb-6 mb-8">
          <span className="text-[10px] font-mono tracking-widest text-[#8E867C] uppercase mr-3">Filter Portfolios:</span>
          {(['All', 'Studio', 'One-Bed', 'Two-Bed', 'Penthouse'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-1.5 text-[10px] font-mono tracking-widest cursor-pointer transition-all duration-300 ${
                selectedType === type
                  ? 'bg-[#A88D65]/20 text-[#2C2621] border border-gold-500 font-semibold'
                  : 'border border-transparent text-[#8E867C]/80 hover:text-[#2C2621]'
              }`}
              id={`filter-type-${type.toLowerCase()}`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CONTENT METHOD A: Interactive Suite & Floor Explorer */}
        {viewMode === 'interactive' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Interactive Sidebar: Sky Tower Elevation Selector */}
            <div className="lg:col-span-3 flex lg:flex-col gap-3 justify-between bg-stone-100 p-5 border border-stone-200/50">
              <div className="hidden lg:block space-y-1 mb-4">
                <span className="block font-mono text-[9px] tracking-widest text-[#8E867C] uppercase">SKYLINE TOWER</span>
                <h4 className="font-serif text-charcoal-900 font-medium">Elevation Select</h4>
                <p className="text-[11px] text-stone-800/50 font-light leading-snug">Hover or click a level to inspect active residential options.</p>
              </div>

              {/* Tower Block Levels */}
              <div className="flex flex-row lg:flex-col-reverse gap-2 w-full">
                {RESIDENCES.map((res) => {
                  const isSelected = selectedResidence.id === res.id;
                  return (
                    <button
                      key={res.id}
                      onClick={() => setSelectedResidence(res)}
                      className={`flex-1 flex flex-col lg:flex-row justify-between items-center px-3 py-4 lg:py-3 cursor-pointer border transition-all duration-300 ${
                        isSelected 
                          ? 'bg-stone-800 text-stone-50 border-stone-800 shadow-md ring-2 ring-gold-500/10' 
                          : 'bg-stone-50 text-stone-800 border-stone-200/40 hover:bg-stone-200/30'
                      }`}
                      id={`level-selector-${res.id}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold tracking-wider">FL {res.floor}</span>
                        <div className={`hidden lg:block w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-gold-500 animate-pulse' : 'bg-stone-300'}`} />
                      </div>
                      <div className="text-right mt-1 lg:mt-0">
                        <span className="block text-[8px] font-mono tracking-widest uppercase opacity-70">
                          {res.type === 'Penthouse' ? 'PENTHOUSE' : `${res.bedrooms} REC`}
                        </span>
                        <span className="hidden lg:block text-[10px] font-serif tracking-wide">{res.name.split(' — ')[0]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Technical Marker Legend */}
              <div className="hidden lg:block border-t border-stone-200/50 pt-3 mt-4 text-[9px] font-mono tracking-wider text-light text-stone-800/60 leading-relaxed">
                <span className="font-semibold text-gold-500">FACILITY INDEX:</span> Integrated mechanical ventilation, air filter chambers, absolute sound-cancelling barrier framing.
              </div>
            </div>

            {/* Main Interactive Interactive Floorplan and Suite Detail Box */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Floorplan Vector Section */}
              <div className="md:col-span-7 bg-stone-100 border border-stone-200/40 p-6 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[480px] relative">
                
                {/* Header Information over Floorplan */}
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-[#8E867C] uppercase">SCHEMATIC BLUEPRINT</span>
                      <h4 className="font-serif text-lg text-charcoal-900 mt-1">{selectedResidence.name}</h4>
                    </div>
                    <div className="text-right font-mono">
                      <span className="block text-[11px] font-semibold text-gold-600">{selectedResidence.sizeSqFt} SQFT</span>
                      <span className="block text-[8px] tracking-widest text-[#8E867C] uppercase">{selectedResidence.exposure.split(' (')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Render vectors */}
                <div className="relative w-full h-64 md:h-72 my-4 border border-dashed border-[#C5A880]/30 flex items-center justify-center p-4">
                  {/* Outer Walls */}
                  <div className="absolute inset-4 border-2 border-[#2C2621]/40 rounded-sm">
                    {/* Living Room Area Outline */}
                    <div className="absolute top-0 left-0 w-[55%] h-[60%] border-r border-b border-[#2C2621]/20 p-2 flex flex-col justify-between">
                      <span className="text-[8px] font-mono tracking-widest text-stone-400">LIVING SALON</span>
                    </div>

                    {/* Dining/Kitchen Area Outline */}
                    <div className="absolute bottom-0 left-0 w-[55%] h-[40%] border-r border-[#2C2621]/20 p-2 flex flex-col justify-between">
                      <span className="text-[8px] font-mono tracking-widest text-stone-400">CULINARY GALLEY</span>
                    </div>

                    {/* Bedroom Area Outline */}
                    <div className="absolute top-0 right-0 w-[45%] h-[65%] border-b border-[#2C2621]/20 p-2 flex flex-col justify-between">
                      <span className="text-[8px] font-mono tracking-widest text-stone-400">MASTER CHAMBER</span>
                    </div>

                    {/* Spa Wet Bath Outline */}
                    <div className="absolute bottom-0 right-0 w-[45%] h-[35%] p-2 flex flex-col justify-between">
                      <span className="text-[8px] font-mono tracking-widest text-stone-400">TRAVERTINE SPA</span>
                    </div>
                  </div>

                  {/* Hotspots Interactive Markers */}
                  {/* Living Room Hotspot Button */}
                  <button 
                    onClick={() => setActiveHotspot('living')}
                    className={`absolute top-[30%] left-[28%] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-10 ${
                      activeHotspot === 'living' 
                        ? 'bg-gold-500 text-stone-50 scale-110 shadow-lg border-2 border-stone-50' 
                        : 'bg-[#FAF7F2]/90 hover:bg-gold-500 hover:text-stone-50 text-stone-800 shadow-sm border border-stone-300/60'
                    }`}
                    title="Inspect Living Salon"
                    id="hotspot-living"
                  >
                    <span className="text-[10px] font-mono font-bold">1</span>
                  </button>

                  {/* Bedroom Hotspot Button */}
                  <button 
                    onClick={() => setActiveHotspot('bedroom')}
                    className={`absolute top-[32%] right-[20%] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-10 ${
                      activeHotspot === 'bedroom' 
                        ? 'bg-gold-500 text-stone-50 scale-110 shadow-lg border-2 border-stone-50' 
                        : 'bg-[#FAF7F2]/90 hover:bg-gold-500 hover:text-stone-50 text-stone-800 shadow-sm border border-stone-300/60'
                    }`}
                    title="Inspect Master chamber"
                    id="hotspot-bedroom"
                  >
                    <span className="text-[10px] font-mono font-bold">2</span>
                  </button>

                  {/* Kitchen Hotspot Button */}
                  <button 
                    onClick={() => setActiveHotspot('kitchen')}
                    className={`absolute bottom-[20%] left-[28%] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-10 ${
                      activeHotspot === 'kitchen' 
                        ? 'bg-gold-500 text-stone-50 scale-110 shadow-lg border-2 border-stone-50' 
                        : 'bg-[#FAF7F2]/90 hover:bg-gold-500 hover:text-stone-50 text-stone-800 shadow-sm border border-stone-300/60'
                    }`}
                    title="Inspect Culinary Galley"
                    id="hotspot-kitchen"
                  >
                    <span className="text-[10px] font-mono font-bold">3</span>
                  </button>

                  {/* Bathroom Hotspot Button */}
                  <button 
                    onClick={() => setActiveHotspot('bathroom')}
                    className={`absolute bottom-[16%] right-[20%] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-10 ${
                      activeHotspot === 'bathroom' 
                        ? 'bg-gold-500 text-stone-50 scale-110 shadow-lg border-2 border-stone-50' 
                        : 'bg-[#FAF7F2]/90 hover:bg-gold-500 hover:text-stone-50 text-stone-800 shadow-sm border border-stone-300/60'
                    }`}
                    title="Inspect Travertine Spa"
                    id="hotspot-bathroom"
                  >
                    <span className="text-[10px] font-mono font-bold">4</span>
                  </button>
                </div>

                {/* Hotspot Tip Box */}
                <div className="flex justify-between items-center bg-stone-50 px-4 py-2 border border-stone-200/50 text-[10px] text-stone-800/60 font-mono">
                  <span>🎯 CLICK INNER BLUEPRINT HOTSPOTS FOR MATERIALS</span>
                  <span>(1-4 SPATIAL SECTORS)</span>
                </div>
              </div>

              {/* SPECIFICATION CARD AND FINISHING CUSTOMIZER (3 Right cols) */}
              <div className="md:col-span-5 space-y-6">
                
                {/* Hotspot Room Specs Panel */}
                <div className="bg-stone-100 p-6 border border-stone-200/40 rounded-none space-y-4">
                  <div className="flex justify-between items-center border-b border-stone-200/50 pb-3">
                    <div>
                      <span className="block text-[9px] font-mono tracking-widest text-gold-600 font-semibold uppercase">ROOM SPECIFICATION</span>
                      <h5 className="font-serif text-lg text-charcoal-900 font-normal mt-0.5">{activeRoomData.name}</h5>
                    </div>
                    <span className="px-2.5 py-1 bg-stone-200 text-stone-800 text-[10px] font-mono">{activeRoomData.size}</span>
                  </div>

                  {/* Specs List */}
                  <ul className="space-y-3">
                    {activeRoomData.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-800/80 font-light leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 mt-0.5 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Dynamic Finishing Presets inside the Hotspot */}
                  <div className="border-t border-stone-200/50 pt-4 space-y-3">
                    <span className="block text-[9px] font-mono tracking-widest text-[#8E867C] uppercase">FINISHING SPEC SCHEME:</span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFinishingPreset('minimalist')}
                        className={`flex-1 text-[8px] font-mono tracking-widest py-1.5 border transition-all duration-300 ${
                          finishingPreset === 'minimalist'
                            ? 'bg-stone-800 text-stone-50 border-stone-800 font-semibold'
                            : 'bg-stone-50 text-stone-800/70 border-stone-200 hover:bg-stone-200/20'
                        }`}
                        id="preset-minimalist"
                      >
                        TRAVERTINE MINIMAL
                      </button>
                      <button
                        onClick={() => setFinishingPreset('classic')}
                        className={`flex-1 text-[8px] font-mono tracking-widest py-1.5 border transition-all duration-300 ${
                          finishingPreset === 'classic'
                            ? 'bg-stone-800 text-stone-50 border-stone-800 font-semibold'
                            : 'bg-stone-50 text-stone-800/70 border-stone-200 hover:bg-stone-200/20'
                        }`}
                        id="preset-classic"
                      >
                        CHAMPAGNE CLASSIC
                      </button>
                      <button
                        onClick={() => setFinishingPreset('obsidian')}
                        className={`flex-1 text-[8px] font-mono tracking-widest py-1.5 border transition-all duration-300 ${
                          finishingPreset === 'obsidian'
                            ? 'bg-stone-800 text-stone-50 border-stone-800 font-semibold'
                            : 'bg-stone-50 text-stone-800/70 border-stone-200 hover:bg-stone-200/20'
                        }`}
                        id="preset-obsidian"
                      >
                        OBSIDIAN NERO
                      </button>
                    </div>

                    {/* Preset Output */}
                    <div className="bg-stone-50 p-3.5 border border-stone-200/50 rounded-none">
                      <span className="block text-[8px] font-mono tracking-widest text-gold-500 font-semibold">REVEALED MATERIAL BATCH:</span>
                      <span className="block text-[11px] font-medium text-stone-800/90 mt-1 uppercase italic leading-none">
                        {activeRoomData.finishes[finishingPreset]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Selector */}
                <div className="bg-stone-800 text-stone-50 p-6 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-mono tracking-widest opacity-70 uppercase">STARTING INVESTMENT</span>
                    <span className="text-xl font-mono text-gold-500 font-semibold">
                      £{selectedResidence.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] opacity-70 font-light leading-relaxed">
                    Pricing structure includes tailored construction layouts config, custom wood selection, and concierge club entitlement.
                  </p>
                  <button
                    onClick={() => onSelectResidenceForBooking(selectedResidence.id)}
                    className="w-full bg-[#FAF7F2] hover:bg-gold-500 text-stone-900 hover:text-stone-50 font-semibold text-[10px] tracking-widest py-3 transition-all duration-300 cursor-pointer"
                    id="btn-select-for-booking"
                  >
                    SELECT & SCHEDULE VIEWING
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* CONTENT METHOD B: Direct Grid View Portfolio */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredResidences.map((res) => (
              <div 
                key={res.id} 
                className="bg-stone-100 border border-stone-200/50 group overflow-hidden flex flex-col justify-between"
                id={`grid-card-${res.id}`}
              >
                {/* Photo Header */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-300">
                  <img
                    src={res.image}
                    alt={res.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-stone-50/90 backdrop-blur-md px-3 py-1 border border-stone-200/50 text-[9px] font-mono tracking-widest font-semibold text-stone-800 uppercase">
                    {res.type}
                  </div>
                </div>

                {/* Spec Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-[10px] text-stone-800/60 font-semibold">FLOOR {res.floor}</span>
                      <span className="font-mono text-[10px] text-gold-600 font-semibold">{res.exposure.split(' (')[0]}</span>
                    </div>
                    <h3 className="font-serif text-lg text-charcoal-900 font-medium">{res.name.split(' — ')[0]}</h3>
                    <p className="text-xs text-stone-800/70 font-light leading-relaxed line-clamp-3 pt-1">
                      {res.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-stone-200/50">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-stone-800/50 font-light">Suite Size:</span>
                      <span className="text-stone-800/90 font-medium">{res.sizeSqFt} SQFT</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-stone-800/50 font-light">Bedrooms:</span>
                      <span className="text-stone-800/90 font-medium">{res.bedrooms === 0 ? 'Studio Suite' : res.bedrooms}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-stone-800/50 font-light">Bathrooms:</span>
                      <span className="text-stone-800/90 font-medium">{res.bathrooms} SPA</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-[10px] font-mono tracking-wider text-stone-800/60 uppercase">Investment:</span>
                      <span className="text-base font-semibold font-mono text-[#2C2621]">£{res.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 w-full">
                    <button
                      onClick={() => {
                        setSelectedResidence(res);
                        setViewMode('interactive');
                      }}
                      className="flex-1 text-center bg-stone-200 hover:bg-stone-300/80 text-stone-800 text-[10px] tracking-widest font-semibold py-2.5 transition-colors cursor-pointer"
                      id={`btn-inspect-grid-${res.id}`}
                    >
                      BLUEPRINT
                    </button>
                    <button
                      onClick={() => onSelectResidenceForBooking(res.id)}
                      className="flex-1 text-center bg-stone-800 hover:bg-gold-500 text-stone-50 text-[10px] tracking-widest font-semibold py-2.5 transition-colors cursor-pointer"
                      id={`btn-book-grid-${res.id}`}
                    >
                      SCHEDULE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
