import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import resumePDF from "/jackson-bryant-resume-fall-2026.pdf";

const EMAIL = "jackbryant5589@gmail.com";

const TICKER = ["Software engineering internships", "Freelance websites", "Full-stack apps", "Based in Fort Myers, FL", "Let's talk"];

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jacksonbryant-dev" },
  { label: "GitHub", href: "https://github.com/JacksonBryantFGCU" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative pt-12 md:pt-20 pb-32 md:pb-10">
      {/* Ticker: two identical copies scroll left forever; decorative, so hidden from screen readers */}
      <div aria-hidden="true" className="overflow-hidden border-y border-line bg-ink/60 py-5 backdrop-blur-sm">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {TICKER.map((item) => (
                <span key={item} className="flex items-center font-display text-2xl md:text-4xl font-semibold tracking-tight">
                  <span className="px-8">{item}</span>
                  <span className="text-scan text-xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container-page pt-24 md:pt-36">
        <p className="label flex items-center gap-3" data-reveal>
          <span className="text-scan">[05]</span>
          <span className="h-px w-10 bg-line" aria-hidden="true" />
          Contact
        </p>
        <h2 id="contact-title" data-split className="mt-6 max-w-5xl font-display text-mega font-semibold">
          Let&apos;s build something real.
        </h2>

        <div className="mt-14 grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7" data-reveal>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m looking for software engineering internships, and I&apos;m open to freelance website projects.
              Email is the fastest way to reach me.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${EMAIL}`}
                data-magnetic
                className="group inline-flex items-center gap-3 font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight break-all"
              >
                <span className="underline decoration-line decoration-2 underline-offset-[10px] transition-colors duration-300 group-hover:decoration-scan">
                  {EMAIL}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 text-scan transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="btn-secondary px-4 py-2"
                aria-label={copied ? "Email address copied" : "Copy email address"}
              >
                {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>
          </div>

          <ul className="md:col-span-4 md:col-start-9 border-t border-line" data-reveal>
            {LINKS.map((link) => (
              <li key={link.label} className="border-b border-line">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 text-lg transition-colors duration-200 hover:text-scan"
                >
                  {link.label}
                  <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
            <li className="border-b border-line">
              <a
                href={resumePDF}
                download="Jackson Bryant Resume Fall 2026.pdf"
                className="group flex items-center justify-between py-4 text-lg transition-colors duration-200 hover:text-scan"
              >
                Resume (PDF)
                <ArrowUpRight size={18} aria-hidden="true" className="rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </li>
          </ul>
        </div>

        <footer className="label mt-28 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <p>© {new Date().getFullYear()} Jackson Bryant</p>
          <p className="hidden sm:block">Built with React, GSAP &amp; Three.js</p>
          <a href="#home" className="hover:text-text transition-colors duration-200">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
