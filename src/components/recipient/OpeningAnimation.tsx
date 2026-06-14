import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ThemeId } from '@/types';
import { Anchor, Shield, Leaf, Music, Moon, Check } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getThemeVisualIdentity } from '@/config/themes';

interface OpeningAnimationProps {
  theme: ThemeId;
  recipientName: string;
  openingMessage?: string;
  onComplete: () => void;
}

export function OpeningAnimation({ theme, recipientName, openingMessage, onComplete }: OpeningAnimationProps) {
  const { language } = useLanguage();
  const [stage, setStage] = useState<'envelope' | 'reveal' | 'complete'>('envelope');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const themeIdentity = getThemeVisualIdentity(theme);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animation entirely for reduced motion
      setStage('complete');
      setTimeout(onComplete, 100);
      return;
    }

    // Envelope stage: 400ms
    const envelopeTimer = setTimeout(() => {
      setStage('reveal');
    }, 400);

    // Reveal stage: 1100ms (total 1.5s)
    const revealTimer = setTimeout(() => {
      setStage('complete');
      setTimeout(onComplete, 300);
    }, 1500);

    return () => {
      clearTimeout(envelopeTimer);
      clearTimeout(revealTimer);
    };
  }, [prefersReducedMotion, onComplete]);

  // Allow early dismiss
  const handleClick = () => {
    if (stage !== 'complete') {
      setStage('complete');
      onComplete();
    }
  };

  if (stage === 'complete') return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-white"
      onClick={handleClick}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {stage === 'envelope' && (
          <motion.div
            key="envelope"
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {theme === 'cruise' && <CruiseEnvelope />}
            {theme === 'secret_mission' && <MissionEnvelope />}
            {theme === 'nature' && <NatureEnvelope />}
            {theme === 'party' && <PartyEnvelope />}
            {theme === 'after_dark' && <AfterDarkEnvelope />}
            {themeIdentity && <ThemeIdentityEnvelope theme={theme} />}
          </motion.div>
        )}

        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            className="px-6 text-center"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {theme === 'cruise' && <CruiseReveal recipientName={recipientName} openingMessage={openingMessage} />}
            {theme === 'secret_mission' && <MissionReveal recipientName={recipientName} openingMessage={openingMessage} />}
            {theme === 'nature' && <NatureReveal recipientName={recipientName} openingMessage={openingMessage} />}
            {theme === 'party' && <PartyReveal recipientName={recipientName} openingMessage={openingMessage} />}
            {theme === 'after_dark' && <AfterDarkReveal recipientName={recipientName} openingMessage={openingMessage} />}
            {themeIdentity && (
              <ThemeIdentityReveal
                theme={theme}
                recipientName={recipientName}
                openingMessage={openingMessage || themeIdentity.openingSubtitle[language]}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ThemeIdentityEnvelope({ theme }: { theme: ThemeId }) {
  const identity = getThemeVisualIdentity(theme);
  if (!identity) return null;

  const Icon = identity.icon;

  return (
    <div className={`relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-2xl shadow-2xl ${identity.backgroundClass}`}>
      <div className="absolute inset-4 rounded-2xl border border-white/35" />
      <div className="theme-ticket-motif absolute inset-0 opacity-70">
        <div className={`theme-ticket-motif theme-ticket-motif-${theme}`} />
      </div>
      <motion.div
        className={`relative z-10 rounded-2xl bg-white/85 p-6 shadow-xl ${identity.accentClass}`}
        animate={{ rotate: [0, -3, 3, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <Icon className="h-20 w-20" strokeWidth={1.7} />
      </motion.div>
    </div>
  );
}

function ThemeIdentityReveal({
  theme,
  recipientName,
  openingMessage,
}: {
  theme: ThemeId;
  recipientName: string;
  openingMessage?: string;
}) {
  const { language } = useLanguage();
  const identity = getThemeVisualIdentity(theme);
  if (!identity) return null;

  const Icon = identity.icon;

  return (
    <div className="max-w-md">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`mb-3 text-sm font-bold uppercase tracking-widest ${identity.accentClass}`}
      >
        {identity.openingMotif[language]}
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-2 text-3xl font-bold text-stone-900"
      >
        {recipientName}
      </motion.div>
      {openingMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm italic text-stone-700"
        >
          {openingMessage}
        </motion.p>
      )}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className={`mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 ${identity.accentClass}`}
      >
        <Icon className="h-6 w-6" />
      </motion.div>
    </div>
  );
}

// Cruise Theme
function CruiseEnvelope() {
  return (
    <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-200 shadow-2xl">
      <Anchor className="h-24 w-24 text-blue-600" strokeWidth={1.5} />
      <motion.div
        className="absolute inset-0 rounded-2xl border-4 border-blue-300/50"
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

function CruiseReveal({ recipientName, openingMessage }: { recipientName: string; openingMessage?: string }) {
  return (
    <div className="max-w-md">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-3 text-sm font-medium uppercase tracking-widest text-blue-600"
      >
        Boarding Pass
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-2 text-3xl font-bold text-blue-900"
      >
        {recipientName}
      </motion.div>
      {openingMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm italic text-blue-700"
        >
          {openingMessage}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="mt-4 h-12 w-12 rounded-full bg-blue-600/10 mx-auto flex items-center justify-center"
      >
        <Check className="h-6 w-6 text-blue-600" />
      </motion.div>
    </div>
  );
}

// Secret Mission Theme
function MissionEnvelope() {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 shadow-2xl">
      <Shield className="h-24 w-24 text-red-500" strokeWidth={1.5} />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-red-500/20 to-transparent"
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-0 border-4 border-red-500/30" />
    </div>
  );
}

function MissionReveal({ recipientName, openingMessage }: { recipientName: string; openingMessage?: string }) {
  return (
    <div className="max-w-md">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1] }}
        transition={{ times: [0, 0.3, 0.6, 1], duration: 0.8 }}
        className="mb-3 text-sm font-bold uppercase tracking-widest text-red-600"
      >
        Classified
      </motion.div>
      <motion.div
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="mb-2 text-3xl font-bold text-stone-900"
      >
        {recipientName}
      </motion.div>
      {openingMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm italic text-stone-700"
        >
          {openingMessage}
        </motion.p>
      )}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, type: 'spring' }}
        className="mt-4 text-xs font-bold uppercase tracking-wider text-green-600"
      >
        Access Granted
      </motion.div>
    </div>
  );
}

// Nature Theme
function NatureEnvelope() {
  return (
    <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-2xl">
      <Leaf className="h-24 w-24 text-green-600" strokeWidth={1.5} />
      <motion.div
        className="absolute top-8 left-8"
        animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Leaf className="h-8 w-8 text-green-500/40" />
      </motion.div>
    </div>
  );
}

function NatureReveal({ recipientName, openingMessage }: { recipientName: string; openingMessage?: string }) {
  return (
    <div className="max-w-md">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-3 text-sm font-medium tracking-wide text-green-700"
      >
        ✨ Special Invitation
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-2 text-3xl font-bold text-green-900"
      >
        {recipientName}
      </motion.div>
      {openingMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm italic text-green-700"
        >
          {openingMessage}
        </motion.p>
      )}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="mt-4 inline-block text-2xl"
      >
        🌿
      </motion.div>
    </div>
  );
}

// Party Theme
function PartyEnvelope() {
  return (
    <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 to-purple-300 shadow-2xl">
      <Music className="h-24 w-24 text-purple-600" strokeWidth={1.5} />
      <motion.div
        className="absolute top-12 right-12"
        animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Music className="h-6 w-6 text-pink-500" />
      </motion.div>
    </div>
  );
}

function PartyReveal({ recipientName, openingMessage }: { recipientName: string; openingMessage?: string }) {
  return (
    <div className="max-w-md">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="mb-3 text-sm font-bold uppercase tracking-widest text-purple-600"
      >
        🎉 You're Invited
      </motion.div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-2 text-3xl font-bold text-purple-900"
      >
        {recipientName}
      </motion.div>
      {openingMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm italic text-purple-700"
        >
          {openingMessage}
        </motion.p>
      )}
      <motion.div
        className="mt-4 flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {['🎵', '✨', '💫'].map((emoji, i) => (
          <motion.span
            key={i}
            initial={{ y: 0 }}
            animate={{ y: [-5, 0, -5] }}
            transition={{ delay: 0.6 + i * 0.1, duration: 1, repeat: Infinity }}
            className="text-xl"
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

// After Dark Theme
function AfterDarkEnvelope() {
  return (
    <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 shadow-2xl">
      <Moon className="h-24 w-24 text-purple-300" strokeWidth={1.5} />
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ boxShadow: ['0 0 20px rgba(168, 85, 247, 0.3)', '0 0 40px rgba(168, 85, 247, 0.6)', '0 0 20px rgba(168, 85, 247, 0.3)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

function AfterDarkReveal({ recipientName, openingMessage }: { recipientName: string; openingMessage?: string }) {
  return (
    <div className="max-w-md">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-3 text-sm font-medium tracking-wide text-purple-400"
      >
        Private Invitation
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-2 text-3xl font-bold text-white"
      >
        {recipientName}
      </motion.div>
      {openingMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm italic text-purple-200"
        >
          {openingMessage}
        </motion.p>
      )}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.5, times: [0, 0.6, 1], duration: 0.6 }}
        className="mt-4 inline-block text-2xl"
      >
        ✨
      </motion.div>
    </div>
  );
}
