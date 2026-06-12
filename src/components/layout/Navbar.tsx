'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-500', scrolled ? 'glass-nav scrolled' : 'bg-transparent')}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 overflow-hidden rounded-lg border border-white/10 group-hover:border-[#0EA5E9]/40 transition-all">
                <Image src="/logo.png" alt="Vikings Gym" fill className="object-contain p-0.5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tighter text-white leading-none">VIKINGS</span>
                <span className="text-[9px] font-bold tracking-[0.25em] text-[#0EA5E9] leading-none mt-0.5 block">GYM</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link key={link.name} href={link.href} className={cn(
                    'px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300',
                    isActive ? 'text-white bg-white/10' : 'text-white/50 hover:text-white hover:bg-white/5'
                  )}>
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/plans" className="hidden lg:inline-flex items-center px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284C7] transition-all shadow-lg shadow-[#0EA5E9]/20">
                Join Now
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg glass text-white" aria-label="Menu">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm lg:hidden">
            <div className="flex flex-col h-full px-6 py-20">
              <div className="flex-1 flex flex-col items-center justify-center -mt-20 space-y-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <Link href={link.href} onClick={() => setIsOpen(false)} className="block text-4xl font-black uppercase text-white/80 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                  <Link href="/plans" onClick={() => setIsOpen(false)} className="inline-flex px-8 py-4 mt-8 text-xs font-bold tracking-wider uppercase text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all">
                    Join the Tribe
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
