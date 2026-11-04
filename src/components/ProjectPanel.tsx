import React from "react";
import type { Project } from "../constants/index";

interface Props {
  project: Project;
  onDetailsClick?: () => void;
}

// One row in the "More projects" list: title, summary, stack and links
const ProjectRow: React.FC<Props> = ({ project, onDetailsClick }) => {
  return (
    <li className="grid md:grid-cols-12 gap-x-8 gap-y-3 border-t border-line py-7">
      <div className="md:col-span-4">
        <h4 className="font-display text-xl font-semibold tracking-tight">{project.title}</h4>
        <p className="mt-1 text-sm text-muted">{project.status}</p>
      </div>

      <div className="md:col-span-5">
        <p className="leading-relaxed">{project.description}</p>
        {project.skills && <p className="mt-2 text-sm text-muted">{project.skills.slice(0, 4).join(", ")}</p>}
      </div>

      <div className="md:col-span-3 flex flex-wrap items-start gap-x-5 gap-y-2 md:justify-end text-sm">
        {onDetailsClick && (
          <button type="button" onClick={onDetailsClick} className="text-link">
            Details
          </button>
        )}
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
};

export default ProjectRow;
