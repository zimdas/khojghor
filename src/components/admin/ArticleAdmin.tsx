import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Article, ArticleBlock, ContentCategory, FaqItem } from '../../types';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search, 
  Check, 
  X, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Clock,
  Layers,
  FileText
} from 'lucide-react';

export const ArticleAdmin: React.FC = () => {
  const { 
    articles, 
    categories, 
    addArticle, 
    updateArticle, 
    deleteArticle, 
    restoreArticle,
    permanentDeleteArticle,
    bulkArticleAction,
    navigateTo,
    adminLanguage,
    adminT
  } = useStore();

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [revisionNote, setRevisionNote] = useState('');

  // Form State
  const [formData, setFormData] = useState<{
    titleBn: string;
    titleEn: string;
    slug: string;
    category: ContentCategory;
    subcategory: string;
    tags: string;
    authorName: string;
    authorRole: string;
    featuredImage: string;
    readingTimeMin: number;
    excerptBn: string;
    excerptEn: string;
    contentParagraphs: string;
    status: Article['status'];
    scheduledAt: string;
    isFeatured: boolean;
    isTrending: boolean;
    faqQuestion1: string;
    faqAnswer1: string;
    earningPlatformName: string;
    earningBangladesh: 'সম্পূর্ণ সক্রিয় (Fully Available)' | 'সীমিত (Limited)' | 'ভিপিএন বা বিশেষ শর্ত প্রযোজ্য';
    earningPaymentMethods: string;
    earningMinWithdraw: string;
    earningFees: string;
    earningOfficialUrl: string;
    sourceName: string;
    sourceUrl: string;
  }>({
    titleBn: '',
    titleEn: '',
    slug: '',
    category: 'ai',
    subcategory: 'tools',
    tags: 'AI, Tech',
    authorName: 'তানভীর হাসান',
    authorRole: 'টেক এডিটর',
    featuredImage: '/src/assets/images/ai_deepseek_bangla_1790543900759.jpg',
    readingTimeMin: 5,
    excerptBn: '',
    excerptEn: '',
    contentParagraphs: '',
    status: 'published',
    scheduledAt: '',
    isFeatured: false,
    isTrending: false,
    faqQuestion1: '',
    faqAnswer1: '',
    earningPlatformName: '',
    earningBangladesh: 'সম্পূর্ণ সক্রিয় (Fully Available)',
    earningPaymentMethods: 'Payoneer, bKash, Bank',
    earningMinWithdraw: '$10',
    earningFees: '0%-10%',
    earningOfficialUrl: 'https://example.com',
    sourceName: '',
    sourceUrl: ''
  });

  const filteredArticles = articles.filter(art => {
    const matchesSearch = !search || 
      art.titleBn.toLowerCase().includes(search.toLowerCase()) ||
      (art.titleEn && art.titleEn.toLowerCase().includes(search.toLowerCase())) ||
      art.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = filterCategory === 'all' || art.category === filterCategory;
    const matchesStatus = filterStatus === 'all' 
      ? art.status !== 'trash' 
      : art.status === filterStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  const startCreate = () => {
    setEditingArticle(null);
    setRevisionNote('');
    setFormData({
      titleBn: '',
      titleEn: '',
      slug: '',
      category: 'ai',
      subcategory: 'tools',
      tags: 'AI, Tech, Tutorial',
      authorName: 'তানভীর হাসান',
      authorRole: 'Senior Tech Editor',
      featuredImage: '/src/assets/images/hero_khojghor_tech_1790543888032.jpg',
      readingTimeMin: 6,
      excerptBn: '',
      excerptEn: '',
      contentParagraphs: 'এখানে আপনার আর্টিকেলের পূর্ণাঙ্গ বিবরণ লিখুন। হেডারের জন্য "## শিরোনাম" লিখুন।',
      status: 'published',
      scheduledAt: '',
      isFeatured: false,
      isTrending: false,
      faqQuestion1: 'এটি কি বাংলাদেশ থেকে ফ্রিতে ব্যবহার করা যায়?',
      faqAnswer1: 'হ্যাঁ, সাধারণ ব্যবহারকারীদের জন্য সম্পূর্ণ ফ্রি।',
      earningPlatformName: '',
      earningBangladesh: 'সম্পূর্ণ সক্রিয় (Fully Available)',
      earningPaymentMethods: 'Payoneer (বিকাশ সরাসরি লিঙ্কড), ব্যাংক ট্রান্সফার',
      earningMinWithdraw: '$১০',
      earningFees: '১০%',
      earningOfficialUrl: 'https://example.com',
      sourceName: '',
      sourceUrl: ''
    });
    setIsCreating(true);
  };

  const startEdit = (article: Article) => {
    setEditingArticle(article);
    setRevisionNote('');
    const paragraphs = article.blocks
      .filter(b => b.type === 'paragraph' || b.type === 'heading')
      .map(b => (b.type === 'heading' ? `## ${b.content}` : b.content))
      .join('\n\n');

    setFormData({
      titleBn: article.titleBn,
      titleEn: article.titleEn || '',
      slug: article.slug,
      category: article.category,
      subcategory: article.subcategory,
      tags: article.tags.join(', '),
      authorName: article.author.name,
      authorRole: article.author.role,
      featuredImage: article.featuredImage,
      readingTimeMin: article.readingTimeMin,
      excerptBn: article.excerptBn,
      excerptEn: article.excerptEn || '',
      contentParagraphs: paragraphs,
      status: article.status,
      scheduledAt: article.scheduledAt || '',
      isFeatured: !!article.isFeatured,
      isTrending: !!article.isTrending,
      faqQuestion1: article.faqs && article.faqs[0] ? article.faqs[0].question : '',
      faqAnswer1: article.faqs && article.faqs[0] ? article.faqs[0].answer : '',
      earningPlatformName: article.earningDetails ? article.earningDetails.platformName : '',
      earningBangladesh: article.earningDetails ? article.earningDetails.bangladeshAvailability : 'সম্পূর্ণ সক্রিয় (Fully Available)',
      earningPaymentMethods: article.earningDetails ? article.earningDetails.paymentMethods.join(', ') : '',
      earningMinWithdraw: article.earningDetails ? article.earningDetails.minimumWithdrawal : '',
      earningFees: article.earningDetails ? article.earningDetails.fees : '',
      earningOfficialUrl: article.earningDetails ? article.earningDetails.officialUrl : '',
      sourceName: article.sourceName || '',
      sourceUrl: article.sourceUrl || ''
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const rawParagraphs = formData.contentParagraphs.split('\n\n').filter(Boolean);
    const blocks: ArticleBlock[] = rawParagraphs.map(p => {
      const trimmed = p.trim();
      if (trimmed.startsWith('## ')) {
        return { type: 'heading', content: trimmed.replace(/^##\s+/, '') };
      }
      return { type: 'paragraph', content: trimmed };
    });

    const faqs: FaqItem[] = [];
    if (formData.faqQuestion1 && formData.faqAnswer1) {
      faqs.push({ question: formData.faqQuestion1, answer: formData.faqAnswer1 });
    }

    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

    const generatedSlug = formData.slug || formData.titleBn
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50) || `article-${Date.now()}`;

    let earningDetails = undefined;
    if (formData.category === 'earn' && formData.earningPlatformName) {
      earningDetails = {
        platformName: formData.earningPlatformName,
        whoCanUse: '১৮+ বয়সী যেকোনো দক্ষ ব্যক্তি',
        bangladeshAvailability: formData.earningBangladesh,
        requirements: ['কম্পিউটার ও ইন্টারনেট', 'নির্দিষ্ট ডিজিটাল স্কিল'],
        earningModel: 'প্রজেক্ট বা কন্ট্রাক্ট ভিত্তিক',
        paymentMethods: formData.earningPaymentMethods.split(',').map(m => m.trim()),
        minimumWithdrawal: formData.earningMinWithdraw,
        fees: formData.earningFees,
        pros: ['গ্লোবাল ক্লায়েন্ট', 'নিরাপদ পেমেন্ট গেটওয়ে'],
        cons: ['প্রতিযোগিতা বেশি', 'কঠোর ভেরিফিকেশন'],
        officialUrl: formData.earningOfficialUrl,
        safetyRating: '৫/৫ (যাচাইকৃত)'
      };
    }

    if (editingArticle) {
      await updateArticle(editingArticle.id, {
        titleBn: formData.titleBn,
        titleEn: formData.titleEn,
        slug: generatedSlug,
        category: formData.category,
        subcategory: formData.subcategory,
        tags: tagsArray,
        author: {
          name: formData.authorName,
          avatar: editingArticle.author.avatar,
          role: formData.authorRole
        },
        featuredImage: formData.featuredImage,
        readingTimeMin: Number(formData.readingTimeMin) || 5,
        excerptBn: formData.excerptBn,
        excerptEn: formData.excerptEn,
        blocks,
        faqs,
        earningDetails,
        sourceName: formData.sourceName || undefined,
        sourceUrl: formData.sourceUrl || undefined,
        status: formData.status,
        scheduledAt: formData.status === 'scheduled' ? formData.scheduledAt : undefined,
        isFeatured: formData.isFeatured,
        isTrending: formData.isTrending
      }, revisionNote || 'Updated via Admin CMS');
    } else {
      await addArticle({
        titleBn: formData.titleBn,
        titleEn: formData.titleEn,
        slug: generatedSlug,
        category: formData.category,
        subcategory: formData.subcategory,
        tags: tagsArray,
        author: {
          name: formData.authorName,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          role: formData.authorRole
        },
        featuredImage: formData.featuredImage,
        publishedAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        sourceName: formData.sourceName || undefined,
        sourceUrl: formData.sourceUrl || undefined,
        scheduledAt: formData.status === 'scheduled' ? formData.scheduledAt : undefined,
        readingTimeMin: Number(formData.readingTimeMin) || 5,
        excerptBn: formData.excerptBn,
        excerptEn: formData.excerptEn,
        blocks,
        faqs,
        earningDetails,
        status: formData.status,
        isFeatured: formData.isFeatured,
        isTrending: formData.isTrending
      });
    }

    setIsCreating(false);
    setEditingArticle(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(adminLanguage === 'bn' ? `"${title}" আর্টিকেলটি ট্র্যাশে পাঠাতে চান?` : `Move "${title}" to trash?`)) {
      await deleteArticle(id);
    }
  };

  const handleRestore = async (id: string) => {
    await restoreArticle(id);
  };

  const handlePermanentDelete = async (id: string) => {
    if (confirm(adminLanguage === 'bn' ? 'স্থায়ীভাবে ডিলিট করতে চান? এটি আর ফিরিয়ে আনা যাবে না।' : 'Permanently delete this article? This action cannot be undone.')) {
      await permanentDeleteArticle(id);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedIds.length === 0) return;
    if (confirm(`Apply ${action} to ${selectedIds.length} articles?`)) {
      await bulkArticleAction(action, selectedIds);
      setSelectedIds([]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredArticles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredArticles.map(a => a.id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>{adminLanguage === 'bn' ? 'আর্টিকেল সিএমএস ব্যবস্থাপনা' : 'Article CMS Manager'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? `মোট ${articles.length} টি নিবন্ধ বাস্তব ডেটাবেজে সংরক্ষিত।` : `Total ${articles.length} articles managed in real database.`}
          </p>
        </div>

        <button
          onClick={startCreate}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{adminLanguage === 'bn' ? 'নতুন আর্টিকেল লিখুন' : 'Create Article'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={adminLanguage === 'bn' ? 'শিরোনাম বা ট্যাগ দিয়ে খুঁজুন...' : 'Search by title or tag...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 focus:outline-none"
          >
            <option value="all">{adminLanguage === 'bn' ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
            {categories.map(c => (
              <option key={c.id} value={c.slug}>{adminLanguage === 'en' ? c.nameEn : c.nameBn}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 focus:outline-none"
          >
            <option value="all">{adminLanguage === 'bn' ? 'সকল সক্রিয়' : 'All Active'}</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="trash">Trash ({articles.filter(a => a.status === 'trash').length})</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Controls */}
      {selectedIds.length > 0 && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
          <span className="font-semibold text-emerald-800 dark:text-emerald-300">
            {selectedIds.length} articles selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction('publish')}
              className="px-2.5 py-1 rounded bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium"
            >
              Publish
            </button>
            <button
              onClick={() => handleBulkAction('unpublish')}
              className="px-2.5 py-1 rounded bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium"
            >
              Draft
            </button>
            <button
              onClick={() => handleBulkAction('trash')}
              className="px-2.5 py-1 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 font-medium"
            >
              Move to Trash
            </button>
          </div>
        </div>
      )}

      {/* Articles Table */}
      <div className="rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 font-semibold">
            <tr>
              <th className="p-3.5 w-8">
                <input
                  type="checkbox"
                  checked={selectedIds.length > 0 && selectedIds.length === filteredArticles.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-3.5">শিরোনাম ও মেটা</th>
              <th className="p-3.5">ক্যাটাগরি</th>
              <th className="p-3.5">স্ট্যাটাস</th>
              <th className="p-3.5 text-right">ভিউ সংখ্যা</th>
              <th className="p-3.5 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {filteredArticles.map(art => (
              <tr key={art.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40 transition-colors">
                <td className="p-3.5">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(art.id)}
                    onChange={() => setSelectedIds(prev => prev.includes(art.id) ? prev.filter(x => x !== art.id) : [...prev, art.id])}
                  />
                </td>
                <td className="p-3.5 max-w-xs sm:max-w-md">
                  <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">{art.titleBn}</p>
                  {art.titleEn && <p className="text-[11px] text-stone-500 truncate">{art.titleEn}</p>}
                  <p className="text-[11px] text-stone-400 font-mono">/{art.slug}</p>
                </td>
                <td className="p-3.5 capitalize text-emerald-700 dark:text-emerald-400 font-medium">
                  {art.category}
                </td>
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase font-mono ${
                    art.status === 'published' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                    art.status === 'scheduled' ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400' :
                    art.status === 'trash' ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400' :
                    'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                  }`}>
                    {art.status}
                  </span>
                </td>
                <td className="p-3.5 text-right font-mono tabular-nums text-stone-600 dark:text-stone-300">
                  {art.views.toLocaleString()}
                </td>
                <td className="p-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {art.status !== 'trash' ? (
                      <>
                        <button
                          onClick={() => navigateTo(`/article/${art.slug}`)}
                          className="p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => startEdit(art)}
                          className="p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-emerald-600"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(art.id, art.titleBn)}
                          className="p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-red-600"
                          title="Move to Trash"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleRestore(art.id)}
                          className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]"
                        >
                          Restore
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(art.id)}
                          className="p-1.5 rounded text-red-500 hover:bg-red-50"
                          title="Permanent Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                {editingArticle ? (adminLanguage === 'bn' ? 'আর্টিকেল সম্পাদনা' : 'Edit Article') : (adminLanguage === 'bn' ? 'নতুন আর্টিকেল তৈরি' : 'Create Article')}
              </h3>
              <button onClick={() => setIsCreating(false)}>
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">Bangla Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleBn}
                    onChange={e => setFormData({ ...formData, titleBn: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">English Title</label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">ক্যাটাগরি *</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as ContentCategory })}
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.nameBn} ({c.slug})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">URL স্লাগ (Slug)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">পড়ার সময় (মিনিট)</label>
                  <input
                    type="number"
                    value={formData.readingTimeMin}
                    onChange={e => setFormData({ ...formData, readingTimeMin: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 dark:text-stone-300">ফিচার্ড ইমেজ URL</label>
                <input
                  type="text"
                  value={formData.featuredImage}
                  onChange={e => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">সংবাদ/তথ্যসূত্র (Source Name - ঐচ্ছিক)</label>
                  <input
                    type="text"
                    placeholder="যেমন: The Verge, Reuters, OpenAI"
                    value={formData.sourceName}
                    onChange={e => setFormData({ ...formData, sourceName: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">সোর্স লিঙ্ক (Source URL - ঐচ্ছিক)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.sourceUrl}
                    onChange={e => setFormData({ ...formData, sourceUrl: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">সংক্ষিপ্ত ভূমিকা (Bangla Excerpt) *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerptBn}
                    onChange={e => setFormData({ ...formData, excerptBn: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">English Excerpt</label>
                  <textarea
                    rows={2}
                    value={formData.excerptEn}
                    onChange={e => setFormData({ ...formData, excerptEn: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 dark:text-stone-300">
                  মূল বক্তব্য ও কন্টেন্ট প্যারাগ্রাফ (Markdown Headers with ## supported)
                </label>
                <textarea
                  rows={8}
                  value={formData.contentParagraphs}
                  onChange={e => setFormData({ ...formData, contentParagraphs: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-serif leading-relaxed"
                />
              </div>

              {/* Revision note if editing */}
              {editingArticle && (
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">রিভিশন নোট (Change Note)</label>
                  <input
                    type="text"
                    value={revisionNote}
                    onChange={e => setRevisionNote(e.target.value)}
                    placeholder="e.g. Updated DeepSeek R1 local installation commands"
                    className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                  />
                </div>
              )}

              {/* Status and Flags */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                    <span>ফিচার্ড কন্টেন্ট</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isTrending}
                      onChange={e => setFormData({ ...formData, isTrending: e.target.checked })}
                    />
                    <span>ট্রেন্ডিং</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 font-semibold"
                  >
                    <option value="published">Publish</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Schedule</option>
                    <option value="review">Review</option>
                  </select>

                  {formData.status === 'scheduled' && (
                    <input
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={e => setFormData({ ...formData, scheduledAt: e.target.value })}
                      className="p-1.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-xs"
                    />
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-sm"
                  >
                    {adminLanguage === 'bn' ? 'সংরক্ষণ করুন' : 'Save Article'}
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
