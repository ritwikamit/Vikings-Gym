"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { MEMBERSHIP_PLANS } from "@/lib/constants";
import Link from "next/link";

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6"
          >
            Membership <span className="text-red-600">Plans</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Choose the plan that fits your goals. No hidden fees, no complicated contracts. Just pure fitness.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-24">
          {MEMBERSHIP_PLANS.map((plan, index) => {
            const isPopular = plan.duration === 3;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass rounded-3xl p-8 border flex flex-col ${
                  isPopular ? "border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.15)] transform md:-translate-y-4" : "border-white/10"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mb-6 h-10">{plan.description}</p>
                  <div className="flex justify-center items-end gap-1">
                    <span className="text-4xl font-black text-white">{formatCurrency(plan.price)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {formatCurrency(Math.round(plan.price / plan.duration))} / month
                  </p>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 shrink-0 ${isPopular ? "text-red-500" : "text-gray-500"}`} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/register"
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                    isPopular 
                      ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20" 
                      : "bg-[#1A1A1A] hover:bg-[#222] text-white border border-[#333]"
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
