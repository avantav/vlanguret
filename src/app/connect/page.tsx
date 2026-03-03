'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { connectData } from '@/data/connect';

type Lang = 'en' | 'es';

export default function ConnectPage() {
  const [lang, setLang] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = connectData.translations[lang];

  const handleWhatsApp = () => {
    const message = lang === 'es'
      ? 'Hola, me gustaría información sobre sus servicios de diseño.'
      : 'Hello, I would like information about your design services.';
    window.open(`https://wa.me/${connectData.contact.phoneWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!mounted) {
    return (
      <div className="h-screen bg-[#FDFAF5] flex items-center justify-center">
        <div className="w-5 h-5 border border-wood-300 border-t-wood-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="h-screen bg-[#FDFAF5] flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute top-5 right-5 z-10"
      >
        <button
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
          className="text-xs font-sans text-wood-400 hover:text-wood-600 transition-colors tracking-wider"
        >
          {lang === 'en' ? 'ES' : 'EN'}
        </button>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <Image
            src="/logo_original.png"
            alt="VLanguret Design Build"
            width={180}
            height={180}
            className="w-auto h-32 sm:h-40 object-contain"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-serif text-wood-500 text-sm tracking-[0.2em] mb-12 text-center"
        >
          {lang === 'es' ? 'DISEÑO DE INTERIORES DE LUJO' : 'LUXURY INTERIOR DESIGN'}
        </motion.p>

        <div className="w-full max-w-xs space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/schedule"
                className="block w-full text-center py-4 bg-wood-800 text-white font-sans text-xs tracking-[0.15em] uppercase hover:bg-wood-900 transition-colors"
              >
                {t.scheduleCall}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={connectData.links.portfolio}
                className="block w-full text-center py-4 border border-wood-300 text-wood-700 font-sans text-xs tracking-[0.15em] uppercase hover:border-wood-500 hover:text-wood-800 transition-colors"
              >
                {t.viewPortfolio}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex gap-3 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleWhatsApp}
              className="flex-1 py-3 border border-wood-200 text-wood-600 font-sans text-xs tracking-wider hover:border-wood-400 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={`tel:+${connectData.contact.phoneWhatsApp}`}
              className="flex-1 py-3 border border-wood-200 text-wood-600 font-sans text-xs tracking-wider hover:border-wood-400 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {lang === 'es' ? 'Llamar' : 'Call'}
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="pb-6 px-6 sm:px-8"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6">
            {connectData.social.map((social) => (
              <motion.a
                key={social.platform}
                whileHover={{ scale: 1.2, color: '#6B5335' }}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-wood-400 transition-colors"
                aria-label={social.platform}
              >
                {social.icon === 'instagram' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                )}
                {social.icon === 'tiktok' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                )}
              </motion.a>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="font-sans text-[10px] text-wood-300 tracking-wider text-center"
          >
            {connectData.contact.location} · {connectData.contact.rocLicense}
          </motion.p>
        </div>
      </motion.footer>
    </main>
  );
}
