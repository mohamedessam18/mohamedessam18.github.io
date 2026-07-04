import { useState } from 'react';
import { motion } from 'framer-motion';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import type { ElementType } from 'react';
import SkillRadar from '../components/SkillRadar';
import SkillOrbit from '../components/SkillOrbit';
import {
  Code,
  Cpu,
  Brain,
  Database,
  Layers,
  Shield,
  Terminal,
  Globe,
  Braces,
  Paintbrush,
  GitBranch,
  TestTube,
} from 'lucide-react';

interface SkillsProps {
  language: Language;
}

interface SkillCategory {
  id: string;
  title: string;
  summary: string;
  skills: { name: string; icon: ElementType }[];
  color: 'cyan' | 'green' | 'purple' | 'blue';
}

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

const Skills = ({ language }: SkillsProps) => {
  const t = (key: string) => getTranslation(language, key);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: t('skills.categories.flutter.title') as string,
      summary: t('skills.categories.flutter.summary') as string,
      skills: [
        { name: (t('skills.categories.flutter.items') as string[])[0], icon: Code },
        { name: (t('skills.categories.flutter.items') as string[])[1], icon: GitBranch },
        { name: (t('skills.categories.flutter.items') as string[])[2], icon: Braces },
        { name: (t('skills.categories.flutter.items') as string[])[3], icon: Layers },
        { name: (t('skills.categories.flutter.items') as string[])[4], icon: Paintbrush },
        { name: (t('skills.categories.flutter.items') as string[])[5], icon: Brain },
        { name: (t('skills.categories.flutter.items') as string[])[6], icon: Cpu },
      ],
      id: 'flutter',
      color: 'green',
    },
    {
      title: t('skills.categories.web.title') as string,
      summary: t('skills.categories.web.summary') as string,
      skills: [
        { name: (t('skills.categories.web.items') as string[])[0], icon: Globe },
        { name: (t('skills.categories.web.items') as string[])[1], icon: Paintbrush },
        { name: (t('skills.categories.web.items') as string[])[2], icon: Braces },
        { name: (t('skills.categories.web.items') as string[])[3], icon: Code },
      ],
      id: 'web',
      color: 'cyan',
    },
    {
      title: t('skills.categories.db.title') as string,
      summary: t('skills.categories.db.summary') as string,
      skills: [
        { name: (t('skills.categories.db.items') as string[])[0], icon: Database },
        { name: (t('skills.categories.db.items') as string[])[1], icon: Cpu },
        { name: (t('skills.categories.db.items') as string[])[2], icon: Code },
        { name: (t('skills.categories.db.items') as string[])[3], icon: Brain },
      ],
      id: 'db',
      color: 'purple',
    },
    {
      title: t('skills.categories.practice.title') as string,
      summary: t('skills.categories.practice.summary') as string,
      skills: [
        { name: (t('skills.categories.practice.items') as string[])[0], icon: GitBranch },
        { name: (t('skills.categories.practice.items') as string[])[1], icon: Terminal },
        { name: (t('skills.categories.practice.items') as string[])[2], icon: TestTube },
        { name: (t('skills.categories.practice.items') as string[])[3], icon: Shield },
      ],
      id: 'practice',
      color: 'blue',
    },
  ];

  const colorClasses = {
    cyan: {
      bg: 'bg-cyan-500/5 dark:bg-cyan-500/10 border-cyan-500/20 dark:border-cyan-500/30 hover:border-cyan-500/40 dark:hover:border-cyan-400 text-cyan-700 dark:text-cyan-400 shadow-glow-cyan/10 dark:shadow-cyan-500/5',
      text: 'text-cyan-700 dark:text-cyan-400',
      itemBg: 'bg-cyan-500/5 dark:bg-cyan-950/40 border border-cyan-500/10 dark:border-cyan-500/25',
    },
    green: {
      bg: 'bg-green-500/5 dark:bg-green-500/10 border-green-500/20 dark:border-green-500/30 hover:border-green-500/40 dark:hover:border-green-400 text-emerald-700 dark:text-green-400 shadow-glow-green/10 dark:shadow-green-500/5',
      text: 'text-emerald-700 dark:text-green-400',
      itemBg: 'bg-green-500/5 dark:bg-green-950/40 border border-green-500/10 dark:border-green-500/25',
    },
    purple: {
      bg: 'bg-purple-500/5 dark:bg-purple-500/10 border-purple-500/20 dark:border-purple-500/30 hover:border-purple-500/40 dark:hover:border-purple-400 text-purple-700 dark:text-purple-400 shadow-glow-purple/10 dark:shadow-purple-500/5',
      text: 'text-purple-700 dark:text-purple-400',
      itemBg: 'bg-purple-500/5 dark:bg-purple-950/40 border border-purple-500/10 dark:border-purple-500/25',
    },
    blue: {
      bg: 'bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/20 dark:border-blue-500/30 hover:border-blue-500/40 dark:hover:border-blue-400 text-blue-700 dark:text-blue-400 shadow-glow-blue/10 dark:shadow-blue-500/5',
      text: 'text-blue-700 dark:text-blue-400',
      itemBg: 'bg-blue-500/5 dark:bg-blue-950/40 border border-blue-500/10 dark:border-blue-500/25',
    },
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Section Title */}
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-mono font-bold mb-12 text-center
          text-slate-800 dark:text-white">
          <span className="text-cyan-600 dark:text-cyan-400">&lt;</span>
          {t('skills.title') as string}
          <span className="text-cyan-600 dark:text-cyan-400">/&gt;</span>
        </motion.h2>

        {/* Desktop Split View: Bento Grid on Left, Skill Radar on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
          
          {/* Categories Grid (Takes 8 columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillCategories.map((category, catIndex) => {
              const colors = colorClasses[category.color];
              const isActive = activeCategory === category.id;
              const activeBorderColor = category.color === 'green' ? '#10b981' : category.color === 'cyan' ? '#06b6d4' : category.color === 'purple' ? '#a855f7' : '#3b82f6';

              return (
                <motion.div
                  variants={itemVariants}
                  key={catIndex}
                  className={`glass p-5 rounded-2xl border transition-all duration-300 shadow-xl flex flex-col justify-between ${colors.bg}`}
                  style={isActive ? { 
                    borderColor: activeBorderColor, 
                    boxShadow: `0 0 15px ${activeBorderColor}80` 
                  } : {}}
                >
                  <div>
                    <h3 className={`text-md sm:text-lg font-mono font-bold mb-1.5 ${colors.text}`}>
                      {category.title}
                    </h3>
                    <p className="mb-4 text-xs leading-relaxed text-slate-600 dark:text-gray-400">
                      {category.summary}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 mt-auto">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`flex items-center gap-2.5 p-2 rounded-xl transition-colors duration-300 ${colors.itemBg}`}
                      >
                        <skill.icon size={16} className={`${colors.text} flex-shrink-0`} />
                        <span className="text-[11px] sm:text-xs font-mono text-slate-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skill Radar Chart Widget (Takes 4 columns) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4 glass p-6 rounded-2xl border dark:border-cyan-500/20 border-slate-300 shadow-xl bg-white/40 dark:bg-black/20 flex flex-col items-center justify-between min-h-[380px] lg:min-h-auto"
          >
            <div className="text-center w-full select-none">
              <h3 className="text-md sm:text-lg font-mono font-bold text-slate-800 dark:text-white mb-1">
                {language === 'ar' ? 'مخطط تقييم المهارات' : 'Radar Skill Assessment'}
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-cyan-500/60 font-mono">
                {language === 'ar' ? 'تحليل الأبعاد البرمجية لمحمد' : "Visualizing Mohamed's Dev dimensions"}
              </p>
            </div>
            
            <div className="flex-1 flex items-center justify-center w-full">
              <SkillRadar language={language} />
            </div>
          </motion.div>

        </div>

        {/* 3D Skills Solar System Orbit Card */}
        <motion.div variants={itemVariants} className="mb-6">
          <SkillOrbit 
            language={language} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
        </motion.div>

        {/* Full-width Footer Card for Additional Knowledge */}
        <motion.div variants={itemVariants} className="glass p-6 rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-300 shadow-xl
          bg-gradient-to-r from-slate-100/20 to-slate-50/20 dark:bg-gradient-to-r dark:from-gray-800/10 dark:to-gray-900/10">
          <h3 className="text-lg font-mono font-bold mb-4 flex items-center gap-2 text-slate-700 dark:text-gray-300">
            <Shield size={20} className="text-cyan-600 dark:text-cyan-400" />
            {t('skills.additional') as string}
          </h3>
          <div className="flex flex-col gap-3">
            <p className="flex items-start sm:items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-gray-400">
              <Terminal size={18} className="text-green-600 dark:text-green-400 mt-0.5 sm:mt-0 flex-shrink-0" />
              <span>{t('skills.additionalText') as string}</span>
            </p>
            <p className="flex items-start sm:items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-gray-500">
              <Code size={18} className="text-cyan-600 dark:text-cyan-400 mt-0.5 sm:mt-0 flex-shrink-0" />
              <span>{t('skills.additionalText2') as string}</span>
            </p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Skills;
