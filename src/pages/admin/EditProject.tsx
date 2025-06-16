// src/pages/admin/EditProject.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../../lib/pocketbase";
import ProjectForm from "./ProjectForm";
import type { ProjectFormValues } from "../../schemas/projectSchema";
import { toast } from "react-hot-toast";
import { usePocketbaseLogin } from "../../hooks/usePocketbaseLogin";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoggedIn } = usePocketbaseLogin();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You must authenticate with PocketBase to edit projects.");
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  const { data: project, isLoading } = useQuery<ProjectFormValues>({
    queryKey: ["project", id],
    queryFn: async () => {
      const record = await pb.collection("projects").getOne(id!);
      return {
        title: record.title,
        description: record.description,
        techStack: record.techStack,
        github_link: record.github_link,
        live_link: record.live_link,
        image: undefined, // no preloaded file
      };
    },
    enabled: !!id && isLoggedIn, // only run if logged in
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await pb.collection("projects").update(id!, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("✅ Project updated successfully!");
      navigate("/admin/projects");
    },
    onError: () => {
      toast.error("❌ Failed to update project.");
    },
  });

  if (isLoading || !project) return <p className="px-6 text-white">Loading...</p>;

  return (
    <section className="bg-background-dark px-6 py-16 min-h-screen text-white">
      <h1 className="mb-8 font-bold text-3xl text-center">Edit Project</h1>
      <ProjectForm
        defaultValues={project}
        onSubmit={mutation.mutate}
        loading={mutation.isPending}
        submitText="Update"
      />
    </section>
  );
}