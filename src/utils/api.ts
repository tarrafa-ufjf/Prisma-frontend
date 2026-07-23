import { Curso } from "@/types/curso";
import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'

export const api = axios.create({
    baseURL: base_url,
    withCredentials: true,
    headers: {
        "Accept": "application/json"
    }
})

export async function getCourses(): Promise<Curso[]> {
    const response = await api.get('/subjects/tutors')
    if (response.status != 200)
        return []
    return response.data.data.subjects
}
