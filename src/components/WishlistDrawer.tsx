import React from 'react';
import { Product } from '../types';
import { X, Trash2, MessageCircle, Calendar, Sparkles, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemove: (id: string) => void;
  onOpenProduct: (product: Product) => void;
  onBookAppointment: (note?: string) => void;
  onWhatsAppEnquiry: (productName: string, sku: string, price: number) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onOpenProduct,
  onBookAppointment,
  onWhatsAppEnquiry,
}) => {
  if (!isOpen) return null;

  const totalValue = wishlist.reduce((acc, item) => acc + item.price, 0);

  const handleEnquireAll = () => {
    const names = wishlist.map((w) => w.name).join(', ');
    const skus = wishlist.map((w) => w.sku).join(', ');
    onWhatsAppEnquiry(`Complete Bridal Wishlist (${wishlist.length} pieces: ${names})`, skus, totalValue);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col border-l border-[#E8DFD3]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#EAE3D9] flex items-center justify-between bg-[#F5F0EB]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#B88E4B] font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>Personal Trousseau</span>
            </div>
            <h3 className="font-serif text-xl text-[#1A1715] font-light">
              Your Bridal Wishlist ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#4A443E] hover:text-[#1A1715] rounded hover:bg-[#EAE3D9] transition-colors cursor-pointer"
            aria-label="Close wishlist drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 text-[#7E756B] space-y-3">
              <p className="font-serif text-lg text-[#1A1715]">Your wishlist is currently empty</p>
              <p className="text-xs max-w-xs mx-auto">
                Explore our Royal Bridal Collection and tap the heart icon to curate your dream wedding trousseau.
              </p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 bg-white rounded-lg border border-[#EAE3D9] hover:border-[#B88E4B] transition-colors"
              >
                <div
                  onClick={() => {
                    onOpenProduct(item);
                    onClose();
                  }}
                  className="w-20 h-20 bg-[#F5EFE8] rounded overflow-hidden cursor-pointer shrink-0"
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      onClick={() => {
                        onOpenProduct(item);
                        onClose();
                      }}
                      className="font-serif text-sm font-semibold text-[#1A1715] hover:text-[#B88E4B] cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h4>
                    <div className="text-[11px] text-[#7E756B] mt-0.5">
                      {item.category} · {item.grossWeight}
                    </div>
                    <div className="text-xs font-semibold text-[#1A1715] tabular-nums mt-1">
                      {item.formattedPrice}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-[11px] text-[#A89E92] hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenProduct(item);
                        onClose();
                      }}
                      className="text-xs font-semibold text-[#B88E4B] hover:underline cursor-pointer"
                    >
                      View Piece →
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {wishlist.length > 0 && (
          <div className="p-5 border-t border-[#EAE3D9] bg-[#F5F0EB] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#5A524A]">
              <span>Estimated Ensemble Total:</span>
              <span className="font-serif text-lg font-bold text-[#1A1715] tabular-nums">
                ₹{totalValue.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={handleEnquireAll}
                className="w-full py-2 px-3 bg-[#2D734C] hover:bg-[#245D3D] text-white text-[11px] font-medium tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enquire Wishlist via WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onBookAppointment(`Client wishlist with ${wishlist.length} pieces (Total ₹${totalValue.toLocaleString('en-IN')})`);
                  onClose();
                }}
                className="w-full py-2 px-3 bg-[#26221F] hover:bg-[#8C6D3B] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C8B28B]" />
                <span>Book VIP Try-On for Wishlist</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
