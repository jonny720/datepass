import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft, IntroCard } from '@/types';
import { getIntroPrompts } from '@/data/content';
import {
  Card,
  StepHeader,
  PrimaryButton,
  SecondaryButton,
  TextButton,
  TextInput,
  InlineNotice,
} from '@/components/ui';

interface IntroCardsStepProps {
  draft: CreatorDraft;
  updateDraft: (updates: Partial<CreatorDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MAX_CHAR_LIMIT = 120;
const REQUIRED_CARDS = 3;

export function IntroCardsStep({ draft, updateDraft, onNext, onBack }: IntroCardsStepProps) {
  const { t, language } = useLanguage();
  const prompts = getIntroPrompts(language, draft.introTone);
  const [selectedPromptIds, setSelectedPromptIds] = useState<string[]>(
    draft.introCards.map((card) => card.id)
  );

  // Initialize cards with default answers if needed
  const initializeCards = () => {
    const cards: IntroCard[] = selectedPromptIds.map((id) => {
      const existing = draft.introCards.find((card) => card.id === id);
      if (existing) return existing;

      const prompt = prompts.find((p) => p.id === id);
      return {
        id,
        promptKey: id,
        answer: prompt?.answers[0] || '',
      };
    });
    return cards;
  };

  const handlePromptToggle = (promptId: string) => {
    setSelectedPromptIds((prev) => {
      const isSelected = prev.includes(promptId);
      if (isSelected) {
        return prev.filter((id) => id !== promptId);
      } else if (prev.length < REQUIRED_CARDS) {
        return [...prev, promptId];
      }
      return prev;
    });
  };

  const handleAnswerChange = (promptId: string, answer: string) => {
    const cards = initializeCards();
    const updatedCards = cards.map((card) =>
      card.id === promptId ? { ...card, answer } : card
    );
    updateDraft({ introCards: updatedCards });
  };

  const handleRegenerate = (promptId: string) => {
    const prompt = prompts.find((p) => p.id === promptId);
    if (!prompt) return;

    const cards = initializeCards();
    const currentCard = cards.find((card) => card.id === promptId);
    const currentAnswer = currentCard?.answer || '';

    // Pick a different default answer
    const otherAnswers = prompt.answers.filter((ans) => ans !== currentAnswer);
    const newAnswer = otherAnswers[Math.floor(Math.random() * otherAnswers.length)];

    const updatedCards = cards.map((card) =>
      card.id === promptId ? { ...card, answer: newAnswer } : card
    );
    updateDraft({ introCards: updatedCards });
  };

  const handleContinue = () => {
    const cards = initializeCards();
    updateDraft({ introCards: cards });
    onNext();
  };

  const isValid = selectedPromptIds.length === REQUIRED_CARDS;
  const cards = initializeCards();

  return (
    <Card>
      <StepHeader
        title={t('creator_cards_title')}
        subtitle={t('creator_cards_subtitle')}
      />

      <InlineNotice variant="info" className="mb-4">
        {t('creator_cards_instruction')}
      </InlineNotice>

      <div className="mb-6 space-y-4">
        {prompts.map((prompt) => {
          const isSelected = selectedPromptIds.includes(prompt.id);
          const card = cards.find((c) => c.id === prompt.id);

          return (
            <div
              key={prompt.id}
              className={`rounded-xl border-2 p-4 transition-all ${
                isSelected
                  ? 'border-pink-400 bg-pink-50/50'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <button
                type="button"
                onClick={() => handlePromptToggle(prompt.id)}
                className="mb-2 flex w-full items-center justify-between text-left"
              >
                <span className="font-medium text-stone-800">{prompt.prompt}</span>
                <div
                  className={`h-5 w-5 rounded-full border-2 transition-all ${
                    isSelected
                      ? 'border-pink-500 bg-pink-500'
                      : 'border-stone-300 bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="flex h-full items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </div>
              </button>

              {isSelected && (
                <div className="mt-3">
                  <TextInput
                    value={card?.answer || ''}
                    onChange={(value) => handleAnswerChange(prompt.id, value)}
                    placeholder={prompt.answers[0]}
                    maxLength={MAX_CHAR_LIMIT}
                  />
                  <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
                    <TextButton
                      onClick={() => handleRegenerate(prompt.id)}
                      className="flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3" />
                      {t('creator_cards_regenerate')}
                    </TextButton>
                    <span>
                      {card?.answer.length || 0}/{MAX_CHAR_LIMIT} {t('creator_cards_char_limit')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <SecondaryButton onClick={onBack} size="lg">
          {t('back')}
        </SecondaryButton>
        <PrimaryButton onClick={handleContinue} disabled={!isValid} fullWidth size="lg">
          {t('next')}
        </PrimaryButton>
      </div>
    </Card>
  );
}
