import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ToolItem } from '../../types';
import { Plus, Edit3, Trash2, ExternalLink, X, Star } from 'lucide-react';

export const ToolAdmin: React.FC = () => {
  const { tools, addTool, updateTool, deleteTool } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<ToolItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    descriptionBn: '',
    category: 'ai' as ToolItem['category'],
    pricing: 'Free' as ToolItem['pricing'],
    pricingDetailsBn: '',
    featuresBn: 'ফিচার ১, ফিচার ২, ফিচার ৩',
    officialUrl: 'https://example.com',
    affiliateUrl: '',
    rating: 4.8,
    featured: false
  });

  const startCreate = () => {
    setEditingTool(null);
    setFormData({
      name: '',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      descriptionBn: '',
      category: 'ai',
      pricing: 'Free',
      pricingDetailsBn: 'সম্পূর্ণ ফ্রি',
      featuresBn: 'ফিচার ১, ফিচার ২',
      officialUrl: 'https://example.com',
      affiliateUrl: '',
      rating: 4.8,
      featured: false
    });
    setIsModalOpen(true);
  };

  const startEdit = (tool: ToolItem) => {
    setEditingTool(tool);
    setFormData({
      name: tool.name,
      logo: tool.logo,
      descriptionBn: tool.descriptionBn,
      category: tool.category,
      pricing: tool.pricing,
      pricingDetailsBn: tool.pricingDetailsBn || '',
      featuresBn: tool.featuresBn.join(', '),
      officialUrl: tool.officialUrl,
      affiliateUrl: tool.affiliateUrl || '',
      rating: tool.rating,
      featured: !!tool.featured
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const feats = formData.featuresBn.split(',').map(f => f.trim()).filter(Boolean);

    if (editingTool) {
      updateTool(editingTool.id, {
        name: formData.name,
        logo: formData.logo,
        descriptionBn: formData.descriptionBn,
        category: formData.category,
        pricing: formData.pricing,
        pricingDetailsBn: formData.pricingDetailsBn,
        featuresBn: feats,
        officialUrl: formData.officialUrl,
        affiliateUrl: formData.affiliateUrl || undefined,
        rating: Number(formData.rating) || 4.5,
        featured: formData.featured
      });
    } else {
      addTool({
        name: formData.name,
        logo: formData.logo,
        descriptionBn: formData.descriptionBn,
        category: formData.category,
        pricing: formData.pricing,
        pricingDetailsBn: formData.pricingDetailsBn,
        featuresBn: feats,
        officialUrl: formData.officialUrl,
        affiliateUrl: formData.affiliateUrl || undefined,
        rating: Number(formData.rating) || 4.5,
        featured: formData.featured
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`আপনি কি "${name}" টুলটি ডিরেক্টরি থেকে মুছে ফেলতে চান?`)) {
      deleteTool(id);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            টুলস ডিরেক্টরি ব্যবস্থাপনা (Tools Directory)
          </h2>
          <p className="text-xs text-stone-500">
            মোট {tools.length} টি ডিজিটাল টুলস ডিরেক্টরিতে তালিকাভুক্ত
          </p>
        </div>

        <button
          onClick={startCreate}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন টুল যুক্ত করুন</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(tool => (
          <div
            key={tool.id}
            className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <img src={tool.logo} alt={tool.name} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">{tool.name}</h4>
                  <p className="text-[11px] text-stone-500">{tool.category} · {tool.pricing}</p>
                </div>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">{tool.descriptionBn}</p>
            </div>

            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-amber-500 font-mono">
                <Star className="w-3 h-3 fill-amber-500" />
                {tool.rating}
              </span>

              <div className="flex items-center gap-1">
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-stone-400 hover:text-stone-700"
                  title="অফিসিয়াল সাইট"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => startEdit(tool)}
                  className="p-1.5 text-stone-400 hover:text-emerald-600"
                  title="এডিট"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(tool.id, tool.name)}
                  className="p-1.5 text-stone-400 hover:text-red-600"
                  title="মুছুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {editingTool ? 'টুল তথ্য সম্পাদনা' : 'নতুন টুল যুক্তকরণ'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">টুলের নাম *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: Cursor AI, DeepSeek"
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 dark:text-stone-300">ক্যাটাগরি</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                  >
                    <option value="ai">এআই (AI)</option>
                    <option value="development">ডেভেলপমেন্ট (Development)</option>
                    <option value="productivity">প্রোডাক্টিভিটি (Productivity)</option>
                    <option value="design">ডিজাইন (Design)</option>
                    <option value="video">ভিডিও (Video)</option>
                    <option value="education">এডুকেশন (Education)</option>
                    <option value="finance">ফাইন্যান্স (Finance)</option>
                    <option value="creator">ক্রিয়েটর (Creator)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 dark:text-stone-300">মূল্য (Pricing)</label>
                  <select
                    value={formData.pricing}
                    onChange={e => setFormData({ ...formData, pricing: e.target.value as any })}
                    className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">লোগো / ইমেজ URL</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={e => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">বাংলা বিবরণ (Description) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.descriptionBn}
                  onChange={e => setFormData({ ...formData, descriptionBn: e.target.value })}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">প্রধান ফিচারসমূহ (কমা দিয়ে লিখুন)</label>
                <input
                  type="text"
                  value={formData.featuresBn}
                  onChange={e => setFormData({ ...formData, featuresBn: e.target.value })}
                  placeholder="ফিচার ১, ফিচার ২, ফিচার ৩"
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 dark:text-stone-300">অফিসিয়াল ওয়েবসাইট URL *</label>
                  <input
                    type="text"
                    required
                    value={formData.officialUrl}
                    onChange={e => setFormData({ ...formData, officialUrl: e.target.value })}
                    className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 dark:text-stone-300">অ্যাফিলিয়েট লিংক (যদি থাকে)</label>
                  <input
                    type="text"
                    value={formData.affiliateUrl}
                    onChange={e => setFormData({ ...formData, affiliateUrl: e.target.value })}
                    placeholder="https://partner..."
                    className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
                  />
                </div>
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
