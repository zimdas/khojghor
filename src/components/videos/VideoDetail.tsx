import React, { useEffect } from 'react';
import { VideoItem } from '../../types';
import { useStore } from '../../context/StoreContext';
import { 
  ArrowLeft, 
  ExternalLink, 
  BookOpen, 
  Wrench, 
  Video, 
  Share2, 
  Eye, 
  Clock,
  Sparkles
} from 'lucide-react';
import { AdSlot } from '../common/AdSlot';

interface VideoDetailProps {
  video: VideoItem;
}

export const VideoDetail: React.FC<VideoDetailProps> = ({ video }) => {
  const { 
    navigateTo, 
    recordVideoView, 
    articles, 
    tools, 
    videos, 
    categories 
  } = useStore();

  useEffect(() => {
    recordVideoView(video.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [video.id]);

  const categoryObj = categories.find(c => c.slug === video.category);
  const categoryName = categoryObj ? categoryObj.nameBn : video.category;

  // Connected articles & tools
  const connectedArticles = articles.filter(a => 
    video.relatedArticleIds && video.relatedArticleIds.includes(a.id)
  );

  const relatedOtherVideos = videos.filter(v => 
    v.id !== video.id && (v.category === video.category)
  ).slice(0, 3);

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Navigation */}
        <button
          onClick={() => navigateTo('/videos')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ভিডিও গ্যালারিতে ফিরে যান</span>
        </button>

        {/* 1. Video Player Embed */}
        <div className="rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-stone-800">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&rel=0`}
            title={video.titleBn}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* 2. Video Title & Meta */}
        <div className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400 uppercase">
              {categoryName}
            </span>
            <span aria-hidden="true">·</span>
            <span>সময়কাল: {video.duration}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono">
              <Eye className="w-3.5 h-3.5" />
              {video.views.toLocaleString('bn-BD')} ভিউ
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
            {video.titleBn}
          </h1>
        </div>

        {/* Top Ad */}
        <AdSlot location="article_top" />

        {/* 3. Summary & 4. Full Written Guide */}
        <div className="p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            ভিডিও সারাংশ ও লিখিত গাইড
          </h2>
          <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
            {video.summaryBn}
          </p>

          {video.fullGuideBn && (
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 whitespace-pre-line text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {video.fullGuideBn}
            </div>
          )}
        </div>

        {/* 5. Tools Used & 6/7. Important Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {video.toolsUsed && video.toolsUsed.length > 0 && (
            <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
              <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                ভিডিওতে ব্যবহৃত টুলস ও সফটওয়্যার
              </h3>
              <div className="flex flex-wrap gap-2">
                {video.toolsUsed.map((toolName, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
                  >
                    {toolName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {video.importantLinks && video.importantLinks.length > 0 && (
            <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
              <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                প্রয়োজনীয় রিসোর্স ও লিংক
              </h3>
              <ul className="space-y-2 text-xs">
                {video.importantLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 8. Connected Website Articles */}
        {connectedArticles.length > 0 && (
          <div className="p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              এই ভিডিওর বিস্তারিত ওয়েবসাইট আর্টিকেল
            </h3>
            <div className="space-y-2">
              {connectedArticles.map(art => (
                <div
                  key={art.id}
                  onClick={() => navigateTo(`/article/${art.slug}`)}
                  className="cursor-pointer p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 hover:text-emerald-600">
                      {art.titleBn}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1">{art.excerptBn}</p>
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium shrink-0 ml-4">
                    সম্পূর্ণ পড়ুন →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. Related Videos */}
        {relatedOtherVideos.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Video className="w-4 h-4 text-emerald-600" />
              আরও ভিডিও টিউটোরিয়াল
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedOtherVideos.map(v => (
                <div
                  key={v.id}
                  onClick={() => navigateTo(`/video/${v.id}`)}
                  className="cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 group hover:shadow-md transition-all"
                >
                  <div className="aspect-video relative overflow-hidden bg-stone-900">
                    <img
                      src={v.thumbnailUrl}
                      alt={v.titleBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-[10px] text-white font-mono">
                      {v.duration}
                    </span>
                  </div>
                  <div className="p-3">
                    <h5 className="text-xs font-semibold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 line-clamp-2">
                      {v.titleBn}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
