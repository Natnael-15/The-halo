import React from 'react';
import { Sparkles, CalendarRange, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'residences', label: 'RESIDENCES' },
    { id: 'amenities', label: 'AMENITIES' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'neighbourhood', label: 'NEIGHBOURHOOD' },
    { id: 'calculator', label: 'INVESTMENT' },
    { id: 'scheduling', label: 'SCHEDULE' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/40 transitioning-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo / Brand */}
        <button 
          onClick={() => { setActiveSection('overview'); setMobileMenuOpen(false); }}
          className="flex items-center gap-2.5 group focus:outline-none"
          id="brand-logo"
        >
          <div className="w-8 h-8 rounded-full border border-gold-500 flex items-center justify-center text-xs font-serif text-gold-500 group-hover:bg-gold-500 group-hover:text-stone-50 transition-all duration-300">
            H
          </div>
          <div className="text-left">
            <span className="block text-sm font-semibold tracking-widest text-charcoal-900 leading-none">THE HALO</span>
            <span className="block text-[9px] tracking-[0.25em] text-gold-500 font-medium leading-none mt-1">RESIDENCES</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`text-[11px] font-medium tracking-[0.2em] transition-colors duration-300 relative py-2 focus:outline-none cursor-pointer ${
                activeSection === item.id 
                  ? 'text-charcoal-900 font-semibold' 
                  : 'text-stone-800/60 hover:text-charcoal-900'
              }`}
              id={`nav-${item.id}`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-500" />
              )}
            </button>
          ))}
        </nav>

        {/* Quick CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setActiveSection('scheduling')}
            className="flex items-center gap-2 text-[10px] font-semibold tracking-widest text-[#FAF7F2] bg-stone-800 hover:bg-[#C5A880] px-5 py-2.5 rounded-none transition-all duration-300 shadow-sm"
            id="header-cta-book"
          >
            <CalendarRange className="w-3.5 h-3.5" />
            BOOK A VIEWING
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-stone-800 hover:text-gold-500 transition-colors"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Open */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2]/95 backdrop-blur-lg border-b border-stone-200/50 py-6 px-6 shadow-lg animate-fade-in">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-[11px] font-medium tracking-[0.2em] py-2 border-b border-stone-200/20 ${
                  activeSection === item.id ? 'text-gold-500 font-semibold' : 'text-stone-800/70'
                }`}
                id={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveSection('scheduling');
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full text-center text-[10px] font-semibold tracking-widest text-stone-50 bg-[#2C2621] hover:bg-[#C5A880] py-3.5"
              id="mobile-nav-cta-book"
            >
              BOOK A VIEWING
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
