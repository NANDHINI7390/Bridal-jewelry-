import React from 'react';
import { Category } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (cat: Category) => void;
  onViewAll: () => void;
}

interface CategoryItem {
  name: Category;
  image: string;
  count: string;
  tagline: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    name: 'Necklaces',
    image: '/src/assets/images/necklace_royal_polki_1790700650025.jpg',
    count: '28 Masterpieces',
    tagline: 'Chokers, Gutapusalu & Temple Haars',
  },
  {
    name: 'Earrings',
    image: '/src/assets/images/earrings_heritage_jhumka_1790700662174.jpg',
    count: '34 Designs',
    tagline: 'Chandbalis, Royal Jhumkas & Drops',
  },
  {
    name: 'Bangles',
    image: '/src/assets/images/bangles_nakshi_gold_1790700674164.jpg',
    count: '22 Sets',
    tagline: 'Solid Nakshi Kadas & Filigree Bracelets',
  },
  {
    name: 'Rings',
    image: '/src/assets/images/ring_solitaire_bloom_1790700685834.jpg',
    count: '19 Solitaires',
    tagline: 'Cocktail Bands & GIA Solitaires',
  },
  {
    name: 'Bridal Sets',
    image: '/src/assets/images/bridal_choker_set_1790700732133.jpg',
    count: '14 Complete Suites',
    tagline: 'Trousseau Sets with Emeralds & Polki',
  },
  {
    name: 'Diamond Collection',
    image: '/src/assets/images/diamond_necklace_collection_1790700743378.jpg',
    count: '16 High Jewels',
    tagline: 'Rivieres, Tennis Cascades & Platinum',
  },
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory, onViewAll }) => {
  return (
    <section className="py-14 sm:py-18 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-3 border-b border-[#EAE3D9]">
          <div>
            <span className="text-[11px] tracking-[0.24em] uppercase text-[#B88E4B] font-semibold">
              Curated Showroom
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1715] font-light mt-1">
              Shop by Category
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#1A1715] hover:text-[#B88E4B] transition-colors group cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 6-Column Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="group cursor-pointer flex flex-col bg-[#F5F0EB] rounded-lg overflow-hidden border border-[#E8DFD3] hover:border-[#B88E4B] hover:shadow-lg transition-all duration-300"
            >
              {/* Product Thumbnail */}
              <div className="relative aspect-square overflow-hidden bg-[#EFE7DE]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Text label */}
              <div className="p-3 text-center flex-1 flex flex-col justify-center">
                <h3 className="font-serif text-sm sm:text-base font-medium text-[#1A1715] group-hover:text-[#B88E4B] transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#7E756B] mt-0.5">
                  {cat.count}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
