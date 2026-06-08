import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Check, CreditCard, Gift, MapPin, User, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';
import SafeImage from '../ui/SafeImage';

const steps = [
  { id: 1, title: 'Customer', icon: User },
  { id: 2, title: 'Delivery', icon: MapPin },
  { id: 3, title: 'Gift Options', icon: Gift },
  { id: 4, title: 'Payment', icon: CreditCard },
];

export default function CheckoutDemo() {
  const { t, setCurrentView, setIsTrackingOpen, setTrackingOrderId } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGift, setIsGift] = useState(false);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h3 className="font-serif text-2xl mb-6">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">First Name</label>
                <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Enter first name" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">Last Name</label>
                <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Enter last name" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">Email Address</label>
                <input type="email" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Enter email address" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">Phone Number</label>
                <input type="tel" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Enter phone number" />
              </div>
            </div>
            <button onClick={() => setCurrentStep(2)} className="w-full bg-primary text-white py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors mt-8">
              Continue to Delivery
            </button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h3 className="font-serif text-2xl mb-6">Delivery Information</h3>
            
            <div className="flex gap-4 mb-8">
              <label className={`flex-1 border p-4 cursor-pointer transition-colors ${!isGift ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <input type="radio" name="delivery_type" className="hidden" checked={!isGift} onChange={() => setIsGift(false)} />
                <span className="block font-medium mb-1">Send to Myself</span>
                <span className="text-xs text-foreground-muted">Deliver to my address</span>
              </label>
              <label className={`flex-1 border p-4 cursor-pointer transition-colors ${isGift ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <input type="radio" name="delivery_type" className="hidden" checked={isGift} onChange={() => setIsGift(true)} />
                <span className="block font-medium mb-1">Send as a Gift</span>
                <span className="text-xs text-foreground-muted">Deliver to someone else</span>
              </label>
            </div>

            <div className="space-y-6">
              {isGift && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">Recipient Name</label>
                  <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Enter recipient's name" />
                </div>
              )}
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">Delivery Address</label>
                <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors mb-4" placeholder="Street address, P.O. box, etc." />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="City" />
                  <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="ZIP / Postal Code" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">Delivery Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                  <input type="date" className="w-full bg-background border border-border pl-12 pr-4 py-3 outline-none focus:border-primary transition-colors uppercase tracking-wider text-sm" />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setCurrentStep(1)} className="w-1/3 border border-border text-foreground py-4 uppercase tracking-widest text-sm hover:bg-background transition-colors">
                Back
              </button>
              <button onClick={() => setCurrentStep(3)} className="w-2/3 bg-primary text-white py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors">
                Continue to Gift Options
              </button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h3 className="font-serif text-2xl mb-6">Gift Options</h3>

            <div className="space-y-4">
              <label className="flex items-start gap-4 p-4 border border-border cursor-pointer hover:border-primary/50 transition-colors bg-surface">
                <div className="mt-1">
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                </div>
                <div>
                  <span className="block font-medium mb-1">Add a Greeting Card</span>
                  <span className="text-sm text-foreground-muted block mb-4">Choose from our premium selection of handwritten cards.</span>
                  <textarea className="w-full bg-background border border-border p-3 outline-none focus:border-primary transition-colors text-sm" rows={3} placeholder="Write your personal message here..."></textarea>
                </div>
              </label>

              <label className="flex items-center gap-4 p-4 border border-border cursor-pointer hover:border-primary/50 transition-colors bg-surface">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <div>
                  <span className="block font-medium">Hide Prices from Receipt</span>
                  <span className="text-sm text-foreground-muted">Prices will not be visible on the packing slip.</span>
                </div>
              </label>
              
              <label className="flex items-center gap-4 p-4 border border-border cursor-pointer hover:border-primary/50 transition-colors bg-surface">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <div>
                  <span className="block font-medium">Premium Gift Wrapping (+$25)</span>
                  <span className="text-sm text-foreground-muted">Wrapped in our signature silk ribbon and luxurious paper.</span>
                </div>
              </label>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setCurrentStep(2)} className="w-1/3 border border-border text-foreground py-4 uppercase tracking-widest text-sm hover:bg-background transition-colors">
                Back
              </button>
              <button onClick={() => setCurrentStep(4)} className="w-2/3 bg-primary text-white py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors">
                Continue to Payment
              </button>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h3 className="font-serif text-2xl mb-6">Payment Method</h3>

            <div className="space-y-4 mb-8">
              <label className="flex items-center justify-between p-4 border border-primary bg-primary/5 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" defaultChecked className="accent-primary" />
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                </div>
              </label>

              <div className="p-4 border border-border bg-surface border-t-0 -mt-4 pt-6 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">Card Number</label>
                  <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors tracking-widest" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">Expiry Date</label>
                    <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">CVC</label>
                    <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="123" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">Name on Card</label>
                  <input type="text" className="w-full bg-background border border-border px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                </div>
              </div>

              <label className="flex items-center justify-between p-4 border border-border hover:border-primary/50 cursor-pointer bg-surface">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" className="accent-primary" />
                  <span className="font-medium">Apple Pay</span>
                </div>
              </label>
              
              <label className="flex items-center justify-between p-4 border border-border hover:border-primary/50 cursor-pointer bg-surface">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" className="accent-primary" />
                  <span className="font-medium">Cash on Delivery</span>
                </div>
              </label>
            </div>

            <div className="flex items-start gap-3 text-sm text-foreground-muted bg-surface p-4 border border-border mb-8">
              <ShieldCheck size={20} className="text-primary shrink-0" />
              <p>Your payment information is encrypted and secure. We never store your full credit card details.</p>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setCurrentStep(3)} className="w-1/3 border border-border text-foreground py-4 uppercase tracking-widest text-sm hover:bg-background transition-colors">
                Back
              </button>
              <button onClick={() => setCurrentStep(5)} className="w-2/3 bg-foreground text-background py-4 uppercase tracking-widest text-sm hover:bg-primary transition-colors flex justify-center items-center gap-2">
                Place Order <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-primary" />
            </div>
            <h3 className="font-serif text-3xl">Order Confirmed</h3>
            <p className="text-foreground-muted max-w-sm mx-auto">
              Thank you for your purchase. Your order <span className="font-medium text-foreground">#RES-89234</span> has been received and is being processed.
            </p>
            <div className="pt-8 flex flex-col items-center gap-4">
              <button 
                onClick={() => { 
                  setTrackingOrderId('RES-89234');
                  setIsTrackingOpen(true);
                  setCurrentView('home');
                }} 
                className="bg-primary text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors w-full max-w-xs"
              >
                Track Order
              </button>
              <button onClick={() => { setCurrentStep(1); setCurrentView('catalog'); }} className="text-primary text-sm uppercase tracking-widest hover:text-accent transition-colors">
                Continue Shopping
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Secure Checkout</h2>
          <div className="w-16 h-[2px] bg-primary mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Main Checkout Area */}
          <div className="w-full lg:w-2/3">
            
            {/* Step Indicators */}
            {currentStep < 5 && (
              <div className="flex items-center justify-between mb-12 relative">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-border -z-10"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-primary -z-10 transition-all duration-500" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>

                {steps.map((step) => {
                  const isActive = step.id === currentStep;
                  const isCompleted = step.id < currentStep;
                  const Icon = step.icon;

                  return (
                    <div key={step.id} className="flex flex-col items-center bg-background px-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isActive ? 'border-primary bg-primary text-white' : isCompleted ? 'border-primary bg-background text-primary' : 'border-border bg-background text-foreground-muted'}`}>
                        {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                      </div>
                      <span className={`text-[10px] uppercase tracking-widest mt-2 hidden sm:block ${isActive ? 'text-primary font-medium' : 'text-foreground-muted'}`}>{step.title}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step Content */}
            <div className="bg-surface border border-border p-6 md:p-10">
              <AnimatePresence mode="wait">
                <div key={currentStep}>
                  {renderStepContent()}
                </div>
              </AnimatePresence>
            </div>
            
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-surface border border-border p-6 md:p-8 sticky top-24">
              <h3 className="font-serif text-xl mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="w-20 h-24 shrink-0 overflow-hidden">
                    <SafeImage src="/src/assets/images/luxury_perfumes_1780873697555.png" alt="Oud Supreme" containerClassName="w-full h-full border border-border" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-lg leading-tight mb-1">Oud Supreme Extraordinaire</h4>
                    <span className="text-xs text-foreground-muted uppercase tracking-widest block mb-2">Qty: 1</span>
                    <span className="font-medium">$320.00</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-20 h-24 shrink-0 overflow-hidden">
                    <SafeImage src="/src/assets/images/luxury_flowers_1780873684175.png" alt="Velvet Rose" containerClassName="w-full h-full border border-border" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-lg leading-tight mb-1">Velvet Rose Bouquet</h4>
                    <span className="text-xs text-foreground-muted uppercase tracking-widest block mb-2">Qty: 1</span>
                    <span className="font-medium">$150.00</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 mb-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Subtotal</span>
                  <span>$470.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Gift Options</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-serif text-xl">Total</span>
                  <span className="font-serif text-xl text-primary">$470.00</span>
                </div>
                <span className="text-xs text-foreground-muted">Includes taxes and duties</span>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-foreground-muted uppercase tracking-widest">
                <ShieldCheck size={14} className="text-primary" /> Secure Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
