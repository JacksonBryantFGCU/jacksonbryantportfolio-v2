// src/pages/Home.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black px-6 min-h-screen text-white text-center">
      <h1
        ref={titleRef}
        className="font-bold text-primary text-4xl sm:text-5xl"
      >
        Hi, I’m Jackson Bryant
      </h1>
      <p
        ref={subtitleRef}
        className="mt-4 max-w-xl text-text-muted text-lg sm:text-xl"
      >
        A software engineer passionate about building clean, scalable front-end applications.
      </p>
    </section>
  );
}