'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const variants = {
  primary: 'bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]',
  secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-[#0EA5E9]/40',
  ghost: 'bg-transparent text-white hover:bg-white/5',
  danger: 'bg-red-500/20 text-red-200 border border-red-500/30 hover:bg-red-500/30',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
    </motion.button>
  );
}
