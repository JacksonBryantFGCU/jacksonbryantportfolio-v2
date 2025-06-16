// src/pages/Certifications.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCertifications } from "../hooks/useCertifications";

export default function Certifications() {
  const { data: certifications = [], isLoading, isError } = useCertifications();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && certifications.length > 0) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".cert-card"),
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
  }, [certifications]);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="bg-background-dark px-6 py-20 border-b border-border min-h-screen text-white scroll-mt-32"
    >
      <h2 className="bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-secondary mb-16 font-bold text-transparent text-4xl text-center">
        Certifications
      </h2>

      {isLoading && (
        <p className="text-center text-text-muted text-lg">Loading certifications...</p>
      )}

      {isError && (
        <p className="text-center text-red-500 text-lg">Failed to load certifications.</p>
      )}

      {!isLoading && !isError && certifications.length === 0 && (
        <p className="text-center text-text-muted text-lg">No certifications found.</p>
      )}

      <div className="gap-10 grid mx-auto max-w-4xl">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-neutral-900 shadow p-6 border border-border rounded-2xl cert-card"
          >
            <h3 className="font-semibold text-primary text-xl">{cert.name}</h3>
            <p className="text-text-muted text-sm">
              {cert.issuer} · {cert.issueDate}
            </p>
            {cert.credentialUrl && typeof cert.credentialUrl === "string" && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-400 text-sm hover:underline"
              >
                View Certificate
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}