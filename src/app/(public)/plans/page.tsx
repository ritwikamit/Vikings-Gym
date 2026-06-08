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
    <main className="min-h-screen bg-[#000000] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 {...fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Membership <span className="gradient-text-fire">Plans</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-[#666] text-lg">
            Choose the plan that fits your goals. No hidden fees, no complicated contracts.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {MEMBERSHIP_PLANS.map((plan, index) => {
            const isPopular = plan.duration === 3;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className={cn(
                  'relative rounded-2xl p-8 border flex flex-col transition-all duration-500',
                  isPopular
                    ? 'bg-gradient-to-b from-[#C62828]/10 to-[#080808] border-[#C62828]/30 shadow-xl shadow-[#C62828]/10 scale-[1.02] lg:-translate-y-4'
                    : 'bg-[#0A0A0A] border-white/[0.04] hover:border-[#C62828]/20'
                )}
              >
                {isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C62828] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-5 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex justify-center items-end gap-1">
                    <span className="text-4xl font-extrabold text-white">{formatCurrency(plan.price)}</span>
                  </div>
                  <p className="text-sm text-[#666] mt-2">
                    {formatCurrency(Math.round(plan.price / plan.duration))} / month
                  </p>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className={cn('w-5 h-5 shrink-0', isPopular ? 'text-[#C62828]' : 'text-[#666]')} />
                      <span className="text-[#A3A3A3] text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/register"
                  className={cn(
                    'w-full py-4 rounded-xl font-bold text-center transition-all duration-300',
                    isPopular
                      ? 'btn-primary'
                      : 'bg-white/[0.03] border border-white/[0.08] text-white hover:bg-white/[0.06] hover:border-[#C62828]/30'
                  )}
                >
                  <span>Choose {plan.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
