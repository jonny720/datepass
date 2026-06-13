export function RadarElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Radar circles with pulse effect */}
      <div className="absolute left-[20%] top-[25%] h-12 w-12 animate-float-slow rounded-full border-2 border-orange-300/30" 
           style={{ animationDelay: '0s', animationDuration: '10s' }}>
        <div className="absolute inset-0 rounded-full border-2 border-orange-400/20 animate-pulse" />
      </div>
      
      <div className="absolute left-[70%] top-[40%] h-10 w-10 animate-float-slow rounded-full border-2 border-red-300/25" 
           style={{ animationDelay: '2s', animationDuration: '12s' }}>
        <div className="absolute inset-0 rounded-full border-2 border-red-400/15 animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="absolute left-[35%] bottom-[35%] h-14 w-14 animate-float-slow rounded-full border-2 border-orange-200/20" 
           style={{ animationDelay: '4s', animationDuration: '11s' }}>
        <div className="absolute inset-0 rounded-full border-2 border-orange-300/15 animate-pulse" 
             style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="absolute right-[25%] bottom-[20%] h-11 w-11 animate-float-slow rounded-full border-2 border-red-200/25" 
           style={{ animationDelay: '1s', animationDuration: '9s' }}>
        <div className="absolute inset-0 rounded-full border-2 border-red-300/20 animate-pulse" />
      </div>

      {/* Small target markers */}
      <div className="absolute left-[45%] top-[18%] h-2 w-2 animate-twinkle rounded-full bg-orange-400/40" 
           style={{ animationDelay: '0s' }} />
      <div className="absolute left-[62%] top-[50%] h-1.5 w-1.5 animate-twinkle rounded-full bg-red-300/35" 
           style={{ animationDelay: '1.5s' }} />
      <div className="absolute left-[28%] top-[65%] h-2 w-2 animate-twinkle rounded-full bg-orange-300/40" 
           style={{ animationDelay: '3s' }} />
      <div className="absolute right-[32%] top-[32%] h-1.5 w-1.5 animate-twinkle rounded-full bg-red-400/35" 
           style={{ animationDelay: '2s' }} />

      {/* Crosshair markers */}
      <svg className="absolute left-[15%] top-[15%] h-6 w-6 opacity-20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" className="text-orange-600" />
        <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1" className="text-orange-600" />
        <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1" className="text-orange-600" />
        <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1" className="text-orange-600" />
        <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" className="text-orange-600" />
      </svg>
      
      <svg className="absolute right-[18%] bottom-[25%] h-5 w-5 opacity-15 animate-pulse" viewBox="0 0 24 24" fill="none"
           style={{ animationDelay: '1.5s' }}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" className="text-red-600" />
        <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1" className="text-red-600" />
        <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1" className="text-red-600" />
        <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1" className="text-red-600" />
        <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" className="text-red-600" />
      </svg>
    </div>
  );
}
