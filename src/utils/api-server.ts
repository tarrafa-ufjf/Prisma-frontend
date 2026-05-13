import { Curso } from "@/types/curso";
import axios from "axios";
import { cookies } from "next/headers";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL || ''

async function getRequestCookieHeader() {
    const cookieStore = await cookies()
    return cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ')
}

export const api = axios.create({
    baseURL: base_url,
    withCredentials: true,
    headers: {
        "Accept": "application/json"
    }
})

api.interceptors.request.use(async (config) => {
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
