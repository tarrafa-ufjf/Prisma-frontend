'use client';

import { useEffect, useState } from 'react';
import { AuthUser } from '@/types/auth';
import { getCurrentUser } from '@/utils/auth';

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        getCurrentUser()
            .then((user) => {
                if (isMounted) {
                    setUser(user);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setUser(null);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return { user, loading };
}
