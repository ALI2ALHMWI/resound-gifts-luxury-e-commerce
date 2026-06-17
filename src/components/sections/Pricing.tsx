import React from 'react';
import { Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'motion/react';

interface Package {
  id: string;
  name: { en: string; ar: string };
  price: string;
  features: { en: string[]; ar: string[] };
  isPopular: boolean;
  buttonText: { en: string; ar: string };
}

const PACKAGES: Package[] = [
  {
    id: 'classic',
    name: { en: 'Classic', ar: 'الكلاسيكية' },
    price: '$79',
    features: {
      en: ['Premium Gift Wrapping', 'Satin Ribbon Finish', 'Luxury Gift Card', 'Personal Message'],
      ar: ['تغليف هدايا فاخر', 'لمسة شريط ساتان', 'بطاقة هدية فاخرة', 'رسالة شخصية'],
    },
    isPopular: false,
    buttonText: { en: 'Select Package', ar: 'اختيار الباقة' },
  },
  {
    id: 'popular',
    name: { en: 'Most Popular', ar: 'الأكثر طلباً' },
    price: '$149',
    features: {
      en: ['Luxury Wrapping Collection', 'Rose Gold Ribbon Styling', 'Wax Seal Finish', 'Premium Gift Box', 'Custom Message Card'],
      ar: ['مجموعة تغليف فاخرة', 'تنسيق شريط ذهبي وردي', 'ختم شمعي ملكي', 'صندوق هدايا فاخر', 'بطاقة رسالة مخصصة'],
    },
    isPopular: true,
    buttonText: { en: 'Choose Package', ar: 'اختيار الباقة' },
  },
  {
    id: 'elite',
    name: { en: 'Elite', ar: 'النخبة' },
    price: '$299',
    features: {
      en: ['Everything In Luxe', 'Fresh Floral Styling', 'Corporate Branding', 'Handwritten Note', 'Priority Delivery'],
      ar: ['كل ما في باقة لوكس', 'تنسيق زهور طبيعية', 'هوية مؤسسية مخصصة', 'ملاحظة مكتوبة بخط اليد', 'توصيل ذو أولوية'],
    },
    isPopular: false,
    buttonText: { en: 'Select Package', ar: 'اختيار الباقة' },
  },
];

export default function Pricing() {
  const { language, t } = useAppContext();
  const isAr = language === 'ar';

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-primary tracking-[0.3em] uppercase text-xs font-semibold block">
            {isAr ? 'باقات حصرية' : 'Exclusive Packages'}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-foreground tracking-tight">
            {isAr ? 'باقات الهدايا الفاخرة' : 'Luxury Gift Bundles'}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`relative p-8 md:p-12 rounded-[3rem] transition-all duration-300 ${
                pkg.isPopular 
                ? 'bg-primary text-white scale-105 shadow-2xl z-10' 
                : 'bg-white text-foreground shadow-sm border border-border/50'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-white/30">
                  {isAr ? 'أفضل قيمة' : 'Best Value'}
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-sm uppercase tracking-widest font-bold mb-4 ${pkg.isPopular ? 'text-white/90' : 'text-primary'}`}>
                  {pkg.name[language]}
                </h3>
                <div className="text-4xl md:text-5xl font-serif font-bold mb-8">
                  {pkg.price}
                </div>
              </div>

              <ul className="space-y-4 mb-12">
                {pkg.features[language].map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check 
                      size={18} 
                      className={`${pkg.isPopular ? 'text-white' : 'text-primary'} shrink-0 mt-0.5`} 
                    />
                    <span className={pkg.isPopular ? 'text-white/90' : 'text-foreground/70'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 rounded-full text-sm uppercase tracking-widest font-bold transition-all duration-300 ${
                  pkg.isPopular 
                  ? 'bg-accent text-foreground hover:bg-accent/90 shadow-lg' 
                  : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {pkg.buttonText[language]}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
