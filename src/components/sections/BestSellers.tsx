import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'motion/react';
import { Heart, ShoppingBag } from 'lucide-react';
import SafeImage from '../ui/SafeImage';
import { ProductCardSkeleton } from '../ui/ProductCardSkeleton';

const products = [
  {
    id: 1,
    name: "Royal Velvet Rose Bouquet",
    price: 150,
    category: "Flowers",
    image: "/src/assets/images/luxury_flowers_1780873684175.png",
    isNew: true
  },
  {
    id: 2,
    name: "Oud Supreme Perfume 100ml",
    price: 320,
    category: "Perfumes",
    image: "/src/assets/images/luxury_perfumes_1780873697555.png",
    isNew: false
  },
  {
    id: 3,
    name: "Golden Elegance Gift Set",
    price: 450,
    category: "Gift Sets",
    image: "/src/assets/images/luxury_gifts_1780873711033.png",
    isNew: false
  },
  {
    id: 4,
    name: "White Peony Signature Box",
    price: 180,
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?q=80&w=800&auto=format&fit=crop",
    isNew: true
  }
];

export default function BestSellers() {
  const { t, wishlist, toggleWishlist, setCurrentView } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 bg-surface px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              {t('bestsellers.title')}
            </h2>
            <div className="w-16 h-[2px] bg-primary"></div>
          </div>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('catalog'); }} className="hidden md:inline-block text-primary tracking-widest text-sm uppercase hover:text-accent transition-colors">
            View All Collection
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))
          ) : (
            products.map((product, idx) => (
            <motion.div 
              key={product.id}
              onClick={() => setCurrentView('product')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-background mb-4">
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-10 bg-primary text-white text-xs uppercase tracking-widest px-3 py-1">
                    New
                  </div>
                )}
                
                {/* Image */}
                <SafeImage 
                  src={product.image}
                  alt={product.name}
                  containerClassName="absolute inset-0"
                  imageClassName="group-hover:scale-105"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">
                  <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <button onClick={(e) => { e.stopPropagation(); setCurrentView('checkout'); }} className="flex-1 bg-white text-black py-3 text-sm font-medium hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                      <ShoppingBag size={18} />
                      Add to Cart
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`w-12 h-12 flex items-center justify-center transition-colors ${
                        wishlist.includes(product.id)
                          ? 'bg-primary text-white'
                          : 'bg-white text-black hover:text-primary'
                      }`}
                    >
                      <Heart size={20} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-xs text-foreground-muted uppercase tracking-widest mb-1 block">
                  {product.category}
                </span>
                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <span className="text-primary font-medium">
                  ${product.price}.00
                </span>
              </div>
            </motion.div>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <button onClick={() => setCurrentView('catalog')} className="border border-foreground text-foreground px-8 py-3 uppercase tracking-widest text-sm w-full">
            View All Collection
          </button>
        </div>
      </div>
    </section>
  );
}
