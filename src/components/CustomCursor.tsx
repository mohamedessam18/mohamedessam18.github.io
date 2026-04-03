import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const IDLE_SIZE = 14;
const MOVING_WIDTH = 72;
const MOVING_HEIGHT = 28;
const IDLE_TIMEOUT_MS = 150;

const springConfig = {
  mass: 0.1,
  stiffness: 150,
  damping: 15,
};

const CustomCursor = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const idleTimerRef = useRef<number | null>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      return undefined;
    }

    const clearIdleTimer = () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      setIsVisible(true);
      setIsMoving(true);
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);

      clearIdleTimer();
      idleTimerRef.current = window.setTimeout(() => {
        setIsMoving(false);
      }, IDLE_TIMEOUT_MS);
    };

    const handleMouseLeave = () => {
      clearIdleTimer();
      setIsVisible(false);
      setIsMoving(false);
    };

    const handleWindowBlur = () => {
      clearIdleTimer();
      setIsMoving(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      clearIdleTimer();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center overflow-hidden border border-emerald-300/40 bg-emerald-400 text-slate-950 mix-blend-normal shadow-[0_0_14px_rgba(74,222,128,0.75),0_0_30px_rgba(74,222,128,0.28)] will-change-transform"
      style={{
        left: springX,
        top: springY,
      }}
      initial={false}
      animate={{
        width: isMoving ? MOVING_WIDTH : IDLE_SIZE,
        height: isMoving ? MOVING_HEIGHT : IDLE_SIZE,
        borderRadius: isMoving ? 999 : IDLE_SIZE,
        opacity: isVisible ? 1 : 0,
        x: isMoving ? -(MOVING_WIDTH / 2) : -(IDLE_SIZE / 2),
        y: isMoving ? -(MOVING_HEIGHT / 2) : -(IDLE_SIZE / 2),
      }}
      transition={{
        type: 'spring',
        mass: 0.18,
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.span
        className="font-mono text-[0.78rem] font-bold tracking-tight"
        initial={false}
        animate={{
          opacity: isMoving ? 1 : 0,
          scale: isMoving ? 1 : 0.85,
        }}
        transition={{
          duration: 0.18,
          ease: 'easeOut',
        }}
      >
        &lt;me/&gt;
      </motion.span>
    </motion.div>
  );
};

export default CustomCursor;
