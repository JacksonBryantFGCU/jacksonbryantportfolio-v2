import { m } from "framer-motion";
import { ABOUT, CORE_STACK } from "../constants";

export default function About() {
  return (
    <section id="about" className="px-6 sm:px-16 py-20 md:py-24 border-t border-neutral-800 text-white">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-5 gap-12 lg:gap-16">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">About</h2>
          <p className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
            {ABOUT.headline}
          </p>
          {ABOUT.paragraphs.map((text) => (
            <p key={text.slice(0, 24)} className="mt-5 text-slate-300 text-base md:text-lg leading-relaxed">
              {text}
            </p>
          ))}
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <h3 className="text-sm font-medium uppercase tracking-widest text-slate-500">Core stack</h3>
          <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {Object.entries(CORE_STACK).map(([group, skills]) => (
              <div key={group} className="py-4 grid grid-cols-[6.5rem_1fr] gap-3 items-baseline">
                <dt className="text-sm text-slate-400">{group}</dt>
                <dd className="text-sm text-slate-200 leading-relaxed">{skills.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </m.div>
      </div>
    </section>
  );
}
