// src/pages/Projects.tsx
import { useCallback, useMemo, useState } from "react";
import { PROJECTS, type Project } from "../constants/index";
import ProjectRow from "../components/ProjectPanel";
import SectionHeader from "../components/SectionHeader";
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { featured, more } = useMemo(() => {
    const filtered =
      selectedCategory === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === selectedCategory);
    return {
      featured: filtered.filter((p) => p.featured),
      more: filtered.filter((p) => !p.featured),
    };
  }, [selectedCategory]);

  // Order the details view walks through: featured first, then the rest
  const ordered = useMemo(() => [...featured, ...more], [featured, more]);
  const selectedProject = selectedIndex !== null ? ordered[selectedIndex] ?? null : null;

  const openDetails = (project: Project) => {
    setSelectedIndex(ordered.indexOf(project));
    setIsModalOpen(true);
  };

  const closeDetails = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedIndex(null), 200);
  }, []);

  const showPrev = useCallback(() => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const showNext = useCallback(
    () => setSelectedIndex((i) => (i !== null && i < ordered.length - 1 ? i + 1 : i)),
    [ordered.length]
  );

  return (
    <>
      <section id="projects" aria-labelledby="projects-title" className="section">
        <div className="container-page">
          <SectionHeader
            id="projects"
            title="Projects"
            intro="Live sites for clients, a hackathon win, and tools I built for my own workflow."
          />

          <ProjectFilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={availableCategories}
          />

          {featured.length > 0 && (
            <div className="space-y-24 md:space-y-32">
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
            <div className={featured.length > 0 ? "mt-28 md:mt-36" : ""}>
              <h3 className="mb-6 font-display text-2xl font-semibold tracking-tight">More projects</h3>
              <ul className="border-b border-line">
                {more.map((project) => (
                  <ProjectRow key={project.title} project={project} onDetailsClick={() => openDetails(project)} />
                ))}
              </ul>
            </div>
          )}

          {featured.length === 0 && more.length === 0 && <p className="text-muted">No projects in this category yet.</p>}
        </div>
      </section>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeDetails}
        onPrev={selectedIndex !== null && selectedIndex > 0 ? showPrev : undefined}
        onNext={selectedIndex !== null && selectedIndex < ordered.length - 1 ? showNext : undefined}
        position={selectedIndex !== null ? { index: selectedIndex + 1, total: ordered.length } : undefined}
      />
    </>
  );
}
