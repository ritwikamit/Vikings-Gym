'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';
import { TESTIMONIALS } from '@/lib/constants';
import { SectionHeading } from './shared';

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Testimonials" title="What Our Warriors Say" subtitle="Real reviews from our community." />
        <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-5 lg:gap-6 min-w-max">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="w-[320px] sm:w-[340px] shrink-0 p-6 rounded-2xl glass-card hover:bg-white/[0.03] transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-[#C62828]/20 mb-4" />
                <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={cn('w-4 h-4', j < t.rating ? 'text-[#C62828] fill-[#C62828]' : 'text-white/[0.06]')} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C62828] to-[#8E0000] flex items-center justify-center text-white text-sm font-bold">
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-[#666] text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
