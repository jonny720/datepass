// Party theme decorative elements

export function PartyElements() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Confetti-like shapes */}
      <div className="absolute left-[8%] top-[12%] h-4 w-4 animate-twinkle rounded-full bg-pink-500 opacity-40" />
      <div
        className="absolute right-[12%] top-[18%] h-3 w-3 animate-twinkle rounded-full bg-purple-500 opacity-40"
        style={{ animationDelay: '0.5s' }}
      />
      <div
        className="absolute bottom-[25%] left-[15%] h-5 w-5 animate-twinkle rounded-full bg-yellow-400 opacity-40"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute right-[20%] bottom-[30%] h-4 w-4 animate-twinkle rounded-full bg-cyan-400 opacity-40"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="absolute left-[25%] top-[35%] h-3 w-3 animate-twinkle rounded-full bg-orange-400 opacity-40"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute right-[30%] bottom-[20%] h-4 w-4 animate-twinkle rounded-full bg-green-400 opacity-40"
        style={{ animationDelay: '2.5s' }}
      />
    </div>
  );
}
