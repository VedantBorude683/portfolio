import React, { useState, useRef, useEffect } from 'react';
import { 
  RefreshCw, Palette, FileText, Monitor, ChevronRight, X, AlertCircle,
  ExternalLink, Sparkles
} from 'lucide-react';
import { useWindowStore, AppIconType, DesktopTheme } from '../../store/windowStore';
import { AppIconRenderer } from '../common/OSIcons';
import { PORTFOLIO_DATA } from '../../data';
import { WindowFrame } from '../windows/WindowFrame';
import { ExplorerWindow } from '../apps/ExplorerWindow';
import { NotepadWindow } from '../apps/NotepadWindow';
import { CmdWindow } from '../apps/CmdWindow';
import { BrowserWindow } from '../apps/BrowserWindow';
import { SystemPropertiesWindow } from '../apps/SystemPropertiesWindow';
import { RecycleBinWindow } from '../apps/RecycleBinWindow';
import { PdfViewerWindow } from '../apps/PdfViewerWindow';
import { EducationWindow } from '../apps/EducationWindow';
import { AchievementsWindow } from '../apps/AchievementsWindow';
import { MailWindow } from '../apps/MailWindow';
import { ImageViewerWindow } from '../apps/ImageViewerWindow';
import { ExecutableWindow } from '../apps/ExecutableWindow';

interface DesktopIconDef {
  id: string;
  name: string;
  icon: AppIconType;
  component: string;
  params?: Record<string, unknown>;
  defaultWidth?: number;
  defaultHeight?: number;
}

export const Desktop: React.FC = () => {
  const {
    windows,
    openWindow,
    closeActiveWindow,
    desktopTheme,
    setDesktopTheme,
    setClassicPortfolioMode,
    recycleBinItems,
  } = useWindowStore();

  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dismissMobileNotice, setDismissMobileNotice] = useState(false);

  // Marquee selection box state
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

  const desktopRef = useRef<HTMLDivElement | null>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Alt + F4 close window listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'F4' || e.key === 'f4')) {
        e.preventDefault();
        closeActiveWindow();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeActiveWindow]);

  const desktopIcons: DesktopIconDef[] = [
    {
      id: 'computer-app',
      name: 'Computer',
      icon: 'computer',
      component: 'explorer',
      params: { initialPath: 'Computer' },
      defaultWidth: 720,
      defaultHeight: 480,
    },
    {
      id: 'projects-app',
      name: 'Projects',
      icon: 'folder',
      component: 'explorer',
      params: { initialPath: 'C:\\Users\\Administrator\\Projects' },
      defaultWidth: 760,
      defaultHeight: 500,
    },
    {
      id: 'documents-app',
      name: 'Documents',
      icon: 'folder',
      component: 'explorer',
      params: { initialPath: 'C:\\Users\\Administrator\\Documents' },
      defaultWidth: 700,
      defaultHeight: 460,
    },
    {
      id: 'resume-pdf-app',
      name: 'Resume.pdf',
      icon: 'pdf',
      component: 'pdf',
      defaultWidth: 780,
      defaultHeight: 560,
    },
    {
      id: 'browser-opera-app',
      name: 'Opera',
      icon: 'browser_opera',
      component: 'browser',
      params: { initialUrl: 'https://linkedin.com/in/vedant-borude-2b871a332', browserType: 'opera' },
      defaultWidth: 840,
      defaultHeight: 560,
    },
    {
      id: 'notepad-app',
      name: 'Notepad',
      icon: 'notepad',
      component: 'notepad',
      params: { fileName: 'About Me.txt', content: PORTFOLIO_DATA.aboutMeDoc },
      defaultWidth: 620,
      defaultHeight: 440,
    },
    {
      id: 'cmd-app',
      name: 'Command Prompt',
      icon: 'cmd',
      component: 'cmd',
      defaultWidth: 680,
      defaultHeight: 440,
    },
    {
      id: 'recycle-bin-app',
      name: 'Recycle Bin',
      icon: 'recycle_bin',
      component: 'recycle_bin',
      defaultWidth: 680,
      defaultHeight: 440,
    },
    {
      id: 'education-app',
      name: 'PICT Education',
      icon: 'education',
      component: 'education',
      defaultWidth: 760,
      defaultHeight: 520,
    },
  ];

  // Right Click Menu handler
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    if (contextMenu) setContextMenu(null);
  };

  // Selection box dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    closeContextMenu();

    if ((e.target as HTMLElement).closest('.desktop-icon') || (e.target as HTMLElement).closest('.aero-glass')) {
      return;
    }

    setSelectedIconId(null);
    setIsSelecting(true);
    setSelectionBox({
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSelecting || !selectionBox) return;
    setSelectionBox({
      ...selectionBox,
      currentX: e.clientX,
      currentY: e.clientY,
    });
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    setSelectionBox(null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    closeContextMenu();
    setTimeout(() => setIsRefreshing(false), 300);
  };

  // Wallpaper gradient background according to theme
  const getThemeBackground = (theme: DesktopTheme) => {
    switch (theme) {
      case 'aero_dark':
        return 'from-[#0b132b] via-[#1c2541] to-[#0b132b]';
      case 'aero_emerald':
        return 'from-[#064e3b] via-[#047857] to-[#022c22]';
      case 'aero_sunset':
        return 'from-[#701a75] via-[#4c1d95] to-[#1e1b4b]';
      case 'aero_blue':
      default:
        return 'from-[#0a4275] via-[#1d6fa5] to-[#062444]';
    }
  };

  // Render proper app component inside WindowFrame
  const renderWindowContent = (w: typeof windows[string]) => {
    switch (w.component) {
      case 'explorer':
        return <ExplorerWindow initialPath={w.params?.initialPath as string} />;
      case 'notepad':
        return (
          <NotepadWindow
            windowId={w.id}
            fileName={w.params?.fileName as string}
            initialContent={w.params?.content as string}
          />
        );
      case 'cmd':
        return <CmdWindow windowId={w.id} />;
      case 'browser':
        return (
          <BrowserWindow
            initialUrl={w.params?.initialUrl as string}
            browserType={w.params?.browserType as 'ie' | 'opera'}
          />
        );
      case 'system':
        return <SystemPropertiesWindow />;
      case 'recycle_bin':
        return <RecycleBinWindow />;
      case 'pdf':
        return <PdfViewerWindow />;
      case 'education':
        return <EducationWindow />;
      case 'achievements':
        return <AchievementsWindow />;
      case 'mail':
        return <MailWindow />;
      case 'image':
        return (
          <ImageViewerWindow
            imageUrl={w.params?.imageUrl as string}
            title={w.params?.title as string}
          />
        );
      case 'executable':
        return (
          <ExecutableWindow
            title={w.title}
            url={w.params?.url as string}
          />
        );
      default:
        return <div className="p-4 text-xs">Application view</div>;
    }
  };

  return (
    <div
      ref={desktopRef}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`fixed inset-0 select-none overflow-hidden bg-gradient-to-br ${getThemeBackground(
        desktopTheme
      )} font-sans`}
      style={{ paddingBottom: '40px' }} // taskbar space
    >
      {/* 1. ORIGINAL AERO WALLPAPER ARTWORK (LIGHT RAYS & BOKEH SPHERES) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft light rays */}
        <svg className="w-full h-full opacity-35" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            <radialGradient id="sunburst" cx="65%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#80d0ff" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="wave1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="950" cy="320" r="450" fill="url(#sunburst)" />
          {/* Gentle fluid curves */}
          <path d="M-100,500 C300,750 900,200 1600,600 L1600,1000 L-100,1000 Z" fill="url(#wave1)" />
          <path d="M-100,650 C400,900 800,450 1600,750 L1600,1000 L-100,1000 Z" fill="#000000" opacity="0.25" />
        </svg>

        {/* Ambient floating glowing orbs */}
        <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-cyan-400/20 filter blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500/15 filter blur-3xl" />
      </div>

      {/* MOBILE NOTICE TOAST (Bottom dock above taskbar) */}
      {isMobile && !dismissMobileNotice && (
        <div className="absolute bottom-12 inset-x-3 z-50 bg-blue-950/95 border border-sky-400/60 text-white p-2.5 rounded-lg backdrop-blur shadow-2xl flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <AlertCircle size={15} className="text-sky-300 shrink-0" />
            <span>Best experienced on desktop. Touch-friendly maximized mode is active.</span>
          </div>
          <button
            onClick={() => setDismissMobileNotice(true)}
            className="p-1 hover:bg-white/20 rounded cursor-pointer shrink-0 ml-2"
            aria-label="Dismiss notice"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 2. DESKTOP ICONS GRID */}
      <div
        className={`relative z-10 p-3 grid grid-flow-col grid-rows-6 auto-cols-max gap-y-3 gap-x-4 transition-opacity duration-150 ${
          isRefreshing ? 'opacity-30' : 'opacity-100'
        }`}
      >
        {desktopIcons.map((item) => {
          const isSelected = selectedIconId === item.id;
          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIconId(item.id);
                // On mobile touch devices, single tap opens immediately
                if (isMobile) {
                  openWindow({
                    id: item.id,
                    title: item.name,
                    icon: item.icon,
                    component: item.component,
                    params: item.params,
                    defaultWidth: item.defaultWidth,
                    defaultHeight: item.defaultHeight,
                  });
                }
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                openWindow({
                  id: item.id,
                  title: item.name,
                  icon: item.icon,
                  component: item.component,
                  params: item.params,
                  defaultWidth: item.defaultWidth,
                  defaultHeight: item.defaultHeight,
                });
              }}
              className={`desktop-icon w-20 flex flex-col items-center p-1.5 rounded cursor-pointer border text-center transition-all group ${
                isSelected
                  ? 'bg-sky-400/30 border-sky-300/80 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                  : 'border-transparent hover:bg-white/15 hover:border-white/30'
              }`}
            >
              <div className="relative mb-1">
                <AppIconRenderer
                  type={item.icon}
                  size={38}
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform"
                />
              </div>
              <span
                className="text-[11px] leading-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2 max-w-[76px] font-normal select-none"
                style={{ textShadow: '0 1px 2px #000, 0 0 4px #000' }}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3. MARQUEE SELECTION BOX */}
      {isSelecting && selectionBox && (
        <div
          style={{
            left: `${Math.min(selectionBox.startX, selectionBox.currentX)}px`,
            top: `${Math.min(selectionBox.startY, selectionBox.currentY)}px`,
            width: `${Math.abs(selectionBox.currentX - selectionBox.startX)}px`,
            height: `${Math.abs(selectionBox.currentY - selectionBox.startY)}px`,
          }}
          className="absolute border border-sky-400/80 bg-sky-400/20 rounded-xs pointer-events-none z-40"
        />
      )}

      {/* 4. ACTIVE WINDOW FRAMES */}
      {Object.values(windows).map((w) => (
        <WindowFrame key={w.id} windowState={w}>
          {renderWindowContent(w)}
        </WindowFrame>
      ))}

      {/* 5. RIGHT CLICK CONTEXT MENU */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="fixed w-48 bg-white/95 rounded border border-gray-300 shadow-2xl py-1 text-gray-800 text-[11px] z-[99999] select-none backdrop-blur-md"
        >
          <button
            onClick={handleRefresh}
            className="w-full text-left px-3 py-1 hover:bg-sky-100 flex items-center space-x-2 cursor-pointer"
          >
            <RefreshCw size={12} className="text-blue-600" />
            <span>Refresh</span>
          </button>

          <div className="border-t border-gray-200 my-1" />

          <button
            onClick={() => {
              openWindow({
                id: 'notepad-new',
                title: 'New Text Document.txt - Notepad',
                icon: 'notepad',
                component: 'notepad',
                params: { fileName: 'New Text Document.txt', content: '' },
              });
              closeContextMenu();
            }}
            className="w-full text-left px-3 py-1 hover:bg-sky-100 flex items-center space-x-2 cursor-pointer"
          >
            <FileText size={12} className="text-gray-600" />
            <span>New Text Document</span>
          </button>

          <button
            onClick={() => {
              setClassicPortfolioMode(true);
              closeContextMenu();
            }}
            className="w-full text-left px-3 py-1 hover:bg-sky-100 flex items-center space-x-2 cursor-pointer font-medium text-blue-900"
          >
            <Sparkles size={12} className="text-amber-500" />
            <span>Classic Recruiter View</span>
          </button>

          <div className="border-t border-gray-200 my-1" />

          {/* Theme Switcher submenu */}
          <div className="px-3 py-1 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
            Personalize Theme
          </div>

          <button
            onClick={() => {
              setDesktopTheme('aero_blue');
              closeContextMenu();
            }}
            className={`w-full text-left px-3 py-1 hover:bg-sky-100 flex items-center justify-between cursor-pointer ${
              desktopTheme === 'aero_blue' ? 'font-bold text-blue-700' : ''
            }`}
          >
            <span>Windows 7 Aero Blue</span>
            {desktopTheme === 'aero_blue' && <span>✓</span>}
          </button>

          <button
            onClick={() => {
              setDesktopTheme('aero_dark');
              closeContextMenu();
            }}
            className={`w-full text-left px-3 py-1 hover:bg-sky-100 flex items-center justify-between cursor-pointer ${
              desktopTheme === 'aero_dark' ? 'font-bold text-blue-700' : ''
            }`}
          >
            <span>Midnight Aero Dark</span>
            {desktopTheme === 'aero_dark' && <span>✓</span>}
          </button>

          <button
            onClick={() => {
              setDesktopTheme('aero_sunset');
              closeContextMenu();
            }}
            className={`w-full text-left px-3 py-1 hover:bg-sky-100 flex items-center justify-between cursor-pointer ${
              desktopTheme === 'aero_sunset' ? 'font-bold text-blue-700' : ''
            }`}
          >
            <span>Sunset Twilight</span>
            {desktopTheme === 'aero_sunset' && <span>✓</span>}
          </button>
        </div>
      )}
    </div>
  );
};
