"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  createMockCmsArticle,
  updateMockCmsArticle
} from "@/lib/mock-data/cms-article-repository";
import {
  mockCmsArticles,
  type CmsArticle,
  type CmsArticleInput
} from "@/lib/mock-data/cms-articles";
import type { Locale } from "@/i18n/routing";

type CmsContextValue = {
  articles: CmsArticle[];
  getArticle: (id: string) => CmsArticle | undefined;
  getPublishedBySlug: (locale: Locale, slug: string) => CmsArticle | undefined;
  createArticle: (input: CmsArticleInput) => CmsArticle;
  updateArticle: (id: string, input: CmsArticleInput) => void;
  deleteArticle: (id: string) => void;
  setPublicationState: (id: string, state: "draft" | "published") => void;
};

const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsArticleProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<CmsArticle[]>(() =>
    mockCmsArticles.map((article) => ({
      ...article,
      content: article.content.map((block) => ({ ...block }))
    }))
  );
  const getArticle = useCallback(
    (id: string) => articles.find((article) => article.id === id),
    [articles]
  );
  const getPublishedBySlug = useCallback(
    (locale: Locale, slug: string) =>
      articles.find(
        (article) =>
          article.language === locale &&
          article.slug === slug &&
          article.state === "published"
      ),
    [articles]
  );
  const createArticle = useCallback((input: CmsArticleInput) => {
    const article = createMockCmsArticle(input);
    setArticles((current) => [article, ...current]);
    return article;
  }, []);
  const updateArticle = useCallback((id: string, input: CmsArticleInput) => {
    setArticles((current) =>
      current.map((article) =>
        article.id === id ? updateMockCmsArticle(article, input) : article
      )
    );
  }, []);
  const deleteArticle = useCallback((id: string) => {
    setArticles((current) => current.filter((article) => article.id !== id));
  }, []);
  const setPublicationState = useCallback(
    (id: string, state: "draft" | "published") => {
      const now = new Date().toISOString();
      setArticles((current) =>
        current.map((article) =>
          article.id === id
            ? {
                ...article,
                state,
                publishedAt:
                  state === "published" ? article.publishedAt ?? now : null,
                updatedAt: now
              }
            : article
        )
      );
    },
    []
  );
  const value = useMemo(
    () => ({
      articles,
      getArticle,
      getPublishedBySlug,
      createArticle,
      updateArticle,
      deleteArticle,
      setPublicationState
    }),
    [
      articles,
      getArticle,
      getPublishedBySlug,
      createArticle,
      updateArticle,
      deleteArticle,
      setPublicationState
    ]
  );
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCmsArticles() {
  const context = useContext(CmsContext);
  if (!context) throw new Error("useCmsArticles must be used within CmsArticleProvider");
  return context;
}
