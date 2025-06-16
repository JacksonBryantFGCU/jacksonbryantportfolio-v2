import { useEffect, useRef, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import logo from "../../assets/Jb (2).png";

const navItems = [
  "Home",
  "About",
  "Technologies",
  "Projects",
  "Certifications",
  "Experiences",
  "Contact",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleAdminClick = () => {
    if (isSignedIn) {
      navigate("/admin");
    } else {
      navigate("/sign-in");
    }
  };

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
        <img src={logo} alt="logo" className="w-16 h-16 object-contain" />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-lg">
          {navItems.map((item) => (
            <li key={item}>
              <ScrollLink
                to={item.toLowerCase()}
                smooth
                duration={600}
                offset={-100}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                {item}
              </ScrollLink>
            </li>
          ))}
          <li>
            <button
              onClick={handleAdminClick}
              className="hover:bg-blue-400 px-4 py-1 border border-blue-400 rounded text-blue-400 hover:text-white transition-colors"
            >
              Admin
            </button>
          </li>
        </ul>

        {/* Mobile Toggle */}
        {!isOpen && (
          <button
            onClick={toggleMenu}
            className="md:hidden z-[100] text-white"
            aria-label="Open menu"
            title="Open menu"
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
          >
            <X size={32} />
          </button>

          {navItems.map((item) => (
            <ScrollLink
              key={item}
              to={item.toLowerCase()}
              smooth
              duration={600}
              offset={-100}
              onClick={toggleMenu}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              {item}
            </ScrollLink>
          ))}

          <button
            onClick={() => {
              toggleMenu();
              handleAdminClick();
            }}
            className="hover:bg-blue-400 px-4 py-2 border border-blue-400 rounded text-blue-400 hover:text-white text-lg transition"
          >
            Admin
          </button>
        </div>
      )}
    </header>
  );
}