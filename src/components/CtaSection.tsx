'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const CtaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
          alt="Luxury interior design"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-wood-900/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-wood-300 mb-6">
              Start Your Journey
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-6">
              Ready to transform{' '}
              <span className="italic font-normal text-wood-300">your space</span>?
            </h2>
            <p className="font-serif text-lg text-wood-200 leading-relaxed max-w-lg">
              Let&apos;s discuss your vision and create something extraordinary together.
              Schedule a complimentary consultation to get started.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md p-8 sm:p-12 border border-white/20"
          >
            <h3 className="font-display text-2xl font-medium text-white mb-4">
              Schedule a Consultation
            </h3>
            <p className="font-serif text-base text-wood-200 leading-relaxed mb-8">
              Every great project begins with a conversation. Tell us about your space,
              your style, and your dreams.
            </p>

            <div className="space-y-4">
              <Link
                href="/schedule"
                className="group block w-full bg-white text-wood-800 px-8 py-4 text-center font-sans text-[12px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-wood-100"
              >
                Book Your Free Consultation
              </Link>
              <Link
                href="/contact"
                className="group block w-full border border-white/40 text-white px-8 py-4 text-center font-sans text-[12px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white/10 hover:border-white"
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-wood-300 mb-2">
                Or Call Us Directly
              </p>
              <a
                href="tel:+14804664693"
                className="font-display text-2xl text-white hover:text-wood-200 transition-colors"
              >
                (480) 466-4693
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </section>
  );
};

export default CtaSection;
