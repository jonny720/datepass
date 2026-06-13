import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigation } from '@/hooks/useNavigation';
import {
  ScreenContainer,
  PrimaryButton,
  IconBadge,
  LanguageToggle,
} from '@/components/ui';

export function LandingScreen() {
  const { t, language, setLanguage } = useLanguage();
  const { navigate } = useNavigation();

  const handleCreateClick = () => {
    navigate({ type: 'create' });
  };

  return (
    <ScreenContainer className="flex items-center justify-center">
      <div className="absolute right-4 top-4">
        <LanguageToggle language={language} onChange={setLanguage} />
      </div>

      <div className="w-full text-center">
        <div className="mb-8 flex justify-center">
          <IconBadge variant="primary" size="lg">
            <Sparkles className="h-12 w-12" />
          </IconBadge>
        </div>

        <h1 className="mb-4 text-5xl font-bold text-stone-900 sm:text-6xl">
          {t('landing_title')}
        </h1>

        <p className="mb-10 text-xl text-stone-600 sm:text-2xl">
          {t('landing_subtitle')}
        </p>

        <PrimaryButton onClick={handleCreateClick} size="lg">
          {t('landing_create_button')}
        </PrimaryButton>
      </div>
    </ScreenContainer>
  );
}
