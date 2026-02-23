import React from "react";
import { TECHNOLOGIES } from "../constants/data/technologiesData";

const Technologies: React.FC = () => {
  return (
    <section id="tech" className="px-6 py-20 border-neutral-800 border-b">
      <h2 className="mb-12 font-semibold text-4xl text-center text-white">
        Technologies
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {TECHNOLOGIES.map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.id}
              className="relative group gradient-border hover:shadow-[0_0_20px_rgba(56,178,172,0.8)] p-[2px] rounded-2xl transition-all hover:scale-105 duration-300"
            >
              <div className="flex justify-center items-center bg-neutral-900 p-4 rounded-2xl">
                <Icon className={`text-7xl ${tech.color}`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Technologies;
