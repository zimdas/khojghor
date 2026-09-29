import React from 'react';
import { useStore } from '../../context/StoreContext';
import { HeroSection } from './HeroSection';
import { TrendingSection } from './TrendingSection';
import { CategorySection } from './CategorySection';
import { NewsletterSection } from './NewsletterSection';
import { VideoCard } from '../videos/VideoCard';
import { ToolCard } from '../tools/ToolCard';
import { ArticleCard } from '../article/ArticleCard';
import { AdSlot } from '../common/AdSlot';
import { ArrowRight, Video, Wrench, BookOpen } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { articles, videos, tools, homepageConfig, navigateTo, language, t } = useStore();

  const publishedArticles = articles.filter(a => a.status === 'published');
  const publishedVideos = videos.filter(v => v.status === 'published');
  const popularTools = tools.filter(t => t.featured || t.rating >= 4.8).slice(0, 6);
  const featuredVideos = publishedVideos.slice(0, 3);
  const latestArticlesList = publishedArticles.slice(0, 6);

  // Group articles by category
  const articlesByCategory: Record<string, typeof articles> = {
    ai: publishedArticles.filter(a => a.category === 'ai'),
    tech: publishedArticles.filter(a => a.category === 'tech'),
    earn: publishedArticles.filter(a => a.category === 'earn'),
    'make-build': publishedArticles.filter(a => a.category === 'make-build'),
    student: publishedArticles.filter(a => a.category === 'student'),
    trading: publishedArticles.filter(a => a.category === 'trading'),
    trends: publishedArticles.filter(a => a.category === 'trends'),
    'it-news': publishedArticles.filter(a => a.category === 'it-news')
  };

  // Default section definitions if homepageConfig is not customized
  const defaultSections = [
    { id: 'sec_ai', categorySlug: 'ai', titleBn: t('sectionAiTitle'), titleEn: 'Artificial Intelligence (Latest AI)', descriptionBn: t('sectionAiDesc'), descriptionEn: 'State-of-the-art AI models, prompt engineering, and free workflows.', enabled: true, itemCount: 3 },
    { id: 'sec_tech', categorySlug: 'tech', titleBn: t('sectionTechTitle'), titleEn: 'Technology & Solutions (Latest Tech)', descriptionBn: t('sectionTechDesc'), descriptionEn: 'Android, Windows, essential software, and PC speed optimization.', enabled: true, itemCount: 3 },
    { id: 'sec_earn', categorySlug: 'earn', titleBn: t('sectionEarnTitle'), titleEn: 'Earning & Freelancing (Earn & Career)', descriptionBn: t('sectionEarnDesc'), descriptionEn: 'Zero false promises—genuine marketplace workflows and real skills.', enabled: true, itemCount: 3 },
    { id: 'sec_make_build', categorySlug: 'make-build', titleBn: t('sectionMakeBuildTitle'), titleEn: 'Make & Build Projects', descriptionBn: t('sectionMakeBuildDesc'), descriptionEn: 'Full-stack development, AI web apps, and automation bots.', enabled: true, itemCount: 3 },
    { id: 'sec_student', categorySlug: 'student', titleBn: t('sectionStudentTitle'), titleEn: 'Student & Education', descriptionBn: t('sectionStudentDesc'), descriptionEn: 'Smart exam preparation, free courses, and study hacks.', enabled: true, itemCount: 3 },
    { id: 'sec_trading', categorySlug: 'trading', titleBn: t('sectionTradingTitle'), titleEn: 'Trading Education & Risk Management', descriptionBn: t('sectionTradingDesc'), descriptionEn: 'Technical chart analysis and mathematical risk management.', enabled: true, itemCount: 3 },
    { id: 'sec_trends', categorySlug: 'trends', titleBn: t('sectionTrendsTitle'), titleEn: 'Trends & Viral Topics', descriptionBn: t('sectionTrendsDesc'), descriptionEn: 'Viral internet movements and creator trends.', enabled: true, itemCount: 3 },
    { id: 'sec_it_news', categorySlug: 'it-news', titleBn: t('sectionItNewsTitle'), titleEn: 'Latest IT & Tech News', descriptionBn: t('sectionItNewsDesc'), descriptionEn: 'Big Tech model releases and major technology news.', enabled: true, itemCount: 3 }
  ];

  const sectionsToRender = (homepageConfig && homepageConfig.length > 0) ? homepageConfig : defaultSections;

  return (
    <div className="space-y-0 bg-stone-50 dark:bg-stone-950 transition-colors">
      
      {/* 1. Hero Section & Featured Content */}
      <HeroSection />

      {/* 2. Trending Now Section */}
      <TrendingSection />

      {/* Top Homepage Banner Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot location="homepage" />
      </div>

      {/* Dynamic Content Sections managed via CMS */}
      {sectionsToRender
        .filter(s => s.enabled)
        .map((sec, idx) => {
          const catArticles = articlesByCategory[sec.categorySlug] || [];
          return (
            <React.Fragment key={sec.id}>
              <CategorySection
                titleBn={sec.titleBn}
                titleEn={sec.titleEn}
                descriptionBn={sec.descriptionBn}
                descriptionEn={sec.descriptionEn}
                categorySlug={sec.categorySlug}
                articles={catArticles}
                limit={sec.itemCount || 3}
              />
              {/* Insert ad slot after 2nd category section */}
              {idx === 1 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <AdSlot location="homepage" />
                </div>
              )}
            </React.Fragment>
          );
        })}

      {/* Trending Videos Section */}
      <section className="py-8 sm:py-12 border-b border-stone-200/60 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                <Video className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ভিডিও গ্যালারি' : 'Video Gallery'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                {t('sectionVideosTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                {t('sectionVideosDesc')}
              </p>
            </div>

            <button
              onClick={() => navigateTo('/videos')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
            >
              <span>{t('viewAll')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-8 sm:py-12 border-b border-stone-200/60 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                <Wrench className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ডিজিটাল ডিরেক্টরি' : 'Digital Directory'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                {t('sectionToolsTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                {t('sectionToolsDesc')}
              </p>
            </div>

            <button
              onClick={() => navigateTo('/tools')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
            >
              <span>{t('viewAll')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Archive */}
      <section id="latest-articles" className="py-8 sm:py-12 border-b border-stone-200/60 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সাম্প্রতিক প্রকাশনা' : 'Latest Publishing'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {t('sectionLatestArticles')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticlesList.map(art => (
              <ArticleCard key={art.id} article={art} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Community Section */}
      <NewsletterSection />

    </div>
  );
};
