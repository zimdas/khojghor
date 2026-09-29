import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArticleCard } from '../article/ArticleCard';
import { ArrowRight, Wrench, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo, articles, language, t } = useStore();

  const featuredLead = articles.find(a => a.isFeatured && a.category === 'ai') || articles[0];
  const secondaryLead1 = articles.find(a => a.isFeatured && a.category === 'earn') || articles[1];
  const secondaryLead2 = articles.find(a => a.isFeatured && a.category === 'make-build') || articles[2];

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 bg-white dark:bg-stone-900 border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Brand Banner Concept & CTAs */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>{t('heroBadge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 dark:text-stone-100 text-balance leading-tight">
            {t('heroHeadline')}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto font-sans">
            {t('heroDescription')}
          </p>

          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => {
                const el = document.getElementById('latest-articles');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>{t('heroCtaLatest')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('/tools')}
              className="px-5 py-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-medium text-sm transition-colors border border-stone-200 dark:border-stone-700 flex items-center gap-1.5"
            >
              <Wrench className="w-4 h-4 text-emerald-600" />
              <span>{t('heroCtaTools')}</span>
            </button>
          </div>
        </div>

        {/* Hero Editorial Bento: 1 Primary Anchor + 2 Secondary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Dominant Primary Focal Anchor (7 Cols) */}
          <div className="lg:col-span-7">
            {featuredLead && <ArticleCard article={featuredLead} variant="featured" />}
          </div>

          {/* Secondary Stack (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {secondaryLead1 && <ArticleCard article={secondaryLead1} variant="horizontal" />}
            {secondaryLead2 && <ArticleCard article={secondaryLead2} variant="horizontal" />}
            
            {/* Quick Discover Strip */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800/90 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {language === 'bn' ? '২০২৬ সালের ডিজিটাল টুলস কালেকশন' : '2026 Digital Tools Directory'}
                </span>
                <p className="text-[11px] text-stone-500">
                  {language === 'bn' ? '২০+ বিনামূল্যে ব্যবহারযোগ্য সফটওয়্যার ও এআই' : '20+ Free-to-use software and AI platforms'}
                </p>
              </div>
              <button
                onClick={() => navigateTo('/tools')}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
              >
                <span>{language === 'bn' ? 'দেখুন' : 'Explore'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
