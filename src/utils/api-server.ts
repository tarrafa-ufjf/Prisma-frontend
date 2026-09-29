import { Curso } from "@/types/curso";
import axios from "axios";
import { cookies } from "next/headers";
import {
    mockCourses,
    mockTutorDetail,
} from "@/demo/mockData";

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

    if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
        const url = config.url || ""

        if (
            url.includes("analysis/tutors/subject/101/tutor/201/summary")
        ) {
            config.adapter = async () => ({
                data: {
                    data: {
                        tutor_summary: mockTutorDetail,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            })
        }
    }

    return config
})

export async function getCourses(): Promise<Curso[]> {
    if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
        return mockCourses
    }

    const response = await api.get('/subjects/tutors')
    if (response.status != 200)
        return []
    return response.data.data.subjects
}
