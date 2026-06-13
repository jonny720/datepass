import { useState, useEffect, useCallback } from 'react';
import type { CreatorDraft } from '@/types';
import { INITIAL_DRAFT, TOTAL_STEPS } from '@/types';
import { safeLocalStorageGet, safeLocalStorageSet, safeLocalStorageRemove } from '@/lib/safeParsing';

const STORAGE_KEY = 'datepass_creator_draft';

/**
 * Type guard to validate CreatorDraft structure
 */
function isCreatorDraft(data: unknown): data is CreatorDraft {
  return (
    typeof data === 'object' &&
    data !== null &&
    'step' in data &&
    'language' in data &&
    'senderName' in data &&
    'recipientName' in data
  );
}

function loadDraft(): CreatorDraft {
  const draft = safeLocalStorageGet<CreatorDraft>(STORAGE_KEY, isCreatorDraft);
  return draft || { ...INITIAL_DRAFT };
}

function saveDraft(draft: CreatorDraft): void {
  safeLocalStorageSet(STORAGE_KEY, draft);
}

export function useCreatorState() {
  const [draft, setDraft] = useState<CreatorDraft>(loadDraft);

  // Check for reset request on mount and when reset event is dispatched
  useEffect(() => {
    const checkReset = () => {
      const resetRequested = sessionStorage.getItem('datepass_reset_requested');
      if (resetRequested === 'true') {
        sessionStorage.removeItem('datepass_reset_requested');
        setDraft({ ...INITIAL_DRAFT });
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    // Check immediately on mount
    checkReset();

    // Listen for custom reset event
    const handleReset = () => {
      checkReset();
    };

    window.addEventListener('datepass:reset', handleReset);

    return () => {
      window.removeEventListener('datepass:reset', handleReset);
    };
  }, []);

  // Auto-save on changes
  useEffect(() => {
    saveDraft(draft);
  }, [draft]);

  const updateDraft = useCallback(
    (updates: Partial<CreatorDraft>) => {
      setDraft((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const nextStep = useCallback(() => {
    setDraft((prev) => ({
      ...prev,
      step: Math.min(prev.step + 1, TOTAL_STEPS),
    }));
  }, []);

  const prevStep = useCallback(() => {
    setDraft((prev) => ({
      ...prev,
      step: Math.max(prev.step - 1, 1),
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setDraft((prev) => ({
      ...prev,
      step: Math.max(1, Math.min(step, TOTAL_STEPS)),
    }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft({ ...INITIAL_DRAFT });
    safeLocalStorageRemove(STORAGE_KEY);
  }, []);

  return {
    draft,
    updateDraft,
    nextStep,
    prevStep,
    goToStep,
    resetDraft,
  };
}
