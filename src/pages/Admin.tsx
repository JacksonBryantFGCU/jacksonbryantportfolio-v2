import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import PocketBaseLoginModal from "../pages/admin/PocketBaseLoginModal";
import { usePocketbaseLogin } from "../hooks/usePocketbaseLogin";
import AdminNavbar from "../components/layout/AdminNavbar";

export default function Admin() {
  useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, logout } = usePocketbaseLogin();

  return (
    <>
      <AdminNavbar />
      <section className="bg-background-dark px-6 py-20 min-h-screen text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-12 font-bold text-4xl text-center">Admin Dashboard</h1>

          <div className="flex flex-col items-center gap-6">
            {!isLoggedIn ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-xl font-medium text-white transition"
              >
                Authenticate with PocketBase
              </button>
            ) : (
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-medium text-white transition"
              >
                Log Out of PocketBase
              </button>
            )}

            <button
              onClick={() => navigate("/admin/projects")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium text-white transition w-full max-w-md"
            >
              Manage Projects
            </button>

            <button
              onClick={() => navigate("/admin/certifications")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium text-white transition w-full max-w-md"
            >
              Manage Certifications
            </button>

            <button
              onClick={() => signOut(() => navigate("/sign-in"))}
              className="mt-10 text-lg text-gray-400 hover:text-white transition"
            >
              Clerk: Log out completely
            </button>
          </div>
        </div>

        <PocketBaseLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>
    </>
  );
}