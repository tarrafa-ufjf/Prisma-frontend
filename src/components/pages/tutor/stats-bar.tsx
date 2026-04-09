'use client';

import { useEffect, useState } from "react";
import { useError } from "@/hooks/useError";
import { api } from "@/utils/api";
import ScrollableTabs from "@/components/template/indicadoresTabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/tabela';

interface StatsBarProps {
    id_course: number;
    id_tutor: number;
}

type Metric = {
    label: string;
    value: number | string;
};

type TutorTab = 'Respostas em Fóruns' | 'Acessos ao Moodle' | 'Feedbacks';

export default function StatsBar({ id_course, id_tutor }: StatsBarProps) {
    const [accessStats, setAccessStats] = useState<any>(null);
    const [forumStats, setForumStats] = useState<any>(null);
    const [feedbackStats, setFeedbackStats] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<TutorTab>("Respostas em Fóruns");
    const tabs: TutorTab[] = ["Respostas em Fóruns", "Acessos ao Moodle", "Feedbacks"];
    const error = useError();

    useEffect(() => {
        async function fetch() {
            try {
                error.clear();
                // ACESSOS AO MOODLE
                const accessResponse = await api.get(
                    `analysis/tutors/subject/${id_course}/tutor/${id_tutor}/access`
                );
                setAccessStats(accessResponse.data.data);
                console.log("Access: ", accessResponse.data.data);

                // RESPOSTAS EM FÓRUNS
                const forumResponse = await api.get(
                    `analysis/tutors/subject/${id_course}/tutor/${id_tutor}/response_forums`
                );
                setForumStats(forumResponse.data.data);
                console.log("Forum: ", forumResponse.data.data);

                // FEEDBACK
                const feedbackResponse = await api.get(
                    `/analysis/tutors/subject/${id_course}/tutor/${id_tutor}/feedback`
                )
                setFeedbackStats(feedbackResponse.data.data);
                console.log("Feedbacks: ", feedbackResponse.data.data);

            } catch (err) {
                error.setError("Erro ao buscar indicadores");
                console.error(err);
            }
        }

        fetch();
    }, [id_course, id_tutor]);

    if (!accessStats || !forumStats || !feedbackStats) {
        return <div className="text-gray-500">Carregando Indicadores...</div>;
    }
    
    // FORUM 
    const forumMetrics: Metric[] = forumStats
        ? [
            { label: "N° Total de Respostas Rápidas em Fóruns", value: forumStats.num_response_fast_forum ?? "N° Total de Respostas Rápidas em Fóruns não disponível"},
            { label: "N° Total de Respostas Normais em Fóruns", value: forumStats.num_response_normal_forum ?? "N° Total de Respostas Normais em Fóruns não disponível" },
            { label: "N° Total de Respostas Lentas em Fóruns", value: forumStats.num_response_late_forum ?? "N° Total de Respostas Lentas em Fóruns não disponível" },
            { label: "Média de Horas para Responder Mensagens em Fóruns", value: forumStats.mean_forums_response_hours.toFixed(2) ?? "Média não disponível" },
            { label: "Mediana de Horas para Responder Mensagens em Fóruns", value: forumStats.median_forums_response_hours.toFixed(2) ?? "Mediana não disponível" },
        ]
        : [];

    // ACESSOS AO MOODLE
    const accessMetrics: Metric[] = [
        { label: "N° Total de Logins", value: accessStats?.n_login_subject ?? "N° Total de Logins não disponível" },
        { label: "Média de Visualizações ao Curso por Semana", value: accessStats?.n_login_weekly.toFixed(1) ?? "Média não disponível" },
    ];

    // FEEDBACK
    const feedbackMetrics: Metric[] = [
        { label: "N° Total de Correções", value: feedbackStats?.n_corrections ?? "N° Total de Correções não disponível" },
        { label: "N° Total de Correções com Feedback", value: feedbackStats?.n_corrections_with_feedback ?? "N° Total de Correções com Feedback não disponível" },
        { label: "Porcentagem de Correções com Feedbacks", value: feedbackStats?.percentage_feedback ?? "Porcentagem de Correções com Feedbacks não disponível" },
    ];

    // Determina quais métricas mostrar com base na aba ativa (fórum, acessos ou feedback)
    const metricsToShow =
        activeTab === "Respostas em Fóruns"
            ? forumMetrics
            : activeTab === "Feedbacks"
                ? feedbackMetrics
                : accessMetrics;              
        
    return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 w-full">
      {/* Tabs */}
      <ScrollableTabs
        tabs={tabs}
        activeTab={activeTab}
        setTab={setActiveTab}
        />

      {/* Tabela */}
      <div className="overflow-x-auto mt-4">
        <Table className="border border-gray-100 shadow-sm">
          <TableHeader>
            <TableRow className="bg-gray-100 h-16">
              {metricsToShow.map((metric, i) => (
                <TableHead key={i} className="text-center min-w-40">
                  {metric.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-16">
              {metricsToShow.map((metric, i) => (
                <TableCell key={i} className="p-4">
                  <div className="flex items-center justify-center">{metric.value}</div>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}