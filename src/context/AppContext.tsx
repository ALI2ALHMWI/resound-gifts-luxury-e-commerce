import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';
type Theme = 'light' | 'dark';
type View = 'home' | 'catalog' | 'product' | 'builder' | 'checkout' | 'reminders' | 'trending' | 'hot_offer';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  currentView: View;
  setCurrentView: (view: View) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  trackingOrderId: string;
  setTrackingOrderId: (id: string) => void;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.category': 'Category',
    'nav.trending': 'Trending',
    'nav.hot_offer': 'Hot Offer',
    'nav.build': 'Build Your Gift',
    'nav.premium': 'Unlock Premium Access',
    'hero.title': 'Luxury Flowers, Perfumes & Personalized Gifts',
    'hero.subtitle': 'Discover the art of gifting. They resonate, leaving an echo in their hearts.',
    'hero.cta.shop': 'Shop Now',
    'hero.cta.build': 'Build Your Gift',
    'categories.title': 'Shop By Category',
    'occasions.title': 'Shop By Occasion',
    'bestsellers.title': 'Best Sellers',
    'builder.title': 'Build Your Gift',
    'builder.step1': 'Choose Flowers',
    'builder.step2': 'Choose Perfume',
    'builder.step3': 'Additional Gifts',
    'builder.step4': 'Packaging',
    'builder.step5': 'Message',
    'footer.about': 'About Resound Gifts',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact Us',
    'catalog.title': 'Our Collection',
    'filter.category': 'Category',
    'filter.price': 'Price Range',
    'filter.occasion': 'Occasion',
    'filter.brand': 'Brand',
    'filter.apply': 'Apply Filters',
    'filter.clear': 'Clear All',
    'sort.title': 'Sort By',
    'sort.popular': 'Popularity',
    'sort.newest': 'Newest',
    'sort.price_low': 'Price: Low to High',
    'sort.price_high': 'Price: High to Low',
    'dashboard.reminders.title': 'Gift Reminders',
    'dashboard.reminders.subtitle': 'Never miss a special occasion. We will send you an automated reminder 7 days before the event.',
    'dashboard.reminders.add': 'Add Reminder',
    'dashboard.reminders.name': 'Recipient Name',
    'dashboard.reminders.date': 'Date',
    'dashboard.reminders.occasion': 'Occasion',
    'dashboard.reminders.save': 'Save Reminder'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.category': 'الفئات',
    'nav.trending': 'الأكثر رواجاً',
    'nav.hot_offer': 'عرض ساخن',
    'nav.build': 'اصنع هديتك',
    'nav.premium': 'فتح الوصول المميز',
    'hero.title': 'زهور وعطور وهدايا فاخرة مخصصة',
    'hero.subtitle': 'اكتشف فن الإهداء. يتردد صداها، تاركة أثراً في قلوبهم.',
    'hero.cta.shop': 'تسوق الآن',
    'hero.cta.build': 'اصنع هديتك',
    'categories.title': 'تسوق حسب الفئة',
    'occasions.title': 'تسوق حسب المناسبة',
    'bestsellers.title': 'الأكثر مبيعاً',
    'builder.title': 'اصنع هديتك',
    'builder.step1': 'اختر الزهور',
    'builder.step2': 'اختر العطر',
    'builder.step3': 'هدايا إضافية',
    'builder.step4': 'التغليف',
    'builder.step5': 'الرسالة',
    'footer.about': 'عن ريزاوند جيفتس',
    'footer.links': 'روابط سريعة',
    'footer.contact': 'اتصل بنا',
    'catalog.title': 'مجموعتنا',
    'filter.category': 'الفئة',
    'filter.price': 'نطاق السعر',
    'filter.occasion': 'المناسبة',
    'filter.brand': 'العلامة التجارية',
    'filter.apply': 'تطبيق الفلاتر',
    'filter.clear': 'مسح الكل',
    'sort.title': 'ترتيب حسب',
    'sort.popular': 'الأكثر شعبية',
    'sort.newest': 'الأحدث',
    'sort.price_low': 'السعر: من الأقل للأعلى',
    'sort.price_high': 'السعر: من الأعلى للأقل',
    'dashboard.reminders.title': 'تذكيرات الهدايا',
    'dashboard.reminders.subtitle': 'لا تفوت أي مناسبة خاصة. سنرسل لك تذكيراً آلياً قبل 7 أيام من الحدث.',
    'dashboard.reminders.add': 'إضافة تذكير',
    'dashboard.reminders.name': 'اسم المستلم',
    'dashboard.reminders.date': 'التاريخ',
    'dashboard.reminders.occasion': 'المناسبة',
    'dashboard.reminders.save': 'حفظ التذكير'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.style.setProperty('--direction', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <AppContext.Provider value={{ 
      language, 
      setLanguage, 
      theme, 
      setTheme, 
      t, 
      wishlist, 
      toggleWishlist, 
      currentView, 
      setCurrentView,
      isTrackingOpen,
      setIsTrackingOpen,
      trackingOrderId,
      setTrackingOrderId
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
