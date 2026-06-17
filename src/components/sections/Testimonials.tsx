import React from 'react';
import { Star } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface Testimonial {
  id: number;
  text: { en: string; ar: string };
  name: { en: string; ar: string };
  initials: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: {
      en: '"The gift wrapping was absolutely stunning! My mom cried happy tears."',
      ar: '"كان تغليف الهدايا مذهلاً حقاً! لقد بكت والدتي من شدة الفرح."',
    },
    name: { en: 'Sarah Mitchell', ar: 'سارة ميتشل' },
    initials: 'SM',
    rating: 5,
  },
  {
    id: 2,
    text: {
      en: '"I ordered the Grand Luxe bundle for my anniversary — my wife was blown away!"',
      ar: '"طلبت باقة Grand Luxe بمناسبة ذكرى زواجي — لقد كانت زوجتي منبهرة للغاية!"',
    },
    name: { en: 'James Chen', ar: 'جيمس تشن' },
    initials: 'JC',
    rating: 5,
  },
  {
    id: 3,
    text: {
      en: '"Same-day delivery saved my life! Beautiful gift set, wrapped perfectly."',
      ar: '"أنقذني التوصيل في نفس اليوم! مجموعة هدايا رائعة ومغلفة بإتقان."',
    },
    name: { en: 'Emily Parker', ar: 'إيميلي باركر' },
    initials: 'EP',
    rating: 5,
  },
];

export default function Testimonials() {
  const { language, t } = useAppContext();
  const isAr = language === 'ar';

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-2">
          <span className="text-primary font-serif italic text-lg md:text-xl block">
            {isAr ? 'ماذا يقولون عنا' : 'What they say'}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-foreground tracking-tight">
            {isAr ? 'حب عملائنا' : 'Customer Love'}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < item.rating ? 'fill-primary text-primary' : 'text-border'}`} 
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/80 text-lg leading-relaxed font-sans italic mb-8">
                  {item.text[language]}
                </p>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {item.initials}
                </div>
                <span className="font-serif font-medium text-foreground">
                  {item.name[language]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
