import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Resume() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <section className="bg-background-light dark:bg-background-dark px-6 py-20 min-h-screen text-white">
      <div ref={sectionRef} className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6 font-bold text-primary dark:text-white text-4xl">Resume</h2>
        <p className="mb-6 text-text-muted dark:text-gray-400 text-lg">
          Download a copy of my most up-to-date resume or browse key experience highlights below.
        </p>
        <a
          href="/resume.pdf"
          download
          className="inline-block bg-primary hover:bg-primary-dark px-6 py-3 rounded-xl font-semibold text-white transition"
        >
          Download Resume
        </a>

        {/* Optional: Inject dynamic resume content from PocketBase below */}
        <div className="space-y-4 mt-12 text-left">
          <h3 className="font-bold text-white text-2xl">Experience</h3>
          <ul className="ml-6 text-text-muted dark:text-gray-400 list-disc">
            <li>Math Tutor — FGCU (2024–Present)</li>
            <li>React Developer — Freelance Projects</li>
            {/* Add mapped PocketBase data here later */}
          </ul>
        </div>
      </div>
    </section>
  );
}