import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Download, Trash2, Search, CheckCircle2 } from 'lucide-react';

export const NewsletterAdmin: React.FC = () => {
  const { subscribers, adminLanguage } = useStore();
  const [search, setSearch] = useState('');

  const filtered = subscribers.filter(s => !search || s.email.toLowerCase().includes(search.toLowerCase()));

  const handleExportCsv = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + ['Email,SubscribedAt,Status', ...subscribers.map(s => `${s.email},${s.subscribedAt},${s.status}`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `khojghor_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-600" />
            <span>{adminLanguage === 'bn' ? 'নিউজলেটার গ্রাহক তালিকা' : 'Newsletter Subscribers'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? 'মোট নিবন্ধিত পাঠক তালিকা ও ইমেইল এক্সপোর্ট।' : 'Manage subscribers and export audience lists.'}
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>{adminLanguage === 'bn' ? 'CSV এক্সপোর্ট' : 'Export CSV'}</span>
        </button>
      </div>

      <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center gap-3">
        <Search className="w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={adminLanguage === 'bn' ? 'ইমেইল দিয়ে খুঁজুন...' : 'Search subscriber email...'}
          className="w-full text-xs bg-transparent focus:outline-none text-stone-900 dark:text-stone-100"
        />
      </div>

      <div className="rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 font-semibold">
            <tr>
              <th className="p-3.5">ইমেইল ঠিকানা</th>
              <th className="p-3.5">সাবস্ক্রিপশনের তারিখ</th>
              <th className="p-3.5">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {filtered.map(sub => (
              <tr key={sub.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                <td className="p-3.5 font-mono text-stone-900 dark:text-stone-100">
                  {sub.email}
                </td>
                <td className="p-3.5 font-mono text-stone-500 text-[11px]">
                  {sub.subscribedAt}
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold uppercase text-[10px]">
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
