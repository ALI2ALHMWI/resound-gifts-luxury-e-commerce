import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Filter, ChevronDown, Check, X } from 'lucide-react';
import SafeImage from '../ui/SafeImage';
import { ProductCardSkeleton } from '../ui/ProductCardSkeleton';

const DUMMY_PRODUCTS = [
  { id: 101, name: "Velvet Rose Bouquet", price: 150, category: "Flowers", brand: "Resound", occasion: "Anniversary", image: "/src/assets/images/luxury_flowers_1780873684175.png" },
  { id: 102, name: "Oud Supreme 100ml", price: 320, category: "Perfumes", brand: "Luxe Fragrance", occasion: "Birthday", image: "/src/assets/images/luxury_perfumes_1780873697555.png" },
  { id: 103, name: "Elegance Gift Set", price: 450, category: "Gift Sets", brand: "Resound", occasion: "Wedding", image: "/src/assets/images/luxury_gifts_1780873711033.png" },
  { id: 104, name: "White Peony Box", price: 180, category: "Flowers", brand: "Resound", occasion: "Birthday", image: "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?q=80&w=800&auto=format&fit=crop" },
  { id: 105, name: "Floral Symphony", price: 210, category: "Flowers", brand: "Resound", occasion: "Valentine's Day", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop" },
  { id: 106, name: "Midnight Musk 50ml", price: 190, category: "Perfumes", brand: "Aroma Boutique", occasion: "Anniversary", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop" },
  { id: 107, name: "Luxury Watch Box", price: 850, category: "Luxury Gifts", brand: "Timepiece", occasion: "Wedding", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop" },
  { id: 108, name: "Classic Macaron Set", price: 85, category: "Gift Sets", brand: "Sweet Treats", occasion: "Birthday", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop" },
];

const CATEGORIES = ["Flowers", "Perfumes", "Luxury Gifts", "Gift Sets"];
const OCCASIONS = ["Birthday", "Anniversary", "Wedding", "Valentine"];
const BRANDS = ["Resound", "Luxe Fragrance", "Aroma Boutique", "Timepiece", "Sweet Treats"];
const SORTS = ["newest", "popular", "price_low", "price_high"];

export default function Catalog() {
  const { t, wishlist, toggleWishlist, setCurrentView } = useAppContext();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    occasion: true,
    brand: false
  });

  // Simulate network loading when filters change
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedCategories, selectedOccasions, selectedBrands, priceRange, sortBy]);

  const toggleFilter = (type: 'category' | 'occasion' | 'brand', value: string) => {
    let current, set;
    if (type === 'category') { current = selectedCategories; set = setSelectedCategories; }
    else if (type === 'occasion') { current = selectedOccasions; set = setSelectedOccasions; }
    else { current = selectedBrands; set = setSelectedBrands; }

    set(current.includes(value) ? current.filter(v => v !== value) : [...current, value]);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedOccasions([]);
    setSelectedBrands([]);
    setPriceRange([0, 1000]);
  };

  const filteredProducts = DUMMY_PRODUCTS.filter(p => {
    if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
    if (selectedOccasions.length && !selectedOccasions.includes(p.occasion)) return false;
    if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    return 0; // "newest" / "popular" placeholder (since dummy data doesn't have dates)
  });

  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`w-full ${!isMobile ? 'pr-8 rtl:pl-8 rtl:pr-0 border-r rtl:border-l rtl:border-r-0 border-border dark:border-white/10' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif text-xl">{isMobile ? t('filter.apply') : 'Filters'}</h3>
        {(selectedCategories.length > 0 || selectedOccasions.length > 0 || selectedBrands.length > 0) && (
          <button onClick={clearFilters} className="text-sm text-primary hover:text-accent transition-colors">
            {t('filter.clear')}
          </button>
        )}
        {isMobile && (
          <button onClick={() => setIsMobileFilterOpen(false)} className="p-2">
            <X size={24} />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="py-4 border-t border-border dark:border-white/10">
        <button 
          className="flex justify-between items-center w-full text-left"
          onClick={() => toggleSection('category')}
        >
          <span className="font-medium">{t('filter.category')}</span>
          <ChevronDown size={18} className={`transition-transform ${expandedSections.category ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {expandedSections.category && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 flex items-center justify-center border transition-colors ${selectedCategories.includes(cat) ? 'bg-primary border-primary text-white' : 'border-gray-300 group-hover:border-primary'}`}>
                      {selectedCategories.includes(cat) && <Check size={14} />}
                    </div>
                    <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price */}
      <div className="py-4 border-t border-border dark:border-white/10">
        <button 
          className="flex justify-between items-center w-full text-left"
          onClick={() => toggleSection('price')}
        >
          <span className="font-medium">{t('filter.price')}</span>
          <ChevronDown size={18} className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {expandedSections.price && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 pb-2 px-1">
                <input 
                  type="range" 
                  min="0" max="1000" step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-4 text-sm text-foreground-muted">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Occasions */}
      <div className="py-4 border-t border-border dark:border-white/10">
        <button 
          className="flex justify-between items-center w-full text-left"
          onClick={() => toggleSection('occasion')}
        >
          <span className="font-medium">{t('filter.occasion')}</span>
          <ChevronDown size={18} className={`transition-transform ${expandedSections.occasion ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {expandedSections.occasion && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3">
                {OCCASIONS.map(occ => (
                  <label key={occ} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 flex items-center justify-center border transition-colors ${selectedOccasions.includes(occ) ? 'bg-primary border-primary text-white' : 'border-gray-300 group-hover:border-primary'}`}>
                      {selectedOccasions.includes(occ) && <Check size={14} />}
                    </div>
                    <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">{occ}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brands */}
      <div className="py-4 border-y border-border dark:border-white/10">
        <button 
          className="flex justify-between items-center w-full text-left"
          onClick={() => toggleSection('brand')}
        >
          <span className="font-medium">{t('filter.brand')}</span>
          <ChevronDown size={18} className={`transition-transform ${expandedSections.brand ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {expandedSections.brand && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3">
                {BRANDS.map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 flex items-center justify-center border transition-colors ${selectedBrands.includes(brand) ? 'bg-primary border-primary text-white' : 'border-gray-300 group-hover:border-primary'}`}>
                      {selectedBrands.includes(brand) && <Check size={14} />}
                    </div>
                    <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {isMobile && (
        <div className="mt-8">
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full bg-primary text-white py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
          >
            Show {filteredProducts.length} Results
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              {t('catalog.title')}
            </h2>
            <div className="w-16 h-[2px] bg-primary"></div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-4 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end">
            <button 
              className="md:hidden flex items-center gap-2 border border-border px-4 py-2 text-sm uppercase tracking-wider hover:border-primary transition-colors"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <Filter size={16} /> Filters
            </button>
            
            <div className="flex items-center gap-2 border border-border px-4 py-2 hover:border-primary transition-colors cursor-pointer bg-surface">
              <span className="text-sm text-foreground-muted uppercase tracking-wider hidden sm:inline">{t('sort.title')}:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-medium text-foreground cursor-pointer"
              >
                {SORTS.map(sort => (
                  <option key={sort} value={sort} className="text-black">{t(`sort.${sort}`)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-1/4">
            <FilterSidebar />
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-surface">
                <p className="text-foreground-muted mb-4">No products found matching your criteria.</p>
                <button onClick={clearFilters} className="text-primary hover:text-accent underline underline-offset-4">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    onClick={() => setCurrentView('product')}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-surface mb-4">
                      {/* Image */}
                      <SafeImage 
                        src={product.image}
                        alt={product.name}
                        containerClassName="absolute inset-0 z-0"
                        imageClassName="group-hover:scale-105"
                      />
                      
                      {/* Overlay actions */}
                      <div className="absolute inset-0 z-10 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">
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
                        {product.brand}
                      </span>
                      <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-primary font-medium">
                        ${product.price}.00
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-full sm:w-96 bg-background z-50 lg:hidden p-6 overflow-y-auto rtl:right-auto rtl:left-0 rtl:initial-x-[-100%]"
            >
              <FilterSidebar isMobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
