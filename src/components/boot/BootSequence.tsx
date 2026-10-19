import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, FastForward, ArrowRight } from 'lucide-react';
import { playStartupChime } from '../../utils/audio';
import { useWindowStore } from '../../store/windowStore';
import { UserAvatarIcon } from '../common/OSIcons';

interface BootSequenceProps {
  onComplete: () => void;
}

type BootPhase = 
  | 'bootloader'        // Stage 1: Black screen, particles emerging and swirling
  | 'starting_windows'  // Stage 2: Windows logo converged with "Starting Windows"
  | 'welcome_loading'   // Stage 3: Transition to Aero blue screen with loading ring
  | 'login'             // Stage 4: Windows 7 Administrator Login tile & password field
  | 'desktop_loading';  // Stage 5: "Welcome" -> "Preparing your desktop..." -> Desktop

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<BootPhase>('bootloader');
  const [passwordInput, setPasswordInput] = useState('');
  const [welcomeText, setWelcomeText] = useState('Welcome');
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const { isSoundMuted, toggleSound } = useWindowStore();

  const finishBoot = () => {
    playStartupChime();
    onComplete();
  };

  // Stage 1 (Bootloader particles) -> Stage 2 ("Starting Windows") after 2.4s
  useEffect(() => {
    if (phase === 'bootloader') {
      const timer = setTimeout(() => {
        setPhase('starting_windows');
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Stage 2 ("Starting Windows") -> Stage 3 (Welcome Screen Transition) after 2.8s
  useEffect(() => {
    if (phase === 'starting_windows') {
      const timer = setTimeout(() => {
        setPhase('welcome_loading');
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Stage 3 (Welcome Loading) -> Stage 4 (Administrator Login) after 1.8s
  useEffect(() => {
    if (phase === 'welcome_loading') {
      const timer = setTimeout(() => {
        setPhase('login');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Auto-focus password input when login stage activates
  useEffect(() => {
    if (phase === 'login') {
      const timer = setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Handle Login submission: Stage 4 -> Stage 5 ("Welcome" -> "Preparing your desktop...")
  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (phase !== 'login') return;

    setPhase('desktop_loading');
    setWelcomeText('Welcome');

    // Welcome -> Preparing desktop -> Transition to Desktop
    const t1 = setTimeout(() => {
      setWelcomeText('Preparing your desktop...');
      const t2 = setTimeout(() => {
        finishBoot();
      }, 1400);
      return () => clearTimeout(t2);
    }, 1400);

    return () => clearTimeout(t1);
  };

  // Keyboard skip listener: Escape key skips intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-[999999] bg-black text-white select-none overflow-hidden flex flex-col font-sans">
      {/* Top right quick controls: Sound toggle & Skip Intro button */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center space-x-2">
        <button
          onClick={toggleSound}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-black/40 hover:bg-black/60 text-xs text-white backdrop-blur border border-white/20 transition-all cursor-pointer shadow-md"
          title={isSoundMuted ? 'Unmute Audio Chime' : 'Mute Audio'}
          aria-label={isSoundMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isSoundMuted ? <VolumeX size={13} className="text-red-300" /> : <Volume2 size={13} className="text-emerald-400" />}
          <span className="hidden sm:inline">{isSoundMuted ? 'Sound: Muted' : 'Sound: Active'}</span>
        </button>

        <button
          onClick={finishBoot}
          className="flex items-center space-x-1.5 px-3 py-1 rounded bg-blue-600/90 hover:bg-blue-500 text-xs text-white font-medium backdrop-blur border border-blue-400/50 shadow-lg transition-all cursor-pointer active:scale-95"
          aria-label="Skip Boot Sequence"
          title="Skip straight to desktop (or press Esc)"
        >
          <span>Skip Intro</span>
          <FastForward size={13} />
        </button>
      </div>

      {/* =========================================================================
          STAGE 1 & STAGE 2: BOOTLOADER PARTICLES & "STARTING WINDOWS"
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

          <div className="absolute bottom-6 text-center text-[11px] text-gray-600 font-mono">
            Vedant Borude Simulation &bull; Press [Esc] to skip
          </div>
        </div>
      )}

      {/* =========================================================================
          STAGE 3, STAGE 4, STAGE 5: AERO BLUE WELCOME & ADMINISTRATOR LOGIN
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
            <div className="mb-4 relative group">
              <div className="p-1 rounded-lg bg-gradient-to-b from-white/80 via-white/40 to-white/60 shadow-2xl backdrop-blur-sm border border-white/70">
                <UserAvatarIcon size={96} className="rounded border border-black/20" />
              </div>
            </div>

            {/* Administrator / User Name */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] tracking-wide">
              Vedant Borude
            </h1>
            <p className="text-xs text-sky-200 drop-shadow mb-6 font-medium tracking-wide">
              Administrator
            </p>

            {/* STAGE 3: WELCOME SCREEN LOADING */}
            {phase === 'welcome_loading' && (
              <div className="flex flex-col items-center space-y-3 animate-in fade-in duration-300">
                <div className="w-8 h-8 rounded-full border-3 border-sky-400 border-t-transparent animate-spin" />
                <div className="text-white text-sm font-medium drop-shadow-md">
                  Please wait...
                </div>
              </div>
            )}

            {/* STAGE 4: ADMINISTRATOR LOGIN FORM */}
            {phase === 'login' && (
              <form
                onSubmit={handleLoginSubmit}
                className="flex flex-col items-center space-y-3 w-full animate-in fade-in duration-400"
              >
                <div className="flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded border border-white/50 shadow-inner w-60">
                  <input
                    ref={passwordInputRef}
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Password"
                    aria-label="Administrator Password"
                    className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-sky-200/70 placeholder:text-xs"
                  />
                  <button
                    type="submit"
                    className="w-7 h-7 rounded-full bg-gradient-to-b from-sky-400 via-blue-600 to-blue-700 hover:from-sky-300 hover:to-blue-500 text-white flex items-center justify-center text-xs shadow-md border border-white/60 transition-transform active:scale-95 cursor-pointer shrink-0"
                    title="Log on (or press Enter)"
                    aria-label="Log on"
                  >
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="text-[11px] text-sky-200/90 drop-shadow-sm font-normal">
                  Click <strong className="text-white font-bold">➔</strong> or press <strong className="text-white font-bold">Enter</strong> to log on
                </div>
              </form>
            )}

            {/* STAGE 5: DESKTOP PREPARATION ANIMATION */}
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
