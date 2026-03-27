export default function Filters() {
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
                        <span className="text-center align-middle text-gray-700 pt-1">Indicador</span>
                    </div>
                    <select className="flex-1 select-filter cursor-pointer" defaultValue={""}>
                        <option value="" disabled>
                            Filtrar por Indicador
                        </option>
                        <option>Interação Avaliativa</option>
                        <option>Interação Não Avaliativa</option>
                        <option>Desempenho</option>
                        <option>Profundidade Cognitiva</option>
                        <option>Desistência</option>
                    </select>
                </div>
                <div className="flex flex-row">
                    <div className="flex-1 border-2 border-gray-300 bg-gray-100 p-2">
                        <span className="text-center align-middle text-gray-700 pt-1">Magnitude</span>
                    </div>
                    <select className="flex-1 select-filter cursor-pointer" defaultValue={""}>
                        <option value="" disabled>
                            Filtrar por Magnitude
                        </option>
                        <option>Muito Alto</option>
                        <option>Alto</option>
                        <option>Médio</option>
                        <option>Baixo</option>
                        <option>Muito Baixo</option>
                    </select>
                </div>
            </div>
        </div>
    );
}