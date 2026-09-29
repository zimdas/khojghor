import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminUser } from '../../types';
import { Shield, Plus, Edit3, X, Check, Lock } from 'lucide-react';

export const AdminUserAdmin: React.FC = () => {
  const { adminUsers, createAdminUser, updateAdminUser, adminLanguage } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AdminUser['role']>('editor');
  const [localUsers, setLocalUsers] = useState<AdminUser[]>(adminUsers || []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        if (data.adminUsers) setLocalUsers(data.adminUsers);
      }
    } catch {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    await createAdminUser({ name, email, password, role });
    setName('');
    setEmail('');
    setPassword('');
    setIsModalOpen(false);
    await fetchUsers();
  };

  const toggleStatus = async (user: AdminUser) => {
    const nextStatus = user.status === 'active' ? 'disabled' : 'active';
    await updateAdminUser(user.id, { status: nextStatus });
    await fetchUsers();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span>{adminLanguage === 'bn' ? 'অ্যাডমিন ইউজারস ও রোল পারমিশন' : 'Admin Users & Roles'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {adminLanguage === 'bn' ? 'সিস্টেম অ্যাডমিনিস্ট্রেটর, এডিটর ও মডারেটরদের ভূমিকা ও অ্যাক্সেস নিয়ন্ত্রণ করুন।' : 'Manage administrators, editors, roles, and granular CMS permissions.'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{adminLanguage === 'bn' ? 'নতুন অ্যাডমিন' : 'Add Admin'}</span>
        </button>
      </div>

      <div className="rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 font-semibold">
            <tr>
              <th className="p-3.5">নাম ও ইমেইল</th>
              <th className="p-3.5">রোল (Role)</th>
              <th className="p-3.5">স্ট্যাটাস</th>
              <th className="p-3.5 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {localUsers.map(user => (
              <tr key={user.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                <td className="p-3.5">
                  <p className="font-bold text-stone-900 dark:text-stone-100">{user.name}</p>
                  <p className="text-[11px] text-stone-400 font-mono">{user.email}</p>
                </td>
                <td className="p-3.5">
                  <span className="capitalize px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    {user.role}
                  </span>
                </td>
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                    user.status === 'active' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  <button
                    onClick={() => toggleStatus(user)}
                    className="px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 font-medium text-[11px]"
                  >
                    {user.status === 'active' ? (adminLanguage === 'bn' ? 'নিষ্ক্রিয় করুন' : 'Disable') : (adminLanguage === 'bn' ? 'সক্রিয় করুন' : 'Enable')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              {adminLanguage === 'bn' ? 'নতুন অ্যাডমিন ইউজার তৈরি' : 'Create Admin User'}
            </h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">নাম *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">ইমেইল *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">পাসওয়ার্ড *</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 dark:text-stone-300">ভূমিকা (Role)</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value as any)}
                  className="w-full p-2 rounded bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="author">Author</option>
                  <option value="moderator">Moderator</option>
                </select>
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
                  {adminLanguage === 'bn' ? 'অ্যাকাউন্ট তৈরি' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
