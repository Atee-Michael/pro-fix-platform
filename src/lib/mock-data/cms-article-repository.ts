import type {
  CmsArticle,
  CmsArticleInput
} from "@/lib/mock-data/cms-articles";

export function createMockCmsArticle(input: CmsArticleInput): CmsArticle {
  const now = new Date().toISOString();
  return {
    ...input,
    id: `article-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    updatedAt: now
  };
}

export function updateMockCmsArticle(
  article: CmsArticle,
  input: CmsArticleInput
): CmsArticle {
  return { ...article, ...input, updatedAt: new Date().toISOString() };
}
