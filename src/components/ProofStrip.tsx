import { PROOF_POINTS } from "../constants";

// Short, verifiable wins right under the hero. Values are plain text in the HTML.
export default function ProofStrip() {
  return (
    <section aria-label="Highlights" className="pb-24 md:pb-32">
      <div className="container-page">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t border-line pt-10">
          {PROOF_POINTS.map((point) => (
            <div key={point.label} className="flex flex-col">
              <dt className="order-last mt-2 text-sm leading-snug text-muted">
                {point.label}
              </dt>
              <dd className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
                {point.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
