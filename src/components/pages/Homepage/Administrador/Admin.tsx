'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import Button from '@/components/ui/button';
import { getCurrentUser } from '@/utils/auth';

export default function AdminButton() {
    const t = useTranslations('Home.adminButton');

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function checkAdmin() {
            try {
                const user = await getCurrentUser();

                if (user?.roles?.includes('admin')) {
                    setIsAdmin(true);
                }

            } catch (error) {
                console.error('Erro ao verificar permissões:', error);
            }
        }

        checkAdmin();
    }, []);

    if (!isAdmin) {
        return null;
    }

    return (
        <Button href="/administrador">
            {t('label')}
        </Button>
    );
}
