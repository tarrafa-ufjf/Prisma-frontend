import Tutores from "@/components/pages/Tutores/tutores";
import NotFound from "@/components/ui/not-found";
import { getCourses } from "@/utils/api-server";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{
    locale: string;
    id_course: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const page_param = await params;
  const t = await getTranslations("Courses");
  const cursos = await getCourses();
  const curso = cursos.filter((curso) => curso.id == Number(page_param.id_course))[0];

  if (!curso) {
    return (
      <NotFound cursos={cursos}>
        <div className="flex-1 flex justify-center items-center pt-4 pl-[240px]">
          <p>{t("notFound", { courseId: page_param.id_course })}</p>
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
