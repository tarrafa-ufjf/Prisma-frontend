import { createClient } from "@/supabase/server-client";
import { Curso } from "@/types/curso";
import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL || ''

async function getSupabaseAccessToken() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getSession()

    return data.session?.access_token ?? null
}

export const api = axios.create({
    baseURL: base_url,
    headers: {
        "Accept": "application/json"
    }
})

api.interceptors.request.use(async (config) => {
    const token = await getSupabaseAccessToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export async function getCourses(): Promise<Curso[]> {
    const response = await api.get('/subjects/tutors')
    if (response.status != 200)
        return []
    return response.data.data.subjects
}
