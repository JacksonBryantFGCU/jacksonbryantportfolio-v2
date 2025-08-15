import { useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import gsap from "gsap";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".contact-icon",
        { scale: 0.8 },
        {
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
          stagger: 0.2,
          delay: 0.5,
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <section id="contact" className="z-0 relative px-6 pb-12 pt-8 md:pt-0 scroll-mt-32">
      <div ref={sectionRef} className="z-10 relative px-4 sm:px-8 text-white">
        <h3 className="bg-clip-text text-white font-semibold text-transparent text-3xl sm:text-4xl text-center">
          Jackson Bryant
        </h3>

        <p className="mx-auto mt-8 max-w-xl text-neutral-300 text-sm sm:text-base text-center">
          Let’s build something amazing together. I’m open to freelance work and software engineering internships.
        </p>

        <p className="mx-auto mt-4 max-w-xl text-neutral-400 text-sm sm:text-base text-center">
          Feel free to reach out if you’re looking for a reliable, driven developer.
        </p>

        <div className="flex justify-center gap-6 mt-8 text-2xl">
          <a
            href="https://www.linkedin.com/in/jacksonbryant-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-blue-400 transition-colors contact-icon"
            aria-label="Visit my Linkedin Profile"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/JacksonBryantFGCU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-blue-400 transition-colors contact-icon"
            aria-label="Visit my GitHub Profile"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:jacksonbryant.dev@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-blue-400 transition-colors contact-icon"
            aria-label="Email Jackson Bryant"
          >
            <FaEnvelope />
          </a>
        </div>

        <p className="mt-8 text-neutral-500 text-sm text-center">
          © 2025 Jackson Bryant. All rights reserved.
        </p>
      </div>
    </section>
  );
}

