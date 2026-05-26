'use client';

import { useAuth } from "@/hooks/useAuth";

export default function Page() {
    const { user, loading } = useAuth()
    console.log(user)
    return (
        <div>
            {loading ? (
                <h1>Carregando</h1>
            ) : (
                <h1>Olá, {user?.email}</h1>
            )}
        </div>
    );
};
