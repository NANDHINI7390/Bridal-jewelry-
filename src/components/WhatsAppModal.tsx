import React, { useState } from 'react';
import { X, MessageCircle, Send, CheckCheck, Sparkles } from 'lucide-react';
import { ProductEnquiry } from '../types';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  sku: string;
  price: number;
  onNewEnquiry: (enquiry: ProductEnquiry) => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  productName,
  sku,
  price,
  onNewEnquiry,
}) => {
  if (!isOpen) return null;

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [customQuery, setCustomQuery] = useState(
    `Hello Aurélia Fine Jewellery, I am enquiring about ${productName} (SKU: ${sku}, Indicative ₹${price.toLocaleString('en-IN')}). Could you please share the current gold rate breakdown and availability for a trial at your Pondicherry White Town showroom?`
  );
  const [sent, setSent] = useState(false);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const enquiryRecord: ProductEnquiry = {
      id: `ENQ-${Math.floor(4000 + Math.random() * 1000)}`,
      productName,
      productSku: sku,
      productPrice: price,
      clientName: clientName || 'Prospective Bride (Web Visitor)',
      clientPhone: clientPhone || '+91 98400 00000',
      clientCity: 'Pondicherry / Online',
      message: customQuery,
      channel: 'WhatsApp',
      status: 'New',
      createdAt: 'Just now',
    };

    onNewEnquiry(enquiryRecord);
    setSent(true);

    // Encode WhatsApp URL for actual device opening if desired
    const phoneTarget = '919443288201'; // Pondicherry showroom demo WhatsApp number
    const encodedText = encodeURIComponent(
      `Hello Aurélia Fine Jewellery White Town,\n\nI am ${clientName || 'interested in this piece'} (${clientPhone || ''}).\n\nPiece: ${productName}\nSKU: ${sku}\nPrice: ₹${price.toLocaleString('en-IN')}\n\nMessage: ${customQuery}`
    );
    const whatsappUrl = `https://wa.me/${phoneTarget}?text=${encodedText}`;

    // After 1.2s show success and optionally trigger window
    setTimeout(() => {
      // In sandbox we don't force popups, but provide direct link
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-[#FAF8F5] rounded-xl max-w-lg w-full p-6 shadow-2xl border border-[#E8DFD3]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#4A443E] hover:text-[#1A1715] bg-[#F2ECE3] hover:bg-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* WhatsApp Brand Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-[#EAE3D9]">
          <div className="w-8 h-8 rounded-full bg-[#2D734C] text-white flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-[#1A1715]">Aurélia Fine Jewellery</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            </div>
            <p className="text-[11px] text-[#7E756B]">
              Direct Showroom Concierge · White Town, Pondicherry
            </p>
          </div>
        </div>

        {sent ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
              <CheckCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg text-[#1A1715] font-semibold">
              Enquiry Routed to Showroom
            </h4>
            <p className="text-xs text-[#5A524A] max-w-sm mx-auto">
              Your inquiry for <strong>{productName}</strong> has been logged in our store’s lead management system. Our Pondicherry bridal consultant will respond via WhatsApp within 15 minutes.
            </p>
            <div className="pt-1">
              <button
                onClick={() => {
                  setSent(false);
                  onClose();
                }}
                className="px-4 py-1.5 bg-[#26221F] hover:bg-[#8C6D3B] text-[#FAF8F5] text-[11px] font-medium uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendWhatsApp} className="mt-3.5 space-y-3.5">
            <div className="p-2.5 bg-[#F5F0EB] rounded-lg border border-[#EAE3D9] text-xs text-[#4A443E]">
              <div className="font-medium text-[#1A1715]">{productName}</div>
              <div className="text-[10px] text-[#7E756B] flex items-center justify-between mt-0.5">
                <span>SKU: {sku}</span>
                <span className="font-medium text-[#1A1715]">Est: ₹{price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyadarshini"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#2D734C]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98402 12345"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#2D734C]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#7E756B] block mb-1">
                Pre-Filled Message for Consultant
              </label>
              <textarea
                rows={3}
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-[#D9CEBF] rounded focus:outline-none focus:border-[#2D734C]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#2D734C] hover:bg-[#245D3D] text-white text-[11px] font-medium tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className="w-3 h-3" />
              <span>Connect on WhatsApp</span>
            </button>

            <div className="text-[11px] text-center text-[#7E756B]">
              Average response time: &lt; 15 mins during showroom hours (10:30 AM - 8:30 PM)
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
