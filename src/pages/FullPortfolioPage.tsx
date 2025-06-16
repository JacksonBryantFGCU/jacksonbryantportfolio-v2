// src/pages/FullPortfolioPage.tsx
import Navbar from "../components/layout/Navbar";
import Home from "./Home";
import About from "./About";
import Technologies from "./Technologies";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Experience from "./Experience";
import Contact from "./Contact";

export default function FullPortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="bg-neutral-900 text-white">
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="tech"><Technologies /></section>
        <section id="projects"><Projects /></section>
        <section id="certifications"><Certifications /></section>
        <section id="experience"><Experience /></section>
        <section id="contact"><Contact /></section>
      </main>
    </>
  );
}