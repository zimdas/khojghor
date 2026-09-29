import React, { useState } from 'react';
import { ToolItem } from '../../types';
import { useStore } from '../../context/StoreContext';
import { 
  ArrowLeft, 
  ExternalLink, 
  Star, 
  CheckCircle2, 
  BookOpen, 
  Video, 
  Share2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { AdSlot } from '../common/AdSlot';

interface ToolDetailProps {
  tool: ToolItem;
}

export const ToolDetail: React.FC<ToolDetailProps> = ({ tool }) => {
  const { navigateTo, articles, videos } = useStore();
  const [copied, setCopied] = useState(false);

  const relatedArticles = articles.filter(a => 
    tool.relatedArticleIds && tool.relatedArticleIds.includes(a.id)
  );

  const relatedVideos = videos.filter(v => 
    tool.relatedVideoIds && tool.relatedVideoIds.includes(v.id)
  );

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigateTo('/tools')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>টুলস ডিরেক্টরিতে ফিরে যান</span>
        </button>

        {/* Hero Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-stone-200 dark:border-stone-800 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                    {tool.name}
                  </h1>
                  <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    {tool.rating}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-1">
                  <span className="capitalize">{tool.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{tool.pricing}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="শেয়ার করুন"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <a
                href={tool.affiliateUrl || tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors shadow-sm"
              >
                <span>অফিসিয়াল ওয়েবসাইট</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed font-serif pt-2 border-t border-stone-100 dark:border-stone-800">
            {tool.descriptionBn}
          </p>

          {tool.pricingDetailsBn && (
            <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300">
              <span className="font-bold text-stone-900 dark:text-stone-100">মূল্য কাঠামো: </span>
              {tool.pricingDetailsBn}
            </div>
          )}
        </div>

        {/* Ad Slot */}
        <AdSlot location="article_top" />

        {/* Features Checklist */}
        <div className="p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            প্রধান সুবিধাসমূহ ও ফিচার
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {tool.featuresBn.map((feat, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-stone-800 dark:text-stone-200">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Articles */}
        {relatedArticles.length > 0 && (
          <div className="p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              এই টুল সম্পর্কিত টিউটোরিয়াল ও গাইড
            </h3>
            <div className="space-y-2">
              {relatedArticles.map(art => (
                <div
                  key={art.id}
                  onClick={() => navigateTo(`/article/${art.slug}`)}
                  className="cursor-pointer p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center justify-between"
                >
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 hover:text-emerald-600">
                    {art.titleBn}
                  </h4>
                  <span className="text-xs text-emerald-600 font-medium ml-4 shrink-0">
                    পড়ুন →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
