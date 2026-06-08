'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Adjust between 0.1 (slow) and 1.5 (fast)
}

export function Parallax({ children, className = '', speed = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate the translation value based on speed.
  // When speed is positive, it moves slower than scroll (parallax effect).
  // When negative, it moves faster.
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  
  // Custom y map based on the speed factor passed in
  const customY = useTransform(scrollYProgress, [0, 1], [`-${speed * 50}%`, `${speed * 50}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y: customY }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
