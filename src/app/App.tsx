import { useLayoutEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigation } from '@/hooks/useNavigation';
import { LandingScreen, InvalidLinkScreen, NotFoundScreen, ErrorBoundary } from '@/components/common';
import { CreatorScreen } from '@/components/creator';
import { RecipientScreen } from '@/components/recipient';
import { DevMode } from '@/components/DevMode';
import { AppShell, AppHeader } from '@/components/ui';

function App() {
  const { config, language, setLanguage, t } = useLanguage();
  const { route, navigate } = useNavigation();
  const syncedInviteConfigRef = useRef<unknown>(null);

  useLayoutEffect(() => {
    if (route.type === 'invite' && syncedInviteConfigRef.current !== route.config) {
      syncedInviteConfigRef.current = route.config;
      if (route.config.language !== language) {
        setLanguage(route.config.language);
      }
    }
  }, [language, route, setLanguage]);

  const handleStartOver = () => {
    // Clear localStorage
    localStorage.removeItem('datepass_creator_draft');
    
    // Set a flag to trigger reset
    sessionStorage.setItem('datepass_reset_requested', 'true');
    
    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent('datepass:reset'));
    
    // Navigate to create route
    navigate({ type: 'create' });
  };

  const renderRoute = () => {
    switch (route.type) {
      case 'landing':
        return <LandingScreen />;
      case 'create':
        return <CreatorScreen />;
      case 'dev':
        return <DevMode />;
      case 'invite':
        return <RecipientScreen config={route.config} />;
      case 'invalid':
        return <InvalidLinkScreen />;
      default:
        return <NotFoundScreen />;
    }
  };

  const showStartOver = route.type === 'create' || route.type === 'invite';

  return (
    <ErrorBoundary>
      <AppShell>
        <AppHeader onStartOver={handleStartOver} showStartOver={showStartOver} />
        <div
          dir={config.direction}
          className="pb-10 pt-12"
        >
          {renderRoute()}
        </div>
        <div className="pointer-events-none fixed inset-x-0 bottom-2 z-30 flex justify-center px-4">
          <p className="rounded-full bg-white/85 px-3 py-1 text-center text-[11px] font-medium text-stone-500 shadow-sm backdrop-blur-sm">
            {t('app_static_disclaimer')}
          </p>
        </div>
      </AppShell>
    </ErrorBoundary>
  );
}

export default App;
