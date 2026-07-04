import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Download, Github, Linkedin, Instagram, Send, Sun, Moon } from 'lucide-react';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import type { Theme } from '../hooks/useTheme';
import meImage from '../assets/me.png';

interface IdentitySidebarProps {
  language: Language;
  theme: Theme;
  toggleTheme: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  cycleLanguage: () => void;
}

const localTranslations = {
  en: {
    location: 'Cairo, Egypt',
    timezone: 'Egypt Time',
    localTime: 'Local Time',
    downloading: 'Downloading...',
    downloadPdf: 'Download PDF',
    formatInfo: 'PDF • 94 KB',
    connectTitle: 'Connect & Time',
    greeting: 'Hi, I am',
    name: 'Mohamed Essam',
    subtitle: 'Building interactive Flutter & Full-Stack solutions.'
  },
  ar: {
    location: 'القاهرة، مصر',
    timezone: 'توقيت مصر',
    localTime: 'الوقت الحالي',
    downloading: 'جاري التحميل...',
    downloadPdf: 'تحميل الملف PDF',
    formatInfo: 'ملف PDF • 94 كيلوبايت',
    connectTitle: 'التواصل والوقت',
    greeting: 'مرحباً، أنا',
    name: 'محمد عصام',
    subtitle: 'بناء حلول تفاعلية باستخدام Flutter وتطوير الويب المتكامل.'
  },
  es: {
    location: 'El Cairo, Egipto',
    timezone: 'Hora de Egipto',
    localTime: 'Hora Local',
    downloading: 'Descargando...',
    downloadPdf: 'Descargar PDF',
    formatInfo: 'PDF • 94 KB',
    connectTitle: 'Contacto y Hora',
    greeting: 'Hola, soy',
    name: 'Mohamed Essam',
    subtitle: 'Construyendo soluciones interactivas de Flutter y Full-Stack.'
  }
};

const IdentitySidebar = ({
  language,
  theme,
  toggleTheme,
  accentColor,
  setAccentColor,
  cycleLanguage
}: IdentitySidebarProps) => {
  const lt = localTranslations[language] || localTranslations['en'];

  // Live Egypt Clock
  const [cairoTime, setCairoTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      setCairoTime(new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [language]);

  // Typewriter Role Subtitle
  const roles = [
    language === 'ar' ? 'مطور تطبيقات فلاتر' : 'Flutter Developer',
    language === 'ar' ? 'طالب هندسة برمجيات' : 'Software Engineering Student',
    language === 'ar' ? 'مطور ويب متكامل' : 'Full-Stack Developer'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    setRoleIndex(0);
    setTypedText('');
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    let timer: any;
    const currentRoleText = roles[roleIndex];
    
    const handleType = () => {
      setTypedText((prev) => {
        if (isDeleting) {
          if (prev === '') {
            setIsDeleting(false);
            setRoleIndex((prevIdx) => (prevIdx + 1) % roles.length);
            setTypingSpeed(100);
            return '';
          }
          setTypingSpeed(45);
          return currentRoleText.substring(0, prev.length - 1);
        } else {
          if (prev === currentRoleText) {
            timer = setTimeout(() => setIsDeleting(true), 2500);
            return prev;
          }
          setTypingSpeed(90);
          return currentRoleText.substring(0, prev.length + 1);
        }
      });
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex, roles, typingSpeed]);

  // Mascot Custom Avatar Sync
  const [customAvatar, setCustomAvatar] = useState<string[] | null>(() => {
    const saved = localStorage.getItem('custom-avatar-pixels');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.grid) {
        setCustomAvatar(customEvent.detail.grid);
      }
    };
    window.addEventListener('avatar-synced', handleSync);
    return () => window.removeEventListener('avatar-synced', handleSync);
  }, []);

  // CV Tailored Download
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [customSkills, setCustomSkills] = useState({
    flutter: true,
    web: true,
    cpp: false,
    database: false,
  });

  const toggleCustomSkill = (skill: keyof typeof customSkills) => {
    setCustomSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
  };

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadProgress(0);
            const link = document.createElement('a');
            link.href = '/mohamed%20essam.pdf';

            const activeSkillsList = Object.entries(customSkills)
              .filter(([_, active]) => active)
              .map(([name]) => name)
              .join('_');
            const fileName = activeSkillsList 
              ? `Mohamed_Essam_CV_tailored_${activeSkillsList}.pdf` 
              : 'Mohamed_Essam_CV.pdf';

            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 80);
  };

  return (
    <div className="glass border dark:border-cyan-500/20 border-slate-300 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col gap-6 text-left rtl:text-right">
      {/* Glow background accent */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-cyan-500/15 to-green-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Profile Info Header */}
      <div className="flex flex-col items-center text-center gap-4 border-b dark:border-slate-800/60 border-slate-200 pb-5">
        <div className="relative">
          {/* Animated pulsing glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 blur-md opacity-20 dark:opacity-40 animate-pulse" />
          
          {customAvatar ? (
            /* CSS-painted synchronized pixel avatar mascot */
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 dark:border-cyan-500/50 border-cyan-500 bg-slate-950 p-1 flex flex-wrap shadow-lg shadow-cyan-500/15 select-none">
              <div className="grid grid-cols-8 gap-[1px] w-full h-full">
                {customAvatar.map((color, idx) => (
                  <div key={idx} style={{ backgroundColor: color }} className="rounded-[1px]" />
                ))}
              </div>
            </div>
          ) : (
            /* Default Profile Picture */
            <img
              src={meImage}
              alt={lt.name}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 dark:border-cyan-500/40 border-cyan-500/60 shadow-lg shadow-cyan-500/20"
            />
          )}
        </div>

        <div className="space-y-1">
          <p className="font-mono text-xs tracking-wider text-cyan-600 dark:text-cyan-400">
            {lt.greeting}
          </p>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-slate-800 dark:text-white">
            {lt.name}
          </h2>
          <div className="h-6 flex items-center justify-center font-mono text-[10px] sm:text-xs font-semibold text-emerald-700 dark:text-green-400 bg-slate-100 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 px-3 py-0.5 rounded-full">
            <span>{typedText}</span>
            <span className="animate-pulse border-r border-emerald-700 dark:border-green-400 ml-0.5">&nbsp;</span>
          </div>
        </div>
      </div>

      {/* Local Time Widget */}
      <div className="bg-cyan-500/5 dark:bg-cyan-500/10 border dark:border-cyan-500/10 border-slate-300/40 rounded-2xl p-4 flex justify-between items-center relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase">
            <Clock size={11} className="text-cyan-400" />
            <span>{lt.localTime}</span>
          </div>
          <span className="font-mono text-sm sm:text-base font-bold dark:text-cyan-400 text-slate-800 tabular-nums">
            {cairoTime || '09:41 AM'}
          </span>
        </div>
        <div className="text-right rtl:text-left z-10">
          <div className="flex items-center gap-1 text-[8px] text-gray-500 font-mono justify-end">
            <MapPin size={9} />
            <span>{lt.location}</span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 dark:text-gray-500 block mt-0.5">{lt.timezone}</span>
        </div>
      </div>

      {/* CV Download / Tailor Widget */}
      <div className="border dark:border-slate-800/80 border-slate-200/80 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xs font-bold tracking-widest text-slate-400 dark:text-gray-500 uppercase">
            {language === 'ar' ? 'تحميل السيرة الذاتية' : 'Resume'}
          </h3>
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="font-mono text-[9px] font-bold p-0.5 px-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 active:scale-95 transition-all"
          >
            {isCustomizing ? (language === 'ar' ? 'تم' : 'Done') : (language === 'ar' ? 'تخصيص' : 'Customize')}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isCustomizing ? (
            <motion.div
              key="customizing"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 text-[10px] text-slate-700 dark:text-gray-300 font-mono"
            >
              <p className="text-[8px] text-slate-500 dark:text-cyan-500/60 mb-1">
                {language === 'ar' ? 'اختر المهارات التي تود إبرازها:' : 'Filter CV skill highlights:'}
              </p>
              {([
                { key: 'flutter', label: 'Flutter & Mobile' },
                { key: 'web', label: 'Web Development' },
                { key: 'cpp', label: 'C++ Systems' },
                { key: 'database', label: 'SQL & Database' },
              ] as const).map((item) => (
                <label key={item.key} className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={customSkills[item.key]}
                    onChange={() => toggleCustomSkill(item.key)}
                    className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/30 w-3.5 h-3.5"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="static"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed"
            >
              <p className="text-[11px] mb-2">
                {language === 'ar'
                  ? 'سيرة ذاتية تفاعلية وقابلة للتخصيص حسب متطلبات شركتك.'
                  : 'Tailored resume customizer fits requirements on-the-fly.'}
              </p>
              {Object.values(customSkills).some(v => !v) && (
                <div className="p-2 rounded-xl bg-slate-950/30 border border-slate-800/40 font-mono text-[8px] text-slate-400">
                  <span className="font-bold text-cyan-400 block mb-0.5">✓ {language === 'ar' ? 'السيرة المخصصة تشمل:' : 'Tailored CV highlights:'}</span>
                  {customSkills.flutter && '• Flutter '}
                  {customSkills.web && '• Web Dev '}
                  {customSkills.cpp && '• C++ OOP '}
                  {customSkills.database && '• SQL '}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          {isDownloading && (
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-green-500 z-20" style={{ width: `${downloadProgress}%` }} />
          )}
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed dark:border-cyan-500/40 border-slate-300 hover:border-cyan-500 dark:hover:border-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all duration-300"
          >
            <Download size={13} className={isDownloading ? 'animate-bounce text-cyan-400' : 'text-slate-400'} />
            <div className="text-left rtl:text-right">
              <span className="font-mono text-[10px] font-bold text-cyan-700 dark:text-cyan-400 block leading-tight">
                {isDownloading ? lt.downloading : lt.downloadPdf}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Social Links List */}
      <div className="flex justify-between items-center gap-2 pt-2 border-t dark:border-slate-800/60 border-slate-200">
        <span className="text-[10px] font-mono text-gray-500">{language === 'ar' ? 'الشبكات:' : 'Socials:'}</span>
        <div className="flex gap-2">
          {[
            { id: 'github', href: 'https://github.com/mohamedessam18', icon: Github, label: 'GitHub' },
            { id: 'linkedin', href: 'https://www.linkedin.com/in/mohammedessam2', icon: Linkedin, label: 'LinkedIn' },
            { id: 'telegram', href: 'https://t.me/mohvmedesam20', icon: Send, label: 'Telegram', rotate: '-20deg' },
            { id: 'instagram', href: 'https://www.instagram.com/mohvmedesam20', icon: Instagram, label: 'Instagram' },
          ].map((soc) => {
            const Icon = soc.icon;
            return (
              <a
                key={soc.id}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center h-8 w-8 rounded-xl border dark:border-gray-800 border-slate-200 bg-white/40 dark:bg-black/20 hover:bg-cyan-500/10 hover:border-cyan-500 dark:hover:border-cyan-500/30 transition-all duration-300 hover:scale-105"
                aria-label={soc.label}
              >
                <Icon size={14} style={{ transform: soc.rotate ? `rotate(${soc.rotate})` : '' }} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Sleek Customization Control Dashboard */}
      <div className="flex flex-col gap-3 pt-3 border-t dark:border-slate-800/60 border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-gray-500">{language === 'ar' ? 'التخصيص:' : 'Theme & Accent:'}</span>
          
          {/* Accent Color picker */}
          <div className="flex items-center gap-1.5">
            {[
              { id: 'cyan', bg: 'bg-cyan-500' },
              { id: 'emerald', bg: 'bg-emerald-500' },
              { id: 'amethyst', bg: 'bg-purple-500' },
              { id: 'amber', bg: 'bg-amber-500' },
            ].map((c) => (
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
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Language Switcher */}
          <button
            onClick={cycleLanguage}
            className="flex-1 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all
              dark:text-cyan-400 dark:border dark:border-cyan-500/30 dark:hover:bg-cyan-500/10 dark:hover:border-cyan-500/50
              text-cyan-700 border border-cyan-400/40 bg-cyan-50/30 hover:bg-cyan-100/50 hover:border-cyan-400/60"
            aria-label="Change language"
          >
            {getTranslation(language, `language.${language}`) as string}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl transition-all border dark:border-slate-800 border-slate-200
              dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-yellow-500/10
              text-slate-500 hover:text-amber-500 hover:bg-amber-100/50"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentitySidebar;
