// src/pages/admin/AdminProjects.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../../lib/pocketbase";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  demoUrl: string;
}

export default function AdminProjects() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
        repoUrl: record.repoUrl,
        demoUrl: record.demoUrl,
        }));
},
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await pb.collection("projects").delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });

  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user, navigate]);

  return (
    <section className="bg-background-dark px-6 py-16 min-h-screen text-white">
      <h1 className="mb-8 font-bold text-3xl">Admin: Projects</h1>

      {isLoading && <p>Loading projects...</p>}
      {isError && <p>Error loading projects.</p>}

      <button
        className="bg-blue-600 hover:bg-blue-700 mb-6 px-4 py-2 rounded text-white"
        onClick={() => navigate("/admin/projects/new")}
      >
        Add New Project
      </button>

      <ul className="space-y-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="bg-neutral-900 p-4 border border-border rounded"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-xl">{project.title}</h2>
              <div className="space-x-4">
                <button
                  onClick={() => navigate(`/admin/projects/${project.id}/edit`)}
                  className="text-blue-400 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(project.id)}
                  className="text-red-400 underline"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-text-muted text-sm">{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
