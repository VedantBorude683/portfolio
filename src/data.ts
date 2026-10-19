/**
 * Vedant Borude - Portfolio Data Source
 * All personal, educational, skill, project, and file system content lives here for easy modification.
 */

export interface ProjectItem {
  id: string;
  name: string;
  folderName: string;
  shortDesc: string;
  tagline: string;
  readme: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  screenshots: { title: string; caption: string; color: string; image?: string; asciiArt?: string }[];
  highlight: string;
  metrics?: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  cgpa: string;
  location: string;
  status: string;
  coursework: string[];
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  subScore: number; // Out of 7.9 Windows Experience Index
  description: string;
  skills: { name: string; level: number; tags?: string[] }[];
}

export interface RecycleItem {
  id: string;
  name: string;
  originalLocation: string;
  dateDeleted: string;
  size: string;
  type: string;
  humorNote: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Vedant Borude',
    title: 'Full Stack Developer',
    roleSubtitle: 'Specializing in Secure, High-Performance Architecture & Scalable Systems',
    bio: 'Full Stack Developer focused on secure, high-performance architecture; builds scalable backend systems and seamless modern user experiences.',
    email: 'vedantborude77@gmail.com',
    location: 'Pune, Maharashtra, India',
    status: 'Available for Software Engineering Roles & Internships',
    links: {
      github: 'https://github.com/VedantBorude683',
      linkedin: 'https://linkedin.com/in/vedant-borude-2b871a332',
      emailMailto: 'mailto:vedantborude77@gmail.com',
      portfolio: 'https://uber-eta-eight.vercel.app/',
      liveDemoUber: 'https://uber-eta-eight.vercel.app/',
    },
    systemSpecs: {
      os: 'Windows 7 Ultimate Aero Edition (Service Pack 1)',
      processor: 'Vedant Intel(R) Core(TM) i9 Architecture Specialist @ 4.80 GHz',
      memory: '32.0 GB (Supercharged by Coffee & Modern Web Standards)',
      systemType: '64-bit Operating System, x64-based Processor',
      computerName: 'VEDANT-DEV-PC',
      workgroup: 'FULLSTACK-ENGINEERING',
      experienceIndex: 7.9,
    },
  },

  aboutMeDoc: `================================================================================
ABOUT ME - VEDANT BORUDE
================================================================================
Role: Full Stack Developer
Focus: Scalable Backend Systems, Real-Time Architecture, and High-Polish UIs
Location: Pune, India | Email: vedantborude77@gmail.com
Live Portfolio & Projects: https://uber-eta-eight.vercel.app/

SUMMARY:
Passionate software engineer with deep curiosity for system design, distributed 
event processing, and modern reactive frontends. I build resilient backend pipelines 
capable of handling real-time data while obsessing over pixel-perfection and 
fluid user interactions.

CORE ARCHITECTURAL PRINCIPLES:
- Architecture First: Clean separation of concerns, deterministic data flow, and 
  modular contracts.
- Performance Matters: Sub-second latency, optimized database queries, zero-lag UI.
- Secure by Default: Role-based authorization, sanitization, and automated audit trails.
- Continuous Craft: Exploring cutting-edge AI integrations, Kafka event streams, 
  and distributed patterns.

LOOKING FOR:
Challenging full-stack software development roles, engineering internships, and 
high-impact collaboration opportunities.
================================================================================`,

  education: {
    institution: 'Pune Institute of Computer Technology (PICT)',
    degree: 'Bachelor of Technology (B.Tech) in Computer Engineering',
    period: 'Sep 2024 - Present',
    cgpa: '9.40 / 10.00',
    location: 'Pune, Maharashtra, India',
    status: 'In Progress (Active Undergraduate)',
    coursework: [
      'Object Oriented Programming in C++',
      'Database Management Systems (DBMS)',
      'Data Structures & Algorithms (DSA)',
      'Discrete Mathematics',
      'Computer Organisation and Architecture',
      'Operating Systems',
      'Basic System Design & Principles',
    ],
    highlights: [
      'Active contributor to tech symposiums, code sprints, and system design groups.',
      'Hands-on lab excellence in Linux kernel processes, relational calculus, and algorithmic analysis.',
    ],
  } as EducationItem,

  achievements: [
    {
      title: 'Hackathon Prototyping & Rapid Architecture',
      description: 'Competed in multiple intense collegiate & national hackathons, architecting end-to-end full-stack applications within strict 24-48 hour sprints.',
      badge: 'Competitive Edge',
      year: '2024 - Present',
    },
    {
      title: 'High-Impact Cross-Functional Collaboration',
      description: 'Collaborated in fast-paced teams turning complex system ideas into deployable, functional prototypes with live databases and CI/CD pipelines.',
      badge: 'Team Leadership',
      year: '2024 - Present',
    },
    {
      title: 'Academic Distinction - CGPA 9.40',
      description: 'Sustained top-tier scholastic standing in rigorous Computer Engineering curriculum at Pune Institute of Computer Technology.',
      badge: 'Academic Honor',
      year: '2024 - Present',
    },
    {
      title: 'Real-Time Event-Driven Innovations',
      description: 'Built production-grade distributed microservice contract validation utilizing Apache Kafka and LLM-assisted diff analysis.',
      badge: 'Technical Innovation',
      year: '2024 - Present',
    },
  ],

  projects: [
    {
      id: 'tether',
      name: 'Tether - Microservice Impact Analyzer',
      folderName: 'Tether_Microservice_Analyzer',
      shortDesc: 'Event-driven platform detecting breaking API contract changes across microservices before pull requests merge.',
      tagline: 'Automated CI/CD breaking change detection powered by Kafka & LLM diff analysis.',
      highlight: 'Prevents cascading production microservice outages during GitHub PR phase.',
      readme: `================================================================================
PROJECT: TETHER - MICROSERVICE IMPACT ANALYZER
================================================================================
OVERVIEW:
Tether is an event-driven platform that detects breaking API contract changes 
across microservices before pull requests are merged into main branches.

ARCHITECTURE & FLOW:
1. Spring Boot Webhook Service:
   - Captures GitHub Pull Request events via secure HMAC-verified webhooks.
   - Extracts schema modifications, OpenAPI spec diffs, and protobuf signatures.
   - Publishes contract modification events to Apache Kafka partition topics.

2. Asynchronous Java Workers:
   - Consumer groups consume events concurrently with strict idempotency.
   - Workers analyze schema diffs using AI-assisted semantic analysis to identify downstream
     service consumer contract violations.
   - Generates comprehensive impact graphs identifying all affected downstream microservices.

3. MongoDB Storage:
   - Persists service dependency topologies, historical contract signatures, and audit logs.

4. Chrome Extension & PR Interface:
   - Queries results from backend APIs.
   - Directly renders an interactive dependency vulnerability graph inside the GitHub PR page.
   - Warns engineers before merge if a breaking field change compromises consumer services.

TECH STACK:
- Backend: Java, Spring Boot, Apache Kafka
- Database: MongoDB
- AI/LLM: Semantic diff & contract impact validation
- Frontend: JavaScript, Chrome Extension API (Manifest v3), GitHub Webhooks API
- Testing & Deploy: Docker, JUnit 5, Mockito
================================================================================`,
      techStack: [
        'Java',
        'Spring Boot',
        'Apache Kafka',
        'MongoDB',
        'JavaScript',
        'Chrome Extension API',
        'GitHub Webhooks',
        'Semantic Analysis',
        'Docker',
      ],
      metrics: [
        '100% pre-merge detection of downstream API contract breaks',
        'Sub-second Kafka event streaming pipeline',
        'Direct in-browser visual dependency graph injection',
      ],
      screenshots: [
        {
          title: 'GitHub PR Extension Injection',
          caption: 'Interactive graph highlighting breaking downstream endpoints directly in pull request review',
          color: '#1e3a8a',
          image: '/images/tether/github-pr-tether.png',
        },
        {
          title: 'Tether Architecture & Event Topology',
          caption: 'Webhook, Kafka, AI analysis, threat reports, and browser alert flow',
          color: '#065f46',
          image: '/images/tether/tether-architecture.png',
        },
        {
          title: 'Contract Impact Analysis Report',
          caption: 'Semantic reasoning on parameter type changes and missing required fields',
          color: '#701a75',
        },
      ],
    },
    {
      id: 'chatify',
      name: 'Chatify - Real-Time Messaging & Video App',
      folderName: 'Chatify_Realtime_Platform',
      shortDesc: 'Full-stack real-time platform with instant text chat and live peer-to-peer video calls in one cohesive UI.',
      tagline: 'Instant messaging with WebRTC video conferencing & auto-expiring Whisper Mode.',
      highlight: 'Zero-latency P2P video stream with privacy-first ephemeral messaging.',
      readme: `================================================================================
PROJECT: CHATIFY - REAL-TIME MESSAGING & VIDEO APP
================================================================================
OVERVIEW:
A modern full-stack real-time communication platform combining low-latency text 
messaging and peer-to-peer video streaming in a single responsive interface.

KEY HIGHLIGHTS:
1. WebRTC Peer-to-Peer Video:
   - Direct browser-to-browser media stream transmission using WebRTC.
   - Custom Socket.io signaling server for SDP offer/answer exchanges and ICE 
     candidate routing.
   - Adaptive video resolution with mute, camera switch, and screen sharing capabilities.

2. "Whisper Mode" Ephemeral Chat:
   - Private self-destructing conversation rooms.
   - Built on MongoDB TTL (Time-To-Live) indexes that automatically purge messages 
     from database storage within seconds after recipient reads.
   - Zero-footprint confidential messaging guarantee.

3. Rich Real-Time State:
   - Real-time typing indicators, read receipts, online/offline presence tracking.
   - End-to-end encrypted room sessions.

TECH STACK:
- Frontend: React.js, Tailwind CSS, Lucide Icons
- Backend: Node.js, Express.js, Socket.io
- Database: MongoDB with TTL Collections & Mongoose
- Streaming: WebRTC (PeerConnection API, MediaDevices)
================================================================================`,
      techStack: [
        'React.js',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Socket.io',
        'WebRTC',
        'Tailwind CSS',
        'TTL Indexes',
      ],
      metrics: [
        '<50ms latency for real-time text delivery',
        'Ultra low bandwidth peer-to-peer 720p/1080p video',
        'Automated database TTL purge ensuring zero message retention',
      ],
      liveUrl: 'https://chatify-one-lyart.vercel.app/',
      screenshots: [
        {
          title: 'Split View Video & Chat',
          caption: 'Simultaneous low-latency video call alongside synchronized chat panel',
          color: '#0f766e',
        },
        {
          title: 'Whisper Mode UI',
          caption: 'Countdown timer displaying remaining seconds before message auto-destruct',
          color: '#831843',
        },
        {
          title: 'Signaling Architecture',
          caption: 'Socket.io ICE exchange diagram connecting caller and callee peers',
          color: '#1e293b',
        },
      ],
    },
    {
      id: 'swiftride',
      name: 'SwiftRide - On-Demand Ride Hailing Platform',
      folderName: 'SwiftRide_RideHailing',
      shortDesc: 'Modern ride-hailing and fleet management web application with interactive geospatial dispatch and booking.',
      tagline: 'Real-time driver location tracking, route computation, and dynamic fare estimation.',
      highlight: 'Interactive live demo deployed and available for exploration.',
      readme: `================================================================================
PROJECT: SWIFTRIDE - ON-DEMAND RIDE HAILING PLATFORM
================================================================================
OVERVIEW:
A comprehensive ride-sharing application designed to deliver an intuitive 
experience for passengers and drivers alike. Featuring geospatial routing, fare 
calculation, and driver dispatch simulation.

LIVE DEMO:
https://uber-eta-eight.vercel.app/

CORE CAPABILITIES:
1. Dynamic Route Computation & Fare Estimation:
   - Calculates distance, estimated time of arrival (ETA), and surge pricing.
   - Interactive pick-up and destination selection with autocomplete.

2. Real-Time Geospatial Simulation:
   - Smooth animated vehicle positions on map view.
   - Driver proximity alert and trip status progression (Requested -> En Route -> Arrived).

3. Clean & Responsive User Experience:
   - Sleek modern design language with mobile-first responsiveness.
   - Ride history, receipt generation, and profile management.

TECH STACK:
- Frontend: Next.js / React, Tailwind CSS
- Real-Time & Backend: Node.js, Express, WebSockets
- Geospatial & APIs: OpenStreetMap / Geocoding APIs
- Deployment: Vercel Cloud Platform
================================================================================`,
      techStack: [
        'React',
        'Next.js',
        'Node.js',
        'Express.js',
        'Tailwind CSS',
        'WebSockets',
        'Geospatial APIs',
        'Vercel',
      ],
      liveUrl: 'https://uber-eta-eight.vercel.app/',
      metrics: [
        'Live production deployment on Vercel',
        'Real-time animated driver position dispatch',
        'Instantaneous trip fare & distance algorithm',
      ],
      screenshots: [
        {
          title: 'Map Booking Interface',
          caption: 'Interactive map displaying nearby available vehicles and route calculation',
          color: '#0369a1',
        },
        {
          title: 'Ride Selection Card',
          caption: 'Fare breakdown for Standard, Premium, and Van vehicle tiers',
          color: '#15803d',
        },
        {
          title: 'Driver En Route Screen',
          caption: 'Live ETA tracking with turn-by-turn simulation',
          color: '#374151',
        },
      ],
    },
  ] as ProjectItem[],

  skillsExperienceIndex: [
    {
      category: 'Languages & Core Programming',
      subScore: 7.9,
      description: 'System-level and high-level typed programming for scalable performance',
      skills: [
        { name: 'C', level: 90, tags: ['Low-level', 'Memory management'] },
        { name: 'C++', level: 94, tags: ['OOP', 'STL', 'DSA'] },
        { name: 'Java', level: 92, tags: ['Spring Boot', 'Concurrency', 'OOP'] },
        { name: 'JavaScript (ES6+)', level: 95, tags: ['Modern JS', 'Async/Await', 'DOM'] },
        { name: 'MySQL', level: 90, tags: ['Relational Schema', 'Indexing', 'Transactions'] },
        { name: 'MongoDB', level: 92, tags: ['NoSQL', 'Aggregation', 'TTL Indexes'] },
      ],
    },
    {
      category: 'Backend Frameworks & Distributed Tools',
      subScore: 7.8,
      description: 'Microservice orchestration, event streaming, and server runtimes',
      skills: [
        { name: 'Spring Boot', level: 92, tags: ['REST APIs', 'Security', 'Webhooks'] },
        { name: 'Node.js', level: 94, tags: ['Async I/O', 'Cluster', 'Event Loop'] },
        { name: 'Express.js', level: 93, tags: ['Middleware', 'Routing', 'REST'] },
        { name: 'Apache Kafka', level: 88, tags: ['Pub/Sub', 'Event-Driven', 'Partitions'] },
        { name: 'Docker', level: 86, tags: ['Containers', 'Compose', 'Multi-stage builds'] },
        { name: 'Git & GitHub', level: 96, tags: ['Git Flow', 'PRs', 'Actions'] },
        { name: 'CI/CD Pipelines', level: 85, tags: ['Automated Testing', 'Deployment'] },
      ],
    },
    {
      category: 'Frontend & Real-Time Web',
      subScore: 7.9,
      description: 'Reactive user interfaces, client-side state, and media streaming',
      skills: [
        { name: 'React.js', level: 95, tags: ['Hooks', 'Context', 'Performance'] },
        { name: 'WebSockets (Socket.io)', level: 92, tags: ['Bidirectional', 'Rooms', 'Heartbeats'] },
        { name: 'WebRTC', level: 88, tags: ['P2P Audio/Video', 'ICE', 'DataChannels'] },
        { name: 'REST APIs & JSON', level: 98, tags: ['OpenAPI', 'Standard Contracts'] },
        { name: 'Microservices Architecture', level: 90, tags: ['Decoupling', 'Fault Tolerance'] },
      ],
    },
  ] as SkillCategory[],

  recycleBinItems: [
    {
      id: 'rb-1',
      name: 'old_monolith_spaghetti_server.js',
      originalLocation: 'C:\\Users\\Administrator\\LegacyProjects',
      dateDeleted: '2024-04-12 03:42 AM',
      size: '14.8 MB',
      type: 'JavaScript File',
      humorNote: 'A 2,500-line server file with callback hell that was peacefully refactored into microservices.',
    },
    {
      id: 'rb-2',
      name: 'node_modules_heavy_edition.zip',
      originalLocation: 'C:\\Users\\Administrator\\Downloads',
      dateDeleted: '2024-08-01 11:15 AM',
      size: '2.4 GB',
      type: 'Compressed (zipped) Folder',
      humorNote: 'Contains 47 slightly different versions of left-pad and is-even. May contain its own gravitational field.',
    },
    {
      id: 'rb-3',
      name: 'git_commit_final_v2_really_final_fix.patch',
      originalLocation: 'C:\\Users\\Administrator\\GitRepos\\Hotfix',
      dateDeleted: '2024-09-18 01:20 AM',
      size: '42 KB',
      type: 'Git Patch File',
      humorNote: 'The mythical commit that fixed one bug and spawned three more before we wrote proper unit tests.',
    },
    {
      id: 'rb-4',
      name: 'ai_existential_crisis_will_it_take_our_jobs.txt',
      originalLocation: 'C:\\Users\\Administrator\\Thoughts',
      dateDeleted: '2024-10-05 02:18 PM',
      size: '1.2 KB',
      type: 'Text Document',
      humorNote: 'Concluded: AI is just another high-power tool like Kafka or Docker. Humans who master systems will thrive.',
    },
    {
      id: 'rb-5',
      name: 'unhandled_promise_rejection_at_3am.log',
      originalLocation: 'C:\\Users\\Administrator\\Logs',
      dateDeleted: '2024-11-02 03:00 AM',
      size: '348 KB',
      type: 'Text Document',
      humorNote: 'Fixed after realizing we forgot to return a rejected promise in an async map. Classic.',
    },
  ] as RecycleItem[],

  // Mock social replicas for Browser window (since LinkedIn & GitHub block iframes)
  socialProfiles: {
    github: {
      username: 'VedantBorude683',
      name: 'Vedant Borude',
      bio: 'Full Stack Developer | Crafting Resilient Backends & Responsive Frontend Architectures | PICT Pune',
      followers: 84,
      following: 42,
      publicRepos: 18,
      pinnedRepos: [
        {
          name: 'Tether-Microservice-Impact-Analyzer',
          description: 'Automated breaking API contract change detection across microservices using Spring Boot, Kafka, and semantic analysis.',
          language: 'Java',
          stars: 48,
          forks: 12,
        },
        {
          name: 'Chatify-Realtime-WebRTC',
          description: 'Full-stack MERN real-time video conferencing & chat application with self-destructing Whisper Mode.',
          language: 'JavaScript',
          stars: 36,
          forks: 8,
        },
        {
          name: 'SwiftRide-Uber-Clone',
          description: 'Interactive ride-hailing platform with geospatial dispatch, dynamic fare calculation and live simulation.',
          language: 'TypeScript',
          stars: 29,
          forks: 6,
        },
      ],
      contributions: '1,420+ commits in the last year',
    },
    linkedin: {
      name: 'Vedant Borude',
      headline: 'Full Stack Developer | B.Tech Computer Engineering at PICT (CGPA: 9.40) | Spring Boot • React • Kafka • WebRTC',
      location: 'Pune, Maharashtra, India',
      connections: '500+ connections',
      about: 'Passionate software engineer building resilient backend systems and delightful web applications. Experienced with Java/Spring Boot, Kafka, React, Node.js, WebSockets, and WebRTC. Looking for high-impact software engineering roles and internships.',
      experience: [
        {
          role: 'Full Stack Software Engineer',
          company: 'Independent & Collegiate Project Engineering',
          duration: 'Sep 2024 - Present · 1 yr 8 mos',
          location: 'Pune, India',
          description: 'Architecting distributed systems (Kafka, Spring Boot, MongoDB) and full-stack real-time platforms (WebSockets, WebRTC).',
        },
      ],
      education: {
        school: 'Pune Institute of Computer Technology (PICT)',
        degree: 'Bachelor of Technology - BTech, Computer Engineering',
        dates: '2024 - 2028',
        grade: 'CGPA: 9.40 / 10.0',
      },
    },
  },
};
