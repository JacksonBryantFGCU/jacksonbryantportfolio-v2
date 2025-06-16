import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useProjects } from "../hooks/useProjects";

export default function Projects() {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useProjects();

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projects.length > 0 && sectionRef.current) {
      gsap.from(".project-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });
    }
  }, [projects]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-background-dark px-6 py-24 border-b border-border text-white scroll-mt-48"
    >
      <h2 className="bg-clip-text bg-gradient-to-r from-secondary via-blue-500 to-primary mb-12 font-bold text-transparent text-4xl text-center">
        Projects
      </h2>

      {isLoading && (
        <p className="text-text-muted text-lg text-center">Loading projects...</p>
      )}

      {isError && (
        <p className="text-red-500 text-lg text-center">Failed to load projects.</p>
      )}

      {!isLoading && !isError && projects.length === 0 && (
        <p className="text-text-muted text-lg text-center">No projects found.</p>
      )}

      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-5xl">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card relative w-full bg-gradient-to-r from-cyan-500 to-blue-500 p-[2px] rounded-xl"
          >
            <div className="relative flex flex-col gap-4 bg-[#15181F] rounded-xl p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {project.title || "Untitled Project"}
                </h3>
                <div className="flex space-x-2">
                  {project.github_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-cyan-700 px-3 py-1 text-xs text-white font-medium hover:underline transition"
                    >
                      Demo
                    </a>
                  )}
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-cyan-600 hover:bg-cyan-700 px-3 py-1 text-xs text-white font-medium transition"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {project.image && (
                <img
                  loading="eager"
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-image.png";
                  }}
                  className="transition-transform duration-300 hover:scale-105 mt-2 rounded-lg object-contain max-h-[22rem] w-full"
                />
              )}

              <p className="text-neutral-400">
                {project.description || "No description provided."}
              </p>

              {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.techStack.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-medium px-3 py-1 rounded-full transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}