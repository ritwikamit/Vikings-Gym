'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { MEMBERSHIP_PLANS } from '@/lib/constants';
import { SectionHeading, StaggerContainer, staggerItem } from './shared';
import { TiltCard } from '@/components/ui/TiltCard';
import { Magnetic } from '@/components/ui/Magnetic';

export function MembershipPlans() {
  return (
    <section className="section-padding bg-[#080808] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C62828]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading badge="Membership Plans" title="Choose Your Battle Plan" subtitle="Invest in your future self with our flexible premium membership tiers." />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {MEMBERSHIP_PLANS.map((plan) => (
            <motion.div key={plan.name} variants={staggerItem} className="h-full">
              <TiltCard intensity={10} className="h-full">
                <div
                  className={cn(
                    'relative h-full group rounded-[2.5rem] border transition-all duration-700 overflow-hidden flex flex-col',
                    plan.popular
                      ? 'bg-gradient-to-b from-[#C62828]/20 to-black border-[#C62828]/40 scale-[1.05] shadow-[0_20px_60px_-15px_rgba(198,40,40,0.3)] z-10'
                      : 'bg-white/[0.02] border-white/10 hover:border-[#C62828]/30'
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#C62828]" />
                  )}
                  <div className="p-8 lg:p-10 flex-1 flex flex-col">
                    {plan.popular && (
                      <div className="mb-6">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#C62828] text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
                          Recommended
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{plan.name}</h3>
                    <p className="text-[#737373] text-sm mb-6 font-medium">
                      {plan.duration} {plan.duration === 1 ? 'Month' : 'Months'} Access
                    </p>
                    
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl lg:text-5xl font-black text-white">{formatCurrency(plan.price)}</span>
                      </div>
                      <p className="text-[#A3A3A3] text-xs mt-2 font-semibold uppercase tracking-widest">
                        {plan.duration > 1 ? `₹${Math.round(plan.price / plan.duration)} / month` : 'Full Access'}
                      </p>
                    </div>

                    <div className="h-px bg-white/5 w-full mb-8" />

                    <ul className="space-y-4 mb-10 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <div className="mt-1 w-4 h-4 rounded-full bg-[#C62828]/10 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-[#C62828]" />
                          </div>
                          <span className="text-[#A3A3A3] font-medium leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Magnetic strength={0.3}>
                      <Link
                        href="/contact"
                        className={cn(
                          'group relative w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-500 overflow-hidden text-center block',
                          plan.popular
                            ? 'bg-white text-black hover:bg-white/90'
                            : 'bg-white/5 text-white hover:bg-[#C62828] border border-white/10 hover:border-[#C62828]'
                        )}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Get Started
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

