import { useState } from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { InviteConfig, DateSlot } from '@/types';
import type { useEasterEggState } from '@/hooks/useEasterEggState';
import {
  Card,
  StepHeader,
  PrimaryButton,
  OptionCard,
} from '@/components/ui';
import { EasterEgg } from '@/components/recipient/EasterEgg';
import { getRandomPlacementForScreen } from '@/config/easterEggPlacements';
import { pageTransition, fadeInUp, staggerContainer } from '@/lib/animations';

interface SlotChoiceScreenProps {
  config: InviteConfig;
  onSelectSlot: (slot: DateSlot) => void;
  onCoordinateWhatsapp: () => void;
  easterEggState: ReturnType<typeof useEasterEggState>;
}

export function SlotChoiceScreen({
  config,
  onSelectSlot,
  onCoordinateWhatsapp,
  easterEggState,
}: SlotChoiceScreenProps) {
  const { t } = useLanguage();
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const handleSelect = () => {
    if (selectedSlotId) {
      const slot = config.dateSlots.find((s) => s.id === selectedSlotId);
      if (slot) {
        onSelectSlot(slot);
      }
    }
  };

  return (
    <motion.div 
      key="slot-choice"
      className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-8"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        variants={fadeInUp}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <StepHeader
            title={t('recipient_slot_title')}
            subtitle={t('recipient_slot_subtitle')}
          />

          <motion.div 
            className="mb-6 space-y-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {config.dateSlots.map((slot, index) => (
              <motion.div
                key={slot.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <OptionCard
                  selected={selectedSlotId === slot.id}
                  onClick={() => setSelectedSlotId(slot.id)}
                  icon={<Calendar className="h-6 w-6" />}
                  title={slot.date}
                  description={slot.time}
                />
              </motion.div>
            ))}

            {/* Always include WhatsApp coordination option */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: config.dateSlots.length * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <OptionCard
                selected={selectedSlotId === 'whatsapp-coordinate'}
                onClick={() => setSelectedSlotId('whatsapp-coordinate')}
                icon={<MessageCircle className="h-6 w-6" />}
                title={t('recipient_slot_coordinate_whatsapp')}
                description={t('recipient_confirmation_coordinate')}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <PrimaryButton
              onClick={() => {
                if (selectedSlotId === 'whatsapp-coordinate') {
                  onCoordinateWhatsapp();
                } else {
                  handleSelect();
                }
              }}
              disabled={!selectedSlotId}
              fullWidth
              size="lg"
            >
              {t('continue')}
            </PrimaryButton>
          </motion.div>
        </Card>
      </motion.div>

      {/* Easter egg */}
      {easterEggState.shouldShowOnScreen('slots') && (
        <EasterEgg
          theme={config.theme}
          placement={getRandomPlacementForScreen('slots')}
          onReveal={easterEggState.markAsRevealed}
        />
      )}
    </motion.div>
  );
}
