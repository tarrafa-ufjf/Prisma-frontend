import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!_next|api|.*\\..*).*)"],
};

export async function middleware(request: NextRequest) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    let isAuthenticated = false

    if (baseUrl) {
        try {
            const apiUrl = new URL(baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`)
            const response = await fetch(new URL('auth/me', apiUrl), {
                headers: {
                    Cookie: request.headers.get('cookie') ?? '',
                    Accept: 'application/json',
                },
            })

            isAuthenticated = response.ok
        } catch {
            isAuthenticated = false
        }
    }

    //Tratamento do usuário deslogado
    if (!isAuthenticated) {
        if (request.nextUrl.pathname != "/login") {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } else {
        if (request.nextUrl.pathname == "/login") {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next();
}
