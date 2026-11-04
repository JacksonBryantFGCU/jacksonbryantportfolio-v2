interface Props {
  id: string;
  title: string;
  intro?: string;
}

// Left-aligned section title with an optional one-line intro beside it on desktop
export default function SectionHeader({ id, title, intro }: Props) {
  return (
    <header className="grid md:grid-cols-12 gap-x-8 gap-y-4 items-end mb-14 md:mb-20">
      <h2 id={`${id}-title`} className="md:col-span-6 font-display font-semibold text-4xl md:text-6xl tracking-[-0.03em] leading-none">
        {title}
      </h2>
      {intro && <p className="md:col-span-5 md:col-start-8 text-muted text-base md:text-lg leading-relaxed">{intro}</p>}
    </header>
  );
}
