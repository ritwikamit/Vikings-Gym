'use client';

import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-6 border-white/5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 animate-pulse" />
        <div className="w-16 h-6 rounded-full bg-white/5 animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-8 bg-white/5 rounded animate-pulse w-24" />
        <div className="h-4 bg-white/5 rounded animate-pulse w-32" />
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="glass rounded-[2rem] p-8 border-white/5">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-6 bg-white/5 rounded animate-pulse w-40" />
          <div className="h-4 bg-white/5 rounded animate-pulse w-56" />
        </div>
      </div>
      <div className="h-[300px] bg-white/5 rounded-xl animate-pulse" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="glass rounded-2xl p-6 border-white/5">
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 pb-4 border-b border-white/5 last:border-0">
            <div className="h-10 w-10 bg-white/5 rounded animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/5 rounded animate-pulse w-40" />
              <div className="h-3 bg-white/5 rounded animate-pulse w-32" />
            </div>
            <div className="h-6 w-16 bg-white/5 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
