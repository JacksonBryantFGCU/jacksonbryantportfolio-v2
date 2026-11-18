import { ABOUT, CORE_STACK } from "../constants";

const PORTRAIT_SRCSET =
  "/images/jackson-portrait-320.webp 320w, /images/jackson-portrait-640.webp 640w, /images/jackson-portrait-800.webp 800w";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page grid lg:grid-cols-12 gap-x-12 gap-y-16">
        {/* Portrait, framed like a capture from the scanner */}
        <figure className="lg:col-span-4" data-reveal>
          <div className="ticks max-w-xs">
            <img
              src="/images/jackson-portrait-640.webp"
              srcSet={PORTRAIT_SRCSET}
              sizes="(min-width: 1024px) 320px, 320px"
              width={800}
              height={1000}
              alt="Jackson Bryant"
              loading="lazy"
              decoding="async"
              className="block w-full h-auto rounded-media border border-line"
            />
          </div>
          <figcaption className="label mt-5 flex justify-between max-w-xs">
            <span>Fig. 01</span>
            <span>Jackson Bryant</span>
          </figcaption>
        </figure>

        <div className="lg:col-span-8">
          <p className="label flex items-center gap-3" data-reveal>
            <span className="text-scan">[01]</span>
            <span className="h-px w-10 bg-line" aria-hidden="true" />
            About
          </p>
          <h2 id="about-title" className="sr-only">
            About
          </h2>
          <p
            data-scrub-words
            className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.035em]"
          >
            {ABOUT.headline}
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-6">
            {ABOUT.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} data-reveal className="text-base md:text-lg leading-relaxed text-muted">
                {text}
              </p>
            ))}
          </div>

          <div className="mt-16" data-reveal>
            <h3 className="label">Core stack</h3>
            <dl className="mt-4 border-t border-line">
              {Object.entries(CORE_STACK).map(([group, skills]) => (
                <div key={group} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted pt-1">{group}</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-1">
                    {skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
