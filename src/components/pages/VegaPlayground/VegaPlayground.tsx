"use client";

import embed, { type VisualizationSpec } from "vega-embed";
import { useEffect, useMemo, useRef, useState } from "react";

const initialSpec = `{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "description": "Exemplo inicial para testar a integração com Vega-Lite.",
  "width": "container",
  "height": 320,
  "data": {
    "values": [
      { "categoria": "Aprovados", "total": 42 },
      { "categoria": "Em risco", "total": 18 },
      { "categoria": "Evadidos", "total": 7 }
    ]
  },
  "mark": {
    "type": "bar",
    "cornerRadiusEnd": 4
  },
  "encoding": {
    "x": {
      "field": "categoria",
      "type": "nominal",
      "axis": { "labelAngle": 0 }
    },
    "y": {
      "field": "total",
      "type": "quantitative"
    },
    "color": {
      "field": "categoria",
      "type": "nominal",
      "legend": null,
      "scale": { "range": ["#5A6ACF", "#F2B84B", "#E05263"] }
    },
    "tooltip": [
      { "field": "categoria", "type": "nominal" },
      { "field": "total", "type": "quantitative" }
    ]
  }
}`;

export default function VegaPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [specText, setSpecText] = useState(initialSpec);
  const [renderError, setRenderError] = useState<string | null>(null);

  const { parsedSpec, parseError } = useMemo(() => {
    try {
      return {
        parsedSpec: JSON.parse(specText) as VisualizationSpec,
        parseError: null,
      };
    } catch (err) {
      return {
        parsedSpec: null,
        parseError: err instanceof Error ? err.message : "JSON inválido",
      };
    }
  }, [specText]);

  const error = parseError ?? renderError;

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (!parsedSpec) {
      containerRef.current.innerHTML = "";
      return;
    }

    let isActive = true;
    let finalize: (() => void) | undefined;

    setRenderError(null);

    embed(containerRef.current, parsedSpec, {
      actions: true,
      renderer: "svg",
      defaultStyle: true,
    })
      .then((result) => {
        if (!isActive) {
          result.finalize();
          return;
        }

        finalize = result.finalize;
      })
      .catch((err) => {
        setRenderError(
          err instanceof Error ? err.message : "Erro ao renderizar Vega",
        );
      });

    return () => {
      isActive = false;
      finalize?.();
    };
  }, [parsedSpec]);

  return (
    <main className="min-h-screen bg-[#F8F9FC] px-6 py-8 sm:ml-[240px]">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold text-[#1F2937]">
            Playground Vega
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B]">
            Cole uma especificação Vega ou Vega-Lite em JSON para visualizar o
            gráfico renderizado no front.
          </p>
        </header>

        <section className="grid gap-6 xl:grid-cols-[minmax(420px,0.9fr)_minmax(520px,1.1fr)]">
          <div className="flex min-h-[620px] flex-col overflow-hidden rounded-[8px] border border-[#E2E8F0] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#334155]">
                Especificação JSON
              </h2>
              <button
                type="button"
                onClick={() => setSpecText(initialSpec)}
                className="rounded-[5px] bg-[#5A6ACF] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#374DAA]"
              >
                Restaurar exemplo
              </button>
            </div>

            <textarea
              value={specText}
              onChange={(event) => setSpecText(event.target.value)}
              spellCheck={false}
              className="min-h-[520px] flex-1 resize-none border-0 bg-[#0F172A] p-4 font-mono text-sm leading-6 text-[#E2E8F0] outline-none"
            />
          </div>

          <div className="flex min-h-[620px] flex-col rounded-[8px] border border-[#E2E8F0] bg-white shadow-sm">
            <div className="border-b border-[#E2E8F0] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#334155]">
                Visualização
              </h2>
            </div>

            {error ? (
              <div className="m-4 rounded-[6px] border border-[#FCA5A5] bg-[#FEF2F2] p-4 text-sm leading-6 text-[#991B1B]">
                {error}
              </div>
            ) : null}

            <div className="flex flex-1 items-center justify-center overflow-auto p-4">
              <div ref={containerRef} className="w-full" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
