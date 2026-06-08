'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Crown } from 'lucide-react';
import { Parallax } from '@/components/ui/Parallax';
import { Magnetic } from '@/components/ui/Magnetic';

export function HeroSection() {
  const stats = [
    { value: '500+', label: 'Warriors' },
    { value: '95%', label: 'Success Rate' },
    { value: '15+', label: 'Coaches' },
    { value: '24/7', label: 'Support' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
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
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Red ambient glow */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#C62828]/20 rounded-full blur-[180px] z-[1] animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-[#C62828]/10 rounded-full blur-[180px] z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="animate-reveal">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/10 text-white text-[10px] sm:text-[11px] font-bold tracking-[0.4em] uppercase mb-8 lg:mb-10 shadow-2xl">
              <Crown className="w-3.5 h-3.5 text-[#C62828]" />
              The Elite Training Collective
            </span>
          </div>

          {/* Main Heading */}
          <div className="animate-reveal-1">
            <h1 className="font-podium text-[clamp(3.5rem,12vw,8.5rem)] text-white mb-2 tracking-tighter leading-[0.85]">
              Forge Your
            </h1>
            <h1 className="font-podium text-[clamp(3.5rem,12vw,8.5rem)] gradient-text-fire tracking-tighter leading-[0.85]">
              STRENGTH
            </h1>
          </div>

          {/* Subtext */}
          <div className="animate-reveal-2">
            <p className="text-[#A3A3A3] text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mt-8 lg:mt-10">
              Transform your body, conquer your limits. Join the most{" "}
              <span className="text-white font-bold border-b-2 border-[#C62828]">premier fitness destination</span> in the city.
            </p>
          </div>

          {/* CTA Row */}
          <div className="animate-reveal-3 mt-10 lg:mt-12">
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <Magnetic>
                <Link
                  href="/plans"
                  className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#C62828] text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(198,40,40,0.3)] hover:shadow-[0_0_60px_rgba(198,40,40,0.5)] hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10">Start Your Journey</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 text-white/80 hover:text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-colors"
                >
                  Explore Arena
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Stats Row */}
          <div className="animate-reveal-4 mt-12 sm:mt-16 lg:mt-24">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-8 sm:gap-16 lg:gap-20">
              {stats.map((stat) => (
                <div key={stat.label} className="group">
                  <p className="font-podium text-3xl sm:text-4xl lg:text-5xl text-white group-hover:text-[#C62828] transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-[#737373] text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-2 font-bold group-hover:text-white/60 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#C62828] rounded-full shadow-[0_0_10px_#C62828]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
