import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
}

const colors = ['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981'];

const generateConfetti = (count: number): ConfettiPiece[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // -50 to 50
    y: -20 - Math.random() * 20, // Start above viewport
    rotation: Math.random() * 720 - 360, // Full rotations
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.3,
  }));
};

interface ConfettiProps {
  onComplete?: () => void;
}

export function Confetti({ onComplete }: ConfettiProps) {
  const [pieces] = useState(() => generateConfetti(20));

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute left-1/2 top-1/4 h-3 w-3 rounded-sm"
          style={{
            backgroundColor: piece.color,
          }}
          initial={{
            x: 0,
            y: piece.y,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: piece.x * 4,
            y: window.innerHeight + 100,
            opacity: [1, 1, 0],
            rotate: piece.rotation,
          }}
          transition={{
            duration: 2,
            delay: piece.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  );
}
