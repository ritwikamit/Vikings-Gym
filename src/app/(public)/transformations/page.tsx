"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TRANSFORMATIONS = [
  {
    id: 1,
    name: "Arjun Patel",
    duration: "6 Months",
    weightLost: "15 kg",
    story: "From being overweight and lethargic to running my first half-marathon. The trainers at Vikings Gym completely transformed my lifestyle.",
    rating: 5,
  },
  {
    id: 2,
    name: "Neha Sharma",
    duration: "4 Months",
    weightLost: "8 kg",
    story: "I wanted to tone up for my wedding. The personalized diet and workout plan helped me achieve my dream physique.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ravi Kumar",
    duration: "1 Year",
    weightLost: "25 kg",
    story: "Lost 25kg and gained muscle. The community here keeps you motivated even on days when you feel like giving up.",
    rating: 5,
  },
  {
    id: 4,
    name: "Pooja Mishra",
    duration: "8 Months",
    weightLost: "12 kg",
    story: "Strength training completely changed my body composition. I'm lifting weights I never thought possible.",
    rating: 5,
  },
  {
    id: 5,
    name: "Mohit Gupta",
    duration: "1.5 Years",
    weightLost: "Muscle Gained: 10 kg",
    story: "Came in as a skinny guy, built significant muscle mass thanks to the bodybuilding experts at Vikings.",
    rating: 5,
  },
  {
    id: 6,
    name: "Kavita Singh",
    duration: "3 Months",
    weightLost: "5 kg",
    story: "The functional training and CrossFit classes are intense but so rewarding. Never felt better!",
    rating: 4,
  },
];

export default function TransformationsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Real People, <span className="text-red-600">Real Results</span>
          </h1>
          <p className="text-xl text-neutral-400">
            Witness the incredible journeys of our members. Your success story could be next.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TRANSFORMATIONS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden group hover:border-red-600/50 transition-colors"
            >
              {/* Image Placeholder */}
              <div className="relative h-64 bg-[#1a1a1a] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent z-10" />
                <div className="flex gap-4 z-20">
                  <div className="w-24 h-48 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700">
                    <span className="text-neutral-500 font-bold uppercase rotate-[-90deg]">Before</span>
                  </div>
                  <div className="w-24 h-48 bg-neutral-700 rounded-lg flex items-center justify-center border border-neutral-600">
                    <span className="text-neutral-400 font-bold uppercase rotate-[-90deg]">After</span>
                  </div>
                </div>
                
                {/* Stats Badge */}
                <div className="absolute top-4 right-4 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {t.weightLost}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{t.name}</h3>
                    <div className="flex items-center text-red-500 text-sm font-medium">
                      <Calendar className="w-4 h-4 mr-1" />
                      {t.duration}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-red-600 text-red-600" />
                    ))}
                  </div>
                </div>
                <p className="text-neutral-400 leading-relaxed">"{t.story}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#991B1B] to-red-600 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto text-lg">
            Join Vikings Gym today and get a personalized workout and nutrition plan designed specifically for your goals.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-neutral-100 transition-colors"
          >
            Start Your Transformation <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
