import React from 'react';
import { ExternalLink, Power } from 'lucide-react';

interface ExecutableWindowProps {
  title: string;
  url: string;
}

export const ExecutableWindow: React.FC<ExecutableWindowProps> = ({ title, url }) => (
  <div className="flex-1 flex flex-col bg-[#eef3f8] select-none h-full font-sans">
    <div className="bg-gradient-to-b from-[#f8fafc] to-[#dbe7f5] px-3 py-1.5 flex items-center justify-between border-b border-[#a0b8d5] shrink-0 text-[11px]">
      <div className="flex items-center space-x-2 text-gray-800">
        <Power size={14} className="text-emerald-700" />
        <span className="font-semibold">{title}</span>
        <span className="text-gray-500">Application</span>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center space-x-1 text-blue-700 hover:underline"
      >
        <span>Open in new window</span>
        <ExternalLink size={11} />
      </a>
    </div>
    <div className="flex-1 bg-white">
      <iframe
        title={title}
        src={url}
        className="w-full h-full border-0"
      />
    </div>
  </div>
);
