import { useEffect, useRef } from "react";
import type { Project } from "../constants/index";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { gsap, lockScroll, prefersReducedMotion } from "../lib/motion";

interface Props {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  /** 1-based position and total, for "2 of 7" */
  position?: { index: number; total: number };
}

const sectionLabel = "label pt-1";

// Native <dialog>: the browser handles the focus trap, Escape, the inert page behind and returning focus
export default function ProjectDetailsModal({ project, isOpen, onClose, onPrev, onNext, position }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog || !panel) return;
    const animate = !prefersReducedMotion();

    if (isOpen && !dialog.open) {
      dialog.showModal();
      lockScroll(true);
      if (animate) {
        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: 48, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out", overwrite: true }
        );
      }
    } else if (!isOpen && dialog.open) {
      lockScroll(false);
      if (animate) {
        gsap.to(panel, { autoAlpha: 0, y: 24, duration: 0.2, ease: "power2.in", overwrite: true, onComplete: () => dialog.close() });
      } else {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Unmounting with the dialog open must not leave the page locked
  useEffect(() => () => lockScroll(false), []);

  // Start each project at the top
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project]);

  const tag = project?.client ? "Client project" : project?.label;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-modal-title"
      data-lenis-prevent
      className="project-dialog m-auto w-[min(52rem,calc(100%-2rem))] max-h-[90vh] max-w-none overflow-visible bg-transparent p-0 text-text"
      // Escape: run our close (with its animation) instead of the browser's instant one
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // A click on the dialog element itself is a click on the backdrop
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" && onPrev) onPrev();
        else if (e.key === "ArrowRight" && onNext) onNext();
      }}
    >
      <div ref={panelRef} className="relative overflow-hidden rounded-card border border-line bg-surface shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-ink/80 border border-line text-muted hover:text-text transition-colors duration-200"
          aria-label="Close project details"
        >
          <X size={18} />
        </button>

        {project && (
          <div ref={scrollRef} className="overflow-y-auto max-h-[90vh] modal-scrollbar">
            {project.image && (
              <div className="relative w-full aspect-[16/9] max-h-[400px] overflow-hidden bg-white border-b border-line">
                <img
                  src={`${project.image}-1400.webp`}
                  srcSet={`${project.image}-480.webp 480w, ${project.image}-800.webp 800w, ${project.image}-1400.webp 1400w`}
                  sizes="(min-width: 768px) 832px, 100vw"
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <div className="p-6 md:p-10">
              <div className="label flex flex-wrap items-center gap-x-4 gap-y-2">
                {tag && <span className="text-accent-soft">{tag}</span>}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5">
                  {project.status === "Live" && <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />}
                  {project.status}
                </span>
                {project.date && <span>{project.date}</span>}
              </div>

              <h3
                id="project-modal-title"
                className="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.02]"
              >
                {project.title}
              </h3>

              <p className="mt-5 text-lg leading-relaxed text-muted">{project.problem}</p>

              <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-[9rem_1fr]">
                <dt className={sectionLabel}>My role</dt>
                <dd className="-mt-4 sm:mt-0">{project.role}</dd>

                <dt className={sectionLabel}>What I built</dt>
                <dd className="-mt-4 sm:mt-0">
                  <ul className="space-y-3">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-relaxed">
                        <span className="mt-2.5 h-px w-4 flex-shrink-0 bg-scan" aria-hidden="true" />
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
                      <ul className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <li key={skill} className="chip">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </>
                )}
              </dl>

              {(project.demo || project.github) && (
                <div className="flex flex-wrap gap-3 mt-10">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Visit site <FaExternalLinkAlt size={11} aria-hidden="true" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                      View code <FaGithub size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}

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
                    <span className="label" aria-live="polite">
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
        )}
      </div>
    </dialog>
  );
}
