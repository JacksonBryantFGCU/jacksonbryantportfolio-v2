import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  RiReactjsLine,
  RiTailwindCssFill,
} from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { FaCss3Alt, FaHtml5, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";

interface TechIcon {
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  label: string;
}

const techIcons: TechIcon[] = [
  { Icon: RiReactjsLine, color: "text-[#61DBFB]", label: "React" },
  { Icon: TbBrandNextjs, color: "", label: "Next.js" },
  { Icon: FaCss3Alt, color: "text-[#3C99DC]", label: "CSS3" },
  { Icon: FaHtml5, color: "text-orange-500", label: "HTML5" },
  { Icon: RiTailwindCssFill, color: "text-[#38B2AC]", label: "Tailwind CSS" },
  { Icon: SiMongodb, color: "text-green-500", label: "MongoDB" },
  { Icon: FaNodeJs, color: "text-[#68A063]", label: "Node.js" },
  { Icon: SiExpress, color: "", label: "Express.js" },
];

const Technologies: React.FC = () => {
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    iconsRef.current.forEach((icon, index) => {
      if (!icon) return;
      gsap.to(icon, {
        y: -10,
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.1,
        duration: 1.6,
      });
    });
  }, []);

  const handleHover = (el: HTMLDivElement | null, enter: boolean) => {
    if (!el) return;
    gsap.to(el, {
      scale: enter ? 1.2 : 1,
      rotate: enter ? 6 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="tech"
      className="bg-background-dark px-6 py-20 border-neutral-800 border-b text-white"
    >
      <h2 className="mb-12 font-semibold text-4xl text-center">
        Technologies
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {techIcons.map(({ Icon, color, label }, index) => (
          <div
            key={index}
            ref={(el) => { iconsRef.current[index] = el; }}
            onMouseEnter={() => handleHover(iconsRef.current[index], true)}
            onMouseLeave={() => handleHover(iconsRef.current[index], false)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-[0_0_15px_rgba(56,178,172,0.7)] p-[2px] rounded-2xl transition-all cursor-pointer"
            aria-label={label}
          >
            <div className="flex justify-center items-center bg-neutral-900 p-4 rounded-2xl">
              <Icon className={`text-7xl ${color}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
