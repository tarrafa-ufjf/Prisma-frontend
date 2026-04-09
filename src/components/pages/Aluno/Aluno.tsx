import * as React from "react";
import { Aluno as AlunoType } from "@/types/aluno";
import Indicators from "./Indicator/Indicators";
import GaugeChart from "./GaugeChart/GaugeChart";
import AtividadesChart from "./AtividadesChart/AtividadesChart";
import DadosPessoais from "./DadosPessoais/DadosPessoais";

type CursoType = {
  id: number;
  shortname: string;
  nome: string;
  data: string;
  value: number;
  fullname: string;
  period: string;
};

interface AlunoProps {
  cursos: CursoType[];
  cursoSelecionado: number | null;
  alunos: AlunoType[];
  alunoSelecionado: number | null;
}

export default function Aluno({ cursos, cursoSelecionado, alunos, alunoSelecionado }: AlunoProps) {
  const curso = cursos.find(c => c.id === cursoSelecionado);
  const aluno = alunos.find(a => a.id === alunoSelecionado);

  return (
    <div className="flex-1 flex justify-center items-center pl-[240px]">
      <div className="BoxCurso">
        <div className="flex flex-row justify-between items-start w-full mb-4">
          <div className="flex flex-col items-start">
            {!aluno || !curso ? (
              <div>
                <h1 className="text-xl font-poppins font-semibold text-left">Aluno</h1>
                <p className="text-left">Nenhum aluno foi selecionado ainda.</p>
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-semibold text-left">
                  {aluno.full_name}
                </h1>
                <p style={{ color: '#374DAA' }} className="text-left text-xl font-semibold">
                  {curso.nome}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
            {!aluno || !curso ? (
              <>
                <p></p>
              </>
            ) : (
              <>
                <p className="text-sm text-right">{curso.data}</p>
                <p className="text-xl text-right font-semibold">{curso.shortname}</p>
              </>
            )}
          </div>
        </div>
        {curso && aluno && (
          <div className="flex flex-col justify-between">
            <DadosPessoais aluno={aluno} curso={curso} />

            <Indicators aluno={aluno} cursoSelecionado={cursoSelecionado} />

            <div className="flex gap-4 mb-8 justify-between">
              <div className="Box4 flex-1 p-6">
                <h1 className="text-xl font-poppins font-semibold text-left">
                  Nota final
                </h1>
                <p className="text-[#9291A5] mb-6 pb-4 border-b border-gray-200">da disciplina</p>
                <div className="flex p-2 justify-center"><GaugeChart curso={curso} aluno={aluno}/></div>
              </div>

              <div className="Box4 flex-1 p-6">
                <h1 className="text-xl font-poppins font-semibold text-left">
                  Notas
                </h1>
                <p className="text-[#9291A5] mb-4 pb-4 border-b border-gray-200">da disciplina</p>
                <div className="overflow-auto">
                  <AtividadesChart curso={curso} aluno={aluno}/>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}