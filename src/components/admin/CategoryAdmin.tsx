import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CategoryInfo } from '../../types';
import { Plus, Edit3, Trash2, Layers, X } from 'lucide-react';

export const CategoryAdmin: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryInfo | null>(null);

  const [formData, setFormData] = useState({
    slug: '',
    nameBn: '',
    nameEn: '',
    descriptionBn: '',
    subcategoriesStr: ''
  });

  const startCreate = () => {
    setEditingCategory(null);
    setFormData({
      slug: '',
      nameBn: '',
      nameEn: '',
      descriptionBn: '',
      subcategoriesStr: 'টুলস (tools), মডেল (models), গাইড (guides)'
    });
    setIsModalOpen(true);
  };

  const startEdit = (cat: CategoryInfo) => {
    setEditingCategory(cat);
    const subs = cat.subcategories.map(s => `${s.nameBn} (${s.slug})`).join(', ');
    setFormData({
      slug: cat.slug,
      nameBn: cat.nameBn,
      nameEn: cat.nameEn,
      descriptionBn: cat.descriptionBn,
      subcategoriesStr: subs
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const rawSubs = formData.subcategoriesStr.split(',').map(s => s.trim()).filter(Boolean);
    const parsedSubs = rawSubs.map(s => {
      const match = s.match(/(.*?)\s*\((.*?)\)/);
      if (match) {
        return { nameBn: match[1].trim(), slug: match[2].trim(), nameEn: match[2].trim() };
      }
      const slugClean = s.toLowerCase().replace(/\s+/g, '-');
      return { nameBn: s, slug: slugClean, nameEn: slugClean };
    });

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        nameBn: formData.nameBn,
        nameEn: formData.nameEn,
        slug: formData.slug,
        descriptionBn: formData.descriptionBn,
        subcategories: parsedSubs
      });
    } else {
      addCategory({
        id: `cat_${Date.now()}`,
        slug: formData.slug || formData.nameEn.toLowerCase().replace(/\s+/g, '-'),
        nameBn: formData.nameBn,
        nameEn: formData.nameEn,
        descriptionBn: formData.descriptionBn,
        subcategories: parsedSubs,
        icon: 'Layers'
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`আপনি কি "${name}" ক্যাটাগরিটি মুছে ফেলতে চান?`)) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            ক্যাটাগরি ও সাব-ক্যাটাগরি ব্যবস্থাপনা (Categories)
          </h2>
          <p className="text-xs text-stone-500">
            ওয়েবসাইটের মূল বিভাগ ও সাব-ক্যাটাগরি সমূহ নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          onClick={startCreate}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ক্যাটাগরি</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  {cat.nameBn} <span className="font-mono text-xs text-stone-400">({cat.slug})</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">{cat.descriptionBn}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => startEdit(cat)}
                  className="p-1.5 text-stone-400 hover:text-emerald-600"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.nameBn)}
                  className="p-1.5 text-stone-400 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
              <span className="text-[11px] font-semibold text-stone-400">সাব-ক্যাটাগরি সমূহ:</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {cat.subcategories.map(sub => (
                  <span
                    key={sub.slug}
                    className="px-2 py-0.5 rounded text-[11px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium"
                  >
                    {sub.nameBn} <span className="font-mono text-[10px] text-stone-400">({sub.slug})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {editingCategory ? 'ক্যাটাগরি সম্পাদনা' : 'নতুন ক্যাটাগরি তৈরি'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">বাংলা নাম *</label>
                <input
                  type="text"
                  required
                  value={formData.nameBn}
                  onChange={e => setFormData({ ...formData, nameBn: e.target.value })}
                  placeholder="যেমন: গেমিং ও ইস্পোর্টস"
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 dark:text-stone-300">ইংরেজি নাম *</label>
                  <input
                    type="text"
                    required
                    value={formData.nameEn}
                    onChange={e => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="Gaming"
                    className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 dark:text-stone-300">URL স্লাগ</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="gaming"
                    className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">বিবরণ</label>
                <textarea
                  rows={2}
                  value={formData.descriptionBn}
                  onChange={e => setFormData({ ...formData, descriptionBn: e.target.value })}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">
                  সাব-ক্যাটাগরি সমূহ (যেমন: নাম (slug), নাম (slug))
                </label>
                <textarea
                  rows={2}
                  value={formData.subcategoriesStr}
                  onChange={e => setFormData({ ...formData, subcategoriesStr: e.target.value })}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
