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
  fullstack: "Fullstack",
  other: "Other",
};

const ProjectFilterBar: React.FC<Props> = ({
  selectedCategory,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="pb-6 mb-6 border-b border-white/10">
      <div className="flex justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-white/[0.15] text-white border border-white/20 shadow-sm"
                : "bg-white/5 text-slate-300 border border-transparent hover:bg-white/10 hover:text-white"
            }`}
          >
            {LABELS[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilterBar;
