import DadosGerais from '@/components/pages/Curso/DadosGerais/DadosGerais';
import Graficos from '@/components/pages/Curso/Graficos/graficos';
import Indicators from '@/components/pages/Curso/Indicator/Indicators';
import Rankings from '@/components/pages/Curso/rankings/ranking';
import NotFound from '@/components/ui/not-found';
import { getCourses } from '@/utils/api-server';

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const page_param = await params
  const cursos = await getCourses()
  const curso = cursos.filter(curso => curso.id == Number(page_param.id))[0]

  if (!curso) {
    return (
      <NotFound cursos={cursos}>
        <div className="flex-1 flex justify-center items-center pt-4 pl-[240px]">
          <p>Curso {page_param.id} não encontrado! Por favor, use o menu no canto superior esquerdo, ou tente novamente mais tarde!</p>
        </div>
      </NotFound>
    )
  }

  return (
    <div className="flex-1 flex justify-center items-center pl-[240px]">
      <div className="BoxCurso">
        <div className="flex flex-row justify-between items-start w-full">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-poppins font-semibold text-left">Disciplina</h1>
            <p style={{ color: '#374DAA' }} className="text-left text-xl font-semibold">
              {curso.fullname}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm text-right">{curso.period}</p>
            <p className="text-xl text-right font-poppins font-semibold">{curso.shortname}</p>
          </div>
        </div>
        <div>
          <div className="center-wrapper flex flex-col justify-between">
            <DadosGerais id={curso.id} />
            <Indicators id={curso.id} />
            <Graficos id={curso.id} />
            <Rankings id={curso.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
