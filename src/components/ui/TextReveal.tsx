'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  mode?: 'chars' | 'words' | 'lines';
}

export function TextReveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  stagger = 0.03,
  as: Tag = 'p',
  mode = 'chars',
}: TextRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  if (mode === 'words') {
    const words = children.split(' ');
    return (
      <Tag ref={ref} className={cn('inline-flex flex-wrap', className)}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration, delay: delay + i * stagger, ease: 'easeOut' }}
            className="mr-1.5"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    );
  }

  if (mode === 'lines') {
    const lines = children.split('\n');
    return (
      <Tag ref={ref} className={cn('', className)}>
        {lines.map((line, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: delay + i * 0.15, ease: 'easeOut' }}
            className="block"
          >
            {line}
          </motion.span>
        ))}
      </Tag>
    );
  }

  const chars = children.split('');
  return (
    <Tag ref={ref} className={cn('inline-flex flex-wrap', className)}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * stagger,
            ease: [0.215, 0.610, 0.355, 1.0],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  );
}
