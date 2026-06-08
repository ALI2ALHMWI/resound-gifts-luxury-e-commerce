import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SafeImage from '../ui/SafeImage';

export default function Hero() {
  const { t, language, setCurrentView } = useAppContext();
  const Icon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <SafeImage 
          src="/src/assets/images/brand_hero_1780873667975.png"
          alt="Hero Background"
          containerClassName="w-full h-full"
        />
      </div>
      <div className="absolute inset-0 z-[5] bg-black/40 dark:bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-primary tracking-widest uppercase text-sm mb-6 block font-medium"
        >
          Resound Gifts
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight"
        >
          {t('hero.title')}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light"
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={() => setCurrentView('catalog')} className="bg-primary hover:bg-primary/90 text-white px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 w-full sm:w-auto">
            {t('hero.cta.shop')}
          </button>
          
          <button onClick={() => setCurrentView('builder')} className="group flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 w-full sm:w-auto">
            {t('hero.cta.build')}
            <Icon size={16} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70"
      >
        <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-full h-1/2 bg-primary"
          />
        </div>
      </motion.div>
    </div>
  );
}
