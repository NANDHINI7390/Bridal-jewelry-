import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onNavigate: (view: string) => void;
  onSelectCategory: (cat: Category) => void;
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenAppointment,
}) => {
  return (
    <footer className="bg-[#1A1715] text-[#FAF8F5] border-t border-[#332D28] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Brand & Heritage (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <div className="font-serif text-2xl tracking-[0.22em] font-semibold text-white uppercase">
                AURÉLIA
              </div>
              <div className="text-[10px] tracking-[0.28em] text-[#C8A265] uppercase font-sans font-medium">
                Fine Jewellery · Pondicherry
              </div>
            </div>

            <p className="text-xs text-[#D6CEC4] leading-relaxed font-light">
              Crafting bespoke bridal suites, syndicate polki masterpieces, and sacred 22K temple gold in the serene French Quarter of White Town, Pondicherry.
            </p>

            <div className="pt-2 text-xs text-[#A39A8F] space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8A265] shrink-0" />
                <span>42 Rue Romain Rolland, White Town, Puducherry 605001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8A265] shrink-0" />
                <span>Desk: +91 413 222 4810 · WhatsApp: +91 94432 88201</span>
              </div>
            </div>
          </div>

          {/* Col 2: High Jewellery Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm tracking-widest uppercase text-[#C8A265] font-semibold">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#D6CEC4]">
              {(['Bridal Sets', 'Necklaces', 'Earrings', 'Bangles', 'Rings', 'Diamond Collection'] as Category[]).map(
                (cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        onNavigate('collections');
                        onSelectCategory(cat);
                      }}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {cat}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 3: Atelier Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm tracking-widest uppercase text-[#C8A265] font-semibold">
              The Atelier
            </h4>
            <ul className="space-y-2 text-xs text-[#D6CEC4]">
              <li>
                <button onClick={() => onNavigate('bridal')} className="hover:text-white transition-colors cursor-pointer">
                  The Bridal Atelier
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bridal-builder')} className="hover:text-white transition-colors cursor-pointer">
                  Find Your Bridal Set
                </button>
              </li>
              <li>
                <button onClick={onOpenAppointment} className="hover:text-white transition-colors cursor-pointer">
                  Book VIP Bridal Suite
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  Pondicherry Showroom
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('google-ads')} className="hover:text-white transition-colors cursor-pointer text-[#C8A265]">
                  Google Ads Landing Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors cursor-pointer text-[#C8A265]">
                  Store Owner CRM
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Today's Transparent Benchmark (3 cols) */}
          <div className="lg:col-span-3 space-y-3 bg-[#241F1B] p-4 rounded-lg border border-[#3E3832]">
            <div className="flex items-center gap-1.5 text-[11px] text-[#C8A265] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparent Hallmarking</span>
            </div>

            <div className="space-y-1.5 text-xs text-[#D6CEC4]">
              <div className="flex justify-between border-b border-[#3E3832] pb-1">
                <span>Gold Standard:</span>
                <span className="font-medium text-white">BIS 916 (22K)</span>
              </div>
              <div className="flex justify-between border-b border-[#3E3832] pb-1">
                <span>Diamond Certification:</span>
                <span className="font-medium text-white">IGI / GIA Dossier</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Gold Weight Guarantee:</span>
                <span className="font-medium text-white">100% Solid (Zero Lac)</span>
              </div>
            </div>

            <button
              onClick={onOpenAppointment}
              className="w-full mt-2 py-1.5 px-3 bg-[#967743] hover:bg-[#836534] text-white text-[11px] font-medium tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Schedule Atelier Visit</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#332D28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A39A8F]">
          <div>
            © {new Date().getFullYear()} Aurélia Fine Jewellery. All rights reserved. French Quarter, Pondicherry.
          </div>
          <div className="text-[11px] text-[#8C8377]">
            Digital Showroom & Customer Acquisition Platform Sales Demo for Premium Jewellery Retailers.
          </div>
        </div>

      </div>
    </footer>
  );
};
