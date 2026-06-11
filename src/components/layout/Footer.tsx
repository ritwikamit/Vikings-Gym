'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Instagram, ArrowRight } from 'lucide-react';
import { GYM_INFO, NAV_LINKS } from '@/lib/constants';

const quickLinks = NAV_LINKS.slice(0, 6);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent opacity-30" />
      
      {/* Decorative background element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0EA5E9]/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 group-hover:border-[#0EA5E9]/50 transition-all shadow-xl">
                <Image src="/logo.png" alt="Vikings Gym" fill className="object-contain p-0.5 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white leading-none">
                  VIKINGS
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#0EA5E9] leading-none mt-1">
                  GYM
                </span>
              </div>
            </Link>
            <p className="text-[#737373] text-sm leading-relaxed mb-8 max-w-xs font-medium">
              {GYM_INFO.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={GYM_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:text-[#0EA5E9] hover:border-[#0EA5E9]/30 hover:bg-[#0EA5E9]/5 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <p className="text-[10px] font-bold text-[#737373] uppercase tracking-[0.2em]">Follow our journey</p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.25em] mb-8 border-b border-white/5 pb-2 w-fit">
              Navigation
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 text-[#737373] hover:text-white transition-all duration-300 text-sm font-semibold"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_#0EA5E9]" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.25em] mb-8 border-b border-white/5 pb-2 w-fit">
              Get in Touch
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#0EA5E9]/10 transition-colors">
                  <Phone className="w-4 h-4 text-[#0EA5E9]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#444] uppercase tracking-widest mb-1">Phone</span>
                  <a href={`tel:${GYM_INFO.phone}`} className="text-[#A3A3A3] hover:text-white transition-colors text-sm font-bold tracking-tight">{GYM_INFO.phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#0EA5E9]/10 transition-colors">
                  <Mail className="w-4 h-4 text-[#0EA5E9]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#444] uppercase tracking-widest mb-1">Email</span>
                  <a href={`mailto:${GYM_INFO.email}`} className="text-[#A3A3A3] hover:text-white transition-colors text-sm font-bold tracking-tight">{GYM_INFO.email}</a>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.25em] mb-8 border-b border-white/5 pb-2 w-fit">
              Operation Hours
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#0EA5E9]" />
                </div>
                <div>
                  <p className="text-[#A3A3A3] text-sm font-bold tracking-tight">Weekdays</p>
                  <p className="text-[#737373] text-xs font-medium mt-1 uppercase tracking-wider">{GYM_INFO.hours.weekdays}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#0EA5E9]" />
                </div>
                <div>
                  <p className="text-[#A3A3A3] text-sm font-bold tracking-tight">Weekends</p>
                  <p className="text-[#737373] text-xs font-medium mt-1 uppercase tracking-wider">{GYM_INFO.hours.weekends}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[#444] text-[10px] font-black uppercase tracking-[0.2em] text-center sm:text-left">
            &copy; {currentYear} VIKINGS GYM COLLECTIVE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[#444] text-[10px] font-black uppercase tracking-[0.2em]">Aurangabad, Bihar</span>
            <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse shadow-[0_0_8px_#0EA5E9]" />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
