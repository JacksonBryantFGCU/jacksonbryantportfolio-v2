// src/pages/Certifications.tsx
import { CERTIFICATIONS } from "../constants";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="px-6 py-24 border-b border-border text-white scroll-mt-48"
    >
      <h2 className="text-white mb-12 font-bold text-4xl text-center">
        Certifications
      </h2>

      {CERTIFICATIONS.length === 0 ? (
        <p className="text-gray-400 text-lg text-center">No certifications found.</p>
      ) : (
        <div className="gap-10 grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-7xl">
          {CERTIFICATIONS.map((cert, idx) => {
            const { id, name, issuer, issueDate, credentialUrl, image } = cert;

            return (
              <article
                key={`${name}-${issuer || id || idx}`}
                className="cert-card relative w-full p-[2px] rounded-xl overflow-hidden gradient-border hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
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
                          className="rounded-xl btn-cyan px-3 py-1 text-xs text-gray-300 font-medium hover:underline transition"
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
