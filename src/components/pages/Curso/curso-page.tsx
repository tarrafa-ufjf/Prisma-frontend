'use client';

import { useTranslations } from 'next-intl';
import Indicators from './Indicator/Indicators';
import DadosGerais from './DadosGerais/DadosGerais';
import Graficos from './Graficos/graficos';
import Rankings from './rankings/ranking';
import { Curso as CursoType } from '@/types/curso';

type CursoPageProps = {
  curso: CursoType
};

export default function CursoPage({ curso }: CursoPageProps) {
  const t = useTranslations('Courses');

  return (
    <div className="flex-1 flex justify-center items-center pl-[240px]">
      <div className="BoxCurso">
        <div className="flex flex-row justify-between items-start w-full">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-poppins font-semibold text-left">{t('course')}</h1>
            <p style={{ color: '#374DAA' }} className="text-left text-xl font-semibold">
              {curso.fullname}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm text-right">{curso.period}</p>
            <p className="text-xl text-right font-poppins font-semibold">{curso.shortname}</p>
          </div>
        </div>
        <div>
          <div className="center-wrapper flex flex-col justify-between">
            <DadosGerais id={curso.id} />
            <Indicators id={curso.id} />
            <Graficos id={curso.id} />
            <Rankings id={curso.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
