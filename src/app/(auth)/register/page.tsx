"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, User, Mail, Phone, Lock, Crown, ChevronLeft, Dumbbell } from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) { setStep(2); return; }
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); router.push("/member/dashboard"); }, 1500);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(225,29,72,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(225,29,72,0.05),transparent_50%)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
      </div>

      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#E11D48]/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#8E0000]/5 rounded-full blur-[120px]" />

      {/* Left Brand */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 lg:p-16 relative z-10">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="inline-flex items-center gap-3 mb-12">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-white/10">
                <Image src="/logo.png" alt="Vikings Gym" fill className="object-contain p-0.5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">VIKINGS</span>
                <span className="block text-[10px] font-semibold tracking-[0.25em] text-[#E11D48]">GYM</span>
              </div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-md">
            <div className="flex items-center gap-2 text-white/50 text-xs tracking-[0.2em] uppercase mb-4">
              <Dumbbell className="w-3.5 h-3.5" />
              Join the Tribe
            </div>
            <h1 className="font-podium text-[clamp(2.5rem,5vw,4rem)] text-white leading-[0.92] mb-4">
              Begin Your<br />
              <span className="gradient-text-fire">Transformation</span>
            </h1>
            <p className="text-[#737373] text-sm leading-relaxed">
              Join 500+ warriors at Aurangabad&apos;s premier fitness destination. Your journey starts with a single step.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-16">
            <div className="flex items-center gap-3 text-xs text-[#525252]">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-br from-[#E11D48] to-[#8E0000] flex items-center justify-center text-[9px] font-bold text-white">
                    {['AK', 'PS', 'RV'][i - 1]}
                  </div>
                ))}
              </div>
              <span>Free trial session for all new members</span>
            </div>
          </motion.div>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-[#525252] text-xs">
          &copy; 2026 Vikings Gym. All rights reserved.
        </motion.p>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image src="/logo.png" alt="Vikings Gym" width={40} height={40} className="object-contain p-0.5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">VIKINGS <span className="text-[#E11D48]">GYM</span></span>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
            <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl rounded-2xl p-8 sm:p-10 border border-white/[0.04]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-podium text-xl sm:text-2xl text-white">Join Vikings</h2>
                  <p className="text-[#737373] text-sm">Step {step} of 2</p>
                </div>
                <div className="flex gap-2">
                  <div className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-[#E11D48]' : 'bg-white/[0.06]'}`} />
                  <div className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#E11D48]' : 'bg-white/[0.06]'}`} />
                </div>
              </div>

              {step === 2 && (
                <button type="button" onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-[#525252] hover:text-white text-xs transition-colors mb-4">
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-[#A3A3A3] tracking-wider uppercase">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] group-focus-within:text-[#E11D48] transition-colors duration-300" />
                        <input type="text" required
                          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#E11D48]/40 focus:bg-white/[0.05] transition-all duration-300"
                          placeholder="John Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-[#A3A3A3] tracking-wider uppercase">Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] group-focus-within:text-[#E11D48] transition-colors duration-300" />
                        <input type="email" required
                          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#E11D48]/40 focus:bg-white/[0.05] transition-all duration-300"
                          placeholder="name@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-[#A3A3A3] tracking-wider uppercase">Phone</label>
                      <div className="relative group">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] group-focus-within:text-[#E11D48] transition-colors duration-300" />
                        <input type="tel" required
                          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#E11D48]/40 focus:bg-white/[0.05] transition-all duration-300"
                          placeholder="+91 98765 43210" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-[#A3A3A3] tracking-wider uppercase">Create Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] group-focus-within:text-[#E11D48] transition-colors duration-300" />
                        <input type="password" required
                          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#E11D48]/40 focus:bg-white/[0.05] transition-all duration-300"
                          placeholder="••••••••" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-[#A3A3A3] tracking-wider uppercase">Fitness Goal</label>
                      <select
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E11D48]/40 transition-all duration-300 appearance-none cursor-pointer">
                        <option value="" className="bg-[#0A0A0A]">Select your goal</option>
                        <option value="weight_loss" className="bg-[#0A0A0A]">Weight Loss</option>
                        <option value="muscle_gain" className="bg-[#0A0A0A]">Muscle Gain</option>
                        <option value="endurance" className="bg-[#0A0A0A]">Endurance & Stamina</option>
                        <option value="flexibility" className="bg-[#0A0A0A]">Flexibility</option>
                        <option value="general" className="bg-[#0A0A0A]">General Fitness</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-[#A3A3A3] tracking-wider uppercase">Referral Code (Optional)</label>
                      <input type="text"
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#E11D48]/40 transition-all duration-300"
                        placeholder="REF-XXXXXX" />
                    </div>
                  </motion.div>
                )}

                <button type="submit" disabled={isLoading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#E11D48] to-[#8E0000] py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#E11D48]/25 disabled:opacity-70 disabled:cursor-not-allowed">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF3B3B] to-[#E11D48] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{step === 1 ? "Continue" : "Create Account"} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>}
                  </span>
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-[#525252]">
                Already training with us?{" "}
                <Link href="/login" className="text-white font-medium hover:text-[#E11D48] transition-colors">Sign In</Link>
              </p>
            </div>
          </div>

          <p className="lg:hidden text-center mt-6 text-[#525252] text-[10px]">&copy; 2026 Vikings Gym</p>
        </motion.div>
      </div>
    </div>
  );
}
