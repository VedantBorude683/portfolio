/**
 * WebAudio Synthesizer for Windows 7 Aero Experience
 * Generates an original, gentle startup chime and OS feedback sounds without using any copyrighted audio files.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;

export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

/**
 * Unlock the AudioContext on the very first user gesture (mousemove, click, keydown, touchstart).
 * Call this as early as possible during the boot sequence so sounds fire on time.
 */
export const unlockAudioContext = (): void => {
  const unlock = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    ['mousemove', 'mousedown', 'keydown', 'touchstart'].forEach((evt) => {
      window.removeEventListener(evt, unlock);
    });
  };
  ['mousemove', 'mousedown', 'keydown', 'touchstart'].forEach((evt) => {
    window.addEventListener(evt, unlock, { once: true, passive: true });
  });
};

export const getMutedState = (): boolean => isMuted;

export const setMutedState = (muted: boolean): boolean => {
  isMuted = muted;
  if (!muted) {
    getAudioContext();
  }
  return isMuted;
};

export const toggleMute = (): boolean => {
  return setMutedState(!isMuted);
};

const playToneSequence = (
  notes: Array<{ frequency: number; delay: number; duration: number }>,
  wave: OscillatorType = 'sine',
  volume = 0.08,
) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const start = ctx.currentTime;
  notes.forEach(({ frequency, delay, duration }) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const noteStart = start + delay;
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(frequency, noteStart);
    gain.gain.setValueAtTime(0.0001, noteStart);
    gain.gain.exponentialRampToValueAtTime(volume, noteStart + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(noteStart);
    oscillator.stop(noteStart + duration + 0.02);
  });
};

/**
 * Original synthesized harmonic startup chime
 * Warm, shimmering 4-chord bell chime with soft envelope
 */
export const playStartupChime = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // A gentle major 9th progression: Eb4, G4, Bb4, D5, F5
  const frequencies = [311.13, 392.00, 466.16, 587.33, 698.46, 932.33];
  
  // Master gain
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.0001, now);
  masterGain.gain.exponentialRampToValueAtTime(0.35, now + 0.3);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
  masterGain.connect(ctx.destination);

  frequencies.forEach((freq, index) => {
    const delay = index * 0.12;
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = index % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now + delay);

    // Warm subtle vibrato
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(4.5, now);
    lfoGain.gain.setValueAtTime(1.5, now);
    lfo.connect(osc.frequency);
    lfo.start(now + delay);
    lfo.stop(now + delay + 3.5);

    oscGain.gain.setValueAtTime(0.0001, now + delay);
    oscGain.gain.exponentialRampToValueAtTime(0.25 / (index * 0.4 + 1), now + delay + 0.15);
    oscGain.gain.exponentialRampToValueAtTime(0.00001, now + delay + 3.2);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    osc.start(now + delay);
    osc.stop(now + delay + 3.5);
  });
};

export const playLoginSound = () => {
  playToneSequence([
    { frequency: 392, delay: 0, duration: 0.24 },
    { frequency: 523.25, delay: 0.12, duration: 0.3 },
    { frequency: 659.25, delay: 0.24, duration: 0.5 },
  ], 'triangle', 0.1);
};

export const playShutdownSound = () => {
  playToneSequence([
    { frequency: 659.25, delay: 0, duration: 0.22 },
    { frequency: 523.25, delay: 0.14, duration: 0.22 },
    { frequency: 392, delay: 0.28, duration: 0.5 },
  ], 'sine', 0.09);
};

export const playNotificationSound = () => {
  playToneSequence([
    { frequency: 784, delay: 0, duration: 0.1 },
    { frequency: 1046.5, delay: 0.1, duration: 0.18 },
  ], 'sine', 0.07);
};

export const playErrorSound = () => {
  playToneSequence([
    { frequency: 220, delay: 0, duration: 0.16 },
    { frequency: 164.81, delay: 0.12, duration: 0.24 },
  ], 'square', 0.045);
};

export const playRestoreSound = () => {
  playToneSequence([
    { frequency: 440, delay: 0, duration: 0.08 },
    { frequency: 659.25, delay: 0.07, duration: 0.14 },
  ], 'triangle', 0.065);
};

export const playDeviceConnectSound = () => {
  playToneSequence([
    { frequency: 523.25, delay: 0, duration: 0.1 },
    { frequency: 783.99, delay: 0.09, duration: 0.18 },
  ], 'triangle', 0.07);
};

export const playDeviceDisconnectSound = () => {
  playToneSequence([
    { frequency: 783.99, delay: 0, duration: 0.1 },
    { frequency: 523.25, delay: 0.09, duration: 0.18 },
  ], 'triangle', 0.07);
};

/**
 * Click / Navigation tick sound
 */
export const playClickSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
};

export const playMenuSound = () => {
  playToneSequence([{ frequency: 740, delay: 0, duration: 0.045 }], 'sine', 0.045);
};

/**
 * Window open / pop sound
 */
export const playOpenSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(520, now);
  osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.13);
};

/**
 * Recycle empty / trash sound
 */
export const playTrashSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // White noise burst
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1000, now);
  filter.frequency.exponentialRampToValueAtTime(300, now + 0.15);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.16);
};

/**
 * Subtle ambient loading pulse sound — plays soft rhythmic "heartbeat" tones
 * during the Windows boot/loading phases.
 */
let _loadingPulseTimeout: ReturnType<typeof setTimeout> | null = null;
let _loadingActive = false;

export const playLoadingSound = (): void => {
  if (isMuted) return;
  _loadingActive = true;

  const pulse = () => {
    if (!_loadingActive) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Low warm rumble (bass pulse)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(60, now);
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.07, now + 0.12);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.65);

    // Higher shimmer tone (airy glint)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(520, now + 0.05);
    osc2.frequency.exponentialRampToValueAtTime(420, now + 0.4);
    gain2.gain.setValueAtTime(0.0001, now + 0.05);
    gain2.gain.linearRampToValueAtTime(0.04, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.5);

    _loadingPulseTimeout = setTimeout(pulse, 900);
  };

  pulse();
};

export const stopLoadingSound = (): void => {
  _loadingActive = false;
  if (_loadingPulseTimeout !== null) {
    clearTimeout(_loadingPulseTimeout);
    _loadingPulseTimeout = null;
  }
};
