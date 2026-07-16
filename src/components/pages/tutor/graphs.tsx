'use client';

import { useError } from "@/hooks/useError"
import { api } from "@/utils/api"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

type PointsInfo = {
    is_current: boolean,
    tutor_id: number,
    value: number
}

type GraphInfo = {
    mean: number,
    median: number,
    points: PointsInfo[]
}
type GraphsInfo = {
    interactions: GraphInfo,
    response_time_hours: GraphInfo
}

interface GraphsProps {
    id_course: number
    id_tutor: number
}

export default function Graphs({ id_course, id_tutor }: GraphsProps) {
    const t = useTranslations("Tutors.detail.graphs")
    const [indicatorsData, setIndicatorsData] = useState<GraphsInfo | null>(null)
    const error = useError()

    useEffect(() => {
        async function fetch() {
            try {
                error.clear()
                const response = await api.get(`analysis/tutors/subject/${id_course}/tutor/${id_tutor}/graphs`)
                setIndicatorsData(response.data.data)
                console.log(response.data.data)
            } catch (err) {
                error.setError(t("fetchError"))
                console.error("Erro ao buscar indicadores: ", err)
            }
        };
        fetch();
    }, [id_course, id_tutor, error.clear, error.setError, t]);

    if (!indicatorsData) {
        return <div className="text-gray-500">{t("loading")}</div>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <DotPlotChart
                title={t("interactionsTitle")}
                subtitle={t("subtitle")}
                data={indicatorsData.interactions}
                xLabel={t("interactionsLabel")}
            />
            <DotPlotChart
                title={t("responseTimeTitle")}
                subtitle={t("subtitle")}
                data={indicatorsData.response_time_hours}
                xLabel={t("responseTimeLabel")}
            />
        </div>
    );
}

interface DotPlotChartProps {
    title: string
    subtitle: string
    data: GraphInfo
    xLabel: string
}

function DotPlotChart({ title, subtitle, data, xLabel }: DotPlotChartProps) {
    const t = useTranslations("Tutors.detail.graphs")
    const chartWidth = 500
    const chartHeight = 200
    const padding = { top: 20, right: 30, bottom: 60, left: 50 }
    const plotWidth = chartWidth - padding.left - padding.right
    const plotHeight = chartHeight - padding.top - padding.bottom

    // Encontrar o valor máximo para escalar o eixo X
    const maxValue = Math.max(...data.points.map(p => p.value), data.mean, data.median)
    const minValue = 0
    const range = maxValue - minValue || 1

    // Escala para posição X
    const scaleX = (value: number) => {
        return padding.left + ((value - minValue) / range) * plotWidth
    }

    // Posição Y fixa (meio do gráfico)
    const yPosition = padding.top + plotHeight / 2

    // Pontos para o eixo X
    const xTicks = 5
    const tickValues = Array.from({ length: xTicks }, (_, i) =>
        minValue + (range / (xTicks - 1)) * i
    )

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>

            <svg width={chartWidth} height={chartHeight} className="mx-auto">
                {/* Eixo X */}
                <line
                    x1={padding.left}
                    y1={yPosition}
                    x2={chartWidth - padding.right}
                    y2={yPosition}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                />

                {/* Grid vertical e labels do eixo X */}
                {tickValues.map((value, i) => (
                    <g key={i}>
                        <line
                            x1={scaleX(value)}
                            y1={padding.top}
                            x2={scaleX(value)}
                            y2={chartHeight - padding.bottom}
                            stroke="#f3f4f6"
                            strokeWidth="1"
                        />
                        <text
                            x={scaleX(value)}
                            y={chartHeight - padding.bottom + 20}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#6b7280"
                        >
                            {value.toFixed(0)}
                        </text>
                    </g>
                ))}

                {/* Label do eixo X */}
                <text
                    x={chartWidth / 2}
                    y={chartHeight - 10}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#6b7280"
                >
                    {xLabel}
                </text>

                {/* Linha da Média (sólida roxa) */}
                {data.mean >= 0 && (
                    <line
                        x1={scaleX(data.mean)}
                        y1={padding.top}
                        x2={scaleX(data.mean)}
                        y2={chartHeight - padding.bottom}
                        stroke="#8b5cf6"
                        strokeWidth="2"
                    />
                )}

                {/* Linha da Mediana (tracejada roxa) */}
                {data.median >= 0 && (
                    <line
                        x1={scaleX(data.median)}
                        y1={padding.top}
                        x2={scaleX(data.median)}
                        y2={chartHeight - padding.bottom}
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                    />
                )}

                {/* Pontos dos tutores */}
                {data.points.map((point, i) => (
                    <circle
                        key={point.tutor_id}
                        cx={scaleX(point.value)}
                        cy={yPosition}
                        r={point.is_current ? 8 : 6}
                        fill={point.is_current ? "#8b5cf6" : "#d1d5db"}
                        opacity={point.is_current ? 1 : 0.6}
                        className="transition-all hover:opacity-100"
                    >
                        <title>
                            {point.is_current ? t("currentTutor") : t("tutorWithId", { id: point.tutor_id })}: {point.value.toFixed(2)}
                        </title>
                    </circle>
                ))}
            </svg>

            {/* Legenda */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
                    <span className="text-gray-700">{t("currentTutor")}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-gray-700">{t("otherTutors")}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-[#8b5cf6]"></div>
                    <span className="text-gray-700">{t("mean")}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-[#8b5cf6] border-dashed" style={{ borderTop: '2px dashed #8b5cf6', background: 'transparent' }}></div>
                    <span className="text-gray-700">{t("median")}</span>
                </div>
            </div>
        </div>
    )
}
