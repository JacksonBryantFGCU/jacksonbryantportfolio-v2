import { useProjects } from "../hooks/useProjects";
// import { useEffect } from "react"; // Temporarily disabling GSAP animation
// import gsap from "gsap";

export default function Projects() {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useProjects();

  console.log("projects", projects);
  console.log("isLoading", isLoading);
  console.log("isError", isError);

  // useEffect(() => {
  //   if (projects.length > 0) {
  //     gsap.from(".project-card", {
  //       opacity: 0,
  //       y: 30,
  //       duration: 0.6,
  //       stagger: 0.2,
  //       ease: "power2.out",
  //     });
  //   }
  // }, [projects]);

  return (
    <section className="bg-background-light dark:bg-background-dark px-6 py-20 min-h-screen text-white">
      <h2 className="mb-12 font-bold text-primary dark:text-white text-4xl text-center">
        Projects
      </h2>

      {isLoading && (
        <p className="text-text-muted text-center">Loading projects...</p>
      )}

      {isError && (
        <p className="text-red-500 text-center">Failed to load projects.</p>
      )}

      {!isLoading && projects.length === 0 && (
        <p className="text-text-muted text-center">No projects found.</p>
      )}

      {/* 🔍 DEBUG: Show raw data output */}
      {!isLoading && !isError && (
        <pre className="bg-neutral-800 mx-auto mb-10 p-4 rounded-lg max-w-4xl overflow-x-auto text-white text-xs">
          {JSON.stringify(projects, null, 2)}
        </pre>
      )}

      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-5xl">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-neutral-900 shadow-lg p-6 border border-border rounded-2xl project-card"
          >
            <h3 className="mb-2 font-semibold text-white text-2xl">
              {project.title}
            </h3>
            <p className="mb-3 text-text-muted">{project.description}</p>
            <div className="flex flex-wrap gap-2 font-medium text-primary text-sm">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="bg-primary/10 px-3 py-1 border border-primary/30 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <a
                href={project.repoUrl}
                className="text-blue-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Code
              </a>
              <a
                href={project.demoUrl}
                className="text-blue-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}