'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Target, Trophy } from 'lucide-react';
import { SectionHeading, StaggerContainer, staggerItem } from './shared';

export function ServicesSection() {
  const services = [
    {
      icon: Users,
      title: 'Personal Training',
      desc: 'One-on-one coaching with certified experts. Customized workout and diet plans tailored to your goals, backed by progress tracking and form correction.',
      cta: 'Find a Trainer',
      href: '/trainers',
    },
    {
      icon: Target,
      title: 'Group Classes',
      desc: 'High-energy group sessions from HIIT to yoga. Train alongside fellow warriors, push each other harder, and achieve more together.',
      cta: 'View Schedule',
      href: '/about',
    },
    {
      icon: Trophy,
      title: 'Achieve Your Goals',
      desc: 'Whether it is weight loss, muscle gain, or athletic performance — our structured programs and expert guidance guarantee results.',
      cta: 'Start Your Journey',
      href: '/plans',
    },
  ];

  return (
    <section className="section-padding bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0EA5E9]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Services" title="Train Like a Viking" subtitle="World-class training programs designed to forge champions." />
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s) => (
            <motion.div key={s.title} variants={staggerItem}
              className="group relative rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-[#0EA5E9]/40 transition-all duration-700 bg-gradient-to-b from-[#0A0A0A] to-black"
            >
              <div className="relative p-10 pb-0">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#0EA5E9]/5 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-[#0EA5E9]/10 transition-colors" />
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#0EA5E9]/10 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <s.icon className="w-8 h-8 text-[#0EA5E9]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#0EA5E9] transition-colors">{s.title}</h3>
                <p className="text-[#737373] text-base leading-relaxed">{s.desc}</p>
              </div>
              <div className="p-10 pt-8">
                <Link href={s.href}
                  className="inline-flex items-center gap-2 text-[#0EA5E9] text-xs font-bold tracking-widest uppercase group/link hover:text-white transition-colors"
                >
                  {s.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] via-[#0EA5E9]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
