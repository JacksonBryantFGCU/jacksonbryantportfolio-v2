// src/pages/admin/AdminCertifications.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../../lib/pocketbase";
import { usePocketbaseLogin } from "../../hooks/usePocketbaseLogin";
import { toast } from "react-hot-toast";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiration?: string;
  credentialUrl?: string;
  badgeImage?: string;
}

export default function AdminCertifications() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoggedIn } = usePocketbaseLogin();

  useEffect(() => {
    if (!user) navigate("/sign-in");
    if (!isLoggedIn) {
      toast.error("You must authenticate with PocketBase to manage certifications.");
      navigate("/admin");
    }
  }, [user, isLoggedIn, navigate]);

  const {
    data: certifications = [],
    isLoading,
    isError,
  } = useQuery<Certification[]>({
    queryKey: ["admin-certifications"],
    queryFn: async () => {
      const records = await pb.collection("certifications").getFullList(200);
      return records.map((record): Certification => ({
        id: record.id,
        name: record.name,
        issuer: record.issuer,
        issueDate: record.issueDate,
        expiration: record.expiration,
        credentialUrl: record.credentialUrl,
        badgeImage: record.badgeImage,
      }));
    },
    enabled: isLoggedIn,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await pb.collection("certifications").delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-certifications"] });
      toast.success("✅ Certification deleted.");
    },
    onError: () => {
      toast.error("❌ Failed to delete certification.");
    },
  });

  return (
    <section className="bg-background-dark px-6 py-20 min-h-screen text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-10 font-bold text-white text-4xl text-center">
          Admin: Manage Certifications
        </h1>

        <div className="flex justify-center mb-8">
          <button
            className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-xl font-medium text-white transition"
            onClick={() => navigate("/admin/certifications/new")}
          >
            Add New Certification
          </button>
        </div>

        {isLoading && (
          <p className="text-text-muted text-center">Loading certifications...</p>
        )}
        {isError && (
          <p className="text-red-500 text-center">Error loading certifications.</p>
        )}

        {!isLoading && certifications.length === 0 && (
          <p className="text-text-muted text-center">No certifications found.</p>
        )}

        <ul className="space-y-6">
          {certifications.map((cert) => (
            <li
              key={cert.id}
              className="bg-neutral-900 p-6 border border-border rounded-2xl"
            >
              <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center">
                <div className="space-y-2">
                  <h2 className="font-semibold text-white text-xl">{cert.name}</h2>
                  <p className="text-text-muted text-sm">
                    {cert.issuer} · {cert.issueDate}
                  </p>
                </div>
                <div className="flex gap-4 mt-4 sm:mt-0">
                  <button
                    onClick={() => navigate(`/admin/certifications/${cert.id}/edit`)}
                    className="text-blue-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(cert.id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}