import React from "react";

interface Props {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const LABELS: Record<string, string> = {
  all: "All",
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Full-stack",
  other: "Other",
};

// Segmented control for filtering projects by type
const ProjectFilterBar: React.FC<Props> = ({ selectedCategory, onCategoryChange, categories }) => {
  return (
    <div role="group" aria-label="Filter projects" className="mb-14 inline-flex rounded-full border border-line p-1">
      {categories.map((cat) => {
        const selected = selectedCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            aria-pressed={selected}
            onClick={() => onCategoryChange(cat)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ${
              selected ? "bg-text text-ink font-medium" : "text-muted hover:text-text"
            }`}
          >
            {LABELS[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        );
      })}
    </div>
  );
};

export default ProjectFilterBar;
