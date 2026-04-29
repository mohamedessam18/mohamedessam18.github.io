import { Sun, Moon, Github } from 'lucide-react';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import type { Theme } from '../hooks/useTheme';
import logoDark from '../assets/me logo.png';
import logoLight from '../assets/me-logo-light.png';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  language: Language;
  cycleLanguage: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Navbar = ({
  activeSection,
  setActiveSection,
  language,
  cycleLanguage,
  theme,
  toggleTheme,
}: NavbarProps) => {
  const navItems = ['home', 'about', 'skills', 'education', 'help', 'projects', 'contact'];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md border-t transition-colors duration-300
      dark:bg-black/80 dark:border-cyan-500/20 
      light:bg-white/85 light:border-slate-300/50 light:shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Logo - Left */}
          <button
            onClick={() => setActiveSection('home')}
            className="flex h-11 w-[92px] items-center justify-start rounded-md transition-all
              dark:hover:bg-cyan-500/10 light:hover:bg-cyan-50/70"
            aria-label="Go to home"
          >
            <img
              src={logoDark}
              alt="Mohamed Essam logo"
              className="hidden h-10 w-10 rounded-full object-cover dark:block"
            />
            <img
              src={logoLight}
              alt="Mohamed Essam logo"
              className="h-10 w-10 object-contain dark:hidden"
            />
          </button>

          {/* Navigation Links - Center */}
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-mono transition-all duration-300 ${
                  activeSection === item
                    ? 'dark:text-cyan-400 dark:bg-cyan-500/10 dark:border dark:border-cyan-500/30 light:text-cyan-700 light:bg-cyan-100/60 light:border light:border-cyan-400/40'
                    : 'dark:text-gray-400 dark:hover:text-cyan-300 dark:hover:bg-cyan-500/5 light:text-slate-600 light:hover:text-cyan-600 light:hover:bg-cyan-50/50'
                }`}
              >
                {getTranslation(language, `nav.${item}`) as string}
              </button>
            ))}
          </div>

          {/* Controls - Right */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* GitHub Link */}
            <a
              href="https://github.com/mohamedessam18"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md transition-all
                dark:text-gray-400 dark:hover:text-cyan-400 dark:hover:bg-cyan-500/10
                light:text-slate-500 light:hover:text-cyan-600 light:hover:bg-cyan-100/50"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md transition-all
                dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-yellow-500/10
                light:text-slate-500 light:hover:text-amber-500 light:hover:bg-amber-100/50"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Cycle Button */}
            <button
              onClick={cycleLanguage}
              className="px-3 py-1 rounded-md text-sm font-mono font-bold transition-all min-w-[40px]
                dark:text-cyan-400 dark:border dark:border-cyan-500/30 dark:hover:bg-cyan-500/10 dark:hover:border-cyan-500/50
                light:text-cyan-700 light:border light:border-cyan-400/40 light:bg-cyan-50/30 light:hover:bg-cyan-100/50 light:hover:border-cyan-400/60"
              aria-label="Change language"
            >
              {getTranslation(language, `language.${language}`) as string}
            </button>
          </div>
        </div>

        {/* Mobile Layout - Bottom Navigation Bar */}
        <div className="md:hidden">
          {/* Main Nav Items */}
          <div className="flex items-center gap-2 overflow-x-auto px-1 py-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`flex min-w-[64px] flex-col items-center gap-1 px-2 py-1 rounded-lg transition-all duration-300 ${
                  activeSection === item
                    ? 'dark:text-cyan-400 light:text-cyan-700'
                    : 'dark:text-gray-500 dark:hover:text-gray-300 light:text-slate-500 light:hover:text-slate-700'
                }`}
              >
                {/* Icon indicators for mobile */}
                <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activeSection === item 
                    ? 'dark:bg-cyan-400 light:bg-cyan-600 scale-125' 
                    : 'dark:bg-gray-600 light:bg-slate-400'
                }`} />
                <span className="text-[10px] font-mono uppercase tracking-wide">
                  {getTranslation(language, `nav.${item}`) as string}
                </span>
              </button>
            ))}
          </div>
          
          {/* Mobile Controls Row */}
          <div className="flex items-center justify-center gap-4 pb-2 pt-1 border-t dark:border-gray-800 light:border-slate-200/50">
            {/* GitHub */}
            <a
              href="https://github.com/mohamedessam18"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md transition-all
                dark:text-gray-500 dark:hover:text-cyan-400
                light:text-slate-500 light:hover:text-cyan-600"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md transition-all
                dark:text-gray-500 dark:hover:text-yellow-400
                light:text-slate-500 light:hover:text-amber-500"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* Language */}
            <button
              onClick={cycleLanguage}
              className="px-2 py-0.5 rounded text-xs font-mono font-bold transition-all
                dark:text-cyan-400 dark:border dark:border-cyan-500/30
                light:text-cyan-700 light:border light:border-cyan-400/40 light:bg-cyan-50/30"
              aria-label="Change language"
            >
              {getTranslation(language, `language.${language}`) as string}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
