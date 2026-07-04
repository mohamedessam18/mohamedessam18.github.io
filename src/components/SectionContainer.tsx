import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
}

// Section container with smooth Framer Motion page transitions
const SectionContainer = ({ children }: SectionContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ 
        type: 'spring',
        stiffness: 55, 
        damping: 18, 
        mass: 0.9,
        restDelta: 0.001
      }}
      className="relative w-full"
      style={{
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </motion.div>
  );
};

export default SectionContainer;
