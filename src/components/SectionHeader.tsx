interface Props {
  id: string;
  /** Two-digit section number, e.g. "02" */
  index: string;
  title: string;
  intro?: string;
}

// Numbered instrument label, a huge title that rises in on scroll, and an optional intro beside it
export default function SectionHeader({ id, index, title, intro }: Props) {
  return (
    <header className="mb-14 md:mb-24">
      <p className="label flex items-center gap-3" data-reveal>
        <span className="text-scan">[{index}]</span>
        <span className="h-px w-10 bg-line" aria-hidden="true" />
        {title}
      </p>
      <div className="mt-6 grid md:grid-cols-12 gap-x-8 gap-y-6 items-end">
        <h2 id={`${id}-title`} data-split className="md:col-span-12 font-display font-semibold text-mega">
          {title}
        </h2>
        {intro && (
          <p data-reveal className="md:col-span-5 md:col-start-8 text-muted text-base md:text-lg leading-relaxed">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
