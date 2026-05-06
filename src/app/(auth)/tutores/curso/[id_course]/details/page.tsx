import Tutores from "@/components/pages/Tutores/tutores";
import NotFound from "@/components/ui/not-found";
import { getCourses } from "@/utils/api-server";

interface PageProps {
  params: Promise<{
    id_course: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const page_param = await params;
  const cursos = await getCourses();
  const curso = cursos.filter((curso) => curso.id == Number(page_param.id_course))[0];

  if (!curso) {
    return (
      <NotFound cursos={cursos}>
        <div className="flex-1 flex justify-center items-center pt-4 pl-[240px]">
          <p>
            Curso {page_param.id_course} não encontrado! Por favor, use o menu no canto
            superior esquerdo, ou tente novamente mais tarde!
          </p>
        </div>
      </NotFound>
    );
  }

  return (
    <div>
      <Tutores curso={curso} />
    </div>
  );
}
