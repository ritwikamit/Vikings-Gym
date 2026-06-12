'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  hover?: 'lift' | 'glow' | 'tilt' | 'none';
}

const springConfig = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

export function MotionCard({
  children,
  className,
  index = 0,
  hover = 'lift',
}: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springConfig, delay: index * 0.06 }}
      whileHover={
        hover === 'lift'
          ? { y: -6, scale: 1.02, transition: springConfig }
          : hover === 'glow'
          ? { boxShadow: '0 20px 40px rgba(14,165,233,0.2)', transition: springConfig }
          : hover === 'tilt'
          ? { rotateX: 5, rotateY: -5, transition: springConfig }
          : {}
      }
      className={cn(
        'glass rounded-2xl border border-white/5',
        'transition-colors duration-300',
        hover !== 'none' && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedPresenceProps {
  children: ReactNode;
  show: boolean;
}

export function AnimatedMount({ children, show }: AnimatedPresenceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
