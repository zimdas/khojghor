import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Globe, ExternalLink, Check, Save, FileCode } from 'lucide-react';

export const SeoAdmin: React.FC = () => {
  const { settings, updateSettings, adminLanguage } = useStore();
  const [formData, setFormData] = useState({
    siteTitleBn: settings.siteTitleBn,
    siteTitleEn: settings.siteTitleEn,
    googleAnalyticsId: settings.googleAnalyticsId,
    googleSearchConsoleMeta: settings.googleSearchConsoleMeta
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600" />
            <span>{adminLanguage === 'bn' ? 'এসইও ও সার্চ ইঞ্জিন কনফিগারেশন (SEO)' : 'SEO Engine & Structured Data'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? 'গ্লোবাল মেটা ট্যাগ, গুগল সার্চ কনসোল ও সাইটম্যাপ পরিচালনা করুন।' : 'Configure global search engine optimization, Google Search Console, and XML sitemaps.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? (adminLanguage === 'bn' ? 'সংরক্ষিত!' : 'Saved!') : (adminLanguage === 'bn' ? 'সেভ করুন' : 'Save SEO')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-emerald-600" />
              <span>XML Sitemap (Dynamic)</span>
            </h3>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-600 hover:underline flex items-center gap-1"
            >
              <span>/sitemap.xml দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? 'যেকোনো নতুন আর্টিকেল বা ক্যাটাগরি যুক্ত হলে স্বয়ংক্রিয়ভাবে সাইটম্যাপ আপডেট হয়।' : 'Automatically generated XML sitemap containing all published articles, tools, and pages.'}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-emerald-600" />
              <span>Robots.txt</span>
            </h3>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-600 hover:underline flex items-center gap-1"
            >
              <span>/robots.txt দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? 'সার্চ ইঞ্জিন ক্রলারদের জন্য সঠিক নির্দেশনাবলী কনফিগার করা।' : 'Directives allowing crawlers while keeping /admin and /api endpoints protected.'}
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-2">
          {adminLanguage === 'bn' ? 'গ্লোবাল মেটা ও ইনডেক্সিং সেটিংস' : 'Global Meta & Verification Tags'}
        </h3>

        <div className="space-y-1">
          <label className="font-semibold text-stone-700 dark:text-stone-300">Default Meta Title (Bangla)</label>
          <input
            type="text"
            value={formData.siteTitleBn}
            onChange={e => setFormData({ ...formData, siteTitleBn: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-stone-700 dark:text-stone-300">Default Meta Title (English)</label>
          <input
            type="text"
            value={formData.siteTitleEn}
            onChange={e => setFormData({ ...formData, siteTitleEn: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-semibold text-stone-700 dark:text-stone-300">Google Search Console Verification Tag</label>
            <input
              type="text"
              value={formData.googleSearchConsoleMeta}
              onChange={e => setFormData({ ...formData, googleSearchConsoleMeta: e.target.value })}
              placeholder="google-site-verification token..."
              className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-700 dark:text-stone-300">Google Analytics ID (GA4)</label>
            <input
              type="text"
              value={formData.googleAnalyticsId}
              onChange={e => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
              placeholder="G-XXXXXX"
              className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
