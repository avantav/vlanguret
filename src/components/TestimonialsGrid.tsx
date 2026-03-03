'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface TestimonialPhoto {
  url: string;
  alt?: string;
}

interface Testimonial {
  id: number;
  clientName: string;
  content: string;
  rating: number;
  date?: string;
  photoCount?: number;
  photos?: TestimonialPhoto[];
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

// Star rating component
const StarRating = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
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
    <div className={`w-12 h-12 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-semibold text-base flex-shrink-0`}>
      {initials}
    </div>
  );
};

// Photo gallery modal
const PhotoGallery = ({
  photos,
  isOpen,
  onClose,
  clientName
}: {
  photos: TestimonialPhoto[];
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
}) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  if (!isOpen || !photos || photos.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-wood-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <div className="relative aspect-video bg-black overflow-hidden">
            <Image
              src={photos[currentPhoto].url}
              alt={photos[currentPhoto].alt || `Photo by ${clientName}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Navigation */}
          {photos.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={() => setCurrentPhoto((prev) => (prev === 0 ? photos.length - 1 : prev - 1))}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-white">
                {currentPhoto + 1} / {photos.length}
              </span>
              <button
                onClick={() => setCurrentPhoto((prev) => (prev === photos.length - 1 ? 0 : prev + 1))}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Individual testimonial card
const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const maxLength = 280;
  const isLong = testimonial.content.length > maxLength;
  const hasPhotos = testimonial.photos && testimonial.photos.length > 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="bg-white p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-wood-100 flex flex-col h-full"
      >
        {/* Header: Avatar, Name, Google */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar name={testimonial.clientName} />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-wood-900 text-base">
              {testimonial.clientName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <StarRating size="sm" />
            </div>
            {testimonial.date && (
              <p className="text-xs text-wood-400 mt-1">{testimonial.date}</p>
            )}
          </div>
          <GoogleG />
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-wood-700 text-sm leading-relaxed">
            {isLong && !isExpanded
              ? `"${testimonial.content.slice(0, maxLength)}..."`
              : `"${testimonial.content}"`
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

        {/* Photos section */}
        {(hasPhotos || (testimonial.photoCount && testimonial.photoCount > 0)) && (
          <div className="mt-4 pt-4 border-t border-wood-100">
            {hasPhotos ? (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {testimonial.photos!.slice(0, 4).map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setShowGallery(true)}
                    className="relative w-16 h-16 overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.alt || `Photo ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    {idx === 3 && testimonial.photos!.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          +{testimonial.photos!.length - 4}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-wood-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{testimonial.photoCount} photos on Google</span>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Photo Gallery Modal */}
      {hasPhotos && (
        <PhotoGallery
          photos={testimonial.photos!}
          isOpen={showGallery}
          onClose={() => setShowGallery(false)}
          clientName={testimonial.clientName}
        />
      )}
    </>
  );
};

const TestimonialsGrid = ({ testimonials, totalReviews }: Props) => {
  const reviewCount = totalReviews || testimonials.length;

  return (
    <div className="space-y-8">
      {/* Google Reviews Summary Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-wood-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GoogleG />
            <span className="font-semibold text-wood-800 text-lg">Google Reviews</span>
          </div>
          <div className="h-8 w-px bg-wood-200 hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-wood-900">5.0</span>
            <div className="flex flex-col">
              <StarRating size="md" />
              <span className="text-sm text-wood-500">{reviewCount} reviews</span>
            </div>
          </div>
        </div>

        <a
          href="https://maps.app.goo.gl/k9wD8pbWQ7HQD2vM8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-wood-100 hover:bg-wood-200 text-wood-700 px-4 py-2 text-sm font-medium transition-colors"
        >
          <span>Write a Review</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>

      {/* View on Google Link */}
      <div className="text-center pt-8">
        <a
          href="https://maps.app.goo.gl/k9wD8pbWQ7HQD2vM8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-wood-600 hover:text-wood-800 font-medium transition-colors group"
        >
          <GoogleG />
          <span>See all reviews on Google Maps</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TestimonialsGrid;
