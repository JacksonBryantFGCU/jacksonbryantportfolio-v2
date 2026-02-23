// src/pages/FullPortfolioPage.tsx
import Navbar from "../components/layout/Navbar";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Certifications from "./Certifications";
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
        <section id="home"><Home /></section>
        <About />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
