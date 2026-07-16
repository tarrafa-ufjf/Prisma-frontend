'use client';

import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import Grafico from "./Atividades/Atividades";
import NumAbso from "./NumAbso/NumAbso";
import Loading from "@/components/ui/loading";
import { useError } from "@/hooks/useError";
import { useTranslations } from "next-intl";

interface GraficosProps {
    id: number
}

export default function Graficos({ id }: GraficosProps) {
    const t = useTranslations("Courses.charts")
    const [data, setData] = useState<GraphInfo | null>(null)
    const error = useError()

    useEffect(() => {
        async function fetch() {
            try {
                error.clear()
                const response = await api.get(`analysis/subject/${id}/info_graphs`)
                setData(response.data.data.subject)
            } catch (err) {
                error.setError(t("fetchError"))
                console.error("Erro ao buscar dados dos gráficos: ", err)
            }
        };
        fetch();
    }, [id, error.clear, error.setError, t]);
    if (error.hasError) {
        return (
            <div className="w-full mt-5 mb-5 h-24 Box flex items-center justify-center">
                {error.renderError()}
            </div>
        );
    }

    if (data) {
        return (
            <div className="flex flex-row space-x-5">
                <Grafico graph_data={data.usage_by_module} />
                <NumAbso situations={data.situations} />
            </div>
        );
    }

    return (
        <div className="w-full mt-5 mb-5 h-24 Box flex items-center justify-center">
            <Loading>{t("loading")}</Loading>
        </div>
    )

};
