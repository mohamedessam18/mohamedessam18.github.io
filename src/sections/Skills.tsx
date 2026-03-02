import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import {
  Smartphone,
  Code,
  Cpu,
  Brain,
  MessageCircle,
  Users,
  Heart,
  Shield,
  Terminal,
} from 'lucide-react';

interface SkillsProps {
  language: Language;
}

interface SkillCategory {
  title: string;
  skills: { name: string; icon: React.ElementType }[];
  color: 'cyan' | 'green' | 'purple';
}

const Skills = ({ language }: SkillsProps) => {
  const t = (key: string) => getTranslation(language, key);

  const coreSkills = t('skills.core') as string[];
  const supportingSkills = t('skills.supporting') as string[];
  const softSkills = t('skills.soft') as string[];

  const skillCategories: SkillCategory[] = [
    {
      title: t('skills.coreSkills') as string,
      skills: coreSkills.map((skill, i) => ({
        name: skill,
        icon: [Smartphone, Code, Smartphone][i],
      })),
      color: 'cyan',
    },
    {
      title: t('skills.supportingSkills') as string,
      skills: supportingSkills.map((skill, i) => ({
        name: skill,
        icon: [Cpu, Code, Brain][i],
      })),
      color: 'green',
    },
    {
      title: t('skills.softSkills') as string,
      skills: softSkills.map((skill, i) => ({
        name: skill,
        icon: [MessageCircle, Users, Heart][i],
      })),
      color: 'purple',
    },
  ];

  const colorClasses = {
    cyan: {
      dark: {
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        hover: 'hover:border-cyan-500/50 hover:bg-cyan-500/20',
      },
      light: {
        bg: 'bg-cyan-50/70',
        border: 'border-cyan-300/40',
        text: 'text-cyan-700',
        hover: 'hover:border-cyan-400/60 hover:bg-cyan-100/70',
      },
    },
    green: {
      dark: {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-400',
        hover: 'hover:border-green-500/50 hover:bg-green-500/20',
      },
      light: {
        bg: 'bg-emerald-50/70',
        border: 'border-emerald-300/40',
        text: 'text-emerald-700',
        hover: 'hover:border-emerald-400/60 hover:bg-emerald-100/70',
      },
    },
    purple: {
      dark: {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        hover: 'hover:border-purple-500/50 hover:bg-purple-500/20',
      },
      light: {
        bg: 'bg-violet-50/70',
        border: 'border-violet-300/40',
        text: 'text-violet-700',
        hover: 'hover:border-violet-400/60 hover:bg-violet-100/70',
      },
    },
  };

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-12 text-center
          dark:text-white light:text-slate-800">
          <span className="dark:text-cyan-400 light:text-cyan-600">&lt;</span>
          {t('skills.title') as string}
          <span className="dark:text-cyan-400 light:text-cyan-600">/&gt;</span>
        </h2>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => {
            const darkColors = colorClasses[category.color].dark;
            const lightColors = colorClasses[category.color].light;
            return (
              <div
                key={catIndex}
                className={`p-6 rounded-lg border transition-all duration-300
                  dark:${darkColors.bg} dark:${darkColors.border} dark:${darkColors.hover}
                  light:${lightColors.bg} light:${lightColors.border} light:${lightColors.hover}`}
              >
                <h3 className={`text-lg font-mono font-bold mb-4
                  dark:${darkColors.text} light:${lightColors.text}`}>
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center gap-3 p-2 rounded
                        dark:bg-black/30 light:bg-white/60"
                    >
                      <skill.icon size={18} className={`dark:${darkColors.text} light:${lightColors.text}`} />
                      <span className="text-sm dark:text-gray-300 light:text-slate-700">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Knowledge */}
        <div className="mt-8 p-6 rounded-lg border
          dark:bg-gradient-to-r dark:from-gray-800/50 dark:to-gray-900/50 dark:border-gray-700/50
          light:bg-gradient-to-r light:from-slate-100/70 light:to-slate-50/70 light:border-slate-300/40">
          <h3 className="text-lg font-mono font-bold mb-4 flex items-center gap-2
            dark:text-gray-400 light:text-slate-600">
            <Shield size={20} />
            {t('skills.additional') as string}
          </h3>
          <p className="flex items-center gap-2 dark:text-gray-400 light:text-slate-600">
            <Terminal size={18} className="dark:text-green-400 light:text-emerald-600" />
            {t('skills.additionalText') as string}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
