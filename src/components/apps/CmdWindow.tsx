import React, { useState, useRef, useEffect } from 'react';
import { parseCommand, VIRTUAL_FS } from '../../utils/commandParser';
import { useWindowStore } from '../../store/windowStore';

interface CmdWindowProps {
  windowId: string;
}

interface HistoryEntry {
  command: string;
  output?: string;
  isPrompt?: boolean;
  color?: string;
}

export const CmdWindow: React.FC<CmdWindowProps> = ({ windowId }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: '',
      output: 'Microsoft Windows [Version 6.1.7601]\n(c) 2009 Microsoft Corporation. All rights reserved.\nType \'help\' to see available developer commands.',
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [fontColor, setFontColor] = useState('#cccccc');
  const [currentDir, setCurrentDir] = useState('C:\\Users\\Administrator');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { closeWindow, openWindow } = useWindowStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = currentInput.trim();
      const newLog = [...commandLog, trimmed].filter(Boolean);
      setCommandLog(newLog);
      setHistoryPointer(-1);

      if (!trimmed) {
        setHistory((prev) => [
          ...prev,
          { command: `${currentDir}>`, isPrompt: true },
        ]);
        setCurrentInput('');
        return;
      }

      // Execute command
      const result = parseCommand(trimmed, currentDir);

      if (result.exit) {
        closeWindow(windowId);
        return;
      }

      if (result.clear) {
        setHistory([]);
        setCurrentInput('');
        return;
      }

      if (result.newColor) {
        setFontColor(result.newColor);
      }

      // If command was cd, update currentDir if valid
      if (trimmed.toLowerCase().startsWith('cd ')) {
        const target = trimmed.substring(3).trim();
        if (target === '..') {
          const parts = currentDir.split('\\');
          if (parts.length > 2) {
            parts.pop();
            setCurrentDir(parts.join('\\'));
          }
        } else {
          const potential = `${currentDir}\\${target}`;
          if (VIRTUAL_FS[potential]) {
            setCurrentDir(potential);
          }
        }
      }

      setHistory((prev) => [
        ...prev,
        { command: `${currentDir}> ${trimmed}`, isPrompt: true },
        ...(result.output ? [{ command: '', output: result.output, color: result.newColor }] : []),
      ]);

      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandLog.length === 0) return;
      const nextIdx = historyPointer === -1 ? commandLog.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextIdx);
      setCurrentInput(commandLog[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextIdx = historyPointer + 1;
      if (nextIdx >= commandLog.length) {
        setHistoryPointer(-1);
        setCurrentInput('');
      } else {
        setHistoryPointer(nextIdx);
        setCurrentInput(commandLog[nextIdx] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab autocomplete for current directory
      const availableItems = (VIRTUAL_FS[currentDir] || []).map((i) => i.replace(' <DIR>', ''));
      const parts = currentInput.split(' ');
      const lastToken = parts[parts.length - 1].toLowerCase();
      const match = availableItems.find((i) => i.toLowerCase().startsWith(lastToken));
      if (match) {
        parts[parts.length - 1] = match.includes(' ') ? `"${match}"` : match;
        setCurrentInput(parts.join(' '));
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{ color: fontColor }}
      className="flex-1 bg-black p-3 font-mono text-[13px] leading-relaxed select-text overflow-y-auto h-full flex flex-col"
    >
      <div className="space-y-1">
        {history.map((entry, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {entry.isPrompt ? (
              <div className="text-white font-semibold">{entry.command}</div>
            ) : (
              <div>{entry.output}</div>
            )}
          </div>
        ))}
      </div>

      {/* Active Input Line */}
      <div className="flex items-center space-x-1.5 mt-1">
        <span className="text-white font-semibold whitespace-nowrap">{currentDir}&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Command prompt input"
          className="flex-1 bg-transparent border-none outline-none text-[13px] p-0 m-0"
          style={{ color: fontColor, caretColor: fontColor }}
        />
      </div>

      <div ref={bottomRef} className="h-2" />
    </div>
  );
};
