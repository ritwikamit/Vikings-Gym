'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Dumbbell, Zap, Shield, Target } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';

export function HeroSection() {
  const stats = [
    { value: '500+', label: 'Warriors' },
    { value: '95%', label: 'Success Rate' },
    { value: '15+', label: 'Coaches' },
    { value: '24/7', label: 'Support' },
  ];

  const icons = [
    { Icon: Dumbbell, x: '10%', y: '25%', delay: 0 },
    { Icon: Zap, x: '88%', y: '20%', delay: 0.5 },
    { Icon: Shield, x: '12%', y: '70%', delay: 1 },
    { Icon: Target, x: '85%', y: '75%', delay: 1.5 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <AnimatedBackground count={12} />

      {icons.map(({ Icon, x, y, delay }) => (
        <motion.div key={x} className="absolute text-white/[0.03] hidden lg:block" style={{ left: x, top: y }}
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Icon size={48} />
        </motion.div>
      ))}

      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-violet-500/8 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[10px] font-bold tracking-[0.3em] uppercase text-[#0EA5E9] mb-6">
              <Crown size={12} /> The Elite Training Collective
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-podium text-[clamp(2.5rem,10vw,6rem)] text-white leading-[1.05] mb-4"
          >
            Forge Your<br />
            <span className="gradient-text-blue">STRENGTH</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/50 text-base sm:text-lg max-w-lg mb-8"
          >
            Transform your body, conquer your limits. Join the most premier fitness destination in the city.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/plans" className="btn-primary group">
              Start Your Journey <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="btn-secondary">
              Explore Arena
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}
            className="flex gap-10 sm:gap-16 mt-16"
          >
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }}>
                <p className="font-podium text-2xl sm:text-3xl text-white">{s.value}</p>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
