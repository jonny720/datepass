import type { Variants, Transition } from 'framer-motion';

// Detect reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Standard easing curves
export const easings = {
  smooth: [0.25, 0.1, 0.25, 1],
  spring: [0.34, 1.56, 0.64, 1],
  gentle: [0.4, 0, 0.2, 1],
} as const;

// Standard durations
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;

// Spring configurations
export const springs = {
  gentle: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
  },
  soft: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
  },
} as const;

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.gentle,
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: durations.fast,
      ease: easings.gentle,
    },
  },
};

export const pageTransitionHorizontal: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easings.gentle,
    },
  },
  exit: { 
    opacity: 0, 
    x: -40,
    transition: {
      duration: durations.fast,
      ease: easings.gentle,
    },
  },
};

// Fade in variants
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: durations.normal,
    },
  },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.gentle,
    },
  },
};

// Scale variants
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: springs.gentle,
  },
};

// Stagger children
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger children with initial state
export const staggerChildren: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Float animation
export const float: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Pulse animation
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Gentle pulse (for buttons)
export const gentlePulse: Variants = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Card swipe variants
export const cardSwipe: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    rotateY: direction > 0 ? 20 : -20,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    transition: springs.gentle,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    rotateY: direction < 0 ? 20 : -20,
    transition: springs.gentle,
  }),
};

// Create responsive transition
export const createTransition = (
  base: Transition,
  reduceMotion = false
): Transition => {
  if (reduceMotion) {
    return {
      duration: 0.01,
    };
  }
  return base;
};

// Get animation props based on reduced motion
export const getAnimationProps = (reduceMotion: boolean) => {
  if (reduceMotion) {
    return {
      initial: false,
      animate: false,
      exit: false,
    };
  }
  return {};
};
