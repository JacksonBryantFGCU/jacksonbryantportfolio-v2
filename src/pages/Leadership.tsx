// src/pages/Leadership.tsx
import { LEADERSHIP } from "../constants/index";
import { Users } from "lucide-react";

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="text-white px-6 pt-20 pb-16 scroll-mt-32 border-b border-neutral-800"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Leadership
        </h2>

        {LEADERSHIP.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No leadership roles found.</p>
          </div>
        ) : (
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
                      <h3 className="text-lg font-semibold text-white">
                        {item.role}
                      </h3>
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
        )}
      </div>
    </section>
  );
}
