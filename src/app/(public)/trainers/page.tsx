"use client";

import { motion } from "framer-motion";
import { Instagram, Award, Star } from "lucide-react";

const TRAINERS = [
  { id: "1", name: "Rahul Singh", specialization: "Strength & Conditioning", experience: "5 Years", image: "RS", bio: "Former powerlifter specializing in compound movements and absolute strength." },
  { id: "2", name: "Amit Verma", specialization: "CrossFit & HIIT", experience: "3 Years", image: "AV", bio: "High-energy coach focusing on metabolic conditioning and functional fitness." },
  { id: "3", name: "Sneha Gupta", specialization: "Yoga & Rehabilitation", experience: "4 Years", image: "SG", bio: "Certified yoga instructor helping athletes with mobility and injury prevention." },
  { id: "4", name: "Vikash Kumar", specialization: "Sports Performance", experience: "6 Years", image: "VK", bio: "Expert in athletic conditioning, agility, and explosive power training." },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" as const } };

export default function TrainersPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 {...fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Our <span className="gradient-text-violet">Trainers</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-[#666] text-lg">
            Meet the experts dedicated to pushing you beyond your limits.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRAINERS.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="glass-card rounded-2xl overflow-hidden group hover:border-[#0EA5E9]/20 transition-all duration-500"
            >
              <div className="h-64 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10 opacity-80" />
                <span className="text-6xl font-extrabold text-white/[0.06] group-hover:text-[#0EA5E9]/10 transition-colors z-0">
                  {trainer.image}
                </span>
                <div className="absolute bottom-4 right-4 z-20 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-8 h-8 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center hover:bg-[#0284C7] transition-colors">
                    <Instagram className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6 relative z-20 -mt-8 bg-[#0A0A0A] rounded-t-2xl border border-white/[0.04] mx-3">
                <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
                <p className="text-[#0EA5E9] text-sm font-medium mb-4">{trainer.specialization}</p>
                <p className="text-[#666] text-sm mb-6 leading-relaxed">{trainer.bio}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 text-[#A3A3A3] text-sm">
                    <Award className="w-4 h-4 text-[#0EA5E9]" />
                    <span>{trainer.experience} Exp.</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#0EA5E9] text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.8</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
