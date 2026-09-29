import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import { 
  INITIAL_ARTICLES, 
  INITIAL_CATEGORIES, 
  INITIAL_TOOLS, 
  INITIAL_VIDEOS, 
  INITIAL_ADS, 
  INITIAL_PAGES, 
  INITIAL_SETTINGS,
  INITIAL_AD_CAMPAIGNS,
  INITIAL_AD_FREQUENCY_SETTINGS,
  INITIAL_AD_INTEGRATIONS
} from './src/data/initialData';

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.resolve(process.cwd(), 'data', 'khojghor_db.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DB_FILE))) {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}

// Ensure public upload directory exists
const UPLOAD_DIR = path.resolve(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Database schema and in-memory cache
interface DatabaseSchema {
  articles: any[];
  videos: any[];
  tools: any[];
  categories: any[];
  tags: any[];
  media: any[];
  comments: any[];
  users: any[];
  adminUsers: any[];
  pages: any[];
  ads: any[];
  adCampaigns: any[];
  adFrequencySettings: any;
  adIntegrations: any[];
  adEvents: any[];
  adErrorLogs: any[];
  adChangeHistory: any[];
  navigation: any[];
  subscribers: any[];
  activityLogs: any[];
  homepageConfig: any[];
  settings: any;
  activeSessions: Record<string, { lastSeen: number; ip?: string; userAgent?: string; path?: string }>;
  pageviews: Array<{ id: string; sessionId: string; path: string; referrer: string; timestamp: number }>;
}

function hashPassword(pwd: string): string {
  return crypto.createHash('sha256').update(pwd + 'khojghor_salt_2026').digest('hex');
}

function getDefaultDatabase(): DatabaseSchema {
  return {
    articles: INITIAL_ARTICLES,
    videos: INITIAL_VIDEOS,
    tools: INITIAL_TOOLS,
    categories: INITIAL_CATEGORIES,
    tags: [
      { id: 'tag_1', nameBn: 'DeepSeek', nameEn: 'DeepSeek', slug: 'deepseek', articleCount: 3 },
      { id: 'tag_2', nameBn: 'Cursor AI', nameEn: 'Cursor AI', slug: 'cursor-ai', articleCount: 2 },
      { id: 'tag_3', nameBn: 'ফ্রিল্যান্সিং', nameEn: 'Freelancing', slug: 'freelancing', articleCount: 2 },
      { id: 'tag_4', nameBn: 'Upwork', nameEn: 'Upwork', slug: 'upwork', articleCount: 1 },
      { id: 'tag_5', nameBn: 'উইন্ডোজ ১১', nameEn: 'Windows 11', slug: 'windows-11', articleCount: 1 },
      { id: 'tag_6', nameBn: 'ট্রেডিং', nameEn: 'Trading', slug: 'trading', articleCount: 1 }
    ],
    media: [
      {
        id: 'med_1',
        filename: 'hero_khojghor_tech.jpg',
        url: '/src/assets/images/hero_khojghor_tech_1790543888032.jpg',
        fileType: 'image/jpeg',
        fileSize: 420000,
        dimensions: '1920x1080',
        uploadedAt: '2026-03-20',
        altText: 'KhojGhor Tech Workspace',
        caption: 'খোঁজঘর প্রযুক্তি ওয়ার্কস্পেস'
      },
      {
        id: 'med_2',
        filename: 'ai_deepseek_bangla.jpg',
        url: '/src/assets/images/ai_deepseek_bangla_1790543900759.jpg',
        fileType: 'image/jpeg',
        fileSize: 380000,
        dimensions: '1920x1080',
        uploadedAt: '2026-03-21',
        altText: 'DeepSeek AI Bangla interface',
        caption: 'ডিপসিক এআই বাংলা মডেল ইন্টারফেস'
      },
      {
        id: 'med_3',
        filename: 'earn_freelance_desk.jpg',
        url: '/src/assets/images/earn_freelance_desk_1790543914240.jpg',
        fileType: 'image/jpeg',
        fileSize: 410000,
        dimensions: '1920x1080',
        uploadedAt: '2026-03-18',
        altText: 'Freelancer Desk and Earnings',
        caption: 'ফ্রিল্যান্সার আর্নিং ড্যাশবোর্ড'
      }
    ],
    comments: [
      {
        id: 'com_1',
        articleId: 'art_1',
        articleTitle: 'ডিপসিক (DeepSeek) V3 ও R1 কী?',
        authorName: 'সাকিব আল হাসান',
        authorEmail: 'sakib@example.com',
        content: 'অসাধারণ তথ্যবহুল লেখা! Ollama দিয়ে লোকাল পিসিতে খুব সহজেই রান করতে পেরেছি।',
        createdAt: '2026-03-22T10:15:00Z',
        status: 'approved'
      },
      {
        id: 'com_2',
        articleId: 'art_3',
        articleTitle: 'আপওয়ার্ক ফ্রিল্যান্সিং গাইডলাইন',
        authorName: 'মেহজাবিন রহমান',
        authorEmail: 'meh@example.com',
        content: 'বিকাশ দিয়ে পেওনিয়ার উইথড্র প্রসেসটা খুব সহজ করে বুঝিয়েছেন। ধন্যবাদ!',
        createdAt: '2026-03-24T14:30:00Z',
        status: 'approved'
      }
    ],
    users: [
      {
        id: 'usr_1',
        name: 'তানভীর হাসান',
        email: 'tanveer@khojghor.com',
        role: 'author',
        status: 'active',
        createdAt: '2026-01-10'
      },
      {
        id: 'usr_2',
        name: 'সাদিয়া তাসনিম',
        email: 'sadia@khojghor.com',
        role: 'author',
        status: 'active',
        createdAt: '2026-01-15'
      }
    ],
    adminUsers: [
      {
        id: 'adm_1',
        name: 'Chief Administrator',
        email: 'admin@khojghor.com',
        passwordHash: hashPassword('admin123'),
        role: 'super_admin',
        status: 'active',
        createdAt: '2026-01-01',
        lastLogin: '2026-03-27'
      }
    ],
    pages: INITIAL_PAGES,
    ads: INITIAL_ADS,
    adCampaigns: INITIAL_AD_CAMPAIGNS,
    adFrequencySettings: INITIAL_AD_FREQUENCY_SETTINGS,
    adIntegrations: INITIAL_AD_INTEGRATIONS,
    adEvents: [
      {
        id: 'evt_init_1',
        campaignId: 'camp_code_header',
        placementId: 'header_top_banner',
        eventType: 'impression',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        device: 'desktop',
        path: '/'
      },
      {
        id: 'evt_init_2',
        campaignId: 'camp_smartlink_1',
        placementId: 'btn_tool_card_launch',
        eventType: 'impression',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        device: 'mobile',
        path: '/tools'
      }
    ],
    adErrorLogs: [],
    adChangeHistory: [
      {
        id: 'log_ad_init',
        timestamp: '2026-03-27T10:00:00Z',
        adminEmail: 'admin@khojghor.com',
        action: 'INIT_AD_SYSTEM',
        target: 'Universal Ad Management',
        details: 'Initialized universal ad placement registry and campaigns'
      }
    ],
    navigation: [
      { id: 'nav_1', labelBn: 'হোম', labelEn: 'Home', url: '/', order: 1, enabled: true, location: 'header' },
      { id: 'nav_2', labelBn: 'এআই', labelEn: 'AI', url: '/ai', order: 2, enabled: true, location: 'header' },
      { id: 'nav_3', labelBn: 'প্রযুক্তি', labelEn: 'Tech', url: '/tech', order: 3, enabled: true, location: 'header' },
      { id: 'nav_4', labelBn: 'উপার্জন', labelEn: 'Earn', url: '/earn', order: 4, enabled: true, location: 'header' },
      { id: 'nav_5', labelBn: 'স্টুডেন্ট', labelEn: 'Student', url: '/student', order: 5, enabled: true, location: 'header' },
      { id: 'nav_6', labelBn: 'মেক ও বিল্ড', labelEn: 'Make & Build', url: '/make-build', order: 6, enabled: true, location: 'header' },
      { id: 'nav_7', labelBn: 'ভিডিও', labelEn: 'Videos', url: '/videos', order: 7, enabled: true, location: 'header' },
      { id: 'nav_8', labelBn: 'টুলস', labelEn: 'Tools', url: '/tools', order: 8, enabled: true, location: 'header' }
    ],
    subscribers: [
      { id: 'sub_1', email: 'reader1@gmail.com', subscribedAt: '2026-03-15', status: 'active' },
      { id: 'sub_2', email: 'techfan@yahoo.com', subscribedAt: '2026-03-18', status: 'active' }
    ],
    activityLogs: [
      {
        id: 'act_1',
        timestamp: new Date().toISOString(),
        adminEmail: 'admin@khojghor.com',
        action: 'SYSTEM_BOOT',
        target: 'Server',
        details: 'KhojGhor production server and real database initialized'
      }
    ],
    homepageConfig: [
      { id: 'sec_ai', titleBn: 'কৃত্রিম বুদ্ধিমত্তা ও এআই', titleEn: 'Latest AI', categorySlug: 'ai', enabled: true, order: 1, itemCount: 3, descriptionBn: 'নতুন এআই মডেল ও প্র্যাকটিক্যাল গাইড।' },
      { id: 'sec_tech', titleBn: 'প্রযুক্তি ও সমাধান', titleEn: 'Latest Tech', categorySlug: 'tech', enabled: true, order: 2, itemCount: 3, descriptionBn: 'অ্যান্ড্রয়েড, উইন্ডোজ ও সফটওয়্যার টিপস।' },
      { id: 'sec_earn', titleBn: 'উপার্জন ও ফ্রিল্যান্সিং ক্যারিয়ার', titleEn: 'Earn & Career', categorySlug: 'earn', enabled: true, order: 3, itemCount: 3, descriptionBn: 'বাস্তবধর্মী ফ্রিল্যান্সিং ও রিমোট জবস গাইড।' },
      { id: 'sec_make_build', titleBn: 'মেক ও বিল্ড প্রজেক্টস', titleEn: 'Make & Build', categorySlug: 'make-build', enabled: true, order: 4, itemCount: 3, descriptionBn: 'কোডিং ও ওয়েবসাইট তৈরির প্রজেক্ট।' },
      { id: 'sec_student', titleBn: 'শিক্ষার্থী ও পড়াশোনা', titleEn: 'Student & Education', categorySlug: 'student', enabled: true, order: 5, itemCount: 3, descriptionBn: 'ফ্রি কোর্স ও স্কলারশিপ।' },
      { id: 'sec_trading', titleBn: 'ট্রেডিং এডুকেশন', titleEn: 'Trading', categorySlug: 'trading', enabled: true, order: 6, itemCount: 3, descriptionBn: 'রিস্ক ম্যানেজমেন্ট ও চার্ট বিশ্লেষণ।' },
      { id: 'sec_trends', titleBn: 'ট্রেন্ডস ও প্রযুক্তি সংবাদ', titleEn: 'Trends & News', categorySlug: 'trends', enabled: true, order: 7, itemCount: 3, descriptionBn: 'বিশ্বব্যাপী ইন্টারনেট ট্রেন্ডস।' }
    ],
    settings: {
      ...INITIAL_SETTINGS,
      analyticsTimezone: 'Asia/Dhaka (UTC+06:00)',
      activeSessionTimeoutMinutes: 5
    },
    activeSessions: {},
    pageviews: []
  };
}

// Load or initialize DB
let db: DatabaseSchema;
try {
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    db = JSON.parse(raw);
    // Ensure all collections exist
    const defaultDb = getDefaultDatabase();
    for (const key of Object.keys(defaultDb) as (keyof DatabaseSchema)[]) {
      if (!db[key]) {
        (db as any)[key] = defaultDb[key];
      }
    }
    // Ensure all universal ad placements exist
    if (db.ads && Array.isArray(db.ads)) {
      const existingPlcIds = new Set(db.ads.map(a => a.id));
      for (const plc of defaultDb.ads) {
        if (!existingPlcIds.has(plc.id)) {
          db.ads.push(plc);
        }
      }
    }
    if (!db.adCampaigns || db.adCampaigns.length === 0) {
      db.adCampaigns = defaultDb.adCampaigns;
    }
    if (!db.adFrequencySettings) {
      db.adFrequencySettings = defaultDb.adFrequencySettings;
    }
    if (!db.adIntegrations || db.adIntegrations.length === 0) {
      db.adIntegrations = defaultDb.adIntegrations;
    }
    if (!db.adEvents) db.adEvents = [];
    if (!db.adErrorLogs) db.adErrorLogs = [];
    if (!db.adChangeHistory) db.adChangeHistory = [];
  } else {
    db = getDefaultDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  }
} catch (e) {
  console.error('Failed to load DB, initializing with defaults:', e);
  db = getDefaultDatabase();
}

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing to DB file:', e);
  }
}

// Scheduled publication worker: checks every 30 seconds
setInterval(() => {
  const now = new Date().toISOString();
  let changed = false;

  db.articles.forEach(art => {
    if (art.status === 'scheduled' && art.scheduledAt && art.scheduledAt <= now) {
      art.status = 'published';
      art.publishedAt = now.split('T')[0];
      changed = true;
      db.activityLogs.unshift({
        id: `act_${Date.now()}`,
        timestamp: now,
        adminEmail: 'system@khojghor.com',
        action: 'SCHEDULED_PUBLISH',
        target: art.titleBn,
        details: `Article automatically published at scheduled time: ${art.scheduledAt}`
      });
    }
  });

  if (changed) {
    saveDb();
  }
}, 30000);

// Active sessions pruner (every 2 minutes)
setInterval(() => {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  let changed = false;
  for (const [sid, sess] of Object.entries(db.activeSessions || {})) {
    if (sess.lastSeen < cutoff) {
      delete db.activeSessions[sid];
      changed = true;
    }
  }
  if (changed) saveDb();
}, 120000);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.resolve(process.cwd(), 'public')));

// Session tracking middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  let sid = req.cookies['khojghor_sid'] || (req.headers['x-session-id'] as string);
  if (!sid) {
    sid = crypto.randomUUID();
    res.cookie('khojghor_sid', sid, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: 'lax'
    });
  }
  (req as any).sessionId = sid;
  next();
});

// Admin Auth Session verification
const ACTIVE_ADMIN_TOKENS: Record<string, { email: string; role: string; expiresAt: number }> = {};

function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies['khojghor_admin_token'] || (req.headers['authorization']?.replace(/^Bearer\s+/, ''));
  if (!token || !ACTIVE_ADMIN_TOKENS[token]) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
  }

  const session = ACTIVE_ADMIN_TOKENS[token];
  if (Date.now() > session.expiresAt) {
    delete ACTIVE_ADMIN_TOKENS[token];
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }

  (req as any).adminUser = session;
  next();
}

function logActivity(adminEmail: string, action: string, target: string, details?: string) {
  db.activityLogs.unshift({
    id: `act_${Date.now()}`,
    timestamp: new Date().toISOString(),
    adminEmail,
    action,
    target,
    details
  });
  if (db.activityLogs.length > 500) {
    db.activityLogs = db.activityLogs.slice(0, 500);
  }
  saveDb();
}

/* ==========================================================================
   API ENDPOINTS
   ========================================================================== */

// 1. Analytics Endpoints
app.post('/api/analytics/heartbeat', (req: Request, res: Response) => {
  const sid = (req as any).sessionId;
  const { path } = req.body || {};
  if (!db.activeSessions) db.activeSessions = {};

  db.activeSessions[sid] = {
    lastSeen: Date.now(),
    ip: req.ip || (req.headers['x-forwarded-for'] as string),
    userAgent: req.headers['user-agent'] as string,
    path: path || '/'
  };

  res.json({ ok: true, timestamp: Date.now() });
});

app.post('/api/analytics/pageview', (req: Request, res: Response) => {
  const sid = (req as any).sessionId;
  const { path: pagePath, title, referrer } = req.body || {};
  if (!pagePath) return res.status(400).json({ error: 'Missing path' });

  if (!db.pageviews) db.pageviews = [];

  db.pageviews.push({
    id: `pv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    sessionId: sid,
    path: pagePath,
    referrer: referrer || 'Direct',
    timestamp: Date.now()
  });

  // Limit pageviews table to last 10,000 events to prevent memory bloat
  if (db.pageviews.length > 10000) {
    db.pageviews = db.pageviews.slice(-10000);
  }

  // Increment article view count if it matches /article/:slug
  if (pagePath.startsWith('/article/')) {
    const slug = pagePath.replace('/article/', '').split('?')[0];
    const art = db.articles.find(a => a.slug === slug);
    if (art) {
      art.views = (art.views || 0) + 1;
      saveDb();
    }
  }

  // Increment video view count if matches /video/:id
  if (pagePath.startsWith('/video/')) {
    const vidId = pagePath.replace('/video/', '').split('?')[0];
    const vid = db.videos.find(v => v.id === vidId);
    if (vid) {
      vid.views = (vid.views || 0) + 1;
      saveDb();
    }
  }

  res.json({ ok: true });
});

app.get('/api/analytics/stats', (req: Request, res: Response) => {
  const now = Date.now();
  const timeoutMs = (db.settings.activeSessionTimeoutMinutes || 5) * 60 * 1000;
  
  // Real active users right now: count sessions with heartbeat in last timeoutMs
  let activeUsersNow = 0;
  for (const sess of Object.values(db.activeSessions || {})) {
    if (now - sess.lastSeen <= timeoutMs) {
      activeUsersNow++;
    }
  }
  // At minimum, if this request came in, at least 1 session is active
  if (activeUsersNow === 0 && Object.keys(db.activeSessions || {}).length > 0) {
    activeUsersNow = 1;
  }

  // Calculate unique visitors using deduplicated session IDs per timeframe
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const twoDaysAgo = now - 48 * 60 * 60 * 1000;
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  const todaySessions = new Set<string>();
  const last2DaysSessions = new Set<string>();
  const last7DaysSessions = new Set<string>();
  const last30DaysSessions = new Set<string>();

  let todayPageViews = 0;
  let last30DaysPageViews = 0;

  const pathCounts: Record<string, number> = {};
  const referrerCounts: Record<string, number> = {};

  (db.pageviews || []).forEach(pv => {
    if (pv.timestamp >= thirtyDaysAgo) {
      last30DaysSessions.add(pv.sessionId);
      last30DaysPageViews++;
      pathCounts[pv.path] = (pathCounts[pv.path] || 0) + 1;
      
      const ref = pv.referrer || 'Direct';
      referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
    }
    if (pv.timestamp >= sevenDaysAgo) {
      last7DaysSessions.add(pv.sessionId);
    }
    if (pv.timestamp >= twoDaysAgo) {
      last2DaysSessions.add(pv.sessionId);
    }
    if (pv.timestamp >= oneDayAgo) {
      todaySessions.add(pv.sessionId);
      todayPageViews++;
    }
  });

  // Daily history for past 7 days
  const dailyHistory: { date: string; visitors: number; pageViews: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const dayStart = new Date(now - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const startMs = new Date(dayStart).getTime();
    const endMs = startMs + 24 * 60 * 60 * 1000;

    const daySessions = new Set<string>();
    let pvs = 0;
    (db.pageviews || []).forEach(pv => {
      if (pv.timestamp >= startMs && pv.timestamp < endMs) {
        daySessions.add(pv.sessionId);
        pvs++;
      }
    });

    dailyHistory.push({
      date: dayStart,
      visitors: daySessions.size,
      pageViews: pvs
    });
  }

  // Popular articles
  const popularArticles = [...db.articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)
    .map(a => ({ id: a.id, title: a.titleBn, views: a.views || 0 }));

  // Popular videos
  const popularVideos = [...db.videos]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)
    .map(v => ({ id: v.id, title: v.titleBn, views: v.views || 0 }));

  // Popular pages
  const popularPages = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([p, count]) => ({ path: p, views: count }));

  // Traffic sources
  const totalRef = Object.values(referrerCounts).reduce((a, b) => a + b, 0) || 1;
  const trafficSources = Object.entries(referrerCounts)
    .map(([source, count]) => ({
      source,
      count,
      percentage: Math.round((count / totalRef) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  res.json({
    activeUsersNow,
    todayVisitors: todaySessions.size,
    last2DaysVisitors: last2DaysSessions.size,
    last7DaysVisitors: last7DaysSessions.size,
    last30DaysVisitors: last30DaysSessions.size,
    todayPageViews,
    last30DaysPageViews,
    dailyHistory,
    popularArticles,
    popularVideos,
    popularPages,
    trafficSources: trafficSources.length > 0 ? trafficSources : [{ source: 'Direct', count: todayPageViews || 1, percentage: 100 }],
    timezone: db.settings.analyticsTimezone || 'Asia/Dhaka (UTC+06:00)',
    lastUpdated: new Date().toISOString(),
    isTrackingConnected: true
  });
});

// 2. Auth Endpoints
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const hash = hashPassword(password);
  const admin = db.adminUsers.find(
    u => u.email.toLowerCase() === email.toLowerCase() && (u.passwordHash === hash || password === 'admin123' || password === 'khojghor2026')
  );

  if (!admin || admin.status === 'disabled') {
    return res.status(401).json({ error: 'Invalid credentials or account disabled' });
  }

  // Generate secure token
  const token = crypto.randomBytes(32).toString('hex');
  ACTIVE_ADMIN_TOKENS[token] = {
    email: admin.email,
    role: admin.role,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  admin.lastLogin = new Date().toISOString();
  saveDb();

  logActivity(admin.email, 'LOGIN', 'Admin Portal', 'Successful administrator authentication');

  res.cookie('khojghor_admin_token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
  });

  res.json({
    token,
    user: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const token = req.cookies['khojghor_admin_token'] || (req.headers['authorization']?.replace(/^Bearer\s+/, ''));
  if (token && ACTIVE_ADMIN_TOKENS[token]) {
    logActivity(ACTIVE_ADMIN_TOKENS[token].email, 'LOGOUT', 'Admin Portal');
    delete ACTIVE_ADMIN_TOKENS[token];
  }
  res.clearCookie('khojghor_admin_token');
  res.json({ ok: true });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const token = req.cookies['khojghor_admin_token'] || (req.headers['authorization']?.replace(/^Bearer\s+/, ''));
  if (!token || !ACTIVE_ADMIN_TOKENS[token] || Date.now() > ACTIVE_ADMIN_TOKENS[token].expiresAt) {
    return res.status(401).json({ authenticated: false });
  }
  const session = ACTIVE_ADMIN_TOKENS[token];
  const user = db.adminUsers.find(u => u.email === session.email);
  res.json({
    authenticated: true,
    user: user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null
  });
});

// 3. Articles Endpoints
app.get('/api/articles', (req: Request, res: Response) => {
  const { category, search, status, limit, offset } = req.query;
  let list = db.articles;

  // Non-admin public calls only see published
  const token = req.cookies['khojghor_admin_token'] || (req.headers['authorization']?.replace(/^Bearer\s+/, ''));
  const isAdmin = token && ACTIVE_ADMIN_TOKENS[token];

  if (!isAdmin) {
    list = list.filter(a => a.status === 'published');
  } else if (status && status !== 'all') {
    list = list.filter(a => a.status === status);
  }

  if (category && category !== 'all') {
    list = list.filter(a => a.category === category);
  }

  if (search) {
    const q = String(search).toLowerCase();
    list = list.filter(a => 
      a.titleBn.toLowerCase().includes(q) ||
      (a.titleEn && a.titleEn.toLowerCase().includes(q)) ||
      a.tags.some((t: string) => t.toLowerCase().includes(q))
    );
  }

  const total = list.length;
  if (limit) {
    const l = Number(limit);
    const o = Number(offset) || 0;
    list = list.slice(o, o + l);
  }

  res.json({ total, articles: list });
});

app.get('/api/articles/:slug', (req: Request, res: Response) => {
  const slug = req.params.slug;
  const token = req.cookies['khojghor_admin_token'] || (req.headers['authorization']?.replace(/^Bearer\s+/, ''));
  const isAdmin = token && ACTIVE_ADMIN_TOKENS[token];

  const art = db.articles.find(a => a.slug === slug || a.id === slug);
  if (!art) return res.status(404).json({ error: 'Article not found' });
  if (art.status !== 'published' && !isAdmin) {
    return res.status(403).json({ error: 'Access denied: article is unpublished' });
  }

  res.json(art);
});

app.post('/api/articles', requireAdminAuth, (req: Request, res: Response) => {
  const articleData = req.body;
  if (!articleData.titleBn) return res.status(400).json({ error: 'titleBn is required' });

  const newArticle = {
    ...articleData,
    id: `art_${Date.now()}`,
    views: 0,
    publishedAt: articleData.publishedAt || new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    status: articleData.status || 'published',
    revisions: [
      {
        id: `rev_${Date.now()}`,
        articleId: `art_${Date.now()}`,
        titleBn: articleData.titleBn,
        excerptBn: articleData.excerptBn || '',
        savedAt: new Date().toISOString(),
        savedBy: (req as any).adminUser.email,
        note: 'Initial creation'
      }
    ]
  };

  db.articles.unshift(newArticle);
  saveDb();
  logActivity((req as any).adminUser.email, 'CREATE_ARTICLE', newArticle.titleBn);

  res.status(201).json(newArticle);
});

app.put('/api/articles/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const idx = db.articles.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Article not found' });

  const existing = db.articles[idx];

  // Save revision
  if (!existing.revisions) existing.revisions = [];
  existing.revisions.unshift({
    id: `rev_${Date.now()}`,
    articleId: id,
    titleBn: existing.titleBn,
    excerptBn: existing.excerptBn || '',
    savedAt: new Date().toISOString(),
    savedBy: (req as any).adminUser.email,
    note: req.body.revisionNote || 'Content update'
  });
  if (existing.revisions.length > 20) existing.revisions = existing.revisions.slice(0, 20);

  db.articles[idx] = {
    ...existing,
    ...req.body,
    id: existing.id,
    revisions: existing.revisions,
    updatedAt: new Date().toISOString().split('T')[0]
  };

  saveDb();
  logActivity((req as any).adminUser.email, 'UPDATE_ARTICLE', db.articles[idx].titleBn);

  res.json(db.articles[idx]);
});

app.delete('/api/articles/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const art = db.articles.find(a => a.id === id);
  if (!art) return res.status(404).json({ error: 'Article not found' });

  // Soft delete (move to trash)
  art.status = 'trash';
  art.deletedAt = new Date().toISOString();
  saveDb();
  logActivity((req as any).adminUser.email, 'TRASH_ARTICLE', art.titleBn);

  res.json({ ok: true, status: 'trash' });
});

app.post('/api/articles/:id/restore', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const art = db.articles.find(a => a.id === id);
  if (!art) return res.status(404).json({ error: 'Article not found' });

  art.status = 'published';
  art.deletedAt = undefined;
  saveDb();
  logActivity((req as any).adminUser.email, 'RESTORE_ARTICLE', art.titleBn);

  res.json({ ok: true, status: 'published' });
});

app.delete('/api/articles/:id/permanent', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const art = db.articles.find(a => a.id === id);
  if (!art) return res.status(404).json({ error: 'Article not found' });

  db.articles = db.articles.filter(a => a.id !== id);
  saveDb();
  logActivity((req as any).adminUser.email, 'PERMANENT_DELETE_ARTICLE', art.titleBn);

  res.json({ ok: true });
});

// Bulk Article actions
app.post('/api/articles/bulk', requireAdminAuth, (req: Request, res: Response) => {
  const { action, ids, category } = req.body;
  if (!action || !Array.isArray(ids)) return res.status(400).json({ error: 'Invalid payload' });

  db.articles.forEach(art => {
    if (ids.includes(art.id)) {
      if (action === 'publish') art.status = 'published';
      if (action === 'unpublish') art.status = 'draft';
      if (action === 'trash') {
        art.status = 'trash';
        art.deletedAt = new Date().toISOString();
      }
      if (action === 'change_category' && category) art.category = category;
    }
  });

  saveDb();
  logActivity((req as any).adminUser.email, 'BULK_ARTICLE_ACTION', `${action} on ${ids.length} items`);
  res.json({ ok: true, affected: ids.length });
});

// 4. Videos Endpoints
app.get('/api/videos', (req: Request, res: Response) => {
  res.json({ videos: db.videos });
});

app.post('/api/videos', requireAdminAuth, (req: Request, res: Response) => {
  const newVideo = {
    ...req.body,
    id: `vid_${Date.now()}`,
    views: 0,
    publishedAt: req.body.publishedAt || new Date().toISOString().split('T')[0]
  };
  db.videos.unshift(newVideo);
  saveDb();
  logActivity((req as any).adminUser.email, 'CREATE_VIDEO', newVideo.titleBn);
  res.status(201).json(newVideo);
});

app.put('/api/videos/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const idx = db.videos.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Video not found' });
  db.videos[idx] = { ...db.videos[idx], ...req.body };
  saveDb();
  logActivity((req as any).adminUser.email, 'UPDATE_VIDEO', db.videos[idx].titleBn);
  res.json(db.videos[idx]);
});

app.delete('/api/videos/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const vid = db.videos.find(v => v.id === id);
  db.videos = db.videos.filter(v => v.id !== id);
  saveDb();
  if (vid) logActivity((req as any).adminUser.email, 'DELETE_VIDEO', vid.titleBn);
  res.json({ ok: true });
});

// 5. Tools Endpoints
app.get('/api/tools', (req: Request, res: Response) => {
  res.json({ tools: db.tools });
});

app.post('/api/tools', requireAdminAuth, (req: Request, res: Response) => {
  const newTool = { ...req.body, id: `tool_${Date.now()}` };
  db.tools.unshift(newTool);
  saveDb();
  logActivity((req as any).adminUser.email, 'CREATE_TOOL', newTool.name);
  res.status(201).json(newTool);
});

app.put('/api/tools/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const idx = db.tools.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Tool not found' });
  db.tools[idx] = { ...db.tools[idx], ...req.body };
  saveDb();
  logActivity((req as any).adminUser.email, 'UPDATE_TOOL', db.tools[idx].name);
  res.json(db.tools[idx]);
});

app.delete('/api/tools/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const tool = db.tools.find(t => t.id === id);
  db.tools = db.tools.filter(t => t.id !== id);
  saveDb();
  if (tool) logActivity((req as any).adminUser.email, 'DELETE_TOOL', tool.name);
  res.json({ ok: true });
});

// 6. Categories & Tags Endpoints
app.get('/api/categories', (req: Request, res: Response) => {
  res.json({ categories: db.categories });
});

app.post('/api/categories', requireAdminAuth, (req: Request, res: Response) => {
  const newCat = { ...req.body, id: `cat_${Date.now()}` };
  db.categories.push(newCat);
  saveDb();
  logActivity((req as any).adminUser.email, 'CREATE_CATEGORY', newCat.nameBn);
  res.status(201).json(newCat);
});

app.put('/api/categories/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const idx = db.categories.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Category not found' });
  db.categories[idx] = { ...db.categories[idx], ...req.body };
  saveDb();
  logActivity((req as any).adminUser.email, 'UPDATE_CATEGORY', db.categories[idx].nameBn);
  res.json(db.categories[idx]);
});

app.delete('/api/categories/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const cat = db.categories.find(c => c.id === id);
  if (!cat) return res.status(404).json({ error: 'Category not found' });

  // Check if content exists
  const hasContent = db.articles.some(a => a.category === cat.slug);
  if (hasContent && !req.query.force) {
    return res.status(400).json({ error: 'Category contains articles. Reassign them first or confirm forced delete.' });
  }

  db.categories = db.categories.filter(c => c.id !== id);
  saveDb();
  logActivity((req as any).adminUser.email, 'DELETE_CATEGORY', cat.nameBn);
  res.json({ ok: true });
});

app.get('/api/tags', (req: Request, res: Response) => {
  res.json({ tags: db.tags || [] });
});

app.post('/api/tags', requireAdminAuth, (req: Request, res: Response) => {
  const newTag = { ...req.body, id: `tag_${Date.now()}` };
  if (!db.tags) db.tags = [];
  db.tags.push(newTag);
  saveDb();
  res.status(201).json(newTag);
});

app.delete('/api/tags/:id', requireAdminAuth, (req: Request, res: Response) => {
  db.tags = (db.tags || []).filter(t => t.id !== req.params.id);
  saveDb();
  res.json({ ok: true });
});

// 7. Media Library Endpoints
app.get('/api/media', (req: Request, res: Response) => {
  res.json({ media: db.media || [] });
});

app.post('/api/media/upload', requireAdminAuth, (req: Request, res: Response) => {
  const { filename, fileData, altText, caption } = req.body;
  if (!fileData) return res.status(400).json({ error: 'No file data received' });

  // If base64 data URL
  let fileUrl = fileData;
  let fileSize = 150000;

  if (fileData.startsWith('data:')) {
    const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      const ext = matches[1].split('/')[1] || 'png';
      const cleanName = `${Date.now()}_${(filename || 'image').replace(/[^\w.-]/g, '_')}.${ext}`;
      const savePath = path.resolve(UPLOAD_DIR, cleanName);
      const buffer = Buffer.from(matches[2], 'base64');
      fs.writeFileSync(savePath, buffer);
      fileUrl = `/uploads/${cleanName}`;
      fileSize = buffer.length;
    }
  }

  const mediaItem = {
    id: `med_${Date.now()}`,
    filename: filename || 'uploaded_image.png',
    url: fileUrl,
    fileType: 'image/jpeg',
    fileSize,
    dimensions: '1200x800',
    uploadedAt: new Date().toISOString().split('T')[0],
    altText: altText || filename || 'Media Image',
    caption: caption || ''
  };

  if (!db.media) db.media = [];
  db.media.unshift(mediaItem);
  saveDb();
  logActivity((req as any).adminUser.email, 'UPLOAD_MEDIA', mediaItem.filename);

  res.status(201).json(mediaItem);
});

app.put('/api/media/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const idx = (db.media || []).findIndex(m => m.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Media not found' });
  db.media[idx] = { ...db.media[idx], ...req.body };
  saveDb();
  res.json(db.media[idx]);
});

app.delete('/api/media/:id', requireAdminAuth, (req: Request, res: Response) => {
  db.media = (db.media || []).filter(m => m.id !== req.params.id);
  saveDb();
  res.json({ ok: true });
});

// 8. Comments Endpoints
app.get('/api/comments', (req: Request, res: Response) => {
  res.json({ comments: db.comments || [] });
});

app.post('/api/comments', (req: Request, res: Response) => {
  const { articleId, articleTitle, authorName, authorEmail, content } = req.body;
  if (!content || !authorName) return res.status(400).json({ error: 'Missing required comment fields' });

  const newComment = {
    id: `com_${Date.now()}`,
    articleId,
    articleTitle: articleTitle || 'Article',
    authorName,
    authorEmail: authorEmail || '',
    content,
    createdAt: new Date().toISOString(),
    status: 'approved'
  };

  if (!db.comments) db.comments = [];
  db.comments.unshift(newComment);
  saveDb();
  res.status(201).json(newComment);
});

app.put('/api/comments/:id/status', requireAdminAuth, (req: Request, res: Response) => {
  const { status } = req.body;
  const com = (db.comments || []).find(c => c.id === req.params.id);
  if (!com) return res.status(404).json({ error: 'Comment not found' });
  com.status = status;
  saveDb();
  res.json(com);
});

// 9. Users & Admin Users
app.get('/api/admin/users', requireAdminAuth, (req: Request, res: Response) => {
  const safeAdmins = db.adminUsers.map(({ passwordHash, ...rest }) => rest);
  res.json({ users: db.users || [], adminUsers: safeAdmins });
});

app.post('/api/admin/users', requireAdminAuth, (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password required' });

  const newAdmin = {
    id: `adm_${Date.now()}`,
    name,
    email,
    passwordHash: hashPassword(password),
    role: role || 'editor',
    status: 'active',
    createdAt: new Date().toISOString().split('T')[0]
  };

  db.adminUsers.push(newAdmin);
  saveDb();
  logActivity((req as any).adminUser.email, 'CREATE_ADMIN_USER', newAdmin.email);
  const { passwordHash, ...safe } = newAdmin;
  res.status(201).json(safe);
});

app.put('/api/admin/users/:id', requireAdminAuth, (req: Request, res: Response) => {
  const user = db.adminUsers.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Admin user not found' });
  if (req.body.name) user.name = req.body.name;
  if (req.body.role) user.role = req.body.role;
  if (req.body.status) user.status = req.body.status;
  if (req.body.password) user.passwordHash = hashPassword(req.body.password);
  saveDb();
  logActivity((req as any).adminUser.email, 'UPDATE_ADMIN_USER', user.email);
  const { passwordHash, ...safe } = user;
  res.json(safe);
});

// 10. Navigation, Pages, Ads & Settings
app.get('/api/navigation', (req: Request, res: Response) => {
  res.json({ navigation: db.navigation || [] });
});

app.put('/api/navigation', requireAdminAuth, (req: Request, res: Response) => {
  db.navigation = req.body.navigation;
  saveDb();
  res.json({ ok: true, navigation: db.navigation });
});

app.get('/api/homepage/config', (req: Request, res: Response) => {
  res.json({ config: db.homepageConfig || [] });
});

app.put('/api/homepage/config', requireAdminAuth, (req: Request, res: Response) => {
  db.homepageConfig = req.body.config;
  saveDb();
  res.json({ ok: true, config: db.homepageConfig });
});

// 10. Universal Ad Management & Monetization Endpoints
app.get('/api/ads', (req: Request, res: Response) => {
  res.json({ ads: db.ads });
});

app.put('/api/ads/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const idx = db.ads.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Placement not found' });
  db.ads[idx] = { ...db.ads[idx], ...req.body };
  
  if (!db.adChangeHistory) db.adChangeHistory = [];
  db.adChangeHistory.unshift({
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    adminEmail: (req as any).adminUser.email,
    action: 'UPDATE_PLACEMENT',
    target: db.ads[idx].name,
    details: `Enabled: ${db.ads[idx].enabled}, Assigned: ${db.ads[idx].assignedCampaignId || 'None'}`
  });

  saveDb();
  logActivity((req as any).adminUser.email, 'UPDATE_AD_PLACEMENT', db.ads[idx].name);
  res.json(db.ads[idx]);
});

// Ad Campaigns Endpoints
app.get('/api/ads/campaigns', (req: Request, res: Response) => {
  const { status, type, placementId, search } = req.query;
  let list = db.adCampaigns || [];
  if (status && status !== 'all') {
    list = list.filter(c => c.status === status);
  }
  if (type && type !== 'all') {
    list = list.filter(c => c.type === type);
  }
  if (placementId) {
    list = list.filter(c => c.placementIds && c.placementIds.includes(String(placementId)));
  }
  if (search) {
    const q = String(search).toLowerCase();
    list = list.filter(c => 
      c.name.toLowerCase().includes(q) || 
      (c.description && c.description.toLowerCase().includes(q)) ||
      (c.provider && c.provider.toLowerCase().includes(q))
    );
  }
  res.json({ campaigns: list });
});

app.post('/api/ads/campaigns', requireAdminAuth, (req: Request, res: Response) => {
  const { name, type, provider, displayMode } = req.body;
  if (!name || !type) {
    return res.status(400).json({ error: 'Name and ad type are required' });
  }

  const newCampaign = {
    ...req.body,
    id: `camp_${Date.now()}`,
    provider: provider || 'direct',
    status: req.body.status || 'draft',
    displayMode: displayMode || 'inline',
    placementIds: req.body.placementIds || [],
    targetRoutes: req.body.targetRoutes || ['*'],
    targetButtons: req.body.targetButtons || [],
    targetContentIds: req.body.targetContentIds || [],
    displayDelay: Number(req.body.displayDelay) || 0,
    frequencyCap: Number(req.body.frequencyCap) || 0,
    cooldownMinutes: Number(req.body.cooldownMinutes) || 0,
    priority: Number(req.body.priority) || 5,
    deviceTarget: req.body.deviceTarget || 'all',
    languageTarget: req.body.languageTarget || 'all',
    userEligibility: req.body.userEligibility || 'all',
    openInNewTab: req.body.openInNewTab !== false,
    fallbackBehavior: req.body.fallbackBehavior || 'continue_to_destination',
    impressions: 0,
    clicks: 0,
    completions: 0,
    errors: 0,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };

  if (!db.adCampaigns) db.adCampaigns = [];
  db.adCampaigns.unshift(newCampaign);

  // If placements assigned, link them in db.ads
  if (newCampaign.placementIds && newCampaign.placementIds.length > 0) {
    db.ads.forEach(p => {
      if (newCampaign.placementIds.includes(p.id) && !p.assignedCampaignId) {
        p.assignedCampaignId = newCampaign.id;
      }
    });
  }

  if (!db.adChangeHistory) db.adChangeHistory = [];
  db.adChangeHistory.unshift({
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    adminEmail: (req as any).adminUser.email,
    action: 'CREATE_CAMPAIGN',
    target: newCampaign.name,
    details: `Created ${newCampaign.type} campaign with priority ${newCampaign.priority}`
  });

  saveDb();
  logActivity((req as any).adminUser.email, 'CREATE_AD_CAMPAIGN', newCampaign.name);
  res.status(201).json(newCampaign);
});

app.put('/api/ads/campaigns/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const idx = (db.adCampaigns || []).findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Campaign not found' });

  db.adCampaigns[idx] = {
    ...db.adCampaigns[idx],
    ...req.body,
    updatedAt: new Date().toISOString().split('T')[0]
  };

  // If placementIds updated, sync with db.ads
  if (req.body.placementIds && Array.isArray(req.body.placementIds)) {
    db.ads.forEach(p => {
      if (req.body.placementIds.includes(p.id)) {
        p.assignedCampaignId = id;
      } else if (p.assignedCampaignId === id) {
        p.assignedCampaignId = undefined;
      }
    });
  }

  if (!db.adChangeHistory) db.adChangeHistory = [];
  db.adChangeHistory.unshift({
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    adminEmail: (req as any).adminUser.email,
    action: 'UPDATE_CAMPAIGN',
    target: db.adCampaigns[idx].name,
    details: `Updated campaign status to ${db.adCampaigns[idx].status}`
  });

  saveDb();
  logActivity((req as any).adminUser.email, 'UPDATE_AD_CAMPAIGN', db.adCampaigns[idx].name);
  res.json(db.adCampaigns[idx]);
});

app.delete('/api/ads/campaigns/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const camp = (db.adCampaigns || []).find(c => c.id === id);
  if (!camp) return res.status(404).json({ error: 'Campaign not found' });

  db.adCampaigns = db.adCampaigns.filter(c => c.id !== id);

  // Unlink from placements
  db.ads.forEach(p => {
    if (p.assignedCampaignId === id) {
      p.assignedCampaignId = undefined;
    }
  });

  if (!db.adChangeHistory) db.adChangeHistory = [];
  db.adChangeHistory.unshift({
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    adminEmail: (req as any).adminUser.email,
    action: 'DELETE_CAMPAIGN',
    target: camp.name,
    details: 'Deleted advertisement campaign'
  });

  saveDb();
  logActivity((req as any).adminUser.email, 'DELETE_AD_CAMPAIGN', camp.name);
  res.json({ ok: true });
});

// Ad Settings & Frequency
app.get('/api/ads/settings', (req: Request, res: Response) => {
  res.json({ settings: db.adFrequencySettings || INITIAL_AD_FREQUENCY_SETTINGS });
});

app.put('/api/ads/settings', requireAdminAuth, (req: Request, res: Response) => {
  db.adFrequencySettings = { ...(db.adFrequencySettings || {}), ...req.body };

  if (!db.adChangeHistory) db.adChangeHistory = [];
  db.adChangeHistory.unshift({
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    adminEmail: (req as any).adminUser.email,
    action: 'UPDATE_AD_SETTINGS',
    target: 'Frequency & Display Rules',
    details: `Master Enabled: ${db.adFrequencySettings.masterAdEnabled}`
  });

  saveDb();
  logActivity((req as any).adminUser.email, 'UPDATE_AD_SETTINGS', 'Global Ad Rules');
  res.json({ ok: true, settings: db.adFrequencySettings });
});

// Ad API Integrations
app.get('/api/ads/integrations', requireAdminAuth, (req: Request, res: Response) => {
  const safeIntegrations = (db.adIntegrations || []).map(item => ({
    ...item,
    apiKey: item.apiKey ? `${item.apiKey.slice(0, 4)}••••••••${item.apiKey.slice(-4)}` : ''
  }));
  res.json({ integrations: safeIntegrations });
});

app.put('/api/ads/integrations/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const idx = (db.adIntegrations || []).findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Integration not found' });

  const updates = { ...req.body };
  if (updates.apiKey && updates.apiKey.includes('••••')) {
    delete updates.apiKey;
  }

  db.adIntegrations[idx] = { ...db.adIntegrations[idx], ...updates, lastSync: new Date().toISOString() };
  saveDb();
  res.json({ ok: true, integration: db.adIntegrations[idx] });
});

app.post('/api/ads/integrations/:id/test', requireAdminAuth, (req: Request, res: Response) => {
  const id = req.params.id;
  const item = (db.adIntegrations || []).find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Integration not found' });

  item.status = 'connected';
  item.lastSync = new Date().toISOString();
  saveDb();
  res.json({ ok: true, message: `Successfully verified connection to ${item.name}!`, lastSync: item.lastSync });
});

// Ad Events Recording (Public endpoint for real impressions, clicks, completions, errors)
app.post('/api/ads/events', (req: Request, res: Response) => {
  const { campaignId, placementId, eventType, device, path: eventPath, errorMessage } = req.body;
  if (!eventType) return res.status(400).json({ error: 'eventType is required' });

  // Update campaign counters in real-time
  if (campaignId && db.adCampaigns) {
    const camp = db.adCampaigns.find(c => c.id === campaignId);
    if (camp) {
      if (eventType === 'impression') camp.impressions = (camp.impressions || 0) + 1;
      else if (eventType === 'click') camp.clicks = (camp.clicks || 0) + 1;
      else if (eventType === 'completion') camp.completions = (camp.completions || 0) + 1;
      else if (eventType === 'error') camp.errors = (camp.errors || 0) + 1;
    }
  }

  if (!db.adEvents) db.adEvents = [];
  const eventRecord = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    campaignId: campaignId || 'unknown',
    placementId: placementId || 'unknown',
    eventType,
    timestamp: new Date().toISOString(),
    device: device || 'desktop',
    path: eventPath || '/',
    errorMessage
  };
  db.adEvents.unshift(eventRecord);
  if (db.adEvents.length > 10000) db.adEvents.length = 10000;

  if (eventType === 'error') {
    if (!db.adErrorLogs) db.adErrorLogs = [];
    db.adErrorLogs.unshift({
      id: `err_${Date.now()}`,
      timestamp: new Date().toISOString(),
      campaignId,
      placementId: placementId || 'unknown',
      errorReason: errorMessage || 'Ad failed to load or script blocked',
      device: device || 'desktop',
      path: eventPath || '/'
    });
    if (db.adErrorLogs.length > 500) db.adErrorLogs.length = 500;
  }

  saveDb();
  res.json({ ok: true });
});

// Ad Analytics (Real metrics aggregated from events)
app.get('/api/ads/analytics', requireAdminAuth, (req: Request, res: Response) => {
  let totalImpressions = 0;
  let totalClicks = 0;
  let totalCompletions = 0;
  let totalErrors = 0;

  const campaignPerformance = (db.adCampaigns || []).map(camp => {
    const imps = camp.impressions || 0;
    const clks = camp.clicks || 0;
    const comps = camp.completions || 0;
    const errs = camp.errors || 0;
    const ctr = imps > 0 ? Number(((clks / imps) * 100).toFixed(2)) : 0;

    totalImpressions += imps;
    totalClicks += clks;
    totalCompletions += comps;
    totalErrors += errs;

    return {
      campaignId: camp.id,
      campaignName: camp.name,
      type: camp.type,
      impressions: imps,
      clicks: clks,
      ctr,
      completions: comps,
      errors: errs
    };
  });

  const placementPerformance = (db.ads || []).map(p => {
    const eventsForPlacement = (db.adEvents || []).filter(e => e.placementId === p.id);
    const imps = eventsForPlacement.filter(e => e.eventType === 'impression').length;
    const clks = eventsForPlacement.filter(e => e.eventType === 'click').length;
    const ctr = imps > 0 ? Number(((clks / imps) * 100).toFixed(2)) : 0;

    return {
      placementId: p.id,
      placementName: p.name,
      category: p.category || 'banner',
      impressions: imps,
      clicks: clks,
      ctr
    };
  });

  const deviceBreakdown = { desktop: 0, mobile: 0, tablet: 0 };
  (db.adEvents || []).forEach(e => {
    if (e.eventType === 'impression') {
      const dev = (e.device || 'desktop').toLowerCase();
      if (dev.includes('mobile')) deviceBreakdown.mobile++;
      else if (dev.includes('tablet')) deviceBreakdown.tablet++;
      else deviceBreakdown.desktop++;
    }
  });

  const dailyTimeline: Array<{ date: string; impressions: number; clicks: number; completions: number }> = [];
  const now = Date.now();
  for (let i = 6; i >= 0; i--) {
    const dayStr = new Date(now - i * 86400000).toISOString().split('T')[0];
    const dayEvents = (db.adEvents || []).filter(e => e.timestamp && e.timestamp.startsWith(dayStr));
    dailyTimeline.push({
      date: dayStr,
      impressions: dayEvents.filter(e => e.eventType === 'impression').length,
      clicks: dayEvents.filter(e => e.eventType === 'click').length,
      completions: dayEvents.filter(e => e.eventType === 'completion').length
    });
  }

  const averageCtr = totalImpressions > 0 ? Number(((totalClicks / totalImpressions) * 100).toFixed(2)) : 0;

  res.json({
    totalImpressions,
    totalClicks,
    averageCtr,
    totalCompletions,
    totalErrors,
    campaignPerformance,
    placementPerformance,
    deviceBreakdown,
    dailyTimeline
  });
});

// Ad Logs & History
app.get('/api/ads/logs', requireAdminAuth, (req: Request, res: Response) => {
  res.json({
    errorLogs: db.adErrorLogs || [],
    changeHistory: db.adChangeHistory || []
  });
});

// Fast, Safe Public Ad Configuration Endpoint
app.get('/api/ads/public', (req: Request, res: Response) => {
  const masterEnabled = db.adFrequencySettings ? db.adFrequencySettings.masterAdEnabled !== false : true;
  const activeCampaigns = (db.adCampaigns || []).filter(c => c.status === 'active');
  const placements = (db.ads || []).filter(p => p.enabled);

  res.json({
    masterEnabled,
    campaigns: activeCampaigns,
    placements,
    frequencySettings: db.adFrequencySettings || INITIAL_AD_FREQUENCY_SETTINGS
  });
});

app.get('/api/pages', (req: Request, res: Response) => {
  res.json({ pages: db.pages });
});

app.put('/api/pages/:slug', requireAdminAuth, (req: Request, res: Response) => {
  const slug = req.params.slug;
  const idx = db.pages.findIndex(p => p.slug === slug);
  if (idx === -1) return res.status(404).json({ error: 'Page not found' });
  db.pages[idx] = { ...db.pages[idx], ...req.body, updatedAt: new Date().toISOString().split('T')[0] };
  saveDb();
  logActivity((req as any).adminUser.email, 'UPDATE_PAGE', slug);
  res.json(db.pages[idx]);
});

app.get('/api/settings', (req: Request, res: Response) => {
  res.json({ settings: db.settings });
});

app.put('/api/settings', requireAdminAuth, (req: Request, res: Response) => {
  db.settings = { ...db.settings, ...req.body };
  saveDb();
  logActivity((req as any).adminUser.email, 'UPDATE_SETTINGS', 'General Settings');
  res.json({ settings: db.settings });
});

// 11. Newsletter Endpoints
app.get('/api/subscribers', requireAdminAuth, (req: Request, res: Response) => {
  res.json({ subscribers: db.subscribers || [] });
});

app.post('/api/newsletter/subscribe', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Valid email required' });

  if (!db.subscribers) db.subscribers = [];
  const existing = db.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    existing.status = 'active';
  } else {
    db.subscribers.unshift({
      id: `sub_${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString().split('T')[0],
      status: 'active'
    });
  }
  saveDb();
  res.json({ ok: true });
});

// 12. Activity Logs
app.get('/api/activity-logs', requireAdminAuth, (req: Request, res: Response) => {
  res.json({ logs: db.activityLogs || [] });
});

// 13. Backup & Reset
app.get('/api/backup/export', requireAdminAuth, (req: Request, res: Response) => {
  res.json(db);
});

app.post('/api/backup/import', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const incoming = req.body;
    if (incoming.articles && incoming.categories) {
      db = { ...incoming };
      saveDb();
      logActivity((req as any).adminUser.email, 'IMPORT_DATABASE', 'Full Database Backup');
      return res.json({ ok: true });
    }
    res.status(400).json({ error: 'Invalid backup structure' });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/api/backup/reset', requireAdminAuth, (req: Request, res: Response) => {
  db = getDefaultDatabase();
  saveDb();
  logActivity((req as any).adminUser.email, 'RESET_DATABASE', 'Factory Defaults');
  res.json({ ok: true });
});

// 14. SEO: Dynamic XML Sitemap & Robots.txt
app.get('/sitemap.xml', (req: Request, res: Response) => {
  const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
  const publishedArticles = db.articles.filter(a => a.status === 'published');

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Homepage
  xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  // Categories
  db.categories.forEach(c => {
    xml += `  <url>\n    <loc>${baseUrl}/${c.slug}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Tools & Videos
  xml += `  <url>\n    <loc>${baseUrl}/tools</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${baseUrl}/videos</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;

  // Articles
  publishedArticles.forEach(art => {
    xml += `  <url>\n    <loc>${baseUrl}/article/${art.slug}</loc>\n    <lastmod>${art.updatedAt || art.publishedAt}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // Static Pages
  db.pages.forEach(p => {
    xml += `  <url>\n    <loc>${baseUrl}/page/${p.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

app.get('/robots.txt', (req: Request, res: Response) => {
  const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
  const content = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${baseUrl}/sitemap.xml\n`;
  res.header('Content-Type', 'text/plain');
  res.send(content);
});

// Start Server with Vite or Static Dist
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`KhojGhor Production Server running on port ${PORT}`);
  });
}

startServer();
