import * as React from "react";
import DataTable from "@/components/template/dataTable";
import SearchInput from "@/components/template/searchInput";
import { getColumns } from "@/utils/columns";
import { DisciplinaType } from "@/types/disciplina";
import Filters from "./Filters/Filters";

interface DisciplinasProps {
  disciplinas: DisciplinaType[];
}

export default function Disciplinas({ disciplinas }: DisciplinasProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const activeTab = 'allSubjects';

  const columns = getColumns(activeTab, null);

  if (!disciplinas || disciplinas.length < 1) {
    return (
      <div className="flex-1 flex justify-center items-center pl-[240px]">
        <div className="BoxCurso">
          <div className="flex items-start py-8">
            <div>Carregando disciplinas...</div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex justify-center items-center pl-[240px]">
      <div className="BoxCurso">
        <div className="flex flex-row justify-between items-start w-full mb-4">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-poppins font-semibold text-left">Visão Geral</h1>
            <p style={{ color: '#374DAA' }} className="text-left text-xl font-semibold">
              das Disciplinas
            </p>
          </div>
          <div className="flex flex-col items-end">
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between gap-1 mb-1">
            <Filters />
            <div className="flex-shrink-0">
              <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Disciplina" />
            </div>
          </div>

          <DataTable
            rowsPerPage={10}
            data={disciplinas}
            columns={columns}
            searchTerm={searchTerm}
          />
        </div>

      </div>
    </div>
  );
}