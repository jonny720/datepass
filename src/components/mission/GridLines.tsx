export function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Vertical grid lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Vertical lines */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="80"
              stroke="rgba(251, 146, 60, 0.08)"
              strokeWidth="1"
            />
            {/* Horizontal lines */}
            <line
              x1="0"
              y1="0"
              x2="80"
              y2="0"
              stroke="rgba(251, 146, 60, 0.08)"
              strokeWidth="1"
            />
          </pattern>
          
          {/* Thicker grid pattern for emphasis */}
          <pattern
            id="grid-pattern-thick"
            x="0"
            y="0"
            width="240"
            height="240"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="240"
              stroke="rgba(249, 115, 22, 0.12)"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="0"
              x2="240"
              y2="0"
              stroke="rgba(249, 115, 22, 0.12)"
              strokeWidth="2"
            />
          </pattern>
        </defs>
        
        {/* Apply patterns */}
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        <rect width="100%" height="100%" fill="url(#grid-pattern-thick)" />
      </svg>

      {/* Diagonal accent lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="rgba(234, 88, 12, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="0"
          stroke="rgba(234, 88, 12, 0.1)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>
    </div>
  );
}
