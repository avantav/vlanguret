import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import WelcomeSection from '@/components/WelcomeSection';
import ProcessSection from '@/components/ProcessSection';
import ServicesHighlight from '@/components/ServicesHighlight';
import ProjectsGrid from '@/components/ProjectsGrid';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AsSeenInSection from '@/components/AsSeenInSection';
import CtaSection from '@/components/CtaSection';
import { createMetadata } from '@/lib/metadata';

// ISR: Revalidar cada hora (3600 segundos)
export const revalidate = 3600;

export const metadata = createMetadata({
  title: 'Luxury Interior Design',
  description: 'Full remodeling services for existing and new construction homes with the best service guaranteed. From initial meetings to concepts and execution, we guide you through the design and construction process.',
  path: '/',
});

export default async function Home() {
  // Use local hero images
  const heroImages: string[] = [
    '/images/hero/hero-1.jpg',
    '/images/hero/hero-2.jpg',
    '/images/hero/hero-3.jpg',
    '/images/hero/hero-4.jpg',
    '/images/hero/hero-5.jpg',
  ];

  return (
    <Layout isHomePage>
      <Hero heroImages={heroImages} />
      <AsSeenInSection />
      <WelcomeSection />
      <ServicesHighlight />
      <ProcessSection />
      <ProjectsGrid />
      <AboutSection />
      <TestimonialsSection />
      <CtaSection />
    </Layout>
  );
}
