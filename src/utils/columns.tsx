import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { DisciplinaType } from "../types/disciplina";
import { FaPlus } from "react-icons/fa";
import { Tooltip } from "@/components/template/tooltip";
import { getIndicatorsInfo } from "./indicatorsInfo";
import { Tutor as TutorType } from "@/types/tutor";
import { Aluno as AlunoType } from "@/types/aluno";

function ColumnText({ id }: { id: string }) {
  const t = useTranslations("Columns");
  return <>{t(id)}</>;
}

function HeaderWithTooltip({
  id,
  tooltip,
}: {
  id: string;
  tooltip?: string;
}) {
  return (
    <div className="flex items-start gap-1">
      <p className="min-w-0 flex-1 leading-tight">
        <ColumnText id={id} />
      </p>
      {tooltip && (
        <div className="flex shrink-0 pt-0.5">
          <Tooltip message={tooltip} />
        </div>
      )}
    </div>
  );
}

function UndefinedLabel() {
  return <ColumnText id="undefined" />;
}

function MoreTeachers({ count }: { count: number }) {
  const t = useTranslations("Columns");
  return <>{t("moreTeachers", { count })}</>;
}

const getNivelKey = (flag: string) => {
  if (flag == null || typeof flag !== "string") return "undefined";
  const normalized = flag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  switch (normalized) {
    case "muito_baixo":
      return "levels.veryLow";
    case "baixo":
      return "levels.low";
    case "normal":
      return "levels.normal";
    case "medio":
      return "levels.medium";
    case "alto":
      return "levels.high";
    case "muito_alto":
      return "levels.veryHigh";
    default:
      return "undefined";
  }
};

const getProfessores = (teachers?: { full_name: string; tutor_id: number }[]) => {
  if (!teachers || teachers.length === 0) {
    return <span><UndefinedLabel /></span>;
  }

  const max = 1;
  const visible = teachers.slice(0, max);
  const remaining = teachers.length - max;

  return (
    <div className="flex flex-col">
      {visible.map((teacher) => (
        <span key={teacher.tutor_id} className="text-sm">
          {teacher.full_name}
        </span>
      ))}

      {remaining > 0 && (
        <span className="text-xs text-gray-500">
          <MoreTeachers count={remaining} />
        </span>
      )}
    </div>
  );
};

const getMatriculados = (total_enrolled?: number) => {
  if (total_enrolled == null) {
    return (
      <span><UndefinedLabel /></span>
    );
  }

  return (
    <span>{total_enrolled}</span>
  );
};

const getNotaMedia = (mean_subject?: number) => {
  if (mean_subject == null || mean_subject === 0) {
    return <span><UndefinedLabel /></span>;
  }

  return <span>{mean_subject.toFixed(3)}</span>;
};

export const getNivel = (flag: string) => {
  return <ColumnText id={getNivelKey(flag)} />;
};

export const getFlagCor = (flag: string, reverse?: boolean) => {
  const f = flag.toLowerCase().replace(" ", "_");
  const colors = {
    muito_baixo: reverse
      ? "bg-emerald-100 text-emerald-700"
      : "bg-red-100 text-red-700",
    baixo: reverse
      ? "bg-indigo-100 text-indigo-700"
      : "bg-orange-100 text-orange-700",
    medio: "bg-yellow-100 text-yellow-700",
    alto: reverse
      ? "bg-orange-100 text-orange-700"
      : "bg-indigo-100 text-indigo-700",
    muito_alto: reverse
      ? "bg-red-100 text-red-700"
      : "bg-emerald-100 text-emerald-700",
  };
  switch (f) {
    case "muito_baixo":
      return colors.muito_baixo;
    case "baixo":
      return colors.baixo;
    case "normal":
    case "médio":
    case "medio":
      return colors.medio;
    case "alto":
      return colors.alto;
    case "muito_alto":
      return colors.muito_alto;
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export const getDesistencia = (flag: boolean) =>
  flag ? <ColumnText id="levels.positive" /> : <ColumnText id="levels.negative" />;

export const getFlagDesistenciaCor = (flag: boolean) =>
  flag ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700";

export const getColumns = (
  activeTab: string | null,
  cursoSelecionado: number | null,
) => {
  const detalhesColumnAlunos = {
    label: <ColumnText id="details" />,
    name: "detalhes",
    cell: (row: AlunoType) => (
      <Link
        href={`/cursos/${cursoSelecionado}/alunos/${row.user_id}`}
        className="cursor-pointer flex items-center justify-center w-full"
      >
        <FaPlus className="text-2xl text-gray-700" />
      </Link>
    ),
  };

  const detalhesColumnTutor = {
    label: <ColumnText id="details" />,
    name: "detalhes",
    cell: (row: TutorType) => (
      <Link
        href={`/tutores/curso/${cursoSelecionado}/${row.tutor_id}`}
        className="cursor-pointer flex items-center justify-center w-full"
      >
        <FaPlus className="text-2xl text-gray-700" />
      </Link>
    ),
  };

  const responseColumns = [
    {
      label: <ColumnText id="tutor" />,
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: <HeaderWithTooltip id="forumResponseIndex" tooltip={getIndicatorsInfo.responseInfo} />,
      name: "label_forums_response",
      cell: (row: TutorType) => {
        const value = row.label_forums_response?.toString() ?? "";
        return (
          <div
            className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(value)}`}
          >
            {getNivel(value)}
          </div>
        );
      },
    },
    {
      label: <ColumnText id="meanForumResponseHours" />,
      name: "mean_forums_response_hours",
    },
    {
      label: <HeaderWithTooltip id="meanForumResponseHoursIndex" />,
      name: "mean_forums_response_hours_label",
      cell: (row: TutorType) => {
        const value =
          row.mean_forums_response_hours_label?.toString() ?? "";
        return (
          <div
            className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(value)}`}
          >
            {getNivel(value)}
          </div>
        );
      },
    },
    {
      label: <ColumnText id="medianForumResponseHours" />,
      name: "median_forums_response_hours",
    },
    {
      label: <HeaderWithTooltip id="medianForumResponseHoursIndex" />,
      name: "label_feedback",
      cell: (row: TutorType) => {
        const value =
          row.median_forums_response_hours_label?.toString() ?? "";
        return (
          <div
            className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(value)}`}
          >
            {getNivel(value)}
          </div>
        );
      },
    },
    {
      label: <ColumnText id="fastForumResponses" />,
      name: "num_response_fast_forum",
    },
    {
      label: <ColumnText id="lateForumResponses" />,
      name: "num_response_late_forum",
    },
    {
      label: <ColumnText id="normalForumResponses" />,
      name: "num_response_normal_forum",
    },
    {
      label: <ColumnText id="accessScore" />,
      name: "score_access",
    },
    {
      label: <HeaderWithTooltip id="accessScoreIndex" />,
      name: "score_access_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.score_access_label.toString() ?? "")}`}
        >
          {getNivel(row.score_access_label.toString() ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="totalForumResponses" />,
      name: "total_response_forum",
    },
    detalhesColumnTutor,
  ];

  const feedbackColumns = [
    {
      label: <ColumnText id="tutor" />,
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: <HeaderWithTooltip id="feedbackIndex" tooltip={getIndicatorsInfo.feedbackInfo} />,
      name: "label_feedback",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.label_feedback.toString() ?? "")}`}
        >
          {getNivel(row.label_feedback.toString() ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="corrections" />,
      name: "n_corrections",
    },
    {
      label: <HeaderWithTooltip id="correctionsIndex" />,
      name: "n_corrections_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_corrections_label.toString() ?? "")}`}
        >
          {getNivel(row.n_corrections_label.toString() ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="correctionsWithFeedback" />,
      name: "n_corrections_with_feedback",
    },
    {
      label: <HeaderWithTooltip id="correctionsWithFeedbackIndex" />,
      name: "n_corrections_with_feedback_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_corrections_with_feedback_label.toString() ?? "")}`}
        >
          {getNivel(
            row.n_corrections_with_feedback_label.toString() ?? "",
          )}
        </div>
      ),
    },
    {
      label: <ColumnText id="pdfFeedbacks" />,
      name: "n_feedback_pdf",
    },
    {
      label: <HeaderWithTooltip id="pdfFeedbacksIndex" />,
      name: "n_feedback_pdf_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_feedback_pdf_label.toString() ?? "")}`}
        >
          {getNivel(row.n_feedback_pdf_label.toString() ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="textFeedbacks" />,
      name: "n_textual_feedback",
    },
    {
      label: <HeaderWithTooltip id="textFeedbacksIndex" />,
      name: "n_textual_feedback_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_textual_feedback_label.toString() ?? "")}`}
        >
          {getNivel(row.n_textual_feedback_label.toString() ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="feedbackPercentage" />,
      name: "percentage_feedback",
    },
    {
      label: <HeaderWithTooltip id="feedbackPercentageIndex" />,
      name: "percentage_feedback_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.percentage_feedback_label.toString() ?? "")}`}
        >
          {getNivel(row.percentage_feedback_label.toString() ?? "")}
        </div>
      ),
    },
    detalhesColumnTutor,
  ];

  const accessColumns = [
    {
      label: <ColumnText id="tutor" />,
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: <HeaderWithTooltip id="platformAccessIndex" tooltip={getIndicatorsInfo.accessInfo} />,
      name: "label_access",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.label_access.toString() ?? "")}`}
        >
          {getNivel(row.label_access.toString() ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="maximumInactiveDays" />,
      name: "maximum_inactivity_days",
    },
    {
      label: <HeaderWithTooltip id="inactiveDaysIndex" />,
      name: "maximum_inactivity_days_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.maximum_inactivity_days_label.toString() ?? "", true)}`}
        >
          {getNivel(
            row.maximum_inactivity_days_label.toString() ?? "",
          )}
        </div>
      ),
    },
    {
      label: <ColumnText id="logins" />,
      name: "n_login",
    },
    {
      label: <HeaderWithTooltip id="loginsIndex" />,
      name: "n_login_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_login_label.toString() ?? "")}`}
        >
          {getNivel(row.n_login_label.toString() ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="subjectLogins" />,
      name: "n_login_subject",
    },
    {
      label: <ColumnText id="weeklyLogins" />,
      name: "n_login_weekly",
    },
    {
      label: <HeaderWithTooltip id="weeklyLoginsIndex" />,
      name: "n_login_weekly_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_login_weekly_label.toString() ?? "")}`}
        >
          {getNivel(row.n_login_weekly_label.toString() ?? "")}
        </div>
      ),
    },
    detalhesColumnTutor,
  ];

  const engajamentoColumns = [
    {
      label: <ColumnText id="student" />,
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: <HeaderWithTooltip id="evaluativeInteractionIndex" tooltip={getIndicatorsInfo.interacaoAvaliativaInfo} />,
      name: "posts_required_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.posts_required_label ?? "")}`}
        >
          {getNivel(row.posts_required_label ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="evaluativeForumPosts" />,
      name: "num_posts_required",
    },
    detalhesColumnAlunos,
  ];

  const desempenhoColumns = [
    {
      label: <ColumnText id="student" />,
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: <HeaderWithTooltip id="performance" tooltip={getIndicatorsInfo.desempenhoInfo} />,
      name: "performance_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.performance_label ?? "")}`}
        >
          {getNivel(row.performance_label ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="grade" />,
      name: "media_percentual",
    },
    {
      label: <ColumnText id="classAverageComparison" />,
      name: "comparative",
    },
    detalhesColumnAlunos,
  ];

  const motivacaoColumns = [
    {
      label: <ColumnText id="student" />,
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: <HeaderWithTooltip id="nonEvaluativeInteractionIndex" tooltip={getIndicatorsInfo.interacaoNaoAvaliativaInfo} />,
      name: "posts_unrequired_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.posts_unrequired_label ?? "")}`}
        >
          {getNivel(row.posts_unrequired_label ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="nonRequiredForumPosts" />,
      name: "num_posts_unrequired",
    },
    detalhesColumnAlunos,
  ];

  const profCognitivaColumns = [
    {
      label: <ColumnText id="student" />,
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: <HeaderWithTooltip id="averageCognitiveDepth" tooltip={getIndicatorsInfo.profCogInfo} />,
      name: "label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.label ?? "")}`}
        >
          {getNivel(row.label ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="forumAverageCognitiveDepth" />,
      name: "forum_mean_level",
    },
    {
      label: <ColumnText id="quizAverageCognitiveDepth" />,
      name: "quiz_mean_level",
    },
    {
      label: <ColumnText id="assignmentAverageCognitiveDepth" />,
      name: "assign_mean_level",
    },
    detalhesColumnAlunos,
  ];

  const desistenciaColumns = [
    {
      label: <ColumnText id="student" />,
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: <HeaderWithTooltip id="dropoutIndex" tooltip={getIndicatorsInfo.desistenciaInfo} />,
      name: "give_up",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagDesistenciaCor(row.give_up ?? false)}`}
        >
          {getDesistencia(row.give_up ?? false)}
        </div>
      ),
    },
    {
      label: <ColumnText id="evaluativeInteractionIndex" />,
      name: "engagement_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium text-center mx-auto`}
        >
          {getNivel(row.engagement_label ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="nonEvaluativeInteractionIndex" />,
      name: "motivation_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium text-center mx-auto`}
        >
          {getNivel(row.motivation_label ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="performanceIndex" />,
      name: "performance_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium text-center mx-auto`}
        >
          {getNivel(row.performance_label ?? "")}
        </div>
      ),
    },
    {
      label: <ColumnText id="cognitiveDepthLevel" />,
      name: "cognitive_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium text-center mx-auto`}
        >
          {getNivel(row.cognitive_label ?? "")}
        </div>
      ),
    },
    detalhesColumnAlunos,
  ];

  const allSubjectsColumns = [
    {
      label: <ColumnText id="subject" />,
      name: "fullname",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: <HeaderWithTooltip id="evaluativeInteractionIndex" tooltip={getIndicatorsInfo.interacaoAvaliativaInfo} />,
      name: "flagEngajamento",
      cell: (row: DisciplinaType) => (
        <div
          className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(row.flagMotivacao ?? "")}`}
        >
          {getNivel(row.flagMotivacao ?? "")}
        </div>
      ),
    },
    {
      label: <HeaderWithTooltip id="nonEvaluativeInteractionIndex" tooltip={getIndicatorsInfo.interacaoNaoAvaliativaInfo} />,
      name: "flagMotivacao",
      cell: (row: DisciplinaType) => (
        <div
          className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(row.flagEngajamento ?? "")}`}
        >
          {getNivel(row.flagEngajamento ?? "")}
        </div>
      ),
    },
    {
      label: <HeaderWithTooltip id="performance" tooltip={getIndicatorsInfo.desempenhoInfo} />,
      name: "flagDesempenho",
      cell: (row: DisciplinaType) => (
        <div
          className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(row.flagDesempenho ?? "")}`}
        >
          {getNivel(row.flagDesempenho ?? "")}
        </div>
      ),
    },
    {
      label: <HeaderWithTooltip id="cognitiveDepth" tooltip={getIndicatorsInfo.profCogInfo} />,
      name: "flagProfCog",
      cell: (row: DisciplinaType) => (
        <div
          className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(row.flagProfCog ?? "")}`}
        >
          {getNivel(row.flagProfCog ?? "")}
        </div>
      ),
    },
    {
      label: <HeaderWithTooltip id="studentTeacherRelationship" tooltip={getIndicatorsInfo.relacaoAlunoProfInfo} />,
      name: "flagRelAlunoProf",
      cell: (row: DisciplinaType) => (
        <div
          className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(row.flagRelAlunoProf ?? "")}`}
        >
          {getNivel(row.flagRelAlunoProf ?? "")}
        </div>
      ),
    },
    {
      label: <HeaderWithTooltip id="dropoutIndex" tooltip={getIndicatorsInfo.desistenciaInfo} />,
      name: "flagDesistencia",
      cell: (row: DisciplinaType) => (
        <div
          className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagDesistenciaCor(row.flagDesistencia ?? false)}`}
        >
          {getDesistencia(row.flagDesistencia ?? false)}
        </div>
      ),
    },
    {
      label: <ColumnText id="enrolledStudents" />,
      name: "total_enrolled",
      cell: (row: DisciplinaType) => getMatriculados(row.total_enrolled),
    },
    {
      label: <ColumnText id="classGradeAverage" />,
      name: "mean_subject",
      cell: (row: DisciplinaType) => getNotaMedia(row.mean_subject),
    },
    {
      label: <ColumnText id="teacher" />,
      name: "teachers",
      options: {
        headerClassName: "min-w-64",
        cellClassName: "min-w-64",
      },
      cell: (row: DisciplinaType) => getProfessores(row.teachers),
    },
    {
      label: <ColumnText id="details" />,
      name: "detalhes",
      cell: (row: DisciplinaType) => (
        <Link
          href={`/cursos/${row.id}`}
          className="cursor-pointer flex items-center justify-center w-full"
        >
          <FaPlus className="text-2xl text-gray-700" />
        </Link>
      ),
    },
  ];

  switch (activeTab) {
    case "Interação Avaliativa":
      return engajamentoColumns;
    case "Desempenho":
      return desempenhoColumns;
    case "Interação Não Avaliativa":
      return motivacaoColumns;
    case "Profundidade Cognitiva":
      return profCognitivaColumns;
    case "Desistência":
      return desistenciaColumns;
    case "allSubjects":
      return allSubjectsColumns;
    case "Feedback":
      return feedbackColumns;
    case "Respostas em Fóruns":
      return responseColumns;
    case "Acesso à Disciplina":
      return accessColumns;
    default:
      return engajamentoColumns;
  }
};
