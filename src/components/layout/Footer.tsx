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
    <footer className="relative bg-[#000000] border-t border-white/[0.04]">
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C62828]/50 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-white/[0.08]">
                <Image src="/logo.jpeg" alt="Vikings Gym" fill className="object-cover" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                VIKINGS <span className="text-[#C62828]">GYM</span>
              </span>
            </Link>
            <p className="text-[#666] text-sm leading-relaxed mb-6 max-w-xs">
              {GYM_INFO.description}
            </p>
            <a
              href={GYM_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#A3A3A3] hover:text-[#C62828] hover:border-[#C62828]/30 transition-all duration-300 text-sm"
            >
              <Instagram className="w-4 h-4" />
              @vikings_fitness
            </a>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[#666] hover:text-white transition-all duration-200 text-sm"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#C62828]" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C62828] mt-0.5 shrink-0" />
                <a href={`tel:${GYM_INFO.phone}`} className="text-[#666] hover:text-white transition-colors text-sm">{GYM_INFO.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C62828] mt-0.5 shrink-0" />
                <a href={`mailto:${GYM_INFO.email}`} className="text-[#666] hover:text-white transition-colors text-sm">{GYM_INFO.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C62828] mt-0.5 shrink-0" />
                <span className="text-[#666] text-sm leading-relaxed">{GYM_INFO.address}</span>
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">
              Hours
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C62828] shrink-0" />
                <div>
                  <p className="text-[#A3A3A3] text-sm font-medium">Weekdays</p>
                  <p className="text-[#666] text-xs">{GYM_INFO.hours.weekdays}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C62828] shrink-0" />
                <div>
                  <p className="text-[#A3A3A3] text-sm font-medium">Weekends</p>
                  <p className="text-[#666] text-xs">{GYM_INFO.hours.weekends}</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#666] text-xs text-center sm:text-left">
            &copy; {currentYear} Vikings Gym. All rights reserved.
          </p>
          <p className="text-[#666] text-xs">
            Aurangabad, Bihar
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
