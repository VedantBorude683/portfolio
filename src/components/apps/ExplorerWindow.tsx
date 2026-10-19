import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ArrowUp, RefreshCw, Search, Folder, FileText, 
  ChevronRight, HardDrive, Monitor, Star, Library, ExternalLink, Image as ImageIcon
} from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../../data';
import { useWindowStore, AppIconType } from '../../store/windowStore';
import { AppIconRenderer } from '../common/OSIcons';

interface ExplorerWindowProps {
  initialPath?: string;
}

interface FileSystemItem {
  name: string;
  type: 'folder' | 'file';
  extension?: string;
  size?: string;
  dateModified: string;
  iconType: AppIconType;
  targetApp?: string;
  targetParams?: Record<string, unknown>;
  description?: string;
}

export const ExplorerWindow: React.FC<ExplorerWindowProps> = ({ initialPath = 'C:\\Users\\Administrator' }) => {
  const [currentPath, setCurrentPath] = useState<string>(initialPath);
  const [history, setHistory] = useState<string[]>([initialPath]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<FileSystemItem | null>(null);
  const [viewMode, setViewMode] = useState<'icons' | 'details'>('icons');

  const { openWindow } = useWindowStore();

  const navigateTo = (newPath: string) => {
    if (newPath === currentPath) return;
    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(newPath);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
    setCurrentPath(newPath);
    setSelectedItem(null);
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      setHistoryIdx(historyIdx - 1);
      setCurrentPath(history[historyIdx - 1]);
      setSelectedItem(null);
    }
  };

  const handleForward = () => {
    if (historyIdx < history.length - 1) {
      setHistoryIdx(historyIdx + 1);
      setCurrentPath(history[historyIdx + 1]);
      setSelectedItem(null);
    }
  };

  const handleUp = () => {
    const segments = currentPath.split('\\');
    if (segments.length > 1) {
      segments.pop();
      const parent = segments.length === 1 ? `${segments[0]}\\` : segments.join('\\');
      navigateTo(parent);
    }
  };

  // Generate dynamic items based on directory
  const getItemsForPath = (path: string): FileSystemItem[] => {
    const normalized = path.replace(/\\$/, '');

    // Root Computer
    if (normalized === 'Computer') {
      return [
        {
          name: 'Local Disk (C:)',
          type: 'folder',
          dateModified: '2026-04-19',
          iconType: 'computer',
          size: '412 GB free of 1 TB',
          description: 'System Drive containing Windows 7 & Developer Workspace',
        },
      ];
    }

    if (normalized === 'C:' || normalized === 'C:\\Users') {
      return [
        {
          name: 'Administrator',
          type: 'folder',
          dateModified: '2026-04-19',
          iconType: 'folder',
          description: 'Vedant Borude User Profile Workspace',
        },
      ];
    }

    // Main Administrator root
    if (normalized === 'C:\\Users\\Administrator') {
      return [
        {
          name: 'Projects',
          type: 'folder',
          dateModified: '2026-04-19',
          iconType: 'folder',
          description: 'Distributed Microservices, Kafka, WebRTC & Full Stack Deployments',
        },
        {
          name: 'Documents',
          type: 'folder',
          dateModified: '2026-04-19',
          iconType: 'folder',
          description: 'Personal notes, architecture & system specs',
        },
        {
          name: 'Education',
          type: 'folder',
          dateModified: '2026-04-19',
          iconType: 'education',
          targetApp: 'education',
          description: 'Pune Institute of Computer Technology (PICT) Degree & 9.40 CGPA',
        },
        {
          name: 'Achievements',
          type: 'folder',
          dateModified: '2026-04-19',
          iconType: 'achievements',
          targetApp: 'achievements',
          description: 'Hackathon prototypes & team leadership accolades',
        },
        {
          name: 'Portfolio Live Link.url',
          type: 'file',
          extension: 'url',
          size: '1.2 KB',
          dateModified: '2026-04-19',
          iconType: 'browser_ie',
          targetApp: 'browser_ie',
          targetParams: { initialUrl: 'https://uber-eta-eight.vercel.app/', title: 'Vedant Borude - Live Portfolio' },
          description: 'Live Portfolio & Projects Deployment (https://uber-eta-eight.vercel.app/)',
        },
        {
          name: 'About Me.txt',
          type: 'file',
          extension: 'txt',
          size: '2.4 KB',
          dateModified: '2026-04-19',
          iconType: 'notepad',
          targetApp: 'notepad',
          targetParams: { fileName: 'About Me.txt', content: PORTFOLIO_DATA.aboutMeDoc },
          description: 'Personal intro, engineering focus & developer profile',
        },
        {
          name: 'Resume.pdf',
          type: 'file',
          extension: 'pdf',
          size: '142 KB',
          dateModified: '2026-04-19',
          iconType: 'pdf',
          targetApp: 'pdf',
          description: 'Official Software Engineer Resume (PDF format with Download)',
        },
        {
          name: 'System Skills.sys',
          type: 'file',
          extension: 'sys',
          size: '7.9 WEI',
          dateModified: '2026-04-19',
          iconType: 'control_panel',
          targetApp: 'system',
          description: 'Windows Experience Index 7.9 - Skill Ratings breakdown',
        },
      ];
    }

    // Projects Folder
    if (normalized === 'C:\\Users\\Administrator\\Projects') {
      return PORTFOLIO_DATA.projects.map((proj: ProjectItem) => ({
        name: proj.folderName,
        type: 'folder' as const,
        dateModified: '2026-04-19',
        iconType: 'folder' as const,
        description: proj.shortDesc,
      }));
    }

    // Specific Project folder
    const projectMatch = PORTFOLIO_DATA.projects.find(
      (p) => normalized === `C:\\Users\\Administrator\\Projects\\${p.folderName}`
    );

    if (projectMatch) {
      const items: FileSystemItem[] = [
        {
          name: 'README.txt',
          type: 'file',
          extension: 'txt',
          size: '4.8 KB',
          dateModified: '2026-04-19',
          iconType: 'notepad',
          targetApp: 'notepad',
          targetParams: {
            fileName: `${projectMatch.name} - README.txt`,
            content: projectMatch.readme,
          },
          description: 'Comprehensive architectural documentation & stack breakdown',
        },
        {
          name: 'Screenshots & Topology',
          type: 'folder',
          dateModified: '2026-04-19',
          iconType: 'folder',
          description: 'Visual system diagrams & user interface captures',
        },
      ];

      if (projectMatch.liveUrl) {
        items.push({
          name: `Launch ${projectMatch.name}.url`,
          type: 'file',
          extension: 'url',
          size: '1.1 KB',
          dateModified: '2026-04-19',
          iconType: 'browser_ie',
          targetApp: 'browser_ie',
          targetParams: { initialUrl: projectMatch.liveUrl, title: projectMatch.name },
          description: `Direct live production demo link (${projectMatch.liveUrl})`,
        });
      }

      return items;
    }

    // Screenshots inside a project
    const screenshotMatch = PORTFOLIO_DATA.projects.find(
      (p) => normalized === `C:\\Users\\Administrator\\Projects\\${p.folderName}\\Screenshots & Topology`
    );

    if (screenshotMatch) {
      return screenshotMatch.screenshots.map((s, idx) => ({
        name: `${idx + 1}_${s.title.replace(/\s+/g, '_')}.png`,
        type: 'file' as const,
        extension: 'png',
        size: '1.2 MB',
        dateModified: '2026-04-19',
        iconType: 'computer' as const,
        description: s.caption,
      }));
    }

    // Documents Folder
    if (normalized === 'C:\\Users\\Administrator\\Documents') {
      return [
        {
          name: 'About Me.txt',
          type: 'file',
          extension: 'txt',
          size: '2.4 KB',
          dateModified: '2026-04-19',
          iconType: 'notepad',
          targetApp: 'notepad',
          targetParams: { fileName: 'About Me.txt', content: PORTFOLIO_DATA.aboutMeDoc },
          description: 'Personal profile & core values',
        },
        {
          name: 'Engineering_Notes.txt',
          type: 'file',
          extension: 'txt',
          size: '3.1 KB',
          dateModified: '2026-04-19',
          iconType: 'notepad',
          targetParams: {
            fileName: 'Engineering_Notes.txt',
            content: `ENGINEERING NOTES - VEDANT BORUDE\n\n1. Resilient Decoupling:\n   Leveraging Kafka event queues prevents cascading microservice failures.\n\n2. Real-Time Responsiveness:\n   Socket.io with WebRTC P2P bridges eliminate polling overhead and deliver true low-latency sync.\n\n3. High-Performance Architecture:\n   Deterministic data flow, sub-second latency, and scalable indexing.\n\nLive Project Link: https://uber-eta-eight.vercel.app/`,
          },
          description: 'Technical notes on event-driven design & reactive state patterns',
        },
      ];
    }

    return [];
  };

  const rawItems = getItemsForPath(currentPath);
  const items = searchQuery
    ? rawItems.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : rawItems;

  const handleItemDoubleClick = (item: FileSystemItem) => {
    if (item.type === 'folder') {
      if (item.targetApp) {
        if (item.targetApp === 'education') {
          openWindow({
            id: 'education-cert',
            title: 'PICT Academic Degree Certificate & Coursework',
            icon: 'education',
            component: 'education',
            defaultWidth: 780,
            defaultHeight: 520,
          });
          return;
        }
        if (item.targetApp === 'achievements') {
          openWindow({
            id: 'achievements-view',
            title: 'Hackathons & Technical Honors',
            icon: 'achievements',
            component: 'achievements',
            defaultWidth: 740,
            defaultHeight: 500,
          });
          return;
        }
      }
      const newPath = currentPath === 'Computer' ? item.name : `${currentPath}\\${item.name}`;
      navigateTo(newPath);
    } else {
      if (item.targetApp === 'notepad') {
        openWindow({
          id: `notepad-${item.name}`,
          title: `${item.name} - Notepad`,
          icon: 'notepad',
          component: 'notepad',
          params: item.targetParams,
          defaultWidth: 640,
          defaultHeight: 440,
        });
      } else if (item.targetApp === 'pdf') {
        openWindow({
          id: 'resume-pdf',
          title: 'Resume.pdf - Windows 7 Document Viewer',
          icon: 'pdf',
          component: 'pdf',
          defaultWidth: 760,
          defaultHeight: 560,
        });
      } else if (item.targetApp === 'system') {
        openWindow({
          id: 'system-properties',
          title: 'System - Skills & Windows Experience Index',
          icon: 'control_panel',
          component: 'system',
          defaultWidth: 740,
          defaultHeight: 540,
        });
      } else if (item.targetApp === 'browser_ie') {
        openWindow({
          id: 'browser-live-demo',
          title: (item.targetParams?.title as string) || 'Internet Explorer',
          icon: 'browser_ie',
          component: 'browser',
          params: item.targetParams,
          defaultWidth: 840,
          defaultHeight: 560,
        });
      }
    }
  };

  const breadcrumbSegments = currentPath.split('\\').filter(Boolean);

  return (
    <div className="flex-1 flex flex-col bg-[#ffffff] select-none text-xs text-gray-800 h-full font-sans">
      {/* 1. TOP NAV & ADDRESS ROW */}
      <div className="bg-[#f0f4f9] border-b border-[#d9d9d9] px-2 py-1.5 flex items-center space-x-2 shrink-0">
        <div className="flex items-center space-x-1">
          <button
            onClick={handleBack}
            disabled={historyIdx === 0}
            className="w-6 h-6 rounded-full border border-sky-400/50 bg-gradient-to-b from-sky-100 to-sky-300 disabled:opacity-40 disabled:from-gray-100 disabled:to-gray-200 disabled:border-gray-300 flex items-center justify-center text-sky-900 shadow-xs cursor-pointer disabled:cursor-default"
            aria-label="Back"
          >
            <ArrowLeft size={13} strokeWidth={2.5} />
          </button>
          <button
            onClick={handleForward}
            disabled={historyIdx >= history.length - 1}
            className="w-6 h-6 rounded-full border border-sky-400/50 bg-gradient-to-b from-sky-100 to-sky-300 disabled:opacity-40 disabled:from-gray-100 disabled:to-gray-200 disabled:border-gray-300 flex items-center justify-center text-sky-900 shadow-xs cursor-pointer disabled:cursor-default"
            aria-label="Forward"
          >
            <ArrowRight size={13} strokeWidth={2.5} />
          </button>
          <button
            onClick={handleUp}
            className="w-6 h-6 rounded hover:bg-gray-200/80 flex items-center justify-center text-gray-700 cursor-pointer"
            aria-label="Up one folder"
          >
            <ArrowUp size={13} />
          </button>
        </div>

        {/* Breadcrumb Address Bar */}
        <div className="flex-1 bg-white border border-[#a0a0a0] rounded-xs px-2 py-0.5 flex items-center space-x-1 shadow-inner h-6">
          <AppIconRenderer type="folder" size={14} className="shrink-0" />
          <div className="flex items-center space-x-1 overflow-x-auto text-[11px] text-gray-700">
            {breadcrumbSegments.map((segment, idx) => (
              <React.Fragment key={idx}>
                <button
                  onClick={() => {
                    const target = breadcrumbSegments.slice(0, idx + 1).join('\\');
                    navigateTo(target);
                  }}
                  className="hover:bg-blue-100 hover:text-blue-800 px-1 rounded cursor-pointer whitespace-nowrap"
                >
                  {segment}
                </button>
                {idx < breadcrumbSegments.length - 1 && (
                  <ChevronRight size={11} className="text-gray-400 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
          <button
            onClick={() => setCurrentPath((p) => p)}
            className="ml-auto text-gray-400 hover:text-gray-700 cursor-pointer"
            aria-label="Refresh"
          >
            <RefreshCw size={11} />
          </button>
        </div>

        {/* Search Box */}
        <div className="w-48 bg-white border border-[#a0a0a0] rounded-xs px-2 py-0.5 flex items-center space-x-1 shadow-inner h-6">
          <Search size={12} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder={`Search ${breadcrumbSegments[breadcrumbSegments.length - 1] || 'folder'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-[11px] placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* 2. COMMAND / ACTION TOOLBAR */}
      <div className="bg-[#eef3f8] border-b border-[#d2dbe5] px-2 py-1 flex items-center justify-between shrink-0 text-[11px]">
        <div className="flex items-center space-x-3 text-gray-700">
          <button className="hover:bg-sky-100 hover:text-blue-900 px-2 py-0.5 rounded cursor-pointer">
            Organize ▾
          </button>
          <button
            onClick={() => {
              if (selectedItem) handleItemDoubleClick(selectedItem);
            }}
            disabled={!selectedItem}
            className="hover:bg-sky-100 hover:text-blue-900 disabled:opacity-40 px-2 py-0.5 rounded cursor-pointer"
          >
            Open
          </button>
          <button
            onClick={() => {
              openWindow({
                id: 'notepad-new',
                title: 'Untitled - Notepad',
                icon: 'notepad',
                component: 'notepad',
                params: { fileName: 'Untitled.txt', content: '' },
              });
            }}
            className="hover:bg-sky-100 hover:text-blue-900 px-2 py-0.5 rounded cursor-pointer"
          >
            New document
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-1 text-gray-600">
          <button
            onClick={() => setViewMode('icons')}
            className={`px-1.5 py-0.5 rounded-xs cursor-pointer ${
              viewMode === 'icons' ? 'bg-sky-200 text-sky-900 font-medium' : 'hover:bg-gray-200'
            }`}
          >
            Icons
          </button>
          <button
            onClick={() => setViewMode('details')}
            className={`px-1.5 py-0.5 rounded-xs cursor-pointer ${
              viewMode === 'details' ? 'bg-sky-200 text-sky-900 font-medium' : 'hover:bg-gray-200'
            }`}
          >
            Details
          </button>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE (SIDEBAR + FILES GRID) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Tree Navigation Sidebar */}
        <div className="w-44 bg-[#f8fafc] border-r border-[#d4dbe4] p-2 overflow-y-auto space-y-3 shrink-0 text-[11px]">
          <div>
            <div className="flex items-center space-x-1 text-gray-500 font-semibold mb-1">
              <Star size={12} className="text-amber-500" />
              <span>Favorites</span>
            </div>
            <div className="space-y-0.5 pl-3">
              <button
                onClick={() => navigateTo('C:\\Users\\Administrator')}
                className="w-full text-left py-0.5 px-1 rounded hover:bg-sky-100 text-gray-700 flex items-center space-x-1.5 cursor-pointer"
              >
                <Monitor size={12} className="text-blue-500" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => navigateTo('C:\\Users\\Administrator\\Projects')}
                className="w-full text-left py-0.5 px-1 rounded hover:bg-sky-100 text-gray-700 flex items-center space-x-1.5 cursor-pointer"
              >
                <Folder size={12} className="text-amber-500" />
                <span>Projects</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-1 text-gray-500 font-semibold mb-1">
              <Library size={12} className="text-blue-600" />
              <span>Libraries</span>
            </div>
            <div className="space-y-0.5 pl-3">
              <button
                onClick={() => navigateTo('C:\\Users\\Administrator\\Documents')}
                className="w-full text-left py-0.5 px-1 rounded hover:bg-sky-100 text-gray-700 flex items-center space-x-1.5 cursor-pointer"
              >
                <FileText size={12} className="text-sky-600" />
                <span>Documents</span>
              </button>
              <button
                onClick={() => navigateTo('C:\\Users\\Administrator\\Projects')}
                className="w-full text-left py-0.5 px-1 rounded hover:bg-sky-100 text-gray-700 flex items-center space-x-1.5 cursor-pointer"
              >
                <Folder size={12} className="text-amber-500" />
                <span>Projects</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-1 text-gray-500 font-semibold mb-1">
              <HardDrive size={12} className="text-gray-600" />
              <span>Computer</span>
            </div>
            <div className="space-y-0.5 pl-3">
              <button
                onClick={() => navigateTo('C:\\Users\\Administrator')}
                className="w-full text-left py-0.5 px-1 rounded hover:bg-sky-100 text-gray-700 flex items-center space-x-1.5 cursor-pointer"
              >
                <HardDrive size={12} className="text-slate-500" />
                <span>Local Disk (C:)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Main File List */}
        <div className="flex-1 bg-white p-3 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-8 text-center text-gray-400">This folder is empty.</div>
          ) : viewMode === 'icons' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {items.map((item, idx) => {
                const isSelected = selectedItem?.name === item.name;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedItem(item)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    className={`flex flex-col items-center p-2 rounded-xs cursor-pointer border text-center transition-colors group ${
                      isSelected
                        ? 'bg-sky-100 border-sky-400 shadow-2xs'
                        : 'border-transparent hover:bg-sky-50 hover:border-sky-200'
                    }`}
                  >
                    <div className="relative mb-1">
                      <AppIconRenderer type={item.iconType} size={40} className="drop-shadow-xs" />
                      {item.targetApp === 'browser_ie' && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-0.5">
                          <ExternalLink size={9} />
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] leading-tight text-gray-800 break-words line-clamp-2 max-w-[100px] select-none font-medium">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-normal">
                  <th className="py-1 px-2 font-medium">Name</th>
                  <th className="py-1 px-2 font-medium">Date modified</th>
                  <th className="py-1 px-2 font-medium">Type</th>
                  <th className="py-1 px-2 font-medium">Size</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => {
                  const isSelected = selectedItem?.name === item.name;
                  return (
                    <tr
                      key={idx}
                      onClick={() => setSelectedItem(item)}
                      onDoubleClick={() => handleItemDoubleClick(item)}
                      className={`cursor-pointer border-b border-gray-100 ${
                        isSelected ? 'bg-sky-100 text-sky-900' : 'hover:bg-sky-50'
                      }`}
                    >
                      <td className="py-1 px-2 flex items-center space-x-2">
                        <AppIconRenderer type={item.iconType} size={16} />
                        <span className="font-medium text-gray-800">{item.name}</span>
                      </td>
                      <td className="py-1 px-2 text-gray-500">{item.dateModified}</td>
                      <td className="py-1 px-2 text-gray-500 capitalize">{item.type === 'folder' ? 'File folder' : `${item.extension?.toUpperCase() || 'File'} Document`}</td>
                      <td className="py-1 px-2 text-gray-500">{item.size || ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 4. DETAILS PANE AT BOTTOM */}
      <div className="bg-[#eef3f8] border-t border-[#d5dee8] px-3 py-1 flex items-center justify-between shrink-0 text-[11px]">
        <div className="flex items-center space-x-3">
          <div className="text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </div>
          {selectedItem && (
            <div className="flex items-center space-x-2 border-l border-gray-300 pl-3">
              <AppIconRenderer type={selectedItem.iconType} size={15} />
              <span className="font-semibold text-gray-800">{selectedItem.name}</span>
              <span className="text-gray-500">({selectedItem.description || selectedItem.size || 'Item'})</span>
            </div>
          )}
        </div>

        <div className="text-gray-500 text-[10px]">
          Vedant Borude Explorer v6.1
        </div>
      </div>
    </div>
  );
};
