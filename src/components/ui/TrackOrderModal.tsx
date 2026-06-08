import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Gift, Truck, Check, Loader2, Award, Clock, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

// Multi-lingual tracking static database & dynamic generator helper
interface TrackingStep {
  title: string;
  time: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface TrackingData {
  orderId: string;
  items: string;
  estDelivery: string;
  courierName: string;
  courierPhone: string;
  statusText: string;
  currentStepIndex: number;
  steps: TrackingStep[];
}

const ORDER_DATABASE: Record<'en' | 'ar', Record<string, TrackingData>> = {
  en: {
    'RES-89234': {
      orderId: 'RES-89234',
      items: 'Oud Supreme Extraordinaire & Velvet Rose Bouquet',
      estDelivery: 'Today, by 6:00 PM (In approx. 2 hours)',
      courierName: 'Hassan Al-Saeed',
      courierPhone: '+966 50 123 4567',
      statusText: 'In Transit via Premium White-Glove Courier',
      currentStepIndex: 3,
      steps: [
        { title: 'Order Confirmed', time: '10:30 AM', description: 'Your premium order has been processed and approved.', status: 'completed' },
        { title: 'Artisan Assembly', time: '11:15 AM', description: 'Our top florists and perfume curation specialists have assembled your custom setup with premium gold ribbons.', status: 'completed' },
        { title: 'Quality Audited', time: '12:00 PM', description: 'Passed luxury standards check & safely loaded into climate-controlled storage.', status: 'completed' },
        { title: 'En Route', time: '1:45 PM', description: 'Dispatched via our temperature-regulated luxury courier.', status: 'current' },
        { title: 'Delivered', time: 'Pending', description: 'Gift accepted at destination with your custom wax-sealed card.', status: 'upcoming' }
      ]
    },
    'RES-77412': {
      orderId: 'RES-77412',
      items: 'White Peony Signature Box',
      estDelivery: 'Within 30 Minutes',
      courierName: 'Michel Raymond',
      courierPhone: '+971 52 987 6543',
      statusText: 'Out for Immediate Delivery',
      currentStepIndex: 3,
      steps: [
        { title: 'Order Confirmed', time: 'Yesterday', description: 'Approved and scheduled for express gift dispatch.', status: 'completed' },
        { title: 'Artisan Assembly', time: 'Yesterday', description: 'Peonies secured in our specialized water-nutrient container.', status: 'completed' },
        { title: 'Quality Audited', time: 'Today, 9:00 AM', description: 'Audited for flawless petals and presentation.', status: 'completed' },
        { title: 'Courier Approaching Destination', time: 'Today, 10:45 AM', description: 'Our white-glove driver is entering your area.', status: 'current' },
        { title: 'Delivered', time: 'Pending', description: 'Awaiting hand-delivery of the signature box.', status: 'upcoming' }
      ]
    },
    'RES-33290': {
      orderId: 'RES-33290',
      items: 'Classic Macaron Set & Midnight Musk',
      estDelivery: 'Delivered Yesterday',
      courierName: 'Ameen Khan',
      courierPhone: '+966 55 999 8881',
      statusText: 'Delivered & Hand-signed',
      currentStepIndex: 4,
      steps: [
        { title: 'Order Confirmed', time: 'June 6, 9:00 AM', description: 'Your order was processed successfully.', status: 'completed' },
        { title: 'Artisan Assembly', time: 'June 6, 10:00 AM', description: 'Delicately placed in our luxury thermal sleeve.', status: 'completed' },
        { title: 'Quality Audited', time: 'June 6, 11:30 AM', description: 'Flawless aesthetic appraisal and verification completed.', status: 'completed' },
        { title: 'In Transit', time: 'June 6, 1:00 PM', description: 'Dispatched via premium delivery.', status: 'completed' },
        { title: 'Successfully Delivered', time: 'June 6, 3:15 PM', description: 'Hand-delivered with custom message printed card. Signed by host.', status: 'completed' }
      ]
    }
  },
  ar: {
    'RES-89234': {
      orderId: 'RES-89234',
      items: 'عطر عود سبريم الاستثنائي وباقة ورد مخملي أحمر',
      estDelivery: 'اليوم، بحلول الساعة 6:00 مساءً (خلال ساعتين تقريباً)',
      courierName: 'حسن السعيد',
      courierPhone: '+966 50 123 4567',
      statusText: 'قيد التوصيل عبر مندوب الخدمة الفاخرة',
      currentStepIndex: 3,
      steps: [
        { title: 'تم تأكيد الطلب', time: '10:30 صباحاً', description: 'تم معالجة طلبك الفاخر واعتماده بالكامل.', status: 'completed' },
        { title: 'تحضير المنسقين', time: '11:15 صباحاً', description: 'قام كبار منسقي الزهور ومصممي العطور بتجميع هديتك المخصصة وربطها بالشرائط الذهبية الأنيقة.', status: 'completed' },
        { title: 'مراجعة معايير الجودة', time: '12:00 مساءً', description: 'اجتاز الطلب تدقيق المظهر الفخم وتم نقله لحافظات مبردة.', status: 'completed' },
        { title: 'في الطريق إليك', time: '1:45 مساءً', description: 'انطلق مندوبنا الخاص في سيارة مكيفة تحمي نضارة الزهور.', status: 'current' },
        { title: 'تم التوصيل', time: 'قريباً', description: 'تسليم الهدية في الموقع مع بطاقة التهنئة المختومة بالشمع الفاخر.', status: 'upcoming' }
      ]
    },
    'RES-77412': {
      orderId: 'RES-77412',
      items: 'صندوق زهور الفاوانيا البيضاء الفخم',
      estDelivery: 'خلال 30 دقيقة',
      courierName: 'ميشيل رايموند',
      courierPhone: '+971 52 987 6543',
      statusText: 'قريب جداً من موقع التوصيل',
      currentStepIndex: 3,
      steps: [
        { title: 'تم تأكيد الطلب', time: 'أمس', description: 'تمت الموافقة والجدولة ضمن التوصيل العاجل السريع.', status: 'completed' },
        { title: 'تحضير المنسقين', time: 'أمس', description: 'تم تثبيت زهور الفاوانيا الفاتنة في صندوق التغذية المائية المخصص.', status: 'completed' },
        { title: 'تدقيق المظهر والجودة', time: 'اليوم، 9:00 صباحاً', description: 'تم التحقق من نضارة الأوراق واكتمال رونق الصندوق.', status: 'completed' },
        { title: 'المندوب يقترب من الموقع', time: 'اليوم، 10:45 صباحاً', description: 'مندوب التوصيل الفخم يقف على مشارف موقعك الآن.', status: 'current' },
        { title: 'تمت عملية التوصيل', time: 'قريباً', description: 'بانتظار تسليم الهدية الراقية باليد والتقاط الابتسامة.', status: 'upcoming' }
      ]
    },
    'RES-33290': {
      orderId: 'RES-33290',
      items: 'مجموعة الماكرون الكلاسيكية وعطر مدنايت مسك 50 مل',
      estDelivery: 'تم التوصيل بالأمس',
      courierName: 'أمين خان',
      courierPhone: '+966 55 999 8881',
      statusText: 'تم التوصيل والاستلام رسمياً',
      currentStepIndex: 4,
      steps: [
        { title: 'تمت الموافقة', time: '6 يونيو، 9:00 صباحاً', description: 'تم قبول وتجهيز الفاتورة والتحقق من الملحقات.', status: 'completed' },
        { title: 'تحضير وتغليف فخم', time: '6 يونيو، 10:00 صباحاً', description: 'وُضعت الحلويات والعطور في الأغلفة الحافظة للحرارة الفاخرة.', status: 'completed' },
        { title: 'فحص الجودة التام', time: '6 يونيو، 11:30 صباحاً', description: 'اجتاز التقييم البصري والجمالي والتأكد من جودة الأشرطة.', status: 'completed' },
        { title: 'مع مندوب الشحن', time: '6 يونيو، 1:00 مساءً', description: 'غادرت الشحنة مركز التوزيع الإقليمي.', status: 'completed' },
        { title: 'تم التوصيل بأمان', time: '6 يونيو، 3:15 مساءً', description: 'سُلّمت الهدية بنجاح إلى المستقبل مع كرت الإهداء الأنيق.', status: 'completed' }
      ]
    }
  }
};

// Generates dynamic deterministic tracking details for any custom Order IDs entered
const generateDeterministicTracker = (id: string, language: 'en' | 'ar'): TrackingData => {
  const isAr = language === 'ar';
  const cleanId = id.toUpperCase().trim();
  
  // Choose a state index based on string length or characters
  const seed = cleanId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const currentStepIndex = (seed % 3) + 1; // Between 1 and 3

  const items = isAr ? 'باقة هدايا ريزاوند الفاخرة المنسقة' : 'Curated Resound Luxury Gift Bundle';
  const courierName = isAr ? 'رائد العتيبي' : 'Rayed Al-Otaibi';
  const courierPhone = '+966 53 888 2211';
  
  let statusText = isAr ? 'جاري تجهيز وتنسيق طلبك' : 'Artisan Handcrafting In Progress';
  let estDelivery = isAr ? 'غداً، خلال النصف الأول من اليوم' : 'Tomorrow, during morning delivery cycle';
  
  if (currentStepIndex === 2) {
    statusText = isAr ? 'طلبك الفاخر في مرحلة التحقق من الجودة ورقابة التغليف' : 'Quality Audit & Premium Silk Ribbon Sealing';
    estDelivery = isAr ? 'اليوم، بحلول الساعة 8:00 مساءً' : 'Today, by 8:00 PM';
  } else if (currentStepIndex === 3) {
    statusText = isAr ? 'في الطريق للتسليم مع مندوبنا الخاص' : 'En Route via White-Glove Premium Courier';
    estDelivery = isAr ? 'اليوم، في غضون 3 إلى 5 ساعات' : 'Today, within 3 to 5 hours';
  }

  const steps: TrackingStep[] = isAr ? [
    { 
      title: 'تم تأكيد الطلب الفاخر', 
      time: 'منذ ساعتين', 
      description: 'تم حجز زهورك النضرة والعطور الفاخرة واعتماد الفاتورة.', 
      status: 'completed' 
    },
    { 
      title: 'تحضير وتوليف هداياك', 
      time: currentStepIndex >= 1 ? 'منذ ساعة' : 'قيد الانتظار', 
      description: 'يقوم خبراؤنا بقص السيقان بدقة وعزل العطور بأغلفة ممتازة.', 
      status: currentStepIndex === 1 ? 'current' : currentStepIndex > 1 ? 'completed' : 'upcoming'
    },
    { 
      title: 'مراقبة الجودة والتزيين', 
      time: currentStepIndex >= 2 ? 'منذ 20 دقيقة' : 'قيد الانتظار', 
      description: 'فحص مظهر الباقة، لمعان زجاجات العطور، وإضافة الشمع والكرت الورقي السميك.', 
      status: currentStepIndex === 2 ? 'current' : currentStepIndex > 2 ? 'completed' : 'upcoming'
    },
    { 
      title: 'الشحن في المندوب المغلق المبرد', 
      time: currentStepIndex >= 3 ? 'الآن' : 'قيد الانتظار', 
      description: 'تم النقل بسلام إلى مندوب ريزاوند الودود المتجه فوراً لمنطقتك.', 
      status: currentStepIndex === 3 ? 'current' : 'upcoming'
    },
    { 
      title: 'استلام الهدية الفاخرة بسلام', 
      time: 'معلق', 
      description: 'تسليم الهدايا للمستقبل مع تقديم خالص التهاني وتأكيد التواقيع.', 
      status: 'upcoming' 
    }
  ] : [
    { 
      title: 'Luxury Order Confirmed', 
      time: '2 hours ago', 
      description: 'Fresh florals and high-end formulations secured and approved.', 
      status: 'completed' 
    },
    { 
      title: 'Artisan Styling & Selection', 
      time: currentStepIndex >= 1 ? '1 hour ago' : 'Scheduled', 
      description: 'Stems trimmed matching modern proportions; fragrance decants secured.', 
      status: currentStepIndex === 1 ? 'current' : currentStepIndex > 1 ? 'completed' : 'upcoming'
    },
    { 
      title: 'Luxury Quality Audit Check', 
      time: currentStepIndex >= 2 ? '20 mins ago' : 'Scheduled', 
      description: 'Petal and bottle visual assessment completed. Custom wax seal ribbon applied.', 
      status: currentStepIndex === 2 ? 'current' : currentStepIndex > 2 ? 'completed' : 'upcoming'
    },
    { 
      title: 'En Route via Premium Courier', 
      time: currentStepIndex >= 3 ? 'Just now' : 'Scheduled', 
      description: 'Dispatched in climate-controlled cabins ensuring absolute freshness.', 
      status: currentStepIndex === 3 ? 'current' : 'upcoming'
    },
    { 
      title: 'Hand-Delivered Comfortably', 
      time: 'Pending', 
      description: 'Safe drop-off with hand-signed receiver receipt and congratulations.', 
      status: 'upcoming' 
    }
  ];

  return {
    orderId: cleanId,
    items,
    estDelivery,
    courierName,
    courierPhone,
    statusText,
    currentStepIndex,
    steps
  };
};

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export default function TrackOrderModal({ isOpen, onClose, initialOrderId = '' }: TrackOrderModalProps) {
  const { language } = useAppContext();
  const isAr = language === 'ar';
  
  const [orderQuery, setOrderQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchedData, setSearchedData] = useState<TrackingData | null>(null);
  const [errorText, setErrorText] = useState('');

  // Handle outside escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Synchronize initial input if preset from another page (e.g. success screen)
  useEffect(() => {
    if (isOpen) {
      if (initialOrderId) {
        setOrderQuery(initialOrderId);
        triggerLookup(initialOrderId);
      } else {
        setOrderQuery('');
        setSearchedData(null);
        setErrorText('');
      }
    }
  }, [isOpen, initialOrderId]);

  const triggerLookup = (id: string) => {
    const cleanId = id.toUpperCase().trim();
    if (!cleanId) {
      setErrorText(isAr ? 'الرجاء إدخال رقم الطلب بشكل صحيح' : 'Please enter a valid Order ID');
      return;
    }
    
    setErrorText('');
    setIsLoading(true);

    // Simulate luxury API response lag for professional feedback
    setTimeout(() => {
      const matchDb = ORDER_DATABASE[language][cleanId];
      if (matchDb) {
        setSearchedData(matchDb);
      } else {
        // If they enter any custom ID, generate a deterministic beautiful tracker
        // to avoid "no result" and provide an immersive rich experience!
        const fallbackTracker = generateDeterministicTracker(cleanId, language);
        setSearchedData(fallbackTracker);
      }
      setIsLoading(false);
    }, 1200);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerLookup(orderQuery);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" id="track-order-modal-container">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-background text-foreground w-full max-w-2xl border border-[#C5A059]/25 shadow-2xl max-h-[90vh] overflow-y-auto rounded-none flex flex-col z-[101]"
          >
            {/* Header border decor */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-[#C5A059] to-primary" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-foreground-muted hover:text-primary transition-colors hover:rotate-90 duration-300 z-10"
              title={isAr ? 'إغلاق' : 'Close'}
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-8">
              {/* Luxury brand header */}
              <div className="text-center mb-8">
                <span className="text-[10px] uppercase font-serif tracking-[0.3em] text-[#C5A059] block mb-2">Track Luxury Parcels</span>
                <h3 className="font-serif text-2xl sm:text-3xl tracking-wide uppercase">
                  {isAr ? 'تتبع هدايا ريزاوند' : 'Resound Gift Tracker'}
                </h3>
                <p className="text-xs text-foreground-muted mt-2 max-w-md mx-auto">
                  {isAr 
                    ? 'أدخل رقم الطلب لعرض تقدم عملية الترتيب اليدوي وسير سيارة التوصيل المعزولة حرارياً.'
                    : 'Input your premium order identifier to visualize meticulous assembly stages and temperature-controlled dispatch.'}
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSearchSubmit} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={orderQuery}
                      onChange={(e) => setOrderQuery(e.target.value)}
                      placeholder={isAr ? 'مثال: RES-89234' : 'e.g. RES-89234'}
                      className="w-full bg-surface border border-border px-5 py-4 text-sm font-mono tracking-widest focus:border-primary focus:outline-none transition-colors uppercase placeholder:text-foreground-muted placeholder:font-sans placeholder:tracking-normal"
                      required
                    />
                    <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-foreground-muted ${isAr ? 'left-4' : 'right-4'}`}>
                      <Search size={18} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-foreground text-background hover:bg-primary hover:text-white px-8 py-4 uppercase tracking-[0.1em] text-xs font-semibold font-serif transition-all duration-300 flex items-center justify-center gap-2 border border-foreground hover:border-primary min-w-[150px]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={14} className="animate-spin text-[#C5A059]" />
                        <span>{isAr ? 'بحث...' : 'LOCATING...'}</span>
                      </>
                    ) : (
                      <span>{isAr ? 'تتبع الآن' : 'TRACK GIFT'}</span>
                    )}
                  </button>
                </div>
                {errorText && (
                  <p className="text-xs text-red-500 mt-2 font-medium">{errorText}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-2 justify-center text-[11px] text-foreground-muted">
                  <span>{isAr ? 'جرب أرقام تجريبية للتجربة:' : 'Demo Order IDs to try:'}</span>
                  {['RES-89234', 'RES-77412', 'RES-33290'].map(demoId => (
                    <button
                      key={demoId}
                      type="button"
                      onClick={() => { setOrderQuery(demoId); triggerLookup(demoId); }}
                      className="underline hover:text-[#C5A059] font-mono"
                    >
                      {demoId}
                    </button>
                  ))}
                </div>
              </form>

              {/* Result Area */}
              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center justify-center gap-4 border border-[#C5A059]/10 bg-surface/50"
                  >
                    <Loader2 size={40} className="animate-spin text-[#C5A059]" />
                    <div className="text-center">
                      <p className="font-serif text-sm uppercase tracking-widest text-[#C5A059]">{isAr ? 'جاري الاتصال بالنظام' : 'Accessing Luxury Registry'}</p>
                      <p className="text-xs text-foreground-muted mt-1">{isAr ? 'نقوم بفحص مستودع التنسيق اليدوي...' : 'Verifying handcrafted arrangement status...'}</p>
                    </div>
                  </motion.div>
                )}

                {!isLoading && searchedData && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                    id="track-order-results"
                  >
                    {/* Brief Card Summary */}
                    <div className="p-5 border border-primary/20 bg-primary/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] uppercase text-foreground-muted tracking-wider block">{isAr ? 'الهدية المرسلة' : 'LUXURY GIFT SELECTIONS'}</span>
                        <p className="font-serif text-sm text-foreground font-medium mt-1">{searchedData.items}</p>
                        
                        <span className="text-[10px] uppercase text-foreground-muted tracking-wider block mt-4">{isAr ? 'رمز الطلب' : 'SECURE ORDER IDENTIFIER'}</span>
                        <p className="font-mono text-xs text-primary font-bold mt-1">#{searchedData.orderId}</p>
                      </div>

                      <div className="border-t md:border-t-0 md:border-l border-border/50 md:pl-5 rtl:border-l-0 rtl:border-r rtl:mr-5 rtl:pr-5">
                        <span className="text-[10px] uppercase text-foreground-muted tracking-wider block">{isAr ? 'التوصيل المتوقع' : 'ESTIMATED DELIVERY'}</span>
                        <div className="flex items-center gap-2 text-primary mt-1">
                          <Clock size={16} className="text-[#C5A059]" />
                          <p className="font-serif text-sm font-semibold text-[#C5A059]">{searchedData.estDelivery}</p>
                        </div>

                        <span className="text-[10px] uppercase text-foreground-muted tracking-wider block mt-4">{isAr ? 'مندوب ريزاوند للتسلم الفخم' : 'WHITE-GLOVE REPRESENTATIVE'}</span>
                        <div className="mt-1 flex items-center justify-between text-xs">
                          <p className="font-medium text-foreground">{searchedData.courierName}</p>
                          <a href={`tel:${searchedData.courierPhone}`} className="flex items-center gap-1 text-primary hover:underline font-mono">
                            <Phone size={12} />
                            <span>{searchedData.courierPhone}</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Progress Status Header */}
                    <div className="flex items-center gap-2 border-b border-border pb-3">
                      <Truck size={18} className="text-[#C5A059]" />
                      <span className="text-xs font-serif uppercase tracking-widest font-semibold">{isAr ? 'خطوات التحضير الفوري وسفر الشحنة' : 'Luxe Handling & Assembly Sequence'}</span>
                    </div>

                    {/* Timeline Line/Progress */}
                    <div className="relative pl-6 rtl:pl-0 rtl:pr-6 space-y-6">
                      {/* Vertical line connector */}
                      <div className={`absolute top-2 bottom-2 w-[1px] bg-border ${isAr ? 'right-9' : 'left-9'}`} />

                      {searchedData.steps.map((step, idx) => {
                        const isCompleted = step.status === 'completed';
                        const isCurrent = step.status === 'current';
                        
                        return (
                          <div key={idx} className="relative flex gap-6 items-start">
                            {/* Dot indicator */}
                            <div className="relative z-10 flex items-center justify-center w-6 h-6 shrink-0 -ml-[3px] rtl:-mr-[3px]">
                              {isCompleted && (
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                                  <Check size={12} className="stroke-[3]" />
                                </div>
                              )}
                              {isCurrent && (
                                <div className="w-6 h-6 rounded-full bg-background border border-[#C5A059] flex items-center justify-center relative">
                                  {/* Pulsing ring aura */}
                                  <span className="absolute inset-0 rounded-full bg-[#C5A059]/30 animate-ping" />
                                  <div className="w-3 h-3 rounded-full bg-[#C5A059]" />
                                </div>
                              )}
                              {!isCompleted && !isCurrent && (
                                <div className="w-4 h-4 rounded-full bg-surface border border-border" />
                              )}
                            </div>

                            {/* Step Description */}
                            <div className="flex-grow pt-0.5">
                              <div className="flex justify-between items-center gap-2">
                                <h4 className={`text-sm uppercase font-serif tracking-widest font-medium ${
                                  isCurrent ? 'text-[#C5A059]' : isCompleted ? 'text-foreground' : 'text-foreground-muted'
                                }`}>
                                  {step.title}
                                </h4>
                                <span className="text-[10px] text-foreground-muted font-mono">{step.time}</span>
                              </div>
                              <p className="text-xs text-foreground-muted mt-1 leading-relaxed">{step.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {!isLoading && !searchedData && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center border border-dashed border-border"
                  >
                    <Award size={36} className="text-foreground-muted opacity-30 mb-3" />
                    <p className="text-sm font-serif text-foreground-muted uppercase tracking-wider">
                      {isAr ? 'لم يتم العثور على تتبع نشط' : 'No Active Tracker Displayed'}
                    </p>
                    <p className="text-xs text-foreground-muted max-w-xs mt-1">
                      {isAr 
                        ? 'أدخل رقم طلبك الفاخر أعلاه لعرض التفاصيل وتحديثات الشحن المباشرة بدقة متناهية.'
                        : 'Input your elite luxury tracking number to start viewing our white-glove custom transit layout.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
