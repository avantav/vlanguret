'use client';

import { useState, useEffect } from 'react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  lang?: 'en' | 'es';
}

export function WhatsAppModal({ isOpen, onClose, phoneNumber, lang = 'en' }: WhatsAppModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 200);
  };

  const handleWhatsAppClick = () => {
    const message = lang === 'es'
      ? 'Hola, me gustaría obtener información sobre sus servicios de diseño de interiores.'
      : 'Hello, I would like to get information about your interior design services.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    handleClose();
  };

  if (!isOpen) return null;

  const texts = {
    en: {
      title: 'Message us on WhatsApp',
      subtitle: 'We typically respond within a few hours',
      button: 'Open WhatsApp',
      cancel: 'Cancel',
    },
    es: {
      title: 'Escríbenos por WhatsApp',
      subtitle: 'Normalmente respondemos en pocas horas',
      button: 'Abrir WhatsApp',
      cancel: 'Cancelar',
    },
  };

  const t = texts[lang];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-200 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-wood-100 hover:bg-wood-200 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-wood-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-20 h-20 mx-auto mb-6 bg-[#25D366] rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>

        <div className="text-center">
          <h3 className="font-display text-2xl font-bold text-wood-800 mb-2">
            {t.title}
          </h3>
          <p className="font-serif text-wood-600 mb-8">
            {t.subtitle}
          </p>

          <div className="space-y-3">
            <button
              onClick={handleWhatsAppClick}
              className="group relative w-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-4 rounded-xl font-sans font-semibold text-base transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.button}
            </button>

            <button
              onClick={handleClose}
              className="w-full bg-wood-100 hover:bg-wood-200 text-wood-700 px-6 py-4 rounded-xl font-sans font-medium text-base transition-all duration-300"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsAppModal;
