import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <section className="bg-background-light dark:bg-background-dark px-6 py-20 min-h-screen text-white">
      <div ref={containerRef} className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 font-bold text-primary dark:text-white text-4xl">About Me</h2>
        <p className="text-text-muted dark:text-gray-400 text-lg leading-relaxed">
          I'm Jackson Bryant, a software engineering student at Florida Gulf Coast University.
          I specialize in building modern, scalable front-end applications using React and TypeScript.
          I enjoy solving real-world problems through clean code, smooth UI/UX, and continuous learning.
        </p>
        <p className="mt-6 text-text-muted dark:text-gray-400">
          Outside of coding, I tutor university-level mathematics, explore new technologies, and
          work on side projects that combine automation, design, and AI-driven features.
        </p>
      </div>
    </section>
  );
}