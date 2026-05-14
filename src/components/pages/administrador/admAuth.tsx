'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getCurrentUser } from '@/utils/auth';

interface Props {
    children: React.ReactNode;
}

export default function AdminAuth({ children }: Props) {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        async function verifyAdmin() {
            try {
                const user = await getCurrentUser();

                if (!user) {
                    router.replace('/');
                    return;
                }

                const isAdmin = user.roles?.includes('admin');

                if (!isAdmin) {
                    router.replace('/');
                    return;
                }

                setAuthorized(true);

            } catch (error) {
                console.error('Erro ao verificar acesso:', error);
                router.replace('/');
            } finally {
                setLoading(false);
            }
        }

        verifyAdmin();
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Carregando...
            </div>
        );
    }

    if (!authorized) {
        return null;
    }

    return <>{children}</>;
}