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
import { SectionDivider } from '@/components/ui/SectionDivider';
import { ScrollReveal } from '@/components/ui/FramerParallax';

const sections = [
  { Component: BrandHeritage },
  { Component: WhyChooseUs },
  { Component: ServicesSection },
  { Component: MembershipPlans },
  { Component: TrainerShowcase },
  { Component: Transformations },
  { Component: TestimonialsSection },
  { Component: InstagramGallery },
  { Component: BMICalculator },
  { Component: FAQSection },
  { Component: BlogPreview },
  { Component: ContactSection },
  { Component: FreeTrialCTA },
];

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      {sections.map(({ Component }, i) => (
        <ScrollReveal key={i}>
          <Component />
          {i < sections.length - 1 && <SectionDivider variant="glow" />}
        </ScrollReveal>
      ))}
    </PageTransition>
  );
}
