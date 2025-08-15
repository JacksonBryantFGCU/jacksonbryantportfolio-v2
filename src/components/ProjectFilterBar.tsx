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
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === cat.value
              ? "bg-cyan-600 text-white"
              : "bg-[#1E2230] text-gray-300 hover:bg-cyan-700"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilterBar;
