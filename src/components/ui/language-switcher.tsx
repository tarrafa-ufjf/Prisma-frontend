'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { FaGlobe } from 'react-icons/fa';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('Common');

  const nextLocale = locale === 'en' ? 'pt-BR' : 'en';
  const nextLocaleLabel = nextLocale === 'en' ? 'EN' : 'PT';

  const handleLocaleChange = () => {
    const query = Object.fromEntries(searchParams.entries());

    router.replace(
      {
        pathname,
        query,
      },
      { locale: nextLocale }
    );
  };

  return (
    <button
      type="button"
      onClick={handleLocaleChange}
      aria-label={t('changeLanguage')}
      title={t('changeLanguage')}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#5A6ACF] bg-transparent hover:bg-[#707FDD1A] transition-all duration-200"
    >
      <FaGlobe className="w-5 h-5" />
      <span>{nextLocaleLabel}</span>
    </button>
  );
}
