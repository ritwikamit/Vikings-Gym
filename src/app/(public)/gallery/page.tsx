"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

const IMAGES = [
  { id: 1, category: "Equipment", title: "Free Weights Zone" },
  { id: 2, category: "Cardio", title: "Cardio Section" },
  { id: 3, category: "Functional", title: "CrossFit Arena" },
  { id: 4, category: "Classes", title: "Yoga Studio" },
  { id: 5, category: "Equipment", title: "Machine Area" },
  { id: 6, category: "Amenities", title: "Locker Rooms" },
  { id: 7, category: "Classes", title: "Spin Class" },
  { id: 8, category: "Functional", title: "HIIT Zone" },
  { id: 9, category: "Equipment", title: "Deadlift Platforms" },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" as const } };

export default function GalleryPage() {
  return (
    <div className="pt-28 pb-20 bg-[#000000] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Facility <span className="gradient-text-fire">Gallery</span>
          </h1>
          <p className="text-xl text-[#666]">
            Take a virtual tour of our state-of-the-art 10,000 sq ft fitness facility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              className="relative group aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] cursor-pointer border border-white/[0.04]"
            >
              <div className="absolute inset-0 nordic-pattern opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center text-[#333] font-bold uppercase tracking-widest text-2xl rotate-[-45deg] opacity-20">
                Vikings Gym
              </div>
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <Maximize2 className="w-8 h-8 text-white mb-3" />
                <span className="text-[#C62828] font-medium text-sm mb-1 uppercase tracking-wider">{img.category}</span>
                <h3 className="text-white text-xl font-bold">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
