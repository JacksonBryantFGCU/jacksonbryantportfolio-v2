// src/pages/admin/ProjectForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../../schemas/projectSchema";
import type { ProjectFormValues } from "../../schemas/projectSchema";
import { useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";
import toast from "react-hot-toast";

type ProjectFormProps = {
  defaultValues?: Partial<ProjectFormValues>;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  submitText?: string;
};

export default function ProjectForm({
  defaultValues = {},
  onSubmit,
  loading,
  submitText = "Save",
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const [techStackString, setTechStackString] = useState("");

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
      setTechStackString(defaultValues.techStack?.join(", ") || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const internalSubmit = (values: ProjectFormValues) => {
    if (!pb.authStore.isValid || !pb.authStore.model) {
      toast.error("You must be logged in as a PocketBase admin to submit.");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("github_link", values.github_link);
    formData.append("live_link", values.live_link);

    values.techStack.forEach((tech, i) => {
      formData.append(`techStack[${i}]`, tech);
    });

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(internalSubmit)} className="space-y-6 mx-auto max-w-xl">
      <div>
        <label className="block mb-1 font-medium text-sm">Title</label>
        <input
          {...register("title")}
          className="bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Description</label>
        <textarea
          {...register("description")}
          className="bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Tech Stack (comma separated)</label>
        <input
          value={techStackString}
          onChange={(e) => {
            const stack = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
            setValue("techStack", stack);
            setTechStackString(e.target.value);
          }}
          className="bg-neutral-800 p-2 border rounded w-full text-white"
          placeholder="e.g. React, TypeScript, Node.js"
        />
        {errors.techStack && <p className="text-red-500 text-sm">{errors.techStack.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Repo URL</label>
        <input
          {...register("github_link")}
          className="bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.github_link && <p className="text-red-500 text-sm">{errors.github_link.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Demo URL</label>
        <input
          {...register("live_link")}
          className="bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.live_link && <p className="text-red-500 text-sm">{errors.live_link.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Image Upload</label>
        <input
          type="file"
          {...register("image")}
          className="text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary px-6 py-2 rounded text-white"
      >
        {submitText}
      </button>
    </form>
  );
}