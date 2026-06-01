import GeneralData from "@/components/pages/tutor/general-data"
import Graphs from "@/components/pages/tutor/graphs"
import Indicators from "@/components/pages/tutor/Indicator/indicators"
import StatsBar from "@/components/pages/tutor/stats-bar"
import PageTemplate from "@/components/template/page-template"
import ErrorMessage from "@/components/ui/error-message"
import NotFound from "@/components/ui/not-found"
import { api, getCourses } from "@/utils/api-server"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"

interface PageProps {
    params: Promise<{
        locale: string
        id_course: string
        id_tutor: string
    }>
}

export default async function Page({ params }: PageProps) {
    const page_params = await params
    const t = await getTranslations("Tutors.detail")
    const cursos = await getCourses()
    const curso = cursos.filter(curso => curso.id == Number(page_params.id_course))[0]

    let data = null
    try {
        const response = await api.get(`analysis/tutors/subject/${page_params.id_course}/tutor/${page_params.id_tutor}/summary`)
        data = response.data.data
        if (data.tutor_summary === null || data.tutor_summary === undefined) {
            data = 0
            throw new Error("Erro ao consumir api")
        }

        if (Object.keys(response.data.data.tutor_summary).length === 0) {
            data = 1
            throw new Error("Tutor não pertence a esse curso")
        }

        data = data.tutor_summary
    } catch (err) {
        console.error("Erro ao buscar dados gerais: ", err)
    }

    if (!curso) {
        return (
            <NotFound>
                <div className="flex-1 flex justify-center items-center pt-4 pl-[240px]">
                    <p>
                        {t("courseNotFoundStart", { courseId: page_params.id_course })}{" "}
                        <Link href='/tutores/curso' className="underline" >{t("linkLabel")}</Link>
                        {t("notFoundEnd")}
                    </p>
                </div>
            </NotFound>
        )
    }

    if (data == 0) {
        return (
            <NotFound>
                <ErrorMessage>
                    {t("fetchError")}
                </ErrorMessage>
            </NotFound>
        )
    }

    if (data == 1 || !data) {
        return (
            <NotFound>
                <div className="flex-1 flex justify-center items-center pt-4 pl-[240px]">
                    <p>
                        {t("tutorNotFoundStart", { tutorId: page_params.id_tutor })}{" "}
                        <Link href={`/tutores/curso/${page_params.id_course}/details`} className="underline" >{t("linkLabel")}</Link>
                        {t("notFoundEnd")}
                    </p>
                </div>
            </NotFound>
        )
    }
    return (
        <PageTemplate
            title={t("title")}
            subTitle={data.name}
            courseInfo={{
                period: curso.period,
                shortName: curso.shortname
            }}
        >
            <GeneralData tutor={data} />
            <Indicators
                id_course={curso.id}
                id_tutor={data.id}
            />
            <StatsBar
                id_course={curso.id}
                id_tutor={data.id}                
            />
            <Graphs
                id_course={curso.id}
                id_tutor={data.id}
            />
        </PageTemplate>
    );
};
