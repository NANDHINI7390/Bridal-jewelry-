import React, { useState } from 'react';
import { Product } from '../types';
import { X, Heart, MessageCircle, Calendar, ShieldCheck, Gem, Sparkles, Scale, Info, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onBookAppointment: (productName: string) => void;
  onWhatsAppEnquiry: (productName: string, sku: string, price: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onBookAppointment,
  onWhatsAppEnquiry,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.goldPurity?.[0] || product.metal
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.variants?.sizes?.[0] || 'Standard'
  );
  const [showPriceBreakdown, setShowPriceBreakdown] = useState<boolean>(false);

  const images = product.additionalImages?.length ? product.additionalImages : [product.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative bg-[#FAF8F5] rounded-xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8DFD3]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#4A443E] hover:text-[#1A1715] bg-[#FAF8F5]/80 hover:bg-white rounded-full transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8">
          
          {/* Left Column: Image Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image */}
            <div className="aspect-square bg-[#F5EFE8] rounded-lg overflow-hidden border border-[#E8DFD3] relative">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs text-[#7E756B]">
                SKU: <span className="font-mono text-[#1A1715] font-semibold">{product.sku}</span>
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImage === img ? 'border-[#B88E4B] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Atelier Assurance Box */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-[#F5F0EB] rounded-lg border border-[#EAE3D9] text-center text-xs text-[#4A443E]">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#B88E4B]" />
                <span className="font-medium text-[11px]">BIS 916 Hallmarked</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Gem className="w-4 h-4 text-[#B88E4B]" />
                <span className="font-medium text-[11px]">SGL / IGI Certified</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Sparkles className="w-4 h-4 text-[#B88E4B]" />
                <span className="font-medium text-[11px]">Lifetime Exchange</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase / Enquiry Module (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Collection & Category */}
              <div className="flex items-center justify-between text-xs text-[#7E756B] mb-1">
                <span className="tracking-widest uppercase font-medium">{product.collection}</span>
                <span className="text-[#B88E4B]">{product.category}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#1A1715] leading-snug">
                {product.name}
              </h2>

              {/* Price & Weight Header */}
              <div className="mt-3 flex items-baseline justify-between pb-4 border-b border-[#EAE3D9]">
                <div>
                  <span className="text-xs text-[#7E756B] block">Showroom Price Estimate</span>
                  <span className="text-2xl font-serif font-bold text-[#1A1715] tabular-nums">
                    {product.formattedPrice}
                  </span>
                </div>
                <button
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="text-xs text-[#B88E4B] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Price Breakdown</span>
                </button>
              </div>

              {/* Dynamic Price Breakdown Panel */}
              {showPriceBreakdown && (
                <div className="my-3 p-3.5 bg-[#FAF8F5] border border-[#B88E4B]/40 rounded-lg text-xs space-y-1.5 animate-fade-in text-[#4A443E]">
                  <div className="font-semibold text-[#1A1715] pb-1 border-b border-[#EAE3D9] flex justify-between">
                    <span>Valuation Transparency</span>
                    <span>Net Wt: {product.netWeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gold Value (22K Fine Rate):</span>
                    <span className="tabular-nums">Included at current MCX benchmark</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gemstone & Diamond Valuation:</span>
                    <span className="tabular-nums">As per SGL/IGI certificate</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Handcrafting & Nakshi Artistry:</span>
                    <span className="tabular-nums">Included (Zero hidden markups)</span>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5A524A] mt-4 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Technical Specifications Table */}
              <div className="mt-5 bg-[#F7F3ED] rounded-lg p-3.5 border border-[#EAE3D9] space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#EAE3D9]">
                  <span className="text-[#7E756B]">Precious Metal:</span>
                  <span className="font-medium text-[#1A1715]">{product.metal} ({product.purity})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EAE3D9]">
                  <span className="text-[#7E756B]">Gross Weight:</span>
                  <span className="font-medium text-[#1A1715] tabular-nums">{product.grossWeight}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EAE3D9]">
                  <span className="text-[#7E756B]">Net Gold Weight:</span>
                  <span className="font-medium text-[#1A1715] tabular-nums">{product.netWeight}</span>
                </div>
                <div className="py-1">
                  <span className="text-[#7E756B] block mb-0.5">Gemstones & Diamonds:</span>
                  <span className="font-medium text-[#1A1715] leading-tight block">{product.gemstoneDetails}</span>
                </div>
              </div>

              {/* Variant Selector (if available) */}
              {product.variants?.goldPurity && product.variants.goldPurity.length > 1 && (
                <div className="mt-4">
                  <label className="text-xs font-semibold uppercase text-[#7E756B] block mb-1.5">
                    Metal Selection
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.goldPurity.map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 text-xs rounded border transition-colors cursor-pointer ${
                          selectedVariant === v
                            ? 'border-[#B88E4B] bg-[#FAF8F5] text-[#1A1715] font-semibold'
                            : 'border-[#EAE3D9] text-[#7E756B] hover:border-[#B88E4B]'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector (if available) */}
              {product.variants?.sizes && product.variants.sizes.length > 1 && (
                <div className="mt-3">
                  <label className="text-xs font-semibold uppercase text-[#7E756B] block mb-1.5">
                    Size / Fit
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs rounded border transition-colors cursor-pointer ${
                          selectedSize === s
                            ? 'border-[#B88E4B] bg-[#FAF8F5] text-[#1A1715] font-semibold'
                            : 'border-[#EAE3D9] text-[#7E756B] hover:border-[#B88E4B]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Care Information */}
              <div className="mt-4 text-[11px] text-[#7E756B] italic">
                {product.careInfo}
              </div>
            </div>

            {/* High-Touch Luxury Action Buttons */}
            <div className="pt-3 space-y-2 border-t border-[#EAE3D9]">
              {/* Primary WhatsApp Enquiry */}
              <button
                onClick={() => onWhatsAppEnquiry(product.name, product.sku, product.price)}
                className="w-full py-2.5 px-3 bg-[#2D734C] hover:bg-[#245D3D] text-white text-[11px] font-medium tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enquire on WhatsApp</span>
              </button>

              {/* Book Showroom Appointment */}
              <button
                onClick={() => onBookAppointment(product.name)}
                className="w-full py-2.5 px-3 bg-[#26221F] hover:bg-[#8C6D3B] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C8B28B]" />
                <span>Book VIP Bridal Try-On</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`w-full py-2 px-3 border text-[11px] font-medium tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  isWishlisted
                    ? 'border-[#967743] bg-[#F7F3ED] text-[#967743]'
                    : 'border-[#D9CEBF] text-[#4A443E] hover:border-[#26221F] hover:text-[#26221F]'
                }`}
              >
                <Heart className="w-3.5 h-3.5" fill={isWishlisted ? 'currentColor' : 'none'} />
                <span>{isWishlisted ? 'Saved in Bridal Wishlist' : 'Add to Bridal Wishlist'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
