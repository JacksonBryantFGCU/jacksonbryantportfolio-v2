import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Info } from "lucide-react";
import type { Project } from "../constants";

interface Props {
  project: Project;
  onDetailsClick: () => void;
  reverse?: boolean;
}

// Large card for client work: screenshot beside the story on desktop, stacked on phones
export default function FeaturedProjectCard({ project, onDetailsClick, reverse = false }: Props) {
  return (
    <article className="grid md:grid-cols-5 gap-6 md:gap-10 items-center">
      {project.image && (
        <div
          className={`md:col-span-3 rounded-xl overflow-hidden border border-white/10 bg-slate-900/50 shadow-xl shadow-black/20 ${
            reverse ? "md:order-last" : ""
          }`}
        >
          <img
            loading="lazy"
            decoding="async"
            src={`${project.image}-800.webp`}
            srcSet={`${project.image}-480.webp 480w, ${project.image}-800.webp 800w, ${project.image}-1400.webp 1400w`}
            sizes="(min-width: 1152px) 640px, (min-width: 768px) 56vw, calc(100vw - 48px)"
            width={800}
            height={464}
            alt={`${project.title} screenshot`}
            className="w-full h-auto"
          />
        </div>
      )}

      <div className="md:col-span-2">
        {(project.client || project.label) && (
          <span className="text-xs font-medium uppercase tracking-widest text-blue-400">
            {project.client ? "Client work" : project.label}
          </span>
        )}
        <h3 className="mt-2 text-2xl md:text-3xl font-bold text-slate-50 tracking-tight">{project.title}</h3>
        <p className="mt-3 text-slate-300 leading-relaxed">{project.description}</p>

        {project.skills && project.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mt-4" aria-label="Built with">
            {project.skills.slice(0, 5).map((skill) => (
              <li
                key={skill}
                className="bg-white/[0.07] border border-white/10 text-slate-300 text-xs px-2.5 py-0.5 rounded-full"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 mt-6">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 btn-primary text-white text-sm px-4 py-2 rounded-full hover:brightness-110 transition-[filter] duration-200"
            >
              Visit live site <FaExternalLinkAlt size={10} aria-hidden="true" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/10 text-white text-sm px-4 py-2 rounded-full hover:bg-white/[0.12] transition-colors duration-200"
            >
              Code <FaGithub size={12} aria-hidden="true" />
            </a>
          )}
          <button
            type="button"
            onClick={onDetailsClick}
            className="inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/10 text-slate-300 text-sm px-4 py-2 rounded-full hover:bg-white/[0.12] hover:text-white transition-colors duration-200"
          >
            Details <Info size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
