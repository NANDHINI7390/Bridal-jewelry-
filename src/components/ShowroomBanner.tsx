import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

interface ShowroomBannerProps {
  onBookConsultation: () => void;
  onVisitShowroom: () => void;
}

export const ShowroomBanner: React.FC<ShowroomBannerProps> = ({
  onBookConsultation,
  onVisitShowroom,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Bridal Consultation */}
          <div className="relative rounded-xl overflow-hidden min-h-[300px] sm:min-h-[340px] flex flex-col justify-end p-6 sm:p-8 bg-[#2A231D] text-white group shadow-md">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/src/assets/images/hero_bridal_editorial_1790700636282.jpg"
                alt="Bridal consultation styling session"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Luxury dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/95 via-[#141210]/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.24em] uppercase text-[#E6C894] font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Private Styling Salon</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#FAF8F5] leading-tight">
                Bridal Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#D6CEC4] max-w-sm">
                Personalised styling for your special day. Sip champagne while our master gemologists curate your complete wedding trousseau.
              </p>
              <div className="pt-2">
                <button
                  onClick={onBookConsultation}
                  className="px-4 py-2 bg-[#967743] hover:bg-[#836534] text-white text-[11px] font-medium tracking-wider uppercase rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Visit Our Pondicherry Showroom */}
          <div className="relative rounded-xl overflow-hidden min-h-[300px] sm:min-h-[340px] flex flex-col justify-end p-6 sm:p-8 bg-[#2A231D] text-white group shadow-md">
            {/* Background Image: Pondicherry Heritage Showroom */}
            <div className="absolute inset-0 z-0">
              <img
                src="/src/assets/images/pondicherry_showroom_facade_1790700720518.jpg"
                alt="Aurélia Fine Jewellery Heritage Showroom in White Town Pondicherry"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Luxury dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/95 via-[#141210]/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.24em] uppercase text-[#E6C894] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>French Quarter Heritage</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#FAF8F5] leading-tight">
                Visit Our Pondicherry Showroom
              </h3>
              <p className="text-xs sm:text-sm text-[#D6CEC4] max-w-sm">
                42 Rue Romain Rolland, White Town. Experience 19th-century colonial charm, VIP private suites, and complimentary valet parking.
              </p>
              <div className="pt-2">
                <button
                  onClick={onVisitShowroom}
                  className="px-4 py-2 bg-[#FAF8F5]/90 hover:bg-white text-[#26221F] text-[11px] font-medium tracking-wider uppercase rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Explore Atelier & Directions</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
