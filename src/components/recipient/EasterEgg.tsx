import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { ThemeId } from '@/types';
import type { EasterEggPlacement } from '@/config/easterEggPlacements';
import {
  getRandomMessageForTheme,
  getRandomRareBonus,
  shouldShowRareBonus,
} from '@/config/easterEggMessages';
import { useLanguage } from '@/hooks/useLanguage';
import { Sparkles } from 'lucide-react';

interface EasterEggProps {
  theme: ThemeId;
  placement?: EasterEggPlacement;
  onReveal?: () => void;
  hasBeenRevealed?: boolean;
}

const PLACEMENT_STYLES: Record<EasterEggPlacement, string> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
};

const THEME_COLORS: Record<ThemeId, { shell: string; accent: string; glow: string }> = {
  cruise: {
    shell: 'from-blue-200 to-cyan-300',
    accent: 'text-blue-600',
    glow: 'shadow-blue-300/50',
  },
  secret_mission: {
    shell: 'from-stone-700 to-stone-900',
    accent: 'text-red-600',
    glow: 'shadow-red-500/30',
  },
  nature: {
    shell: 'from-green-200 to-emerald-300',
    accent: 'text-green-700',
    glow: 'shadow-green-300/50',
  },
  party: {
    shell: 'from-pink-300 to-purple-400',
    accent: 'text-purple-600',
    glow: 'shadow-purple-300/50',
  },
  after_dark: {
    shell: 'from-indigo-900 to-purple-900',
    accent: 'text-purple-400',
    glow: 'shadow-purple-500/50',
  },
};

export function EasterEgg({ theme, placement = 'bottom-right', onReveal, hasBeenRevealed = false }: EasterEggProps) {
  const { config, language } = useLanguage();
  const [isRevealed, setIsRevealed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showRareBonus, setShowRareBonus] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const timeoutRef = useRef<number>();
  const tapGuardRef = useRef(false);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const message = getRandomMessageForTheme(theme);
  const rareBonus = getRandomRareBonus();
  const RevealIcon = message.icon;
  const RareBonusIcon = rareBonus.icon;

  console.log('🥚 EasterEgg render:', { 
    isRevealed,
    showMessage,
    showRareBonus,
    hasBeenRevealed,
    theme,
    message: message.en,
  });

  const themeColors = THEME_COLORS[theme];
  const placementClass = PLACEMENT_STYLES[placement];

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (showMessage) {
      // Set tap guard to prevent immediate dismissal from the same tap
      tapGuardRef.current = true;
      setTimeout(() => {
        tapGuardRef.current = false;
      }, 100);

      // Auto-dismiss after 3 seconds
      timeoutRef.current = window.setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [showMessage]);

  // Dismiss on Escape key
  useEffect(() => {
    if (!showMessage) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowMessage(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showMessage]);

  const handleTap = () => {
    if (isRevealed || isTapping) return;

    setIsTapping(true);
    
    // Crack animation then reveal and show message
    setTimeout(() => {
      setIsRevealed(true);
      setShowMessage(true);
      onReveal?.();
      
      // Check for rare bonus
      if (shouldShowRareBonus()) {
        setTimeout(() => {
          setShowRareBonus(true);
        }, 600);
      }
    }, 400);
  };

  const handleDismissMessage = () => {
    if (tapGuardRef.current) return;
    setShowMessage(false);
  };

  return (
    <>
      {/* Egg button - in original position */}
      <div className={`fixed z-50 ${placementClass}`}>
        <AnimatePresence mode="wait">
          {!isRevealed && !hasBeenRevealed && (
            <motion.button
              key="egg"
              onClick={handleTap}
              className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${themeColors.shell} shadow-xl ${themeColors.glow} transition-shadow hover:shadow-2xl`}
              aria-label={language === 'en' ? 'Hidden surprise' : 'הפתעה נסתרת'}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                ...(!prefersReducedMotion && {
                  rotate: [0, -5, 5, -4, 4, -3, 3, 0],
                }),
              }}
              transition={{
                opacity: { duration: 0.4 },
                scale: { type: 'spring', stiffness: 200, damping: 12 },
                y: { type: 'spring', stiffness: 200, damping: 12 },
                rotate: {
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: 'easeInOut',
                },
              }}
              whileHover={!prefersReducedMotion ? { scale: 1.15, rotate: 10 } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.9 } : {}}
            >
              {/* Sparkle accent */}
              <motion.div
                className="absolute -right-1 -top-1"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        opacity: [0.4, 1, 0.4],
                        scale: [0.7, 1.2, 0.7],
                        rotate: [0, 180, 360],
                      }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className={`h-4 w-4 ${themeColors.accent}`} />
              </motion.div>

              {/* Pulsing glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0, 0.3],
                      }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Egg shell pattern */}
              <div className="absolute inset-2 rounded-full border-2 border-white/40" />
              <div className="absolute inset-3 rounded-full border-2 border-white/30" />
            </motion.button>
          )}

          {isRevealed && (
            <motion.div
              key="reveal"
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Revealed icon */}
              <motion.div
                className={`flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl ${themeColors.glow}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <RevealIcon className={`h-8 w-8 ${themeColors.accent}`} />
              </motion.div>

              {/* Sparkle particles */}
              {!prefersReducedMotion && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: 0,
                        scale: 1,
                        x: Math.cos((i * Math.PI) / 3) * 40,
                        y: Math.sin((i * Math.PI) / 3) * 40,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                      }}
                    >
                      <Sparkles className={`h-3 w-3 ${themeColors.accent}`} />
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rare bonus - stays with egg */}
        <AnimatePresence>
          {showRareBonus && (
            <motion.div
              className="absolute left-1/2 top-0 -translate-x-1/2"
              initial={{ opacity: 0, y: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: -60, scale: [0, 1.2, 1, 0.8] }}
              transition={{ duration: 2, ease: 'easeOut' }}
              onAnimationComplete={() => setShowRareBonus(false)}
            >
              <div className="flex flex-col items-center gap-2">
                <RareBonusIcon className={`h-6 w-6 ${themeColors.accent}`} />
                <div className="rounded-lg bg-white px-3 py-1 shadow-lg">
                  <p className="text-xs font-semibold text-stone-700" dir={config.direction}>
                    {language === 'en' ? rareBonus.en : rareBonus.he}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message card - SEPARATE PORTAL-LIKE FIXED ELEMENT */}
      {showMessage && createPortal(
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
            onClick={handleDismissMessage}
          >
          <motion.div
            className="w-full max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.01 : 0.3,
              ease: 'easeOut'
            }}
            onClick={(e) => e.stopPropagation()}
          >
              <div className={`relative overflow-hidden rounded-2xl ${getPopupBackgroundClass(theme)} p-6 shadow-2xl`}>
                {/* Sparkle decorations */}
                <motion.div
                  className="absolute right-4 top-4"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className={`h-6 w-6 ${themeColors.accent}`} />
                </motion.div>
                <motion.div
                  className="absolute bottom-4 left-4"
                  animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Sparkles className={`h-6 w-6 ${themeColors.accent}`} />
                </motion.div>

                {/* Revealed icon */}
                <div className="mb-4 flex justify-center">
                  <motion.div
                    className="rounded-full bg-white/90 p-4 shadow-lg"
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <RevealIcon className={`h-10 w-10 ${themeColors.accent}`} />
                  </motion.div>
                </div>

                {/* Message */}
                <motion.p
                  className={`text-center text-lg font-bold ${getPopupTextClass(theme)}`}
                  dir={config.direction}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
                >
                  {language === 'en' ? message.en : message.he}
                </motion.p>

                {/* Subtitle */}
                <motion.p
                  className={`mt-2 text-center text-sm ${getPopupSubtextClass(theme)}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
                >
                  {language === 'en' ? '🎉 You found the secret!' : '🎉 מצאת את הסוד!'}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

// Helper functions for theme-aware popup styling
function getPopupBackgroundClass(theme: ThemeId): string {
  // Use light popup for most themes, dark popup for dark themes
  if (theme === 'secret_mission' || theme === 'after_dark') {
    return 'bg-stone-900 ring-4 ring-white/20';
  }
  return 'bg-white ring-4 ring-black/10';
}

function getPopupTextClass(theme: ThemeId): string {
  if (theme === 'secret_mission' || theme === 'after_dark') {
    return 'text-white';
  }
  return 'text-stone-900';
}

function getPopupSubtextClass(theme: ThemeId): string {
  if (theme === 'secret_mission' || theme === 'after_dark') {
    return 'text-stone-300';
  }
  return 'text-stone-600';
}
