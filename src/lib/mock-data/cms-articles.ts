import { getArticles } from "@/lib/news";
import type { Locale } from "@/i18n/routing";

export type ArticleState = "draft" | "published";
export type ArticleContentBlock = { type: "paragraph"; text: string };

export type CmsArticle = {
  id: string;
  language: Locale;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  featuredImage: string;
  content: ArticleContentBlock[];
  state: ArticleState;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
};

export type CmsArticleInput = Omit<
  CmsArticle,
  "id" | "createdAt" | "updatedAt" | "content"
> & {
  content: ArticleContentBlock[];
};

const publicationDates = [
  "2026-07-22T09:00:00.000Z",
  "2026-07-16T09:00:00.000Z",
  "2026-07-09T09:00:00.000Z",
  "2026-07-02T09:00:00.000Z",
  "2026-06-25T09:00:00.000Z"
];

function initialArticles(language: Locale): CmsArticle[] {
  return getArticles(language).map((article, index) => ({
    id: `article-${language}-${index + 1}`,
    language,
    title: article.title,
    slug: article.slug,
    excerpt: article.preview,
    category: article.category,
    author: "Pro-Fix editorial team",
    featuredImage: "",
    content: article.body.map((text) => ({ type: "paragraph" as const, text })),
    state: "published",
    publishedAt: publicationDates[index],
    createdAt: publicationDates[index],
    updatedAt: publicationDates[index],
    seoTitle: article.title,
    seoDescription: article.preview
  }));
}

export const mockCmsArticles: CmsArticle[] = [
  ...initialArticles("en"),
  ...initialArticles("fr"),
  {
    id: "article-draft-1",
    language: "en",
    title: "Preparing your vehicle for a longer journey",
    slug: "preparing-for-a-longer-journey",
    excerpt: "A practical checklist for a calm departure.",
    category: "Maintenance",
    author: "Pro-Fix editorial team",
    featuredImage: "",
    content: [
      {
        type: "paragraph",
        text: "This draft article is available only inside the mock CMS preview."
      }
    ],
    state: "draft",
    publishedAt: null,
    createdAt: "2026-07-24T10:00:00.000Z",
    updatedAt: "2026-07-24T10:00:00.000Z",
    seoTitle: "Preparing your vehicle for a longer journey",
    seoDescription: "A practical vehicle preparation checklist."
  }
];
