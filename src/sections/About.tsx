import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import { Code2, Terminal, Users, Lightbulb } from 'lucide-react';

interface AboutProps {
  language: Language;
}

const About = ({ language }: AboutProps) => {
  const t = (key: string) => getTranslation(language, key);

  const highlights = [
    {
      icon: Code2,
      title: 'Flutter & Dart',
      description: 'Specialized in mobile app development',
    },
    {
      icon: Terminal,
      title: 'C++ & Linux',
      description: 'Systems programming basics',
    },
    {
      icon: Users,
      title: 'Teamwork',
      description: 'Collaborative development',
    },
    {
      icon: Lightbulb,
      title: 'Problem Solving',
      description: 'Analytical thinking',
    },
  ];

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-8 text-center
          dark:text-white light:text-slate-800">
          <span className="dark:text-cyan-400 light:text-cyan-600">&lt;</span>
          {t('about.title') as string}
          <span className="dark:text-cyan-400 light:text-cyan-600">/&gt;</span>
        </h2>

        {/* Main Content */}
        <div className="space-y-6 leading-relaxed
          dark:text-gray-300 light:text-slate-700">
          <p className="text-lg">{t('about.paragraph1') as string}</p>
          <p className="text-lg">{t('about.paragraph2') as string}</p>
          <p className="text-lg">{t('about.paragraph3') as string}</p>
        </div>

        {/* Highlights Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg transition-all duration-300 group
                dark:bg-cyan-500/5 dark:border dark:border-cyan-500/20 dark:hover:border-cyan-500/40 dark:hover:bg-cyan-500/10
                light:bg-cyan-50/50 light:border light:border-cyan-200/40 light:hover:border-cyan-300/60 light:hover:bg-cyan-50/80"
            >
              <item.icon
                size={24}
                className="mb-3 transition-transform group-hover:scale-110
                  dark:text-cyan-400 light:text-cyan-600"
              />
              <h3 className="font-mono text-sm font-bold mb-1
                dark:text-white light:text-slate-800">
                {item.title}
              </h3>
              <p className="text-xs dark:text-gray-500 light:text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="mt-12 p-6 rounded-lg border
          dark:bg-gradient-to-r dark:from-cyan-500/10 dark:to-green-500/10 dark:border-cyan-500/30
          light:bg-gradient-to-r light:from-cyan-100/50 light:to-emerald-100/50 light:border-cyan-300/40">
          <p className="text-center text-lg font-mono
            dark:text-cyan-300 light:text-cyan-800">
            {t('about.closing') as string}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
