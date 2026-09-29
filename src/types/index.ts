export type ContentCategory = 
  | 'ai'
  | 'tech'
  | 'earn'
  | 'student'
  | 'make-build'
  | 'trading'
  | 'trends'
  | 'it-news';

export type Language = 'bn' | 'en';

export interface CategoryInfo {
  id: string;
  slug: ContentCategory | string;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  descriptionEn?: string;
  subcategories: { slug: string; nameBn: string; nameEn: string }[];
  icon: string;
}

export interface TagItem {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  articleCount?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EarningStructuredData {
  platformName: string;
  whoCanUse: string;
  bangladeshAvailability: 'সম্পূর্ণ সক্রিয় (Fully Available)' | 'সীমিত (Limited)' | 'ভিপিএন বা বিশেষ শর্ত প্রযোজ্য';
  requirements: string[];
  earningModel: string;
  paymentMethods: string[];
  minimumWithdrawal: string;
  fees: string;
  pros: string[];
  cons: string[];
  officialUrl: string;
  safetyRating: string;
}

export interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'subheading' | 'callout' | 'code' | 'image' | 'list' | 'table';
  content?: string;
  language?: string; // for code
  calloutType?: 'info' | 'warning' | 'tip' | 'success';
  items?: string[]; // for lists
  tableData?: { headers: string[]; rows: string[][] };
  imageUrl?: string;
  caption?: string;
}

export interface ArticleRevision {
  id: string;
  articleId: string;
  titleBn: string;
  excerptBn: string;
  savedAt: string;
  savedBy: string;
  note?: string;
}

export interface Article {
  id: string;
  titleBn: string;
  titleEn?: string;
  slug: string;
  category: ContentCategory;
  subcategory: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
    email?: string;
  };
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
  sourceName?: string;
  sourceUrl?: string;
  scheduledAt?: string;
  deletedAt?: string;
  readingTimeMin: number;
  excerptBn: string;
  excerptEn?: string;
  blocks: ArticleBlock[];
  faqs?: FaqItem[];
  earningDetails?: EarningStructuredData;
  stepByStepGuide?: { step: number; title: string; desc: string }[];
  relatedArticleIds?: string[];
  relatedVideoIds?: string[];
  relatedToolIds?: string[];
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  openGraphImage?: string;
  views: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  status: 'published' | 'draft' | 'scheduled' | 'review' | 'archived' | 'trash';
  revisions?: ArticleRevision[];
}

export interface VideoItem {
  id: string;
  titleBn: string;
  titleEn?: string;
  youtubeId: string;
  thumbnailUrl: string;
  category: ContentCategory | 'tutorials';
  subcategory?: string;
  duration: string;
  publishedAt: string;
  views: number;
  summaryBn: string;
  summaryEn?: string;
  fullGuideBn?: string;
  toolsUsed?: string[];
  importantLinks?: { label: string; url: string }[];
  relatedArticleIds?: string[];
  relatedVideoIds?: string[];
  status: 'published' | 'draft' | 'trash';
}

export interface ToolItem {
  id: string;
  name: string;
  logo: string;
  descriptionBn: string;
  descriptionEn?: string;
  category: 'ai' | 'writing' | 'design' | 'video' | 'productivity' | 'education' | 'development' | 'marketing' | 'finance' | 'creator';
  pricing: 'Free' | 'Freemium' | 'Paid';
  pricingDetailsBn?: string;
  featuresBn: string[];
  featuresEn?: string[];
  officialUrl: string;
  affiliateUrl?: string;
  tutorialUrl?: string;
  relatedArticleIds?: string[];
  relatedVideoIds?: string[];
  rating: number;
  featured?: boolean;
  status?: 'published' | 'draft' | 'trash';
}

export type AdType = 'smart_link' | 'direct_link' | 'code' | 'api' | 'banner' | 'interstitial' | 'pre_action';
export type AdProvider = 'adsterra' | 'google_adsense' | 'monetag' | 'propeller' | 'direct' | 'custom';
export type AdStatus = 'active' | 'paused' | 'draft' | 'scheduled' | 'expired';
export type AdDisplayMode = 'pre_action' | 'inline' | 'periodic' | 'interstitial' | 'external_link' | 'related_content' | 'provider_embedded';
export type AdFallbackBehavior = 'continue_to_destination' | 'show_error' | 'skip' | 'retry';

export interface AdCampaign {
  id: string;
  name: string;
  description?: string;
  type: AdType;
  provider: AdProvider | string;
  status: AdStatus;
  placementIds: string[]; // target placement registry IDs
  targetRoutes?: string[]; // e.g. ['/', '/tools', '/article/*']
  targetButtons?: string[]; // e.g. ['btn_hero_explore_latest', 'btn_tool_card_launch']
  targetContentIds?: string[]; // specific article/video/tool IDs
  displayMode: AdDisplayMode;
  smartLinkUrl?: string;
  destinationUrl?: string;
  adCode?: string;
  bannerImageUrl?: string;
  bannerTitle?: string;
  bannerSubtitle?: string;
  ctaText?: string;
  displayDelay: number; // in seconds (for pre-action countdown)
  frequencyCap: number; // max per session (0 = unlimited)
  cooldownMinutes: number; // min minutes between impressions
  priority: number; // 1-10
  startDate?: string;
  endDate?: string;
  deviceTarget: 'all' | 'desktop' | 'mobile' | 'tablet';
  languageTarget: 'all' | 'bn' | 'en';
  userEligibility: 'all' | 'new_visitors' | 'returning_visitors';
  openInNewTab: boolean;
  fallbackBehavior: AdFallbackBehavior;
  impressions: number;
  clicks: number;
  completions: number;
  errors: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdPlacement {
  id: string;
  name: string;
  location: 'header' | 'homepage' | 'article_top' | 'article_middle' | 'article_bottom' | 'sidebar' | 'mobile' | 'footer' | string;
  enabled: boolean;
  code: string;
  deviceTarget: 'all' | 'desktop' | 'mobile';
  pageTarget: 'all' | 'homepage' | 'articles' | 'tools' | 'videos';
  // Extended fields for universal registry
  category?: 'banner' | 'button' | 'article' | 'video' | 'tool' | 'page' | 'automatic';
  routePattern?: string;
  componentTarget?: string;
  supportedFormats?: AdType[];
  assignedCampaignId?: string;
  descriptionBn?: string;
  descriptionEn?: string;
}

export interface AdFrequencySettings {
  masterAdEnabled: boolean;
  periodicAdEnabled: boolean;
  periodicIntervalSeconds: number; // e.g. 180s
  pageviewFrequency: number; // e.g. every 3 pageviews
  maxAdsPerSession: number; // e.g. 3
  globalCooldownSeconds: number; // e.g. 45s
  preActionCountdownSeconds: number; // e.g. 3s default
  preventDuplicateClicks: boolean;
  debugMode: boolean;
  defaultFallbackBehavior: AdFallbackBehavior;
}

export interface AdApiIntegration {
  id: string;
  provider: 'adsterra' | 'google_adsense' | 'monetag' | 'propeller' | 'custom';
  name: string;
  apiKey?: string;
  apiEndpoint?: string;
  publisherId?: string;
  placementId?: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  notes?: string;
}

export interface AdEventRecord {
  id: string;
  campaignId: string;
  campaignName?: string;
  placementId: string;
  placementName?: string;
  eventType: 'impression' | 'click' | 'completion' | 'error' | 'skip';
  timestamp: string;
  device: 'desktop' | 'mobile' | 'tablet';
  path: string;
  errorMessage?: string;
}

export interface AdErrorLog {
  id: string;
  timestamp: string;
  campaignId?: string;
  campaignName?: string;
  placementId: string;
  errorReason: string;
  device: string;
  path: string;
}

export interface AdChangeHistoryItem {
  id: string;
  timestamp: string;
  adminEmail: string;
  action: string;
  target: string;
  details?: string;
}

export interface AdAnalyticsSummary {
  totalImpressions: number;
  totalClicks: number;
  averageCtr: number;
  totalCompletions: number;
  totalErrors: number;
  campaignPerformance: Array<{
    campaignId: string;
    campaignName: string;
    type: string;
    impressions: number;
    clicks: number;
    ctr: number;
    completions: number;
    errors: number;
  }>;
  placementPerformance: Array<{
    placementId: string;
    placementName: string;
    category: string;
    impressions: number;
    clicks: number;
    ctr: number;
  }>;
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  dailyTimeline: Array<{
    date: string;
    impressions: number;
    clicks: number;
    completions: number;
  }>;
}

export interface SiteSettings {
  siteTitleBn: string;
  siteTitleEn: string;
  taglineBn: string;
  taglineEn: string;
  heroHeadlineBn: string;
  heroHeadlineEn: string;
  heroSubheadlineBn: string;
  heroSubheadlineEn: string;
  googleAnalyticsId: string;
  googleSearchConsoleMeta: string;
  socials: {
    youtube: string;
    facebook: string;
    tiktok: string;
    instagram: string;
    telegram: string;
    x: string;
  };
  contactEmail: string;
  footerDisclaimerBn: string;
  footerDisclaimerEn: string;
  analyticsTimezone: string;
  activeSessionTimeoutMinutes: number;
}

export interface StaticPage {
  slug: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn?: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  fileType: string;
  fileSize: number; // in bytes
  dimensions?: string;
  uploadedAt: string;
  altText: string;
  caption?: string;
}

export interface CommentItem {
  id: string;
  articleId: string;
  articleTitle: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  status: 'approved' | 'pending' | 'spam' | 'trash';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'author' | 'moderator';
  status: 'active' | 'disabled';
  createdAt: string;
  lastLogin?: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  adminEmail: string;
  action: string;
  target: string;
  details?: string;
}

export interface HomepageSectionConfig {
  id: string;
  titleBn: string;
  titleEn: string;
  categorySlug: string;
  enabled: boolean;
  order: number;
  itemCount: number;
  descriptionBn: string;
  descriptionEn?: string;
}

export interface NavigationItem {
  id: string;
  labelBn: string;
  labelEn: string;
  url: string;
  order: number;
  enabled: boolean;
  isExternal?: boolean;
  location: 'header' | 'footer' | 'mobile';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

export interface AnalyticsStats {
  activeUsersNow: number;
  todayVisitors: number;
  last2DaysVisitors: number;
  last7DaysVisitors: number;
  last30DaysVisitors: number;
  todayPageViews: number;
  last30DaysPageViews: number;
  dailyHistory: { date: string; visitors: number; pageViews: number }[];
  popularArticles: { id: string; title: string; views: number }[];
  popularVideos: { id: string; title: string; views: number }[];
  popularPages: { path: string; views: number }[];
  trafficSources: { source: string; count: number; percentage: number }[];
  timezone: string;
  lastUpdated: string;
  isTrackingConnected: boolean;
}
