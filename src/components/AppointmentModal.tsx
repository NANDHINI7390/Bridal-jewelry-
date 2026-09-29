import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Sparkles, Check, Phone, Mail, User } from 'lucide-react';
import { AppointmentBooking } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
  onBookSuccess: (booking: AppointmentBooking) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
  onBookSuccess,
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    email: '',
    weddingDate: '',
    preferredDate: '2026-10-06',
    timeSlot: '11:00 AM - 1:00 PM',
    appointmentType: 'In-Showroom VIP Suite (Pondicherry)' as 'In-Showroom VIP Suite (Pondicherry)' | 'Virtual Video Consultation',
    serviceType: 'Bridal Trousseau Styling' as 'Bridal Trousseau Styling' | 'Bespoke Custom Commission' | 'Diamond & Solitaire Consultation' | 'General Preview',
    guestCount: 2,
    notes: preselectedProduct ? `Interested in trying on: ${preselectedProduct}` : '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.phone) return;

    const newBooking: AppointmentBooking = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: formData.clientName,
      phone: formData.phone,
      email: formData.email || 'client@example.com',
      weddingDate: formData.weddingDate,
      preferredDate: formData.preferredDate,
      timeSlot: formData.timeSlot,
      appointmentType: formData.appointmentType,
      serviceType: formData.serviceType,
      interestedProducts: preselectedProduct ? [preselectedProduct] : ['Custom Bridal Selection'],
      guestCount: Number(formData.guestCount),
      notes: formData.notes,
      status: 'Confirmed',
      createdAt: 'Just now',
    };

    onBookSuccess(newBooking);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-[#FAF8F5] rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD3]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#4A443E] hover:text-[#1A1715] bg-[#F2ECE3] hover:bg-white rounded-full transition-colors cursor-pointer"
          aria-label="Close appointment modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-[#B88E4B]/10 text-[#B88E4B] rounded-full mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1715] font-light">
              Appointment Reserved
            </h3>
            <p className="text-sm text-[#5A524A] max-w-md mx-auto">
              Thank you, <strong className="text-[#1A1715]">{formData.clientName}</strong>. Our senior bridal consultant has reserved your private VIP suite in our White Town atelier for{' '}
              <strong className="text-[#1A1715]">{formData.preferredDate}</strong> at <strong className="text-[#1A1715]">{formData.timeSlot}</strong>.
            </p>
            <div className="p-4 bg-[#F5F0EB] rounded-lg border border-[#EAE3D9] text-xs text-[#7E756B] max-w-sm mx-auto">
              Showroom: 42 Rue Romain Rolland, White Town, Pondicherry. Complimentary valet parking and French press hospitality included.
            </div>
            <div className="pt-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-4 py-2 bg-[#26221F] hover:bg-[#8C6D3B] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase rounded transition-colors cursor-pointer"
              >
                Close & Return to Showroom
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.24em] uppercase text-[#967743] font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Pondicherry VIP Bridal Suite</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#1A1715] font-light mt-0.5">
                Book a Private Consultation
              </h2>
              <p className="text-xs text-[#7E756B]">
                Enjoy an unhurried, private jewellery preview with your family. Try on matched sets with your bridal attire.
              </p>
            </div>

            {preselectedProduct && (
              <div className="p-2.5 bg-[#F5F0EB] rounded-lg border border-[#EAE3D9] text-xs flex items-center justify-between">
                <span className="text-[#5A524A]">Piece selected for preview:</span>
                <span className="font-medium text-[#1A1715]">{preselectedProduct}</span>
              </div>
            )}

            {/* Experience Type Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    appointmentType: 'In-Showroom VIP Suite (Pondicherry)',
                  }))
                }
                className={`py-1.5 px-2.5 text-[11px] rounded border text-center transition-colors cursor-pointer ${
                  formData.appointmentType === 'In-Showroom VIP Suite (Pondicherry)'
                    ? 'border-[#967743] bg-[#FAF8F5] text-[#1A1715] font-semibold ring-1 ring-[#967743]'
                    : 'border-[#EAE3D9] text-[#7E756B] hover:border-[#D3C1AD]'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#967743]" />
                  <span>White Town Showroom</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    appointmentType: 'Virtual Video Consultation',
                  }))
                }
                className={`py-1.5 px-2.5 text-[11px] rounded border text-center transition-colors cursor-pointer ${
                  formData.appointmentType === 'Virtual Video Consultation'
                    ? 'border-[#967743] bg-[#FAF8F5] text-[#1A1715] font-semibold ring-1 ring-[#967743]'
                    : 'border-[#EAE3D9] text-[#7E756B] hover:border-[#D3C1AD]'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#967743]" />
                  <span>Virtual Video (Global/NRI)</span>
                </div>
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A89E92] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samyuktha Rangarajan"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#A89E92] absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98400 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A89E92] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    placeholder="e.g. bride@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                  Wedding / Function Date
                </label>
                <input
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                />
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                  Preferred Appointment Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                >
                  <option value="10:30 AM - 12:00 PM">10:30 AM - 12:00 PM (Morning Slot)</option>
                  <option value="12:00 PM - 1:30 PM">12:00 PM - 1:30 PM (Midday Slot)</option>
                  <option value="2:30 PM - 4:00 PM">2:30 PM - 4:00 PM (Afternoon Slot)</option>
                  <option value="4:30 PM - 6:00 PM">4:30 PM - 6:00 PM (Sunset Slot)</option>
                  <option value="6:30 PM - 8:00 PM">6:30 PM - 8:00 PM (Evening Salon)</option>
                </select>
              </div>
            </div>

            {/* Service & Guest Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                  Consultation Focus
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      serviceType: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                >
                  <option value="Bridal Trousseau Styling">Complete Bridal Trousseau Styling</option>
                  <option value="Diamond & Solitaire Consultation">Diamond & Solitaire Consultation</option>
                  <option value="Bespoke Custom Commission">Bespoke Custom Commission (Temple/Polki)</option>
                  <option value="General Preview">Heirloom Collection Preview</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                  Expected Guests Attending
                </label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
                >
                  <option value={1}>Bride / Individual (1 person)</option>
                  <option value={2}>Bride & Groom / Partner (2 people)</option>
                  <option value={3}>Bride & Parents (3 people)</option>
                  <option value={4}>Family Bridal Party (4-5 people)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                Specific Jewellery Preferences or Attire Colors
              </label>
              <textarea
                rows={2}
                placeholder="Mention saree colors (e.g. Crimson & Gold Kanjivaram), gold purity preference, or specific pieces..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#B88E4B]"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#26221F] hover:bg-[#8C6D3B] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase rounded transition-colors cursor-pointer shadow-xs"
              >
                Confirm VIP Appointment Reservation
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
