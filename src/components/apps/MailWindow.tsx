import React, { useState } from 'react';
import { Send, Mail, Inbox, CheckCircle2, Copy, ExternalLink, Paperclip, User, MessageSquare, BookOpen } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data';
import { AppIconRenderer } from '../common/OSIcons';

export const MailWindow: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Engineering Role / Collaboration - Vedant Borude');
  const [body, setBody] = useState(
    'Hi Vedant,\n\nI came across your Windows 7 portfolio and was impressed by your microservices work with Kafka and WebRTC.\n\nI would love to connect regarding an engineering opportunity.\n\nBest regards,'
  );
  const [sentStatus, setSentStatus] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`From: ${senderName} (${senderEmail})\n\n${body}`)}`;

    window.location.href = mailtoUrl;
    setSentStatus(true);
    setTimeout(() => setSentStatus(false), 5000);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }).catch(() => {});
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f0f0f0] select-none h-full font-sans text-xs">
      {/* 1. WINDOWS LIVE MAIL RIBBON TOOLBAR */}
      <div className="bg-[#eaf0f6] border-b border-[#a8c0d8] shrink-0">
        {/* Ribbon Tabs */}
        <div className="flex items-center space-x-1 px-3 pt-1 border-b border-[#c8d8e8] text-[11px]">
          <span className="px-3 py-1 bg-white font-semibold text-gray-800 border-t border-l border-r border-[#94a3b8] rounded-t">
            Home
          </span>
          <span className="px-3 py-1 text-gray-600 hover:text-black cursor-pointer">
            View
          </span>
          <span className="px-3 py-1 text-gray-600 hover:text-black cursor-pointer">
            Accounts
          </span>
        </div>

        {/* Ribbon Actions */}
        <div className="p-1.5 px-3 flex items-center space-x-3 bg-gradient-to-b from-[#f8fafc] to-[#e4ebf3]">
          {/* Send */}
          <button
            onClick={handleSend}
            className="flex flex-col items-center p-1.5 rounded hover:bg-sky-200/60 active:bg-sky-300/80 cursor-pointer border border-transparent hover:border-sky-400/50"
          >
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Send size={15} />
            </div>
            <span className="text-[10px] font-semibold text-gray-800 mt-0.5">Send</span>
          </button>

          {/* Copy Address */}
          <button
            onClick={copyEmailToClipboard}
            className="flex flex-col items-center p-1.5 rounded hover:bg-sky-200/60 active:bg-sky-300/80 cursor-pointer border border-transparent hover:border-sky-400/50"
          >
            <div className="w-7 h-7 rounded bg-amber-500 flex items-center justify-center text-white shadow-xs">
              <Copy size={15} />
            </div>
            <span className="text-[10px] font-semibold text-gray-800 mt-0.5">
              {copiedEmail ? 'Copied!' : 'Copy Email'}
            </span>
          </button>

          <div className="h-8 w-px bg-gray-300" />

          {/* Direct profiles */}
          <a
            href={PORTFOLIO_DATA.profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-1.5 rounded hover:bg-sky-200/60 cursor-pointer border border-transparent hover:border-sky-400/50"
          >
            <div className="w-7 h-7 rounded bg-blue-700 flex items-center justify-center text-white shadow-xs font-bold text-xs">
              in
            </div>
            <span className="text-[10px] font-semibold text-gray-800 mt-0.5">LinkedIn</span>
          </a>

          <a
            href={PORTFOLIO_DATA.profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-1.5 rounded hover:bg-sky-200/60 cursor-pointer border border-transparent hover:border-sky-400/50"
          >
            <div className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center text-white shadow-xs font-bold text-xs">
              GH
            </div>
            <span className="text-[10px] font-semibold text-gray-800 mt-0.5">GitHub</span>
          </a>
        </div>
      </div>

      {/* 2. BODY SPLIT (SIDEBAR + COMPOSE VIEW) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Windows Live Mail Folder Tree */}
        <div className="w-52 bg-[#f4f7fb] border-r border-[#cbd5e1] p-3 space-y-4 shrink-0 overflow-y-auto text-xs">
          <div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Mailbox Folders
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2 px-2 py-1 rounded bg-[#d6e5f5] text-blue-900 font-semibold border border-[#b2cceb]">
                <Inbox size={13} className="text-blue-600" />
                <span>Inbox (Vedant)</span>
              </div>
              <div className="flex items-center space-x-2 px-2 py-1 text-gray-600 hover:bg-gray-200/60 rounded">
                <Send size={13} />
                <span>Sent Items</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-2.5 space-y-2">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Contact Card
            </div>

            <div className="border border-[#c6d7e8] bg-white rounded p-2.5 space-y-1.5 text-xs shadow-2xs">
              <div>
                <div className="text-[9px] text-gray-500 font-semibold uppercase">Email Address</div>
                <button
                  onClick={copyEmailToClipboard}
                  className="font-semibold text-blue-700 hover:underline break-all text-left text-xs cursor-pointer"
                >
                  {PORTFOLIO_DATA.profile.email}
                </button>
              </div>

              <div>
                <div className="text-[9px] text-gray-500 font-semibold uppercase">Location</div>
                <div className="text-gray-800">{PORTFOLIO_DATA.profile.location}</div>
              </div>

              <div>
                <div className="text-[9px] text-gray-500 font-semibold uppercase">Availability</div>
                <div className="text-emerald-700 font-medium">Open to roles & internships</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Compose Form */}
        <div className="flex-1 bg-white p-4 overflow-y-auto flex flex-col select-text">
          {sentStatus && (
            <div className="mb-3 bg-emerald-50 border border-emerald-300 text-emerald-800 p-2.5 rounded flex items-center space-x-2 text-xs">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>
                Default mail client triggered! Message queued for <strong>{PORTFOLIO_DATA.profile.email}</strong>.
              </span>
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-2.5 flex-1 flex flex-col">
            {/* To */}
            <div className="flex items-center border-b border-gray-200 pb-2">
              <span className="w-16 text-gray-500 font-semibold text-xs">To...</span>
              <div className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-0.5 text-xs font-semibold text-gray-800">
                Vedant Borude &lt;{PORTFOLIO_DATA.profile.email}&gt;
              </div>
            </div>

            {/* From Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center border-b border-gray-200 pb-2">
                <span className="w-16 text-gray-500 font-semibold text-xs">Your Name:</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins (Tech Recruiter)"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="flex-1 outline-none text-xs text-gray-800 border-b border-gray-200 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center border-b border-gray-200 pb-2">
                <span className="w-16 text-gray-500 font-semibold text-xs">Your Email:</span>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@innovatetech.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="flex-1 outline-none text-xs text-gray-800 border-b border-gray-200 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex items-center border-b border-gray-200 pb-2">
              <span className="w-16 text-gray-500 font-semibold text-xs">Subject:</span>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 outline-none text-xs text-gray-800 font-medium border-b border-gray-200 focus:border-blue-500"
              />
            </div>

            {/* Message Body */}
            <div className="flex-1 flex flex-col pt-1">
              <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                aria-label="Email message body"
                placeholder="Type your message to Vedant here..."
                className="flex-1 p-3 border border-gray-300 rounded outline-none resize-none text-xs leading-relaxed font-sans text-gray-800 min-h-[160px] shadow-inner"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 shrink-0">
              <div className="text-[11px] text-gray-500">
                Dispatches directly to Vedant Borude's inbox.
              </div>
              <button
                type="submit"
                className="aero-button px-5 py-1 rounded font-semibold text-xs text-gray-900 flex items-center space-x-1.5 shadow cursor-pointer"
              >
                <Send size={12} className="text-blue-700" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
