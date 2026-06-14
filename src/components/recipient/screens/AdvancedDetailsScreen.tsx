import { useState } from 'react';
import { Car, Check, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { InviteConfig } from '@/types';
import { Card, StepHeader, PrimaryButton } from '@/components/ui';
import { pageTransition, fadeInUp } from '@/lib/animations';

interface AdvancedDetailsScreenProps {
  config: InviteConfig;
  onComplete: (answers: { rideAnswer: string | null; spontaneityAnswer: string | null }) => void;
}

export function AdvancedDetailsScreen({ config, onComplete }: AdvancedDetailsScreenProps) {
  const { t, language } = useLanguage();
  const [rideAnswer, setRideAnswer] = useState<string | null>(null);
  const [spontaneityAnswer, setSpontaneityAnswer] = useState<string | null>(null);

  const askRide = !!config.advancedSettings?.askForRide;
  const askSpontaneity = !!config.advancedSettings?.askSpontaneityLevel;
  const rideOptions = language === 'he'
    ? ['כן, אשמח', 'לא, אסתדר', 'נדבר על זה בוואטסאפ']
    : ['Yes, that would be great', 'No, I’ll manage', 'Let’s talk on WhatsApp'];
  const spontaneityOptions = language === 'he'
    ? ['רגוע ובטוח', 'זורם/ת', 'תפתיעו אותי', 'כאוס מבוקר']
    : ['Calm and safe', 'I’m flexible', 'Surprise me', 'Controlled chaos'];

  const canContinue = (!askRide || !!rideAnswer) && (!askSpontaneity || !!spontaneityAnswer);
  const renderTile = (
    option: string,
    isSelected: boolean,
    onSelect: () => void
  ) => (
    <button
      key={option}
      type="button"
      onClick={onSelect}
      className={`flex min-h-[46px] w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm font-semibold leading-snug transition-all ${
        isSelected
          ? 'border-pink-400 bg-pink-50 text-pink-800 shadow-sm'
          : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50'
      }`}
    >
      <span className="min-w-0 flex-1 break-words">{option}</span>
      <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
        isSelected ? 'bg-pink-500 text-white' : 'border border-stone-300 bg-white'
      }`}>
        {isSelected && (
          <Check className="h-3 w-3" />
        )}
      </span>
    </button>
  );

  return (
    <motion.div
      key="advanced-details"
      className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-8"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={fadeInUp} transition={{ delay: 0.1 }}>
        <Card>
          <StepHeader
            title={t('recipient_advanced_title')}
            subtitle=""
          />

          <div className="mb-6 space-y-4">
            {askRide && (
              <section className="rounded-xl border border-white/80 bg-white/70 p-3 shadow-sm backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-100 text-pink-700">
                    <Car className="h-5 w-5" />
                  </div>
                  <h2 className="text-sm font-bold text-stone-900">
                    {t('recipient_advanced_ride_question')}
                  </h2>
                </div>
                <div className="space-y-2">
                  {rideOptions.map((option) => (
                    renderTile(option, rideAnswer === option, () => setRideAnswer(option))
                  ))}
                </div>
              </section>
            )}

            {askSpontaneity && (
              <section className="rounded-xl border border-white/80 bg-white/70 p-3 shadow-sm backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                    <Shuffle className="h-5 w-5" />
                  </div>
                  <h2 className="text-sm font-bold text-stone-900">
                    {t('recipient_advanced_spontaneity_question')}
                  </h2>
                </div>
                <div className="space-y-2">
                  {spontaneityOptions.map((option) => (
                    renderTile(option, spontaneityAnswer === option, () => setSpontaneityAnswer(option))
                  ))}
                </div>
              </section>
            )}
          </div>

          <PrimaryButton
            onClick={() => onComplete({ rideAnswer, spontaneityAnswer })}
            disabled={!canContinue}
            fullWidth
            size="lg"
          >
            {t('continue')}
          </PrimaryButton>
        </Card>
      </motion.div>
    </motion.div>
  );
}
