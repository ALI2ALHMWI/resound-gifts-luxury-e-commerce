import React from 'react';
import { ShoppingBag, Search, User, Menu, Moon, Sun, Globe, Heart, Truck } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Navbar() {
  const { language, setLanguage, theme, setTheme, t, wishlist, setCurrentView, setIsTrackingOpen } = useAppContext();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex flex-1 items-center">
            <button className={`${isScrolled ? 'text-foreground' : 'text-white'} hover:text-primary transition-colors`}>
              <Menu size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }} className="font-serif group text-center flex flex-col items-center">
              <span className={`text-2xl md:text-3xl font-bold tracking-widest uppercase transition-colors ${
                isScrolled ? 'text-primary' : 'text-primary' // Always primary or adapt? 
              }`}>
                Res<span className="text-accent inline-block group-hover:scale-110 transition-transform">♡</span>und
              </span>
              <span className={`text-lg md:text-xl font-bold tracking-[0.2em] -mt-1 transition-colors ${
                isScrolled ? 'text-primary' : 'text-primary'
              }`}>
                Gifts
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center space-x-8 rtl:space-x-reverse items-center">
            {['nav.home', 'nav.flowers', 'nav.perfumes', 'nav.gifts'].map((key) => {
              const handleNavClick = (e: React.MouseEvent) => {
                e.preventDefault();
                if (key === 'nav.home') setCurrentView('home');
                else setCurrentView('catalog'); // for now we just go to catalog
              };
              return (
                <a key={key} href="#" onClick={handleNavClick} className={`text-sm tracking-wide uppercase transition-colors hover:text-primary ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  {t(key)}
                </a>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-1 justify-end items-center space-x-4 rtl:space-x-reverse">
            <button 
              onClick={() => setIsTrackingOpen(true)}
              className={`hover:text-primary hover:border-primary transition-colors flex items-center gap-1.5 text-xs uppercase font-serif tracking-[0.1em] border border-[#C5A059]/40 px-2.5 py-1.5 font-medium ${isScrolled ? 'text-foreground hover:bg-surface' : 'text-white hover:bg-white/10'}`}
              title={language === 'ar' ? 'تتبع طلبك' : 'Track Order'}
            >
              <Truck size={14} className="text-[#C5A059]" />
              <span className="hidden leading-none sm:inline">{language === 'ar' ? 'تتبع الطلب' : 'Track Order'}</span>
            </button>
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className={`flex items-center gap-1 text-xs uppercase hover:text-primary transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              <Globe size={16} />
              <span className="hidden sm:inline">{language === 'en' ? 'عربي' : 'EN'}</span>
            </button>
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`hover:text-primary transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className={`hover:text-primary transition-colors hidden sm:block ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              <Search size={20} />
            </button>
            <button className={`hover:text-primary transition-colors hidden sm:block relative ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button className={`hover:text-primary transition-colors hidden sm:block ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              <User size={20} />
            </button>
            <button onClick={() => setCurrentView('checkout')} className={`hover:text-primary transition-colors relative ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
