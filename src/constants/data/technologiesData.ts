// src/data/technologiesData.ts
import { RiReactjsLine, RiTailwindCssFill } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { FaCss3Alt, FaHtml5, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";

export interface Technology {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  keyFeatures: string[];
  examples: string[];
  links: {
    docs?: string;
    github?: string;
  };
}

export const TECHNOLOGIES: Technology[] = [
  {
    id: "react",
    name: "React",
    icon: RiReactjsLine,
    color: "text-[#61DBFB]",
    description: "A JavaScript library for building dynamic and reusable UI components.",
    keyFeatures: ["Component-based architecture", "Virtual DOM", "Hooks for state and effects"],
    examples: ["Portfolio Website", "Sunstone Pickleball Club Website"],
    links: {
      docs: "https://react.dev/",
      github: "https://github.com/facebook/react"
    }
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: TbBrandNextjs,
    color: "",
    description: "A React framework for server-rendered and static web applications.",
    keyFeatures: ["SSR and SSG support", "API routes", "File-based routing"],
    examples: ["Portfolio Website"],
    links: {
      docs: "https://nextjs.org/docs",
      github: "https://github.com/vercel/next.js"
    }
  },
  {
    id: "css3",
    name: "CSS3",
    icon: FaCss3Alt,
    color: "text-[#3C99DC]",
    description: "A stylesheet language for describing the presentation of HTML elements.",
    keyFeatures: ["Responsive design", "Flexbox and Grid", "Animations"],
    examples: ["All web projects"],
    links: {
      docs: "https://developer.mozilla.org/en-US/docs/Web/CSS"
    }
  },
  {
    id: "html5",
    name: "HTML5",
    icon: FaHtml5,
    color: "text-orange-500",
    description: "The standard markup language for structuring content on the web.",
    keyFeatures: ["Semantic tags", "Forms and validation", "Media support"],
    examples: ["All web projects"],
    links: {
      docs: "https://developer.mozilla.org/en-US/docs/Web/HTML"
    }
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: RiTailwindCssFill,
    color: "text-[#38B2AC]",
    description: "A utility-first CSS framework for rapid UI development.",
    keyFeatures: ["Utility-first classes", "Custom theming", "Responsive utilities"],
    examples: ["Portfolio Website", "Sunstone Pickleball Club Website"],
    links: {
      docs: "https://tailwindcss.com/docs"
    }
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: SiMongodb,
    color: "text-green-500",
    description: "A NoSQL database for high-performance, flexible data storage.",
    keyFeatures: ["Document-oriented", "Scalable architecture", "Rich query language"],
    examples: ["Backend API project"],
    links: {
      docs: "https://www.mongodb.com/docs/"
    }
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: FaNodeJs,
    color: "text-[#68A063]",
    description: "A JavaScript runtime built on Chrome's V8 engine for server-side applications.",
    keyFeatures: ["Non-blocking I/O", "NPM ecosystem", "Cross-platform"],
    examples: ["Backend API", "Authentication system"],
    links: {
      docs: "https://nodejs.org/en/docs"
    }
  },
  {
    id: "express",
    name: "Express.js",
    icon: SiExpress,
    color: "",
    description: "A minimal and flexible Node.js web application framework.",
    keyFeatures: ["Middleware support", "Routing", "Lightweight"],
    examples: ["Backend API"],
    links: {
      docs: "https://expressjs.com/"
    }
  }
];

