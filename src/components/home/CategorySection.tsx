import React from 'react';
import { Article } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ArticleCard } from '../article/ArticleCard';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  titleBn: string;
  titleEn?: string;
  descriptionBn: string;
  descriptionEn?: string;
  categorySlug: string;
  articles: Article[];
  limit?: number;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  titleBn,
  titleEn,
  descriptionBn,
  descriptionEn,
  categorySlug,
  articles,
  limit = 3
}) => {
  const { navigateTo, language, t } = useStore();

  const displayArticles = articles.filter(a => a.status === 'published').slice(0, limit);

  if (displayArticles.length === 0) return null;

  const displayTitle = language === 'en' && titleEn ? titleEn : titleBn;
  const displayDesc = language === 'en' && descriptionEn ? descriptionEn : descriptionBn;

  return (
    <section className="py-8 sm:py-12 border-b border-stone-200/60 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {displayTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              {displayDesc}
            </p>
          </div>

          <button
            onClick={() => navigateTo(`/${categorySlug}`)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors shrink-0"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayArticles.map(article => (
            <ArticleCard key={article.id} article={article} variant="standard" />
          ))}
        </div>

      </div>
    </section>
  );
};
