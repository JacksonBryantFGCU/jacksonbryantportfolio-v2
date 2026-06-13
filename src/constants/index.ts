export const HERO_CONTENT: string = `I am a passionate frontend developer with a strong focus on crafting dynamic and scalable web applications. With 2–3 years of hands-on experience, I specialize in React, Tailwind CSS, TypeScript, and modern frameworks like Node.js, Express, and Electron. I am dedicated to building intuitive and user-centered software that is functional, visually appealing, and optimized for seamless user experiences and performance.`;

export const ABOUT_TEXT: string = `I am a dedicated frontend developer with a passion for building user-friendly, performant, and visually appealing web applications. With over a year of experience, I have worked extensively with React, Tailwind CSS, React-Router, and Framer Motion, focusing on creating scalable, responsive, and engaging user experiences.

My journey in web development started with a curiosity for how things work, which has grown into a career where I continuously learn, adapt, and tackle new challenges. I thrive in collaborative environments, enjoy problem-solving, and take pride in delivering high-quality solutions.`;

export const ABOUT_TEXT1: string = `I am currently a sophomore at Florida Gulf Coast University, pursuing a B.S. in Software Engineering. My coursework includes Data Structures & Algorithms, Calculus III, Discrete Mathematics, and Computer Security, giving me a strong foundation in both theoretical and practical aspects of computing. Beyond academics, I am actively building projects, solving LeetCode problems, and expanding my knowledge independently.

Outside of coding, I enjoy playing the piano, exploring emerging technologies, and contributing to open-source projects.`;

export interface ExperienceEntry {
  title: string;
  organization: string;
  description: string;
  startYear: number;
  endYear: number | null; // null = present
  type: "work" | "leadership";
  tags?: string[];
}

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    title: "Student Math Tutor",
    organization: "FGCU",
    description: "Helped students in math topics ranging from Algebra to Calculus III. Worked with students on homework, classwork, and various topics by providing guidance and clarification as needed.",
    startYear: 2024,
    endYear: null,
    type: "work",
    tags: ["Problem Solving", "Communication", "Math"]
  },
  {
    title: "Research Assistant",
    organization: "FGCU",
    description: "Led an Unreal Engine simulation project that models a Water-Energy-Food (WEF) system. Using C++ and Unreal's blueprint system, I tested, fixed bugs, and added new features to enhance the simulation's user experience.",
    startYear: 2024,
    endYear: null,
    type: "work",
    tags: ["Unreal Engine", "C++", "Virtual Reality"]
  },
  {
    title: "Back of House Worker",
    organization: "Chick-fil-A",
    description: "Worked in the Back of House at Chick-fil-A, preparing food and coordinating with kitchen and front-of-house staff to ensure efficient service.",
    startYear: 2023,
    endYear: 2024,
    type: "work",
    tags: ["Service", "Teamwork", "Communication"]
  },
  {
    title: "Secretary",
    organization: "Computer Science & Software Engineering Club (CSSEC)",
    description: "Perform tasks and duties that help CSSEC run smoothly, including taking meeting notes, managing events, room reservations, and assisting with club communications.",
    startYear: 2025,
    endYear: null,
    type: "leadership",
    tags: ["Organization", "Communication"]
  }
];

export interface Project {
  title: string;
  description: string;
  image?: string;
  demo?: string;
  github?: string;
  skills?: string[];
  featured?: boolean;
  category?: "frontend" | "backend" | "fullstack" | "other";
  highlights?: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "Zonta Club of Naples Website",
    demo: "https://zontaclubofnaples.org",
    image: "/zonta-club.png",
    description:
      "Full-stack membership and content website for a nonprofit organization, supporting membership applications, payments, events, scholarships, donations, and CMS-managed content.",
    skills: ["React", "TypeScript", "Node.js", "Express", "Sanity CMS", "Square", "Stripe", "Vercel", "Render"],
    featured: true,
    category: "fullstack",
    highlights: [
      "Built a production client website with responsive frontend pages and backend API workflows.",
      "Integrated CMS-managed content for events, scholarships, and membership-related pages.",
      "Implemented payment workflows and deployment across frontend and backend hosting platforms.",
      "Worked through real client requirements, content changes, and deployment constraints.",
    ],
  },
  {
    title: "ACE.AI Mock Interview Platform",
    image: "/ACE-AI.png",
    description:
      "AI-powered mock interview platform with voice-driven behavioral interviews and technical coding interview support.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Vapi", "Supabase", "OpenAI"],
    featured: true,
    category: "fullstack",
    highlights: [
      "Built real-time mock interview flows for behavioral and technical interview practice.",
      "Integrated AI-generated questions, voice interaction, and coding interview workflows.",
      "Added frontend interview panels, Monaco editor support, and backend orchestration routes.",
      "Won 3rd place overall and a company challenge award at a hackathon.",
    ],
  },
  {
    title: "Dev Operator",
    image: "/devoperator.png",
    github: "https://github.com/JacksonBryantFGCU/dev-operator",
    description:
      "AI-augmented desktop workspace built with Electron that lets developers manage projects, run forge tooling, commit code, and control dev servers through a unified command interface with voice support.",
    skills: ["Electron", "React", "TypeScript", "Vite", "Anthropic SDK", "Zod", "Execa"],
    featured: true,
    category: "fullstack",
    highlights: [
      "Built a unified command bar accepting typed or spoken input to run git operations, manage dev servers, and trigger project tooling.",
      "Integrated the Anthropic SDK for AI-powered command generation and prompt building.",
      "Implemented a multi-project sidebar with live git branch/status, server state, and one-click GitHub access.",
      "Added Electron safeStorage-encrypted GitHub PAT for live issue and PR counts without exposing credentials.",
    ],
  },
  {
    title: "AskLisa",
    image: "/askLisa.png",
    demo: "https://asksunstonelisa.com",
    github: "https://github.com/JacksonBryantFGCU/askLisa",
    description:
      "Lightweight web app that lets visitors submit questions or messages directly to Lisa, with real-time push notifications delivered via ntfy so she never misses an inquiry.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Supabase", "ntfy"],
    featured: false,
    category: "frontend",
    highlights: [
      "Built a clean submission form with Supabase as the backend data store for incoming messages.",
      "Integrated ntfy push notifications to alert Lisa in real time whenever a new message is submitted.",
      "Deployed a production site with a custom domain and mobile-friendly responsive layout.",
      "Kept the implementation lightweight and focused — no unnecessary dependencies or backend overhead.",
    ],
  },
  {
    title: "Wellon CPR Website",
    image: "/welloncpr.png",
    demo: "https://welloncpr.com",
    github: "https://github.com/JacksonBryantFGCU/cpr-website",
    description:
      "Professional business website for a CPR and first-aid training provider, built to present course offerings, certification information, and a contact pathway for new students.",
    skills: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    featured: false,
    category: "frontend",
    highlights: [
      "Built a responsive, client-facing website to establish online presence for a CPR training business.",
      "Structured pages for course offerings, certification details, and contact information.",
      "Focused on clean visual hierarchy, clear calls to action, and mobile responsiveness.",
      "Delivered a production-ready site optimized for a non-technical client audience.",
    ],
  },
  {
    title: "Jackson Bryant Portfolio",
    image: "/portfolio.png",
    description:
      "Personal developer portfolio built to showcase projects, experience, certifications, technical skills, and contact information.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    demo: "https://jacksonbryantportfolio.netlify.app/",
    github: "https://github.com/JacksonBryantFGCU/jacksonbryantportfolio-v2",
    featured: false,
    category: "frontend",
    highlights: [
      "Built a responsive portfolio with reusable components and polished UI sections.",
      "Organized projects, experience, certifications, and contact information for recruiters.",
      "Used modern animations and styling while keeping the site professional.",
      "Deployed the site with optimized production builds.",
    ],
  },
  {
    title: "Upgrades by Taylor Website",
    demo: "https://upgrades-by-taylor.com",
    image: "/upgradesbytaylor.png",
    description:
      "Static business website for an independent contractor, designed to present services, project photos, contact information, and business credibility.",
    skills: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "https://github.com/JacksonBryantFGCU/UpgradesbyTaylor",
    featured: false,
    category: "frontend",
    highlights: [
      "Built a responsive business website from a provided design direction.",
      "Structured pages for services, gallery, contact, and company information.",
      "Focused on clean layout, strong calls to action, and mobile responsiveness.",
      "Prepared the site for client-facing deployment and branding assets.",
    ],
  },
];

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  image: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "1",
    name: "Securing Projects with OpenSSF",
    issuer: "The Linux Foundation",
    issueDate: "May 2024",
    credentialUrl: "https://freecodecamp.org/cert-link",
    image: "/Screenshot 2025-04-06 190947.webp",
  },
  {
    id: "2",
    name: "Scientific Computing with Python",
    issuer: "freeCodeCamp",
    issueDate: "March 2024",
    credentialUrl: "https://freecodecamp.org/cert-link",
    image: "/Screenshot 2025-04-06 191010.webp",
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

