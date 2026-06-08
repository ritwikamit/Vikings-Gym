"use client";

import { motion } from "framer-motion";
import { CheckCircle, Users, Trophy, Target } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6"
          >
            About <span className="text-red-600">Vikings Gym</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            Founded in 2024 in Aurangabad, Bihar, Vikings Gym isn't just a fitness center — it's a forging ground for champions. We believe in raw power, relentless dedication, and the warrior spirit that resides in everyone.
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10"
          >
            {/* Placeholder for Gym Image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent z-10" />
            <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
              <span className="text-gray-600 font-bold tracking-widest uppercase">Gym Facility</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">Our Story</h2>
            <p className="text-gray-400 leading-relaxed">
              Vikings Gym was born out of a desire to bring world-class fitness facilities to Aurangabad. We noticed a gap between commercial, crowded gyms and hardcore lifting environments. Our goal was to create a space that combines premium, state-of-the-art equipment with the gritty, focused atmosphere of a serious training facility.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Whether you're a beginner taking your first steps into fitness, or a seasoned athlete preparing for competition, our facility and expert trainers are equipped to help you crush your goals.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div>
                <h4 className="text-4xl font-black text-red-600 mb-2">500+</h4>
                <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">Active Members</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-red-600 mb-2">10,000</h4>
                <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">Sq. Ft Facility</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The principles that guide our community and our training philosophy.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Relentless Focus", desc: "Leave your distractions at the door. When you step into Vikings Gym, you focus entirely on the iron and your progress." },
              { icon: Users, title: "Warrior Community", desc: "We lift each other up. Our members and trainers form a brotherhood/sisterhood of individuals committed to self-improvement." },
              { icon: Trophy, title: "Uncompromising Quality", desc: "From our imported equipment to our certified trainers, we never compromise on the quality of your fitness experience." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors"
              >
                <div className="w-14 h-14 bg-red-600/10 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
