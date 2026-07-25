import { z } from "zod";

export const articleSlugSchema = z
  .string()
  .trim()
  .min(1, "required")
  .max(100, "slugTooLong")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slugInvalid");

export const cmsArticleFormSchema = z.object({
  language: z.enum(["en", "fr"], { error: "required" }),
  title: z.string().trim().min(5, "titleMin").max(160, "titleMax"),
  slug: articleSlugSchema,
  excerpt: z.string().trim().min(10, "excerptMin").max(320, "excerptMax"),
  category: z.string().trim().min(2, "required").max(80, "categoryMax"),
  author: z.string().trim().min(2, "required").max(100, "authorMax"),
  featuredImage: z.string().trim().max(200, "imageMax"),
  body: z.string().trim().min(20, "bodyMin").max(12000, "bodyMax"),
  state: z.enum(["draft", "published"]),
  publishedAt: z.string(),
  seoTitle: z.string().trim().min(5, "titleMin").max(160, "titleMax"),
  seoDescription: z.string().trim().min(10, "excerptMin").max(320, "excerptMax")
});

export function generateArticleSlug(title: string) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}
