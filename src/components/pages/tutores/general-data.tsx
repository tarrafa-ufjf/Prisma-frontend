import Loading from "@/components/ui/loading"
import { useError } from "@/hooks/useError"
import { api } from "@/utils/api"
import { useEffect, useState } from "react"

export default function GeneralData() {
  const [data, setData] = useState<any>(null)
  const error = useError()

  useEffect(() => {
    const fetch = async () => {
      try {
        error.clear()
        const response = await api.get(`analysis/tutors/general/summary`)
        const response_data = response.data.data
        setData(response_data)
      } catch (err) {
        error.setError("Erro ao buscar dados gerais")
        console.error("Erro ao buscar dados gerais: ", err)
      }
    }
    fetch()
  }, [error.clear, error.setError])


  return (
    <div className="Box2 mt-10">
      <div className="mb-14">
        <div className="maincurso">
          <div className="mt-10 ml-10 mb-5">
            <h1 className="text-xl font-poppins font-semibold text-left">
              Dados Gerais
            </h1>
            <p style={{ color: "#9291A5" }}>dos Tutores da Instituição</p>
          </div>
        </div>
        <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />
      </div>

      <div className="flex items-center justify-center mb-14">
        {error.hasError && error.renderError()}
        {data ? (
          <div className="flex flex-row justify-between items-center space-x-47">
            <div className="flex flex-row items-center">
              <p className="text-base text-gray-600 mb-2 text-left mr-6">
                Total de<br />tutores da <br /> instituição
              </p>
              <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base">
                {data.total_tutors ? data.total_tutors.toLocaleString('pt-BR') : 0}
              </div>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-base text-gray-600 mb-2 text-left mr-6">
                Média de<br />tutores por<br />curso
              </p>
              <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base ">
                {data.mean_tutors_per_subject ? data.mean_tutors_per_subject.toLocaleString('pt-BR') : 0}
              </div>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-base text-gray-600 mb-2 text-left mr-6">
                Média de<br />alunos por<br />tutor
              </p>
              <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base ">
                {data.mean_tutors_per_degree_program ? data.mean_tutors_per_degree_program.toLocaleString('pt-BR') : 0}
              </div>
            </div>
          </div>
        ) : (
          <Loading>Carregando dados gerais</Loading>
        )}
      </div>
    </div>
  );
}
