import { useQuery } from "@tanstack/react-query";
import { pb } from "../lib/pocketbase";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  github_link: string;
  live_link: string;
  image?: string;
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const records = await pb.collection("projects").getFullList<Project>(200, {
        sort: "-created", // ✅ Keep if you want newest first
      });

      return records.map((record) => ({
        id: record.id,
        title: record.title,
        description: record.description,
        techStack: record.techStack,
        github_link: record.github_link,
        live_link: record.live_link,
        image: record.image
          ? pb.files.getUrl(record, record.image) // ✅ Clean and safe file URL
          : undefined,
      }));
    },
  });
}
