import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Youtube, 
  Facebook, 
  Send, 
  Twitter, 
  Instagram
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, settings, language, t } = useStore();

  const handleLink = (path: string) => {
    navigateTo(path);
  };

  return (
    <footer className="w-full bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                {language === 'bn' ? 'খ' : 'K'}
              </span>
              <span className="font-bold text-xl text-stone-900 dark:text-white">{t('brandName')}</span>
              {language === 'bn' && (
                <span className="text-xs font-mono text-stone-400 tracking-wider">KhojGhor</span>
              )}
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-sm">
              “{t('brandTagline')}” — {t('brandSubtext')}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {settings.socials.youtube && (
                <a
                  href={settings.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {settings.socials.telegram && (
                <a
                  href={settings.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                  aria-label="Telegram Community"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}
              {settings.socials.facebook && (
                <a
                  href={settings.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.socials.x && (
                <a
                  href={settings.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="pt-2 text-xs text-stone-400">
              <span className="font-semibold text-stone-600 dark:text-stone-300">{language === 'bn' ? 'ইমেইল: ' : 'Email: '}</span>
              <a href={`mailto:${settings.contactEmail}`} className="hover:underline">
                {settings.contactEmail}
              </a>
            </div>
          </div>

          {/* Column 2: Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              {t('footerAboutTitle')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleLink('/ai')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'এআই ও কৃত্রিম বুদ্ধিমত্তা' : 'Artificial Intelligence'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/tech')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'প্রযুক্তি ও টিপস' : 'Technology & Tips'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/earn')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'উপার্জন ও ফ্রিল্যান্সিং' : 'Earn & Freelancing'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/student')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'শিক্ষার্থী ও পড়াশোনা' : 'Student & Education'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/make-build')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'মেক ও বিল্ড প্রজেক্টস' : 'Make & Build Projects'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/trading')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'ট্রেডিং এডুকেশন' : 'Trading Education'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/it-news')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'আইটি ও টেক সংবাদ' : 'IT & Tech News'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Discovery (No Admin login link!) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              {t('footerResourcesTitle')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleLink('/tools')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'টুলস ডিরেক্টরি' : 'Tools Directory'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/videos')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'ভিডিও লাইব্রেরি' : 'Video Library'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/trends')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'ট্রেন্ডিং ও টেক সংবাদ' : 'Trending & Tech News'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/bookmarks')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'সংরক্ষিত আর্টিকেল' : 'Saved Bookmarks'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/page/sitemap')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'সাইটম্যাপ (Sitemap)' : 'Sitemap'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              {t('footerLegalTitle')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleLink('/page/about')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/page/contact')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/page/privacy')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/page/terms')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'শর্তাবলী' : 'Terms & Conditions'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/page/disclaimer')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'দায়মুক্তি (Disclaimer)' : 'Disclaimer'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/page/advertiser-disclosure')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'বিজ্ঞাপন প্রকাশনা' : 'Advertiser Disclosure'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/page/advertise-with-us')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-emerald-700 dark:text-emerald-400">
                  {language === 'bn' ? 'বিজ্ঞাপন দিন' : 'Advertise With Us'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Strip */}
        <div className="mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center md:text-left">
            {language === 'bn' ? settings.footerDisclaimerBn : (settings.footerDisclaimerEn || settings.footerDisclaimerBn)}
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <span>© {new Date().getFullYear()} KhojGhor. {t('footerRights')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
