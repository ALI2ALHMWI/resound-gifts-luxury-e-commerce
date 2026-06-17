import React from 'react';
import { Calendar } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'motion/react';

interface Step {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

const STEPS: Step[] = [
  {
    id: '01',
    title: { en: 'Choose Your Gift', ar: 'اختر هديتك' },
    description: { 
      en: 'Select from our curated collection or provide your own gift.', 
      ar: 'اختر من مجموعتنا المنسقة بعناية أو زودنا بهديتك الخاصة.' 
    },
  },
  {
    id: '02',
    title: { en: 'Pick A Style', ar: 'حدد النمط' },
    description: { 
      en: 'Choose from velvet, floral, rose-gold and bespoke designs.', 
      ar: 'اختر من بين تصاميم المخمل، الزهور، الذهب الوردي أو التصاميم المخصصة.' 
    },
  },
  {
    id: '03',
    title: { en: 'Personalize', ar: 'إضف لمستك' },
    description: { 
      en: 'Add messages, wax seals, cards and custom branding.', 
      ar: 'أضف الرسائل، أختام الشمع، البطاقات والهوية المخصصة.' 
    },
  },
  {
    id: '04',
    title: { en: 'Handcrafted', ar: 'صنع يدوي' },
    description: { 
      en: 'Our artisans carefully prepare every presentation by hand.', 
      ar: 'يقوم حرفيونا بتجهيز كل عرض يدويًا وبكل عناية.' 
    },
  },
  {
    id: '05',
    title: { en: 'Delivered', ar: 'التوصيل' },
    description: { 
      en: 'Beautifully packaged and ready to impress.', 
      ar: 'تغليف رائع وجاهز لترك انطباع لا يُنسى.' 
    },
  },
];

export default function HowItWorks() {
  const { language } = useAppContext();
  const isAr = language === 'ar';

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <span className="text-primary tracking-[0.3em] uppercase text-xs font-bold block">
            {isAr ? 'تجربة ريزاوند' : 'The Resound Experience'}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-foreground tracking-tight">
            {isAr ? 'كيف يعمل الأمر' : 'How It Works'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 text-center mb-20">
          {STEPS.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group"
            >
              {/* Dot Indicator */}
              <div className="w-4 h-4 rounded-full bg-primary mb-6 group-hover:scale-125 transition-transform duration-300" />
              
              {/* Step Number */}
              <span className="text-primary font-serif font-bold text-lg mb-4 block tracking-widest">
                {step.id}
              </span>
              
              {/* Title */}
              <h3 className="text-xl font-serif font-medium text-foreground mb-4">
                {step.title[language]}
              </h3>
              
              {/* Description */}
              <p className="text-foreground/60 text-sm leading-relaxed max-w-[200px] mx-auto font-sans">
                {step.description[language]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-end">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-4 rounded-full flex items-center gap-3 text-sm uppercase tracking-widest font-bold shadow-lg hover:bg-primary/90 transition-all"
          >
            <Calendar size={18} />
            {isAr ? 'حجز استشارة' : 'Book Consultation'}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
