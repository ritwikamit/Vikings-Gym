"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { MEMBERSHIP_PLANS } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" as const } };

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C62828]/10 rounded-full blur-[150px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C62828]/5 rounded-full blur-[150px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C62828]/10 border border-[#C62828]/20 text-[#C62828] text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl">
              Investment in yourself
            </span>
          </motion.div>
          <motion.h1 {...fadeUp} className="font-podium text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter mb-8 leading-none">
            Choose Your <span className="gradient-text-fire">Battle</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-[#A3A3A3] text-lg sm:text-xl font-medium leading-relaxed">
            Transparent pricing with no hidden fees. All plans include full access to our premium facilities and group classes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {MEMBERSHIP_PLANS.map((plan, index) => {
            const isPopular = plan.duration === 3;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className={cn(
                  'relative group rounded-[2.5rem] border transition-all duration-700 overflow-hidden flex flex-col p-1',
                  isPopular
                    ? 'bg-gradient-to-b from-[#C62828]/40 to-[#080808] border-[#C62828]/30 shadow-2xl shadow-[#C62828]/20 scale-[1.05] z-10 lg:-translate-y-4'
                    : 'bg-white/[0.02] border-white/10 hover:border-[#C62828]/30'
                )}
              >
                <div className="relative rounded-[2.3rem] overflow-hidden bg-black/60 backdrop-blur-xl p-8 lg:p-10 flex-1 flex flex-col">
                  {isPopular && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#C62828]" />
                  )}
                  
                  <div className="text-center mb-10">
                    {isPopular && (
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#C62828] text-white text-[9px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg">
                        Recommended
                      </span>
                    )}
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight uppercase">{plan.name}</h3>
                    <div className="flex justify-center items-baseline gap-1 mt-4">
                      <span className="text-4xl lg:text-5xl font-black text-white">{formatCurrency(plan.price)}</span>
                    </div>
                    <p className="text-[10px] font-bold text-[#737373] uppercase tracking-[0.25em] mt-3">
                      {plan.duration > 1 ? `₹${Math.round(plan.price / plan.duration)} / MONTH` : 'SINGLE PAYMENT'}
                    </p>
                  </div>

                  <div className="h-px bg-white/5 w-full mb-8" />

                  <div className="space-y-4 mb-12 flex-1">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 group/item">
                        <div className={cn('mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors', isPopular ? 'bg-[#C62828]/10' : 'bg-white/5 group-hover/item:bg-[#C62828]/10')}>
                          <Check className={cn('w-2.5 h-2.5 transition-colors', isPopular ? 'text-[#C62828]' : 'text-[#444] group-hover/item:text-[#C62828]')} />
                        </div>
                        <span className="text-[#A3A3A3] text-sm font-medium group-hover/item:text-white transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/register"
                    className={cn(
                      'group relative w-full py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden text-center shadow-xl',
                      isPopular
                        ? 'bg-white text-black hover:bg-[#C62828] hover:text-white'
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    )}
                  >
                    <span className="relative z-10">Enlist Now</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison CTA */}
        <motion.div {...fadeUp} className="text-center bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-5">
            <Check size={300} className="text-[#C62828]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 tracking-tight relative z-10">Still Have Questions?</h2>
          <p className="text-[#737373] text-lg max-w-2xl mx-auto mb-10 font-medium relative z-10">
            Not sure which plan is right for you? Come visit us for a free tour and session. Our experts will help you find the perfect fit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <Link href="/contact" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-[#C62828] text-white font-black text-xs tracking-widest uppercase hover:bg-[#A32020] transition-all shadow-xl shadow-[#C62828]/20">
              Speak to a Coach
            </Link>
            <Link href="/about" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 text-white font-black text-xs tracking-widest uppercase border border-white/10 hover:bg-white/10 transition-all">
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
