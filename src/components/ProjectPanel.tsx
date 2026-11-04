import React from "react";
import type { Project } from "../constants/index";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Info } from "lucide-react";

interface Props {
  project: Project;
  onDetailsClick?: () => void;
}

// Compact card for the "More projects" grid: no screenshot (it's in the Details view)
const ProjectCard: React.FC<Props> = ({ project, onDetailsClick }) => {
  const displayedSkills = project.skills?.slice(0, 4) || [];

  return (
    <article className="h-full flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6 transition-colors duration-200 hover:border-white/20">
      <h3 className="text-lg md:text-xl font-semibold text-slate-50 tracking-tight">{project.title}</h3>
      <p className="mt-2 text-slate-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>

      {displayedSkills.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 mt-4" aria-label="Built with">
          {displayedSkills.map((skill) => (
            <li
              key={skill}
              className="bg-white/[0.07] border border-white/10 text-slate-300 text-xs px-2.5 py-0.5 rounded-full"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2 mt-auto pt-5">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/10 text-white text-sm px-3.5 py-1.5 rounded-full hover:bg-white/[0.12] transition-colors duration-200"
          >
            Live <FaExternalLinkAlt size={10} aria-hidden="true" />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/10 text-white text-sm px-3.5 py-1.5 rounded-full hover:bg-white/[0.12] transition-colors duration-200"
          >
            Code <FaGithub size={12} aria-hidden="true" />
          </a>
        )}
        {onDetailsClick && (
          <button
            type="button"
            onClick={onDetailsClick}
            className="inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/10 text-slate-300 text-sm px-3.5 py-1.5 rounded-full hover:bg-white/[0.12] hover:text-white transition-colors duration-200"
          >
            Details <Info size={12} aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
