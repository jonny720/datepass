import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import type { ThemeId } from '@/types';
import { THEME_STAMPS, getRandomStampMessage } from '@/config/stampConfig';
import { useLanguage } from '@/hooks/useLanguage';

interface HiddenStampProps {
  theme: ThemeId;
  onReveal?: () => void;
  hasBeenRevealed?: boolean;
}

export function HiddenStamp({ theme, onReveal, hasBeenRevealed = false }: HiddenStampProps) {
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

  // Return null after hooks
  if (hasBeenRevealed) {
    return null;
  }

  const stampConfig = THEME_STAMPS[theme];

  const handleStampClick = () => {
    if (isRevealed) return;

    // Haptic feedback
    navigator.vibrate?.(20);

    // Set message
    setMessage(getRandomStampMessage(language));

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
      {/* Stamp partially peeking from edge */}
      <motion.button
        onClick={handleStampClick}
        className={`absolute -right-4 top-1/2 z-0 flex h-20 w-20 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-4 ${stampConfig.borderColor} bg-white/90 backdrop-blur-sm transition-all ${
          isRevealed ? 'opacity-40' : 'opacity-60 hover:opacity-90'
        }`}
        style={{
          transform: `translateY(-50%) rotate(${stampConfig.rotation}deg)`,
        }}
        whileTap={
          !prefersReducedMotion.current && !isRevealed
            ? { scale: 0.9, rotate: 0 }
            : undefined
        }
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        aria-label="Hidden stamp"
      >
        <div
          className={`whitespace-pre-line text-center text-[10px] font-bold uppercase leading-tight ${stampConfig.color}`}
        >
          {stampConfig.label[language]}
        </div>
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
