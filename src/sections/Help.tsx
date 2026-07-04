import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';
import type { Theme } from '../hooks/useTheme';
import {
  Smartphone,
  Palette,
  Bug,
  Plus,
  ArrowRight,
  Terminal,
  CornerDownLeft,
  Gamepad2,
} from 'lucide-react';
import RetroGame from '../components/RetroGame';
import { toggleDestroyMode } from '../components/DestroyMode';
import { toggleStickyNotes } from '../components/StickyNotes';
import { triggerAchievement, ALL_ACHIEVEMENTS } from '../components/AchievementSystem';

interface HelpProps {
  language: Language;
  setActiveSection: (section: string) => void;
  theme: Theme;
  toggleTheme: () => void;
  cycleLanguage: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

// ----------------------------------------------------
// CANVAS MATRIX RAIN SIMULATOR (cmatrix)
// ----------------------------------------------------
const MatrixRain = ({ onExit, accentColor }: { onExit: () => void; accentColor: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions based on container
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 350;
      canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    resizeCanvas();

    const columns = Math.floor(canvas.width / 12);
    const rainDrops = Array(columns).fill(1);
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト';

    const colorMap: Record<string, string> = {
      cyan: '#06b6d4',
      emerald: '#10b981',
      amethyst: '#a855f7',
      amber: '#f59e0b',
    };
    const rainColor = colorMap[accentColor] || '#06b6d4';

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = rainColor;
      ctx.font = '11px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * 12, rainDrops[i] * 12);

        if (rainDrops[i] * 12 > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 bg-black z-30 cursor-pointer overflow-hidden flex flex-col justify-end" 
      onClick={onExit}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute bottom-2 left-2 z-40 text-[9px] font-mono text-green-400 bg-black/75 border border-green-500/20 px-2 py-0.5 rounded animate-pulse select-none">
        CLICK ANYWHERE TO EXIT CMATRIX
      </div>
    </div>
  );
};

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

const Help = ({ language, setActiveSection, theme, toggleTheme, cycleLanguage, accentColor, setAccentColor }: HelpProps) => {
  const t = (key: string) => getTranslation(language, key);
  const [isSshActive, setIsSshActive] = useState(false);

  useEffect(() => {
    const handleDestroyExited = () => {
      setHistory(prev => [
        ...prev,
        { type: 'output', text: 'Destroy mode closed. Halted elements reconstructed.' }
      ]);
    };
    window.addEventListener('destroy-mode-exited', handleDestroyExited);
    return () => window.removeEventListener('destroy-mode-exited', handleDestroyExited);
  }, []);

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
    cyan: 'text-cyan-700 border-cyan-400/40 bg-cyan-50/60 hover:border-cyan-500/60 hover:bg-cyan-100/70 dark:text-cyan-400 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:hover:border-cyan-400 dark:hover:bg-cyan-500/20',
    green: 'text-emerald-700 border-emerald-400/40 bg-emerald-50/60 hover:border-emerald-500/60 hover:bg-emerald-100/70 dark:text-green-400 dark:border-green-500/30 dark:bg-green-500/10 dark:hover:border-green-400 dark:hover:bg-green-500/20',
    yellow: 'text-amber-700 border-amber-400/40 bg-amber-50/60 hover:border-amber-500/60 hover:bg-amber-100/70 dark:text-yellow-400 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:hover:border-yellow-400 dark:hover:bg-yellow-500/20',
    purple: 'text-violet-700 border-violet-400/40 bg-violet-50/60 hover:border-violet-500/60 hover:bg-violet-100/70 dark:text-purple-400 dark:border-purple-500/30 dark:bg-purple-500/10 dark:hover:border-purple-400 dark:hover:bg-purple-500/20',
  };

  // ----------------------------------------------------
  // REAL DEV TERMINAL LOGIC & COMMAND PROCESSOR
  // ----------------------------------------------------
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    {
      type: 'output',
      text: language === 'ar'
        ? 'مرحباً بك في سطر أوامر مطوري محمد عصام!\nاكتب "help" لعرض الأوامر المتاحة. يدعم التنقل بالأسهم ⬆️ ⬇️ والإكمال التلقائي بـ Tab.'
        : 'Welcome to Mohamed Essam developer console!\nType "help" to list available commands. Supports history ⬆️ ⬇️ and Tab completion.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [typedCommands, setTypedCommands] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isCommandRunning, setIsCommandRunning] = useState(false);

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Handle Tab completion and history navigation (ArrowUp/ArrowDown)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isCommandRunning) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (typedCommands.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < typedCommands.length) {
        setHistoryIndex(nextIndex);
        setInputVal(typedCommands[typedCommands.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputVal(typedCommands[typedCommands.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'about', 'skills', 'projects', 'download-cv', 'clear', 'history', 'theme', 'language', 'goto', 'neofetch', 'sudo', 'ping', 'nmap', 'cmatrix', 'play', 'game', 'notes', 'destroy', 'restore', 'achievements', 'ssh', 'exit', 'logout'];
      const matches = commands.filter(c => c.startsWith(inputVal.toLowerCase()));
      if (matches.length === 1) {
        setInputVal(matches[0]);
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, 
          { type: 'input', text: `guest@mohamed-essam:~$ ${inputVal}` },
          { type: 'output', text: matches.join('    ') }
        ]);
      }
    }
  };

  const handleTerminalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isCommandRunning) return;

    const command = inputVal.trim();
    if (!command) return;

    // Save to typed history
    const updatedTyped = [...typedCommands, command];
    setTypedCommands(updatedTyped);
    setHistoryIndex(-1);

    const parts = command.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    const promptPrefix = isSshActive ? 'ubuntu@essam-cloud:~$' : 'guest@mohamed-essam:~$';
    const inputLine = `${promptPrefix} ${command}`;
    const newHistory = [...history, { type: 'input' as const, text: inputLine }];

    if (isSshActive) {
      switch (mainCmd) {
        case 'clear':
          setHistory([]);
          setInputVal('');
          return;
        case 'exit':
        case 'logout':
          setIsSshActive(false);
          newHistory.push({
            type: 'output',
            text: 'Connection to cloud.essam.dev closed.'
          });
          break;
        case 'ls':
          newHistory.push({
            type: 'output',
            text: 'drwxr-xr-x  2 ubuntu ubuntu 4096 Jul  4 13:30 bio/\ndrwxr-xr-x  3 ubuntu ubuntu 4096 Jul  4 13:30 portfolio/\n-rw-r--r--  1 ubuntu ubuntu  244 Jul  4 13:30 readme.txt'
          });
          break;
        case 'cat':
          if (arg === 'readme.txt') {
            newHistory.push({
              type: 'output',
              text: "Mohamed Essam's VPS.\nServer running successfully on Ubuntu 24.04.\nType 'neofetch' to view system specs."
            });
          } else {
            newHistory.push({
              type: 'output',
              text: 'cat: error: file or directory not found.'
            });
          }
          break;
        case 'neofetch':
          newHistory.push({
            type: 'output',
            text: `      .---.        ubuntu@essam-cloud
     /     \\       ------------------
     \\\\.@-@.//       OS: Ubuntu 24.04 LTS x86_64
     /  \`-\`  \\      Host: KVM Virtual Machine
    /|       |\\     Kernel: Linux 6.8.0-generic
   / \\       / \\    Uptime: 247 days, 14 hours
  /   \`-._.-\`   \\   Shell: bash 5.2.21
  |           |     Memory: 782MB / 2048MB (38%)
  |           |     Disk: 12GB / 40GB (30%)
  \`-._ _ _ _.-'     IP: 142.250.190.46`
          });
          break;
        case 'uptime':
          newHistory.push({
            type: 'output',
            text: '13:38:15 up 247 days, 14:12, 1 user, load average: 0.04, 0.02, 0.00'
          });
          break;
        default:
          newHistory.push({
            type: 'output',
            text: `bash: ${command}: command not found. Type 'exit' to return to guest terminal.`
          });
      }
    } else {
      switch (mainCmd) {
        case 'clear':
          setHistory([]);
          setInputVal('');
          return;
        case 'help':
          newHistory.push({
            type: 'output',
            text: language === 'ar'
              ? 'الأوامر المتاحة:\n  about          - نبذة سريعة عني\n  skills         - مهاراتي البرمجية\n  projects       - مشاريع الهاتف المحاكي\n  download-cv    - تحميل السيرة الذاتية\n  ssh cloud      - الاتصال بسيرفر وهمي في السحاب\n  notes          - تشغيل لوحة الملاحظات اللاصقة\n  destroy        - تفعيل وضع تدمير عناصر الموقع\n  restore        - إعادة بناء جميع العناصر المدمرة\n  achievements   - عرض قائمة الأوسمة والإنجازات المفتوحة\n  ping <host>    - إرسال طلبات فحص استجابة الخادم\n  nmap <host>    - محاكاة فحص المنافذ والشبكة\n  cmatrix        - شلال رموز الماتريكس الخضراء التفاعلي\n  theme <light|dark> - تعديل مظهر الموقع\n  language       - تبديل لغة الموقع\n  goto <page>    - تنقل لصفحة (home, projects, contact...)\n  neofetch       - عرض مواصفات النظام\n  history        - سجل الأوامر المكتوبة\n  clear          - تنظيف الشاشة'
              : 'Available commands:\n  about          - Brief bio summary\n  skills         - Tech stack tree\n  projects       - Smartphone simulator projects\n  download-cv    - Download my PDF resume\n  ssh cloud      - Connect via SSH to virtual cloud server\n  notes          - Toggle draggable sticky notes board\n  destroy        - Activate site element exploder stress-relief\n  restore        - Reconstruct all exploded elements\n  achievements   - Print list of unlocked system milestones\n  ping <host>    - Send mock ICMP requests to server\n  nmap <host>    - Simulate open port scanning\n  cmatrix        - Interactive green Matrix rain effect\n  theme <light|dark> - Switch portfolio theme\n  language       - Toggle portfolio language\n  goto <page>    - Navigate to section (home, projects, contact...)\n  neofetch       - Display system specifications\n  history        - Print command history\n  clear          - Clear screen'
          });
          break;
      case 'about':
        newHistory.push({
          type: 'output',
          text: language === 'ar'
            ? 'محمد عصام - مطور تطبيقات جوال باستخدام Flutter وطالب علوم حاسب (2023-2027).\nأهتم ببناء تطبيقات متميزة، نظيفة وقابلة للصيانة من الصفر.'
            : 'Mohamed Essam - Flutter Mobile Developer & CS student (2023-2027).\nPassionate about building clean, high-performance, and maintainable cross-platform apps.'
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Mohamed's Tech Stack\n├── 📱 Flutter & Dart\n│   ├── State Management (BLoC, Riverpod, Provider)\n│   ├── Databases (SQLite, Hive, Firebase)\n│   └── Clean Architecture / MVVM\n├── 🌐 Web Development\n│   ├── HTML5, CSS3, JavaScript\n│   └── React.js\n└── ⚙️ Core Knowledge\n    ├── Data Structures & Algorithms\n    └── Systems (C++, Linux)`
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: language === 'ar'
            ? 'المشاريع المحاكاة المتوفرة في الهاتف:\n  1. Cyber Task Manager\n  2. Numerical Analysis Calc\n  3. Expense Tracker\n  4. Quran Ayah Generator\n  5. Bank System\n  6. Library System\n(يمكنك تشغيلهم مباشرة بفتح شاشة الهاتف في قسم المشاريع!)'
            : 'Simulated apps in the phone mockup:\n  1. Cyber Task Manager\n  2. Numerical Analysis Calc\n  3. Expense Tracker\n  4. Quran Ayah Generator\n  5. Bank System\n  6. Library System\n(Launch them directly inside the smartphone in the Projects section!)'
        });
        break;
      case 'download-cv':
        newHistory.push({
          type: 'output',
          text: 'Downloading CV...\n[██████████████████████████████] 100% Complete!'
        });
        // Trigger actual download
        const downloadLink = document.createElement('a');
        downloadLink.href = '/mohamed%20essam.pdf';
        downloadLink.download = 'Mohamed_Essam_CV.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        break;
      case 'history':
        newHistory.push({
          type: 'output',
          text: updatedTyped.map((c, i) => `  ${i + 1}  ${c}`).join('\n')
        });
        break;
      case 'theme':
        const themeColors = ['cyan', 'emerald', 'amethyst', 'amber'];
        if (themeColors.includes(arg)) {
          setAccentColor(arg);
          newHistory.push({ type: 'output', text: `Accent color changed to ${arg.toUpperCase()}.` });
        } else if (arg === 'purple') {
          setAccentColor('amethyst');
          newHistory.push({ type: 'output', text: `Accent color changed to AMETHYST.` });
        } else if (arg === 'green') {
          setAccentColor('emerald');
          newHistory.push({ type: 'output', text: `Accent color changed to EMERALD.` });
        } else if (arg === 'orange' || arg === 'yellow') {
          setAccentColor('amber');
          newHistory.push({ type: 'output', text: `Accent color changed to AMBER.` });
        } else if (arg === 'light') {
          if (theme === 'dark') toggleTheme();
          newHistory.push({ type: 'output', text: 'Theme changed to Light Mode.' });
        } else if (arg === 'dark') {
          if (theme === 'light') toggleTheme();
          newHistory.push({ type: 'output', text: 'Theme changed to Dark Mode.' });
        } else {
          toggleTheme();
          newHistory.push({ type: 'output', text: `Theme toggled. Current theme: ${theme === 'dark' ? 'Light' : 'Dark'}.` });
        }
        break;
      case 'lang':
      case 'language':
        cycleLanguage();
        newHistory.push({
          type: 'output',
          text: 'Language cycling triggered successfully.'
        });
        break;
      case 'goto':
        const sections = ['home', 'about', 'skills', 'education', 'help', 'projects', 'contact'];
        if (sections.includes(arg)) {
          setActiveSection(arg);
          newHistory.push({ type: 'output', text: `Navigating to ${arg} section...` });
        } else {
          newHistory.push({ type: 'output', text: `Section not found. Choose from: ${sections.join(', ')}` });
        }
        break;
      case 'neofetch':
        const ua = navigator.userAgent;
        let browserName = 'Web Client';
        if (ua.includes('Firefox')) browserName = 'Firefox Browser';
        else if (ua.includes('Chrome')) browserName = 'Chrome Browser';
        else if (ua.includes('Safari')) browserName = 'Safari Browser';
        else if (ua.includes('Edge')) browserName = 'Microsoft Edge';

        newHistory.push({
          type: 'output',
          text: `      .---.        guest@mohamed-essam
     /     \\       -------------------
     \\\\.@-@.//       OS: Client Browser
     /  \`-\`  \\      Host: ${browserName}
    /|       |\\     Kernel: WebKit Engine
   / \\       / \\    Shell: mohamed-essam-cli v1.0.0
  /   \`-._.-\`   \\   Theme: ${theme.toUpperCase()}
  |           |     Language: ${language.toUpperCase()}
  |           |     Active Section: HELP
  \`-._ _ _ _.-'     CV: public/mohamed essam.pdf`
        });
        break;
      case 'ping':
        if (!arg) {
          newHistory.push({ type: 'output', text: 'Usage: ping <host_name> (e.g., ping google.com)' });
          break;
        }
        setIsCommandRunning(true);
        newHistory.push({ type: 'output', text: `PING ${arg} (142.250.190.46) 56(84) bytes of data.` });
        setHistory(newHistory);
        setInputVal('');

        let pingCount = 1;
        const pingInterval = setInterval(() => {
          const rtt = (20 + Math.random() * 8).toFixed(1);
          setHistory(prev => [
            ...prev,
            { type: 'output', text: `64 bytes from ${arg} (142.250.190.46): icmp_seq=${pingCount} ttl=116 time=${rtt} ms` }
          ]);
          pingCount++;

          if (pingCount > 5) {
            clearInterval(pingInterval);
            setTimeout(() => {
              setHistory(prev => [
                ...prev,
                { type: 'output', text: `--- ${arg} ping statistics ---\n5 packets transmitted, 5 received, 0% packet loss, time 4016ms\nrtt min/avg/max = 20.1/23.4/27.9 ms` }
              ]);
              setIsCommandRunning(false);
            }, 300);
          }
        }, 800);
        return;
      case 'nmap':
        if (!arg) {
          newHistory.push({ type: 'output', text: 'Usage: nmap <host_name> (e.g., nmap mohamedessam18.github.io)' });
          break;
        }
        setIsCommandRunning(true);
        newHistory.push({ type: 'output', text: `Starting Nmap 7.92 ( https://nmap.org ) at 2026-07-04 01:25` });
        setHistory(newHistory);
        setInputVal('');

        setTimeout(() => {
          setHistory(prev => [
            ...prev,
            { type: 'output', text: `Initiating Ping Scan at 01:25\nScanning ${arg} (185.199.108.153) [1 port]` }
          ]);
        }, 600);

        setTimeout(() => {
          setHistory(prev => [
            ...prev,
            { type: 'output', text: `Nmap scan report for ${arg}\nHost is up (0.0022s latency).\nNot shown: 998 closed tcp ports (conn-refused)\nPORT     STATE SERVICE\n80/tcp   open  http\n443/tcp  open  https` }
          ]);
        }, 1600);

        setTimeout(() => {
          setHistory(prev => [
            ...prev,
            { type: 'output', text: `Nmap done: 1 IP address (1 host up) scanned in 1.84 seconds` }
          ]);
          setIsCommandRunning(false);
        }, 2200);
        return;
      case 'cmatrix':
      case 'matrix':
        setIsMatrixActive(true);
        break;
      case 'play':
      case 'game':
        setIsGameActive(true);
        newHistory.push({
          type: 'output',
          text: language === 'ar'
            ? 'تمهيد وحدة ألعاب داش... استمتع باللعب! 🎮'
            : 'Initializing Dash Arcade console... Have fun! 🎮'
        });
        break;
      case 'sudo':
        triggerAchievement('hackerman');
        if (arg === 'hack') {
          newHistory.push({
            type: 'output',
            text: 'INITIALIZING OVERRIDE PROTOCOL...\nACCESS GRANTED.\nMohamed Essam is now the root user of this machine. 😎'
          });
        } else if (arg.startsWith('rm') || command.includes('rm -rf')) {
          newHistory.push({
            type: 'output',
            text: 'Permission Denied: Portfolio directory is read-only. Mohamed has locked this page.'
          });
        } else {
          newHistory.push({
            type: 'output',
            text: 'sudo: 1 incorrect password attempt. guest is not in the sudoers file. This incident will be reported.'
          });
        }
        break;
      case 'ssh':
        if (arg === 'cloud' || arg === 'vps' || !arg) {
          setIsSshActive(true);
          newHistory.push({
            type: 'output',
            text: 'Connecting to cloud.essam.dev (142.250.190.46) on port 22...\nWelcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-generic x86_64)\n* Documentation:  https://help.ubuntu.com\n* Management:     https://landscape.canonical.com\n* Support:        https://ubuntu.com/pro\n\nLast login: Sat Jul  4 13:30:15 2026 from 192.168.1.5'
          });
        } else {
          newHistory.push({
            type: 'output',
            text: `ssh: Could not resolve hostname ${arg}: Name or service not known.`
          });
        }
        break;
      case 'notes':
        toggleStickyNotes(true);
        newHistory.push({
          type: 'output',
          text: 'Draggable Sticky Notes toggled! Double click viewport background to write custom notes.'
        });
        break;
      case 'destroy':
        toggleDestroyMode(true);
        newHistory.push({
          type: 'output',
          text: 'WARNING: Destroy mode activated. Click on website elements to blow them up!'
        });
        break;
      case 'restore':
        toggleDestroyMode(false);
        newHistory.push({
          type: 'output',
          text: 'Reconstruction protocol initiated. Halted elements restored.'
        });
        break;
      case 'achievements':
        const unlockedStr = localStorage.getItem('unlocked-achievements') || '[]';
        const unlocked: string[] = JSON.parse(unlockedStr);
        const listText = ALL_ACHIEVEMENTS.map((a) => {
          const status = unlocked.includes(a.id) ? '[UNLOCKED] ✅' : '[LOCKED]   🔒';
          const title = language === 'ar' ? a.titleAr : a.titleEn;
          return `${status} ${a.icon} ${title} - ${language === 'ar' ? a.descAr : a.descEn}`;
        }).join('\n');
        newHistory.push({
          type: 'output',
          text: `=== MOHAMED ESSAM - SYSTEM ACHIEVEMENTS ===\n\n${listText}\n\nTotal Unlocked: ${unlocked.length} / ${ALL_ACHIEVEMENTS.length}`
        });
        break;
      default:
        newHistory.push({
          type: 'output',
          text: language === 'ar'
            ? `أمر غير معروف: "${command}". اكتب "help" لمشاهدة المساعد.`
            : `Command not found: "${command}". Type "help" to see available commands.`
        });
    }
  }

    setHistory(newHistory);
    setInputVal('');
  };

  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 sm:px-6 lg:px-8">
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
          {t('help.title') as string}
          <span className="text-cyan-600 dark:text-cyan-400">/&gt;</span>
        </motion.h2>

        {/* Desktop Split View: Services Grid on left, CLI Terminal on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Services Grid (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="grid gap-4 flex-1">
              {services.map((service, index) => (
                <motion.div
                  variants={itemVariants}
                  key={index}
                  className={`p-5 rounded-xl border transition-all duration-300 group cursor-default ${colorClasses[service.color]}`}
                >
                  <div className="flex items-start gap-4">
                    <service.icon
                      size={24}
                      className="flex-shrink-0 group-hover:scale-110 transition-transform"
                    />
                    <p className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">
                      {service.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* General CTA Link to Contact */}
            <motion.div variants={itemVariants} className="mt-4 p-4 rounded-xl border dark:border-gray-800/60 bg-white/40 dark:bg-black/20 text-center">
              <p className="mb-4 text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                {t('help.ctaTitle') as string}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setActiveSection('contact')}
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-300
                    dark:bg-cyan-500/10 dark:border dark:border-cyan-500/50 dark:text-cyan-400 
                    dark:hover:bg-cyan-500/20 dark:hover:border-cyan-400 dark:hover:shadow-lg dark:hover:shadow-cyan-500/20
                    bg-cyan-600/10 border border-cyan-500/40 text-cyan-700
                    hover:bg-cyan-600/15 hover:border-cyan-500/60 hover:shadow-md hover:shadow-cyan-500/10"
                >
                  {t('help.getInTouch') as string}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  />
                </button>
                
                <button
                  onClick={() => setIsGameActive(true)}
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-300
                    dark:bg-green-500/10 dark:border dark:border-green-500/50 dark:text-green-400 
                    dark:hover:bg-green-500/20 dark:hover:border-green-400 dark:hover:shadow-lg dark:hover:shadow-green-500/20
                    bg-green-600/10 border border-green-500/40 text-green-700
                    hover:bg-green-600/15 hover:border-green-500/60 hover:shadow-md hover:shadow-green-500/10"
                >
                  <Gamepad2 size={14} className="group-hover:rotate-12 transition-transform" />
                  {language === 'ar' ? 'العب لعبة الهكر' : 'Play Hacker Game'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Interactive Developer Terminal CLI (Spans 7 cols) */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-7 flex flex-col rounded-2xl border dark:border-cyan-500/20 border-slate-300 shadow-2xl bg-black/95 overflow-hidden min-h-[380px] lg:min-h-auto relative group"
            onClick={focusTerminal}
          >
            {/* macOS styled Header dots */}
            <div className="bg-slate-900 px-4 py-2.5 flex items-center border-b dark:border-gray-800/40 border-slate-700/30 z-10 shrink-0 select-none">
              <div className="flex gap-1.5 mr-auto">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-slate-400 dark:text-cyan-500/70 font-mono text-[10px] uppercase tracking-wider font-semibold select-none">
                <Terminal size={12} />
                <span>mohamed-essam-cli</span>
              </div>
            </div>

            {/* Terminal Screen Console */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] sm:text-xs leading-relaxed select-text space-y-2 max-h-[360px] scrollable-container relative">
              
              {/* Matrix Rain canvas simulation */}
              {isMatrixActive && (
                <MatrixRain onExit={() => setIsMatrixActive(false)} accentColor={accentColor} />
              )}

              {history.map((line, idx) => (
                <div 
                  key={idx} 
                  className={`whitespace-pre-wrap ${
                    line.type === 'input' 
                      ? 'text-emerald-400 dark:text-green-400 font-bold' 
                      : 'text-slate-300 dark:text-cyan-400/90'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            {/* Terminal Input Form */}
            <form 
              onSubmit={handleTerminalSubmit}
              className="bg-slate-950 px-4 py-3 border-t dark:border-gray-800/40 border-slate-800/40 flex items-center gap-2 font-mono shrink-0 text-xs"
            >
              <span className="text-emerald-400 dark:text-green-400 font-bold select-none">{isSshActive ? 'ubuntu@essam-cloud:~$' : 'guest@mohamed-essam:~$'}</span>
              <input
                ref={inputRef}
                type="text"
                disabled={isCommandRunning}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isCommandRunning ? (language === 'ar' ? 'انتظر انتهاء العملية...' : 'Process running...') : (language === 'ar' ? 'اكتب الأوامر هنا...' : 'Type commands...')}
                className="flex-1 bg-transparent text-slate-100 placeholder-slate-700 outline-none border-none p-0 focus:ring-0 disabled:opacity-50"
                autoComplete="off"
                autoCapitalize="off"
              />
              <button 
                type="submit" 
                disabled={isCommandRunning}
                className="text-slate-500 dark:text-cyan-500/50 hover:text-cyan-400 p-0.5 rounded transition-colors disabled:opacity-30"
                aria-label="Submit command"
              >
                <CornerDownLeft size={14} />
              </button>
            </form>
          </motion.div>

        </div>
      </motion.div>

      {/* Retro Arcade Game Overlay */}
      {isGameActive && (
        <RetroGame onClose={() => setIsGameActive(false)} />
      )}
    </div>
  );
};

export default Help;
