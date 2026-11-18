import type { Project } from "../constants/index";

interface Props {
  project: Project;
  /** 1-based number shown above the title */
  number: number;
  onDetailsClick: () => void;
}

// One row in the "More projects" list: thumbnail, summary, links
export default function ProjectRow({ project, number, onDetailsClick }: Props) {
  return (
    <li
      data-reveal
      className="group grid md:grid-cols-12 gap-x-8 gap-y-5 border-t border-line py-8 transition-colors duration-300 hover:bg-surface/50 md:px-4"
    >
      {project.image && (
        <div className="md:col-span-3 max-w-sm overflow-hidden rounded-media border border-line bg-white">
          <img
            loading="lazy"
            decoding="async"
            src={`${project.image}-480.webp`}
            srcSet={`${project.image}-480.webp 480w, ${project.image}-800.webp 800w`}
            sizes="(min-width: 768px) 240px, 384px"
            width={480}
            height={278}
            alt=""
            className="block w-full h-auto transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      )}

      <div className="md:col-span-6">
        <p className="label">
          <span className="text-scan">{String(number).padStart(2, "0")}</span>
          {project.client && <span className="text-accent-soft"> · Client project</span>} · {project.status}
        </p>
        <h4 className="mt-2 font-display text-2xl font-semibold tracking-tight">{project.title}</h4>
        <p className="mt-2 leading-relaxed text-muted">{project.description}</p>
        {project.skills && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
            {project.skills.slice(0, 4).map((skill) => (
              <li key={skill} className="chip">
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="md:col-span-3 flex flex-wrap items-start gap-x-5 gap-y-2 md:justify-end text-sm pt-1">
        <button type="button" onClick={onDetailsClick} className="text-link">
          Details
        </button>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-link">
            Live site
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link">
            Code
          </a>
        )}
      </div>
    </li>
  );
}
