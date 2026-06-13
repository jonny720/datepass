// After-dark theme decorative elements

export function AfterDarkElements() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute left-[10%] top-[20%] h-32 w-32 animate-pulse rounded-full bg-purple-900/10 blur-2xl" />
      <div
        className="absolute right-[15%] top-[35%] h-40 w-40 animate-pulse rounded-full bg-pink-900/10 blur-3xl"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-[25%] left-[20%] h-36 w-36 animate-pulse rounded-full bg-indigo-900/10 blur-2xl"
        style={{ animationDelay: '4s' }}
      />
      {/* Small star-like elements */}
      <div className="absolute left-[25%] top-[15%] h-1 w-1 animate-twinkle rounded-full bg-white opacity-60" />
      <div
        className="absolute right-[30%] top-[25%] h-1 w-1 animate-twinkle rounded-full bg-white opacity-60"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute bottom-[30%] left-[35%] h-1 w-1 animate-twinkle rounded-full bg-white opacity-60"
        style={{ animationDelay: '2s' }}
      />
    </div>
  );
}
