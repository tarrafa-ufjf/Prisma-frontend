'use client';

import responseIcon from './response.png'
import clickIcon from './click.png'
import chatIcon from './chat.png'
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

export default function Indicators({ id_course, id_tutor }: IndicatorsProps) {
  const t = useTranslations("Tutors.detail.indicators");
  const [indicatorsData, setIndicatorsData] = useState<IndicatorsInfo | null>(null)
  const error = useError()

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
                    src={responseIcon}
                    alt={t("indicatorIconAlt")}
                    width={15}
                    height={20}
                    className="object-cover"
                  />
                </div>
                <p className="text-xl font-bold text-[#3CD856]">{t("forumResponses")}</p>
              </div>
              <div className="ml-17 flex text-left">
                <div className="flex flex-col leading-snug">
                  <p className="text-xl font-bold text-gray-900">{indicatorsData.indicators.response_foruns}</p>
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
                    src={clickIcon}
                    alt={t("indicatorIconAlt")}
                    width={21}
                    height={28}
                    className="mr-0.5 object-cover"
                  />
                </div>
                <p className="text-xl font-bold text-[#5C3CD8]">{t("courseAccess")}</p>
              </div>
              <div className="ml-17 flex text-left">
                <div className="flex flex-col leading-snug">
                  <p className="text-xl font-bold text-gray-900">{indicatorsData.indicators.access}</p>
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
                    src={chatIcon}
                    alt={t("indicatorIconAlt")}
                    width={21}
                    height={28}
                    className="object-cover"
                  />
                </div>
                <p className="text-xl font-bold text-[#D83C8C]">{t("feedback")}</p>
              </div>
              <div className="ml-17 flex text-left">
                <div className="flex flex-col leading-snug">
                  <p className="text-2xl font-bold text-gray-900">{indicatorsData.indicators.feedback}</p>
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
