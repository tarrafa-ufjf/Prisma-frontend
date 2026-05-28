import * as React from "react";
import DataTable from "@/components/template/dataTable";
import SearchInput from "@/components/template/searchInput";
import { getColumns } from "@/utils/columns";
import { DisciplinaType } from "@/types/disciplina";
import Filters from "./Filters/Filters";
import { useTranslations } from "next-intl";

interface DisciplinasProps {
  disciplinas: DisciplinaType[];
}

export default function Disciplinas({ disciplinas }: DisciplinasProps) {
  const t = useTranslations('Subjects');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [indicador, setIndicador] = React.useState('');
  const [magnitude, setMagnitude] = React.useState('');
  const activeTab = 'allSubjects';

  const columns = getColumns(activeTab, null);

  if (!disciplinas || disciplinas.length < 1) {
    return (
      <div className="flex-1 flex justify-center items-center pl-[240px]">
        <div className="BoxCurso">
          <div className="flex items-start py-8">
            <div>{t('loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  const normalize = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_");
  };

  const disciplinasFiltradas = disciplinas.filter((d) => {
    if (!indicador) return true;

    const map: Record<string, string | undefined> = {
      "Interação Avaliativa": d.flagMotivacao,
      "Interação Não Avaliativa": d.flagEngajamento,
      "Desempenho": d.flagDesempenho,
      "Profundidade Cognitiva": d.flagProfCog,
      "Relação Aluno-Professor":d.flagRelAlunoProf,
      "Desistência": d.flagDesistencia ? "positiva" : "negativa",
    };
    const valor = map[indicador];

    if (!valor) return false;

    if (!magnitude) return true;

    return normalize(valor) === normalize(magnitude);
  });
  
  return (
    <div className="flex-1 flex justify-center items-center pl-[240px]">
      <div className="BoxCurso">
        <div className="flex flex-row justify-between items-start w-full mb-4">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-poppins font-semibold text-left">{t('overview')}</h1>
            <p style={{ color: '#374DAA' }} className="text-left text-xl font-semibold">
              {t('subtitle')}
            </p>
          </div>
          <div className="flex flex-col items-end">
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between gap-1 mb-1">
            <Filters
              indicador={indicador}
              setIndicador={setIndicador}
              magnitude={magnitude}
              setMagnitude={setMagnitude}
            />
            <div className="flex-shrink-0">
              <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={t('searchPlaceholder')} />
            </div>
          </div>

          <DataTable
            rowsPerPage={10}
            data={disciplinasFiltradas}
            columns={columns}
            searchTerm={searchTerm}
          />
        </div>

      </div>
    </div>
  );
}
