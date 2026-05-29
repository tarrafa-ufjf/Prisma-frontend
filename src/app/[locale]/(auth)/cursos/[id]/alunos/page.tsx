import { getCourses } from '@/utils/api-server';
import NotFound from '@/components/ui/not-found';
import Alunos from '@/components/pages/Alunos/Alunos';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>
}

export default async function Page({ params }: PageProps) {
  const page_param = await params
  const t = await getTranslations('Courses')
  const cursos = await getCourses()
  const curso = cursos.filter(curso => curso.id == Number(page_param.id))[0]

  if (!curso) {
    return (
      <NotFound cursos={cursos}>
        <div className="flex-1 flex justify-center items-center pt-4 pl-[240px]">
          <p>{t('notFound', { courseId: page_param.id })}</p>
        </div>
      </NotFound>
    )
  }

  return <Alunos curso={curso} />;
}
