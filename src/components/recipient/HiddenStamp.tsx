import { useState, useRef } from 'react';
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
  const prefersReducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

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

    // Auto-hide message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <>
      {/* Stamp partially peeking from edge */}
      <motion.button
        onClick={handleStampClick}
        className={`absolute -right-4 top-1/2 z-10 flex h-20 w-20 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-4 ${stampConfig.borderColor} bg-white/90 backdrop-blur-sm transition-all ${
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
            >
              <div className="rounded-xl bg-stone-900 px-6 py-4 text-center text-sm text-white shadow-2xl">
                {message}
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
