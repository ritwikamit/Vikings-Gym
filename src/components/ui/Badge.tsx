'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

const badgeVariants = {
  primary: 'bg-[#0EA5E9]/15 text-[#38BDF8] border border-[#0EA5E9]/30',
  success: 'bg-[#10B981]/15 text-[#6EE7B7] border border-[#10B981]/30',
  warning: 'bg-[#F59E0B]/15 text-[#FCDAB7] border border-[#F59E0B]/30',
  error: 'bg-[#EF4444]/15 text-[#FCA5A5] border border-[#EF4444]/30',
  info: 'bg-[#3B82F6]/15 text-[#93C5FD] border border-[#3B82F6]/30',
};

const badgeSizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
}: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-semibold tracking-widest uppercase transition-all duration-300',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  );
}
