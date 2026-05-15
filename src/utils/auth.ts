import { AuthResponse, AuthUser } from "@/types/auth";
import { api } from "@/utils/api";
import axios from "axios";

export async function login(email: string, password: string, rememberMe = false) {
    try {
        const response = await api.post<AuthResponse>('/auth/login', {
            email,
            password,
            remember_me: rememberMe,
        });

        return { user: response.data.user, error: null };
    } catch (error) {
        return {
            user: null,
            error: axios.isAxiosError(error)
                ? error.response?.data?.error ?? error.message
                : 'Erro ao fazer login',
        };
    }
}

export async function signOut() {
    await api.post('/auth/logout');
}

export async function getCurrentUser(): Promise<AuthUser | null> {
    try {
        const response = await api.get<AuthResponse>('/auth/me');
        return response.data.user;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            return null;
        }

        throw error;
    }
}
