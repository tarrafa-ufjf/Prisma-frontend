import Loading from "@/components/ui/loading"
import { useError } from "@/hooks/useError"
import { api } from "@/utils/api"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export default function DadosGerais() {
  const t = useTranslations("Home.generalData")
  const [data, setData] = useState<any>(null)
  const error = useError()

  useEffect(() => {
    const fetch = async () => {
      try {
        error.clear()
        const response = await api.get(`analysis/general/summary`)
        const response_data = response.data.data
        setData(response_data)
      } catch (err) {
        error.setError(t("fetchError"))
        console.error("Erro ao buscar dados gerais: ", err)
      }
    }
    fetch()
  }, [error.clear, error.setError])

  return (
    <div className="Box2 mt-10">
      <div className="mb-14">
        <div className="maincurso">
          <div className="mt-10 ml-10 mb-5">
            <h1 className="text-xl font-poppins font-semibold text-left">
              {t("title")}
            </h1>
            <p style={{ color: "#9291A5" }}>{t("subtitle")}</p>
          </div>
        </div>
        <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />
      </div>

      <div className="flex items-center justify-center mb-14">
        {error.hasError && error.renderError()}
        {data ? (
          <div className="flex flex-row justify-between items-center space-x-47">
            <div className="flex flex-row items-center">
              <p className="text-base text-gray-600 mb-2 text-left mr-6">
                {t("totalUsersLine1")}<br />{t("totalUsersLine2")} <br /> {t("totalUsersLine3")}
              </p>
              <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base ">
                {data.total_users}
              </div>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-base text-gray-600 mb-2 text-left mr-6">
                {t("totalCoursesLine1")}<br />{t("totalCoursesLine2")} <br />{t("totalCoursesLine3")}
              </p>
              <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base ">
                {data.total_courses_offered}
              </div>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-base text-gray-600 mb-2 text-left mr-6">
                {t("totalSubjectsLine1")}<br />{t("totalSubjectsLine2")} <br />{t("totalSubjectsLine3")}
              </p>
              <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base ">
                {data.total_subjects}
              </div>
            </div>
          </div>
        ) : (
          <Loading>{t("loading")}</Loading>
        )}
      </div>
    </div>
  );
}
