// src/pages/Experience.tsx
import { EXPERIENCE_ENTRIES, type ExperienceEntry } from "../constants/index";
import SectionHeader from "../components/SectionHeader";

const newestFirst = (a: ExperienceEntry, b: ExperienceEntry) => b.sortDate.localeCompare(a.sortDate);

const GROUPS: { title: string; entries: ExperienceEntry[] }[] = [
  { title: "Work and research", entries: EXPERIENCE_ENTRIES.filter((e) => e.type === "work").sort(newestFirst) },
  { title: "Leadership", entries: EXPERIENCE_ENTRIES.filter((e) => e.type === "leadership").sort(newestFirst) },
];

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-page">
        <SectionHeader
          id="experience"
          title="Experience"
          intro="Research, tutoring and campus leadership at Florida Gulf Coast University."
        />

        <div className="space-y-16">
          {GROUPS.map((group) => (
            <div key={group.title} className="grid md:grid-cols-12 gap-x-8 gap-y-6">
              <h3 className="md:col-span-3 font-display text-lg font-semibold">{group.title}</h3>

              {/* Timeline: a vertical line with a marker per role */}
              <ol className="md:col-span-9 relative border-l border-line">
                {group.entries.map((entry, idx) => (
                  <li key={entry.title} className="relative pl-8 pb-12 last:pb-0">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-ink ${
                        idx === 0 ? "bg-accent" : "bg-line"
                      }`}
                    />
                    <p className="text-sm text-muted">{entry.period}</p>
                    <h4 className="mt-1 font-display text-xl md:text-2xl font-semibold tracking-tight">{entry.title}</h4>
                    <p className="mt-0.5 text-muted">{entry.organization}</p>
                    <p className="mt-3 max-w-2xl leading-relaxed">{entry.description}</p>
                    {entry.tags && entry.tags.length > 0 && (
                      <p className="mt-3 text-sm text-muted">{entry.tags.join(", ")}</p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
