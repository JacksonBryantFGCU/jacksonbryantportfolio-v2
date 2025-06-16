// src/pages/Experience.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useExperiences } from "../hooks/useExperiences";

export default function Experience() {
  const { data: experiences = [], isLoading, isError } = useExperiences();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && experiences.length > 0) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".exp-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
        }
      );
    }
  }, [experiences]);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="bg-background-dark px-6 py-20 border-b border-border min-h-screen text-white scroll-mt-32"
    >
      <h2 className="bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-secondary mb-16 font-bold text-transparent text-4xl text-center">
        Experience
      </h2>

      {isLoading && (
        <p className="text-center text-text-muted text-lg">Loading experiences...</p>
      )}

      {isError && (
        <p className="text-center text-red-500 text-lg">Failed to load experiences.</p>
      )}

      {!isLoading && !isError && experiences.length === 0 && (
        <p className="text-center text-text-muted text-lg">No experiences found.</p>
      )}

      <div className="gap-10 grid mx-auto max-w-4xl">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-neutral-900 shadow p-6 border border-border rounded-2xl exp-card"
          >
            <h3 className="font-semibold text-primary text-xl">
              {exp.role} — <span className="text-white">{exp.company}</span>
            </h3>
            <p className="text-text-muted text-sm">
              {exp.duration} · {exp.location}
            </p>
            <ul className="space-y-2 mt-3 ml-5 text-text-muted text-base list-disc">
              {(Array.isArray(exp.details) ? exp.details : [])
                .filter((d) => typeof d === "string")
                .map((detail: string, i: number) => (
                  <li key={i}>{detail}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
