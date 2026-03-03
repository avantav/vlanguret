'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { StaticTeamMember } from '@/lib/teamMembers';

interface AboutSectionClientProps {
  displayMembers: StaticTeamMember[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

// Bio Modal Component
const BioModal = ({
  member,
  isOpen,
  onClose
}: {
  member: StaticTeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
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

  if (!isOpen || !member) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-wood-900/90 backdrop-blur-sm p-4 sm:p-6"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/60 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full md:w-2/5 aspect-[3/4] md:aspect-auto flex-shrink-0">
            <Image
              src={member.photoUrl}
              alt={member.name}
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-wood-800 mb-2">
              {member.name}
            </h3>
            <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-wood-400 mb-6">
              {member.role}
            </p>
            <div className="font-serif text-base sm:text-lg leading-relaxed text-wood-600 space-y-4">
              {member.bio?.split('. ').reduce((acc: string[][], sentence, index, arr) => {
                // Group sentences into paragraphs (roughly 2-3 sentences each)
                const lastGroup = acc[acc.length - 1];
                if (!lastGroup || lastGroup.length >= 2) {
                  acc.push([sentence + (index < arr.length - 1 ? '.' : '')]);
                } else {
                  lastGroup.push(sentence + (index < arr.length - 1 ? '.' : ''));
                }
                return acc;
              }, []).map((group, idx) => (
                <p key={idx}>{group.join(' ')}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Truncate text helper
const truncateBio = (bio: string, maxLength: number = 150) => {
  if (bio.length <= maxLength) return { text: bio, isTruncated: false };
  const truncated = bio.slice(0, maxLength).split(' ').slice(0, -1).join(' ');
  return { text: truncated + '...', isTruncated: true };
};

const AboutSectionClient = ({ displayMembers }: AboutSectionClientProps) => {
  const [selectedMember, setSelectedMember] = useState<StaticTeamMember | null>(null);

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 sm:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400">
              Our Team
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-9"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-wood-800 leading-[1.15] max-w-2xl">
              The people behind{' '}
              <span className="italic font-normal text-wood-600">every detail</span>.
            </h2>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16"
        >
          {displayMembers.map((member: StaticTeamMember) => {
            const { text: truncatedBio, isTruncated } = member.bio
              ? truncateBio(member.bio, 150)
              : { text: '', isTruncated: false };

            return (
              <motion.div
                key={member._id}
                variants={itemVariants}
                className="group"
              >
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-wood-100">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                  />

                  {member.bio && (
                    <div className="absolute inset-0 bg-gradient-to-t from-wood-900/95 via-wood-900/80 to-wood-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-6 text-center">
                      <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        <p className="font-serif text-sm leading-relaxed mb-4">
                          {truncatedBio}
                        </p>
                        {isTruncated && (
                          <button
                            onClick={() => setSelectedMember(member)}
                            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors border-b border-white/40 hover:border-white pb-1"
                          >
                            Read More
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-wood-800 mb-1 transition-colors duration-300 group-hover:text-wood-600">
                    {member.name}
                  </h3>
                  <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-wood-400">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-12 border-t border-wood-100"
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 font-sans text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-wood-800 hover:text-wood-600 transition-colors duration-300"
          >
            Learn More About Us
            <span className="w-8 h-px bg-wood-400 transition-all duration-300 group-hover:w-12 group-hover:bg-wood-600" />
          </Link>
        </motion.div>
      </div>

      <BioModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
};

export default AboutSectionClient;
