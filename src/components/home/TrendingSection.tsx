import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Flame } from 'lucide-react';

export const TrendingSection: React.FC = () => {
  const { articles, navigateTo, language, t } = useStore();

  const trendingItems = articles.filter(a => a.isTrending || a.views > 9000).slice(0, 4);

  if (trendingItems.length === 0) return null;

  return (
    <div className="bg-stone-100/70 dark:bg-stone-900/60 border-y border-stone-200/80 dark:border-stone-800 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
          
          <div className="flex items-center gap-2 shrink-0 text-amber-600 dark:text-amber-500 font-bold text-xs uppercase tracking-wider">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>{t('trendingNow')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
            {trendingItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => navigateTo(`/article/${item.slug}`)}
                className="text-left group flex items-start gap-2 p-1.5 rounded hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
              >
                <span className="font-mono text-xs font-bold text-stone-400 shrink-0 mt-0.5">
                  0{idx + 1}.
                </span>
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-emerald-600 line-clamp-1">
                  {language === 'en' && item.titleEn ? item.titleEn : item.titleBn}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
