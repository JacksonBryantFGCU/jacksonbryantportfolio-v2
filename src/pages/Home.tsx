import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import resumePDF from "../assets/Jackson Bryant Resume 2025.pdf";
import LinkedinPhoto from "../assets/Linkedin Photo.jpg";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(textRef.current, {
        opacity: 0,
        y: 20,
        delay: 0.3,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 20,
        delay: 0.6,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="bg-gradient-to-b from-gray-900 to-black px-4 sm:px-8 pt-24 sm:pt-28 pb-4 border-neutral-900 border-b min-h-screen text-white"
    >
      <div className="flex lg:flex-row flex-col justify-between items-center">
        {/* Left Side */}
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 lg:text-left text-center">
          <h1
            ref={headingRef}
            className="sm:py-4 pb-4 font-semibold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            Jackson Bryant
          </h1>

          <div className="bg-clip-text bg-gradient-to-r from-yellow-300 via-emerald-500 to-blue mt-2 font-mono text-transparent text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
            <TypeAnimation
              sequence={[
                "Front-end Developer",
                1000,
                "Backend Developer",
                1000,
                "Fullstack Developer",
                1000,
                "Software Engineer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p
            ref={textRef}
            className="my-2 py-4 max-w-xl font-light text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide"
          >
            I build scalable front-end experiences using React and TypeScript, solve real-world problems with clean design systems, and love automating things with full-stack tooling.
          </p>

          <div ref={buttonsRef} className="flex sm:flex-row flex-col items-center sm:space-x-4 mt-2 sm:mt-4">
            <a
              href={resumePDF}
              download="Jackson Bryant Resume 2025.pdf"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 mt-4 px-6 py-3 rounded-xl w-48 font-medium text-white text-center tracking-tight hover:scale-105 transition-transform"
            >
              Download Resume
            </a>

            <div className="flex gap-6 mt-4 sm:mt-0 text-2xl">
              <a
                href="https://www.linkedin.com/in/jacksonbryant-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 ml-4 text-neutral-300 hover:text-blue hover:scale-110 transition-transform"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/JacksonBryantFGCU"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-neutral-300 hover:text-blue hover:scale-110 transition-transform"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center mt-10 lg:mt-0 w-full lg:w-1/2">
          <img
            ref={imageRef}
            src={LinkedinPhoto}
            alt="Jackson Bryant"
            height={900}
            width={400}
            className="rounded-md w-72 sm:w-80 lg:w-96"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}