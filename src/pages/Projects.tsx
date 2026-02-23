// src/pages/Projects.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS, Project } from "../constants/index";
import ProjectCard from "../components/ProjectCard";
import ProjectFilterBar from "../components/ProjectFilterBar";
import ProjectDetailsModal from "../components/ProjectDetailsModal";

export default function Projects() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter logic
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProjects(PROJECTS);
    } else {
      setFilteredProjects(
        PROJECTS.filter((p) => p.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const handleDetailsClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <>
      <section
        id="projects"
        className="px-6 py-24 pb-32 md:pb-24 border-b border-neutral-800 text-white scroll-mt-48"
      >
        <div className="mx-auto max-w-5xl">
          {/* Section Heading */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white mb-8 font-bold text-4xl md:text-5xl text-center tracking-tight"
          >
            Projects
          </motion.h2>

          {/* Filter Bar */}
          <ProjectFilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {filteredProjects.length === 0 ? (
            <p className="text-slate-400 text-lg text-center">No projects found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={`${project.title}-${idx}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onDetailsClick={() => handleDetailsClick(project)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
