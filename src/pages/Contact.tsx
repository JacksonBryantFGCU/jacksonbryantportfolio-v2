import { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { ArrowUp, Check, Copy, Mail } from "lucide-react";
import { m } from "framer-motion";

const EMAIL = "jacksonbryant.dev@gmail.com";

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative px-6 pt-20 pb-32 md:pb-16 border-t border-neutral-800"
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        {/* Name */}
        <m.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight"
        >
          Get in touch
        </m.h2>

        {/* Primary CTA Text */}
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto"
        >
          I'm looking for software engineering internships, and I'm open to freelance website projects.
        </m.p>

        {/* Secondary Text */}
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-3 text-slate-400 text-base max-w-xl mx-auto"
        >
          Email is the fastest way to reach me.
        </m.p>

        {/* Email with copy */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 pl-5 pr-1.5 py-1.5"
        >
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-slate-100 hover:text-white">
            <Mail size={16} aria-hidden="true" className="text-slate-400" />
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/15"
            aria-label={copied ? "Email copied" : "Copy email address"}
          >
            {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <span className="sr-only" aria-live="polite">{copied ? "Email copied to clipboard" : ""}</span>
        </m.div>

        {/* Profiles */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex justify-center gap-6 mt-8"
        >
          <a
            href="https://www.linkedin.com/in/jacksonbryant-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors duration-200"
          >
            <FaLinkedin className="text-lg" aria-hidden="true" /> LinkedIn
          </a>
          <a
            href="https://github.com/JacksonBryantFGCU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors duration-200"
          >
            <FaGithub className="text-lg" aria-hidden="true" /> GitHub
          </a>
        </m.div>

        {/* Back to Top */}
        <m.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 mt-14 text-slate-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
        >
          <ArrowUp size={14} />
          Back to Top
        </m.button>

        {/* Copyright */}
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 text-slate-500 text-sm"
        >
          © {new Date().getFullYear()} Jackson Bryant. All rights reserved.
        </m.p>
      </div>
    </section>
  );
}
