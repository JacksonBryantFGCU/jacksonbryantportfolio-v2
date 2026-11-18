// src/pages/Experience.tsx
import { AWARDS, EXPERIENCE_ENTRIES, type ExperienceEntry } from "../constants/index";
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
          index="03"
          title="Experience"
          intro="Research, tutoring, campus leadership and hackathons at Florida Gulf Coast University."
        />

        <div className="space-y-20">
          {GROUPS.map((group) => (
            <div key={group.title} className="grid md:grid-cols-12 gap-x-8 gap-y-8">
              <h3 className="md:col-span-3 label pt-1.5" data-reveal>
                {group.title}
              </h3>

              {/* Timeline: a faint rail, and a bright line that draws down it as you scroll */}
              <div data-timeline className="relative md:col-span-9">
                <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-line" />
                <span
                  aria-hidden="true"
                  data-timeline-progress
                  className="absolute -left-[0.5px] top-0 h-full w-[2px] origin-top bg-gradient-to-b from-scan via-scan to-accent shadow-[0_0_12px_rgba(110,231,249,0.55)]"
                />
                <ol>
                  {group.entries.map((entry, idx) => (
                    <li
                      key={entry.title}
                      data-reveal
                      className={`relative pl-8 md:pl-12 last:pb-0 ${entry.description ? "pb-14" : "pb-9"}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[4px] top-1.5 h-[9px] w-[9px] rotate-45 ring-4 ring-ink ${
                          idx === 0 ? "bg-scan" : "bg-line"
                        }`}
                      />
                      <p className="label">{entry.period}</p>
                      <h4 className="mt-2 font-display text-2xl md:text-3xl font-semibold tracking-tight">
                        {entry.title}
                      </h4>
                      <p className="mt-1 text-muted">{entry.organization}</p>
                      {entry.description && (
                        <p className="mt-4 max-w-2xl leading-relaxed text-text/90">{entry.description}</p>
                      )}
                      {entry.tags && entry.tags.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools">
                          {entry.tags.map((tag) => (
                            <li key={tag} className="chip">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}

          <div className="grid md:grid-cols-12 gap-x-8 gap-y-8">
            <h3 className="md:col-span-3 label pt-1.5" data-reveal>
              Awards
            </h3>
            <ul className="md:col-span-9 grid sm:grid-cols-3 gap-4">
              {AWARDS.map((award) => (
                <li key={award.event} data-reveal className="rounded-card border border-line bg-surface/60 p-6">
                  <p className="label">
                    <span className={award.place.startsWith("1st") ? "text-scan" : "text-accent-soft"}>{award.place}</span>
                    {" · "}
                    {award.date}
                  </p>
                  <p className="mt-3 font-display text-xl font-semibold tracking-tight leading-snug">{award.event}</p>
                  {award.detail && <p className="mt-2 text-sm text-muted">{award.detail}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
