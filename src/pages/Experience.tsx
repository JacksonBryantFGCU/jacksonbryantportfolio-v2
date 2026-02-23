// src/pages/Experience.tsx
import { EXPERIENCES, LEADERSHIP } from "../constants/index";
import { Users } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="text-white px-6 pt-20 pb-16 scroll-mt-32"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          Experience
        </h2>
        <p className="text-center text-gray-400 mb-16">& Campus Involvement</p>

        {/* Work Experience Timeline */}
        {EXPERIENCES.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No experiences found.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line md:-translate-x-1/2"></div>

            {EXPERIENCES.map((exp, index) => {
              const { role, company, year, description, skills } = exp;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative mb-12 w-full pl-16 md:pl-0 ${isEven ? "md:pr-[50%]" : "md:pl-[50%]"}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 top-1 w-4 h-4 rounded-full timeline-dot border-2 -translate-x-1/2"></div>

                  <div className={`${isEven ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                    <span className="text-sm font-medium text-accent-cyan-light">{year}</span>
                    <h3 className="text-xl font-semibold text-white mt-1 mb-1">
                      {role}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">{company}</p>

                    <p className="text-gray-400 mb-4 text-sm leading-relaxed break-words">
                      {description}
                    </p>

                    {skills && skills.length > 0 && (
                      <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        {skills.map((skill: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium skill-badge border rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Campus Involvement Section */}
        {LEADERSHIP.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-800">
            <h3 className="text-2xl font-semibold text-white mb-10 text-center">
              Campus Involvement
            </h3>

            <div className="grid gap-6">
              {LEADERSHIP.map((item, index) => (
                <article
                  key={index}
                  className="relative p-[1px] rounded-xl overflow-hidden gradient-border"
                >
                  <div className="flex gap-4 bg-neutral-900 rounded-xl p-6">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      <Users size={20} className="text-cyan-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <h4 className="text-lg font-semibold text-white">
                          {item.role}
                        </h4>
                        <span className="text-sm text-gray-400">
                          {item.organization}
                        </span>
                      </div>

                      <span className="inline-block text-xs font-medium text-cyan-400 mb-3">
                        {item.year}
                      </span>

                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
