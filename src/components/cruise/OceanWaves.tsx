export function OceanWaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Bottom waves */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ height: '120px' }}
      >
        {/* Back wave - lighter */}
        <path
          d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z"
          fill="rgba(165, 243, 252, 0.2)"
        />
        {/* Middle wave */}
        <path
          d="M0,80 C240,40 480,100 720,70 C960,40 1200,100 1440,70 L1440,120 L0,120 Z"
          fill="rgba(103, 232, 249, 0.25)"
        />
        {/* Front wave - darker */}
        <path
          d="M0,90 C240,60 480,100 720,85 C960,60 1200,100 1440,85 L1440,120 L0,120 Z"
          fill="rgba(34, 211, 238, 0.15)"
        />
      </svg>

      {/* Top subtle wave */}
      <svg
        className="absolute left-0 top-0 w-full"
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ height: '60px' }}
      >
        <path
          d="M0,0 L0,30 C240,50 480,10 720,30 C960,50 1200,10 1440,30 L1440,0 Z"
          fill="rgba(224, 242, 254, 0.4)"
        />
      </svg>
    </div>
  );
}
