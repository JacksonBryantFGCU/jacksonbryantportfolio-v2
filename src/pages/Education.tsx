// src/pages/Education.tsx
import { CERTIFICATIONS, EDUCATION } from "../constants";
import SectionHeader from "../components/SectionHeader";

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <div className="container-page">
        <SectionHeader id="education" index="04" title="Education" />

        <div className="space-y-16">
          {/* Degree */}
          <div className="grid md:grid-cols-12 gap-x-8 gap-y-6">
            <h3 className="md:col-span-3 label pt-1.5" data-reveal>Degree</h3>
            <div className="md:col-span-9" data-reveal>
              <p className="font-display text-3xl md:text-5xl font-semibold tracking-[-0.03em]">{EDUCATION.degree}</p>
              <p className="mt-1 text-muted">{EDUCATION.school}</p>
              <p className="mt-4">Graduating {EDUCATION.graduation}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Relevant courses: {EDUCATION.courses.join(", ")}
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="grid md:grid-cols-12 gap-x-8 gap-y-6">
            <h3 className="md:col-span-3 label pt-1.5" data-reveal>Certifications</h3>
            <ul className="md:col-span-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {CERTIFICATIONS.map((cert) => {
                const { id, name, issuer, issueDate, credentialUrl, credentialId, image, imageSize } = cert;
                const [fullWidth, fullHeight] = imageSize;

                return (
                  <li key={id} className="flex flex-col" data-reveal>
                    {/* Certificates differ in shape; each fits inside the same 3:2 frame so the row lines up */}
                    <a
                      href={`${image}-1200.webp`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-tilt
                      className="block aspect-[3/2] overflow-hidden rounded-media border border-line bg-surface transition-colors duration-200 hover:border-scan/60"
                      aria-label={`Open the full ${name} certificate`}
                    >
                      <img
                        src={`${image}-600.webp`}
                        srcSet={`${image}-600.webp 600w, ${image}-1200.webp ${fullWidth}w`}
                        sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, calc(100vw - 48px)"
                        width={fullWidth}
                        height={fullHeight}
                        alt={`${name} certificate`}
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full object-contain"
                      />
                    </a>
                    <p className="mt-4 font-medium leading-snug">{name}</p>
                    <p className="label mt-2">
                      {issuer} · {issueDate}
                    </p>
                    <div className="mt-2 text-sm">
                      {credentialUrl ? (
                        <a
                          href={credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link"
                          aria-label={`Verify certificate: ${name}`}
                        >
                          Verify certificate
                        </a>
                      ) : (
                        credentialId && <span className="text-muted">Certificate ID {credentialId}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
