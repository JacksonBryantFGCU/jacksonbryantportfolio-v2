// src/pages/FullPortfolioPage.tsx
import Navbar from "../components/layout/Navbar";
import ProofStrip from "../components/ProofStrip";
import Home from "./Home";
import Projects from "./Projects";
import Experience from "./Experience";
import Education from "./Education";
import About from "./About";
import Contact from "./Contact";

export default function FullPortfolioPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          background: "linear-gradient(90deg, #121726 0%, #0c1122 30%, #060714 100%)",
        }}
        className="text-white"
      >
        <Home />
        <ProofStrip />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
    </>
  );
}
