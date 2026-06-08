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
    { value: '500+', label: 'Warriors Forged' },
    { value: '95%', label: 'Client Retention' },
    { value: '15+', label: 'Elite Trainers' },
    { value: '2024', label: 'Year Established' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/logo.jpeg"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4" type="video/mp4" />
      </video>

      {/* Overlay layers */}
      <div className="absolute inset-0 video-overlay-top z-[1]" />
      <div className="absolute inset-0 video-overlay-bottom z-[1]" />
      <div className="absolute inset-0 video-overlay-center z-[1]" />
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Red ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C62828]/10 rounded-full blur-[150px] z-[1]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#C62828]/5 to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16">
        <div className="max-w-5xl">
          {/* Tagline */}
          <div className="animate-reveal">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/70 text-[10px] sm:text-xs font-inter tracking-[0.3em] uppercase mb-6 lg:mb-8">
              <Crown className="w-3.5 h-3.5 text-white/70" />
              Premium Fitness Collective — Aurangabad
            </span>
          </div>

          {/* Main Heading */}
          <div className="animate-reveal-1">
            <h1 className="font-podium text-[clamp(2.8rem,10vw,7.5rem)] text-white mb-2">
              Forge Your
            </h1>
            <h1 className="font-podium text-[clamp(2.8rem,10vw,7.5rem)] gradient-text-fire">
              Strength
            </h1>
          </div>

          {/* Subtext */}
          <div className="animate-reveal-2">
            <p className="text-white/60 text-sm sm:text-base lg:text-lg font-inter leading-relaxed max-w-xl mt-6 lg:mt-8">
              Transform your body, conquer your limits. Join Bihar&apos;s most{" "}
              <span className="text-white font-semibold">premier fitness destination</span>.
            </p>
          </div>

          {/* CTA Row */}
          <div className="animate-reveal-3 mt-8 lg:mt-10">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/plans"
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-black hover:bg-neutral-900 text-white text-[11px] sm:text-xs font-semibold tracking-widest uppercase rounded-xl transition-all duration-300 border border-white/[0.06]"
              >
                Join the Tribe
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <div className="hidden sm:flex items-center gap-3">
                <Award className="w-8 h-8 text-white/40" />
                <div className="leading-tight">
                  <p className="text-white/60 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">Top-Rated</p>
                  <p className="text-white/40 text-[10px] tracking-wider uppercase">Fitness Destination</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="animate-reveal-4 mt-8 sm:mt-10 lg:mt-14">
            <div className="flex flex-wrap gap-6 sm:gap-10 lg:gap-14">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-inter text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-[9px] sm:text-xs tracking-widest uppercase mt-1 font-medium">
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
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-5 h-9 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1 h-1 bg-[#C62828] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── WHY CHOOSE US ─── */
function WhyChooseUs() {
  const features = [
    { icon: Dumbbell, title: 'Modern Equipment', desc: 'State-of-the-art machines and free weights from top international brands.' },
    { icon: Users, title: 'Expert Trainers', desc: 'Certified fitness professionals with years of training experience.' },
    { icon: Target, title: 'Personalized Plans', desc: 'Custom workout and diet plans tailored to your unique fitness goals.' },
    { icon: Clock, title: 'Flexible Timings', desc: 'Open from early morning to late night for your schedule.' },
    { icon: Sparkles, title: 'Clean Environment', desc: 'Hygienic, well-maintained facility for a safe workout.' },
    { icon: IndianRupee, title: 'Affordable Plans', desc: 'Premium fitness at competitive prices with flexible payments.' },
  ];

  return (
    <section className="section-padding bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Why Choose Us" title="Built for Warriors" subtitle="Everything you need to transform, all under one roof." />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((f) => (
            <motion.div key={f.title} variants={staggerItem}
              className="group relative p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-[#C62828]/20 transition-all duration-500 hover:-translate-y-1 card-hover"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#C62828]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-[#C62828]/10 flex items-center justify-center mb-5 group-hover:bg-[#C62828]/20 transition-all duration-300">
                  <f.icon className="w-6 h-6 text-[#C62828]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{f.desc}</p>
              </div>
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
    <section className="section-padding bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Membership Plans" title="Choose Your Battle Plan" subtitle="Invest in yourself with flexible premium memberships." />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {MEMBERSHIP_PLANS.map((plan) => (
            <motion.div key={plan.name} variants={staggerItem}
              className={cn(
                'relative group rounded-2xl border transition-all duration-500 overflow-hidden card-hover',
                plan.popular
                  ? 'bg-gradient-to-b from-[#C62828]/10 to-[#0A0A0A] border-[#C62828]/30 scale-[1.02] shadow-xl shadow-[#C62828]/10'
                  : 'bg-[#0A0A0A] border-white/[0.04] hover:border-[#C62828]/20'
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C62828] to-[#E53935]" />
              )}
              <div className="p-6 lg:p-8">
                {plan.popular && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C62828]/10 text-[#C62828] text-xs font-semibold uppercase tracking-wider border border-[#C62828]/20 mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-[#666] text-sm mb-4">{plan.duration} {plan.duration === 1 ? 'month' : 'months'}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">{formatCurrency(plan.price)}</span>
                  <span className="text-[#666] text-sm"> / {plan.duration > 1 ? `${formatCurrency(Math.round(plan.price / plan.duration))}/mo` : 'month'}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />
                      <span className="text-[#A3A3A3]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={cn(
                    'block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300',
                    plan.popular
                      ? 'btn-primary'
                      : 'bg-white/[0.03] text-white border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#C62828]/30'
                  )}
                >
                  <span>Choose Plan</span>
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
    { name: 'Vikram Singh', specialization: 'Strength & Conditioning', experience: '8+ Years', gradient: 'from-[#C62828] to-[#8E0000]' },
    { name: 'Ankit Kumar', specialization: 'Bodybuilding', experience: '6+ Years', gradient: 'from-[#8E0000] to-[#5C0000]' },
    { name: 'Ravi Sharma', specialization: 'CrossFit & HIIT', experience: '5+ Years', gradient: 'from-[#E53935] to-[#C62828]' },
    { name: 'Priya Patel', specialization: 'Yoga & Flexibility', experience: '7+ Years', gradient: 'from-[#8E0000] to-[#3A0000]' },
  ];

  return (
    <section className="section-padding bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Our Warriors" title="Meet Your Trainers" subtitle="Certified professionals dedicated to your transformation." />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {trainers.map((t) => (
            <motion.div key={t.name} variants={staggerItem}
              className="group relative rounded-2xl overflow-hidden border border-white/[0.04] hover:border-[#C62828]/20 transition-all duration-500 card-hover"
            >
              <div className={cn('relative h-64 sm:h-72 bg-gradient-to-br flex items-center justify-center', t.gradient)}>
                <span className="text-5xl font-extrabold text-white/10">{getInitials(t.name)}</span>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href="/trainers" className="px-5 py-2.5 rounded-lg btn-primary text-sm font-semibold translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span>View Profile</span>
                  </Link>
                </div>
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium border border-white/[0.08]">
                  {t.experience}
                </span>
              </div>
              <div className="p-5 bg-[#0A0A0A] border-t border-white/[0.04]">
                <h3 className="text-lg font-bold text-white mb-1">{t.name}</h3>
                <p className="text-[#C62828] text-sm font-medium">{t.specialization}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
        <Reveal className="text-center mt-10">
          <Link href="/trainers" className="inline-flex items-center gap-2 text-[#666] hover:text-white text-sm font-medium transition-colors group">
            View All Trainers
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FACILITIES GALLERY ─── */
function FacilitiesGallery() {
  const facilities = [
    { title: 'Strength Zone', desc: 'Power racks, deadlift platforms, Olympic lifting', category: 'Strength', size: 'large' },
    { title: 'Cardio Arena', desc: 'Treadmills, bikes, rowers, stair climbers', category: 'Cardio', size: 'small' },
    { title: 'Functional Training', desc: 'CrossFit rig, battle ropes, sleds, kettlebells', category: 'Functional', size: 'small' },
    { title: 'Locker Rooms', desc: 'Premium lockers, showers, sauna', category: 'Amenities', size: 'small' },
    { title: 'Recovery Zone', desc: 'Stretching area, foam rollers, massage', category: 'Recovery', size: 'small' },
  ];

  return (
    <section className="section-padding bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Facilities" title="The Arena" subtitle="10,000 sq ft of world-class training space." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {facilities.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}
              className={cn(
                'relative group rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.04] transition-all duration-500 card-hover',
                f.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
              )}
            >
              <div className={cn('absolute inset-0 flex items-center justify-center', f.size === 'large' ? '' : '')}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/20 to-transparent opacity-80" />
                <div className="absolute inset-0 nordic-pattern opacity-30" />
              </div>
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#C62828]/10 text-[#C62828] text-[10px] font-semibold uppercase tracking-wider border border-[#C62828]/20 w-fit mb-2">
                  {f.category}
                </span>
                <h3 className={cn('font-bold text-white', f.size === 'large' ? 'text-3xl' : 'text-lg')}>{f.title}</h3>
                <p className="text-[#666] text-sm mt-1 max-w-xs">{f.desc}</p>
              </div>
              <div className="absolute inset-0 border border-white/0 group-hover:border-[#C62828]/30 rounded-2xl transition-all duration-500 pointer-events-none" />
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
    { name: 'Rahul K.', before: 95, after: 72, duration: '4 Months', gradient: 'from-[#C62828] to-[#8E0000]' },
    { name: 'Amit V.', before: 105, after: 82, duration: '6 Months', gradient: 'from-[#8E0000] to-[#5C0000]' },
    { name: 'Sneha G.', before: 78, after: 62, duration: '5 Months', gradient: 'from-[#E53935] to-[#C62828]' },
  ];

  return (
    <section className="section-padding bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Transformations" title="Real Results, Real Warriors" subtitle="Our members speak louder than words." />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {data.map((t) => (
            <motion.div key={t.name} variants={staggerItem}
              className="group relative rounded-2xl overflow-hidden border border-white/[0.04] hover:border-[#C62828]/20 transition-all duration-500 card-hover"
            >
              <div className={cn('relative h-56 bg-gradient-to-br flex items-center justify-center', t.gradient)}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-widest">Before</p>
                      <p className="text-3xl font-extrabold text-white">{t.before} kg</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/30" />
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-widest">After</p>
                      <p className="text-3xl font-extrabold text-white">{t.after} kg</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium">
                    <Zap className="w-3 h-3" />-{t.before - t.after} kg
                  </span>
                </div>
              </div>
              <div className="p-5 bg-[#0A0A0A] border-t border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-0.5">{t.name}</h3>
                    <p className="text-[#666] text-sm">{t.duration}</p>
                  </div>
                  <Trophy className="w-5 h-5 text-[#C62828]" />
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

  const getCatColor = (c: string) =>
    c === 'Underweight' ? 'text-[#3B82F6]' : c === 'Normal' ? 'text-[#22C55E]' : c === 'Overweight' ? 'text-[#F59E0B]' : 'text-[#C62828]';

  const getCatBg = (c: string) =>
    c === 'Underweight' ? 'bg-[#3B82F6]/10 border-[#3B82F6]/20' : c === 'Normal' ? 'bg-[#22C55E]/10 border-[#22C55E]/20' : c === 'Overweight' ? 'bg-[#F59E0B]/10 border-[#F59E0B]/20' : 'bg-[#C62828]/10 border-[#C62828]/20';

  return (
    <section className="section-padding bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Health Check" title="BMI Calculator" subtitle="Know your numbers. Take control." />
        <Reveal>
          <div className="max-w-xl mx-auto">
            <div className="p-6 sm:p-8 rounded-2xl glass-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#C62828]/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-[#C62828]" />
                </div>
                <h3 className="text-lg font-bold text-white">Calculate Your BMI</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[#A3A3A3] text-sm mb-2">Weight (kg)</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#C62828]/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-[#A3A3A3] text-sm mb-2">Height (cm)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#C62828]/50 transition-colors" />
                </div>
              </div>
              <button onClick={handleCalculate}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white btn-primary">
                <span>Calculate BMI</span>
              </button>
              {result && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={cn('mt-6 p-5 rounded-xl border text-center', getCatBg(result.category))}>
                  <p className="text-[#A3A3A3] text-sm mb-1">Your BMI</p>
                  <p className="text-4xl font-extrabold text-white mb-2">{result.bmi}</p>
                  <p className={cn('text-lg font-bold', getCatColor(result.category))}>{result.category}</p>
                </motion.div>
              )}
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
        <SectionHeading badge="FAQ" title="Frequently Asked Questions" subtitle="Everything you need to know." />
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                <button onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={cn(
                    'w-full text-left p-5 rounded-xl border transition-all duration-300',
                    isOpen ? 'bg-[#C62828]/5 border-[#C62828]/20' : 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]'
                  )}>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={cn('font-semibold text-sm sm:text-base transition-colors', isOpen ? 'text-white' : 'text-[#A3A3A3]')}>
                      {faq.question}
                    </h3>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#C62828] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#666] shrink-0" />}
                  </div>
                  <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="text-[#666] text-sm leading-relaxed mt-3 pr-8">{faq.answer}</p>
                  </motion.div>
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
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setFormState({ name: '', email: '', phone: '', message: '' }); };

  const cards = [
    { icon: Phone, label: 'Phone', value: GYM_INFO.phone, href: `tel:${GYM_INFO.phone}` },
    { icon: Mail, label: 'Email', value: GYM_INFO.email, href: `mailto:${GYM_INFO.email}` },
    { icon: MapPin, label: 'Address', value: GYM_INFO.address },
    { icon: Clock, label: 'Hours', value: `Weekdays: ${GYM_INFO.hours.weekdays}\nWeekends: ${GYM_INFO.hours.weekends}` },
  ];

  return (
    <section className="section-padding bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Contact" title="Get in Touch" subtitle="Ready to start? Reach out to us." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form */}
          <Reveal direction="left">
            <div className="p-6 sm:p-8 rounded-2xl glass-card">
              <h3 className="text-lg font-bold text-white mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A3A3A3] text-sm mb-2">Name</label>
                    <input type="text" required value={formState.name} onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#C62828]/50 transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-[#A3A3A3] text-sm mb-2">Email</label>
                    <input type="email" required value={formState.email} onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#C62828]/50 transition-colors" placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-[#A3A3A3] text-sm mb-2">Phone</label>
                  <input type="tel" value={formState.phone} onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#C62828]/50 transition-colors" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-[#A3A3A3] text-sm mb-2">Message</label>
                  <textarea required rows={4} value={formState.message} onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#C62828]/50 transition-colors resize-none" placeholder="How can we help?" />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white btn-primary">
                  <span><Send className="w-4 h-4 inline mr-1.5" />Send Message</span>
                </button>
              </form>
            </div>
          </Reveal>

          {/* Info + Map */}
          <Reveal direction="right">
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cards.map((card) => (
                  <div key={card.label} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#C62828]/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#C62828]/10 flex items-center justify-center mb-3">
                      <card.icon className="w-5 h-5 text-[#C62828]" />
                    </div>
                    <p className="text-[#666] text-[10px] uppercase tracking-widest mb-1">{card.label}</p>
                    {card.href ? (
                      <a href={card.href} className="text-[#A3A3A3] text-sm font-medium hover:text-white transition-colors whitespace-pre-line">{card.value}</a>
                    ) : (
                      <p className="text-[#A3A3A3] text-sm font-medium whitespace-pre-line">{card.value}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/[0.04] h-[250px] sm:h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.7!2d84.3681875!3d24.7517185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d0000000000%3A0x0!2sVIKINGS%20GYM!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Vikings Gym Location" />
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
    <Reveal className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C62828] to-[#8E0000]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="relative px-8 py-14 sm:py-16 lg:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">Ready to Transform?</h2>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Join the Vikings tribe today and start your journey to becoming the strongest version of yourself.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/plans"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-[#C62828] bg-white rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-xl">
                Join Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={`tel:${GYM_INFO.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl border-2 border-white/20 hover:bg-white/10 transition-all duration-300">
                <Phone className="w-4 h-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
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
