import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  FileText, 
  Video, 
  Wrench, 
  Layers, 
  Eye, 
  Users, 
  TrendingUp, 
  Plus, 
  Activity,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AdminDashboardProps {
  onTabChange: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onTabChange }) => {
  const { 
    articles, 
    videos, 
    tools, 
    categories, 
    comments,
    media,
    analyticsStats, 
    adminLanguage,
    adminT,
    navigateTo 
  } = useStore();

  const publishedArticles = articles.filter(a => a.status === 'published');
  const draftArticles = articles.filter(a => a.status === 'draft');
  const scheduledArticles = articles.filter(a => a.status === 'scheduled');

  const liveUsers = analyticsStats?.activeUsersNow ?? 1;
  const todayVis = analyticsStats?.todayVisitors ?? 1;
  const last30DaysVis = analyticsStats?.last30DaysVisitors ?? 1;
  const last30DaysPv = analyticsStats?.last30DaysPageViews ?? articles.reduce((sum, a) => sum + (a.views || 0), 0);

  const stats = [
    { label: adminLanguage === 'bn' ? 'সক্রিয় পাঠক (Live)' : 'Live Active Users', value: liveUsers, sub: adminLanguage === 'bn' ? 'রিয়েল-টাইম' : 'Real-time', icon: Activity, tab: 'analytics', highlight: true },
    { label: adminLanguage === 'bn' ? 'আজকের ভিজিটর' : 'Today’s Visitors', value: todayVis, sub: adminLanguage === 'bn' ? 'ইউনিক সেশন' : 'Unique sessions', icon: Users, tab: 'analytics' },
    { label: adminLanguage === 'bn' ? '৩০ দিনের ভিজিটর' : '30-Day Visitors', value: last30DaysVis, sub: adminLanguage === 'bn' ? 'ইউনিক সেশন' : 'Unique sessions', icon: Users, tab: 'analytics' },
    { label: adminLanguage === 'bn' ? 'মোট আর্টিকেল' : 'Total Articles', value: articles.length, sub: `${publishedArticles.length} ${adminLanguage === 'bn' ? 'প্রকাশিত' : 'Published'}`, icon: FileText, tab: 'articles' },
    { label: adminLanguage === 'bn' ? 'ভিডিও লাইব্রেরি' : 'Total Videos', value: videos.length, sub: adminLanguage === 'bn' ? 'সকল সক্রিয়' : 'All active', icon: Video, tab: 'videos' },
    { label: adminLanguage === 'bn' ? 'ডিজিটাল টুলস' : 'Total Tools', value: tools.length, sub: adminLanguage === 'bn' ? 'ডিরেক্টরি রেডি' : 'Directory items', icon: Wrench, tab: 'tools' },
    { label: adminLanguage === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Total Categories', value: categories.length, sub: adminLanguage === 'bn' ? 'মূল বিভাগ' : 'Main pillars', icon: Layers, tab: 'categories' },
    { label: adminLanguage === 'bn' ? 'মিডিয়া ফাইল' : 'Media Files', value: media.length, sub: adminLanguage === 'bn' ? 'ছবি ও সম্পদ' : 'Images & assets', icon: Sparkles, tab: 'media' },
  ];

  const popularArticles = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{adminLanguage === 'bn' ? 'খোঁজঘর ড্যাশবোর্ড ওভারভিউ' : 'KhojGhor Central CMS Dashboard'}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </h1>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' 
              ? 'ওয়েবসাইটের কন্টেন্ট, ভিডিও, টুলস, বিজ্ঞাপন ও রিয়েল-টাইম অ্যানালিটিক্স সম্পূর্ণ সোর্স কোড ছাড়া পরিচালনা করুন।' 
              : 'Real-time production management of articles, videos, tools, ads, and visitor analytics.'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onTabChange('articles')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{adminLanguage === 'bn' ? 'নতুন আর্টিকেল' : 'New Article'}</span>
          </button>
          <button
            onClick={() => onTabChange('tools')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors flex items-center gap-1.5 border border-stone-200 dark:border-stone-700"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{adminLanguage === 'bn' ? 'নতুন টুল' : 'New Tool'}</span>
          </button>
          <button
            onClick={() => onTabChange('media')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors flex items-center gap-1.5 border border-stone-200 dark:border-stone-700"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{adminLanguage === 'bn' ? 'ছবি আপলোড' : 'Upload Media'}</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid (Tabular Numerals) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              onClick={() => onTabChange(stat.tab)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all space-y-2 shadow-xs ${
                stat.highlight 
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-800 dark:text-emerald-300' 
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-500/50'
              }`}
            >
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-xs font-bold truncate">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.highlight ? 'text-emerald-500 animate-pulse' : 'text-emerald-600'} shrink-0`} />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
                {stat.value}
              </div>
              <p className="text-[11px] text-stone-400 truncate">
                {stat.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Popular Content & Quick Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Popular Content */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>{adminT('popularArticlesTitle')}</span>
            </h3>
            <button
              onClick={() => onTabChange('articles')}
              className="text-xs text-emerald-600 hover:underline"
            >
              {adminLanguage === 'bn' ? 'সকল আর্টিকেল →' : 'All Articles →'}
            </button>
          </div>

          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {popularArticles.map((art, idx) => (
              <div key={art.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold text-stone-400 w-4">
                    0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p 
                      onClick={() => navigateTo(`/article/${art.slug}`)}
                      className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate hover:text-emerald-600 cursor-pointer"
                    >
                      {adminLanguage === 'en' && art.titleEn ? art.titleEn : art.titleBn}
                    </p>
                    <span className="text-[11px] text-stone-400 capitalize">
                      {art.category} · {art.readingTimeMin} {adminLanguage === 'bn' ? 'মিনিট পাঠ' : 'min read'}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {art.views} {adminLanguage === 'bn' ? 'ভিউ' : 'views'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video & Tools Overview */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{adminLanguage === 'bn' ? 'টুলস ও ভিডিও হাইলাইটস' : 'Tools & Video Highlights'}</span>
            </h3>
            <button
              onClick={() => onTabChange('tools')}
              className="text-xs text-emerald-600 hover:underline"
            >
              {adminLanguage === 'bn' ? 'ম্যানেজ করুন →' : 'Manage →'}
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{adminLanguage === 'bn' ? 'টুলস ডিরেক্টরি' : 'Tools Directory'}</p>
            <div className="grid grid-cols-2 gap-2">
              {tools.slice(0, 4).map(t => (
                <div key={t.id} className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/50 flex items-center gap-2">
                  <img src={t.logo} alt={t.name} className="w-7 h-7 rounded object-cover" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate text-stone-900 dark:text-stone-100">{t.name}</p>
                    <p className="text-[10px] text-stone-400 truncate">{t.pricing}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider pt-2">{adminLanguage === 'bn' ? 'ভিডিও লাইব্রেরি' : 'Video Library'}</p>
            <div className="space-y-1.5">
              {videos.slice(0, 3).map(v => (
                <div key={v.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/40">
                  <p className="text-xs font-medium text-stone-800 dark:text-stone-200 truncate max-w-[280px]">
                    {adminLanguage === 'en' && v.titleEn ? v.titleEn : v.titleBn}
                  </p>
                  <span className="text-[11px] font-mono text-stone-400 shrink-0">
                    {v.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
