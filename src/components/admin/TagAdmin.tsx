import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Tag, Plus, Trash2, Hash } from 'lucide-react';

export const TagAdmin: React.FC = () => {
  const { tags, addTag, deleteTag, adminT, adminLanguage } = useStore();
  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameBn || !slug) return;
    await addTag(nameBn, nameEn || nameBn, slug.toLowerCase().replace(/\s+/g, '-'));
    setNameBn('');
    setNameEn('');
    setSlug('');
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete tag "${name}"?`)) {
      await deleteTag(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Hash className="w-5 h-5 text-emerald-600" />
            <span>{adminT('adminTags')} (Tag Management)</span>
          </h2>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? 'আর্টিকেলের ট্যাগ ও কি-ওয়ার্ড পরিচালনা করুন।' : 'Manage normalized content tags and keywords.'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{adminLanguage === 'bn' ? 'নতুন ট্যাগ' : 'New Tag'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tags.map(tag => (
          <div
            key={tag.id}
            className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between shadow-xs"
          >
            <div>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{tag.nameBn}</p>
              <p className="text-xs text-stone-400 font-mono">#{tag.slug}</p>
            </div>
            <button
              onClick={() => handleDelete(tag.id, tag.nameBn)}
              className="p-1.5 text-stone-400 hover:text-red-600"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              {adminLanguage === 'bn' ? 'নতুন ট্যাগ তৈরি করুন' : 'Create New Tag'}
            </h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">বাংলা নাম *</label>
                <input
                  type="text"
                  required
                  value={nameBn}
                  onChange={e => setNameBn(e.target.value)}
                  placeholder="যেমন: পাইথন কোডিং"
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">English Name</label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={e => setNameEn(e.target.value)}
                  placeholder="Python Coding"
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="python-coding"
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-stone-100 dark:bg-stone-800"
                >
                  {adminLanguage === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-emerald-600 text-white font-semibold"
                >
                  {adminLanguage === 'bn' ? 'সংরক্ষণ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
