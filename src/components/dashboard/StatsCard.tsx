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
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-500',
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
        ? 'text-red-500'
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
            'bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5 hover:border-[#DC2626]/30 transition-all duration-300 h-full flex flex-col justify-between group',
            className
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-[#A3A3A3] text-sm font-medium mb-1 group-hover:text-white transition-colors">{title}</p>
              <p className="text-2xl font-bold text-white">{value}</p>
              {change !== undefined && (
                <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', trendColor)}>
                  {TrendIcon && <TrendIcon className="w-3.5 h-3.5" />}
                  <span>
                    {change > 0 ? '+' : ''}
                    {change}%
                  </span>
                  {changeLabel && (
                    <span className="text-[#737373] ml-1">{changeLabel}</span>
                  )}
                </div>
              )}
            </div>
            <div
              className={cn(
                'w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300',
                styles.iconBg
              )}
            >
              <Icon className={cn('w-5 h-5', styles.iconColor)} />
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

