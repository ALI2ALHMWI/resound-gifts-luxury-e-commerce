import React from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../../context/AppContext';
import { TrendingUp, ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  name: { en: string; ar: string };
  price: string;
  image: string;
  category: string;
  trendScore: string;
}

const TRENDING_PRODUCTS: Product[] = [
  { id: 1, name: { en: 'Oud Supreme Extraordinaire', ar: 'عود سبريم الاستثنائي' }, price: '$120', image: 'https://images.unsplash.com/photo-1541643600914-78b777693a8c?auto=format&fit=crop&q=80&w=800', category: 'Perfumes', trendScore: '98%' },
  { id: 2, name: { en: 'Velvet Rose Bouquet', ar: 'باقة الورد المخملي' }, price: '$85', image: 'https://images.unsplash.com/photo-1526045431048-555f16779662?auto=format&fit=crop&q=80&w=800', category: 'Flowers', trendScore: '95%' },
  { id: 3, name: { en: 'Midnight Musk Collection', ar: 'مجموعة مسك منتصف الليل' }, price: '$150', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f79d?auto=format&fit=crop&q=80&w=800', category: 'Perfumes', trendScore: '92%' },
  { id: 4, name: { en: 'Imperial Gold Gift Box', ar: 'صندوق الهدايا الذهبي الإمبراطوري' }, price: '$210', image: 'https://images.unsplash.com/photo-1549465220-1a8f7737686c?auto=format&fit=crop&q=80&w=800', category: 'Gift Sets', trendScore: '89%' },
  { id: 5, name: { en: 'White Peony Signature', ar: 'توقيع الفاوانيا البيضاء' }, price: '$95', image: 'https://images.unsplash.com/photo-1582794543117-96755d27796f?auto=format&fit=crop&q=80&w=800', category: 'Flowers', trendScore: '87%' },
  { id: 6, name: { en: 'Saffron Luxury Essence', ar: 'جوهر الزعفران الفاخر' }, price: '$180', image: 'https://images.unsplash.com/photo-1594035910387-fea476674337?auto=format&fit=crop&q=80&w=800', category: 'Perfumes', trendScore: '85%' },
];

export default function Trending() {
  const { language, t, setCurrentView } = useAppContext();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-xs font-bold mb-2"
          >
            <TrendingUp size={16} />
            {isAr ? 'الأكثر رواجاً الآن' : 'Trending Now'}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif font-medium text-foreground"
          >
            {isAr ? 'القطع الأكثر طلباً' : 'Most Wanted Pieces'}
          </motion.h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {TRENDING_PRODUCTS.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name[language]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm">
                  {product.trendScore} Trend
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <button 
                    onClick={() => setCurrentView('product')}
                    className="bg-white text-foreground px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    {isAr ? 'عرض التفاصيل' : 'Quick View'}
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 text-center">
                <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-2">
                  {product.category}
                </span>
                <h3 className="text-xl font-serif font-medium text-foreground mb-2">
                  {product.name[language]}
                </h3>
                <p className="text-lg font-serif font-bold text-foreground/80">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
