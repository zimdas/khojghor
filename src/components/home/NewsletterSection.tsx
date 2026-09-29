import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { subscribeNewsletter, t } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      const res = await subscribeNewsletter(email);
      if (res.ok) {
        setIsSubscribed(true);
        setEmail('');
      }
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>KhojGhor Digest</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t('newsletterTitle')}
          </h2>

          <p className="text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
            {t('newsletterDesc')}
          </p>

          {isSubscribed ? (
            <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 flex items-center justify-center gap-2 text-sm max-w-md mx-auto">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{t('newsletterSuccess')}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('newsletterPlaceholder')}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-lg bg-stone-800 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:border-emerald-500 text-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>{t('newsletterButton')}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-stone-400">
            <span>{t('newsletterPerks')}</span>
          </div>

        </div>
      </div>
    </section>
  );
};
