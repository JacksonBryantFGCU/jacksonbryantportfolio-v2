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

const sectionLabel = "text-xs font-medium uppercase tracking-widest text-slate-500 mb-2";

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

  const tag = project.client ? "Client work" : project.label;
  const meta = [project.status, project.date].filter(Boolean).join(" · ");

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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

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
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl outline-none"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-black/40 text-slate-300 hover:bg-black/60 hover:text-white transition-colors duration-200"
              aria-label="Close project details"
            >
              <X size={18} />
            </button>

            <div ref={scrollRef} className="overflow-y-auto max-h-[90vh] modal-scrollbar">
              {project.image && (
                <div className="relative w-full aspect-[16/9] max-h-[380px] overflow-hidden bg-slate-950 flex items-center justify-center">
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
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-widest">
                  {tag && <span className="text-blue-400/90">{tag}</span>}
                  {meta && <span className="text-slate-500">{meta}</span>}
                </p>

                <h3 id="project-modal-title" className="mt-2 text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>

                <p className="mt-4 text-slate-300 text-base leading-relaxed">{project.problem}</p>

                <dl className="mt-6 grid gap-6 sm:grid-cols-[10rem_1fr]">
                  <dt className={sectionLabel}>My role</dt>
                  <dd className="-mt-4 sm:mt-0 text-slate-200">{project.role}</dd>

                  <dt className={sectionLabel}>What I built</dt>
                  <dd className="-mt-4 sm:mt-0">
                    <ul className="space-y-2.5">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 mt-1.5 flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>

                  {project.result && (
                    <>
                      <dt className={sectionLabel}>Result</dt>
                      <dd className="-mt-4 sm:mt-0 text-slate-200 text-sm leading-relaxed">{project.result}</dd>
                    </>
                  )}

                  {project.skills && project.skills.length > 0 && (
                    <>
                      <dt className={sectionLabel}>Built with</dt>
                      <dd className="-mt-4 sm:mt-0">
                        <ul className="flex flex-wrap gap-2">
                          {project.skills.map((skill) => (
                            <li
                              key={skill}
                              className="bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1 rounded-full"
                            >
                              {skill}
                            </li>
                          ))}
                        </ul>
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
                        className="inline-flex items-center gap-2 bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-400 transition-colors duration-200"
                      >
                        Visit live site <FaExternalLinkAlt size={11} aria-hidden="true" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors duration-200"
                      >
                        View code <FaGithub size={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}

                {/* Previous / Next */}
                {(onPrev || onNext) && (
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={onPrev}
                      disabled={!onPrev}
                      className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <ArrowLeft size={14} aria-hidden="true" /> Previous
                    </button>
                    {position && (
                      <span className="text-xs text-slate-500" aria-live="polite">
                        {position.index} of {position.total}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={onNext}
                      disabled={!onNext}
                      className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:pointer-events-none"
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
