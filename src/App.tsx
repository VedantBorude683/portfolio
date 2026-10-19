/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BootSequence } from './components/boot/BootSequence';
import { Desktop } from './components/desktop/Desktop';
import { Taskbar } from './components/desktop/Taskbar';
import { StartMenu } from './components/desktop/StartMenu';
import { PowerScreen } from './components/desktop/PowerScreen';
import { ClassicPortfolioView } from './components/common/ClassicPortfolioView';
import { useWindowStore } from './store/windowStore';
import { PORTFOLIO_DATA } from './data';

export default function App() {
  const { classicPortfolioMode, openWindow } = useWindowStore();
  const [isBooted, setIsBooted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('autostart') === '1';
    }
    return false;
  });

  // When booted into desktop, open the Welcome About Me document once
  useEffect(() => {
    if (isBooted) {
      const hasInitialWindowOpened = sessionStorage.getItem('win7_initial_opened');
      if (!hasInitialWindowOpened) {
        sessionStorage.setItem('win7_initial_opened', 'true');
        setTimeout(() => {
          openWindow({
            id: 'notepad-welcome',
            title: 'About Me.txt - Notepad',
            icon: 'notepad',
            component: 'notepad',
            params: { fileName: 'About Me.txt', content: PORTFOLIO_DATA.aboutMeDoc },
            defaultWidth: 640,
            defaultHeight: 440,
            x: 80,
            y: 60,
          });
        }, 400);
      }
    }
  }, [isBooted, openWindow]);

  // Classic recruiter mode
  if (classicPortfolioMode) {
    return <ClassicPortfolioView />;
  }

  // 1. Initial Windows 7 Boot Sequence (Bootloader -> Starting Windows -> Welcome Screen -> Login -> Desktop)
  if (!isBooted) {
    return (
      <BootSequence
        onComplete={() => {
          setIsBooted(true);
        }}
      />
    );
  }

  // 2. Windows 7 Desktop Environment
  return (
    <div className="h-full w-full relative overflow-hidden bg-black select-none">
      <Desktop />
      <Taskbar />
      <StartMenu />
      <PowerScreen
        onPowerOn={() => {
          setIsBooted(false);
        }}
      />
    </div>
  );
}
