import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'motion/react';
import SafeImage from '../ui/SafeImage';

const occasions = [
  {
    id: 'anniversary',
    title: 'Anniversary',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
    aspect: 'aspect-[2/1] md:aspect-[2/1]',
  },
  {
    id: 'birthday',
    title: 'Birthday',
    image: 'https://images.unsplash.com/photo-1530103862677-de3c9de89c23?q=80&w=800&auto=format&fit=crop',
    colSpan: 'col-span-1 lg:col-span-1',
    aspect: 'aspect-square md:aspect-[2/1] lg:aspect-square',
  },
  {
    id: 'wedding',
    title: 'Wedding',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
    colSpan: 'col-span-1 lg:col-span-1',
    aspect: 'aspect-square',
  },
  {
    id: 'valentine',
    title: 'Valentine\'s Day',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
    aspect: 'aspect-[2/1]',
  }
];

export default function Occasions() {
  const { t, setCurrentView } = useAppContext();

  return (
    <section className="py-24 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            {t('occasions.title')}
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto"></div>
          <p className="mt-6 text-foreground-muted max-w-2xl mx-auto text-sm lg:text-base">
            Find the perfect expression for every extraordinary moment. Explore our curated collections designed to make your celebrations unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {occasions.map((occasion, idx) => (
            <motion.div
              key={occasion.id}
              onClick={() => setCurrentView('catalog')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`group relative overflow-hidden cursor-pointer ${occasion.colSpan} ${occasion.aspect}`}
            >
              <SafeImage 
                src={occasion.image}
                alt={occasion.title}
                containerClassName="absolute inset-0 z-0"
                imageClassName="group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 z-10 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
              
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-6 rounded-sm text-center transform group-hover:-translate-y-2 transition-all duration-500 w-4/5 max-w-sm">
                  <h3 className="text-white text-2xl lg:text-3xl font-serif tracking-wide">
                    {occasion.title}
                  </h3>
                  <div className="w-0 h-[1px] bg-white mx-auto mt-4 group-hover:w-full transition-all duration-500 ease-out"></div>
                  <span className="text-white/90 text-xs tracking-[0.2em] uppercase mt-4 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Discover
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
