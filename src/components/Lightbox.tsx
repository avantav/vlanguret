'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LightboxProps {
  images: string[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Lightbox = ({ images, isOpen, currentIndex, onClose, onNext, onPrevious }: LightboxProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors duration-200"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && (
        <button
          onClick={onPrevious}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors duration-200"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors duration-200"
          aria-label="Next image"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div className="relative max-w-7xl max-h-[85vh] sm:max-h-[90vh] w-full h-full flex items-center justify-center p-2 sm:p-4">
        <div className="relative w-full h-full">
          <Image
            src={currentImage}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            className="object-contain"
            onLoad={() => setIsLoading(false)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
            priority
          />
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-sans">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Thumbnail Navigation - Hidden on mobile for more image space */}
      {images.length > 1 && (
        <div className="hidden sm:flex absolute bottom-16 left-1/2 transform -translate-x-1/2 space-x-2 max-w-md overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                // This would need to be handled by parent component
                // For now, we'll just show the thumbnails
              }}
              className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                index === currentIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-80'
              } transition-opacity duration-200`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
