import React, { useState } from 'react';
import { Category, Occasion, Product, AppointmentBooking, ProductEnquiry } from './types';
import { PRODUCTS } from './data/products';
import { INITIAL_APPOINTMENTS, INITIAL_ENQUIRIES } from './data/adminData';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { BridalSetBuilder } from './components/BridalSetBuilder';
import { OccasionTabs } from './components/OccasionTabs';
import { ProductCard } from './components/ProductCard';
import { ShowroomBanner } from './components/ShowroomBanner';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

import { ProductDetailModal } from './components/ProductDetailModal';
import { AppointmentModal } from './components/AppointmentModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CollectionView } from './components/CollectionView';
import { GoogleAdsLandingView } from './components/GoogleAdsLandingView';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutContactView } from './components/AboutContactView';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategoryForCollection, setSelectedCategoryForCollection] = useState<Category | 'All'>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | 'All'>('All');
  
  // Modals & Drawers
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentNote, setAppointmentNote] = useState<string | undefined>();
  const [whatsAppModalData, setWhatsAppModalData] = useState<{
    open: boolean;
    name: string;
    sku: string;
    price: number;
  }>({
    open: false,
    name: '',
    sku: '',
    price: 0,
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // App State: Wishlist, Appointments, Enquiries
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[0], PRODUCTS[2]]);
  const [appointments, setAppointments] = useState<AppointmentBooking[]>(INITIAL_APPOINTMENTS);
  const [enquiries, setEnquiries] = useState<ProductEnquiry[]>(INITIAL_ENQUIRIES);

  // Wishlist handler
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  // Appointment trigger
  const handleOpenAppointment = (note?: string) => {
    setAppointmentNote(note);
    setIsAppointmentOpen(true);
  };

  const handleBookSuccess = (newBooking: AppointmentBooking) => {
    setAppointments((prev) => [newBooking, ...prev]);
  };

  // WhatsApp trigger
  const handleOpenWhatsApp = (name: string, sku: string, price: number) => {
    setWhatsAppModalData({
      open: true,
      name,
      sku,
      price,
    });
  };

  const handleNewEnquiry = (enquiry: ProductEnquiry) => {
    setEnquiries((prev) => [enquiry, ...prev]);
  };

  // Navigation router
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryFromGrid = (cat: Category) => {
    setSelectedCategoryForCollection(cat);
    setCurrentView('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered products for home view based on occasion
  const homeOccasionProducts = PRODUCTS.filter((p) => {
    if (selectedOccasion === 'All') return true;
    return p.occasion.includes(selectedOccasion);
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1715] font-sans">
      
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: HOMEPAGE */}
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onExploreBridal={() => handleNavigate('bridal')}
              onBookAppointment={() => handleOpenAppointment('Bridal Collection Exploration')}
            />

            {/* Shop by Category Grid (matching reference image) */}
            <CategoryGrid
              onSelectCategory={handleSelectCategoryFromGrid}
              onViewAll={() => {
                setSelectedCategoryForCollection('All');
                handleNavigate('collections');
              }}
            />

            {/* Interactive "Find Your Bridal Set" Recommender */}
            <div id="bridal-builder">
              <BridalSetBuilder
                onOpenProduct={(prod) => setDetailProduct(prod)}
                onBookAppointment={(note) => handleOpenAppointment(note)}
                onWhatsAppEnquiry={handleOpenWhatsApp}
              />
            </div>

            {/* "Shop By Occasion" & Featured Masterpieces */}
            <section className="py-14 sm:py-20 bg-[#FAF8F5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <OccasionTabs
                  selectedOccasion={selectedOccasion}
                  onSelectOccasion={setSelectedOccasion}
                />

                <div className="flex items-center justify-between mt-8 mb-6 pb-2 border-b border-[#EAE3D9]">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1A1715] font-light">
                      New Arrivals & Masterpieces
                    </h3>
                    <p className="text-xs text-[#7E756B]">
                      Handcrafted in pure 22K gold & certified diamonds.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategoryForCollection('All');
                      handleNavigate('collections');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1A1715] hover:text-[#B88E4B] transition-colors cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {homeOccasionProducts.slice(0, 8).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.some((w) => w.id === product.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onOpenDetail={(prod) => setDetailProduct(prod)}
                      onQuickWhatsApp={(prod) =>
                        handleOpenWhatsApp(prod.name, prod.sku, prod.price)
                      }
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Editorial Split Showroom Banners (matching reference image) */}
            <ShowroomBanner
              onBookConsultation={() => handleOpenAppointment('Bridal Styling Salon Consultation')}
              onVisitShowroom={() => handleNavigate('about')}
            />

            {/* Customer Reviews & Bride Testimonials */}
            <Testimonials />
          </>
        )}

        {/* VIEW 2: COLLECTIONS PAGE */}
        {currentView === 'collections' && (
          <CollectionView
            isBridalOnly={false}
            products={PRODUCTS}
            initialCategory={selectedCategoryForCollection}
            wishlistIds={wishlist.map((w) => w.id)}
            onToggleWishlist={handleToggleWishlist}
            onOpenDetail={(prod) => setDetailProduct(prod)}
            onQuickWhatsApp={(prod) =>
              handleOpenWhatsApp(prod.name, prod.sku, prod.price)
            }
            onBookAppointment={(note) => handleOpenAppointment(note)}
          />
        )}

        {/* VIEW 3: BRIDAL ATELIER PAGE */}
        {currentView === 'bridal' && (
          <CollectionView
            isBridalOnly={true}
            products={PRODUCTS}
            initialCategory="Bridal Sets"
            wishlistIds={wishlist.map((w) => w.id)}
            onToggleWishlist={handleToggleWishlist}
            onOpenDetail={(prod) => setDetailProduct(prod)}
            onQuickWhatsApp={(prod) =>
              handleOpenWhatsApp(prod.name, prod.sku, prod.price)
            }
            onBookAppointment={(note) => handleOpenAppointment(note)}
          />
        )}

        {/* VIEW 4: FIND YOUR BRIDAL SET (STANDALONE) */}
        {currentView === 'bridal-builder' && (
          <div className="py-8 bg-[#FAF8F5]">
            <BridalSetBuilder
              onOpenProduct={(prod) => setDetailProduct(prod)}
              onBookAppointment={(note) => handleOpenAppointment(note)}
              onWhatsAppEnquiry={handleOpenWhatsApp}
            />
          </div>
        )}

        {/* VIEW 5: PONDICHERRY SHOWROOM & STORY */}
        {currentView === 'about' && (
          <AboutContactView
            onBookAppointment={() => handleOpenAppointment('Pondicherry Atelier Visit')}
            onNewEnquiry={handleNewEnquiry}
          />
        )}

        {/* VIEW 6: GOOGLE ADS LANDING ENGINE */}
        {currentView === 'google-ads' && (
          <GoogleAdsLandingView
            onOpenProduct={(prod) => setDetailProduct(prod)}
            onBookAppointment={(note) => handleOpenAppointment(note)}
            onWhatsAppEnquiry={handleOpenWhatsApp}
          />
        )}

        {/* VIEW 7: STORE OWNER CRM & LEADS HUB */}
        {currentView === 'admin' && (
          <AdminDashboard
            onBackToStorefront={() => handleNavigate('home')}
            appointments={appointments}
            enquiries={enquiries}
            onUpdateEnquiryStatus={(id, status) => {
              setEnquiries((prev) =>
                prev.map((e) => (e.id === id ? { ...e, status } : e))
              );
            }}
            onUpdateAppointmentStatus={(id, status) => {
              setAppointments((prev) =>
                prev.map((a) => (a.id === id ? { ...a, status } : a))
              );
            }}
          />
        )}

      </main>

      {/* Editorial Luxury Footer */}
      {currentView !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          onSelectCategory={(cat) => {
            setSelectedCategoryForCollection(cat);
            handleNavigate('collections');
          }}
          onOpenAppointment={() => handleOpenAppointment()}
        />
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        isWishlisted={detailProduct ? wishlist.some((w) => w.id === detailProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onBookAppointment={(productName) => {
          setDetailProduct(null);
          handleOpenAppointment(`Trying on piece: ${productName}`);
        }}
        onWhatsAppEnquiry={(name, sku, price) => {
          setDetailProduct(null);
          handleOpenWhatsApp(name, sku, price);
        }}
      />

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        preselectedProduct={appointmentNote}
        onBookSuccess={handleBookSuccess}
      />

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={whatsAppModalData.open}
        onClose={() =>
          setWhatsAppModalData((prev) => ({ ...prev, open: false }))
        }
        productName={whatsAppModalData.name}
        sku={whatsAppModalData.sku}
        price={whatsAppModalData.price}
        onNewEnquiry={handleNewEnquiry}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={handleRemoveFromWishlist}
        onOpenProduct={(prod) => setDetailProduct(prod)}
        onBookAppointment={(note) => handleOpenAppointment(note)}
        onWhatsAppEnquiry={handleOpenWhatsApp}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenProduct={(prod) => setDetailProduct(prod)}
      />

      {/* Floating Bottom Quick Action for Mobile (Reduced Size & Muted Intensity) */}
      {currentView !== 'admin' && (
        <div className="sm:hidden fixed bottom-3 left-3 right-3 z-30 flex gap-2">
          <button
            onClick={() => handleOpenAppointment()}
            className="flex-1 py-2.5 px-3 bg-[#26221F] hover:bg-[#8C6D3B] text-[#FAF8F5] text-[11px] font-medium uppercase tracking-wider rounded shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Book Showroom Visit</span>
          </button>
          <button
            onClick={() => handleOpenWhatsApp('Pondicherry Bridal Consultation', 'GENERAL', 0)}
            className="py-2.5 px-3 bg-[#2D734C] hover:bg-[#245D3D] text-white rounded shadow-md flex items-center justify-center cursor-pointer"
            aria-label="Direct WhatsApp Concierge"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
