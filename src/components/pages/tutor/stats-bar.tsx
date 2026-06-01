'use client';

import { useEffect, useState } from "react";
import { useError } from "@/hooks/useError";
import { api } from "@/utils/api";
import ScrollableTabs from "@/components/template/indicadoresTabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/tabela';
import { useTranslations } from "next-intl";

interface StatsBarProps {
    id_course: number;
    id_tutor: number;
}

type Metric = {
    label: string;
    value: number | string;
};

type TutorTab = 'Respostas em Fóruns' | 'Acesso à Disciplina' | 'Feedback';

export default function StatsBar({ id_course, id_tutor }: StatsBarProps) {
    const t = useTranslations("Tutors.detail.statsBar");
    const [accessStats, setAccessStats] = useState<any>(null);
    const [forumStats, setForumStats] = useState<any>(null);
    const [feedbackStats, setFeedbackStats] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<TutorTab>("Respostas em Fóruns");
    const tabs: TutorTab[] = ["Respostas em Fóruns", "Acesso à Disciplina", "Feedback"];
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
                error.setError(t("fetchError"));
                console.error(err);
            }
        }

        fetch();
    }, [id_course, id_tutor, error.clear, error.setError, t]);

    if (!accessStats || !forumStats || !feedbackStats) {
        return <div className="text-gray-500">{t("loading")}</div>;
    }

    const formatFixed = (value: number | undefined, digits: number, fallback: string) => (
        typeof value === "number" ? value.toFixed(digits) : fallback
    );
    
    // FORUM 
    const forumMetrics: Metric[] = forumStats
        ? [
            { label: t("metrics.fastForumResponses"), value: forumStats.num_response_fast_forum ?? t("unavailable.fastForumResponses")},
            { label: t("metrics.normalForumResponses"), value: forumStats.num_response_normal_forum ?? t("unavailable.normalForumResponses") },
            { label: t("metrics.lateForumResponses"), value: forumStats.num_response_late_forum ?? t("unavailable.lateForumResponses") },
            { label: t("metrics.meanForumResponseHours"), value: formatFixed(forumStats.mean_forums_response_hours, 2, t("unavailable.mean")) },
            { label: t("metrics.medianForumResponseHours"), value: formatFixed(forumStats.median_forums_response_hours, 2, t("unavailable.median")) },
        ]
        : [];

    // ACESSOS AO MOODLE
    const accessMetrics: Metric[] = [
        { label: t("metrics.totalLogins"), value: accessStats?.n_login_subject ?? t("unavailable.totalLogins") },
        { label: t("metrics.weeklyCourseViews"), value: formatFixed(accessStats?.n_login_weekly, 1, t("unavailable.mean")) },
    ];

    // FEEDBACK
    const feedbackMetrics: Metric[] = [
        { label: t("metrics.totalCorrections"), value: feedbackStats?.n_corrections ?? t("unavailable.totalCorrections") },
        { label: t("metrics.correctionsWithFeedback"), value: feedbackStats?.n_corrections_with_feedback ?? t("unavailable.correctionsWithFeedback") },
        { label: t("metrics.feedbackPercentage"), value: feedbackStats?.percentage_feedback ?? t("unavailable.feedbackPercentage") },
    ];

    // Determina quais métricas mostrar com base na aba ativa (fórum, acessos ou feedback)
    const metricsToShow =
        activeTab === "Respostas em Fóruns"
            ? forumMetrics
            : activeTab === "Feedback"
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
