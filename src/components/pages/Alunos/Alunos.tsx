"use client";

import DataTable from "@/components/template/dataTable";
import SearchInput from "@/components/template/searchInput";
import { getColumns } from "@/utils/columns";
import ScrollableTabs from "@/components/template/indicadoresTabs";
import { Aluno as AlunoType, Tab } from "@/types/aluno";
import { Curso as CursoType } from "@/types/curso";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useError } from "@/hooks/useError";
import { useTranslations } from "next-intl";

interface AlunosProps {
  curso: CursoType;
}

const tabs: Tab[] = [
  "Interação Avaliativa",
  "Interação Não Avaliativa",
  "Desempenho",
  "Profundidade Cognitiva",
  "Desistência",
];

const tabMapping: Record<Tab, string> = {
  "Interação Avaliativa": "engagement",
  "Interação Não Avaliativa": "motivation",
  "Desempenho": "performance",
  "Profundidade Cognitiva": "cognitive",
  "Desistência": "give_up",
  "Respostas em Fóruns": "forum_responses",
  "Acesso à Disciplina": "course_access",
  "Feedback": "feedback",
};

export default function Alunos({ curso }: AlunosProps) {
  const t = useTranslations("Students");
  const [searchTerm, setSearchTerm] = useState("");
  const [alunos, setAlunos] = useState<AlunoType[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("Interação Avaliativa");
  const error = useError();

  useEffect(() => {
    const fetch = async () => {
      try {
        error.clear();
        console.log("Iniciando fetch:");
        const response = await api.get(
          `analysis/subject/${curso.id}/students/${tabMapping[activeTab]}`,
        );
        console.log(response.data.data);
        setAlunos(response.data.data);
      } catch (err) {
        error.setError(t("fetchError"));
        console.error("Erro ao buscar dados dos alunos: ", err);
      }
    };
    fetch();
  }, [curso, activeTab, error.clear, error.setError, t]);

  const columns = getColumns(activeTab, curso.id);

  return (
    <div className="flex-1 flex justify-center items-center pl-[240px]">
      <div className="BoxCurso">
        {/* Header */}
        <div className="flex flex-row justify-between items-start w-full mb-4">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-poppins font-semibold text-left">
              {t("title")}
            </h1>
            {curso ? (
              <p
                style={{ color: "#374DAA" }}
                className="text-left text-xl font-semibold"
              >
                {curso.fullname}
              </p>
            ) : (
              <p className="text-left">
                {t("noCourseSelected")}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end">
            {curso ? (
              <>
                <p className="text-sm text-right">{curso.period}</p>
                <p className="text-xl text-right font-poppins font-semibold">
                  {curso.shortname}
                </p>
              </>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        {curso && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between gap-1">
              <div className="flex-1 min-w-0 mt-2">
                <ScrollableTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setTab={setActiveTab}
                  setAlunos={setAlunos}
                />
              </div>
              <div className="flex-shrink-0">
                <SearchInput
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder={t("searchPlaceholder")}
                />
              </div>
            </div>

            {error.hasError ? (
              <div className="flex justify-center items-center p-8">
                {error.renderError()}
              </div>
            ) : (
              <DataTable
                rowsPerPage={10}
                data={alunos}
                columns={columns}
                searchTerm={searchTerm}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
