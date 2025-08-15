import React, { useState } from "react";
import { Project } from "../constants/index";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface Props {
  project: Project;
  onViewMore: () => void;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article
      className={`relative w-full p-[2px] rounded-xl overflow-hidden transition-all duration-300 ${
        project.featured
          ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/40"
          : "bg-gradient-to-r from-gray-700 to-gray-900"
      }`}
    >
      <div className="relative flex flex-col gap-4 bg-[#15181F] rounded-xl p-6 h-full">
        {/* Title + Links */}
        <header>
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            {project.title}
          </h3>
          <div className="flex space-x-2 mt-2">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-xl bg-cyan-600 px-3 py-1 text-xs text-gray-300 font-medium hover:bg-cyan-900 hover:underline transition"
              >
                Demo <FaExternalLinkAlt size={12} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-xl bg-cyan-600 hover:bg-cyan-700 px-3 py-1 text-xs text-gray-300 font-medium transition"
              >
                GitHub <FaGithub size={12} />
              </a>
            )}
          </div>
        </header>

        {/* Image */}
        {project.image && (
          <img
            loading="lazy"
            src={project.image}
            alt={`${project.title} screenshot`}
            onError={(e) => {
              e.currentTarget.src = "/fallback-image.png";
            }}
            className="transition-transform duration-300 hover:scale-105 mt-2 rounded-lg object-contain w-full h-auto"
          />
        )}

        {/* Short Description */}
        <p className="text-gray-300">{project.description}</p>

        {/* Skills */}
        {Array.isArray(project.skills) && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-cyan-600 text-white text-xs font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Stats Badges */}
        {project.stats && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.stats.duration && (
              <span className="bg-[#1E2230] border border-cyan-500 text-xs text-cyan-400 px-2 py-1 rounded-lg">
                ⏳ {project.stats.duration}
              </span>
            )}
            {project.stats.linesOfCode && (
              <span className="bg-[#1E2230] border border-blue-500 text-xs text-blue-400 px-2 py-1 rounded-lg">
                📄 {project.stats.linesOfCode.toLocaleString()} LOC
              </span>
            )}
            {project.stats.users && (
              <span className="bg-[#1E2230] border border-purple-500 text-xs text-purple-400 px-2 py-1 rounded-lg">
                👥 {project.stats.users}
              </span>
            )}
          </div>
        )}

        {/* View More Toggle */}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-4 w-fit text-sm text-cyan-400 hover:underline"
        >
          {isExpanded ? "Hide Details" : "View More"}
        </button>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && project.details && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              {/* Long Description */}
              {project.details.longDescription && (
                <p className="text-gray-300 mb-4">
                  {project.details.longDescription}
                </p>
              )}

              {/* Architecture Image */}
              {project.details.architectureImage && (
                <img
                  src={project.details.architectureImage}
                  alt="Architecture Diagram"
                  className="rounded-lg mb-4"
                />
              )}

              {/* Video Demo */}
              {project.details.videoDemo && (
                <video
                  controls
                  className="w-full rounded-lg mb-4"
                  src={project.details.videoDemo}
                />
              )}

              {/* Challenges */}
              {project.details.challenges && (
                <>
                  <h4 className="text-white font-medium mb-1">Challenges</h4>
                  <ul className="list-disc list-inside text-gray-400 mb-4">
                    {project.details.challenges.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* Solutions */}
              {project.details.solutions && (
                <>
                  <h4 className="text-white font-medium mb-1">Solutions</h4>
                  <ul className="list-disc list-inside text-gray-400">
                    {project.details.solutions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};

export default ProjectCard;
