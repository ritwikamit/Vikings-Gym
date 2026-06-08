'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FITNESS_GOALS } from '@/lib/constants';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Check,
  Target,
} from 'lucide-react';

const STEPS = ['Personal Info', 'Password', 'Fitness Goal'];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fitnessGoal: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (s: number) => {
    const newErrors: Record<string, string> = {};

    if (s === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Enter a valid email';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = 'Enter a valid 10-digit phone number';
      }
    }

    if (s === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (s === 3) {
      if (!formData.fitnessGoal) {
        newErrors.fitnessGoal = 'Select a fitness goal';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-800/5 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 shadow-2xl shadow-black/50">
          {/* Brand */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-red-600 to-red-800 mb-4 shadow-lg shadow-red-600/20"
            >
              <span className="text-white font-bold text-xl">V</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Join Vikings Gym
            </h1>
            <p className="text-[#A3A3A3] text-sm">
              Create your account and start your transformation
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((label, i) => {
              const stepNum = i + 1;
              const isCompleted = step > stepNum;
              const isCurrent = step === stepNum;
              return (
                <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-center gap-1">
                    <div
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all duration-300',
                        isCompleted
                          ? 'bg-red-600 text-white'
                          : isCurrent
                          ? 'bg-red-600/20 text-red-500 ring-2 ring-red-500/50'
                          : 'bg-white/[0.06] text-[#737373]'
                      )}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : stepNum}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={cn(
                          'flex-1 h-0.5 rounded-full transition-all duration-500',
                          isCompleted ? 'bg-red-600' : 'bg-white/[0.06]'
                        )}
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-[10px] font-medium',
                      isCurrent ? 'text-white' : 'text-[#737373]'
                    )}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#A3A3A3] mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Rahul Kumar"
                        className={cn(
                          'w-full bg-white/[0.04] border rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-[#737373] outline-none transition-all duration-200',
                          errors.name
                            ? 'border-red-500'
                            : 'border-white/[0.08] focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                        )}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#A3A3A3] mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@example.com"
                        className={cn(
                          'w-full bg-white/[0.04] border rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-[#737373] outline-none transition-all duration-200',
                          errors.email
                            ? 'border-red-500'
                            : 'border-white/[0.08] focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                        )}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-[#A3A3A3] mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="9876543210"
                        className={cn(
                          'w-full bg-white/[0.04] border rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-[#737373] outline-none transition-all duration-200',
                          errors.phone
                            ? 'border-red-500'
                            : 'border-white/[0.08] focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                        )}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Password */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-[#A3A3A3] mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => updateField('password', e.target.value)}
                        placeholder="••••••••"
                        className={cn(
                          'w-full bg-white/[0.04] border rounded-lg pl-10 pr-10 py-2.5 text-white text-sm placeholder:text-[#737373] outline-none transition-all duration-200',
                          errors.password
                            ? 'border-red-500'
                            : 'border-white/[0.08] focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                    {/* Password strength hints */}
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={cn(
                            'h-1 flex-1 rounded-full transition-all',
                            formData.password.length >= level * 2
                              ? formData.password.length >= 8
                                ? 'bg-green-500'
                                : 'bg-yellow-500'
                              : 'bg-white/[0.06]'
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#A3A3A3] mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                        placeholder="••••••••"
                        className={cn(
                          'w-full bg-white/[0.04] border rounded-lg pl-10 pr-10 py-2.5 text-white text-sm placeholder:text-[#737373] outline-none transition-all duration-200',
                          errors.confirmPassword
                            ? 'border-red-500'
                            : 'border-white/[0.08] focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Fitness Goal */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-[#A3A3A3] mb-3">
                      What&apos;s your primary fitness goal?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {FITNESS_GOALS.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => updateField('fitnessGoal', goal)}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 text-left',
                            formData.fitnessGoal === goal
                              ? 'bg-red-600/10 border-red-500/50 text-red-500'
                              : 'bg-white/[0.03] border-white/[0.08] text-[#A3A3A3] hover:border-white/[0.15] hover:text-white'
                          )}
                        >
                          <Target className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{goal}</span>
                        </button>
                      ))}
                    </div>
                    {errors.fitnessGoal && (
                      <p className="text-red-500 text-xs mt-2">{errors.fitnessGoal}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/[0.1] text-[#A3A3A3] hover:text-white hover:border-white/[0.2] transition-all text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-red-600/20 text-sm"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Divider & Login Link */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[#737373] text-xs">OR</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <p className="text-center text-sm text-[#A3A3A3]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-red-500 hover:text-red-400 font-medium transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
