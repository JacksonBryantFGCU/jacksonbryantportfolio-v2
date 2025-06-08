import { useQuery } from "@tanstack/react-query";
import { pb, baseUrl } from "../lib/pocketbase";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  demoUrl: string;
  image?: string;
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const records = await pb.collection("projects").getFullList(200, {
          // sort: "-created", // ⛔ remove or validate
        });

        return records.map((record) => ({
          id: record.id,
          title: record.title,
          description: record.description,
          techStack: record.techStack,
          repoUrl: record.repoUrl,
          demoUrl: record.demoUrl,
          image:
            record.image && record.image !== ""
              ? `${baseUrl}/api/files/projects/${record.id}/${record.image}`
              : undefined,
        }));
      } catch (err) {
        console.error("❌ PocketBase fetch error:", err);
        throw err;
      }
    },
  });
}