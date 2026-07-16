import { useTranslations } from "next-intl";

interface FiltersProps {
  indicador: string;
  setIndicador: (v: string) => void;
  magnitude: string;
  setMagnitude: (v: string) => void;
}

export default function Filters({indicador, setIndicador, magnitude, setMagnitude,}: FiltersProps) {
    const t = useTranslations("Subjects.filters");
    const opcoesMagnitude =
    indicador === "Desistência"
      ? ["Positiva", "Negativa"]
      : ["Muito Alto", "Alto", "Médio", "Baixo", "Muito Baixo"];

    const indicatorOptions = [
        { value: "Interação Avaliativa", label: t("indicators.evaluativeInteraction") },
        { value: "Interação Não Avaliativa", label: t("indicators.nonEvaluativeInteraction") },
        { value: "Desempenho", label: t("indicators.performance") },
        { value: "Profundidade Cognitiva", label: t("indicators.cognitiveDepth") },
        { value: "Relação Aluno-Professor", label: t("indicators.studentTeacherRelationship") },
        { value: "Desistência", label: t("indicators.dropout") },
    ];

    const magnitudeLabels: Record<string, string> = {
        "Positiva": t("magnitudes.positive"),
        "Negativa": t("magnitudes.negative"),
        "Muito Alto": t("magnitudes.veryHigh"),
        "Alto": t("magnitudes.high"),
        "Médio": t("magnitudes.medium"),
        "Baixo": t("magnitudes.low"),
        "Muito Baixo": t("magnitudes.veryLow"),
    };
      
    return (
        <div className="flex flex-row min-w-0">
            <div className="flex flex-row gap-2">
                <div className="flex flex-row">
                    <div className="flex-1 border-2 border-gray-300 bg-gray-100 p-2">
                        <span className="text-center align-middle text-gray-700 pt-1">{t("course")}</span>
                    </div>
                    <select className="flex-1 select-filter cursor-pointer" defaultValue={""}>
                        <option value="" disabled>
                            {t("filterByCourse")}
                        </option>
                        <option>Licenciatura em Educação Física</option>
                        <option>Licenciatura em Geografia</option>
                        <option>Licenciatura em Letras-Português</option>
                    </select>
                </div>
                <div className="flex flex-row">
                    <div className="flex-1 border-2 border-gray-300 bg-gray-100 p-2">
                        <span className="text-gray-700">{t("indicator")}</span>
                    </div>
                    <select className="flex-1 select-filter cursor-pointer" value={indicador} onChange={(e) => setIndicador(e.target.value)}>
                        <option value="">{t("select")}</option>
                        {indicatorOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row">
                <div className="flex-1 border-2 border-gray-300 bg-gray-100 p-2">
                    <span className="text-gray-700">{t("magnitude")}</span>
                </div>
                <select className="flex-1 select-filter cursor-pointer" value={magnitude} onChange={(e) => setMagnitude(e.target.value)}>
                    <option value="">{t("select")}</option>
                    {opcoesMagnitude.map((m) => (
                        <option key={m} value={m}>{magnitudeLabels[m]}</option>
                    ))}
                </select>
                </div>
            </div>
        </div>
    );
}
