"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, User, Mail, Phone, Lock, Crown, ChevronLeft, Dumbbell } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "", fitnessGoal: "", referralCode: "",
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) { setStep(2); return; }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Registration failed");
        setIsLoading(false);
        return;
      }
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (result?.ok) {
        toast.success("Welcome to the tribe, warrior!");
        router.push("/member/dashboard");
      } else {
        toast.error("Account created, please sign in");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/member/dashboard" });
    } catch (error) {
      toast.error("Failed to sign in with Google");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex relative overflow-hidden bg-slate-900 selection:bg-[#0EA5E9]/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(225,29,72,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(225,29,72,0.05),transparent_50%)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
      </div>

      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#0EA5E9]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#0284C7]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Brand */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-8 lg:p-12 relative z-10 h-full">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="inline-flex items-center gap-3 mb-8">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-white/10">
                <Image src="/logo.png" alt="Vikings Gym" fill className="object-contain p-0.5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">VIKINGS</span>
                <span className="block text-[10px] font-semibold tracking-[0.25em] text-[#0EA5E9]">GYM</span>
              </div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-md">
            <div className="flex items-center gap-2 text-white/50 text-xs tracking-[0.2em] uppercase mb-4">
              <Dumbbell className="w-3.5 h-3.5" />
              Join the Tribe
            </div>
            <h1 className="font-podium text-[clamp(2.2rem,4vw,3.2rem)] text-white leading-[1.1] mb-5">
              Begin Your<br />
              <span className="gradient-text-violet">Transformation</span>
            </h1>
            <p className="text-[#737373] text-sm leading-relaxed">
              Join 500+ warriors at Aurangabad&apos;s premier fitness destination. Your journey starts with a single step.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8">
            <div className="flex items-center gap-3 text-xs text-[#525252]">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] flex items-center justify-center text-[9px] font-bold text-white">
                    {['AK', 'PS', 'RV'][i - 1]}
                  </div>
                ))}
              </div>
              <span>Free trial session for all new members</span>
            </div>
          </motion.div>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-[#525252] text-xs">
          &copy; {new Date().getFullYear()} Vikings Gym. All rights reserved.
        </motion.p>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative z-10 h-full overflow-y-auto custom-scrollbar">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md my-auto pb-8 pt-4"
        >
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image src="/logo.png" alt="Vikings Gym" width={40} height={40} className="object-contain p-0.5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1">VIKINGS <span className="text-[#0EA5E9] block text-[10px] tracking-[0.25em] mt-1.5">GYM</span></span>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            <div className="relative bg-[#0A0A0A]/80 backdrop-blur-3xl rounded-[2rem] p-8 sm:p-10 border border-white/[0.04] shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-podium text-xl sm:text-2xl text-white">Join Vikings</h2>
                  <p className="text-[#737373] text-sm">Step {step} of 2</p>
                </div>
                <div className="flex gap-2">
                  <div className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-[#0EA5E9]' : 'bg-white/[0.06]'}`} />
                  <div className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#0EA5E9]' : 'bg-white/[0.06]'}`} />
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
                      <label className="text-[10px] font-bold text-[#A3A3A3] tracking-widest uppercase ml-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] group-focus-within:text-[#0EA5E9] transition-colors duration-300" />
                        <input type="text" required value={formData.name} onChange={update("name")}
                          className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-12 pr-4 py-3 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#0EA5E9]/50 focus:bg-white/[0.04] transition-all duration-300"
                          placeholder="John Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#A3A3A3] tracking-widest uppercase ml-1">Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] group-focus-within:text-[#0EA5E9] transition-colors duration-300" />
                        <input type="email" required value={formData.email} onChange={update("email")}
                          className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-12 pr-4 py-3 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#0EA5E9]/50 focus:bg-white/[0.04] transition-all duration-300"
                          placeholder="name@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#A3A3A3] tracking-widest uppercase ml-1">Phone</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] group-focus-within:text-[#0EA5E9] transition-colors duration-300" />
                        <input type="tel" required value={formData.phone} onChange={update("phone")}
                          className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-12 pr-4 py-3 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#0EA5E9]/50 focus:bg-white/[0.04] transition-all duration-300"
                          placeholder="+91 98765 43210" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#A3A3A3] tracking-widest uppercase ml-1">Create Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] group-focus-within:text-[#0EA5E9] transition-colors duration-300" />
                        <input type="password" required value={formData.password} onChange={update("password")}
                          className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-12 pr-4 py-3 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#0EA5E9]/50 focus:bg-white/[0.04] transition-all duration-300"
                          placeholder="••••••••" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#A3A3A3] tracking-widest uppercase ml-1">Fitness Goal</label>
                      <select value={formData.fitnessGoal} onChange={update("fitnessGoal")}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0EA5E9]/50 transition-all duration-300 appearance-none cursor-pointer">
                        <option value="" className="bg-[#0A0A0A]">Select your goal</option>
                        <option value="weight_loss" className="bg-[#0A0A0A]">Weight Loss</option>
                        <option value="muscle_gain" className="bg-[#0A0A0A]">Muscle Gain</option>
                        <option value="endurance" className="bg-[#0A0A0A]">Endurance & Stamina</option>
                        <option value="flexibility" className="bg-[#0A0A0A]">Flexibility</option>
                        <option value="general" className="bg-[#0A0A0A]">General Fitness</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#A3A3A3] tracking-widest uppercase ml-1">Referral Code (Optional)</label>
                      <input type="text" value={formData.referralCode} onChange={update("referralCode")}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#0EA5E9]/50 transition-all duration-300"
                        placeholder="REF-XXXXXX" />
                    </div>
                  </motion.div>
                )}

                <button type="submit" disabled={isLoading || isGoogleLoading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#9F1239] py-3.5 text-sm font-bold text-white uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(225,29,72,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{step === 1 ? "Continue" : "Create Account"} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>}
                  </span>
                </button>
              </form>

              {step === 1 && (
                <>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[10px] text-[#525252] uppercase tracking-widest font-bold">Or continue with</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading || isGoogleLoading}
                    className="mt-6 w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 text-white text-sm font-semibold transition-all duration-300 disabled:opacity-50"
                  >
                    {isGoogleLoading ? <Loader2 className="w-4 h-4 animate-spin text-[#737373]" /> : (
                      <>
                        <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                      </>
                    )}
                  </button>
                </>
              )}

              <p className="mt-8 text-center text-xs text-[#737373]">
                Already training with us?{" "}
                <Link href="/login" className="text-white font-bold tracking-wide hover:text-[#0EA5E9] transition-colors border-b border-white/20 hover:border-[#0EA5E9]/50 pb-0.5">Sign In</Link>
              </p>
            </div>
          </div>

          <p className="lg:hidden text-center mt-8 text-[#525252] text-[10px] uppercase tracking-widest">&copy; {new Date().getFullYear()} Vikings Gym</p>
        </motion.div>
      </div>
    </div>
  );
}
