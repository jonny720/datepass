import { Leaf } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface NatureInvitationProps {
  recipientName: string;
  senderName: string;
  variant?: 'invitation' | 'confirmation';
}

export function NatureInvitation({ recipientName, senderName, variant = 'invitation' }: NatureInvitationProps) {
  const { config } = useLanguage();

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 shadow-xl"
      dir={config.direction}
    >
      {/* Decorative leaf pattern at top */}
      <div className="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-white/30 to-transparent">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="leaves" x="0" y="0" width="20" height="8" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="4" r="2" fill="white" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative px-6 py-8">
        {/* Header with leaf icon */}
        <div className="mb-6 flex items-center justify-center">
          <div className="rounded-full bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">
            <Leaf className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-700">
            {variant === 'confirmation' ? 'Nature Date Confirmed' : 'Nature Escape Invitation'}
          </p>
          <div className="mx-auto mt-2 h-px w-24 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
        </div>

        {/* Names */}
        <div className="mb-6 space-y-4">
          {/* Recipient Name */}
          <div className="text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
              For
            </p>
            <p className="text-2xl font-bold text-stone-900">
              {recipientName}
            </p>
          </div>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-emerald-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-3 text-xs text-emerald-600">
                🌿
              </span>
            </div>
          </div>

          {/* Sender Name */}
          <div className="text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
              From
            </p>
            <p className="text-lg font-bold text-pink-600">
              {senderName}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 border-y border-dashed border-emerald-300 py-4">
          <div className="text-center text-xs text-stone-600">
            <p>🌲 Destination: The Great Outdoors</p>
            <p>⏱️ Duration: As long as nature calls</p>
            <p>🌟 Vibe: Calm & Refreshing</p>
          </div>
        </div>
      </div>

      {/* Decorative perforation at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/30 to-transparent">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="perforation-bottom" x="0" y="0" width="20" height="8" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="4" r="2" fill="white" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#perforation-bottom)" />
        </svg>
      </div>
    </div>
  );
}
