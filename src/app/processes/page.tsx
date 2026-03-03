'use client';

import { useRef } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

// Process steps with images
const processSteps = [
  {
    number: '01',
    phase: 'Design',
    title: 'Discovery',
    subtitle: 'Understanding Your Vision',
    description: 'We begin with a complimentary consultation to understand your lifestyle, aesthetic preferences, and project goals. Every great design starts with listening—to your dreams, your daily routines, and how you envision living in your space.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    imageAlt: 'Luxury living room consultation',
  },
  {
    number: '02',
    phase: 'Design',
    title: 'Concept',
    subtitle: 'Bringing Ideas to Life',
    description: 'Our team creates mood boards, 3D renderings, and detailed design concepts. We present multiple options tailored to your unique style, allowing you to visualize your transformed space before any work begins.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    imageAlt: 'Interior design mood board and materials',
  },
  {
    number: '03',
    phase: 'Design',
    title: 'Refinement',
    subtitle: 'Perfecting Every Detail',
    description: 'Based on your feedback, we refine materials, finishes, and layouts until the design perfectly reflects your vision. We source the finest materials and coordinate with artisans to ensure exceptional quality.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
    imageAlt: 'Material samples and design details',
  },
  {
    number: '04',
    phase: 'Build',
    title: 'Planning',
    subtitle: 'Preparing for Construction',
    description: 'We handle permits, coordinate with specialists, and create detailed construction documents. Your project timeline is established with clear milestones, ensuring a smooth transition from design to reality.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
    imageAlt: 'Architectural blueprints and planning',
  },
  {
    number: '05',
    phase: 'Build',
    title: 'Construction',
    subtitle: 'Expert Craftsmanship',
    description: 'Our experienced team manages every aspect of construction with weekly updates, strict quality control, and transparent communication. We treat your home with the utmost respect throughout the process.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    imageAlt: 'Professional construction work',
  },
  {
    number: '06',
    phase: 'Build',
    title: 'Reveal',
    subtitle: 'Your Dream Realized',
    description: 'The final phase brings everything together. We install furnishings, style your space to perfection, and reveal your transformed home. This is the moment where vision becomes reality.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    imageAlt: 'Beautifully finished interior space',
  },
];

// Animated section component
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Full-width process step (alternating layout)
function ProcessStepFull({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className={`grid grid-cols-2 min-h-[85vh] ${isEven ? '' : ''}`}>
          {/* Image Side */}
          <div className={`relative overflow-hidden ${isEven ? 'order-1' : 'order-2'}`}>
            <motion.div
              initial={{ scale: 1.1 }}
              animate={isInView ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </motion.div>
            {/* Overlay with number */}
            <div className={`absolute bottom-0 ${isEven ? 'right-0' : 'left-0'} p-12`}>
              <span className="font-display text-[180px] leading-none font-light text-white/20 select-none">
                {step.number}
              </span>
            </div>
          </div>

          {/* Content Side */}
          <div className={`flex items-center ${isEven ? 'order-2 pl-20 pr-24' : 'order-1 pr-20 pl-24'} bg-white`}>
            <motion.div
              initial={{ opacity: 0, x: isEven ? 40 : -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-xl"
            >
              <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-wood-400 mb-6 block">
                {step.phase} Phase — Step {step.number}
              </span>
              <h2 className="font-display text-5xl xl:text-6xl text-wood-800 mb-4">
                {step.title}
              </h2>
              <p className="font-serif text-xl italic text-wood-500 mb-8">
                {step.subtitle}
              </p>
              <p className="font-serif text-lg text-wood-600 leading-relaxed mb-8">
                {step.description}
              </p>
              <div className="w-16 h-px bg-wood-300" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        {/* Image */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={step.image}
            alt={step.imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="font-display text-8xl leading-none font-light text-white/30 select-none">
              {step.number}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-12 sm:py-16 bg-white">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-wood-400 mb-4 block">
            {step.phase} Phase — Step {step.number}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-wood-800 mb-3">
            {step.title}
          </h2>
          <p className="font-serif text-lg italic text-wood-500 mb-6">
            {step.subtitle}
          </p>
          <p className="font-serif text-base text-wood-600 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default function ProcessesPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section - Full Screen with Image */}
        <section className="relative h-[90vh] flex items-end overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80"
              alt="Luxury interior design"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 sm:pb-28 lg:pb-36 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/70 mb-6">
                Our Process
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-8 max-w-4xl">
                From Vision to{' '}
                <span className="italic font-normal text-white/80">Reality</span>
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-white/80 max-w-2xl leading-relaxed">
                A seamless journey through design and construction, guided by expertise
                and driven by your vision.
              </p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"
            />
          </motion.div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 sm:py-32 lg:py-40 bg-wood-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div>
                  <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-wood-400 mb-6">
                    The Journey
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-wood-800 leading-[1.1]">
                    Six steps to your{' '}
                    <span className="italic font-normal text-wood-600">dream space</span>
                  </h2>
                </div>
                <div className="lg:pl-8">
                  <p className="font-serif text-xl text-wood-600 leading-relaxed mb-8">
                    Every project is a partnership. We guide you through each phase with
                    transparency, expertise, and an unwavering commitment to excellence.
                    From the first conversation to the final reveal, you&apos;re never alone in this journey.
                  </p>
                  <div className="flex flex-wrap gap-8 sm:gap-12 lg:gap-16">
                    <div>
                      <span className="font-display text-4xl sm:text-5xl text-wood-800">3</span>
                      <p className="font-sans text-[10px] sm:text-xs tracking-wider uppercase text-wood-400 mt-2">Design Steps</p>
                    </div>
                    <div>
                      <span className="font-display text-4xl sm:text-5xl text-wood-800">3</span>
                      <p className="font-sans text-[10px] sm:text-xs tracking-wider uppercase text-wood-400 mt-2">Build Steps</p>
                    </div>
                    <div>
                      <span className="font-display text-4xl sm:text-5xl text-wood-800">1</span>
                      <p className="font-sans text-[10px] sm:text-xs tracking-wider uppercase text-wood-400 mt-2">Partner</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Phase Divider - Design */}
        <section className="py-12 sm:py-16 lg:py-20 bg-wood-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
              <div>
                <span className="font-display text-5xl sm:text-7xl lg:text-9xl font-light text-wood-700">01—03</span>
              </div>
              <div className="sm:text-right">
                <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-wood-400 mb-2">Phase One</p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">Design</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Design Steps */}
        {processSteps.slice(0, 3).map((step, index) => (
          <ProcessStepFull key={step.number} step={step} index={index} />
        ))}

        {/* Phase Divider - Build */}
        <section className="py-12 sm:py-16 lg:py-20 bg-wood-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
              <div>
                <span className="font-display text-5xl sm:text-7xl lg:text-9xl font-light text-wood-700">04—06</span>
              </div>
              <div className="sm:text-right">
                <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-wood-400 mb-2">Phase Two</p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">Build</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Build Steps */}
        {processSteps.slice(3, 6).map((step, index) => (
          <ProcessStepFull key={step.number} step={step} index={index + 3} />
        ))}

        {/* Promise Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <AnimatedSection>
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-wood-400 mb-4 sm:mb-6">
                  Our Promise
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-wood-800 max-w-3xl mx-auto">
                  What sets us{' '}
                  <span className="italic font-normal text-wood-600">apart</span>
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-px bg-transparent md:bg-wood-200">
              {[
                {
                  title: 'Transparency',
                  description: "No hidden fees, no surprises. You're informed at every step with detailed updates and clear communication throughout your project.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ),
                },
                {
                  title: 'Single Point of Contact',
                  description: 'One dedicated team for design and construction. Seamless communication means seamless results from start to finish.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Uncompromising Quality',
                  description: 'Trusted craftsmen and premium materials. We build spaces that stand the test of time with attention to every detail.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <AnimatedSection key={item.title}>
                  <div className="bg-white p-8 sm:p-12 lg:p-16 text-center h-full border border-wood-100 md:border-0">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 border border-wood-200 text-wood-600 mb-6 sm:mb-8">
                      {item.icon}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl text-wood-800 mb-3 sm:mb-4">{item.title}</h3>
                    <p className="font-serif text-sm sm:text-base text-wood-600 leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
              alt="Beautiful finished interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-wood-900/80" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
            <AnimatedSection>
              <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-wood-400 mb-4 sm:mb-6">
                Ready to Begin?
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-6 sm:mb-8 leading-tight">
                Let&apos;s start your{' '}
                <span className="italic font-normal text-wood-300">journey</span>
              </h2>
              <p className="font-serif text-base sm:text-lg lg:text-xl text-wood-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                Schedule a complimentary consultation and take the first step toward your dream space.
                We&apos;re here to listen, guide, and create something extraordinary together.
              </p>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-3 sm:gap-4 bg-white text-wood-800 px-8 sm:px-10 py-4 sm:py-5 font-sans text-[11px] sm:text-[13px] tracking-[0.15em] uppercase hover:bg-wood-100 transition-colors duration-300"
              >
                Schedule Consultation
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </Layout>
  );
}
