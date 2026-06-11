'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, Zap } from 'lucide-react';
import { SectionHeading, StaggerContainer, staggerItem } from './shared';

export function Transformations() {
  const data = [
    { name: 'Rahul K.', before: 95, after: 72, duration: '4 Months', type: 'Weight Loss' },
    { name: 'Amit V.', before: 68, after: 78, duration: '6 Months', type: 'Muscle Gain' },
    { name: 'Sneha G.', before: 78, after: 62, duration: '5 Months', type: 'Fat Loss' },
  ];

  return (
    <section className="section-padding bg-black overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0EA5E9]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Results" title="Warrior Evolutions" subtitle="Evidence of what discipline and expert coaching can achieve." />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((t) => (
            <motion.div key={t.name} variants={staggerItem}
              className="group relative rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-[#0EA5E9]/40 transition-all duration-500 p-1"
            >
              <div className="relative rounded-[2.3rem] overflow-hidden bg-gradient-to-b from-[#161616] to-black p-8 text-center">
                <div className="mb-8">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[#0EA5E9] uppercase">{t.type}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{t.name}</h3>
                </div>

                <div className="flex items-center justify-between mb-10 relative">
                  <div className="relative z-10 text-center">
                    <p className="text-[#737373] text-[10px] uppercase tracking-widest mb-1">Before</p>
                    <p className="text-3xl font-black text-white">{t.before}<span className="text-xs ml-1 font-medium">kg</span></p>
                  </div>
                  
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center border border-[#0EA5E9]/20 group-hover:scale-125 transition-transform duration-500">
                    <ArrowRight className="w-5 h-5 text-[#0EA5E9]" />
                  </div>

                  <div className="relative z-10 text-center">
                    <p className="text-[#0EA5E9] text-[10px] uppercase tracking-widest mb-1 font-bold">After</p>
                    <p className="text-3xl font-black text-white">{t.after}<span className="text-xs ml-1 font-medium">kg</span></p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 px-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#737373]" />
                    <span className="text-xs font-bold text-[#A3A3A3]">{t.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#0EA5E9]" />
                    <span className="text-xs font-black text-white">{Math.abs(t.before - t.after)} KG {t.before > t.after ? 'LOST' : 'GAINED'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
