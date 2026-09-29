import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AdSlot } from './components/common/AdSlot';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './components/home/HomePage';
import { ArticleDetail } from './components/article/ArticleDetail';
import { VideoDetail } from './components/videos/VideoDetail';
import { VideoGalleryView } from './components/videos/VideoGalleryView';
import { ToolDetail } from './components/tools/ToolDetail';
import { ToolDirectory } from './components/tools/ToolDirectory';
import { CategoryListingView } from './components/pages/CategoryListingView';
import { StaticPageView } from './components/pages/StaticPageView';
import { BookmarksView } from './components/pages/BookmarksView';
import { AdminLayout } from './components/admin/AdminLayout';

const AppContent: React.FC = () => {
  const { routeInfo, articles, videos, tools } = useStore();

  // If in admin portal
  if (routeInfo.path.startsWith('/admin')) {
    return <AdminLayout />;
  }

  // Resolve current active view
  const renderView = () => {
    // 1. Article Single View (/article/:slug)
    if (routeInfo.slug && routeInfo.path.startsWith('/article/')) {
      const article = articles.find(a => a.slug === routeInfo.slug);
      if (article) {
        return <ArticleDetail article={article} />;
      }
      return (
        <div className="py-24 text-center space-y-3">
          <h2 className="text-xl font-bold">আর্টিকেলটি খুঁজে পাওয়া যায়নি</h2>
          <p className="text-xs text-stone-500">অনুরোধকৃত আর্টিকেলটি স্থানান্তরিত বা মুছে ফেলা হয়েছে।</p>
        </div>
      );
    }

    // 2. Video Single View (/video/:id)
    if (routeInfo.slug && routeInfo.path.startsWith('/video/')) {
      const video = videos.find(v => v.id === routeInfo.slug);
      if (video) {
        return <VideoDetail video={video} />;
      }
      return <VideoGalleryView />;
    }

    // 3. Videos Gallery View (/videos)
    if (routeInfo.path.startsWith('/videos')) {
      return <VideoGalleryView />;
    }

    // 4. Tool Single View (/tool/:id)
    if (routeInfo.slug && routeInfo.path.startsWith('/tool/')) {
      const tool = tools.find(t => t.id === routeInfo.slug);
      if (tool) {
        return <ToolDetail tool={tool} />;
      }
      return <ToolDirectory />;
    }

    // 5. Tools Directory View (/tools)
    if (routeInfo.path.startsWith('/tools')) {
      return <ToolDirectory />;
    }

    // 6. Static Pages (/page/:slug)
    if (routeInfo.slug && routeInfo.path.startsWith('/page/')) {
      return <StaticPageView slug={routeInfo.slug} />;
    }

    // 7. Bookmarks View (/bookmarks)
    if (routeInfo.path === '/bookmarks') {
      return <BookmarksView />;
    }

    // 8. Categories (/ai, /tech, /earn, /student, /make-build, /trading, /trends, /it-news)
    if (routeInfo.category) {
      return (
        <CategoryListingView
          categorySlug={routeInfo.category}
          subcategorySlug={routeInfo.subcategory}
        />
      );
    }

    // Default: Homepage
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors selection:bg-emerald-600 selection:text-white">
      
      {/* Top Banner Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AdSlot location="header" />
      </div>

      {/* Main Top Navigation Header */}
      <Header />

      {/* Main Routed View */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Footer Banner Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AdSlot location="footer" />
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Global Search Modal */}
      <SearchModal />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
