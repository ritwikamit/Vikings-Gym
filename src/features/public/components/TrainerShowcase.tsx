'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import { SectionHeading, StaggerContainer, staggerItem, Reveal } from './shared';
import { TiltCard } from '@/components/ui/TiltCard';
import { Magnetic } from '@/components/ui/Magnetic';

export function TrainerShowcase() {
  const trainers = [
    { name: 'Vikram Singh', role: 'Head Coach', spec: 'Strength & Conditioning', exp: '8+ Yrs', color: '#C62828' },
    { name: 'Ankit Kumar', role: 'Elite Trainer', spec: 'Bodybuilding Specialist', exp: '6+ Yrs', color: '#3B82F6' },
    { name: 'Ravi Sharma', role: 'Pro Trainer', spec: 'CrossFit & Functional', exp: '5+ Yrs', color: '#10B981' },
    { name: 'Priya Patel', role: 'Wellness Coach', spec: 'Yoga & Flexibility', exp: '7+ Yrs', color: '#F59E0B' },
  ];

  return (
    <section className="section-padding bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="The Elite" title="Meet the Masters" subtitle="World-class guidance for world-class results. Our coaches are here to push you." />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trainers.map((t) => (
            <motion.div key={t.name} variants={staggerItem} className="h-full">
              <TiltCard intensity={15} className="h-full">
                <div
                  className="group h-full relative rounded-[2rem] overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-[#C62828]/40 transition-all duration-500"
                >
                  <div className="relative h-80 bg-gradient-to-b from-[#161616] to-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden">
                    {/* Abstract pattern placeholder */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full" />
                      <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-[#C62828] rounded-full" />
                    </div>
                    
                    <div className="relative w-32 h-32 rounded-full border-4 border-[#C62828]/20 group-hover:border-[#C62828] transition-all duration-500 flex items-center justify-center bg-black shadow-2xl overflow-hidden mb-6">
                      <span className="text-4xl font-black text-white">{getInitials(t.name)}</span>
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#C62828]/20 to-transparent" />
                    </div>

                    <div className="text-center px-6">
                      <span className="text-[10px] font-bold tracking-[0.3em] text-[#C62828] uppercase mb-1 block">{t.role}</span>
                      <h3 className="text-xl font-bold text-white mb-1">{t.name}</h3>
                      <p className="text-[#737373] text-sm font-medium">{t.spec}</p>
                    </div>

                    {/* Hover Action */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center translate-y-full group-hover:translate-y-0">
                      <Magnetic strength={0.4}>
                        <Link href="/trainers" className="block px-8 py-3 rounded-xl bg-[#C62828] text-white text-xs font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-xl shadow-[#C62828]/20">
                          View Full Profile
                        </Link>
                      </Magnetic>
                    </div>

                    <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md text-white text-[10px] font-bold border border-white/10 uppercase tracking-wider">
                      {t.exp}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </StaggerContainer>
        <Reveal className="text-center mt-12">
          <Link href="/trainers" className="inline-flex items-center gap-2 text-[#737373] hover:text-[#C62828] text-sm font-bold tracking-widest uppercase transition-all group">
            See All Elite Trainers
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

