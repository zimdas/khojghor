import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, Mail, ArrowLeft, AlertCircle, Languages } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { adminLogin, navigateTo, adminLanguage, setAdminLanguage } = useStore();
  const [email, setEmail] = useState('admin@khojghor.com');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const res = await adminLogin(email, password);
    setIsLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || (adminLanguage === 'bn' ? 'ভুল ইমেইল বা পাসওয়ার্ড। আবার চেষ্টা করুন।' : 'Invalid credentials.'));
    }
  };

  const toggleAdminLang = () => {
    setAdminLanguage(adminLanguage === 'bn' ? 'en' : 'bn');
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl p-8 space-y-6">
        
        {/* Top Language Switcher */}
        <div className="flex justify-end">
          <button
            onClick={toggleAdminLang}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-600" />
            <span>{adminLanguage === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>
        </div>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
            {adminLanguage === 'bn' ? 'খ' : 'K'}
          </div>
          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {adminLanguage === 'bn' ? 'খোঁজঘর অ্যাডমিন পোর্টাল' : 'KhojGhor Central Admin Portal'}
          </h1>
          <p className="text-xs text-stone-500 font-mono">
            Protected CMS Access & Production Authorization
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              {adminLanguage === 'bn' ? 'অ্যাডমিন ইমেইল' : 'Admin Email'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@khojghor.com"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              {adminLanguage === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="text-[11px] text-stone-400 flex justify-between pt-1">
              <span>Demo: <code className="text-emerald-600 font-mono">admin123</code></span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50"
          >
            {isLoading ? (adminLanguage === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Authenticating...') : (adminLanguage === 'bn' ? 'নিরাপদ লগইন' : 'Secure Sign In')}
          </button>
        </form>

        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{adminLanguage === 'bn' ? 'মূল ওয়েবসাইটে ফিরে যান' : 'Back to Public Website'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
