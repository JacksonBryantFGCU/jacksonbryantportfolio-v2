// src/pages/Certifications.tsx
import { m } from "framer-motion";
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
        <m.div
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
        </m.div>

        {CERTIFICATIONS.length === 0 ? (
          <p className="text-slate-400 text-lg text-center">No certifications found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {CERTIFICATIONS.map((cert, idx) => {
              const { id, name, issuer, issueDate, credentialUrl, credentialId, image, imageSize } = cert;
              const [fullWidth, fullHeight] = imageSize;

              return (
                <m.article
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

                  {/* Certificate ID when there is no public verification link */}
                  {!credentialUrl && credentialId && (
                    <p className="text-slate-400 text-sm">
                      Certificate ID <span className="font-mono text-slate-300">{credentialId}</span>
                    </p>
                  )}

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

                  {/* Certificate thumbnail - opens the full image */}
                  {image && (
                    <a
                      href={`${image}-1200.webp`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block w-full overflow-hidden rounded-md md:rounded-lg bg-slate-900/50 border border-white/10"
                      aria-label={`Open full ${name} certificate image`}
                    >
                      <img
                        src={`${image}-600.webp`}
                        srcSet={`${image}-600.webp 600w, ${image}-1200.webp ${fullWidth}w`}
                        sizes="(min-width: 1024px) 460px, (min-width: 768px) 45vw, calc(100vw - 88px)"
                        width={fullWidth}
                        height={fullHeight}
                        alt={`${name} certificate`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto grayscale-[30%] group-hover:grayscale-0 transition-all duration-300"
                      />
                    </a>
                  )}
                </m.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
