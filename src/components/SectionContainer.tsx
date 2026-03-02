import { useEffect, useState, type ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  isActive: boolean;
}

// Section container with smooth fade/slide transitions
const SectionContainer = ({ children, isActive }: SectionContainerProps) => {
  const [shouldRender, setShouldRender] = useState(isActive);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
      // Small delay to ensure DOM is ready before animating in
      const timer = setTimeout(() => {
        setAnimationClass('opacity-100 translate-x-0');
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setAnimationClass('opacity-0 translate-x-8');
      // Delay unmounting to allow exit animation
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!shouldRender) return null;

  return (
    <div
      className={`absolute inset-0 transition-all duration-300 ease-out ${animationClass}`}
      style={{
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default SectionContainer;
