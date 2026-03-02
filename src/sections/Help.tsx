import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import {
  Smartphone,
  Palette,
  Bug,
  Plus,
  ArrowRight,
} from 'lucide-react';

interface HelpProps {
  language: Language;
  setActiveSection: (section: string) => void;
}

const Help = ({ language, setActiveSection }: HelpProps) => {
  const t = (key: string) => getTranslation(language, key);

  const services = [
    {
      text: (t('help.services') as string[])[0],
      icon: Smartphone,
      color: 'cyan' as const,
    },
    {
      text: (t('help.services') as string[])[1],
      icon: Palette,
      color: 'green' as const,
    },
    {
      text: (t('help.services') as string[])[2],
      icon: Bug,
      color: 'yellow' as const,
    },
    {
      text: (t('help.services') as string[])[3],
      icon: Plus,
      color: 'purple' as const,
    },
  ];

  const colorClasses = {
    cyan: {
      dark: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 hover:border-cyan-400 hover:bg-cyan-500/20',
      light: 'text-cyan-700 border-cyan-400/40 bg-cyan-50/60 hover:border-cyan-500/60 hover:bg-cyan-100/70',
    },
    green: {
      dark: 'text-green-400 border-green-500/30 bg-green-500/10 hover:border-green-400 hover:bg-green-500/20',
      light: 'text-emerald-700 border-emerald-400/40 bg-emerald-50/60 hover:border-emerald-500/60 hover:bg-emerald-100/70',
    },
    yellow: {
      dark: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10 hover:border-yellow-400 hover:bg-yellow-500/20',
      light: 'text-amber-700 border-amber-400/40 bg-amber-50/60 hover:border-amber-500/60 hover:bg-amber-100/70',
    },
    purple: {
      dark: 'text-purple-400 border-purple-500/30 bg-purple-500/10 hover:border-purple-400 hover:bg-purple-500/20',
      light: 'text-violet-700 border-violet-400/40 bg-violet-50/60 hover:border-violet-500/60 hover:bg-violet-100/70',
    },
  };

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-12 text-center
          dark:text-white light:text-slate-800">
          <span className="dark:text-cyan-400 light:text-cyan-600">&lt;</span>
          {t('help.title') as string}
          <span className="dark:text-cyan-400 light:text-cyan-600">/&gt;</span>
        </h2>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border transition-all duration-300 group cursor-default
                dark:${colorClasses[service.color].dark}
                light:${colorClasses[service.color].light}`}
            >
              <div className="flex items-start gap-4">
                <service.icon
                  size={28}
                  className="flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                <p className="font-medium dark:text-white light:text-slate-800">
                  {service.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-6 dark:text-gray-400 light:text-slate-600">
            Have a project in mind? Let&apos;s discuss how I can help.
          </p>
          <button
            onClick={() => setActiveSection('contact')}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono transition-all duration-300
              dark:bg-cyan-500/10 dark:border dark:border-cyan-500/50 dark:text-cyan-400 
              dark:hover:bg-cyan-500/20 dark:hover:border-cyan-400 dark:hover:shadow-lg dark:hover:shadow-cyan-500/20
              light:bg-cyan-600/10 light:border light:border-cyan-500/40 light:text-cyan-700
              light:hover:bg-cyan-600/15 light:hover:border-cyan-500/60 light:hover:shadow-md light:hover:shadow-cyan-500/10"
          >
            Get In Touch
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
