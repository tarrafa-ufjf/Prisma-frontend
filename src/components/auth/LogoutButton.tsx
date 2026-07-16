'use client';

import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { signOut } from '@/utils/auth';
import { FiLogOut } from 'react-icons/fi';

interface LogoutButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export default function LogoutButton({ className = "", children }: LogoutButtonProps) {
    const t = useTranslations('Common');
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut();
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#5A6ACF] bg-transparent hover:bg-red-50 hover:text-red-600 transition-all duration-200 ${className}`}
        >
            <FiLogOut className="w-5 h-5" />
            <span>{children ?? t('logout')}</span>
        </button>
    );
}
