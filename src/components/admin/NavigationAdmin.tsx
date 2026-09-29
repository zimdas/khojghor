import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { NavigationItem } from '../../types';
import { Menu, Plus, Trash2, ArrowUp, ArrowDown, Save, Check } from 'lucide-react';

export const NavigationAdmin: React.FC = () => {
  const { navigation, updateNavigationConfig, adminLanguage } = useStore();
  const [navItems, setNavItems] = useState<NavigationItem[]>(navigation || []);
  const [labelBn, setLabelBn] = useState('');
  const [labelEn, setLabelEn] = useState('');
  const [url, setUrl] = useState('');
  const [saved, setSaved] = useState(false);

  React.useEffect(() => {
    if (navigation && navigation.length > 0) setNavItems(navigation);
  }, [navigation]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!labelBn || !url) return;
    const newItem: NavigationItem = {
      id: `nav_${Date.now()}`,
      labelBn,
      labelEn: labelEn || labelBn,
      url,
      order: navItems.length + 1,
      enabled: true,
      location: 'header'
    };
    setNavItems([...navItems, newItem]);
    setLabelBn('');
    setLabelEn('');
    setUrl('');
  };

  const removeItem = (id: string) => {
    setNavItems(navItems.filter(item => item.id !== id));
  };

  const handleSave = async () => {
    await updateNavigationConfig(navItems);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Menu className="w-5 h-5 text-emerald-600" />
            <span>{adminLanguage === 'bn' ? 'নেভিগেশন মেনু কনফিগারেশন' : 'Navigation Menu Manager'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? 'পাবলিক ওয়েবসাইটের হেডার মেনু আইটেমসমূহ পরিচালনা করুন।' : 'Manage public header navigation links and ordering.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'সংরক্ষিত!' : 'সেভ করুন'}</span>
        </button>
      </div>

      {/* Add New Menu Item */}
      <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
        <h3 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
          {adminLanguage === 'bn' ? 'নতুন মেনু আইটেম যোগ করুন' : 'Add New Navigation Link'}
        </h3>
        <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <input
            type="text"
            required
            value={labelBn}
            onChange={e => setLabelBn(e.target.value)}
            placeholder="Bangla Label (যেমন: পডকাস্ট)"
            className="p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
          />
          <input
            type="text"
            value={labelEn}
            onChange={e => setLabelEn(e.target.value)}
            placeholder="English Label (e.g. Podcasts)"
            className="p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
          />
          <input
            type="text"
            required
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="URL (/podcasts)"
            className="p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold"
          >
            {adminLanguage === 'bn' ? 'আইটেম যোগ' : 'Add Link'}
          </button>
        </form>
      </div>

      {/* Existing Menu Items */}
      <div className="space-y-2">
        {navItems.map((item, idx) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between shadow-xs text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-stone-400 font-bold w-5">0{idx + 1}.</span>
              <div>
                <p className="font-bold text-stone-900 dark:text-stone-100">
                  {item.labelBn} <span className="font-normal text-stone-400">({item.labelEn})</span>
                </p>
                <p className="font-mono text-[11px] text-stone-500">{item.url}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => removeItem(item.id)}
                className="p-1.5 text-stone-400 hover:text-red-600"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
