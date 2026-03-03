'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Publication {
  name: string;
  logo: string;
  url?: string;
  isInternal?: boolean;
}

export const publications: Publication[] = [
  {
    name: 'Luxe Interiors + Design',
    logo: '/press/luxe-interiors-design.svg',
    url: 'https://luxesource.com',
  },
  {
    name: 'Stroll Seville',
    logo: '/press/stroll-magazine.svg',
    url: '/publications',
    isInternal: true,
  },
];

const AsSeenInSection = () => {
  if (publications.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-wood-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {/* Label */}
          <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-wood-400">
            As Seen In
          </p>

          {/* Divider - hidden on mobile */}
          <div className="hidden sm:block w-px h-8 bg-wood-700" />

          {/* Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {pub.url ? (
                  pub.isInternal ? (
                    <Link
                      href={pub.url}
                      className="block opacity-80 hover:opacity-100 transition-opacity duration-300"
                      title={pub.name}
                    >
                      <Image
                        src={pub.logo}
                        alt={pub.name}
                        width={180}
                        height={70}
                        className="h-8 sm:h-10 lg:h-12 w-auto object-contain invert"
                      />
                    </Link>
                  ) : (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block opacity-80 hover:opacity-100 transition-opacity duration-300"
                      title={pub.name}
                    >
                      <Image
                        src={pub.logo}
                        alt={pub.name}
                        width={180}
                        height={70}
                        className="h-8 sm:h-10 lg:h-12 w-auto object-contain invert"
                      />
                    </a>
                  )
                ) : (
                  <div className="opacity-80">
                    <Image
                      src={pub.logo}
                      alt={pub.name}
                      width={180}
                      height={70}
                      className="h-8 sm:h-10 lg:h-12 w-auto object-contain invert"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AsSeenInSection;
