import { FaLinkedin, FaGithub } from "react-icons/fa";

const iconLink =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink/40 text-muted backdrop-blur transition-colors duration-200 hover:border-muted hover:text-text";

const NAME = ["Jackson", "Bryant"];

/*
 * The intro is pure CSS (.hero-char / .hero-fade in index.css), so it starts at first paint
 * instead of waiting for the JavaScript bundle; that keeps Largest Contentful Paint fast.
 */
export default function Home() {
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* HUD: instrument readouts in the corners */}
      <div className="container-page hidden md:flex justify-between pt-32" aria-hidden="true">
        <p className="label hero-fade [animation-delay:1000ms]">
          JB&nbsp;/&nbsp;Portfolio&nbsp;·&nbsp;2026
        </p>
        <p className="label text-right hero-fade [animation-delay:1100ms]">
          26.46° N&nbsp;&nbsp;81.77° W
          <br />
          Fort Myers, FL
        </p>
      </div>

      <div data-hero-content className="container-page mt-auto pt-24 pb-14 md:pb-20">
        <p className="hero-fade [animation-delay:500ms] mb-6 md:mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-ink/50 px-3.5 py-1.5 text-sm text-text/90 backdrop-blur"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-scan opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-scan" />
          </span>
          Open to software engineering internships
        </p>

        {/* Letters are separate spans for the animation; aria-label gives screen readers the plain name */}
        <h1 aria-label="Jackson Bryant" className="font-display font-bold text-hero">
          {NAME.map((word, w) => (
            <span key={word}>
              {w > 0 && " "}
              {/* Each line is a mask the letters rise out of; the padding stops tight tracking clipping the last glyph */}
              <span
                aria-hidden="true"
                className={`block overflow-hidden pr-[0.12em] -mr-[0.12em] pb-[0.06em] -mb-[0.06em] ${w > 0 ? "md:pl-[0.9em]" : ""}`}
              >
                {[...word].map((char, i) => (
                  <span
                    key={i}
                    className="hero-char inline-block"
                    style={{ animationDelay: `${100 + (w * NAME[0].length + i) * 40}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 md:mt-12 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="hero-fade [animation-delay:650ms] md:col-span-6">
            <p className="label text-scan">Software Engineer · FGCU &apos;27</p>
            <p className="mt-3 max-w-xl text-base md:text-lg leading-relaxed text-muted">
              I build production websites and full-stack apps for nonprofits and small businesses, and I&apos;m
              finishing a B.S. in Software Engineering at Florida Gulf Coast University.
            </p>
          </div>

          <div className="hero-fade [animation-delay:800ms] md:col-span-6 flex flex-wrap items-center gap-3 md:justify-end">
            <a href="#projects" className="btn-primary px-6 py-3" data-magnetic>
              View projects
            </a>
            <a href="#contact" className="btn-secondary px-6 py-3" data-magnetic>
              Contact
            </a>
            {/* Icons wrap together on narrow phones */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/jacksonbryant-dev"
                target="_blank"
                rel="noopener noreferrer"
                className={iconLink}
                aria-label="LinkedIn profile"
                data-magnetic
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="https://github.com/JacksonBryantFGCU"
                target="_blank"
                rel="noopener noreferrer"
                className={iconLink}
                aria-label="GitHub profile"
                data-magnetic
              >
                <FaGithub className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-fade [animation-delay:1200ms] mt-14 hidden md:flex items-center gap-4" aria-hidden="true">
          <span className="relative h-px w-16 overflow-hidden bg-line">
            <span className="absolute inset-y-0 left-0 w-1/3 animate-[scan_2.4s_ease-in-out_infinite] bg-scan" />
          </span>
          <span className="label">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
