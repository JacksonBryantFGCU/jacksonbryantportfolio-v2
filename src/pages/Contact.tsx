import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FileText } from "lucide-react";
import resumePDF from "/JacksonBryantResume2025.pdf";

export default function Contact() {
  return (
    <section id="contact" className="z-0 relative px-6 pb-12 pt-20 scroll-mt-32">
      <div className="z-10 relative px-4 sm:px-8 text-white">
        <h3 className="text-white font-semibold text-3xl sm:text-4xl text-center">
          Jackson Bryant
        </h3>

        <p className="mx-auto mt-8 max-w-xl text-neutral-300 text-sm sm:text-base text-center">
          Let's build something amazing together. I'm open to freelance work and software engineering internships.
        </p>

        <p className="mx-auto mt-4 max-w-xl text-neutral-400 text-sm sm:text-base text-center">
          Feel free to reach out if you're looking for a reliable, driven developer.
        </p>

        {/* Resume Download */}
        <div className="flex justify-center mt-8">
          <a
            href={resumePDF}
            download="Jackson Bryant Resume 2025.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-500/80 hover:bg-blue-500 rounded-full transition-all duration-300 hover:-translate-y-[1px]"
          >
            <FileText size={16} />
            Download Resume
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-8 text-2xl">
          <a
            href="https://www.linkedin.com/in/jacksonbryant-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover-accent-blue transition-colors"
            aria-label="Visit my Linkedin Profile"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/JacksonBryantFGCU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover-accent-blue transition-colors"
            aria-label="Visit my GitHub Profile"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:jacksonbryant.dev@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover-accent-blue transition-colors"
            aria-label="Email Jackson Bryant"
          >
            <FaEnvelope />
          </a>
        </div>

        <p className="mt-8 text-neutral-500 text-sm text-center">
          © 2025 Jackson Bryant. All rights reserved.
        </p>
      </div>
    </section>
  );
}
