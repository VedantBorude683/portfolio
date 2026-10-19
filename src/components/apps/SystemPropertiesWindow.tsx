import React, { useState } from 'react';
import { ShieldCheck, Cpu, HardDrive, Award, CheckCircle2, ChevronRight, RefreshCw, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data';
import { AppIconRenderer } from '../common/OSIcons';

export const SystemPropertiesWindow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'skills_breakdown'>('general');
  const [isReassessing, setIsReassessing] = useState(false);

  const handleRerunAssessment = () => {
    setIsReassessing(true);
    setTimeout(() => {
      setIsReassessing(false);
    }, 1200);
  };

  const experienceRows = [
    {
      component: 'Processor',
      assessed: 'Calculations per second (Java, Spring Boot, C++, Low-Level Concurrency)',
      subscore: 7.9,
    },
    {
      component: 'Memory (RAM)',
      assessed: 'Memory operations per second (Data Structures, Algorithms, Buffer Pools)',
      subscore: 7.9,
    },
    {
      component: 'Graphics',
      assessed: 'Desktop performance for Windows Aero & Interactive Web (React.js, Modern UI)',
      subscore: 7.9,
    },
    {
      component: 'Gaming graphics',
      assessed: '3D business & real-time streaming performance (WebSockets, WebRTC P2P Media)',
      subscore: 7.8,
    },
    {
      component: 'Primary hard disk',
      assessed: 'Disk data transfer rate (MongoDB, MySQL Indexing, Apache Kafka Event Streams)',
      subscore: 7.9,
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#f0f0f0] select-none h-full font-sans text-xs">
      {/* 1. AUTHENTIC WINDOWS 7 TAB STRIP */}
      <div className="bg-[#e4ebf3] pt-2 px-3 flex items-center space-x-1 border-b border-[#a0b8d5] shrink-0 text-[11px]">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-3 py-1 rounded-t border-t border-l border-r cursor-pointer transition-colors ${
            activeTab === 'general'
              ? 'bg-white border-[#94a3b8] font-semibold text-gray-800 shadow-2xs'
              : 'bg-white/40 border-transparent text-gray-600 hover:bg-white/80'
          }`}
        >
          General & System Specs
        </button>
        <button
          onClick={() => setActiveTab('skills_breakdown')}
          className={`px-3 py-1 rounded-t border-t border-l border-r cursor-pointer transition-colors ${
            activeTab === 'skills_breakdown'
              ? 'bg-white border-[#94a3b8] font-semibold text-gray-800 shadow-2xs'
              : 'bg-white/40 border-transparent text-gray-600 hover:bg-white/80'
          }`}
        >
          Windows Experience Index (Technical Skills)
        </button>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 bg-white p-4 sm:p-5 overflow-y-auto select-text text-gray-800">
        {/* ================= GENERAL TAB ================= */}
        {activeTab === 'general' ? (
          <div className="space-y-5 max-w-2xl">
            {/* Windows Edition Banner */}
            <div className="flex items-start space-x-4 border-b border-gray-200 pb-3">
              <div className="w-13 h-13 bg-gradient-to-br from-blue-600 via-sky-600 to-blue-800 rounded shadow-md flex items-center justify-center text-white font-bold text-lg shrink-0 border border-white/50">
                W7
              </div>
              <div className="space-y-0.5">
                <h2 className="text-sm font-bold text-[#003399]">
                  {PORTFOLIO_DATA.profile.systemSpecs.os}
                </h2>
                <p className="text-[11px] text-gray-600">
                  Copyright &copy; 2026 Vedant Borude. All developer privileges granted.
                </p>
                <p className="text-[11px] text-gray-500">Service Pack 1 &bull; Engineering Workstation Edition</p>
              </div>
            </div>

            {/* System Hardware Specifications */}
            <div className="space-y-2 border-b border-gray-200 pb-3">
              <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                System
              </h3>

              <div className="grid grid-cols-[130px_1fr] gap-y-1.5 text-xs">
                <div className="text-gray-500 font-medium">Rating:</div>
                <div className="flex items-center space-x-2">
                  <div className="px-2 py-0.5 rounded-xs bg-gradient-to-b from-sky-400 via-blue-600 to-blue-700 text-white font-bold text-xs shadow-xs">
                    {PORTFOLIO_DATA.profile.systemSpecs.experienceIndex}
                  </div>
                  <button
                    onClick={() => setActiveTab('skills_breakdown')}
                    className="text-blue-700 hover:underline font-semibold cursor-pointer"
                  >
                    Windows Experience Index (View Skills Breakdown)
                  </button>
                </div>

                <div className="text-gray-500 font-medium">Processor:</div>
                <div className="text-gray-900 font-medium">
                  {PORTFOLIO_DATA.profile.systemSpecs.processor}
                </div>

                <div className="text-gray-500 font-medium">Installed memory:</div>
                <div className="text-gray-900">
                  {PORTFOLIO_DATA.profile.systemSpecs.memory}
                </div>

                <div className="text-gray-500 font-medium">System type:</div>
                <div className="text-gray-900">
                  {PORTFOLIO_DATA.profile.systemSpecs.systemType}
                </div>

                <div className="text-gray-500 font-medium">Role Focus:</div>
                <div className="text-blue-900 font-semibold">
                  {PORTFOLIO_DATA.profile.roleSubtitle}
                </div>

                <div className="text-gray-500 font-medium">Portfolio Link:</div>
                <div>
                  <a
                    href={PORTFOLIO_DATA.profile.links.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline font-semibold flex items-center space-x-1"
                  >
                    <span>{PORTFOLIO_DATA.profile.links.portfolio}</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>

            {/* Computer Name, Domain, and Workgroup */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                Computer name, domain, and workgroup settings
              </h3>

              <div className="grid grid-cols-[130px_1fr] gap-y-1.5 text-xs">
                <div className="text-gray-500 font-medium">Computer name:</div>
                <div className="text-gray-900 font-mono text-xs">
                  {PORTFOLIO_DATA.profile.systemSpecs.computerName}
                </div>

                <div className="text-gray-500 font-medium">Full computer name:</div>
                <div className="text-gray-900 font-semibold">
                  {PORTFOLIO_DATA.profile.name} (Administrator)
                </div>

                <div className="text-gray-500 font-medium">Workgroup:</div>
                <div className="text-gray-900 font-mono text-xs">
                  {PORTFOLIO_DATA.profile.systemSpecs.workgroup}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= SKILLS: WINDOWS EXPERIENCE INDEX ================= */
          <div className="space-y-4 max-w-3xl">
            {/* Header Description */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#003399]">
                  Rate and improve your computer's performance
                </h2>
                <p className="text-xs text-gray-600 mt-0.5">
                  The Windows Experience Index assesses key components on a scale of 1.0 to 7.9.
                </p>
              </div>

              {/* Base Score Badge */}
              <div className="border border-[#7f9db9] rounded bg-[#eef3f8] p-2 flex items-center space-x-3 shadow-inner shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-gray-600 font-medium">Base score</div>
                  <div className="text-[9px] text-blue-800">Highest subscore: 7.9</div>
                </div>
                <div className="w-10 h-10 rounded-xs bg-gradient-to-b from-sky-400 via-blue-600 to-blue-700 text-white font-bold text-xl flex items-center justify-center shadow-xs border border-white/40">
                  7.9
                </div>
              </div>
            </div>

            {/* Performance Subscore Table (Faithful Windows 7 Style) */}
            <div className="border border-[#7f9db9] rounded overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#eef3f8] border-b border-[#cbd5e1] text-gray-700 font-semibold text-[11px]">
                  <tr>
                    <th className="py-1.5 px-3 w-40 border-r border-[#cbd5e1]">Component</th>
                    <th className="py-1.5 px-3 border-r border-[#cbd5e1]">What is assessed</th>
                    <th className="py-1.5 px-3 w-28 text-center">Subscore</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {experienceRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-sky-50 transition-colors">
                      <td className="py-2 px-3 font-semibold text-gray-800 border-r border-gray-200">
                        {row.component}:
                      </td>
                      <td className="py-2 px-3 text-gray-600 text-[11px] leading-relaxed border-r border-gray-200">
                        {row.assessed}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-xs bg-blue-600 text-white font-bold text-xs shadow-2xs">
                          {row.subscore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Re-Run Assessment Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>
                  {isReassessing ? 'Evaluating system hardware...' : 'Base score determined by lowest subscore.'}
                </span>
              </div>

              <button
                onClick={handleRerunAssessment}
                disabled={isReassessing}
                className="aero-button px-4 py-1 text-xs text-gray-800 font-medium rounded flex items-center space-x-1.5 cursor-pointer shadow-xs shrink-0"
              >
                <RefreshCw size={12} className={isReassessing ? 'animate-spin text-blue-600' : 'text-gray-600'} />
                <span>{isReassessing ? 'Testing...' : 'Re-run the assessment'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. DIALOG FOOTER */}
      <div className="bg-[#f0f0f0] border-t border-[#dfdfdf] px-4 py-2 flex items-center justify-between shrink-0 text-[11px] text-gray-600">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck size={14} className="text-blue-700" />
          <span>Windows is activated & verified. Product ID: VEDANT-77-ENG-2026</span>
        </div>
        <button
          onClick={() => setActiveTab(activeTab === 'general' ? 'skills_breakdown' : 'general')}
          className="aero-button px-3 py-1 rounded text-xs text-gray-800 cursor-pointer shadow-xs"
        >
          {activeTab === 'general' ? 'View Technical Skills' : 'View System Specs'}
        </button>
      </div>
    </div>
  );
};
