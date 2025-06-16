import { useQuery } from "@tanstack/react-query";
import { pb } from "../lib/pocketbase";

export function useCertifications() {
  return useQuery({
    queryKey: ["certifications"],
    queryFn: async () => {
      const records = await pb.collection("certifications").getFullList({
        sort: "-issueDate",
      });
      return records;
    },
  });
}