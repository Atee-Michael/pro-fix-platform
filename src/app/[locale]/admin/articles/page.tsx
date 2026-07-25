"use client";

import { useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import { Link } from "@/i18n/routing";
import { useCmsArticles } from "@/components/cms/cms-article-provider";

export default function AdminArticlesPage() {
  const t = useTranslations("admin.cms");
  const format = useFormatter();
  const { articles, deleteArticle, setPublicationState } = useCmsArticles();
  const [search, setSearch] = useState("");
  const [state, setState] = useState("all");
  const query = search.trim().toLocaleLowerCase();
  const filtered = articles.filter(
    (article) =>
      (!query ||
        [article.title, article.slug, article.author, article.category]
          .join(" ")
          .toLocaleLowerCase()
          .includes(query)) &&
      (state === "all" || article.state === state)
  );

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">
        <div>
          <Badge>{t("eyebrow")}</Badge>
          <h1 className="mt-4 text-3xl font-bold">{t("title")}</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">{t("description")}</p>
        </div>
        <Link href="/admin/articles/new">
          <Button>{t("actions.new")}</Button>
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          {t("filters.search")}
          <input
            className="h-11 rounded-md border border-zinc-300 bg-white px-3 dark:border-zinc-700 dark:bg-zinc-950"
            onChange={(event) => setSearch(event.target.value)}
            value={search}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          {t("filters.state")}
          <select
            className="h-11 rounded-md border border-zinc-300 bg-white px-3 dark:border-zinc-700 dark:bg-zinc-950"
            onChange={(event) => setState(event.target.value)}
            value={state}
          >
            <option value="all">{t("filters.allStates")}</option>
            <option value="draft">{t("states.draft")}</option>
            <option value="published">{t("states.published")}</option>
          </select>
        </label>
      </div>
      <div className="mt-6 grid gap-4">
        {filtered.map((article) => (
          <Card key={article.id}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{t(`states.${article.state}`)}</Badge>
                  <Badge>{t(`languages.${article.language}`)}</Badge>
                </div>
                <h2 className="mt-3 text-xl font-semibold">{article.title}</h2>
                <p className="mt-1 font-mono text-xs text-zinc-500">/{article.slug}</p>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                  {article.excerpt}
                </p>
                {article.publishedAt && (
                  <p className="mt-3 text-xs text-zinc-500">
                    {format.dateTime(new Date(article.publishedAt), {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/articles/${article.id}/edit`}>
                  <Button variant="secondary">{t("actions.edit")}</Button>
                </Link>
                <Button
                  onClick={() =>
                    setPublicationState(
                      article.id,
                      article.state === "published" ? "draft" : "published"
                    )
                  }
                  variant="secondary"
                >
                  {article.state === "published"
                    ? t("actions.unpublish")
                    : t("actions.publish")}
                </Button>
                <Button
                  className="text-red-700 dark:text-red-300"
                  onClick={() => {
                    if (window.confirm(t("delete.confirm"))) deleteArticle(article.id);
                  }}
                  variant="ghost"
                >
                  {t("actions.delete")}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
