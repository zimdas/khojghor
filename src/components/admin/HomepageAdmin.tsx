import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { HomepageSectionConfig } from '../../types';
import { Layout, ArrowUp, ArrowDown, Eye, EyeOff, Save, Check } from 'lucide-react';

export const HomepageAdmin: React.FC = () => {
  const { homepageConfig, updateHomepageConfig, adminLanguage } = useStore();
  const [sections, setSections] = useState<HomepageSectionConfig[]>(homepageConfig || []);
  const [saved, setSaved] = useState(false);

  // Sync if store updates
  React.useEffect(() => {
    if (homepageConfig && homepageConfig.length > 0) {
      setSections(homepageConfig);
    }
  }, [homepageConfig]);

  const toggleSection = (id: string) => {
    setSections(prev => prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= sections.length) return;
    const cloned = [...sections];
    const temp = cloned[index];
    cloned[index] = cloned[target];
    cloned[target] = temp;
    setSections(cloned);
  };

  const updateSectionField = (id: string, field: keyof HomepageSectionConfig, value: any) => {
    setSections(prev => prev.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSave = async () => {
    await updateHomepageConfig(sections);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Layout className="w-5 h-5 text-emerald-600" />
            <span>{adminLanguage === 'bn' ? 'হোমপেজ সেকশন কনফিগারেশন' : 'Homepage Section Layout'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? 'হোমপেজের ক্যাটাগরি সেকশন অন/অফ, ক্রমানুসার ও শিরোনাম পরিবর্তন করুন।' : 'Enable, disable, reorder, and configure homepage section titles.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? (adminLanguage === 'bn' ? 'সংরক্ষিত হয়েছে!' : 'Saved!') : (adminLanguage === 'bn' ? 'সেভ করুন' : 'Save Layout')}</span>
        </button>
      </div>

      <div className="space-y-3">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`p-4 rounded-xl border transition-all ${
              sec.enabled 
                ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-xs' 
                : 'bg-stone-50 dark:bg-stone-900/40 border-stone-200/60 dark:border-stone-800/60 opacity-60'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex items-center gap-3 flex-1">
                <span className="font-mono text-xs font-bold text-stone-400 w-6">0{idx + 1}.</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                  <div>
                    <label className="text-[10px] font-semibold text-stone-400">Bangla Title</label>
                    <input
                      type="text"
                      value={sec.titleBn}
                      onChange={e => updateSectionField(sec.id, 'titleBn', e.target.value)}
                      className="w-full text-xs font-bold p-1.5 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-stone-400">English Title</label>
                    <input
                      type="text"
                      value={sec.titleEn || ''}
                      onChange={e => updateSectionField(sec.id, 'titleEn', e.target.value)}
                      className="w-full text-xs font-bold p-1.5 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto">
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <span className="text-[11px]">{adminLanguage === 'bn' ? 'আইটেম:' : 'Items:'}</span>
                  <select
                    value={sec.itemCount || 3}
                    onChange={e => updateSectionField(sec.id, 'itemCount', Number(e.target.value))}
                    className="p-1 rounded bg-stone-100 dark:bg-stone-800 text-xs font-mono font-bold"
                  >
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                  </select>
                </div>

                <button
                  onClick={() => toggleSection(sec.id)}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    sec.enabled ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                  }`}
                  title={sec.enabled ? 'Disable' : 'Enable'}
                >
                  {sec.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveSection(idx, 'up')}
                    className="p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={idx === sections.length - 1}
                    onClick={() => moveSection(idx, 'down')}
                    className="p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
