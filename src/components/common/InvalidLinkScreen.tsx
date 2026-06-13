import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigation } from '@/hooks/useNavigation';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  IconBadge,
} from '@/components/ui';

export function InvalidLinkScreen() {
  const { t } = useLanguage();
  const { navigate } = useNavigation();

  const handleGoHome = () => {
    navigate({ type: 'landing' });
  };

  return (
    <ScreenContainer className="flex items-center justify-center">
      <Card className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <IconBadge variant="warning" size="lg">
            <AlertCircle className="h-12 w-12" />
          </IconBadge>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-stone-900">
          {t('invalid_link_title')}
        </h1>

        <p className="mb-8 text-lg text-stone-600">
          {t('invalid_link_message')}
        </p>

        <PrimaryButton onClick={handleGoHome} fullWidth>
          {t('invalid_link_button')}
        </PrimaryButton>
      </Card>
    </ScreenContainer>
  );
}
