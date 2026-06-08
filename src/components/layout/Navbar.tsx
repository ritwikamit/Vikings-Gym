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
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 overflow-hidden rounded-lg border border-white/[0.08] group-hover:border-white/20 transition-all duration-500">
                <Image src="/logo.jpeg" alt="Vikings Gym" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-none">
                  VIKINGS
                </span>
                <span className="text-[10px] font-semibold tracking-[0.25em] text-[#C62828] leading-none">
                  GYM
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'relative px-3.5 py-2 text-sm font-medium transition-all duration-300 rounded-lg',
                      isActive ? 'text-[#C62828]' : 'text-white/80 hover:text-white'
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C62828] rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/plans"
                className="hidden lg:inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white border border-white/30 hover:border-white/60 rounded-xl transition-all duration-300 hover:bg-white/10"
              >
                Get Started
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative p-2.5 text-white hover:text-[#C62828] transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <span className="sr-only">{isOpen ? 'Close' : 'Open'} menu</span>
                <div className="space-y-1.5">
                  <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300', isOpen && 'rotate-45 translate-y-2')} />
                  <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300', isOpen && 'opacity-0')} />
                  <span className={cn('block w-4 h-0.5 bg-white transition-all duration-300', isOpen && 'w-6 -rotate-45 -translate-y-2')} />
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
                    <Image src="/logo.jpeg" alt="Vikings Gym" fill className="object-cover" />
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
