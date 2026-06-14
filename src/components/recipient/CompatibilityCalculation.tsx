import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { HumorLevel, InviteType, ThemeId } from '@/types';
import { CALCULATION_STEPS_BY_HUMOR, resolveHumorLevel } from '@/config/humorCopy';
import { getThemeVisualIdentity } from '@/config/themes';

interface CompatibilityCalculationProps {
  inviteType?: InviteType;
  humorLevel?: HumorLevel;
  theme?: ThemeId;
  onComplete: () => void;
}

export function CompatibilityCalculation({ inviteType = 'date', humorLevel, theme, onComplete }: CompatibilityCalculationProps) {
  const { language } = useLanguage();
  const resolvedHumorLevel = resolveHumorLevel(humorLevel);
  const themeIdentity = theme ? getThemeVisualIdentity(theme) : undefined;
  const steps =
    themeIdentity?.vibeCalculationLines.map((line) => line[language]) ||
    CALCULATION_STEPS_BY_HUMOR[resolvedHumorLevel][language][inviteType];
  const label = themeIdentity?.vibeLabel[language];
  const [currentStep, setCurrentStep] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const prefersReducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const stepDuration = prefersReducedMotion.current ? 50 : 350; // Much faster if reduced motion

  useEffect(() => {
    if (isSkipped) return;

    if (prefersReducedMotion.current) {
      // Skip animation for reduced motion
      const timeout = setTimeout(() => {
        onComplete();
      }, 200);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [stepDuration, onComplete, isSkipped, steps.length]);

  const handleSkip = () => {
    setIsSkipped(true);
    onComplete();
  };

  return (
    <motion.div
      onClick={handleSkip}
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-white/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mx-4 max-w-md space-y-4 text-center">
        {label && (
          <p className={`text-xs font-bold uppercase tracking-[0.22em] ${themeIdentity?.accentClass || 'text-pink-600'}`}>
            {label}
          </p>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-lg font-medium text-stone-700"
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index <= currentStep ? 'bg-pink-500' : 'bg-stone-300'
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-stone-500">
          {language === 'en' ? 'Tap to skip' : 'לחצו לדילוג'}
        </p>
      </div>
    </motion.div>
  );
}
