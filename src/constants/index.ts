export interface ExperienceEntry {
  title: string;
  organization: string;
  /** One sentence: what you did and what came of it */
  description: string;
  /** Display dates, e.g. "Mar 2026 – Present" */
  period: string;
  /** Used for ordering (newest first) */
  sortDate: string;
  type: "work" | "leadership";
  tags?: string[];
}

// Facts here come from the Fall 2026 résumé
export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    title: "Autonomous Driving Research Assistant",
    organization: "FGCU Computing & Software Engineering Department",
    description:
      "Brought up the lab's LiDAR pipeline: set up Ubuntu 22.04 and ROS 2 Humble, configured the Livox MID-360 drivers and integrated them into Autoware, and assembled the network, power and CAN cabling for live operation.",
    period: "Mar 2026 – Present",
    sortDate: "2026-03",
    type: "work",
    tags: ["ROS 2", "Autoware", "LiDAR", "Ubuntu"],
  },
  {
    title: "Student Leader (Math Tutor)",
    organization: "FGCU Center for Academic Achievement",
    description:
      "Tutor students in Calculus III, Linear Algebra, Mathematical Foundations and Differential Equations, working with staff and campus partners on student success.",
    period: "Apr 2024 – Present",
    sortDate: "2024-04",
    type: "work",
  },
  {
    title: "President",
    organization: "Computer Science & Software Engineering Club (CSSEC)",
    description: "Lead FGCU's Computer Science & Software Engineering Club.",
    period: "Aug 2026 – Present",
    sortDate: "2026-08",
    type: "leadership",
  },
  {
    title: "WCE Ambassador",
    organization: "Whitaker College of Engineering, FGCU",
    description: "Represent the Whitaker College of Engineering as a student ambassador.",
    period: "Fall 2026 – Present",
    sortDate: "2026-08",
    type: "leadership",
  },
  {
    title: "Student Representative",
    organization: "FGCU Industry Advisory Board",
    description: "Represent students on FGCU's Industry Advisory Board.",
    period: "Spring 2026 – Present",
    sortDate: "2026-01",
    type: "leadership",
  },
];

export interface Project {
  title: string;
  /** One line shown on cards */
  description: string;
  /** Who it was for and what they needed */
  problem: string;
  /** Your part in it */
  role: string;
  /** What you built: about three concrete bullets */
  highlights: string[];
  /** What came of it */
  result?: string;
  /** e.g. "Live", "Released", "Hackathon prototype" */
  status: string;
  /** e.g. "Dec 2025"; leave out if unknown */
  date?: string;
  /** Base path of the screenshot; the -480/-800/-1400.webp files are used */
  image?: string;
  demo?: string;
  github?: string;
  skills?: string[];
  featured?: boolean;
  /** Built for a real client (shown as "Client work") */
  client?: boolean;
  /** Short label for featured projects that aren't client work */
  label?: string;
  category?: "frontend" | "backend" | "fullstack" | "other";
}

export const PROJECTS: Project[] = [
  {
    title: "Zonta Club of Naples Website",
    description:
      "Membership, payments, events and scholarships for a Naples nonprofit, with content the club edits itself.",
    problem:
      "The Zonta Club of Naples needed one website to handle membership applications, payments, events, scholarships and donations, with content its members can update without a developer.",
    role: "Design and full-stack development",
    highlights: [
      "Turned the club's requirements into features: membership applications, event and scholarship pages, donations and payments.",
      "Built a React and TypeScript frontend with a Node.js/Express API connected to Stripe, Square and Sanity CMS.",
      "Deployed on Vercel and Render, with end-to-end tests to validate production functionality.",
    ],
    result: "Live at zontaclubofnaples.org.",
    status: "Live",
    date: "Dec 2025",
    demo: "https://zontaclubofnaples.org",
    image: "/images/projects/zonta-club",
    skills: ["React", "TypeScript", "Node.js", "Express", "Sanity CMS", "Stripe", "Square", "Vercel", "Render"],
    featured: true,
    client: true,
    category: "fullstack",
  },
  {
    title: "ACE.AI Mock Interview Platform",
    description:
      "Voice-driven mock interviews for behavioral and technical rounds, built in 36 hours at EagleHacks.",
    problem:
      "Practicing interviews alone doesn't feel like the real thing. ACE.AI runs realistic mock interviews by voice, with AI-generated questions for behavioral and technical rounds.",
    role: "Backend lead on a hackathon team",
    highlights: [
      "Led the backend: Node.js/Express with JWT authentication and PostgreSQL for secure interview sessions.",
      "Integrated Vapi for low-latency voice input and output and a natural conversation flow.",
      "Added AI-generated questions and a technical round with an in-browser Monaco code editor.",
    ],
    result: "Shipped a working product in 36 hours and won 3rd place overall plus a company challenge award at EagleHacks 2026.",
    status: "Prototype",
    date: "Mar 2026",
    image: "/images/projects/ace-ai",
    skills: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Vapi", "OpenAI"],
    featured: true,
    label: "Hackathon · 3rd place",
    category: "fullstack",
  },
  {
    title: "Upgrades by Taylor Website",
    description: "Services, project gallery and quote requests for an independent home-improvement contractor.",
    problem:
      "An independent contractor needed a professional site to show their services and past work and turn visitors into quote requests.",
    role: "Frontend development from the client's design direction",
    highlights: [
      "Built a responsive React site from the client's design direction and branding.",
      "Created pages for services, a project photo gallery, company information and contact.",
      "Added clear \"Get a quote\" calls to action and a mobile-first layout.",
    ],
    result: "Live at upgrades-by-taylor.com.",
    status: "Live",
    demo: "https://upgrades-by-taylor.com",
    github: "https://github.com/JacksonBryantFGCU/UpgradesbyTaylor",
    image: "/images/projects/upgrades-by-taylor",
    skills: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    featured: true,
    client: true,
    category: "frontend",
  },
  {
    title: "Dev Operator",
    description: "A desktop workspace that runs git, dev servers and project tooling from typed or spoken commands.",
    problem:
      "Day-to-day development is spread across terminals, git and browser tabs. Dev Operator puts those tasks in one desktop app you can drive by typing or talking.",
    role: "Creator",
    highlights: [
      "Built a command bar that takes typed or spoken input (via Vapi) to run git operations, manage dev servers and open project tooling.",
      "Added Claude-powered commit messages, code analysis and implementation prompts through the Anthropic SDK.",
      "Built a multi-project sidebar with live git status and GitHub issue and PR counts, with API keys encrypted by Electron safeStorage.",
    ],
    result: "Released v1.0.0 with multi-platform builds from a GitHub Actions release workflow.",
    status: "Released",
    github: "https://github.com/JacksonBryantFGCU/dev-operator",
    image: "/images/projects/dev-operator",
    skills: ["Electron", "React", "TypeScript", "Vite", "Anthropic SDK", "Vapi"],
    featured: false,
    category: "fullstack",
  },
  {
    title: "AskLisa",
    description: "A neighborhood Q&A site that notifies Lisa the moment someone sends a question.",
    problem:
      "Lisa answers neighbors' questions about the Sunstone community and needed a simple way to collect them without missing any.",
    role: "Developer",
    highlights: [
      "Built a question form backed by Supabase, plus a page of answered questions.",
      "Sent real-time push notifications through ntfy, with email notifications from a Supabase function.",
      "Kept it lightweight: a small React app with no custom server to maintain.",
    ],
    result: "Live at asksunstonelisa.com.",
    status: "Live",
    demo: "https://asksunstonelisa.com",
    github: "https://github.com/JacksonBryantFGCU/askLisa",
    image: "/images/projects/asklisa",
    skills: ["React", "TypeScript", "Tailwind CSS", "Supabase", "ntfy"],
    featured: false,
    category: "frontend",
  },
  {
    title: "Jackson Bryant Portfolio",
    description: "This site: a fast, accessible portfolio that puts client work first.",
    problem:
      "A portfolio has about 30 seconds to make its case, so it has to load instantly on a phone and get to the work fast.",
    role: "Design and development",
    highlights: [
      "Pre-rendered the React page to static HTML at build time, so content shows before any JavaScript runs.",
      "Cut the page from about 12 MB to under 1 MB with responsive WebP images and a smaller bundle.",
      "Made it accessible: real links, an accessible project dialog and reduced-motion support.",
    ],
    result: "Scores 98–100 across Lighthouse's mobile performance, accessibility, best practices and SEO audits.",
    status: "Live",
    demo: "https://www.jacksonbryant.com",
    github: "https://github.com/JacksonBryantFGCU/jacksonbryantportfolio-v2",
    image: "/images/projects/portfolio",
    skills: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    featured: false,
    category: "frontend",
  },
  {
    title: "Wellon CPR Website",
    description: "Course listings and certification info for a CPR and first-aid training provider.",
    problem:
      "A CPR and first-aid training provider needed a website that presents its courses and certifications and makes it easy for new students to get in touch.",
    role: "Frontend development",
    highlights: [
      "Built a responsive site with pages for course offerings, certification details and contact.",
      "Designed a clear visual hierarchy and calls to action for a non-technical audience.",
      "Delivered a production-ready site on the client's own domain.",
    ],
    result: "Live at welloncpr.com.",
    status: "Live",
    demo: "https://welloncpr.com",
    github: "https://github.com/JacksonBryantFGCU/cpr-website",
    image: "/images/projects/wellon-cpr",
    skills: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    featured: false,
    client: true,
    category: "frontend",
  },
];

export const ABOUT = {
  headline: "I build software that ships to real users.",
  paragraphs: [
    "I'm a senior in Software Engineering at Florida Gulf Coast University, graduating in May 2027. Most of what I build goes live: websites for a Naples nonprofit and local businesses, a mock-interview platform my team built at EagleHacks, and a desktop tool for my own development workflow.",
    "Beyond client work, I'm a research assistant on FGCU's autonomous driving project, president of the Computer Science & Software Engineering Club, and a tutor for upper-level math. I'm looking for software engineering internships and I'm open to freelance web projects.",
  ],
};

export const CORE_STACK: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "SQL", "Java", "C++"],
  Frontend: ["React", "Next.js", "Tailwind CSS"],
  Backend: ["Node.js", "Express", "PostgreSQL", "Supabase"],
  Testing: ["Vitest", "Selenium", "JUnit"],
  Tools: ["Git", "Vite", "Sanity CMS", "Stripe", "Vapi"],
};

export interface ProofPoint {
  value: string;
  label: string;
}

// Shown right under the hero. Keep these to facts that are on the résumé.
export const PROOF_POINTS: ProofPoint[] = [
  { value: "3", label: "Client websites live in production" },
  { value: "3rd place", label: "EagleHacks 2026, plus a company challenge win" },
  { value: "Research", label: "Undergraduate research assistant at FGCU" },
  { value: "May 2027", label: "B.S. Software Engineering graduation" },
];

export const EDUCATION = {
  degree: "B.S. Software Engineering",
  school: "Florida Gulf Coast University · Fort Myers, FL",
  graduation: "May 2027",
  courses: ["Requirements Engineering & Analysis", "Computer Security", "Software Testing", "Data Engineering"],
};

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  /** Shown when there is no public verification link */
  credentialId?: string;
  /** Base path of the certificate image; -600.webp and -1200.webp files are used */
  image: string;
  /** Pixel size of the full-size (-1200) image */
  imageSize: [number, number];
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "3",
    name: "Relational Database",
    issuer: "freeCodeCamp",
    issueDate: "October 2026",
    credentialUrl: "https://www.freecodecamp.org/certification/fcc9736ba88-0cad-4eb6-b72b-271aa251ff30/relational-databases-v9",
    image: "/images/certs/freecodecamp-relational-database",
    imageSize: [1200, 808],
  },
  {
    id: "2",
    name: "Scientific Computing with Python",
    issuer: "freeCodeCamp",
    issueDate: "April 2025",
    credentialUrl: "https://www.freecodecamp.org/certification/JacksonBryantFGCU/scientific-computing-with-python-v7",
    image: "/images/certs/freecodecamp-python",
    imageSize: [1200, 809],
  },
  {
    id: "1",
    name: "Securing Projects with OpenSSF",
    issuer: "The Linux Foundation",
    issueDate: "March 2025",
    // The Linux Foundation has no public verification page; show the certificate ID instead
    credentialId: "LF-2vz4wqoaqk",
    image: "/images/certs/linux-foundation-openssf",
    imageSize: [1180, 906],
  },
];

export interface Contact {
  address: string;
  phoneNo: string;
  email: string;
}

export const CONTACT: Contact = {
  address: "Wellen Park, Venice, FL 34293",
  phoneNo: "+1 443 994 5589",
  email: "jackbryant5589@gmail.com"
};

