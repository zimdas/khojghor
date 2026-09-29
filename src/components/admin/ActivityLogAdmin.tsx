import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ActivityLogItem } from '../../types';
import { History, ShieldCheck, Clock, RefreshCw } from 'lucide-react';

export const ActivityLogAdmin: React.FC = () => {
  const { adminLanguage } = useStore();
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLogs = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/activity-logs');
      if (res.ok) {
        const data = await res.json();
        if (data.logs) setLogs(data.logs);
      }
    } catch {} finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-600" />
            <span>{adminLanguage === 'bn' ? 'অডিট ও অ্যাক্টিভিটি লগস (Audit Trail)' : 'Activity Logs & Audit Trail'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? 'কে, কখন, কোন কন্টেন্ট বা সেটিং পরিবর্তন করেছেন তার অপরিবর্তনীয় অডিট রেকর্ড।' : 'Tamper-evident system log tracking admin modifications and timestamps.'}
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="p-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 hover:text-emerald-600 self-start sm:self-auto"
          title="Refresh Logs"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 font-semibold">
            <tr>
              <th className="p-3.5">টাইমস্ট্যাম্প (Dhaka Time)</th>
              <th className="p-3.5">অ্যাডমিন ইউজার</th>
              <th className="p-3.5">অ্যাকশন (Action)</th>
              <th className="p-3.5">টার্গেট ও বিবরণ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-mono text-[11px]">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                <td className="p-3.5 text-stone-500">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="p-3.5 text-stone-900 dark:text-stone-100 font-semibold">
                  {log.adminEmail}
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold uppercase text-[10px]">
                    {log.action}
                  </span>
                </td>
                <td className="p-3.5 text-stone-700 dark:text-stone-300 font-sans">
                  <strong>{log.target}</strong>
                  {log.details && <span className="text-stone-400 block text-[11px] font-mono mt-0.5">{log.details}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
