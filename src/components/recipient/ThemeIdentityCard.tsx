import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { InviteConfig, ThemeId } from '@/types';
import { getThemeVisualIdentity } from '@/config/themes';

interface ThemeIdentityCardProps {
  config: InviteConfig;
}

export function ThemeIdentityCard({ config }: ThemeIdentityCardProps) {
  const { language } = useLanguage();
  const identity = getThemeVisualIdentity(config.theme);

  if (!identity) return null;

  const Icon = identity.icon;
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-6 shadow-2xl backdrop-blur-md ${identity.surfaceClass}`}>
      <ThemeTicketMotif theme={config.theme} />

      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {identity.recipientBadge && (
              <span className={`mb-2 inline-flex rounded-full border border-current/20 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] ${identity.accentClass}`}>
                {identity.recipientBadge[language]}
              </span>
            )}
            <p className={`text-xs font-bold uppercase tracking-[0.22em] ${identity.accentClass}`}>
              DatePass
            </p>
            <h1 className={`mt-2 text-2xl font-bold leading-tight ${identity.textClass}`}>
              {identity.openingMotif[language]}
            </h1>
            <p className={`mt-2 text-sm font-medium ${identity.mutedTextClass}`}>
              {identity.openingSubtitle[language]}
            </p>
          </div>
          <div className={`shrink-0 rounded-2xl bg-white/20 p-3 ring-1 ring-current/15 ${identity.accentClass}`}>
            <Icon className="h-7 w-7" />
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-2">
          {identity.ticketMetadata.map((line) => (
            <div
              key={`${line.label.en}-${line.value.en}`}
              className="rounded-xl border border-current/10 bg-white/15 px-3 py-2"
            >
              <p className={`text-[0.65rem] font-bold uppercase tracking-[0.16em] ${identity.mutedTextClass}`}>
                {line.label[language]}
              </p>
              <p className={`mt-1 text-sm font-bold ${identity.textClass}`}>
                {line.value[language]}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-current/10 pt-4">
          <div>
            <p className={`text-xs font-semibold ${identity.mutedTextClass}`}>
              {language === 'he' ? 'נשלח מאת' : 'Sent by'}
            </p>
            <p className={`text-base font-bold ${identity.textClass}`}>
              {config.senderName}
            </p>
          </div>
          <div className="flex gap-2">
            {identity.decorativeIcons.map((DecorIcon, index) => (
              <motion.div
                key={index}
                className={`rounded-full bg-white/20 p-2 ${identity.accentClass}`}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.4, delay: index * 0.2, repeat: Infinity }}
              >
                <DecorIcon className="h-4 w-4" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThemeIdentityDecorations({ theme }: { theme: ThemeId }) {
  const identity = getThemeVisualIdentity(theme);
  if (!identity) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="theme-identity-vignette" />
      {identity.decorativeIcons.map((DecorIcon, index) => (
        <DecorIcon
          key={index}
          className={`absolute opacity-25 ${getDecorationPlacement(index)} ${identity.accentClass}`}
        />
      ))}
    </div>
  );
}

function ThemeTicketMotif({ theme }: { theme: ThemeId }) {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-70">
      <div className={`theme-ticket-motif theme-ticket-motif-${theme}`} />
    </div>
  );
}

function getDecorationPlacement(index: number): string {
  if (index === 0) return 'left-6 top-16 h-10 w-10';
  if (index === 1) return 'bottom-28 right-8 h-12 w-12';
  return 'right-12 top-28 h-8 w-8';
}
