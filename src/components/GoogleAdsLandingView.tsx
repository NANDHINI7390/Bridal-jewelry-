import React, { useState } from 'react';
import { Search, Globe, Phone, MapPin, Calendar, MessageCircle, Star, ShieldCheck, ArrowRight, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface GoogleAdsLandingViewProps {
  onOpenProduct: (product: Product) => void;
  onBookAppointment: (note?: string) => void;
  onWhatsAppEnquiry: (productName: string, sku: string, price: number) => void;
}

interface CampaignQuery {
  id: string;
  query: string;
  headline: string;
  subhead: string;
  description: string;
  adTitle: string;
  adSnippet: string;
  monthlySearches: string;
  avgOrderValue: string;
  productFilterCategory?: string;
  featuredProducts: Product[];
}

export const GoogleAdsLandingView: React.FC<GoogleAdsLandingViewProps> = ({
  onOpenProduct,
  onBookAppointment,
  onWhatsAppEnquiry,
}) => {
  const campaigns: CampaignQuery[] = [
    {
      id: 'bridal-pondy',
      query: 'Bridal Jewellery in Pondicherry',
      headline: 'Pondicherry’s Most Exclusive Bridal Jewellery Destination',
      subhead: 'Handcrafted in 22K Hallmarked Gold, Uncut Polki Diamonds & Certified Gemstones',
      description: 'Step into our French Quarter heritage atelier on Rue Romain Rolland. Experience bespoke bridal consultations in our private VIP suites with complimentary valet parking.',
      adTitle: 'Bridal Jewellery in Pondicherry | Aurélia Fine Jewellery White Town',
      adSnippet: 'Explore handcrafted 22K bridal sets, uncut syndicate polki & temple jewellery. Private VIP bridal suites. Book your personalized appointment today.',
      monthlySearches: '14,200/mo',
      avgOrderValue: '₹4,85,000',
      featuredProducts: PRODUCTS.filter((p) => p.category === 'Bridal Sets' || p.category === 'Necklaces'),
    },
    {
      id: 'wedding-whitetown',
      query: 'Wedding Jewellery Showroom White Town',
      headline: 'Heritage Wedding Jewellery Atelier · White Town, Pondicherry',
      subhead: '100% Solid 22K Gold With Zero Lac/Wax Deductions & Certified Purity',
      description: 'Located in a restored 19th-century colonial villa. We craft timeless bridal heirlooms designed to match your Kanjivaram silks and couture lehengas.',
      adTitle: 'Wedding Jewellery Showroom White Town | Aurélia French Quarter',
      adSnippet: 'Pondicherry’s premier bridal destination. Temple nakshi kadas, polki chokers & certified engagement rings. Call +91 413 222 4810.',
      monthlySearches: '8,900/mo',
      avgOrderValue: '₹3,75,000',
      featuredProducts: PRODUCTS.filter((p) => p.category === 'Bangles' || p.category === 'Bridal Sets'),
    },
    {
      id: 'bridal-sets',
      query: 'Bridal Jewellery Sets Gold & Diamond',
      headline: 'Curated Bridal Suites: Chokers, Haars, Jhumkas & Kadas',
      subhead: 'Harmonious Wedding Ensembles with Transparent Weight & SGL Certification',
      description: 'Save weeks of wedding shopping. Our gemologists curate complete 4-piece and 5-piece bridal trousseaus designed for your Muhurtham and Reception.',
      adTitle: 'Bridal Jewellery Sets Gold & Diamond | Complete Wedding Trousseaus',
      adSnippet: 'Browse coordinated bridal choker suites, temple haar sets & diamond rivieres. Lifetime buyback guarantee & BIS 916 hallmarking.',
      monthlySearches: '11,400/mo',
      avgOrderValue: '₹5,50,000',
      featuredProducts: PRODUCTS.filter((p) => p.category === 'Bridal Sets' || p.category === 'Diamond Collection'),
    },
    {
      id: 'temple-jewellery',
      query: 'Temple Jewellery for Tamil Wedding',
      headline: 'Authentic 22K Temple Nakshi & Heritage Gold',
      subhead: 'Hand-Carved Divine Motifs, Burmese Rubies & South Sea Pearls',
      description: 'Preserving century-old Dravidian temple sculpting traditions. Pure solid 22K yellow gold with laser HUID authentication.',
      adTitle: 'Temple Jewellery for Tamil Wedding | Antique 22K Nakshi Gold',
      adSnippet: 'Exquisite temple chokers, Lakshmi kadas & Kasu malais for your traditional Muhurtham. Handcrafted by master regional artisans in Pondicherry.',
      monthlySearches: '6,800/mo',
      avgOrderValue: '₹3,20,000',
      featuredProducts: PRODUCTS.filter((p) => p.collection.includes('Temple') || p.category === 'Bangles'),
    },
    {
      id: 'diamond-jewellery',
      query: 'Certified Diamond Jewellery Pondicherry',
      headline: 'GIA & IGI Certified Solitaires and Haute Joaillerie',
      subhead: 'Triple Excellent Cuts, VVS Clarity & Platinum 950 Settings',
      description: 'From 1.0ct+ engagement rings to dramatic cascading diamond rivieres for evening receptions and anniversaries.',
      adTitle: 'Certified Diamond Jewellery Pondicherry | GIA & IGI Solitaires',
      adSnippet: 'Experience unmatched diamond brilliance. Solitaire rings, tennis bracelets & bespoke cocktail jewellery. White Town showroom.',
      monthlySearches: '5,200/mo',
      avgOrderValue: '₹4,10,000',
      featuredProducts: PRODUCTS.filter((p) => p.category === 'Diamond Collection' || p.category === 'Rings'),
    },
  ];

  const [activeCampaignId, setActiveCampaignId] = useState<string>('bridal-pondy');
  const activeCampaign = campaigns.find((c) => c.id === activeCampaignId) || campaigns[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Pitch Explainer Header for the Sales Demo Presenter */}
        <div className="bg-[#1A1715] text-[#FAF8F5] p-6 sm:p-8 rounded-xl border border-[#C8A265]/40 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C8A265] font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>Customer Acquisition Platform for Store Owners</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-light text-white">
                Google Search & Ads High-Converting Landing Engine
              </h1>
              <p className="text-xs sm:text-sm text-[#D6CEC4] max-w-2xl font-light">
                Show your prospective jewellery store client how this platform converts Pondicherry wedding Google searches (e.g. <em>"Bridal Jewellery in Pondicherry"</em>) directly into VIP showroom appointments and WhatsApp sales leads.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-[#2A231D] p-4 rounded-lg border border-[#4A443E] shrink-0">
              <div>
                <span className="text-[11px] text-[#A39A8F] block uppercase">Est. Monthly Search Volume</span>
                <span className="text-lg font-bold text-[#C8A265] tabular-nums">{activeCampaign.monthlySearches}</span>
              </div>
              <div className="h-8 w-[1px] bg-[#4A443E]" />
              <div>
                <span className="text-[11px] text-[#A39A8F] block uppercase">Avg. Bridal Order Value</span>
                <span className="text-lg font-bold text-white tabular-nums">{activeCampaign.avgOrderValue}</span>
              </div>
            </div>
          </div>

          {/* Interactive Search Query Switcher */}
          <div className="mt-6 pt-5 border-t border-[#3E3832]">
            <div className="text-xs text-[#C8A265] uppercase tracking-wider font-semibold mb-2.5">
              Simulate Customer Google Search Query:
            </div>
            <div className="flex flex-wrap gap-2">
              {campaigns.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCampaignId(c.id)}
                  className={`px-3.5 py-1.5 text-xs rounded transition-all flex items-center gap-2 cursor-pointer ${
                    c.id === activeCampaignId
                      ? 'bg-[#C8A265] text-[#1A1715] font-semibold shadow'
                      : 'bg-[#2A231D] text-[#D6CEC4] hover:bg-[#3E3832] hover:text-white'
                  }`}
                >
                  <Search className="w-3 h-3" />
                  <span>"{c.query}"</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 1. Realistic Google Search Result Card Preview */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2D8CC] shadow-sm space-y-2 font-sans">
          <div className="flex items-center gap-2 text-xs text-[#70757a]">
            <span className="font-bold text-[#202124]">Sponsored / Ad</span>
            <span>·</span>
            <span className="text-[#202124]">https://www.aureliajewellery.com/pondicherry-bridal</span>
          </div>

          <h2 className="text-lg sm:text-xl font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
            {activeCampaign.adTitle}
          </h2>

          <div className="flex items-center gap-2 text-xs text-[#4d5156]">
            <div className="flex text-[#e37400]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-[#202124]">4.9</span>
            <span>(324 reviews) · Rue Romain Rolland, White Town, Pondicherry · Open until 8:30 PM</span>
          </div>

          <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed pt-1">
            {activeCampaign.adSnippet}
          </p>

          {/* Ad Sitelinks */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#1a0dab]">
            <div className="p-2 bg-[#f8f9fa] rounded hover:underline cursor-pointer">
              <span className="font-semibold block">Book VIP Bridal Suite</span>
              <span className="text-[11px] text-[#5f6368]">Private styling salon</span>
            </div>
            <div className="p-2 bg-[#f8f9fa] rounded hover:underline cursor-pointer">
              <span className="font-semibold block">View Bridal Sets</span>
              <span className="text-[11px] text-[#5f6368]">22K Polki & Temple</span>
            </div>
            <div className="p-2 bg-[#f8f9fa] rounded hover:underline cursor-pointer">
              <span className="font-semibold block">Today's Gold Rate</span>
              <span className="text-[11px] text-[#5f6368]">BIS 916 transparent pricing</span>
            </div>
            <div className="p-2 bg-[#f8f9fa] rounded hover:underline cursor-pointer">
              <span className="font-semibold block">WhatsApp Concierge</span>
              <span className="text-[11px] text-[#5f6368]">Instant photo estimates</span>
            </div>
          </div>
        </div>

        {/* 2. The Landing Page Experience Container */}
        <div className="bg-[#FAF8F5] rounded-xl border border-[#E8DFD3] overflow-hidden shadow-lg">
          
          {/* Campaign Landing Hero */}
          <div className="relative bg-[#F5F0EB] p-8 sm:p-12 border-b border-[#EAE3D9]">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#B88E4B] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Pondicherry Destination · White Town Showroom</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1715] font-light leading-tight">
                {activeCampaign.headline}
              </h2>
              <p className="text-sm sm:text-base text-[#5A524A] font-light leading-relaxed">
                {activeCampaign.description}
              </p>

              {/* Conversion Buttons */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <button
                  onClick={() => onBookAppointment(`Lead source: Google Search '${activeCampaign.query}'`)}
                  className="px-4 py-2 bg-[#26221F] hover:bg-[#8C6D3B] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C8B28B]" />
                  <span>Reserve VIP Bridal Suite</span>
                </button>

                <button
                  onClick={() =>
                    onWhatsAppEnquiry(
                      `Google Search Lead (${activeCampaign.query})`,
                      'GADS-LEAD',
                      350000
                    )
                  }
                  className="px-4 py-2 bg-[#2D734C] hover:bg-[#245D3D] text-white text-[11px] font-medium tracking-wider uppercase rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Instant WhatsApp Assistance</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap gap-4 text-xs text-[#7E756B]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B88E4B]" />
                  <span>BIS 916 Hallmarked (100% Solid Gold)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#B88E4B]" />
                  <span>Rue Romain Rolland, White Town</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#B88E4B]" />
                  <span>Showroom: +91 413 222 4810</span>
                </div>
              </div>
            </div>
          </div>

          {/* Curated Products for this exact search intent */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1A1715]">
                  Curated Pieces for "{activeCampaign.query}"
                </h3>
                <p className="text-xs text-[#7E756B] mt-0.5">
                  Pre-filtered high-intent catalog loaded directly for this visitor.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCampaign.featuredProducts.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-lg border border-[#EAE3D9] overflow-hidden hover:border-[#B88E4B] transition-all hover:shadow-md flex flex-col"
                >
                  <div
                    onClick={() => onOpenProduct(prod)}
                    className="aspect-square bg-[#F5EFE8] cursor-pointer relative overflow-hidden group"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1A1715]/85 text-[#FAF8F5] text-[10px] px-2 py-0.5 rounded uppercase font-semibold">
                      {prod.category}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-[#7E756B]">{prod.collection}</div>
                      <h4
                        onClick={() => onOpenProduct(prod)}
                        className="font-serif text-base font-semibold text-[#1A1715] hover:text-[#B88E4B] cursor-pointer line-clamp-1 mt-0.5"
                      >
                        {prod.name}
                      </h4>
                      <p className="text-xs text-[#5A524A] mt-1 line-clamp-2 font-light">
                        {prod.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#EAE3D9] flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#1A1715] tabular-nums">
                        {prod.formattedPrice}
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => onWhatsAppEnquiry(prod.name, prod.sku, prod.price)}
                          className="p-1.5 bg-[#2D734C] hover:bg-[#245D3D] text-white rounded text-[10px] cursor-pointer"
                          aria-label="Enquire on WhatsApp"
                        >
                          <MessageCircle className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onOpenProduct(prod)}
                          className="px-2 py-1 text-[11px] font-medium text-[#26221F] bg-[#F2ECE3] hover:bg-[#EAE3D9] rounded cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
