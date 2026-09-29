import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onOpenProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.gemstoneDetails.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4 animate-fade-in">
      <div className="relative bg-[#FAF8F5] rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-[#E8DFD3]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#4A443E] hover:text-[#1A1715] bg-[#F2ECE3] hover:bg-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Search Input */}
        <div className="relative mb-5 pr-8">
          <Search className="w-5 h-5 text-[#B88E4B] absolute left-3.5 top-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search necklaces, polki chokers, jhumkas, solitaires, temple gold..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#D9CEBF] rounded-lg text-sm text-[#1A1715] focus:outline-none focus:border-[#B88E4B]"
          />
        </div>

        {/* Quick query suggestion chips */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <span className="text-[#7E756B]">Popular searches:</span>
          {['Bridal Choker', 'Polki', 'Temple Bangles', 'Solitaire Ring', 'Emerald Set'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 bg-[#F2ECE3] hover:bg-[#EAE3D9] text-[#4A443E] rounded text-[11px] cursor-pointer"
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Results */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] mb-2">
            {query.trim() ? `Search Results (${filtered.length})` : 'Featured Masterpieces'}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#7E756B]">
              No jewellery matching "{query}". Please contact our showroom concierge for custom pieces.
            </div>
          ) : (
            filtered.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  onOpenProduct(prod);
                  onClose();
                }}
                className="flex items-center gap-3.5 p-2.5 bg-white rounded-lg border border-[#EAE3D9] hover:border-[#B88E4B] transition-colors cursor-pointer group"
              >
                <div className="w-16 h-16 bg-[#F5EFE8] rounded overflow-hidden shrink-0">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-[#7E756B] uppercase font-mono">{prod.category}</div>
                  <h4 className="font-serif text-sm font-semibold text-[#1A1715] group-hover:text-[#B88E4B] truncate">
                    {prod.name}
                  </h4>
                  <div className="text-xs text-[#5A524A]">{prod.grossWeight} · {prod.metal}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold text-xs text-[#1A1715] tabular-nums">
                    {prod.formattedPrice}
                  </div>
                  <span className="text-[11px] text-[#B88E4B] flex items-center justify-end gap-1 mt-0.5">
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
