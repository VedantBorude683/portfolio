import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const StartOrbIcon: React.FC<IconProps & { active?: boolean }> = ({ className = '', size = 38 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 ${className}`}>
      <defs>
        <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#80d0ff" stopOpacity="0.8" />
          <stop offset="65%" stopColor="#2b7fd4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0a3977" stopOpacity="0.9" />
        </radialGradient>
        <linearGradient id="orbHighlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#003366" stopOpacity="0.4" />
        </linearGradient>
        <filter id="orbShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      
      {/* Outer chrome bezel */}
      <circle cx="50" cy="50" r="47" fill="url(#orbGlow)" stroke="#cde3fc" strokeWidth="2.5" filter="url(#orbShadow)" />
      <circle cx="50" cy="50" r="45" fill="none" stroke="#2c5b96" strokeWidth="1.5" />
      
      {/* Inner Windows 7 4-Color Wave motif (original design, non-trademarked geometric wave) */}
      <g transform="translate(25, 25) scale(0.5)">
        {/* Red / Amber top-left */}
        <path d="M5,15 C25,5 35,25 45,15 L45,45 C35,55 25,35 5,45 Z" fill="#e74c3c" opacity="0.95" />
        {/* Emerald top-right */}
        <path d="M55,15 C65,25 75,5 95,15 L95,45 C75,35 65,55 55,45 Z" fill="#2ecc71" opacity="0.95" />
        {/* Cyan bottom-left */}
        <path d="M5,55 C25,45 35,65 45,55 L45,85 C35,95 25,75 5,85 Z" fill="#3498db" opacity="0.95" />
        {/* Gold bottom-right */}
        <path d="M55,55 C65,65 75,45 95,55 L95,85 C75,75 65,95 55,85 Z" fill="#f1c40f" opacity="0.95" />
      </g>
      
      {/* Glossy glass dome highlight */}
      <ellipse cx="50" cy="30" rx="36" ry="20" fill="url(#orbHighlight)" />
    </svg>
  );
};

export const ComputerIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="compScreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e5799" />
        <stop offset="50%" stopColor="#2989d8" />
        <stop offset="100%" stopColor="#7db9e8" />
      </linearGradient>
      <linearGradient id="compBezel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e0e8f0" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
    </defs>
    {/* Monitor */}
    <rect x="6" y="8" width="52" height="36" rx="4" fill="url(#compBezel)" stroke="#475569" strokeWidth="2" />
    <rect x="10" y="12" width="44" height="28" rx="2" fill="url(#compScreen)" />
    {/* Screen glare */}
    <polygon points="10,12 36,12 18,40 10,40" fill="#ffffff" opacity="0.25" />
    {/* Stand */}
    <path d="M26,44 L38,44 L42,54 L22,54 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
    <ellipse cx="32" cy="54" rx="18" ry="4" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
  </svg>
);

export const FolderIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="folderBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="folderFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    {/* Back tab */}
    <path d="M6,16 C6,13 8,11 11,11 L25,11 L31,18 L53,18 C56,18 58,20 58,23 L58,48 C58,51 56,53 53,53 L11,53 C8,53 6,51 6,48 Z" fill="url(#folderBack)" stroke="#b45309" strokeWidth="1.5" />
    {/* Sheet inside */}
    <rect x="12" y="16" width="40" height="22" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
    <line x1="16" y1="21" x2="36" y2="21" stroke="#94a3b8" strokeWidth="1.5" />
    <line x1="16" y1="26" x2="44" y2="26" stroke="#94a3b8" strokeWidth="1.5" />
    {/* Front flap */}
    <path d="M4,24 L60,24 L56,52 C56,54 54,56 52,56 L12,56 C10,56 8,54 8,52 Z" fill="url(#folderFront)" stroke="#b45309" strokeWidth="1.5" opacity="0.95" />
    <line x1="8" y1="26" x2="56" y2="26" stroke="#fef3c7" strokeWidth="1.5" opacity="0.7" />
  </svg>
);

export const NotepadIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="padHeader" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    {/* Pad backing */}
    <rect x="10" y="8" width="44" height="50" rx="3" fill="#fafafa" stroke="#94a3b8" strokeWidth="1.5" />
    <rect x="10" y="8" width="44" height="12" rx="3" fill="url(#padHeader)" />
    {/* Lines */}
    <line x1="16" y1="26" x2="48" y2="26" stroke="#cbd5e1" strokeWidth="1.5" />
    <line x1="16" y1="32" x2="44" y2="32" stroke="#cbd5e1" strokeWidth="1.5" />
    <line x1="16" y1="38" x2="48" y2="38" stroke="#cbd5e1" strokeWidth="1.5" />
    <line x1="16" y1="44" x2="40" y2="44" stroke="#cbd5e1" strokeWidth="1.5" />
    <line x1="16" y1="50" x2="46" y2="50" stroke="#cbd5e1" strokeWidth="1.5" />
    {/* Pencil */}
    <g transform="translate(36, 26) rotate(45)">
      <polygon points="0,0 20,0 22,6 0,6" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <polygon points="-6,3 0,0 0,6" fill="#f87171" stroke="#dc2626" strokeWidth="1" />
      <polygon points="20,0 26,3 20,6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
    </g>
  </svg>
);

export const CmdIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <rect x="6" y="10" width="52" height="44" rx="3" fill="#111827" stroke="#475569" strokeWidth="2" />
    <rect x="6" y="10" width="52" height="10" fill="#374151" />
    <circle cx="12" cy="15" r="2" fill="#ef4444" />
    <circle cx="18" cy="15" r="2" fill="#f59e0b" />
    <circle cx="24" cy="15" r="2" fill="#10b981" />
    <text x="12" y="32" fill="#22c55e" fontSize="11" fontFamily="monospace" fontWeight="bold">&gt;_</text>
    <line x1="28" y1="32" x2="42" y2="32" stroke="#22c55e" strokeWidth="2" />
    <text x="12" y="44" fill="#9ca3af" fontSize="8" fontFamily="monospace">C:\&gt;</text>
  </svg>
);

export const OperaIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="operaRed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff4d4d" />
        <stop offset="50%" stopColor="#cc0000" />
        <stop offset="100%" stopColor="#800000" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#operaRed)" stroke="#ff9999" strokeWidth="1.5" />
    <ellipse cx="32" cy="32" rx="14" ry="22" fill="#ffffff" />
    <ellipse cx="32" cy="32" rx="10" ry="18" fill="url(#operaRed)" />
  </svg>
);

export const IEIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="ieBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="60%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="ieHalo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
    </defs>
    {/* Gold orbit ring */}
    <ellipse cx="32" cy="32" rx="26" ry="12" fill="none" stroke="url(#ieHalo)" strokeWidth="4" transform="rotate(-30 32 32)" />
    {/* Blue 'e' glyph */}
    <circle cx="32" cy="32" r="20" fill="url(#ieBlue)" stroke="#e0f2fe" strokeWidth="1.5" />
    <path d="M22,32 L42,32 C42,26 36,22 30,22 C23,22 18,27 18,34 C18,41 23,45 32,45 C38,45 42,42 42,42" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const ControlPanelIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="cpPlate" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>
    <rect x="6" y="8" width="52" height="48" rx="4" fill="url(#cpPlate)" stroke="#94a3b8" strokeWidth="2" />
    {/* Sliders and dials */}
    <circle cx="20" cy="22" r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
    <line x1="20" y1="18" x2="20" y2="26" stroke="#ffffff" strokeWidth="2" />
    <line x1="34" y1="18" x2="52" y2="18" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <circle cx="44" cy="18" r="4" fill="#facc15" stroke="#713f12" strokeWidth="1" />
    <line x1="34" y1="26" x2="52" y2="26" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <circle cx="38" cy="26" r="4" fill="#34d399" stroke="#064e3b" strokeWidth="1" />
    <rect x="12" y="36" width="40" height="14" rx="2" fill="#0f172a" />
    <line x1="16" y1="43" x2="48" y2="43" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
  </svg>
);

export const RecycleBinIcon: React.FC<IconProps & { full?: boolean }> = ({ className = '', size = 32, full = true }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="binMesh" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* Lid rim */}
    <ellipse cx="32" cy="14" rx="20" ry="5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
    {/* Basket body */}
    <path d="M14,14 L18,52 C18,54 20,56 22,56 L42,56 C44,56 46,54 46,52 L50,14 Z" fill="url(#binMesh)" stroke="#3b82f6" strokeWidth="1.5" />
    {/* Crosshatch */}
    <line x1="20" y1="18" x2="44" y2="52" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="44" y1="18" x2="20" y2="52" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 3" />
    {full && (
      /* Paper crumpled in bin */
      <g>
        <circle cx="30" cy="28" r="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <polygon points="26,38 38,32 34,44" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
        <polygon points="34,22 42,26 38,32" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
      </g>
    )}
  </svg>
);

export const PdfIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="pdfRed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
    </defs>
    <path d="M12,8 L40,8 L52,20 L52,56 C52,58 50,60 48,60 L16,60 C14,60 12,58 12,56 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
    <polygon points="40,8 40,20 52,20" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
    <rect x="16" y="28" width="32" height="18" rx="2" fill="url(#pdfRed)" />
    <text x="20" y="41" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">PDF</text>
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="envelope" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
    </defs>
    <rect x="8" y="14" width="48" height="36" rx="3" fill="url(#envelope)" stroke="#64748b" strokeWidth="1.5" />
    <path d="M8,16 L32,34 L56,16" fill="none" stroke="#3b82f6" strokeWidth="2" />
    <polygon points="44,20 52,20 48,26" fill="#f59e0b" />
  </svg>
);

export const CertificateIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="parchment" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="100%" stopColor="#fef3c7" />
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="48" height="48" rx="2" fill="url(#parchment)" stroke="#d97706" strokeWidth="1.5" />
    <rect x="12" y="12" width="40" height="40" fill="none" stroke="#b45309" strokeWidth="1" strokeDasharray="3 2" />
    <line x1="18" y1="20" x2="46" y2="20" stroke="#92400e" strokeWidth="2" />
    <line x1="22" y1="26" x2="42" y2="26" stroke="#b45309" strokeWidth="1.5" />
    <circle cx="32" cy="40" r="8" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
    <polygon points="32,36 34,40 38,40 35,43 36,47 32,44 28,47 29,43 26,40 30,40" fill="#facc15" />
    <path d="M28,46 L26,56 L32,53 L38,56 L36,46" fill="#dc2626" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
    </defs>
    <path d="M18,12 L46,12 L44,32 C44,38 38,44 32,44 C26,44 20,38 20,32 Z" fill="url(#gold)" stroke="#854d0e" strokeWidth="1.5" />
    {/* Handles */}
    <path d="M18,16 C12,16 10,24 16,28 C18,30 20,30 20,30" fill="none" stroke="#ca8a04" strokeWidth="2.5" />
    <path d="M46,16 C52,16 54,24 48,28 C46,30 44,30 44,30" fill="none" stroke="#ca8a04" strokeWidth="2.5" />
    {/* Stem and base */}
    <rect x="29" y="44" width="6" height="8" fill="#ca8a04" />
    <rect x="22" y="52" width="20" height="6" rx="2" fill="#713f12" stroke="#451a03" strokeWidth="1" />
  </svg>
);

export const UserAvatarIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div
    style={{ width: size, height: size }}
    className={`relative rounded-sm overflow-hidden border-2 border-white/80 shadow-md bg-gradient-to-br from-blue-400 via-indigo-500 to-sky-700 flex items-center justify-center ${className}`}
  >
    {/* User portrait styling: elegant stylized developer avatar */}
    <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 64 64">
      <circle cx="32" cy="22" r="14" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
      {/* Glasses */}
      <circle cx="27" cy="22" r="4.5" fill="rgba(255,255,255,0.4)" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="37" cy="22" r="4.5" fill="rgba(255,255,255,0.4)" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="31.5" y1="22" x2="32.5" y2="22" stroke="#1e293b" strokeWidth="1.5" />
      {/* Smile */}
      <path d="M28,29 Q32,33 36,29" fill="none" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
      {/* Body / Suit */}
      <path d="M12,56 C12,42 22,38 32,38 C42,38 52,42 52,56 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
      <polygon points="32,38 28,46 32,54 36,46" fill="#38bdf8" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/30 pointer-events-none" />
  </div>
);

export const AppIconRenderer: React.FC<{ type: string; size?: number; className?: string }> = ({ type, size = 32, className = '' }) => {
  switch (type) {
    case 'computer':
      return <ComputerIcon size={size} className={className} />;
    case 'folder':
      return <FolderIcon size={size} className={className} />;
    case 'notepad':
      return <NotepadIcon size={size} className={className} />;
    case 'cmd':
      return <CmdIcon size={size} className={className} />;
    case 'browser_opera':
      return <OperaIcon size={size} className={className} />;
    case 'browser_ie':
      return <IEIcon size={size} className={className} />;
    case 'control_panel':
      return <ControlPanelIcon size={size} className={className} />;
    case 'recycle_bin':
      return <RecycleBinIcon size={size} className={className} />;
    case 'pdf':
      return <PdfIcon size={size} className={className} />;
    case 'mail':
      return <MailIcon size={size} className={className} />;
    case 'education':
      return <CertificateIcon size={size} className={className} />;
    case 'achievements':
      return <TrophyIcon size={size} className={className} />;
    default:
      return <FolderIcon size={size} className={className} />;
  }
};
