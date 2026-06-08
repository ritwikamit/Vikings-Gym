'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Dumbbell, Users, Clock, Sparkles, IndianRupee,
  Star, ChevronDown, ChevronUp, Phone, Mail, MapPin,
  ArrowRight, Check, Quote, Calculator, Trophy, Target,
  Zap, Send, Crown, Award,
} from 'lucide-react';
import { cn, formatCurrency, calculateBMI, getBMICategory, getInitials } from '@/lib/utils';
import { MEMBERSHIP_PLANS, TESTIMONIALS, FAQS, GYM_INFO } from '@/lib/constants';

/* ─── Animation Wrappers ─── */
function Reveal({ children, className, delay = 0, direction = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const dirMap = { up: { y: 40 }, left: { x: -40 }, right: { x: 40 } };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-badge">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C62828]" />
      {children}
    </div>
  );
}

function SectionHeading({ badge, title, subtitle }: { badge: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="text-center mb-12 lg:mb-16">
      <SectionBadge>{badge}</SectionBadge>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="text-[#666] text-base sm:text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </Reveal>
  );
}

/* ─── HERO ─── */
function HeroSection() {
  const stats = [
    { value: '500+', label: 'Warriors' },
    { value: '95%', label: 'Success Rate' },
    { value: '15+', label: 'Coaches' },
    { value: '24/7', label: 'Support' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
        poster="/logo.jpeg"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4" type="video/mp4" />
      </video>

      {/* Overlay layers */}
      <div className="absolute inset-0 video-overlay-top z-[1]" />
      <div className="absolute inset-0 video-overlay-bottom z-[1]" />
      <div className="absolute inset-0 video-overlay-center z-[1]" />
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Red ambient glow */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#C62828]/20 rounded-full blur-[180px] z-[1] animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-[#C62828]/10 rounded-full blur-[180px] z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="animate-reveal">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/10 text-white text-[10px] sm:text-[11px] font-bold tracking-[0.4em] uppercase mb-8 lg:mb-10 shadow-2xl">
              <Crown className="w-3.5 h-3.5 text-[#C62828]" />
              The Elite Training Collective
            </span>
          </div>

          {/* Main Heading */}
          <div className="animate-reveal-1">
            <h1 className="font-podium text-[clamp(3.5rem,12vw,8.5rem)] text-white mb-2 tracking-tighter leading-[0.85]">
              Forge Your
            </h1>
            <h1 className="font-podium text-[clamp(3.5rem,12vw,8.5rem)] gradient-text-fire tracking-tighter leading-[0.85]">
              STRENGTH
            </h1>
          </div>

          {/* Subtext */}
          <div className="animate-reveal-2">
            <p className="text-[#A3A3A3] text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mt-8 lg:mt-10">
              Transform your body, conquer your limits. Join the most{" "}
              <span className="text-white font-bold border-b-2 border-[#C62828]">premier fitness destination</span> in the city.
            </p>
          </div>

          {/* CTA Row */}
          <div className="animate-reveal-3 mt-10 lg:mt-12">
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <Link
                href="/plans"
                className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#C62828] text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(198,40,40,0.3)] hover:shadow-[0_0_60px_rgba(198,40,40,0.5)] hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 text-white/80 hover:text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-colors"
              >
                Explore Arena
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="animate-reveal-4 mt-12 sm:mt-16 lg:mt-24">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-8 sm:gap-16 lg:gap-20">
              {stats.map((stat) => (
                <div key={stat.label} className="group">
                  <p className="font-podium text-3xl sm:text-4xl lg:text-5xl text-white group-hover:text-[#C62828] transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-[#737373] text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-2 font-bold group-hover:text-white/60 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#C62828] rounded-full shadow-[0_0_10px_#C62828]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── WHY CHOOSE US ─── */
function WhyChooseUs() {
  const features = [
    { icon: Dumbbell, title: 'Modern Equipment', desc: 'Elite machines and free weights from world-class international brands.', color: '#C62828' },
    { icon: Users, title: 'Expert Coaches', desc: 'Certified professionals dedicated to your personal growth and form.', color: '#3B82F6' },
    { icon: Target, title: 'Personalized Plans', desc: 'Data-driven workout and nutrition paths tailored to your goals.', color: '#10B981' },
    { icon: Clock, title: 'Flexible Access', desc: 'Train on your own schedule with our extended operating hours.', color: '#F59E0B' },
    { icon: Sparkles, title: 'Elite Atmosphere', desc: 'Premium, hygienic environment designed to keep you focused.', color: '#8B5CF6' },
    { icon: IndianRupee, title: 'Value Memberships', desc: 'Premium experience at competitive rates with transparent pricing.', color: '#EC4899' },
  ];

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C62828]/5 rounded-full blur-[150px] -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading badge="Why Choose Us" title="Built for the Bold" subtitle="We provide the tools, the space, and the community. You provide the will." />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f) => (
            <motion.div key={f.title} variants={staggerItem}
              className="group relative p-8 lg:p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#C62828]/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C62828]/10 transition-all duration-500 shadow-xl">
                  <f.icon className="w-7 h-7 text-[#C62828] group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#C62828] transition-colors">{f.title}</h3>
                <p className="text-[#737373] text-sm sm:text-base leading-relaxed group-hover:text-[#A3A3A3] transition-colors">{f.desc}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#C62828]/5 rounded-full blur-2xl -mb-12 -mr-12 group-hover:bg-[#C62828]/10 transition-colors" />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── MEMBERSHIP PLANS ─── */
function MembershipPlans() {
  return (
    <section className="section-padding bg-[#080808] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C62828]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading badge="Membership Plans" title="Choose Your Battle Plan" subtitle="Invest in your future self with our flexible premium membership tiers." />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {MEMBERSHIP_PLANS.map((plan) => (
            <motion.div key={plan.name} variants={staggerItem}
              className={cn(
                'relative group rounded-[2.5rem] border transition-all duration-700 overflow-hidden flex flex-col',
                plan.popular
                  ? 'bg-gradient-to-b from-[#C62828]/20 to-black border-[#C62828]/40 scale-[1.05] shadow-[0_20px_60px_-15px_rgba(198,40,40,0.3)] z-10'
                  : 'bg-white/[0.02] border-white/10 hover:border-[#C62828]/30'
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#C62828]" />
              )}
              <div className="p-8 lg:p-10 flex-1 flex flex-col">
                {plan.popular && (
                  <div className="mb-6">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#C62828] text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
                      Recommended
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{plan.name}</h3>
                <p className="text-[#737373] text-sm mb-6 font-medium">
                  {plan.duration} {plan.duration === 1 ? 'Month' : 'Months'} Access
                </p>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-black text-white">{formatCurrency(plan.price)}</span>
                  </div>
                  <p className="text-[#A3A3A3] text-xs mt-2 font-semibold uppercase tracking-widest">
                    {plan.duration > 1 ? `₹${Math.round(plan.price / plan.duration)} / month` : 'Full Access'}
                  </p>
                </div>

                <div className="h-px bg-white/5 w-full mb-8" />

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <div className="mt-1 w-4 h-4 rounded-full bg-[#C62828]/10 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#C62828]" />
                      </div>
                      <span className="text-[#A3A3A3] font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={cn(
                    'group relative w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-500 overflow-hidden text-center',
                    plan.popular
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-white/5 text-white hover:bg-[#C62828] border border-white/10 hover:border-[#C62828]'
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── TRAINERS ─── */
function TrainerShowcase() {
  const trainers = [
    { name: 'Vikram Singh', role: 'Head Coach', spec: 'Strength & Conditioning', exp: '8+ Yrs', color: '#C62828' },
    { name: 'Ankit Kumar', role: 'Elite Trainer', spec: 'Bodybuilding Specialist', exp: '6+ Yrs', color: '#3B82F6' },
    { name: 'Ravi Sharma', role: 'Pro Trainer', spec: 'CrossFit & Functional', exp: '5+ Yrs', color: '#10B981' },
    { name: 'Priya Patel', role: 'Wellness Coach', spec: 'Yoga & Flexibility', exp: '7+ Yrs', color: '#F59E0B' },
  ];

  return (
    <section className="section-padding bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="The Elite" title="Meet the Masters" subtitle="World-class guidance for world-class results. Our coaches are here to push you." />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trainers.map((t) => (
            <motion.div key={t.name} variants={staggerItem}
              className="group relative rounded-[2rem] overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-[#C62828]/40 transition-all duration-500"
            >
              <div className="relative h-80 bg-gradient-to-b from-[#161616] to-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden">
                {/* Abstract pattern placeholder */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full" />
                  <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-[#C62828] rounded-full" />
                </div>
                
                <div className="relative w-32 h-32 rounded-full border-4 border-[#C62828]/20 group-hover:border-[#C62828] transition-all duration-500 flex items-center justify-center bg-black shadow-2xl overflow-hidden mb-6">
                  <span className="text-4xl font-black text-white">{getInitials(t.name)}</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#C62828]/20 to-transparent" />
                </div>

                <div className="text-center px-6">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[#C62828] uppercase mb-1 block">{t.role}</span>
                  <h3 className="text-xl font-bold text-white mb-1">{t.name}</h3>
                  <p className="text-[#737373] text-sm font-medium">{t.spec}</p>
                </div>

                {/* Hover Action */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center translate-y-full group-hover:translate-y-0">
                  <Link href="/trainers" className="px-8 py-3 rounded-xl bg-[#C62828] text-white text-xs font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-xl shadow-[#C62828]/20">
                    View Full Profile
                  </Link>
                </div>

                <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md text-white text-[10px] font-bold border border-white/10 uppercase tracking-wider">
                  {t.exp}
                </span>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
        <Reveal className="text-center mt-12">
          <Link href="/trainers" className="inline-flex items-center gap-2 text-[#737373] hover:text-[#C62828] text-sm font-bold tracking-widest uppercase transition-all group">
            See All Elite Trainers
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FACILITIES GALLERY ─── */
function FacilitiesGallery() {
  const facilities = [
    { title: 'Strength Zone', desc: 'Power racks, platforms, & Olympic weights.', category: 'Strength', size: 'large' },
    { title: 'Cardio Arena', desc: 'Smart treadmills & endurance gear.', category: 'Cardio', size: 'small' },
    { title: 'Functional Area', desc: 'CrossFit rig & battle ropes.', category: 'Functional', size: 'small' },
    { title: 'Premium Locker', desc: 'Showers, sauna & secure storage.', category: 'Amenities', size: 'small' },
    { title: 'Recovery Zone', desc: 'Stretch & massage therapy area.', category: 'Recovery', size: 'small' },
  ];

  return (
    <section className="section-padding bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Facilities" title="The Arena" subtitle="10,000 sq ft of world-class training space designed for peak performance." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[240px]">
          {facilities.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}
              className={cn(
                'relative group rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 transition-all duration-700',
                f.size === 'large' ? 'sm:col-span-2 sm:row-span-2' : ''
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 nordic-pattern opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="absolute inset-0 bg-[#C62828]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-20 p-8 flex flex-col justify-end h-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C62828] text-white text-[9px] font-bold uppercase tracking-[0.2em] w-fit mb-3 shadow-lg">
                  {f.category}
                </span>
                <h3 className={cn('font-bold text-white tracking-tight', f.size === 'large' ? 'text-4xl' : 'text-xl')}>{f.title}</h3>
                <p className="text-[#737373] text-sm mt-2 max-w-xs group-hover:text-white/70 transition-colors">{f.desc}</p>
              </div>
              
              <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TRANSFORMATIONS ─── */
function Transformations() {
  const data = [
    { name: 'Rahul K.', before: 95, after: 72, duration: '4 Months', type: 'Weight Loss' },
    { name: 'Amit V.', before: 68, after: 78, duration: '6 Months', type: 'Muscle Gain' },
    { name: 'Sneha G.', before: 78, after: 62, duration: '5 Months', type: 'Fat Loss' },
  ];

  return (
    <section className="section-padding bg-black overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C62828]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Results" title="Warrior Evolutions" subtitle="Evidence of what discipline and expert coaching can achieve." />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((t) => (
            <motion.div key={t.name} variants={staggerItem}
              className="group relative rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-[#C62828]/40 transition-all duration-500 p-1"
            >
              <div className="relative rounded-[2.3rem] overflow-hidden bg-gradient-to-b from-[#161616] to-black p-8 text-center">
                <div className="mb-8">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[#C62828] uppercase">{t.type}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{t.name}</h3>
                </div>

                <div className="flex items-center justify-between mb-10 relative">
                  <div className="relative z-10 text-center">
                    <p className="text-[#737373] text-[10px] uppercase tracking-widest mb-1">Before</p>
                    <p className="text-3xl font-black text-white">{t.before}<span className="text-xs ml-1 font-medium">kg</span></p>
                  </div>
                  
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#C62828]/10 flex items-center justify-center border border-[#C62828]/20 group-hover:scale-125 transition-transform duration-500">
                    <ArrowRight className="w-5 h-5 text-[#C62828]" />
                  </div>

                  <div className="relative z-10 text-center">
                    <p className="text-[#C62828] text-[10px] uppercase tracking-widest mb-1 font-bold">After</p>
                    <p className="text-3xl font-black text-white">{t.after}<span className="text-xs ml-1 font-medium">kg</span></p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 px-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#737373]" />
                    <span className="text-xs font-bold text-[#A3A3A3]">{t.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#C62828]" />
                    <span className="text-xs font-black text-white">{Math.abs(t.before - t.after)} KG {t.before > t.after ? 'LOST' : 'GAINED'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function TestimonialsSection() {
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

/* ─── BMI CALCULATOR ─── */
function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w > 0 && h > 0) {
      setResult({ bmi: calculateBMI(w, h), category: getBMICategory(calculateBMI(w, h)) });
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
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C62828]/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading badge="Health Metric" title="Know Your Base" subtitle="Your journey starts with understanding your current status." />
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <div className="p-10 rounded-[2.5rem] glass-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#C62828]/20" />
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#C62828]/10 flex items-center justify-center shadow-inner">
                  <Calculator className="w-7 h-7 text-[#C62828]" />
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
                    className="w-full px-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-lg font-bold placeholder-[#333] focus:outline-none focus:border-[#C62828] focus:bg-white/[0.05] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Height (cm)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="000"
                    className="w-full px-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-lg font-bold placeholder-[#333] focus:outline-none focus:border-[#C62828] focus:bg-white/[0.05] transition-all" />
                </div>
              </div>

              <button onClick={handleCalculate}
                className="w-full py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase text-white bg-[#C62828] hover:bg-[#A32020] transition-all duration-300 shadow-[0_10px_30px_rgba(198,40,40,0.3)] hover:shadow-[0_15px_40px_rgba(198,40,40,0.4)] hover:-translate-y-1">
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

/* ─── FAQ ─── */
function FAQSection() {
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
                    isOpen ? 'bg-[#C62828]/5 border-[#C62828]/30 shadow-2xl shadow-[#C62828]/5' : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                  )}>
                  <div className="flex items-center justify-between gap-6 relative z-10">
                    <h3 className={cn('font-bold text-base sm:text-lg transition-colors duration-500', isOpen ? 'text-white' : 'text-[#A3A3A3] group-hover:text-white')}>
                      {faq.question}
                    </h3>
                    <div className={cn('w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500', isOpen ? 'bg-[#C62828] text-white rotate-180' : 'bg-white/5 text-[#666]')}>
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

/* ─── CONTACT ─── */
function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const cards = [
    { icon: Phone, label: 'Hotline', value: GYM_INFO.phone, href: `tel:${GYM_INFO.phone}`, color: '#C62828' },
    { icon: Mail, label: 'Email', value: GYM_INFO.email, href: `mailto:${GYM_INFO.email}`, color: '#3B82F6' },
    { icon: MapPin, label: 'Location', value: GYM_INFO.address, color: '#10B981' },
    { icon: Clock, label: 'Training Hours', value: `Weekdays: ${GYM_INFO.hours.weekdays}\nWeekends: ${GYM_INFO.hours.weekends}`, color: '#F59E0B' },
  ];

  return (
    <section className="section-padding bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Connect" title="Join the Tribe" subtitle="Have questions or ready to start? Our team is standing by to help you." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form */}
          <Reveal direction="left">
            <div className="p-8 sm:p-12 rounded-[2.5rem] glass-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C62828] to-transparent" />
              <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Drop a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" required value={formState.name} onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C62828] focus:bg-white/[0.05] transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Email Address</label>
                    <input type="email" required value={formState.email} onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C62828] focus:bg-white/[0.05] transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Phone Number</label>
                  <input type="tel" value={formState.phone} onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))}
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C62828] focus:bg-white/[0.05] transition-all" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Your Message</label>
                  <textarea required rows={4} value={formState.message} onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C62828] focus:bg-white/[0.05] transition-all resize-none" placeholder="How can we help you conquer your goals?" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase text-white bg-[#C62828] hover:bg-[#A32020] transition-all duration-300 shadow-xl shadow-[#C62828]/20 disabled:opacity-50">
                  {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span><Send className="w-4 h-4 inline mr-2" />Send Message</span>}
                </button>
              </form>
            </div>
          </Reveal>

          {/* Info + Map */}
          <Reveal direction="right">
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cards.map((card) => (
                  <div key={card.label} className="group p-6 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-[#C62828]/30 transition-all duration-500">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-5 group-hover:bg-[#C62828]/10 transition-colors shadow-lg">
                      <card.icon className="w-6 h-6 text-[#C62828]" />
                    </div>
                    <p className="text-[#737373] text-[10px] uppercase tracking-[0.2em] font-bold mb-2">{card.label}</p>
                    {card.href ? (
                      <a href={card.href} className="text-white text-base font-bold hover:text-[#C62828] transition-colors whitespace-pre-line leading-relaxed">{card.value}</a>
                    ) : (
                      <p className="text-white text-base font-bold whitespace-pre-line leading-relaxed">{card.value}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="rounded-[2.5rem] overflow-hidden border border-white/5 h-[300px] sm:h-[350px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.7!2d84.3681875!3d24.7517185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d0000000000%3A0x0!2sVIKINGS%20GYM!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(0.5)' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Vikings Gym Location" />
                <div className="absolute inset-0 pointer-events-none border-[12px] border-black/20 rounded-[2.5rem]" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTABanner() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#C62828]/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#C62828] to-[#8E0000] p-1 shadow-2xl shadow-[#C62828]/20">
            <div className="relative rounded-[2.9rem] overflow-hidden bg-black/40 backdrop-blur-xl px-8 py-16 sm:py-20 lg:py-24 text-center">
              <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
                <Dumbbell className="w-64 h-64 text-white -rotate-12" />
              </div>
              
              <div className="relative z-10">
                <h2 className="font-podium text-4xl sm:text-6xl lg:text-7xl text-white mb-6 leading-none">Ready to <span className="text-[#C62828]">Transform?</span></h2>
                <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-medium">
                  The only bad workout is the one that didn&apos;t happen. Join the Vikings tribe today and unleash your potential.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link href="/plans"
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 text-sm font-black tracking-widest uppercase text-black bg-white rounded-2xl hover:bg-[#C62828] hover:text-white transition-all duration-500 shadow-2xl hover:shadow-[#C62828]/40 hover:-translate-y-1">
                    Join the Tribe
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
                  </Link>
                  <a href={`tel:${GYM_INFO.phone}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 text-sm font-black tracking-widest uppercase text-white rounded-2xl border-2 border-white/10 hover:border-white/40 hover:bg-white/5 transition-all duration-500">
                    <Phone className="w-5 h-5" />
                    Call Us Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <MembershipPlans />
      <TrainerShowcase />
      <FacilitiesGallery />
      <Transformations />
      <TestimonialsSection />
      <BMICalculator />
      <FAQSection />
      <ContactSection />
      <CTABanner />
    </>
  );
}
