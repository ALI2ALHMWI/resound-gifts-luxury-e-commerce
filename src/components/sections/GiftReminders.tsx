import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Calendar, Plus, Trash2, Gift } from 'lucide-react';

interface Reminder {
  id: string;
  name: string;
  date: string;
  occasion: string;
}

export default function GiftReminders() {
  const { t } = useAppContext();
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', name: 'Mom', date: '2026-08-15', occasion: 'Birthday' },
    { id: '2', name: 'Sarah & John', date: '2026-09-22', occasion: 'Anniversary' }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newReminder, setNewReminder] = useState({ name: '', date: '', occasion: 'Birthday' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminder.name || !newReminder.date) return;
    
    setReminders([...reminders, { ...newReminder, id: Date.now().toString() }]);
    setIsAdding(false);
    setNewReminder({ name: '', date: '', occasion: 'Birthday' });
  };

  const removeReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
            <Bell size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            {t('dashboard.reminders.title')}
          </h2>
          <p className="text-foreground-muted text-sm max-w-lg mx-auto">
            {t('dashboard.reminders.subtitle')}
          </p>
        </div>

        <div className="bg-background border border-border p-6 md:p-8">
          <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
            <h3 className="font-serif text-xl flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              Upcoming Events
            </h3>
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-primary hover:text-accent transition-colors"
            >
              {isAdding ? 'Cancel' : <><Plus size={16} /> {t('dashboard.reminders.add')}</>}
            </button>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.form 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-8"
                onSubmit={handleAdd}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-surface/50 p-6 border border-primary/20">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">{t('dashboard.reminders.name')}</label>
                    <input 
                      type="text" 
                      required
                      value={newReminder.name}
                      onChange={e => setNewReminder({...newReminder, name: e.target.value})}
                      className="w-full bg-background border border-border px-4 py-2 outline-none focus:border-primary transition-colors h-11"
                      placeholder="e.g. My Wife"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">{t('dashboard.reminders.date')}</label>
                    <input 
                      type="date" 
                      required
                      value={newReminder.date}
                      onChange={e => setNewReminder({...newReminder, date: e.target.value})}
                      className="w-full bg-background border border-border px-4 py-2 outline-none focus:border-primary transition-colors h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground-muted mb-2">{t('dashboard.reminders.occasion')}</label>
                    <select 
                      value={newReminder.occasion}
                      onChange={e => setNewReminder({...newReminder, occasion: e.target.value})}
                      className="w-full bg-background border border-border px-4 py-2 outline-none focus:border-primary transition-colors h-11"
                    >
                      <option>Birthday</option>
                      <option>Anniversary</option>
                      <option>Mother's Day</option>
                      <option>Valentine's Day</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-3 mt-2">
                    <button type="submit" className="w-full bg-primary text-white py-3 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors">
                      {t('dashboard.reminders.save')}
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {reminders.length === 0 ? (
              <div className="text-center py-8 text-foreground-muted">
                <Gift size={32} className="mx-auto mb-4 opacity-50" />
                <p>No reminders set yet. Add one to get started.</p>
              </div>
            ) : (
              reminders.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(reminder => {
                const dateObj = new Date(reminder.date);
                const month = dateObj.toLocaleString('en-US', { month: 'short' });
                const day = dateObj.getDate();
                const year = dateObj.getFullYear();
                
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={reminder.id} 
                    className="flex items-center justify-between p-4 border border-border hover:border-primary/50 transition-colors bg-surface group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-background flex flex-col items-center justify-center border border-border whitespace-nowrap overflow-hidden">
                        <span className="text-xs uppercase tracking-widest text-primary rtl:tracking-normal">{month}</span>
                        <span className="text-xl font-serif leading-none mt-1">{day}</span>
                      </div>
                      <div>
                        <h4 className="font-serif text-lg">{reminder.name}</h4>
                        <span className="text-sm text-foreground-muted flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary/40 inline-block" />
                          {reminder.occasion} &bull; {year}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeReminder(reminder.id)}
                      className="text-foreground-muted hover:text-error opacity-0 group-hover:opacity-100 transition-all p-2"
                      title="Remove reminder"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
