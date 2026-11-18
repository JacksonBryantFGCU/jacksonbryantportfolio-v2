import { PROOF_POINTS } from "../constants";

// Short, verifiable wins right under the hero. Values are plain text in the HTML.
export default function ProofStrip() {
  return (
    <section aria-label="Highlights" className="border-y border-line bg-ink/60 backdrop-blur-sm">
      <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
        {PROOF_POINTS.map((point, i) => (
          <div
            key={point.label}
            data-reveal
            className={`flex flex-col py-8 md:py-10 before:mb-5 before:h-px before:w-6 before:bg-scan before:content-[''] ${i % 2 === 1 ? "pl-6 border-l border-line" : ""} ${
              i > 0 ? "lg:pl-8 lg:border-l lg:border-line" : ""
            } ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <dt className="order-last mt-2 text-sm leading-snug text-muted">{point.label}</dt>
            <dd className="font-display text-3xl md:text-4xl font-semibold tracking-tight">{point.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
