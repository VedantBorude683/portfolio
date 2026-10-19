import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, RotateCw, Home, Star, ExternalLink, ShieldCheck, 
  Search, Lock, GitBranch, GitFork, Users, Building, MapPin, Calendar, CheckCircle2, Globe
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data';
import { AppIconRenderer } from '../common/OSIcons';

interface BrowserWindowProps {
  initialUrl?: string;
  browserType?: 'ie' | 'opera';
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({
  initialUrl = 'https://uber-eta-eight.vercel.app/',
  browserType = 'ie',
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState([
    {
      id: '1',
      title: initialUrl.includes('chatify-one-lyart')
        ? 'Chatify - Real-Time Messaging & Video App'
        : 'SwiftRide - Live Portfolio Demo',
      url: initialUrl,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState('1');

  const bookmarks = [
    { title: 'SwiftRide & Portfolio Demo', url: 'https://uber-eta-eight.vercel.app/', icon: 'uber' },
    { title: 'LinkedIn Profile', url: 'https://linkedin.com/in/vedant-borude-2b871a332', icon: 'linkedin' },
    { title: 'GitHub Profile', url: 'https://github.com/VedantBorude683', icon: 'github' },
    { title: 'PICT University', url: 'https://pict.edu', icon: 'pict' },
  ];

  const navigateTo = (newUrl: string) => {
    setIsLoading(true);
    setUrl(newUrl);
    setInputUrl(newUrl);

    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? {
              ...t,
              url: newUrl,
              title: newUrl.includes('chatify-one-lyart')
                ? 'Chatify - Real-Time Messaging & Video App'
                : newUrl.includes('uber') || newUrl.includes('vercel')
                ? 'SwiftRide - Live Portfolio Demo'
                : newUrl.includes('linkedin')
                ? 'Vedant Borude | LinkedIn'
                : newUrl.includes('github')
                ? 'VedantBorude683 · GitHub'
                : 'Web Browser',
            }
          : t
      )
    );

    setTimeout(() => {
      setIsLoading(false);
    }, 350);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = `https://${target}`;
    }
    navigateTo(target);
  };

  const isLinkedIn = url.toLowerCase().includes('linkedin');
  const isGitHub = url.toLowerCase().includes('github');
  const isDemo = url.toLowerCase().includes('uber') || url.includes('vercel') || url.includes('swiftride');
  const isChatify = url.toLowerCase().includes('chatify-one-lyart');

  return (
    <div className="flex-1 flex flex-col bg-[#f0f0f0] select-none h-full font-sans text-xs">
      {/* 1. INTERNET EXPLORER 9 AUTHENTIC TAB BAR */}
      <div className="bg-[#dbe7f5] pt-1.5 px-2 flex items-center space-x-1 border-b border-[#a0b8d5] shrink-0">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => {
              setActiveTabId(tab.id);
              setUrl(tab.url);
              setInputUrl(tab.url);
            }}
            className={`px-3 py-1.5 rounded-t-xs text-[11px] flex items-center space-x-2 cursor-pointer border-t border-l border-r max-w-xs truncate ${
              tab.id === activeTabId
                ? 'bg-white border-[#94a3b8] font-medium text-gray-800 shadow-xs'
                : 'bg-white/50 border-transparent text-gray-600 hover:bg-white/80'
            }`}
          >
            <AppIconRenderer
              type={browserType === 'opera' ? 'browser_opera' : 'browser_ie'}
              size={13}
            />
            <span className="truncate">{tab.title}</span>
          </div>
        ))}
        <button
          onClick={() => {
            const newId = String(Date.now());
            setTabs((prev) => [...prev, { id: newId, title: 'SwiftRide Demo', url: 'https://uber-eta-eight.vercel.app/' }]);
            setActiveTabId(newId);
            navigateTo('https://uber-eta-eight.vercel.app/');
          }}
          className="px-2 py-0.5 text-gray-600 hover:text-black hover:bg-white/60 rounded text-sm cursor-pointer"
          title="New Tab"
          aria-label="New Tab"
        >
          +
        </button>
      </div>

      {/* 2. CHROME NAVIGATION & ADDRESS ROW */}
      <div className="bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] p-1.5 border-b border-[#cbd5e1] flex items-center space-x-2 shrink-0">
        {/* Blue Circular Back/Forward Buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => navigateTo('https://uber-eta-eight.vercel.app/')}
            className="w-6 h-6 rounded-full border border-sky-400/60 bg-gradient-to-b from-sky-100 to-sky-300 hover:from-sky-200 hover:to-sky-400 flex items-center justify-center text-sky-900 shadow-xs cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft size={12} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => navigateTo('https://linkedin.com/in/vedant-borude-2b871a332')}
            className="w-6 h-6 rounded-full border border-sky-400/60 bg-gradient-to-b from-sky-100 to-sky-300 hover:from-sky-200 hover:to-sky-400 flex items-center justify-center text-sky-900 shadow-xs cursor-pointer"
            aria-label="Forward"
          >
            <ArrowRight size={12} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => navigateTo(url)}
            className="w-6 h-6 rounded hover:bg-gray-200 flex items-center justify-center text-gray-700 cursor-pointer"
            aria-label="Refresh"
          >
            <RotateCw size={11} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Address Bar */}
        <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center bg-white border border-[#7f9db9] rounded-xs px-2 py-1 shadow-inner h-6.5 space-x-1.5">
          <Lock size={11} className="text-emerald-600 shrink-0" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[11px] text-gray-800"
            aria-label="Browser address bar"
          />
          {isLoading && <span className="text-[10px] text-sky-600 animate-pulse">Loading...</span>}
        </form>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="aero-button px-2.5 py-1 rounded-xs text-[11px] text-blue-900 font-medium flex items-center space-x-1 shrink-0 cursor-pointer shadow-xs"
          title="Open true external URL in a new browser tab"
        >
          <span>Open External</span>
          <ExternalLink size={11} />
        </a>
      </div>

      {/* 3. BOOKMARKS / FAVORITES BAR */}
      <div className="bg-[#f1f5f9] border-b border-[#cbd5e1] px-2 py-1 flex items-center space-x-2 shrink-0 text-[11px]">
        <span className="text-gray-500 flex items-center mr-1">
          <Star size={11} className="text-amber-500 fill-amber-400 mr-1" /> Favorites:
        </span>
        {bookmarks.map((bm, idx) => (
          <button
            key={idx}
            onClick={() => navigateTo(bm.url)}
            className={`px-2 py-0.5 rounded-xs cursor-pointer transition-colors flex items-center space-x-1 ${
              url === bm.url ? 'bg-sky-200 text-sky-900 font-semibold' : 'hover:bg-sky-100 text-gray-700'
            }`}
          >
            <span>{bm.title}</span>
          </button>
        ))}
      </div>

      {/* 4. WEB VIEWPORT */}
      <div className="flex-1 bg-white overflow-y-auto select-text relative">
        {/* Loading Bar */}
        {isLoading && (
          <div className="absolute top-0 inset-x-0 h-1 bg-sky-200 overflow-hidden z-30">
            <div className="h-full bg-blue-600 w-1/2 animate-pulse" />
          </div>
        )}

        {/* 4A: LIVE PORTFOLIO & PROJECT DEMO */}
        {isDemo && (
          <div className="w-full h-full flex flex-col bg-[#ffffff] text-gray-800 font-sans">
            {/* Live deployment information bar */}
            <div className="bg-[#ffffe1] border-b border-[#e6db55] px-3 py-1.5 flex items-center justify-between text-xs text-[#5c5310] shrink-0 shadow-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                  i
                </div>
                <span>
                  Showing live project deployment: <strong>{url}</strong>
                </span>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="aero-button px-2.5 py-0.5 rounded text-xs text-gray-900 font-medium flex items-center space-x-1 cursor-pointer shrink-0 ml-2"
              >
                <span>Open in Tab</span>
                <ExternalLink size={11} />
              </a>
            </div>

            {isChatify ? (
              <div className="flex-1 min-h-[380px] bg-gradient-to-br from-slate-50 to-sky-100 flex items-center justify-center p-6">
                <div className="max-w-md text-center bg-white border border-sky-200 rounded-lg shadow-md p-6">
                  <Globe size={42} className="mx-auto mb-3 text-sky-600" />
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    Chatify is ready to open
                  </h2>
                  <p className="text-xs leading-5 text-slate-600 mb-4">
                    Chatify does not allow other websites to embed its deployment in an iframe.
                    Open the live app in a browser tab instead.
                  </p>
                  <button
                    type="button"
                    onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                    className="aero-button px-4 py-2 rounded text-xs text-blue-900 font-semibold inline-flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Open Chatify</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 relative bg-white min-h-[380px]">
                <iframe
                  src={url}
                  title="Vedant Borude Live Portfolio & SwiftRide Demo"
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            )}
          </div>
        )}

        {/* 4B: LINKEDIN PROFILE REPLICA */}
        {isLinkedIn && (
          <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-[#f3f2ef] min-h-full font-sans">
            <div className="mb-4 bg-sky-50 border border-sky-300 rounded p-2.5 text-xs text-sky-900 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={16} className="text-blue-600 shrink-0" />
                <span>
                  <strong>Interactive Profile Replica:</strong> LinkedIn restricts iframe embedding. Verified from Vedant's portfolio credentials.
                </span>
              </div>
              <a
                href="https://linkedin.com/in/vedant-borude-2b871a332"
                target="_blank"
                rel="noopener noreferrer"
                className="aero-button px-3 py-1 rounded text-xs font-semibold text-blue-900 shrink-0 ml-3 flex items-center space-x-1"
              >
                <span>Open Real LinkedIn</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Profile Overview */}
            <div className="bg-white rounded border border-gray-300 shadow-xs p-5 space-y-4 mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-18 h-18 rounded-full bg-blue-800 text-white flex items-center justify-center text-xl font-bold border-2 border-white shadow">
                  VB
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {PORTFOLIO_DATA.socialProfiles.linkedin.name}
                  </h1>
                  <p className="text-xs text-gray-700 font-medium">
                    {PORTFOLIO_DATA.socialProfiles.linkedin.headline}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {PORTFOLIO_DATA.socialProfiles.linkedin.location} &bull; {PORTFOLIO_DATA.socialProfiles.linkedin.connections}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-1">About</h2>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {PORTFOLIO_DATA.socialProfiles.linkedin.about}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-1">Education</h2>
                <p className="text-xs text-gray-800 font-semibold">
                  {PORTFOLIO_DATA.socialProfiles.linkedin.education.school}
                </p>
                <p className="text-[11px] text-gray-600">
                  {PORTFOLIO_DATA.socialProfiles.linkedin.education.degree} (CGPA: 9.40 / 10.00)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4C: GITHUB PROFILE REPLICA */}
        {isGitHub && (
          <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white min-h-full font-sans">
            <div className="mb-4 bg-gray-100 border border-gray-300 rounded p-2.5 text-xs text-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={16} className="text-gray-700 shrink-0" />
                <span>
                  <strong>Interactive GitHub Replica:</strong> Syncs with Vedant's real repositories and commits.
                </span>
              </div>
              <a
                href="https://github.com/VedantBorude683"
                target="_blank"
                rel="noopener noreferrer"
                className="aero-button px-3 py-1 rounded text-xs font-semibold text-gray-900 shrink-0 ml-3 flex items-center space-x-1"
              >
                <span>Open Real GitHub</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
                  VB
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {PORTFOLIO_DATA.socialProfiles.github.name}
                  </h1>
                  <p className="text-xs text-gray-600 font-mono">
                    @{PORTFOLIO_DATA.socialProfiles.github.username}
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    {PORTFOLIO_DATA.socialProfiles.github.bio}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">
                  Pinned Repositories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PORTFOLIO_DATA.socialProfiles.github.pinnedRepos.map((repo, idx) => (
                    <div key={idx} className="border border-gray-300 rounded p-2.5 bg-gray-50/60 space-y-1">
                      <div className="font-semibold text-blue-700 text-xs">
                        {repo.name}
                      </div>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        {repo.description}
                      </p>
                      <div className="text-[10px] text-gray-500 pt-1">
                        Language: {repo.language} &bull; Stars: {repo.stars}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4D: FALLBACK SEARCH VIEW */}
        {!isLinkedIn && !isGitHub && !isDemo && (
          <div className="p-8 text-center max-w-lg mx-auto">
            <h1 className="text-lg font-bold text-gray-800 mb-2">Web Browser</h1>
            <p className="text-xs text-gray-600 mb-4">
              Select a favorite to explore Vedant's live portfolio and project deployments.
            </p>
            <div className="grid grid-cols-2 gap-2 text-left">
              {bookmarks.map((bm, i) => (
                <button
                  key={i}
                  onClick={() => navigateTo(bm.url)}
                  className="aero-button p-2.5 text-xs text-gray-800 font-medium rounded cursor-pointer"
                >
                  {bm.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. STATUS BAR */}
      <div className="bg-[#f0f0f0] border-t border-[#dfdfdf] px-3 py-0.5 flex items-center justify-between shrink-0 text-[11px] text-gray-500">
        <span>{isLoading ? 'Waiting for response...' : 'Done'}</span>
        <span className="flex items-center space-x-1">
          <ShieldCheck size={11} className="text-emerald-600" />
          <span>Protected Mode: On</span>
          <span className="ml-2">100%</span>
        </span>
      </div>
    </div>
  );
};
