import React from "react";
import { Technology } from "../constants/data/technologiesData";

interface Props {
  tech: Technology | null;
}

const TechnologyDetailsPanel: React.FC<Props> = ({ tech }) => {
  if (!tech) return null;

  return (
    <div
      className="
        mt-6 
        rounded-2xl 
        bg-gradient-to-r from-cyan-500 to-blue-500 p-[2px] 
        hover:shadow-[0_0_20px_rgba(56,178,172,0.5)] 
        transition-all duration-300
      "
    >
      <div className="bg-[#15181F] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <tech.icon className={`text-3xl ${tech.color}`} />
          <h3 className="text-xl font-semibold text-white">{tech.name}</h3>
        </div>
        <p className="text-gray-300 mb-4">{tech.description}</p>

        <h4 className="text-white font-medium">Key Features</h4>
        <ul className="list-disc list-inside text-gray-400 mb-4">
          {tech.keyFeatures.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>

        <h4 className="text-white font-medium">Examples</h4>
        <ul className="list-disc list-inside text-gray-400 mb-4">
          {tech.examples.map((example, i) => (
            <li key={i}>{example}</li>
          ))}
        </ul>

        {tech.links && (
          <div className="flex gap-4">
            {tech.links.docs && (
              <a
                href={tech.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Docs
              </a>
            )}
            {tech.links.github && (
              <a
                href={tech.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnologyDetailsPanel;
