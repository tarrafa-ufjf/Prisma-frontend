import styles from './Indicators.module.css';
import alunoIcon from './aluno.png';
import alunoIcon2 from './baixados2.png';
import alunoIcon3 from './baixados.png';
import alunoIcon1 from './baixados1.png';
import alunoIcon5 from './evasion.png';
import cognitive_depth from './cognitive_depth.png';
import Image from 'next/image';
import { Aluno as AlunoType, Tab } from "@/types/aluno";
import * as React from "react";
import AlunoRow from '@/components/template/alunoRow';
import ScrollableTabs from '@/components/template/indicadoresTabs';
import { Tooltip } from '@/components/template/tooltip';
import { getIndicatorsInfo } from '@/utils/indicatorsInfo';
import { api } from '@/utils/api';

interface IndicatorsProps {
  aluno: AlunoType;
  cursoSelecionado: number | null;
};

type Indicadores = {
  performance: string;
  cognitive: string;
  engagement: string;
  motivation: string;
  give_up: boolean;
};

const formatarIndicador = (texto?: string) => {
  if (!texto) return "";

  return texto
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
};

export const getNivel = (nivel: number) => {
  switch (nivel) {
    case 1: return "Muito Baixo";
    case 2: return "Baixo";
    case 3: return "Médio";
    case 4: return "Alto";
    case 5: return "Muito Alto";
    default: return "Não definido";
  }
};

export const getDesistencia = (flag: boolean) => flag ? "Sim" : "Não";

const tabs: Tab[] = [
  'Interação Avaliativa',
  'Interação Não Avaliativa',
  'Desempenho',
  'Profundidade Cognitiva',
  // 'Relação Aluno-Professor',
  'Desistência'
];

export default function Indicators({ aluno, cursoSelecionado }: IndicatorsProps) {
  const [activeTab, setActiveTab] = React.useState<Tab>("Interação Avaliativa");
  const [indicadores, setIndicadores] = React.useState<Indicadores | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await api.get(
          `analysis/subject/${cursoSelecionado}/student/${aluno.id}/indicators`
        );

        const data =
          response.data?.data.indicators || null;

        setIndicadores(data);

      } catch (error) {
        console.error("Erro ao buscar nota final:", error);
      } finally {
        setLoading(false);
      }
    }

    if (cursoSelecionado && aluno?.id) {
      fetchData();
    }
  }, [cursoSelecionado, aluno?.id]); 

  if (loading) {
    return <p className="text-sm">Carregando...</p>;
  }

  if (!indicadores) {
    return <p className="text-sm">Indicadores não encontrados.</p>;
  }
  console.log("Indicadores recebidos:", indicadores);

  return (
    <div className="Box my-6">
      <div className="maincurso">
        <div className="mt-10 ml-10 mb-5">
          <h1 className="text-xl font-poppins font-semibold text-left">Indicadores</h1>
          <p style={{ color: "#9291A5" }}>calculados</p>
        </div>
      </div>

      <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />

      <div className={styles.BoxCentralizarIndicadores}>
        <div className={styles.EspacarIndicadores}>
          <div className="relative quadrado bg-[#DCFCE7]">
            <div className="flex flex-col w-full justify-between">
              <div className="flex justify-center items-center space-x-3 mb-3">
                <div className="bg-[#3CD856] rounded-full flex items-center justify-center min-w-8 h-8 ml-9">
                  <Image
                    src={alunoIcon1}
                    alt="Ícone aluno-professor"
                    width={15}
                    height={20}
                    className="mr-0.5 object-cover"
                  />
                </div>
                <p className="text-lg text-wrap font-bold text-[#3CD856] leading-snug">Índice de Interação Avaliativa</p>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex flex-col leading-snug">
                  <p className="font-semibold text-2xl">{formatarIndicador(indicadores.engagement)}</p>
                </div>
              </div>
            </div>
            <div className="absolute h-full top-0 right-0 pt-3 pr-3 text-md">
              <Tooltip message={getIndicatorsInfo.interacaoAvaliativaInfo} />
            </div>
          </div>

          <div className="relative quadrado bg-[#C3D8FF]">
            <div className="flex flex-col w-full justify-between">
              <div className="flex justify-center items-center space-x-3 mb-3">
                <div className="bg-[#3C56D8] rounded-full flex items-center justify-center min-w-8 h-8 ml-7">
                  <Image
                    src={alunoIcon3}
                    alt="Ícone aluno-professor"
                    width={21}
                    height={28}
                    className="ml-2.5 object-cover"
                  />
                </div>
                <p className="text-lg text-wrap font-bold text-[#3C56D8] leading-snug">Índice de Interação Não Avaliativa</p>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex flex-col leading-snug">
                  <p className="font-semibold text-2xl">{formatarIndicador(indicadores.motivation)}</p>
                </div>
              </div>
            </div>
            <div className="absolute h-full top-0 right-0 pt-3 pr-3 text-md">
              <Tooltip message={getIndicatorsInfo.interacaoNaoAvaliativaInfo} />
            </div>
          </div>

          <div className="relative quadrado bg-[#FFF5A6]">
            <div className="flex flex-col w-full justify-between">
              <div className="flex justify-center items-center space-x-3 mb-4">
                <div className="bg-[#D8D03C] rounded-full flex items-center justify-center w-8 h-8">
                  <Image
                    src={alunoIcon2}
                    alt="Ícone desempenho"
                    width={21}
                    height={28}
                    className="object-cover"
                  />
                </div>
                <p className="text-xl font-bold text-[#D8D03C]">Desempenho</p>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex flex-col leading-snug">
                  <p className="font-semibold text-2xl">{formatarIndicador(indicadores.performance)}</p>
                </div>
              </div>
            </div>
            <div className="absolute h-full top-0 right-0 pt-3 pr-3 text-md">
              <Tooltip message={getIndicatorsInfo.desempenhoInfo} />
            </div>
          </div>

          <div className="relative quadrado bg-[#FFD3A6]">
            <div className="flex flex-col w-full justify-between">
              <div className="flex justify-center items-center space-x-3 mb-4">
                <div className="bg-[#D86D3C] rounded-full flex items-center justify-center min-w-8 h-8 ml-6">
                  <Image
                    src={cognitive_depth}
                    alt="Ícone motivação"
                    width={18}
                    height={20}
                    className="mlobject-cover"
                  />
                </div>
                <p className="text-lg font-bold text-[#D86D3C]">Profundidade Cognitiva</p>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex flex-col leading-snug">
                  <p className="font-semibold text-2xl">{formatarIndicador(indicadores.cognitive)}</p>
                </div>
              </div>
            </div>
            <div className="absolute h-full top-0 right-0 pt-3 pr-3 text-md">
              <Tooltip message={getIndicatorsInfo.profCogInfo} />
            </div>
          </div>

        </div>
      </div>

      <div className={styles.BoxCentralizarIndicadores}>
        {/* <div className="relative quadrado bg-[#D0C3FF]">
          <div className="flex flex-col w-full justify-between">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="bg-[#5C3CD8] rounded-full flex items-center justify-center min-w-8 h-8 ml-8">
                <Image
                  src={alunoIcon}
                  alt="Ícone aluno-professor"
                  width={21}
                  height={28}
                  className="mr-0.5 object-cover"
                />
              </div>
              <p className="text-lg text-wrap font-bold text-[#5C3CD8] leading-snug">Relação Aluno-Professor</p>
            </div>
            <div className="flex w-full justify-center">
              <div className="flex flex-col leading-snug">
                <p className="font-semibold text-2xl">{getNivel(aluno.flagRelAlunoProf)}</p>
              </div>
            </div>
          </div>
          <div className="absolute h-full top-0 right-0 pt-3 pr-3 text-md">
            <Tooltip message="Descrição do indicador" />
          </div>
        </div> */}

        <div className="relative quadrado bg-[#FFD8E2]">
          <div className="flex flex-col w-full justify-between">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="bg-[#D83C8C] rounded-full flex items-center justify-center w-8 h-8">
                <Image
                  src={alunoIcon5}
                  alt="Ícone desistência"
                  width={21}
                  height={28}
                  className="object-cover"
                />
              </div>
              <p className="text-xl font-bold text-[#D83C8C]">Desistência</p>
            </div>
            <div className="flex w-full justify-center">
              <div className="flex flex-col leading-snug">
                <p className="font-semibold text-2xl">{getDesistencia(indicadores.give_up)}</p>
              </div>
            </div>
          </div>
          <div className="absolute h-full top-0 right-0 pt-3 pr-3 text-md">
            <Tooltip message={getIndicatorsInfo.desistenciaInfo} />
          </div>
        </div>
      </div>

      <div className="flex gap-2 my-6 mx-10">
        <div className="flex-1 gap-2 justify-between">
          <ScrollableTabs
            tabs={tabs}
            activeTab={activeTab}
            setTab={setActiveTab}
          />
        </div>
      </div>

      <AlunoRow aluno={aluno} activeTab={activeTab} />
    </div>
  );
}