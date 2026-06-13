import { motion } from 'framer-motion';
import { Sparkles, Heart, Zap, Star, MessageCircle, Coffee } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getPromptLabel } from '@/lib/promptResolver';
import type { InviteConfig } from '@/types';
import type { useEasterEggState } from '@/hooks/useEasterEggState';
import { PrimaryButton } from '@/components/ui';
import { EasterEgg } from '@/components/recipient/EasterEgg';
import { SecretDuck } from '@/components/recipient/SecretDuck';
import { shouldShowDuck } from '@/config/duckConfig';
import { getRandomPlacementForScreen } from '@/config/easterEggPlacements';
import { pageTransition, fadeInUp, staggerChildren, prefersReducedMotion } from '@/lib/animations';

interface IntroCardsScreenProps {
  config: InviteConfig;
  onNext: () => void;
  easterEggState: ReturnType<typeof useEasterEggState>;
  duckState: ReturnType<typeof useEasterEggState>;
}

export function IntroCardsScreen({ config, onNext, easterEggState, duckState }: IntroCardsScreenProps) {
  const { t, config: langConfig } = useLanguage();
  const reduceMotion = prefersReducedMotion();
  const showDuck = shouldShowDuck(); // 20% probability
  
  // Filter out cards with empty answers
  const validCards = config.introCards.filter(card => card.answer && card.answer.trim());
  
  // Get theme-aware background class
  const getBackgroundClass = () => {
    switch (config.theme) {
      case 'cruise':
        return 'ocean-background-soft';
      case 'secret_mission':
        return 'mission-background-soft';
      case 'nature':
        return 'nature-background-soft';
      case 'party':
        return 'party-background-soft';
      case 'after_dark':
        return 'after-dark-background';
      default:
        return 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50';
    }
  };

  // Icon rotation for visual variety
  const getCardIcon = (index: number) => {
    const icons = [Sparkles, Heart, Zap, Star, MessageCircle, Coffee];
    return icons[index % icons.length];
  };

  // Slight rotation for visual variety
  const getCardRotation = (index: number) => {
    if (reduceMotion) return 0;
    const rotations = [-1, 1, -0.5];
    return rotations[index % rotations.length];
  };

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: reduceMotion ? 0 : i * 0.15,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <motion.div
      key="intro-cards"
      className={`relative flex min-h-screen flex-col ${getBackgroundClass()} px-4 py-8 md:py-12`}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      dir={langConfig.direction}
    >
      {/* Header */}
      <motion.div
        className="mx-auto mb-8 w-full max-w-2xl text-center"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <p className="text-chip mb-2 font-semibold uppercase tracking-widest text-stone-500">
          {t('recipient_cards_eyebrow')}
        </p>
        <h1 className="text-screen-title mb-3 text-stone-900">
          {t('recipient_cards_title')}
        </h1>
        <p className="text-body text-stone-600">
          {t('recipient_cards_subtitle')}
        </p>
      </motion.div>

      {/* Cards Container */}
      <motion.div
        className="mx-auto mb-8 w-full max-w-3xl"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {validCards.map((card, index) => {
            const Icon = getCardIcon(index);
            const rotation = getCardRotation(index);
            const promptLabel = getPromptLabel(card.promptKey, config.language);

            return (
              <motion.div
                key={card.id}
                custom={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                style={{ rotate: rotation }}
                className="group relative"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                  {/* Decorative accent */}
                  <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 opacity-5">
                    <Icon className="h-full w-full" />
                  </div>

                  {/* Icon badge */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        config.theme === 'after_dark'
                          ? 'bg-purple-100'
                          : config.theme === 'party'
                          ? 'bg-pink-100'
                          : config.theme === 'nature'
                          ? 'bg-green-100'
                          : config.theme === 'secret_mission'
                          ? 'bg-slate-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 flex-shrink-0 ${
                          config.theme === 'after_dark'
                            ? 'text-purple-600'
                            : config.theme === 'party'
                            ? 'text-pink-600'
                            : config.theme === 'nature'
                            ? 'text-green-600'
                            : config.theme === 'secret_mission'
                            ? 'text-slate-700'
                            : 'text-blue-600'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Prompt label */}
                  <p className="text-chip mb-3 font-semibold uppercase tracking-wide text-stone-500">
                    {promptLabel}
                  </p>

                  {/* Answer */}
                  <p className="text-card-answer leading-relaxed text-stone-900">
                    {card.answer}
                  </p>

                  {/* Optional quotation marks decoration */}
                  <div className="absolute bottom-4 right-4 text-4xl font-serif leading-none text-stone-200">
                    "
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Easter egg - always render to keep Portal alive */}
      <EasterEgg
        theme={config.theme}
        placement={getRandomPlacementForScreen('personality')}
        onReveal={easterEggState.markAsRevealed}
        hasBeenRevealed={easterEggState.hasBeenRevealed}
      />
      {/* Secret duck - 20% chance */}
      {showDuck && !duckState.hasBeenRevealed && (
        <SecretDuck onReveal={duckState.markAsRevealed} />
      )}
      {/* Continue Button */}
      <motion.div
        className="mx-auto w-full max-w-md"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: reduceMotion ? 0 : validCards.length * 0.15 + 0.2 }}
      >
        <PrimaryButton onClick={onNext} fullWidth size="lg">
          {t('recipient_cards_continue')}
        </PrimaryButton>
      </motion.div>
    </motion.div>
  );
}
