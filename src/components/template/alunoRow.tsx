'use client';

import React from 'react';
import Loading from '@/components/ui/loading';
import ErrorMessage from '../ui/error-message';
import { Aluno as AlunoType } from '@/types/aluno';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/tabela';
import { 
    getCognitiveData, 
    getPerformanceData, 
    getMotivationData 
} from '@/utils/alunoService';
import { useTranslations } from 'next-intl';

interface AlunoRowProps {
    aluno: AlunoType;
    activeTab: string;
    cursoSelecionado: number | null;
};

const AlunoRow: React.FC<AlunoRowProps> = ({ aluno, activeTab, cursoSelecionado }) => {
    const t = useTranslations("Students.details.indicatorDetails");

    const [extraData, setExtraData] = React.useState<any>(null);
    const [loadingExtra, setLoadingExtra] = React.useState(false);

    React.useEffect(() => {
        async function fetchData() {
            try {
                if (!aluno?.id || !cursoSelecionado) {
                    setExtraData(null);
                    return;
                }

                setLoadingExtra(true);

                let data = null;

                if (activeTab === "Profundidade Cognitiva") {
                    data = await getCognitiveData(cursoSelecionado, aluno.id);
                }

                if (activeTab === "Desempenho") {
                    data = await getPerformanceData(cursoSelecionado, aluno.id);
                }

                if (activeTab === "Interação Não Avaliativa") {
                    data = await getMotivationData(cursoSelecionado, aluno.id);
                }

                setExtraData(data);

            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
                setExtraData(null);
            } finally {
                setLoadingExtra(false);
            }
        }

        fetchData();
    }, [activeTab, aluno?.id, cursoSelecionado]);

    const getValue = (columnName: string) => {

        // PROFUNDIDADE COGNITIVA
        if (activeTab === "Profundidade Cognitiva" && extraData) {
            const map: Record<string, any> = {
                profCogForuns: extraData.forum_mean_level,
                profCogQuizzes: extraData.quiz_mean_level,
                profCogTarefas: extraData.assign_mean_level,
            };

            return map[columnName];
        }

        // DESEMPENHO
        if (activeTab === "Desempenho" && extraData) {
            const map: Record<string, any> = {
                media_percentual: extraData.media_percentual,
                compMedia: extraData.comparative,
                ativAbaixoMedia: '-', // não vem da API
            };

            return map[columnName];
        }

        // MOTIVAÇÃO (Interação Não Avaliativa)
        if (activeTab === "Interação Não Avaliativa" && extraData) {
            const map: Record<string, any> = {
                partForunsNaoObrig: extraData.num_posts_unrequired,
                nVisuCompl: '-', // não vem da API
                nInter: '-', // não vem da API
            };

            return map[columnName];
        }

        return aluno[columnName as keyof AlunoType];
    };

    const render = (columnName: string, value: any) => {
        return value != null ? value.toString() : '-';
    };

    const getColumns = () => {
        switch (activeTab) {
            case "Interação Avaliativa":
                return [
                    { label: t("evaluativeForumPosts"), name: "num_posts_required" },
                    { label: t("completedQuizzesPercentage"), name: "quizzesRealiz" },
                    { label: t("submittedAssignmentsPercentage"), name: "tarefasEnv" },
                ];

            case "Desempenho":
                return [
                    { label: t("averageEvaluativeGrades"), name: "media_percentual" },
                    { label: t("classAverageComparison"), name: "compMedia" },
                    { label: t("activitiesBelowAverage"), name: "ativAbaixoMedia" },
                ];

            case "Interação Não Avaliativa":
                return [
                    { label: t("nonRequiredForumParticipation"), name: "partForunsNaoObrig" },
                    { label: t("complementaryMaterialViews"), name: "nVisuCompl" },
                    { label: t("lastWeekInteractions"), name: "nInter" },
                ];

            case "Profundidade Cognitiva":
                return [
                    { label: t("forumAverageCognitiveDepth"), name: "profCogForuns" },
                    { label: t("quizAverageCognitiveDepth"), name: "profCogQuizzes" },
                    { label: t("assignmentAverageCognitiveDepth"), name: "profCogTarefas" },
                ];

            case "Relação Aluno-Professor":
                return [
                    { label: t("teacherMessages"), name: "nMsgsAlunoProf" },
                    { label: t("teacherMediatedForumParticipation"), name: "partForunsDocente" },
                    { label: t("studentTeacherContactFrequency"), name: "freqContAlunoProf" },
                ];

            default:
                return [];
        }
    };

    const columns = getColumns();

    if (loadingExtra) {
        return <Loading>{t("loading")}</Loading>;
    }

    if (!extraData && (activeTab === "Profundidade Cognitiva" || activeTab === "Desempenho" || activeTab === "Interação Não Avaliativa" || activeTab === "Relação Aluno-Professor")) {
        return (
            <div className="flex justify-center items-center h-full min-h-[200px]">
                <ErrorMessage>{t("fetchError")}</ErrorMessage>
            </div>
        );
    }

    return (
        <div className="bg-white ml-8 mr-8 mb-8 mt-4">
            <Table className="border border-gray-100 shadow-sm">
                <TableHeader>
                    <TableRow className="bg-gray-100 h-16">
                        {columns.map((column, index) => (
                            <TableHead key={index} className="text-center min-w-40">
                                {column.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="h-16">
                        {columns.map((column, index) => (
                            <TableCell key={index} className="p-4">
                                <div className="flex items-center justify-center">
                                    {render(column.name, getValue(column.name))}
                                </div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default AlunoRow;
