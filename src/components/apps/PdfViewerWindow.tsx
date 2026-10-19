import React, { useState } from 'react';
import { Download, Printer, ZoomIn, ZoomOut, FileText } from 'lucide-react';

const resumePath = '/Resume.pdf';

export const PdfViewerWindow: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Vedant_Borude_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#78828c] select-none h-full font-sans text-xs">
      <div className="bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] text-gray-800 px-3 py-1 flex items-center justify-between border-b border-[#cbd5e1] shrink-0 text-[11px] shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-gray-900 font-semibold">
            <FileText size={14} className="text-red-600" />
            <span>Vedant_Borude_Resume.pdf</span>
          </div>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600 font-medium">Original PDF</span>
        </div>

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
            onClick={() => window.print()}
            className="aero-button p-1 text-gray-800 rounded cursor-pointer shadow-xs"
            title="Print Document"
            aria-label="Print"
          >
            <Printer size={13} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-[#525659] p-2 sm:p-4">
        <iframe
          key={zoomLevel}
          title="Vedant Borude original resume"
          src={`${resumePath}#page=1&zoom=${zoomLevel}`}
          className="w-full h-full border-0 bg-white shadow-2xl"
        />
      </div>
    </div>
  );
};
