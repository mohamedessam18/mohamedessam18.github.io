import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { type Language } from '../i18n';

export interface Achievement {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  icon: string;
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'hackerman',
    titleEn: 'Hackerman',
    titleAr: 'مخترق الأنظمة',
    descEn: 'Executed a system command in the terminal.',
    descAr: 'نفذت أمراً برمجياً سرياً داخل الـ CLI.',
    icon: '💻',
  },
  {
    id: 'pro-gamer',
    titleEn: 'Pro Gamer',
    titleAr: 'لاعب محترف',
    descEn: 'Scored 10 points or more in Flappy Dash.',
    descAr: 'أحرزت 10 نقاط أو أكثر في لعبة داش ريترو.',
    icon: '🎮',
  },
  {
    id: 'theme-designer',
    titleEn: 'Theme Designer',
    titleAr: 'مهندس الديكور',
    descEn: 'Customized site accent colors.',
    descAr: 'غيرت ونسقت ألوان البورتفوليو الخاص بك.',
    icon: '🎨',
  },
  {
    id: 'explorer',
    titleEn: 'Elite Explorer',
    titleAr: 'المستكشف النخبة',
    descEn: 'Visited all main sections of the website.',
    descAr: 'استكشفت جميع أقسام البورتفوليو الأساسية.',
    icon: '🧭',
  },
  {
    id: 'sandbox-pro',
    titleEn: 'UI Architect',
    titleAr: 'مهندس الواجهات',
    descEn: 'Modified widgets in the Live Flutter Sandbox.',
    descAr: 'عدلت وصممت واجهة برمجية داخل الـ Sandbox.',
    icon: '🧪',
  },
  {
    id: 'hacker-code',
    titleEn: 'Hacker Elite',
    titleAr: 'شفرة النخبة',
    descEn: 'Entered the legendary Konami Cheat Code.',
    descAr: 'أدخلت شفرة الغش الأسطورية Konami Code.',
    icon: '🔑',
  },
  {
    id: 'destroyer',
    titleEn: 'Site Destroyer',
    titleAr: 'مدمر الويب',
    descEn: 'Exploded elements using destroy mode.',
    descAr: 'فجرت عناصر الموقع بالكامل في وضع التدمير.',
    icon: '🚀',
  },
];

// Helper to trigger achievements from anywhere in the codebase
export const triggerAchievement = (id: string) => {
  const event = new CustomEvent('achievement-triggered', { detail: { id } });
  window.dispatchEvent(event);
};

const playAchievementSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const playTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.06, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    const now = ctx.currentTime;
    playTone(523.25, now, 0.08); // C5
    playTone(659.25, now + 0.06, 0.08); // E5
    playTone(783.99, now + 0.12, 0.08); // G5
    playTone(1046.50, now + 0.18, 0.22); // C6
  } catch (_) {
    // AudioContext blocked by user interaction guidelines
  }
};

interface AchievementSystemProps {
  language: Language;
}

const AchievementSystem = ({ language }: AchievementSystemProps) => {
  const [activeNotification, setActiveNotification] = useState<Achievement | null>(null);

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const { id } = (e as CustomEvent).detail;
      const achievement = ALL_ACHIEVEMENTS.find((a) => a.id === id);
      if (!achievement) return;

      // Get unlocked achievements list
      const unlockedStr = localStorage.getItem('unlocked-achievements') || '[]';
      const unlocked: string[] = JSON.parse(unlockedStr);

      if (!unlocked.includes(id)) {
        // Unlock new achievement
        unlocked.push(id);
        localStorage.setItem('unlocked-achievements', JSON.stringify(unlocked));
        
        // Trigger notification and sound
        setActiveNotification(achievement);
        playAchievementSound();

        // Auto-dismiss after 4 seconds
        setTimeout(() => {
          setActiveNotification(null);
        }, 4000);
      }
    };

    window.addEventListener('achievement-triggered', handleTrigger);
    return () => {
      window.removeEventListener('achievement-triggered', handleTrigger);
    };
  }, []);

  const isAr = language === 'ar';

  return (
    <AnimatePresence>
      {activeNotification && (
        <motion.div
          initial={{ opacity: 0, y: -70, scale: 0.9 }}
          animate={{ opacity: 1, y: 20, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          className="fixed top-0 left-1/2 -translate-x-1/2 z-[10000] w-[90%] max-w-[360px] glass border rounded-2xl p-4 shadow-2xl flex items-center gap-3.5 select-none pointer-events-none"
          style={{
            borderColor: 'rgba(var(--color-primary), 0.4)',
            boxShadow: '0 0 25px rgba(var(--color-primary), 0.25)',
          }}
        >
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-2xl bg-white/10 border border-white/10 animate-bounce">
            {activeNotification.icon}
          </div>

          <div className="flex-1 text-left rtl:text-right min-w-0">
            <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400 font-black block leading-none mb-1 flex items-center gap-1">
              <Sparkles size={9} className="animate-pulse" />
              {isAr ? 'تم فتح إنجاز سري!' : 'Achievement Unlocked!'}
            </span>
            <h4 className="font-mono text-xs font-bold text-white leading-tight truncate">
              {isAr ? activeNotification.titleAr : activeNotification.titleEn}
            </h4>
            <p className="font-mono text-[9px] text-gray-400 leading-normal mt-0.5 truncate">
              {isAr ? activeNotification.descAr : activeNotification.descEn}
            </p>
          </div>

          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <Check size={14} className="animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementSystem;
