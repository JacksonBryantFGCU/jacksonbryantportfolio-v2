// src/pages/Certifications.tsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CERTIFICATIONS } from "../constants";

export default function Certifications() {
  const [certifications] = useState(CERTIFICATIONS);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isLoading || certifications.length === 0) return;

    const ctx = gsap.context(() => {
      // Use a longer delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        const cards = sectionRef.current?.querySelectorAll(".cert-card");
        if (cards && cards.length > 0) {
          gsap.set(cards, { opacity: 0, y: 30 });
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, certifications]);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="px-6 py-24 border-b border-border text-white scroll-mt-48"
    >
      <h2 className="bg-clip-text text-white mb-12 font-bold text-transparent text-4xl text-center">
        Certifications
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        </div>
      ) : certifications.length === 0 ? (
        <p className="text-gray-400 text-lg text-center">No certifications found.</p>
      ) : (
        <div className="gap-10 grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-7xl">
          {certifications.map((cert, idx) => {
            const { id, name, issuer, issueDate, credentialUrl, image } = cert;

            return (
              <article
                key={`${name}-${issuer || id || idx}`}
                className="cert-card relative w-full p-[2px] rounded-xl overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <div className="relative flex flex-col gap-4 bg-[#15181F] rounded-xl p-8 h-full">
                  <header>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight">
                      {name || "Untitled Certification"}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">
                      {issuer} · {issueDate}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      {credentialUrl && typeof credentialUrl === "string" && (
                        <a
                          href={credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl bg-cyan-600 px-3 py-1 text-xs text-gray-300 font-medium hover:bg-cyan-900 hover:underline transition"
                          aria-label={`View certificate for ${name}`}
                        >
                          View Certificate
                        </a>
                      )}
                    </div>
                  </header>

                  {image && (
                    <div className="mt-2 w-full h-[350px] bg-gray-900/20 rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={image}
                        alt={`${name} certificate`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src = "/fallback-image.png";
                        }}
                        className="transition-transform duration-300 hover:scale-102 max-w-full max-h-full object-contain"
                        aria-label="Certificate Image"
                      />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
