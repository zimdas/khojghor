import React, { useState } from 'react';
import { ContentCategory } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ArticleCard } from '../article/ArticleCard';
import { ToolCard } from '../tools/ToolCard';
import { VideoCard } from '../videos/VideoCard';
import { AdSlot } from '../common/AdSlot';
import { AlertTriangle, ShieldCheck, Sparkles, Filter } from 'lucide-react';

interface CategoryListingViewProps {
  categorySlug: ContentCategory | string;
  subcategorySlug?: string;
}

export const CategoryListingView: React.FC<CategoryListingViewProps> = ({
  categorySlug,
  subcategorySlug
}) => {
  const { categories, articles, tools, videos, navigateTo } = useStore();
  const [activeSubcategory, setActiveSubcategory] = useState<string>(subcategorySlug || 'all');

  const category = categories.find(c => c.slug === categorySlug);

  const categoryArticles = articles.filter(a => {
    if (a.category !== categorySlug) return false;
    if (activeSubcategory !== 'all' && a.subcategory !== activeSubcategory) return false;
    return true;
  });

  const categoryTools = tools.filter(t => t.category === categorySlug || (categorySlug === 'ai' && t.category === 'ai'));
  const categoryVideos = videos.filter(v => v.category === categorySlug);

  const handleSubcategoryChange = (subSlug: string) => {
    setActiveSubcategory(subSlug);
    if (subSlug === 'all') {
      navigateTo(`/${categorySlug}`);
    } else {
      navigateTo(`/${categorySlug}/${subSlug}`);
    }
  };

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>খোঁজঘর ক্যাটাগরি</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {category?.nameBn || categorySlug.toUpperCase()}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
            {category?.descriptionBn}
          </p>
        </div>

        {/* Special Educational / Safety Disclaimers */}
        {categorySlug === 'trading' && (
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">শিক্ষামূলক সতর্কতা: </span>
              ট্রেডিংয়ে আর্থিক ঝুঁকি বিদ্যমান। খোঁজঘরের আলোচনা শুধুই শিক্ষামূলক ও টেকনিক্যাল অ্যানালাইসিস শেখার জন্য, কোনো বিনিয়োগ পরামর্শ নয়। রাতারাতি বড়লোক হওয়ার কোনো মিথ্যা আশ্বাস এখানে দেওয়া হয় না।
            </div>
          </div>
        )}

        {categorySlug === 'earn' && (
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-3 text-xs text-emerald-900 dark:text-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">ভুয়া আয় বিরোধী নীতি: </span>
              খোঁজঘর কোনো স্প্যাম, ক্লিক বা অবাস্তব আয়ের অফার প্রচার করে না। আমরা শুধুমাত্র আন্তর্জাতিক মার্কেটপ্লেস ও প্রফেশনাল ফ্রিল্যান্সিং স্কিল নিয়ে আলোচনা করি।
            </div>
          </div>
        )}

        {/* Subcategories (Interactive Filter Tabs) */}
        {category && category.subcategories && category.subcategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200 dark:border-stone-800">
            <button
              onClick={() => handleSubcategoryChange('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeSubcategory === 'all'
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              সবগুলো
            </button>
            {category.subcategories.map(sub => (
              <button
                key={sub.slug}
                onClick={() => handleSubcategoryChange(sub.slug)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeSubcategory === sub.slug
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {sub.nameBn}
              </button>
            ))}
          </div>
        )}

        <AdSlot location="homepage" />

        {/* Main Content Articles */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>মোট <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">{categoryArticles.length}</span> টি আর্টিকেল</span>
          </div>

          {categoryArticles.length === 0 ? (
            <div className="py-16 text-center text-stone-500 space-y-2">
              <p className="text-base font-medium">এই সাব-ক্যাটাগরিতে এখনও কোনো আর্টিকেল নেই।</p>
              <button
                onClick={() => handleSubcategoryChange('all')}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                সকল আর্টিকেল দেখুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.map(article => (
                <ArticleCard key={article.id} article={article} variant="standard" />
              ))}
            </div>
          )}
        </div>

        {/* Category Related Tools if available */}
        {categoryTools.length > 0 && (
          <div className="pt-12 border-t border-stone-200 dark:border-stone-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {category?.nameBn} সম্পর্কিত ডিজিটাল টুলস
                </h3>
                <p className="text-xs text-stone-500">কাজের গতি বাড়াতে প্রয়োজনীয় টুলস ও সফটওয়্যার</p>
              </div>
              <button
                onClick={() => navigateTo('/tools')}
                className="text-xs font-semibold text-emerald-600 hover:underline"
              >
                সকল টুলস দেখুন →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {categoryTools.slice(0, 3).map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* Category Related Videos if available */}
        {categoryVideos.length > 0 && (
          <div className="pt-12 border-t border-stone-200 dark:border-stone-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {category?.nameBn} ভিডিও টিউটোরিয়াল
                </h3>
                <p className="text-xs text-stone-500">ভিডিওর মাধ্যমে প্র্যাকটিক্যাল শিক্ষা</p>
              </div>
              <button
                onClick={() => navigateTo('/videos')}
                className="text-xs font-semibold text-emerald-600 hover:underline"
              >
                সকল ভিডিও দেখুন →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {categoryVideos.slice(0, 3).map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
