export const HERO_CONTENT: string = `I am a passionate frontend developer with a strong focus on crafting dynamic and scalable web applications. With over a year of hands-on experience, I specialize in React, Tailwind CSS, JavaScript, and modern frameworks like Next.js, Node.js, Express, and MongoDB. I am dedicated to building intuitive and user-centered websites that are functional, visually appealing, and optimized for seamless user experiences and performance.`;

export const ABOUT_TEXT: string = `I am a dedicated frontend developer with a passion for building user-friendly, performant, and visually appealing web applications. With over a year of experience, I have worked extensively with React, Next.js, Tailwind CSS, React-Router, and Framer Motion, focusing on creating scalable, responsive, and engaging user experiences.

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
    title: "Team Project Management System",
    image: "/TPMS.png",
    description:
      "Project management platform designed for software engineering courses to help instructors and students track team progress, milestones, contributions, and project risks.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Supabase"],
    featured: true,
    category: "fullstack",
    highlights: [
      "Designed dashboards for instructors and student teams.",
      "Modeled project data around teams, milestones, tasks, risks, and individual contributions.",
      "Planned integrations with tools like GitHub, Canvas, Jira, and Teams.",
      "Focused on requirements engineering, system design, and scalable full-stack architecture.",
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

