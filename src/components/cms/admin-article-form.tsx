"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/components";
import {
  cmsArticleFormSchema,
  generateArticleSlug
} from "@/lib/cms-article-schema";
import type {
  CmsArticle,
  CmsArticleInput
} from "@/lib/mock-data/cms-articles";

const inputClass =
  "h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-base outline-none focus:border-blue-700 dark:border-zinc-700 dark:bg-zinc-950";

export function AdminArticleForm({
  article,
  existingArticles,
  onCancel,
  onSubmit
}: {
  article?: CmsArticle;
  existingArticles: CmsArticle[];
  onCancel: () => void;
  onSubmit: (input: CmsArticleInput) => void;
}) {
  const t = useTranslations("admin.cms");
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState(false);
  const [body, setBody] = useState(
    article?.content.map((block) => block.text).join("\n\n") ?? ""
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const result = cmsArticleFormSchema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!next[field]) next[field] = issue.message;
      }
      setErrors(next);
      return;
    }
    const duplicate = existingArticles.some(
      (item) =>
        item.id !== article?.id &&
        item.language === result.data.language &&
        item.slug === result.data.slug
    );
    if (duplicate) {
      setErrors({ slug: "slugDuplicate" });
      return;
    }
    const publishedAt = result.data.publishedAt
      ? new Date(result.data.publishedAt).toISOString()
      : result.data.state === "published"
        ? new Date().toISOString()
        : null;
    const { body: bodyValue, ...articleValues } = result.data;
    onSubmit({
      ...articleValues,
      publishedAt,
      content: bodyValue
        .split(/\n\s*\n/)
        .map((text) => text.trim())
        .filter(Boolean)
        .map((text) => ({ type: "paragraph" as const, text }))
    });
  }

  const defaults = {
    language: article?.language ?? "en",
    excerpt: article?.excerpt ?? "",
    category: article?.category ?? "",
    author: article?.author ?? "Pro-Fix editorial team",
    featuredImage: article?.featuredImage ?? "",
    state: article?.state ?? "draft",
    publishedAt: article?.publishedAt
      ? article.publishedAt.slice(0, 16)
      : "",
    seoTitle: article?.seoTitle ?? "",
    seoDescription: article?.seoDescription ?? ""
  };

  return (
    <>
      <Card className="mt-8">
        <form className="grid gap-5" noValidate onSubmit={submit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field error={errors.language} label={t("fields.language")}>
              <select className={inputClass} defaultValue={defaults.language} name="language">
                <option value="en">{t("languages.en")}</option>
                <option value="fr">{t("languages.fr")}</option>
              </select>
            </Field>
            <Field error={errors.state} label={t("fields.state")}>
              <select className={inputClass} defaultValue={defaults.state} name="state">
                <option value="draft">{t("states.draft")}</option>
                <option value="published">{t("states.published")}</option>
              </select>
            </Field>
          </div>
          <Field error={errors.title} label={t("fields.title")}>
            <input
              className={inputClass}
              name="title"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </Field>
          <Field error={errors.slug} label={t("fields.slug")}>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                className={inputClass}
                name="slug"
                onChange={(event) => setSlug(event.target.value)}
                value={slug}
              />
              <Button
                onClick={() => setSlug(generateArticleSlug(title))}
                variant="secondary"
              >
                {t("actions.generateSlug")}
              </Button>
            </div>
          </Field>
          <Field error={errors.excerpt} label={t("fields.excerpt")}>
            <textarea
              className={`${inputClass} min-h-28 py-3`}
              defaultValue={defaults.excerpt}
              name="excerpt"
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field error={errors.category} label={t("fields.category")}>
              <input className={inputClass} defaultValue={defaults.category} name="category" />
            </Field>
            <Field error={errors.author} label={t("fields.author")}>
              <input className={inputClass} defaultValue={defaults.author} name="author" />
            </Field>
          </div>
          <Field error={errors.featuredImage} label={t("fields.featuredImage")}>
            <input
              className={inputClass}
              defaultValue={defaults.featuredImage}
              name="featuredImage"
              placeholder={t("featuredImagePlaceholder")}
            />
          </Field>
          <Field error={errors.body} label={t("fields.body")}>
            <textarea
              className={`${inputClass} min-h-64 py-3`}
              name="body"
              onChange={(event) => setBody(event.target.value)}
              value={body}
            />
            <span className="text-xs font-normal text-zinc-500">
              {t("bodyHelp")}
            </span>
          </Field>
          <Field error={errors.publishedAt} label={t("fields.publishedAt")}>
            <input
              className={inputClass}
              defaultValue={defaults.publishedAt}
              name="publishedAt"
              type="datetime-local"
            />
          </Field>
          <div className="border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <h2 className="text-xl font-semibold">{t("seo.title")}</h2>
            <div className="mt-4 grid gap-5">
              <Field error={errors.seoTitle} label={t("fields.seoTitle")}>
                <input className={inputClass} defaultValue={defaults.seoTitle} name="seoTitle" />
              </Field>
              <Field error={errors.seoDescription} label={t("fields.seoDescription")}>
                <textarea
                  className={`${inputClass} min-h-24 py-3`}
                  defaultValue={defaults.seoDescription}
                  name="seoDescription"
                />
              </Field>
            </div>
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button onClick={onCancel} variant="secondary">
              {t("actions.cancel")}
            </Button>
            <Button onClick={() => setPreview((value) => !value)} variant="secondary">
              {preview ? t("actions.hidePreview") : t("actions.preview")}
            </Button>
            <Button type="submit">{t("actions.save")}</Button>
          </div>
        </form>
      </Card>
      {preview && (
        <Card className="mt-6">
          <Badge>{t("preview.badge")}</Badge>
          <h2 className="mt-4 text-3xl font-bold">{title || t("preview.untitled")}</h2>
          <div className="mt-6 space-y-4 leading-7">
            {body
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </Card>
      )}
    </>
  );

  function Field({
    children,
    error,
    label
  }: {
    children: React.ReactNode;
    error?: string;
    label: string;
  }) {
    return (
      <label className="grid gap-2 text-sm font-semibold">
        {label}
        {children}
        {error && (
          <span className="font-normal text-red-700 dark:text-red-300">
            {t(`validation.${error}`)}
          </span>
        )}
      </label>
    );
  }
}
