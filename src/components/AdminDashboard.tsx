import React, { useState } from 'react';
import {
  INITIAL_APPOINTMENTS,
  INITIAL_ENQUIRIES,
  GOOGLE_ADS_LEADS_DATA,
  STORE_ORDERS,
  STORE_OFFERS,
  REVIEWS,
} from '../data/adminData';
import { PRODUCTS } from '../data/products';
import { AppointmentBooking, GoogleAdsLead, Product, ProductEnquiry } from '../types';
import {
  Calendar,
  MessageCircle,
  TrendingUp,
  Package,
  Layers,
  ShoppingBag,
  Tag,
  Star,
  CheckCircle,
  Clock,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToStorefront: () => void;
  appointments: AppointmentBooking[];
  enquiries: ProductEnquiry[];
  onUpdateEnquiryStatus: (id: string, newStatus: ProductEnquiry['status']) => void;
  onUpdateAppointmentStatus: (id: string, newStatus: AppointmentBooking['status']) => void;
}

type AdminTab =
  | 'overview'
  | 'appointments'
  | 'enquiries'
  | 'google-leads'
  | 'products'
  | 'collections'
  | 'orders'
  | 'offers'
  | 'reviews';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToStorefront,
  appointments,
  enquiries,
  onUpdateEnquiryStatus,
  onUpdateAppointmentStatus,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchFilter, setSearchFilter] = useState('');

  const totalPipelineEstimate = '₹1.48 Crore';
  const monthlyLeadsCount = enquiries.length + 38;
  const bookedAppointmentsCount = appointments.length;

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1A1715]">
      {/* Top Admin Nav */}
      <header className="bg-[#1A1715] text-[#FAF8F5] border-b border-[#332D28] px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="font-serif text-lg tracking-[0.16em] uppercase font-bold text-white">
              AURÉLIA ATELIER
            </div>
            <span className="text-xs bg-[#B88E4B] text-white px-2 py-0.5 rounded font-mono font-medium">
              Store Owner CRM & Leads Hub
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#A89E92] hidden md:inline">
              Pondicherry White Town Boutique
            </span>
            <button
              onClick={onBackToStorefront}
              className="text-[11px] px-2.5 py-1 bg-[#FAF8F5]/90 text-[#26221F] font-medium rounded hover:bg-white transition-colors cursor-pointer"
            >
              ← Back to Client Showroom
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-lg p-1 border border-[#E2D8CC] shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar },
            { id: 'enquiries', label: `Enquiries & WhatsApp (${enquiries.length})`, icon: MessageCircle },
            { id: 'google-leads', label: 'Google Ads Leads', icon: ArrowUpRight },
            { id: 'products', label: `Products (${PRODUCTS.length})`, icon: Package },
            { id: 'collections', label: 'Collections (4)', icon: Layers },
            { id: 'orders', label: `Orders (${STORE_ORDERS.length})`, icon: ShoppingBag },
            { id: 'offers', label: `Offers (${STORE_OFFERS.length})`, icon: Tag },
            { id: 'reviews', label: `Reviews (${REVIEWS.length})`, icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#26221F] text-[#FAF8F5]'
                    : 'text-[#5A524A] hover:bg-[#F5F0EB] hover:text-[#1A1715]'
                }`}
              >
                <Icon className="w-3 h-3 text-[#967743]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-lg border border-[#E2D8CC] shadow-xs">
                <div className="text-xs text-[#7E756B] uppercase font-semibold">Active Bridal Pipeline</div>
                <div className="text-2xl font-bold font-serif text-[#1A1715] mt-1 tabular-nums">
                  {totalPipelineEstimate}
                </div>
                <div className="text-xs text-[#10B981] mt-1 flex items-center gap-1">
                  <span>↑ 24% vs last wedding season</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-[#E2D8CC] shadow-xs">
                <div className="text-xs text-[#7E756B] uppercase font-semibold">Showroom Appointments</div>
                <div className="text-2xl font-bold font-serif text-[#1A1715] mt-1 tabular-nums">
                  {bookedAppointmentsCount} Confirmed
                </div>
                <div className="text-xs text-[#7E756B] mt-1">
                  VIP suites booked for this week
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-[#E2D8CC] shadow-xs">
                <div className="text-xs text-[#7E756B] uppercase font-semibold">WhatsApp & Web Leads</div>
                <div className="text-2xl font-bold font-serif text-[#1A1715] mt-1 tabular-nums">
                  {monthlyLeadsCount} Leads
                </div>
                <div className="text-xs text-[#10B981] mt-1">
                  Average response time: 8.4 mins
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-[#E2D8CC] shadow-xs">
                <div className="text-xs text-[#7E756B] uppercase font-semibold">Google Ads Cost Per Lead</div>
                <div className="text-2xl font-bold font-serif text-[#1A1715] mt-1 tabular-nums">
                  ₹412 / Lead
                </div>
                <div className="text-xs text-[#7E756B] mt-1">
                  For ₹3L+ high-intent bridal shoppers
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Upcoming VIP Appointments */}
              <div className="lg:col-span-7 bg-white p-5 rounded-lg border border-[#E2D8CC] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
                  <h3 className="font-serif text-lg font-semibold text-[#1A1715]">
                    Upcoming VIP Bridal Appointments
                  </h3>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs text-[#B88E4B] hover:underline font-semibold"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {appointments.slice(0, 3).map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3 bg-[#FAF8F5] rounded border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[#1A1715]">{apt.clientName}</span>
                          <span className="text-[10px] bg-[#E8DFD3] text-[#4A443E] px-1.5 py-0.5 rounded font-mono">
                            {apt.id}
                          </span>
                        </div>
                        <div className="text-xs text-[#7E756B] mt-0.5">
                          {apt.preferredDate} · {apt.timeSlot}
                        </div>
                        <div className="text-[11px] text-[#B88E4B] mt-0.5">
                          {apt.serviceType} (Guests: {apt.guestCount})
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                          {apt.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Enquiries Feed */}
              <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-[#E2D8CC] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
                  <h3 className="font-serif text-lg font-semibold text-[#1A1715]">
                    Latest Inbound Leads
                  </h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs text-[#B88E4B] hover:underline font-semibold"
                  >
                    Manage Pipeline →
                  </button>
                </div>

                <div className="space-y-3">
                  {enquiries.slice(0, 3).map((enq) => (
                    <div key={enq.id} className="p-3 bg-[#FAF8F5] rounded border border-[#EAE3D9] space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#1A1715]">{enq.clientName}</span>
                        <span className="text-[10px] text-[#7E756B]">{enq.createdAt}</span>
                      </div>
                      <div className="text-xs text-[#8C6A1C] font-medium line-clamp-1">
                        {enq.productName}
                      </div>
                      <div className="text-[11px] text-[#5A524A] line-clamp-1 italic">
                        "{enq.message}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg border border-[#E2D8CC] p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE3D9]">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#1A1715]">
                  VIP Bridal Salon Bookings
                </h3>
                <p className="text-xs text-[#7E756B]">
                  Schedule of scheduled bride visits to the Rue Romain Rolland White Town atelier.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EAE3D9] text-[#7E756B] uppercase font-semibold">
                    <th className="py-2.5 px-3">Booking ID</th>
                    <th className="py-2.5 px-3">Client Name</th>
                    <th className="py-2.5 px-3">Phone & Wedding Date</th>
                    <th className="py-2.5 px-3">Date & Time Slot</th>
                    <th className="py-2.5 px-3">Service Focus</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-3 font-mono text-[#7E756B] font-semibold">{apt.id}</td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-[#1A1715] block">{apt.clientName}</span>
                        <span className="text-[11px] text-[#7E756B]">{apt.appointmentType}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[#1A1715] block font-mono">{apt.phone}</span>
                        <span className="text-[11px] text-[#B88E4B]">
                          Wedding: {apt.weddingDate || 'TBD'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-[#1A1715] block">{apt.preferredDate}</span>
                        <span className="text-[11px] text-[#7E756B]">{apt.timeSlot}</span>
                      </td>
                      <td className="py-3 px-3 text-[#4A443E]">
                        <span>{apt.serviceType}</span>
                        {apt.notes && (
                          <span className="block text-[11px] text-[#7E756B] truncate max-w-xs mt-0.5">
                            Note: {apt.notes}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            apt.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : apt.status === 'Pending Review'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <select
                          value={apt.status}
                          onChange={(e) =>
                            onUpdateAppointmentStatus(apt.id, e.target.value as any)
                          }
                          className="text-[11px] border border-[#D9CEBF] rounded px-2 py-1 bg-white"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending Review">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ENQUIRIES & WHATSAPP TAB */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-lg border border-[#E2D8CC] p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE3D9]">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#1A1715]">
                  Live Enquiries & WhatsApp Pipeline
                </h3>
                <p className="text-xs text-[#7E756B]">
                  Direct inquiries generated from product detail pages, WhatsApp buttons, and bridal set builder.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 bg-[#FAF8F5] rounded-lg border border-[#EAE3D9] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#1A1715]">{enq.clientName}</span>
                      <span className="font-mono text-xs text-[#7E756B]">({enq.clientPhone})</span>
                      <span className="text-[10px] bg-[#E8DFD3] text-[#4A443E] px-1.5 py-0.5 rounded">
                        {enq.clientCity}
                      </span>
                    </div>

                    <div className="text-xs text-[#8C6A1C] font-semibold">
                      Product: {enq.productName} (SKU: {enq.productSku}) · ₹{enq.productPrice.toLocaleString('en-IN')}
                    </div>

                    <p className="text-xs text-[#5A524A] bg-white p-2 rounded border border-[#EAE3D9]">
                      "{enq.message}"
                    </p>

                    <div className="text-[10px] text-[#7E756B]">
                      Via {enq.channel} · Logged {enq.createdAt}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
                    <div className="text-xs font-semibold text-[#7E756B]">Status:</div>
                    <select
                      value={enq.status}
                      onChange={(e) =>
                        onUpdateEnquiryStatus(enq.id, e.target.value as any)
                      }
                      className="text-xs border border-[#D9CEBF] rounded px-2.5 py-1.5 bg-white font-medium"
                    >
                      <option value="New">🟢 New Lead</option>
                      <option value="Contacted">🟡 Contacted on WhatsApp</option>
                      <option value="Appointment Booked">📅 Appointment Booked</option>
                      <option value="Closed Sale">💎 Closed Sale</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. GOOGLE ADS LEADS TAB */}
        {activeTab === 'google-leads' && (
          <div className="bg-white rounded-lg border border-[#E2D8CC] p-5 shadow-xs space-y-4">
            <div className="pb-3 border-b border-[#EAE3D9]">
              <h3 className="font-serif text-xl font-semibold text-[#1A1715]">
                Pondicherry Google Ads Lead Attribution
              </h3>
              <p className="text-xs text-[#7E756B]">
                Live performance metrics showing return-on-ad-spend for high-intent wedding jewellery search campaigns.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EAE3D9] text-[#7E756B] uppercase font-semibold">
                    <th className="py-2.5 px-3">Keyword Query</th>
                    <th className="py-2.5 px-3">Campaign Group</th>
                    <th className="py-2.5 px-3 text-right">Clicks (CTR)</th>
                    <th className="py-2.5 px-3 text-right">Verified Leads</th>
                    <th className="py-2.5 px-3 text-right">Cost / Lead</th>
                    <th className="py-2.5 px-3 text-right">Total Ad Spend</th>
                    <th className="py-2.5 px-3 text-right">Est. Pipeline Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {GOOGLE_ADS_LEADS_DATA.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-3 font-semibold text-[#1A1715]">"{lead.keyword}"</td>
                      <td className="py-3 px-3 text-[#7E756B]">{lead.adGroup}</td>
                      <td className="py-3 px-3 text-right tabular-nums">
                        {lead.clicks.toLocaleString()} ({lead.ctr})
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-700 tabular-nums">
                        {lead.conversions} leads
                      </td>
                      <td className="py-3 px-3 text-right text-[#1A1715] font-semibold tabular-nums">
                        {lead.costPerLead}
                      </td>
                      <td className="py-3 px-3 text-right text-[#7E756B] tabular-nums">
                        {lead.totalSpend}
                      </td>
                      <td className="py-3 px-3 text-right font-serif font-bold text-[#B88E4B] tabular-nums">
                        {lead.leadValueEstimate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. PRODUCTS & CATALOG TAB */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg border border-[#E2D8CC] p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE3D9]">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#1A1715]">
                  Active Showroom Masterpieces ({PRODUCTS.length})
                </h3>
                <p className="text-xs text-[#7E756B]">
                  Manage gold weights, hallmarking references, and indicative retail valuations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE3D9] flex gap-3"
                >
                  <img src={prod.image} alt={prod.name} className="w-20 h-20 object-cover rounded bg-[#EFE7DE]" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] text-[#7E756B] font-mono">{prod.sku}</div>
                      <h4 className="font-serif text-sm font-semibold text-[#1A1715] line-clamp-1">
                        {prod.name}
                      </h4>
                      <div className="text-[11px] text-[#5A524A]">{prod.grossWeight} · {prod.metal}</div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-semibold text-xs text-[#1A1715] tabular-nums">
                        {prod.formattedPrice}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                        In Showroom
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. COLLECTIONS TAB */}
        {activeTab === 'collections' && (
          <div className="bg-white rounded-lg border border-[#E2D8CC] p-5 shadow-xs space-y-4">
            <div className="pb-3 border-b border-[#EAE3D9]">
              <h3 className="font-serif text-xl font-semibold text-[#1A1715]">
                Curated Jewellery Collections
              </h3>
              <p className="text-xs text-[#7E756B]">
                High-level categories featured on the digital showroom.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Royal Heritage Bridal', pieces: '18 Pieces', hero: 'Syndicate Polki & Natural Zambian Emeralds', status: 'Primary Wedding Season' },
                { title: 'Heritage Temple Gold', pieces: '14 Pieces', hero: '22K Nakshi Repoussé & Solid Dravidian Gold', status: 'Year-Round Muhurtham' },
                { title: 'Solitaire & Diamond Atelier', pieces: '16 Pieces', hero: 'GIA & IGI Certified Triple Excellent Cuts', status: 'High Margin Engagement' },
                { title: 'French Quarter Grace', pieces: '12 Pieces', hero: 'Colonial Bougainvillea & Basra Pearl Elegance', status: 'Destination Weddings' },
              ].map((col, i) => (
                <div key={i} className="p-4 bg-[#FAF8F5] rounded-lg border border-[#EAE3D9] space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-semibold text-[#1A1715]">{col.title}</h4>
                    <span className="text-xs font-semibold text-[#B88E4B]">{col.pieces}</span>
                  </div>
                  <p className="text-xs text-[#5A524A]">{col.hero}</p>
                  <div className="text-[11px] text-[#10B981] font-medium pt-1">
                    ● Active Status: {col.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg border border-[#E2D8CC] p-5 shadow-xs space-y-4">
            <div className="pb-3 border-b border-[#EAE3D9]">
              <h3 className="font-serif text-xl font-semibold text-[#1A1715]">
                Custom Bridal Commissions & Orders
              </h3>
              <p className="text-xs text-[#7E756B]">
                Active bridal trousseau orders under craftsmanship or awaiting showroom handover.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EAE3D9] text-[#7E756B] uppercase font-semibold">
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Bride & Family</th>
                    <th className="py-2.5 px-3">Jewellery Items</th>
                    <th className="py-2.5 px-3 text-right">Order Value</th>
                    <th className="py-2.5 px-3 text-right">Advance Received</th>
                    <th className="py-2.5 px-3">Handover Date</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {STORE_ORDERS.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-3 font-mono font-bold text-[#1A1715]">{ord.id}</td>
                      <td className="py-3 px-3 font-semibold text-[#1A1715]">{ord.customer}</td>
                      <td className="py-3 px-3 text-[#4A443E] max-w-xs">{ord.items}</td>
                      <td className="py-3 px-3 text-right font-bold text-[#1A1715] tabular-nums">{ord.amount}</td>
                      <td className="py-3 px-3 text-right text-emerald-700 font-semibold tabular-nums">{ord.advancePaid}</td>
                      <td className="py-3 px-3 text-[#7E756B]">{ord.deliveryDate}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 8. OFFERS TAB */}
        {activeTab === 'offers' && (
          <div className="bg-white rounded-lg border border-[#E2D8CC] p-5 shadow-xs space-y-4">
            <div className="pb-3 border-b border-[#EAE3D9]">
              <h3 className="font-serif text-xl font-semibold text-[#1A1715]">
                Seasonal Bridal Privileges & Offers
              </h3>
              <p className="text-xs text-[#7E756B]">
                Active campaigns advertised to encourage bridal bookings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {STORE_OFFERS.map((off) => (
                <div key={off.id} className="p-4 bg-[#FAF8F5] rounded-lg border border-[#EAE3D9] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#B88E4B] font-mono uppercase font-semibold">{off.validity}</span>
                    <h4 className="font-serif text-base font-bold text-[#1A1715] mt-1">{off.title}</h4>
                    <p className="text-xs text-[#8C6A1C] font-semibold mt-1">{off.subtitle}</p>
                    <p className="text-[11px] text-[#7E756B] mt-2 leading-relaxed">{off.terms}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#EAE3D9] flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-semibold">● Active on Showroom</span>
                    <button className="text-[11px] text-[#B88E4B] hover:underline">Edit Offer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-lg border border-[#E2D8CC] p-5 shadow-xs space-y-4">
            <div className="pb-3 border-b border-[#EAE3D9]">
              <h3 className="font-serif text-xl font-semibold text-[#1A1715]">
                Customer Testimonials & Moderation
              </h3>
              <p className="text-xs text-[#7E756B]">
                Verified bride stories published on the digital showroom.
              </p>
            </div>

            <div className="space-y-3">
              {REVIEWS.map((rev) => (
                <div key={rev.id} className="p-4 bg-[#FAF8F5] rounded-lg border border-[#EAE3D9] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#1A1715]">{rev.brideName}</span>
                      <span className="text-xs text-[#7E756B]">({rev.city})</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                        Verified Bride
                      </span>
                    </div>
                    <div className="flex text-[#B88E4B]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="font-serif text-sm font-semibold text-[#1A1715]">"{rev.title}"</div>
                  <p className="text-xs text-[#5A524A] italic">"{rev.review}"</p>
                  <div className="text-[11px] text-[#7E756B]">Suite: {rev.jewelleryWorn}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
