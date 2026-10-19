import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Power, ChevronRight, HardDrive, Folder, FileText, 
  Terminal, Globe, Settings, Mail, RefreshCw, LogOut, Award, User, Sparkles
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data';
import { useWindowStore } from '../../store/windowStore';
import { AppIconRenderer, UserAvatarIcon } from '../common/OSIcons';

export const StartMenu: React.FC = () => {
  const {
    isStartMenuOpen,
    setStartMenuOpen,
    openWindow,
    setOsPowerState,
    setClassicPortfolioMode,
  } = useWindowStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showPowerSubmenu, setShowPowerSubmenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isStartMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('#start-orb-button')
      ) {
        setStartMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isStartMenuOpen, setStartMenuOpen]);

  if (!isStartMenuOpen) return null;

  const pinnedApps = [
    {
      id: 'browser-opera',
      title: 'Opera Web Browser',
      sub: 'Explore Vedant\'s Online Profiles',
      icon: 'browser_opera',
      component: 'browser',
      params: { initialUrl: 'https://linkedin.com/in/vedant-borude-2b871a332', browserType: 'opera' },
    },
    {
      id: 'notepad-readme',
      title: 'Notepad',
      sub: 'Read About Me & Specs',
      icon: 'notepad',
      component: 'notepad',
      params: { fileName: 'About Me.txt', content: PORTFOLIO_DATA.aboutMeDoc },
    },
    {
      id: 'cmd-prompt',
      title: 'Command Prompt',
      sub: 'cmd.exe Terminal Environment',
      icon: 'cmd',
      component: 'cmd',
    },
    {
      id: 'mail-app',
      title: 'Windows Live Mail',
      sub: 'Contact & Hire Vedant Borude',
      icon: 'mail',
      component: 'mail',
    },
    {
      id: 'education-cert',
      title: 'PICT Academic Degree & Honors',
      sub: 'CGPA 9.40 / 10.00 • Undergraduate',
      icon: 'education',
      component: 'education',
    },
  ];

  const filteredApps = searchQuery
    ? pinnedApps.filter((app) =>
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.sub.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pinnedApps;

  return (
    <div
      ref={menuRef}
      className="fixed bottom-10 left-0 w-[420px] max-w-[96vw] h-[520px] rounded-t-lg start-menu-glass z-[9999] flex flex-col overflow-hidden shadow-2xl border border-white/60 font-sans text-xs select-none"
    >
      {/* 1. MAIN SPLIT BODY (LEFT WHITE PANE + RIGHT DARK AERO PANE) */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANE: APPS & SEARCH */}
        <div className="w-[230px] sm:w-[245px] bg-white/95 p-2 flex flex-col justify-between border-r border-sky-300/40">
          <div className="overflow-y-auto space-y-1 pr-1">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  openWindow({
                    id: app.id,
                    title: app.title,
                    icon: app.icon as any,
                    component: app.component,
                    params: app.params,
                  });
                }}
                className="w-full text-left p-1.5 rounded hover:bg-sky-100 flex items-center space-x-2.5 transition-colors cursor-pointer group"
              >
                <AppIconRenderer type={app.icon} size={28} className="shrink-0 drop-shadow-sm" />
                <div className="min-w-0">
                  <div className="font-semibold text-gray-800 text-[11px] truncate group-hover:text-blue-900">
                    {app.title}
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">{app.sub}</div>
                </div>
              </button>
            ))}

            {filteredApps.length === 0 && (
              <div className="p-4 text-center text-gray-400 text-xs">
                No matching programs found.
              </div>
            )}
          </div>

          {/* All Programs / Classic recruiter mode button */}
          <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
            <button
              onClick={() => {
                setStartMenuOpen(false);
                setClassicPortfolioMode(true);
              }}
              className="w-full text-left px-2 py-1.5 rounded bg-sky-50 hover:bg-sky-100 border border-sky-200 text-blue-900 font-semibold flex items-center justify-between text-[11px] cursor-pointer"
            >
              <span className="flex items-center space-x-1.5">
                <Sparkles size={13} className="text-amber-500" />
                <span>Classic Recruiter View</span>
              </span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* RIGHT PANE: USER AVATAR & SYSTEM FOLDERS */}
        <div className="flex-1 bg-gradient-to-b from-[#255285]/90 via-[#183a62]/90 to-[#0e2746]/90 text-white p-3 flex flex-col justify-between">
          {/* User profile tile at top */}
          <div className="flex items-center space-x-2.5 pb-2 border-b border-white/20 mb-1">
            <UserAvatarIcon size={38} className="border border-white/80" />
            <div className="min-w-0">
              <div className="font-bold text-xs truncate drop-shadow">Vedant Borude</div>
              <div className="text-[10px] text-sky-200 truncate">Administrator</div>
            </div>
          </div>

          {/* System Links */}
          <div className="space-y-0.5 text-[11px] font-medium text-sky-100">
            <button
              onClick={() => {
                openWindow({
                  id: 'explorer-main',
                  title: 'Vedant Borude - Windows Explorer',
                  icon: 'folder',
                  component: 'explorer',
                  params: { initialPath: 'C:\\Users\\Administrator' },
                });
              }}
              className="w-full text-left px-2 py-1 rounded hover:bg-white/15 cursor-pointer flex items-center space-x-2"
            >
              <User size={13} className="text-sky-300" />
              <span>User Profile</span>
            </button>

            <button
              onClick={() => {
                openWindow({
                  id: 'explorer-projects',
                  title: 'Projects - Windows Explorer',
                  icon: 'folder',
                  component: 'explorer',
                  params: { initialPath: 'C:\\Users\\Administrator\\Projects' },
                });
              }}
              className="w-full text-left px-2 py-1 rounded hover:bg-white/15 cursor-pointer flex items-center space-x-2"
            >
              <Folder size={13} className="text-amber-400" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => {
                openWindow({
                  id: 'explorer-documents',
                  title: 'Documents - Windows Explorer',
                  icon: 'folder',
                  component: 'explorer',
                  params: { initialPath: 'C:\\Users\\Administrator\\Documents' },
                });
              }}
              className="w-full text-left px-2 py-1 rounded hover:bg-white/15 cursor-pointer flex items-center space-x-2"
            >
              <FileText size={13} className="text-blue-300" />
              <span>Documents</span>
            </button>

            <button
              onClick={() => {
                openWindow({
                  id: 'resume-pdf',
                  title: 'Resume.pdf - Windows 7 Document Viewer',
                  icon: 'pdf',
                  component: 'pdf',
                });
              }}
              className="w-full text-left px-2 py-1 rounded hover:bg-white/15 cursor-pointer flex items-center space-x-2 font-semibold text-amber-200"
            >
              <FileText size={13} className="text-red-400" />
              <span>Resume.pdf</span>
            </button>

            <button
              onClick={() => {
                openWindow({
                  id: 'system-properties',
                  title: 'System - Control Panel',
                  icon: 'control_panel',
                  component: 'system',
                });
              }}
              className="w-full text-left px-2 py-1 rounded hover:bg-white/15 cursor-pointer flex items-center space-x-2"
            >
              <Settings size={13} className="text-sky-300" />
              <span>Control Panel</span>
            </button>

            <button
              onClick={() => {
                openWindow({
                  id: 'cmd-prompt',
                  title: 'Command Prompt',
                  icon: 'cmd',
                  component: 'cmd',
                });
              }}
              className="w-full text-left px-2 py-1 rounded hover:bg-white/15 cursor-pointer flex items-center space-x-2"
            >
              <Terminal size={13} className="text-emerald-400" />
              <span>Command Prompt</span>
            </button>
          </div>

          {/* Bottom subtle note */}
          <div className="text-[10px] text-sky-300/60 pt-2 border-t border-white/10">
            Windows 7 Ultimate &bull; Vedant Dev
          </div>
        </div>
      </div>

      {/* 2. BOTTOM SEARCH & SHUTDOWN BAR */}
      <div className="h-11 bg-gradient-to-b from-[#183a62] to-[#0c233d] px-2.5 py-1.5 flex items-center justify-between border-t border-sky-400/40 shrink-0">
        {/* Search Programs and Files */}
        <div className="w-[220px] sm:w-[235px] bg-white rounded-sm px-2 py-1 flex items-center space-x-1.5 shadow-inner">
          <Search size={12} className="text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programs and files"
            aria-label="Search programs and files"
            className="w-full bg-transparent outline-none text-[11px] text-gray-800 placeholder:text-gray-400 placeholder:italic"
          />
        </div>

        {/* Shut Down Button with Flyout */}
        <div className="relative">
          <div className="flex items-center rounded overflow-hidden shadow-sm border border-sky-300/40">
            <button
              onClick={() => {
                setStartMenuOpen(false);
                setOsPowerState('shutdown');
              }}
              className="px-3 py-1 bg-gradient-to-b from-sky-400 via-blue-600 to-blue-800 hover:from-sky-300 hover:to-blue-700 text-white font-semibold text-[11px] flex items-center space-x-1.5 cursor-pointer"
            >
              <Power size={11} />
              <span>Shut down</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPowerSubmenu(!showPowerSubmenu);
              }}
              className="px-1.5 py-1 bg-gradient-to-b from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white border-l border-sky-300/30 text-[10px] cursor-pointer"
              title="More power options"
              aria-label="Power options menu"
            >
              ▾
            </button>
          </div>

          {showPowerSubmenu && (
            <div className="absolute bottom-full right-0 mb-1 w-32 bg-white rounded shadow-xl border border-gray-300 py-1 text-gray-800 text-[11px] z-50">
              <button
                onClick={() => {
                  setStartMenuOpen(false);
                  setShowPowerSubmenu(false);
                  setOsPowerState('restart');
                }}
                className="w-full text-left px-3 py-1 hover:bg-sky-100 flex items-center space-x-1.5 cursor-pointer"
              >
                <RefreshCw size={12} className="text-blue-600" />
                <span>Restart</span>
              </button>
              <button
                onClick={() => {
                  setStartMenuOpen(false);
                  setShowPowerSubmenu(false);
                  setOsPowerState('restart');
                }}
                className="w-full text-left px-3 py-1 hover:bg-sky-100 flex items-center space-x-1.5 cursor-pointer"
              >
                <LogOut size={12} className="text-amber-600" />
                <span>Log off</span>
              </button>
              <div className="border-t border-gray-200 my-1" />
              <button
                onClick={() => {
                  setStartMenuOpen(false);
                  setShowPowerSubmenu(false);
                  setOsPowerState('shutdown');
                }}
                className="w-full text-left px-3 py-1 hover:bg-sky-100 flex items-center space-x-1.5 cursor-pointer text-red-600 font-medium"
              >
                <Power size={12} />
                <span>Shut down</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
