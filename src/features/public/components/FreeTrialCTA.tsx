'use client';

import Link from 'next/link';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { GYM_INFO } from '@/lib/constants';
import { Reveal } from './shared';

export function FreeTrialCTA() {
  return (
    <section className="py-20 lg:py-24 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-[#C62828]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white text-[10px] font-bold tracking-[0.4em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C62828]" />
            Not Sure Yet?
          </div>
          <h2 className="font-podium text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-none">
            Try Us for{' '}
            <span className="gradient-text-fire">FREE</span>
          </h2>
          <p className="text-[#A3A3A3] text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-medium">
            Claim your complimentary trial pass and experience the Vikings Gym difference. No commitment, just results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C62828] text-white text-sm font-black tracking-widest uppercase rounded-2xl hover:bg-[#A32020] transition-all duration-500 shadow-[0_10px_40px_rgba(198,40,40,0.3)] hover:shadow-[0_15px_50px_rgba(198,40,40,0.5)] hover:-translate-y-1"
            >
              Claim Free Pass
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={`tel:${GYM_INFO.phone}`}
              className="inline-flex items-center gap-3 px-10 py-5 text-sm font-bold tracking-widest uppercase text-white rounded-2xl border-2 border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-500"
            >
              <Phone className="w-5 h-5" />
              Call to Book
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
