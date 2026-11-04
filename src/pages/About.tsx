import { ABOUT, CORE_STACK } from "../constants";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page grid lg:grid-cols-12 gap-x-8 gap-y-16">
        <div className="lg:col-span-7">
          <h2 id="about-title" className="sr-only">
            About
          </h2>
          <p className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] tracking-[-0.03em]">
            {ABOUT.headline}
          </p>
          {ABOUT.paragraphs.map((text) => (
            <p key={text.slice(0, 24)} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {text}
            </p>
          ))}
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <h3 className="font-display text-lg font-semibold">Core stack</h3>
          <dl className="mt-4 border-t border-line">
            {Object.entries(CORE_STACK).map(([group, skills]) => (
              <div key={group} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-line py-3.5">
                <dt className="text-sm text-muted">{group}</dt>
                <dd className="text-sm leading-relaxed">{skills.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
