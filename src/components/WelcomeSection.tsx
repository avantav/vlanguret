'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const WelcomeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-wood-400 mb-6">
              About Us
            </p>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-wood-800 leading-[1.1] mb-8">
              We believe in the power of thoughtful design to transform how you{' '}
              <span className="italic font-normal text-wood-600">live</span>.
            </h2>

            <div className="space-y-6 mb-12">
              <p className="font-serif text-lg text-wood-600 leading-relaxed">
                At VLanguret Design Build, we create luxury residential and commercial spaces that are both highly functional and deeply reflective of your unique style and vision. With over 17+ years of experience in interior design and construction, we seamlessly unite creative design with technical expertise.
              </p>
              <p className="font-serif text-lg text-wood-600 leading-relaxed">
                Serving clients throughout the United States and Mexico, with offices in Tempe, Arizona and Hermosillo, Sonora, we transform homes and businesses through a full-service design-build approach that delivers exceptional results from concept to completion.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-wood-100">
              <div>
                <p className="font-display text-4xl lg:text-5xl font-medium text-wood-800">17+</p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-wood-400 mt-2">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="font-display text-4xl lg:text-5xl font-medium text-wood-800">100+</p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-wood-400 mt-2">
                  Projects
                </p>
              </div>
              <div>
                <p className="font-display text-4xl lg:text-5xl font-medium text-wood-800">5.0</p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-wood-400 mt-2">
                  Google Rating
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/services/remodels.jpg"
                alt="VLanguret luxury bathroom design"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-wood-100 -z-10" />

            {/* Badge */}
            <div className="absolute -bottom-6 right-8 bg-wood-800 text-white px-6 py-4">
              <p className="font-display text-3xl font-medium">17+</p>
              <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-wood-300">
                Years of Excellence
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-width Statement Banner */}
      <div className="bg-wood-800 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-white leading-relaxed"
          >
            &ldquo;From concept to completion, every detail matters. We don&apos;t just design spaces—we craft{' '}
            <span className="italic font-normal text-wood-300">experiences</span>.&rdquo;
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-wood-300 hover:text-white transition-colors"
            >
              Learn Our Story
              <span className="w-8 h-px bg-wood-500 group-hover:w-12 transition-all" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
