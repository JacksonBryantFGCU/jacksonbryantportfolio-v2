// src/pages/admin/EditCertification.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../../lib/pocketbase";
import CertificationForm from "./CertificationForm";
import type { CertificationFormValues } from "../../schemas/certificationSchema";
import { usePocketbaseLogin } from "../../hooks/usePocketbaseLogin";
import { toast } from "react-hot-toast";

export default function EditCertification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoggedIn } = usePocketbaseLogin();

  const {
    data: certification,
    isLoading,
    isError,
  } = useQuery<CertificationFormValues>({
    queryKey: ["certification", id],
    queryFn: async () => {
      const record = await pb.collection("certifications").getOne(id as string);
      return {
        name: record.name,
        issuer: record.issuer,
        issueDate: record.issueDate,
        expiration: record.expiration,
        credentialUrl: record.credentialUrl,
        badgeImage: undefined, // do not preload file
      };
    },
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!isLoggedIn) {
        toast.error("❌ Not authenticated with PocketBase.");
        throw new Error("Not authenticated");
      }

      await pb.collection("certifications").update(id as string, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certification", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-certifications"] });
      toast.success("✅ Certification updated successfully!");
      navigate("/admin/certifications");
    },
    onError: () => {
      toast.error("❌ Failed to update certification.");
    },
  });

  return (
    <section className="bg-background-dark px-6 py-20 min-h-screen text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 pb-4 border-b border-border font-bold text-4xl text-center">
          Edit Certification
        </h1>

        {isLoading && <p className="text-center text-text-muted">Loading...</p>}
        {isError && (
          <p className="text-center text-red-500">Error loading certification.</p>
        )}
        {certification && (
          <CertificationForm
            defaultValues={certification}
            onSubmit={mutation.mutate}
            loading={mutation.isPending}
            submitText="Update"
          />
        )}
      </div>
    </section>
  );
}