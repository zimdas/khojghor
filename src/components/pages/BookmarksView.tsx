import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArticleCard } from '../article/ArticleCard';
import { Bookmark, ArrowLeft } from 'lucide-react';

export const BookmarksView: React.FC = () => {
  const { bookmarks, articles, navigateTo } = useStore();

  const savedArticles = articles.filter(a => bookmarks.includes(a.id));

  return (
    <div className="w-full min-h-screen py-10 sm:py-16 bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোমে ফিরে যান</span>
        </button>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Bookmark className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            <span>সংরক্ষিত পড়ার তালিকা</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            আপনার বুকমার্ক সমূহ ({savedArticles.length})
          </h1>
          <p className="text-sm text-stone-500">
            পরে পড়ার জন্য আপনি যেসকল আর্টিকেল সংরক্ষণ করেছেন তা এখানে তালিকাভুক্ত রয়েছে।
          </p>
        </div>

        {savedArticles.length === 0 ? (
          <div className="py-20 text-center space-y-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <Bookmark className="w-12 h-12 text-stone-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200">
                আপনার তালিকায় কোনো বুকমার্ক নেই
              </h3>
              <p className="text-xs text-stone-400">
                যেকোনো আর্টিকেলের বুকমার্ক আইকনে ক্লিক করে এখানে যুক্ত করতে পারেন।
              </p>
            </div>
            <button
              onClick={() => navigateTo('/')}
              className="px-4 py-2 text-xs font-semibold rounded-md bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
            >
              আর্টিকেলসমূহ দেখুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map(article => (
              <ArticleCard key={article.id} article={article} variant="standard" />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
