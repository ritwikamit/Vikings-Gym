"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Star } from "lucide-react";
import Link from "next/link";

const TRANSFORMATIONS = [
  { id: 1, name: "Arjun Patel", duration: "6 Months", weightLost: "15 kg", story: "From being overweight and lethargic to running my first half-marathon. The trainers at Vikings Gym completely transformed my lifestyle.", rating: 5 },
  { id: 2, name: "Neha Sharma", duration: "4 Months", weightLost: "8 kg", story: "I wanted to tone up for my wedding. The personalized diet and workout plan helped me achieve my dream physique.", rating: 5 },
  { id: 3, name: "Ravi Kumar", duration: "1 Year", weightLost: "25 kg", story: "Lost 25kg and gained muscle. The community here keeps you motivated even on days when you feel like giving up.", rating: 5 },
  { id: 4, name: "Pooja Mishra", duration: "8 Months", weightLost: "12 kg", story: "Strength training completely changed my body composition. I'm lifting weights I never thought possible.", rating: 5 },
  { id: 5, name: "Mohit Gupta", duration: "1.5 Years", weightLost: "Muscle: 10 kg", story: "Came in as a skinny guy, built significant muscle mass thanks to the bodybuilding experts at Vikings.", rating: 5 },
  { id: 6, name: "Kavita Singh", duration: "3 Months", weightLost: "5 kg", story: "The functional training and CrossFit classes are intense but so rewarding. Never felt better!", rating: 4 },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" as const } };

export default function TransformationsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#0F172A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Real People, <span className="gradient-text-violet">Real Results</span>
          </h1>
          <p className="text-xl text-[#666]">Witness the incredible journeys of our members. Your story could be next.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TRANSFORMATIONS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl overflow-hidden group hover:border-[#0EA5E9]/30 transition-all duration-500 card-hover"
            >
              <div className="relative h-64 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
                <div className="flex gap-4 z-20">
                  <div className="w-24 h-48 bg-neutral-900 rounded-lg flex items-center justify-center border border-white/[0.04]">
                    <span className="text-neutral-700 font-bold uppercase rotate-[-90deg] text-sm tracking-widest">Before</span>
                  </div>
                  <div className="w-24 h-48 bg-neutral-800 rounded-lg flex items-center justify-center border border-white/[0.08]">
                    <span className="text-neutral-600 font-bold uppercase rotate-[-90deg] text-sm tracking-widest">After</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-20 bg-[#0EA5E9] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {t.weightLost}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{t.name}</h3>
                    <div className="flex items-center text-[#0EA5E9] text-sm font-medium">
                      <Calendar className="w-4 h-4 mr-1" />
                      {t.duration}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#0EA5E9] text-[#0EA5E9]" />
                    ))}
                  </div>
                </div>
                <p className="text-[#666] leading-relaxed">&ldquo;{t.story}&rdquo;</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-2xl p-8 md:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
              Join Vikings Gym today and get a personalized workout and nutrition plan designed for your goals.
            </p>
            <Link href="/register"
              className="inline-flex items-center gap-2 bg-white text-[#0EA5E9] px-8 py-4 rounded-xl font-bold hover:bg-neutral-100 transition-all duration-300">
              Start Your Transformation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
