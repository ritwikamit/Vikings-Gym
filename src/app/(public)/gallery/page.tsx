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

export default function GalleryPage() {
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
            Facility <span className="text-red-600">Gallery</span>
          </h1>
          <p className="text-xl text-neutral-400">
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
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group aspect-square rounded-2xl overflow-hidden bg-[#1a1a1a] cursor-pointer"
            >
              {/* Placeholder pattern */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(#333 2px, transparent 2px)',
                backgroundSize: '20px 20px'
              }} />
              
              <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-bold uppercase tracking-widest text-2xl rotate-[-45deg] opacity-20">
                Vikings Gym
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                <Maximize2 className="w-8 h-8 text-white mb-3" />
                <span className="text-red-500 font-medium text-sm mb-1 uppercase tracking-wider">{img.category}</span>
                <h3 className="text-white text-xl font-bold">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
