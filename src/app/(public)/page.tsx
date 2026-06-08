'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Dumbbell,
  Users,
  Clock,
  Sparkles,
  Shield,
  IndianRupee,
  Star,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Check,
  Quote,
  Calculator,
  Trophy,
  Target,
  Zap,
  Heart,
  Send,
} from 'lucide-react';
import { cn, formatCurrency, calculateBMI, getBMICategory, getInitials } from '@/lib/utils';
import {
  MEMBERSHIP_PLANS,
  TESTIMONIALS,
  FAQS,
  GYM_INFO,
} from '@/lib/constants';

/* ─── Reusable animation wrapper ─── */
function AnimatedSection({
  children,
  className,
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Section heading ─── */
function SectionHeading({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12 lg:mb-16">
      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#DC2626]/10 text-[#DC2626] text-xs font-semibold uppercase tracking-wider border border-[#DC2626]/20 mb-4">
        {badge}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#A3A3A3] text-base sm:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function HeroSection() {
  const stats = [
    { value: '500+', label: 'Members' },
    { value: '15+', label: 'Trainers' },
    { value: '4.3★', label: 'Rating' },
    { value: 'Est. 2024', label: '' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.08),transparent_50%)]" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#DC2626]/10 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#DC2626]/5 rounded-full blur-[120px]"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#A3A3A3] text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
            Premium Fitness Center in Aurangabad
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6"
        >
          <span className="text-white">UNLEASH THE</span>
          <br />
          <span className="bg-gradient-to-r from-[#DC2626] to-[#EF4444] bg-clip-text text-transparent">
            WARRIOR WITHIN
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[#A3A3A3] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Transform your body, conquer your limits. Join the tribe of warriors
          at Bihar&apos;s most premium fitness center.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/plans"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] transition-all duration-300 hover:shadow-xl hover:shadow-[#DC2626]/30 hover:-translate-y-0.5"
          >
            Join Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#plans"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl border border-white/20 hover:bg-white/5 hover:border-[#DC2626]/50 transition-all duration-300"
          >
            Explore Plans
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="inline-flex flex-wrap justify-center gap-0 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] overflow-hidden"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                'px-6 sm:px-8 py-4 sm:py-5 text-center',
                i !== stats.length - 1 && 'border-r border-white/[0.06]'
              )}
            >
              <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
              {stat.label && (
                <p className="text-[#737373] text-xs sm:text-sm mt-0.5">{stat.label}</p>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#DC2626] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   WHY CHOOSE US
   ============================================================ */
function WhyChooseUs() {
  const features = [
    {
      icon: Dumbbell,
      title: 'Modern Equipment',
      desc: 'State-of-the-art machines and free weights from top international brands.',
    },
    {
      icon: Users,
      title: 'Expert Trainers',
      desc: 'Certified fitness professionals with years of training experience.',
    },
    {
      icon: Target,
      title: 'Personalized Plans',
      desc: 'Custom workout and diet plans tailored to your unique fitness goals.',
    },
    {
      icon: Clock,
      title: 'Flexible Timings',
      desc: 'Open from early morning to late night so you can work out on your schedule.',
    },
    {
      icon: Sparkles,
      title: 'Clean Environment',
      desc: 'Hygienic, well-maintained, and sanitized facility for a safe workout.',
    },
    {
      icon: IndianRupee,
      title: 'Affordable Plans',
      desc: 'Premium fitness experience at competitive prices with flexible payment options.',
    },
  ];

  return (
    <AnimatedSection
      id="why-choose-us"
      className="section-padding bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Choose Us"
          title="Built for Warriors"
          subtitle="Everything you need to transform your body and mind, all under one roof."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-[#262626] hover:border-[#DC2626]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#DC2626]/5"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#DC2626]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-[#DC2626]/10 flex items-center justify-center mb-5 group-hover:bg-[#DC2626]/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-[#DC2626]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ============================================================
   MEMBERSHIP PLANS
   ============================================================ */
function MembershipPlans() {
  return (
    <AnimatedSection id="plans" className="section-padding bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Membership Plans"
          title="Choose Your Battle Plan"
          subtitle="Invest in yourself with our flexible membership options."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {MEMBERSHIP_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                'relative group rounded-2xl border transition-all duration-500 overflow-hidden',
                plan.popular
                  ? 'bg-gradient-to-b from-[#DC2626]/10 to-[#141414] border-[#DC2626]/40 scale-[1.02] shadow-lg shadow-[#DC2626]/10'
                  : 'bg-[#141414] border-[#262626] hover:border-[#DC2626]/20'
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DC2626] to-[#EF4444]" />
              )}

              <div className="p-6 lg:p-8">
                {plan.popular && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#DC2626]/10 text-[#DC2626] text-xs font-semibold uppercase tracking-wider border border-[#DC2626]/20 mb-4">
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-[#737373] text-sm mb-4">
                  {plan.duration} {plan.duration === 1 ? 'month' : 'months'}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-black text-white">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-[#737373] text-sm">
                    {plan.duration > 1
                      ? ` / ${formatCurrency(Math.round(plan.price / plan.duration))}/mo`
                      : ' /month'}
                  </span>
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
                      ? 'bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white hover:from-[#EF4444] hover:to-[#DC2626] hover:shadow-lg hover:shadow-[#DC2626]/25'
                      : 'bg-white/5 text-white border border-[#262626] hover:bg-white/10 hover:border-[#DC2626]/30'
                  )}
                >
                  Choose Plan
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ============================================================
   TRAINER SHOWCASE
   ============================================================ */
function TrainerShowcase() {
  const trainers = [
    {
      name: 'Vikram Singh',
      specialization: 'Strength & Conditioning',
      experience: '8+ Years',
      gradient: 'from-[#DC2626] to-[#991B1B]',
    },
    {
      name: 'Ankit Kumar',
      specialization: 'Bodybuilding',
      experience: '6+ Years',
      gradient: 'from-[#B91C1C] to-[#7F1D1D]',
    },
    {
      name: 'Ravi Sharma',
      specialization: 'CrossFit & HIIT',
      experience: '5+ Years',
      gradient: 'from-[#EF4444] to-[#DC2626]',
    },
    {
      name: 'Priya Patel',
      specialization: 'Yoga & Flexibility',
      experience: '7+ Years',
      gradient: 'from-[#991B1B] to-[#450A0A]',
    },
  ];

  return (
    <AnimatedSection id="trainers" className="section-padding bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Warriors"
          title="Meet Your Trainers"
          subtitle="Certified professionals dedicated to your transformation."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {trainers.map((trainer, i) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-[#262626] hover:border-[#DC2626]/30 transition-all duration-500"
            >
              {/* Placeholder image with gradient & initials */}
              <div
                className={cn(
                  'relative h-64 sm:h-72 bg-gradient-to-br flex items-center justify-center',
                  trainer.gradient
                )}
              >
                <span className="text-5xl font-black text-white/20">
                  {getInitials(trainer.name)}
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href="/trainers"
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white text-sm font-semibold translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    View Profile
                  </Link>
                </div>

                {/* Experience badge */}
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium border border-white/10">
                  {trainer.experience}
                </span>
              </div>

              {/* Info */}
              <div className="p-5 bg-[#141414]">
                <h3 className="text-lg font-bold text-white mb-1">{trainer.name}</h3>
                <p className="text-[#DC2626] text-sm font-medium">{trainer.specialization}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-white text-sm font-medium transition-colors group"
          >
            View All Trainers
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ============================================================
   TRANSFORMATIONS
   ============================================================ */
function Transformations() {
  const transformations = [
    {
      name: 'Rahul K.',
      before: 95,
      after: 72,
      duration: '4 Months',
      gradient: 'from-[#DC2626] to-[#991B1B]',
    },
    {
      name: 'Amit V.',
      before: 105,
      after: 82,
      duration: '6 Months',
      gradient: 'from-[#B91C1C] to-[#7F1D1D]',
    },
    {
      name: 'Sneha G.',
      before: 78,
      after: 62,
      duration: '5 Months',
      gradient: 'from-[#EF4444] to-[#DC2626]',
    },
  ];

  return (
    <AnimatedSection id="transformations" className="section-padding bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Transformations"
          title="Real Results, Real Warriors"
          subtitle="Our members' transformations speak louder than words."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {transformations.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative rounded-2xl overflow-hidden border border-[#262626] hover:border-[#DC2626]/30 transition-all duration-500"
            >
              {/* Card visual */}
              <div
                className={cn(
                  'relative h-60 bg-gradient-to-br flex items-center justify-center',
                  t.gradient
                )}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider">Before</p>
                      <p className="text-3xl font-black text-white">{t.before} kg</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-white/40" />
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider">After</p>
                      <p className="text-3xl font-black text-white">{t.after} kg</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium">
                    <Zap className="w-3 h-3" />-{t.before - t.after} kg
                  </span>
                </div>
              </div>

              <div className="p-5 bg-[#141414]">
                <h3 className="text-lg font-bold text-white mb-1">{t.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-[#A3A3A3] text-sm">Duration: {t.duration}</p>
                  <Trophy className="w-4 h-4 text-[#F59E0B]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function TestimonialsSection() {
  return (
    <AnimatedSection id="testimonials" className="section-padding bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="What Our Warriors Say"
          subtitle="Real reviews from our valued members."
        />

        <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-5 lg:gap-6 min-w-max">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-[320px] sm:w-[360px] shrink-0 p-6 rounded-2xl bg-white/[0.02] border border-[#262626] hover:border-[#DC2626]/20 transition-all duration-500 backdrop-blur-sm"
              >
                <Quote className="w-8 h-8 text-[#DC2626]/30 mb-4" />

                <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={cn(
                        'w-4 h-4',
                        j < testimonial.rating
                          ? 'text-[#F59E0B] fill-[#F59E0B]'
                          : 'text-[#333333]'
                      )}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center text-white text-sm font-bold">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-[#737373] text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ============================================================
   BMI CALCULATOR
   ============================================================ */
function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w > 0 && h > 0) {
      const bmi = calculateBMI(w, h);
      setResult({ bmi, category: getBMICategory(bmi) });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'text-[#3B82F6]';
      case 'Normal':
        return 'text-[#22C55E]';
      case 'Overweight':
        return 'text-[#F59E0B]';
      case 'Obese':
        return 'text-[#EF4444]';
      default:
        return 'text-white';
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'bg-[#3B82F6]/10 border-[#3B82F6]/20';
      case 'Normal':
        return 'bg-[#22C55E]/10 border-[#22C55E]/20';
      case 'Overweight':
        return 'bg-[#F59E0B]/10 border-[#F59E0B]/20';
      case 'Obese':
        return 'bg-[#EF4444]/10 border-[#EF4444]/20';
      default:
        return 'bg-white/5 border-[#262626]';
    }
  };

  return (
    <AnimatedSection id="bmi-calculator" className="section-padding bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Health Check"
          title="BMI Calculator"
          subtitle="Know your Body Mass Index and take the first step towards a healthier you."
        />

        <div className="max-w-xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-[#262626] backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#DC2626]/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="text-lg font-bold text-white">Calculate Your BMI</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[#A3A3A3] text-sm mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#262626] text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#DC2626]/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#A3A3A3] text-sm mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 170"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#262626] text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#DC2626]/50 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] transition-all duration-300 hover:shadow-lg hover:shadow-[#DC2626]/25"
            >
              Calculate BMI
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'mt-6 p-5 rounded-xl border text-center',
                  getCategoryBg(result.category)
                )}
              >
                <p className="text-[#A3A3A3] text-sm mb-1">Your BMI</p>
                <p className="text-4xl font-black text-white mb-2">{result.bmi}</p>
                <p className={cn('text-lg font-bold', getCategoryColor(result.category))}>
                  {result.category}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ============================================================
   FAQ SECTION
   ============================================================ */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <AnimatedSection id="faq" className="section-padding bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Got questions? We've got answers."
        />

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={cn(
                    'w-full text-left p-5 rounded-xl border transition-all duration-300',
                    isOpen
                      ? 'bg-[#DC2626]/5 border-[#DC2626]/20'
                      : 'bg-white/[0.02] border-[#262626] hover:border-[#333333]'
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className={cn(
                        'font-semibold text-sm sm:text-base transition-colors',
                        isOpen ? 'text-white' : 'text-[#A3A3A3]'
                      )}
                    >
                      {faq.question}
                    </h3>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#DC2626] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#737373] shrink-0" />
                    )}
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#A3A3A3] text-sm leading-relaxed mt-3 pr-8">
                      {faq.answer}
                    </p>
                  </motion.div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ============================================================
   CONTACT SECTION
   ============================================================ */
function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ name: '', email: '', phone: '', message: '' });
  };

  const contactCards = [
    { icon: Phone, label: 'Phone', value: GYM_INFO.phone, href: `tel:${GYM_INFO.phone}` },
    { icon: Mail, label: 'Email', value: GYM_INFO.email, href: `mailto:${GYM_INFO.email}` },
    { icon: MapPin, label: 'Address', value: GYM_INFO.address },
    { icon: Clock, label: 'Hours', value: `Mon-Fri: ${GYM_INFO.hours.weekdays}\nSat-Sun: ${GYM_INFO.hours.weekends}` },
  ];

  return (
    <AnimatedSection id="contact" className="section-padding bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Contact"
          title="Get in Touch"
          subtitle="Have questions or ready to start your fitness journey? Reach out to us."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-[#262626]">
            <h3 className="text-lg font-bold text-white mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A3A3A3] text-sm mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#262626] text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#DC2626]/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[#A3A3A3] text-sm mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#262626] text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#DC2626]/50 transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#A3A3A3] text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#262626] text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#DC2626]/50 transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-[#A3A3A3] text-sm mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#262626] text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#DC2626]/50 transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] transition-all duration-300 hover:shadow-lg hover:shadow-[#DC2626]/25"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info + Map */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((card) => (
                <div
                  key={card.label}
                  className="p-5 rounded-xl bg-white/[0.02] border border-[#262626] hover:border-[#DC2626]/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#DC2626]/10 flex items-center justify-center mb-3">
                    <card.icon className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <p className="text-[#737373] text-xs uppercase tracking-wider mb-1">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="text-white text-sm font-medium hover:text-[#DC2626] transition-colors whitespace-pre-line"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm font-medium whitespace-pre-line">
                      {card.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-[#262626] h-[250px] sm:h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.7!2d84.3681875!3d24.7517185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d0000000000%3A0x0!2sVIKINGS%20GYM!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vikings Gym Location"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ============================================================
   CTA BANNER
   ============================================================ */
function CTABanner() {
  return (
    <AnimatedSection id="cta" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#DC2626] to-[#991B1B]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />

          <div className="relative px-8 py-14 sm:py-16 lg:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                Ready to Transform?
              </h2>
              <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8">
                Join the Vikings tribe today and start your journey to becoming the
                strongest version of yourself.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/plans"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-[#DC2626] bg-white rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-xl"
                >
                  Join Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`tel:${GYM_INFO.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <MembershipPlans />
      <TrainerShowcase />
      <Transformations />
      <TestimonialsSection />
      <BMICalculator />
      <FAQSection />
      <ContactSection />
      <CTABanner />
    </>
  );
}
