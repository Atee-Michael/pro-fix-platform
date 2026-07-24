"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { routing } from "@/i18n/routing";
import {
  createClient,
  createServiceRoleClient
} from "@/lib/supabase/server";

export type AuthActionState = {
  code: "idle" | "invalid" | "error" | "registrationPending";
};

const credentialsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
  locale: z.enum(routing.locales)
});

export async function login(
  _state: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const credentials = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    locale: formData.get("locale")
  });

  if (!credentials.success) {
    return { code: "invalid" };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.data.email,
      password: credentials.data.password
    });

    if (error) {
      return { code: "error" };
    }
  } catch {
    return { code: "error" };
  }

  redirect(`/${credentials.data.locale}/dashboard`);
}

export async function register(
  _state: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const credentials = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    locale: formData.get("locale")
  });

  if (!credentials.success) {
    return { code: "invalid" };
  }

  let hasSession = false;

  try {
    // Validate the privileged server configuration before creating an auth user.
    const admin = createServiceRoleClient();
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: credentials.data.email,
      password: credentials.data.password
    });

    // Existing accounts and unsuccessful sign-ups receive the same response.
    if (error || !data.user || data.user.identities?.length === 0) {
      return { code: "registrationPending" };
    }

    const { error: profileError } = await admin.from("profiles").insert({
      id: data.user.id,
      email: credentials.data.email,
      role: "customer"
    });

    if (profileError) {
      await admin.auth.admin.deleteUser(data.user.id);
      return { code: "error" };
    }

    hasSession = Boolean(data.session);
  } catch {
    return { code: "error" };
  }

  if (hasSession) {
    redirect(`/${credentials.data.locale}/dashboard`);
  }

  return { code: "registrationPending" };
}

export async function logout(formData: FormData) {
  const localeResult = z.enum(routing.locales).safeParse(formData.get("locale"));
  const locale = localeResult.success ? localeResult.data : routing.defaultLocale;

  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Always return to the public login route without exposing provider errors.
  }

  redirect(`/${locale}/login`);
}
