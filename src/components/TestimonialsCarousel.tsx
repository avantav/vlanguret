'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  clientName: string;
  content: string;
  rating: number;
  date?: string;
  photoCount?: number;
}

interface Props {
  testimonials: Testimonial[];
  totalReviews?: number;
}

// Google "G" logo component
const GoogleG = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Star rating component with size option
const StarRating = ({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${sizeClasses[size]} text-yellow-400`} fill="currentColor" viewBox="0 0 24 24">
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
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'
  ];
  const colorIndex = name.length % colors.length;

  return (
    <div className={`w-10 h-10 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-semibold text-sm`}>
      {initials}
    </div>
  );
};

// Individual testimonial card
const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;
  const isLong = testimonial.content.length > maxLength;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-2xl p-6 shadow-lg border border-wood-100 h-full flex flex-col ${
        isActive ? 'ring-2 ring-wood-300' : ''
      }`}
    >
      {/* Header: Avatar, Name, Date */}
      <div className="flex items-start gap-3 mb-4">
        <Avatar name={testimonial.clientName} />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-wood-900 text-sm truncate">
            {testimonial.clientName}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating size="sm" />
          </div>
        </div>
        <GoogleG />
      </div>

      {/* Date and photo count */}
      <div className="flex items-center gap-2 text-xs text-wood-400 mb-3">
        {testimonial.date && <span>{testimonial.date}</span>}
        {testimonial.photoCount && testimonial.photoCount > 0 && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {testimonial.photoCount}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-wood-700 text-sm leading-relaxed">
          {isLong && !isExpanded
            ? `${testimonial.content.slice(0, maxLength)}...`
            : testimonial.content
          }
        </p>
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-wood-500 hover:text-wood-700 text-sm font-medium mt-2 transition-colors"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

const TestimonialsCarousel = ({ testimonials, totalReviews }: Props) => {
  const reviewCount = totalReviews || testimonials.length;
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive: show 1 on mobile, 2 on tablet, 3 on desktop
  const getItemsPerPage = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage();
      setItemsPerPage(newItemsPerPage);
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getItemsPerPage]);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToPage = (page: number) => {
    setIsAutoPlaying(false);
    setCurrentPage(page);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextPage = () => goToPage((currentPage + 1) % totalPages);
  const prevPage = () => goToPage((currentPage - 1 + totalPages) % totalPages);

  return (
    <div className="space-y-8">
      {/* Google Reviews Summary Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-wood-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GoogleG />
            <span className="font-semibold text-wood-800">Google Reviews</span>
          </div>
          <div className="h-6 w-px bg-wood-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-wood-900">5.0</span>
            <div className="flex flex-col">
              <StarRating size="md" />
              <span className="text-xs text-wood-500">{reviewCount} reviews</span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            className="p-2 rounded-full bg-wood-100 hover:bg-wood-200 text-wood-600 transition-colors"
            aria-label="Previous reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm text-wood-500 min-w-[60px] text-center">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            className="p-2 rounded-full bg-wood-100 hover:bg-wood-200 text-wood-600 transition-colors"
            aria-label="Next reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-6 ${
              isMobile
                ? 'grid-cols-1'
                : itemsPerPage === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-3'
            }`}
          >
            {currentTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={false}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentPage
                ? 'w-8 h-2 bg-wood-600'
                : 'w-2 h-2 bg-wood-300 hover:bg-wood-400'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* View All on Google Link */}
      <div className="text-center pt-4">
        <a
          href="https://maps.app.goo.gl/k9wD8pbWQ7HQD2vM8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-wood-600 hover:text-wood-800 font-medium text-sm transition-colors group"
        >
          <span>View all reviews on Google</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
