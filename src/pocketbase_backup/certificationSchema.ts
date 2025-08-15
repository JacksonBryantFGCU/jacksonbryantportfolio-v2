import { z } from "zod";

export const certificationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"), // You can convert this to a date later
  expiration: z
    .preprocess((val) => val === "" ? undefined : val, z.string().optional()),
  credentialUrl: z
    .preprocess((val) => val === "" ? undefined : val, z.string().url("Must be a valid URL").optional()),
  badgeImage: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file || file instanceof File || typeof file === "string",
      {
        message: "Invalid image file",
      }
    ),
});

export type CertificationFormValues = z.infer<typeof certificationSchema>;
