/**
 * Command line parser and virtual file system for Windows 7 Command Prompt
 */

export interface CommandResult {
  output: string;
  clear?: boolean;
  newColor?: string;
  exit?: boolean;
  launchApp?: {
    id: string;
    title: string;
    icon: string;
    component: string;
    params?: Record<string, unknown>;
  };
}

export const VIRTUAL_FS: Record<string, string[]> = {
  'C:\\Users\\Administrator': [
    'Projects <DIR>',
    'Documents <DIR>',
    'Education <DIR>',
    'Achievements <DIR>',
    'About Me.txt',
    'Resume.pdf',
    'Skills.sys',
  ],
  'C:\\Users\\Administrator\\Projects': [
    'Tether_Microservice_Analyzer <DIR>',
    'Chatify_Realtime_Platform <DIR>',
    'SwiftRide_RideHailing <DIR>',
  ],
  'C:\\Users\\Administrator\\Documents': [
    'About Me.txt',
    'Engineering_Notes.txt',
    'System_Design_Checklist.txt',
  ],
  'C:\\Users\\Administrator\\Education': [
    '    PICT_Academic_Record.doc',
    'Coursework_Syllabus.txt',
    'Academic_Transcript_9.40_CGPA.txt',
  ],
  'C:\\Users\\Administrator\\Achievements': [
    'Hackathon_Honors.txt',
    'Tech_Symposium_Awards.txt',
  ],
};

export const FILE_CONTENTS: Record<string, string> = {
  'about me.txt': `VEDANT BORUDE - FULL STACK DEVELOPER
Focused on secure, high-performance architecture, distributed systems, and modern frontends.
Email: vedantborude77@gmail.com | Pune, India
Specialties: Java, Spring Boot, Kafka, React, Node.js, WebRTC`,

  'engineering_notes.txt': `CORE PRINCIPLES:
1. Prefer event streams (Kafka) for async decoupling over tight synchronous REST chaining.
2. Leverage WebRTC PeerConnection for low-latency media streams, keeping signaling lightweight.
3. Strict API contract validation prevents catastrophic downstream breaking changes.`,

  'system_design_checklist.txt': `CHECKLIST:
[x] Microservice boundaries defined
[x] Circuit breakers & timeout policies configured
[x] Cache invalidation & TTL strategies set
[x] Idempotency keys on state-mutating endpoints`,

  'coursework_syllabus.txt': `PICT COMPUTER ENGINEERING COMPLETED MODULES:
- OOP in C++ (Advanced polymorphism, templates, memory management)
- DBMS (ACID, normal forms, indexing, B-Trees, transaction isolation)
- Data Structures & Algorithms (Graphs, DP, Trees, asymptotic optimization)
- Computer Organisation & Architecture (Pipeline, Cache, Assembly)
- Operating Systems (Processes, Threads, Semaphores, Memory Paging)
- Basic System Design (Load balancing, partitioning, CAP theorem)`,

  'academic_transcript_9.40_cgpa.txt': `PUNE INSTITUTE OF COMPUTER TECHNOLOGY (PICT)
STUDENT: Vedant Borude
DEGREE: B.Tech Computer Engineering
PERIOD: Sep 2024 - Present
CURRENT CGPA: 9.40 / 10.00
STATUS: Distinction / Dean's Honors List`,

  'hackathon_honors.txt': `HACKATHONS & COMPETITIONS:
- Multi-hackathon builder: Rapid prototyping of full-stack platforms under strict 24-48h deadlines.
- Cross-functional team sprint leadership turning whiteboard ideas into live deployed products.`,

  'tech_symposium_awards.txt': `AWARDS & RECOGNITION:
- High-performance student award at PICT.
- Contributor to open technical symposium projects.`,
};

export const parseCommand = (rawInput: string, currentDir: string = 'C:\\Users\\Administrator'): CommandResult => {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { output: '' };
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  const fullArg = args.join(' ');

  switch (cmd) {
    case 'help':
      return {
        output: `Supported Windows 7 Command Prompt utilities:
  HELP      Provides help information for Windows commands.
  WHOAMI    Displays current logged-in user credentials.
  DIR       Displays a list of files and subdirectories in a directory.
  CD        Displays the name of or changes the current directory.
  TYPE      Displays the contents of a text file (e.g. TYPE "About Me.txt").
  PROJECTS  Lists Vedant's featured engineering projects.
  SKILLS    Displays technical stack and proficiency summary.
  CONTACT   Shows email, GitHub, LinkedIn, and phone coordinates.
  COLOR     Sets console foreground and background colors (e.g. COLOR 0A).
  CLS       Clears the screen.
  CLEAR     Alias for CLS.
  DATE      Displays the current system date.
  TIME      Displays the current system time.
  TREE      Graphically displays the directory structure of a path.
  MATRIX    Activates the green phosphor hacker matrix stream.
  ECHO      Displays messages, or turns command-echoing on or off.
  EXIT      Closes the Command Prompt window.`,
      };

    case 'whoami':
      return {
        output: `VEDANT-DEV-PC\\Administrator (Vedant Borude - Full Stack Developer)`,
      };

    case 'cls':
    case 'clear':
      return {
        output: '',
        clear: true,
      };

    case 'date':
      return {
        output: `The current date is: ${new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' })}`,
      };

    case 'time':
      return {
        output: `The current time is: ${new Date().toLocaleTimeString('en-US', { hour12: false })}`,
      };

    case 'echo':
      return {
        output: fullArg,
      };

    case 'projects':
      return {
        output: `======================================================================
FEATURED PROJECTS - VEDANT BORUDE
======================================================================
[1] TETHER - Microservice Impact Analyzer
    Event-driven platform detecting breaking API contract changes in PRs.
    Stack: Java, Spring Boot, Apache Kafka, MongoDB, semantic analysis, Chrome Ext.

[2] CHATIFY - Real-Time Messaging & Video App
    Instant messaging with WebRTC video & self-destructing Whisper Mode.
    Stack: React, Node.js, Express, MongoDB, Socket.io, WebRTC.

[3] SWIFTRIDE - On-Demand Ride Hailing Platform
    Geospatial dispatch, dynamic pricing, and real-time ride tracking.
    Demo: https://uber-eta-eight.vercel.app/
    Stack: React, Next.js, Node.js, Express, WebSockets, Maps APIs.
======================================================================
Hint: Navigate to C:\\Users\\Administrator\\Projects to inspect README files.`,
      };

    case 'skills':
      return {
        output: `======================================================================
TECHNICAL SKILLS & PROFICIENCY (Windows Experience Index: 7.9)
======================================================================
Languages:   C, C++, Java, JavaScript (ES6+), MySQL, MongoDB
Backend:     Spring Boot, Node.js, Express.js, Apache Kafka, Docker, CI/CD
Frontend:    React.js, WebSockets, WebRTC, Tailwind CSS, Modern UI
Concepts:    Microservices, REST APIs, JSON, Distributed Event Architecture
======================================================================`,
      };

    case 'contact':
      return {
        output: `======================================================================
CONTACT & PORTFOLIO COORDINATES:
======================================================================
Name:      Vedant Borude
Email:     vedantborude77@gmail.com
Portfolio: https://uber-eta-eight.vercel.app/
GitHub:    https://github.com/VedantBorude683
LinkedIn:  https://linkedin.com/in/vedant-borude-2b871a332
Location:  Pune, Maharashtra, India
Status:    Open for Software Engineering roles & internships
======================================================================`,
      };

    case 'dir': {
      const items = VIRTUAL_FS[currentDir] || ['No files found in directory.'];
      const fileCount = items.filter(i => !i.includes('<DIR>')).length;
      const dirCount = items.filter(i => i.includes('<DIR>')).length;
      const formatted = items.map(item => `04/19/2026  10:00 AM    ${item.padEnd(25)}`).join('\n');
      return {
        output: ` Volume in drive C has no label.\n Volume Serial Number is 7B4C-9F12\n\n Directory of ${currentDir}\n\n04/19/2026  10:00 AM    <DIR>          .\n04/19/2026  10:00 AM    <DIR>          ..\n${formatted}\n               ${fileCount} File(s)        24,840 bytes\n               ${dirCount + 2} Dir(s)   412,873,190,400 bytes free`,
      };
    }

    case 'cd': {
      if (!args[0] || args[0] === '.') {
        return { output: currentDir };
      }
      if (args[0] === '..') {
        const parts = currentDir.split('\\');
        if (parts.length > 2) {
          parts.pop();
          const newDir = parts.join('\\');
          return { output: '', launchApp: undefined, newColor: undefined };
        }
        return { output: currentDir };
      }
      const target = args[0].replace(/[\\/]$/, '');
      const potentialPath = `${currentDir}\\${target}`;
      if (VIRTUAL_FS[potentialPath]) {
        return { output: '' };
      }
      return {
        output: `The system cannot find the path specified: ${args[0]}`,
      };
    }

    case 'type':
    case 'cat': {
      if (!fullArg) {
        return { output: 'The syntax of the command is incorrect. Usage: TYPE <filename>' };
      }
      const cleanName = fullArg.replace(/["']/g, '').toLowerCase();
      if (FILE_CONTENTS[cleanName]) {
        return { output: FILE_CONTENTS[cleanName] };
      }
      return { output: `The system cannot find the file specified: ${fullArg}` };
    }

    case 'color': {
      if (!args[0]) {
        return { output: 'Default color restored.', newColor: '#cccccc' };
      }
      const code = args[0].toLowerCase();
      if (code === '0a' || code === 'a') {
        return { output: '', newColor: '#00ff66' }; // Classic green matrix phosphor
      } else if (code === '0b' || code === 'b') {
        return { output: '', newColor: '#00ffff' }; // Cyan
      } else if (code === '0c' || code === 'c') {
        return { output: '', newColor: '#ff5555' }; // Red
      } else if (code === '0e' || code === 'e') {
        return { output: '', newColor: '#ffff55' }; // Yellow
      } else if (code === '0f' || code === 'f') {
        return { output: '', newColor: '#ffffff' }; // Bright White
      } else if (code === '07' || code === '7') {
        return { output: '', newColor: '#cccccc' }; // Standard Win7 gray
      }
      return { output: 'Color set. (Examples: 0A for Matrix green, 0B for Cyan, 0E for Amber, 07 for Default)' };
    }

    case 'matrix':
      return {
        output: `WAKE UP, NEO...\nThe Matrix has you.\nFollow the white rabbit.\nKnock, knock, Neo.\n\n[Console switched to Phosphor Matrix Mode]`,
        newColor: '#00ff66',
      };

    case 'tree':
      return {
        output: `Folder PATH listing for volume Local Disk C:
C:.
├───Achievements
│       Hackathon_Honors.txt
│       Tech_Symposium_Awards.txt
├───Documents
│       About Me.txt
│       Engineering_Notes.txt
│       System_Design_Checklist.txt
├───Education
│       PICT_Academic_Record.doc
│       Coursework_Syllabus.txt
│       Academic_Transcript_9.40_CGPA.txt
└───Projects
    ├───Chatify_Realtime_Platform
    │       README.txt
    │       Launch.lnk
    ├───SwiftRide_RideHailing
    │       README.txt
    │       Launch.lnk
    └───Tether_Microservice_Analyzer
            README.txt
            Launch.lnk`,
      };

    case 'exit':
      return {
        output: '',
        exit: true,
      };

    case 'sudo':
      return {
        output: `[Access Denied] Administrator privileges are already active in Windows 7. You have supreme authority.`,
      };

    default:
      return {
        output: `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file. Type 'help' for a list of commands.`,
      };
  }
};
