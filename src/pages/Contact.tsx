import { useState } from "react";
import { Check, Copy } from "lucide-react";
import resumePDF from "/jackson-bryant-resume-fall-2026.pdf";

const EMAIL = "jackbryant5589@gmail.com";

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
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line pt-24 md:pt-32 pb-32 md:pb-12">
      <div className="container-page">
        <h2 id="contact-title" className="font-display text-5xl md:text-7xl font-semibold tracking-[-0.035em] leading-none">
          Get in touch
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          I&apos;m looking for software engineering internships, and I&apos;m open to freelance website projects. Email
          is the fastest way to reach me.
        </p>

        {/* Email with copy */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="font-display text-2xl md:text-3xl font-medium tracking-tight underline decoration-line underline-offset-8 transition-colors duration-200 hover:decoration-accent-soft"
          >
            {EMAIL}
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

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <li>
            <a href="https://www.linkedin.com/in/jacksonbryant-dev" target="_blank" rel="noopener noreferrer" className="text-link">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/JacksonBryantFGCU" target="_blank" rel="noopener noreferrer" className="text-link">
              GitHub
            </a>
          </li>
          <li>
            <a href={resumePDF} download="Jackson Bryant Resume Fall 2026.pdf" className="text-link">
              Download resume (PDF)
            </a>
          </li>
        </ul>

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted">
          <p>© {new Date().getFullYear()} Jackson Bryant</p>
          <a href="#home" className="hover:text-text transition-colors duration-200">
            Back to top
          </a>
        </footer>
      </div>
    </section>
  );
}
