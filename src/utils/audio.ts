/**
 * WebAudio Synthesizer for Windows 7 Aero Experience
 * Generates an original, gentle startup chime and OS feedback sounds without using any copyrighted audio files.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;
let hasStartupChimePlayed = false;
let unlockListenersAttached = false;
let unlockCallbacks: Array<() => void> = [];

export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
};

export const isAudioUnlocked = (): boolean => {
  return !!audioCtx && audioCtx.state === 'running';
};

/**
 * Register a callback to be called as soon as the AudioContext is running.
 */
export const onAudioUnlocked = (cb: () => void): (() => void) => {
  if (audioCtx && audioCtx.state === 'running') {
    cb();
    return () => {};
  }
  unlockCallbacks.push(cb);
  return () => {
    unlockCallbacks = unlockCallbacks.filter((c) => c !== cb);
  };
};

/**
 * Unlock the AudioContext on the first genuine user gesture (pointerdown, mousedown, keydown, touchstart).
 */
export const unlockAudioContext = (): void => {
  if (typeof window === 'undefined') return;
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'running') return;
  if (unlockListenersAttached) return;

  const validEvents = ['pointerdown', 'mousedown', 'keydown', 'touchstart'];

  const notifyUnlocked = () => {
    validEvents.forEach((evt) => {
      window.removeEventListener(evt, handleUserGesture);
    });
    unlockListenersAttached = false;
    const callbacks = [...unlockCallbacks];
    unlockCallbacks = [];
    callbacks.forEach((cb) => {
      try {
        cb();
      } catch (err) {
        console.error('Audio unlock callback error:', err);
      }
    });
  };

  const handleUserGesture = () => {
    const context = getAudioContext();
    if (!context) return;

    if (context.state === 'suspended') {
      context
        .resume()
        .then(() => {
          if (context.state === 'running') {
            notifyUnlocked();
          }
        })
        .catch(() => {});
    } else if (context.state === 'running') {
      notifyUnlocked();
    }
  };

  unlockListenersAttached = true;
  validEvents.forEach((evt) => {
    window.addEventListener(evt, handleUserGesture, { passive: true });
  });
};

/**
 * Explicitly attempt to resume the AudioContext (e.g. from an onClick or onKeyDown handler).
 */
export const resumeAudio = async (): Promise<boolean> => {
  const ctx = getAudioContext();
  if (!ctx) return false;
  if (ctx.state === 'running') return true;
  try {
    await ctx.resume();
    if (ctx.state === 'running') {
      const callbacks = [...unlockCallbacks];
      unlockCallbacks = [];
      callbacks.forEach((cb) => cb());
      return true;
    }
  } catch {}
  return false;
};

export const getMutedState = (): boolean => isMuted;

export const setMutedState = (muted: boolean): boolean => {
  isMuted = muted;
  if (!muted) {
    resumeAudio().catch(() => {});
  }
  return isMuted;
};

export const toggleMute = (): boolean => {
  return setMutedState(!isMuted);
};

export const resetStartupChime = (): void => {
  hasStartupChimePlayed = false;
};

/**
 * Authentic PC BIOS POST beep (short single 820Hz tone)
 */
export const playBiosBeep = (): void => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const playTone = (c: AudioContext) => {
    const now = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(820, now);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  };

  if (ctx.state === 'running') {
    playTone(ctx);
  } else {
    ctx
      .resume()
      .then(() => {
        if (ctx.state === 'running') {
          playTone(ctx);
        }
      })
      .catch(() => {});
  }
};

/**
 * Shimmering orbital chime sound when the 4 glowing particles swirl during boot loading.
 * Subtle, cinematic, and airy.
 */
export const playBootLoadingSound = (): void => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.linearRampToValueAtTime(0.22, now + 0.3);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
  master.connect(ctx.destination);

  // Soft filtered ethereal sweep
  const bufferSize = Math.floor(ctx.sampleRate * 1.8);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const sweepFilter = ctx.createBiquadFilter();
  sweepFilter.type = 'bandpass';
  sweepFilter.Q.value = 3.5;
  sweepFilter.frequency.setValueAtTime(350, now);
  sweepFilter.frequency.exponentialRampToValueAtTime(1400, now + 1.6);
  const sweepGain = ctx.createGain();
  sweepGain.gain.setValueAtTime(0.0001, now);
  sweepGain.gain.linearRampToValueAtTime(0.06, now + 0.4);
  sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
  noise.connect(sweepFilter);
  sweepFilter.connect(sweepGain);
  sweepGain.connect(master);
  noise.start(now);
  noise.stop(now + 1.9);

  // 4 delicate crystalline glissando pings as the 4 particles emerge
  const particleTones = [
    { freq: 523.25, delay: 0.0 },  // C5 (Red)
    { freq: 659.25, delay: 0.28 }, // E5 (Green)
    { freq: 783.99, delay: 0.56 }, // G5 (Blue)
    { freq: 1046.5, delay: 0.84 }, // C6 (Yellow)
  ];

  particleTones.forEach(({ freq, delay }) => {
    const t = now + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.04, t + 0.35);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.07, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.00001, t + 0.7);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t);
    osc.stop(t + 0.75);
  });
};

/**
 * Synthesizes an acoustic-style tubular bell/chime note with rich harmonics and natural decay.
 */
const playBellTone = (
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  startTime: number,
  duration: number,
  volume: number,
  detune = 1.2,
) => {
  // Primary oscillator (pure sine body)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, startTime);

  // Secondary slightly detuned oscillator (creates authentic warm shimmering acoustic beating)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq + detune, startTime);

  // Triangle overtone (warm bell body)
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  osc3.type = 'triangle';
  osc3.frequency.setValueAtTime(freq, startTime);

  // Envelopes: smooth fast attack to prevent clicks, followed by exponential bell decay
  const attack = 0.016;
  gain1.gain.setValueAtTime(0.0001, startTime);
  gain1.gain.linearRampToValueAtTime(volume * 0.7, startTime + attack);
  gain1.gain.exponentialRampToValueAtTime(0.00005, startTime + duration);

  gain2.gain.setValueAtTime(0.0001, startTime);
  gain2.gain.linearRampToValueAtTime(volume * 0.4, startTime + attack);
  gain2.gain.exponentialRampToValueAtTime(0.00005, startTime + duration);

  gain3.gain.setValueAtTime(0.0001, startTime);
  gain3.gain.linearRampToValueAtTime(volume * 0.16, startTime + attack);
  gain3.gain.exponentialRampToValueAtTime(0.00005, startTime + duration * 0.7);

  osc1.connect(gain1);
  osc2.connect(gain2);
  osc3.connect(gain3);

  gain1.connect(dest);
  gain2.connect(dest);
  gain3.connect(dest);

  osc1.start(startTime);
  osc2.start(startTime);
  osc3.start(startTime);

  osc1.stop(startTime + duration + 0.05);
  osc2.stop(startTime + duration + 0.05);
  osc3.stop(startTime + duration + 0.05);
};

/**
 * Authentic Windows 7 Startup Chime
 * Recreates the famous 4-chord orchestral bell progression composed for Windows 7:
 * Chord 1: Eb3 / G4 / Bb4 / Eb5 (Warm introduction)
 * Chord 2: F3 / Bb4 / D5 / F5   (Ascending lift)
 * Chord 3: G3 / Bb4 / Eb5 / G5  (Resonant bloom)
 * Chord 4: Eb2 / Eb3 / Eb4 / Bb4 / Eb5 / G5 / Bb5 / Eb6 (Grand Resolving Chime with long lush reverb tail)
 */
const executeStartupChime = (ctx: AudioContext): void => {
  const now = ctx.currentTime;

  // Master warm bus with soft lowpass to round off digital harshness
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(4800, now);

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.0001, now);
  masterGain.gain.linearRampToValueAtTime(0.9, now + 0.12);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.9);

  filter.connect(masterGain);
  masterGain.connect(ctx.destination);

  // ==========================================
  // CHORD 1: Warm introduction (~0.00s)
  // ==========================================
  const t1 = now;
  playBellTone(ctx, filter, 155.56, t1, 2.0, 0.22, 0.4); // Eb3 bass fundamental
  playBellTone(ctx, filter, 311.13, t1, 1.8, 0.2, 0.8);  // Eb4
  playBellTone(ctx, filter, 392.0, t1 + 0.03, 1.8, 0.18, 1.0); // G4
  playBellTone(ctx, filter, 466.16, t1 + 0.06, 1.9, 0.16, 1.2); // Bb4
  playBellTone(ctx, filter, 622.25, t1 + 0.08, 1.6, 0.12, 1.5); // Eb5 (glass shimmer)

  // ==========================================
  // CHORD 2: Ascending harmonic shift (~0.44s)
  // ==========================================
  const t2 = now + 0.44;
  playBellTone(ctx, filter, 174.61, t2, 1.8, 0.2, 0.5);  // F3 bass
  playBellTone(ctx, filter, 349.23, t2, 1.7, 0.18, 0.9); // F4
  playBellTone(ctx, filter, 466.16, t2 + 0.02, 1.8, 0.16, 1.1); // Bb4
  playBellTone(ctx, filter, 587.33, t2 + 0.05, 1.9, 0.15, 1.3); // D5
  playBellTone(ctx, filter, 698.46, t2 + 0.08, 1.6, 0.12, 1.6); // F5

  // ==========================================
  // CHORD 3: Resonant bloom (~0.92s)
  // ==========================================
  const t3 = now + 0.92;
  playBellTone(ctx, filter, 196.0, t3, 1.9, 0.22, 0.5);  // G3 bass
  playBellTone(ctx, filter, 392.0, t3, 1.8, 0.18, 0.9);  // G4
  playBellTone(ctx, filter, 466.16, t3 + 0.02, 1.9, 0.16, 1.1); // Bb4
  playBellTone(ctx, filter, 622.25, t3 + 0.05, 2.0, 0.17, 1.4); // Eb5
  playBellTone(ctx, filter, 783.99, t3 + 0.07, 1.8, 0.13, 1.8); // G5

  // ==========================================
  // CHORD 4: Grand Resolving Chime (~1.42s)
  // Full Eb major 9th chord with deep sub-bass and crystalline shimmer tail
  // ==========================================
  const t4 = now + 1.42;
  playBellTone(ctx, filter, 77.78, t4, 3.8, 0.28, 0.3);  // Eb2 Sub-bass warmth
  playBellTone(ctx, filter, 155.56, t4, 3.6, 0.24, 0.5); // Eb3
  playBellTone(ctx, filter, 311.13, t4, 3.4, 0.22, 0.7); // Eb4
  playBellTone(ctx, filter, 466.16, t4 + 0.02, 3.5, 0.2, 1.0); // Bb4
  playBellTone(ctx, filter, 622.25, t4 + 0.04, 3.6, 0.22, 1.2); // Eb5
  playBellTone(ctx, filter, 783.99, t4 + 0.06, 3.4, 0.18, 1.5); // G5
  playBellTone(ctx, filter, 932.33, t4 + 0.08, 3.2, 0.15, 1.8); // Bb5
  playBellTone(ctx, filter, 1244.51, t4 + 0.1, 2.8, 0.09, 2.0); // Eb6 crystalline top shimmer
};

/**
 * Original synthesized harmonic startup chime
 * Plays once at "Starting Windows" or on first user activation.
 * Guarantees that multiple calls or delayed resumes never stack or repeat.
 */
export const playStartupChime = (force = false): boolean => {
  if (isMuted) return false;
  if (hasStartupChimePlayed && !force) return false;

  const ctx = getAudioContext();
  if (!ctx) return false;

  if (ctx.state === 'running') {
    hasStartupChimePlayed = true;
    executeStartupChime(ctx);
    return true;
  }

  // If suspended, try resuming in case this was called from a user gesture
  ctx
    .resume()
    .then(() => {
      if (ctx.state === 'running' && (!hasStartupChimePlayed || force)) {
        hasStartupChimePlayed = true;
        executeStartupChime(ctx);
      }
    })
    .catch(() => {});

  // Register clean one-time unlock hook so it plays cleanly on first real gesture
  const unsubscribe = onAudioUnlocked(() => {
    if (!hasStartupChimePlayed || force) {
      hasStartupChimePlayed = true;
      const activeCtx = getAudioContext();
      if (activeCtx && activeCtx.state === 'running') {
        executeStartupChime(activeCtx);
      }
    }
    unsubscribe();
  });

  return false;
};

/**
 * Authentic Windows 7 Logon Chime (G4 -> C5 -> E5 -> G5)
 * Plays upon clicking the Log on button.
 */
export const playLoginSound = (): void => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.linearRampToValueAtTime(0.3, now + 0.04);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
  master.connect(ctx.destination);

  const notes = [
    { freq: 392.0, delay: 0.0, dur: 0.7, vol: 0.22 },   // G4
    { freq: 523.25, delay: 0.16, dur: 0.75, vol: 0.24 }, // C5
    { freq: 659.25, delay: 0.32, dur: 0.85, vol: 0.26 }, // E5
    { freq: 783.99, delay: 0.48, dur: 1.5, vol: 0.28 },  // G5
  ];

  notes.forEach(({ freq, delay, dur, vol }) => {
    const t = now + delay;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, t);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq + 1.2, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.00005, t + dur);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(master);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + dur + 0.05);
    osc2.stop(t + dur + 0.05);
  });
};

const playToneSequence = (
  notes: Array<{ frequency: number; delay: number; duration: number }>,
  wave: OscillatorType = 'sine',
  volume = 0.08,
) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

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

export const playShutdownSound = () => {
  playToneSequence(
    [
      { frequency: 659.25, delay: 0, duration: 0.22 },
      { frequency: 523.25, delay: 0.14, duration: 0.22 },
      { frequency: 392, delay: 0.28, duration: 0.5 },
    ],
    'sine',
    0.09,
  );
};

export const playNotificationSound = () => {
  playToneSequence(
    [
      { frequency: 784, delay: 0, duration: 0.1 },
      { frequency: 1046.5, delay: 0.1, duration: 0.18 },
    ],
    'sine',
    0.07,
  );
};

export const playErrorSound = () => {
  playToneSequence(
    [
      { frequency: 220, delay: 0, duration: 0.16 },
      { frequency: 164.81, delay: 0.12, duration: 0.24 },
    ],
    'square',
    0.045,
  );
};

export const playRestoreSound = () => {
  playToneSequence(
    [
      { frequency: 440, delay: 0, duration: 0.08 },
      { frequency: 659.25, delay: 0.07, duration: 0.14 },
    ],
    'triangle',
    0.065,
  );
};

export const playDeviceConnectSound = () => {
  playToneSequence(
    [
      { frequency: 523.25, delay: 0, duration: 0.1 },
      { frequency: 783.99, delay: 0.09, duration: 0.18 },
    ],
    'triangle',
    0.07,
  );
};

export const playDeviceDisconnectSound = () => {
  playToneSequence(
    [
      { frequency: 783.99, delay: 0, duration: 0.1 },
      { frequency: 523.25, delay: 0.09, duration: 0.18 },
    ],
    'triangle',
    0.07,
  );
};

/**
 * Click / Navigation tick sound
 */
export const playClickSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

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
  if (!ctx || ctx.state !== 'running') return;

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
  if (!ctx || ctx.state !== 'running') return;

  const now = ctx.currentTime;
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
 * Safe stubs for deprecated loading pulse sounds
 */
export const playLoadingSound = (): void => {};
export const stopLoadingSound = (): void => {};
