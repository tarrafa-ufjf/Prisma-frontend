'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import embed, { VisualizationSpec } from 'vega-embed';

interface GraficoVegaPageProps {
    vegaSpec: VisualizationSpec | null | undefined;
}

export default function GraficoVegaPage({
    vegaSpec
}: GraficoVegaPageProps) {

    const t = useTranslations("Chatbot.visualization");
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let finalized = false;
        let finalizeView: (() => void) | undefined;

        if (!chartRef.current) {
            return;
        }

        if (vegaSpec === undefined || vegaSpec === null) {
            chartRef.current.innerHTML = "";
            return;
        }

        chartRef.current.innerHTML = "";

        embed(
            chartRef.current,
            vegaSpec,
            {
                actions: true,
                renderer: "svg"
            }
        ).then((result) => {
            finalizeView = () => result.view.finalize();

            if (finalized) {
                finalizeView();
            }
        });

        return () => {
            finalized = true;
            finalizeView?.();

            if (chartRef.current) {
                chartRef.current.innerHTML = "";
            }
        };

    }, [vegaSpec]);

    return (
        <div className="Box h-full">

            <div className="maincurso">
                <div className="mt-10 ml-10 mb-5">
                    <h1 className="text-xl font-poppins font-semibold text-left">
                        {t("title")}
                    </h1>
                </div>
            </div>

            <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[95%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />

            <div className="p-10">
                <div
                    ref={chartRef}
                    className={vegaSpec ? "block" : "hidden"}
                />

                {vegaSpec === null && (
                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            h-full
                            text-gray-400
                            text-lg
                        "
                    >
                        {t("empty")}
                    </div>
                )}
            </div>

        </div>
    );
}
