'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function Reveal({ children, className, delay = 0, direction = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const dirMap = { up: { y: 40 }, left: { x: -40 }, right: { x: 40 } };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-badge">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
      {children}
    </div>
  );
}

export function SectionHeading({ badge, title, subtitle }: { badge: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="text-center mb-12 lg:mb-16">
      <SectionBadge>{badge}</SectionBadge>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="text-[#666] text-base sm:text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </Reveal>
  );
}
