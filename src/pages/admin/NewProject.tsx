// src/pages/admin/NewProject.tsx
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../../lib/pocketbase";
import ProjectForm from "./ProjectForm";

export default function NewProject() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await pb.collection("projects").create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      navigate("/admin/projects");
    },
  });

  return (
    <section className="bg-background-dark px-6 py-16 min-h-screen text-white">
      <h1 className="mb-8 font-bold text-3xl">Add New Project</h1>
      <ProjectForm onSubmit={mutation.mutate} loading={mutation.isPending} submitText="Create" />
    </section>
  );
}