import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowLeft, Clock, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { AdSlot } from '../common/AdSlot';

interface StaticPageViewProps {
  slug: string;
}

export const StaticPageView: React.FC<StaticPageViewProps> = ({ slug }) => {
  const { pages, navigateTo, categories, articles, tools, videos } = useStore();

  const page = pages.find(p => p.slug === slug);

  // If Sitemap page requested
  if (slug === 'sitemap') {
    return (
      <div className="w-full min-h-screen py-10 bg-stone-50 dark:bg-stone-950 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>হোমে ফিরে যান</span>
          </button>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              সাইটম্যাপ (HTML Sitemap)
            </h1>
            <p className="text-sm text-stone-500">
              খোঁজঘরের সকল বিভাগ, আর্টিকেল, ভিডিও এবং রিসোর্সের পূর্ণাঙ্গ সূচিপত্র।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {categories.map(cat => (
              <div key={cat.id} className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
                <h3 
                  onClick={() => navigateTo(`/${cat.slug}`)}
                  className="font-bold text-base text-emerald-700 dark:text-emerald-400 cursor-pointer hover:underline"
                >
                  {cat.nameBn} ({cat.slug})
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                  {articles.filter(a => a.category === cat.slug).map(art => (
                    <li key={art.id}>
                      <button
                        onClick={() => navigateTo(`/article/${art.slug}`)}
                        className="text-left hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                      >
                        • {art.titleBn}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">সাধারণ পেজসমূহ</h3>
            <div className="flex flex-wrap gap-3 text-xs text-stone-600 dark:text-stone-400">
              {pages.map(p => (
                <button
                  key={p.slug}
                  onClick={() => navigateTo(`/page/${p.slug}`)}
                  className="hover:underline text-emerald-600"
                >
                  {p.titleBn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-3">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">পেজটি পাওয়া যায়নি</h2>
        <p className="text-xs text-stone-500">অনুরোধকৃত পেজটি মুছে ফেলা হয়েছে বা স্থানান্তরিত হয়েছে।</p>
        <button
          onClick={() => navigateTo('/')}
          className="px-4 py-2 text-xs font-semibold rounded-md bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
        >
          হোমে ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-10 sm:py-16 bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোমে ফিরে যান</span>
        </button>

        {/* Page Header */}
        <header className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {page.titleBn}
          </h1>
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>সর্বশেষ হালনাগাদ: {page.updatedAt}</span>
          </div>
        </header>

        <AdSlot location="article_top" />

        {/* Page Body */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs prose prose-stone dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif">
          {page.contentBn}
        </div>

      </div>
    </div>
  );
};
