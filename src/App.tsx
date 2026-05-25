/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ResidencesSection } from './components/ResidencesSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { GallerySection } from './components/GallerySection';
import { NeighbourhoodSection } from './components/NeighbourhoodSection';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import { BookingForm } from './components/BookingForm';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedResidenceId, setSelectedResidenceId] = useState<string>('penthouse-2400'); // Default penthouse
  const [notification, setNotification] = useState<string | null>(null);

  // Triggered when clicking 'Select and Book' inside ResidencesSection
  const handleSelectResidenceForBooking = (residenceId: string) => {
    setSelectedResidenceId(residenceId);
    showNotice('Layout registered in schedule buffer.');
    setActiveSection('scheduling');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans selection:bg-gold-500 selection:text-stone-950 relative flex flex-col justify-between">
      
      {/* Floating Dynamic Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 bg-[#100F0D] text-stone-50 border border-gold-500 px-5 py-3 shadow-2xl flex items-center gap-3 text-xs font-mono tracking-wider"
            id="action-toast"
          >
            <Sparkles className="w-4 h-4 text-gold-500 animate-spin" />
            <span>{notification.toUpperCase()}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Navigation Header */}
      <Header activeSection={activeSection} setActiveSection={handleSectionChange} />

      {/* Dynamic Page Routing Switch with Immersive Page Transitions */}
      <main className="relative flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeSection === 'overview' && (
              <div id="page-overview">
                <HeroSection 
                  onExploreResidences={() => handleSectionChange('residences')}
                  onBookViewing={() => handleSectionChange('scheduling')}
                />
              </div>
            )}

            {activeSection === 'residences' && (
              <div id="page-residences">
                <ResidencesSection 
                  onSelectResidenceForBooking={handleSelectResidenceForBooking}
                />
              </div>
            )}

            {activeSection === 'amenities' && (
              <div id="page-amenities">
                <AmenitiesSection />
              </div>
            )}

            {activeSection === 'gallery' && (
              <div id="page-gallery">
                <GallerySection />
              </div>
            )}

            {activeSection === 'neighbourhood' && (
              <div id="page-neighbourhood">
                <NeighbourhoodSection />
              </div>
            )}

            {activeSection === 'calculator' && (
              <div id="page-calculator font-sans text-stone-900">
                <InvestmentCalculator />
              </div>
            )}

            {activeSection === 'scheduling' && (
              <div id="page-scheduling">
                <BookingForm 
                  selectedResidenceId={selectedResidenceId}
                  onBookingSuccess={() => showNotice('Credentials Issued. Download Available.')}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ULTRA LUXURY BROCHURE FOOTER */}
      <footer className="bg-[#100F0D] text-[#FAF7F2] pt-16 pb-12 border-t border-gold-500/20 px-6 relative overflow-hidden shrink-0">
        {/* Background Decorative Circular Brand Stamp */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 rounded-full border border-stone-900/55 flex items-center justify-center pointer-events-none select-none">
          <div className="w-80 h-80 rounded-full border border-stone-900/40" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-stone-800/80 pb-12">
          
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3 justify-start">
              <div className="w-9 h-9 rounded-full border border-gold-500 flex items-center justify-center text-xs font-serif text-gold-500">
                H
              </div>
              <div className="text-left">
                <span className="block text-sm font-semibold tracking-widest leading-none">THE HALO</span>
                <span className="block text-[8px] tracking-[0.25em] text-gold-500 font-medium leading-none mt-1">RESIDENCES</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-xs pt-2 text-left">
              A masterwork of sculptural physics, premium materials, and discrete privacy protocols. Built in Mayfair's premier parkside enclave.
            </p>
          </div>

          {/* Col 2: Dynamic Contact Info (UK style) */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-[10px] font-mono tracking-widest text-[#C5A880] font-semibold uppercase">SALES PREMISES</h4>
            <div className="space-y-3 text-xs text-stone-300 font-light">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>21 Park Lane, Mayfair, London W1K 1PR</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+44 20 7946 0192</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>steward@haloresidences.com</span>
              </div>
            </div>
          </div>

          {/* Col 3: Presentation Hours */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-[10px] font-mono tracking-widest text-[#C5A880] font-semibold uppercase">VIEWING PROTOCOL</h4>
            <div className="space-y-2 text-xs text-stone-300 font-light leading-relaxed">
              <p>Monday — Friday: 09:00 AM – 06:00 PM</p>
              <p>Saturday — Sunday: 10:00 AM – 04:00 PM</p>
              <p className="text-gold-500 text-[10px] font-mono tracking-wider pt-2 italic">📌 BY ADVANCE BIOMETRIC RESERVATION ONLY</p>
            </div>
          </div>

        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[10px] text-stone-500 font-mono">
          
          <div className="space-y-1 max-w-3xl text-left font-light leading-relaxed">
            <p>© 2026 HALO DEVELOPMENT GROUP LTD. ALL RIGHTS RESERVED.</p>
            <p className="uppercase leading-normal text-stone-600">
              Disclaimer: All renderings, elevations, schematics, vector diagrams, finishes presets, and room blueprints are conceptual artist depictions only. Details, dimensions, specifications, and materials are subject to construction changes and developer discretion without advance warning. This advertisement does not constitute a legal offer.
            </p>
          </div>

          <div className="flex gap-4 shrink-0 font-medium">
            <a href="#" onClick={(e) => { e.preventDefault(); handleSectionChange('overview'); }} className="hover:text-[#FAF7F2] transition-colors">PRIVACY CONTRACT</a>
            <span>•</span>
            <a href="#" onClick={(e) => { e.preventDefault(); handleSectionChange('overview'); }} className="hover:text-[#FAF7F2] transition-colors">PROSPECTUS TERMS</a>
          </div>

        </div>

      </footer>

    </div>
  );
}
