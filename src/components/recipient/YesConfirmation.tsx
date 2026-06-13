import { motion } from 'framer-motion';
import type { InviteType, ThemeId } from '@/types';
import { Check, Shield, Leaf, Music, Heart, Sparkles } from 'lucide-react';

interface YesConfirmationProps {
  theme: ThemeId;
  inviteType?: InviteType;
  onComplete: () => void;
}

export function YesConfirmation({ theme, inviteType = 'date', onComplete }: YesConfirmationProps) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Haptic feedback
  if ('vibrate' in navigator) {
    navigator.vibrate(25);
  }

  // Auto-complete after animation
  setTimeout(() => {
    onComplete();
  }, prefersReducedMotion ? 100 : 800);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {theme === 'cruise' && <CruiseConfirmation />}
        {theme === 'secret_mission' && <MissionConfirmation />}
        {theme === 'nature' && <NatureConfirmation />}
        {theme === 'party' && <PartyConfirmation />}
        {(theme === 'after_dark' || theme === 'temptation') && <AfterDarkConfirmation isDateInvite={inviteType === 'date'} />}
      </motion.div>
    </motion.div>
  );
}

function CruiseConfirmation() {
  return (
    <div className="relative">
      <motion.div
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <Check className="h-10 w-10 text-white" strokeWidth={3} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold uppercase tracking-wider text-blue-900"
      >
        Boarding Approved
      </motion.div>
      {/* Wave animation */}
      <svg className="absolute -bottom-8 left-1/2 h-16 w-64 -translate-x-1/2" viewBox="0 0 200 40">
        <motion.path
          d="M 0 20 Q 25 10 50 20 T 100 20 T 150 20 T 200 20"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </svg>
    </div>
  );
}

function MissionConfirmation() {
  return (
    <div className="relative">
      <motion.div
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stone-900"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5 }}
      >
        <Shield className="h-10 w-10 text-red-500" strokeWidth={2.5} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.3 }}
        className="text-xl font-bold uppercase tracking-widest text-stone-900"
      >
        Mission Accepted
      </motion.div>
      {/* Scan line */}
      <motion.div
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 80, opacity: [0, 1, 0] }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />
    </div>
  );
}

function NatureConfirmation() {
  return (
    <div className="relative">
      <motion.div
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12 }}
      >
        <Leaf className="h-10 w-10 text-white" strokeWidth={2} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-3 text-xl font-semibold text-green-900"
      >
        Perfect!
      </motion.div>
      {/* Sparkles */}
      <div className="flex justify-center gap-3">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="h-1 w-1 rounded-full bg-green-500"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              y: [0, -20],
            }}
            transition={{
              duration: 0.8,
              delay: 0.3 + i * 0.1,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PartyConfirmation() {
  return (
    <div className="relative">
      <motion.div
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Music className="h-10 w-10 text-white" strokeWidth={2.5} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-purple-900"
      >
        Let's go! 🎉
      </motion.div>
      {/* Confetti */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-sm"
            style={{
              left: `${30 + (i % 4) * 15}%`,
              top: '20%',
              backgroundColor: ['#ec4899', '#a855f7', '#f97316', '#3b82f6'][i % 4],
            }}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
              y: [0, -30, -60],
              x: [(i % 2 ? 1 : -1) * (10 + i * 3)],
              rotate: [0, 360 * (i % 2 ? 1 : -1)],
            }}
            transition={{
              duration: 0.8,
              delay: 0.2 + (i % 3) * 0.1,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function AfterDarkConfirmation({ isDateInvite }: { isDateInvite: boolean }) {
  const Icon = isDateInvite ? Heart : Sparkles;

  return (
    <div className="relative">
      <motion.div
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-900 to-purple-900"
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1, 1.1, 1],
          boxShadow: [
            '0 0 0px rgba(168, 85, 247, 0)',
            '0 0 20px rgba(168, 85, 247, 0.6)',
            '0 0 40px rgba(168, 85, 247, 0.8)',
            '0 0 20px rgba(168, 85, 247, 0.4)',
          ],
        }}
        transition={{ duration: 0.7 }}
      >
        <Icon className="h-10 w-10 text-purple-300" strokeWidth={2.5} fill={isDateInvite ? 'currentColor' : 'none'} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-medium text-purple-900"
      >
        Intriguing choice ✨
      </motion.div>
      {/* Glow pulse */}
      <motion.div
        className="absolute left-1/2 top-10 h-20 w-20 -translate-x-1/2 rounded-full bg-purple-500/30 blur-xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
    </div>
  );
}
