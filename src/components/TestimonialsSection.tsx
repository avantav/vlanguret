'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getStaticTestimonials, TOTAL_GOOGLE_REVIEWS } from '@/lib/services';

// Google "G" logo component
const GoogleG = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Star rating component
const StarRating = () => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
};

// Avatar with initials
const Avatar = ({ name }: { name: string }) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const colors = [
    'bg-wood-400', 'bg-wood-500', 'bg-wood-600', 'bg-sage-400',
    'bg-sage-500', 'bg-wood-700', 'bg-wood-300', 'bg-sage-300'
  ];
  const colorIndex = name.length % colors.length;

  return (
    <div className={`w-10 h-10 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-medium text-sm flex-shrink-0`}>
      {initials}
    </div>
  );
};

// Photo Gallery Modal
const PhotoModal = ({
  photos,
  isOpen,
  onClose,
  initialIndex = 0
}: {
  photos: { url: string; alt?: string }[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !photos || photos.length === 0) return null;

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-wood-900/95 p-4"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="relative w-full max-w-4xl aspect-[4/3] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={photos[currentIndex].url}
            alt={photos[currentIndex].alt || `Photo ${currentIndex + 1}`}
            fill
            className="object-contain"
            unoptimized
          />
        </motion.div>

        {/* Navigation */}
        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-6 p-3 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-6 p-3 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[11px] tracking-[0.2em] text-white/60">
              {currentIndex + 1} / {photos.length}
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const TestimonialsSection = () => {
  const staticTestimonials = getStaticTestimonials();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [photoModal, setPhotoModal] = useState<{ isOpen: boolean; photos: { url: string; alt?: string }[]; initialIndex: number }>({
    isOpen: false,
    photos: [],
    initialIndex: 0,
  });

  // Get top 5 testimonials for the homepage feature
  const featuredTestimonials = staticTestimonials.slice(0, 5);
  const activeTestimonial = featuredTestimonials[activeIndex];

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % featuredTestimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredTestimonials.length]);

  const handleSelect = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (staticTestimonials.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-wood-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header - Same layout as other sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 sm:mb-20">
          {/* Left column - Label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400">
              Client Stories
            </p>
          </motion.div>

          {/* Right column - Heading + Google Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-9"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-[1.15] max-w-2xl mb-6">
              Words from those{' '}
              <span className="italic font-normal text-wood-300">we&apos;ve served</span>.
            </h2>

            {/* Google Badge - Inline */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2.5 border border-white/10">
              <GoogleG />
              <span className="font-display text-xl font-medium text-white">5.0</span>
              <StarRating />
              <span className="font-sans text-[11px] tracking-wider text-white/60">{TOTAL_GOOGLE_REVIEWS} reviews</span>
            </div>
          </motion.div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl lg:ml-auto lg:mr-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Quote Mark */}
              <div className="absolute -top-4 -left-2 font-display text-8xl text-wood-600/30 leading-none select-none">
                &ldquo;
              </div>

              {/* Quote */}
              <p className="font-serif text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/90 pl-8 sm:pl-12">
                {activeTestimonial.content.length > 280
                  ? activeTestimonial.content.slice(0, 280) + '...'
                  : activeTestimonial.content}
              </p>

              {/* Photos */}
              {activeTestimonial.photos && activeTestimonial.photos.length > 0 && (
                <div className="flex gap-2 mt-8 overflow-x-auto pb-2 pl-8 sm:pl-12">
                  {activeTestimonial.photos.slice(0, 4).map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPhotoModal({
                        isOpen: true,
                        photos: activeTestimonial.photos || [],
                        initialIndex: idx,
                      })}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden flex-shrink-0 border border-white/10 hover:border-white/30 transition-colors cursor-pointer group"
                    >
                      <Image
                        src={photo.url}
                        alt={photo.alt || `Project photo ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </button>
                  ))}
                  {activeTestimonial.photos.length > 4 && (
                    <button
                      onClick={() => setPhotoModal({
                        isOpen: true,
                        photos: activeTestimonial.photos || [],
                        initialIndex: 4,
                      })}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 text-sm font-sans flex-shrink-0 transition-colors cursor-pointer"
                    >
                      +{activeTestimonial.photos.length - 4}
                    </button>
                  )}
                </div>
              )}

              {/* Client Info */}
              <div className="flex items-center gap-4 mt-8 pl-8 sm:pl-12">
                <Avatar name={activeTestimonial.clientName} />
                <div>
                  <h4 className="font-sans text-sm font-medium text-white">
                    {activeTestimonial.clientName}
                  </h4>
                  {activeTestimonial.date && (
                    <p className="font-sans text-[11px] tracking-wider text-white/50 mt-0.5">
                      {activeTestimonial.date}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation - Progress Bar Style */}
          <div className="flex items-center gap-3 mt-12 pl-8 sm:pl-12">
            <span className="font-sans text-[10px] tracking-wider text-white/40">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 max-w-32 h-px bg-white/20 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-white/60 transition-all duration-500"
                style={{ width: `${((activeIndex + 1) / featuredTestimonials.length) * 100}%` }}
              />
            </div>
            <span className="font-sans text-[10px] tracking-wider text-white/40">
              {String(featuredTestimonials.length).padStart(2, '0')}
            </span>

            {/* Arrows */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => handleSelect((activeIndex - 1 + featuredTestimonials.length) % featuredTestimonials.length)}
                className="p-2 text-white/40 hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handleSelect((activeIndex + 1) % featuredTestimonials.length)}
                className="p-2 text-white/40 hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* CTA - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 sm:mt-24 pt-12 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="font-serif text-lg sm:text-xl text-white/70 max-w-md">
              Join the families who&apos;ve trusted us with their homes.
            </p>
            <Link
              href="/testimonials"
              className="group inline-flex items-center gap-3 font-sans text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-white hover:text-white/70 transition-colors duration-300"
            >
              Read All Reviews
              <span className="w-8 h-px bg-white/40 transition-all duration-300 group-hover:w-12 group-hover:bg-white/60" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Photo Gallery Modal */}
      <PhotoModal
        photos={photoModal.photos}
        isOpen={photoModal.isOpen}
        onClose={() => setPhotoModal({ isOpen: false, photos: [], initialIndex: 0 })}
        initialIndex={photoModal.initialIndex}
      />
    </section>
  );
};

export default TestimonialsSection;
