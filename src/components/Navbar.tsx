import React, { useState } from 'react';
import { Heart, Search, Calendar, Phone, Menu, X, Sparkles, MessageCircle, BarChart3, Globe } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAppointment: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  wishlistCount,
  onOpenWishlist,
  onOpenAppointment,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D9] transition-all">
      {/* Top Pitch Notification Strip for Demo Presenter */}
      <div className="bg-[#1A1715] text-[#FAF8F5] px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-[#C8A265] font-serif tracking-widest text-[11px] uppercase">
              Digital Showroom Demo
            </span>
            <span className="text-[#A39A8F] hidden sm:inline">·</span>
            <span className="text-[#D6CEC4] hidden sm:inline">
              Built for Premium Jewellery Boutiques in Pondicherry & White Town
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('google-ads')}
              className={`text-[11px] flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                currentView === 'google-ads'
                  ? 'bg-[#967743] text-white font-medium'
                  : 'text-[#D6CEC4] hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3 text-[#C8B28B]" />
              <span className="hidden md:inline">Google Ads Funnel</span>
              <span className="md:hidden">Google Ads</span>
            </button>
            <span className="text-[#4A443E]">|</span>
            <button
              onClick={() => onNavigate('admin')}
              className={`text-[11px] flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                currentView === 'admin'
                  ? 'bg-[#967743] text-white font-medium'
                  : 'text-[#D6CEC4] hover:text-white'
              }`}
            >
              <BarChart3 className="w-3 h-3 text-[#C8B28B]" />
              <span className="hidden md:inline">Store Owner CRM</span>
              <span className="md:hidden">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Header complying with Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="text-left group focus:outline-none cursor-pointer"
          >
            <div className="font-serif text-2xl sm:text-3xl tracking-[0.22em] font-semibold text-[#1A1715] group-hover:text-[#967743] transition-colors uppercase">
              AURÉLIA
            </div>
            <div className="text-[9px] tracking-[0.28em] text-[#7E756B] uppercase font-sans -mt-1 font-medium">
              Fine Jewellery · Pondicherry
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs tracking-[0.14em] uppercase font-medium text-[#4A443E]">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-[#1A1715] pb-1 border-b-2 cursor-pointer ${
              currentView === 'home'
                ? 'border-[#967743] text-[#1A1715] font-semibold'
                : 'border-transparent'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('collections')}
            className={`transition-colors hover:text-[#1A1715] pb-1 border-b-2 cursor-pointer ${
              currentView === 'collections'
                ? 'border-[#967743] text-[#1A1715] font-semibold'
                : 'border-transparent'
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => onNavigate('bridal')}
            className={`transition-colors hover:text-[#1A1715] pb-1 border-b-2 cursor-pointer ${
              currentView === 'bridal'
                ? 'border-[#967743] text-[#1A1715] font-semibold'
                : 'border-transparent'
            }`}
          >
            Bridal Atelier
          </button>
          <button
            onClick={() => onNavigate('bridal-builder')}
            className={`transition-colors hover:text-[#1A1715] pb-1 border-b-2 flex items-center gap-1 cursor-pointer ${
              currentView === 'bridal-builder'
                ? 'border-[#967743] text-[#1A1715] font-semibold'
                : 'border-transparent'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#967743]" />
            Find Your Set
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors hover:text-[#1A1715] pb-1 border-b-2 cursor-pointer ${
              currentView === 'about'
                ? 'border-[#967743] text-[#1A1715] font-semibold'
                : 'border-transparent'
            }`}
          >
            Showroom & Story
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions (Reduced Size & Muted Intensity) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenSearch}
            aria-label="Search Collection"
            className="p-1.5 text-[#4A443E] hover:text-[#1A1715] hover:bg-[#F2ECE3] rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenWishlist}
            aria-label="Bridal Wishlist"
            className="p-1.5 text-[#4A443E] hover:text-[#1A1715] hover:bg-[#F2ECE3] rounded-full transition-colors relative cursor-pointer"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#967743] text-white text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAppointment}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#26221F] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase rounded hover:bg-[#967743] transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            <Calendar className="w-3 h-3 text-[#C8B28B]" />
            <span>Book Appointment</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#1A1715] hover:bg-[#F2ECE3] rounded cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE3D9] bg-[#FAF8F5] px-5 py-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-xs font-medium tracking-wide uppercase text-[#1A1715]">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 border-b border-[#EFE7DE]"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('collections');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 border-b border-[#EFE7DE]"
            >
              All Jewellery Collections
            </button>
            <button
              onClick={() => {
                onNavigate('bridal');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 border-b border-[#EFE7DE]"
            >
              The Bridal Atelier
            </button>
            <button
              onClick={() => {
                onNavigate('bridal-builder');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 border-b border-[#EFE7DE] flex items-center justify-between text-[#967743]"
            >
              <span>Find Your Bridal Set</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 border-b border-[#EFE7DE]"
            >
              Pondicherry Showroom & Story
            </button>
            <button
              onClick={() => {
                onNavigate('google-ads');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 border-b border-[#EFE7DE] text-[#967743] flex items-center justify-between"
            >
              <span>Google Ads Landing Engine</span>
              <Globe className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 border-b border-[#EFE7DE] text-[#7E756B] flex items-center justify-between"
            >
              <span>Store Owner CRM Demo</span>
              <BarChart3 className="w-3.5 h-3.5" />
            </button>
          </nav>

          <div className="pt-1 space-y-1.5">
            <button
              onClick={() => {
                onOpenAppointment();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#26221F] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase rounded"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C8B28B]" />
              <span>Book Showroom Appointment</span>
            </button>
            <a
              href="tel:+914132224810"
              className="w-full flex items-center justify-center gap-1.5 py-2 border border-[#C2B5A5] text-[#36302B] text-[11px] font-medium tracking-wider uppercase rounded hover:bg-[#F2ECE3]"
            >
              <Phone className="w-3 h-3 text-[#967743]" />
              <span>Call Showroom: +91 413 222 4810</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
