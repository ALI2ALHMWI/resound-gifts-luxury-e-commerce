import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'motion/react';
import SafeImage from '../ui/SafeImage';

const categories = [
  {
    id: 'flowers',
    title: 'Flowers',
    image: '/src/assets/images/luxury_flowers_1780873684175.png',
  },
  {
    id: 'perfumes',
    title: 'Perfumes',
    image: '/src/assets/images/luxury_perfumes_1780873697555.png',
  },
  {
    id: 'gifts',
    title: 'Luxury Gifts',
    image: '/src/assets/images/luxury_gifts_1780873711033.png',
  },
  {
    id: 'sets',
    title: 'Gift Sets',
    image: '/src/assets/images/gift_wrapping_1780873727156.png',
  }
];

export default function Categories() {
  const { t, setCurrentView } = useAppContext();

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            {t('categories.title')}
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.id}
              onClick={() => setCurrentView('catalog')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-[400px] overflow-hidden cursor-pointer"
            >
              <SafeImage 
                src={cat.image}
                alt={cat.title}
                containerClassName="absolute inset-0 z-0"
                imageClassName="group-hover:scale-110"
              />
              <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-12">
                <h3 className="text-white text-2xl font-serif mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                  {cat.title}
                </h3>
                <span className="text-primary text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Explore
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
