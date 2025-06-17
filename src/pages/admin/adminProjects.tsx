// src/pages/admin/AdminProjects.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../../lib/pocketbase";
import { usePocketbaseLogin } from "../../hooks/usePocketbaseLogin";
import { toast } from "react-hot-toast";
import AdminNavbar from "../../components/layout/AdminNavbar";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  github_link: string;
  live_link: string;
}

export default function AdminProjects() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoggedIn } = usePocketbaseLogin();

  useEffect(() => {
    if (!user) navigate("/sign-in");
    if (!isLoggedIn) {
      toast.error("You must authenticate with PocketBase to manage projects.");
      navigate("/admin");
    }
  }, [user, isLoggedIn, navigate]);

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery<Project[]>({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const records = await pb.collection("projects").getFullList(200);
      return records.map((record): Project => ({
        id: record.id,
        title: record.title,
        description: record.description,
        techStack: record.techStack,
        github_link: record.github_link,
        live_link: record.live_link,
      }));
    },
    enabled: isLoggedIn, // only fetch if PB login is active
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await pb.collection("projects").delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("✅ Project deleted.");
    },
    onError: () => {
      toast.error("❌ Failed to delete project.");
    },
  });

  return (
    <>
      <AdminNavbar />
    <section className="bg-background-dark px-6 py-20 min-h-screen text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-10 font-bold text-white text-4xl text-center">
          Admin: Manage Projects
        </h1>

        <div className="flex justify-center mb-8">
          <button
            className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-xl font-medium text-white transition"
            onClick={() => navigate("/admin/projects/new")}
          >
            Add New Project
          </button>
        </div>

        {isLoading && (
          <p className="text-text-muted text-center">Loading projects...</p>
        )}
        {isError && (
          <p className="text-red-500 text-center">Error loading projects.</p>
        )}
        {!isLoading && projects.length === 0 && (
          <p className="text-text-muted text-center">No projects found.</p>
        )}

        <ul className="space-y-6">
          {projects.map((project) => (
            <li
              key={project.id}
              className="bg-neutral-900 p-6 border border-border rounded-2xl"
            >
              <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center">
                <div className="space-y-2">
                  <h2 className="font-semibold text-white text-xl">{project.title}</h2>
                  <p className="text-text-muted text-sm">{project.description}</p>
                </div>
                <div className="flex gap-4 mt-4 sm:mt-0">
                  <button
                    onClick={() => navigate(`/admin/projects/${project.id}/edit`)}
                    className="text-blue-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(project.id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
    </>
  );
}