import { useState } from 'react';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, IconBadge, OptionCard, PrimaryButton } from '@/components/ui';
import { pageTransition, fadeInUp, staggerContainer } from '@/lib/animations';

interface BoundariesScreenProps {
  onComplete: (answer: string) => void;
}

const BOUNDARY_OPTIONS = {
  en: [
    'I want to talk boundaries first',
    'I want a safe word',
    'Keep it playful only',
    "Let's discuss on WhatsApp",
  ],
  he: [
    'רוצה לדבר קודם על גבולות',
    'רוצה מילת ביטחון',
    'שיישאר שובב בלבד',
    'נדבר על זה בוואטסאפ',
  ],
};

export function BoundariesScreen({ onComplete }: BoundariesScreenProps) {
  const { language } = useLanguage();
  const options = BOUNDARY_OPTIONS[language];
  const [selectedAnswer, setSelectedAnswer] = useState(options[0]);

  return (
    <motion.div
      key="boundaries"
      className="relative flex min-h-screen flex-col items-center justify-center power-play-background-soft px-4 py-12"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="mb-6 flex justify-center" variants={fadeInUp}>
        <IconBadge variant="primary" size="lg">
          <Lock className="h-12 w-12" />
        </IconBadge>
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-md" variants={fadeInUp}>
        <Card className="border border-red-500/20 bg-zinc-950 text-white">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-3xl font-bold">
              {language === 'he' ? 'לפני הכול' : 'Before anything else'}
            </h1>
            <p className="text-sm text-red-100">
              {language === 'he' ? 'בחרו את התשובה שמרגישה נכון.' : 'Choose the answer that feels right.'}
            </p>
          </div>

          <motion.div
            className="mb-6 space-y-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {options.map((option, index) => (
              <motion.div key={option} variants={fadeInUp} transition={{ delay: index * 0.05 }}>
                <OptionCard
                  selected={selectedAnswer === option}
                  onClick={() => setSelectedAnswer(option)}
                  title={option}
                  className="border-red-500/20 bg-white text-stone-900"
                />
              </motion.div>
            ))}
          </motion.div>

          <PrimaryButton onClick={() => onComplete(selectedAnswer)} fullWidth size="lg">
            {language === 'he' ? 'המשך' : 'Continue'}
          </PrimaryButton>
        </Card>
      </motion.div>
    </motion.div>
  );
}
