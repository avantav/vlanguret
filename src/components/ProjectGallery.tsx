'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

interface ProjectGalleryProps {
  images: string[];
  title?: string;
}

const ProjectGallery = ({ images, title }: ProjectGalleryProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-wood-600 font-sans">No images available for this project.</p>
      </div>
    );
  }

  // OPCIÓN ELEGANTE: Grid con Imagen Destacada
  // Primera imagen grande a ancho completo, resto en grid ordenado
  // Muy usado en sitios de diseño de interiores de lujo
  const firstImage = images[0];
  const remainingImages = images.slice(1);

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Primera Imagen - Grande y Destacada - Cinematic aspect */}
        {firstImage && (
          <div
            className="group relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={firstImage}
              alt={title ? `${title} - Main Image` : `Gallery main image`}
              fill
              className="object-cover object-center transition-all duration-700 group-hover:scale-105"
              sizes="100vw"
              priority
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Zoom Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/95 text-wood-800 p-4 md:p-5 rounded-full backdrop-blur-sm shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Resto de Imágenes - Grid más grande (2 columnas) */}
        {remainingImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {remainingImages.map((image, index) => {
              const actualIndex = index + 1; // +1 because we skipped the first image
              return (
                <div
                  key={actualIndex}
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(actualIndex)}
                >
                  <Image
                    src={image}
                    alt={title ? `${title} - Image ${actualIndex + 1}` : `Gallery image ${actualIndex + 1}`}
                    fill
                    className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/95 text-wood-800 p-4 md:p-5 rounded-full backdrop-blur-sm shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Corner accent on hover */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/60" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images}
        isOpen={isLightboxOpen}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </>
  );
};

export default ProjectGallery;
