import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench, GitBranch, Sparkles } from 'lucide-react';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import BubblesBackground from '../components/BubblesBackground';
import TiltCard from '../components/TiltCard';

interface HomeProps {
  language: Language;
  setActiveSection: (section: string) => void;
}

const Home = ({ language, setActiveSection }: HomeProps) => {
  const t = (key: string) => getTranslation(language, key) as string;
  const isAr = language === 'ar';

  const techTags = [
    { name: 'Flutter', color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    { name: 'Dart', color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { name: 'C++', color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { name: 'React', color: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20' },
    { name: 'SQLite', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { name: 'Firebase', color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { name: 'Git', color: 'text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 85, damping: 16 } 
    }
  } as const;

  const [hoveredCommitIdx, setHoveredCommitIdx] = useState<number | null>(null);

  const totalBlocks = 24 * 7;
  const mockCommits = Array.from({ length: totalBlocks }, (_, i) => {
    const level = (i * 7 + i * i * 3) % 5;
    
    const funnyMessagesEn = [
      "Wrote a clean function, then woke up.",
      "Refactored Dart codebase at 3 AM.",
      "Drank 3 cups of coffee, wrote 2 lines of code.",
      "Fixed alignment bug in CSS after 6 hours.",
      "Copied solution from StackOverflow without knowing how it works.",
      "Added comment: 'Don't touch this, it works by miracle'.",
      "Pushed git commit -m 'fixed things'.",
      "Saved 2KB of bundle size by removing unused imports.",
      "Regex code works on first try! (suspicious)",
      "Created database table, dropped it by mistake.",
    ];

    const funnyMessagesAr = [
      "كتبت كوداً نظيفاً بالكامل، ثم استيقظت من النوم.",
      "عدلت كود Dart بأكمله الساعة 3 فجراً.",
      "شربت 3 أكواب قهوة وكتبت سطرين كود فقط.",
      "أصلحت مشكلة محاذاة في CSS بعد 6 ساعات محاولات.",
      "نسخت حلاً من StackOverflow ولا أعلم كيف يعمل.",
      "أضفت تعليقاً: 'لا تلمس هذا، إنه يعمل بمعجزة'.",
      "رفعت تعديل Git برسالة 'fixed things'.",
      "وفرت 2 كيلوبايت من حجم الملف بعد مسح مكتبات غير مستخدمة.",
      "كود الـ Regex اشتغل من أول محاولة! (أمر مريب)",
      "أنشأت جدول قاعدة البيانات، وحذفته بالخطأ.",
    ];

    const msgIdx = (i * 3 + 13) % funnyMessagesEn.length;
    return {
      level,
      message: language === 'ar' ? funnyMessagesAr[msgIdx] : funnyMessagesEn[msgIdx],
    };
  });

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative w-full text-left rtl:text-right">
      {/* Animated Bubbles Background */}
      <BubblesBackground />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full flex flex-col gap-6"
      >
        {/* Welcome Intro Card */}
        <motion.div variants={cardVariants} className="w-full">
          <TiltCard className="w-full rounded-3xl" maxRotation={3}>
            <div className="glass border border-white/20 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-green-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <Sparkles size={16} className="animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest">{isAr ? 'مطور برمجيات مبدع' : 'Creative Developer'}</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-mono font-bold dark:text-white text-slate-800 leading-tight">
                  {isAr 
                    ? 'أهلاً بك في فضاء أعمالي الرقمي' 
                    : 'Welcome to My Digital Workspace'}
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                  {t('hero.subtitle') || 'Flutter Developer & Full-Stack engineering student building optimized products.'}
                </p>
              </div>

              {/* Core stack row */}
              <div className="mt-6 pt-5 border-t dark:border-slate-800/60 border-slate-200">
                <h4 className="font-mono text-[10px] font-bold tracking-widest text-slate-400 dark:text-gray-500 uppercase mb-3">
                  {isAr ? 'التقنيات الأساسية' : 'Core Technologies'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techTags.map((tag) => (
                    <span
                      key={tag.name}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-semibold border ${tag.color} shadow-sm`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all duration-300 w-full sm:w-auto justify-center
                    bg-cyan-600/10 border border-cyan-500/40 text-cyan-700 hover:bg-cyan-600/15 hover:border-cyan-500/60 hover:shadow-md
                    dark:bg-cyan-500/10 dark:border dark:border-cyan-500/50 dark:text-cyan-400 dark:hover:bg-cyan-500/20 dark:hover:border-cyan-400 dark:hover:shadow-lg dark:hover:shadow-cyan-500/20"
                >
                  {t('hero.ctaProjects') || 'View Projects'}
                  <ArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover/btn:-translate-x-1"
                  />
                </button>
                <button
                  onClick={() => scrollToSection('help')}
                  className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all duration-300 w-full sm:w-auto justify-center
                    bg-emerald-600/10 border border-emerald-500/40 text-emerald-700 hover:bg-emerald-600/15 hover:border-emerald-500/60 hover:shadow-md
                    dark:bg-green-500/10 dark:border dark:border-green-500/50 dark:text-green-400 dark:hover:bg-green-500/20 dark:hover:border-green-400 dark:hover:shadow-lg dark:hover:shadow-green-500/20"
                >
                  {t('hero.ctaHelp') || 'Open Sandbox'}
                  <Wrench
                    size={14}
                    className="group-hover/btn:rotate-12 transition-transform"
                  />
                </button>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Interactive Mock GitHub Calendar Card */}
        <motion.div variants={cardVariants} className="w-full">
          <TiltCard className="w-full rounded-3xl" maxRotation={3}>
            <div className="glass border border-white/20 dark:border-white/10 p-6 shadow-xl relative overflow-hidden group">
              <div className="flex items-center gap-2 mb-4">
                <GitBranch className="text-cyan-600 dark:text-cyan-400" size={20} />
                <h4 className="font-mono text-xs sm:text-sm font-bold tracking-widest text-slate-400 dark:text-gray-500 uppercase">
                  {isAr ? 'سجل المساهمات التفاعلي' : 'Interactive Commit Activity Log'}
                </h4>
              </div>

              <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                {isAr
                  ? 'مخطط تفاعلي لمساهماتي البرمجية الأخيرة مع مفكرات يومية طريفة أثناء التطوير.'
                  : 'Hover over the grid nodes below to read Mohamed\'s coding diary entries.'}
              </p>

              {/* Grid Container */}
              <div className="flex flex-col gap-4">
                <div className="w-full overflow-x-auto pb-2 scrollable-container select-none">
                  <div 
                    className="grid grid-flow-col gap-[3px]"
                    style={{ 
                      gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
                      gridTemplateColumns: 'repeat(24, minmax(0, 1fr))',
                      width: 'fit-content',
                      margin: '0 auto'
                    }}
                  >
                    {mockCommits.map((commit, idx) => {
                      const bgStyle = 
                        commit.level === 0 
                          ? {} 
                          : { backgroundColor: `rgba(var(--color-primary), ${commit.level * 0.25})` };

                      const levelClass = 
                        commit.level === 0 
                          ? 'bg-slate-100 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/40' 
                          : 'border border-cyan-500/20';

                      return (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredCommitIdx(idx)}
                          onMouseLeave={() => setHoveredCommitIdx(null)}
                          className={`w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-[2px] transition-all duration-200 cursor-pointer hover:scale-125 hover:shadow-[0_0_6px_rgba(var(--color-primary),0.8)] ${levelClass}`}
                          style={bgStyle}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Commits log message display */}
                <div className="min-h-[38px] p-2 px-3 rounded-xl dark:bg-black/40 bg-slate-100/50 border dark:border-gray-800 border-slate-200/60 font-mono text-[10px] sm:text-xs text-slate-500 dark:text-cyan-400/90 flex items-center justify-center text-center">
                  {hoveredCommitIdx !== null ? (
                    <span className="animate-fade-in">{mockCommits[hoveredCommitIdx].message}</span>
                  ) : (
                    <span className="text-slate-400 italic">
                      {isAr ? 'ضع مؤشر الماوس فوق المربعات لقراءة سجل اليوميات...' : 'Hover over nodes to inspect coding events...'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
