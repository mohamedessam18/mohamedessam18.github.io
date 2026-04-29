import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import type { ElementType } from 'react';
import {
  Smartphone,
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
  Server,
  Rocket,
  TestTube,
} from 'lucide-react';

interface SkillsProps {
  language: Language;
}

interface SkillCategory {
  title: string;
  summary: string;
  skills: { name: string; icon: ElementType }[];
  color: 'cyan' | 'green' | 'purple' | 'blue';
}

const Skills = ({ language }: SkillsProps) => {
  const t = (key: string) => getTranslation(language, key);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Web Skills',
      summary: 'Frontend foundations and React experience for modern web interfaces.',
      skills: [
        { name: 'HTML', icon: Globe },
        { name: 'CSS', icon: Paintbrush },
        { name: 'JavaScript', icon: Braces },
        { name: 'Experience with React', icon: Code },
      ],
      color: 'cyan',
    },
    {
      title: 'Flutter Skills',
      summary: 'Dart, widgets, state management, architecture, backend integration, testing, and deployment.',
      skills: [
        { name: 'Dart, OOP, mixins, interfaces, null safety', icon: Code },
        { name: 'Future, async/await, and Streams', icon: GitBranch },
        { name: 'Functional collection methods: map, where, fold', icon: Braces },
        { name: 'Rows, Columns, Stack, Container, Flex, responsive UI', icon: Layers },
        { name: 'Material, Cupertino, CustomPainter, Canvas', icon: Paintbrush },
        { name: 'Provider, Riverpod, BLoC, GetX, Signals', icon: Brain },
        { name: 'Clean Architecture, MVVM, Repository Pattern', icon: Cpu },
        { name: 'REST APIs with Dio/http and JSON serialization', icon: Server },
        { name: 'SQLite, Hive, Isar, Firebase, Supabase', icon: Database },
        { name: 'Animations, Platform Channels, packages, profiling', icon: Smartphone },
        { name: 'CI/CD, app store releases, unit and widget testing', icon: Rocket },
      ],
      color: 'green',
    },
    {
      title: 'Database and Structures',
      summary: 'Strong CS fundamentals for data modeling and efficient problem solving.',
      skills: [
        { name: 'Database systems and data modeling', icon: Database },
        { name: 'Data structures using C++', icon: Cpu },
        { name: 'Data structures using Dart', icon: Code },
        { name: 'Algorithms and problem solving', icon: Brain },
      ],
      color: 'purple',
    },
    {
      title: 'Development Practice',
      summary: 'The supporting workflow skills that keep projects maintainable.',
      skills: [
        { name: 'Git and GitHub project workflow', icon: GitBranch },
        { name: 'Debugging and performance profiling', icon: Terminal },
        { name: 'Testing business logic and UI behavior', icon: TestTube },
        { name: 'Clean, maintainable software development', icon: Shield },
      ],
      color: 'blue',
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
    blue: {
      dark: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        hover: 'hover:border-blue-500/50 hover:bg-blue-500/20',
      },
      light: {
        bg: 'bg-blue-50/70',
        border: 'border-blue-300/40',
        text: 'text-blue-700',
        hover: 'hover:border-blue-400/60 hover:bg-blue-100/70',
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
        <div className="grid lg:grid-cols-2 gap-6">
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
                <p className="mb-5 text-sm leading-relaxed dark:text-gray-400 light:text-slate-600">
                  {category.summary}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
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
            Web, Flutter, databases, data structures, and deployment knowledge shaped through university work and personal projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
