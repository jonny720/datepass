// Nature theme decorative elements

export function NatureElements() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Subtle leaf decorations */}
      <div className="absolute left-[10%] top-[15%] h-16 w-16 animate-float-slow opacity-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 10 Q70 30 70 50 Q70 70 50 90 Q30 70 30 50 Q30 30 50 10Z"
            fill="currentColor"
            className="text-green-600"
          />
        </svg>
      </div>
      <div
        className="absolute right-[15%] top-[25%] h-12 w-12 opacity-15"
        style={{ animationDelay: '2s' }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="currentColor" className="text-amber-500" />
        </svg>
      </div>
      <div
        className="absolute bottom-[20%] left-[20%] h-20 w-20 animate-float-slow opacity-15"
        style={{ animationDelay: '4s' }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 20 L60 40 L80 45 L65 60 L68 80 L50 70 L32 80 L35 60 L20 45 L40 40 Z"
            fill="currentColor"
            className="text-yellow-500"
          />
        </svg>
      </div>
    </div>
  );
}
