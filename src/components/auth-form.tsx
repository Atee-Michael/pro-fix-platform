"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createAuthSchema } from "@/lib/auth-schemas";
import { Link } from "@/i18n/routing";
import type { AuthActionState } from "@/app/[locale]/auth/actions";

type AuthFormMode = "login" | "register";

type AuthFormProps = {
  action: (
    state: AuthActionState,
    formData: FormData
  ) => Promise<AuthActionState>;
  mode: AuthFormMode;
  locale: "en" | "fr";
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  submitLabel: string;
  validationPlaceholder: string;
  backendPlaceholder: string;
  errorMessage: string;
  pendingLabel: string;
  registrationPendingMessage: string;
  alternatePrompt: string;
  alternateLinkLabel: string;
  validationMessages: {
    emailRequired: string;
    emailInvalid: string;
    passwordRequired: string;
    passwordMin: string;
  };
};

type FieldErrors = {
  email?: string;
  password?: string;
};

export function AuthForm({
  action,
  alternateLinkLabel,
  alternatePrompt,
  backendPlaceholder,
  emailLabel,
  emailPlaceholder,
  errorMessage,
  locale,
  mode,
  pendingLabel,
  passwordLabel,
  passwordPlaceholder,
  registrationPendingMessage,
  submitLabel,
  validationMessages,
  validationPlaceholder
}: AuthFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [clientMessage, setClientMessage] = useState(validationPlaceholder);
  const [state, formAction] = useActionState(action, {
    code: "idle"
  } as AuthActionState);
  const alternateHref = mode === "login" ? "/register" : "/login";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const result = createAuthSchema(validationMessages).safeParse({
      email: formData.get("email"),
      password: formData.get("password")
    });

    if (!result.success) {
      event.preventDefault();
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0]
      });
      setClientMessage(validationPlaceholder);
      return;
    }

    setErrors({});
    setClientMessage(backendPlaceholder);
  }

  const message =
    state.code === "error" || state.code === "invalid"
      ? errorMessage
      : state.code === "registrationPending"
        ? registrationPendingMessage
        : clientMessage;

  return (
    <form action={formAction} className="grid gap-4" noValidate onSubmit={handleSubmit}>
      <input name="locale" type="hidden" value={locale} />
      <label
        className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
        htmlFor={`${mode}-email`}
      >
        {emailLabel}
        <input
          aria-describedby={errors.email ? `${mode}-email-error` : undefined}
          aria-invalid={Boolean(errors.email)}
          className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
          id={`${mode}-email`}
          name="email"
          placeholder={emailPlaceholder}
          type="email"
        />
      </label>
      {errors.email ? (
        <p className="text-sm text-red-700 dark:text-red-300" id={`${mode}-email-error`}>
          {errors.email}
        </p>
      ) : null}

      <label
        className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
        htmlFor={`${mode}-password`}
      >
        {passwordLabel}
        <input
          aria-describedby={errors.password ? `${mode}-password-error` : undefined}
          aria-invalid={Boolean(errors.password)}
          className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/15 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
          id={`${mode}-password`}
          name="password"
          placeholder={passwordPlaceholder}
          type="password"
        />
      </label>
      {errors.password ? (
        <p
          className="text-sm text-red-700 dark:text-red-300"
          id={`${mode}-password-error`}
        >
          {errors.password}
        </p>
      ) : null}

      <SubmitButton pendingLabel={pendingLabel} submitLabel={submitLabel} />

      <p className="rounded-md border border-zinc-200 bg-zinc-100 p-3 text-sm leading-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
        {message}
      </p>

      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        {alternatePrompt}{" "}
        <Link
          className="font-semibold text-blue-800 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
          href={alternateHref}
        >
          {alternateLinkLabel}
        </Link>
      </p>
    </form>
  );
}

function SubmitButton({
  pendingLabel,
  submitLabel
}: {
  pendingLabel: string;
  submitLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-950/20 transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      {pending ? pendingLabel : submitLabel}
    </button>
  );
}
