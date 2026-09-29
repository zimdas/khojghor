import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { VideoCard } from './VideoCard';
import { Video, Sparkles, Search } from 'lucide-react';
import { AdSlot } from '../common/AdSlot';

export const VideoGalleryView: React.FC = () => {
  const { videos, categories } = useStore();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter(v => {
    const matchesCat = selectedCat === 'all' || v.category === selectedCat;
    const matchesSearch = !searchQuery.trim() || 
      v.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.summaryBn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
            <Video className="w-4 h-4 text-emerald-600" />
            <span>ভিডিও লাইব্রেরি ও টিউটোরিয়াল</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            খোঁজঘর ভিডিও টিউটোরিয়াল
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
            দেখে দেখে সহজে শিখুন। প্রতিটি গুরুত্বপূর্ণ ভিডিওর সাথে রয়েছে ওয়েবসাইটের পূর্ণাঙ্গ লিখিত গাইড ও প্রয়োজনীয় লিংক।
          </p>
        </div>

        <AdSlot location="homepage" />

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-none">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCat === 'all'
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              সবগুলো ভিডিও
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.slug)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCat === c.slug
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {c.nameBn}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ভিডিও খুঁজুন..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none"
            />
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

      </div>
    </div>
  );
};
