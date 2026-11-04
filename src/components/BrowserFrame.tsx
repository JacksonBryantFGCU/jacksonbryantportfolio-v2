import type { ReactNode } from "react";

interface Props {
  /** Live address; shown in the address bar with a green "live" dot */
  url?: string;
  /** Shown in the address bar when there's no live address */
  fallbackLabel: string;
  children: ReactNode;
}

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

// A minimal browser window around a screenshot, so shipped work reads as a real, live site
export default function BrowserFrame({ url, fallbackLabel, children }: Props) {
  return (
    <figure className="overflow-hidden rounded-media border border-line bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
      <figcaption className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </span>
        <span className="mx-auto flex min-w-0 items-center gap-2 rounded-full bg-ink/70 px-3 py-1 text-xs text-muted">
          {url && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-live" aria-hidden="true" />}
          <span className="truncate">{url ? hostOf(url) : fallbackLabel}</span>
          {url && <span className="sr-only">(live site)</span>}
        </span>
        <span className="w-[42px]" aria-hidden="true" />
      </figcaption>
      <div className="bg-white">{children}</div>
    </figure>
  );
}
