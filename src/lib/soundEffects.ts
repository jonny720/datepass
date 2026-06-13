function getAudioContext(): AudioContext | null {
  const AudioContextCtor = window.AudioContext || (window as Window & {
    webkitAudioContext?: typeof AudioContext;
  }).webkitAudioContext;
  if (!AudioContextCtor) return null;
  return new AudioContextCtor();
}

function playToneSequence(steps: Array<{ frequency: number; start: number; duration: number; type?: OscillatorType }>) {
  try {
    const context = getAudioContext();
    if (!context) return;

    steps.forEach((step) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startAt = context.currentTime + step.start;
      const endAt = startAt + step.duration;

      oscillator.type = step.type || 'sine';
      oscillator.frequency.setValueAtTime(step.frequency, startAt);
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(0.08, startAt + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, endAt);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startAt);
      oscillator.stop(endAt + 0.02);
    });

    window.setTimeout(() => {
      void context.close();
    }, 500);
  } catch {
    // Audio is a nice-to-have interaction. Ignore blocked or unsupported playback.
  }
}

export function playDuckQuack() {
  playToneSequence([
    { frequency: 520, start: 0, duration: 0.09, type: 'square' },
    { frequency: 360, start: 0.08, duration: 0.12, type: 'square' },
  ]);
}

export function playEggCrack() {
  playToneSequence([
    { frequency: 1800, start: 0, duration: 0.035, type: 'triangle' },
    { frequency: 900, start: 0.04, duration: 0.04, type: 'triangle' },
    { frequency: 1300, start: 0.085, duration: 0.03, type: 'triangle' },
  ]);
}
