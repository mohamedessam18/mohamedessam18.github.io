import { Sun, Moon, Github, Home, User, Cpu, GraduationCap, Sparkles, Folder, Mail } from 'lucide-react';
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
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const iconMap: Record<string, any> = {
  home: Home,
  about: User,
  skills: Cpu,
  education: GraduationCap,
  help: Sparkles,
  projects: Folder,
  contact: Mail,
};

const colors = [
  { id: 'cyan', bg: 'bg-cyan-500' },
  { id: 'emerald', bg: 'bg-emerald-500' },
  { id: 'amethyst', bg: 'bg-purple-500' },
  { id: 'amber', bg: 'bg-amber-500' },
];

const Navbar = ({
  activeSection,
  setActiveSection,
  language,
  cycleLanguage,
  theme,
  toggleTheme,
  accentColor,
  setAccentColor,
}: NavbarProps) => {
  const navItems = ['home', 'about', 'skills', 'education', 'help', 'projects', 'contact'];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md border-t transition-colors duration-300
      dark:bg-black/80 dark:border-cyan-500/20 
      bg-white/85 border-slate-300/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Logo - Left */}
          <button
            onClick={() => {
              setActiveSection('home');
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex h-11 w-[92px] items-center justify-start rounded-md transition-all
              dark:hover:bg-cyan-500/10 hover:bg-cyan-50/70"
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
                onClick={() => {
                  setActiveSection(item);
                  document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-mono transition-all duration-300 ${
                  activeSection === item
                    ? 'dark:text-cyan-400 dark:bg-cyan-500/10 dark:border dark:border-cyan-500/30 text-cyan-700 bg-cyan-100/60 border border-cyan-400/40'
                    : 'dark:text-gray-400 dark:hover:text-cyan-300 dark:hover:bg-cyan-500/5 text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50'
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
                text-slate-500 hover:text-cyan-600 hover:bg-cyan-100/50"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>

            {/* Color Accent Picker */}
            <div className="flex items-center gap-1.5 px-3 border-r border-l dark:border-gray-800 border-slate-200">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setAccentColor(c.id)}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${c.bg} ${
                    accentColor === c.id 
                      ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-black ring-slate-400 dark:ring-white scale-110' 
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  aria-label={`Set ${c.id} accent color`}
                />
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md transition-all
                dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-yellow-500/10
                text-slate-500 hover:text-amber-500 hover:bg-amber-100/50"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Cycle Button */}
            <button
              onClick={cycleLanguage}
              className="px-3 py-1 rounded-md text-sm font-mono font-bold transition-all min-w-[40px]
                dark:text-cyan-400 dark:border dark:border-cyan-500/30 dark:hover:bg-cyan-500/10 dark:hover:border-cyan-500/50
                text-cyan-700 border border-cyan-400/40 bg-cyan-50/30 hover:bg-cyan-100/50 hover:border-cyan-400/60"
              aria-label="Change language"
            >
              {getTranslation(language, `language.${language}`) as string}
            </button>
          </div>
        </div>

        {/* Mobile Layout - Upgraded Premium App Tab Bar */}
        <div className="md:hidden flex flex-col pt-1.5 pb-2">
          {/* Main Grid Navigation (No scroll needed) */}
          <div className="grid grid-cols-7 gap-1 w-full px-1">
            {navItems.map((item) => {
              const Icon = iconMap[item];
              const isActive = activeSection === item;
              return (
                <button
                  key={item}
                  onClick={() => {
                    setActiveSection(item);
                    document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all duration-300 relative ${
                    isActive
                      ? 'text-cyan-700 bg-cyan-100/40 dark:text-cyan-400 dark:bg-cyan-500/10'
                      : 'text-slate-500 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon size={18} className="mb-0.5" />
                  <span className="text-[8px] font-mono font-bold uppercase tracking-tight truncate max-w-[50px]">
                    {getTranslation(language, `nav.${item}`) as string}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 w-1 h-1 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Mobile Utility Controls */}
          <div className="flex items-center justify-center gap-6 mt-1.5 pt-1.5 border-t dark:border-gray-800/40 border-slate-200/50">
            {/* GitHub */}
            <a
              href="https://github.com/mohamedessam18"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-slate-500 dark:text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            
            {/* Color Accent Picker */}
            <div className="flex items-center gap-1 bg-slate-900/10 dark:bg-black/20 px-2 py-0.5 rounded-full border dark:border-gray-800/40 border-slate-200">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setAccentColor(c.id)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${c.bg} ${
                    accentColor === c.id 
                      ? 'ring-1 ring-offset-1 ring-offset-white dark:ring-offset-black ring-slate-400 dark:ring-white scale-110' 
                      : 'opacity-70'
                  }`}
                  aria-label={`Set ${c.id} accent color`}
                />
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 text-slate-500 dark:text-gray-500 hover:text-amber-500 dark:hover:text-yellow-400 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            
            {/* Language */}
            <button
              onClick={cycleLanguage}
              className="px-2 py-0.5 rounded text-[10px] font-mono font-black transition-all
                text-cyan-700 border border-cyan-400/40 bg-cyan-50/30
                dark:text-cyan-400 dark:border dark:border-cyan-500/30 dark:hover:bg-cyan-500/10"
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
