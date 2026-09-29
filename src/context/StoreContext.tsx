import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { 
  Article, 
  CategoryInfo, 
  ToolItem, 
  VideoItem, 
  AdPlacement, 
  SiteSettings, 
  StaticPage,
  ContentCategory,
  Language,
  TagItem,
  MediaItem,
  CommentItem,
  AdminUser,
  ActivityLogItem,
  HomepageSectionConfig,
  NavigationItem,
  NewsletterSubscriber,
  AnalyticsStats
} from '../types';
import { 
  INITIAL_ARTICLES, 
  INITIAL_CATEGORIES, 
  INITIAL_TOOLS, 
  INITIAL_VIDEOS, 
  INITIAL_ADS, 
  INITIAL_PAGES, 
  INITIAL_SETTINGS 
} from '../data/initialData';
import { TRANSLATIONS } from '../i18n/translations';

interface RouteInfo {
  path: string;
  category?: ContentCategory | string;
  subcategory?: string;
  slug?: string;
  searchQuery?: string;
  toolFilter?: string;
}

interface StoreContextType {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Language (Independent for Public and Admin)
  language: Language;
  setLanguage: (lang: Language) => void;
  adminLanguage: Language;
  setAdminLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS.bn) => string;
  adminT: (key: keyof typeof TRANSLATIONS.bn) => string;

  // Routing
  currentPath: string;
  routeInfo: RouteInfo;
  navigateTo: (path: string) => void;

  // Content state (Synced with Real Backend)
  articles: Article[];
  videos: VideoItem[];
  tools: ToolItem[];
  categories: CategoryInfo[];
  tags: TagItem[];
  media: MediaItem[];
  comments: CommentItem[];
  users: any[];
  adminUsers: AdminUser[];
  pages: StaticPage[];
  ads: AdPlacement[];
  navigation: NavigationItem[];
  subscribers: NewsletterSubscriber[];
  activityLogs: ActivityLogItem[];
  homepageConfig: HomepageSectionConfig[];
  settings: SiteSettings;
  bookmarks: string[];
  recentSearches: string[];

  // Real-Time Analytics
  analyticsStats: AnalyticsStats | null;
  refreshAnalytics: () => Promise<void>;

  // Admin Auth
  isAdminLoggedIn: boolean;
  currentAdminUser: AdminUser | null;
  adminLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => Promise<void>;

  // CRUD for Articles
  recordArticleView: (articleId: string) => void;
  addArticle: (article: Omit<Article, 'id' | 'views'>) => Promise<Article>;
  updateArticle: (id: string, updates: Partial<Article>, revisionNote?: string) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  restoreArticle: (id: string) => Promise<void>;
  permanentDeleteArticle: (id: string) => Promise<void>;
  bulkArticleAction: (action: string, ids: string[], category?: string) => Promise<void>;

  // CRUD for Videos
  recordVideoView: (videoId: string) => void;
  addVideo: (video: Omit<VideoItem, 'id' | 'views'>) => Promise<VideoItem>;
  updateVideo: (id: string, updates: Partial<VideoItem>) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;

  // CRUD for Tools
  addTool: (tool: Omit<ToolItem, 'id'>) => Promise<ToolItem>;
  updateTool: (id: string, updates: Partial<ToolItem>) => Promise<void>;
  deleteTool: (id: string) => Promise<void>;

  // Categories & Tags
  addCategory: (category: CategoryInfo) => Promise<void>;
  updateCategory: (id: string, updates: Partial<CategoryInfo>) => Promise<void>;
  deleteCategory: (id: string, force?: boolean) => Promise<{ ok: boolean; error?: string }>;
  addTag: (nameBn: string, nameEn: string, slug: string) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;

  // Media
  uploadMedia: (filename: string, fileData: string, altText?: string, caption?: string) => Promise<MediaItem | null>;
  updateMedia: (id: string, updates: Partial<MediaItem>) => Promise<void>;
  deleteMedia: (id: string) => Promise<void>;

  // Comments
  addComment: (articleId: string, articleTitle: string, authorName: string, authorEmail: string, content: string) => Promise<void>;
  updateCommentStatus: (id: string, status: CommentItem['status']) => Promise<void>;

  // Ads & Settings & Pages
  updateAdPlacement: (id: string, updates: Partial<AdPlacement>) => Promise<void>;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  updatePage: (slug: string, updates: Partial<StaticPage>) => Promise<void>;
  updateHomepageConfig: (config: HomepageSectionConfig[]) => Promise<void>;
  updateNavigationConfig: (navItems: NavigationItem[]) => Promise<void>;

  // Admin User Management
  createAdminUser: (userData: { name: string; email: string; password: string; role: any }) => Promise<void>;
  updateAdminUser: (id: string, updates: Partial<AdminUser> & { password?: string }) => Promise<void>;

  // Bookmarks & Search
  toggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Newsletter
  subscribeNewsletter: (email: string) => Promise<{ ok: boolean; error?: string }>;

  // Backup & Restore
  resetAllToDefault: () => Promise<void>;
  exportDatabaseJson: () => Promise<string>;
  importDatabaseJson: (json: string) => Promise<boolean>;

  // Search Modal
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function parseUrl(pathname: string, search: string): RouteInfo {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const urlParams = new URLSearchParams(search);
  const q = urlParams.get('q') || '';
  const filter = urlParams.get('filter') || '';

  const segments = cleanPath.split('/').filter(Boolean);

  if (segments.length === 0) {
    return { path: '/', searchQuery: q, toolFilter: filter };
  }

  const first = segments[0];

  if (first === 'article' && segments[1]) {
    return { path: cleanPath, slug: segments[1] };
  }

  if (first === 'video' && segments[1]) {
    return { path: cleanPath, slug: segments[1] };
  }

  if (first === 'tool' && segments[1]) {
    return { path: cleanPath, slug: segments[1] };
  }

  if (first === 'page' && segments[1]) {
    return { path: cleanPath, slug: segments[1] };
  }

  if (first === 'admin') {
    return { path: '/admin', slug: segments[1] || 'dashboard' };
  }

  if (first === 'search') {
    return { path: '/search', searchQuery: q };
  }

  if (first === 'videos') {
    return { path: '/videos', category: segments[1] };
  }

  if (first === 'tools') {
    return { path: '/tools', toolFilter: segments[1] || filter };
  }

  const knownCategories = ['ai', 'tech', 'earn', 'student', 'make-build', 'trading', 'trends', 'it-news'];
  if (knownCategories.includes(first)) {
    return {
      path: cleanPath,
      category: first as ContentCategory,
      subcategory: segments[1]
    };
  }

  return { path: cleanPath, slug: first, searchQuery: q };
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('khojghor_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('khojghor_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // Language System (Independent preferences)
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('khojghor_public_lang');
      if (saved === 'bn' || saved === 'en') return saved;
    }
    return 'bn';
  });

  const [adminLanguage, setAdminLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('khojghor_admin_lang');
      if (saved === 'bn' || saved === 'en') return saved;
    }
    return 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('khojghor_public_lang', lang);
  };

  const setAdminLanguage = (lang: Language) => {
    setAdminLanguageState(lang);
    localStorage.setItem('khojghor_admin_lang', lang);
  };

  const t = useCallback((key: keyof typeof TRANSLATIONS.bn): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.bn[key] || '';
  }, [language]);

  const adminT = useCallback((key: keyof typeof TRANSLATIONS.bn): string => {
    return TRANSLATIONS[adminLanguage]?.[key] || TRANSLATIONS.bn[key] || '';
  }, [adminLanguage]);

  // Routing
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path === currentPath) return;
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPath(path);
  };

  const routeInfo = useMemo(() => {
    const [pathPart, queryPart] = currentPath.split('?');
    return parseUrl(pathPart || '/', queryPart ? `?${queryPart}` : '');
  }, [currentPath]);

  // Real-time visitor tracking & heartbeat
  useEffect(() => {
    // Send Pageview event on route change
    fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: currentPath,
        title: typeof document !== 'undefined' ? document.title : '',
        referrer: typeof document !== 'undefined' ? document.referrer : ''
      })
    }).catch(() => {});

    // Send Heartbeat immediately on load
    fetch('/api/analytics/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: currentPath })
    }).catch(() => {});

    // Heartbeat pulse every 25 seconds for real-time active user detection
    const interval = setInterval(() => {
      fetch('/api/analytics/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: currentPath })
      }).catch(() => {});
    }, 25000);

    return () => clearInterval(interval);
  }, [currentPath]);

  // Collections State
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [tools, setTools] = useState<ToolItem[]>(INITIAL_TOOLS);
  const [categories, setCategories] = useState<CategoryInfo[]>(INITIAL_CATEGORIES);
  const [tags, setTags] = useState<TagItem[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [pages, setPages] = useState<StaticPage[]>(INITIAL_PAGES);
  const [ads, setAds] = useState<AdPlacement[]>(INITIAL_ADS);
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>([]);
  const [homepageConfig, setHomepageConfig] = useState<HomepageSectionConfig[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    ...INITIAL_SETTINGS,
    taglineEn: 'Discover. Learn. Build.',
    heroHeadlineEn: 'Discover. Learn. Build.',
    heroSubheadlineEn: 'Bringing verified AI, useful technology, freelancing career paths, and digital tools together in one place.',
    footerDisclaimerEn: 'KhojGhor is an independent digital knowledge platform for students, creators, and freelancers in Bangladesh.',
    analyticsTimezone: 'Asia/Dhaka (UTC+06:00)',
    activeSessionTimeoutMinutes: 5
  });

  const [analyticsStats, setAnalyticsStats] = useState<AnalyticsStats | null>(null);

  // Bookmarks & Search History
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('khojghor_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('khojghor_recent_searches');
      return saved ? JSON.parse(saved) : ['DeepSeek', 'Cursor AI', 'NotebookLM', 'Upwork'];
    } catch {
      return ['DeepSeek', 'Cursor AI'];
    }
  });

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(null);

  // Initial Fetch from Real Backend
  const refreshAllData = useCallback(async () => {
    try {
      // 1. Check Auth Status
      const authRes = await fetch('/api/auth/me');
      if (authRes.ok) {
        const authData = await authRes.json();
        if (authData.authenticated) {
          setIsAdminLoggedIn(true);
          setCurrentAdminUser(authData.user);
        } else {
          setIsAdminLoggedIn(false);
          setCurrentAdminUser(null);
        }
      }

      // 2. Fetch Articles
      const artRes = await fetch('/api/articles');
      if (artRes.ok) {
        const data = await artRes.json();
        if (data.articles) setArticles(data.articles);
      }

      // 3. Fetch Videos
      const vidRes = await fetch('/api/videos');
      if (vidRes.ok) {
        const data = await vidRes.json();
        if (data.videos) setVideos(data.videos);
      }

      // 4. Fetch Tools
      const toolRes = await fetch('/api/tools');
      if (toolRes.ok) {
        const data = await toolRes.json();
        if (data.tools) setTools(data.tools);
      }

      // 5. Fetch Categories
      const catRes = await fetch('/api/categories');
      if (catRes.ok) {
        const data = await catRes.json();
        if (data.categories) setCategories(data.categories);
      }

      // 6. Fetch Tags
      const tagRes = await fetch('/api/tags');
      if (tagRes.ok) {
        const data = await tagRes.json();
        if (data.tags) setTags(data.tags);
      }

      // 7. Fetch Pages
      const pageRes = await fetch('/api/pages');
      if (pageRes.ok) {
        const data = await pageRes.json();
        if (data.pages) setPages(data.pages);
      }

      // 8. Fetch Ads
      const adRes = await fetch('/api/ads');
      if (adRes.ok) {
        const data = await adRes.json();
        if (data.ads) setAds(data.ads);
      }

      // 9. Fetch Settings
      const setRes = await fetch('/api/settings');
      if (setRes.ok) {
        const data = await setRes.json();
        if (data.settings) setSettings(data.settings);
      }

      // 10. Fetch Navigation
      const navRes = await fetch('/api/navigation');
      if (navRes.ok) {
        const data = await navRes.json();
        if (data.navigation) setNavigation(data.navigation);
      }

      // 11. Fetch Homepage Config
      const homeRes = await fetch('/api/homepage/config');
      if (homeRes.ok) {
        const data = await homeRes.json();
        if (data.config) setHomepageConfig(data.config);
      }
    } catch (e) {
      console.warn('Backend sync warning, using local fallback:', e);
    }
  }, []);

  const refreshAnalytics = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics/stats');
      if (res.ok) {
        const data = await res.json();
        setAnalyticsStats(data);
      }
    } catch (e) {
      console.error('Failed to fetch analytics stats:', e);
    }
  }, []);

  useEffect(() => {
    refreshAllData();
    refreshAnalytics();

    // Poll analytics stats every 15 seconds for real-time dashboard view
    const statsInterval = setInterval(refreshAnalytics, 15000);
    return () => clearInterval(statsInterval);
  }, [refreshAllData, refreshAnalytics]);

  // Admin Auth methods
  const adminLogin = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setIsAdminLoggedIn(true);
        setCurrentAdminUser(data.user);
        refreshAllData();
        return { success: true };
      }
      return { success: false, error: data.error || 'Authentication failed' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Connection error' };
    }
  };

  const adminLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    setIsAdminLoggedIn(false);
    setCurrentAdminUser(null);
  };

  // CRUD for Articles
  const recordArticleView = useCallback((articleId: string) => {
    fetch(`/api/articles/${articleId}/view`, { method: 'POST' }).catch(() => {});
    setArticles(prev => prev.map(a => (a.id === articleId ? { ...a, views: a.views + 1 } : a)));
  }, []);

  const addArticle = async (articleData: Omit<Article, 'id' | 'views'>): Promise<Article> => {
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData)
    });
    const newArt = await res.json();
    setArticles(prev => [newArt, ...prev]);
    return newArt;
  };

  const updateArticle = async (id: string, updates: Partial<Article>, revisionNote?: string) => {
    const res = await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updates, revisionNote })
    });
    if (res.ok) {
      const updated = await res.json();
      setArticles(prev => prev.map(a => (a.id === id ? updated : a)));
    }
  };

  const deleteArticle = async (id: string) => {
    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setArticles(prev => prev.map(a => (a.id === id ? { ...a, status: 'trash' } : a)));
    }
  };

  const restoreArticle = async (id: string) => {
    const res = await fetch(`/api/articles/${id}/restore`, { method: 'POST' });
    if (res.ok) {
      setArticles(prev => prev.map(a => (a.id === id ? { ...a, status: 'published' } : a)));
    }
  };

  const permanentDeleteArticle = async (id: string) => {
    const res = await fetch(`/api/articles/${id}/permanent`, { method: 'DELETE' });
    if (res.ok) {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  const bulkArticleAction = async (action: string, ids: string[], category?: string) => {
    const res = await fetch('/api/articles/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ids, category })
    });
    if (res.ok) {
      refreshAllData();
    }
  };

  // CRUD for Videos
  const recordVideoView = useCallback((videoId: string) => {
    fetch(`/api/videos/${videoId}/view`, { method: 'POST' }).catch(() => {});
    setVideos(prev => prev.map(v => (v.id === videoId ? { ...v, views: v.views + 1 } : v)));
  }, []);

  const addVideo = async (videoData: Omit<VideoItem, 'id' | 'views'>): Promise<VideoItem> => {
    const res = await fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videoData)
    });
    const newVid = await res.json();
    setVideos(prev => [newVid, ...prev]);
    return newVid;
  };

  const updateVideo = async (id: string, updates: Partial<VideoItem>) => {
    const res = await fetch(`/api/videos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const updated = await res.json();
      setVideos(prev => prev.map(v => (v.id === id ? updated : v)));
    }
  };

  const deleteVideo = async (id: string) => {
    const res = await fetch(`/api/videos/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setVideos(prev => prev.filter(v => v.id !== id));
    }
  };

  // CRUD for Tools
  const addTool = async (toolData: Omit<ToolItem, 'id'>): Promise<ToolItem> => {
    const res = await fetch('/api/tools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toolData)
    });
    const newTool = await res.json();
    setTools(prev => [newTool, ...prev]);
    return newTool;
  };

  const updateTool = async (id: string, updates: Partial<ToolItem>) => {
    const res = await fetch(`/api/tools/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const updated = await res.json();
      setTools(prev => prev.map(t => (t.id === id ? updated : t)));
    }
  };

  const deleteTool = async (id: string) => {
    const res = await fetch(`/api/tools/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setTools(prev => prev.filter(t => t.id !== id));
    }
  };

  // Categories & Tags
  const addCategory = async (category: CategoryInfo) => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    });
    if (res.ok) {
      const newCat = await res.json();
      setCategories(prev => [...prev, newCat]);
    }
  };

  const updateCategory = async (id: string, updates: Partial<CategoryInfo>) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const updated = await res.json();
      setCategories(prev => prev.map(c => (c.id === id ? updated : c)));
    }
  };

  const deleteCategory = async (id: string, force?: boolean): Promise<{ ok: boolean; error?: string }> => {
    const url = force ? `/api/categories/${id}?force=true` : `/api/categories/${id}`;
    const res = await fetch(url, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      setCategories(prev => prev.filter(c => c.id !== id));
      return { ok: true };
    }
    return { ok: false, error: data.error };
  };

  const addTag = async (nameBn: string, nameEn: string, slug: string) => {
    const res = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nameBn, nameEn, slug })
    });
    if (res.ok) {
      const newTag = await res.json();
      setTags(prev => [...prev, newTag]);
    }
  };

  const deleteTag = async (id: string) => {
    const res = await fetch(`/api/tags/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setTags(prev => prev.filter(t => t.id !== id));
    }
  };

  // Media
  const uploadMedia = async (filename: string, fileData: string, altText?: string, caption?: string): Promise<MediaItem | null> => {
    const res = await fetch('/api/media/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, fileData, altText, caption })
    });
    if (res.ok) {
      const item = await res.json();
      setMedia(prev => [item, ...prev]);
      return item;
    }
    return null;
  };

  const updateMedia = async (id: string, updates: Partial<MediaItem>) => {
    const res = await fetch(`/api/media/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const updated = await res.json();
      setMedia(prev => prev.map(m => (m.id === id ? updated : m)));
    }
  };

  const deleteMedia = async (id: string) => {
    const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMedia(prev => prev.filter(m => m.id !== id));
    }
  };

  // Comments
  const addComment = async (articleId: string, articleTitle: string, authorName: string, authorEmail: string, content: string) => {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, articleTitle, authorName, authorEmail, content })
    });
    if (res.ok) {
      const newCom = await res.json();
      setComments(prev => [newCom, ...prev]);
    }
  };

  const updateCommentStatus = async (id: string, status: CommentItem['status']) => {
    const res = await fetch(`/api/comments/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      const updated = await res.json();
      setComments(prev => prev.map(c => (c.id === id ? updated : c)));
    }
  };

  // Ads & Settings & Pages
  const updateAdPlacement = async (id: string, updates: Partial<AdPlacement>) => {
    const res = await fetch(`/api/ads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const updated = await res.json();
      setAds(prev => prev.map(a => (a.id === id ? updated : a)));
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings)
    });
    if (res.ok) {
      const updated = await res.json();
      setSettings(updated.settings);
    }
  };

  const updatePage = async (slug: string, updates: Partial<StaticPage>) => {
    const res = await fetch(`/api/pages/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const updated = await res.json();
      setPages(prev => prev.map(p => (p.slug === slug ? updated : p)));
    }
  };

  const updateHomepageConfig = async (config: HomepageSectionConfig[]) => {
    const res = await fetch('/api/homepage/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config })
    });
    if (res.ok) {
      setHomepageConfig(config);
    }
  };

  const updateNavigationConfig = async (navItems: NavigationItem[]) => {
    const res = await fetch('/api/navigation', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ navigation: navItems })
    });
    if (res.ok) {
      setNavigation(navItems);
    }
  };

  // Admin User Management
  const createAdminUser = async (userData: { name: string; email: string; password: string; role: any }) => {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (res.ok) {
      const newU = await res.json();
      setAdminUsers(prev => [...prev, newU]);
    }
  };

  const updateAdminUser = async (id: string, updates: Partial<AdminUser> & { password?: string }) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const updated = await res.json();
      setAdminUsers(prev => prev.map(u => (u.id === id ? updated : u)));
    }
  };

  // Bookmarks
  const toggleBookmark = (articleId: string) => {
    setBookmarks(prev => {
      const next = prev.includes(articleId) ? prev.filter(id => id !== articleId) : [...prev, articleId];
      localStorage.setItem('khojghor_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const isBookmarked = (articleId: string) => bookmarks.includes(articleId);

  // Search History
  const addRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches(prev => {
      const next = [trimmed, ...prev.filter(q => q.toLowerCase() !== trimmed.toLowerCase())].slice(0, 10);
      localStorage.setItem('khojghor_recent_searches', JSON.stringify(next));
      return next;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('khojghor_recent_searches');
  };

  // Newsletter
  const subscribeNewsletter = async (email: string) => {
    const res = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok) return { ok: true };
    return { ok: false, error: data.error };
  };

  // Backup & Reset
  const resetAllToDefault = async () => {
    await fetch('/api/backup/reset', { method: 'POST' });
    await refreshAllData();
  };

  const exportDatabaseJson = async (): Promise<string> => {
    const res = await fetch('/api/backup/export');
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  };

  const importDatabaseJson = async (jsonStr: string): Promise<boolean> => {
    try {
      const data = JSON.parse(jsonStr);
      const res = await fetch('/api/backup/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        await refreshAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        adminLanguage,
        setAdminLanguage,
        t,
        adminT,
        currentPath,
        routeInfo,
        navigateTo,
        articles,
        videos,
        tools,
        categories,
        tags,
        media,
        comments,
        users,
        adminUsers,
        pages,
        ads,
        navigation,
        subscribers,
        activityLogs,
        homepageConfig,
        settings,
        bookmarks,
        recentSearches,
        analyticsStats,
        refreshAnalytics,
        isAdminLoggedIn,
        currentAdminUser,
        adminLogin,
        adminLogout,
        recordArticleView,
        addArticle,
        updateArticle,
        deleteArticle,
        restoreArticle,
        permanentDeleteArticle,
        bulkArticleAction,
        recordVideoView,
        addVideo,
        updateVideo,
        deleteVideo,
        addTool,
        updateTool,
        deleteTool,
        addCategory,
        updateCategory,
        deleteCategory,
        addTag,
        deleteTag,
        uploadMedia,
        updateMedia,
        deleteMedia,
        addComment,
        updateCommentStatus,
        updateAdPlacement,
        updateSettings,
        updatePage,
        updateHomepageConfig,
        updateNavigationConfig,
        createAdminUser,
        updateAdminUser,
        toggleBookmark,
        isBookmarked,
        addRecentSearch,
        clearRecentSearches,
        subscribeNewsletter,
        resetAllToDefault,
        exportDatabaseJson,
        importDatabaseJson,
        isSearchModalOpen,
        setIsSearchModalOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
