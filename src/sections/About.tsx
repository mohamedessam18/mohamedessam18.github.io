import { motion } from 'framer-motion';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import { Code2, Terminal, Users, Lightbulb } from 'lucide-react';
import GitGraph from '../components/GitGraph';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
} as const;

interface AboutProps {
  language: Language;
}

const About = ({ language }: AboutProps) => {
  const t = (key: string) => getTranslation(language, key);

  const highlights = [
    {
      icon: Code2,
      title: (t('about.highlights') as any)[0].title,
      description: (t('about.highlights') as any)[0].description,
    },
    {
      icon: Terminal,
      title: (t('about.highlights') as any)[1].title,
      description: (t('about.highlights') as any)[1].description,
    },
    {
      icon: Users,
      title: (t('about.highlights') as any)[2].title,
      description: (t('about.highlights') as any)[2].description,
    },
    {
      icon: Lightbulb,
      title: (t('about.highlights') as any)[3].title,
      description: (t('about.highlights') as any)[3].description,
    },
  ];

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Section Title */}
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-mono font-bold mb-8 text-center
          dark:text-white text-slate-800">
          <span className="dark:text-cyan-400 text-cyan-600">&lt;</span>
          {t('about.title') as string}
          <span className="dark:text-cyan-400 text-cyan-600">/&gt;</span>
        </motion.h2>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="space-y-6 leading-relaxed
          dark:text-gray-300 text-slate-700">
          <p className="text-lg">{t('about.paragraph1') as string}</p>
          <p className="text-lg">{t('about.paragraph2') as string}</p>
          <p className="text-lg">{t('about.paragraph3') as string}</p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div variants={itemVariants} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg transition-all duration-300 group
                dark:bg-cyan-500/5 dark:border dark:border-cyan-500/20 dark:hover:border-cyan-500/40 dark:hover:bg-cyan-500/10
                bg-cyan-50/50 border border-cyan-200/40 hover:border-cyan-300/60 hover:bg-cyan-50/80"
            >
              <item.icon
                size={24}
                className="mb-3 transition-transform group-hover:scale-110
                  dark:text-cyan-400 text-cyan-600"
              />
              <h3 className="font-mono text-sm font-bold mb-1
                dark:text-white text-slate-800">
                {item.title}
              </h3>
              <p className="text-xs dark:text-gray-500 text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { key: 'projects', val: (t('about.stats.projectsVal') as string), lbl: (t('about.stats.projectsLbl') as string) },
            { key: 'languages', val: (t('about.stats.languagesVal') as string), lbl: (t('about.stats.languagesLbl') as string) },
            { key: 'experience', val: (t('about.stats.experienceVal') as string), lbl: (t('about.stats.experienceLbl') as string) },
            { key: 'courses', val: (t('about.stats.coursesVal') as string), lbl: (t('about.stats.coursesLbl') as string) },
          ].map((stat) => (
            <div
              key={stat.key}
              className="p-6 rounded-2xl border text-center transition-all duration-300 hover:scale-[1.03] shadow-md
                dark:bg-gray-900/40 dark:border-gray-800 dark:hover:border-cyan-500/30
                bg-white/40 border-slate-200/50 hover:border-cyan-500/20"
            >
              <div className="text-3xl font-mono font-black mb-2 bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-green-400 bg-clip-text text-transparent">
                {stat.val}
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                {stat.lbl}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Interactive Git Career Graph */}
        <motion.div variants={itemVariants} className="mt-12">
          <GitGraph language={language} />
        </motion.div>

        {/* Closing Statement */}
        <motion.div variants={itemVariants} className="mt-12 p-6 rounded-lg border
          dark:bg-gradient-to-r dark:from-cyan-500/10 dark:to-green-500/10 dark:border-cyan-500/30
          bg-gradient-to-r from-cyan-100/50 to-emerald-100/50 border-cyan-300/40">
          <p className="text-center text-lg font-mono
            dark:text-cyan-300 text-cyan-800">
            {t('about.closing') as string}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
