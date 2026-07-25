import { z } from "zod";

export function createAuthSchema(messages: {
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMin: string;
}) {
  return z.object({
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    password: z
      .string()
      .min(1, messages.passwordRequired)
      .min(8, messages.passwordMin)
  });
}
