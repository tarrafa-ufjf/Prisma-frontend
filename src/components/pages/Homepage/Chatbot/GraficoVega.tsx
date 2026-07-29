'use client';

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import embed, { type VisualizationSpec } from "vega-embed";

interface GraficoVegaPageProps {
    vegaSpec: VisualizationSpec | null | undefined;
}

export default function GraficoVegaPage({ vegaSpec }: GraficoVegaPageProps) {
    const t = useTranslations("Chatbot.visualization");
    const chartRef = useRef<HTMLDivElement>(null);
    const [renderError, setRenderError] = useState(false);

    useEffect(() => {
        const chartElement = chartRef.current;
        let disposed = false;
        let finalizeView: (() => void) | undefined;

        setRenderError(false);

        if (!chartElement) {
            return;
        }

        chartElement.innerHTML = "";

        if (!vegaSpec) {
            return;
        }

        embed(chartElement, vegaSpec, {
            actions: true,
            renderer: "svg"
        })
            .then((result) => {
                finalizeView = () => result.view.finalize();

                if (disposed) {
                    finalizeView();
                }
            })
            .catch(() => {
                if (!disposed) {
                    setRenderError(true);
                }
            });

        return () => {
            disposed = true;
            finalizeView?.();
            chartElement.innerHTML = "";
        };
    }, [vegaSpec]);

    return (
        <div className="Box flex h-full min-w-0 flex-col overflow-hidden">
            <div className="shrink-0">
                <div className="mx-6 mb-5 mt-10">
                    <h1 className="text-left font-poppins text-xl font-semibold">
                        {t("title")}
                    </h1>
                </div>
            </div>

            <div className="h-px w-[95%] shrink-0 self-center bg-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05)]" />

            <div className="min-h-0 min-w-0 flex-1 overflow-auto p-6">
                <div
                    ref={chartRef}
                    className={vegaSpec ? "flex min-h-full w-full min-w-0 items-start justify-center [&_.vega-embed]:max-w-full" : "hidden"}
                />

                {vegaSpec === null && (
                    <div className="flex h-full items-center justify-center text-center text-lg text-gray-400">
                        {t("empty")}
                    </div>
                )}

                {renderError && (
                    <div className="flex h-full items-center justify-center text-center text-lg text-red-500">
                        {t("error")}
                    </div>
                )}
            </div>
        </div>
    );
}
