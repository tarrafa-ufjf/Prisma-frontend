import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

export async function middleware(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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

  //Tratamento do usuário deslogado
  if (!isAuthenticated) {
    if (request.nextUrl.pathname != "/login") {
      const response = NextResponse.redirect(new URL("/login", request.url));

      if (authSetCookie) {
        response.headers.set("set-cookie", authSetCookie);
      }

      return response;
    }
  } else {
    if (request.nextUrl.pathname == "/login") {
      const response = NextResponse.redirect(new URL("/", request.url));

      if (authSetCookie) {
        response.headers.set("set-cookie", authSetCookie);
      }

      return response;
    }
  }

  const response = NextResponse.next();

  if (authSetCookie) {
    response.headers.set("set-cookie", authSetCookie);
  }

  return response;
}
