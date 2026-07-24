import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

function copySessionCookies(
  source: NextResponse,
  destination: NextResponse
) {
  source.cookies.getAll().forEach((cookie) => {
    destination.cookies.set(cookie);
  });

  return destination;
}

export default async function middleware(request: NextRequest) {
  const { response: sessionResponse, userId } = await updateSession(request);
  const dashboardMatch = request.nextUrl.pathname.match(
    /^\/(en|fr)\/dashboard(?:\/|$)/
  );

  if (dashboardMatch && !userId) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${dashboardMatch[1]}/login`;
    loginUrl.search = "";

    return copySessionCookies(
      sessionResponse,
      NextResponse.redirect(loginUrl)
    );
  }

  return copySessionCookies(sessionResponse, intlMiddleware(request));
}

export const config = {
  matcher: ["/", "/(en|fr)/:path*"]
};
