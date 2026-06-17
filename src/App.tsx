import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Categories from './components/sections/Categories';
import BestSellers from './components/sections/BestSellers';
import HowItWorks from './components/sections/HowItWorks';
import Pricing from './components/sections/Pricing';
import Occasions from './components/sections/Occasions';
import Testimonials from './components/sections/Testimonials';
import Trending from './components/sections/Trending';
import HotOffer from './components/sections/HotOffer';
import Catalog from './components/sections/Catalog';
import GiftReminders from './components/sections/GiftReminders';
import ProductDetailsDemo from './components/sections/ProductDetailsDemo';
import GiftBuilder from './components/sections/GiftBuilder';
import CheckoutDemo from './components/sections/CheckoutDemo';
import Footer from './components/layout/Footer';
import { motion } from 'motion/react';
import { Gift, MessageCircle } from 'lucide-react';
import TrackOrderModal from './components/ui/TrackOrderModal';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { 
    currentView, 
    setCurrentView, 
    t, 
    language,
    isTrackingOpen,
    setIsTrackingOpen,
    trackingOrderId
  } = useAppContext();

  React.useEffect(() => {
    const titles = {
      home: 'Resound Gifts | Luxury Flowers, Perfumes & Personalized Gifts',
      catalog: 'Our Collection | Resound Gifts',
      product: 'Oud Supreme Extraordinaire | Resound Gifts',
      builder: 'Build Your Gift | Resound Gifts',
      checkout: 'Checkout | Resound Gifts',
      reminders: 'Gift Reminders | Resound Gifts',
    };

    document.title = titles[currentView] ?? 'Resound Gifts';
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero />
            <Categories />
            <BestSellers />
            <HowItWorks />
            <Pricing />
            <Occasions />
            <GiftReminders />
            <Testimonials />
          </>
        )}
        {currentView === 'catalog' && <Catalog />}
        {currentView === 'trending' && <Trending />}
        {currentView === 'hot_offer' && <HotOffer />}
        {currentView === 'product' && <ProductDetailsDemo />}
        {currentView === 'builder' && <GiftBuilder />}
        {currentView === 'checkout' && <CheckoutDemo />}
      </main>
      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/966500000000" // Replace with actual phone number
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-8 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-4 shadow-2xl transition-all duration-300 group rounded-full ${
          language === 'ar' ? 'left-8' : 'right-8'
        }`}
        style={{ boxShadow: '0 10px 30px -10px rgba(37, 211, 102, 0.4)' }}
        title="Chat with us on WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-white/30 animate-ping opacity-75"></span>
          <MessageCircle size={22} className="relative z-10" />
        </div>
        <span className="text-xs font-serif uppercase tracking-[0.1em] font-semibold">
          {language === 'ar' ? 'تواصل معنا' : 'Chat with us'}
        </span>
      </motion.a>

      {/* Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderId={trackingOrderId}
      />
    </div>
  );
}
