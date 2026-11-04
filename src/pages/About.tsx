import { m } from "framer-motion";

const coreStack = {
  frontend: ["React", "TypeScript", "Tailwind"],
  backend: ["Node", "Express", "PostgreSQL"],
  tools: ["Git", "Vercel"],
};


export default function About() {
  return (
    <section
      id="about"
      className="px-6 sm:px-16 py-20 md:py-24 border-t border-neutral-800 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-white mb-5 lg:mb-6 font-bold text-4xl md:text-5xl tracking-tight">About Me</h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            I'm a software engineer who builds modern web applications, from the interface to the API behind it.
            I build performant, user-centered applications with clean, maintainable code.
            My work centers on creating intuitive interfaces and scalable architectures that solve real problems.
            Currently pursuing Software Engineering at Florida Gulf Coast University, I'm actively building projects and contributing to research initiatives.
          </p>
        </m.div>

        {/* Core Stack */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 lg:mt-16 bg-white/[0.03] border border-white/10 rounded-xl px-7 py-10 md:p-10 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-semibold text-slate-100 mb-8 md:mb-10 text-left">
            Core Stack
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {(Object.entries(coreStack) as [keyof typeof coreStack, string[]][]).map(([category, skills]) => (
              <div key={category} className="text-left">
                <h4 className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">
                  {category}
                </h4>
                <div className="flex flex-wrap justify-start gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-white/[0.07] border border-white/10 text-slate-300 text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
