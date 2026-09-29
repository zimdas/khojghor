import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { MediaItem } from '../../types';
import { Upload, Image as ImageIcon, Search, Copy, Check, Trash2, Edit3, X } from 'lucide-react';

export const MediaAdmin: React.FC = () => {
  const { media, uploadMedia, updateMedia, deleteMedia, adminLanguage } = useStore();
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');

  const filteredMedia = media.filter(m => 
    !search || 
    m.filename.toLowerCase().includes(search.toLowerCase()) ||
    m.altText.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(adminLanguage === 'bn' ? 'ফাইল সাইজ সর্বোচ্চ ৫ মেগাবাইট অনুমোদিত।' : 'Max file size is 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      await uploadMedia(file.name, dataUrl, file.name.replace(/\.[^/.]+$/, ''), '');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const startEdit = (item: MediaItem) => {
    setEditingItem(item);
    setAltText(item.altText);
    setCaption(item.caption || '');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    await updateMedia(editingItem.id, { altText, caption });
    setEditingItem(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(adminLanguage === 'bn' ? `"${name}" ফাইলটি মুছে ফেলতে চান?` : `Delete "${name}"?`)) {
      await deleteMedia(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            <span>{adminLanguage === 'bn' ? 'মিডিয়া লাইব্রেরি (Media Library)' : 'Media Library'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? 'আর্টিকেল ও পেইজের ছবি আপলোড ও অপটিমাইজেশন পরিচালনা করুন।' : 'Upload and manage media assets, alt texts, and URLs.'}
          </p>
        </div>

        <label className="cursor-pointer px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm self-start sm:self-auto">
          <Upload className="w-4 h-4" />
          <span>{adminLanguage === 'bn' ? 'ছবি আপলোড করুন' : 'Upload Image'}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Search */}
      <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center gap-3">
        <Search className="w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={adminLanguage === 'bn' ? 'ফাইলের নাম বা Alt টেক্সট দিয়ে খুঁজুন...' : 'Search media by filename or alt text...'}
          className="w-full text-xs bg-transparent focus:outline-none text-stone-900 dark:text-stone-100"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.map(item => (
          <div
            key={item.id}
            className="group p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 shadow-xs hover:border-stone-400 transition-colors flex flex-col justify-between"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
              <img
                src={item.url}
                alt={item.altText}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-bold text-stone-900 dark:text-stone-100 truncate" title={item.filename}>
                {item.filename}
              </p>
              <p className="text-[10px] text-stone-400 truncate">
                {Math.round(item.fileSize / 1024)} KB · {item.dimensions || 'Image'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-stone-100 dark:border-stone-800 text-stone-400">
              <button
                onClick={() => copyUrl(item.id, item.url)}
                className="p-1 hover:text-emerald-600"
                title="Copy URL"
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => startEdit(item)}
                className="p-1 hover:text-stone-900 dark:hover:text-stone-100"
                title="Edit Alt/Caption"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(item.id, item.filename)}
                className="p-1 hover:text-red-600"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Alt Text Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {adminLanguage === 'bn' ? 'মিডিয়া মেটাডাটা সম্পাদনা' : 'Edit Media Metadata'}
              </h3>
              <button onClick={() => setEditingItem(null)}>
                <X className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img src={editingItem.url} alt="" className="w-full h-full object-contain" />
              </div>

              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">Alt Text (Accessibility & SEO)</label>
                <input
                  type="text"
                  value={altText}
                  onChange={e => setAltText(e.target.value)}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">Caption (Optional)</label>
                <input
                  type="text"
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
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
