import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Gem, Sparkles, Truck, Users2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onExploreBridal: () => void;
  onBookAppointment: () => void;
}

interface Slide {
  id: string;
  preTitle: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  image: string;
  tagTitle: string;
  tagDesc: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    preTitle: 'Timeless Elegance',
    title: 'The Radiant',
    titleAccent: 'Bridal Collection',
    subtitle: 'Handcrafted jewellery for your unforgettable beginnings. Bespoke bridal suites, syndicate polki diamonds, and sacred 22K temple gold.',
    image: '/assets/images/hero_bridal_editorial_1790700636282.jpg',
    tagTitle: 'The Maharani Trousseau Suite',
    tagDesc: '22K Hallmarked Gold · Syndicate Polki & Emeralds',
  },
  {
    id: 'slide-2',
    preTitle: 'Sacred Heritage',
    title: 'The Royal',
    titleAccent: 'Temple Gold & Nakshi',
    subtitle: 'Ancient Dravidian repoussé sculpting in unadulterated 22K yellow gold. 100% solid gold with zero wax deductions and laser HUID authentication.',
    image: '/assets/images/necklace_royal_polki_1790700650025.jpg',
    tagTitle: 'Apsara Royal Temple Choker',
    tagDesc: 'Solid 22K Gold · Burmese Rubies & South Sea Pearls',
  },
  {
    id: 'slide-3',
    preTitle: 'High Jewellery Atelier',
    title: 'Haute Joaillerie',
    titleAccent: 'Diamond Cascades',
    subtitle: 'Certified GIA & IGI solitaire cascades, Hearts & Arrows diamonds, and platinum settings engineered for radiant evening receptions.',
    image: '/assets/images/diamond_necklace_collection_1790700743378.jpg',
    tagTitle: 'Étoile Cascade Diamond Riviere',
    tagDesc: '8.40 Carats VVS Diamonds · 18K White Gold',
  },
  {
    id: 'slide-4',
    preTitle: 'Imperial Trousseau',
    title: 'Royal Rajputana',
    titleAccent: 'Polki Masterpieces',
    subtitle: 'Syndicate uncut diamonds paired with untreated Zambian emeralds and lustrous Basra pearls, curated in our White Town heritage atelier.',
    image: '/assets/images/bridal_choker_set_1790700732133.jpg',
    tagTitle: 'Emerald Heritage Bridal Suite',
    tagDesc: 'Syndicate Polki · Colombian Emeralds · 4-Piece Suite',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreBridal, onBookAppointment }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide effect every 4.8 seconds
  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 4800);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentSlide, isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      className="relative bg-[#F5F0EB] overflow-hidden border-b border-[#EAE3D9]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background glow and subtle ambient pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#D3C1AD_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[460px] sm:min-h-[500px]">
          
          {/* Left Column: Editorial Typography and CTAs */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left z-10">
            {/* Slide Index & Pre-title */}
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.24em] text-[#8C6D3B] uppercase font-semibold">
              <span className="w-6 h-[1px] bg-[#A3824D] hidden lg:inline-block" />
              <span>{slide.preTitle}</span>
              <span className="text-[#A89E92] font-mono text-[11px]">
                [0{currentSlide + 1} / 0{HERO_SLIDES.length}]
              </span>
            </div>

            <div className="transition-all duration-500 ease-out">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#221E1B] leading-[1.12] tracking-tight">
                {slide.title} <br />
                <span className="italic font-normal text-[#9E7D47]">{slide.titleAccent}</span>
              </h1>

              {/* On Mobile: Image placed immediately below heading text so users don't have to scroll */}
              <div className="lg:hidden my-3.5 relative mx-auto max-w-sm sm:max-w-md">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-[#EBE3D7] border border-[#D9CEBF]">
                  {HERO_SLIDES.map((s, idx) => (
                    <div
                      key={s.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1715]/45 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ))}

                  {/* Micro Tag on Mobile */}
                  <div className="absolute bottom-2 left-2 right-2 z-20 bg-[#FAF8F5]/92 backdrop-blur-md px-2.5 py-1.5 rounded border border-[#E8DFD3] flex items-center justify-between text-xs">
                    <div className="truncate pr-1">
                      <div className="font-serif font-medium text-[#1A1715] text-xs truncate">
                        {slide.tagTitle}
                      </div>
                      <div className="text-[9px] text-[#7E756B] truncate">
                        {slide.tagDesc}
                      </div>
                    </div>
                    <button
                      onClick={onExploreBridal}
                      className="text-[9px] font-medium tracking-wider uppercase text-[#967743] hover:underline cursor-pointer shrink-0"
                    >
                      View Piece →
                    </button>
                  </div>
                </div>

                {/* Small Auto-Slide Indicator Dots directly below mobile image */}
                <div className="mt-2.5 flex items-center justify-center gap-1.5">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentSlide
                          ? 'w-5 bg-[#967743]'
                          : 'w-1.5 bg-[#D9CEBF] hover:bg-[#B8AA98]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#524B44] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed mt-2.5 sm:mt-3">
                {slide.subtitle}
              </p>
            </div>

            {/* Refined, Reduced-Size and Soft-Tone Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5">
              <button
                onClick={onExploreBridal}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#967743] hover:bg-[#836534] text-white text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase rounded transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore Bridal Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onBookAppointment}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-[#C2B5A5] text-[#36302B] text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book an Appointment</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Campaign Visual for Desktop (Hidden on Mobile) */}
          <div className="hidden lg:block lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative luxury frame */}
              <div className="absolute -inset-2 rounded-lg border border-[#D9CEBF]/80 pointer-events-none hidden sm:block" />
              
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded overflow-hidden shadow-xl bg-[#EBE3D7]">
                {/* Images Stack for Crossfade */}
                {HERO_SLIDES.map((s, idx) => (
                  <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform hover:scale-104 transition-transform duration-1000 ease-out"
                    />
                    {/* Subtle soft gradient overlay for editorial depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1715]/45 via-transparent to-transparent pointer-events-none" />
                  </div>
                ))}

                {/* Floating Micro Tag for Active Piece */}
                <div className="absolute bottom-3 left-3 right-3 z-20 bg-[#FAF8F5]/90 backdrop-blur-md px-3.5 py-2 rounded border border-[#E8DFD3] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-serif font-medium text-[#1A1715] text-xs sm:text-sm">
                      {slide.tagTitle}
                    </div>
                    <div className="text-[10px] text-[#7E756B]">
                      {slide.tagDesc}
                    </div>
                  </div>
                  <button
                    onClick={onExploreBridal}
                    className="text-[10px] font-medium tracking-wider uppercase text-[#967743] hover:underline cursor-pointer"
                  >
                    View Piece →
                  </button>
                </div>
              </div>

              {/* Small Auto-Slide Indicator Dots directly below desktop image */}
              <div className="mt-3.5 flex items-center justify-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="p-1 rounded text-[#7E756B] hover:text-[#221E1B] hover:bg-[#EAE3D9] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentSlide
                          ? 'w-6 bg-[#967743]'
                          : 'w-1.5 bg-[#D9CEBF] hover:bg-[#B8AA98]'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="p-1 rounded text-[#7E756B] hover:text-[#221E1B] hover:bg-[#EAE3D9] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Trust & Heritage Markers Bar */}
      <div className="border-t border-[#EAE3D9] bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 text-center">
            
            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-[#4A433D] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#967743] shrink-0" />
              <span className="tracking-wide">BIS Hallmarked Gold (916)</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-[#4A433D] font-medium">
              <Gem className="w-3.5 h-3.5 text-[#967743] shrink-0" />
              <span className="tracking-wide">GIA & IGI Certified Diamonds</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-[#4A433D] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#967743] shrink-0" />
              <span className="tracking-wide">Custom Bespoke Bridal Sets</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-[#4A433D] font-medium col-span-1 md:col-span-1">
              <Truck className="w-3.5 h-3.5 text-[#967743] shrink-0" />
              <span className="tracking-wide">Insured Pan-India Delivery</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-[#4A433D] font-medium col-span-2 md:col-span-1">
              <Users2 className="w-3.5 h-3.5 text-[#967743] shrink-0" />
              <span className="tracking-wide">1-on-1 VIP Bridal Stylist</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
