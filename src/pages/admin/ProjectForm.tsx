import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../../schemas/projectSchema";
import type { ProjectFormValues } from "../../schemas/projectSchema";
import { useEffect } from "react";

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
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const techStackInput = watch("techStack");

  const internalSubmit = (values: ProjectFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("repoUrl", values.repoUrl);
    formData.append("demoUrl", values.demoUrl);
    values.techStack.forEach((tech: string, i: number) => {
      formData.append(`techStack[${i}]`, tech);
    });
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(internalSubmit)}
      className="space-y-6 mx-auto max-w-xl"
    >
      <div>
        <label className="block mb-1 font-medium text-sm">Title</label>
        <input
          {...register("title")}
          className="bg-background-light dark:bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Description</label>
        <textarea
          {...register("description")}
          className="bg-background-light dark:bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Tech Stack (comma separated)</label>
        <input
          value={techStackInput?.join(", ") ?? ""}
          onChange={(e) =>
            setValue("techStack", e.target.value.split(",").map(t => t.trim()))
          }
          className="bg-background-light dark:bg-neutral-800 p-2 border rounded w-full text-white"
          placeholder="e.g. React, TypeScript, Node.js"
        />
        {errors.techStack && <p className="text-red-500 text-sm">{errors.techStack.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Repo URL</label>
        <input
          {...register("repoUrl")}
          className="bg-background-light dark:bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.repoUrl && <p className="text-red-500 text-sm">{errors.repoUrl.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Demo URL</label>
        <input
          {...register("demoUrl")}
          className="bg-background-light dark:bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.demoUrl && <p className="text-red-500 text-sm">{errors.demoUrl.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Image Upload</label>
        <input type="file" {...register("image")} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary disabled:opacity-50 px-6 py-2 rounded text-white"
      >
        {submitText}
      </button>
    </form>
  );
}