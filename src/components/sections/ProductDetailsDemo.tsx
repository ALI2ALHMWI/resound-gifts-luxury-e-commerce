import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'motion/react';
import Product360Viewer from '../ui/Product360Viewer';
import ZoomableImage from '../ui/ZoomableImage';
import { ShoppingBag, Heart, Share2, Info, ArrowRight, MousePointerClick, RefreshCw, Copy, Check, ExternalLink } from 'lucide-react';
import SafeImage from '../ui/SafeImage';

// For demonstration, we create a mock array of images for the 360 viewer.
// In a real application, these would be 36 separate high-res image angles.
const MOCK_360_IMAGES = Array.from({ length: 36 }).map((_, i) => 
  `/src/assets/images/luxury_perfumes_1780873697555.png?rot=${i * 10}`
);

// Better to just use a static array of the same image for this demo to avoid 36 network requests for the exact same image
const DEMO_360_IMAGES = Array(36).fill('/src/assets/images/luxury_perfumes_1780873697555.png');

const DEMO_GALLERY_IMAGES = [
  '/src/assets/images/luxury_perfumes_1780873697555.png',
  'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1594035910387-fea47724263f?q=80&w=1000&auto=format&fit=crop',
];

export default function ProductDetailsDemo() {
  const { t, wishlist, toggleWishlist, setCurrentView } = useAppContext();
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState<'gallery' | '360'>('gallery');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [giftWrapping, setGiftWrapping] = useState<'standard' | 'premium'>('standard');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const productId = 102; // Oud Supreme

  const handleShareClick = async () => {
    const shareData = {
      title: "Oud Supreme Extraordinaire - Resound Luxe",
      text: "Discover Oud Supreme Extraordinaire - an olfactory masterpiece sourced from the rarest agarwood.",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        console.log("Could not use native share, opening manual panel:", err);
      }
    }
    setShowShareOptions(!showShareOptions);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const basePrice = 320;
  const wrapPrice = giftWrapping === 'premium' ? 25 : 0;
  const totalPrice = (basePrice + wrapPrice) * quantity;

  const WRAPPING_OPTIONS = [
    {
      id: 'standard',
      name: 'Standard Box',
      price: 0,
      desc: 'Complimentary branded packaging',
      image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'premium',
      name: 'Signature Velvet',
      price: 25,
      desc: 'Satin ribbon & personalized seal',
      image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-24 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h2 className="text-sm font-medium text-primary tracking-widest uppercase mb-2">Featured Product</h2>
          <h3 className="text-3xl font-serif text-foreground">Interactive Experience</h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Interactive Viewer Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {viewMode === '360' ? (
                <Product360Viewer images={DEMO_360_IMAGES} />
              ) : (
                <ZoomableImage 
                  src={DEMO_GALLERY_IMAGES[activeImageIndex]} 
                  alt={`Product view ${activeImageIndex + 1}`} 
                />
              )}

              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <button 
                  onClick={() => setViewMode('gallery')}
                  className={`p-2 bg-background/80 backdrop-blur-sm border ${viewMode === 'gallery' ? 'border-primary text-primary' : 'border-border text-foreground-muted'} hover:text-primary transition-colors`}
                  title="Gallery View"
                >
                  <MousePointerClick size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('360')}
                  className={`p-2 bg-background/80 backdrop-blur-sm border ${viewMode === '360' ? 'border-primary text-primary' : 'border-border text-foreground-muted'} hover:text-primary transition-colors`}
                  title="360° View"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-8">
              {DEMO_GALLERY_IMAGES.map((imgUrl, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setViewMode('gallery');
                    setActiveImageIndex(idx);
                  }}
                  className={`aspect-square bg-background border cursor-pointer overflow-hidden transition-colors ${activeImageIndex === idx && viewMode === 'gallery' ? 'border-primary' : 'border-border hover:border-primary/50'}`}
                >
                  <SafeImage src={imgUrl} alt={`Thumbnail ${idx + 1}`} containerClassName="w-full h-full" imageClassName={`transition-opacity duration-300 ${activeImageIndex === idx && viewMode === 'gallery' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`} />
                </div>
              ))}
              <div 
                onClick={() => setViewMode('360')}
                className={`aspect-square bg-background border flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${viewMode === '360' ? 'border-primary text-primary' : 'border-border text-foreground-muted hover:border-primary/50'}`}
              >
                <RefreshCw size={24} />
                <span className="text-[10px] uppercase tracking-widest">360° View</span>
              </div>
            </div>
          </div>

          {/* Product Info Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest text-foreground-muted mb-4">Luxe Fragrance</span>
            <h1 className="text-4xl font-serif text-foreground mb-4">Oud Supreme Extraordinaire</h1>
            <p className="text-2xl font-serif text-primary mb-8">${totalPrice.toFixed(2)}</p>
            
            <div className="prose prose-sm text-foreground-muted mb-8 max-w-none">
              <p>
                An olfactory masterpiece that bridges tradition and modernity. 
                Sourced from the rarest agarwood, this majestic scent opens with luminous notes of saffron 
                and rose, settling into a deep, resonant base of pure oud, amber, and rich vanilla. 
              </p>
            </div>

            {/* Packaging Selection */}
            <div className="mb-10">
              <div className="flex justify-between items-baseline mb-4">
                <h4 className="text-sm font-medium uppercase tracking-widest text-foreground">Packaging Options</h4>
                {giftWrapping === 'premium' && (
                  <span className="text-xs font-medium text-primary">+$25.00</span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WRAPPING_OPTIONS.map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => setGiftWrapping(opt.id as 'standard' | 'premium')}
                    className={`relative border p-4 cursor-pointer transition-all ${giftWrapping === opt.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                  >
                    <div className="aspect-[4/3] bg-background mb-4 overflow-hidden border border-border/50">
                      <SafeImage src={opt.image} alt={opt.name} containerClassName="w-full h-full" imageClassName={`transition-transform duration-700 ${giftWrapping === opt.id ? 'scale-105' : 'hover:scale-105'}`} />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-serif text-sm text-foreground mb-1">{opt.name}</h5>
                        <p className="text-[10px] uppercase tracking-wider text-foreground-muted leading-tight max-w-[80%]">{opt.desc}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex flex-col items-center justify-center shrink-0 mt-0.5 transition-colors ${giftWrapping === opt.id ? 'border-primary' : 'border-border'}`}>
                        {giftWrapping === opt.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-12 border-y border-border py-6">
              <div className="flex items-center border border-border shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-background transition-colors text-lg"
                >-</button>
                <span className="w-12 text-center font-serif text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-background transition-colors text-lg"
                >+</button>
              </div>

              <button onClick={() => setCurrentView('checkout')} className="flex-1 min-w-[140px] bg-primary text-white py-4 uppercase tracking-widest text-xs sm:text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <button 
                onClick={() => toggleWishlist(productId)}
                className={`w-14 h-14 border border-border flex items-center justify-center hover:border-primary transition-colors shrink-0 ${
                  wishlist.includes(productId) ? 'bg-primary text-white border-primary' : 'bg-transparent text-foreground'
                }`}
                title="Add to Wishlist"
              >
                <Heart size={20} className={wishlist.includes(productId) ? 'fill-current' : ''} />
              </button>

              <button 
                onClick={handleShareClick}
                className={`w-14 h-14 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all shrink-0 ${
                  showShareOptions ? 'bg-primary text-white border-primary' : 'bg-transparent text-foreground'
                }`}
                title="Share Product"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Share options panel */}
            {showShareOptions && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 p-5 border border-primary/25 bg-primary/5 rounded-none flex flex-col gap-4"
              >
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-xs uppercase tracking-widest font-semibold text-foreground">Share Product</span>
                  <button onClick={() => setShowShareOptions(false)} className="text-[10px] uppercase tracking-wider text-foreground-muted hover:text-foreground">
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <button 
                    onClick={copyToClipboard}
                    className="flex flex-col items-center justify-center gap-2 bg-background border border-border p-4 hover:border-primary hover:text-primary transition-all group"
                  >
                    {copied ? (
                      <Check size={18} className="text-primary animate-scale" />
                    ) : (
                      <Copy size={18} className="text-foreground group-hover:text-primary transition-colors" />
                    )}
                    <span className="text-[10px] uppercase tracking-widest font-medium">
                      {copied ? 'Copied' : 'Copy Link'}
                    </span>
                  </button>
                  
                  <a 
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Take a look at Oud Supreme Extraordinaire: An olfactory masterpiece sourced from the rarest agarwood. " + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 bg-background border border-border p-4 hover:border-primary hover:text-primary transition-all group"
                  >
                    <ExternalLink size={18} className="text-foreground group-hover:text-primary transition-colors" />
                    <span className="text-[10px] uppercase tracking-widest font-medium">WhatsApp</span>
                  </a>

                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Take a look at Oud Supreme Extraordinaire: An olfactory masterpiece sourced from the rarest agarwood. ")}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 bg-background border border-border p-4 hover:border-primary hover:text-primary transition-all group"
                  >
                    <ExternalLink size={18} className="text-foreground group-hover:text-primary transition-colors" />
                    <span className="text-[10px] uppercase tracking-widest font-medium">Twitter / X</span>
                  </a>

                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 bg-background border border-border p-4 hover:border-primary hover:text-primary transition-all group"
                  >
                    <ExternalLink size={18} className="text-foreground group-hover:text-primary transition-colors" />
                    <span className="text-[10px] uppercase tracking-widest font-medium">Facebook</span>
                  </a>
                </div>
              </motion.div>
            )}

            {/* Accordion Tabs */}
            <div className="space-y-4">
              {['description', 'specifications', 'shipping'].map((tab) => (
                <div key={tab} className="border border-border">
                  <button 
                    onClick={() => setActiveTab(activeTab === tab ? '' : tab)}
                    className="w-full flex items-center justify-between p-4 bg-background uppercase tracking-widest text-xs font-medium"
                  >
                    {tab}
                    <ArrowRight size={14} className={`transition-transform ${activeTab === tab ? 'rotate-90' : ''}`} />
                  </button>
                  {activeTab === tab && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="p-4 pt-0 text-sm text-foreground-muted bg-background leading-relaxed"
                    >
                      {tab === 'description' && "Hand-poured into a crystal flacon adorned with 24-karat gold detailing. Includes a personalized silk ribbon and our signature midnight-blue presentation box."}
                      {tab === 'specifications' && "Volume: 100ml / 3.4oz. Concentration: Extrait de Parfum. Origin: Grasse, France. Sustainable ingredients."}
                      {tab === 'shipping' && "Complimentary expedited shipping on all orders. Next-day delivery available in select metropolitan areas. Signature required upon delivery."}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
