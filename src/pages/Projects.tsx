// src/pages/Projects.tsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PROJECTS, Project } from "../constants/index";
import ProjectCard from "../components/ProjectCard";
import ProjectFilterBar from "../components/ProjectFilterBar";
import ProjectDetails from "../components/ProjectDetails";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Load projects
  useEffect(() => {
    if (PROJECTS.length > 0) {
      setProjects(PROJECTS);
      setIsLoaded(true);
    }
  }, []);

  // Filter logic
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === selectedCategory)
      );
    }
  }, [selectedCategory, projects]);

  // GSAP animations on load
  useEffect(() => {
    if (!sectionRef.current || !isLoaded || filteredProjects.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".project-card");
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 30 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded, filteredProjects]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="px-6 py-24 border-b border-border text-white scroll-mt-48"
    >
      <h2 className="bg-clip-text text-white mb-12 font-bold text-transparent text-4xl text-center">
        Projects
      </h2>

      {/* Filter Bar */}
      <ProjectFilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Loading State */}
      {!isLoaded ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <p className="text-gray-400 text-lg text-center">No projects found.</p>
      ) : (
        <div className="gap-10 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-5xl">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={`${project.title}-${idx}`}
              project={project}
              onViewMore={() => setSelectedProject(project)}
            />
          ))}
        </div>
      )}

      {/* Project Details Modal */}
      <ProjectDetails
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
