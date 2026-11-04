import { PROOF_POINTS } from "../constants";

// Short, verifiable wins shown right under the hero. Values are plain text in the
// HTML (no count-up), so they are never shown as zero.
export default function ProofStrip() {
  return (
    <section aria-label="Highlights" className="px-6 sm:px-16 pb-16 md:pb-24 text-white">
      <dl className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 border-y border-white/10 divide-white/10 lg:divide-x">
        {PROOF_POINTS.map((point, idx) => (
          <div
            key={point.label}
            className={`py-6 lg:py-8 px-2 lg:px-8 first:lg:pl-0 ${idx < 2 ? "border-b border-white/10 lg:border-b-0" : ""} ${idx % 2 === 0 ? "pr-4" : "pl-4 border-l border-white/10 lg:border-l-0"}`}
          >
            <dt className="sr-only">{point.label}</dt>
            <dd className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{point.value}</dd>
            <dd className="mt-2 text-sm text-slate-400 leading-snug">{point.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
