'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQS } from '@/lib/constants';
import { SectionHeading } from './shared';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-[#080808]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="FAQ" title="Knowledge Base" subtitle="Find answers to common questions about our facilities, plans, and policies." />
        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                <button onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={cn(
                    'w-full text-left p-6 sm:p-8 rounded-[1.5rem] border transition-all duration-500 overflow-hidden relative group',
                    isOpen ? 'bg-[#0EA5E9]/5 border-[#0EA5E9]/30 shadow-2xl shadow-[#0EA5E9]/5' : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                  )}>
                  <div className="flex items-center justify-between gap-6 relative z-10">
                    <h3 className={cn('font-bold text-base sm:text-lg transition-colors duration-500', isOpen ? 'text-white' : 'text-[#A3A3A3] group-hover:text-white')}>
                      {faq.question}
                    </h3>
                    <div className={cn('w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500', isOpen ? 'bg-[#0EA5E9] text-white rotate-180' : 'bg-white/5 text-[#666]')}>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
                        <p className="text-[#737373] text-sm sm:text-base leading-relaxed mt-5 pr-10 font-medium">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
