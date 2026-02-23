// src/components/layout/Navbar.tsx
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { User, FolderOpen, Briefcase, Award, Mail } from "lucide-react";
import resumePDF from "/JacksonBryantResume2025.pdf";

// Desktop nav items
const desktopNavItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];

// Mobile nav items
const mobileNavItems = [
  { label: "About", id: "about", icon: User },
  { label: "Projects", id: "projects", icon: FolderOpen },
  { label: "Experience", id: "experience", icon: Briefcase },
  { label: "Certs", id: "certifications", icon: Award },
  { label: "Contact", id: "contact", icon: Mail },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past threshold for enhanced styling
      setIsScrolled(window.scrollY > 20);

      // Check if near bottom of page
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (isNearBottom) {
        setActiveItem("contact");
        return;
      }

      // Get all sections with their positions
      const sections = desktopNavItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return {
            name: item.id,
            top: rect.top,
            bottom: rect.bottom,
          };
        })
        .filter(Boolean) as { name: string; top: number; bottom: number }[];

      if (sections.length === 0) return;

      // Find the section that is most in view
      // A section is "active" if its top is above the threshold (200px from top)
      // and it's the last one to meet this criteria
      const threshold = 200;
      let currentSection = sections[0].name;

      for (const section of sections) {
        if (section.top <= threshold) {
          currentSection = section.name;
        }
      }

      setActiveItem(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ============================================ */}
      {/* DESKTOP NAVIGATION */}
      {/* ============================================ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-6 inset-x-0 z-50 hidden md:flex justify-center items-center gap-5"
      >
        {/* Navigation Pill */}
        <nav
          className={`
            flex items-center gap-10 px-8 rounded-full border shadow-lg
            transition-all duration-300
            ${isScrolled
              ? "py-2.5 bg-slate-900/70 backdrop-blur-xl border-white/15 shadow-xl"
              : "py-3 bg-slate-900/50 backdrop-blur-lg border-white/10"
            }
          `}
        >
          {desktopNavItems.map((item) => (
            <ScrollLink
              key={item.label}
              to={item.id}
              smooth
              duration={600}
              offset={-100}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              <span
                className={`
                  text-base font-medium transition-all duration-300 ease-out inline-block
                  ${activeItem === item.id
                    ? "text-blue-400"
                    : "text-slate-300 group-hover:text-white group-hover:-translate-y-[1px]"
                  }
                `}
              >
                {item.label}
              </span>

              {/* Active underline indicator */}
              {activeItem === item.id && (
                <motion.span
                  layoutId="desktopActiveIndicator"
                  className="absolute -bottom-1.5 left-0 right-0 mx-auto w-5 h-0.5 bg-blue-400 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </ScrollLink>
          ))}
        </nav>

        {/* Resume Button - Outside pill */}
        <a
          href={resumePDF}
          download="Jackson Bryant Resume 2025.pdf"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600/90 hover:bg-blue-500/90 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
        >
          Resume
        </a>
      </motion.header>

      {/* ============================================ */}
      {/* MOBILE BOTTOM DOCK */}
      {/* ============================================ */}
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-center pb-4 pt-2 bg-gradient-to-t from-slate-950/80 to-transparent"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex justify-between items-center gap-2 px-5 py-2.5 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <ScrollLink
                key={item.label}
                to={item.id}
                smooth
                duration={600}
                offset={-80}
                className="relative flex flex-col items-center gap-0.5 px-2 py-1 cursor-pointer group"
              >
                <Icon
                  size={18}
                  className={`
                    transition-all duration-300
                    ${activeItem === item.id
                      ? "text-blue-400"
                      : "text-slate-400 group-hover:text-white"
                    }
                  `}
                />
                <span
                  className={`
                    text-[10px] font-medium transition-all duration-300
                    ${activeItem === item.id
                      ? "text-blue-400"
                      : "text-slate-400 group-hover:text-white"
                    }
                  `}
                >
                  {item.label}
                </span>

                {/* Active underline indicator */}
                {activeItem === item.id && (
                  <motion.span
                    layoutId="mobileActiveIndicator"
                    className="absolute -bottom-0.5 left-0 right-0 mx-auto w-4 h-0.5 bg-blue-400 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </ScrollLink>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
