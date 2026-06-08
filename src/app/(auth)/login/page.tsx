"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); router.push("/admin/dashboard"); }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#000000] p-4">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C62828]/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8E0000]/10 rounded-full blur-[128px] pointer-events-none" />

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
          <p className="text-[#666]">Sign in to your account</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#A3A3A3]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#C62828]/50 transition-colors"
                  placeholder="name@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#A3A3A3]">Password</label>
                <Link href="/forgot-password" className="text-xs text-[#C62828] hover:text-[#E53935] transition-colors">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#C62828]/50 transition-colors"
                  placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white btn-primary disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
          <div className="mt-8 text-center text-sm text-[#666]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-white font-medium hover:text-[#C62828] transition-colors">Join Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
