import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../constants/index";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { X } from "lucide-react";

interface Props {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<Props> = ({ project, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and ESC close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Focus the modal
    modalRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const displayedSkills = project.skills || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal Container - handles rounded clipping */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
          >
            {/* Close Button - positioned outside scroll area */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-black/40 text-slate-300 hover:bg-black/60 hover:text-white transition-all duration-200"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Scroll Wrapper */}
            <div className="overflow-y-auto max-h-[90vh] modal-scrollbar">
              {/* Screenshot */}
              {project.image && (
                <div className="relative w-full aspect-[16/9] max-h-[380px] overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Featured Label */}
                {project.featured && (
                  <span className="inline-block text-xs font-medium uppercase tracking-widest text-blue-400/80 mb-2">
                    Featured
                  </span>
                )}

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-base leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-3">
                      Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {project.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 mt-1.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                {displayedSkills.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {displayedSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1 rounded-full transition-colors duration-200 hover:bg-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-400 hover:shadow-md transition-all duration-200"
                    >
                      Live Demo <FaExternalLinkAlt size={11} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                    >
                      View Code <FaGithub size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
