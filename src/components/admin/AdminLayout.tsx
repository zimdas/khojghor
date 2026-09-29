import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { ArticleAdmin } from './ArticleAdmin';
import { VideoAdmin } from './VideoAdmin';
import { ToolAdmin } from './ToolAdmin';
import { CategoryAdmin } from './CategoryAdmin';
import { TagAdmin } from './TagAdmin';
import { MediaAdmin } from './MediaAdmin';
import { HomepageAdmin } from './HomepageAdmin';
import { CommentAdmin } from './CommentAdmin';
import { UserAdmin } from './UserAdmin';
import { SeoAdmin } from './SeoAdmin';
import { AdAdmin } from './AdAdmin';
import { AnalyticsAdmin } from './AnalyticsAdmin';
import { PageAdmin } from './PageAdmin';
import { NavigationAdmin } from './NavigationAdmin';
import { NewsletterAdmin } from './NewsletterAdmin';
import { SettingsAdmin } from './SettingsAdmin';
import { AdminUserAdmin } from './AdminUserAdmin';
import { ActivityLogAdmin } from './ActivityLogAdmin';

import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  Wrench, 
  Layers, 
  Hash,
  Image as ImageIcon,
  Layout,
  MessageSquare,
  Users,
  Globe,
  Megaphone, 
  BarChart3,
  FileCode, 
  Menu,
  Mail,
  Settings, 
  ShieldCheck,
  History,
  LogOut, 
  ExternalLink,
  Languages,
  X
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    currentAdminUser, 
    adminLogout, 
    navigateTo, 
    adminLanguage, 
    setAdminLanguage, 
    adminT 
  } = useStore();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }

  // All 19 Required Sidebar Sections
  const navTabs = [
    { id: 'dashboard', label: adminT('adminDashboard'), icon: LayoutDashboard },
    { id: 'articles', label: adminT('adminArticles'), icon: FileText },
    { id: 'videos', label: adminT('adminVideos'), icon: Video },
    { id: 'tools', label: adminT('adminTools'), icon: Wrench },
    { id: 'categories', label: adminT('adminCategories'), icon: Layers },
    { id: 'tags', label: adminT('adminTags'), icon: Hash },
    { id: 'media', label: adminT('adminMedia'), icon: ImageIcon },
    { id: 'homepage', label: adminT('adminHomepage'), icon: Layout },
    { id: 'comments', label: adminT('adminComments'), icon: MessageSquare },
    { id: 'users', label: adminT('adminUsers'), icon: Users },
    { id: 'seo', label: adminT('adminSeo'), icon: Globe },
    { id: 'ads', label: adminT('adminAds'), icon: Megaphone },
    { id: 'analytics', label: adminT('adminAnalytics'), icon: BarChart3 },
    { id: 'pages', label: adminT('adminPages'), icon: FileCode },
    { id: 'navigation', label: adminT('adminNavigation'), icon: Menu },
    { id: 'newsletter', label: adminT('adminNewsletter'), icon: Mail },
    { id: 'settings', label: adminT('adminSettings'), icon: Settings },
    { id: 'adminUsers', label: adminT('adminAdminUsers'), icon: ShieldCheck },
    { id: 'activityLogs', label: adminT('adminActivityLogs'), icon: History },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsSidebarOpen(false);
  };

  const toggleAdminLang = () => {
    setAdminLanguage(adminLanguage === 'bn' ? 'en' : 'bn');
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col font-sans transition-colors">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                {adminLanguage === 'bn' ? 'খ' : 'K'}
              </span>
              <div>
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <span>{adminLanguage === 'bn' ? 'খোঁজঘর অ্যাডমিন' : 'KhojGhor CMS'}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                    {currentAdminUser?.role || 'Super Admin'}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Independent Admin Language Switcher */}
            <button
              onClick={toggleAdminLang}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              title="Admin Language (Independent from Public Website)"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-600" />
              <span>{adminLanguage === 'bn' ? 'English Admin' : 'বাংলা অ্যাডমিন'}</span>
            </button>

            <button
              onClick={() => navigateTo('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
            >
              <span>{adminT('viewLiveSite')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={adminLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              title={adminT('logout')}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{adminT('logout')}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Workspace with 19 Sections */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 pt-16 lg:pt-0 transform transition-transform lg:translate-x-0 lg:static overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-3 space-y-0.5">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-3 py-1.5">
              {adminLanguage === 'bn' ? 'ম্যানেজমেন্ট মেনু (১৯টি বিভাগ)' : 'CMS Sections (19 Modules)'}
            </p>
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 space-y-1">
            <p className="font-semibold text-stone-700 dark:text-stone-300">KhojGhor Production Engine</p>
            <p className="truncate font-mono">{currentAdminUser?.email || 'admin@khojghor.com'}</p>
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <AdminDashboard onTabChange={tab => setActiveTab(tab)} />}
          {activeTab === 'articles' && <ArticleAdmin />}
          {activeTab === 'videos' && <VideoAdmin />}
          {activeTab === 'tools' && <ToolAdmin />}
          {activeTab === 'categories' && <CategoryAdmin />}
          {activeTab === 'tags' && <TagAdmin />}
          {activeTab === 'media' && <MediaAdmin />}
          {activeTab === 'homepage' && <HomepageAdmin />}
          {activeTab === 'comments' && <CommentAdmin />}
          {activeTab === 'users' && <UserAdmin />}
          {activeTab === 'seo' && <SeoAdmin />}
          {activeTab === 'ads' && <AdAdmin />}
          {activeTab === 'analytics' && <AnalyticsAdmin />}
          {activeTab === 'pages' && <PageAdmin />}
          {activeTab === 'navigation' && <NavigationAdmin />}
          {activeTab === 'newsletter' && <NewsletterAdmin />}
          {activeTab === 'settings' && <SettingsAdmin />}
          {activeTab === 'adminUsers' && <AdminUserAdmin />}
          {activeTab === 'activityLogs' && <ActivityLogAdmin />}
        </main>

      </div>

    </div>
  );
};
