import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data';
import { AppIconRenderer } from '../common/OSIcons';

export const AchievementsWindow: React.FC = () => {
  const [selectedHonorIdx, setSelectedHonorIdx] = useState<number>(0);
  const selectedHonor = PORTFOLIO_DATA.achievements[selectedHonorIdx];

  return (
    <div className="flex-1 flex flex-col bg-[#ffffff] select-none h-full font-sans text-xs">
      {/* 1. TOP BREADCRUMB HEADER (CONTROL PANEL NAVIGATION STYLE) */}
      <div className="bg-[#f0f4f9] border-b border-[#d5dee8] px-3 py-1.5 flex items-center justify-between shrink-0 text-[11px] text-gray-700">
        <div className="flex items-center space-x-1.5">
          <AppIconRenderer type="control_panel" size={16} />
          <span className="hover:underline cursor-pointer">Control Panel</span>
          <ChevronRight size={11} className="text-gray-400" />
          <span className="hover:underline cursor-pointer">System and Security</span>
          <ChevronRight size={11} className="text-gray-400" />
          <span className="font-semibold text-gray-900">Action Center &bull; Engineering Honors</span>
        </div>

        <div className="text-gray-500 text-[10px]">
          Status: All 4 milestones verified
        </div>
      </div>

      {/* 2. BODY SPLIT (LEFT TASK PANE + RIGHT HONORS LIST) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Windows 7 Task Pane */}
        <div className="w-48 bg-[#f8fafc] border-r border-[#d5dee8] p-3 space-y-4 shrink-0 overflow-y-auto text-[11px]">
          <div>
            <div className="font-bold text-gray-700 mb-1.5">Tasks</div>
            <div className="space-y-1 text-blue-700">
              <a
                href={PORTFOLIO_DATA.profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>GitHub Repositories</span>
                <ExternalLink size={10} className="text-gray-400" />
              </a>
              <a
                href={PORTFOLIO_DATA.profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>LinkedIn Credentials</span>
                <ExternalLink size={10} className="text-gray-400" />
              </a>
              <a
                href={PORTFOLIO_DATA.profile.links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center space-x-1 cursor-pointer font-medium"
              >
                <span>Live Portfolio Demo</span>
                <ExternalLink size={10} className="text-gray-400" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <div className="font-bold text-gray-700 mb-1.5">Engineering Rating</div>
            <div className="bg-white border border-[#7f9db9] rounded-xs p-2 text-xs space-y-1 shadow-inner">
              <div className="text-gray-500 text-[10px]">Windows Experience</div>
              <div className="text-xl font-bold text-blue-900">7.9</div>
              <div className="text-[10px] text-emerald-700 font-semibold">Distinction Standing</div>
            </div>
          </div>
        </div>

        {/* Right Honors Main View */}
        <div className="flex-1 bg-white p-4 overflow-y-auto select-text space-y-4">
          {/* Windows 7 Action Center Header Banner */}
          <div className="border border-[#b8d6f5] bg-[#edf5fd] rounded-xs p-3 flex items-start space-x-3 shadow-2xs">
            <AppIconRenderer type="achievements" size={36} className="shrink-0" />
            <div>
              <h2 className="text-sm font-bold text-[#003399]">
                Review recent engineering honors and hackathon milestones
              </h2>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                Vedant Borude has demonstrated rapid architecture, distributed systems execution, and collegiate honors under strict delivery constraints.
              </p>
            </div>
          </div>

          {/* Windows 7 Fieldset GroupBox */}
          <fieldset className="border border-[#7f9db9] rounded-xs p-3 bg-[#ffffff] space-y-2">
            <legend className="px-1.5 text-xs font-bold text-blue-900">
              Verified Technical Honors & Hackathons
            </legend>

            <div className="space-y-1.5">
              {PORTFOLIO_DATA.achievements.map((item, idx) => {
                const isSelected = selectedHonorIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedHonorIdx(idx)}
                    className={`p-2 rounded-xs border cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-sky-50 border-sky-400 shadow-2xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                        <span className="font-bold text-xs text-gray-900">{item.title}</span>
                      </div>
                      <span className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-xs font-mono">
                        {item.year}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mt-1 pl-5 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-1 pl-5 text-[10px] text-gray-500 font-mono">
                      Category: {item.badge}
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>

          {/* Selected Item Detail Inspector */}
          {selectedHonor && (
            <div className="border border-gray-300 rounded-xs p-2.5 bg-gray-50 text-xs text-gray-700 space-y-1">
              <strong className="text-gray-900 block">Milestone Verification:</strong>
              <div>
                {selectedHonor.title} was audited during {selectedHonor.year} term at Pune Institute of Computer Technology.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. FOOTER */}
      <div className="bg-[#f0f0f0] border-t border-[#dfdfdf] px-3 py-1 flex items-center justify-between shrink-0 text-[11px] text-gray-500">
        <span>Windows Action Center &bull; All engineering certificates valid</span>
        <span>Version 6.1.7601</span>
      </div>
    </div>
  );
};
