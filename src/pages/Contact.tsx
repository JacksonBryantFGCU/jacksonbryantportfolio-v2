import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FileText, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import resumePDF from "/JacksonBryantResume2025.pdf";

export default function Contact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative px-6 pt-20 pb-16 border-t border-white/10 scroll-mt-32"
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        {/* Name */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight"
        >
          Jackson Bryant
        </motion.h3>

        {/* Primary CTA Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto"
        >
          Let's build something amazing together. I'm open to freelance work and software engineering internships.
        </motion.p>

        {/* Secondary Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-3 text-slate-400 text-base max-w-xl mx-auto"
        >
          Feel free to reach out if you're looking for a reliable, driven developer.
        </motion.p>

        {/* Resume Download */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-8"
        >
          <a
            href={resumePDF}
            download="Jackson Bryant Resume 2025.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-500 hover:bg-blue-400 rounded-full shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]"
          >
            <FileText size={16} />
            Download Resume
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
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
            className="text-slate-400 hover:text-white text-xl transition-all duration-200 hover:scale-110"
            aria-label="Visit my LinkedIn Profile"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/JacksonBryantFGCU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white text-xl transition-all duration-200 hover:scale-110"
            aria-label="Visit my GitHub Profile"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:jacksonbryant.dev@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white text-xl transition-all duration-200 hover:scale-110"
            aria-label="Email Jackson Bryant"
          >
            <FaEnvelope />
          </a>
        </motion.div>

        {/* Back to Top */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 mt-14 text-slate-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
        >
          <ArrowUp size={14} />
          Back to Top
        </motion.button>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 text-slate-500 text-sm"
        >
          © 2025 Jackson Bryant. All rights reserved.
        </motion.p>
      </div>
    </section>
  );
}
