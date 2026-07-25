"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components";
import { useRouter } from "@/i18n/routing";
import { AdminArticleForm } from "@/components/cms/admin-article-form";
import { useCmsArticles } from "@/components/cms/cms-article-provider";

export default function NewArticlePage() {
  const t = useTranslations("admin.cms");
  const router = useRouter();
  const { articles, createArticle } = useCmsArticles();
  return (
    <div>
      <Badge>{t("eyebrow")}</Badge>
      <h1 className="mt-4 text-3xl font-bold">{t("new.title")}</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">{t("new.description")}</p>
      <AdminArticleForm
        existingArticles={articles}
        onCancel={() => router.push("/admin/articles")}
        onSubmit={(input) => {
          const article = createArticle(input);
          router.push(`/admin/articles/${article.id}/edit`);
        }}
      />
    </div>
  );
}
