import { useQuery } from "@tanstack/react-query";
import { pb } from "../lib/pocketbase";

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const records = await pb.collection("experiences").getFullList({
        sort: "-startDate",
      });
      return records;
    },
  });
}