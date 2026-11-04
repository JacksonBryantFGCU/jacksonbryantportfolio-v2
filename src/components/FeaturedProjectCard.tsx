import type { Project } from "../constants";
import BrowserFrame from "./BrowserFrame";

interface Props {
  project: Project;
  onDetailsClick: () => void;
  reverse?: boolean;
}

// A featured project: the live site in a browser frame beside the short story
export default function FeaturedProjectCard({ project, onDetailsClick, reverse = false }: Props) {
  const tag = project.client ? "Client project" : project.label;

  return (
    <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {project.image && (
        <div className={`lg:col-span-7 ${reverse ? "lg:order-last" : ""}`}>
          <BrowserFrame url={project.demo} fallbackLabel={project.title}>
            <img
              loading="lazy"
              decoding="async"
              src={`${project.image}-800.webp`}
              srcSet={`${project.image}-480.webp 480w, ${project.image}-800.webp 800w, ${project.image}-1400.webp 1400w`}
              sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, calc(100vw - 48px)"
              width={800}
              height={464}
              alt={`${project.title} home page`}
              className="block w-full h-auto"
            />
          </BrowserFrame>
        </div>
      )}

      <div className="lg:col-span-5">
        {tag && <p className="text-sm text-accent-soft">{tag}</p>}
        <h3 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
          {project.title}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-muted">{project.description}</p>
        {project.skills && (
          <p className="mt-4 text-sm text-muted/80">{project.skills.slice(0, 5).join(", ")}</p>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-3">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Visit site
            </a>
          )}
          <button type="button" onClick={onDetailsClick} className="btn-secondary">
            How I built it
          </button>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link text-sm ml-1">
              Code on GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
