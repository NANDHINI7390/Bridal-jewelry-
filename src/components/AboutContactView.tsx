import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Gem, Sparkles, Send, Check } from 'lucide-react';
import { ProductEnquiry } from '../types';

interface AboutContactViewProps {
  onBookAppointment: () => void;
  onNewEnquiry: (enquiry: ProductEnquiry) => void;
}

export const AboutContactView: React.FC<AboutContactViewProps> = ({
  onBookAppointment,
  onNewEnquiry,
}) => {
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    onNewEnquiry({
      id: `ENQ-${Math.floor(4000 + Math.random() * 1000)}`,
      productName: 'General Showroom Inquiry',
      productSku: 'SHOWROOM-GEN',
      productPrice: 0,
      clientName: contactName,
      clientPhone: contactPhone,
      clientCity: 'Pondicherry / Online',
      message: contactMessage || 'Inquiring about showroom visit & collection preview.',
      channel: 'Website Form',
      status: 'New',
      createdAt: 'Just now',
    });

    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section: The Pondicherry Atelier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-[#B88E4B] font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>French Quarter Heritage</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1715] font-light leading-tight">
              Where French Grace Meets <br />
              <span className="italic text-[#B88E4B]">Sacred Indian Artistry</span>
            </h1>

            <p className="text-sm sm:text-base text-[#5A524A] font-light leading-relaxed">
              Nestled along the quiet, bougainvillea-framed cobblestones of Rue Romain Rolland in White Town, Pondicherry, Aurélia Fine Jewellery is a sanctuary for discerning brides and lovers of heirloom jewellery.
            </p>

            <p className="text-sm sm:text-base text-[#5A524A] font-light leading-relaxed">
              Housed within a restored 19th-century French colonial villa, our atelier marries ancient Dravidian temple goldsmithing and regal Rajputana polki techniques with clean, refined contemporary aesthetics.
            </p>

            <div className="pt-2">
              <button
                onClick={onBookAppointment}
                className="px-4 py-2 bg-[#26221F] hover:bg-[#8C6D3B] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase rounded transition-colors cursor-pointer shadow-xs"
              >
                Reserve Your VIP Bridal Suite
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-xl border border-[#E8DFD3] bg-[#EFE7DE]">
              <img
                src="/src/assets/images/pondicherry_showroom_facade_1790700720518.jpg"
                alt="Aurélia Fine Jewellery White Town Pondicherry Showroom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF8F5]/95 backdrop-blur-sm p-3.5 rounded border border-[#E8DFD3] text-xs">
                <div className="font-serif font-semibold text-[#1A1715]">
                  The Heritage Villa Atelier
                </div>
                <div className="text-[11px] text-[#7E756B]">
                  42 Rue Romain Rolland, White Town, Pondicherry 605001
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-[#F5F0EB] rounded-xl border border-[#EAE3D9] space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#B88E4B]" />
            <h3 className="font-serif text-lg font-semibold text-[#1A1715]">
              Unadulterated Weight Integrity
            </h3>
            <p className="text-xs text-[#5A524A] leading-relaxed">
              Every 22K temple and antique piece is crafted with solid gold—strictly zero wax, lac, or resin deductions. Computerized spectrometer purity verification is provided for complete transparency.
            </p>
          </div>

          <div className="p-6 bg-[#F5F0EB] rounded-xl border border-[#EAE3D9] space-y-3">
            <Gem className="w-6 h-6 text-[#B88E4B]" />
            <h3 className="font-serif text-lg font-semibold text-[#1A1715]">
              Syndicate Polki & Certified Diamonds
            </h3>
            <p className="text-xs text-[#5A524A] leading-relaxed">
              We select only high-clarity uncut polki diamonds, untreated Colombian emeralds, and GIA/IGI certified solitaire diamonds with Triple Excellent cut ratings.
            </p>
          </div>

          <div className="p-6 bg-[#F5F0EB] rounded-xl border border-[#EAE3D9] space-y-3">
            <Sparkles className="w-6 h-6 text-[#B88E4B]" />
            <h3 className="font-serif text-lg font-semibold text-[#1A1715]">
              The VIP Bridal Salon Experience
            </h3>
            <p className="text-xs text-[#5A524A] leading-relaxed">
              Step away from crowded retail counters. Our soundproof private suites allow you and your family to try on matching trousseau sets in tranquil, unhurried comfort with bridal lighting.
            </p>
          </div>
        </div>

        {/* Showroom Details & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-[#EAE3D9]">
          {/* Visiting Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] tracking-widest uppercase text-[#B88E4B] font-semibold">
                Visit Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1715] font-light mt-1">
                Showroom Information
              </h2>
            </div>

            <div className="space-y-4 text-xs text-[#4A443E]">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#B88E4B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1715]">Pondicherry Heritage Showroom:</strong>
                  <span>42 Rue Romain Rolland, French Quarter (White Town), Puducherry 605001, India</span>
                  <span className="block text-[#7E756B] mt-0.5">Landmark: Opposite Dumas Guest House</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="w-4 h-4 text-[#B88E4B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1715]">Showroom Visiting Hours:</strong>
                  <span>Monday to Sunday: 10:30 AM – 8:30 PM</span>
                  <span className="block text-[#7E756B] mt-0.5">VIP Bridal Suites open until 9:30 PM by prior appointment</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-[#B88E4B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1715]">Telephone & WhatsApp:</strong>
                  <span>Showroom Desk: +91 413 222 4810</span>
                  <span className="block text-[#7E756B]">Bridal Concierge: +91 94432 88201</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-[#B88E4B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1A1715]">Direct Inquiries:</strong>
                  <span>concierge@aureliajewellery.com</span>
                </div>
              </div>
            </div>

            {/* Amenities badge */}
            <div className="p-4 bg-[#F5F0EB] rounded-lg border border-[#EAE3D9] text-xs text-[#5A524A] space-y-1">
              <span className="font-semibold text-[#1A1715] block">Showroom Privileges:</span>
              <div>✓ Complimentary Valet Parking on Rue Suffren</div>
              <div>✓ Private Dressing Mirrors calibrated for Wedding Attire</div>
              <div>✓ French Press Coffee & Refreshments for Bridal Families</div>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#E2D8CC] shadow-xs">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1715] font-light">
                  Message Sent to Concierge
                </h3>
                <p className="text-xs text-[#5A524A] max-w-sm mx-auto">
                  Thank you, <strong>{contactName}</strong>. Our senior jewellery consultant will reach out via WhatsApp or phone within a few hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 bg-[#1A1715] text-[#FAF8F5] text-xs font-semibold rounded uppercase"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] tracking-widest uppercase text-[#B88E4B] font-semibold">
                    Inquire Online
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#1A1715] font-light mt-1">
                    Connect With Our Atelier
                  </h3>
                  <p className="text-xs text-[#7E756B] mt-1">
                    Have questions about a specific design, custom commission, or today's gold rate? Send us a message.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Meenakshi"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98402 12345"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. bride@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                    Your Message / Desired Piece
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the jewellery you are seeking, approximate budget, or wedding date..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#26221F] hover:bg-[#8C6D3B] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Atelier</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
