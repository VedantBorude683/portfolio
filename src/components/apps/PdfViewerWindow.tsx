import React, { useState } from 'react';
import { Download, Printer, ZoomIn, ZoomOut, Maximize2, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data';

export const PdfViewerWindow: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleDownload = () => {
    // Attempt download of /Resume.pdf (user said they will place file in /public)
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Vedant_Borude_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#78828c] select-none h-full font-sans text-xs">
      {/* 1. WINDOWS 7 DOCUMENT VIEWER COMMAND BAR */}
      <div className="bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] text-gray-800 px-3 py-1 flex items-center justify-between border-b border-[#cbd5e1] shrink-0 text-[11px] shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-gray-900 font-semibold">
            <FileText size={14} className="text-red-600" />
            <span>Vedant_Borude_Resume.pdf</span>
          </div>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600 font-medium">Page 1 / 1</span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 text-gray-700">
          <button
            onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
            className="aero-button px-1.5 py-0.5 rounded cursor-pointer"
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut size={12} />
          </button>
          <span className="px-1 text-xs w-10 text-center font-mono font-medium">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
            className="aero-button px-1.5 py-0.5 rounded cursor-pointer"
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn size={12} />
          </button>
          <button
            onClick={() => setZoomLevel(100)}
            className="aero-button px-2 py-0.5 rounded cursor-pointer text-[10px] text-gray-800"
          >
            100%
          </button>
        </div>

        {/* Action Buttons: Download & Print */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownload}
            className="aero-button px-3 py-1 rounded text-xs font-semibold text-gray-900 flex items-center space-x-1.5 shadow-xs cursor-pointer"
            title="Download PDF"
          >
            <Download size={12} className="text-blue-700" />
            <span>Download</span>
          </button>

          <button
            onClick={handlePrint}
            className="aero-button p-1 text-gray-800 rounded cursor-pointer shadow-xs"
            title="Print Document"
            aria-label="Print"
          >
            <Printer size={13} />
          </button>
        </div>
      </div>

      {/* 2. DOCUMENT SCROLL AREA */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-[#525659]">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="bg-white text-gray-900 w-[780px] min-h-[1050px] p-8 sm:p-12 shadow-2xl transition-transform duration-100 select-text font-sans text-xs leading-normal"
        >
          {/* HEADER */}
          <div className="border-b-2 border-slate-900 pb-4 mb-4 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-950 uppercase tracking-tight">
                {PORTFOLIO_DATA.profile.name}
              </h1>
              <p className="text-sm font-semibold text-blue-700">
                {PORTFOLIO_DATA.profile.title} &bull; Distributed Systems & Real-Time Architectures
              </p>
            </div>
            <div className="text-right text-[11px] text-gray-600 space-y-0.5">
              <div>{PORTFOLIO_DATA.profile.email}</div>
              <div>{PORTFOLIO_DATA.profile.location}</div>
              <div className="text-blue-700 font-medium">github.com/VedantBorude683</div>
              <div className="text-blue-700 font-medium">linkedin.com/in/vedant-borude-2b871a332</div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-gray-300 pb-1 mb-1.5">
              Professional Summary
            </h2>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              {PORTFOLIO_DATA.profile.bio} Proven ability in architecting event-driven microservice validation pipelines with Apache Kafka, real-time media streaming with WebRTC, and scalable full-stack web applications.
            </p>
          </div>

          {/* EDUCATION */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-gray-300 pb-1 mb-1.5">
              Education
            </h2>
            <div className="flex justify-between items-baseline mb-1">
              <div>
                <strong className="text-xs text-slate-900">{PORTFOLIO_DATA.education.institution}</strong>
                <div className="text-[11px] text-gray-700">{PORTFOLIO_DATA.education.degree}</div>
              </div>
              <div className="text-right text-[11px] text-gray-600">
                <div>{PORTFOLIO_DATA.education.period}</div>
                <div className="font-bold text-emerald-700">CGPA: {PORTFOLIO_DATA.education.cgpa}</div>
              </div>
            </div>
            <div className="text-[10px] text-gray-600 mt-1">
              <strong>Key Coursework:</strong> {PORTFOLIO_DATA.education.coursework.join(' • ')}
            </div>
          </div>

          {/* PROJECTS */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-gray-300 pb-1 mb-2">
              Featured Projects
            </h2>

            {PORTFOLIO_DATA.projects.map((proj, idx) => (
              <div key={idx} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs text-slate-900">{proj.name}</span>
                  {proj.liveUrl && (
                    <span className="text-[10px] text-blue-700 font-mono">{proj.liveUrl}</span>
                  )}
                </div>
                <p className="text-[11px] text-gray-700 mt-0.5 leading-relaxed">
                  {proj.shortDesc}
                </p>
                <div className="text-[10px] text-slate-600 mt-0.5">
                  <strong>Stack:</strong> {proj.techStack.join(', ')}
                </div>
                {proj.metrics && (
                  <ul className="list-disc list-inside text-[10px] text-gray-600 mt-1 space-y-0.5">
                    {proj.metrics.map((m, mIdx) => (
                      <li key={mIdx}>{m}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* TECHNICAL SKILLS */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-gray-300 pb-1 mb-1.5">
              Technical Skills
            </h2>
            <div className="space-y-1 text-[11px]">
              <div>
                <strong>Languages:</strong> C, C++, Java, JavaScript (ES6+), MySQL, MongoDB
              </div>
              <div>
                <strong>Backend & Systems:</strong> Spring Boot, Node.js, Express.js, Apache Kafka, Docker, CI/CD, Git
              </div>
              <div>
                <strong>Web & Frontend:</strong> React.js, WebSockets, WebRTC, Tailwind CSS, REST APIs, JSON
              </div>
            </div>
          </div>

          {/* HONORS & AWARDS */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-gray-300 pb-1 mb-1.5">
              Honors & Achievements
            </h2>
            <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-1">
              {PORTFOLIO_DATA.achievements.map((ach, idx) => (
                <li key={idx}>
                  <strong>{ach.title}:</strong> {ach.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
