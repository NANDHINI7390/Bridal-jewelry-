import React from 'react';
import { REVIEWS } from '../data/adminData';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#F5F0EB] border-t border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] tracking-[0.24em] uppercase text-[#B88E4B] font-semibold">
            Heirloom Memories
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1715] font-light mt-1">
            Real Pondicherry Bride Stories
          </h2>
          <p className="text-xs sm:text-sm text-[#5A524A] mt-2">
            Discerning brides and families share their private atelier experience in White Town.
          </p>
        </div>

        {/* 3 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF8F5] rounded-xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#E8DFD3] absolute top-5 right-5" />

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#B88E4B] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <h3 className="font-serif text-lg font-semibold text-[#1A1715] mb-2 leading-snug">
                  "{rev.title}"
                </h3>

                <p className="text-xs sm:text-sm text-[#5A524A] leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE3D9]">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-xs text-[#1A1715]">{rev.brideName}</span>
                  {rev.verifiedBride && (
                    <span className="flex items-center gap-0.5 text-[10px] text-[#10B981] font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Bride</span>
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#7E756B] mt-0.5">{rev.city} · {rev.date}</div>
                <div className="mt-2 text-[11px] text-[#8C6A1C] font-serif font-medium">
                  Curated Suite: {rev.jewelleryWorn}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Trust Badge for Local SEO Pitch */}
        <div className="mt-10 max-w-xl mx-auto p-4 bg-[#FAF8F5] rounded-lg border border-[#EAE3D9] flex items-center justify-between text-xs text-[#5A524A]">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#1A1715] text-sm">4.9 / 5.0</span>
            <div className="flex text-[#B88E4B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[#7E756B]">· 320+ Google Reviews (White Town, Pondicherry)</span>
          </div>
          <span className="text-[11px] font-semibold text-[#B88E4B] uppercase tracking-wider">
            Verified Store
          </span>
        </div>

      </div>
    </section>
  );
};
