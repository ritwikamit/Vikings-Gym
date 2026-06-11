'use client';

import { HeroSection } from '@/features/public/components/HeroSection';
import { BrandHeritage } from '@/features/public/components/BrandHeritage';
import { WhyChooseUs } from '@/features/public/components/WhyChooseUs';
import { ServicesSection } from '@/features/public/components/ServicesSection';
import { MembershipPlans } from '@/features/public/components/MembershipPlans';
import { TrainerShowcase } from '@/features/public/components/TrainerShowcase';
import { Transformations } from '@/features/public/components/Transformations';
import { TestimonialsSection } from '@/features/public/components/TestimonialsSection';
import { InstagramGallery } from '@/features/public/components/InstagramGallery';
import { BMICalculator } from '@/features/public/components/BMICalculator';
import { FAQSection } from '@/features/public/components/FAQSection';
import { BlogPreview } from '@/features/public/components/BlogPreview';
import { ContactSection } from '@/features/public/components/ContactSection';
import { FreeTrialCTA } from '@/features/public/components/FreeTrialCTA';
import { PageTransition } from '@/components/ui/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <BrandHeritage />
      <WhyChooseUs />
      <ServicesSection />
      <MembershipPlans />
      <TrainerShowcase />
      <Transformations />
      <TestimonialsSection />
      <InstagramGallery />
      <BMICalculator />
      <FAQSection />
      <BlogPreview />
      <ContactSection />
      <FreeTrialCTA />
    </PageTransition>
  );
}
