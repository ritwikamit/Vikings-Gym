'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  formatter?: (value: number) => string;
  delay?: number;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
  formatter,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (!inView) return;

    const timeout = setTimeout(() => {
      const controls = animate(from, to, {
        duration,
        ease: 'easeOut',
        onUpdate: (value) => setDisplayValue(Math.round(value)),
      });
      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, from, to, duration, delay]);

  const formatted = formatter ? formatter(displayValue) : displayValue.toLocaleString('en-IN');

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={cn('tabular-nums', className)}
    >
      {prefix}{formatted}{suffix}
    </motion.span>
  );
}
