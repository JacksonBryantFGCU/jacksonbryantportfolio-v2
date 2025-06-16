import { useEffect, useRef } from "react";
import aboutImg from "../assets/about-me.jpg";
import gsap from "gsap";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(imageRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      });

      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="bg-background-dark px-6 py-24 border-b border-border text-white scroll-mt-48"
    >
      <div ref={containerRef} className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <h2 className="bg-clip-text bg-gradient-to-r from-secondary via-blue-500 to-primary mb-20 font-sans font-bold text-transparent text-4xl text-center">
          About <span className="text-text-muted">Me</span>
        </h2>

        <div className="flex flex-wrap justify-center items-center">
          {/* Image */}
          <div className="flex justify-center lg:p-8 w-full lg:w-1/2">
            <img
              ref={imageRef}
              src={aboutImg}
              alt="About Jackson Bryant"
              className="shadow-lg rounded-2xl max-w-full h-3/4 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Text */}
          <div className="flex justify-center lg:justify-start w-full lg:w-1/2">
            <div
              ref={textRef}
              className="space-y-6 py-6 max-w-xl font-light text-text-muted text-xl lg:text-left text-center tracking-tight"
            >
              <p>
                I’m Jackson Bryant, a Software Engineering student at Florida Gulf Coast University,
                with a passion for modern web development and building full-stack applications using
                React, TypeScript, and scalable backend technologies.
              </p>
              <p>
                Beyond coding, I tutor university-level math, work on real-world projects,
                and explore automation and AI integrations to bring smart functionality into every build.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}