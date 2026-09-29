import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Users, UserCheck, Shield } from 'lucide-react';

export const UserAdmin: React.FC = () => {
  const { users, adminLanguage } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-600" />
          <span>{adminLanguage === 'bn' ? 'নিবন্ধিত পাঠক ও ইউজারস (Users)' : 'Registered Users'}</span>
        </h2>
        <p className="text-xs text-stone-500">
          {adminLanguage === 'bn' ? 'ওয়েবসাইটে নিবন্ধিত লেখক ও সাধারণ ব্যবহারকারীদের তালিকা।' : 'Directory of registered contributors and community members.'}
        </p>
      </div>

      <div className="rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 font-semibold">
            <tr>
              <th className="p-3.5">নাম ও ইমেইল</th>
              <th className="p-3.5">ভূমিকা (Role)</th>
              <th className="p-3.5">স্ট্যাটাস</th>
              <th className="p-3.5">যোগদানের তারিখ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                <td className="p-3.5">
                  <p className="font-bold text-stone-900 dark:text-stone-100">{u.name}</p>
                  <p className="text-[11px] text-stone-400 font-mono">{u.email}</p>
                </td>
                <td className="p-3.5">
                  <span className="capitalize px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[11px]">
                    {u.role}
                  </span>
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase">
                    {u.status}
                  </span>
                </td>
                <td className="p-3.5 text-stone-400 font-mono text-[11px]">
                  {u.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
