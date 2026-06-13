import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { ThemeId } from '@/types';
import { THEME_CONFIGS } from '@/config/themes';
import { scaleIn } from '@/lib/animations';

interface InvitationTicketProps {
  theme: ThemeId;
  senderName: string;
  recipientName: string;
}

export function InvitationTicket({
  theme,
  senderName,
  recipientName,
}: InvitationTicketProps) {
  const { t } = useLanguage();
  const themeConfig = THEME_CONFIGS[theme];
  const Icon = themeConfig.icon;

  // Theme-specific background classes
  const getBackgroundClass = () => {
    switch (theme) {
      case 'cruise':
        return 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100';
      case 'secret_mission':
        return 'bg-gradient-to-br from-stone-800 via-stone-900 to-black text-white';
      case 'nature':
        return 'bg-gradient-to-br from-green-50 via-yellow-50 to-green-100';
      case 'party':
        return 'bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100';
      case 'after_dark':
      case 'temptation':
        return 'bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white';
      default:
        return 'bg-white';
    }
  };

  const getBorderClass = () => {
    if (theme === 'secret_mission' || theme === 'after_dark' || theme === 'temptation') {
      return 'border-white/20';
    }
    return 'border-stone-200';
  };

  const getTextColorClass = () => {
    if (theme === 'secret_mission' || theme === 'after_dark' || theme === 'temptation') {
      return 'text-white/70';
    }
    return 'text-stone-600';
  };

  const getHeadingColorClass = () => {
    if (theme === 'secret_mission' || theme === 'after_dark' || theme === 'temptation') {
      return 'text-white';
    }
    return 'text-stone-900';
  };

  return (
    <motion.div
      className={`
        relative w-full max-w-md overflow-hidden rounded-2xl border shadow-xl
        ${getBackgroundClass()} ${getBorderClass()}
      `}
      variants={scaleIn}
    >
      {/* Status Badge */}
      <div className="absolute right-4 top-4">
        <div
          className={`
            rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide
            ${
              theme === 'secret_mission' || theme === 'after_dark' || theme === 'temptation'
                ? 'bg-white/10 text-white/90'
                : 'bg-stone-900/10 text-stone-900/90'
            }
          `}
        >
          {t('creator_review_ticket_status')}
        </div>
      </div>

      {/* Theme Icon */}
      <div className="px-6 pt-8 pb-6">
        <div
          className={`
            inline-flex items-center justify-center rounded-xl p-3
            ${
              theme === 'secret_mission' || theme === 'after_dark' || theme === 'temptation'
                ? 'bg-white/10'
                : 'bg-stone-900/5'
            }
          `}
        >
          <Icon className="h-8 w-8" />
        </div>
      </div>

      {/* Ticket Content */}
      <div className="space-y-4 px-6 pb-6">
        {/* Recipient (Passenger) */}
        <div>
          <div className={`text-xs font-medium uppercase tracking-wide ${getTextColorClass()}`}>
            {t('creator_review_ticket_passenger')}
          </div>
          <div className={`mt-1 text-2xl font-bold ${getHeadingColorClass()}`}>
            {recipientName}
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t border-dashed ${
            theme === 'secret_mission' || theme === 'after_dark' || theme === 'temptation'
              ? 'border-white/20'
              : 'border-stone-300'
          }`}
        />

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className={`text-xs font-medium uppercase tracking-wide ${getTextColorClass()}`}>
              {t('creator_review_ticket_host')}
            </div>
            <div className={`mt-1 text-base font-semibold ${getHeadingColorClass()}`}>
              {senderName}
            </div>
          </div>

          <div>
            <div className={`text-xs font-medium uppercase tracking-wide ${getTextColorClass()}`}>
              {t('creator_review_ticket_theme')}
            </div>
            <div className={`mt-1 text-base font-semibold ${getHeadingColorClass()}`}>
              {t(`creator_theme_${theme}` as never)}
            </div>
          </div>

          <div>
            <div className={`text-xs font-medium uppercase tracking-wide ${getTextColorClass()}`}>
              {t('creator_review_ticket_duration')}
            </div>
            <div className={`mt-1 text-base font-semibold ${getHeadingColorClass()}`}>
              {t('creator_review_ticket_duration_value')}
            </div>
          </div>
        </div>
      </div>

      {/* Perforation effect */}
      <div className="relative h-6">
        <div
          className={`absolute inset-0 border-t border-dashed ${
            theme === 'secret_mission' || theme === 'after_dark' || theme === 'temptation'
              ? 'border-white/20'
              : 'border-stone-300'
          }`}
        />
      </div>
    </motion.div>
  );
}
