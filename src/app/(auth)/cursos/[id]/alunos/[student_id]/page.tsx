import AlunoPageClient from '@/components/pages/Aluno/AlunoPageClient';
import NotFound from '@/components/ui/not-found';
import { getCourses } from '@/utils/api-server';

interface PageProps {
  params: {
    id: string;
    student_id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id, student_id } = params;

  const cursos = await getCourses();
  const curso = cursos.find(curso => curso.id === Number(id));

  if (!curso) {
    return (
      <NotFound cursos={cursos}>
        <div className="flex-1 flex justify-center items-center pt-4 pl-[240px]">
          <p>Curso {id} não encontrado!</p>
        </div>
      </NotFound>
    );
  }

  return (
    <AlunoPageClient
      curso={curso}
      alunoId={Number(student_id)}
    />
  );
}
