import * as React from 'react';
import { motion } from 'framer-motion';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import { Github, ExternalLink, Folder, Smartphone, Search, Play, Pause, Heart, Check, Book, Calculator, Wallet, BookOpen, CreditCard, CheckSquare, Compass, Mail, Phone, Code, Sliders, Brain, Gamepad2, Smile, Calendar } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../components/ui/drawer';
import { triggerAchievement } from '../components/AchievementSystem';

interface ProjectsProps {
  language: Language;
}

interface Project {
  id: string;
  titleKey: string;
  descKey: string;
  github: string;
  tech: string[];
  color: 'cyan' | 'green' | 'purple';
}

// App Icon for the iOS simulator home screen
interface AppIconProps {
  name: string;
  icon: any;
  color: string;
  onClick: () => void;
}

const AppIcon = ({ name, icon: Icon, color, onClick }: AppIconProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-1 active:scale-90 transition-transform focus:outline-none"
  >
    <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center shadow-md ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <span className="text-[9px] font-medium font-sans text-white/90 truncate max-w-[58px]">
      {name}
    </span>
  </button>
);

// iPhone iOS-style home screen component
interface HomeScreenProps {
  onLaunchApp: (id: string) => void;
  language: Language;
}

const HomeScreen = ({ onLaunchApp, language }: HomeScreenProps) => {
  const apps = [
    { id: 'cyberTaskManager', name: language === 'ar' ? 'المهام' : 'Tasks', icon: CheckSquare, color: 'bg-gradient-to-tr from-emerald-600 to-green-400' },
    { id: 'numericalAnalysisCalc', name: language === 'ar' ? 'الحساب' : 'Calc', icon: Calculator, color: 'bg-gradient-to-tr from-purple-600 to-violet-400' },
    { id: 'expenseTracker', name: language === 'ar' ? 'المصاريف' : 'Expense', icon: Wallet, color: 'bg-gradient-to-tr from-amber-600 to-yellow-400' },
    { id: 'quranAyahGenerator', name: language === 'ar' ? 'القرآن' : 'Quran', icon: Book, color: 'bg-gradient-to-tr from-cyan-600 to-blue-400' },
    { id: 'bankSystem', name: language === 'ar' ? 'البنك' : 'Bank', icon: CreditCard, color: 'bg-gradient-to-tr from-indigo-600 to-blue-500' },
    { id: 'librarySystem', name: language === 'ar' ? 'المكتبة' : 'Library', icon: BookOpen, color: 'bg-gradient-to-tr from-rose-600 to-pink-400' },
    { id: 'sandbox', name: language === 'ar' ? 'الملعب' : 'Sandbox', icon: Code, color: 'bg-gradient-to-tr from-cyan-500 to-blue-600' },
    { id: 'devtools', name: language === 'ar' ? 'الأدوات' : 'DevTools', icon: Sliders, color: 'bg-gradient-to-tr from-slate-600 to-slate-800' },
    { id: 'dsa', name: language === 'ar' ? 'الخوارزميات' : 'DSA', icon: Brain, color: 'bg-gradient-to-tr from-cyan-600 to-cyan-400' },
    { id: 'memory', name: language === 'ar' ? 'الذاكرة' : 'Memory', icon: Gamepad2, color: 'bg-gradient-to-tr from-purple-600 to-pink-500' },
    { id: 'avatar', name: language === 'ar' ? 'الأفاتار' : 'Avatar', icon: Smile, color: 'bg-gradient-to-tr from-emerald-500 to-teal-400' },
    { id: 'scheduler', name: language === 'ar' ? 'المقابلة' : 'Schedule', icon: Calendar, color: 'bg-gradient-to-tr from-amber-500 to-yellow-600' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between pt-10 pb-5 px-3 bg-slate-900/90 relative select-none">
      {/* Background wallpaper glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-55 z-0" />
      <div className="absolute top-[-40px] left-[-40px] w-[180px] h-[180px] bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-40px] right-[-40px] w-[180px] h-[180px] bg-purple-500/10 rounded-full blur-3xl" />

      {/* Grid of Apps */}
      <div className="grid grid-cols-4 gap-x-2 gap-y-4 relative z-10">
        {apps.map((app) => (
          <AppIcon
            key={app.id}
            name={app.name}
            icon={app.icon}
            color={app.color}
            onClick={() => onLaunchApp(app.id)}
          />
        ))}
      </div>

      {/* iOS styled Dock */}
      <div className="w-full bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-[20px] p-2 flex justify-around items-center border border-white/5 relative z-10 mt-auto">
        <div className="w-10 h-10 rounded-[10px] bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center shadow">
          <Phone size={18} className="text-white" />
        </div>
        <a 
          href="https://github.com/mohamedessam18" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-[10px] bg-slate-800 flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform"
        >
          <Github size={18} className="text-white" />
        </a>
        <button 
          onClick={() => onLaunchApp('quranAyahGenerator')}
          className="w-10 h-10 rounded-[10px] bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform"
        >
          <Compass size={18} className="text-white" />
        </button>
        <button 
          onClick={() => onLaunchApp('cyberTaskManager')}
          className="w-10 h-10 rounded-[10px] bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform"
        >
          <Mail size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// MOCK SIMULATION SCREENS
// ----------------------------------------------------

// 1. Cyber Task Manager Screen
const CyberTaskScreen = ({ t }: { t: (key: string) => string }) => {
  const [tasks, setTasks] = React.useState<any[]>([
    { id: 1, key: 'audit', done: false, category: 'security' },
    { id: 2, key: 'plugins', done: true, category: 'work' },
    { id: 3, key: 'refactor', done: false, category: 'work' },
    { id: 4, key: 'tests', done: false, category: 'work' },
  ]);
  const [newText, setNewText] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  const handleToggle = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    setTasks([...tasks, {
      id: Date.now(),
      key: '',
      customTitle: newText,
      done: false,
      category: filter === 'all' ? 'work' : filter
    }]);
    setNewText('');
  };

  const filteredTasks = tasks.filter(t => filter === 'all' || t.category === filter);
  const doneCount = tasks.filter(t => t.done).length;
  const progressPercent = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans p-4 select-none justify-between text-left" dir="ltr">
      <div>
        <div className="text-center font-bold text-sm mb-4 text-purple-400 font-mono tracking-wider">
          CYBER TASK MANAGER
        </div>

        {/* Progress */}
        <div className="bg-slate-900/80 p-3 rounded-xl mb-3 border border-purple-500/20">
          <div className="flex justify-between text-[10px] mb-1">
            <span>{t('projects.cyberTaskManager.progress')}</span>
            <span className="text-purple-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none text-[9px] mb-2">
          {['all', 'work', 'personal', 'security'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 rounded-full border transition-all shrink-0 capitalize ${
                filter === cat 
                  ? 'bg-purple-600 border-purple-500 text-white shadow-md' 
                  : 'bg-slate-900 border-slate-800 text-gray-400'
              }`}
            >
              {t(`projects.cyberTaskManager.categories.${cat}`) || cat}
            </button>
          ))}
        </div>

        {/* Checklist */}
        <div className="space-y-1.5 overflow-y-auto max-h-[220px] scrollbar-none pr-1">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggle(task.id)}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer text-[11px] ${
                task.done 
                  ? 'bg-purple-950/10 border-purple-500/20 text-gray-400' 
                  : 'bg-slate-900 border-slate-800 hover:border-purple-500/30 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all shrink-0 ${
                  task.done ? 'bg-purple-500 border-purple-500 text-white' : 'border-purple-500/50'
                }`}>
                  {task.done && <Check size={10} />}
                </div>
                <span className={`truncate max-w-[140px] ${task.done ? 'line-through' : ''}`}>
                  {task.key ? t(`projects.cyberTaskManager.tasks.${task.key}`) : task.customTitle}
                </span>
              </div>
              <span className={`text-[8px] px-1.5 py-0.5 rounded shrink-0 capitalize ${
                task.category === 'security' 
                  ? 'bg-red-500/20 text-red-400' 
                  : task.category === 'work' 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {t(`projects.cyberTaskManager.categories.${task.category}`) || task.category}
              </span>
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <div className="text-center text-[10px] text-gray-500 py-6">
              No tasks found
            </div>
          )}
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="flex gap-1.5 mt-2">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder={t('projects.cyberTaskManager.addTask') + '...'}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-purple-500 text-white min-w-0"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold transition-colors text-sm"
        >
          +
        </button>
      </form>
    </div>
  );
};

// 2. Expense Tracker Screen
const ExpenseTrackerScreen = ({ t }: { t: (key: string) => string }) => {
  const [txs, setTxs] = React.useState<any[]>([
    { id: 1, key: 'salary', amount: 2500, type: 'income', category: 'work' },
    { id: 2, key: 'groceries', amount: -120, type: 'expense', category: 'food' },
    { id: 3, key: 'coffee', amount: -15, type: 'expense', category: 'food' },
    { id: 4, key: 'saas', amount: -20, type: 'expense', category: 'work' },
  ]);

  const addTx = (name: string, amount: number, type: 'income' | 'expense', category: string) => {
    setTxs([{ id: Date.now(), customName: name, amount, type, category }, ...txs]);
  };

  const totalIncome = txs.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = txs.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans p-4 select-none justify-between text-left" dir="ltr">
      <div>
        <div className="text-center font-bold text-sm mb-4 text-emerald-400 font-mono tracking-wider">
          EXPENSE TRACKER
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-3.5 rounded-xl mb-3 shadow-lg">
          <span className="text-emerald-100 text-[9px] tracking-wider uppercase font-medium">{t('projects.expenseTracker.balance')}</span>
          <div className="text-xl font-bold font-mono mt-0.5">${balance.toLocaleString()}</div>
          <div className="flex justify-between mt-2 pt-2 border-t border-white/10 text-[10px]">
            <div>
              <span className="opacity-80 block text-[8px]">{t('projects.expenseTracker.income')}</span>
              <span className="font-semibold font-mono text-emerald-200">+${totalIncome}</span>
            </div>
            <div>
              <span className="opacity-80 block text-[8px]">{t('projects.expenseTracker.expense')}</span>
              <span className="font-semibold font-mono text-red-200">-${totalExpense}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          <button 
            onClick={() => addTx('Salary Boost', 500, 'income', 'work')}
            className="bg-slate-900 border border-slate-800 hover:border-emerald-500/30 rounded-lg py-1.5 px-0.5 text-[9px] text-center text-emerald-400 font-medium transition-colors"
          >
            +$500 Salary
          </button>
          <button 
            onClick={() => addTx('Fast Food', -20, 'expense', 'food')}
            className="bg-slate-900 border border-slate-800 hover:border-red-500/30 rounded-lg py-1.5 px-0.5 text-[9px] text-center text-red-400 font-medium transition-colors"
          >
            -$20 Food
          </button>
          <button 
            onClick={() => addTx('Cab Fare', -15, 'expense', 'travel')}
            className="bg-slate-900 border border-slate-800 hover:border-red-500/30 rounded-lg py-1.5 px-0.5 text-[9px] text-center text-red-400 font-medium transition-colors"
          >
            -$15 Travel
          </button>
        </div>

        {/* Transactions list */}
        <div className="text-[9px] font-mono text-gray-500 uppercase tracking-wider mb-1">Transactions</div>
        <div className="space-y-1.5 overflow-y-auto max-h-[170px] scrollbar-none pr-1">
          {txs.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-2 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-xs">{tx.category === 'work' ? '💼' : tx.category === 'food' ? '☕' : '🚗'}</span>
                <div>
                  <span className="font-medium block leading-tight truncate max-w-[110px]">
                    {tx.key ? t(`projects.expenseTracker.transactions.${tx.key}`) : tx.customName}
                  </span>
                  <span className="text-[8px] text-gray-500 uppercase">{tx.category}</span>
                </div>
              </div>
              <span className={`font-mono font-semibold shrink-0 ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                {tx.type === 'income' ? '+' : ''}${tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Quran Ayah Generator Screen
const QuranAyahScreen = ({ t }: { t: (key: string) => string }) => {
  const ayahs = [
    { text: t('projects.quranAyahGenerator.ayahText1'), translation: t('projects.quranAyahGenerator.ayahTranslation1') },
    { text: t('projects.quranAyahGenerator.ayahText2'), translation: t('projects.quranAyahGenerator.ayahTranslation2') },
    { text: t('projects.quranAyahGenerator.ayahText3'), translation: t('projects.quranAyahGenerator.ayahTranslation3') },
  ];

  const [index, setIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const generateNew = () => {
    let nextIndex = Math.floor(Math.random() * ayahs.length);
    if (nextIndex === index) {
      nextIndex = (index + 1) % ayahs.length;
    }
    setIndex(nextIndex);
    setIsFavorite(false);
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans p-4 select-none justify-between text-left" dir="ltr">
      <div className="flex-1 flex flex-col justify-between">
        <div className="text-center font-bold text-sm mb-2 text-purple-400 font-mono tracking-wider shrink-0">
          QURAN GENERATOR
        </div>

        {/* Ayah Display Container */}
        <div className="flex-1 bg-slate-900 border border-purple-500/20 rounded-xl p-4 flex flex-col justify-center items-center gap-3 text-center relative overflow-hidden shadow-inner my-2">
          <div className="absolute inset-0 bg-purple-500/5 pointer-events-none" />
          
          <div className="text-lg font-serif text-amber-200/90 leading-loose text-center px-1 font-medium overflow-y-auto max-h-[120px] scrollbar-none" dir="rtl">
            {ayahs[index].text}
          </div>

          <div className="w-8 h-0.5 bg-amber-400/30 my-0.5 shrink-0" />

          <div className="text-[10px] text-gray-300 italic px-1 overflow-y-auto max-h-[80px] scrollbar-none leading-relaxed">
            "{ayahs[index].translation}"
          </div>

          {/* Sound animation */}
          {isPlaying && (
            <div className="flex gap-1 items-center justify-center h-3 shrink-0">
              {[1, 2, 3, 4, 5].map((i) => (
                <span 
                  key={i} 
                  className="w-0.5 bg-purple-400 rounded-full animate-bounce"
                  style={{ 
                    height: `${Math.floor(Math.random() * 8) + 4}px`, 
                    animationDuration: `${0.3 + i * 0.08}s` 
                  }} 
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 shrink-0">
        <div className="flex gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border text-[10px] font-semibold transition-all ${
              isPlaying 
                ? 'bg-purple-600/20 border-purple-500 text-purple-400' 
                : 'bg-slate-900 border-slate-800 text-white hover:border-purple-500/20'
            }`}
          >
            {isPlaying ? <Pause size={10} /> : <Play size={10} />}
            {isPlaying ? t('projects.quranAyahGenerator.pause').split(' ')[0] : t('projects.quranAyahGenerator.play').split(' ')[0]}
          </button>
          
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`px-3 py-2 rounded-xl border text-[10px] transition-all ${
              isFavorite 
                ? 'bg-red-500/10 border-red-500/30 text-red-500' 
                : 'bg-slate-900 border-slate-800 text-gray-400 hover:border-red-500/20'
            }`}
          >
            <Heart size={10} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <button
          onClick={generateNew}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-xl text-[10px] font-bold font-mono tracking-wider transition-all shadow-md shadow-purple-900/10"
        >
          ✨ {t('projects.quranAyahGenerator.generate')}
        </button>
      </div>
    </div>
  );
};

// 4. Numerical Analysis Calc Screen
const NumericalAnalysisScreen = ({ t }: { t: (key: string) => string }) => {
  const [eq, setEq] = React.useState('x^3 - x - 2');
  const [x0, setX0] = React.useState('1.5');
  const [results, setResults] = React.useState<any[]>([]);

  const calculateRoot = () => {
    let startVal = parseFloat(x0);
    if (isNaN(startVal)) startVal = 1.5;

    const iterations = [];
    let x = startVal;
    
    const f = (val: number) => {
      if (eq.includes('cos')) return Math.cos(val) - val;
      if (eq.includes('x^2')) return val * val - 4;
      return val * val * val - val - 2;
    };

    const df = (val: number) => {
      if (eq.includes('cos')) return -Math.sin(val) - 1;
      if (eq.includes('x^2')) return 2 * val;
      return 3 * val * val - 1;
    };

    for (let i = 0; i < 4; i++) {
      const fx = f(x);
      const fpx = df(x);
      if (Math.abs(fpx) < 1e-9) break;
      const xNext = x - fx / fpx;
      const err = Math.abs(xNext - x);
      iterations.push({
        iter: i + 1,
        val: x.toFixed(4),
        fx: fx.toFixed(4),
        err: err.toFixed(4)
      });
      x = xNext;
    }
    setResults(iterations);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans p-3 select-none justify-between text-left" dir="ltr">
      <div>
        <div className="text-center font-bold text-sm mb-2 text-cyan-400 font-mono tracking-wider">
          NUMERICAL ANALYSIS
        </div>

        {/* Inputs */}
        <div className="space-y-1 bg-slate-900 p-2 rounded-xl border border-slate-800 text-[10px] mb-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-mono uppercase">{t('projects.numericalAnalysisCalc.equation')}</span>
            <select 
              value={eq} 
              onChange={(e) => { setEq(e.target.value); setResults([]); }}
              className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 outline-none text-cyan-300 font-mono text-[9px]"
            >
              <option value="x^3 - x - 2">x³ - x - 2 = 0</option>
              <option value="cos(x) - x">cos(x) - x = 0</option>
              <option value="x^2 - 4">x² - 4 = 0</option>
            </select>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-slate-850">
            <span className="text-gray-500 font-mono">x₀ (Guess)</span>
            <input
              type="number"
              step="0.1"
              value={x0}
              onChange={(e) => { setX0(e.target.value); setResults([]); }}
              className="w-16 bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 outline-none text-white text-right font-mono text-[9px]"
            />
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-5 gap-1 mb-2 text-[9px]">
          {['x', '^', 'sin', 'C', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+', 'Solve'].map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === 'Solve') calculateRoot();
                else if (btn === 'C') setResults([]);
              }}
              className={`py-1 rounded font-mono transition-colors text-center ${
                btn === 'Solve' 
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white font-bold' 
                  : btn === 'C'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/20'
                    : 'bg-slate-900 border border-slate-800 text-gray-300 hover:bg-slate-800'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Iteration table */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col min-h-0 text-[9px]">
        <div className="bg-slate-800 px-2 py-1 font-semibold text-[8px] uppercase tracking-wider text-cyan-400 font-mono">
          {t('projects.numericalAnalysisCalc.method')}
        </div>
        <div className="flex-1 overflow-y-auto p-1 text-[8px]">
          {results.length > 0 ? (
            <table className="w-full text-left font-mono">
              <thead>
                <tr className="text-gray-500 border-b border-slate-800">
                  <th className="py-0.5">{t('projects.numericalAnalysisCalc.iteration')}</th>
                  <th className="py-0.5">x_n</th>
                  <th className="py-0.5">f(x_n)</th>
                  <th className="py-0.5">{t('projects.numericalAnalysisCalc.error')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-gray-300">
                {results.map((row) => (
                  <tr key={row.iter}>
                    <td className="py-1 text-cyan-400 font-bold">{row.iter}</td>
                    <td className="py-1">{row.val}</td>
                    <td className="py-1">{row.fx}</td>
                    <td className="py-1 text-amber-400">{row.err}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-center py-4">
              Enter inputs and click Solve
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 5. Library System Screen
const LibrarySystemScreen = ({ t }: { t: (key: string) => string }) => {
  const [books, setBooks] = React.useState<any[]>([
    { id: 1, key: 'book1', status: 'available' },
    { id: 2, key: 'book2', status: 'borrowed' },
    { id: 3, key: 'book3', status: 'available' },
    { id: 4, key: 'book4', status: 'available' },
  ]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const toggleLoan = (id: number) => {
    setBooks(books.map(book => {
      if (book.id === id) {
        return {
          ...book,
          status: book.status === 'available' ? 'borrowed' : 'available'
        };
      }
      return book;
    }));
  };

  const total = books.length;
  const borrowed = books.filter(b => b.status === 'borrowed').length;
  const available = total - borrowed;

  const filteredBooks = books.filter(book => 
    t(`projects.librarySystem.${book.key}`).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans p-4 select-none justify-between text-left" dir="ltr">
      <div>
        <div className="text-center font-bold text-sm mb-3 text-emerald-400 font-mono tracking-wider">
          LIBRARY CATALOG
        </div>

        {/* Library Stats */}
        <div className="grid grid-cols-3 gap-1 bg-slate-900/60 border border-slate-800 p-2 rounded-xl mb-2 text-center text-[10px]">
          <div>
            <span className="text-gray-500 text-[8px] uppercase block">Total</span>
            <span className="font-bold font-mono text-white">{total}</span>
          </div>
          <div>
            <span className="text-gray-500 text-[8px] uppercase block">{t('projects.librarySystem.status').split(' ')[0]}</span>
            <span className="font-bold font-mono text-emerald-400">{available}</span>
          </div>
          <div>
            <span className="text-gray-500 text-[8px] uppercase block font-sans">Out</span>
            <span className="font-bold font-mono text-amber-500">{borrowed}</span>
          </div>
        </div>

        {/* Search */}
        <div className="mb-2 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('projects.librarySystem.search')}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-6 pr-2 py-1 text-[10px] text-white outline-none focus:border-emerald-500 min-w-0"
          />
          <Search size={10} className="absolute left-2 top-2 text-gray-500" />
        </div>

        {/* List */}
        <div className="space-y-1.5 overflow-y-auto max-h-[190px] scrollbar-none pr-1 text-[10px]">
          {filteredBooks.map((book) => (
            <div key={book.id} className="flex justify-between items-center p-2 rounded-lg bg-slate-900 border border-slate-800/80">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-xs shrink-0">📚</span>
                <div className="min-w-0">
                  <span className="font-medium block leading-tight truncate max-w-[120px]">{t(`projects.librarySystem.${book.key}`)}</span>
                  <span className={`text-[7px] font-semibold uppercase ${
                    book.status === 'available' ? 'text-emerald-400' : 'text-amber-500'
                  }`}>
                    {book.status === 'available' ? t('projects.librarySystem.available') : t('projects.librarySystem.borrowed')}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleLoan(book.id)}
                className={`px-2 py-0.5 rounded text-[8px] font-semibold transition-colors shrink-0 ${
                  book.status === 'available'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {book.status === 'available' ? t('projects.librarySystem.borrow') : t('projects.librarySystem.return')}
              </button>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <div className="text-center text-[10px] text-gray-500 py-6">
              No books found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 5. Live Flutter Sandbox Screen
interface SandboxScreenProps {
  language: Language;
}

const SandboxScreen = ({ language }: SandboxScreenProps) => {
  const [padding, setPadding] = React.useState<number>(12);
  const [borderRadius, setBorderRadius] = React.useState<number>(12);
  const [fontSize, setFontSize] = React.useState<number>(12);
  const [bgColor, setBgColor] = React.useState<string>('cyan');
  const [shadow, setShadow] = React.useState<'none' | 'soft' | 'glow'>('soft');

  const bgColorsMap: Record<string, string> = {
    cyan: 'bg-cyan-500 text-black',
    emerald: 'bg-emerald-500 text-black',
    purple: 'bg-purple-500 text-white',
    amber: 'bg-amber-500 text-black',
  };

  const flutterBgColor = bgColor === 'cyan' ? 'Colors.cyan' : bgColor === 'emerald' ? 'Colors.green' : bgColor === 'purple' ? 'Colors.purple' : 'Colors.amber';
  const flutterShadow = shadow === 'none' ? 'null' : shadow === 'soft' ? 'BoxShadow(color: Colors.black26, blurRadius: 4)' : 'BoxShadow(color: Colors.cyan.withOpacity(0.5), blurRadius: 10)';

  const generatedCode = `Container(
  padding: EdgeInsets.all(${padding}.0),
  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(${borderRadius}.0),
    color: ${flutterBgColor},
    boxShadow: [${flutterShadow}],
  ),
  child: Text(
    "Flutter Playground",
    style: TextStyle(
      fontSize: ${fontSize}.0,
      fontWeight: FontWeight.bold,
    ),
  ),
)`;

  const sandboxTitle = language === 'ar' ? 'ملعب الفلاتر الحي' : 'Flutter Live Sandbox';

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white p-3.5 select-none justify-between text-left font-mono text-[8px] sm:text-[9px]" dir="ltr">
      <div className="space-y-3 flex-1 flex flex-col justify-start">
        <div className="text-center font-bold text-[10px] text-cyan-400 uppercase tracking-widest shrink-0">
          {sandboxTitle}
        </div>

        {/* Live Preview Area */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-center min-h-[75px] shrink-0">
          <div 
            className={`transition-all duration-200 ${bgColorsMap[bgColor]}`}
            style={{
              padding: `${padding}px`,
              borderRadius: `${borderRadius}px`,
              fontSize: `${fontSize}px`,
              fontWeight: 'bold',
              boxShadow: shadow === 'none' ? 'none' : shadow === 'soft' ? '0 4px 6px rgba(0,0,0,0.3)' : `0 0 12px var(--color-primary)`,
            }}
          >
            Flutter Live!
          </div>
        </div>

        {/* Sliders Control Board */}
        <div className="space-y-1.5 shrink-0 bg-slate-900/60 p-2 rounded-xl border border-slate-800/40 text-[7px] sm:text-[8px]">
          {/* Padding Slider */}
          <div className="flex items-center justify-between gap-1">
            <span className="text-gray-400">Padding:</span>
            <input 
              type="range" 
              min="4" 
              max="24" 
              value={padding} 
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-20 accent-cyan-500 h-1 rounded" 
            />
            <span className="w-4 text-right font-bold">{padding}</span>
          </div>

          {/* Border Radius Slider */}
          <div className="flex items-center justify-between gap-1">
            <span className="text-gray-400">Radius:</span>
            <input 
              type="range" 
              min="0" 
              max="24" 
              value={borderRadius} 
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-20 accent-cyan-500 h-1 rounded" 
            />
            <span className="w-4 text-right font-bold">{borderRadius}</span>
          </div>

          {/* Font Size Slider */}
          <div className="flex items-center justify-between gap-1">
            <span className="text-gray-400">Font:</span>
            <input 
              type="range" 
              min="10" 
              max="20" 
              value={fontSize} 
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-20 accent-cyan-500 h-1 rounded" 
            />
            <span className="w-4 text-right font-bold">{fontSize}</span>
          </div>

          {/* Color Switcher */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Color:</span>
            <div className="flex gap-1">
              {['cyan', 'emerald', 'purple', 'amber'].map((c) => (
                <button 
                  key={c} 
                  onClick={() => setBgColor(c)}
                  className={`w-3 h-3 rounded-full border transition-all ${c === 'cyan' ? 'bg-cyan-500' : c === 'emerald' ? 'bg-emerald-500' : c === 'purple' ? 'bg-purple-500' : 'bg-amber-500'} ${bgColor === c ? 'border-white scale-110 shadow-[0_0_4px_rgba(255,255,255,0.8)]' : 'border-transparent'}`}
                />
              ))}
            </div>
          </div>

          {/* Shadow Selector */}
          <div className="flex items-center justify-between mt-1">
            <span className="text-gray-400">Shadow:</span>
            <div className="flex gap-1">
              {(['none', 'soft', 'glow'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setShadow(s)}
                  className={`px-1 py-0.5 rounded text-[6px] font-bold border uppercase transition-all ${shadow === s ? 'border-cyan-450 text-cyan-400 bg-cyan-500/10' : 'border-slate-800 text-gray-500 hover:text-gray-300'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generated Code Window */}
        <div className="flex-1 min-h-[70px] overflow-y-auto bg-black/60 border border-slate-805 rounded-xl p-2 font-mono text-[7px] text-emerald-400 scrollable-container relative">
          <span className="absolute top-1 right-2 text-[5px] text-gray-600 select-none">CODE OUTPUT</span>
          <pre className="whitespace-pre-wrap">{generatedCode}</pre>
        </div>
      </div>
    </div>
  );
};

// 6. Live DevTools Screen
interface DevToolsScreenProps {
  language: Language;
}

const DevToolsScreen = ({ language }: DevToolsScreenProps) => {
  const [activeTab, setActiveTab] = React.useState<'base64' | 'json' | 'palette'>('base64');
  const [b64Input, setB64Input] = React.useState('');
  const [b64Output, setB64Output] = React.useState('');
  const [jsonInput, setJsonInput] = React.useState('');
  const [jsonOutput, setJsonOutput] = React.useState('');
  const [jsonError, setJsonError] = React.useState('');
  const [colors, setColors] = React.useState<string[]>(['#06b6d4', '#10b981', '#a855f7', '#f59e0b', '#ef4444']);

  const handleB64Encode = () => {
    try {
      setB64Output(btoa(b64Input));
    } catch (_) {
      setB64Output('Encoding Error: Invalid character set.');
    }
  };

  const handleB64Decode = () => {
    try {
      setB64Output(atob(b64Input));
    } catch (_) {
      setB64Output('Decoding Error: Invalid Base64 string.');
    }
  };

  const handleJsonFormat = () => {
    setJsonError('');
    try {
      if (!jsonInput.trim()) {
        setJsonOutput('');
        return;
      }
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (e: any) {
      setJsonError(e.message || 'JSON Parse Error');
      setJsonOutput('');
    }
  };

  const generateRandomPalette = () => {
    const letters = '0123456789ABCDEF';
    const newColors = Array.from({ length: 5 }, () => {
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    });
    setColors(newColors);
  };

  const isAr = language === 'ar';

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white p-3 select-none justify-between text-left font-mono text-[8px] sm:text-[9px]" dir="ltr">
      <div className="space-y-3 flex-1 flex flex-col justify-start">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl shrink-0 text-center font-bold text-[7px]">
          {(['base64', 'json', 'palette'] as const).map((tab) => {
            const label = tab === 'base64' 
              ? (isAr ? 'ترميز' : 'Base64') 
              : tab === 'json' 
              ? (isAr ? 'تنسيق' : 'JSON') 
              : (isAr ? 'ألوان' : 'Palette');
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-1 rounded-lg uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto">
          {activeTab === 'base64' && (
            <div className="space-y-2 flex-1 flex flex-col justify-between">
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-gray-400 uppercase text-[7px]">
                  {isAr ? 'النص المدخل' : 'Input Text'}
                </span>
                <input
                  type="text"
                  value={b64Input}
                  onChange={(e) => setB64Input(e.target.value)}
                  placeholder={isAr ? 'اكتب هنا...' : 'Type anything...'}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[8px] text-white outline-none focus:border-cyan-500 min-w-0"
                />
              </div>

              <div className="flex gap-2">
                <button onClick={handleB64Encode} className="flex-1 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 font-bold text-white uppercase text-[7px]">
                  {isAr ? 'تشفير' : 'Encode'}
                </button>
                <button onClick={handleB64Decode} className="flex-1 py-1.5 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10 font-bold text-cyan-400 uppercase text-[7px]">
                  {isAr ? 'فك التشفير' : 'Decode'}
                </button>
              </div>

              <div className="flex flex-col gap-1 mt-1 min-h-[75px] flex-1">
                <span className="text-gray-400 uppercase text-[7px]">
                  {isAr ? 'النتيجة' : 'Output'}
                </span>
                <div className="flex-1 bg-black/60 border border-slate-850 p-2 rounded-xl text-emerald-400 font-mono text-[7px] break-all select-text overflow-y-auto max-h-[75px] scrollable-container">
                  {b64Output || <span className="text-gray-600 italic">{isAr ? 'لا يوجد مخرجات...' : 'No output...'}</span>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-2 flex-1 flex flex-col justify-between">
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-gray-400 uppercase text-[7px]">
                  {isAr ? 'ألصق الـ JSON هنا' : 'Paste raw JSON'}
                </span>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"name": "Mohamed"}'
                  className="flex-1 min-h-[60px] bg-slate-900 border border-slate-800 rounded-lg p-2 text-[7px] text-white outline-none focus:border-cyan-500 min-w-0 resize-none font-mono scrollable-container"
                />
              </div>

              <button onClick={handleJsonFormat} className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 font-bold text-white uppercase text-[7px] shrink-0">
                {isAr ? 'تنسيق النص' : 'Format JSON'}
              </button>

              <div className="flex flex-col gap-1 mt-1 min-h-[75px] flex-1">
                <span className="text-gray-400 uppercase text-[7px]">
                  {isAr ? 'النتيجة' : 'Result'}
                </span>
                {jsonError ? (
                  <div className="flex-1 bg-red-950/20 border border-red-500/20 p-2 rounded-xl text-red-400 text-[7px] font-mono break-words overflow-y-auto max-h-[75px] scrollable-container">
                    ⚠️ {jsonError}
                  </div>
                ) : (
                  <div className="flex-1 bg-black/60 border border-slate-850 p-2 rounded-xl text-emerald-400 font-mono text-[7px] whitespace-pre-wrap select-text overflow-y-auto max-h-[75px] scrollable-container">
                    {jsonOutput || <span className="text-gray-600 italic">{isAr ? 'مخرجات منسقة...' : 'JSON output...'}</span>}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'palette' && (
            <div className="space-y-3 flex-1 flex flex-col justify-center">
              <span className="text-gray-400 uppercase text-[7px] text-center">
                {isAr ? 'لوحة ألوان عشوائية' : 'Random Palette'}
              </span>
              <div className="grid grid-cols-5 gap-1.5 bg-slate-900 border border-slate-850 p-2.5 rounded-xl shadow-inner">
                {colors.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 hover:scale-105 transition-transform">
                    <div className="w-6 h-10 rounded-md shadow-md" style={{ backgroundColor: color }} />
                    <span className="text-[6px] text-gray-400 font-bold select-text uppercase">{color}</span>
                  </div>
                ))}
              </div>

              <button onClick={generateRandomPalette} className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 font-bold text-white uppercase text-[7px] tracking-wide shadow-md">
                {isAr ? 'توليد ألوان جديدة 🎨' : 'Generate Colors 🎨'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 6. Bank System Screen
const BankSystemScreen = ({ t }: { t: (key: string) => string }) => {
  const [balance, setBalance] = React.useState(5420.50);
  const [txs, setTxs] = React.useState<any[]>([
    { id: 1, key: 'salary', amount: 3200, type: 'credit' },
    { id: 2, key: 'rent', amount: -650, type: 'debit' },
    { id: 3, key: 'invest', amount: -150, type: 'debit' },
  ]);
  const [recipient, setRecipient] = React.useState('Ahmed');
  const [amount, setAmount] = React.useState('150');

  const handleSendMoney = (e: React.FormEvent) => {
    e.preventDefault();
    const sendVal = parseFloat(amount);
    if (isNaN(sendVal) || sendVal <= 0 || sendVal > balance) return;
    setBalance(prev => prev - sendVal);
    setTxs([{ id: Date.now(), recipient, amount: -sendVal, type: 'debit' }, ...txs]);
    setAmount('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans p-4 select-none justify-between text-left" dir="ltr">
      <div>
        <div className="text-center font-bold text-sm mb-3 text-cyan-400 font-mono tracking-wider">
          FINTECH BANK
        </div>

        {/* Simulated Premium Card */}
        <div className="bg-gradient-to-tr from-cyan-600 via-blue-700 to-indigo-800 p-3 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between h-24 mb-3 border border-cyan-400/20 shrink-0">
          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[7px] uppercase tracking-wider text-cyan-200 block">{t('projects.bankSystem.balance')}</span>
              <span className="text-sm font-bold font-mono">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <span className="text-sm">💳</span>
          </div>
          <div className="flex justify-between items-end text-[8px] font-mono text-cyan-100">
            <div>
              <span className="text-[6px] text-cyan-300 block uppercase">{t('projects.bankSystem.cardHolder')}</span>
              <span>MOHAMED ESSAM</span>
            </div>
            <span className="tracking-widest">•••• 8818</span>
          </div>
        </div>

        {/* Transfer form */}
        <form onSubmit={handleSendMoney} className="bg-slate-900 border border-slate-800 p-2 rounded-xl mb-3 flex flex-col gap-1 text-[10px] shrink-0">
          <div className="font-semibold text-cyan-400 font-mono uppercase text-[8px] mb-0.5">{t('projects.bankSystem.transfer')}</div>
          <div className="flex gap-1.5">
            <select 
              value={recipient} 
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 outline-none text-white text-[9px] flex-1 min-w-0"
            >
              <option value="Ahmed">Ahmed</option>
              <option value="Sarah">Sarah</option>
              <option value="John">John</option>
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 outline-none text-white w-14 text-right font-mono text-[9px] min-w-0"
            />
            <button 
              type="submit" 
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-2 py-0.5 rounded text-[9px] transition-colors shrink-0"
            >
              {t('projects.bankSystem.send').split(' ')[0]}
            </button>
          </div>
        </form>

        {/* Transaction list */}
        <div className="text-[8px] font-mono text-gray-500 uppercase tracking-wider mb-1">{t('projects.bankSystem.transactions')}</div>
        <div className="space-y-1.5 overflow-y-auto max-h-[90px] scrollbar-none pr-1 text-[10px]">
          {txs.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-1.5 rounded bg-slate-900 border border-slate-800/80">
              <div className="min-w-0">
                <span className="font-medium block leading-tight truncate max-w-[100px]">
                  {tx.key ? t(`projects.bankSystem.${tx.key}`) : `Transfer to ${tx.recipient}`}
                </span>
                <span className="text-[7px] text-gray-500 uppercase font-mono">{tx.type}</span>
              </div>
              <span className={`font-mono font-semibold shrink-0 ${
                tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 7. Live DSA Algorithm Visualizer Screen
// ----------------------------------------------------
interface DsaScreenProps {
  language: Language;
}

const DsaScreen = ({ language }: DsaScreenProps) => {
  const isAr = language === 'ar';
  const [array, setArray] = React.useState<number[]>([15, 38, 22, 49, 11, 31, 8]);
  const [algo, setAlgo] = React.useState<'bubble' | 'binary'>('bubble');
  const [activeIndex, setActiveIndex] = React.useState<number[]>([]);
  const [isSorting, setIsSorting] = React.useState(false);
  const [binaryRange, setBinaryRange] = React.useState({ left: 0, right: 6, mid: -1 });

  const resetArray = () => {
    setArray([15, 38, 22, 49, 11, 31, 8]);
    setActiveIndex([]);
    setIsSorting(false);
    setBinaryRange({ left: 0, right: 6, mid: -1 });
  };

  const stepBubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndex([j, j + 1]);
        await new Promise((r) => setTimeout(r, 450));
        if (arr[j] > arr[j + 1]) {
          const tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          setArray([...arr]);
        }
      }
    }
    setActiveIndex([]);
    setIsSorting(false);
  };

  const stepBinarySearch = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const sorted = [...array].sort((a, b) => a - b);
    setArray(sorted);
    let left = 0;
    let right = sorted.length - 1;
    const target = 31;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setBinaryRange({ left, right, mid });
      setActiveIndex([mid]);
      await new Promise((r) => setTimeout(r, 1000));

      if (sorted[mid] === target) {
        break;
      } else if (sorted[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    setIsSorting(false);
  };

  return (
    <div className="w-full h-full bg-slate-950 p-4 font-mono text-white text-left flex flex-col justify-between select-none">
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-cyan-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
          <span>{isAr ? '🎮 محاكي الخوارزميات' : 'DSA Visualizer'}</span>
          <span className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase">V1.0</span>
        </h3>

        <div className="flex gap-1.5">
          <button
            onClick={() => { setAlgo('bubble'); resetArray(); }}
            className={`flex-1 text-[9px] py-1 px-2 rounded border transition-all ${
              algo === 'bubble' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold' : 'border-slate-800 bg-slate-900 text-slate-400'
            }`}
          >
            {isAr ? 'فرز فقاعي' : 'Bubble Sort'}
          </button>
          <button
            onClick={() => { setAlgo('binary'); resetArray(); }}
            className={`flex-1 text-[9px] py-1 px-2 rounded border transition-all ${
              algo === 'binary' ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold' : 'border-slate-800 bg-slate-900 text-slate-400'
            }`}
          >
            {isAr ? 'بحث ثنائي' : 'Binary Search'}
          </button>
        </div>

        <div className="h-28 border border-slate-800 bg-slate-900/40 rounded-xl flex items-end justify-center gap-2 p-3">
          {array.map((val, idx) => {
            const isComparing = activeIndex.includes(idx);
            const isMid = algo === 'binary' && binaryRange.mid === idx;
            const inRange = algo === 'binary' && idx >= binaryRange.left && idx <= binaryRange.right;

            let barColor = 'bg-slate-700';
            if (isComparing) barColor = 'bg-amber-500 shadow-[0_0_8px_#f59e0b]';
            if (isMid) barColor = 'bg-emerald-500 shadow-[0_0_8px_#10b981]';
            else if (algo === 'binary' && !inRange) barColor = 'bg-slate-850 opacity-25';

            return (
              <div key={idx} className="flex flex-col items-center flex-1">
                <span className="text-[7px] text-gray-400 mb-1">{val}</span>
                <div
                  className={`w-full rounded-t-sm transition-all duration-300 ${barColor}`}
                  style={{ height: `${val * 1.5}px` }}
                />
                <span className="text-[6px] text-gray-500 mt-1">{idx}</span>
              </div>
            );
          })}
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[8px] sm:text-[9px] text-slate-400 leading-relaxed min-h-[60px]">
          {algo === 'bubble' ? (
            isSorting 
              ? (isAr ? 'مقارنة العناصر المتجاورة وتبديلها إذا كانت بالترتيب الخاطئ...' : 'Comparing adjacent values and swapping them if out of order...')
              : (isAr ? 'الفرز الفقاعي يقارن العناصر المتجاورة ويكرر ذلك حتى تترتب بالكامل.' : 'Bubble Sort works by repeatedly swapping adjacent elements if they are in the wrong order.')
          ) : (
            isSorting
              ? `Range: [${binaryRange.left} to ${binaryRange.right}]. Midpoint at index ${binaryRange.mid} (value: ${array[binaryRange.mid]}). Searching for 31...`
              : (isAr ? 'البحث الثنائي يتطلب مصفوفة مرتبة ويقسم النطاق إلى النصف في كل خطوة.' : 'Binary Search divides search interval in half. Requires sorted array.')
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={algo === 'bubble' ? stepBubbleSort : stepBinarySearch}
          disabled={isSorting}
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-black font-bold py-1.5 px-3 rounded-lg text-[10px] uppercase tracking-wider text-center transition-all active:scale-95"
        >
          {isSorting ? (isAr ? 'جاري الفرز...' : 'Running...') : (isAr ? 'تشغيل' : 'Animate')}
        </button>
        <button
          onClick={resetArray}
          className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold py-1.5 px-3 rounded-lg text-[10px] uppercase transition-all active:scale-95"
        >
          {isAr ? 'إعادة' : 'Reset'}
        </button>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 8. Live Programmer Memory Match Screen
// ----------------------------------------------------
interface MemoryScreenProps {
  language: Language;
}

interface Card {
  id: number;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryScreen = ({ language }: MemoryScreenProps) => {
  const isAr = language === 'ar';
  
  const getInitialCards = (): Card[] => {
    const items = ['Flutter', 'Dart', 'C++', 'SQL', 'Git', 'React'];
    const doubled = [...items, ...items];
    return doubled
      .map((item, idx) => ({ id: idx, label: item, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = React.useState<Card[]>(getInitialCards());
  const [selected, setSelected] = React.useState<number[]>([]);
  const [moves, setMoves] = React.useState(0);
  const [victory, setVictory] = React.useState(false);

  const resetGame = () => {
    setCards(getInitialCards());
    setSelected([]);
    setMoves(0);
    setVictory(false);
  };

  const handleCardClick = (id: number) => {
    if (victory || selected.length >= 2) return;
    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    const updated = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
    setCards(updated);

    const newSelected = [...selected, id];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves(m => m + 1);
      const first = cards.find(c => c.id === newSelected[0])!;
      const second = cards.find(c => c.id === newSelected[1])!;

      if (first.label === second.label) {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.id === newSelected[0] || c.id === newSelected[1] ? { ...c, isMatched: true } : c));
          setSelected([]);
          if (updated.every(c => c.isMatched || c.id === newSelected[0] || c.id === newSelected[1])) {
            setVictory(true);
            triggerAchievement('pro-gamer');
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.id === newSelected[0] || c.id === newSelected[1] ? { ...c, isFlipped: false } : c));
          setSelected([]);
        }, 900);
      }
    }
  };

  return (
    <div className="w-full h-full bg-slate-950 p-4 font-mono text-white text-left flex flex-col justify-between select-none">
      <div className="space-y-3 max-w-md mx-auto w-full">
        <h3 className="text-xs font-bold text-purple-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
          <span>{isAr ? '🎮 لعبة الذاكرة البرمجية' : 'Code Memory Match'}</span>
          <span className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">MOVES: {moves}</span>
        </h3>

        {victory ? (
          <div className="h-60 flex flex-col items-center justify-center text-center space-y-3 border border-purple-500/30 rounded-xl bg-purple-500/5 animate-pulse">
            <span className="text-3xl animate-bounce">🏆</span>
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest">{isAr ? 'مبروك الفوز!' : 'Victory Unlocked!'}</h4>
            <p className="text-[8px] text-gray-400 px-4">
              {isAr ? `أكملت اللعبة في ${moves} خطوة بنجاح.` : `Completed the programmer memory board in ${moves} moves.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {cards.map((card) => {
              const show = card.isFlipped || card.isMatched;
              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`h-16 rounded-xl flex items-center justify-center border cursor-pointer font-bold text-[10px] transition-all duration-300 ${
                    show
                      ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                      : 'border-slate-800 bg-slate-900 hover:border-slate-600 text-slate-600'
                  }`}
                >
                  {show ? card.label : '?'}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={resetGame}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 px-3 rounded-lg text-[10px] uppercase tracking-wider text-center transition-all active:scale-95 mt-auto max-w-md mx-auto"
      >
        {isAr ? 'إعادة تشغيل اللعبة' : 'Restart Game'}
      </button>
    </div>
  );
};

// ----------------------------------------------------
// 9. Live Pixel Art Avatar Customizer Screen
// ----------------------------------------------------
interface AvatarScreenProps {
  language: Language;
}

const AvatarScreen = ({ language }: AvatarScreenProps) => {
  const isAr = language === 'ar';
  const [grid, setGrid] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('custom-avatar-pixels');
    if (saved) return JSON.parse(saved);
    return Array(64).fill('#1e293b');
  });

  const [activeColor, setActiveColor] = React.useState('#06b6d4');
  const palette = ['#06b6d4', '#10b981', '#a855f7', '#f59e0b', '#ef4444', '#ffffff', '#1e293b'];

  const handleCellClick = (idx: number) => {
    const nextGrid = [...grid];
    nextGrid[idx] = activeColor;
    setGrid(nextGrid);
    localStorage.setItem('custom-avatar-pixels', JSON.stringify(nextGrid));
  };

  const clearCanvas = () => {
    const nextGrid = Array(64).fill('#1e293b');
    setGrid(nextGrid);
    localStorage.setItem('custom-avatar-pixels', JSON.stringify(nextGrid));
  };

  const syncMascot = () => {
    triggerAchievement('sandbox-pro');
    const event = new CustomEvent('avatar-synced', { detail: { grid } });
    window.dispatchEvent(event);
    alert(isAr ? 'تمت مزامنة الأفاتار المخصص بنجاح!' : 'Custom Avatar Mascots synced successfully!');
  };

  return (
    <div className="w-full h-full bg-slate-950 p-4 font-mono text-white text-left flex flex-col justify-between select-none">
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-emerald-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
          <span>{isAr ? '🎨 مصمم الأفاتار البيكسلي' : 'Pixel Art Avatar'}</span>
          <span className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">8X8 GRID</span>
        </h3>

        <div className="grid grid-cols-8 gap-0.5 p-1 bg-slate-900 border border-slate-800 rounded-xl max-w-[210px] mx-auto">
          {grid.map((color, idx) => (
            <div
              key={idx}
              onClick={() => handleCellClick(idx)}
              className="w-6 h-6 border border-black/20 cursor-pointer transition-all duration-150 hover:opacity-80"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex justify-center gap-1.5 border-t border-slate-800/40 pt-3">
          {palette.map((color) => {
            const isActive = activeColor === color;
            return (
              <div
                key={color}
                onClick={() => setActiveColor(color)}
                className={`w-5 h-5 rounded-full cursor-pointer border transition-all ${
                  isActive ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                }`}
                style={{ backgroundColor: color, boxShadow: isActive ? `0 0 8px ${color}` : '' }}
              />
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={syncMascot}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-1.5 px-3 rounded-lg text-[9px] uppercase tracking-wider text-center transition-all active:scale-95"
        >
          {isAr ? 'مزامنة الأفاتار' : 'Sync Avatar'}
        </button>
        <button
          onClick={clearCanvas}
          className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold py-1.5 px-3 rounded-lg text-[9px] uppercase transition-all active:scale-95"
        >
          {isAr ? 'مسح' : 'Clear'}
        </button>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 10. Live Interview Scheduler Screen
// ----------------------------------------------------
interface SchedulerScreenProps {
  language: Language;
}

const SchedulerScreen = ({ language }: SchedulerScreenProps) => {
  const isAr = language === 'ar';
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
  const [booked, setBooked] = React.useState(false);

  const openDays = [6, 7, 9, 12, 14, 15, 20];
  const timeSlots = ['10:00 AM', '1:00 PM', '4:00 PM'];

  const bookMeeting = () => {
    if (selectedDay === null || !selectedSlot) return;
    setBooked(true);
    
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (_) {}
  };

  return (
    <div className="w-full h-full bg-slate-950 p-4 font-mono text-white text-left flex flex-col justify-between select-none">
      <div className="space-y-3 max-w-md mx-auto w-full">
        <h3 className="text-xs font-bold text-amber-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
          <span>{isAr ? '📅 حجز المقابلات' : 'Schedule Interview'}</span>
          <span className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">JULY 2026</span>
        </h3>

        {booked ? (
          <div className="h-60 flex flex-col items-center justify-center text-center space-y-3 border border-amber-500/30 rounded-xl bg-amber-500/5">
            <span className="text-3xl animate-bounce">🎉</span>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">{isAr ? 'تم الحجز بنجاح!' : 'Meeting Requested!'}</h4>
            <p className="text-[8px] text-gray-400 px-4 leading-relaxed">
              {isAr 
                ? `طلب مقابلة في تاريخ يوليو ${selectedDay} الساعة ${selectedSlot}.\nتم إرسال تنبيه للمطور!`
                : `Interview requested for July ${selectedDay} at ${selectedSlot}.\nMohamed Essam has been notified!`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-7 gap-1 text-center text-[7px] text-slate-500 font-bold border-b border-slate-800/40 pb-1">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              <span></span><span></span><span></span>
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
                const isOpen = openDays.includes(day);
                const isSelected = selectedDay === day;

                return (
                  <button
                    key={day}
                    disabled={!isOpen}
                    onClick={() => { setSelectedDay(day); setSelectedSlot(null); }}
                    className={`w-6 h-6 rounded-full text-[8px] flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-amber-500 text-black font-bold shadow-[0_0_8px_#f59e0b]'
                        : isOpen 
                        ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                        : 'text-slate-700 cursor-not-allowed'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {selectedDay !== null && (
              <div className="space-y-1.5 animate-fadeIn">
                <span className="text-[8px] text-slate-500 uppercase tracking-wider block">Available Slots:</span>
                <div className="flex gap-1.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`flex-1 text-[8px] py-1 px-1 border rounded transition-all ${
                          isSelected 
                            ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {!booked && (
        <button
          onClick={bookMeeting}
          disabled={selectedDay === null || !selectedSlot}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-1.5 px-3 rounded-lg text-[10px] uppercase tracking-wider text-center transition-all active:scale-95 mt-auto max-w-md mx-auto"
        >
          {isAr ? 'تأكيد موعد المقابلة' : 'Book Interview Slot'}
        </button>
      )}
    </div>
  );
};

// ----------------------------------------------------
// MAIN PROJECTS COMPONENT
// ----------------------------------------------------

const Projects = ({ language }: ProjectsProps) => {
  const t = (key: string) => getTranslation(language, key) as string;

  const projects: Project[] = [
    {
      id: 'cyberTaskManager',
      titleKey: 'projects.cyberTaskManager.title',
      descKey: 'projects.cyberTaskManager.description',
      github: 'https://github.com/mohamedessam18',
      tech: ['Flutter', 'Dart', 'BLoC'],
      color: 'purple',
    },
    {
      id: 'numericalAnalysisCalc',
      titleKey: 'projects.numericalAnalysisCalc.title',
      descKey: 'projects.numericalAnalysisCalc.description',
      github: 'https://github.com/mohamedessam18/numerecal2',
      tech: ['Next.js', 'React', 'Math.js'],
      color: 'cyan',
    },
    {
      id: 'expenseTracker',
      titleKey: 'projects.expenseTracker.title',
      descKey: 'projects.expenseTracker.description',
      github: 'https://github.com/mohamedessam18/Expence-Tracker',
      tech: ['HTML', 'CSS', 'JavaScript'],
      color: 'green',
    },
    {
      id: 'quranAyahGenerator',
      titleKey: 'projects.quranAyahGenerator.title',
      descKey: 'projects.quranAyahGenerator.description',
      github: 'https://github.com/mohamedessam18/QURAN-AYAH',
      tech: ['React', 'TypeScript', 'Vite'],
      color: 'purple',
    },
    {
      id: 'bankSystem',
      titleKey: 'projects.bankSystem.title',
      descKey: 'projects.bankSystem.description',
      github: 'https://github.com/mohamedessam18/BankSystem',
      tech: ['C++', 'OOP', 'Frontend'],
      color: 'cyan',
    },
    {
      id: 'librarySystem',
      titleKey: 'projects.librarySystem.title',
      descKey: 'projects.librarySystem.description',
      github: 'https://github.com/mohamedessam18/Library-System',
      tech: ['C++', 'Data Structures', 'CRUD'],
      color: 'green',
    },
  ];

  const [selectedProjectId, setSelectedProjectId] = React.useState<string>('homeScreen');
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [activeLabTab, setActiveLabTab] = React.useState<'dsa' | 'memory' | 'avatar' | 'scheduler'>('dsa');

  // Live clock for simulator status bar
  const [deviceTime, setDeviceTime] = React.useState('09:41');
  React.useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setDeviceTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const activeProjectObj = projects.find(p => p.id === selectedProjectId);
  const mockupColor = activeProjectObj ? activeProjectObj.color : 'cyan';

  // Dynamic Island states
  const [islandText, setIslandText] = React.useState('');
  const [islandIcon, setIslandIcon] = React.useState<string>('');
  const [isIslandActive, setIsIslandActive] = React.useState(false);
  const isInitialRender = React.useRef(true);

  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (selectedProjectId === 'homeScreen') {
      setIslandText(language === 'ar' ? 'الشاشة الرئيسية' : 'Home Screen');
      setIslandIcon('📱');
      setIsIslandActive(true);
      const timer = setTimeout(() => {
        setIsIslandActive(false);
      }, 1500);
      return () => clearTimeout(timer);
    }

    const projectObj = projects.find(p => p.id === selectedProjectId);
    if (projectObj) {
      let msg = '';
      let icon = '';

      switch (selectedProjectId) {
        case 'cyberTaskManager':
          msg = language === 'ar' ? 'تشغيل مدير المهام...' : 'Launching Tasks...';
          icon = '📝';
          break;
        case 'numericalAnalysisCalc':
          msg = language === 'ar' ? 'تشغيل المحلل العددي...' : 'Launching Solver...';
          icon = '🔢';
          break;
        case 'expenseTracker':
          msg = language === 'ar' ? 'تشغيل متعقب المصاريف...' : 'Launching Expense...';
          icon = '💵';
          break;
        case 'quranAyahGenerator':
          msg = language === 'ar' ? 'تحميل مولد الآيات...' : 'Loading Quran Ayah...';
          icon = '📖';
          break;
        case 'bankSystem':
          msg = language === 'ar' ? 'تشغيل النظام البنكي...' : 'Launching Bank...';
          icon = '💳';
          break;
        case 'librarySystem':
          msg = language === 'ar' ? 'تشغيل نظام المكتبة...' : 'Launching Catalog...';
          icon = '📚';
          break;
        case 'sandbox':
          msg = language === 'ar' ? 'تشغيل ملعب الأكواد...' : 'Launching Sandbox...';
          icon = '🧪';
          break;
        case 'devtools':
          msg = language === 'ar' ? 'تشغيل أدوات المطور...' : 'Launching DevTools...';
          icon = '🛠️';
          break;
        case 'dsa':
          msg = language === 'ar' ? 'تشغيل محاكي الخوارزميات...' : 'Launching DSA...';
          icon = '🧠';
          break;
        case 'memory':
          msg = language === 'ar' ? 'تشغيل لعبة الذاكرة...' : 'Launching Memory...';
          icon = '🎮';
          break;
        case 'avatar':
          msg = language === 'ar' ? 'تشغيل مصمم الأفاتار...' : 'Launching Avatar...';
          icon = '🎨';
          break;
        case 'scheduler':
          msg = language === 'ar' ? 'تشغيل حجز المقابلات...' : 'Launching Scheduler...';
          icon = '📅';
          break;
        default:
          msg = 'Running App...';
          icon = '📱';
      }

      setIslandText(msg);
      setIslandIcon(icon);
      setIsIslandActive(true);

      const timer = setTimeout(() => {
        setIsIslandActive(false);
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [selectedProjectId, language]);

  const renderDynamicIsland = () => {
    return (
      <motion.div 
        animate={{
          width: isIslandActive ? 210 : 96,
          height: isIslandActive ? 28 : 22,
          borderRadius: isIslandActive ? 16 : 9999,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-black z-30 flex items-center justify-between px-3 border border-white/10 shadow-inner select-none pointer-events-none overflow-hidden"
      >
        {isIslandActive ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between w-full text-[9px] font-mono text-white/95"
          >
            <span className="text-xs mr-1 shrink-0">{islandIcon}</span>
            <span className="truncate max-w-[140px] font-semibold leading-none">{islandText}</span>
            <span className="flex h-1.5 w-1.5 relative ml-1 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
          </motion.div>
        ) : (
          <div className="w-full h-full relative">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 absolute right-1 top-1/2 -translate-y-1/2 border border-white/5" />
          </div>
        )}
      </motion.div>
    );
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  } as const;

  const colorClasses = {
    cyan: {
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/5',
      hover: 'hover:border-cyan-500/60 hover:bg-cyan-500/10',
      text: 'text-cyan-400',
      shadow: 'hover:shadow-cyan-500/20',
      badge: 'bg-cyan-500/20 text-cyan-300',
    },
    green: {
      border: 'border-green-500/30',
      bg: 'bg-green-500/5',
      hover: 'hover:border-green-500/60 hover:bg-green-500/10',
      text: 'text-green-400',
      shadow: 'hover:shadow-green-500/20',
      badge: 'bg-green-500/20 text-green-300',
    },
    purple: {
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/5',
      hover: 'hover:border-purple-500/60 hover:bg-purple-500/10',
      text: 'text-purple-400',
      shadow: 'hover:shadow-purple-500/20',
      badge: 'bg-purple-500/20 text-purple-300',
    },
  };

  const renderMockupScreen = (projectId: string) => {
    switch (projectId) {
      case 'homeScreen':
        return <HomeScreen onLaunchApp={setSelectedProjectId} language={language} />;
      case 'cyberTaskManager':
        return <CyberTaskScreen t={t} />;
      case 'numericalAnalysisCalc':
        return <NumericalAnalysisScreen t={t} />;
      case 'expenseTracker':
        return <ExpenseTrackerScreen t={t} />;
      case 'quranAyahGenerator':
        return <QuranAyahScreen t={t} />;
      case 'bankSystem':
        return <BankSystemScreen t={t} />;
      case 'librarySystem':
        return <LibrarySystemScreen t={t} />;
      case 'sandbox':
        return <SandboxScreen language={language} />;
      case 'devtools':
        return <DevToolsScreen language={language} />;
      case 'dsa':
        return <DsaScreen language={language} />;
      case 'memory':
        return <MemoryScreen language={language} />;
      case 'avatar':
        return <AvatarScreen language={language} />;
      case 'scheduler':
        return <SchedulerScreen language={language} />;
      default:
        return <HomeScreen onLaunchApp={setSelectedProjectId} language={language} />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-12 text-center dark:text-white light:text-slate-800">
          <span className="dark:text-cyan-400 light:text-cyan-600">&lt;</span>
          {t('projects.title')}
          <span className="dark:text-cyan-400 light:text-cyan-600">/&gt;</span>
        </h2>

        {/* Side-by-Side Flex Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column (55% width) - Vertical List of Project Cards */}
          <motion.div 
            variants={listContainerVariants}
            initial="hidden"
            animate="show"
            className="w-full lg:w-[55%] space-y-4"
          >
            {projects.map((project) => {
              const activeColor = colorClasses[project.color];
              const isSelected = selectedProjectId === project.id;
              
              // Special dynamic border & background highlight classes when selected
              const selectedHighlightClass = isSelected
                ? project.color === 'cyan'
                  ? 'border-cyan-500 dark:border-cyan-400 bg-cyan-500/10 dark:bg-cyan-500/10 shadow-lg scale-[1.01]'
                  : project.color === 'green'
                    ? 'border-green-500 dark:border-green-400 bg-green-500/10 dark:bg-green-500/10 shadow-lg scale-[1.01]'
                    : 'border-purple-500 dark:border-purple-400 bg-purple-500/10 dark:bg-purple-500/10 shadow-lg scale-[1.01]'
                : `border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-900/40 hover:border-gray-300 dark:hover:border-gray-700`;

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  onMouseEnter={() => setSelectedProjectId(project.id)}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`group relative p-5 rounded-xl border transition-all duration-300 cursor-pointer ${selectedHighlightClass}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Folder size={24} className={activeColor.text} />
                      <h3 className="text-base font-mono font-bold dark:text-white light:text-slate-800 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                        {t(project.titleKey)}
                      </h3>
                    </div>
                    
                    {/* GitHub links */}
                    <div className="flex gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-md transition-all dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 light:text-slate-500 light:hover:text-slate-800 light:hover:bg-slate-200/50"
                        aria-label="View on GitHub"
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-md transition-all dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 light:text-slate-500 light:hover:text-slate-800 light:hover:bg-slate-200/50"
                        aria-label="Open project"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs mb-3 leading-relaxed dark:text-gray-400 light:text-slate-600">
                    {t(project.descKey)}
                  </p>

                  {/* Tech stack & Live Preview Mobile Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono ${activeColor.badge}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Mobile Only: Live Preview Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProjectId(project.id);
                        setIsDrawerOpen(true);
                      }}
                      className={`flex items-center gap-1 px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-[10px] font-mono font-bold transition-all lg:hidden shadow-md shadow-cyan-900/10`}
                    >
                      <Smartphone size={10} />
                      Live Preview
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column (45% width) - Sticky phone mockup for desktop */}
          <div className="hidden lg:flex w-full lg:w-[45%] sticky top-24 justify-center items-center">
            
            {/* Phone Container with dynamic ambient glow shadow */}
            <div className={`w-[300px] h-[580px] bg-slate-950 border-[10px] border-slate-900 rounded-[38px] relative shadow-2xl overflow-hidden flex flex-col border-slate-950 dark:border-slate-800 shrink-0 transition-all duration-500 ${
              mockupColor === 'cyan' 
                ? 'shadow-[0_0_35px_rgba(6,182,212,0.15)] dark:shadow-[0_0_45px_rgba(6,182,212,0.25)]' 
                : mockupColor === 'green'
                  ? 'shadow-[0_0_35px_rgba(34,197,94,0.15)] dark:shadow-[0_0_45px_rgba(34,197,94,0.25)]'
                  : 'shadow-[0_0_35px_rgba(168,85,247,0.15)] dark:shadow-[0_0_45px_rgba(168,85,247,0.25)]'
            }`}>
              
              {/* Volume & Lock Side Buttons */}
              <div className="absolute -left-[11px] top-24 w-[2px] h-8 bg-slate-700 dark:bg-slate-800 rounded-r" />
              <div className="absolute -left-[11px] top-36 w-[2px] h-10 bg-slate-700 dark:bg-slate-800 rounded-r" />
              <div className="absolute -left-[11px] top-48 w-[2px] h-10 bg-slate-700 dark:bg-slate-800 rounded-r" />
              <div className="absolute -right-[11px] top-28 w-[2px] h-14 bg-slate-700 dark:bg-slate-800 rounded-l" />

              {/* Dynamic Island Notch */}
              {renderDynamicIsland()}

              {/* Status bar */}
              <div className="flex justify-between items-center px-5 pt-2 pb-1 text-[9px] font-semibold text-white/95 select-none z-20 font-mono shrink-0">
                <span>{deviceTime}</span>
                <div className="flex items-center gap-1 text-[8px]">
                  <span>📶</span>
                  <span>🛜</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Screen Content Wrapper */}
              <div className="flex-1 overflow-hidden relative">
                {renderMockupScreen(selectedProjectId)}
              </div>

              {/* Home indicator bar - Clickable to return to Home Screen */}
              <button 
                onClick={() => setSelectedProjectId('homeScreen')}
                className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 hover:bg-white/50 active:bg-white/80 rounded-full z-20 cursor-pointer transition-colors focus:outline-none"
                aria-label="Go to simulator home"
              />
            </div>
          </div>
        </div>

        {/* Interactive Developer Lab */}
        <div className="mt-20 border dark:border-cyan-500/20 border-slate-300 rounded-3xl dark:bg-black/40 bg-white/40 backdrop-blur-md p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b dark:border-slate-800/40 border-slate-200 pb-5 mb-6">
            <div className="text-left rtl:text-right">
              <h3 className="text-xl sm:text-2xl font-mono font-bold dark:text-white text-slate-800 flex items-center gap-2">
                <span className="text-cyan-400">🧪</span>
                {language === 'ar' ? 'مختبر المطور التفاعلي' : 'Interactive Developer Lab'}
              </h3>
              <p className="text-xs text-gray-500 font-mono mt-1 leading-relaxed">
                {language === 'ar' ? 'مجموعة من التجارب والأدوات التفاعلية المصممة بكود متقن.' : 'A playground of interactive developer utilities and game modules.'}
              </p>
            </div>
            
            {/* Tab buttons selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'dsa', name: language === 'ar' ? 'خوارزميات DSA' : 'DSA Visualizer', icon: Brain, color: 'text-cyan-450' },
                { id: 'memory', name: language === 'ar' ? 'لعبة الذاكرة' : 'Memory Game', icon: Gamepad2, color: 'text-purple-450' },
                { id: 'avatar', name: language === 'ar' ? 'صانع الأفاتار' : 'Avatar Creator', icon: Smile, color: 'text-emerald-450' },
                { id: 'scheduler', name: language === 'ar' ? 'حجز المقابلات' : 'Scheduler', icon: Calendar, color: 'text-amber-455' },
              ].map((tab) => {
                const isActive = activeLabTab === tab.id;
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveLabTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                      isActive 
                        ? 'bg-slate-900 border-slate-800 dark:text-white text-slate-800 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                        : 'bg-transparent border-transparent text-gray-500 hover:text-slate-400'
                    }`}
                  >
                    <TabIcon size={14} className={tab.color} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Screen */}
          <div className="w-full min-h-[380px] rounded-2xl overflow-hidden border dark:border-slate-800/60 border-slate-200 bg-slate-950/70">
            {activeLabTab === 'dsa' && <DsaScreen language={language} />}
            {activeLabTab === 'memory' && <MemoryScreen language={language} />}
            {activeLabTab === 'avatar' && <AvatarScreen language={language} />}
            {activeLabTab === 'scheduler' && <SchedulerScreen language={language} />}
          </div>
        </div>

        {/* View All on GitHub Button */}
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
            {t('projects.viewOnGitHub')}
          </a>
        </div>
      </div>

      {/* MOBILE BOTTOM SLIDE-UP DRAWER PREVIEWER (vaul) */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="bg-slate-950 border-t border-slate-800 text-white rounded-t-2xl max-h-[85vh]">
          <div className="mx-auto my-3 h-1.5 w-12 rounded-full bg-slate-800" />
          
          <DrawerHeader className="text-center pt-1 pb-2">
            <DrawerTitle className="text-base font-mono font-bold text-white">
              {activeProjectObj ? t(activeProjectObj.titleKey) : (language === 'ar' ? 'نظام تشغيل الهاتف الافتراضي' : 'Mock iOS Simulator')}
            </DrawerTitle>
            <DrawerDescription className="text-[10px] text-gray-500">
              Interactive Simulated Interface Preview
            </DrawerDescription>
          </DrawerHeader>

          {/* Drawer Phone Simulator */}
          <div className="flex justify-center items-center py-3 pb-8 px-4">
            <div className={`w-[280px] h-[480px] bg-slate-950 border-[8px] border-slate-900 rounded-[32px] relative shadow-2xl overflow-hidden flex flex-col border-slate-950 dark:border-slate-800 shrink-0 transition-all duration-500 ${
              mockupColor === 'cyan' 
                ? 'shadow-[0_0_30px_rgba(6,182,212,0.15)]' 
                : mockupColor === 'green'
                  ? 'shadow-[0_0_30px_rgba(34,197,94,0.15)]'
                  : 'shadow-[0_0_30px_rgba(168,85,247,0.15)]'
            }`}>
              
              {/* Dynamic Island */}
              {renderDynamicIsland()}

              {/* Status bar */}
              <div className="flex justify-between items-center px-4 pt-1.5 pb-1 text-[8px] font-semibold text-white/95 select-none z-20 font-mono shrink-0">
                <span>{deviceTime}</span>
                <div className="flex items-center gap-1 text-[7px]">
                  <span>📶</span>
                  <span>🛜</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Simulated Screen */}
              <div className="flex-1 overflow-hidden relative">
                {renderMockupScreen(selectedProjectId)}
              </div>

              {/* Home indicator bar - Clickable to return to Home Screen */}
              <button 
                onClick={() => setSelectedProjectId('homeScreen')}
                className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 hover:bg-white/50 active:bg-white/80 rounded-full z-20 cursor-pointer transition-colors focus:outline-none"
                aria-label="Go to simulator home"
              />
            </div>
          </div>

          <div className="flex justify-center pb-6">
            <DrawerClose asChild>
              <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white px-5 py-1.5 rounded-lg text-xs font-mono">
                Close Preview
              </button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Projects;
