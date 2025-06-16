import { z } from "zod";

export const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  techStack: z.array(z.string()).optional(),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;