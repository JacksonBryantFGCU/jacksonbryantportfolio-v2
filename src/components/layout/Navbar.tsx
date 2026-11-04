import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { User, FolderOpen, Briefcase, GraduationCap, Mail, FileText } from "lucide-react";
import resumePDF from "/jackson-bryant-resume-fall-2026.pdf";

// Desktop nav items
const desktopNavItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

// Mobile dock items (the resume is added at the end as a highlighted action)
const mobileNavItems = [
  { label: "About", id: "about", icon: User },
  { label: "Projects", id: "projects", icon: FolderOpen },
  { label: "Experience", id: "experience", icon: Briefcase },
  { label: "Education", id: "education", icon: GraduationCap },
  { label: "Contact", id: "contact", icon: Mail },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 20);

      // In the hero until the first section approaches the top
      const firstSection = document.getElementById(desktopNavItems[0].id);
      if (firstSection && firstSection.getBoundingClientRect().top > 250) {
        setActiveItem("home");
        return;
      }

      // Near the bottom of the page = Contact
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setActiveItem("contact");
        return;
      }

      // Last section whose top has passed the threshold
      let current = desktopNavItems[0].id;
      for (const item of desktopNavItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 200) current = item.id;
      }
      setActiveItem(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* ============================================ */}
      {/* DESKTOP NAVIGATION */}
      {/* ============================================ */}
      <m.header
        initial={false}
        className="fixed top-6 inset-x-0 z-50 hidden md:flex justify-center items-center gap-5"
      >
        {/* Navigation Pill */}
        <nav
          aria-label="Main"
          className={`
            flex items-center gap-8 px-6 rounded-full border shadow-lg
            transition-all duration-300
            ${isScrolled ? "py-2 bg-ink/75 border-line backdrop-blur-xl" : "py-2.5 bg-ink/40 border-line/60 backdrop-blur-lg"}
          `}
        >
          {/* Logo - back to top */}
          <a
            href="#home"
            className="flex items-center hover:opacity-80 transition-opacity duration-300"
            aria-label="Back to top"
          >
            <img
              src="/images/logo-64.webp"
              alt=""
              width={28}
              height={28}
              className="h-7 w-auto"
            />
          </a>

          {desktopNavItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <a
                key={item.label}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className="relative group flex flex-col items-center"
              >
                <span
                  className={`
                    text-[15px] transition-colors duration-200 inline-block
                    ${isActive ? "text-text" : "text-muted group-hover:text-text"}
                  `}
                >
                  {item.label}
                </span>

                {/* Active underline indicator */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 right-0 mx-auto w-5 h-0.5 bg-accent rounded-full transition-all duration-300 ${
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Resume Button - Outside pill */}
        <a
          href={resumePDF}
          download="Jackson Bryant Resume Fall 2026.pdf"
          className="btn-primary px-4 py-2"
        >
          Resume
        </a>
      </m.header>

      {/* ============================================ */}
      {/* MOBILE BOTTOM DOCK */}
      {/* ============================================ */}
      <nav
        aria-label="Main"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-center pb-4 pt-2"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex justify-between items-center gap-1 pl-3 pr-1.5 py-1.5 bg-ink/75 backdrop-blur-xl border border-line rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const color = isActive ? "text-text" : "text-muted group-hover:text-text";

            return (
              <a
                key={item.label}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className="relative flex flex-col items-center gap-0.5 px-1.5 py-1 group"
              >
                <Icon size={18} aria-hidden="true" className={`transition-all duration-300 ${color}`} />
                <span className={`text-[10px] font-medium transition-all duration-300 ${color}`}>
                  {item.label}
                </span>

                {/* Active underline indicator */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 right-0 mx-auto w-4 h-0.5 bg-accent rounded-full transition-all duration-300 ${
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                />
              </a>
            );
          })}

          {/* Resume: always one tap away */}
          <a
            href={resumePDF}
            download="Jackson Bryant Resume Fall 2026.pdf"
            className="ml-1 flex flex-col items-center gap-0.5 rounded-full bg-accent px-3.5 py-2 text-white"
          >
            <FileText size={18} aria-hidden="true" />
            <span className="text-[10px] font-medium">Resume</span>
          </a>
        </div>
      </nav>
    </>
  );
}
