"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2, User, Phone } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(2);
      return;
    }
    
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      router.push("/member/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0A0A0A] p-4">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[128px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-black text-white tracking-tighter mb-2">
            VIKINGS<span className="text-red-600">.</span>
          </Link>
          <p className="text-gray-400">Start your fitness journey today</p>
        </div>

        <div className="glass rounded-2xl p-8 border border-white/5">
          <div className="flex gap-2 mb-8">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-red-600' : 'bg-[#262626]'}`}></div>
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-red-600' : 'bg-[#262626]'}`}></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      required
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      required
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      required
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      required
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Fitness Goal</label>
                  <select className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors">
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {step === 1 ? "Next Step" : "Create Account"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-gray-400 hover:text-white transition-colors text-sm"
              >
                Back
              </button>
            )}
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-white font-medium hover:text-red-500 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
