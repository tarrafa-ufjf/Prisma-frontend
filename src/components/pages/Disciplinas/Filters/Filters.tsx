interface FiltersProps {
  indicador: string;
  setIndicador: (v: string) => void;
  magnitude: string;
  setMagnitude: (v: string) => void;
}

export default function Filters({indicador, setIndicador, magnitude, setMagnitude,}: FiltersProps) {
    const opcoesMagnitude =
    indicador === "Desistência"
      ? ["Positiva", "Negativa"]
      : ["Muito Alto", "Alto", "Médio", "Baixo", "Muito Baixo"];
      
    return (
        <div className="flex flex-row min-w-0">
            <div className="flex flex-row gap-2">
                <div className="flex flex-row">
                    <div className="flex-1 border-2 border-gray-300 bg-gray-100 p-2">
                        <span className="text-center align-middle text-gray-700 pt-1">Curso</span>
                    </div>
                    <select className="flex-1 select-filter cursor-pointer" defaultValue={""}>
                        <option value="" disabled>
                            Filtrar por Curso
                        </option>
                        <option>Licenciatura em Educação Física</option>
                        <option>Licenciatura em Geografia</option>
                        <option>Licenciatura em Letras-Português</option>
                    </select>
                </div>
                <div className="flex flex-row">
                    <div className="flex-1 border-2 border-gray-300 bg-gray-100 p-2">
                        <span className="text-gray-700">Indicador</span>
                    </div>
                    <select className="flex-1 select-filter cursor-pointer" value={indicador} onChange={(e) => setIndicador(e.target.value)}>
                        <option value="">Selecione</option>
                        <option>Interação Avaliativa</option>
                        <option>Interação Não Avaliativa</option>
                        <option>Desempenho</option>
                        <option>Profundidade Cognitiva</option>
                        <option>Relação Aluno-Professor</option>
                        <option>Desistência</option>
                    </select>
                </div>
                <div className="flex flex-row">
                <div className="flex-1 border-2 border-gray-300 bg-gray-100 p-2">
                    <span className="text-gray-700">Magnitude</span>
                </div>
                <select className="flex-1 select-filter cursor-pointer" value={magnitude} onChange={(e) => setMagnitude(e.target.value)}>
                    <option value="">Selecione</option>
                    {opcoesMagnitude.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
                </div>
            </div>
        </div>
    );
}