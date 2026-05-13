export interface AuthUser {
    id: number;
    email: string;
    active: boolean;
    roles: string[];
}

export interface AuthResponse {
    user: AuthUser;
}
