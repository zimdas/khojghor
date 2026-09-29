import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Bookmark, 
  ChevronDown,
  Languages
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    navigateTo, 
    routeInfo, 
    setIsSearchModalOpen,
    bookmarks,
    language,
    setLanguage,
    t
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const mainNavItems = [
    { label: t('navHome'), path: '/' },
    { label: t('navAi'), path: '/ai' },
    { label: t('navTech'), path: '/tech' },
    { label: t('navEarn'), path: '/earn' },
    { label: t('navStudent'), path: '/student' },
    { label: t('navMakeBuild'), path: '/make-build' },
    { label: t('navVideos'), path: '/videos' },
    { label: t('navTools'), path: '/tools' },
  ];

  const secondaryNavItems = [
    { label: t('navTrading'), path: '/trading' },
    { label: t('navTrends'), path: '/trends' },
    { label: t('navItNews'), path: '/it-news' },
    { label: t('navBookmarks'), path: '/bookmarks' },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    setIsMoreDropdownOpen(false);
    navigateTo(path);
  };

  const toggleLang = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Zone 1: Single text element wordmark */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleNavClick('/')}
                className="group text-left focus:outline-none flex items-center gap-2"
                aria-label="KhojGhor Homepage"
              >
                <span className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {language === 'bn' ? 'খ' : 'K'}
                </span>
                <span className="font-bold text-xl tracking-tight text-stone-900 dark:text-white flex items-center gap-1.5">
                  <span>{t('brandName')}</span>
                  {language === 'bn' && (
                    <span className="text-xs font-medium text-stone-500 dark:text-stone-400 font-mono tracking-normal">KhojGhor</span>
                  )}
                </span>
              </button>
            </div>

            {/* Zone 2: 4-6 primary nav links + more dropdown (No Admin link exposed!) */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
              {mainNavItems.map(item => {
                const isActive = item.path === '/' 
                  ? routeInfo.path === '/' 
                  : routeInfo.path.startsWith(item.path);

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`relative py-1 whitespace-nowrap transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
                      isActive 
                        ? 'text-emerald-600 dark:text-emerald-400 font-semibold' 
                        : ''
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                    )}
                  </button>
                );
              })}

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                  className="flex items-center gap-1 py-1 hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  <span>{t('navMore')}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isMoreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-900 rounded-lg shadow-lg border border-stone-200 dark:border-stone-800 py-1.5 z-50">
                    {secondaryNavItems.map(item => (
                      <button
                        key={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className="w-full text-left px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Zone 3: 1-2 primary actions (Search, Language Switcher, Theme Toggle) */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Language Switcher */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-md transition-colors"
                title="ভাষা পরিবর্তন (Switch Language)"
                aria-label="Switch Language"
              >
                <Languages className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
              </button>

              {/* Search trigger */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-700/80 rounded-md transition-colors"
                title={t('navSearch')}
                aria-label="Search KhojGhor"
              >
                <Search className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                <span className="hidden sm:inline">{t('navSearch')}</span>
                <kbd className="hidden sm:inline px-1 py-0.5 text-[10px] font-mono bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded text-stone-400">
                  Ctrl+K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Bookmarks Counter */}
              {bookmarks.length > 0 && (
                <button
                  onClick={() => handleNavClick('/bookmarks')}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs text-stone-600 dark:text-stone-300 hover:text-emerald-600 rounded-md transition-colors"
                  title="Saved Bookmarks"
                >
                  <Bookmark className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                  <span className="font-mono text-xs">{bookmarks.length}</span>
                </button>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors"
                aria-label="Open navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Strictly no admin login link exposed!) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="w-full max-h-[85vh] bg-white dark:bg-stone-900 rounded-t-2xl p-6 overflow-y-auto border-t border-stone-200 dark:border-stone-800 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  {language === 'bn' ? 'খ' : 'K'}
                </span>
                <span className="font-bold text-lg text-stone-900 dark:text-white">{t('brandName')}</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 mb-6">
              {mainNavItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="w-full text-left px-3 py-2 text-base font-medium rounded-lg text-stone-800 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-between transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-stone-400 font-mono">→</span>
                </button>
              ))}

              {secondaryNavItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="w-full text-left px-3 py-2 text-base font-medium rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-between transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-stone-400 font-mono">→</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <button
                onClick={toggleLang}
                className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 py-1 px-3 bg-stone-100 dark:bg-stone-800 rounded-md"
              >
                <Languages className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'bn' ? 'English Version' : 'বাংলা সংস্করণ'}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="text-xs text-stone-500 flex items-center gap-1.5 py-1 px-3 bg-stone-100 dark:bg-stone-800 rounded-md"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
