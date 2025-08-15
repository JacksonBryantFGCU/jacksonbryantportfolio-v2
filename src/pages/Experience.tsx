// src/pages/Experience.tsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EXPERIENCES } from "../constants/index";

type ExperienceType = {
  year: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
};

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        setExperiences(EXPERIENCES);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      console.error("Failed to load experiences:", err);
      setIsError(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sectionRef.current && experiences.length > 0) {
      const items = sectionRef.current.querySelectorAll(".timeline-item");

      items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: isEven ? -50 : 50,
            y: 30,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.15,
          }
        );
      });
    }
  }, [experiences]);
  
  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="min-h-screen text-white px-6 pt-20 pb-0 scroll-mt-32"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Experience
        </h2>

        {isLoading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg mb-4">Failed to load experiences.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !isError && experiences.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No experiences found.</p>
          </div>
        )}

        {!isLoading && !isError && experiences.length > 0 && (
          <div className="relative">
            {/* Timeline line - perfectly centered */}
            <div className="absolute  md:left-1/2 h-full w-0.5 bg-cyan-400/30 transform -translate-x-1/2"></div>
            
            {experiences.map((exp, index) => {
              const { role, company, year, description, skills } = exp;
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className={`timeline-item mb-12 w-full pl-16 md:pl-0 ${isEven ? "md:pr-[50%] md:pr-8" : "md:pl-[50%] md:pl-8"}`}
                >
                  {/* Timeline dot - perfectly centered */}
                  <div className="absolute left-0 md:left-1/2 top-1 w-4 h-4 rounded-full bg-cyan-400 border-2 border-cyan-300 transform -translate-x-1/2"></div>
                  
                  <div className={`relative ${isEven ? "md:text-right md:pr-4" : "md:text-left md:pl-4"}`}>
                    <span className="text-sm font-medium text-cyan-300">{year}</span>
                    <h3 className="text-xl font-semibold text-white mt-1 mb-1">
                      {role}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {company}
                    </p>
                    
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed break-words">
                      {description}
                    </p>
                    
                    {skills && skills.length > 0 && (
                      <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        {skills.map((skill: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
