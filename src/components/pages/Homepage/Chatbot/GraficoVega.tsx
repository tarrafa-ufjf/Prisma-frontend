'use client';

import { useEffect, useRef } from 'react';
import embed, { VisualizationSpec } from 'vega-embed';

interface GraficoVegaPageProps {
    vegaSpec: VisualizationSpec | null;
}

export default function GraficoVegaPage({
    vegaSpec
}: GraficoVegaPageProps) {

    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (!chartRef.current) {
            return;
        }

        if (vegaSpec === undefined) {
            return;
        }

        if (vegaSpec === null) {
            chartRef.current.innerHTML = "";
            return;
        }

        embed(
            chartRef.current,
            vegaSpec,
            {
                actions: true,
                renderer: "svg"
            }
        );

    }, [vegaSpec]);

    return (
        <div className="Box h-full">

            <div className="maincurso">
                <div className="mt-10 ml-10 mb-5">
                    <h1 className="text-xl font-poppins font-semibold text-left">
                        Visualização
                    </h1>
                </div>
            </div>

            <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[95%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />

            <div className="p-10">

                {vegaSpec === undefined ? (
                    <div />
                ) : vegaSpec === null ? (
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
                        Nenhum gráfico disponível para esta pergunta.
                    </div>
                ) : (
                    <div ref={chartRef} />
                )}
            </div>

        </div>
    );
}