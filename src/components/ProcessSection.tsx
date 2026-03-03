'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const processSteps = [
  {
    number: '01',
    title: 'Design',
    description: 'We listen, conceptualize, and create detailed plans that capture your vision with mood boards, 3D renderings, and material selections.',
  },
  {
    number: '02',
    title: 'Build',
    description: 'Our expert craftsmen bring the design to life with meticulous attention to detail, quality materials, and transparent communication.',
  },
  {
    number: '03',
    title: 'Reveal',
    description: 'We present your beautifully transformed space, styled to perfection and ready for you to enjoy for years to come.',
  },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Full-width Image + Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Left - Image */}
        <div className="relative h-[50vh] lg:h-auto overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={isInView ? { scale: 1 } : { scale: 1.1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <Image
              src="/images/process-hero.png"
              alt="Interior design process"
              fill
              className="object-cover object-[30%_75%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-wood-900/20 to-transparent lg:bg-gradient-to-l" />
          {/* Floating Label */}
          <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
            <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-white/80 bg-wood-800/80 backdrop-blur-sm px-4 py-2">
              Our Process
            </span>
          </div>
        </div>

        {/* Right - Content */}
        <div className="bg-wood-50 flex items-center">
          <div className="px-8 sm:px-12 lg:px-20 py-16 lg:py-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-wood-800 leading-[1.1] mb-6">
                A thoughtful approach to{' '}
                <span className="italic font-normal text-wood-600">every project</span>.
              </h2>
              <p className="font-serif text-lg text-wood-600 leading-relaxed mb-12 max-w-lg">
                From the first conversation to the final reveal, we guide you through a seamless journey of transformation.
              </p>
            </motion.div>

            {/* Steps */}
            <div className="space-y-10">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0">
                    <span className="font-display text-5xl font-light text-wood-200 group-hover:text-wood-300 transition-colors duration-500">
                      {step.number}
                    </span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display text-xl font-medium text-wood-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="font-serif text-base text-wood-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 pt-8 border-t border-wood-200"
            >
              <Link
                href="/processes"
                className="group inline-flex items-center gap-4 font-sans text-[12px] tracking-[0.2em] uppercase text-wood-800"
              >
                <span className="relative">
                  Explore Our Process
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-wood-800 origin-left transition-transform duration-300 group-hover:scale-x-0" />
                </span>
                <span className="w-12 h-px bg-wood-400 transition-all duration-300 group-hover:w-20 group-hover:bg-wood-800" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
