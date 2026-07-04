import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bomb, RotateCcw, X } from 'lucide-react';
import { type Language } from '../i18n';
import { triggerAchievement } from './AchievementSystem';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
}

interface DestroyModeProps {
  language: Language;
}

const DestroyMode = ({ language }: DestroyModeProps) => {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const destroyedElements = useRef<HTMLElement[]>([]);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const { active } = (e as CustomEvent).detail;
      setIsActive(active);
      if (active) {
        document.body.style.cursor = 'crosshair';
      } else {
        document.body.style.cursor = 'default';
        restoreAll();
      }
    };

    window.addEventListener('destroy-mode-toggle', handleToggle);
    return () => {
      window.removeEventListener('destroy-mode-toggle', handleToggle);
      document.body.style.cursor = 'default';
    };
  }, []);

  // Animation loop for canvas explosion particles
  useEffect(() => {
    if (!isActive) {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.alpha -= 0.02;
        
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();

        return p.alpha > 0;
      });

      animFrameId.current = requestAnimationFrame(updateParticles);
    };

    updateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isActive]);

  // Click interceptor to blow up elements
  useEffect(() => {
    if (!isActive) return;

    const handleInterceptClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Do NOT destroy self/UI elements
      if (target.closest('.destroy-mode-ui') || target.tagName === 'BODY' || target.tagName === 'HTML') {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      const x = e.clientX;
      const y = e.clientY;

      // Play Synthesized 8-bit sound
      playExplosionSound();

      // Trigger secret achievement
      triggerAchievement('destroyer');

      // Spawn particles
      spawnExplosion(x, y);

      // Hide element
      target.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      target.style.transform = 'scale(0) rotate(15deg)';
      target.style.opacity = '0';
      target.style.pointerEvents = 'none';

      destroyedElements.current.push(target);
    };

    document.addEventListener('click', handleInterceptClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleInterceptClick, { capture: true });
    };
  }, [isActive]);

  const spawnExplosion = (x: number, y: number) => {
    const colors = ['#06b6d4', '#10b981', '#a855f7', '#f59e0b', '#ef4444', '#ffffff'];
    const pCount = 25;

    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        size: Math.random() * 5 + 3,
      });
    }
  };

  const playExplosionSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (_) {}
  };

  const restoreAll = () => {
    destroyedElements.current.forEach((el) => {
      el.style.transform = 'scale(1) rotate(0deg)';
      el.style.opacity = '1';
      el.style.pointerEvents = 'auto';
    });
    destroyedElements.current = [];

    // Play reconstruct chime sound
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(660, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (_) {}
  };

  const handleExit = () => {
    setIsActive(false);
    document.body.style.cursor = 'default';
    restoreAll();
    // Dispatch event to CLI so prompt updates
    const event = new CustomEvent('destroy-mode-exited');
    window.dispatchEvent(event);
  };

  const isAr = language === 'ar';

  return (
    <>
      {isActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-[9997]"
        />
      )}

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 15 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[9998] w-[90%] max-w-[420px] glass border rounded-full p-2.5 px-4 shadow-2xl flex items-center justify-between gap-3 destroy-mode-ui"
            style={{
              borderColor: 'rgba(239, 68, 68, 0.4)',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.25)',
            }}
          >
            <div className="flex items-center gap-2 text-red-500 font-mono text-[9px] sm:text-xs">
              <Bomb size={14} className="animate-bounce shrink-0" />
              <span className="font-bold uppercase tracking-wider">
                {isAr ? 'وضع التدمير نشط!' : 'DESTROY MODE ACTIVE'}
              </span>
            </div>

            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={restoreAll}
                className="flex items-center gap-1 p-1 px-2.5 rounded-full border border-slate-700 bg-slate-900/60 font-mono text-[8px] sm:text-[10px] text-slate-300 hover:text-white hover:border-slate-500 transition-all active:scale-95"
              >
                <RotateCcw size={10} />
                {isAr ? 'إعادة بناء' : 'Restore'}
              </button>

              <button
                onClick={handleExit}
                className="flex items-center gap-1 p-1 px-2.5 rounded-full border border-red-500/20 bg-red-500/10 font-mono text-[8px] sm:text-[10px] text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all active:scale-95"
              >
                <X size={10} />
                {isAr ? 'خروج' : 'Exit'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DestroyMode;
export const toggleDestroyMode = (active: boolean) => {
  const event = new CustomEvent('destroy-mode-toggle', { detail: { active } });
  window.dispatchEvent(event);
};
