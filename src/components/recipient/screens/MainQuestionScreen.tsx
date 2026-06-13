import { useState, useRef, useEffect, type PointerEvent } from 'react';
import { ChevronDown, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { InviteConfig, RecipientGender } from '@/types';
import type { YesButtonCopy } from '@/types';
import { getYesButtonLabel, YES_BUTTON_OPTIONS } from '@/config/yesButtonConfig';
import { getInviteTypeConfig } from '@/config/inviteTypes';
import { heByGender } from '@/lib/hebrewGender';
import {
  Card,
  SecondaryButton,
  IconBadge,
  Confetti,
} from '@/components/ui';
import { YesConfirmation } from '@/components/recipient/YesConfirmation';
import { pageTransition, scaleIn, fadeInUp, springs } from '@/lib/animations';
import {
  getNextSafeButtonTransform,
  getFinalStableTransform,
  ESCAPE_LIMIT,
  ESCAPE_COOLDOWN_MS,
  SAFE_EDGE_PADDING,
  MIN_TOUCH_TARGET_HEIGHT,
  type SafeZone,
} from '@/lib/buttonEscape';

interface MainQuestionScreenProps {
  config: InviteConfig;
  onYes: () => void;
  onNo: () => void;
  onDecline: () => void;
  recipientGender?: RecipientGender | null;
}

export function MainQuestionScreen({ config, onYes, onNo, onDecline, recipientGender }: MainQuestionScreenProps) {
  const { t, language } = useLanguage();
  const inviteTypeConfig = getInviteTypeConfig(config.inviteType);
  const defaultYesCopy = config.yesButtonCopy && inviteTypeConfig.yesCopyOptions.includes(config.yesButtonCopy)
    ? config.yesButtonCopy
    : inviteTypeConfig.yesCopyOptions[0];
  const [escapeCount, setEscapeCount] = useState(0);
  const [buttonTransform, setButtonTransform] = useState({ x: 0, y: 0, scale: 1, rotate: 0, borderRadius: '0.75rem' });
  const [currentZone, setCurrentZone] = useState<SafeZone | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [showYesConfirmation, setShowYesConfirmation] = useState(false);
  const [selectedYesCopy, setSelectedYesCopy] = useState<YesButtonCopy>(
    defaultYesCopy
  );
  const [showYesOptions, setShowYesOptions] = useState(false);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const lastEscapeTime = useRef(0);
  const playAreaRef = useRef<HTMLDivElement>(null);
  const escapingButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Reset state when config changes (new invitation)
  useEffect(() => {
    setEscapeCount(0);
    setButtonTransform({ x: 0, y: 0, scale: 1, rotate: 0, borderRadius: '0.75rem' });
    setCurrentZone(null);
    setShowConfetti(false);
    setCelebrating(false);
    setSelectedYesCopy(defaultYesCopy);
    setShowYesOptions(false);
    setIsPointerInside(false);
    lastEscapeTime.current = 0;
  }, [config, defaultYesCopy]);

  const handleYesClick = () => {
    if (celebrating) return;
    
    // Haptic feedback for approval
    navigator.vibrate?.(25);
    
    setCelebrating(true);
    setShowConfetti(true);
    setShowYesConfirmation(true);
    
    // Confetti celebration is longer, confirmation animation is shorter
    // Confetti stays visible while confirmation plays
  };

  const handleYesOptionSelect = (copy: YesButtonCopy) => {
    setSelectedYesCopy(copy);
    setShowYesOptions(false);
  };

  const handleEscape = () => {
    const now = Date.now();
    
    // Haptic feedback for button escape
    navigator.vibrate?.(10);
    
    // Enforce cooldown
    if (now - lastEscapeTime.current < ESCAPE_COOLDOWN_MS) {
      return;
    }
    
    // Stop escaping after max attempts
    if (escapeCount >= ESCAPE_LIMIT - 1) {
      return;
    }

    // Get container dimensions
    const playArea = playAreaRef.current;
    if (!playArea) return;

    const containerRect = playArea.getBoundingClientRect();
    
    // For first escape, use estimated button dimensions
    // After that, measure actual button
    let buttonWidth = 160;
    let buttonHeight = 48;
    
    if (escapingButtonRef.current) {
      const buttonRect = escapingButtonRef.current.getBoundingClientRect();
      buttonWidth = buttonRect.width;
      buttonHeight = buttonRect.height;
    }

    // Calculate next safe position with transform
    const transform = getNextSafeButtonTransform(
      {
        containerWidth: containerRect.width,
        containerHeight: containerRect.height,
        buttonWidth: buttonWidth,
        buttonHeight: buttonHeight,
        edgePadding: SAFE_EDGE_PADDING,
        reduceMotion: prefersReducedMotion.current,
      },
      currentZone,
      escapeCount
    );

    lastEscapeTime.current = now;
    setEscapeCount((prev) => prev + 1);
    setButtonTransform(transform);
    setCurrentZone(transform.zone);
    setIsPointerInside(false);
  };

  // Desktop: trigger on pointer enter (only once per hover)
  const handlePointerEnter = (e: PointerEvent<HTMLButtonElement>) => {
    // Only escape on mouse/pen, not touch
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
      if (!isPointerInside && escapeCount < ESCAPE_LIMIT - 1) {
        setIsPointerInside(true);
        handleEscape();
      }
    }
  };

  // Reset pointer tracking when it leaves
  const handlePointerLeave = () => {
    setIsPointerInside(false);
  };

  // Mobile: trigger on pointer down (touch)
  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'touch' && escapeCount < ESCAPE_LIMIT - 1) {
      e.preventDefault();
      handleEscape();
    }
  };

  const handleNoClick = () => {
    // If still escaping, trigger an escape on click
    if (escapeCount < ESCAPE_LIMIT - 1) {
      handleEscape();
    } else {
      // After all escapes, actually call onNo
      onNo();
    }
  };

  const getNoButtonLabel = () => {
    const labels = inviteTypeConfig.noCopyOptions[language];
    return labels[Math.min(escapeCount, labels.length - 1)];
  };

  const notificationText = language === 'he'
    ? `${heByGender(recipientGender, {
        male: 'לא יקבל את התשובה אם לא תגיד לו',
        female: 'לא יקבל את התשובה אם לא תגידי לו',
        private: 'לא יקבל את התשובה אם לא תספרו לו',
      })} ${config.senderName}`
    : `${config.senderName} ${t('recipient_question_notification')}`;

  // Position the button for final stable state
  useEffect(() => {
    if (escapeCount === ESCAPE_LIMIT - 1 && playAreaRef.current && escapingButtonRef.current) {
      const playArea = playAreaRef.current;
      const button = escapingButtonRef.current;
      
      const containerRect = playArea.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const finalTransform = getFinalStableTransform({
        containerWidth: containerRect.width,
        containerHeight: containerRect.height,
        buttonWidth: buttonRect.width,
        buttonHeight: buttonRect.height,
        edgePadding: SAFE_EDGE_PADDING,
      });

      setButtonTransform(finalTransform);
    }
  }, [escapeCount]);

  return (
    <motion.div 
      key="main-question"
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-12"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {showConfetti && <Confetti />}
      
      <AnimatePresence>
        {showYesConfirmation && (
          <YesConfirmation
            theme={config.theme}
            onComplete={onYes}
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        className="mb-6 flex justify-center"
        variants={scaleIn}
      >
        <IconBadge variant="primary" size="lg">
          <Heart className="h-12 w-12" fill="currentColor" />
        </IconBadge>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        transition={{ delay: 0.1 }}
      >
        <Card className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-screen-title mb-3 text-stone-900">
              {inviteTypeConfig.mainQuestion[language]}
            </h1>
            <p className="text-body text-stone-600">
              {inviteTypeConfig.questionSubtitle[language]}
            </p>
          </div>

          {/* Yes Button - Always stable */}
          <div className="relative mb-3">
            <motion.div
              whileTap={!celebrating ? { scale: 0.95 } : undefined}
              transition={springs.gentle}
            >
              <div className="flex w-full overflow-hidden rounded-xl shadow-md">
                <button
                  type="button"
                  onClick={handleYesClick}
                  disabled={celebrating}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 px-5 py-3 text-button-label-lg font-semibold text-white transition-all duration-200 hover:from-pink-600 hover:to-pink-700 active:from-pink-700 active:to-pink-800 disabled:cursor-not-allowed disabled:from-stone-300 disabled:to-stone-300 disabled:text-stone-500"
                >
                  <Heart className="h-5 w-5 flex-shrink-0" fill="currentColor" />
                  {getYesButtonLabel(selectedYesCopy, language)}
                </button>
                <button
                  type="button"
                  onClick={() => setShowYesOptions((isOpen) => !isOpen)}
                  disabled={celebrating}
                  className="inline-flex min-h-[48px] w-12 items-center justify-center border-s border-white/30 bg-pink-600 text-white transition-all duration-200 hover:bg-pink-700 active:bg-pink-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
                  aria-label={language === 'en' ? 'Choose acceptance message' : 'בחירת ניסוח לאישור'}
                  aria-expanded={showYesOptions}
                >
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${showYesOptions ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </motion.div>

            {showYesOptions && (
              <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl">
                {YES_BUTTON_OPTIONS.filter((option) =>
                  inviteTypeConfig.yesCopyOptions.includes(option.id)
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleYesOptionSelect(option.id)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors ${
                      selectedYesCopy === option.id
                        ? 'bg-pink-50 text-pink-700'
                        : 'bg-white text-stone-800 hover:bg-stone-50'
                    }`}
                  >
                    <span>{option.label[language]}</span>
                    {selectedYesCopy === option.id && (
                      <Heart className="h-4 w-4 text-pink-500" fill="currentColor" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Play Area for Escaping No Button */}
          <div
            ref={playAreaRef}
            className="relative mb-6"
            style={{
              minHeight: '180px', // Reserve space for button movement on mobile
              height: 'auto',
            }}
          >
            {/* Static placeholder when button hasn't started escaping */}
            {escapeCount === 0 && (
              <SecondaryButton 
                onClick={handleNoClick}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                onPointerDown={handlePointerDown}
                fullWidth 
                size="lg"
                style={{ minHeight: `${MIN_TOUCH_TARGET_HEIGHT}px` }}
              >
                <X className="h-5 w-5 flex-shrink-0" />
                {getNoButtonLabel()}
              </SecondaryButton>
            )}

            {/* Escaping button with absolute positioning */}
            {escapeCount > 0 && (
              <motion.div
                className="absolute left-0 top-0"
                animate={{
                  x: buttonTransform.x,
                  y: buttonTransform.y,
                  scale: buttonTransform.scale,
                  rotate: buttonTransform.rotate,
                }}
                transition={
                  !prefersReducedMotion.current 
                    ? { ...springs.bouncy, duration: 0.4 }
                    : { duration: 0.15 }
                }
                style={{
                  willChange: 'transform',
                }}
              >
                <SecondaryButton 
                  ref={escapingButtonRef}
                  onClick={handleNoClick}
                  onPointerEnter={escapeCount < ESCAPE_LIMIT - 1 ? handlePointerEnter : undefined}
                  onPointerLeave={escapeCount < ESCAPE_LIMIT - 1 ? handlePointerLeave : undefined}
                  onPointerDown={escapeCount < ESCAPE_LIMIT - 1 ? handlePointerDown : undefined}
                  size="lg"
                  aria-label={getNoButtonLabel()}
                  style={{
                    borderRadius: buttonTransform.borderRadius,
                    minHeight: `${MIN_TOUCH_TARGET_HEIGHT}px`,
                    maxWidth: '90vw',
                    whiteSpace: 'nowrap',
                    cursor: escapeCount >= ESCAPE_LIMIT - 1 ? 'pointer' : 'default',
                  }}
                >
                  <X className="h-5 w-5 flex-shrink-0" />
                  {getNoButtonLabel()}
                </SecondaryButton>
              </motion.div>
            )}
          </div>

          {/* Persistence Easter Egg Message */}
          {escapeCount >= 4 && escapeCount < ESCAPE_LIMIT - 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 text-center"
            >
              <p className="text-xs italic text-stone-600">
                {t('easter_egg_no_persistence')}
              </p>
            </motion.div>
          )}

          {/* Serious Decline Link - Always below play area */}
          <div className="mt-2 text-center">
            <button
              onClick={onDecline}
              className="text-helper text-stone-500 underline-offset-2 hover:text-stone-700 hover:underline focus:underline"
              type="button"
              aria-label={t('recipient_question_decline_serious')}
            >
              {t('recipient_question_decline_serious')}
            </button>
          </div>

          {/* Notification text */}
          <div className="mt-4 text-center">
            <p className="text-helper text-stone-500">
              {notificationText}
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
