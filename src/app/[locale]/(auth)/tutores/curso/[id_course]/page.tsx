import Rankings from "@/components/pages/Tutores/Rankings/ranking";
import DadosGeraisTutores from "@/components/pages/Tutores/DadosGerais/DadosGeraisTutores";
import Indicators from "@/components/pages/Tutores/Indicador/indicator-tutor";
import TableComponent from "@/components/pages/Tutores/Table/Table-component";
import NotFound from "@/components/ui/not-found";
import { getCourses } from "@/utils/api-server";
import PageTemplate from "@/components/template/page-template";
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
    <PageTemplate
      title={t("course")}
      subTitle={curso.fullname}
      courseInfo={{
        period: curso.period,
        shortName: curso.shortname
      }}
    >
      <DadosGeraisTutores id={curso.id} />
      <Indicators id={curso.id} />
      <TableComponent id={curso.id} />
      <Rankings id={curso.id} />
    </PageTemplate>
  );
}
