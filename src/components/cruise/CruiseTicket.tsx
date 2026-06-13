import { Anchor } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface CruiseTicketProps {
  recipientName: string;
  senderName: string;
  variant?: 'invitation' | 'confirmation';
}

export function CruiseTicket({ recipientName, senderName, variant = 'invitation' }: CruiseTicketProps) {
  const { config } = useLanguage();
  const isRTL = config.direction === 'rtl';

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl"
      dir={config.direction}
    >
      {/* Decorative perforation edge at top */}
      <div className="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-white/30 to-transparent">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="perforation" x="0" y="0" width="20" height="8" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="4" r="2" fill="white" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#perforation)" />
        </svg>
      </div>

      {/* Main ticket content */}
      <div className="relative px-6 py-8">
        {/* Header with anchor icon */}
        <div className="mb-6 flex items-center justify-center">
          <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 p-3 shadow-lg">
            <Anchor className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Ticket title */}
        <div className="mb-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-cyan-700">
            {variant === 'confirmation' ? 'Boarding Pass Confirmed' : 'Evening Cruise Invitation'}
          </p>
          <div className="mx-auto mt-2 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>

        {/* Passenger details */}
        <div className="mb-6 space-y-4">
          {/* Recipient Name - Large */}
          <div className="text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Passenger
            </p>
            <p className="text-2xl font-bold text-stone-900">
              {recipientName}
            </p>
          </div>

          {/* Divider with route line */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-cyan-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-blue-50 to-cyan-50 px-3 text-xs text-cyan-600">
                ✦
              </span>
            </div>
          </div>

          {/* Sender Name */}
          <div className="text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Invited By
            </p>
            <p className="text-lg font-bold text-pink-600">
              {senderName}
            </p>
          </div>
        </div>

        {/* Cruise details in ticket format */}
        <div className="mb-6 space-y-3 rounded-xl bg-white/50 p-4 backdrop-blur-sm">
          <div className="flex justify-between">
            <span className="text-xs font-semibold uppercase text-stone-600">Destination</span>
            <span className={`text-sm font-bold text-stone-900 ${isRTL ? 'text-left' : 'text-right'}`}>
              Classified
            </span>
          </div>
          
          <div className="h-px bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-200" />
          
          <div className="flex justify-between">
            <span className="text-xs font-semibold uppercase text-stone-600">Departure</span>
            <span className={`text-sm font-bold text-stone-900 ${isRTL ? 'text-left' : 'text-right'}`}>
              Pending Approval
            </span>
          </div>
          
          <div className="h-px bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-200" />
          
          <div className="flex justify-between">
            <span className="text-xs font-semibold uppercase text-stone-600">Duration</span>
            <span className={`text-sm font-bold text-stone-900 ${isRTL ? 'text-left' : 'text-right'}`}>
              One Evening
            </span>
          </div>
          
          <div className="h-px bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-200" />
          
          <div className="flex justify-between">
            <span className="text-xs font-semibold uppercase text-stone-600">Boarding Group</span>
            <span className={`text-sm font-bold text-pink-600 ${isRTL ? 'text-left' : 'text-right'}`}>
              Two
            </span>
          </div>
        </div>

        {/* Decorative stamp */}
        <div className="absolute bottom-4 right-4 rotate-12 opacity-30">
          <div className="rounded-lg border-4 border-pink-500 px-3 py-2">
            <p className="text-xs font-black uppercase text-pink-500">
              Premium
            </p>
          </div>
        </div>
      </div>

      {/* Decorative perforation edge at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/30 to-transparent">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <rect width="100%" height="100%" fill="url(#perforation)" />
        </svg>
      </div>

      {/* Subtle floating decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Stars/sparkles */}
        <div className="absolute left-[10%] top-[15%] h-1 w-1 rounded-full bg-cyan-400 opacity-40" />
        <div className="absolute left-[85%] top-[25%] h-1.5 w-1.5 rounded-full bg-blue-300 opacity-30" />
        <div className="absolute left-[20%] bottom-[30%] h-1 w-1 rounded-full bg-pink-300 opacity-40" />
        <div className="absolute right-[15%] bottom-[20%] h-1 w-1 rounded-full bg-cyan-300 opacity-50" />
      </div>
    </div>
  );
}
