import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { getRandomDuckMessage } from '@/config/duckConfig';

interface SecretDuckProps {
  onReveal?: () => void;
}

export function SecretDuck({ onReveal }: SecretDuckProps) {
  const { language } = useLanguage();
  const [isRevealed, setIsRevealed] = useState(false);
  const [message, setMessage] = useState<string>('');
  const timeoutRef = useRef<number>();
  const tapGuardRef = useRef(false);
  const prefersReducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Auto-dismiss after 3 seconds and cleanup on unmount
  useEffect(() => {
    if (message) {
      // Set tap guard to prevent immediate dismissal from the same tap
      tapGuardRef.current = true;
      setTimeout(() => {
        tapGuardRef.current = false;
      }, 100);

      // Auto-dismiss after 3 seconds
      timeoutRef.current = window.setTimeout(() => {
        setMessage('');
      }, 3000);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [message]);

  // Dismiss on Escape key
  useEffect(() => {
    if (!message) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMessage('');
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [message]);

  const handleDuckClick = () => {
    if (isRevealed) return;

    // Haptic feedback
    navigator.vibrate?.(15);

    // Set message
    setMessage(getRandomDuckMessage(language));

    // Mark as revealed
    setIsRevealed(true);
    onReveal?.();
  };

  const handleDismissMessage = () => {
    if (tapGuardRef.current) return;
    setMessage('');
  };

  return (
    <>
      {/* Duck in bottom corner */}
      <motion.button
        onClick={handleDuckClick}
        className="fixed bottom-20 left-4 z-[70] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-amber-200 bg-white/95 p-1 shadow-lg backdrop-blur-sm"
        animate={
          !prefersReducedMotion.current
            ? {
                y: [0, -4, 0],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileTap={!prefersReducedMotion.current ? { scale: 1.2, rotate: 10 } : undefined}
        aria-label="Secret duck"
      >
        {/* Rubber duck SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <path
            d="M19 10c0-3.866-3.134-7-7-7S5 6.134 5 10c0 1.5.5 2.5 1 3.5.5 1 1 2 1 3.5 0 1.5 1 2.5 2.5 2.5h5c1.5 0 2.5-1 2.5-2.5 0-1.5.5-2.5 1-3.5.5-1 1-2 1-3.5z"
            fill="#FFD93D"
            stroke="#F6C23E"
            strokeWidth="1.5"
          />
          <circle cx="9" cy="9" r="1" fill="#333" />
          <circle cx="15" cy="9" r="1" fill="#333" />
          <path
            d="M19.5 8.5c.5-.5 1.5-1 2-1 .5 0 1 .5 1 1s-.5 1-1 1c-.5 0-1.5-.5-2-1z"
            fill="#FFD93D"
            stroke="#F6C23E"
            strokeWidth="1.5"
          />
          <path d="M10 12c.5.5 1.5.5 2 0" stroke="#333" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </motion.button>

      {/* Message overlay */}
      {message &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion.current ? 0.01 : 0.3 }}
              className="fixed inset-x-0 top-24 z-[100] flex justify-center px-4"
              onClick={handleDismissMessage}
            >
              <div 
                className="rounded-xl bg-stone-900 px-6 py-4 text-center text-sm text-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {message}
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
