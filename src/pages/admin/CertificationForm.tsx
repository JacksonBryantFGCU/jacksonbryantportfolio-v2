// src/pages/admin/CertificationForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { certificationSchema } from "../../schemas/certificationSchema";
import type { CertificationFormValues } from "../../schemas/certificationSchema";
import { pb } from "../../lib/pocketbase";
import toast from "react-hot-toast";

type CertificationFormProps = {
  defaultValues?: Partial<CertificationFormValues>;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  submitText?: string;
};

export default function CertificationForm({
  defaultValues = {},
  onSubmit,
  loading,
  submitText = "Save",
}: CertificationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const internalSubmit = (values: CertificationFormValues) => {
    if (!pb.authStore.isValid || !pb.authStore.model) {
      toast.error("You must be logged in as a PocketBase admin to submit.");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("issuer", values.issuer);
    formData.append("issueDate", values.issueDate);

    if (values.expiration) formData.append("expiration", values.expiration);
    if (values.credentialUrl) formData.append("credentialUrl", values.credentialUrl);
    if (values.badgeImage instanceof File) {
      formData.append("badgeImage", values.badgeImage);
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(internalSubmit)}
      className="space-y-6 mx-auto max-w-xl"
    >
      <div>
        <label className="block mb-1 font-medium text-sm">Certificate Name</label>
        <input
          {...register("name")}
          className="bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Issuer</label>
        <input
          {...register("issuer")}
          className="bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.issuer && <p className="text-red-500 text-sm">{errors.issuer.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Issue Date</label>
        <input
          type="date"
          {...register("issueDate")}
          className="bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.issueDate && (
          <p className="text-red-500 text-sm">{errors.issueDate.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Expiration Date (optional)</label>
        <input
          type="date"
          {...register("expiration")}
          className="bg-neutral-800 p-2 border rounded w-full text-white"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Credential URL (optional)</label>
        <input
          type="url"
          {...register("credentialUrl")}
          className="bg-neutral-800 p-2 border rounded w-full text-white"
        />
        {errors.credentialUrl && (
          <p className="text-red-500 text-sm">{errors.credentialUrl.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Badge Image (optional)</label>
        <input type="file" {...register("badgeImage")} />
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