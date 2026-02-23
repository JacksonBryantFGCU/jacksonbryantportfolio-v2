// src/pages/Experience.tsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import { EXPERIENCE_ENTRIES, ExperienceEntry } from "../constants/index";

// Format date display
const formatDateRange = (startYear: number, endYear: number | null): string => {
  const end = endYear === null ? "Present" : endYear.toString();
  return `${startYear} – ${end}`;
};

export default function Experience() {
  // Sort entries: by startYear (desc), then work before leadership if same year
  const sortedEntries = useMemo<ExperienceEntry[]>(() => {
    return [...EXPERIENCE_ENTRIES].sort((a, b) => {
      // Sort by startYear descending
      if (b.startYear !== a.startYear) {
        return b.startYear - a.startYear;
      }
      // If same year, work comes before leadership
      if (a.type === "work" && b.type === "leadership") return -1;
      if (a.type === "leadership" && b.type === "work") return 1;
      return 0;
    });
  }, []);

  return (
    <section
      id="experience"
      className="text-white px-6 py-24 border-b border-neutral-800 scroll-mt-32"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Experience & Leadership
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Professional Work, Research & Campus Impact
          </p>
        </motion.div>

        {/* Entry Cards */}
        {sortedEntries.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No entries found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedEntries.map((entry, index) => {
              const displayedTags = entry.tags?.slice(0, 3) || [];
              const isWork = entry.type === "work";

              return (
                <motion.article
                  key={`${entry.title}-${index}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 transition-all duration-300 hover:bg-white/[0.07]"
                >
                  {/* Type Badge */}
                  <span
                    className={`inline-block text-xs font-medium uppercase tracking-wide px-2 py-0.5 rounded-full mb-3 ${
                      isWork
                        ? "bg-blue-500/10 text-blue-400 border border-blue-400/20"
                        : "bg-purple-500/10 text-purple-400 border border-purple-400/20"
                    }`}
                  >
                    {isWork ? "Work" : "Leadership"}
                  </span>

                  {/* Date */}
                  <p className="text-sm text-slate-400 tracking-wide mb-2">
                    {formatDateRange(entry.startYear, entry.endYear)}
                  </p>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
                    {entry.title}
                  </h3>

                  {/* Organization */}
                  <p className="text-slate-400 text-sm mb-4">
                    {entry.organization}
                  </p>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {entry.description}
                  </p>

                  {/* Tags */}
                  {displayedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {displayedTags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
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
