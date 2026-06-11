'use client';

import { motion } from 'framer-motion';
import { Dumbbell, Users, Target, Clock, Sparkles, IndianRupee } from 'lucide-react';
import { SectionHeading, StaggerContainer, staggerItem } from './shared';

export function WhyChooseUs() {
  const features = [
    { icon: Dumbbell, title: 'Modern Equipment', desc: 'Elite machines and free weights from world-class international brands.', color: '#0EA5E9' },
    { icon: Users, title: 'Expert Coaches', desc: 'Certified professionals dedicated to your personal growth and form.', color: '#3B82F6' },
    { icon: Target, title: 'Personalized Plans', desc: 'Data-driven workout and nutrition paths tailored to your goals.', color: '#10B981' },
    { icon: Clock, title: 'Flexible Access', desc: 'Train on your own schedule with our extended operating hours.', color: '#F59E0B' },
    { icon: Sparkles, title: 'Elite Atmosphere', desc: 'Premium, hygienic environment designed to keep you focused.', color: '#8B5CF6' },
    { icon: IndianRupee, title: 'Value Memberships', desc: 'Premium experience at competitive rates with transparent pricing.', color: '#EC4899' },
  ];

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0EA5E9]/5 rounded-full blur-[150px] -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading badge="Why Choose Us" title="Built for the Bold" subtitle="We provide the tools, the space, and the community. You provide the will." />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f) => (
            <motion.div key={f.title} variants={staggerItem}
              className="group relative p-8 lg:p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#0EA5E9]/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0EA5E9]/10 transition-all duration-500 shadow-xl">
                  <f.icon className="w-7 h-7 text-[#0EA5E9] group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#0EA5E9] transition-colors">{f.title}</h3>
                <p className="text-[#737373] text-sm sm:text-base leading-relaxed group-hover:text-[#A3A3A3] transition-colors">{f.desc}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#0EA5E9]/5 rounded-full blur-2xl -mb-12 -mr-12 group-hover:bg-[#0EA5E9]/10 transition-colors" />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
