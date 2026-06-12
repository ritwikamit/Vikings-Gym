'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Dumbbell, Zap, Shield, Target } from 'lucide-react';
import { Parallax } from '@/components/ui/Parallax';
import { Magnetic } from '@/components/ui/Magnetic';
import { TextReveal } from '@/components/ui/TextReveal';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';

export function HeroSection() {
  const stats = [
    { value: '500+', label: 'Warriors' },
    { value: '95%', label: 'Success Rate' },
    { value: '15+', label: 'Coaches' },
    { value: '24/7', label: 'Support' },
  ];

  const floatingIcons = [
    { Icon: Dumbbell, x: '15%', y: '20%', delay: 0 },
    { Icon: Zap, x: '85%', y: '30%', delay: 0.5 },
    { Icon: Shield, x: '10%', y: '70%', delay: 1 },
    { Icon: Target, x: '80%', y: '75%', delay: 1.5 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      {/* Animated Background */}
      <AnimatedBackground count={15} />

      {/* Video Background with Parallax */}
      <div className="absolute inset-0 w-full h-full">
        <Parallax speed={-0.3} className="w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-[1.1]"
            poster="/logo.png"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4" type="video/mp4" />
          </video>
        </Parallax>
      </div>

      {/* Overlay layers */}
      <div className="absolute inset-0 video-overlay-top z-[1]" />
      <div className="absolute inset-0 video-overlay-bottom z-[1]" />
      <div className="absolute inset-0 video-overlay-center z-[1]" />
      <div className="absolute inset-0 bg-slate-900/50 z-[1]" />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay }) => (
        <motion.div
          key={x}
          className="absolute z-[2] text-white/5 hidden lg:block"
          style={{ left: x, top: y }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Icon size={48} />
        </motion.div>
      ))}

      {/* Blue ambient glow */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[180px] z-[1] animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-violet-500/15 rounded-full blur-[180px] z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-sky-400/20 text-sky-100 text-[10px] sm:text-[11px] font-bold tracking-[0.4em] uppercase mb-8 lg:mb-10 shadow-2xl">
              <Crown className="w-3.5 h-3.5 text-sky-400" />
              The Elite Training Collective
            </span>
          </motion.div>

          {/* Main Heading with Kinetic Typography */}
          <div>
            <TextReveal
              as="h1"
              className="font-podium text-[clamp(2.8rem,8vw,6rem)] text-white mb-3 tracking-tighter leading-[1.05]"
              mode="words"
              stagger={0.12}
              delay={0.3}
            >
              Forge Your Strength
            </TextReveal>
          </div>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-xl mt-6 lg:mt-8">
              Transform your body, conquer your limits. Join the most{" "}
              <span className="text-white font-bold border-b-2 border-sky-400">premier fitness destination</span> in the city.
            </p>
          </motion.div>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-10 lg:mt-12"
          >
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <Magnetic>
                <Link
                  href="/plans"
                  className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:shadow-[0_0_60px_rgba(14,165,233,0.5)] hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10">Start Your Journey</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 text-white/80 hover:text-sky-200 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-colors"
                >
                  Explore Arena
                </Link>
              </Magnetic>
            </div>
          </motion.div>

          {/* Stats Row with Animated Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 sm:mt-16 lg:mt-24"
          >
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-8 sm:gap-16 lg:gap-20">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + i * 0.15 }}
                  className="group relative"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#0EA5E9]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="font-podium text-3xl sm:text-4xl lg:text-5xl text-white group-hover:text-sky-400 transition-colors duration-300 relative z-10">
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-2 font-bold group-hover:text-slate-200 transition-colors duration-300 relative z-10">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-sky-400/30 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_10px_#0EA5E9]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
