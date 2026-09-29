import React, { useState } from 'react';
import { Article } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Bookmark, Eye } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'compact' | 'standard' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'standard' }) => {
  const { navigateTo, isBookmarked, toggleBookmark, categories, language, t } = useStore();
  const [imageError, setImageError] = useState(false);

  const categoryObj = categories.find(c => c.slug === article.category);
  const categoryName = categoryObj 
    ? (language === 'en' ? categoryObj.nameEn : categoryObj.nameBn)
    : article.category;

  const displayTitle = language === 'en' && article.titleEn ? article.titleEn : article.titleBn;
  const displayExcerpt = language === 'en' && article.excerptEn ? article.excerptEn : article.excerptBn;

  const handleCardClick = () => {
    navigateTo(`/article/${article.slug}`);
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateTo(`/${article.category}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(article.id);
  };

  const bookmarked = isBookmarked(article.id);

  // Variant 1: Featured Hero Card
  if (variant === 'featured') {
    return (
      <div 
        onClick={handleCardClick}
        className="group cursor-pointer relative rounded-xl overflow-hidden bg-stone-900 text-white min-h-[360px] md:min-h-[440px] flex flex-col justify-end p-6 md:p-8 transition-transform hover:-translate-y-0.5 duration-200"
      >
        <div className="absolute inset-0 z-0">
          {!imageError ? (
            <img
              src={article.featuredImage}
              alt={displayTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs text-stone-300">
            <button 
              onClick={handleCategoryClick}
              className="hover:text-emerald-400 font-medium transition-colors"
            >
              {categoryName}
            </button>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMin} {t('minRead')}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono">
              <Eye className="w-3 h-3" />
              {article.views.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors leading-snug max-w-2xl text-balance">
            {displayTitle}
          </h2>

          <p className="text-sm text-stone-300 line-clamp-2 max-w-xl leading-relaxed">
            {displayExcerpt}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-6 h-6 rounded-full object-cover border border-white/20"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs text-stone-300 font-medium">{article.author.name}</span>
            </div>

            <button
              onClick={handleBookmarkClick}
              className="p-1.5 rounded text-stone-400 hover:text-white transition-colors"
              title={bookmarked ? t('bookmarked') : t('bookmarkSave')}
              aria-label="Bookmark article"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Variant 2: Horizontal Card
  if (variant === 'horizontal') {
    return (
      <div 
        onClick={handleCardClick}
        className="group cursor-pointer flex gap-4 p-3 rounded-lg hover:bg-stone-100/70 dark:hover:bg-stone-800/60 transition-colors"
      >
        <div className="w-24 h-20 sm:w-28 sm:h-22 rounded-md overflow-hidden bg-stone-200 dark:bg-stone-800 shrink-0 relative">
          {!imageError ? (
            <img
              src={article.featuredImage}
              alt={displayTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
              KhojGhor
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-medium text-emerald-600 dark:text-emerald-400">{categoryName}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTimeMin} {t('minRead')}</span>
            </div>
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2 transition-colors">
              {displayTitle}
            </h4>
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
            <span>{article.author.name}</span>
            <span className="font-mono">{article.publishedAt}</span>
          </div>
        </div>
      </div>
    );
  }

  // Variant 3: Standard Card
  return (
    <article 
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-md transition-all duration-200"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        {!imageError ? (
          <img
            src={article.featuredImage}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-100 dark:bg-stone-800 text-stone-400 text-xs">
            <span>KhojGhor</span>
          </div>
        )}

        <button
          onClick={handleBookmarkClick}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-stone-900/60 hover:bg-stone-900/90 text-white backdrop-blur-xs transition-colors"
          title={bookmarked ? t('bookmarked') : t('bookmarkSave')}
          aria-label="Bookmark"
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-emerald-400 text-emerald-400' : ''}`} />
        </button>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <button 
              onClick={handleCategoryClick}
              className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline"
            >
              {categoryName}
            </button>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMin} {t('minRead')}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 leading-snug line-clamp-2 transition-colors text-balance">
            {displayTitle}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {displayExcerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-5 h-5 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="text-stone-600 dark:text-stone-300 truncate max-w-[120px]">{article.author.name}</span>
          </div>

          <span className="font-mono text-[11px] text-stone-400">
            {article.publishedAt}
          </span>
        </div>
      </div>
    </article>
  );
};
