import { create } from 'zustand';
import { PORTFOLIO_DATA, RecycleItem } from '../data';
import { toggleMute, getMutedState, playClickSound, playOpenSound, playRestoreSound, playTrashSound } from '../utils/audio';

export type AppIconType = 
  | 'computer' 
  | 'folder' 
  | 'notepad' 
  | 'cmd' 
  | 'browser_opera'
  | 'browser_ie'
  | 'control_panel' 
  | 'recycle_bin' 
  | 'pdf' 
  | 'mail' 
  | 'education' 
  | 'achievements';

export interface WindowState {
  id: string;
  title: string;
  icon: AppIconType;
  component: string;
  params?: Record<string, unknown>;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  minWidth?: number;
  minHeight?: number;
}

export type DesktopTheme = 'aero_blue' | 'aero_dark' | 'aero_emerald' | 'aero_sunset';

interface WindowStore {
  windows: Record<string, WindowState>;
  windowOrder: string[]; // Window IDs in z-index order
  activeWindowId: string | null;
  highestZIndex: number;

  // OS State
  isStartMenuOpen: boolean;
  isSoundMuted: boolean;
  desktopTheme: DesktopTheme;
  osPowerState: 'running' | 'shutdown' | 'restart';
  classicPortfolioMode: boolean;
  recycleBinItems: RecycleItem[];

  // Actions
  openWindow: (config: {
    id: string;
    title: string;
    icon: AppIconType;
    component: string;
    params?: Record<string, unknown>;
    defaultWidth?: number;
    defaultHeight?: number;
    x?: number;
    y?: number;
  }) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  showDesktop: () => void;
  closeActiveWindow: () => void;

  toggleStartMenu: () => void;
  setStartMenuOpen: (open: boolean) => void;
  toggleSound: () => void;
  setDesktopTheme: (theme: DesktopTheme) => void;
  setOsPowerState: (state: 'running' | 'shutdown' | 'restart') => void;
  setClassicPortfolioMode: (mode: boolean) => void;
  emptyRecycleBin: () => void;
  restoreRecycleBin: () => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  windowOrder: [],
  activeWindowId: null,
  highestZIndex: 10,

  isStartMenuOpen: false,
  isSoundMuted: getMutedState(),
  desktopTheme: 'aero_blue',
  osPowerState: 'running',
  classicPortfolioMode: false,
  recycleBinItems: [...PORTFOLIO_DATA.recycleBinItems],

  openWindow: (config) => {
    const { windows, highestZIndex, isStartMenuOpen } = get();
    if (isStartMenuOpen) {
      set({ isStartMenuOpen: false });
    }

    playOpenSound();

    const existing = windows[config.id];
    const newZIndex = highestZIndex + 1;

    // Mobile check to auto-maximize or size properly
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const defaultW = isMobile ? window.innerWidth : Math.min(config.defaultWidth || 720, window.innerWidth - 40);
    const defaultH = isMobile ? window.innerHeight - 44 : Math.min(config.defaultHeight || 500, window.innerHeight - 80);

    // Stagger window positions
    const existingCount = Object.keys(windows).filter(k => windows[k].isOpen).length;
    const defaultX = isMobile ? 0 : Math.max(20, Math.min(config.x ?? (60 + (existingCount % 6) * 30), window.innerWidth - defaultW - 20));
    const defaultY = isMobile ? 0 : Math.max(20, Math.min(config.y ?? (40 + (existingCount % 6) * 30), window.innerHeight - defaultH - 60));

    if (existing) {
      // If already opened, unminimize & focus, update params if provided
      set({
        windows: {
          ...windows,
          [config.id]: {
            ...existing,
            title: config.title || existing.title,
            params: config.params !== undefined ? config.params : existing.params,
            isOpen: true,
            isMinimized: false,
            isMaximized: isMobile ? true : existing.isMaximized,
            zIndex: newZIndex,
          },
        },
        activeWindowId: config.id,
        highestZIndex: newZIndex,
      });
      return;
    }

    // Create new window
    set({
      windows: {
        ...windows,
        [config.id]: {
          id: config.id,
          title: config.title,
          icon: config.icon,
          component: config.component,
          params: config.params,
          isOpen: true,
          isMinimized: false,
          isMaximized: isMobile,
          position: { x: defaultX, y: defaultY },
          size: { width: defaultW, height: defaultH },
          zIndex: newZIndex,
        },
      },
      windowOrder: [...get().windowOrder, config.id],
      activeWindowId: config.id,
      highestZIndex: newZIndex,
    });
  },

  closeWindow: (id: string) => {
    playClickSound();
    const { windows, activeWindowId } = get();
    if (!windows[id]) return;

    const remainingOpen = Object.values(windows).filter(w => w.id !== id && w.isOpen && !w.isMinimized);
    let nextActiveId: string | null = null;
    if (activeWindowId === id && remainingOpen.length > 0) {
      // Pick highest zIndex remaining
      remainingOpen.sort((a, b) => b.zIndex - a.zIndex);
      nextActiveId = remainingOpen[0].id;
    }

    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isOpen: false,
        },
      },
      activeWindowId: nextActiveId,
    });
  },

  closeActiveWindow: () => {
    const { activeWindowId, closeWindow } = get();
    if (activeWindowId) {
      closeWindow(activeWindowId);
    }
  },

  minimizeWindow: (id: string) => {
    playClickSound();
    const { windows, activeWindowId } = get();
    if (!windows[id]) return;

    const remainingOpen = Object.values(windows).filter(w => w.id !== id && w.isOpen && !w.isMinimized);
    let nextActiveId: string | null = null;
    if (activeWindowId === id && remainingOpen.length > 0) {
      remainingOpen.sort((a, b) => b.zIndex - a.zIndex);
      nextActiveId = remainingOpen[0].id;
    }

    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMinimized: true,
        },
      },
      activeWindowId: nextActiveId,
    });
  },

  restoreWindow: (id: string) => {
    playRestoreSound();
    const { windows, highestZIndex } = get();
    if (!windows[id]) return;

    const newZIndex = highestZIndex + 1;
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMinimized: false,
          zIndex: newZIndex,
        },
      },
      activeWindowId: id,
      highestZIndex: newZIndex,
    });
  },

  toggleMaximizeWindow: (id: string) => {
    playClickSound();
    const { windows, highestZIndex } = get();
    if (!windows[id]) return;

    const newZIndex = highestZIndex + 1;
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMaximized: !windows[id].isMaximized,
          isMinimized: false,
          zIndex: newZIndex,
        },
      },
      activeWindowId: id,
      highestZIndex: newZIndex,
    });
  },

  focusWindow: (id: string) => {
    const { windows, highestZIndex, activeWindowId } = get();
    if (!windows[id]) return;
    if (activeWindowId === id && !windows[id].isMinimized) return;

    const newZIndex = highestZIndex + 1;
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMinimized: false,
          zIndex: newZIndex,
        },
      },
      activeWindowId: id,
      highestZIndex: newZIndex,
    });
  },

  updateWindowPosition: (id: string, position: { x: number; y: number }) => {
    const { windows } = get();
    if (!windows[id]) return;

    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          position,
        },
      },
    });
  },

  updateWindowSize: (id: string, size: { width: number; height: number }) => {
    const { windows } = get();
    if (!windows[id]) return;

    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          size,
        },
      },
    });
  },

  showDesktop: () => {
    playClickSound();
    const { windows } = get();
    const anyVisible = Object.values(windows).some(w => w.isOpen && !w.isMinimized);

    const updatedWindows = { ...windows };
    Object.keys(updatedWindows).forEach(id => {
      if (updatedWindows[id].isOpen) {
        updatedWindows[id] = {
          ...updatedWindows[id],
          isMinimized: anyVisible, // if any visible, minimize all; if all minimized, restore all
        };
      }
    });

    set({
      windows: updatedWindows,
      activeWindowId: anyVisible ? null : get().activeWindowId,
      isStartMenuOpen: false,
    });
  },

  toggleStartMenu: () => {
    playClickSound();
    set(state => ({ isStartMenuOpen: !state.isStartMenuOpen }));
  },

  setStartMenuOpen: (open: boolean) => {
    set({ isStartMenuOpen: open });
  },

  toggleSound: () => {
    const newMuted = toggleMute();
    set({ isSoundMuted: newMuted });
  },

  setDesktopTheme: (theme: DesktopTheme) => {
    set({ desktopTheme: theme });
  },

  setOsPowerState: (state: 'running' | 'shutdown' | 'restart') => {
    set({ osPowerState: state });
  },

  setClassicPortfolioMode: (mode: boolean) => {
    set({ classicPortfolioMode: mode });
  },

  emptyRecycleBin: () => {
    playTrashSound();
    set({ recycleBinItems: [] });
  },

  restoreRecycleBin: () => {
    playClickSound();
    set({ recycleBinItems: [...PORTFOLIO_DATA.recycleBinItems] });
  },
}));
