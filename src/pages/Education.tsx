// src/pages/Education.tsx
import { m } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { CERTIFICATIONS, EDUCATION } from "../constants";

export default function Education() {
  return (
    <section id="education" className="px-6 sm:px-16 py-20 md:py-24 border-t border-neutral-800 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight text-center mb-12">
          Education
        </h2>

        {/* Degree */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4"
        >
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">{EDUCATION.degree}</h3>
            <p className="mt-1 text-slate-300">{EDUCATION.school}</p>
            <p className="mt-4 text-sm text-slate-400">
              <span className="text-slate-500">Relevant courses: </span>
              {EDUCATION.courses.join(" · ")}
            </p>
          </div>
          <p className="shrink-0 text-sm text-slate-300 md:text-right">
            <span className="block text-slate-500">Graduation</span>
            {EDUCATION.graduation}
          </p>
        </m.div>

        {/* Certifications */}
        <h3 className="mt-16 mb-6 text-xl font-semibold text-slate-200">Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => {
            const { id, name, issuer, issueDate, credentialUrl, credentialId, image, imageSize } = cert;
            const [fullWidth, fullHeight] = imageSize;

            return (
              <m.article
                key={id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group flex flex-col bg-white/5 border border-white/10 rounded-xl p-5 transition-colors duration-200 hover:border-white/20"
              >
                {/* Certificate image - opens the full size */}
                <a
                  href={`${image}-1200.webp`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-md bg-slate-900/50 border border-white/10"
                  aria-label={`Open full ${name} certificate image`}
                >
                  <img
                    src={`${image}-600.webp`}
                    srcSet={`${image}-600.webp 600w, ${image}-1200.webp ${fullWidth}w`}
                    sizes="(min-width: 1024px) 340px, (min-width: 768px) 45vw, calc(100vw - 88px)"
                    width={fullWidth}
                    height={fullHeight}
                    alt={`${name} certificate`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                  />
                </a>

                <h4 className="mt-4 text-lg font-semibold leading-tight">{name}</h4>
                <p className="mt-1 text-slate-400 text-sm">
                  {issuer} · {issueDate}
                </p>

                <div className="mt-auto pt-4">
                  {credentialUrl ? (
                    <a
                      href={credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300"
                      aria-label={`Verify ${name} certificate`}
                    >
                      Verify certificate <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  ) : (
                    credentialId && (
                      <p className="text-slate-400 text-sm">
                        Certificate ID <span className="font-mono text-slate-300">{credentialId}</span>
                      </p>
                    )
                  )}
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
