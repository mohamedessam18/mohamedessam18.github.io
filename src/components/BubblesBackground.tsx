import { useEffect, useRef, useCallback } from 'react';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

// Floating bubbles background animation for Hero section
// Respects prefers-reduced-motion for accessibility
const BubblesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const reducedMotionRef = useRef(false);
  const isLightModeRef = useRef(false);

  // Check if light mode is active
  const checkLightMode = useCallback(() => {
    isLightModeRef.current = document.documentElement.classList.contains('light');
  }, []);

  // Initialize bubbles
  const initBubbles = useCallback((width: number, height: number): Bubble[] => {
    const bubbleCount = Math.floor((width * height) / 25000); // Responsive count
    const bubbles: Bubble[] = [];
    
    // Different colors for dark vs light mode
    const isLight = isLightModeRef.current;
    
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 2,
        speedY: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        // Much lower opacity in light mode
        opacity: isLight ? Math.random() * 0.1 + 0.05 : Math.random() * 0.3 + 0.1,
        // Muted colors in light mode
        color: isLight 
          ? (Math.random() > 0.5 ? '14, 165, 194' : '16, 185, 129') // muted cyan/green
          : (Math.random() > 0.5 ? '147, 197, 253' : '134, 239, 172'), // bright cyan/green
      });
    }
    
    return bubbles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mediaQuery.matches;

    // Check initial theme
    checkLightMode();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      checkLightMode();
      bubblesRef.current = initBubbles(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Listen for reduced motion changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      checkLightMode();
      bubblesRef.current = initBubbles(canvas.width, canvas.height);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // If reduced motion, draw static bubbles
      const speedMultiplier = reducedMotionRef.current ? 0.1 : 1;
      const isLight = isLightModeRef.current;

      bubblesRef.current.forEach((bubble) => {
        // Update position
        bubble.y -= bubble.speedY * speedMultiplier;
        bubble.x += bubble.speedX * speedMultiplier;

        // Reset if off screen
        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }

        // Wrap horizontally
        if (bubble.x - bubble.radius > canvas.width) {
          bubble.x = -bubble.radius;
        } else if (bubble.x + bubble.radius < 0) {
          bubble.x = canvas.width + bubble.radius;
        }

        // Smaller glow radius in light mode
        const glowRadius = isLight ? bubble.radius * 1.5 : bubble.radius * 2;
        
        // Draw bubble with glow effect
        const gradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          0,
          bubble.x,
          bubble.y,
          glowRadius
        );
        gradient.addColorStop(0, `rgba(${bubble.color}, ${bubble.opacity})`);
        gradient.addColorStop(1, `rgba(${bubble.color}, 0)`);

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${bubble.color}, ${bubble.opacity + (isLight ? 0.05 : 0.2)})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initBubbles, checkLightMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ 
        opacity: document.documentElement.classList.contains('light') ? 0.3 : 0.6 
      }}
    />
  );
};

export default BubblesBackground;
