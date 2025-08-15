import React, { useState } from "react";
import gsap from "gsap";
import TechnologyDetailsPanel from "../components/TechnologyDetailsPanel";
import { TECHNOLOGIES } from "../constants/data/technologiesData";

const Technologies: React.FC = () => {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const handleSelect = (id: string | null) => {
    setActiveTech(id);
  };

  return (
    <section id="tech" className="px-6 py-20 border-neutral-800 border-b">
      <h2 className="mb-12 font-semibold text-4xl text-center text-white">
        Technologies
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {TECHNOLOGIES.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.id}
              onMouseEnter={() => handleSelect(tech.id)}
              onMouseLeaver={() => handleSelect(null)}
              onClick={() => handleSelect(activeTech === tech.id ? null : tech.id)}
              className="relative group bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-[0_0_20px_rgba(56,178,172,0.8)] p-[2px] rounded-2xl transition-all cursor-pointer"
            >
              <div className="flex justify-center items-center bg-neutral-900 p-4 rounded-2xl">
                <Icon className={`text-7xl ${tech.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <TechnologyDetailsPanel
        tech={TECHNOLOGIES.find((t) => t.id === activeTech) || null}
      />
    </section>
  );
};

export default Technologies;

