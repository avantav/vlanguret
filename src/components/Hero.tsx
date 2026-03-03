'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSlide {
  type: 'image' | 'video' | 'gif';
  src: string;
  alt?: string;
}

// Ken Burns animation types
type KenBurnsType = 1 | 2 | 3 | 4;

interface HeroProps {
  heroImages?: string[];
}

const Hero = ({ heroImages }: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const preloadedImages = useRef<Set<string>>(new Set());

  // Get Ken Burns animation type based on index
  const getKenBurnsType = useCallback((index: number): KenBurnsType => {
    return ((index % 4) + 1) as KenBurnsType;
  }, []);

  // Hero slides
  const slides: HeroSlide[] = heroImages && heroImages.length > 0
    ? heroImages.map((src, index) => ({
        type: 'image' as const,
        src,
        alt: `VLanguret Design Build - Project ${index + 1}`
      }))
    : [
        {
          type: 'image' as const,
          src: '/logo-original.png',
          alt: 'VLanguret Design Build'
        }
      ];

  // Load first image immediately, preload rest in background
  useEffect(() => {
    if (slides.length <= 1) {
      setImagesLoaded(true);
      return;
    }

    // Load first image immediately
    const firstSlide = slides[0];
    if (firstSlide.type === 'image') {
      const firstImg = new window.Image();
      firstImg.src = firstSlide.src;
      firstImg.onload = () => {
        preloadedImages.current.add(firstSlide.src);
        setLoadedCount(1);
        setImagesLoaded(true); // Show hero as soon as first image loads

        // Then preload the rest in background (non-blocking)
        slides.slice(1).forEach((slide, idx) => {
          if (slide.type === 'image' && !preloadedImages.current.has(slide.src)) {
            const img = new window.Image();
            img.src = slide.src;
            img.onload = () => {
              preloadedImages.current.add(slide.src);
              setLoadedCount(prev => prev + 1);
            };
          }
        });
      };
      firstImg.onerror = () => {
        setImagesLoaded(true); // Show anyway even if first fails
      };
    } else {
      setImagesLoaded(true);
    }
  }, [slides]);

  // Auto-advance carousel - 4 seconds between slides
  useEffect(() => {
    if (isPaused || slides.length <= 1 || !imagesLoaded) return;

    const interval = setInterval(() => {
      // Start transition
      setIsTransitioning(true);

      // After transition completes, update indices
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const newCurrent = prevIndex === slides.length - 1 ? 0 : prevIndex + 1;
          return newCurrent;
        });
        setNextIndex((prevNext) => {
          const newNext = prevNext === slides.length - 1 ? 0 : prevNext + 1;
          return newNext;
        });
        setIsTransitioning(false);
      }, 1000); // Match the CSS transition duration
    }, 4000); // 4 seconds between slides

    return () => clearInterval(interval);
  }, [isPaused, slides.length, imagesLoaded]);

  // Update nextIndex when currentIndex changes
  useEffect(() => {
    const next = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    if (!isTransitioning) {
      setNextIndex(next);
    }
  }, [currentIndex, slides.length, isTransitioning]);

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[nextIndex];

  // Ken Burns animation classes for current and next
  const currentKenBurns = `animate-kenburns-${getKenBurnsType(currentIndex)}`;
  const nextKenBurns = `animate-kenburns-${getKenBurnsType(nextIndex)}`;

  return (
    <section
      className="relative h-screen flex items-end justify-center overflow-hidden bg-wood-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {!imagesLoaded && slides.length > 1 && (
        <div className="absolute inset-0 z-50 bg-wood-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mb-4 mx-auto" />
            <p className="text-white/60 text-sm tracking-wider">
              {loadedCount} / {slides.length}
            </p>
          </div>
        </div>
      )}

      {/* Background with Ken Burns effect - Crossfade implementation */}
      <div className="absolute inset-0 z-0">
        {/* Next image (underneath) */}
        {slides.length > 1 && nextSlide.type === 'image' && (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              key={`next-${nextIndex}`}
              src={nextSlide.src}
              alt={nextSlide.alt || 'Luxury Interior Design'}
              fill
              className={`object-cover object-center ${nextKenBurns}`}
              sizes="100vw"
              quality={90}
            />
          </div>
        )}

        {/* Current image (on top, fades out during transition) */}
        {currentSlide.type === 'image' || currentSlide.type === 'gif' ? (
          <div
            className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Image
              key={`current-${currentIndex}`}
              src={currentSlide.src}
              alt={currentSlide.alt || 'Luxury Interior Design'}
              fill
              className={`object-cover object-center ${currentKenBurns}`}
              priority
              sizes="100vw"
              quality={90}
              unoptimized={currentSlide.type === 'gif'}
            />
          </div>
        ) : (
          <video
            src={currentSlide.src}
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Preload all images in hidden container for browser cache */}
      <div className="hidden">
        {slides.map((slide, index) => (
          slide.type === 'image' && index !== currentIndex && (
            <Image
              key={`preload-${index}`}
              src={slide.src}
              alt=""
              width={1}
              height={1}
              priority={index < 3}
            />
          )
        ))}
      </div>

      {/* Subtle gradient overlay for luxury feel */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-wood-900/40 via-transparent to-wood-900/20" />

      {/* Vignette effect */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(26,25,24,0.3)_100%)]" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-32 sm:pb-36 lg:pb-40">
        <p className="font-sans text-[11px] sm:text-xs tracking-[0.3em] uppercase text-white/70 mb-6">
          Luxury Interior Design
        </p>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] mb-8 max-w-4xl">
          Creating Timeless
          <br />
          <span className="italic font-normal">Living Spaces</span>
        </h1>

        <Link
          href="/schedule"
          className="group relative font-sans text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-white px-8 sm:px-10 py-4 border border-white/40 hover:bg-white hover:text-wood-900 transition-all duration-500"
        >
          <span className="relative z-10">Start Your Project</span>
        </Link>
      </div>

      {/* Minimal dots indicator - bottom left, more subtle */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-8 sm:left-12 z-20 flex items-center gap-3">
          <span className="font-sans text-[10px] tracking-wider text-white/50">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <div className="w-12 h-px bg-white/30 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white/80 transition-all duration-700"
              style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
            />
          </div>
          <span className="font-sans text-[10px] tracking-wider text-white/50">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      )}

    </section>
  );
};

export default Hero;
