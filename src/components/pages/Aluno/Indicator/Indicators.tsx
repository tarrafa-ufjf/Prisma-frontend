import styles from './Indicators.module.css';
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
import Loading from "@/components/ui/loading";
import { useTranslations } from 'next-intl';


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

const getIndicatorLevelKey = (texto?: string) => {
  if (!texto) return "";
  const normalized = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_");

  switch (normalized) {
    case "muito_baixo":
      return "levels.veryLow";
    case "baixo":
      return "levels.low";
    case "normal":
    case "medio":
      return "levels.medium";
    case "alto":
      return "levels.high";
    case "muito_alto":
      return "levels.veryHigh";
    default:
      return "";
  }
};

const tabs: Tab[] = [
  'Interação Avaliativa',
  'Interação Não Avaliativa',
  'Desempenho',
  'Profundidade Cognitiva',
  // 'Relação Aluno-Professor',
];

export default function Indicators({ aluno, cursoSelecionado }: IndicatorsProps) {
  const t = useTranslations("Students.details.indicators");
  const formatIndicator = (value?: string) => {
    const key = getIndicatorLevelKey(value);
    if (key) return t(key);
    return value ? value.replace(/_/g, " ") : t("levels.undefined");
  };
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
    return  <Loading>{t("loading")}</Loading>
    
  }

  if (!indicadores) {
    return <p className="text-sm">{t("empty")}</p>;
  }
  console.log("Indicadores recebidos:", indicadores);

  return (
    <div className="Box my-6">
      <div className="maincurso">
        <div className="mt-10 ml-10 mb-5">
          <h1 className="text-xl font-poppins font-semibold text-left">{t("title")}</h1>
          <p style={{ color: "#9291A5" }}>{t("subtitle")}</p>
        </div>
      </div>

      <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />

      <div className={styles.BoxCentralizarIndicadores}>
        <div className={styles.EspacarIndicadores}>
          <div className="relative quadrado bg-[#DCFCE7]">
            <div className="flex flex-col w-full justify-between">
              <div className="ml-5 flex justify-start space-x-3">
                <div className="bg-[#3CD856] rounded-full flex items-center justify-center w-8 h-8 min-w-8">
                  <Image
                    src={alunoIcon1}
                    alt={t("studentTeacherIconAlt")}
                    width={15}
                    height={20}
                    className="object-cover"
                  />
                </div>
                <p className="text-lg font-bold text-[#3CD856] leading-snug">{t("cards.evaluativeInteraction")}</p>
              </div>
              <div className="ml-17 mt-3 flex text-left">
                <div className="flex flex-col leading-snug">
                  <p className="text-xl font-bold text-gray-900">{formatIndicator(indicadores.engagement)}</p>
                </div>
              </div>
            </div>
            <div className="absolute h-full top-0 right-0 pt-3 pr-3 text-md">
              <Tooltip message={getIndicatorsInfo.interacaoAvaliativaInfo} />
            </div>
          </div>

          <div className="relative quadrado bg-[#C3D8FF]">
            <div className="flex flex-col w-full justify-between">
              <div className="ml-5 flex justify-start space-x-3">
                <div className="bg-[#3C56D8] rounded-full flex items-center justify-center w-8 h-8 min-w-8">
                  <Image
                    src={alunoIcon3}
                    alt={t("studentTeacherIconAlt")}
                    width={21}
                    height={28}
                    className="object-cover translate-x-[5px]"
                  />
                </div>
                <p className="text-lg font-bold text-[#3C56D8] leading-snug">
                  {t("cards.nonEvaluativeInteraction")}
                </p>
              </div>
              <div className="ml-17 mt-3 flex text-left">
                <div className="flex flex-col leading-snug">
                  <p className="text-xl font-bold text-gray-900">{formatIndicator(indicadores.motivation)}</p>
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
                    alt={t("performanceIconAlt")}
                    width={21}
                    height={28}
                    className="object-cover"
                  />
                </div>
                <p className="text-xl font-bold text-[#D8D03C]">{t("cards.performance")}</p>
              </div>
              <div className="ml-17 mt-3 flex text-left">
                <div className="flex flex-col leading-snug">
                  <p className="text-xl font-bold text-gray-900">
                    {formatIndicator(indicadores.performance)}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute h-full top-0 right-0 pt-3 pr-3 text-md">
              <Tooltip message={getIndicatorsInfo.desempenhoInfo} />
            </div>
          </div>

          <div className="relative quadrado bg-[#FFD3A6]">
            <div className="flex flex-col w-full justify-between">
              <div className="ml-5 flex justify-start space-x-3">
                <div className="bg-[#D86D3C] rounded-full flex items-center justify-center w-8 h-8 min-w-8">
                  <Image
                    src={cognitive_depth}
                    alt={t("cognitiveDepthIconAlt")}
                    width={18}
                    height={20}
                    className="object-cover"
                  />
                </div>
                <p className="text-lg font-bold text-[#D86D3C] leading-snug">{t("cards.cognitiveDepth")}</p>
              </div>
              <div className="ml-17 mt-3 flex text-left">
                <div className="flex flex-col leading-snug">
                  <p className="text-xl font-bold text-gray-900">{formatIndicator(indicadores.cognitive)}</p>
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
        <div className="relative quadrado bg-[#FFD8E2] !w-[223px]">
          <div className="flex flex-col w-full justify-between">
            <div className="flex items-center space-x-3 ml-5 mt-1">
              <div className="bg-[#D83C8C] rounded-full flex items-center justify-center w-8 h-8">
                <Image
                  src={alunoIcon5}
                  alt={t("dropoutIconAlt")}
                  width={21}
                  height={28}
                  className="object-cover"
                />
              </div>
              <p className="text-xl font-bold text-[#D83C8C]">{t("cards.dropout")}</p>
            </div>
            <div className="flex w-full justify-center mt-2">
              <div className="flex flex-col items-center leading-snug">
                <p className="text-xl font-bold text-gray-900">{indicadores.give_up ? t("yes") : t("no")}</p>
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

      <AlunoRow aluno={aluno} activeTab={activeTab} cursoSelecionado={cursoSelecionado} />
    </div>
  );
}
