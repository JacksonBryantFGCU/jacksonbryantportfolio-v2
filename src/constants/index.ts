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
    title: "Arthrex MySurgery",
    demo: "https://www.arthrexmysurgery.com",
    github: "https://github.com/JacksonBryantFGCU/arthrex-mysurgeryfrontend",
    description:
      "A patient engagement platform connecting patients to surgeons with pre/post-surgery checklists and medical information.",
    skills: ["React", "React Router"],
    image: "/arthrex-mysurgery.webp",
    featured: true,
    category: "fullstack",
    highlights: [
      "Built interactive pre/post-surgery checklists improving patient preparedness",
      "Integrated secure patient-surgeon communication features",
      "Deployed production app serving real medical practice users"
    ],
  },
  {
    title: "Sunstone Pickleball",
    image: "/sunstone-pickleball.webp",
    description:
      "A community hub for the Sunstone Pickleball Club with a gallery, player profiles, events calendar, and contact system.",
    skills: ["React", "Tailwind", "React Router", "Framer Motion"],
    demo: "https://www.sunstonepickleball.com",
    github: "https://github.com/JacksonBryantFGCU/SunstonePickleballClub",
    featured: true,
    category: "frontend",
    highlights: [
      "Designed responsive gallery with optimized image loading",
      "Built dynamic events calendar with filtering capabilities",
      "Implemented smooth page transitions with Framer Motion"
    ],
  },
  {
    title: "Portfolio Website",
    image: "/project2.webp",
    description:
      "A personal portfolio showcasing projects, skills, and animations with Framer Motion and GSAP.",
    skills: ["React", "Tailwind", "TypeScript", "GSAP"],
    demo: "https://jacksonbryantportfolio.netlify.app/",
    github: "https://github.com/JacksonBryantFGCU/portfolio",
    featured: false,
    category: "frontend",
    highlights: [
      "Crafted smooth scroll animations using GSAP ScrollTrigger",
      "Built fully responsive design with mobile-first approach",
      "Implemented form validation with Zod schema validation"
    ],
  },
  {
    title: "Upgrades by Taylor",
    image: "/project1.webp",
    description:
      "A small business website with an image gallery, contact form, and testimonial carousel.",
    skills: ["HTML", "CSS", "JavaScript", "FormSpree"],
    demo: "https://linkedin.com",
    github: "https://github.com/JacksonBryantFGCU/UpgradesbyTaylor",
    featured: false,
    category: "frontend",
    highlights: [
      "Delivered complete business website for local client",
      "Built custom testimonial carousel with vanilla JavaScript",
      "Integrated FormSpree for seamless contact form submissions"
    ],
  }
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

