export const SITE = {
  github: 'https://github.com/vibhorsahu26',
  linkedin: 'https://www.linkedin.com/in/vibhorsahu26/',
};

export const projects = [
  {
    title: 'UdyamSetu',
    thumbnail: '/project-udyamsetu.png',
    category: 'Business guidance · Decision support',
    color: '#E5C76B',
    status: 'Deployed',
    live: 'https://udyam-setu-udysu.vercel.app/',
    source: 'https://github.com/vibhorsahu26/UdyamSetu',
    description: 'An AI-powered business guidance platform helping entrepreneurs explore local business opportunities, evaluate feasibility, and understand relevant financing options.',
    technologies: ['React', 'Vite', 'FastAPI', 'PostgreSQL'],
    fullStack: ['React', 'Vite', 'JavaScript', 'FastAPI', 'Python', 'PostgreSQL'],
    problem: 'Entrepreneurs and small businesses in India often struggle to find where to start, whether an idea is viable locally, and which funding options apply.',
    solution: 'Brings together business discovery, local market insights, financial planning, funding information, an AI assistant, and a decision engine for viability.',
    features: [
      'Business discovery and local market insights',
      'Financial planning and funding options',
      'AI assistant and business decision engine',
      'Database-backed funding information',
    ],
  },
  {
    title: 'OSS Path',
    thumbnail: '/project-oss-path.png',
    category: 'Open source · Discovery',
    color: '#5EE0A0',
    status: 'In Development',
    live: null,
    source: 'https://github.com/vibhorsahu26/OSS-Path',
    description: 'A developer-focused project exploring how to make open-source contribution more approachable by helping people discover beginner-friendly issues and track their journey.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    fullStack: ['HTML', 'CSS', 'JavaScript'],
    problem: 'Newcomers to open source struggle to find issues that match their level and to see their own progress.',
    solution: 'The public repository currently holds the initial HTML, CSS, and JavaScript application and exploration experience.',
    features: ['Initial application interface and exploration experience (HTML, CSS, JavaScript)'],
    noteTitle: 'Status & direction',
    note: 'Beginner-friendly issue discovery and contribution-journey tracking are the intended direction and are not described as complete.',
  },
  {
    title: 'GramMausam',
    thumbnail: '/project-grammausam.png',
    category: 'Geospatial · Weather intelligence',
    color: '#76E7F5',
    status: 'Prototype',
    live: 'https://gram-mausam.vercel.app/',
    source: 'https://github.com/vibhorsahu26/GramMausam',
    description: 'A Panchayat-level weather intelligence prototype exploring how coarse-resolution rainfall forecasts can be downscaled and combined with geospatial aggregation to support localized weather insights and agricultural decisions.',
    technologies: ['React', 'Tailwind CSS', 'FastAPI', 'scikit-learn'],
    fullStack: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'Python', 'FastAPI', 'pandas', 'NumPy', 'GeoPandas', 'Shapely', 'scikit-learn'],
    problem: 'Weather forecasts are coarse, while farming decisions happen at village and Panchayat scale.',
    solution: 'Prepares coarse weather data, builds a fine-resolution grid, applies machine-learning rainfall downscaling, aggregates by Panchayat polygon with area weighting, and serves results through FastAPI to a React dashboard with weather-risk and advisory logic.',
    features: [
      'ML rainfall downscaling pipeline',
      'Panchayat polygon aggregation with area-weighted estimates',
      'FastAPI interface and React dashboard',
      'Weather-risk interpretation and agricultural advisory logic',
    ],
    noteTitle: 'Honest note',
    note: 'The real-data pipeline produces Panchayat-level rainfall predictions. Some other weather fields in the interface are demo values, not independently validated model outputs. No accuracy figures are claimed.',
  },
  {
    title: 'JanSaadhan',
    thumbnail: '/project-jansaadhan.png',
    category: 'Civic tech · Welfare schemes',
    color: '#6FA8FF',
    status: 'Deployed',
    live: 'https://jan-saadhan.vercel.app/',
    source: 'https://github.com/vibhorsahu26/JanSaadhan',
    description: 'A lightweight rule-based platform that helps citizens discover potentially relevant welfare schemes, understand eligibility requirements, and find official application resources.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    fullStack: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    problem: 'Citizens often do not know which government schemes they may qualify for or what documents they need.',
    solution: 'A static, mobile-friendly web app that matches answers to scheme rules in the browser, with no backend or database.',
    features: [
      'Eligibility questionnaire',
      'Personalized scheme suggestions',
      'Plain-language summaries and document checklists',
      'Official application links',
    ],
  },
];

export const skills = [
  { name: 'Languages', color: '#B78AFF', items: ['C++', 'JavaScript', 'Python'] },
  { name: 'Frontend', color: '#DCC5FF', items: ['React', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'] },
  { name: 'Backend', color: '#76E7F5', items: ['Node.js', 'MongoDB', 'Mongoose', 'bcrypt', 'Multer'] },
  { name: 'Tools & Platforms', color: '#E8E2F5', items: ['Git', 'GitHub', 'Vercel'] },
];

export const journey = [
  ['Programming foundations', 'C++ and the fundamentals of data structures and algorithms.'],
  ['DSA progression', 'Data structures and algorithms practice alongside core programming.'],
  ['Frontend development', 'React.js, JavaScript, and Tailwind CSS.'],
  ['Backend learning', 'Mongoose, REST APIs, Multer, JWT, bcrypt, and Node.js.'],
  ['Projects & deployment', 'Five projects built; three deployed on Vercel.'],
  ['Hackathons & open source', 'Took part in GSSoC 2026 and contributed to three projects. A hackathon is currently ongoing.'],
];

export const academics = [
  {
    date: 'Apr 2023 – Apr 2024',
    title: 'Class X · Secondary Education',
    description: 'Completed secondary education.',
    badge: '9.5 GPA',
  },
  {
    date: 'Apr 2024 – Apr 2025',
    title: 'Class XII · Senior Secondary Education',
    description: 'Completed senior secondary education.',
    badge: '8.95 GPA',
  },
  {
    date: '2025 – 2029',
    title: 'B.Tech · Computer Science & Engineering',
    description: 'Four-year undergraduate programme. Two semesters completed; the third is in progress.',
    semesters: [
      { name: 'Semester 1', range: 'Aug 2025 – Dec 2025', grade: '8.92 CGPA' },
      { name: 'Semester 2', range: 'Feb 2026 – May 2026', grade: '8.93 CGPA' },
      { name: 'Semester 3', range: 'Aug 2026 – Dec 2026', grade: 'IN PROGRESS', current: true },
    ],
  },
];

export const projectArt = [
  { type: 'network' },
  { type: 'open-source' },
  { type: 'weather' },
  { type: 'civic' },
];
