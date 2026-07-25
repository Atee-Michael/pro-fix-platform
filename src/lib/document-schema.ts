import { z } from "zod";
import {
  allowedDocumentExtensions,
  allowedDocumentMimeTypes,
  blockedExecutableExtensions,
  documentCategories,
  futureMaximumDocumentSizeBytes
} from "@/lib/mock-data/documents";

export const documentMetadataSchema = z.object({
  customerId: z.string().min(1, "required"),
  vehicleId: z.string().min(1, "required"),
  appointmentId: z.string().min(1, "required"),
  category: z.enum(documentCategories, { error: "required" }),
  title: z.string().trim().min(3, "titleMin").max(160, "titleMax"),
  notes: z.string().trim().max(2000, "notesMax")
});

export const documentFileSchema = z
  .object({
    name: z.string({ error: "fileRequired" }).min(1, "fileRequired"),
    type: z.string({ error: "fileRequired" }),
    size: z.number({ error: "fileRequired" }).nonnegative()
  })
  .superRefine((file, context) => {
    const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
    if (blockedExecutableExtensions.includes(extension as never)) {
      context.addIssue({ code: "custom", message: "executableBlocked" });
      return;
    }
    if (
      !allowedDocumentExtensions.includes(extension as never) ||
      !allowedDocumentMimeTypes.includes(file.type as never)
    ) {
      context.addIssue({ code: "custom", message: "fileType" });
    }
    if (file.size > futureMaximumDocumentSizeBytes) {
      context.addIssue({ code: "custom", message: "fileSize" });
    }
  });
