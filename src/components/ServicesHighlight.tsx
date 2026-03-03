'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    title: 'Full Service Design',
    description: 'End-to-end interior design from concept through installation, including space planning, construction drawings, material selection, procurement, and styling. We collaborate seamlessly with both builders and homeowners.',
    image: '/images/services/full-service-design.png',
  },
  {
    title: 'Full & Partial Remodels',
    description: 'Thoughtfully designed residential and commercial renovations featuring custom cabinetry, refined finishes, and premium materials.',
    image: '/images/services/remodels.jpg',
  },
  {
    title: 'Construction',
    description: 'Full-service construction management for remodels and additions, delivering precision, accountability, and transparent communication.',
    image: '/images/services/construction.jpg',
  },
];

const ServicesHighlight = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-wood-400">
              Our Services
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-9"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-wood-800 leading-[1.1] max-w-3xl">
              Everything you need,{' '}
              <span className="italic font-normal text-wood-600">under one roof</span>.
            </h2>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-wood-900/0 group-hover:bg-wood-900/20 transition-colors duration-500" />
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-medium text-wood-800 mb-3 group-hover:text-wood-600 transition-colors">
                {service.title}
              </h3>
              <p className="font-serif text-base text-wood-500 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-12 border-t border-wood-100 flex justify-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-4 font-sans text-[12px] tracking-[0.2em] uppercase text-wood-800"
          >
            <span className="relative">
              View All Services
              <span className="absolute -bottom-1 left-0 w-full h-px bg-wood-800 origin-left transition-transform duration-300 group-hover:scale-x-0" />
            </span>
            <span className="w-12 h-px bg-wood-400 transition-all duration-300 group-hover:w-20 group-hover:bg-wood-800" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHighlight;
