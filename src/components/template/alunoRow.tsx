'use client';

import React from 'react';
import { Aluno as AlunoType } from '@/types/aluno';
import { getNivel, getFlagCor, getDesistencia, getFlagDesistenciaCor } from '@/utils/columns';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/tabela';

interface AlunoRowProps {
    aluno: AlunoType;
    activeTab: string;
};

const AlunoRow: React.FC<AlunoRowProps> = ({ aluno, activeTab }) => {
    const render = (columnName: string, value: any) => {
        switch (columnName) {
            case 'num_posts_required':
            case 'media_percentual':
                return value !== null && value !== undefined ? value.toString() : '-';
            case 'flagEngajamento':
            case 'flagMotivacao':
            case 'flagDesempenho':
            case 'flagRelAlunoProf':
                return (
                    <div className={`py-1 px-6 max-w-fit text-center rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(value)}`}>
                        {getNivel(value)}
                    </div>
                );

            case 'flagProfCog':
                return (
                    <div className={`py-1 px-6 max-w-fit rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(value)}`}></div>
                );

            case 'flagDesistencia':
                return (
                    <div className={`py-1 px-6 max-w-fit rounded-md text-xs font-medium border-[1.5px] ${getFlagDesistenciaCor(value)}`}>
                        {getDesistencia(value)}
                    </div>
                );

            default:
                return value !== null && value !== undefined ? value.toString() : '-';
        }
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
                    { label: "Nº de Mensagens Trocadas com o Professor", name: "nMsgsAlunoProf"},
                    { label: "Percentual de Participação em Fóruns Mediados pelo Docente", name: "partForunsDocente" },
                    { label: "Frequência de Contato Aluno-Professor", name: "freqContAlunoProf" },
                ];

            default:
                return [];
        }
    };

    const columns = getColumns();

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
                                    {render(column.name, aluno[column.name as keyof AlunoType])}
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