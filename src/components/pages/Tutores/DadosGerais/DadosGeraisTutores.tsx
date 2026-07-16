"use client";

import Loading from "@/components/ui/loading";
import { useError } from "@/hooks/useError";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

interface DadosGeraisTutores {
  id: number;
}

interface GeneralDataTutors {
  average_logs_per_day_per_tutor: number;
  students_per_tutor: number;
  total_tutors: number;
}

const formatValue = (value: any, locale: string) => {
    if (typeof value === 'number') {
        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
            maximumFractionDigits: 2
        }).format(value);
    }
    return value;
};

export default function DadosGeraisTutores({ id }: DadosGeraisTutores) {
  const t = useTranslations("Tutors.generalData");
  const locale = useLocale();
  const [data, setData] = useState<GeneralDataTutors | null>(null);
  const error = useError();

  useEffect(() => {
    async function fetchData() {
      try {
        error.clear();
        const response = await api.get(`analysis/tutors/subject/${id}/summary`);
        setData(response.data.data.subject);
      } catch (err) {
        error.setError(t("fetchError"));
        console.error("Erro ao buscar dados gerais: ", err);
      }
    }
    fetchData();
  }, [id, error.clear, error.setError, t]);

  return (
    <div className="Box2 mt-5">
      <div className="mb-14">
        <div className="maincurso">
          <div className="mt-10 ml-10 mb-5">
            <h1 className="text-xl font-poppins font-semibold text-left">
              {t("title")}
            </h1>
            <p style={{ color: "#9291A5" }}>{t("subtitle")}</p>
          </div>
        </div>
        <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 bg-white" />
      </div>

      <div className="flex items-center justify-center mb-14">
        {error.hasError ? (
          error.renderError()
        ) : data ? (
          <div className="flex flex-row justify-between items-center space-x-45">
            <div className="flex flex-row items-center">
              <p className="text-base text-gray-600 mb-2 text-left mr-6">
                {t("averageLogsLine1")}<br />
                {t("averageLogsLine2")}<br />
                {t("averageLogsLine3")}
              </p>
              <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base ">
                {data.average_logs_per_day_per_tutor
                  ? formatValue(Number(data.average_logs_per_day_per_tutor), locale)
                  : 0}
              </div>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-base text-gray-600 mb-2 text-left mr-6">
                {t("studentsPerTutorLine1")} <br />
                {t("studentsPerTutorLine2")} <br />
                {t("studentsPerTutorLine3")}
              </p>
              <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base ">
                {data.students_per_tutor
                  ? formatValue(Number(data.students_per_tutor), locale)
                  : 0}
              </div>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-base text-gray-600 mb-2 text-left mr-6">
                {t("totalTutorsLine1")} <br />
                {t("totalTutorsLine2")} <br />
                {t("totalTutorsLine3")}
              </p>
              <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base">
                {data.total_tutors
                  ? formatValue(Number(data.total_tutors), locale)
                  : 0}
                %
              </div>
            </div>
          </div>
        ) : (
          <div className="m-5">
            <Loading>{t("loading")}</Loading>
          </div>
        )}
      </div>
    </div>
  );
}
