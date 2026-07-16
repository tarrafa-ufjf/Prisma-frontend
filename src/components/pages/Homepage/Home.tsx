'use client';

import { useTranslations } from 'next-intl';
import Indicators from './Indicator/Indicators';
import DadosGerais from './DadosGerais/DadosGerais';
import HomeRanking from './ranking';
import AdminButton from './Administrador/Admin';
import MoodleWarning from "@/components/pages/administrador/moodleWarning";
import FloatingAssistantButton from './Chatbot/FloatingAssistantButton';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="flex-1 flex justify-center items-center pl-[240px]">
      <div className="BoxCurso">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col items-start">
              <h1 className="text-xl font-poppins font-semibold text-left">
                  {t('overview')}
              </h1>
              <p style={{ color: '#374DAA' }} className="text-left text-xl font-semibold">
                {t('institution')}
              </p>
          </div>

          <MoodleWarning />
          <AdminButton />
        </div>

        <div>
          <div className="center-wrapper flex flex-col justify-between gap-10 mb-5">
            <DadosGerais />

            <Indicators />

            <div className="flex flex-row space-x-5">
              <HomeRanking type='best-performance' />
              <HomeRanking type='at-risk' />
            </div>
          </div>
        </div>
      </div>

      <FloatingAssistantButton />
    </div>
  );
}