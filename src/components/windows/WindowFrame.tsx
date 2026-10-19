import React, { useState, useRef, useEffect } from 'react';
import { Minus, Square, Copy, X } from 'lucide-react';
import { useWindowStore, WindowState } from '../../store/windowStore';
import { AppIconRenderer } from '../common/OSIcons';

interface WindowFrameProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ windowState, children }) => {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore();

  const [isMobileScreen, setIsMobileScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isFocused = activeWindowId === windowState.id;
  const effectivelyMaximized = windowState.isMaximized || isMobileScreen;

  // Dragging state
  const isDraggingRef = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowStartPos = useRef({ x: 0, y: 0 });

  // Resizing state
  const isResizingRef = useRef(false);
  const resizeDirectionRef = useRef<string | null>(null);
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const resizeStartDim = useRef({ width: 0, height: 0, x: 0, y: 0 });

  const [, forceUpdate] = useState(0);

  // Focus on mouse down inside window
  const handleMouseDown = () => {
    if (!isFocused) {
      focusWindow(windowState.id);
    }
  };

  // Drag handlers
  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (effectivelyMaximized) return;
    if ((e.target as HTMLElement).closest('button')) return;

    e.preventDefault();
    focusWindow(windowState.id);
    isDraggingRef.current = true;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    windowStartPos.current = { x: windowState.position.x, y: windowState.position.y };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = moveEvent.clientX - dragStartPos.current.x;
      const dy = moveEvent.clientY - dragStartPos.current.y;
      const newX = Math.max(0, Math.min(window.innerWidth - 100, windowStartPos.current.x + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, windowStartPos.current.y + dy));
      updateWindowPosition(windowState.id, { x: newX, y: newY });
      forceUpdate((n) => n + 1);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Resize handler
  const handleResizeMouseDown = (direction: string, e: React.MouseEvent) => {
    if (effectivelyMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    focusWindow(windowState.id);

    isResizingRef.current = true;
    resizeDirectionRef.current = direction;
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    resizeStartDim.current = {
      width: windowState.size.width,
      height: windowState.size.height,
      x: windowState.position.x,
      y: windowState.position.y,
    };

    const minW = windowState.minWidth || 380;
    const minH = windowState.minHeight || 260;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizingRef.current) return;
      const dx = moveEvent.clientX - resizeStartPos.current.x;
      const dy = moveEvent.clientY - resizeStartPos.current.y;

      let newW = resizeStartDim.current.width;
      let newH = resizeStartDim.current.height;
      let newX = resizeStartDim.current.x;
      let newY = resizeStartDim.current.y;

      if (direction.includes('e')) newW = Math.max(minW, resizeStartDim.current.width + dx);
      if (direction.includes('s')) newH = Math.max(minH, resizeStartDim.current.height + dy);
      if (direction.includes('w')) {
        const potentialW = resizeStartDim.current.width - dx;
        if (potentialW >= minW) {
          newW = potentialW;
          newX = resizeStartDim.current.x + dx;
        }
      }
      if (direction.includes('n')) {
        const potentialH = resizeStartDim.current.height - dy;
        if (potentialH >= minH) {
          newH = potentialH;
          newY = resizeStartDim.current.y + dy;
        }
      }

      updateWindowSize(windowState.id, { width: newW, height: newH });
      updateWindowPosition(windowState.id, { x: newX, y: newY });
      forceUpdate((n) => n + 1);
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      resizeDirectionRef.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const windowStyle: React.CSSProperties = effectivelyMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 40px)', // Account for bottom taskbar
        zIndex: windowState.zIndex,
        borderRadius: 0,
      }
    : {
        position: 'absolute',
        top: `${windowState.position.y}px`,
        left: `${windowState.position.x}px`,
        width: `${windowState.size.width}px`,
        height: `${windowState.size.height}px`,
        zIndex: windowState.zIndex,
        borderRadius: '8px 8px 6px 6px',
      };

  return (
    <div
      style={windowStyle}
      onMouseDown={handleMouseDown}
      className={`flex flex-col aero-glass overflow-hidden shadow-2xl transition-all duration-75 border ${
        effectivelyMaximized ? 'p-0' : 'p-[5px] pb-[6px]'
      } ${
        isFocused
          ? 'border-sky-300/80 shadow-[0_14px_45px_rgba(0,0,0,0.6)]'
          : 'border-white/40 opacity-95'
      }`}
    >
      {/* AERO GLASS TITLEBAR */}
      <div
        onMouseDown={handleTitleBarMouseDown}
        onDoubleClick={() => toggleMaximizeWindow(windowState.id)}
        className={`h-7.5 select-none flex items-center justify-between px-2 cursor-default relative overflow-hidden shrink-0 ${
          effectivelyMaximized ? '' : '-mt-1 -mx-0.5 mb-1'
        } ${
          isFocused ? 'aero-titlebar' : 'aero-titlebar-inactive'
        }`}
      >
        {/* Subtle glass reflection highlight */}
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

        {/* Left: App Icon & Title */}
        <div className="flex items-center space-x-1.5 min-w-0 pr-2 z-10">
          <AppIconRenderer type={windowState.icon} size={16} className="shrink-0 drop-shadow" />
          <span
            className="text-[12px] font-semibold text-gray-900 truncate tracking-tight font-sans"
            style={{
              textShadow: isFocused ? '0 0 10px rgba(255,255,255,1), 0 0 4px rgba(255,255,255,0.9)' : 'none',
              fontFamily: '"Segoe UI", "Tahoma", sans-serif',
            }}
          >
            {windowState.title}
          </span>
        </div>

        {/* Right: Window Action Buttons (Minimize, Maximize, Close) */}
        <div className="flex items-center space-x-0.5 z-10 shrink-0 -mr-1">
          {/* Minimize button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(windowState.id);
            }}
            aria-label="Minimize"
            className="w-7 h-5 rounded-xs flex items-center justify-center text-gray-800 hover:text-white hover:bg-sky-500/85 active:bg-sky-600 transition-colors cursor-pointer border border-transparent hover:border-sky-300/70"
          >
            <Minus size={11} strokeWidth={2.5} />
          </button>

          {/* Maximize / Restore button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximizeWindow(windowState.id);
            }}
            aria-label={effectivelyMaximized ? 'Restore Down' : 'Maximize'}
            className="w-7 h-5 rounded-xs flex items-center justify-center text-gray-800 hover:text-white hover:bg-sky-500/85 active:bg-sky-600 transition-colors cursor-pointer border border-transparent hover:border-sky-300/70"
          >
            {effectivelyMaximized ? <Copy size={10} strokeWidth={2.2} /> : <Square size={10} strokeWidth={2.2} />}
          </button>

          {/* Close button (Classic red Aero style) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(windowState.id);
            }}
            aria-label="Close"
            className="w-11 h-5 rounded-xs flex items-center justify-center text-gray-800 hover:text-white hover:bg-gradient-to-b hover:from-[#e81123] hover:to-[#c41020] active:from-[#b00e1b] active:to-[#910a14] transition-colors cursor-pointer border border-transparent hover:border-red-400 shadow-xs"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* WINDOW INNER CLIENT CONTENT (Enclosed in authentic 1px inset border) */}
      <div className="flex-1 bg-[#ffffff] overflow-hidden flex flex-col relative border border-[#7f9db9] rounded-xs shadow-inner">
        {children}
      </div>

      {/* RESIZE HANDLERS (Hidden when maximized) */}
      {!effectivelyMaximized && (
        <>
          <div
            onMouseDown={(e) => handleResizeMouseDown('n', e)}
            className="absolute top-0 left-2 right-2 h-1.5 cursor-ns-resize z-20"
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown('s', e)}
            className="absolute bottom-0 left-2 right-2 h-2 cursor-ns-resize z-20"
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown('w', e)}
            className="absolute top-2 bottom-2 left-0 w-1.5 cursor-ew-resize z-20"
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown('e', e)}
            className="absolute top-2 bottom-2 right-0 w-2 cursor-ew-resize z-20"
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown('nw', e)}
            className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-30"
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown('ne', e)}
            className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-30"
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown('sw', e)}
            className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-30"
          />
          <div
            onMouseDown={(e) => handleResizeMouseDown('se', e)}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-30 flex items-end justify-end p-0.5"
          >
            {/* Subtle resize grip dots */}
            <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400/60" />
          </div>
        </>
      )}
    </div>
  );
};
