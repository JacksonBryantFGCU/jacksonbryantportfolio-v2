import { FaLinkedin, FaGithub } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const PORTRAIT_SRCSET =
  "/images/jackson-portrait-320.webp 320w, /images/jackson-portrait-640.webp 640w, /images/jackson-portrait-800.webp 800w";

const socialLinkClass =
  "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-white/10 transition-colors duration-200";

export default function Home() {
  return (
    <section id="home" className="px-6 sm:px-16 pt-10 md:pt-36 pb-12 md:pb-16 text-white">
      <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-16 max-w-6xl mx-auto">
        {/* Photo: small above the name on phones, beside the text on desktop */}
        <div className="order-first lg:order-last shrink-0">
          <img
            src="/images/jackson-portrait-640.webp"
            srcSet={PORTRAIT_SRCSET}
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 160px, 112px"
            width={800}
            height={1000}
            alt="Jackson Bryant"
            className="w-28 sm:w-40 lg:w-80 h-auto rounded-2xl shadow-xl shadow-black/30 border border-white/10"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
          <h1 className="font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white">
            Jackson Bryant
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-medium text-blue-400/90">Software Engineer</p>
          <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
            I build production websites and full-stack apps for nonprofits and small businesses,
            and I&apos;m finishing a B.S. in Software Engineering at Florida Gulf Coast University.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-8">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white btn-primary rounded-full shadow-md hover:brightness-110 transition-[filter] duration-200"
            >
              View projects <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3 text-sm font-medium text-slate-200 bg-white/5 border border-white/15 rounded-full hover:bg-white/10 hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
            <div className="flex items-center gap-2 sm:ml-2">
              <a
                href="https://www.linkedin.com/in/jacksonbryant-dev"
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="LinkedIn profile"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="https://github.com/JacksonBryantFGCU"
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="GitHub profile"
              >
                <FaGithub className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
