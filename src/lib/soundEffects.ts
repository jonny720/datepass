export type SoundEffectId =
  | 'off'
  | 'soft-pop'
  | 'tiny-boop'
  | 'sparkle'
  | 'soft-quack';

const MASTER_VOLUME = 0.08;
const SOUND_COOLDOWN_MS = 500;

let lastSoundAt = 0;

type ToneStep = {
  frequency: number;
  start: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  slideTo?: number;
};

function getAudioContext(): AudioContext | null {
  const AudioContextCtor = window.AudioContext || (window as Window & {
    webkitAudioContext?: typeof AudioContext;
  }).webkitAudioContext;
  if (!AudioContextCtor) return null;
  return new AudioContextCtor();
}

function playToneSequence(steps: ToneStep[]): void {
  const context = getAudioContext();
  if (!context) return;

  steps.forEach((step) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startAt = context.currentTime + step.start;
    const endAt = startAt + step.duration;
    const volume = MASTER_VOLUME * (step.volume ?? 1);

    oscillator.type = step.type || 'sine';
    oscillator.frequency.setValueAtTime(step.frequency, startAt);
    if (step.slideTo) {
      oscillator.frequency.exponentialRampToValueAtTime(step.slideTo, endAt);
    }

    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, endAt);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startAt);
    oscillator.stop(endAt + 0.02);
  });

  window.setTimeout(() => {
    void context.close();
  }, 700);
}

export function playSoundEffect(effect: SoundEffectId): void {
  if (effect === 'off') return;

  const now = Date.now();
  if (now - lastSoundAt < SOUND_COOLDOWN_MS) return;
  lastSoundAt = now;

  try {
    switch (effect) {
      case 'soft-pop':
        playToneSequence([
          { frequency: 180, slideTo: 420, start: 0, duration: 0.07, type: 'sine', volume: 0.75 },
          { frequency: 520, slideTo: 240, start: 0.045, duration: 0.08, type: 'triangle', volume: 0.45 },
        ]);
        break;
      case 'tiny-boop':
        playToneSequence([
          { frequency: 420, slideTo: 740, start: 0, duration: 0.1, type: 'sine', volume: 0.7 },
        ]);
        break;
      case 'sparkle':
        playToneSequence([
          { frequency: 980, start: 0, duration: 0.055, type: 'sine', volume: 0.35 },
          { frequency: 1320, start: 0.06, duration: 0.055, type: 'sine', volume: 0.3 },
          { frequency: 1760, start: 0.12, duration: 0.06, type: 'triangle', volume: 0.25 },
        ]);
        break;
      case 'soft-quack':
        playToneSequence([
          { frequency: 420, slideTo: 340, start: 0, duration: 0.09, type: 'square', volume: 0.35 },
          { frequency: 360, slideTo: 300, start: 0.085, duration: 0.11, type: 'square', volume: 0.3 },
        ]);
        break;
    }
  } catch {
    // Sound is optional. Unsupported or blocked audio should never break the app.
  }
}
