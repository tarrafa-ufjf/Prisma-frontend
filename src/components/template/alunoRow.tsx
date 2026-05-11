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

interface AlunoRowProps {
    aluno: AlunoType;
    activeTab: string;
    cursoSelecionado: number | null;
};

const AlunoRow: React.FC<AlunoRowProps> = ({ aluno, activeTab, cursoSelecionado }) => {

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
                    { label: "Nº de Posts em Fóruns Avaliativos", name: "num_posts_required" },
                    { label: "Percentual de Quizzes Realizados", name: "quizzesRealiz" },
                    { label: "Percentual de Tarefas Enviadas", name: "tarefasEnv" },
                ];

            case "Desempenho":
                return [
                    { label: "Média Geral das Notas Avaliativas", name: "media_percentual" },
                    { label: "Comparação com a Média da Turma", name: "compMedia" },
                    { label: "Nº de Atividades Abaixo da Média", name: "ativAbaixoMedia" },
                ];

            case "Interação Não Avaliativa":
                return [
                    { label: "Percentual de Participação em Fóruns Não Obrigatórios", name: "partForunsNaoObrig" },
                    { label: "Nº de Visualizações em Materiais Complementares", name: "nVisuCompl" },
                    { label: "Nº de Interações na Última Semana", name: "nInter" },
                ];

            case "Profundidade Cognitiva":
                return [
                    { label: "Nível Médio de Profundidade Cognitiva em Fóruns", name: "profCogForuns" },
                    { label: "Nível Médio de Profundidade Cognitiva em Quizzes", name: "profCogQuizzes" },
                    { label: "Nível Médio de Profundidade Cognitiva em Tarefas", name: "profCogTarefas" },
                ];

            case "Relação Aluno-Professor":
                return [
                    { label: "Nº de Mensagens Trocadas com o Professor", name: "nMsgsAlunoProf" },
                    { label: "Percentual de Participação em Fóruns Mediados pelo Docente", name: "partForunsDocente" },
                    { label: "Frequência de Contato Aluno-Professor", name: "freqContAlunoProf" },
                ];

            default:
                return [];
        }
    };

    const columns = getColumns();

    if (loadingExtra) {
        return <Loading>Carregando Dados</Loading>;
    }

    if (!extraData && (activeTab === "Profundidade Cognitiva" || activeTab === "Desempenho" || activeTab === "Interação Não Avaliativa" || activeTab === "Relação Aluno-Professor")) {
        return (
            <div className="flex justify-center items-center h-full min-h-[200px]">
                <ErrorMessage>Erro ao carregar dados</ErrorMessage>
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