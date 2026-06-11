'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { cn, calculateBMI, getBMICategory } from '@/lib/utils';
import { SectionHeading, Reveal } from './shared';

export function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w > 0 && h > 0) {
      const bmiValue = calculateBMI(w, h);
      setResult({ bmi: bmiValue, category: getBMICategory(bmiValue) });
    }
  };

  const colors = {
    Underweight: 'text-blue-400',
    Normal: 'text-emerald-400',
    Overweight: 'text-amber-400',
    Obese: 'text-red-500'
  };

  const bgs = {
    Underweight: 'bg-blue-400/5 border-blue-400/20',
    Normal: 'bg-emerald-400/5 border-emerald-400/20',
    Overweight: 'bg-amber-400/5 border-amber-400/20',
    Obese: 'bg-red-500/5 border-red-500/20'
  };

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0EA5E9]/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading badge="Health Metric" title="Know Your Base" subtitle="Your journey starts with understanding your current status." />
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <div className="p-10 rounded-[2.5rem] glass-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#0EA5E9]/20" />
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#0EA5E9]/10 flex items-center justify-center shadow-inner">
                  <Calculator className="w-7 h-7 text-[#0EA5E9]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">BMI Calculator</h3>
                  <p className="text-[#737373] text-sm">Body Mass Index Assessment</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Weight (kg)</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="00"
                    className="w-full px-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-lg font-bold placeholder-[#333] focus:outline-none focus:border-[#0EA5E9] focus:bg-white/[0.05] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Height (cm)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="000"
                    className="w-full px-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-lg font-bold placeholder-[#333] focus:outline-none focus:border-[#0EA5E9] focus:bg-white/[0.05] transition-all" />
                </div>
              </div>

              <button onClick={handleCalculate}
                className="w-full py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase text-white bg-[#0EA5E9] hover:bg-[#A32020] transition-all duration-300 shadow-[0_10px_30px_rgba(198,40,40,0.3)] hover:shadow-[0_15px_40px_rgba(198,40,40,0.4)] hover:-translate-y-1">
                Assess Now
              </button>

              <AnimatePresence>
                {result && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                    animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className={cn('p-8 rounded-3xl border text-center relative overflow-hidden', bgs[result.category as keyof typeof bgs])}
                  >
                    <div className="relative z-10">
                      <p className="text-[#737373] text-[10px] font-bold uppercase tracking-widest mb-2">Calculated Index</p>
                      <div className="flex items-center justify-center gap-4 mb-3">
                        <span className="text-6xl font-black text-white tracking-tighter">{result.bmi}</span>
                        <div className="w-px h-12 bg-white/10" />
                        <span className={cn('text-xl font-bold uppercase tracking-wider', colors[result.category as keyof typeof colors])}>
                          {result.category}
                        </span>
                      </div>
                      <p className="text-[#A3A3A3] text-xs leading-relaxed max-w-sm mx-auto">
                        This is a general indicator. For a comprehensive body composition analysis, visit us at the gym.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
