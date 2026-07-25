"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { useRouter } from "@/i18n/routing";
import { AdminArticleForm } from "@/components/cms/admin-article-form";
import { useCmsArticles } from "@/components/cms/cms-article-provider";

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("admin.cms");
  const router = useRouter();
  const { articles, getArticle, updateArticle } = useCmsArticles();
  const article = getArticle(id);
  if (!article) {
    return (
      <Card>
        <h1 className="text-2xl font-bold">{t("notFound")}</h1>
        <Button className="mt-5" onClick={() => router.push("/admin/articles")}>
          {t("actions.back")}
        </Button>
      </Card>
    );
  }
  return (
    <div>
      <Badge>{t(`states.${article.state}`)}</Badge>
      <h1 className="mt-4 text-3xl font-bold">{t("edit.title")}</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">{t("edit.description")}</p>
      <AdminArticleForm
        article={article}
        existingArticles={articles}
        onCancel={() => router.push("/admin/articles")}
        onSubmit={(input) => {
          updateArticle(article.id, input);
          router.push("/admin/articles");
        }}
      />
    </div>
  );
}
