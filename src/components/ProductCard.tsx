import React from 'react';
import { Product } from '../types';
import { Heart, MessageCircle, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenDetail: (product: Product) => void;
  onQuickWhatsApp: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenDetail,
  onQuickWhatsApp,
}) => {
  return (
    <div className="group bg-[#FAF8F5] rounded-lg overflow-hidden border border-[#E8DFD3] hover:border-[#B88E4B] transition-all duration-300 hover:shadow-md flex flex-col">
      {/* Product Image Stage */}
      <div className="relative aspect-square bg-[#F5EFE8] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700 ease-out cursor-pointer"
          onClick={() => onOpenDetail(product)}
        />

        {/* Quiet unboxed top tag (e.g. New Arrival or Bridal Feature) */}
        {product.isNewArrival && (
          <div className="absolute top-3 left-3 bg-[#1A1715]/85 text-[#FAF8F5] text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
            New Masterpiece
          </div>
        )}

        {/* Wishlist Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'bg-[#B88E4B] text-white shadow-sm'
              : 'bg-[#FAF8F5]/85 text-[#4A443E] hover:text-[#B88E4B] hover:bg-white backdrop-blur-xs'
          }`}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View Hover Strip */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-1.5">
          <button
            onClick={() => onOpenDetail(product)}
            className="flex-1 py-1.5 px-2.5 bg-[#FAF8F5]/95 backdrop-blur-sm text-[#26221F] text-[10px] font-medium tracking-wider uppercase rounded shadow-xs hover:bg-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Eye className="w-3 h-3 text-[#967743]" />
            <span>View Details</span>
          </button>
          
          <button
            onClick={() => onQuickWhatsApp(product)}
            aria-label="Enquire on WhatsApp"
            className="p-1.5 bg-[#2D734C] hover:bg-[#245D3D] text-white rounded shadow-xs transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metadata & Actions */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Quiet clean metadata line */}
          <div className="flex items-center gap-2 text-[11px] text-[#7E756B] tracking-wide mb-1 font-sans">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.metal}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetail(product)}
            className="font-serif text-sm sm:text-base font-medium text-[#1A1715] group-hover:text-[#967743] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <div className="text-[11px] text-[#686057] mt-1 line-clamp-1 font-light">
            Gross: {product.grossWeight} · {product.hallmark}
          </div>
        </div>

        {/* Pricing & Enquire Bar */}
        <div className="mt-3 pt-2.5 border-t border-[#EAE3D9] flex items-center justify-between">
          <div>
            <span className="text-[9px] text-[#7E756B] block uppercase tracking-wider">
              Indicative Price
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#1A1715] tabular-nums">
              {product.formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onQuickWhatsApp(product)}
              className="sm:hidden p-1 bg-[#2D734C] text-white rounded text-[10px]"
              aria-label="Enquire on WhatsApp"
            >
              <MessageCircle className="w-3 h-3" />
            </button>
            <button
              onClick={() => onOpenDetail(product)}
              className="text-[11px] font-medium uppercase tracking-wider text-[#8C6D3B] hover:text-[#26221F] transition-colors cursor-pointer py-0.5 px-1.5"
            >
              Enquire →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
