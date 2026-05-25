import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data';
import { GalleryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Exterior' | 'Interior' | 'Amenity' | 'Detail'>('All');
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  // Filtered list
  const filteredImages = selectedCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === selectedCategory);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx === null) return;
    const nextIdx = (activeImageIdx + 1) % filteredImages.length;
    setActiveImageIdx(nextIdx);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx === null) return;
    const prevIdx = (activeImageIdx - 1 + filteredImages.length) % filteredImages.length;
    setActiveImageIdx(prevIdx);
  };

  return (
    <section className="bg-stone-50 py-16 md:py-24 px-6 border-b border-stone-200/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="block font-mono text-[10px] tracking-[0.3em] text-gold-500 font-semibold uppercase">VISUAL PORTFOLIO</span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal-900 font-normal leading-[1.15]">
            The architecture of <span className="italic text-gold-600 font-serif">refined space</span>
          </h2>
          <p className="text-xs md:text-sm text-stone-800/70 font-light leading-relaxed">
            A photographic look inside Mayfair's premier architectural landmark. Every frame captures the harmony of warm limestone, bronze metalwork, and natural light.
          </p>
        </div>

        {/* Tab Category Filtering */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 border-b border-stone-200/40 pb-6 mb-12">
          {(['All', 'Exterior', 'Interior', 'Amenity', 'Detail'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveImageIdx(null); // Reset active index when category changes
              }}
              className={`px-5 py-2 text-[10px] font-mono tracking-widest cursor-pointer transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-stone-800 text-stone-50 font-semibold shadow-sm'
                  : 'bg-stone-100 text-stone-800/70 hover:bg-stone-200/50'
              }`}
              id={`gallery-filter-${cat.toLowerCase()}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Dynamic Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          id="gallery-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((item, idx) => {
              // Find index of this item in the filtered array for proper lightbox traversal
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => setActiveImageIdx(idx)}
                  className="bg-stone-100 border border-stone-200/50 relative group overflow-hidden cursor-pointer aspect-[4/3]"
                  id={`gallery-item-${item.id}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Elegant Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-stone-50" />
                  
                  {/* Absolute details content rendered on Hover */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10 text-stone-50">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-0.5 bg-gold-500/90 text-stone-900 text-[8px] font-mono tracking-widest font-bold uppercase">
                        {item.category}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-stone-50/10 backdrop-blur-md flex items-center justify-center text-stone-50">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <h4 className="font-serif text-sm tracking-wide font-medium">{item.title}</h4>
                      <p className="text-[10px] text-stone-300 font-light leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Tiny Architectural Spec Line (bottom corner indicator shown when not hovered) */}
                  <div className="absolute bottom-3 right-3 bg-stone-50/80 backdrop-blur-sm px-2 py-0.5 border border-stone-200/40 text-[8px] font-mono tracking-wider text-stone-800/60 uppercase group-hover:opacity-0 transition-opacity">
                    {item.category}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Immersive Lightbox Modal Container */}
        <AnimatePresence>
          {activeImageIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageIdx(null)}
              className="fixed inset-0 z-50 bg-[#100F0D]/95 backdrop-blur-md flex flex-col justify-between items-center py-8 px-6 text-stone-50 select-none"
              id="gallery-lightbox"
            >
              
              {/* Lightbox Header */}
              <div className="w-full max-w-6xl flex justify-between items-center">
                <div className="flex items-center gap-2.5 text-left">
                  <Camera className="w-4 h-4 text-gold-500" />
                  <div>
                    <span className="block text-[10px] font-mono tracking-[0.25em] text-gold-500 font-semibold uppercase leading-none">THE HALO PORTFOLIO</span>
                    <span className="block text-xs text-stone-400 font-mono mt-1">MAYFAIR, LONDON</span>
                  </div>
                </div>

                {/* Counter */}
                <div className="font-mono text-xs text-stone-400">
                  {activeImageIdx + 1} / {filteredImages.length}
                </div>

                <button
                  onClick={() => setActiveImageIdx(null)}
                  className="bg-stone-50/5 hover:bg-stone-50/20 text-stone-50 p-2 border border-stone-50/10 cursor-pointer transition-colors"
                  id="lightbox-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Core Image Stage with Nav elements */}
              <div className="w-full max-w-5xl flex items-center justify-between relative my-auto">
                
                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 md:-left-16 z-10 bg-black/40 hover:bg-[#C5A880] text-stone-50 p-3.5 border border-stone-50/10 cursor-pointer transition-all duration-300"
                  id="lightbox-prev"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Main Render Image frame */}
                <div className="mx-auto w-full max-h-[60vh] md:max-h-[70vh] aspect-[16/10] bg-stone-900 border border-gold-500/30 overflow-hidden flex items-center justify-center shadow-2xl relative">
                  <motion.img
                    key={filteredImages[activeImageIdx].image}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    src={filteredImages[activeImageIdx].image}
                    alt={filteredImages[activeImageIdx].title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Architectural watermark stamp */}
                  <div className="absolute top-6 left-6 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[8px] font-mono text-stone-300 tracking-widest border border-stone-50/10">
                    <Sparkles className="w-3 h-3 text-gold-500 animate-pulse" />
                    <span>CERTIFIED PHOTOGRAPHIC RESIDENCY ARCHIVE</span>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 md:-right-16 z-10 bg-black/40 hover:bg-[#C5A880] text-stone-50 p-3.5 border border-stone-50/10 cursor-pointer transition-all duration-300"
                  id="lightbox-next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

              </div>

              {/* Lightbox Footer Details */}
              <div className="w-full max-w-4xl text-center space-y-2">
                <span className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/30 text-[9px] font-mono tracking-widest text-gold-500 font-semibold uppercase">
                  {filteredImages[activeImageIdx].category} CATEGORY
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-stone-100 font-normal">
                  {filteredImages[activeImageIdx].title}
                </h3>
                <p className="max-w-2xl mx-auto text-xs text-stone-400 font-light leading-relaxed">
                  {filteredImages[activeImageIdx].description}
                </p>
                <p className="text-[10px] font-mono text-stone-500 uppercase tracking-[0.15em] pt-2 leading-none">
                  The Halo Resident Ledger • Mayfair, London • Est. 2026
                </p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
