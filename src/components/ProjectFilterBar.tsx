import React from "react";

interface Props {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Fullstack", value: "fullstack" },
  { label: "Other", value: "other" },
];

const ProjectFilterBar: React.FC<Props> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="pb-6 mb-6 border-b border-white/10">
      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === cat.value
                ? "bg-white/[0.15] text-white border border-white/20 shadow-sm"
                : "bg-white/5 text-slate-300 border border-transparent hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilterBar;
