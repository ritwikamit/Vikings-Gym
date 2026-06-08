"use client";

import { motion } from "framer-motion";
import { Instagram, Award, Star } from "lucide-react";

const TRAINERS = [
  { id: "1", name: "Rahul Singh", specialization: "Strength & Conditioning", experience: "5 Years", image: "RS", bio: "Former powerlifter specializing in compound movements and absolute strength." },
  { id: "2", name: "Amit Verma", specialization: "CrossFit & HIIT", experience: "3 Years", image: "AV", bio: "High-energy coach focusing on metabolic conditioning and functional fitness." },
  { id: "3", name: "Sneha Gupta", specialization: "Yoga & Rehabilitation", experience: "4 Years", image: "SG", bio: "Certified yoga instructor helping athletes with mobility and injury prevention." },
  { id: "4", name: "Vikash Kumar", specialization: "Sports Performance", experience: "6 Years", image: "VK", bio: "Expert in athletic conditioning, agility, and explosive power training." },
];

export default function TrainersPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6"
          >
            Our <span className="text-red-600">Trainers</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Meet the experts dedicated to pushing you beyond your limits.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRAINERS.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden group border border-white/5 hover:border-red-500/30 transition-all"
            >
              <div className="h-64 bg-[#1A1A1A] relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity" />
                <span className="text-6xl font-black text-white/10 group-hover:text-red-500/20 transition-colors z-0">
                  {trainer.image}
                </span>
                
                {/* Social links overlay */}
                <div className="absolute bottom-4 right-4 z-20 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <button className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700">
                    <Instagram className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 relative z-20 -mt-8">
                <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
                <p className="text-red-500 text-sm font-medium mb-4">{trainer.specialization}</p>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {trainer.bio}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Award className="w-4 h-4 text-red-500" />
                    <span>{trainer.experience} Exp.</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
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
