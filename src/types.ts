export type Category = 
  | 'Bridal Sets'
  | 'Necklaces'
  | 'Earrings'
  | 'Bangles'
  | 'Rings'
  | 'Diamond Collection';

export type Occasion = 
  | 'Bridal'
  | 'Engagement'
  | 'Reception'
  | 'Festive'
  | 'Everyday Luxury';

export type MetalType = 
  | '22K Yellow Gold'
  | '18K Yellow Gold'
  | '18K Rose Gold'
  | '18K White Gold'
  | 'Platinum 950';

export interface Product {
  id: string;
  sku: string;
  name: string;
  collection: string;
  category: Category;
  occasion: Occasion[];
  price: number;
  formattedPrice: string;
  image: string;
  additionalImages?: string[];
  description: string;
  metal: MetalType;
  purity: string;
  grossWeight: string;
  netWeight: string;
  gemstoneDetails: string;
  hallmark: string;
  certification: string;
  dimensions?: string;
  inStock: boolean;
  isNewArrival?: boolean;
  isFeaturedBridal?: boolean;
  careInfo: string;
  variants?: {
    goldPurity?: string[];
    sizes?: string[];
  };
}

export interface AppointmentBooking {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  weddingDate?: string;
  preferredDate: string;
  timeSlot: string;
  appointmentType: 'In-Showroom VIP Suite (Pondicherry)' | 'Virtual Video Consultation';
  serviceType: 'Bridal Trousseau Styling' | 'Bespoke Custom Commission' | 'Diamond & Solitaire Consultation' | 'General Preview';
  interestedProducts?: string[];
  guestCount: number;
  notes?: string;
  status: 'Confirmed' | 'Pending Review' | 'Completed';
  createdAt: string;
}

export interface ProductEnquiry {
  id: string;
  productName: string;
  productSku: string;
  productPrice: number;
  clientName: string;
  clientPhone: string;
  clientCity: string;
  message: string;
  channel: 'WhatsApp' | 'Website Form' | 'Direct Call';
  status: 'New' | 'Contacted' | 'Appointment Booked' | 'Closed Sale';
  createdAt: string;
}

export interface GoogleAdsLead {
  id: string;
  keyword: string;
  adGroup: string;
  impressions: number;
  clicks: number;
  ctr: string;
  conversions: number;
  costPerLead: string;
  totalSpend: string;
  leadValueEstimate: string;
}

export interface BridalStyleOption {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  recommendedPieces: string[];
}
