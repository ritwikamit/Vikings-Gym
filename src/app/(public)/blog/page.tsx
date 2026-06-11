"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";

const POSTS = [
  { id: 1, title: "5 Essential Tips for Beginners at the Gym", excerpt: "Starting your fitness journey can be overwhelming. Here are 5 essential tips to help you get started on the right foot.", author: "Rahul Singh", date: "Jan 15, 2026", category: "Beginners" },
  { id: 2, title: "The Ultimate Guide to Building Muscle Mass", excerpt: "Building muscle requires a combination of proper training, nutrition, and recovery. Let's dive into each aspect.", author: "Vikash Kumar", date: "Feb 10, 2026", category: "Training" },
  { id: 3, title: "Nutrition Myths Debunked: What Really Works", excerpt: "There are countless nutrition myths floating around. Let's separate fact from fiction and learn what really works.", author: "Sneha Gupta", date: "Mar 05, 2026", category: "Nutrition" },
  { id: 4, title: "Why Rest Days Are Just As Important As Training Days", excerpt: "Overtraining can lead to injuries and burnout. Learn why rest days are crucial for muscle growth and recovery.", author: "Amit Verma", date: "Mar 20, 2026", category: "Recovery" },
  { id: 5, title: "High-Intensity Interval Training (HIIT) Explained", excerpt: "Want to burn more calories in less time? HIIT might be the answer. Discover how to incorporate it into your routine safely.", author: "Vikash Kumar", date: "Apr 02, 2026", category: "Cardio" },
  { id: 6, title: "How to Stay Motivated When You Aren't Seeing Fast Results", excerpt: "Fitness is a marathon, not a sprint. Here are mental strategies to keep you going when the scale refuses to budge.", author: "Sneha Gupta", date: "Apr 15, 2026", category: "Mindset" },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" as const } };

export default function BlogPage() {
  return (
    <div className="pt-28 pb-20 bg-[#0F172A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Fitness <span className="gradient-text-violet">Blog</span>
          </h1>
          <p className="text-xl text-[#666]">Expert advice, training tips, and nutritional guidance from our certified trainers.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl overflow-hidden hover:border-[#0EA5E9]/30 transition-all group flex flex-col h-full card-hover"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center overflow-hidden">
                <div className="absolute top-4 left-4 bg-[#0EA5E9]/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10">
                  {post.category}
                </div>
                <div className="absolute inset-0 nordic-pattern opacity-10 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-[#666] mb-4 font-medium uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#0EA5E9] transition-colors">{post.title}</h3>
                <p className="text-[#666] text-sm mb-6 flex-grow leading-relaxed">{post.excerpt}</p>
                <Link href={`/blog`} className="inline-flex items-center text-[#0EA5E9] font-bold text-sm hover:text-[#E53935] transition-colors">
                  Read Article <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
