// src/pages/Projects.tsx
import { useMemo, useState } from "react";
import { PROJECTS, type Project } from "../constants/index";
import ProjectCard from "../components/ProjectPanel";
import FeaturedProjectCard from "../components/FeaturedProjectCard";
import ProjectFilterBar from "../components/ProjectFilterBar";
import ProjectDetailsModal from "../components/ProjectDetailsModal";

// Only show filter tabs for categories that have at least one project
type ProjectCategory = NonNullable<Project["category"]>;
const availableCategories: string[] = [
  "all",
  ...Array.from(
    new Set(PROJECTS.map((p) => p.category).filter((c): c is ProjectCategory => c !== undefined))
  ),
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { featured, more } = useMemo(() => {
    const filtered =
      selectedCategory === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === selectedCategory);
    return {
      featured: filtered.filter((p) => p.featured),
      more: filtered.filter((p) => !p.featured),
    };
  }, [selectedCategory]);

  const openDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeDetails = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <>
      <section id="projects" className="px-6 sm:px-16 py-20 md:py-24 border-t border-neutral-800 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-white mb-8 font-bold text-4xl md:text-5xl text-center tracking-tight">Projects</h2>

          <ProjectFilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={availableCategories}
          />

          {featured.length > 0 && (
            <div className="space-y-16 md:space-y-24 mt-4">
              {featured.map((project, idx) => (
                <FeaturedProjectCard
                  key={project.title}
                  project={project}
                  reverse={idx % 2 === 1}
                  onDetailsClick={() => openDetails(project)}
                />
              ))}
            </div>
          )}

          {more.length > 0 && (
            <div className={featured.length > 0 ? "mt-20 md:mt-24" : "mt-4"}>
              <h3 className="text-xl font-semibold text-slate-200 mb-6">More projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {more.map((project) => (
                  <ProjectCard key={project.title} project={project} onDetailsClick={() => openDetails(project)} />
                ))}
              </div>
            </div>
          )}

          {featured.length === 0 && more.length === 0 && (
            <p className="text-slate-400 text-lg text-center">No projects found.</p>
          )}
        </div>
      </section>

      <ProjectDetailsModal project={selectedProject} isOpen={isModalOpen} onClose={closeDetails} />
    </>
  );
}
