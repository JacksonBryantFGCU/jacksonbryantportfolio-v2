// src/pages/Navbar.tsx
import { useEffect, useRef, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import logo from "/assets/Jb (2).webp";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Technologies", id: "tech" }, // Update this ID if needed
  { label: "Projects", id: "projects" },
  { label: "Certifications", id: "certifications" },
  { label: "Experiences", id: "experiences" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState("home");

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Debug function to check what sections actually exist
  useEffect(() => {
    const checkSections = () => {
      console.log("=== SECTION DEBUG ===");
      navItems.forEach(item => {
        const element = document.getElementById(item.id);
        console.log(`${item.label} (looking for id="${item.id}"):`, element ? "✅ FOUND" : "❌ NOT FOUND");
        if (!element) {
          // Try to find what IDs actually exist that might match
          const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
          const possibleMatches = allIds.filter(id => 
            id.toLowerCase().includes(item.label.toLowerCase().substring(0, 4))
          );
          if (possibleMatches.length > 0) {
            console.log(`  Possible matches for ${item.label}:`, possibleMatches);
          }
        }
      });
      console.log("=== END DEBUG ===");
    };

    // Run debug after a short delay to ensure DOM is loaded
    setTimeout(checkSections, 1000);
  }, []);

  // Simple scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      const sections = navItems
        .map(item => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          
          return {
            name: item.id,
            offsetTop: element.offsetTop,
            offsetBottom: element.offsetTop + Math.max(element.offsetHeight, 100) // Ensure minimum height for detection
          };
        })
        .filter(Boolean)
        .sort((a, b) => a!.offsetTop - b!.offsetTop);

      if (sections.length === 0) return;

      // Find which section we're currently in
      let currentSection = sections[0]!.name;
      
      for (const section of sections) {
        if (scrollPosition >= section!.offsetTop && scrollPosition < section!.offsetBottom) {
          currentSection = section!.name;
          break;
        }
        // If we've passed this section's bottom, it could still be the active one
        if (scrollPosition >= section!.offsetTop) {
          currentSection = section!.name;
        }
      }

      // Special case: if we're near the bottom of the page, activate contact
      const isNearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100);
      if (isNearBottom) {
        currentSection = "contact";
      }

      setActiveItem(currentSection);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { x: "100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  return (
    <header className="top-0 z-50 fixed bg-background-dark border-b border-border w-full text-white">
      <nav className="flex justify-between items-center px-6 py-4 h-24">
        {/* Logo */}
        <img 
          src={logo} 
          alt="Jackson Bryant's portfolio logo" 
          className="object-contain" 
          loading="eager" 
          fetchPriority="high" 
          width="64" 
          height="64"
        />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium text-xl">
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <ScrollLink
                to={item.id}
                smooth
                duration={600}
                offset={-100}
                className={`hover:text-blue-400 transition-colors cursor-pointer ${
                  activeItem === item.id ? "text-blue-400" : ""
                }`}
                title={`Maps to ${item.label} section`}
              >
                {item.label}
              </ScrollLink>
            </li>
          ))}
        </ul>
        </div>

        {/* Mobile Toggle */}
        {!isOpen && (
          <button
            onClick={toggleMenu}
            className="md:hidden z-[100] text-white"
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <Menu size={28} />
          </button>
        )}
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          ref={menuRef}
          className="z-40 fixed inset-0 flex flex-col justify-center items-center gap-10 bg-background-dark text-white text-3xl"
        >
          <button
            onClick={toggleMenu}
            className="top-6 right-6 absolute text-white"
            aria-label="Close menu"
            aria-expanded={isOpen}
          >
            <X size={32} />
          </button>
          {navItems.map((item) => (
            <ScrollLink
              key={item.label}
              to={item.id}
              smooth
              duration={600}
              offset={-100}
              onClick={toggleMenu}
              className={`hover:text-blue-400 transition-colors cursor-pointer ${
                activeItem === item.id ? "text-blue-400" : ""
              }`}
              title={`Maps to ${item.label} section`}
            >
              {item.label}
            </ScrollLink>
          ))}
        </div>
      )}
    </header>
  );
}
