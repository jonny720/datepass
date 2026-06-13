import { Shield } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface MissionDossierProps {
  recipientName: string;
  senderName: string;
  variant?: 'invitation' | 'confirmation';
}

export function MissionDossier({ recipientName, senderName, variant = 'invitation' }: MissionDossierProps) {
  const { config } = useLanguage();
  const isRTL = config.direction === 'rtl';

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 shadow-xl"
      dir={config.direction}
    >
      {/* Decorative edge pattern at top */}
      <div className="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-black/10 to-transparent">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="classified-marks" x="0" y="0" width="30" height="8" patternUnits="userSpaceOnUse">
              <rect x="0" y="3" width="20" height="2" fill="black" opacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#classified-marks)" />
        </svg>
      </div>

      {/* Main dossier content */}
      <div className="relative px-6 py-8">
        {/* Header with shield icon */}
        <div className="mb-6 flex items-center justify-center">
          <div className="rounded-full bg-gradient-to-br from-orange-600 to-red-700 p-3 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Dossier title */}
        <div className="mb-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-red-800">
            {variant === 'confirmation' ? 'Mission Approved' : 'Classified Mission Briefing'}
          </p>
          <div className="mx-auto mt-2 h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        </div>

        {/* Agent details */}
        <div className="mb-6 space-y-4">
          {/* Recipient Name - Large */}
          <div className="text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-600">
              Agent
            </p>
            <p className="text-2xl font-bold text-stone-900">
              {recipientName}
            </p>
          </div>

          {/* Divider with route markers */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-orange-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-3 text-xs text-orange-600">
                ◆
              </span>
            </div>
          </div>

          {/* Sender Name */}
          <div className="text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-600">
              Contact
            </p>
            <p className="text-lg font-bold text-pink-600">
              {senderName}
            </p>
          </div>
        </div>

        {/* Mission details in dossier format */}
        <div className="mb-6 space-y-3 rounded-xl bg-black/5 p-4 backdrop-blur-sm">
          <div className="flex justify-between">
            <span className="text-xs font-semibold uppercase text-stone-700">Mission Status</span>
            <span className={`text-sm font-bold text-stone-900 ${isRTL ? 'text-left' : 'text-right'}`}>
              Awaiting Approval
            </span>
          </div>
          
          <div className="h-px bg-gradient-to-r from-orange-200 via-red-200 to-orange-200" />
          
          <div className="flex justify-between">
            <span className="text-xs font-semibold uppercase text-stone-700">Objective</span>
            <span className={`text-sm font-bold text-stone-900 ${isRTL ? 'text-left' : 'text-right'}`}>
              Classified
            </span>
          </div>
          
          <div className="h-px bg-gradient-to-r from-orange-200 via-red-200 to-orange-200" />
          
          <div className="flex justify-between">
            <span className="text-xs font-semibold uppercase text-stone-700">Duration</span>
            <span className={`text-sm font-bold text-stone-900 ${isRTL ? 'text-left' : 'text-right'}`}>
              One Evening
            </span>
          </div>
          
          <div className="h-px bg-gradient-to-r from-orange-200 via-red-200 to-orange-200" />
          
          <div className="flex justify-between">
            <span className="text-xs font-semibold uppercase text-stone-700">Risk Level</span>
            <span className={`text-sm font-bold text-pink-600 ${isRTL ? 'text-left' : 'text-right'}`}>
              Suspiciously Enjoyable
            </span>
          </div>
          
          <div className="h-px bg-gradient-to-r from-orange-200 via-red-200 to-orange-200" />
          
          <div className="flex justify-between">
            <span className="text-xs font-semibold uppercase text-stone-700">Clearance Required</span>
            <span className={`text-sm font-bold text-pink-600 ${isRTL ? 'text-left' : 'text-right'}`}>
              One Tap
            </span>
          </div>
        </div>

        {/* Decorative classified stamp */}
        <div className="absolute bottom-4 right-4 -rotate-12 opacity-40">
          <div className="rounded-lg border-4 border-red-600 px-3 py-2">
            <p className="text-xs font-black uppercase text-red-600">
              Top Secret
            </p>
          </div>
        </div>
      </div>

      {/* Decorative edge pattern at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/10 to-transparent">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <rect width="100%" height="100%" fill="url(#classified-marks)" />
        </svg>
      </div>

      {/* Subtle decorative markers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Route markers */}
        <div className="absolute left-[12%] top-[18%] h-1.5 w-1.5 rounded-full bg-orange-500 opacity-30" />
        <div className="absolute left-[82%] top-[28%] h-2 w-2 rounded-full bg-red-500 opacity-25" />
        <div className="absolute left-[25%] bottom-[32%] h-1.5 w-1.5 rounded-full bg-orange-400 opacity-35" />
        <div className="absolute right-[18%] bottom-[22%] h-1.5 w-1.5 rounded-full bg-red-400 opacity-30" />
      </div>
    </div>
  );
}
