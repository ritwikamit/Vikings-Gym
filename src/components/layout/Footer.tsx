'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, MapPin } from 'lucide-react';
import { GYM_INFO, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 overflow-hidden rounded-lg border border-white/10">
                <Image src="/logo.png" alt="Vikings Gym" fill className="object-contain p-0.5" />
              </div>
              <div>
                <span className="text-lg font-black text-white leading-none">VIKINGS</span>
                <span className="text-[9px] font-bold tracking-[0.25em] text-[#0EA5E9] leading-none mt-0.5 block">GYM</span>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">{GYM_INFO.description}</p>
            <a href={GYM_INFO.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/60 hover:text-[#0EA5E9] transition-all w-fit px-3 py-2 gap-2 text-sm">
              <Instagram size={16} /> Instagram
            </a>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Contact</h4>
            <ul className="space-y-3">
              <li><a href={`tel:${GYM_INFO.phone}`} className="text-sm text-white/70 hover:text-white transition-colors">{GYM_INFO.phone}</a></li>
              <li><a href={`mailto:${GYM_INFO.email}`} className="text-sm text-white/70 hover:text-white transition-colors">{GYM_INFO.email}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Location</h4>
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-[#0EA5E9] mt-0.5 shrink-0" />
              <p className="text-sm text-white/50">{GYM_INFO.address}</p>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-xs text-white/30"><span className="text-white/50">Weekdays:</span> {GYM_INFO.hours.weekdays}</p>
              <p className="text-xs text-white/30"><span className="text-white/50">Weekends:</span> {GYM_INFO.hours.weekends}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">&copy; {new Date().getFullYear()} Vikings Gym. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/20">Aurangabad, Bihar</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
