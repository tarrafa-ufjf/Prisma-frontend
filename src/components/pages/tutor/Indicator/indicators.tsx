'use client';

import Image from 'next/image';
import { Tooltip } from "@/components/template/tooltip";
import { getIndicatorsInfo } from "@/utils/indicatorsInfo";
import { useEffect, useState } from "react";
import { useError } from "@/hooks/useError";
import { api } from "@/utils/api";
import Loading from "@/components/ui/loading";
import Button from "@/components/ui/button";
import { useTranslations } from "next-intl";

type IndicatorsInfo = {
  indicators: {
    access: string,
    feedback: string,
    response_foruns: string
  },
  student_id: number,
  subject_id: number
}

interface IndicatorsProps {
  id_course: number
  id_tutor: number
}

const getLevelTranslationKey = (value: string) => {
  const normalized = value
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
      return "levels.normal";
    case "medio":
      return "levels.medium";
    case "alto":
      return "levels.high";
    case "muito_alto":
      return "levels.veryHigh";
    default:
      return null;
  }
};

export default function Indicators({ id_course, id_tutor }: IndicatorsProps) {
  const t = useTranslations("Tutors.detail.indicators");
  const tColumns = useTranslations("Columns");
  const [indicatorsData, setIndicatorsData] = useState<IndicatorsInfo | null>(null)
  const error = useError()
  const translateLevel = (value: string) => {
    const key = getLevelTranslationKey(value);
    return key ? tColumns(key) : value;
  };

  useEffect(() => {
    async function fetch() {
      try {
        error.clear()
        const response = await api.get(`analysis/tutors/subject/${id_course}/tutor/${id_tutor}/indicators`)
        setIndicatorsData(response.data.data)
      } catch (err) {
        error.setError(t("fetchError"))
        console.error("Erro ao buscar indicadores: ", err)
      }
    };
    fetch();
  }, [id_course, id_tutor, error.clear, error.setError, t]);

  return (
    <div className="Box pb-5">
      <div className="maincurso">
        <div className="mt-10 ml-10 mb-5">
          <h1 className="text-xl font-poppins font-semibold text-left">{t("title")}</h1>
          <p style={{ color: "#9291A5" }}>{t("subtitle")}</p>
        </div>
        <div className="m-10 flex gap-2">
          <Button href='/#'>{t("details")}</Button>
          <Button href='/tutores/curso'>{t("seeMore")}</Button>
        </div>
      </div>

      <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />

      {indicatorsData ? (
        <div className="flex flex-row gap-6 justify-center px-10 py-8">
          <div className="relative quadrado bg-[#DCFCE7]">
            <div className="flex flex-col w-full justify-between">
              <div className="ml-5 flex justify-start space-x-3">
                <div className="bg-[#3CD856] rounded-full flex items-center justify-center w-8 h-8 min-w-8">
                  <Image
                    src="/images/tutores/response.png"
                    alt={t("indicatorIconAlt")}
                    width={15}
                    height={20}
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <p className="text-xl font-bold text-[#3CD856]">{t("forumResponses")}</p>
              </div>
              <div className="ml-17 flex text-left">
                <div className="flex flex-col leading-snug">
                  <p className="text-xl font-bold text-gray-900">{translateLevel(indicatorsData.indicators.response_foruns)}</p>
                </div>
              </div>
            </div>
            <div className="absolute h-full top-0 right-0 pt-3 pr-3 text-md">
              <Tooltip message={getIndicatorsInfo.responseInfo} />
            </div>
          </div>

          <div className="relative quadrado bg-[#D0C3FF]">
            <div className="flex flex-col w-full justify-between ">
              <div className="ml-5 flex justify-start space-x-3">
                <div className="bg-[#5C3CD8] rounded-full flex items-center justify-center w-8 h-8">
                  <Image
                    src="/images/tutores/click.png"
                    alt={t("indicatorIconAlt")}
                    width={21}
                    height={28}
                    unoptimized
                    className="mr-0.5 object-cover"
                  />
                </div>
                <p className="text-xl font-bold text-[#5C3CD8]">{t("courseAccess")}</p>
              </div>
              <div className="ml-17 flex text-left">
                <div className="flex flex-col leading-snug">
                  <p className="text-xl font-bold text-gray-900">{translateLevel(indicatorsData.indicators.access)}</p>
                </div>
              </div>
            </div>
            <div className="absolute h-full top-0 right-0 pt-3 pr-3 text-md">
              <Tooltip message={getIndicatorsInfo.accessInfo} />
            </div>
          </div>

          <div className="relative quadrado bg-[#FFD8E2]">
            <div className="flex flex-col w-full justify-between">
              <div className="ml-5 flex justify-start space-x-3">
                <div className="bg-[#D83C8C] rounded-full flex items-center justify-center w-8 h-8">
                  <Image
                    src="/images/tutores/chat.png"
                    alt={t("indicatorIconAlt")}
                    width={21}
                    height={28}
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <p className="text-xl font-bold text-[#D83C8C]">{t("feedback")}</p>
              </div>
              <div className="ml-17 flex text-left">
                <div className="flex flex-col leading-snug">
                  <p className="text-xl font-bold text-gray-900">{translateLevel(indicatorsData.indicators.feedback)}</p>
                </div>
              </div>
            </div>
            <div className="absolute h-full top-0 right-0 pt-3 pr-3 text-md">
              <Tooltip message={getIndicatorsInfo.feedbackInfo} />
            </div>
          </div>
        </div>
      ) : (
        <Loading>{t("loading")}</Loading>
      )}
    </div>
  );
}
