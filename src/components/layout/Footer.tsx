import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function Footer() {
  const { t, setCurrentView, setIsTrackingOpen, language } = useAppContext();

  return (
    <footer className="bg-foreground text-background pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }} className="font-serif inline-block flex flex-col items-start">
              <span className="text-2xl font-bold tracking-widest uppercase text-primary">
                Res<span className="text-accent">♡</span>und
              </span>
              <span className="text-lg font-bold tracking-[0.2em] -mt-1 text-primary">
                Gifts
              </span>
            </a>
            <p className="text-background/70 text-sm leading-relaxed max-w-xs">
              Curating luxury floral arrangements, exclusive perfumes, and elegant gift experiences for those special moments that deserve to be remembered.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-lg font-serif mb-6 text-white">{t('footer.links')}</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('catalog'); }} className="hover:text-primary transition-colors">Shop Flowers</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('catalog'); }} className="hover:text-primary transition-colors">Luxury Perfumes</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('catalog'); }} className="hover:text-primary transition-colors">Gift Sets</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('builder'); }} className="hover:text-primary transition-colors">{t('nav.build')}</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-lg font-serif mb-6 text-white">{language === 'ar' ? 'العناية بالعملاء' : 'Customer Care'}</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setIsTrackingOpen(true); }} className="hover:text-primary transition-colors">{language === 'ar' ? 'تتبع طلبك' : 'Track Order'}</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">{language === 'ar' ? 'معلومات التوصيل' : 'Delivery Information'}</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">Returns & Refunds</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif mb-6 text-white">Newsletter</h4>
            <p className="text-background/70 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex border-b border-background/30 pb-2 focus-within:border-primary transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder:text-background/50"
              />
              <button type="submit" className="text-primary text-sm uppercase tracking-widest hover:text-white transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/50">
            &copy; {new Date().getFullYear()} Resound Gifts. All rights reserved.
          </p>
          <div className="flex gap-4 text-background/50 text-xs">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
