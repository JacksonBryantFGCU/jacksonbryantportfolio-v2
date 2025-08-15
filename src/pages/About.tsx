import { useEffect, useRef } from "react";
import aboutImg from "/assets/about-me.webp";
import gsap from "gsap";
import { ABOUT_TEXT } from "../constants/index.ts"
import { ABOUT_TEXT1 } from "../constants/index.ts"

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
      className="px-6 py-0 pt-8 border-b border-border text-white"
    >
      <div ref={containerRef} className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <h2 className="bg-clip-text text-white mb-20 font-sans font-bold text-transparent text-4xl text-center">
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
              loading="lazy"
              decoding="async"
              alt="About image"
            />
          </div>

          {/* Text */}
          <div className="flex justify-center lg:justify-start w-full lg:w-1/2">
            <div
              ref={textRef}
              className="space-y-6 py-6 max-w-xl font-light text-gray-300 text-xl lg:text-left text-center tracking-tight"
            >
              <p>
                { ABOUT_TEXT }
              </p>
              <p>
                { ABOUT_TEXT1 }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
