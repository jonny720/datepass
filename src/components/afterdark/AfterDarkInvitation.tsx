import { Moon } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface AfterDarkInvitationProps {
  recipientName: string;
  senderName: string;
  variant?: 'invitation' | 'confirmation';
}

export function AfterDarkInvitation({ recipientName, senderName, variant = 'invitation' }: AfterDarkInvitationProps) {
  const { config } = useLanguage();

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 shadow-2xl"
      dir={config.direction}
    >
      {/* Decorative stars pattern at top */}
      <div className="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-white/10 to-transparent">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="stars" x="0" y="0" width="20" height="8" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="4" r="2" fill="white" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative px-6 py-8">
        {/* Header with moon icon */}
        <div className="mb-6 flex items-center justify-center">
          <div className="rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-3 shadow-lg ring-2 ring-purple-400/50">
            <Moon className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-purple-300">
            {variant === 'confirmation' ? 'Night Out Confirmed' : 'After Dark Invitation'}
          </p>
          <div className="mx-auto mt-2 h-px w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        </div>

        {/* Names */}
        <div className="mb-6 space-y-4">
          {/* Recipient Name */}
          <div className="text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-purple-300">
              Reserved For
            </p>
            <p className="text-2xl font-bold text-white">
              {recipientName}
            </p>
          </div>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-purple-500/50" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 px-3 text-xs text-purple-400">
                🌙
              </span>
            </div>
          </div>

          {/* Sender Name */}
          <div className="text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-purple-300">
              Your Guide
            </p>
            <p className="text-lg font-bold text-pink-400">
              {senderName}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 border-y border-dashed border-purple-500/50 py-4">
          <div className="text-center text-xs text-purple-200">
            <p>🌃 Setting: City Lights & Nightlife</p>
            <p>⏰ Time: When the stars come out</p>
            <p>✨ Mood: Daring & Mysterious</p>
          </div>
        </div>
      </div>

      {/* Decorative perforation at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/10 to-transparent">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="stars-bottom" x="0" y="0" width="20" height="8" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="4" r="2" fill="white" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars-bottom)" />
        </svg>
      </div>
    </div>
  );
}
