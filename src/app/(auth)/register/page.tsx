"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2, User, Phone } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#000000] p-4">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C62828]/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg">
              <Image src="/logo.jpeg" alt="Vikings Gym" width={40} height={40} className="object-cover" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              VIKINGS <span className="text-[#C62828]">GYM</span>
            </span>
          </Link>
          <p className="text-[#666]">Start your fitness journey today</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <div className="flex gap-2 mb-8">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-[#C62828]' : 'bg-white/[0.06]'}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-[#C62828]' : 'bg-white/[0.06]'}`} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A3A3A3]">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                    <input type="text" required
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#C62828]/50 transition-colors"
                      placeholder="John Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A3A3A3]">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                    <input type="email" required
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#C62828]/50 transition-colors"
                      placeholder="name@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A3A3A3]">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                    <input type="tel" required
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#C62828]/50 transition-colors"
                      placeholder="+91 98765 43210" />
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A3A3A3]">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                    <input type="password" required
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#C62828]/50 transition-colors"
                      placeholder="••••••••" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A3A3A3]">Fitness Goal</label>
                  <select className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C62828]/50 transition-colors">
                    <option value="">Select your main goal</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="endurance">Endurance & Stamina</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="general">General Fitness</option>
                  </select>
                </div>
              </>
            )}
            <button type="submit" disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white btn-primary disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{step === 1 ? "Next Step" : "Create Account"} <ArrowRight className="w-4 h-4" /></>}
            </button>
            {step === 2 && (
              <button type="button" onClick={() => setStep(1)}
                className="w-full text-[#666] hover:text-white transition-colors text-sm">Back</button>
            )}
          </form>
          <div className="mt-8 text-center text-sm text-[#666]">
            Already have an account?{" "}
            <Link href="/login" className="text-white font-medium hover:text-[#C62828] transition-colors">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
