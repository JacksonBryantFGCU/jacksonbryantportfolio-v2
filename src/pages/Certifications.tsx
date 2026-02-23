// src/pages/Certifications.tsx
import { motion } from "framer-motion";
import { CERTIFICATIONS } from "../constants";
import { ExternalLink } from "lucide-react";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="px-6 py-24 border-b border-neutral-800 text-white scroll-mt-48"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Certifications
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Professional Development & Credentials
          </p>
        </motion.div>

        {CERTIFICATIONS.length === 0 ? (
          <p className="text-slate-400 text-lg text-center">No certifications found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {CERTIFICATIONS.map((cert, idx) => {
              const { id, name, issuer, issueDate, credentialUrl, image } = cert;

              return (
                <motion.article
                  key={`${name}-${issuer || id || idx}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 transition-all duration-300 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-blue-500/5 hover:scale-[1.01]"
                >
                  {/* Metadata Block */}
                  <div className="space-y-1 mb-4">
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-semibold text-white leading-tight">
                      {name || "Untitled Certification"}
                    </h3>

                    {/* Issuer */}
                    <p className="text-slate-400 text-sm">
                      {issuer}
                    </p>

                    {/* Date */}
                    <p className="text-slate-500 text-sm">
                      {issueDate}
                    </p>
                  </div>

                  {/* View Certificate Button */}
                  {credentialUrl && typeof credentialUrl === "string" && (
                    <a
                      href={credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex md:inline-flex items-center justify-center gap-1.5 bg-white/5 border border-white/10 text-slate-300 text-sm px-4 py-2 md:py-1.5 rounded-full w-full md:w-auto hover:bg-white/10 hover:text-white active:scale-[0.98] transition-all duration-200"
                      aria-label={`View certificate for ${name}`}
                    >
                      View Certificate <ExternalLink size={12} />
                    </a>
                  )}

                  {/* Certificate Image */}
                  {image && (
                    <div className="mt-4 w-full">
                      <div className="w-full overflow-hidden rounded-md md:rounded-lg bg-slate-900/50">
                        <img
                          src={image}
                          alt={`${name} certificate`}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.src = "/fallback-image.png";
                          }}
                          className="w-full h-auto object-cover grayscale-[30%] group-hover:grayscale-0 active:scale-[0.98] transition-all duration-300"
                        />
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
