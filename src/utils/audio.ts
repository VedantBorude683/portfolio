/**
 * WebAudio Synthesizer for Windows 7 Aero Experience
 * Generates an original, gentle startup chime and OS feedback sounds without using any copyrighted audio files.
 */

let audioCtx: AudioContext | null = null;
let isMuted = true; // Muted by default per user specification

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
