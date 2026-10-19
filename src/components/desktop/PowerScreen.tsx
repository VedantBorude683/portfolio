import React, { useState, useEffect } from 'react';
import { Power, RotateCcw } from 'lucide-react';
import { useWindowStore } from '../../store/windowStore';

interface PowerScreenProps {
  onPowerOn: () => void;
}

export const PowerScreen: React.FC<PowerScreenProps> = ({ onPowerOn }) => {
  const { osPowerState, setOsPowerState } = useWindowStore();
  const [stage, setStage] = useState<'transition' | 'safe_to_turn_off'>('transition');

  useEffect(() => {
    if (osPowerState === 'restart') {
      const t = setTimeout(() => {
        setOsPowerState('running');
        onPowerOn();
      }, 1500);
      return () => clearTimeout(t);
    } else if (osPowerState === 'shutdown') {
      const t = setTimeout(() => {
        setStage('safe_to_turn_off');
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [osPowerState, onPowerOn, setOsPowerState]);

  if (osPowerState === 'running') return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black text-white flex flex-col items-center justify-center font-sans select-none">
      {/* SHUTTING DOWN / RESTARTING TRANSITION */}
      {stage === 'transition' && (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 rounded-full border-3 border-sky-400 border-t-transparent animate-spin" />
          <h2 className="text-xl font-medium text-gray-200 tracking-wide">
            {osPowerState === 'restart' ? 'Restarting...' : 'Shutting down...'}
          </h2>
        </div>
      )}

      {/* IT IS NOW SAFE TO TURN OFF YOUR COMPUTER */}
      {stage === 'safe_to_turn_off' && osPowerState === 'shutdown' && (
        <div className="flex flex-col items-center text-center p-8 max-w-lg space-y-6 animate-in fade-in duration-500">
          <div className="text-amber-500 font-mono text-xl sm:text-2xl font-bold tracking-wider uppercase bios-screen">
            It is now safe to turn off your computer.
          </div>

          <p className="text-xs text-gray-400 font-mono">
            Vedant Borude Windows 7 Ultimate Session Terminated.
          </p>

          {/* Power on button */}
          <button
            onClick={() => {
              setOsPowerState('running');
              onPowerOn();
            }}
            className="group flex flex-col items-center space-y-2 p-4 rounded-xl bg-gray-900 border border-gray-700 hover:border-sky-400 shadow-2xl cursor-pointer transition-all active:scale-95"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-gray-600 group-hover:border-sky-400 group-hover:shadow-[0_0_20px_#38bdf8] flex items-center justify-center transition-all">
              <Power size={26} className="text-gray-400 group-hover:text-sky-300" />
            </div>
            <span className="text-xs text-gray-300 group-hover:text-white font-mono font-bold">
              Power On PC
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
