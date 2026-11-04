import React, { useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import type { Project } from "../constants/index";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface Props {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  /** 1-based position and total, for "2 of 7" */
  position?: { index: number; total: number };
}

const sectionLabel = "text-sm text-muted";

const ProjectDetailsModal: React.FC<Props> = ({ project, isOpen, onClose, onPrev, onNext, position }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Escape closes; left/right arrows move between projects
  useEffect(() => {
    if (!isOpen) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && onPrev) onPrev();
      else if (e.key === "ArrowRight" && onNext) onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      returnFocusRef.current?.focus();
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Start each project at the top
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project]);

  if (!project) return null;

  const tag = project.client ? "Client project" : project.label;
  const isLive = project.status === "Live";

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <div className="absolute inset-0 bg-ink/80" />

          <m.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden bg-surface border border-line rounded-media shadow-2xl outline-none"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-ink/80 border border-line text-muted hover:text-text transition-colors duration-200"
              aria-label="Close project details"
            >
              <X size={18} />
            </button>

            <div ref={scrollRef} className="overflow-y-auto max-h-[90vh] modal-scrollbar">
              {project.image && (
                <div className="relative w-full aspect-[16/9] max-h-[380px] overflow-hidden bg-white border-b border-line flex items-center justify-center">
                  <img
                    src={`${project.image}-1400.webp`}
                    srcSet={`${project.image}-480.webp 480w, ${project.image}-800.webp 800w, ${project.image}-1400.webp 1400w`}
                    sizes="(min-width: 768px) 768px, 100vw"
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Label and status */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  {tag && <span className="text-accent-soft">{tag}</span>}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 text-muted">
                    {isLive && <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />}
                    {project.status}
                  </span>
                  {project.date && <span className="text-muted">{project.date}</span>}
                </div>

                <h3 id="project-modal-title" className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                  {project.title}
                </h3>

                <p className="mt-4 text-lg leading-relaxed text-muted">{project.problem}</p>

                <dl className="mt-8 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-[8rem_1fr]">
                  <dt className={sectionLabel}>My role</dt>
                  <dd className="-mt-4 sm:mt-0">{project.role}</dd>

                  <dt className={sectionLabel}>What I built</dt>
                  <dd className="-mt-4 sm:mt-0">
                    <ul className="space-y-2.5">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-3 leading-relaxed">
                          <span className="mt-2.5 h-1 w-3 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>

                  {project.result && (
                    <>
                      <dt className={sectionLabel}>Result</dt>
                      <dd className="-mt-4 sm:mt-0 leading-relaxed">{project.result}</dd>
                    </>
                  )}

                  {project.skills && project.skills.length > 0 && (
                    <>
                      <dt className={sectionLabel}>Built with</dt>
                      <dd className="-mt-4 sm:mt-0">
                        <p className="text-muted">{project.skills.join(", ")}</p>
                      </dd>
                    </>
                  )}
                </dl>

                {/* Links */}
                {(project.demo || project.github) && (
                  <div className="flex flex-wrap gap-3 mt-8">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Visit site <FaExternalLinkAlt size={11} aria-hidden="true" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        View code <FaGithub size={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}

                {/* Previous / Next */}
                {(onPrev || onNext) && (
                  <div className="mt-10 pt-6 border-t border-line flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={onPrev}
                      disabled={!onPrev}
                      className="btn-secondary px-4 py-2 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <ArrowLeft size={14} aria-hidden="true" /> Previous
                    </button>
                    {position && (
                      <span className="text-sm text-muted" aria-live="polite">
                        {position.index} of {position.total}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={onNext}
                      disabled={!onNext}
                      className="btn-secondary px-4 py-2 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Next <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
