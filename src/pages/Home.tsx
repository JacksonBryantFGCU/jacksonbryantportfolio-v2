import { FaLinkedin, FaGithub } from "react-icons/fa";

const PORTRAIT_SRCSET =
  "/images/jackson-portrait-320.webp 320w, /images/jackson-portrait-640.webp 640w, /images/jackson-portrait-800.webp 800w";

const iconLink =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-muted hover:text-text";

export default function Home() {
  return (
    <section id="home" className="relative overflow-hidden pt-8 md:pt-40 pb-16 md:pb-20">
      {/* Soft light behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent/15 blur-[120px]"
      />

      <div className="container-page relative grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
        {/* Photo: small above the name on phones, beside the text on desktop */}
        <div className="lg:order-last lg:col-span-4">
          <img
            src="/images/jackson-portrait-640.webp"
            srcSet={PORTRAIT_SRCSET}
            sizes="(min-width: 1024px) 320px, 80px"
            width={800}
            height={1000}
            alt="Jackson Bryant"
            className="w-20 lg:w-80 lg:ml-auto h-auto rounded-[10px] lg:rounded-media border border-line"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="lg:col-span-8">
          <h1 className="font-display font-bold text-hero">Jackson Bryant</h1>
          <p className="mt-3 md:mt-5 font-display text-xl md:text-3xl font-medium tracking-tight text-text/80">
            Software Engineer
          </p>
          <p className="mt-4 md:mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted">
            I build production websites and full-stack apps for nonprofits and small businesses, and I&apos;m
            finishing a B.S. in Software Engineering at Florida Gulf Coast University.
          </p>

          <div className="mt-7 md:mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              View projects
            </a>
            <a href="#contact" className="btn-secondary">
              Contact
            </a>
            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
            <a
              href="https://www.linkedin.com/in/jacksonbryant-dev"
              target="_blank"
              rel="noopener noreferrer"
              className={iconLink}
              aria-label="LinkedIn profile"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a
              href="https://github.com/JacksonBryantFGCU"
              target="_blank"
              rel="noopener noreferrer"
              className={iconLink}
              aria-label="GitHub profile"
            >
              <FaGithub className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
