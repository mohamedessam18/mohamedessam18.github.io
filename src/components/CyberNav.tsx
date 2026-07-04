import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Cpu, Folder, GraduationCap, Sparkles, Mail, Menu, X } from 'lucide-react';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';

interface CyberNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  language: Language;
}

const navItems = [
  { id: 'home', icon: Home, gitTag: 'main:initial', color: 'text-cyan-400' },
  { id: 'about', icon: User, gitTag: 'feat/profile', color: 'text-emerald-400' },
  { id: 'skills', icon: Cpu, gitTag: 'feat/orbit-skills', color: 'text-purple-400' },
  { id: 'projects', icon: Folder, gitTag: 'feat/dev-lab', color: 'text-blue-400' },
  { id: 'education', icon: GraduationCap, gitTag: 'refactor/studies', color: 'text-indigo-400' },
  { id: 'help', icon: Sparkles, gitTag: 'feat/ssh-console', color: 'text-amber-400' },
  { id: 'contact', icon: Mail, gitTag: 'fix/contact', color: 'text-rose-400' },
];

const CyberNav = ({ activeSection, setActiveSection, language }: CyberNavProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleScroll = (id: string) => {
    setActiveSection(id);
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* ====================================================
          1. DESKTOP: Floating Vertical Git-Branch Navigator
          ==================================================== */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center select-none pointer-events-none">
        
        {/* Track Branch Line */}
        <div className="absolute top-4 bottom-4 w-[2px] border-r border-dashed dark:border-cyan-500/15 border-slate-300" />
        
        <div className="flex flex-col gap-6 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;

            return (
              <div key={item.id} className="flex items-center justify-end relative group pointer-events-auto">
                
                {/* Floating branch name tooltip / Git label */}
                <div 
                  className={`absolute right-9 px-3 py-1.5 rounded-xl border font-mono text-[9px] font-bold tracking-wider shadow-lg pointer-events-none whitespace-nowrap opacity-0 scale-90 translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-300 backdrop-blur-md
                    ${isActive 
                      ? 'dark:bg-cyan-950/70 dark:border-cyan-500/40 dark:text-cyan-400 bg-cyan-50/80 border-cyan-400 text-cyan-800' 
                      : 'dark:bg-black/85 dark:border-slate-800 dark:text-slate-400 bg-white/90 border-slate-200 text-slate-600'
                    }`}
                >
                  <span className="opacity-50 mr-1">$ git checkout</span>
                  <span className="font-bold">{item.gitTag}</span>
                </div>

                {/* Section title popout on hover */}
                <div className="absolute right-9 bottom-7 text-[8px] font-mono font-semibold uppercase tracking-widest text-slate-400 opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                  {getTranslation(language, `nav.${item.id}`) as string}
                </div>

                {/* Git Node */}
                <button
                  onClick={() => handleScroll(item.id)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 backdrop-blur-sm relative z-10
                    ${isActive 
                      ? 'dark:bg-cyan-500/10 dark:border-cyan-400 dark:text-cyan-400 dark:shadow-[0_0_12px_rgba(34,211,238,0.5)] bg-cyan-100 border-cyan-500 text-cyan-700 shadow-md scale-110' 
                      : 'dark:bg-black/50 dark:border-slate-800 dark:text-slate-500 bg-white/70 border-slate-200 text-slate-400 hover:border-cyan-500 dark:hover:border-cyan-500/40 dark:hover:text-cyan-400 hover:scale-105'
                    }`}
                  aria-label={`Scroll to ${item.id}`}
                >
                  <Icon size={12} className={isActive ? 'animate-pulse' : ''} />
                  
                  {/* Commits visual path connectors */}
                  {isActive && (
                    <span className="absolute -inset-1 rounded-full border border-cyan-500/30 animate-ping pointer-events-none" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ====================================================
          2. MOBILE: Floating Expandable Radial HUD Menu Wheel
          ==================================================== */}
      <div className="fixed bottom-6 right-6 z-[999] lg:hidden select-none pointer-events-none">
        
        {/* Fan-out Radial Icons Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <div className="absolute bottom-0 right-0 w-44 h-44 pointer-events-auto">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                // Position nodes semi-circularly (from 180deg to 270deg)
                const angle = 180 + (idx * (90 / (navItems.length - 1))); 
                const rad = (angle * Math.PI) / 180;
                const distance = 110; // radial menu radius in px
                
                const x = Math.cos(rad) * distance;
                const y = Math.sin(rad) * distance;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, x, y, scale: 1 }}
                    exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14, delay: idx * 0.03 }}
                    className={`absolute bottom-3 right-3 w-10 h-10 rounded-2xl flex flex-col items-center justify-center border shadow-lg backdrop-blur-md transition-all duration-300
                      ${isActive 
                        ? 'dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-400 bg-cyan-100 border-cyan-500 text-cyan-700' 
                        : 'dark:bg-black/80 dark:border-slate-800 dark:text-slate-400 bg-white border-slate-200 text-slate-500'
                      }`}
                    aria-label={`Scroll to ${item.id}`}
                  >
                    <Icon size={14} />
                    <span className="text-[7px] font-mono font-bold uppercase tracking-tight mt-0.5 max-w-[32px] truncate">
                      {getTranslation(language, `nav.${item.id}`) as string}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Primary Radial Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="relative pointer-events-auto w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xl transition-all duration-300 active:scale-95
            dark:bg-cyan-500/10 dark:border-cyan-400 dark:text-cyan-400 dark:shadow-cyan-500/20 dark:hover:bg-cyan-500/20
            bg-cyan-600 border-cyan-500 text-white shadow-cyan-500/10 hover:bg-cyan-700"
          aria-label="Toggle navigation wheel"
        >
          <motion.div
            animate={{ rotate: isMobileOpen ? 90 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex items-center justify-center"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>

          {/* Glowing outer animation */}
          <span className="absolute -inset-1 rounded-2xl border border-cyan-500/30 animate-pulse pointer-events-none" />
        </button>

      </div>
    </>
  );
};

export default CyberNav;
