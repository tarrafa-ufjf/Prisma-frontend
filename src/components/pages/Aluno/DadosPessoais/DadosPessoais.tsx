import { Aluno as AlunoType } from "@/types/aluno";
import { Curso } from "@/types/curso";
import { api } from "@/utils/api";
import React from "react";
import Loading from "@/components/ui/loading";
import ErrorMessage from "@/components/ui/error-message";
import { useTranslations } from "next-intl";

interface DadosPessoaisProps {
    aluno: AlunoType;
    curso: Curso;
};

export default function DadosPessoais({ aluno, curso }: DadosPessoaisProps) {
    const t = useTranslations("Students.details.personalData");
    const [summary, setSummary] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
    async function fetchData() {
        try {
        setLoading(true);

        const response = await api.get(
            `analysis/subject/${curso.id}/student/${aluno.id}/summary`
        );

        const studentSummary =
            response.data?.data?.student_summary
            setSummary(studentSummary);

        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
        } finally {
            setLoading(false);
        }
    }

    if (curso?.id && aluno?.id) {
        console.log("Curso ID: ", curso.id);
        console.log("Aluno ID: ", aluno.id);
        fetchData();
    }
    }, [curso, aluno]);

    if (loading) {
        return <Loading>{t("loading")}</Loading>;
    }

    if (!summary) {
        return <ErrorMessage>{t("fetchError")}</ErrorMessage>;
    }
    console.log("summary: ", summary);
    return (
        <div className="Box3 p-6 rounded-lg border border-gray-200 shadow-sm">
            <h1 className="text-2xl font-semibold text-left mb-6 pb-4 border-b border-gray-200">
                {t("title")}
            </h1>
            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col ml-4 mr-4">
                    <div className="flex items-center mb-4">
                        <p className="text-sm font-medium w-24">{t("email")}</p>
                        <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
                            {summary.email ?? `-`}
                        </p>
                    </div>
                    <div className="flex items-center mb-4">
                        <p className="text-sm font-medium w-24">{t("course")}</p>
                        <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
                            {summary.degree_program ?? `-`}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-sm font-medium w-24">{t("city")}</p>
                        <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
                            {summary.city ?? `-`}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col mr-4">
                    <div className="flex items-center mb-4">
                        <p className="text-sm font-medium w-32">{t("studentGroup")}</p>
                        <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
                            {summary.student_groups ?? `-`}
                        </p>
                    </div>
                    <div className="flex items-center mb-4">
                        <p className="text-sm font-medium w-32">{t("firstAccess")}</p>
                        <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
                            {summary.first_access_moodle ?? `-`}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-sm font-medium w-32">{t("lastAccess")}</p>
                        <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
                            {summary.last_access_subject ?? `-`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

