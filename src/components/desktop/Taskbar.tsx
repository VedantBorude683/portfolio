import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Wifi, Flag, ChevronUp, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useWindowStore, WindowState } from '../../store/windowStore';
import { StartOrbIcon, AppIconRenderer } from '../common/OSIcons';
import { PORTFOLIO_DATA } from '../../data';

export const Taskbar: React.FC = () => {
  const {
    windows,
    activeWindowId,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    toggleStartMenu,
    isStartMenuOpen,
    isSoundMuted,
    toggleSound,
    showDesktop,
    openWindow,
  } = useWindowStore();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showClockModal, setShowClockModal] = useState(false);
  const [hoveredWindowId, setHoveredWindowId] = useState<string | null>(null);

  // Live Clock updater
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindowsList = Object.values(windows).filter((w) => w.isOpen);

  // Pinned apps shortcuts
  const pinnedApps = [
    {
      id: 'explorer-pinned',
      title: 'Windows Explorer',
      icon: 'folder' as const,
      component: 'explorer',
      params: { initialPath: 'C:\\Users\\Administrator' },
    },
    {
      id: 'browser-opera',
      title: 'Opera Web Browser',
      icon: 'browser_opera' as const,
      component: 'browser',
      params: { initialUrl: 'https://linkedin.com/in/vedant-borude-2b871a332', browserType: 'opera' },
    },
    {
      id: 'browser-ie',
      title: 'Internet Explorer',
      icon: 'browser_ie' as const,
      component: 'browser',
      params: { initialUrl: 'https://uber-eta-eight.vercel.app/', browserType: 'ie' },
    },
    {
      id: 'notepad-pinned',
      title: 'Notepad',
      icon: 'notepad' as const,
      component: 'notepad',
      params: { fileName: 'About Me.txt', content: PORTFOLIO_DATA.aboutMeDoc },
    },
    {
      id: 'cmd-pinned',
      title: 'Command Prompt',
      icon: 'cmd' as const,
      component: 'cmd',
    },
  ];

  const handleTaskbarItemClick = (w: WindowState) => {
    if (w.isMinimized) {
      restoreWindow(w.id);
    } else if (activeWindowId === w.id) {
      minimizeWindow(w.id);
    } else {
      focusWindow(w.id);
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 h-10 aero-taskbar z-[9998] flex items-center justify-between select-none px-1 text-xs text-white">
      {/* 1. LEFT: START ORB & PINNED / RUNNING APPS */}
      <div className="flex items-center h-full space-x-1 min-w-0">
        {/* START ORB */}
        <button
          id="start-orb-button"
          onClick={toggleStartMenu}
          className={`relative -ml-1 -top-1 w-11 h-11 flex items-center justify-center cursor-pointer transition-transform duration-100 active:scale-95 group ${
            isStartMenuOpen ? 'start-orb-glow' : 'hover:scale-105'
          }`}
          aria-label="Start"
          title="Start"
        >
          <StartOrbIcon size={42} active={isStartMenuOpen} />
          {/* Subtle hover pulse */}
          <div className="absolute inset-0 rounded-full bg-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity filter blur-sm pointer-events-none" />
        </button>

        {/* PINNED APPS (Shown when no window for this app is running) */}
        <div className="hidden sm:flex items-center space-x-0.5 border-r border-white/20 pr-1.5 mr-1">
          {pinnedApps.map((app) => {
            const isRunning = openWindowsList.some((w) => w.id === app.id);
            if (isRunning) return null; // Already shown in running windows

            return (
              <button
                key={app.id}
                onClick={() => {
                  openWindow({
                    id: app.id,
                    title: app.title,
                    icon: app.icon,
                    component: app.component,
                    params: app.params,
                  });
                }}
                className="w-8 h-8 rounded-sm hover:bg-white/20 active:bg-white/30 flex items-center justify-center cursor-pointer transition-all hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                title={app.title}
                aria-label={app.title}
              >
                <AppIconRenderer type={app.icon} size={20} className="drop-shadow" />
              </button>
            );
          })}
        </div>

        {/* RUNNING WINDOW ITEMS */}
        <div className="flex items-center space-x-1 overflow-x-auto min-w-0 py-0.5">
          {openWindowsList.map((w) => {
            const isActive = activeWindowId === w.id && !w.isMinimized;
            const isHovered = hoveredWindowId === w.id;

            return (
              <div
                key={w.id}
                className="relative"
                onMouseEnter={() => setHoveredWindowId(w.id)}
                onMouseLeave={() => setHoveredWindowId(null)}
              >
                {/* Taskbar Button */}
                <button
                  onClick={() => handleTaskbarItemClick(w)}
                  className={`h-8 px-2.5 rounded flex items-center space-x-2 max-w-[170px] truncate transition-all cursor-pointer border ${
                    isActive
                      ? 'taskbar-item-active text-white'
                      : w.isMinimized
                      ? 'bg-black/20 hover:bg-white/20 text-white/70 border-white/10'
                      : 'bg-white/15 hover:bg-white/25 text-white border-white/20 shadow-sm'
                  }`}
                  title={w.title}
                >
                  <AppIconRenderer type={w.icon} size={18} className="shrink-0 drop-shadow" />
                  <span className="text-[11px] font-medium truncate drop-shadow-sm">{w.title}</span>
                </button>

                {/* THUMBNAIL LIVE HOVER PREVIEW */}
                {isHovered && (
                  <div className="absolute bottom-11 left-0 w-52 p-2 bg-gradient-to-b from-[#e3f0fc]/95 to-[#c2dcf7]/95 rounded-md border border-white/80 shadow-2xl z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-100">
                    <div className="flex items-center space-x-1.5 mb-1.5 text-[11px] font-bold text-gray-800 truncate">
                      <AppIconRenderer type={w.icon} size={14} />
                      <span className="truncate">{w.title}</span>
                    </div>
                    {/* Simulated window thumbnail */}
                    <div className="h-28 bg-white rounded border border-gray-400 overflow-hidden shadow-inner flex flex-col p-1.5 text-[9px] text-gray-600">
                      <div className="h-3 bg-sky-200/80 rounded-t mb-1 flex items-center px-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1" />
                        <span className="font-semibold text-gray-800 text-[8px] truncate">{w.title}</span>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded p-1 overflow-hidden leading-tight font-mono text-[8px] text-gray-500">
                        {w.component === 'cmd' ? (
                          <div className="bg-black text-green-400 p-1 h-full rounded">
                            C:\Users\Administrator&gt;
                          </div>
                        ) : w.component === 'browser' ? (
                          <div className="space-y-1">
                            <div className="h-2 bg-blue-100 rounded" />
                            <div className="h-10 bg-slate-100 rounded" />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="h-2 bg-gray-200 rounded w-3/4" />
                            <div className="h-2 bg-gray-200 rounded w-1/2" />
                            <div className="h-2 bg-gray-200 rounded w-5/6" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. RIGHT: SYSTEM TRAY, LIVE CLOCK & SHOW DESKTOP SLIVER */}
      <div className="flex items-center space-x-1 h-full pl-2 shrink-0">
        {/* Hidden Icons arrow */}
        <button
          className="p-1 hover:bg-white/20 rounded text-white/80 hover:text-white cursor-pointer"
          title="Show hidden icons"
          aria-label="Show hidden icons"
        >
          <ChevronUp size={12} />
        </button>

        {/* Action Center Flag */}
        <button
          className="p-1 hover:bg-white/20 rounded text-white/90 hover:text-white cursor-pointer"
          title="0 important messages (Action Center)"
          aria-label="Action Center"
        >
          <Flag size={13} className="text-sky-200" />
        </button>

        {/* Network / WiFi */}
        <button
          className="p-1 hover:bg-white/20 rounded text-white/90 hover:text-white cursor-pointer"
          title="Internet access: Connected to Vedant High-Speed Network"
          aria-label="Network status"
        >
          <Wifi size={13} className="text-emerald-300" />
        </button>

        {/* Sound Speaker Mute / Unmute Toggle */}
        <button
          onClick={toggleSound}
          className={`p-1 rounded cursor-pointer transition-colors ${
            isSoundMuted ? 'text-red-300 hover:bg-red-500/20' : 'text-sky-200 hover:bg-white/20'
          }`}
          title={isSoundMuted ? 'Speakers: Muted (Click to Unmute Sound)' : 'Speakers: 100% (Click to Mute Sound)'}
          aria-label={isSoundMuted ? 'Unmute Speakers' : 'Mute Speakers'}
        >
          {isSoundMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {/* Live Clock & Date Button */}
        <button
          onClick={() => setShowClockModal(!showClockModal)}
          className="px-2 py-0.5 rounded hover:bg-white/20 flex flex-col items-center justify-center text-center leading-none text-[10px] cursor-pointer"
          title="Date & Time"
        >
          <span className="font-semibold text-white drop-shadow">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-sky-100 drop-shadow text-[9px] mt-0.5">
            {currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}
          </span>
        </button>

        {/* FAR RIGHT: "SHOW DESKTOP" AERO GLASS SLIVER */}
        <button
          onClick={showDesktop}
          aria-label="Show Desktop"
          className="w-3.5 h-full ml-1 border-l border-white/40 bg-white/10 hover:bg-white/40 active:bg-white/60 transition-colors cursor-pointer"
          title="Show desktop"
        />
      </div>

      {/* WINDOWS 7 ANALOG CLOCK & CALENDAR FLYOUT */}
      {showClockModal && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-11 right-2 w-72 bg-gradient-to-b from-[#e3f0fc]/95 to-[#c2dcf7]/95 rounded-lg border border-white/80 shadow-2xl p-4 text-gray-800 z-[9999] select-none font-sans"
        >
          <div className="flex items-center justify-between border-b border-sky-300/60 pb-2 mb-3">
            <div className="font-bold text-sm text-blue-900">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-xs text-gray-600 font-medium">
              {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>

          {/* Analog Clock Face Replica */}
          <div className="flex justify-center my-3">
            <div className="w-28 h-28 rounded-full border-4 border-slate-700 bg-white shadow-inner relative flex items-center justify-center">
              <div className="absolute w-2 h-2 rounded-full bg-slate-900 z-20" />
              {/* Hour hand */}
              <div
                style={{
                  transform: `rotate(${(currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5}deg)`,
                  transformOrigin: 'bottom center',
                }}
                className="absolute bottom-1/2 w-1 h-8 bg-slate-900 rounded z-10"
              />
              {/* Minute hand */}
              <div
                style={{
                  transform: `rotate(${currentTime.getMinutes() * 6}deg)`,
                  transformOrigin: 'bottom center',
                }}
                className="absolute bottom-1/2 w-0.5 h-11 bg-slate-700 rounded z-10"
              />
              {/* Second hand */}
              <div
                style={{
                  transform: `rotate(${currentTime.getSeconds() * 6}deg)`,
                  transformOrigin: 'bottom center',
                }}
                className="absolute bottom-1/2 w-0.5 h-12 bg-red-600 rounded z-15"
              />
            </div>
          </div>

          <div className="text-center text-[11px] text-gray-600 pt-2 border-t border-sky-300/40">
            Vedant Borude System Time Zone (IST)
          </div>
        </div>
      )}
    </div>
  );
};
