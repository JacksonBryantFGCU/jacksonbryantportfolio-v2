// src/pages/admin/EditProject.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../../lib/pocketbase";
import ProjectForm from "./ProjectForm";
import type { ProjectFormValues } from "../../schemas/projectSchema";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: project, isLoading } = useQuery<ProjectFormValues>({
    queryKey: ["project", id],
    queryFn: async () => {
      const record = await pb.collection("projects").getOne(id!);
      return {
        title: record.title,
        description: record.description,
        techStack: record.techStack,
        repoUrl: record.repoUrl,
        demoUrl: record.demoUrl,
        image: undefined, // don't preload file
      };
    },
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await pb.collection("projects").update(id!, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      navigate("/admin/projects");
    },
  });

  if (isLoading || !project) return <p className="px-6 text-white">Loading...</p>;

  return (
    <section className="bg-background-dark px-6 py-16 min-h-screen text-white">
      <h1 className="mb-8 font-bold text-3xl">Edit Project</h1>
      <ProjectForm
        defaultValues={project}
        onSubmit={mutation.mutate}
        loading={mutation.isPending}
        submitText="Update"
      />
    </section>
  );
}