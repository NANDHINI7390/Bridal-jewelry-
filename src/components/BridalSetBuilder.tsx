import React, { useState } from 'react';
import { BRIDAL_STYLES, PRODUCTS } from '../data/products';
import { Sparkles, Check, ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { Product } from '../types';

interface BridalSetBuilderProps {
  onOpenProduct: (product: Product) => void;
  onBookAppointment: (interestedNote?: string) => void;
  onWhatsAppEnquiry: (productName: string, sku: string, price: number) => void;
}

export const BridalSetBuilder: React.FC<BridalSetBuilderProps> = ({
  onOpenProduct,
  onBookAppointment,
  onWhatsAppEnquiry,
}) => {
  const [selectedStyleId, setSelectedStyleId] = useState<string>('traditional');
  const [selectedAttire, setSelectedAttire] = useState<string>('Kanjivaram Silk Saree');
  const [includedPieces, setIncludedPieces] = useState<{
    choker: boolean;
    earrings: boolean;
    bangles: boolean;
    ring: boolean;
  }>({
    choker: true,
    earrings: true,
    bangles: true,
    ring: false,
  });

  const currentStyle = BRIDAL_STYLES.find((s) => s.id === selectedStyleId) || BRIDAL_STYLES[0];
  
  // Get matching products
  const matchingProducts = PRODUCTS.filter((p) =>
    currentStyle.recommendedProductIds.includes(p.id)
  );

  // Compute trousseau estimate based on toggled pieces
  const calculateEstimatedTotal = () => {
    let sum = 0;
    matchingProducts.forEach((prod) => {
      if (prod.category === 'Bridal Sets' || prod.category === 'Necklaces') {
        if (includedPieces.choker) sum += prod.price;
      } else if (prod.category === 'Earrings') {
        if (includedPieces.earrings) sum += prod.price;
      } else if (prod.category === 'Bangles') {
        if (includedPieces.bangles) sum += prod.price;
      } else if (prod.category === 'Rings') {
        if (includedPieces.ring) sum += prod.price;
      }
    });
    // Fallback if matching sets have different composition
    if (sum === 0) {
      sum = matchingProducts.reduce((acc, curr) => acc + curr.price, 0);
    }
    return sum;
  };

  const estimatedTotal = calculateEstimatedTotal();

  const togglePiece = (key: keyof typeof includedPieces) => {
    setIncludedPieces((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F5F0EB] border-y border-[#EAE3D9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Reference Screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs tracking-[0.24em] uppercase text-[#B88E4B] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Bridal Atelier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1715] font-light">
            Find Your Bridal Set
          </h2>
          <p className="text-sm sm:text-base text-[#5A524A] mt-2">
            Choose your wedding style and wedding attire to discover handcrafted, harmonious bridal suites tailored for your Muhurtham, Sangeet, or Reception.
          </p>
        </div>

        {/* 1. Style Selection Ribbon */}
        <div className="mb-10">
          <div className="text-xs uppercase tracking-wider text-[#7E756B] font-semibold mb-3 text-center sm:text-left">
            Step 1: Select Your Wedding Aesthetic
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {BRIDAL_STYLES.map((style) => {
              const isSelected = style.id === selectedStyleId;
              return (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyleId(style.id)}
                  className={`text-left p-3 rounded-lg border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-[#B88E4B] bg-[#FAF8F5] shadow-md ring-1 ring-[#B88E4B]'
                      : 'border-[#E2D8CC] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] hover:border-[#C8A265]'
                  }`}
                >
                  <div className="aspect-[4/3] rounded overflow-hidden mb-2.5 bg-[#EAE3D9]">
                    <img
                      src={style.image}
                      alt={style.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm sm:text-base font-semibold text-[#1A1715] leading-tight">
                      {style.name}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#B88E4B] text-white flex items-center justify-center text-[10px] shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#7E756B] mt-0.5 truncate">
                    {style.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Attire & Customization Strip */}
        <div className="bg-[#FAF8F5] rounded-xl border border-[#E8DFD3] p-5 sm:p-7 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Attire & Pieces Selectors */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#7E756B] font-semibold mb-2">
                  Step 2: Choose Your Ceremony Attire
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Kanjivaram Silk Saree',
                    'Royal Bridal Lehenga',
                    'Pastel Reception Gown',
                    'Banarasi Zari Saree',
                  ].map((attire) => (
                    <button
                      key={attire}
                      onClick={() => setSelectedAttire(attire)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                        selectedAttire === attire
                          ? 'bg-[#1A1715] text-[#FAF8F5]'
                          : 'bg-[#F2ECE3] text-[#4A443E] hover:bg-[#EAE3D9]'
                      }`}
                    >
                      {attire}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#7E756B] font-semibold mb-2">
                  Step 3: Include Pieces in Your Trousseau
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => togglePiece('choker')}
                    className={`p-2.5 rounded border text-left text-xs transition-colors cursor-pointer ${
                      includedPieces.choker
                        ? 'border-[#B88E4B] bg-[#F7F3ED] font-semibold text-[#1A1715]'
                        : 'border-[#EAE3D9] text-[#7E756B] hover:border-[#D3C1AD]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Bridal Necklace</span>
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${includedPieces.choker ? 'bg-[#B88E4B] text-white' : 'border border-gray-300'}`}>
                        {includedPieces.choker && '✓'}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => togglePiece('earrings')}
                    className={`p-2.5 rounded border text-left text-xs transition-colors cursor-pointer ${
                      includedPieces.earrings
                        ? 'border-[#B88E4B] bg-[#F7F3ED] font-semibold text-[#1A1715]'
                        : 'border-[#EAE3D9] text-[#7E756B] hover:border-[#D3C1AD]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Jhumkas / Drops</span>
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${includedPieces.earrings ? 'bg-[#B88E4B] text-white' : 'border border-gray-300'}`}>
                        {includedPieces.earrings && '✓'}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => togglePiece('bangles')}
                    className={`p-2.5 rounded border text-left text-xs transition-colors cursor-pointer ${
                      includedPieces.bangles
                        ? 'border-[#B88E4B] bg-[#F7F3ED] font-semibold text-[#1A1715]'
                        : 'border-[#EAE3D9] text-[#7E756B] hover:border-[#D3C1AD]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Bangles / Kadas</span>
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${includedPieces.bangles ? 'bg-[#B88E4B] text-white' : 'border border-gray-300'}`}>
                        {includedPieces.bangles && '✓'}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => togglePiece('ring')}
                    className={`p-2.5 rounded border text-left text-xs transition-colors cursor-pointer ${
                      includedPieces.ring
                        ? 'border-[#B88E4B] bg-[#F7F3ED] font-semibold text-[#1A1715]'
                        : 'border-[#EAE3D9] text-[#7E756B] hover:border-[#D3C1AD]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Solitaire Ring</span>
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${includedPieces.ring ? 'bg-[#B88E4B] text-white' : 'border border-gray-300'}`}>
                        {includedPieces.ring && '✓'}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Calculated Value & Action Box */}
            <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E8DFD3] rounded-lg p-5 flex flex-col justify-between">
              <div>
                <div className="text-[11px] tracking-widest uppercase text-[#B88E4B] font-semibold">
                  Curated Ensemble Estimate
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-[#1A1715] mt-1 font-semibold">
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-[#7E756B] mt-1">
                  Includes 22K Gold hallmarking, certified natural gemstones, and bespoke bride sizing at our Pondicherry atelier.
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onBookAppointment(`Bridal Set Consultation: ${currentStyle.name} with ${selectedAttire}`)}
                  className="flex-1 py-2 px-3 bg-[#26221F] hover:bg-[#8C6D3B] text-[#FAF8F5] text-[11px] font-medium uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3 h-3 text-[#C8B28B]" />
                  <span>Book VIP Try-On</span>
                </button>

                <button
                  onClick={() =>
                    onWhatsAppEnquiry(
                      `${currentStyle.name} Bridal Ensemble for ${selectedAttire}`,
                      'SET-CUSTOM',
                      estimatedTotal
                    )
                  }
                  className="py-2 px-3 bg-[#2D734C] hover:bg-[#245D3D] text-white text-[11px] font-medium uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp Details</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Matching Curated Pieces Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg sm:text-xl text-[#1A1715] font-normal">
              Recommended Pieces for <span className="font-medium text-[#B88E4B]">{currentStyle.name}</span>
            </h3>
            <span className="text-xs text-[#7E756B]">
              Showing {matchingProducts.length} coordinated designs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {matchingProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#FAF8F5] rounded-lg overflow-hidden border border-[#E8DFD3] hover:border-[#B88E4B] transition-all hover:shadow-md flex flex-col"
              >
                <div
                  onClick={() => onOpenProduct(prod)}
                  className="aspect-square bg-[#EFE7DE] relative overflow-hidden cursor-pointer group"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#FAF8F5]/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-semibold text-[#1A1715] tracking-wider uppercase">
                    {prod.category}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-[#7E756B] mb-0.5">
                      {prod.collection}
                    </div>
                    <h4
                      onClick={() => onOpenProduct(prod)}
                      className="font-serif text-base font-semibold text-[#1A1715] hover:text-[#B88E4B] cursor-pointer line-clamp-1"
                    >
                      {prod.name}
                    </h4>
                    <div className="text-xs text-[#5A524A] mt-1">
                      {prod.metal} · {prod.grossWeight}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EAE3D9] flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#1A1715] tabular-nums">
                      {prod.formattedPrice}
                    </span>
                    <button
                      onClick={() => onOpenProduct(prod)}
                      className="text-xs font-semibold text-[#B88E4B] hover:text-[#1A1715] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
