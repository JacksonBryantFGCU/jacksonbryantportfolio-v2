// src/pages/admin/NewProject.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../../lib/pocketbase";
import ProjectForm from "./ProjectForm";
import { toast } from "react-hot-toast";
import { usePocketbaseLogin } from "../../hooks/usePocketbaseLogin";

export default function NewProject() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoggedIn } = usePocketbaseLogin();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You must authenticate with PocketBase first.");
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const record = await pb.collection("projects").create(formData);
      return record;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("✅ Project created successfully!");
      navigate("/admin/projects");
    },
    onError: () => {
      toast.error("❌ Failed to create project. Try again.");
    },
  });

  return (
      <section className="bg-background-dark px-6 py-20 min-h-screen text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-10 pb-4 border-b border-border font-bold text-4xl text-center">
            Add New Project
          </h1>

          <ProjectForm
            onSubmit={mutation.mutate}
            loading={mutation.isPending}
            submitText="Create"
          />
        </div>
      </section>
  )
}