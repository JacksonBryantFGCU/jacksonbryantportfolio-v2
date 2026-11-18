// src/pages/Projects.tsx
import { useCallback, useState } from "react";
import { PROJECTS, type Project } from "../constants/index";
import ProjectRow from "../components/ProjectPanel";
import SectionHeader from "../components/SectionHeader";
import FeaturedProjectCard from "../components/FeaturedProjectCard";
import ProjectDetailsModal from "../components/ProjectDetailsModal";

const featured = PROJECTS.filter((p) => p.featured);
const more = PROJECTS.filter((p) => !p.featured);
// Order the details view walks through: featured first, then the rest
const ordered = [...featured, ...more];

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedProject = selectedIndex !== null ? ordered[selectedIndex] ?? null : null;

  const openDetails = (project: Project) => {
    setSelectedIndex(ordered.indexOf(project));
    setIsModalOpen(true);
  };

  const closeDetails = useCallback(() => setIsModalOpen(false), []);
  const showPrev = useCallback(() => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const showNext = useCallback(() => setSelectedIndex((i) => (i !== null && i < ordered.length - 1 ? i + 1 : i)), []);

  return (
    <>
      <section id="projects" aria-labelledby="projects-title" className="section">
        <div className="container-page">
          <SectionHeader
            id="projects"
            index="02"
            title="Projects"
            intro="Live sites for clients, an award-winning hackathon build, and the site you're on."
          />

          <div className="space-y-8 lg:space-y-[16vh]">
            {featured.map((project, idx) => (
              <FeaturedProjectCard
                key={project.title}
                project={project}
                index={idx}
                total={featured.length}
                onDetailsClick={() => openDetails(project)}
              />
            ))}
          </div>

          <div className="mt-28 md:mt-40">
            <h3 className="label mb-6">More projects</h3>
            <ul className="border-b border-line">
              {more.map((project, idx) => (
                <ProjectRow
                  key={project.title}
                  project={project}
                  number={featured.length + idx + 1}
                  onDetailsClick={() => openDetails(project)}
                />
              ))}
            </ul>
          </div>
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
