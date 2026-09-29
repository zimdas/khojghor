import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, Clock, Sparkles, BookOpen, Video, Wrench, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    articles, 
    videos, 
    tools, 
    categories,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    navigateTo 
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular search tags
  const popularSearches = ['DeepSeek', 'Cursor AI', 'NotebookLM', 'আপওয়ার্ক পেমেন্ট', 'উইন্ডোজ অপটিমাইজেশন', 'v0', 'কোর্সসেরা ফ্রি'];

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchModalOpen]);

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedArticles = trimmed
    ? articles.filter(a => 
        a.titleBn.toLowerCase().includes(trimmed) || 
        a.excerptBn.toLowerCase().includes(trimmed) ||
        a.tags.some(t => t.toLowerCase().includes(trimmed)) ||
        (a.titleEn && a.titleEn.toLowerCase().includes(trimmed))
      )
    : [];

  const matchedVideos = trimmed
    ? videos.filter(v => 
        v.titleBn.toLowerCase().includes(trimmed) || 
        v.summaryBn.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedTools = trimmed
    ? tools.filter(t => 
        t.name.toLowerCase().includes(trimmed) || 
        t.descriptionBn.toLowerCase().includes(trimmed) ||
        t.featuresBn.some(f => f.toLowerCase().includes(trimmed))
      )
    : [];

  const matchedCategories = trimmed
    ? categories.filter(c => 
        c.nameBn.toLowerCase().includes(trimmed) ||
        c.nameEn.toLowerCase().includes(trimmed)
      )
    : [];

  const totalResults = matchedArticles.length + matchedVideos.length + matchedTools.length + matchedCategories.length;

  const handleSelect = (path: string, term?: string) => {
    if (term) addRecentSearch(term);
    else if (trimmed) addRecentSearch(trimmed);
    setIsSearchModalOpen(false);
    navigateTo(path);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto"
      onClick={() => setIsSearchModalOpen(false)}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="আর্টিকেল, ভিডিও, টুলস বা বিষয় খুঁজুন (যেমন: DeepSeek, ফ্রিল্যান্সিং)..."
            className="w-full ml-3 bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none text-base"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline ml-2 px-1.5 py-0.5 text-xs font-mono bg-stone-100 dark:bg-stone-800 text-stone-500 rounded border border-stone-200 dark:border-stone-700">
            ESC
          </kbd>
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          
          {/* Default Screen: Recent & Popular */}
          {!trimmed && (
            <div className="space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      সাম্প্রতিক অনুসন্ধান
                    </span>
                    <button 
                      onClick={clearRecentSearches}
                      className="hover:text-stone-600 dark:hover:text-stone-200 text-[11px]"
                    >
                      মুছে ফেলুন
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setQuery(term);
                          inputRef.current?.focus();
                        }}
                        className="px-2.5 py-1 text-xs rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-stone-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  জনপ্রিয় বিষয়সমূহ
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuery(term);
                        inputRef.current?.focus();
                      }}
                      className="px-2.5 py-1 text-xs rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {trimmed && (
            <>
              {totalResults === 0 ? (
                <div className="py-8 text-center text-stone-500 dark:text-stone-400 space-y-2">
                  <p className="text-sm">“{query}” দিয়ে কোনো ফলাফল পাওয়া যায়নি।</p>
                  <p className="text-xs text-stone-400">
                    অন্য কোনো কি-ওয়ার্ড দিয়ে খুঁজুন অথবা নিচের জনপ্রিয় টুলস এক্সপ্লোর করুন।
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={() => handleSelect('/tools')}
                      className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      সকল ডিজিটাল টুলস দেখুন →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Matched Categories */}
                  {matchedCategories.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-stone-400 mb-1.5 uppercase">ক্যাটাগরি</p>
                      <div className="grid grid-cols-2 gap-2">
                        {matchedCategories.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => handleSelect(`/${cat.slug}`, cat.nameBn)}
                            className="p-2.5 text-left rounded-lg bg-stone-50 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-stone-200/60 dark:border-stone-800 flex items-center justify-between transition-colors"
                          >
                            <span className="text-sm font-medium text-stone-800 dark:text-stone-200">{cat.nameBn}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matched Articles */}
                  {matchedArticles.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-stone-400 mb-1.5 uppercase flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        আর্টিকেল ({matchedArticles.length})
                      </p>
                      <div className="space-y-1.5">
                        {matchedArticles.map(art => (
                          <button
                            key={art.id}
                            onClick={() => handleSelect(`/article/${art.slug}`, art.titleBn)}
                            className="w-full text-left p-2.5 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-start gap-3"
                          >
                            <div className="w-12 h-12 rounded bg-stone-200 dark:bg-stone-800 shrink-0 overflow-hidden">
                              <img
                                src={art.featuredImage}
                                alt={art.titleBn}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h5 className="text-sm font-medium text-stone-900 dark:text-stone-100 line-clamp-1">
                                {art.titleBn}
                              </h5>
                              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                                {art.excerptBn}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matched Tools */}
                  {matchedTools.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-stone-400 mb-1.5 uppercase flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5" />
                        ডিজিটাল টুলস ({matchedTools.length})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {matchedTools.map(tool => (
                          <button
                            key={tool.id}
                            onClick={() => handleSelect(`/tool/${tool.id}`, tool.name)}
                            className="p-2.5 text-left rounded-lg bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/50 dark:border-stone-800 flex items-center gap-3 transition-colors"
                          >
                            <img
                              src={tool.logo}
                              alt={tool.name}
                              className="w-8 h-8 rounded object-cover shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">{tool.name}</p>
                              <p className="text-xs text-stone-500 truncate">{tool.pricing} · {tool.category}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matched Videos */}
                  {matchedVideos.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-stone-400 mb-1.5 uppercase flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5" />
                        ভিডিও টিউটোরিয়াল ({matchedVideos.length})
                      </p>
                      <div className="space-y-1.5">
                        {matchedVideos.map(vid => (
                          <button
                            key={vid.id}
                            onClick={() => handleSelect(`/video/${vid.id}`, vid.titleBn)}
                            className="w-full text-left p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-3"
                          >
                            <div className="w-16 h-10 rounded bg-stone-200 dark:bg-stone-800 shrink-0 overflow-hidden relative">
                              <img
                                src={vid.thumbnailUrl}
                                alt={vid.titleBn}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-stone-900 dark:text-stone-100 line-clamp-1">{vid.titleBn}</p>
                              <p className="text-[11px] text-stone-500">{vid.duration} মিনিট</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
