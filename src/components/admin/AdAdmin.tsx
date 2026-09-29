import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdPlacement } from '../../types';
import { Megaphone, Check, ToggleLeft, ToggleRight, Edit3, Code2, ShieldAlert } from 'lucide-react';

export const AdAdmin: React.FC = () => {
  const { ads, updateAdPlacement } = useStore();
  const [editingAd, setEditingAd] = useState<AdPlacement | null>(null);
  const [savedMessage, setSavedMessage] = useState(false);

  const [formData, setFormData] = useState<{
    code: string;
    enabled: boolean;
    deviceTarget: AdPlacement['deviceTarget'];
    pageTarget: AdPlacement['pageTarget'];
  }>({
    code: '',
    enabled: true,
    deviceTarget: 'all',
    pageTarget: 'all'
  });

  const handleEdit = (ad: AdPlacement) => {
    setEditingAd(ad);
    setFormData({
      code: ad.code,
      enabled: ad.enabled,
      deviceTarget: ad.deviceTarget,
      pageTarget: ad.pageTarget
    });
  };

  const handleToggle = (ad: AdPlacement) => {
    updateAdPlacement(ad.id, { enabled: !ad.enabled });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAd) return;

    updateAdPlacement(editingAd.id, {
      code: formData.code,
      enabled: formData.enabled,
      deviceTarget: formData.deviceTarget,
      pageTarget: formData.pageTarget
    });

    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
      setEditingAd(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>বিজ্ঞাপন নেটওয়ার্ক ও প্লেসমেন্ট (Ad Management)</span>
            <Megaphone className="w-5 h-5 text-emerald-600" />
          </h2>
          <p className="text-xs text-stone-500">
            Adsterra বা যেকোনো অ্যাড নেটওয়ার্কের ব্যানার ও স্ক্রিপ্ট কোড সোর্স কোড পরিবর্তন ছাড়া নিয়ন্ত্রণ করুন।
          </p>
        </div>
      </div>

      {/* Advisory Note */}
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">নীতিমালা ও স্বচ্ছতা: </span>
          বিজ্ঞাপন ও এডিটোরিয়াল কন্টেন্ট সম্পূর্ণ পৃথক রাখা হয়েছে। এখানে কোড পেস্ট করলে তা স্বয়ংক্রিয়ভাবে নির্ধারিত প্লেসমেন্টে প্রদর্শিত হবে।
        </div>
      </div>

      {/* Ad Slots List */}
      <div className="grid grid-cols-1 gap-4">
        {ads.map(ad => (
          <div
            key={ad.id}
            className={`p-5 rounded-xl border transition-all ${
              ad.enabled 
                ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800' 
                : 'bg-stone-50 dark:bg-stone-900/40 border-stone-200/60 dark:border-stone-800/60 opacity-80'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {ad.name}
                  </h4>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">
                    {ad.location}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span>টার্গেট ডিভাইস: <strong className="capitalize text-stone-700 dark:text-stone-300">{ad.deviceTarget}</strong></span>
                  <span>·</span>
                  <span>টার্গেট পেজ: <strong className="capitalize text-stone-700 dark:text-stone-300">{ad.pageTarget}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggle(ad)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    ad.enabled 
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' 
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                  }`}
                >
                  {ad.enabled ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4" />}
                  <span>{ad.enabled ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয় (Disabled)'}</span>
                </button>

                <button
                  onClick={() => handleEdit(ad)}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-medium flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>কোড এডিট</span>
                </button>
              </div>
            </div>

            {/* Code Snippet Preview */}
            <div className="mt-3 p-3 rounded-lg bg-stone-950 text-stone-300 font-mono text-[11px] overflow-x-auto max-h-24">
              <pre className="whitespace-pre-wrap">{ad.code}</pre>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingAd && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-600" />
              <span>বিজ্ঞাপন কোড ও টার্গেটিং কনফিগারেশন: {editingAd.name}</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 dark:text-stone-300">
                  Adsterra / Ad Network HTML or JS Code *
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value })}
                  placeholder="<!-- Adsterra script tag -->"
                  className="w-full p-3 rounded-lg bg-stone-950 text-emerald-400 font-mono text-xs border border-stone-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">ডিভাইস টার্গেটিং</label>
                  <select
                    value={formData.deviceTarget}
                    onChange={e => setFormData({ ...formData, deviceTarget: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100"
                  >
                    <option value="all">সকল ডিভাইস (Desktop & Mobile)</option>
                    <option value="desktop">শুধুমাত্র ডেস্কটপ (Desktop Only)</option>
                    <option value="mobile">শুধুমাত্র মোবাইল (Mobile Only)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">পেজ টার্গেটিং</label>
                  <select
                    value={formData.pageTarget}
                    onChange={e => setFormData({ ...formData, pageTarget: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100"
                  >
                    <option value="all">ওয়েবসাইটের সকল পেজ</option>
                    <option value="homepage">শুধুমাত্র হোমপেজে</option>
                    <option value="articles">আর্টিকেল পেজসমূহে</option>
                    <option value="tools">টুলস ডিরেক্টরিতে</option>
                    <option value="videos">ভিডিও গ্যালারিতে</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableToggle"
                  checked={formData.enabled}
                  onChange={e => setFormData({ ...formData, enabled: e.target.checked })}
                />
                <label htmlFor="enableToggle" className="cursor-pointer font-medium text-stone-700 dark:text-stone-300">
                  এই বিজ্ঞাপন প্লেসমেন্টটি সক্রিয় রাখুন
                </label>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
                {savedMessage ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> সংরক্ষিত হয়েছে!
                  </span>
                ) : <span />}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingAd(null)}
                    className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                  >
                    সংরক্ষণ করুন
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
