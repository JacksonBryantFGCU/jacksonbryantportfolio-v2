import type { Project } from "../constants";
import BrowserFrame from "./BrowserFrame";

interface Props {
  project: Project;
  /** 0-based position among the featured projects */
  index: number;
  total: number;
  onDetailsClick: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

// A featured project as a card that sticks while the next one slides over it (desktop)
export default function FeaturedProjectCard({ project, index, total, onDetailsClick }: Props) {
  const tag = project.client ? "Client project" : project.label;

  return (
    // Each card sticks a little lower than the last, so the pile shows its edges
    <article data-stack-card className="lg:sticky" style={{ top: `calc(12vh + ${index * 18}px)` }}>
      <div
        data-stack-inner
        className="origin-top grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-card border border-line bg-surface p-5 sm:p-8 lg:p-10 shadow-[0_-30px_80px_-30px_rgba(0,0,0,0.9)]"
      >
        <div className="lg:col-span-5 order-last lg:order-first">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-scan">
              {pad(index + 1)} / {pad(total)}
            </span>
            {tag && <span className="text-accent-soft">{tag}</span>}
            {project.date && <span>{project.date}</span>}
          </p>
          <h3 className="mt-5 font-display text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.02]">
            {project.title}
          </h3>
          <p className="mt-5 text-lg leading-relaxed text-muted">{project.description}</p>
          {project.skills && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
              {project.skills.slice(0, 5).map((skill) => (
                <li key={skill} className="chip">
                  {skill}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" data-magnetic>
                Visit site
              </a>
            )}
            {/* Without a live site, the case study is the main action */}
            <button
              type="button"
              onClick={onDetailsClick}
              className={project.demo ? "btn-secondary" : "btn-primary"}
              data-magnetic
            >
              How I built it
            </button>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link text-sm ml-1">
                Code on GitHub
              </a>
            )}
          </div>
        </div>

        {project.image && (
          <div className="relative lg:col-span-7">
            <div data-tilt>
              <BrowserFrame url={project.demo} fallbackLabel={project.title}>
                <img
                  loading="lazy"
                  decoding="async"
                  src={`${project.image}-800.webp`}
                  srcSet={`${project.image}-480.webp 480w, ${project.image}-800.webp 800w, ${project.image}-1400.webp 1400w`}
                  sizes="(min-width: 1216px) 640px, (min-width: 1024px) 52vw, calc(100vw - 88px)"
                  width={800}
                  height={464}
                  alt={`${project.title} home page`}
                  className="block w-full h-auto"
                />
              </BrowserFrame>
            </div>
            {/* The whole screenshot opens the details for pointer users; keyboard users get the button */}
            <button
              type="button"
              onClick={onDetailsClick}
              tabIndex={-1}
              aria-hidden="true"
              className="absolute inset-0 cursor-pointer rounded-media"
            />
          </div>
        )}
      </div>
    </article>
  );
}
