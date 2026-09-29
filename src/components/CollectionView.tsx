import React, { useState, useMemo } from 'react';
import { Category, MetalType, Occasion, Product } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, Sparkles, Check, ArrowRight } from 'lucide-react';

interface CollectionViewProps {
  isBridalOnly?: boolean;
  products: Product[];
  initialCategory?: Category | 'All';
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onOpenDetail: (product: Product) => void;
  onQuickWhatsApp: (product: Product) => void;
  onBookAppointment: (note?: string) => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  isBridalOnly = false,
  products,
  initialCategory = 'All',
  wishlistIds,
  onToggleWishlist,
  onOpenDetail,
  onQuickWhatsApp,
  onBookAppointment,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(
    isBridalOnly ? 'Bridal Sets' : initialCategory
  );
  const [selectedMetal, setSelectedMetal] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'weight'>('featured');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const categories: (Category | 'All')[] = [
    'All',
    'Bridal Sets',
    'Necklaces',
    'Earrings',
    'Bangles',
    'Rings',
    'Diamond Collection',
  ];

  const metals: string[] = [
    'All',
    '22K Yellow Gold',
    '18K White Gold',
    '18K Rose Gold',
    '18K Yellow Gold',
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (isBridalOnly && !p.occasion.includes('Bridal') && p.category !== 'Bridal Sets') {
        return false;
      }
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      if (selectedMetal !== 'All' && !p.metal.includes(selectedMetal)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'weight') return parseFloat(b.grossWeight) - parseFloat(a.grossWeight);
      return 0;
    });
  }, [products, isBridalOnly, selectedCategory, selectedMetal, sortBy]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Collection Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-[#B88E4B] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBridalOnly ? 'The Bridal Atelier' : 'Showroom Collection'}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1715] font-light">
            {isBridalOnly ? 'Heirloom Bridal Masterpieces' : 'Fine Jewellery Curations'}
          </h1>
          
          <p className="text-sm sm:text-base text-[#5A524A] font-light leading-relaxed">
            {isBridalOnly
              ? 'Handcrafted 22K gold, polki, and gemstone wedding suites created in our White Town atelier. Certified purity with uncompromised craftsmanship.'
              : 'Explore iconic necklace suites, chandelier earrings, solid temple bangles, and certified solitaire diamonds.'}
          </p>

          {isBridalOnly && (
            <div className="pt-2">
              <button
                onClick={() => onBookAppointment('Bridal Atelier Suite Consultation')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#26221F] hover:bg-[#8C6D3B] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase rounded transition-colors cursor-pointer shadow-xs"
              >
                <span>Book VIP Bridal Try-On in Pondicherry</span>
                <ArrowRight className="w-3 h-3 text-[#C8B28B]" />
              </button>
            </div>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#F5F0EB] p-3 rounded-xl border border-[#E8DFD3] flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#26221F] text-[#FAF8F5]'
                    : 'text-[#4A443E] hover:bg-[#EAE3D9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Metal Filters */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <select
              value={selectedMetal}
              onChange={(e) => setSelectedMetal(e.target.value)}
              className="text-[11px] bg-white border border-[#D9CEBF] rounded px-2.5 py-1 text-[#1A1715] focus:outline-none"
            >
              <option value="All">All Precious Metals</option>
              <option value="22K Yellow Gold">22K Yellow Gold</option>
              <option value="18K White Gold">18K White Gold</option>
              <option value="18K Rose Gold">18K Rose Gold</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-[11px] bg-white border border-[#D9CEBF] rounded px-2.5 py-1 text-[#1A1715] focus:outline-none"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="weight">Gold Weight</option>
            </select>
          </div>
        </div>

        {/* Product Count Indicator */}
        <div className="flex items-center justify-between text-xs text-[#7E756B] px-1">
          <span>
            Showing <strong className="text-[#1A1715]">{filteredProducts.length}</strong> creations
          </span>
          <span className="hidden sm:inline">
            Each piece includes BIS 916 laser hallmarking & certified gemstone documentation
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-[#EAE3D9] p-8 space-y-3">
            <p className="font-serif text-lg text-[#1A1715]">No jewellery matched your filters</p>
            <p className="text-xs text-[#7E756B]">
              Reset your precious metal or category filters to explore our full Pondicherry atelier.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedMetal('All');
              }}
              className="px-4 py-2 bg-[#1A1715] text-[#FAF8F5] text-xs font-semibold rounded uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onOpenDetail={onOpenDetail}
                onQuickWhatsApp={onQuickWhatsApp}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
