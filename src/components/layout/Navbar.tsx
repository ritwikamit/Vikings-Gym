'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass-nav-scrolled' : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 group-hover:border-[#C62828]/50 transition-all duration-500 shadow-2xl">
                <Image src="/logo.png" alt="Vikings Gym" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#C62828]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white leading-none group-hover:text-[#C62828] transition-colors duration-300">
                  VIKINGS
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#C62828] leading-none mt-1">
                  GYM
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 px-1.5 py-1.5 glass rounded-2xl border border-white/5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'relative px-5 py-2 text-[13px] font-semibold transition-all duration-300 rounded-xl overflow-hidden group/link',
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    )}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-bg"
                        className="absolute inset-0 bg-[#C62828] z-0"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/plans"
                className="hidden lg:inline-flex items-center gap-2 px-6 py-3 text-[11px] font-bold tracking-widest uppercase text-white bg-[#C62828] hover:bg-[#A32020] rounded-xl transition-all duration-300 shadow-lg shadow-[#C62828]/20 hover:shadow-[#C62828]/40 hover:-translate-y-0.5"
              >
                Join Now
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl glass border border-white/10 text-white hover:text-[#C62828] transition-all duration-300"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <span className={cn('block w-full h-0.5 bg-current transition-all duration-500 rounded-full', isOpen && 'rotate-45 translate-y-[7px]')} />
                  <span className={cn('block w-full h-0.5 bg-current transition-all duration-500 rounded-full', isOpen && 'opacity-0 translate-x-2')} />
                  <span className={cn('block w-full h-0.5 bg-current transition-all duration-500 rounded-full', isOpen && '-rotate-45 -translate-y-[7px]')} />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Fullscreen Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm lg:hidden"
          >
            <div className="flex flex-col h-full px-6 sm:px-10 py-5">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
                  <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                    <Image src="/logo.png" alt="Vikings Gym" fill className="object-cover" />
                  </div>
                  <span className="text-base font-bold tracking-tight text-white">
                    VIKINGS <span className="text-[#C62828]">GYM</span>
                  </span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="p-2 text-white/60 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Centered nav links */}
              <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                <div className="space-y-6 text-center">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: i * 0.08 + 0.1, duration: 0.5 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'block font-podium text-4xl sm:text-5xl text-white uppercase transition-colors duration-300',
                            isActive ? 'text-[#C62828]' : 'hover:text-white/70'
                          )}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: NAV_LINKS.length * 0.08 + 0.2, duration: 0.5 }}
                  className="mt-12"
                >
                  <Link
                    href="/plans"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase text-white border border-white/30 hover:border-white/60 rounded-xl transition-all duration-300 hover:bg-white/10"
                  >
                    Join the Tribe
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
