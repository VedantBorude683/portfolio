import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageViewerWindowProps {
  imageUrl: string;
  title: string;
}

export const ImageViewerWindow: React.FC<ImageViewerWindowProps> = ({ imageUrl, title }) => (
  <div className="flex-1 flex flex-col bg-[#525659] select-none h-full font-sans">
    <div className="bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] text-gray-800 px-3 py-1.5 flex items-center border-b border-[#cbd5e1] shrink-0 text-[11px]">
      <ImageIcon size={14} className="text-blue-700 mr-2" />
      <span className="font-semibold truncate">{title}</span>
    </div>
    <div className="flex-1 overflow-auto p-4 flex items-start justify-center">
      <img
        src={imageUrl}
        alt={title}
        className="max-w-full h-auto shadow-2xl bg-white"
      />
    </div>
  </div>
);
