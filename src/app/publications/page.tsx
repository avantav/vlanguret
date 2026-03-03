'use client';

import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Publication {
  id: string;
  title: string;
  magazine: string;
  date: string;
  description: string;
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

const publications: Publication[] = [
  {
    id: 'stroll-seville-may-2025',
    title: 'Featured in Stroll Seville',
    magazine: 'Stroll Seville Magazine',
    date: 'May 2025',
    description: 'VLanguret Design Build was featured in Stroll Seville Magazine, showcasing our commitment to luxury interior design and exceptional craftsmanship in the Scottsdale and Paradise Valley area.',
    images: [
      {
        src: '/images/press/May_2025_Stroll_Seville_page_18.jpg',
        alt: 'Stroll Seville Magazine May 2025 - Page 18',
        caption: 'Page 18',
      },
      {
        src: '/images/press/May_2025_Stroll_Seville_pages_20_21.jpg',
        alt: 'Stroll Seville Magazine May 2025 - Pages 20-21',
        caption: 'Pages 20-21',
      },
      {
        src: '/images/press/May_2025_Stroll_Seville_pages_22_23.jpg',
        alt: 'Stroll Seville Magazine May 2025 - Pages 22-23',
        caption: 'Pages 22-23',
      },
    ],
  },
];

export default function PublicationsPage() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Publications', href: '/publications' },
  ];

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage({ src, alt });
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'unset';
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleDownload = async () => {
    if (!lightboxImage) return;

    try {
      const response = await fetch(lightboxImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = lightboxImage.src.split('/').pop() || 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(lightboxImage.src, '_blank');
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.2, 4));
    } else {
      setZoom((prev) => {
        const newZoom = Math.max(prev - 0.2, 1);
        if (newZoom === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return newZoom;
      });
    }
  };

  // Handle mouse/touch move and up at document level for reliable dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && zoom > 1) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && zoom > 1 && e.touches.length === 1) {
        e.preventDefault();
        setPosition({
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    if (lightboxImage) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage, isDragging, zoom, dragStart]);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-8">
              <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-wood-400 mb-4">
                Press & Media
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-wood-800 leading-[1.1] max-w-3xl">
                Publications
              </h1>
              <p className="font-serif text-lg sm:text-xl text-wood-500 mt-6 max-w-2xl leading-relaxed">
                Our work has been recognized by leading interior design and lifestyle publications.
              </p>
            </div>
          </div>
        </section>

        {/* Publications Grid */}
        <section className="py-16 sm:py-20 lg:py-24 bg-wood-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {publications.map((publication) => (
              <article key={publication.id} className="mb-20 last:mb-0">
                {/* Publication Header */}
                <div className="mb-10 sm:mb-12">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-block px-4 py-2 bg-wood-800 text-white font-sans text-[11px] tracking-[0.15em] uppercase">
                      {publication.magazine}
                    </span>
                    <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-wood-400">
                      {publication.date}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-medium text-wood-800 mb-4">
                    {publication.title}
                  </h2>
                  <p className="font-serif text-base sm:text-lg text-wood-500 leading-relaxed max-w-3xl">
                    {publication.description}
                  </p>
                </div>

                {/* Magazine Spreads */}
                <div className="space-y-8">
                  {publication.images.map((image, index) => (
                    <div key={index} className="group">
                      <button
                        onClick={() => openLightbox(image.src, image.alt)}
                        className="relative w-full overflow-hidden bg-wood-100 shadow-lg cursor-zoom-in transition-transform duration-300 hover:shadow-xl"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={1600}
                          height={1200}
                          className="w-full h-auto object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 px-4 py-2 font-sans text-xs tracking-wider uppercase text-wood-800">
                            Click to enlarge
                          </span>
                        </div>
                      </button>
                      {image.caption && (
                        <p className="mt-3 font-sans text-[11px] tracking-[0.15em] uppercase text-wood-400 text-center">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-24 lg:py-32 bg-wood-800">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-wood-400 mb-6">
              Ready to Transform Your Space?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-[1.15] mb-8">
              Let&apos;s create something{' '}
              <span className="italic font-normal text-wood-300">beautiful together</span>.
            </h2>
            <Link
              href="/schedule"
              className="inline-block font-sans text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-wood-800 bg-white hover:bg-wood-100 px-8 py-4 transition-all duration-300"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => zoom === 1 && closeLightbox()}
        >
          {/* Top toolbar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
            {/* Zoom controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="p-2 text-white/70 hover:text-white disabled:text-white/30 transition-colors bg-white/10 hover:bg-white/20 disabled:bg-transparent rounded"
                aria-label="Zoom out"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              <span className="text-white/70 font-sans text-sm min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 4}
                className="p-2 text-white/70 hover:text-white disabled:text-white/30 transition-colors bg-white/10 hover:bg-white/20 disabled:bg-transparent rounded"
                aria-label="Zoom in"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </button>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Download button */}
              <button
                onClick={handleDownload}
                className="p-2 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded flex items-center gap-2"
                aria-label="Download image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline font-sans text-sm">Download</span>
              </button>

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="p-2 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded"
                aria-label="Close lightbox"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Hint text */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 font-sans text-xs tracking-wider uppercase z-20">
            {zoom > 1 ? 'Drag to pan' : 'Use + / - to zoom'}
          </p>

          {/* Image container */}
          <div
            ref={containerRef}
            className="relative overflow-hidden w-full h-full flex items-center justify-center touch-none"
            style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            onWheel={handleWheel}
            onMouseDown={(e) => {
              if (zoom > 1) {
                e.preventDefault();
                setIsDragging(true);
                setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
              }
            }}
            onTouchStart={(e) => {
              if (zoom > 1 && e.touches.length === 1) {
                setIsDragging(true);
                setDragStart({
                  x: e.touches[0].clientX - position.x,
                  y: e.touches[0].clientY - position.y
                });
              }
            }}
            onClick={(e) => {
              if (zoom === 1 && !isDragging) {
                closeLightbox();
              }
              e.stopPropagation();
            }}
          >
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              }}
              className="max-w-[95vw] max-h-[85vh]"
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                width={2400}
                height={1800}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain select-none"
                draggable={false}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
