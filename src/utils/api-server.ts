import { Curso } from "@/types/curso";
import axios from "axios";
import { cookies, headers } from "next/headers";

const publicApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'
const internalApiBaseUrl = process.env.API_INTERNAL_BASE_URL

async function getRequestCookieHeader() {
    const cookieStore = await cookies()
    return cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ')
}

async function getServerBaseUrl() {
    if (internalApiBaseUrl) {
        return internalApiBaseUrl
    }

    if (/^https?:\/\//.test(publicApiBaseUrl)) {
        return publicApiBaseUrl
    }

    const headerStore = await headers()
    const protocol = headerStore.get('x-forwarded-proto') ?? 'http'
    const host = headerStore.get('x-forwarded-host') ?? headerStore.get('host')

    if (!host) {
        return publicApiBaseUrl
    }

    return new URL(publicApiBaseUrl, `${protocol}://${host}`).toString()
}

export const api = axios.create({
    baseURL: publicApiBaseUrl,
    withCredentials: true,
    headers: {
        "Accept": "application/json"
    }
})

api.interceptors.request.use(async (config) => {
    config.baseURL = await getServerBaseUrl()

    const cookieHeader = await getRequestCookieHeader()

    if (cookieHeader) {
        config.headers.Cookie = cookieHeader
    }

    return config
})

export async function getCourses(): Promise<Curso[]> {
    const response = await api.get('/subjects/tutors')
    if (response.status != 200)
        return []
    return response.data.data.subjects
}
