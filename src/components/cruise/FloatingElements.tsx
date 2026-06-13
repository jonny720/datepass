export function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Floating bubbles - subtle circles */}
      <div className="absolute left-[15%] top-[20%] h-8 w-8 animate-float-slow rounded-full border-2 border-cyan-200 opacity-20" 
           style={{ animationDelay: '0s', animationDuration: '8s' }} />
      <div className="absolute left-[75%] top-[35%] h-6 w-6 animate-float-slow rounded-full border-2 border-blue-200 opacity-15" 
           style={{ animationDelay: '2s', animationDuration: '10s' }} />
      <div className="absolute left-[30%] bottom-[40%] h-10 w-10 animate-float-slow rounded-full border-2 border-cyan-100 opacity-10" 
           style={{ animationDelay: '4s', animationDuration: '12s' }} />
      <div className="absolute right-[20%] bottom-[25%] h-7 w-7 animate-float-slow rounded-full border-2 border-blue-100 opacity-12" 
           style={{ animationDelay: '1s', animationDuration: '9s' }} />

      {/* Small sparkles */}
      <div className="absolute left-[45%] top-[15%] h-2 w-2 animate-twinkle rounded-full bg-cyan-300" 
           style={{ animationDelay: '0s' }} />
      <div className="absolute left-[65%] top-[45%] h-1.5 w-1.5 animate-twinkle rounded-full bg-blue-200" 
           style={{ animationDelay: '1.5s' }} />
      <div className="absolute left-[25%] top-[60%] h-2 w-2 animate-twinkle rounded-full bg-pink-200" 
           style={{ animationDelay: '3s' }} />
      <div className="absolute right-[30%] top-[30%] h-1.5 w-1.5 animate-twinkle rounded-full bg-cyan-200" 
           style={{ animationDelay: '2s' }} />
    </div>
  );
}
