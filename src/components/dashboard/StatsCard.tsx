'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  LucideIcon,
} from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: 'default' | 'red' | 'green' | 'blue' | 'yellow';
  className?: string;
  index?: number;
}

const variantStyles = {
  default: {
    iconBg: 'bg-white/[0.06]',
    iconColor: 'text-white',
  },
  red: {
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-500',
  },
  green: {
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500',
  },
  blue: {
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  yellow: {
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500',
  },
};

export default function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = 'default',
  className,
  index = 0,
}: StatsCardProps) {
  const styles = variantStyles[variant];

  const TrendIcon =
    change !== undefined
      ? change > 0
        ? TrendingUp
        : change < 0
        ? TrendingDown
        : Minus
      : null;

  const trendColor =
    change !== undefined
      ? change > 0
        ? 'text-green-500'
        : change < 0
        ? 'text-sky-500'
        : 'text-[#A3A3A3]'
      : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <TiltCard intensity={8} className="h-full">
        <div
          className={cn(
            'glass rounded-2xl p-6 border-white/5 hover:border-white/10 transition-all duration-500 h-full flex flex-col justify-between group relative overflow-hidden',
            className
          )}
        >
          {/* Gradient glow on hover */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mr-16 -mt-16" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="flex-1">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-white/80 transition-colors">{title}</p>
              <p className="text-3xl lg:text-4xl font-black text-white mb-3 tracking-tighter">{value}</p>
              {change !== undefined && (
                <div className={cn('flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest', trendColor)}>
                  {TrendIcon && <TrendIcon className="w-4 h-4" />}
                  <span>
                    {change > 0 ? '+' : ''}
                    {change}%
                  </span>
                  {changeLabel && (
                    <span className="text-slate-500 ml-1 font-medium">{changeLabel}</span>
                  )}
                </div>
              )}
            </div>
            <div
              className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-500 shadow-lg',
                styles.iconBg
              )}
            >
              <Icon className={cn('w-6 h-6', styles.iconColor)} />
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

