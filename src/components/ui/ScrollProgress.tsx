'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress / 100 }}
      transition={{ type: 'spring', stiffness: 100, damping: 30, mass: 0.5 }}
      style={{ originX: 0 }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#06B6D4] z-[9999] shadow-[0_0_20px_rgba(14,165,233,0.5)]"
    />
  );
}
