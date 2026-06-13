import { useState, useEffect } from 'react';
import { RefreshCw, X, Plus, Sparkles, Search } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft, IntroCard } from '@/types';
import { getIntroPrompts, getDefaultPrompts, type TonedIntroPrompt } from '@/data/content';
import {
  Card,
  StepHeader,
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '@/components/ui';

interface IntroCardsStepProps {
  draft: CreatorDraft;
  updateDraft: (updates: Partial<CreatorDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MAX_CHAR_LIMIT = 120;

export function IntroCardsStep({ draft, updateDraft, onNext, onBack }: IntroCardsStepProps) {
  const { t, language } = useLanguage();
  const allPrompts = getIntroPrompts(language, draft.introTone, draft.inviteType);
  
  const [showPrompts, setShowPrompts] = useState(draft.introCards.length > 0);
  const [replacingCardId, setReplacingCardId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize with default prompts if empty
  useEffect(() => {
    if (draft.introCards.length === 0 && showPrompts) {
      const defaultPrompts = getDefaultPrompts(language, draft.introTone, draft.inviteType);
      const cards: IntroCard[] = defaultPrompts.map((prompt) => ({
        id: prompt.id,
        promptKey: prompt.id,
        answer: prompt.answers[0] || '',
      }));
      updateDraft({ introCards: cards });
    }
  }, [showPrompts, draft.introCards.length, language, draft.introTone, draft.inviteType, updateDraft]);

  const handleAnswerChange = (promptId: string, answer: string) => {
    const updatedCards = draft.introCards.map((card) =>
      card.id === promptId ? { ...card, answer } : card
    );
    updateDraft({ introCards: updatedCards });
  };

  const handleTryAnother = (promptId: string) => {
    const prompt = allPrompts.find((p) => p.id === promptId);
    if (!prompt) return;

    const currentCard = draft.introCards.find((card) => card.id === promptId);
    const currentAnswer = currentCard?.answer || '';

    // Pick a different answer
    const otherAnswers = prompt.answers.filter((ans) => ans !== currentAnswer);
    const newAnswer = otherAnswers[Math.floor(Math.random() * otherAnswers.length)] || prompt.answers[0];

    handleAnswerChange(promptId, newAnswer);
  };

  const handleReplacePrompt = (oldPromptId: string, newPrompt: TonedIntroPrompt) => {
    const updatedCards = draft.introCards.map((card) =>
      card.id === oldPromptId
        ? {
            id: newPrompt.id,
            promptKey: newPrompt.id,
            answer: newPrompt.answers[0] || '',
          }
        : card
    );
    updateDraft({ introCards: updatedCards });
    setReplacingCardId(null);
    setSearchQuery('');
  };

  const handleSkipPrompts = () => {
    updateDraft({ introCards: [] });
    setShowPrompts(false);
  };

  const handleAddPrompts = () => {
    setShowPrompts(true);
    // Will trigger useEffect to initialize defaults
  };

  const handleContinue = () => {
    onNext();
  };

  const getPromptDetails = (promptId: string): TonedIntroPrompt | undefined => {
    return allPrompts.find((p) => p.id === promptId);
  };

  const selectedPromptIds = draft.introCards.map((card) => card.id);
  const availablePrompts = allPrompts.filter((p) => {
    if (replacingCardId && p.id === replacingCardId) return true;
    return !selectedPromptIds.includes(p.id);
  });

  const filteredPrompts = searchQuery
    ? availablePrompts.filter((p) =>
        p.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : availablePrompts;

  return (
    <Card>
      <div className="mb-6 flex items-center justify-center">
        <div className="rounded-full bg-pink-100 p-3">
          <Sparkles className="h-6 w-6 text-pink-600" />
        </div>
      </div>

      <StepHeader
        title={t('creator_cards_title')}
        subtitle={t('creator_cards_subtitle')}
      />

      {!showPrompts ? (
        <div className="mb-6 space-y-4">
          <div className="rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 p-8 text-center">
            <p className="mb-4 text-sm text-stone-600">
              {t('creator_cards_skipped_message')}
            </p>
            <button
              type="button"
              onClick={handleAddPrompts}
              className="inline-flex items-center gap-2 rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-600"
            >
              <Plus className="h-4 w-4" />
              {t('creator_cards_add')}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 space-y-4">
          {draft.introCards.map((card, index) => {
            const prompt = getPromptDetails(card.id);
            if (!prompt) return null;

            const rotation = index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1' : '-rotate-0.5';

            return (
              <div
                key={card.id}
                className={`transform transition-transform hover:scale-[1.01] ${rotation}`}
              >
                <div className="rounded-xl border-2 border-stone-200 bg-gradient-to-br from-white to-stone-50 p-4 shadow-sm">
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="text-sm font-semibold text-stone-700">{prompt.prompt}</h4>
                  </div>
                  
                  <textarea
                    value={card.answer}
                    onChange={(e) => handleAnswerChange(card.id, e.target.value)}
                    maxLength={MAX_CHAR_LIMIT}
                    rows={3}
                    className="mb-2 w-full resize-none rounded-lg border-2 border-stone-200 bg-white p-3 text-sm text-stone-900 placeholder-stone-400 transition-all focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder={prompt.answers[0]}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleTryAnother(card.id)}
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-100"
                      >
                        <RefreshCw className="h-3 w-3" />
                        {t('creator_cards_try_another')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setReplacingCardId(card.id)}
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-100"
                      >
                        {t('creator_cards_replace')}
                      </button>
                    </div>
                    <span className="text-xs text-stone-500">
                      {card.answer.length}/{MAX_CHAR_LIMIT}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="pt-2 text-center">
            <TextButton onClick={handleSkipPrompts} className="text-sm text-stone-500">
              {t('creator_cards_skip')}
            </TextButton>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <SecondaryButton onClick={onBack} size="lg">
          {t('back')}
        </SecondaryButton>
        <PrimaryButton onClick={handleContinue} fullWidth size="lg">
          {t('next')}
        </PrimaryButton>
      </div>

      {/* Replace Prompt Modal */}
      {replacingCardId && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
          onClick={() => {
            setReplacingCardId(null);
            setSearchQuery('');
          }}
        >
          <div
            className="w-full max-w-lg rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900">
                {t('creator_cards_replace_prompt')}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setReplacingCardId(null);
                  setSearchQuery('');
                }}
                className="rounded-lg p-1 transition-colors hover:bg-stone-100"
              >
                <X className="h-5 w-5 text-stone-500" />
              </button>
            </div>

            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('creator_cards_search_placeholder')}
                  className="w-full rounded-lg border-2 border-stone-300 py-2 pl-9 pr-3 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div className="max-h-80 space-y-2 overflow-y-auto">
              {filteredPrompts.length > 0 ? (
                filteredPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => handleReplacePrompt(replacingCardId, prompt)}
                    className="w-full rounded-lg border-2 border-stone-200 bg-white p-3 text-left text-sm font-medium text-stone-800 transition-all hover:border-pink-400 hover:bg-pink-50"
                  >
                    {prompt.prompt}
                  </button>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-stone-500">
                  {t('creator_cards_no_prompts_found')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
