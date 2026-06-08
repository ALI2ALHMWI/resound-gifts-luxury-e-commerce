import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Flower, Droplet, Package, Edit3, Check } from 'lucide-react';

const steps = [
  { id: 1, key: 'builder.step1', icon: Flower },
  { id: 2, key: 'builder.step2', icon: Droplet },
  { id: 3, key: 'builder.step3', icon: Gift },
  { id: 4, key: 'builder.step4', icon: Package },
  { id: 5, key: 'builder.step5', icon: Edit3 },
];

export default function GiftBuilder() {
  const { t, language, setCurrentView } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Decorative floral accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Graphic / Preview Area */}
          <div className="w-full lg:w-1/2 relative h-[500px]">
            <motion.div 
              className="absolute inset-0 bg-surface shadow-2xl p-8 border border-border flex flex-col justify-center items-center text-center z-10"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-full border border-dashed border-primary/40 flex flex-col items-center justify-center bg-background/50 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-primary"
                  >
                    {React.createElement(steps[currentStep-1].icon, { size: 64, strokeWidth: 1 })}
                    <h3 className="text-xl font-serif mt-6 text-foreground">
                      {t(steps[currentStep-1].key)}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Background decorative box */}
            <div className="absolute top-8 left-8 w-full h-full border border-primary/20 z-0" />
          </div>

          {/* Steps & Content Area */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm text-primary tracking-widest uppercase mb-4">{t('nav.build')}</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
              A Personal Touch To Your Luxury Gift
            </h3>
            
            <div className="space-y-6">
              {steps.map((step) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                
                return (
                  <div 
                    key={step.id} 
                    className="flex items-start gap-4 cursor-pointer"
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                      isActive ? 'bg-primary border-primary text-white' : 
                      isCompleted ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-gray-300 text-gray-400'
                    }`}>
                      {isCompleted ? <Check size={16} /> : <span className="text-xs">{step.id}</span>}
                    </div>
                    <div>
                      <h4 className={`text-lg font-medium transition-colors duration-300 ${
                        isActive ? 'text-primary font-serif' : 'text-foreground'
                      }`}>
                        {t(step.key)}
                      </h4>
                      {isActive && (
                        <motion.p 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="text-foreground-muted text-sm mt-2"
                        >
                          Select from our exclusive collection to begin creating your personalized luxury experience. Each item is hand-picked for perfection.
                        </motion.p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            
            <button onClick={() => {
              if (currentStep < 5) setCurrentStep(currentStep + 1);
              else setCurrentView('checkout');
            }} className="mt-12 bg-foreground text-background px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary transition-colors duration-300">
              {currentStep < 5 ? 'Next Step' : 'Finish & Checkout'}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
