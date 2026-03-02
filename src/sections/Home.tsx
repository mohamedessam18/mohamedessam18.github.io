import { ArrowRight, Wrench } from 'lucide-react';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import BubblesBackground from '../components/BubblesBackground';
import meImage from '../assets/me.png';

interface HomeProps {
  language: Language;
  setActiveSection: (section: string) => void;
}

const Home = ({ language, setActiveSection }: HomeProps) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Bubbles Background */}
      <BubblesBackground />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Glow effect - stronger in dark mode, subtle in light */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 blur-lg 
              dark:opacity-50 dark:animate-pulse light:opacity-25" />
            <img
              src={meImage}
              alt={t('hero.name') as string}
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover 
                dark:border-2 dark:border-cyan-500/50 dark:shadow-lg dark:shadow-cyan-500/20
                light:border-2 light:border-cyan-400/40 light:shadow-md light:shadow-cyan-400/10"
            />
          </div>
        </div>

        {/* Greeting */}
        <p className="font-mono text-sm sm:text-base mb-2 tracking-wider
          dark:text-cyan-400 light:text-cyan-700">
          {t('hero.greeting') as string}
        </p>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold mb-4 tracking-tight
          dark:text-white light:text-slate-800">
          {t('hero.name') as string}
        </h1>

        {/* Title */}
        <p className="text-xl sm:text-2xl font-mono mb-2
          dark:text-green-400 light:text-emerald-700">
          {t('hero.title') as string}
        </p>

        {/* Subtitle */}
        <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto
          dark:text-gray-400 light:text-slate-600">
          {t('hero.subtitle') as string}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button */}
          <button
            onClick={() => setActiveSection('projects')}
            className="group flex items-center gap-2 px-6 py-3 rounded-lg font-mono transition-all duration-300
              dark:bg-cyan-500/10 dark:border dark:border-cyan-500/50 dark:text-cyan-400 
              dark:hover:bg-cyan-500/20 dark:hover:border-cyan-400 dark:hover:shadow-lg dark:hover:shadow-cyan-500/20
              light:bg-cyan-600/10 light:border light:border-cyan-500/40 light:text-cyan-700
              light:hover:bg-cyan-600/15 light:hover:border-cyan-500/60 light:hover:shadow-md light:hover:shadow-cyan-500/10"
          >
            {t('hero.ctaProjects') as string}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => setActiveSection('help')}
            className="group flex items-center gap-2 px-6 py-3 rounded-lg font-mono transition-all duration-300
              dark:bg-green-500/10 dark:border dark:border-green-500/50 dark:text-green-400 
              dark:hover:bg-green-500/20 dark:hover:border-green-400 dark:hover:shadow-lg dark:hover:shadow-green-500/20
              light:bg-emerald-600/10 light:border light:border-emerald-500/40 light:text-emerald-700
              light:hover:bg-emerald-600/15 light:hover:border-emerald-500/60 light:hover:shadow-md light:hover:shadow-emerald-500/10"
          >
            {t('hero.ctaHelp') as string}
            <Wrench
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center items-center gap-8
          dark:text-gray-600 light:text-slate-400">
          <div className="h-px w-16 bg-gradient-to-r 
            dark:from-transparent dark:to-cyan-500/50 
            light:from-transparent light:to-cyan-500/30" />
          <span className="font-mono text-xs tracking-widest">FLUTTER · DART · MOBILE</span>
          <div className="h-px w-16 bg-gradient-to-l 
            dark:from-transparent dark:to-cyan-500/50 
            light:from-transparent light:to-cyan-500/30" />
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none
        dark:bg-gradient-to-t dark:from-black dark:to-transparent
        light:bg-gradient-to-t light:from-[#f8f7f4] light:to-transparent" />
    </div>
  );
};

export default Home;
