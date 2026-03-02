import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import { Github, ExternalLink, Folder } from 'lucide-react';

interface ProjectsProps {
  language: Language;
}

interface Project {
  title: string;
  description: string;
  github: string;
  tech: string[];
  color: 'cyan' | 'green' | 'purple';
}

const Projects = ({ language }: ProjectsProps) => {
  const t = (key: string) => getTranslation(language, key);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projectItems = t('projects.items') as unknown as { title: string; description: string }[];

  const projects: Project[] = [
    {
      title: projectItems[0].title,
      description: projectItems[0].description,
      github: 'https://github.com/mohamedessam18/Cyber-Task-Manager',
      tech: ['Flutter', 'Dart', 'State Management'],
      color: 'cyan',
    },
    {
      title: projectItems[1].title,
      description: projectItems[1].description,
      github: 'https://github.com/mohamedessam18/Expense-Tracker',
      tech: ['Flutter', 'Dart', 'Charts'],
      color: 'green',
    },
    {
      title: projectItems[2].title,
      description: projectItems[2].description,
      github: 'https://github.com/mohamedessam18/Library-System',
      tech: ['Flutter', 'Dart', 'Database'],
      color: 'purple',
    },
  ];

  const colorClasses = {
    cyan: {
      dark: {
        border: 'border-cyan-500/30',
        bg: 'bg-cyan-500/5',
        hover: 'hover:border-cyan-500/60 hover:bg-cyan-500/10',
        text: 'text-cyan-400',
        shadow: 'hover:shadow-cyan-500/20',
        badge: 'bg-cyan-500/20 text-cyan-300',
      },
      light: {
        border: 'border-cyan-400/30',
        bg: 'bg-cyan-50/40',
        hover: 'hover:border-cyan-500/50 hover:bg-cyan-100/50',
        text: 'text-cyan-700',
        shadow: 'hover:shadow-cyan-500/10',
        badge: 'bg-cyan-100 text-cyan-800',
      },
    },
    green: {
      dark: {
        border: 'border-green-500/30',
        bg: 'bg-green-500/5',
        hover: 'hover:border-green-500/60 hover:bg-green-500/10',
        text: 'text-green-400',
        shadow: 'hover:shadow-green-500/20',
        badge: 'bg-green-500/20 text-green-300',
      },
      light: {
        border: 'border-emerald-400/30',
        bg: 'bg-emerald-50/40',
        hover: 'hover:border-emerald-500/50 hover:bg-emerald-100/50',
        text: 'text-emerald-700',
        shadow: 'hover:shadow-emerald-500/10',
        badge: 'bg-emerald-100 text-emerald-800',
      },
    },
    purple: {
      dark: {
        border: 'border-purple-500/30',
        bg: 'bg-purple-500/5',
        hover: 'hover:border-purple-500/60 hover:bg-purple-500/10',
        text: 'text-purple-400',
        shadow: 'hover:shadow-purple-500/20',
        badge: 'bg-purple-500/20 text-purple-300',
      },
      light: {
        border: 'border-violet-400/30',
        bg: 'bg-violet-50/40',
        hover: 'hover:border-violet-500/50 hover:bg-violet-100/50',
        text: 'text-violet-700',
        shadow: 'hover:shadow-violet-500/10',
        badge: 'bg-violet-100 text-violet-800',
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
          {t('projects.title') as string}
          <span className="dark:text-cyan-400 light:text-cyan-600">/&gt;</span>
        </h2>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const darkColors = colorClasses[project.color].dark;
            const lightColors = colorClasses[project.color].light;
            return (
              <div
                key={index}
                className={`group relative p-6 rounded-lg border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                  dark:${darkColors.border} dark:${darkColors.bg} dark:${darkColors.hover} dark:${darkColors.shadow}
                  light:${lightColors.border} light:${lightColors.bg} light:${lightColors.hover} light:${lightColors.shadow}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <Folder size={32} className={`dark:${darkColors.text} light:${lightColors.text}`} />
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md transition-all
                        dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10
                        light:text-slate-500 light:hover:text-slate-800 light:hover:bg-slate-200/50"
                      aria-label="View on GitHub"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md transition-all
                        dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10
                        light:text-slate-500 light:hover:text-slate-800 light:hover:bg-slate-200/50"
                      aria-label="Open project"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <h3 className={`text-lg font-mono font-bold mb-2 transition-colors
                  dark:text-white dark:group-hover:text-cyan-300
                  light:text-slate-800 light:group-hover:text-cyan-700`}>
                  {project.title}
                </h3>
                <p className="text-sm mb-4 line-clamp-3
                  dark:text-gray-400 light:text-slate-600">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-2 py-1 rounded text-xs font-mono
                        dark:${darkColors.badge} light:${lightColors.badge}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${
                      project.color === 'cyan' 
                        ? 'rgba(14, 165, 194, 0.08)' 
                        : project.color === 'green' 
                          ? 'rgba(16, 185, 129, 0.08)' 
                          : 'rgba(139, 92, 246, 0.08)'
                    }, transparent 70%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* View All on GitHub */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/mohamedessam18"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono transition-all duration-300
              dark:bg-gray-800/50 dark:border dark:border-gray-700 dark:text-gray-300 
              dark:hover:bg-gray-700/50 dark:hover:border-gray-600 dark:hover:text-white
              light:bg-slate-100 light:border light:border-slate-300 light:text-slate-700
              light:hover:bg-slate-200/70 light:hover:border-slate-400 light:hover:text-slate-900"
          >
            <Github size={18} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
