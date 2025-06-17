// src/pages/admin/NewCertification.tsx
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../../lib/pocketbase";
import CertificationForm from "./CertificationForm";
import { usePocketbaseLogin } from "../../hooks/usePocketbaseLogin";
import { toast } from "react-hot-toast";

export default function NewCertification() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoggedIn } = usePocketbaseLogin();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!isLoggedIn) {
        toast.error("❌ Not authenticated with PocketBase.");
        throw new Error("Not authenticated");
      }

      await pb.collection("certifications").create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-certifications"] });
      toast.success("✅ Certification created successfully!");
      navigate("/admin/certifications");
    },
    onError: () => {
      toast.error("❌ Failed to create certification.");
    },
  });

  return (
    <section className="bg-background-dark px-6 py-20 min-h-screen text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 pb-4 border-b border-border font-bold text-4xl text-center">
          Add New Certification
        </h1>
        <CertificationForm
          onSubmit={mutation.mutate}
          loading={mutation.isPending}
          submitText="Create"
        />
      </div>
    </section>
  );
}