import React, { useState } from 'react';
import { MapPin, Compass, Navigation, Landmark, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandmarkItem {
  id: string;
  name: string;
  category: 'Gastronomy' | 'Retail' | 'Private Clubs' | 'Wellness & Nature';
  distanceWalk: string;
  distanceChauffeur: string;
  address: string;
  description: string;
  image: string;
  coordinates: { x: number; y: number }; // Percentage position on the visual grid
}

const MAYFAIR_LANDMARKS: LandmarkItem[] = [
  {
    id: 'h-connaught',
    name: 'Hélène Darroze at The Connaught',
    category: 'Gastronomy',
    distanceWalk: '3 mins',
    distanceChauffeur: '1 min',
    address: 'Carlos Place, Mayfair, W1K 2AL',
    description: 'Three Michelin-starred culinary craft overseen by chef Hélène Darroze. Featuring custom-moulded plaster walls, pink-hued bespoke glass fittings, and a rare collection of vintage Armagnacs.',
    image: '/images/restaurant-fine-dining.jpeg',
    coordinates: { x: 42, y: 35 }
  },
  {
    id: 'scotts',
    name: "Scott's of Mayfair",
    category: 'Gastronomy',
    distanceWalk: '4 mins',
    distanceChauffeur: '2 mins',
    address: '20 Mount St, Mayfair, W1K 2HE',
    description: 'An legendary gourmet landmark serving exquisite oysters and wild-caught structural seafood platters. Highly popular among London\'s prominent intellectual, artistic, and aristocratic circles.',
    image: '/images/scotts-mayfair-oyster-bar.jpeg',
    coordinates: { x: 55, y: 48 }
  },
  {
    id: 'celine-mount',
    name: 'Celine Maison Mount Street',
    category: 'Retail',
    distanceWalk: '3 mins',
    distanceChauffeur: '1 min',
    address: '103 Mount St, Mayfair, W1K 2TJ',
    description: 'A striking structural store carved entirely out of travertine slabs and matte black steel panels. Hosts custom leather tailoring capsules, high perfumery collections, and hand-woven luxury silk garments.',
    image: '/images/luxury-store-travertine-slabs.jpeg',
    coordinates: { x: 68, y: 56 }
  },
  {
    id: 'savile-row',
    name: 'Bespoke Tailors of Savile Row',
    category: 'Retail',
    distanceWalk: '8 mins',
    distanceChauffeur: '3 mins',
    address: 'Savile Row, Mayfair, W1S 3NY',
    description: 'The golden epicenter of masculine elegance. Home to legendary ateliers creating handmade, canvas-backed patterns perfectly adjusted to one\'s personal stature.',
    image: '/images/tailors-workshop-wool-tweed.jpeg',
    coordinates: { x: 80, y: 22 }
  },
  {
    id: 'annabels',
    name: "Annabel's Private Club",
    category: 'Private Clubs',
    distanceWalk: '5 mins',
    distanceChauffeur: '2 mins',
    address: '46 Berkeley Square, W1J 5AT',
    description: 'A Grade I listed townhouse of staggering scale, pairing highly detailed rococo crystal dining halls with private cigar terraces, garden rooms, and elite world-level wine lists.',
    image: '/images/luxury-private-club-foyer.jpeg',
    coordinates: { x: 48, y: 64 }
  },
  {
    id: 'oswalds',
    name: "Oswald's of Albemarle",
    category: 'Private Clubs',
    distanceWalk: '6 mins',
    distanceChauffeur: '2 mins',
    address: '25 Albemarle St, Mayfair, W1S 4HR',
    description: 'Universally hailed as Mayfair\'s most discrete members sanctuary. Tailored for wine aficionados, providing temperature-controlled personal reserve vaults and exquisite classical service.',
    image: '/images/townhouse-entry-seasonal-florals.jpeg',
    coordinates: { x: 74, y: 72 }
  },
  {
    id: 'hyde-park',
    name: 'Hyde Park Corner Gate',
    category: 'Wellness & Nature',
    distanceWalk: '1 min',
    distanceChauffeur: 'Immediate',
    address: 'Park Lane Entrance, London W1J 7NT',
    description: 'A historic landscape of ancient lime trees, serene waters, and horse trails starting directly at your doorstep. Crafted in 1637, it remains the ultimate oxygen reserve of prime central London.',
    image: '/images/hyde-park-corner-gate.jpeg',
    coordinates: { x: 15, y: 40 }
  },
  {
    id: 'connaught-spa',
    name: 'Aman Spa at The Connaught',
    category: 'Wellness & Nature',
    distanceWalk: '3 mins',
    distanceChauffeur: '1 min',
    address: 'Carlos Place, Mayfair, W1K 2AL',
    description: 'An oasis of subterranean restoration. Highlights custom thermal granite tubs, structural clay wraps, and targeted breathing rituals under the guidance of native wellness scholars.',
    image: '/images/spa-restoration-sanctuary.jpeg',
    coordinates: { x: 38, y: 20 }
  }
];

export const NeighbourhoodSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Gastronomy' | 'Retail' | 'Private Clubs' | 'Wellness & Nature'>('All');
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkItem>(MAYFAIR_LANDMARKS[0]);
  const [viewStyle, setViewStyle] = useState<'blueprint' | 'minimalist'>('blueprint');

  const filteredLandmarks = activeTab === 'All'
    ? MAYFAIR_LANDMARKS
    : MAYFAIR_LANDMARKS.filter(item => item.category === activeTab);

  // The Halo is located at coordinates x: 25, y: 50
  const haloCoord = { x: 25, y: 50 };

  // Calculate the intermediate midpoint for our floating travel pill
  const midX = (haloCoord.x + selectedLandmark.coordinates.x) / 2;
  const midY = (haloCoord.y + selectedLandmark.coordinates.y) / 2;

  return (
    <section className="bg-[#FAF7F2] py-20 md:py-28 px-6 border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl text-left">
            <span className="block font-mono text-[10px] tracking-[0.3em] text-gold-500 font-semibold uppercase">LOCATION &amp; TRANSIT CONCIERGE</span>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal-900 font-normal leading-[1.12]">
              Mayfair's classic parkside <span className="italic text-gold-600">centerpiece</span>
            </h2>
            <p className="text-xs md:text-sm text-stone-800/70 font-light leading-relaxed">
              Situated elegantly at 21 Park Lane, The Halo resides at the precise crossing node of natural royal parklands, historic private members societies, and prime Michelin gastronomy arrays.
            </p>
          </div>

          {/* Compass Graphic */}
          <div className="hidden lg:flex items-center gap-3 bg-stone-100 border border-stone-200/40 px-5 py-3 text-stone-600 font-mono text-[10px] tracking-wider uppercase">
            <Compass className="w-5 h-5 text-gold-500" />
            <div className="text-left font-light leading-none">
              <span>LATITUDE: 51.5074° N</span>
              <span className="block text-[8px] text-stone-400 mt-1">LONGITUDE: 0.1500° W</span>
            </div>
          </div>
        </div>

        {/* Categories Tab selector & Style switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200/40 pb-6 mb-12 gap-4">
          <div className="flex flex-wrap gap-2">
            {(['All', 'Gastronomy', 'Retail', 'Private Clubs', 'Wellness & Nature'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  // Auto-select first in filtered list
                  const list = tab === 'All' ? MAYFAIR_LANDMARKS : MAYFAIR_LANDMARKS.filter(i => i.category === tab);
                  if (list.length > 0) setSelectedLandmark(list[0]);
                }}
                className={`px-4 py-2 text-[10px] font-mono tracking-widest cursor-pointer transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-stone-800 text-stone-50 font-semibold shadow-sm'
                    : 'bg-stone-100 text-stone-800/70 hover:bg-stone-200/50'
                }`}
                id={`neighbourhood-tab-${tab.toLowerCase().replace(/\s/g, '-')}`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Blueprint/Minimal switch */}
          <div className="flex items-center gap-1.5 self-start bg-stone-100 p-0.5 border border-stone-200/50">
            <button 
              onClick={() => setViewStyle('blueprint')}
              className={`px-3 py-1 font-mono text-[9px] tracking-wider transition-all duration-200 cursor-pointer ${
                viewStyle === 'blueprint' 
                  ? 'bg-stone-800 text-stone-50 font-medium' 
                  : 'text-stone-700/70 hover:text-stone-900'
              }`}
            >
              BLUEPRINT
            </button>
            <button 
              onClick={() => setViewStyle('minimalist')}
              className={`px-3 py-1 font-mono text-[9px] tracking-wider transition-all duration-200 cursor-pointer ${
                viewStyle === 'minimalist' 
                  ? 'bg-stone-800 text-stone-50 font-medium' 
                  : 'text-stone-700/70 hover:text-stone-900'
              }`}
            >
              MINIMALIST
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT PANEL: Interactive List & Focused Card Details */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between gap-6 order-2 lg:order-1">
            
            {/* List Array */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar text-left">
              {filteredLandmarks.map((landmark) => (
                <button
                  key={landmark.id}
                  onClick={() => setSelectedLandmark(landmark)}
                  className={`w-full flex items-center justify-between p-3.5 border transition-all duration-300 text-left rounded-none group cursor-pointer ${
                    selectedLandmark.id === landmark.id
                      ? 'border-gold-500 bg-[#C5A880]/10'
                      : 'border-stone-200/40 bg-stone-50 hover:bg-stone-100'
                  }`}
                  id={`landmark-selector-${landmark.id}`}
                >
                  <div className="space-y-1">
                    <span className="block text-[8px] font-mono text-gold-500 tracking-widest uppercase font-semibold">
                      {landmark.category}
                    </span>
                    <h4 className="font-serif text-xs md:text-sm text-stone-900 group-hover:text-gold-600 transition-colors font-medium">
                      {landmark.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500 bg-stone-100 group-hover:bg-stone-200 px-2 py-1">
                    <Navigation className="w-3 h-3 text-gold-500" />
                    <span>{landmark.distanceWalk}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Displaying Focused Information Layout */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLandmark.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-[#FAF7F2] border border-stone-200 p-6 flex flex-col justify-between gap-6 shadow-sm relative text-left"
              >
                {/* Reference tag */}
                <div className="absolute top-4 right-4 text-[9px] font-mono font-semibold text-gold-500 uppercase tracking-widest border border-gold-500/25 px-1.5 py-0.5 pointer-events-none">
                  PARKSIDE RESIDENCY LEDGER
                </div>

                <div className="space-y-4">
                  <div className="aspect-[16/9] w-full bg-stone-200 overflow-hidden border border-stone-300/30">
                    <img
                      src={selectedLandmark.image}
                      alt={selectedLandmark.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block px-1.5 py-0.5 bg-stone-200 text-stone-800 text-[8px] font-mono tracking-widest font-bold uppercase rounded-none">
                      {selectedLandmark.category}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl text-charcoal-900 leading-snug font-medium">
                      {selectedLandmark.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-500">
                      <MapPin className="w-3.5 h-3.5 text-gold-500" />
                      <span>{selectedLandmark.address}</span>
                    </div>
                  </div>

                  <p className="text-[11.5px] text-stone-800/75 font-light leading-relaxed">
                    {selectedLandmark.description}
                  </p>
                </div>

                {/* Logistics Stats bar */}
                <div className="grid grid-cols-2 border-t border-stone-200 pt-4 gap-4 bg-stone-50 p-3 border border-stone-200/50">
                  <div className="space-y-0.5">
                    <span className="block text-[8px] font-mono tracking-widest text-[#8E867C] uppercase leading-none font-semibold">FOOT TRANSIT</span>
                    <span className="text-xs font-mono font-bold text-stone-900">{selectedLandmark.distanceWalk}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[8px] font-mono tracking-widest text-[#8E867C] uppercase leading-none font-semibold">CHAUFFEUR SERVICE</span>
                    <span className="text-xs font-mono font-bold text-[#C5A880]">{selectedLandmark.distanceChauffeur}</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* RIGHT PANEL: The Schematic Vector Plot Map */}
          <div className="col-span-1 lg:col-span-7 bg-[#2C2621] border border-stone-800 relative aspect-[14/11] flex flex-col justify-between p-6 select-none shadow-xl overflow-hidden order-1 lg:order-2">
            
            {/* Background vector mapping grid lines, rendered if in blueprint mode */}
            {viewStyle === 'blueprint' && (
              <>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3d352e_1px,transparent_1px),linear-gradient(to_bottom,#3d352e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
                <div className="absolute top-[50%] left-[25%] -translate-x-[50%] -translate-y-[50%] w-[80%] h-[80%] rounded-full border border-[#FAF7F2]/5 pointer-events-none" />
                <div className="absolute top-[50%] left-[25%] -translate-x-[50%] -translate-y-[50%] w-[50%] h-[50%] rounded-full border border-[#FAF7F2]/5 pointer-events-none" />
                <div className="absolute top-[50%] left-[25%] -translate-x-[50%] -translate-y-[50%] w-[20%] h-[20%] rounded-full border border-[#FAF7F2]/5 pointer-events-none" />
              </>
            )}
            
            {/* Curving Elegant Radial London Park Overlays */}
            <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full border border-stone-700/10 bg-emerald-900/5 pointer-events-none" />
            <div className="absolute -left-6 top-16 w-48 h-96 rounded-full border border-stone-700/15 bg-emerald-950/10 pointer-events-none flex items-center justify-center">
              <span className="font-serif text-[10px] tracking-[0.3em] uppercase text-emerald-100/15 rotate-90 inline-block">HYDE PARK BOUNDARY</span>
            </div>

            {/* Glowing active SVG connections linking Selected Point with The Halo */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              {/* Dynamic Connecting Line with glowing dashboard-inspired animations */}
              <motion.line
                x1={haloCoord.x}
                y1={haloCoord.y}
                x2={selectedLandmark.coordinates.x}
                y2={selectedLandmark.coordinates.y}
                stroke="#C5A880"
                strokeWidth="0.75"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                key={`line-${selectedLandmark.id}`}
              />
              <motion.line
                x1={haloCoord.x}
                y1={haloCoord.y}
                x2={selectedLandmark.coordinates.x}
                y2={selectedLandmark.coordinates.y}
                stroke="#FAF7F2"
                strokeWidth="1.2"
                strokeDasharray="2,3"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -20 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                key={`dash-${selectedLandmark.id}`}
              />
            </svg>

            {/* Dynamic floating transit pill showing details along the connection line */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              key={`pill-${selectedLandmark.id}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 bg-[#1C1814]/95 border border-[#C5A880]/40 px-2.5 py-1 text-[8px] font-mono text-gold-500 tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap z-25 pointer-events-none rounded-none"
              style={{ left: `${midX}%`, top: `${midY}%` }}
            >
              <Navigation className="w-2.5 h-2.5 text-[#C5A880]" />
              <span>{selectedLandmark.distanceWalk.toUpperCase()} WALK</span>
            </motion.div>

            {/* Static Halo Core Locator Tower (Node) */}
            <div className="absolute top-[50%] left-[25%] -translate-x-[50%] -translate-y-[50%] z-20 flex flex-col items-center">
              <span className="absolute -top-7 text-[8px] font-mono tracking-widest text-gold-500 font-bold bg-stone-950 border border-gold-500 px-2 py-0.5 whitespace-nowrap shadow-md leading-none select-none">
                📍 THE HALO (21 PARK LANE)
              </span>
              <div className="w-5 h-5 rounded-full border-2 border-gold-500 bg-stone-900 flex items-center justify-center animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              </div>
              <div className="w-12 h-12 rounded-full border border-gold-500/30 absolute scale-[2.5] pointer-events-none animate-ping max-w-full" />
            </div>

            {/* Map Header details */}
            <div className="flex justify-between items-start z-10 text-stone-50">
              <div className="text-left">
                <span className="block font-mono text-[8px] tracking-[0.35em] text-gold-500 font-semibold uppercase leading-none">MAYFAIR QUADRANT SCHEMA</span>
                <span className="block text-[10px] text-stone-400 font-mono mt-1.5 lowercase">Mayfair Estate Survey • Plot Grid 22/B</span>
              </div>
              <span className="font-mono text-[9px] text-stone-400/80 bg-stone-950 px-2.5 py-1 border border-stone-800">
                {viewStyle === 'blueprint' ? 'BLUEPRINT GRID' : 'MINIMAL SCHEMA'}
              </span>
            </div>

            {/* Dynamic Interactive Hotspots plot representation */}
            <div className="absolute inset-0 z-10">
              {MAYFAIR_LANDMARKS.map((landmark) => {
                const isActive = selectedLandmark.id === landmark.id;
                const isTabFiltered = activeTab === 'All' || landmark.category === activeTab;

                return (
                  <button
                    key={landmark.id}
                    onClick={() => setSelectedLandmark(landmark)}
                    className={`absolute flex flex-col items-center pointer-events-auto cursor-pointer transition-all duration-300 ${
                      isTabFiltered ? 'opacity-100' : 'opacity-20 hover:opacity-50'
                    }`}
                    style={{ left: `${landmark.coordinates.x}%`, top: `${landmark.coordinates.y}%` }}
                    id={`map-node-${landmark.id}`}
                  >
                    <div className="relative flex flex-col items-center">
                      
                      {/* Name label shown on hover or when selected */}
                      <span className={`px-2 py-1 bg-stone-950 text-[8px] font-mono text-stone-300 tracking-wider whitespace-nowrap select-none border border-stone-800 shadow-md transition-all duration-300 absolute -top-8 ${
                        isActive ? 'opacity-100 scale-100 bg-gold-600 text-stone-950 font-semibold border-gold-400' : 'opacity-0 scale-95 hover:opacity-100 group-hover:opacity-100 hover:scale-100'
                      }`}>
                        {landmark.name.toUpperCase()}
                      </span>

                      {/* Visual node pin dot */}
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isActive 
                        ? 'bg-[#C5A880] border-stone-50 scale-125 shadow-lg' 
                        : 'bg-stone-900 border-stone-600 hover:border-gold-500'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#FAF7F2]' : 'bg-stone-400'}`} />
                      </div>

                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map legend footer block */}
            <div className="flex justify-between items-end z-10 text-stone-400 mt-auto">
              {/* Compass Cardinal keys */}
              <div className="grid grid-cols-2 gap-4 text-[9px] font-mono">
                <div className="flex items-center gap-1.5">
                  <Landmark className="w-3 h-3 text-gold-500" />
                  <span>GASTRONOMY / RETAIL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
                  <span>PRIVATE MEMBERS ENCLAVE</span>
                </div>
              </div>

              {/* Security warning status code line */}
              <div className="text-right font-mono text-[8px] opacity-60">
                <span>PROPERTY BOUNDARIES SURVEYED • MAYFAIR PARKSIDE ESTATE MAP</span>
                <span className="block text-[7px] text-stone-500 mt-0.5">MAYFAIR PARKSIDE SURVEY OFFICE • LONDON</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
