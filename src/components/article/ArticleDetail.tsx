import React, { useState, useEffect } from 'react';
import { Article } from '../../types';
import { useStore } from '../../context/StoreContext';
import { 
  Bookmark, 
  Share2, 
  Clock, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  ChevronRight, 
  Copy, 
  Check, 
  HelpCircle, 
  ShieldCheck, 
  AlertTriangle,
  ArrowLeft,
  Video,
  Wrench
} from 'lucide-react';
import { AdSlot } from '../common/AdSlot';

interface ArticleDetailProps {
  article: Article;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  const { 
    navigateTo, 
    isBookmarked, 
    toggleBookmark, 
    recordArticleView,
    categories,
    videos,
    tools,
    articles
  } = useStore();

  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    recordArticleView(article.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  const categoryObj = categories.find(c => c.slug === article.category);
  const categoryName = categoryObj ? categoryObj.nameBn : article.category;

  const bookmarked = isBookmarked(article.id);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleShareUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(s => s !== stepNumber) 
        : [...prev, stepNumber]
    );
  };

  // Content Relationship Engine: find related videos, tools, and articles
  const relatedVideosList = videos.filter(v => 
    (article.relatedVideoIds && article.relatedVideoIds.includes(v.id)) ||
    v.category === article.category
  ).slice(0, 3);

  const relatedToolsList = tools.filter(t => 
    (article.relatedToolIds && article.relatedToolIds.includes(t.id))
  ).slice(0, 4);

  const relatedArticlesList = articles.filter(a => 
    a.id !== article.id && 
    (a.category === article.category || a.tags.some(tag => article.tags.includes(tag)))
  ).slice(0, 3);

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-6 flex-wrap">
          <button onClick={() => navigateTo('/')} className="hover:text-stone-900 dark:hover:text-stone-200">
            হোম
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigateTo(`/${article.category}`)} className="hover:text-stone-900 dark:hover:text-stone-200 font-medium text-emerald-700 dark:text-emerald-400">
            {categoryName}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="truncate max-w-[200px] sm:max-w-xs text-stone-400 dark:text-stone-500">
            {article.titleBn}
          </span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigateTo(`/${article.category}`)}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{categoryName} বিভাগে ফিরে যান</span>
        </button>

        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-stone-200 dark:border-stone-800">
          {/* Zero-Pill Unboxed Category & Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 flex-wrap">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">
              {categoryName}
            </span>
            <span aria-hidden="true">·</span>
            <span>প্রকাশিত: {article.publishedAt}</span>
            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span>আপডেট: {article.updatedAt}</span>
              </>
            )}
            {article.sourceName && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  সোর্স:{' '}
                  {article.sourceUrl ? (
                    <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-700 dark:text-emerald-400 font-medium">
                      {article.sourceName}
                    </a>
                  ) : (
                    article.sourceName
                  )}
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMin} মিনিট পাঠ</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono">
              <Eye className="w-3.5 h-3.5" />
              {article.views.toLocaleString('bn-BD')} ভিউ
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-tight text-balance">
            {article.titleBn}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
            {article.excerptBn}
          </p>

          {/* Author and Action Bar */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-stone-800"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{article.author.name}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => toggleBookmark(article.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                <span>{bookmarked ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}</span>
              </button>

              {/* Share Channels */}
              <div className="flex items-center gap-1.5">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors"
                  title="ফেসবুকে শেয়ার করুন"
                >
                  Facebook
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.titleBn + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                  title="হোয়াটসঅ্যাপে পাঠান"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(article.titleBn)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9]/20 transition-colors"
                  title="টেলিগ্রামে শেয়ার করুন"
                >
                  Telegram
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(article.titleBn)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors"
                  title="X (Twitter)-এ পোস্ট করুন"
                >
                  X / Twitter
                </a>
                <button
                  onClick={handleShareUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  title="লিঙ্ক কপি করুন"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'কপি হয়েছে!' : 'লিংক কপি'}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Top Ad Slot */}
        <AdSlot location="article_top" />

        {/* Featured Image */}
        <div className="my-8 rounded-xl overflow-hidden aspect-video bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <img
            src={article.featuredImage}
            alt={article.titleBn}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Structured Earning Fields (If in Earning Category) */}
        {article.earningDetails && (
          <div className="my-8 p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  প্ল্যাটফর্ম পরিচিতি ও যাচাইকৃত তথ্য
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                {article.earningDetails.safetyRating}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 space-y-1">
                <span className="text-stone-500 font-medium">প্ল্যাটফর্মের নাম:</span>
                <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">{article.earningDetails.platformName}</p>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 space-y-1">
                <span className="text-stone-500 font-medium">বাংলাদেশে গ্রহণযোগ্যতা:</span>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm">{article.earningDetails.bangladeshAvailability}</p>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 space-y-1">
                <span className="text-stone-500 font-medium">টাকা তোলার মাধ্যম (Withdrawal):</span>
                <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  {article.earningDetails.paymentMethods.join(', ')}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 space-y-1">
                <span className="text-stone-500 font-medium">সর্বনিম্ন উত্তোলন ও ফি:</span>
                <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  মিনিমাম {article.earningDetails.minimumWithdrawal} · ফি: {article.earningDetails.fees}
                </p>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  সুবিধাসমূহ (Pros)
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                  {article.earningDetails.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
                <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  সীমাবদ্ধতা ও চ্যালেঞ্জ (Cons)
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                  {article.earningDetails.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <a
                href={article.earningDetails.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-md bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 transition-colors"
              >
                <span>অফিসিয়াল ওয়েবসাইট ভিজিট করুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Step-by-Step Guide if Available */}
        {article.stepByStepGuide && article.stepByStepGuide.length > 0 && (
          <div className="my-8 p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              পর্যায়ক্রমিক নির্দেশিকা (Step-by-Step Action Guide)
            </h3>
            <div className="space-y-3 pt-2">
              {article.stepByStepGuide.map(step => {
                const isDone = completedSteps.includes(step.step);
                return (
                  <div
                    key={step.step}
                    onClick={() => toggleStep(step.step)}
                    className={`cursor-pointer p-4 rounded-lg border transition-all ${
                      isDone 
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800' 
                        : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isDone 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                      }`}>
                        {isDone ? '✓' : step.step}
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${isDone ? 'line-through text-stone-500' : 'text-stone-900 dark:text-stone-100'}`}>
                          ধাপ {step.step}: {step.title}
                        </h4>
                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Article Content Blocks (65-75ch Reading Column) */}
        <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-stone-800 dark:text-stone-200 text-base leading-relaxed">
          {article.blocks.map((block, idx) => {
            // Mid-article ad slot after block 2
            const isMidArticle = idx === 2;

            return (
              <React.Fragment key={idx}>
                {block.type === 'paragraph' && (
                  <p className={idx === 0 ? "first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-emerald-700 dark:first-letter:text-emerald-400" : ""}>
                    {block.content}
                  </p>
                )}

                {block.type === 'heading' && (
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mt-8 mb-4 border-b border-stone-200/60 dark:border-stone-800/80 pb-2">
                    {block.content}
                  </h2>
                )}

                {block.type === 'subheading' && (
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-6 mb-3">
                    {block.content}
                  </h3>
                )}

                {block.type === 'callout' && (
                  <div className={`p-4 rounded-lg border my-4 ${
                    block.calloutType === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
                      : block.calloutType === 'tip'
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200'
                      : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{block.content}</p>
                  </div>
                )}

                {block.type === 'list' && block.items && (
                  <ul className="space-y-2 my-4 pl-5 list-disc text-sm sm:text-base">
                    {block.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {block.type === 'code' && block.content && (
                  <div className="my-6 rounded-lg overflow-hidden bg-stone-900 text-stone-100 border border-stone-800">
                    <div className="flex items-center justify-between px-4 py-2 bg-stone-950/80 text-xs font-mono text-stone-400">
                      <span>{block.language || 'code'}</span>
                      <button
                        onClick={() => handleCopyCode(block.content || '', idx)}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">কপি হয়েছে</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>কপি করুন</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed">
                      <code>{block.content}</code>
                    </pre>
                  </div>
                )}

                {block.type === 'table' && block.tableData && (
                  <div className="my-6 overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-lg">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200">
                        <tr>
                          {block.tableData.headers.map((h, i) => (
                            <th key={i} className="p-3 font-semibold border-b border-stone-200 dark:border-stone-700">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                        {block.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3 text-stone-700 dark:text-stone-300">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {isMidArticle && <AdSlot location="article_middle" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="my-10 p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                সাধারণ প্রশ্নোত্তর (FAQ)
              </h3>
            </div>
            <div className="space-y-3 pt-2">
              {article.faqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div
                    key={i}
                    className="border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      className="w-full text-left p-4 bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center justify-between font-semibold text-sm text-stone-900 dark:text-stone-100"
                    >
                      <span>{faq.question}</span>
                      <span className="text-xs text-stone-400 font-mono">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="p-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed bg-white dark:bg-stone-900">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Ad Slot */}
        <AdSlot location="article_bottom" />

        {/* Content Relationship Engine: Related Tools */}
        {relatedToolsList.length > 0 && (
          <div className="my-10 space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-emerald-600" />
              এই আর্টিকেলে ব্যবহৃত বা সম্পর্কিত ডিজিটাল টুলস
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedToolsList.map(tool => (
                <div
                  key={tool.id}
                  onClick={() => navigateTo(`/tool/${tool.id}`)}
                  className="cursor-pointer p-3.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-400 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="w-10 h-10 rounded-md object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">{tool.name}</h4>
                      <p className="text-xs text-stone-500">{tool.pricing} · {tool.category}</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">বিস্তারিত →</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Relationship Engine: Related Videos */}
        {relatedVideosList.length > 0 && (
          <div className="my-10 space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Video className="w-4 h-4 text-emerald-600" />
              সম্পর্কিত ভিডিও টিউটোরিয়াল
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedVideosList.map(vid => (
                <div
                  key={vid.id}
                  onClick={() => navigateTo(`/video/${vid.id}`)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 group hover:shadow-md transition-all"
                >
                  <div className="aspect-video relative overflow-hidden bg-stone-200 dark:bg-stone-800">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.titleBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono">
                      {vid.duration}
                    </span>
                  </div>
                  <div className="p-3">
                    <h5 className="text-xs font-semibold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 line-clamp-2">
                      {vid.titleBn}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticlesList.length > 0 && (
          <div className="my-12 pt-8 border-t border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              আরও পড়ুন এই বিষয়ে
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticlesList.map(art => (
                <div
                  key={art.id}
                  onClick={() => navigateTo(`/article/${art.slug}`)}
                  className="cursor-pointer group p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 transition-all space-y-2"
                >
                  <div className="aspect-video rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img
                      src={art.featuredImage}
                      alt={art.titleBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 line-clamp-2">
                    {art.titleBn}
                  </h4>
                  <p className="text-[11px] text-stone-400 font-mono">
                    {art.readingTimeMin} মিনিট পাঠ
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
