import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import resumePDF from "/JacksonBryantResume2025.pdf";
import LinkedinPhoto from "/LinkedinPhoto.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

export default function Home() {
  return (
    <section
      id="home"
      className="px-6 sm:px-16 pt-28 sm:pt-36 pb-20 border-b border-neutral-800 text-white"
    >
      <div className="flex lg:flex-row flex-col justify-between items-center max-w-7xl mx-auto">
        {/* Left Side - Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center lg:items-start w-full lg:w-1/2 lg:text-left text-center"
        >
          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white"
          >
            Jackson Bryant
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="mt-5 text-xl sm:text-2xl lg:text-3xl font-medium text-blue-400/90"
          >
            Fullstack Software Engineer
          </motion.h2>

          {/* Positioning Statement */}
          <motion.p
            variants={itemVariants}
            className="mt-5 text-slate-300 text-base sm:text-lg max-w-lg leading-relaxed"
          >
            I design and build performant web applications with a focus on intuitive interfaces and scalable architecture.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex sm:flex-row flex-col items-center gap-5 mt-10"
          >
            {/* Primary Button */}
            <a
              href={resumePDF}
              download="Jackson Bryant Resume 2025.pdf"
              className="px-6 py-3 text-sm font-medium tracking-wide text-white btn-primary rounded-full shadow-md hover:shadow-lg hover:brightness-110 hover:-translate-y-[2px] transition-all duration-300 ease-out"
              aria-label="Download Resume"
            >
              Download Resume
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/jacksonbryant-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-white/10 hover:-translate-y-[2px] transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="https://github.com/JacksonBryantFGCU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-white/10 hover:-translate-y-[2px] transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub className="text-lg" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center mt-14 lg:mt-0 w-full lg:w-1/2"
        >
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Gradient glow effect */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/15 via-transparent to-blue-400/10 blur-2xl" />

            <img
              src={LinkedinPhoto}
              alt="Jackson Bryant"
              className="relative rounded-xl w-72 sm:w-80 lg:w-96 shadow-xl shadow-black/30"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
