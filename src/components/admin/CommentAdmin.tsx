import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CommentItem } from '../../types';
import { MessageSquare, Check, AlertOctagon, Trash2, Filter } from 'lucide-react';

export const CommentAdmin: React.FC = () => {
  const { comments, updateCommentStatus, adminLanguage } = useStore();
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'spam'>('all');

  const filteredComments = comments.filter(c => filter === 'all' || c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <span>{adminLanguage === 'bn' ? 'পাঠক মন্তব্য ব্যবস্থাপনা (Comments)' : 'Comments Management'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? 'আর্টিকেলের মন্তব্য অনুমোদন, স্প্যাম চিহ্নিতকরণ ও মডারেশন করুন।' : 'Moderate, approve, mark spam, or delete reader comments.'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 dark:bg-stone-800 rounded-lg text-xs">
          {(['all', 'approved', 'pending', 'spam'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1 rounded-md capitalize font-medium transition-colors ${
                filter === st
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {filteredComments.length === 0 ? (
        <div className="py-16 text-center text-stone-400 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <MessageSquare className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-700 mb-2" />
          <p className="text-sm font-semibold">{adminLanguage === 'bn' ? 'কোনো মন্তব্য পাওয়া যায়নি।' : 'No comments found.'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredComments.map(com => (
            <div
              key={com.id}
              className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-stone-900 dark:text-stone-100">{com.authorName}</span>
                  <span className="text-stone-400">({com.authorEmail})</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-stone-500 font-mono text-[11px]">{new Date(com.createdAt).toLocaleDateString()}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase font-mono ${
                  com.status === 'approved' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                  com.status === 'spam' ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400' :
                  'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                }`}>
                  {com.status}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
                "{com.content}"
              </p>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-stone-400 text-[11px]">
                  Article: <strong className="text-stone-600 dark:text-stone-300">{com.articleTitle}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {com.status !== 'approved' && (
                    <button
                      onClick={() => updateCommentStatus(com.id, 'approved')}
                      className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{adminLanguage === 'bn' ? 'অনুমোদন' : 'Approve'}</span>
                    </button>
                  )}
                  {com.status !== 'spam' && (
                    <button
                      onClick={() => updateCommentStatus(com.id, 'spam')}
                      className="px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1"
                    >
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>Spam</span>
                    </button>
                  )}
                  <button
                    onClick={() => updateCommentStatus(com.id, 'trash')}
                    className="p-1 rounded text-stone-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
