import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { VideoItem, ContentCategory } from '../../types';
import { Plus, Edit3, Trash2, Video, Eye, ExternalLink, X } from 'lucide-react';

export const VideoAdmin: React.FC = () => {
  const { videos, addVideo, updateVideo, deleteVideo, navigateTo } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);

  const [formData, setFormData] = useState({
    titleBn: '',
    youtubeId: '',
    thumbnailUrl: '/src/assets/images/ai_deepseek_bangla_1790543900759.jpg',
    category: 'ai' as ContentCategory,
    duration: '15:00',
    summaryBn: '',
    fullGuideBn: '',
    toolsUsed: 'DeepSeek, VS Code',
    status: 'published' as 'published' | 'draft' | 'trash'
  });

  const startCreate = () => {
    setEditingVideo(null);
    setFormData({
      titleBn: '',
      youtubeId: '',
      thumbnailUrl: '/src/assets/images/make_build_iot_1790543927581.jpg',
      category: 'make-build',
      duration: '12:30',
      summaryBn: '',
      fullGuideBn: '',
      toolsUsed: 'Next.js, Tailwind, Cursor AI',
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const startEdit = (vid: VideoItem) => {
    setEditingVideo(vid);
    setFormData({
      titleBn: vid.titleBn,
      youtubeId: vid.youtubeId,
      thumbnailUrl: vid.thumbnailUrl,
      category: vid.category as ContentCategory,
      duration: vid.duration,
      summaryBn: vid.summaryBn,
      fullGuideBn: vid.fullGuideBn || '',
      toolsUsed: vid.toolsUsed ? vid.toolsUsed.join(', ') : '',
      status: vid.status
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const toolsArray = formData.toolsUsed.split(',').map(t => t.trim()).filter(Boolean);

    if (editingVideo) {
      updateVideo(editingVideo.id, {
        titleBn: formData.titleBn,
        youtubeId: formData.youtubeId,
        thumbnailUrl: formData.thumbnailUrl,
        category: formData.category,
        duration: formData.duration,
        summaryBn: formData.summaryBn,
        fullGuideBn: formData.fullGuideBn,
        toolsUsed: toolsArray,
        status: formData.status
      });
    } else {
      addVideo({
        titleBn: formData.titleBn,
        youtubeId: formData.youtubeId,
        thumbnailUrl: formData.thumbnailUrl,
        category: formData.category,
        duration: formData.duration,
        publishedAt: new Date().toISOString().split('T')[0],
        summaryBn: formData.summaryBn,
        fullGuideBn: formData.fullGuideBn,
        toolsUsed: toolsArray,
        status: formData.status
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`আপনি কি "${title}" ভিডিওটি মুছে ফেলতে চান?`)) {
      deleteVideo(id);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            ভিডিও কন্টেন্ট ব্যবস্থাপনা (Video Manager)
          </h2>
          <p className="text-xs text-stone-500">
            ইউটিউব ও সোশ্যাল ভিডিও যুক্ত করুন এবং সংশ্লিষ্ট আর্টিকেলের সাথে লিংক করুন।
          </p>
        </div>

        <button
          onClick={startCreate}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ভিডিও যুক্ত করুন</span>
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map(vid => (
          <div
            key={vid.id}
            className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="aspect-video rounded-lg overflow-hidden bg-stone-900 relative">
                <img src={vid.thumbnailUrl} alt={vid.titleBn} className="w-full h-full object-cover" />
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono">
                  {vid.duration}
                </span>
              </div>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2">{vid.titleBn}</p>
              <p className="text-[11px] text-stone-500 line-clamp-2">{vid.summaryBn}</p>
            </div>

            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400 capitalize">{vid.category}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigateTo(`/video/${vid.id}`)}
                  className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                  title="দেখুন"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => startEdit(vid)}
                  className="p-1.5 text-stone-400 hover:text-emerald-600"
                  title="এডিট"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(vid.id, vid.titleBn)}
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
                {editingVideo ? 'ভিডিও সম্পাদনা' : 'নতুন ভিডিও যুক্তকরণ'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">ভিডিওর শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={formData.titleBn}
                  onChange={e => setFormData({ ...formData, titleBn: e.target.value })}
                  placeholder="ভিডিওর শিরোনাম লিখুন..."
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 dark:text-stone-300">YouTube Video ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.youtubeId}
                    onChange={e => setFormData({ ...formData, youtubeId: e.target.value })}
                    placeholder="dQw4w9WgXcQ"
                    className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 dark:text-stone-300">সময়কাল (Duration)</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="14:20"
                    className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">থাম্বনেইল ইমেজ পাথ</label>
                <input
                  type="text"
                  value={formData.thumbnailUrl}
                  onChange={e => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">ক্যাটাগরি</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as ContentCategory })}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                >
                  <option value="ai">এআই (AI)</option>
                  <option value="tech">প্রযুক্তি (Tech)</option>
                  <option value="earn">উপার্জন (Earn)</option>
                  <option value="student">স্টুডেন্ট (Student)</option>
                  <option value="make-build">মেক ও বিল্ড (Make & Build)</option>
                  <option value="trading">ট্রেডিং (Trading)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">সংক্ষিপ্ত সারসংক্ষেপ</label>
                <textarea
                  rows={2}
                  value={formData.summaryBn}
                  onChange={e => setFormData({ ...formData, summaryBn: e.target.value })}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">ব্যবহৃত টুলস (কমা দিয়ে লিখুন)</label>
                <input
                  type="text"
                  value={formData.toolsUsed}
                  onChange={e => setFormData({ ...formData, toolsUsed: e.target.value })}
                  placeholder="DeepSeek, VS Code, Canva"
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
