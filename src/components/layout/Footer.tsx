'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sword,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { GYM_INFO, NAV_LINKS } from '@/lib/constants';

const quickLinks = NAV_LINKS.slice(0, 6);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-[#262626]">
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DC2626] to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
      >
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              <Sword className="w-7 h-7 text-[#DC2626] transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-2xl font-black tracking-wider">
                <span className="text-[#DC2626]">V</span>
                <span className="text-white">IKINGS</span>
              </span>
            </Link>
            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">
              {GYM_INFO.description}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={GYM_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-[#262626] text-[#A3A3A3] hover:text-[#DC2626] hover:border-[#DC2626]/30 transition-all duration-300 text-sm"
              >
                <Instagram className="w-4 h-4" />
                @vikings_fitness
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[#A3A3A3] hover:text-white transition-colors duration-200 text-sm"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#DC2626]" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#DC2626] mt-0.5 shrink-0" />
                <div>
                  <a
                    href={`tel:${GYM_INFO.phone}`}
                    className="text-[#A3A3A3] hover:text-white transition-colors text-sm"
                  >
                    {GYM_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#DC2626] mt-0.5 shrink-0" />
                <a
                  href={`mailto:${GYM_INFO.email}`}
                  className="text-[#A3A3A3] hover:text-white transition-colors text-sm"
                >
                  {GYM_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#DC2626] mt-0.5 shrink-0" />
                <span className="text-[#A3A3A3] text-sm leading-relaxed">
                  {GYM_INFO.address}
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Operating Hours + Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Operating Hours
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#DC2626] shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Weekdays</p>
                  <p className="text-[#A3A3A3] text-xs">{GYM_INFO.hours.weekdays}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#DC2626] shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Weekends</p>
                  <p className="text-[#A3A3A3] text-xs">{GYM_INFO.hours.weekends}</p>
                </div>
              </li>
            </ul>

            {/* Newsletter */}
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              Newsletter
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                form.reset();
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                required
                className="flex-1 px-3 py-2 bg-white/5 border border-[#262626] rounded-lg text-sm text-white placeholder-[#737373] focus:outline-none focus:border-[#DC2626]/50 transition-colors"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] rounded-lg text-white text-sm font-medium hover:from-[#EF4444] hover:to-[#DC2626] transition-all duration-300 shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-[#737373] text-xs text-center sm:text-left">
            © {currentYear} Vikings Gym. All rights reserved.
          </p>
          <p className="text-[#737373] text-xs flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-[#DC2626] fill-[#DC2626]" /> in Aurangabad
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
