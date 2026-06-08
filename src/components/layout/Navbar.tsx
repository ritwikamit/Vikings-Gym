'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const;

const mobileItemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const } }),
};

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
                      isActive ? 'text-[#C62828]' : 'text-[#A3A3A3] hover:text-white'
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
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/plans"
                  className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg btn-primary"
                >
                  <span>Join Now</span>
                </Link>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative p-2.5 text-white hover:text-[#C62828] transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 z-50 h-full w-[280px] sm:w-[320px] bg-[#000000] border-l border-white/[0.06] lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                  <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
                    <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                      <Image src="/logo.jpeg" alt="Vikings Gym" fill className="object-cover" />
                    </div>
                    <span className="text-base font-bold tracking-tight text-white">
                      VIKINGS <span className="text-[#C62828]">GYM</span>
                    </span>
                  </Link>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-[#666] hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Links */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                    return (
                      <motion.div key={link.name} custom={i} variants={mobileItemVariants} initial="hidden" animate="visible">
                        <Link
                          href={link.href}
                          className={cn(
                            'flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 mb-1',
                            isActive
                              ? 'bg-[#C62828]/10 text-[#C62828]'
                              : 'text-[#A3A3A3] hover:bg-white/[0.03] hover:text-white'
                          )}
                        >
                          {link.name}
                          <ChevronRight className={cn('w-4 h-4', isActive ? 'text-[#C62828]' : 'text-[#666]')} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom CTA */}
                <div className="p-4 border-t border-white/[0.06] space-y-2">
                  <Link
                    href="/plans"
                    className="flex items-center justify-center w-full px-6 py-3.5 text-sm font-semibold text-white rounded-xl btn-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Join Now</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center w-full px-6 py-3.5 text-sm font-medium text-[#A3A3A3] rounded-xl border border-white/[0.08] hover:bg-white/[0.03] hover:text-white transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Trial
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
