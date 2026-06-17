import React from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../../context/AppContext';
import { Zap, ShoppingBag, Flame } from 'lucide-react';

interface OfferProduct {
  id: number;
  name: { en: string; ar: string };
  originalPrice: string;
  discountPrice: string;
  discountPercent: string;
  image: string;
  timeLeft: string;
}

const HOT_OFFERS: OfferProduct[] = [
  { id: 1, name: { en: 'Imperial Gold Box', ar: 'الصندوق الذهبي الإمبراطوري' }, originalPrice: '$250', discountPrice: '$180', discountPercent: '28%', image: 'https://images.unsplash.com/photo-1549465220-1a8f7737686c?auto=format&fit=crop&q=80&w=800', timeLeft: '05:24:12' },
  { id: 2, name: { en: 'Velvet Rose Deluxe', ar: 'مجموعة الورد المخملي الفاخرة' }, originalPrice: '$120', discountPrice: '$89', discountPercent: '25%', image: 'https://images.unsplash.com/photo-1526047932273-347677855660?auto=format&fit=crop&q=80&w=800', timeLeft: '12:10:05' },
  { id: 3, name: { en: 'Midnight Musk Trio', ar: 'ثلاثية مسك منتصف الليل' }, originalPrice: '$190', discountPrice: '$140', discountPercent: '26%', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f79d?auto=format&fit=crop&q=80&w=800', timeLeft: '02:45:30' },
  { id: 4, name: { en: 'Saffron Essence Set', ar: 'مجموعة جوهر الزعفران' }, originalPrice: '$210', discountPrice: '$165', discountPercent: '21%', image: 'https://images.unsplash.com/photo-1541643600914-78b777693a8c?auto=format&fit=crop&q=80&w=800', timeLeft: '08:15:44' },
];

export default function HotOffer() {
  const { language, setCurrentView } = useAppContext();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-xs font-bold mb-2 bg-primary/10 px-4 py-1 rounded-full"
          >
            <Flame size={16} className="animate-bounce" />
            {isAr ? 'عروض محدودة الوقت' : 'Limited Time Offers'}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif font-medium text-foreground"
          >
            {isAr ? 'عروض ساخنة لا تفوتها' : 'Sizzling Hot Offers'}
          </motion.h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-red-500 mx-auto rounded-full" />
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOT_OFFERS.map((offer, idx) => (
            <motion.div 
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/50"
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-20 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-lg">
                -{offer.discountPercent}
              </div>

              {/* Timer Badge */}
              <div className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-mono flex items-center gap-1">
                <Zap size={12} className="text-yellow-400" />
                {offer.timeLeft}
              </div>

              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.name[language]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Details */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-serif font-medium text-foreground mb-3 line-clamp-1">
                  {offer.name[language]}
                </h3>
                
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-sm text-foreground/40 line-through font-sans">{offer.originalPrice}</span>
                  <span className="text-2xl font-serif font-bold text-primary">{offer.discountPrice}</span>
                </div>

                <button 
                  onClick={() => setCurrentView('product')}
                  className="w-full bg-foreground text-white py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-primary transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  {isAr ? 'اقتنص العرض' : 'Grab Offer'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
