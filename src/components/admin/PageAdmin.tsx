import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { StaticPage } from '../../types';
import { Edit3, Check, FileCode, Eye } from 'lucide-react';

export const PageAdmin: React.FC = () => {
  const { pages, updatePage, navigateTo } = useStore();
  const [selectedPage, setSelectedPage] = useState<StaticPage>(pages[0] || null);
  const [contentBn, setContentBn] = useState(pages[0]?.contentBn || '');
  const [titleBn, setTitleBn] = useState(pages[0]?.titleBn || '');
  const [saved, setSaved] = useState(false);

  const handleSelectPage = (p: StaticPage) => {
    setSelectedPage(p);
    setContentBn(p.contentBn);
    setTitleBn(p.titleBn);
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPage) return;

    updatePage(selectedPage.slug, {
      titleBn,
      contentBn
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>স্থির পেজ ব্যবস্থাপনা (Page Management)</span>
          <FileCode className="w-5 h-5 text-emerald-600" />
        </h2>
        <p className="text-xs text-stone-500">
          আমাদের সম্পর্কে, যোগাযোগ, গোপনীয়তা নীতি, ডিসক্লেমার ইত্যাদি পেজের কন্টেন্ট পরিবর্তন করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Page List Sidebar */}
        <div className="space-y-1.5 p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider px-2 py-1">পেজ সমূহ</p>
          {pages.map(p => (
            <button
              key={p.slug}
              onClick={() => handleSelectPage(p)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                selectedPage?.slug === p.slug
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <span className="truncate">{p.titleBn}</span>
              <span className="font-mono text-[10px] text-stone-400">/{p.slug}</span>
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="lg:col-span-3 p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          {selectedPage ? (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div className="space-y-0.5">
                  <span className="font-mono text-[11px] text-stone-400">/page/{selectedPage.slug}</span>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">{selectedPage.titleBn}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigateTo(`/page/${selectedPage.slug}`)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>লাইভ পেজ দেখুন</span>
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    {saved ? <Check className="w-3.5 h-3.5" /> : null}
                    <span>{saved ? 'সংরক্ষিত হয়েছে' : 'সেভ করুন'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 dark:text-stone-300">পেজ টাইটেল *</label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={e => setTitleBn(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 dark:text-stone-300">
                  পেজ কন্টেন্ট (Markdown সমর্থিত) *
                </label>
                <textarea
                  rows={14}
                  required
                  value={contentBn}
                  onChange={e => setContentBn(e.target.value)}
                  className="w-full p-4 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-serif leading-relaxed text-sm"
                />
              </div>
            </form>
          ) : (
            <p className="text-stone-400">একটি পেজ নির্বাচন করুন।</p>
          )}
        </div>

      </div>

    </div>
  );
};
