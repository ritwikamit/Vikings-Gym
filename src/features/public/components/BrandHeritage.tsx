'use client';

import { Dumbbell } from 'lucide-react';
import { Reveal, SectionBadge } from './shared';

export function BrandHeritage() {
  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="left" className="relative">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#0EA5E9]/10 to-black border border-white/5 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <Dumbbell className="w-40 h-40 text-[#0EA5E9]/10" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-[#0EA5E9]/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#0EA5E9]/20 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#0EA5E9]/30 rounded-full" />
            </div>
          </Reveal>
          <Reveal direction="right">
            <SectionBadge>Our Legacy</SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Founded in <span className="text-[#0EA5E9]">2024</span> to Forge Warriors
            </h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed mb-6">
              From a single vision to the most premier fitness destination in the city — Vikings Gym was born from the belief that everyone has a warrior within. Our state-of-the-art facility, expert coaches, and battle-hardened community exist for one purpose: to help you conquer your limits.
            </p>
            <p className="text-[#737373] text-sm leading-relaxed mb-8">
              We have built more than a gym — we have built a brotherhood. A place where iron meets willpower, and ordinary becomes extraordinary. This is your arena.
            </p>
            <div className="flex items-center gap-8">
              <div>
                <p className="font-podium text-4xl text-white">500+</p>
                <p className="text-[#737373] text-xs uppercase tracking-widest font-bold">Warriors Trained</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="font-podium text-4xl text-white">15+</p>
                <p className="text-[#737373] text-xs uppercase tracking-widest font-bold">Expert Coaches</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="font-podium text-4xl text-white">1</p>
                <p className="text-[#737373] text-xs uppercase tracking-widest font-bold">Elite Arena</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
