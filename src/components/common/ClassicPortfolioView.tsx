import React, { useState } from 'react';
import { 
  Monitor, Download, ExternalLink, Github, Linkedin, Mail, MapPin, 
  Award, GraduationCap, CheckCircle2, Copy, Sparkles, ArrowRight, ShieldCheck, HardDrive
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data';
import { useWindowStore } from '../../store/windowStore';
import { StartOrbIcon, AppIconRenderer } from './OSIcons';

export const ClassicPortfolioView: React.FC = () => {
  const { setClassicPortfolioMode } = useWindowStore();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#edf2f8] text-[#1e293b] font-sans selection:bg-blue-100 selection:text-blue-900 pb-12">
      {/* 1. TOP WINDOWS 7 AERO TASKBAR HEADER */}
      <header className="sticky top-0 z-50 aero-taskbar px-4 py-1.5 text-white shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <StartOrbIcon size={32} />
            <div>
              <span className="font-bold text-xs tracking-wide drop-shadow">
                Windows 7 Welcome Center
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] text-sky-200">
                &bull; Vedant Borude Developer Specifications
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={PORTFOLIO_DATA.profile.links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="aero-button px-3 py-1 rounded-xs text-xs font-semibold text-blue-900 flex items-center space-x-1.5 shadow-xs"
            >
              <span>Live Portfolio URL</span>
              <ExternalLink size={11} />
            </a>

            <button
              onClick={() => setClassicPortfolioMode(false)}
              className="aero-button px-3.5 py-1 rounded-xs text-xs font-bold text-gray-900 flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Monitor size={13} className="text-blue-700" />
              <span>Return to Desktop</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN DOCUMENT BODY (WINDOWS 7 WELCOME CENTER AESTHETIC) */}
      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
        {/* Welcome Center Hero Banner */}
        <div className="border border-[#7f9db9] bg-[#ffffff] rounded-xs p-5 shadow-xs flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#003399]">
              <AppIconRenderer type="control_panel" size={16} />
              <span>Welcome Center &bull; Full Stack Developer Overview</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {PORTFOLIO_DATA.profile.name} — {PORTFOLIO_DATA.profile.title}
            </h1>

            <p className="text-xs text-gray-700 leading-relaxed max-w-2xl">
              {PORTFOLIO_DATA.profile.bio}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium">
              <button
                onClick={copyEmail}
                className="aero-button px-3 py-1 rounded-xs text-gray-800 flex items-center space-x-1.5 cursor-pointer shadow-2xs"
              >
                <Mail size={12} className="text-blue-600" />
                <span>{copiedEmail ? 'Copied Email!' : PORTFOLIO_DATA.profile.email}</span>
              </button>

              <a
                href={PORTFOLIO_DATA.profile.links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="aero-button px-3 py-1 rounded-xs text-blue-900 font-bold flex items-center space-x-1.5 shadow-2xs"
              >
                <ExternalLink size={12} className="text-blue-700" />
                <span>https://uber-eta-eight.vercel.app/</span>
              </a>

              <a
                href={PORTFOLIO_DATA.profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="aero-button px-3 py-1 rounded-xs text-gray-800 flex items-center space-x-1.5 shadow-2xs"
              >
                <Github size={12} />
                <span>GitHub</span>
              </a>

              <a
                href={PORTFOLIO_DATA.profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="aero-button px-3 py-1 rounded-xs text-blue-900 font-semibold flex items-center space-x-1.5 shadow-2xs"
              >
                <Linkedin size={12} className="text-blue-700" />
                <span>LinkedIn</span>
              </a>

              <span className="text-gray-600 text-xs px-1 flex items-center space-x-1">
                <MapPin size={12} />
                <span>{PORTFOLIO_DATA.profile.location}</span>
              </span>
            </div>
          </div>

          {/* Windows Experience Index Score Box */}
          <div className="p-3 rounded-xs bg-[#eef3f8] border border-[#7f9db9] shadow-inner flex flex-col items-center shrink-0 text-center min-w-[120px]">
            <span className="text-[10px] text-gray-600 font-medium">Experience Index</span>
            <span className="text-3xl font-extrabold text-blue-900 leading-tight">7.9</span>
            <span className="text-[10px] text-emerald-800 font-semibold">Base Score</span>
          </div>
        </div>

        {/* FEATURED PROJECTS */}
        <section className="space-y-3">
          <div className="border-b border-[#cbd5e1] pb-1 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#003399]">
              Featured Production & Distributed Systems
            </h2>
            <span className="text-xs text-gray-500 font-mono">3 Core Systems</span>
          </div>

          <div className="space-y-3">
            {PORTFOLIO_DATA.projects.map((proj) => (
              <div
                key={proj.id}
                className="border border-[#7f9db9] rounded-xs p-4 bg-white shadow-2xs space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                    <AppIconRenderer type="folder" size={18} />
                    <span>{proj.name}</span>
                  </h3>

                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aero-button px-3 py-1 rounded-xs text-xs font-bold text-blue-900 flex items-center space-x-1.5 shadow-xs shrink-0"
                    >
                      <span>Live Production Demo</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>

                <p className="text-xs text-gray-700 leading-relaxed">
                  {proj.shortDesc}
                </p>

                {proj.metrics && (
                  <div className="bg-[#f8fafc] border border-gray-200 rounded-xs p-2 space-y-1 text-xs text-gray-700">
                    {proj.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-start space-x-2">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {proj.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] bg-[#eef3f8] text-gray-800 font-medium px-2 py-0.5 rounded-xs border border-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL SKILLS TABLE */}
        <section className="space-y-3">
          <div className="border-b border-[#cbd5e1] pb-1">
            <h2 className="text-sm font-bold text-[#003399]">
              Technical Skills & Windows Experience Index (7.9 Base Score)
            </h2>
          </div>

          <div className="border border-[#7f9db9] rounded-xs bg-white overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#eef3f8] border-b border-[#cbd5e1] text-gray-700 font-semibold text-[11px]">
                <tr>
                  <th className="py-1.5 px-3 w-48 border-r border-[#cbd5e1]">Category</th>
                  <th className="py-1.5 px-3 border-r border-[#cbd5e1]">Technologies & Tooling</th>
                  <th className="py-1.5 px-3 w-24 text-center">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {PORTFOLIO_DATA.skillsExperienceIndex.map((cat, idx) => (
                  <tr key={idx} className="hover:bg-sky-50">
                    <td className="py-2 px-3 font-semibold text-gray-800 border-r border-gray-200">
                      {cat.category}
                    </td>
                    <td className="py-2 px-3 text-gray-600 border-r border-gray-200">
                      {cat.skills.map((s) => s.name).join(', ')}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-xs bg-blue-600 text-white font-bold text-xs">
                        {cat.subScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* EDUCATION & CREDENTIALS */}
        <section className="space-y-3">
          <div className="border-b border-[#cbd5e1] pb-1">
            <h2 className="text-sm font-bold text-[#003399]">Education & Academic Credentials</h2>
          </div>

          <div className="border border-[#7f9db9] rounded-xs p-4 bg-white shadow-2xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="text-xs font-bold text-gray-900">
                  {PORTFOLIO_DATA.education.institution}
                </h3>
                <p className="text-xs font-semibold text-blue-900">
                  {PORTFOLIO_DATA.education.degree}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 font-mono">{PORTFOLIO_DATA.education.period}</span>
                <div className="text-xs font-bold text-emerald-700">
                  CGPA: {PORTFOLIO_DATA.education.cgpa} (Distinction)
                </div>
              </div>
            </div>

            <div className="pt-1 text-xs text-gray-700">
              <strong className="block mb-1">Key Computer Engineering Coursework:</strong>
              <div className="text-gray-600 text-[11px] leading-relaxed">
                {PORTFOLIO_DATA.education.coursework.join(' • ')}
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="border border-[#7f9db9] bg-[#f8fafc] rounded-xs p-5 text-center space-y-2.5">
          <h2 className="text-sm font-bold text-[#003399]">Interested in collaborating or discussing an engineering role?</h2>
          <p className="text-xs text-gray-600 max-w-lg mx-auto">
            Directly connect with Vedant Borude at {PORTFOLIO_DATA.profile.email} or explore the live application at https://uber-eta-eight.vercel.app/
          </p>
          <div className="flex justify-center space-x-3 pt-1">
            <a
              href={`mailto:${PORTFOLIO_DATA.profile.email}`}
              className="aero-button px-4 py-1.5 rounded-xs text-xs font-bold text-gray-900 shadow-xs"
            >
              Compose Email
            </a>
            <button
              onClick={() => setClassicPortfolioMode(false)}
              className="aero-button px-4 py-1.5 rounded-xs text-xs font-bold text-blue-900 shadow-xs cursor-pointer"
            >
              Return to Windows 7 Desktop
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
