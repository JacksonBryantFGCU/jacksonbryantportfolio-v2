import React from "react";
import { Project } from "../constants/index";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Info } from "lucide-react";

interface Props {
  project: Project;
  onDetailsClick?: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onDetailsClick }) => {
  // Limit badges to 4 max
  const displayedSkills = project.skills?.slice(0, 4) || [];

  return (
    <article
      className="group relative w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 h-full flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-white/20"
    >
      {/* Featured Label */}
      {project.featured && (
        <span className="text-xs font-medium uppercase tracking-wider text-blue-400 mb-2">
          Featured
        </span>
      )}

      {/* Project Title */}
      <h3 className="text-xl md:text-2xl font-bold text-slate-50 tracking-tight mb-1.5 line-clamp-1">
        {project.title}
      </h3>

      {/* Short Description */}
      <p className="text-slate-400 text-sm leading-relaxed mb-3 line-clamp-2 md:line-clamp-2">
        {project.description}
      </p>

      {/* Tech Stack Badges */}
      {displayedSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {displayedSkills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-white/[0.07] border border-white/10 text-slate-300 text-xs px-2.5 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Screenshot */}
      {project.image && (
        <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900/50 border border-white/10 transition-shadow duration-300 group-hover:shadow-lg">
          <img
            loading="lazy"
            src={project.image}
            alt={`${project.title} screenshot`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm px-3.5 py-1.5 rounded-full shadow-md hover:brightness-110 hover:-translate-y-[1px] hover:shadow-lg transition-all duration-200"
          >
            Live Demo <FaExternalLinkAlt size={10} />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/10 text-white text-sm px-3.5 py-1.5 rounded-full hover:bg-white/[0.12] transition-all duration-200"
          >
            GitHub <FaGithub size={12} />
          </a>
        )}
        {onDetailsClick && (
          <button
            onClick={onDetailsClick}
            className="inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/10 text-slate-300 text-sm px-3.5 py-1.5 rounded-full hover:bg-white/[0.12] hover:text-white transition-all duration-200"
          >
            Details <Info size={12} />
          </button>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
