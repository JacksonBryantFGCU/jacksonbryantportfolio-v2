import React from "react";
import { Project } from "../constants/index.ts";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetails: React.FC<Props> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-3xl bg-[#15181F] border border-cyan-500 rounded-2xl p-6 overflow-y-auto max-h-[90vh]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes size={18} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-4">
              {project.title}
            </h2>

            {/* Image */}
            {project.image && (
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="rounded-lg mb-4"
              />
            )}

            {/* Long Description */}
            {project.details?.longDescription && (
              <p className="text-gray-300 mb-4">
                {project.details.longDescription}
              </p>
            )}

            {/* Architecture Image */}
            {project.details?.architectureImage && (
              <img
                src={project.details.architectureImage}
                alt="Architecture Diagram"
                className="rounded-lg mb-4"
              />
            )}

            {/* Video Demo */}
            {project.details?.videoDemo && (
              <video
                controls
                className="w-full rounded-lg mb-4"
                src={project.details.videoDemo}
              />
            )}

            {/* Challenges */}
            {project.details?.challenges && (
              <>
                <h4 className="text-white font-medium mb-1">Challenges</h4>
                <ul className="list-disc list-inside text-gray-400 mb-4">
                  {project.details.challenges.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Solutions */}
            {project.details?.solutions && (
              <>
                <h4 className="text-white font-medium mb-1">Solutions</h4>
                <ul className="list-disc list-inside text-gray-400">
                  {project.details.solutions.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetails;
