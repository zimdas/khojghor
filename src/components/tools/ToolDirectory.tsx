import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ToolCard } from './ToolCard';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { AdSlot } from '../common/AdSlot';

export const ToolDirectory: React.FC = () => {
  const { tools } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'সকল ক্যাটাগরি' },
    { id: 'ai', label: 'এআই (AI)' },
    { id: 'development', label: 'ডেভেলপমেন্ট ও কোডিং' },
    { id: 'productivity', label: 'প্রোডাক্টিভিটি' },
    { id: 'design', label: 'গ্রাফিক্স ও ডিজাইন' },
    { id: 'video', label: 'ভিডিও ও এডিটিং' },
    { id: 'education', label: 'শিক্ষা ও স্টাডি' },
    { id: 'finance', label: 'ফাইন্যান্স ও পেমেন্ট' },
    { id: 'creator', label: 'ক্রিয়েটর টুলস' },
  ];

  const pricingOptions = [
    { id: 'all', label: 'সকল মূল্য' },
    { id: 'Free', label: '১০০% ফ্রি' },
    { id: 'Freemium', label: 'ফ্রিমিয়াম' },
    { id: 'Paid', label: 'পেইড' },
  ];

  const filteredTools = tools.filter(tool => {
    const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesPricing = selectedPricing === 'all' || tool.pricing === selectedPricing;
    const matchesSearch = !searchQuery.trim() || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.descriptionBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.featuresBn.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesPricing && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>ডিজিটাল রিসোর্স ডিরেক্টরি</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            সেরা প্রয়োজনীয় ডিজিটাল টুলস
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            কৃত্রিম বুদ্ধিমত্তা, ডিজাইন, কোডিং, ক্যারিয়ার ও পড়াশোনায় গতি আনতে যাচাইকৃত সেরা সব ডিজিটাল টুলসের সংকলন।
          </p>
        </div>

        <AdSlot location="homepage" />

        {/* Controls: Search and Filters */}
        <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="টুলের নাম বা ফিচার দিয়ে খুঁজুন (যেমন: DeepSeek, Canva, কোডিং)..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category Tabs (Interactive Filter Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Pricing Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
            <span className="text-stone-500">
              ফলাফল: <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">{filteredTools.length}</span> টি টুল পাওয়া গেছে
            </span>

            <div className="flex items-center gap-1">
              <span className="text-stone-400 mr-1 hidden sm:inline">মূল্য:</span>
              {pricingOptions.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPricing(p.id)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    selectedPricing === p.id
                      ? 'bg-emerald-600 text-white font-medium'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="py-16 text-center space-y-2 text-stone-500">
            <p className="text-base font-medium">কোনো টুল খুঁজে পাওয়া যায়নি।</p>
            <p className="text-xs">ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
