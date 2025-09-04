export const HERO_CONTENT: string = `I am a passionate frontend developer with a strong focus on crafting dynamic and scalable web applications. With over a year of hands-on experience, I specialize in React, Tailwind CSS, JavaScript, and modern frameworks like Next.js, Node.js, Express, and MongoDB. I am dedicated to building intuitive and user-centered websites that are functional, visually appealing, and optimized for seamless user experiences and performance.`;

export const ABOUT_TEXT: string = `I am a dedicated frontend developer with a passion for building user-friendly, performant, and visually appealing web applications. With over a year of experience, I have worked extensively with React, Next.js, Tailwind CSS, React-Router, and Framer Motion, focusing on creating scalable, responsive, and engaging user experiences.

My journey in web development started with a curiosity for how things work, which has grown into a career where I continuously learn, adapt, and tackle new challenges. I thrive in collaborative environments, enjoy problem-solving, and take pride in delivering high-quality solutions.`;

export const ABOUT_TEXT1: string = `I am currently a sophomore at Florida Gulf Coast University, pursuing a B.S. in Software Engineering. My coursework includes Data Structures & Algorithms, Calculus III, Discrete Mathematics, and Computer Security, giving me a strong foundation in both theoretical and practical aspects of computing. Beyond academics, I am actively building projects, solving LeetCode problems, and expanding my knowledge independently.

Outside of coding, I enjoy playing the piano, exploring emerging technologies, and contributing to open-source projects.`;

export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    year: "2024 - Present",
    role: "Student Math Tutor",
    company: "FGCU",
    description: "Helped students in math topics ranging from Algebra to Calculus III. Worked with students on homework, classwork, and various topics by providing guidance and clarification as needed.",
    skills: ["Problem Solving", "Communication", "Math"]
  },
  {
    year: "2024 - Present",
    role: "Research Assistant",
    company: "FGCU",
    description: "Led an Unreal Engine simulation project that models a Water-Energy-Food (WEF) system. Using C++ and Unreal's blueprint system, I tested, fixed bugs, and added new features to enhance the simulation's user experience.",
    skills: ["Unreal Engine", "C++", "Virtual Reality"]
  },
  {
    year: "2023 - 2024",
    role: "Back of House Worker",
    company: "Chick-fil-A",
    description: "Worked in the Back of House at Chick-fil-A, preparing food and coordinating with kitchen and front-of-house staff to ensure efficient service.",
    skills: ["Service", "Teamwork", "Communication"]
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
    stats?: {
        duration?: string;
        linesOfCode?: number;
        users?: string;
    };
    details?: {
        longDescription?: string;
        architectureImage?: string;
        videoDemo?: string;
        challenges?: string[];
        solutions?: string[];
    };
}

export const PROJECTS: Project[] = [
  {
    title: "Arthrex MySurgery",
    demo: "https://www.arthrexmysurgery.com",
    github: "https://github.com/JacksonBryantFGCU/arthrex-mysurgeryfrontend",
    description:
      "A patient engagement platform connecting patients to surgeons with pre/post-surgery checklists and medical information.",
    skills: ["React", "React-Router-DOM"],
    image: "/assets/arthrex-mysurgery.webp",
    featured: true,
    category: "fullstack",
    stats: {
      duration: "3 weeks",
      linesOfCode: 4200,
      users: "500+ patients"
    },
    details: {
      longDescription:
        "Arthrex MySurgery is a secure web platform that bridges communication between patients and surgeons. Built with React and React-Router-DOM for a dynamic, multi-page experience. Includes role-based authentication, interactive checklists, and mobile optimization.",
      architectureImage: "/assets/arthrex-architecture.png",
      videoDemo: "/assets/arthrex-demo.mp4",
      challenges: [
        "Ensuring HIPAA compliance while storing patient data",
        "Designing an intuitive UX for elderly patients"
      ],
      solutions: [
        "Implemented encrypted API requests and secure JWT authentication",
        "Tested interface designs with non-technical users for accessibility"
      ]
    }
  },
  {
    title: "Sunstone Pickleball Website",
    image: "/assets/sunstone-pickleball.webp",
    description:
      "A community hub for the Sunstone Pickleball Club with a gallery, player profiles, events calendar, and contact system.",
    skills: ["React", "Tailwind CSS", "React-Router", "Framer Motion"],
    demo: "https://www.sunstonepickleball.com",
    github: "https://github.com/JacksonBryantFGCU/SunstonePickleballClub",
    featured: false,
    category: "frontend",
    stats: {
      duration: "2 weeks",
      linesOfCode: 2100,
      users: "80+ club members"
    },
    details: {
      longDescription:
        "A responsive and visually appealing website for the Sunstone Pickleball Club. Built with React and styled using Tailwind CSS, it features smooth animations with Framer Motion and an easy-to-use navigation system via React Router.",
      architectureImage: "/assets/sunstone-architecture.png",
      videoDemo: "/assets/sunstone-demo.mp4",
      challenges: ["Creating a mobile-friendly events calendar", "Optimizing image-heavy gallery for fast load times"],
      solutions: [
        "Integrated a responsive React calendar component",
        "Implemented lazy-loading for gallery images"
      ]
    }
  },
  {
    title: "Portfolio Website",
    image: "/assets/project2.webp",
    description:
      "A personal portfolio showcasing projects, skills, and animations with Framer Motion and GSAP.",
    skills: ["React", "Tailwind CSS", "TypeScript", "GSAP", "Zod"],
    demo: "https://jacksonbryantportfolio.netlify.app/",
    github: "https://github.com/JacksonBryantFGCU/portfolio",
    featured: true,
    category: "frontend",
    stats: {
      duration: "Ongoing",
      linesOfCode: 3000,
      users: "Recruiters & employers"
    },
    details: {
      longDescription:
        "This portfolio is a living project showcasing my growth as a developer. It integrates Framer Motion for smooth section animations, GSAP for scroll-based effects, and a custom-built component system to ensure consistency and scalability.",
      architectureImage: "/assets/portfolio-architecture.png",
      videoDemo: "/assets/portfolio-demo.mp4",
      challenges: ["Maintaining performance with multiple animations", "Keeping design consistent across sections"],
      solutions: [
        "Optimized animations with lazy-loaded motion components",
        "Created a global design system with Tailwind utilities"
      ]
    }
  },
  {
    title: "Upgrades by Taylor Website",
    image: "/assets/project1.webp",
    description:
      "A small business website with an image gallery, contact form, and testimonial carousel.",
    skills: ["HTML", "CSS", "JavaScript", "FormSpree"],
    demo: "https://linkedin.com",
    github: "https://github.com/JacksonBryantFGCU/UpgradesbyTaylor",
    featured: false,
    category: "frontend",
    stats: {
      duration: "1 week",
      linesOfCode: 800,
      users: "Local business clients"
    },
    details: {
      longDescription:
        "A simple but effective static website for a small business, designed to showcase their services with a clean gallery, an easy contact form, and a rotating testimonials section.",
      architectureImage: "/assets/upgrades-architecture.png",
      videoDemo: "/assets/upgrades-demo.mp4",
      challenges: ["Ensuring fast load speed without a framework"],
      solutions: ["Minified assets and optimized image sizes"]
    }
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
    image: "assets/Screenshot 2025-04-06 190947.webp",
  },
  {
    id: "2",
    name: "Scientific Computing with Python",
    issuer: "freeCodeCamp",
    issueDate: "March 2024",
    credentialUrl: "https://freecodecamp.org/cert-link",
    image: "assets/Screenshot 2025-04-06 191010.webp",
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

