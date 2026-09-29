import React from 'react';
import { Occasion } from '../types';

interface OccasionTabsProps {
  selectedOccasion: Occasion | 'All';
  onSelectOccasion: (occ: Occasion | 'All') => void;
}

const OCCASIONS: { id: Occasion | 'All'; label: string; desc: string }[] = [
  { id: 'All', label: 'All Curations', desc: 'Complete Pondicherry Atelier' },
  { id: 'Bridal', label: 'Bridal Muhurtham', desc: 'Chokers, Temple Gold & Polki Trousseau' },
  { id: 'Engagement', label: 'Engagement & Rings', desc: 'Solitaires, Halos & Promise Bands' },
  { id: 'Reception', label: 'Reception & Evening', desc: 'Cascading Diamonds & Haute Joaillerie' },
  { id: 'Festive', label: 'Festive & Sangeet', desc: 'Chandbalis, Heritage Kadas & Pearls' },
  { id: 'Everyday Luxury', label: 'Everyday Luxury', desc: 'Delicate Stacking Bangles & Solitaires' },
];

export const OccasionTabs: React.FC<OccasionTabsProps> = ({
  selectedOccasion,
  onSelectOccasion,
}) => {
  return (
    <div className="py-6">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="text-[11px] tracking-[0.24em] uppercase text-[#B88E4B] font-semibold">
          Tailored For Celebrations
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1715] font-light mt-1">
          Shop By Occasion
        </h2>
      </div>

      {/* Segmented Occasion Controls */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none px-4">
        {OCCASIONS.map((occ) => {
          const isActive = selectedOccasion === occ.id;
          return (
            <button
              key={occ.id}
              onClick={() => onSelectOccasion(occ.id)}
              className={`px-3 py-1.5 text-[11px] font-medium tracking-wide uppercase rounded transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#26221F] text-[#FAF8F5] shadow-xs'
                  : 'bg-[#F0EAE1] text-[#4A443E] hover:bg-[#EAE3D9] hover:text-[#1A1715]'
              }`}
            >
              {occ.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
