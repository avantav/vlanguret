'use client';

import { useRef } from 'react';
import { useInView, UseInViewOptions } from 'framer-motion';

interface UseScrollAnimationOptions {
  once?: boolean;
  amount?: number | 'all' | 'some';
}

/**
 * Hook for triggering animations when an element enters the viewport.
 * Uses Framer Motion's useInView under the hood.
 *
 * @param options - Configuration options
 * @param options.once - Whether to trigger only once (default: true)
 * @param options.amount - How much of the element should be visible (default: 0.3)
 * @returns { ref, isInView } - Ref to attach to element and visibility state
 *
 * @example
 * ```tsx
 * const { ref, isInView } = useScrollAnimation();
 *
 * return (
 *   <motion.div
 *     ref={ref}
 *     initial={{ opacity: 0, y: 20 }}
 *     animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
 *     transition={{ duration: 0.6 }}
 *   >
 *     Content
 *   </motion.div>
 * );
 * ```
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { once = true, amount = 0.3 } = options;
  const ref = useRef<HTMLDivElement>(null);

  const inViewOptions: UseInViewOptions = {
    once,
    amount,
  };

  const isInView = useInView(ref, inViewOptions);

  return { ref, isInView };
};

/**
 * Predefined animation variants for common scroll animations.
 * Use with Framer Motion's `variants` prop.
 */
// Cubic bezier for easeOut equivalent
const easeOut = [0.25, 0.1, 0.25, 1] as const;

export const scrollAnimationVariants = {
  // Fade up animation
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  },

  // Fade in animation
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  },

  // Scale up animation
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  },

  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  },

  // Slide in from right
  slideInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  },

  // Stagger container
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  // Stagger container with longer delay
  staggerContainerSlow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  },

  // Child item for stagger animations
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  },
};

export default useScrollAnimation;
