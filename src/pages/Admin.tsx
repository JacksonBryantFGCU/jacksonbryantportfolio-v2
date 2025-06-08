import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Admin() {
  const { user } = useUser();
  const adminRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adminRef.current) {
      gsap.from(adminRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <section className="bg-background-light dark:bg-background-dark px-6 py-20 min-h-screen text-white">
      <div ref={adminRef} className="space-y-6 mx-auto max-w-4xl">
        <h2 className="font-bold text-primary dark:text-white text-4xl">Admin Dashboard</h2>
        <p className="text-text-muted dark:text-gray-400">
          Welcome, <span className="font-semibold">{user?.fullName}</span>.
        </p>

        <div className="space-y-4">
          <button className="bg-secondary hover:bg-secondary-dark px-4 py-2 rounded-xl text-white transition">
            Manage Projects
          </button>
          <button className="bg-secondary hover:bg-secondary-dark px-4 py-2 rounded-xl text-white transition">
            Update About Me
          </button>
          <button className="bg-secondary hover:bg-secondary-dark px-4 py-2 rounded-xl text-white transition">
            Upload Resume
          </button>
        </div>

        <div className="pt-8">
          <SignOutButton>
            <button className="text-red-500 hover:text-red-600 underline transition">
              Sign out
            </button>
          </SignOutButton>
        </div>
      </div>
    </section>
  );
}