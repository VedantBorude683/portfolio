import React, { useState } from 'react';
import { useWindowStore } from '../../store/windowStore';

interface NotepadWindowProps {
  initialContent?: string;
  fileName?: string;
  windowId: string;
}

export const NotepadWindow: React.FC<NotepadWindowProps> = ({
  initialContent = '',
  fileName = 'Untitled.txt',
  windowId,
}) => {
  const [content, setContent] = useState(initialContent);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [wordWrap, setWordWrap] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const { closeWindow } = useWindowStore();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    updateCursor(e.target);
  };

  const updateCursor = (textarea: HTMLTextAreaElement) => {
    const textLines = textarea.value.substr(0, textarea.selectionStart).split('\n');
    const currentLine = textLines.length;
    const currentCol = textLines[textLines.length - 1].length + 1;
    setCursorPos({ line: currentLine, col: currentCol });
  };

  return (
    <div
      onClick={() => setActiveMenu(null)}
      className="flex-1 flex flex-col bg-white text-gray-900 select-text h-full font-sans text-xs"
    >
      {/* 1. NOTEPAD MENU BAR */}
      <div className="bg-[#f0f0f0] border-b border-[#dfdfdf] px-1 py-0.5 flex items-center space-x-1 shrink-0 select-none text-[11px] relative">
        {/* File */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === 'file' ? null : 'file');
            }}
            className="px-2 py-0.5 rounded hover:bg-sky-200 text-gray-800 cursor-pointer"
          >
            File
          </button>
          {activeMenu === 'file' && (
            <div className="absolute top-full left-0 mt-0.5 w-36 bg-white border border-gray-300 shadow-md py-1 z-50 text-[11px]">
              <button
                onClick={() => setContent('')}
                className="w-full text-left px-3 py-1 hover:bg-sky-100 hover:text-blue-800"
              >
                New
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = fileName;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full text-left px-3 py-1 hover:bg-sky-100 hover:text-blue-800"
              >
                Save As...
              </button>
              <div className="border-t border-gray-200 my-1" />
              <button
                onClick={() => closeWindow(windowId)}
                className="w-full text-left px-3 py-1 hover:bg-sky-100 hover:text-blue-800"
              >
                Exit
              </button>
            </div>
          )}
        </div>

        {/* Edit */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === 'edit' ? null : 'edit');
            }}
            className="px-2 py-0.5 rounded hover:bg-sky-200 text-gray-800 cursor-pointer"
          >
            Edit
          </button>
          {activeMenu === 'edit' && (
            <div className="absolute top-full left-0 mt-0.5 w-36 bg-white border border-gray-300 shadow-md py-1 z-50 text-[11px]">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(content).catch(() => {});
                }}
                className="w-full text-left px-3 py-1 hover:bg-sky-100 hover:text-blue-800"
              >
                Copy All
              </button>
              <button
                onClick={() => setContent('')}
                className="w-full text-left px-3 py-1 hover:bg-sky-100 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Format */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === 'format' ? null : 'format');
            }}
            className="px-2 py-0.5 rounded hover:bg-sky-200 text-gray-800 cursor-pointer"
          >
            Format
          </button>
          {activeMenu === 'format' && (
            <div className="absolute top-full left-0 mt-0.5 w-36 bg-white border border-gray-300 shadow-md py-1 z-50 text-[11px]">
              <button
                onClick={() => setWordWrap(!wordWrap)}
                className="w-full text-left px-3 py-1 hover:bg-sky-100 hover:text-blue-800 flex items-center justify-between"
              >
                <span>Word Wrap</span>
                {wordWrap && <span>✓</span>}
              </button>
            </div>
          )}
        </div>

        {/* Help */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === 'help' ? null : 'help');
            }}
            className="px-2 py-0.5 rounded hover:bg-sky-200 text-gray-800 cursor-pointer"
          >
            Help
          </button>
          {activeMenu === 'help' && (
            <div className="absolute top-full left-0 mt-0.5 w-44 bg-white border border-gray-300 shadow-md py-1 z-50 text-[11px]">
              <button
                onClick={() => setShowAbout(true)}
                className="w-full text-left px-3 py-1 hover:bg-sky-100 hover:text-blue-800"
              >
                About Notepad
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. TEXT EDITOR AREA */}
      <div className="flex-1 relative bg-white">
        <textarea
          value={content}
          onChange={handleTextChange}
          onKeyUp={(e) => updateCursor(e.currentTarget)}
          onClick={(e) => updateCursor(e.currentTarget)}
          wrap={wordWrap ? 'soft' : 'off'}
          aria-label="Notepad text area"
          className="w-full h-full p-2 outline-none resize-none font-mono text-[13px] leading-relaxed text-gray-900 border-none select-text"
          style={{ fontFamily: 'Consolas, "Lucida Console", "Courier New", monospace' }}
        />
      </div>

      {/* 3. STATUS BAR */}
      <div className="bg-[#f0f0f0] border-t border-[#dfdfdf] px-3 py-0.5 flex items-center justify-between shrink-0 text-[11px] text-gray-600 select-none">
        <div className="flex items-center space-x-6">
          <span>Characters: {content.length}</span>
          <span>Lines: {content.split('\n').length}</span>
        </div>
        <div className="flex items-center space-x-6">
          <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
          <span>100%</span>
          <span>Windows (CRLF)</span>
          <span>UTF-8</span>
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center p-4">
          <div className="bg-[#f0f0f0] rounded border border-gray-400 shadow-2xl p-4 max-w-sm w-full text-xs">
            <div className="font-bold text-sm text-blue-900 mb-2">Windows Notepad</div>
            <p className="text-gray-700 mb-4">
              Microsoft Windows 7 Aero Portfolio Edition.<br />
              Authored for Vedant Borude's developer file explorations.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAbout(false)}
                className="aero-button px-4 py-1 text-xs rounded text-gray-800"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
