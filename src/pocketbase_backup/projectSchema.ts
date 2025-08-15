import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  techStack: z.array(z.string()).min(1),
  github_link: z.string().url(),
  live_link: z.string().url(),
  image: z.any().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
