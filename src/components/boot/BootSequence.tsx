import React, { useState, useEffect, useCallback } from 'react';
import {
  playLoginSound,
  playStartupChime,
  playBootLoadingSound,
  cancelPendingStartupChime,
  unlockAudioContext,
  isAudioUnlocked,
  onAudioUnlocked,
  resumeAudio,
} from '../../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

type BootPhase =
  | 'bios'             // Stage 1: BIOS and recovery console startup
  | 'bootloader'       // Stage 2: Black screen, particles emerging and swirling
  | 'starting_windows' // Stage 3: Windows logo converged with "Starting Windows"
  | 'welcome_loading'  // Stage 4: Transition to Aero blue screen with loading ring
  | 'login'            // Stage 5: Windows 7 Administrator Login tile
  | 'desktop_loading'; // Stage 6: "Welcome" -> "Preparing your desktop..." -> Desktop

const biosLines = [
  '[ 0.000000] BIOS: ROM Revision 4.1.2',
  '[ 0.012451] CPU: Intel 8086 @ 4.77MHz Detected',
  '[ 0.150992] MEMORY: 640KB Conventional Memory OK',
  '[ 0.320011] DMA: Controller Initialized',
  '[ 0.450122] IRQ: Standard Table Loaded',
  '[ 0.609887] KEYBOARD: PS/2 Controller Active',
  '[ 0.823344] DISK: Drive C: Found (20MB HDD)',
  '[ 1.102345] BOOT: Loading Sector 0 from Drive C...',
  '[ 1.560293] KERNEL: Initializing VFS...',
  '[ 2.100456] KERNEL: Mounting root filesystem...',
  '[ 2.450912] DRIVER: Loading VGA.SYS... OK',
  '[ 3.120485] DRIVER: Loading NET.SYS... FAILED',
  '[ 3.890332] SYSTEM: Starting Legacy Shell v1.0.4',
  '[ 4.500221] USER: root logged in...',
  'C:\\> sys_check --verbose',
  'Scanning local segments...',
  'Sector 0xFF12: [BAD CLUSTER]',
  'Sector 0xFF13: [CLEAN]',
  'Sector 0xFF14: [CLEAN]',
  'Sector 0xFF15: [CLEAN]',
  'Recovery in progress... 100%',
  'C:\\>',
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<BootPhase>('bios');
  const [biosLineCount, setBiosLineCount] = useState(1);
  const [welcomeText, setWelcomeText] = useState('Welcome');
  const [soundEnabled, setSoundEnabled] = useState(() => isAudioUnlocked());

  // Initialize global audio unlock listeners immediately
  useEffect(() => {
    unlockAudioContext();
  }, []);

  // Update soundEnabled state when audio is unlocked anywhere
  useEffect(() => {
    return onAudioUnlocked(() => {
      setSoundEnabled(true);
    });
  }, []);

  const finishBoot = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Stage 1: BIOS scrolling naturally without any skip buttons
  useEffect(() => {
    if (phase !== 'bios') return;

    const timer = setInterval(() => {
      setBiosLineCount((count) => {
        if (count >= biosLines.length) {
          clearInterval(timer);
          setPhase('bootloader');
          return count;
        }
        return count + 1;
      });
    }, 130);

    return () => clearInterval(timer);
  }, [phase]);

  // Stage 2 (Bootloader particles swirling): Play the boot loading orbital shimmer
  useEffect(() => {
    if (phase === 'bootloader') {
      playBootLoadingSound();
      const timer = setTimeout(() => {
        setPhase('starting_windows');
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Stage 3 ("Starting Windows"): Play authentic 4-chord Windows 7 startup chime
  useEffect(() => {
    if (phase === 'starting_windows') {
      playStartupChime();
      const timer = setTimeout(() => {
        setPhase('welcome_loading');
      }, 2800);
      return () => {
        clearTimeout(timer);
        // CRITICAL: Clean up any deferred startup chime so it NEVER leaks into login or desktop
        cancelPendingStartupChime();
      };
    }
  }, [phase]);

  // Stage 4 (Welcome Loading) -> Stage 5 (Administrator Login) after 1.4s
  useEffect(() => {
    if (phase === 'welcome_loading') {
      cancelPendingStartupChime();
      const timer = setTimeout(() => {
        setPhase('login');
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Handle Login submission: User clicks "Log on" or presses Enter -> Desktop
  const handleLoginSubmit = useCallback((e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (phase !== 'login') return;

    // Explicitly guarantee no startup chime plays on login
    cancelPendingStartupChime();
    resumeAudio().catch(() => {});
    playLoginSound();
    setPhase('desktop_loading');
    setWelcomeText('Welcome');

    // Welcome -> Preparing desktop -> Desktop
    const t1 = setTimeout(() => {
      setWelcomeText('Preparing your desktop...');
      const t2 = setTimeout(() => {
        finishBoot();
      }, 1200);
      return () => clearTimeout(t2);
    }, 1200);

    return () => clearTimeout(t1);
  }, [phase, finishBoot]);

  // Allow pressing Enter key to submit login
  useEffect(() => {
    if (phase !== 'login') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleLoginSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, handleLoginSubmit]);

  const handleScreenClick = () => {
    resumeAudio()
      .then((unlocked) => {
        if (!unlocked) return;
        setSoundEnabled(true);
        if (phase === 'bootloader') {
          playBootLoadingSound();
        } else if (phase === 'starting_windows') {
          playStartupChime();
        }
      })
      .catch(() => {});
  };

  return (
    <div
      onClick={handleScreenClick}
      className="fixed inset-0 z-[999999] bg-black text-white select-none overflow-hidden flex flex-col font-sans cursor-default"
    >
      {/* =========================================================================
          AUDIO INDICATOR BADGE (Subtle top-right pill if browser blocked autoplay)
          ========================================================================= */}
      {!soundEnabled && (phase === 'bios' || phase === 'bootloader' || phase === 'starting_windows') && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleScreenClick();
          }}
          className="absolute top-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-xs text-sky-200 backdrop-blur-md shadow-lg cursor-pointer transition-all animate-pulse"
        >
          <span>🔊</span>
          <span className="font-medium">Click for sound</span>
        </div>
      )}

      {/* =========================================================================
          STAGE 1: BIOS-STYLE STARTUP CONSOLE (Clean, retro, no skip button)
          ========================================================================= */}
      {phase === 'bios' && (
        <div className="flex-1 overflow-hidden bg-black px-5 py-4 font-mono text-[10px] leading-[1.55] text-[#e8e8e8] sm:px-12 sm:py-6 sm:text-xs">
          {biosLines.slice(0, biosLineCount).map((line, index) => (
            <div key={`${line}-${index}`} className="whitespace-pre">
              {line}
            </div>
          ))}
          <span className="inline-block h-3 w-2 animate-pulse bg-[#e8e8e8] align-middle" />
        </div>
      )}

      {/* =========================================================================
          STAGE 2 & STAGE 3: BOOTLOADER PARTICLES & "STARTING WINDOWS"
          ========================================================================= */}
      {(phase === 'bootloader' || phase === 'starting_windows') && (
        <div className="flex-1 flex flex-col items-center justify-center relative bg-black transition-opacity duration-700">
          {/* Swirling 4 glowing light particles converging into Windows flag logo */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Top-Left Red Particle */}
            <div
              className={`absolute w-7 h-7 rounded-sm transform rotate-3 bg-[#e81123] shadow-[0_0_24px_#ef4444] transition-all duration-1000 ease-out ${
                phase === 'bootloader'
                  ? '-translate-x-12 -translate-y-12 scale-90 opacity-75 animate-pulse'
                  : '-translate-x-3.5 -translate-y-3.5 scale-100 opacity-95 shadow-[0_0_18px_#f87171]'
              }`}
            />

            {/* Top-Right Green Particle */}
            <div
              className={`absolute w-7 h-7 rounded-sm transform rotate-3 bg-[#107c41] shadow-[0_0_24px_#10b981] transition-all duration-1000 ease-out ${
                phase === 'bootloader'
                  ? 'translate-x-12 -translate-y-12 scale-90 opacity-75 animate-pulse'
                  : 'translate-x-3.5 -translate-y-3.5 scale-100 opacity-95 shadow-[0_0_18px_#34d399]'
              }`}
              style={{ animationDelay: '0.25s' }}
            />

            {/* Bottom-Left Blue Particle */}
            <div
              className={`absolute w-7 h-7 rounded-sm transform rotate-3 bg-[#0078d7] shadow-[0_0_24px_#38bdf8] transition-all duration-1000 ease-out ${
                phase === 'bootloader'
                  ? '-translate-x-12 translate-y-12 scale-90 opacity-75 animate-pulse'
                  : '-translate-x-3.5 translate-y-3.5 scale-100 opacity-95 shadow-[0_0_18px_#60a5fa]'
              }`}
              style={{ animationDelay: '0.5s' }}
            />

            {/* Bottom-Right Yellow Particle */}
            <div
              className={`absolute w-7 h-7 rounded-sm transform rotate-3 bg-[#ffb900] shadow-[0_0_24px_#facc15] transition-all duration-1000 ease-out ${
                phase === 'bootloader'
                  ? 'translate-x-12 translate-y-12 scale-90 opacity-75 animate-pulse'
                  : 'translate-x-3.5 translate-y-3.5 scale-100 opacity-95 shadow-[0_0_18px_#fde047]'
              }`}
              style={{ animationDelay: '0.75s' }}
            />

            {/* Radiant central logo sheen when converged */}
            {phase === 'starting_windows' && (
              <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in-75 duration-700 pointer-events-none">
                <div className="w-24 h-24 rounded-full bg-white/20 filter blur-lg animate-pulse" />
              </div>
            )}
          </div>

          {/* "Starting Windows" Text with authentic typography */}
          <div className="mt-8 text-center min-h-[3rem]">
            {phase === 'starting_windows' && (
              <h2
                className="text-xl sm:text-2xl text-gray-200 tracking-wider font-light drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] animate-in fade-in duration-500 font-sans"
                style={{ fontFamily: '"Segoe UI Light", "Segoe UI", sans-serif' }}
              >
                Starting Windows
              </h2>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          STAGE 4, STAGE 5, STAGE 6: AERO BLUE WELCOME & ADMINISTRATOR LOGIN
          ========================================================================= */}
      {(phase === 'welcome_loading' || phase === 'login' || phase === 'desktop_loading') && (
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#1b5898] via-[#0b3366] to-[#041a38] font-sans animate-in fade-in duration-500">
          {/* Authentic Aero Background Light Rays & Bokeh */}
          <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden">
            <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-sky-300 filter blur-3xl opacity-60" />
            <div className="absolute bottom-0 right-10 w-[650px] h-[450px] rounded-full bg-blue-400/30 filter blur-3xl" />
            <svg className="w-full h-full opacity-40" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <path d="M0,350 C300,550 700,250 1000,480 L1000,1000 L0,1000 Z" fill="url(#aeroRayLogin)" />
              <defs>
                <linearGradient id="aeroRayLogin" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="z-10 flex flex-col items-center max-w-sm text-center px-4">
            {/* User Avatar Tile (Framed with authentic Windows 7 glass border) */}
            <div
              className={`mb-4 relative group ${phase === 'login' ? 'cursor-pointer transform hover:scale-105 transition-transform' : ''}`}
              onClick={phase === 'login' ? handleLoginSubmit : undefined}
              title={phase === 'login' ? 'Click to Log on' : undefined}
            >
              <div className="p-1 rounded-lg bg-gradient-to-b from-white/80 via-white/40 to-white/60 shadow-2xl backdrop-blur-sm border border-white/70">
                <img
                  src="/images/profile/vedant-borude.jpg"
                  alt="Vedant Borude"
                  className="h-24 w-24 rounded border border-black/20 object-cover"
                />
              </div>
            </div>

            {/* Administrator / User Name */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] tracking-wide">
              Vedant Borude
            </h1>
            <p className="text-xs text-sky-200 drop-shadow mb-5 font-medium tracking-wide">
              Administrator
            </p>

            {/* STAGE 4: WELCOME SCREEN LOADING */}
            {phase === 'welcome_loading' && (
              <div className="flex flex-col items-center space-y-3 animate-in fade-in duration-300">
                <div className="w-8 h-8 rounded-full border-3 border-sky-400 border-t-transparent animate-spin" />
                <div className="text-white text-sm font-medium drop-shadow-md">
                  Please wait...
                </div>
              </div>
            )}

            {/* STAGE 5: DEDICATED WINDOWS 7 LOGON BUTTON (No password box, waits for click) */}
            {phase === 'login' && (
              <div className="flex flex-col items-center space-y-3 animate-in fade-in duration-400">
                <button
                  type="button"
                  onClick={handleLoginSubmit}
                  className="group flex items-center gap-2.5 px-6 py-2 rounded-lg bg-gradient-to-b from-white/30 via-white/15 to-white/20 hover:from-white/40 hover:via-white/25 hover:to-white/30 active:scale-95 border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.35)] backdrop-blur-md text-white font-medium text-sm transition-all cursor-pointer"
                >
                  <span>Log on</span>
                  <span className="w-5 h-5 rounded-full bg-sky-400/40 border border-white/50 flex items-center justify-center text-xs transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </button>
              </div>
            )}

            {/* STAGE 6: DESKTOP PREPARATION ANIMATION */}
            {phase === 'desktop_loading' && (
              <div className="flex flex-col items-center space-y-3 animate-in fade-in duration-300 mt-1">
                {/* Windows 7 Circular Loading Ring */}
                <div className="w-8 h-8 rounded-full border-3 border-sky-400 border-t-transparent animate-spin" />
                <div className="text-white text-sm font-medium drop-shadow-md">
                  {welcomeText}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Windows 7 Ultimate Branding */}
          <div className="absolute bottom-6 text-center text-xs text-sky-200/70 font-sans tracking-wide">
            Windows 7 Ultimate &bull; Vedant Borude Developer Workstation
          </div>
        </div>
      )}
    </div>
  );
};
