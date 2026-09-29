import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Settings, 
  Share2, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  AlertCircle,
  Database,
  BarChart3
} from 'lucide-react';

export const SettingsAdmin: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    exportDatabaseJson, 
    importDatabaseJson, 
    resetAllToDefault 
  } = useStore();

  const [formData, setFormData] = useState({ ...settings });
  const [saved, setSaved] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDownloadBackup = async () => {
    const jsonStr = await exportDatabaseJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `khojghor_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = async () => {
    if (!importJsonText.trim()) return;
    const ok = await importDatabaseJson(importJsonText);
    if (ok) {
      setImportSuccess(true);
      setImportError(false);
      setImportJsonText('');
      setTimeout(() => setImportSuccess(false), 3000);
    } else {
      setImportError(true);
      setImportSuccess(false);
    }
  };

  const handleReset = () => {
    if (confirm('সতর্কতা: আপনি কি নিশ্চিত যে প্রাথমিক ডেমো ডেটাতে সমস্ত কন্টেন্ট রিসেট করতে চান? আপনার কাস্টম পরিবর্তন মুছে যাবে।')) {
      resetAllToDefault();
      alert('সফলভাবে প্রাথমিক ডেটাতে রিসেট করা হয়েছে!');
    }
  };

  return (
    <div className="space-y-8">
      
      <div>
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>প্ল্যাটফর্ম সেটিংস ও ব্যাকআপ (Platform Settings)</span>
          <Settings className="w-5 h-5 text-emerald-600" />
        </h2>
        <p className="text-xs text-stone-500">
          সোশ্যাল লিংক, অ্যানালিটিক্স এবং ডাটাবেজ ব্যাকআপ ও রিস্টোর পরিচালনা করুন।
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Brand & Identity */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-2">
            ব্র্যান্ড ও পরিচিতি
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">ওয়েবসাইট বাংলা শিরোনাম</label>
              <input
                type="text"
                value={formData.siteTitleBn}
                onChange={e => setFormData({ ...formData, siteTitleBn: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">ইংরেজি সাইট শিরোনাম</label>
              <input
                type="text"
                value={formData.siteTitleEn}
                onChange={e => setFormData({ ...formData, siteTitleEn: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-semibold text-stone-700 dark:text-stone-300">মূল স্লোগান (Tagline)</label>
            <input
              type="text"
              value={formData.taglineBn}
              onChange={e => setFormData({ ...formData, taglineBn: e.target.value })}
              className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-semibold text-stone-700 dark:text-stone-300">যোগাযোগ ইমেইল (Contact Email)</label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 border-b border-stone-100 dark:border-stone-800 pb-2">
            <Share2 className="w-4 h-4 text-emerald-600" />
            <span>সোশ্যাল মিডিয়া প্রোফাইল লিংক</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">YouTube Channel URL</label>
              <input
                type="text"
                value={formData.socials.youtube}
                onChange={e => setFormData({ ...formData, socials: { ...formData.socials, youtube: e.target.value } })}
                className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono text-[11px]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">Telegram Channel / Group</label>
              <input
                type="text"
                value={formData.socials.telegram}
                onChange={e => setFormData({ ...formData, socials: { ...formData.socials, telegram: e.target.value } })}
                className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono text-[11px]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">Facebook Page URL</label>
              <input
                type="text"
                value={formData.socials.facebook}
                onChange={e => setFormData({ ...formData, socials: { ...formData.socials, facebook: e.target.value } })}
                className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono text-[11px]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">Twitter / X URL</label>
              <input
                type="text"
                value={formData.socials.x}
                onChange={e => setFormData({ ...formData, socials: { ...formData.socials, x: e.target.value } })}
                className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Analytics & Search Console */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 border-b border-stone-100 dark:border-stone-800 pb-2">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>অ্যানালিটিক্স ও সার্চ কনসোল</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
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
            <div className="space-y-1">
              <label className="font-semibold text-stone-700 dark:text-stone-300">Google Search Console Verification Tag</label>
              <input
                type="text"
                value={formData.googleSearchConsoleMeta}
                onChange={e => setFormData({ ...formData, googleSearchConsoleMeta: e.target.value })}
                placeholder="google-site-verification code"
                className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            <span>{saved ? 'সেটিংস সংরক্ষিত হয়েছে' : 'সেটিংস আপডেট করুন'}</span>
          </button>
        </div>

      </form>

      {/* Database JSON Backup & Restore & Reset */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-6">
        <div className="space-y-1 border-b border-stone-100 dark:border-stone-800 pb-3">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>ডাটাবেজ ব্যাকআপ, এক্সপোর্ট ও রিস্টোর (JSON Database)</span>
          </h3>
          <p className="text-xs text-stone-500">
            সম্পূর্ণ সাইটের কন্টেন্ট (সকল আর্টিকেল, ভিডিও, টুলস, ক্যাটাগরি ও বিজ্ঞাপন) একটি একক ফাইলে ব্যাকআপ বা পুনরুদ্ধার করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 space-y-2">
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">এক্সপোর্ট (Export Backup)</h4>
            <p className="text-[11px] text-stone-500">
              বর্তমান ডাটাবেজের সম্পূর্ণ কপি JSON ফরম্যাটে আপনার কম্পিউটারে ডাউনলোড করুন।
            </p>
            <button
              onClick={handleDownloadBackup}
              className="mt-2 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON ব্যাকআপ ডাউনলোড</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 space-y-2">
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">ফ্যাক্টরি রিসেট (Reset Defaults)</h4>
            <p className="text-[11px] text-stone-500">
              খোঁজঘরের লঞ্চ লাইব্রেরির সকল আসল কন্টেন্ট ফিরিয়ে আনতে চান?
            </p>
            <button
              onClick={handleReset}
              className="mt-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-semibold text-xs flex items-center gap-1.5 hover:bg-red-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ডিফল্ট লাইব্রেরিতে রিসেট করুন</span>
            </button>
          </div>
        </div>

        {/* JSON Import Box */}
        <div className="space-y-2 pt-2 text-xs">
          <label className="font-semibold text-stone-700 dark:text-stone-300">
            ব্যাকআপ JSON টেক্সট পেস্ট করে ইমপোর্ট করুন
          </label>
          <textarea
            rows={4}
            value={importJsonText}
            onChange={e => {
              setImportJsonText(e.target.value);
              setImportError(false);
              setImportSuccess(false);
            }}
            placeholder='{"articles": [...], "videos": [...]}'
            className="w-full p-3 rounded-lg bg-stone-50 dark:bg-stone-800 font-mono text-[11px] border border-stone-200 dark:border-stone-700"
          />

          {importSuccess && (
            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 text-xs flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>ডাটাবেজ সফলভাবে রিস্টোর হয়েছে!</span>
            </div>
          )}

          {importError && (
            <div className="p-2 rounded bg-red-50 dark:bg-red-950 text-red-700 text-xs flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>JSON ফরম্যাট সঠিক নয়। ফাইল যাচাই করুন।</span>
            </div>
          )}

          <button
            onClick={handleImportSubmit}
            disabled={!importJsonText.trim()}
            className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-medium text-xs disabled:opacity-50 flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>ইমপোর্ট ও রিস্টোর</span>
          </button>
        </div>

      </div>

    </div>
  );
};
