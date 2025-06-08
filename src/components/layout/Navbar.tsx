import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="top-0 z-50 fixed bg-background-dark border-b border-border w-full text-white">
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="font-bold text-primary text-xl">Jackson Bryant</div>

        {/* Mobile menu toggle */}
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 font-medium">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={clsx(
                  "hover:text-primary transition-colors",
                  location.pathname === link.to && "text-primary"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile drawer */}
      <div
        className={clsx(
          "md:hidden top-0 right-0 z-40 fixed bg-background-dark shadow-lg p-6 w-64 h-full transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={toggleMenu}
          className="mb-6"
          type="button"
          aria-label="Close menu"
          title="Close menu"
        >
          <X size={28} />
        </button>
        <ul className="flex flex-col gap-6 font-medium text-lg">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={toggleMenu}
                className={clsx(
                  "hover:text-primary transition-colors",
                  location.pathname === link.to && "text-primary"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}