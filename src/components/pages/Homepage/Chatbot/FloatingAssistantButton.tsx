'use client';

import { Sparkles } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function FloatingAssistantButton() {

  const router = useRouter();
  const t = useTranslations('Chatbot');

  return (
    <button
      onClick={() => router.push('/chatbot')}
      aria-label={t('openAssistant')}
      title={t('openAssistant')}
      className="
        fixed
        bottom-8
        right-8
        z-50
        group
      "
    >
      <div
        className="
          flex items-center gap-3
          px-5 py-4
          rounded-full
          shadow-lg
          transition-all
          duration-300
          hover:scale-105
          bg-gradient-to-r
          from-[#6C7BFF]
          to-[#B8A8FF]
        "
      >
        <Sparkles
          size={18}
          className="text-white"
        />

        <span
          className="
            text-white
            font-medium
            text-sm
          "
        >
          {t('buttonLabel')}
        </span>
      </div>
    </button>
  );
}
