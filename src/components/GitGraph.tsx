import { useState } from 'react';
import { GitCommit, GitMerge, Clock, FileCode } from 'lucide-react';
import { type Language } from '../i18n';

interface CommitNode {
  id: string;
  hash: string;
  branch: 'main' | 'academic' | 'skills' | 'projects';
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  date: string;
  additions: number;
  deletions: number;
  files: number;
  x: number; // SVG Grid coordinate
  y: number;
}

const CAREER_COMMITS: CommitNode[] = [
  {
    id: '1',
    hash: '8f7e2c1',
    branch: 'main',
    titleEn: 'Initial Commit: Start Computer Science Degree at MTI',
    titleAr: 'البداية: الالتحاق بقسم علوم الحاسب في جامعة MTI',
    descEn: 'Began academic studies in Software Engineering, Algorithms, and Core Computer Science subjects.',
    descAr: 'بدء دراسة هندسة البرمجيات، الخوارزميات، والعلوم الأساسية للحاسب بالجامعة.',
    date: 'Oct 2023',
    additions: 120,
    deletions: 0,
    files: 4,
    x: 40,
    y: 50,
  },
  {
    id: '2',
    hash: 'a2b4c10',
    branch: 'academic',
    titleEn: 'Feat: Master OOP & Advanced C++ Data Structures',
    titleAr: 'ميزة: إتقان البرمجة الكائنية OOP وهياكل بيانات C++',
    descEn: 'Achieved outstanding academic grades in Object-Oriented programming, pointers, and memory management.',
    descAr: 'تحقيق تقديرات أكاديمية ممتازة في البرمجة الكائنية وهياكل البيانات وإدارة الذاكرة.',
    date: 'Feb 2024',
    additions: 840,
    deletions: 110,
    files: 18,
    x: 120,
    y: 110,
  },
  {
    id: '3',
    hash: '3e6f9d2',
    branch: 'skills',
    titleEn: 'Feat: Master Dart Language & Flutter Framework',
    titleAr: 'ميزة: احتراف لغة Dart وإطار العمل فلاتر للأجهزة الذكية',
    descEn: 'Learned state management patterns (BLoC, Provider), asynchronous programming, and widget lifecycles.',
    descAr: 'فهم وتطبيق أنماط إدارة الحالة المتطورة، والبرمجة المتزامنة ودورة حياة الواجهات.',
    date: 'Jul 2024',
    additions: 2350,
    deletions: 480,
    files: 34,
    x: 200,
    y: 170,
  },
  {
    id: '4',
    hash: 'd8c7b6a',
    branch: 'projects',
    titleEn: 'Feat: Launch Library Catalog & Banking Systems',
    titleAr: 'ميزة: إطلاق نظام البنك ونظام إدارة المكتبة الكلاسيكي',
    descEn: 'Built C++ terminal apps implementing core algorithmic constraints, file databases, and user login controls.',
    descAr: 'تطوير تطبيقات C++ سطرية للتحكم بالملفات والمستخدمين وإثبات الكفاءة البرمجية.',
    date: 'Oct 2024',
    additions: 1420,
    deletions: 90,
    files: 12,
    x: 280,
    y: 230,
  },
  {
    id: '5',
    hash: '5f9e8d1',
    branch: 'projects',
    titleEn: 'Feat: Deploy Expense Tracker & Quran Ayah Generator',
    titleAr: 'ميزة: إطلاق متعقب المصاريف ومولد الآيات القرطية',
    descEn: 'Created interactive React web widgets and Mobile app tools featuring database storage and clean audio streams.',
    descAr: 'بناء وتطوير أدوات تفاعلية تعمل بالكامل في المتصفح وقواعد بيانات مدمجة.',
    date: 'Mar 2025',
    additions: 3400,
    deletions: 920,
    files: 41,
    x: 360,
    y: 230,
  },
  {
    id: '6',
    hash: '9a8b7c6',
    branch: 'main',
    titleEn: 'Merge: Complete First Two Years of CS Degree with Honors',
    titleAr: 'دمج: إكمال أول عامين في علوم الحاسب بتقدير امتياز',
    descEn: 'Successfully consolidated theoretical systems knowledge with practical software development achievements.',
    descAr: 'دمج المواد الأكاديمية النظرية بالتطبيقات العملية بنجاح وتفوق.',
    date: 'Jun 2025',
    additions: 450,
    deletions: 20,
    files: 8,
    x: 440,
    y: 50,
  },
  {
    id: '7',
    hash: '7d6e5c4',
    branch: 'projects',
    titleEn: 'Feat: Build Interactive iOS Mock OS Portfolio Website',
    titleAr: 'ميزة: تصميم بورتفوليو تفاعلي يحاكي نظام التشغيل iOS',
    descEn: 'Engineered a highly creative virtual OS inside a phone mockup containing active simulation apps.',
    descAr: 'بناء موقع متكامل يحاكي نظام التشغيل بالكامل مع تطبيقات حقيقية تعمل بداخله.',
    date: 'Jan 2026',
    additions: 7800,
    deletions: 1240,
    files: 64,
    x: 520,
    y: 230,
  },
  {
    id: '8',
    hash: 'bc2d4e1',
    branch: 'skills',
    titleEn: 'Feat: Learn Clean Architecture & Clean Code Design',
    titleAr: 'ميزة: دراسة بنية البرمجيات النظيفة وكتابة كود قياسي',
    descEn: 'Mastered modular MVVM layout structures, dependency injection, and decoupled domain mapping.',
    descAr: 'تطبيق أنظمة الفصل المعياري وفك الترابط البرمجي لكتابة مشاريع ضخمة آمنة.',
    date: 'Apr 2026',
    additions: 1980,
    deletions: 320,
    files: 19,
    x: 600,
    y: 170,
  },
];

interface GitGraphProps {
  language: Language;
}

const GitGraph = ({ language }: GitGraphProps) => {
  const [selectedCommit, setSelectedCommit] = useState<CommitNode>(CAREER_COMMITS[0]);
  const isAr = language === 'ar';

  const branchColors = {
    main: '#06b6d4', // Cyan
    academic: '#a855f7', // Purple
    skills: '#10b981', // Green
    projects: '#f59e0b', // Amber
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 items-stretch select-none">
      
      {/* SVG Git Graph Diagram (Left) */}
      <div className="flex-1 min-h-[220px] bg-slate-900/60 dark:bg-black/30 border dark:border-slate-800/60 border-slate-200/80 rounded-2xl p-4 overflow-x-auto scrollable-container relative flex items-center justify-center">
        <span className="absolute top-2 left-3 font-mono text-[9px] uppercase tracking-wider text-slate-500 dark:text-cyan-500/50 font-bold">
          {isAr ? 'شجرة تعديلات مسيرتي المهنية (Git Graph)' : 'Git Branch Network Visualizer'}
        </span>

        {/* Git Tree SVG */}
        <svg 
          width="660" 
          height="280" 
          viewBox="0 0 660 280"
          className="shrink-0"
        >
          {/* Grid background lines */}
          <line x1="0" y1="50" x2="660" y2="50" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />
          <line x1="0" y1="110" x2="660" y2="110" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />
          <line x1="0" y1="170" x2="660" y2="170" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />
          <line x1="0" y1="230" x2="660" y2="230" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />

          {/* Branch Labels (Upright) */}
          <text x="10" y="54" fill="#06b6d4" fontSize="8" fontFamily="monospace" fontWeight="bold">MAIN</text>
          <text x="10" y="114" fill="#a855f7" fontSize="8" fontFamily="monospace" fontWeight="bold">ACADEMIC</text>
          <text x="10" y="174" fill="#10b981" fontSize="8" fontFamily="monospace" fontWeight="bold">SKILLS</text>
          <text x="10" y="234" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">PROJECTS</text>

          {/* Branch Lines/Paths */}
          {/* Main Line */}
          <line x1="40" y1="50" x2="640" y2="50" stroke={branchColors.main} strokeWidth="2.5" />
          
          {/* Academic Branching Path */}
          <path d="M 40 50 Q 80 50 120 110 L 440 110 Q 480 110 520 50" fill="none" stroke={branchColors.academic} strokeWidth="2" />
          
          {/* Skills Branching Path */}
          <path d="M 120 110 Q 160 110 200 170 L 600 170 Q 620 170 640 50" fill="none" stroke={branchColors.skills} strokeWidth="2" />
          
          {/* Projects Branching Path */}
          <path d="M 200 170 Q 240 170 280 230 L 520 230 Q 560 230 600 170" fill="none" stroke={branchColors.projects} strokeWidth="2" />

          {/* Connectors & Nodes */}
          {CAREER_COMMITS.map((node) => {
            const isSelected = selectedCommit.id === node.id;
            const color = branchColors[node.branch];

            return (
              <g 
                key={node.id}
                onClick={() => setSelectedCommit(node)}
                className="cursor-pointer"
              >
                {/* Node outer glow ring */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="8.5"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.5"
                    className="animate-ping"
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                )}
                {/* Node Hover/Selection highlight circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? '7' : '5'}
                  fill={isSelected ? '#fff' : color}
                  stroke="#0f172a"
                  strokeWidth="1.5"
                  className="transition-all duration-200 hover:r-[7.5] hover:fill-white"
                  style={{
                    filter: `drop-shadow(0 0 6px ${color})`,
                  }}
                />
                {/* Node index tag */}
                <text 
                  x={node.x} 
                  y={node.y - 12} 
                  fill="#94a3b8" 
                  fontSize="7" 
                  fontFamily="monospace" 
                  textAnchor="middle"
                >
                  {node.hash}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mock Commit PR Details Card (Right) */}
      <div 
        className="w-full md:w-[280px] sm:w-[320px] glass border rounded-2xl p-4 flex flex-col justify-between shadow-xl bg-white/50 dark:bg-slate-950/50 shrink-0 font-mono text-[9px] sm:text-[10px] text-left"
        style={{ borderColor: 'rgba(var(--color-primary), 0.25)' }}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b dark:border-slate-800/60 border-slate-200 pb-2">
            <span className="flex items-center gap-1 text-cyan-400 font-bold">
              {selectedCommit.branch === 'main' ? <GitMerge size={12} /> : <GitCommit size={12} />}
              {selectedCommit.hash}
            </span>
            <span className="text-gray-500 flex items-center gap-1">
              <Clock size={10} />
              {selectedCommit.date}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-gray-400 uppercase text-[8px] tracking-wider block">Commit Message</span>
            <h5 className="font-bold text-slate-800 dark:text-white leading-tight">
              {isAr ? selectedCommit.titleAr : selectedCommit.titleEn}
            </h5>
          </div>

          <div className="space-y-1">
            <span className="text-gray-400 uppercase text-[8px] tracking-wider block">Description</span>
            <p className="text-slate-600 dark:text-slate-400 leading-normal text-[8px] sm:text-[9px]">
              {isAr ? selectedCommit.descAr : selectedCommit.descEn}
            </p>
          </div>
        </div>

        {/* Code Diff Stats */}
        <div className="border-t dark:border-slate-800/60 border-slate-200 pt-3 mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="text-emerald-500 font-bold">+{selectedCommit.additions}</span>
            <span className="text-red-500 font-bold">-{selectedCommit.deletions}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <FileCode size={11} />
            <span>{selectedCommit.files} {isAr ? 'ملفات' : 'files'}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GitGraph;
