import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

function getPathInfo(pathname: string) {
  const [, maybeLocale] = pathname.split("/");
  const hasLocalePrefix = routing.locales.some((locale) => locale === maybeLocale);
  const locale = hasLocalePrefix ? maybeLocale : routing.defaultLocale;
  const pathnameWithoutLocale = hasLocalePrefix
    ? pathname.replace(`/${maybeLocale}`, "") || "/"
    : pathname;

  return {
    locale,
    pathnameWithoutLocale,
    localePrefix:
      hasLocalePrefix && locale !== routing.defaultLocale ? `/${locale}` : "",
  };
}

function localizedUrl(request: NextRequest, pathname: string, localePrefix: string) {
  return new URL(`${localePrefix}${pathname}`, request.url);
}

function withAuthCookie(response: NextResponse, authSetCookie: string | null) {
  if (authSetCookie) {
    response.headers.set("set-cookie", authSetCookie);
  }

  return response;
}

export async function middleware(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { pathnameWithoutLocale, localePrefix } = getPathInfo(
    request.nextUrl.pathname
  );
  let isAuthenticated = false;
  let authSetCookie: string | null = null;

  if (baseUrl) {
    try {
      const apiUrl = new URL(baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
      const response = await fetch(new URL("auth/me", apiUrl), {
        headers: {
          Cookie: request.headers.get("cookie") ?? "",
          Accept: "application/json",
        },
        cache: "no-store",
      });

      isAuthenticated = response.ok;
      authSetCookie = response.headers.get("set-cookie");
    } catch {
      isAuthenticated = false;
    }
  }

  // Tratamento do usuario deslogado
  if (!isAuthenticated) {
    if (pathnameWithoutLocale !== "/login") {
      const response = NextResponse.redirect(
        localizedUrl(request, "/login", localePrefix)
      );

      return withAuthCookie(response, authSetCookie);
    }
  } else {
    if (pathnameWithoutLocale === "/login") {
      const response = NextResponse.redirect(
        localizedUrl(request, "/", localePrefix)
      );

      return withAuthCookie(response, authSetCookie);
    }
  }

  return withAuthCookie(intlMiddleware(request), authSetCookie);
}
