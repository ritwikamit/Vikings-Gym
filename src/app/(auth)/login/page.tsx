"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff, Crown } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn("credentials", {
      email, password, redirect: false,
    });
    setIsLoading(false);
    if (result?.ok) {
      toast.success("Welcome back, warrior!");
      router.push("/admin/dashboard");
    } else {
      toast.error(result?.error || "Invalid credentials");
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/admin/dashboard" });
    } catch (error) {
      toast.error("Failed to sign in with Google");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex relative overflow-hidden bg-black selection:bg-[#E11D48]/30">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(225,29,72,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(225,29,72,0.05),transparent_50%)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
      </div>

      {/* Red ambient glow */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#E11D48]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#8E0000]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Left - Brand Section */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-8 lg:p-12 relative z-10 h-full">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="inline-flex items-center gap-3 mb-8">
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
              <Crown className="w-3.5 h-3.5" />
              Welcome Back
            </div>
            <h1 className="font-podium text-[clamp(2.2rem,4vw,3.2rem)] text-white leading-[1.1] mb-5">
              Forge Your<br />
              <span className="gradient-text-fire">Next Chapter</span>
            </h1>
            <p className="text-[#737373] text-sm leading-relaxed">
              Step back into the arena. Your journey, your progress, your legacy — all waiting for you.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8">
            <div className="flex items-center gap-3 text-xs text-[#525252]">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-br from-[#E11D48] to-[#8E0000] flex items-center justify-center text-[9px] font-bold text-white">
                    {['AK', 'PS', 'RV'][i - 1]}
                  </div>
                ))}
              </div>
              <span>Join <strong className="text-[#A3A3A3]">500+ warriors</strong> already training</span>
            </div>
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-[#525252] text-xs">
          &copy; {new Date().getFullYear()} Vikings Gym. All rights reserved.
        </motion.p>
      </div>

      {/* Right - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative z-10 h-full overflow-y-auto custom-scrollbar">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md my-auto"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center gap-2 mb-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image src="/logo.png" alt="Vikings Gym" width={40} height={40} className="object-contain p-0.5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1">VIKINGS <span className="text-[#E11D48] block text-[10px] tracking-[0.25em] mt-1.5">GYM</span></span>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            <div className="relative bg-[#0A0A0A]/80 backdrop-blur-3xl rounded-[2rem] p-8 sm:p-10 border border-white/[0.04] shadow-2xl">
              <div className="mb-8">
                <h2 className="font-podium text-2xl sm:text-3xl text-white mb-2">Sign In</h2>
                <p className="text-[#737373] text-sm">Access your Vikings account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] tracking-widest uppercase ml-1">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] group-focus-within:text-[#E11D48] transition-colors duration-300" />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-12 pr-4 py-3.5 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#E11D48]/50 focus:bg-white/[0.04] transition-all duration-300"
                      placeholder="name@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1 pr-1">
                    <label className="text-[10px] font-bold text-[#A3A3A3] tracking-widest uppercase">Password</label>
                    <Link href="/forgot-password" className="text-[10px] text-[#525252] hover:text-[#E11D48] transition-colors tracking-widest uppercase font-bold">Forgot?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] group-focus-within:text-[#E11D48] transition-colors duration-300" />
                    <input type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-12 pr-12 py-3.5 text-white text-sm placeholder-[#525252] focus:outline-none focus:border-[#E11D48]/50 focus:bg-white/[0.04] transition-all duration-300"
                      placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#525252] hover:text-white transition-colors">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={isLoading || isGoogleLoading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#E11D48] to-[#9F1239] py-4 text-sm font-bold text-white uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(225,29,72,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Enter Arena <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>}
                  </span>
                </button>
              </form>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[10px] text-[#525252] uppercase tracking-widest font-bold">Or continue with</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading || isGoogleLoading}
                className="mt-6 w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 text-white text-sm font-semibold transition-all duration-300 disabled:opacity-50"
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

              <p className="mt-8 text-center text-xs text-[#737373]">
                New to Vikings?{" "}
                <Link href="/register" className="text-white font-bold tracking-wide hover:text-[#E11D48] transition-colors border-b border-white/20 hover:border-[#E11D48]/50 pb-0.5">Create Account</Link>
              </p>
            </div>
          </div>

          <p className="lg:hidden text-center mt-8 text-[#525252] text-[10px] uppercase tracking-widest">&copy; {new Date().getFullYear()} Vikings Gym</p>
        </motion.div>
      </div>
    </div>
  );
}
