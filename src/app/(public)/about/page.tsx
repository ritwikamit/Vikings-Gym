"use client";

import { motion } from "framer-motion";
import { Users, Trophy, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" as const } };

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 {...fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            About <span className="gradient-text-violet">Vikings Gym</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-[#666] text-lg leading-relaxed">
            Founded in 2024 in Aurangabad, Bihar, Vikings Gym isn&apos;t just a fitness center — it&apos;s a forging ground for champions.
          </motion.p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-[400px] rounded-2xl overflow-hidden border border-white/[0.04]">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
            <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] nordic-pattern flex items-center justify-center">
              <span className="text-[#333] font-bold tracking-widest uppercase text-lg">Gym Facility</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Our Story</h2>
            <p className="text-[#666] leading-relaxed">
              Vikings Gym was born out of a desire to bring world-class fitness facilities to Aurangabad. We noticed a gap between commercial, crowded gyms and hardcore lifting environments. Our goal was to create a space that combines premium, state-of-the-art equipment with the gritty, focused atmosphere of a serious training facility.
            </p>
            <p className="text-[#666] leading-relaxed">
              Whether you&apos;re a beginner taking your first steps into fitness, or a seasoned athlete preparing for competition, our facility and expert trainers are equipped to help you crush your goals.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/[0.06]">
              <div>
                <h4 className="text-4xl font-extrabold text-[#0EA5E9] mb-2">500+</h4>
                <p className="text-sm text-[#666] uppercase tracking-wider font-medium">Active Members</p>
              </div>
              <div>
                <h4 className="text-4xl font-extrabold text-[#0EA5E9] mb-2">10,000</h4>
                <p className="text-sm text-[#666] uppercase tracking-wider font-medium">Sq. Ft Facility</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Our Core Values</h2>
            <p className="text-[#666] max-w-2xl mx-auto">The principles that guide our community and training philosophy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Relentless Focus", desc: "Leave your distractions at the door. When you step into Vikings Gym, you focus entirely on the iron and your progress." },
              { icon: Users, title: "Warrior Community", desc: "We lift each other up. Our members and trainers form a brotherhood/sisterhood of individuals committed to self-improvement." },
              { icon: Trophy, title: "Uncompromising Quality", desc: "From our imported equipment to our certified trainers, we never compromise on the quality of your fitness experience." },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:border-[#0EA5E9]/20 transition-all duration-300">
                <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center mb-6">
                  <v.icon className="w-7 h-7 text-[#0EA5E9]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-[#666] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center py-12 border-t border-white/[0.06]">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Join the Tribe?</h2>
          <Link href="/plans"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl btn-primary">
            <span>View Plans <ArrowRight className="w-4 h-4 inline ml-1" /></span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
