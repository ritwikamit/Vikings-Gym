'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'bordered' | 'elevated';
}

const cardVariants = {
  default: 'glass rounded-2xl border border-white/5',
  bordered: 'glass rounded-2xl border-2 border-[#0EA5E9]/30 hover:border-[#0EA5E9]/60',
  elevated: 'glass-xl rounded-2xl',
};

export function Card({
  children,
  className,
  hover = true,
  onClick,
  variant = 'default',
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(14, 165, 233, 0.15)' } : {}}
      onClick={onClick}
      className={cn(
        cardVariants[variant],
        'p-6 transition-all duration-300',
        hover && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}
