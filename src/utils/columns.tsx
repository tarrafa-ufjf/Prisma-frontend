import Link from "next/link";
import { DisciplinaType } from "../types/disciplina";
import { FaPlus } from "react-icons/fa";
import { Tooltip } from "@/components/template/tooltip";
import { getIndicatorsInfo } from "./indicatorsInfo";
import { Tutor as TutorType } from "@/types/tutor";
import { get } from "http";
import { Aluno as AlunoType } from "@/types/aluno";

const getProfessores = (teachers?: { full_name: string; tutor_id: number }[]) => {
  if (!teachers || teachers.length === 0) {
    return <span>Não definido</span>;
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
          +{remaining} outros
        </span>
      )}
    </div>
  );
};

const getMatriculados = (total_enrolled?: number) => {
  if (total_enrolled == null) {
    return (
      <span>Não definido</span>
    );
  }

  return (
    <span>{total_enrolled}</span>
  );
};

const getNotaMedia = (mean_subject?: number) => {
  if (mean_subject == null || mean_subject === 0) {
    return <span>Não definido</span>;
  }

  return <span>{mean_subject.toFixed(3)}</span>;
};

export const getNivel = (flag: string) => {
  if (flag == null || typeof flag !== "string") return "Não definido";
  const normalized = flag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  switch (normalized) {
    case "muito_baixo":
      return "Muito Baixo";
    case "baixo":
      return "Baixo";
    case "normal":
      return "Normal";
    case "medio":
      return "Médio";
    case "alto":
      return "Alto";
    case "muito_alto":
      return "Muito Alto";
    default:
      return "Não definido";
  }
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

// export const getProfCogCor = (nivel: number) => {
// 	switch (nivel) {
// 		case 0: return "bg-red-100 text-red-700";
// 		case 1: return "bg-orange-100 text-orange-700";
// 		case 2: return "bg-indigo-100 text-indigo-700";
// 		case 3: return "bg-emerald-100 text-emerald-700";
// 		default: return "bg-gray-100 text-gray-600";
// 	}
// };

export const getDesistencia = (flag: boolean) =>
  flag ? "Positiva" : "Negativa";

export const getFlagDesistenciaCor = (flag: boolean) =>
  flag ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700";

export const getColumns = (
  activeTab: string | null,
  cursoSelecionado: number | null,
) => {
  const detalhesColumnAlunos = {
    label: "Detalhes",
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
    label: "Detalhes",
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
      label: "Tutor",
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de Respostas em fóruns</p>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center w-[10%] pr-1">
            <Tooltip message={getIndicatorsInfo.responseInfo} />
          </div>
        </div>
      ),
      name: "label_forums_response",
      cell: (row: TutorType) => {
        const value = row.label_forums_response?.toString() ?? "Não definido";
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
      label: "Média de resposta em fóruns por hora",
      name: "mean_forums_response_hours",
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice da média de respostas em fóruns por hora</p>
          </div>
        </div>
      ),
      name: "mean_forums_response_hours_label",
      cell: (row: TutorType) => {
        const value =
          row.mean_forums_response_hours_label?.toString() ?? "Não definido";
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
      label: "Mediana de resposta em fóruns por hora",
      name: "median_forums_response_hours",
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice da mediana de respostas em fóruns por hora</p>
          </div>
        </div>
      ),
      name: "label_feedback",
      cell: (row: TutorType) => {
        const value =
          row.median_forums_response_hours_label?.toString() ?? "Não definido";
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
      label: "Nº de Respostas Rápidas em fóruns",
      name: "num_response_fast_forum",
    },
    {
      label: "Nº de Respostas Lentas em fóruns",
      name: "num_response_late_forum",
    },
    {
      label: "Nº de Respostas com tempo normal em fóruns",
      name: "num_response_normal_forum",
    },
    {
      label: "Pontuação de acesso",
      name: "score_access",
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de pontuação de acesso</p>
          </div>
        </div>
      ),
      name: "score_access_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.score_access_label.toString() ?? "Não definido")}`}
        >
          {getNivel(row.score_access_label.toString() ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Número total de repostas em fóruns",
      name: "total_response_forum",
    },
    detalhesColumnTutor,
  ];

  const feedbackColumns = [
    {
      label: "Tutor",
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de Feedback</p>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center w-[10%] pr-1">
            <Tooltip message={getIndicatorsInfo.feedbackInfo} />
          </div>
        </div>
      ),
      name: "label_feedback",
      cell: (row: TutorType) => (
        console.log(row.label_feedback.toString()),
        (
          <div
            className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.label_feedback.toString() ?? "Não definido")}`}
          >
            {getNivel(row.label_feedback.toString() ?? "Não definido")}
          </div>
        )
      ),
    },
    {
      label: "Nº de Correções",
      name: "n_corrections",
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de Correções</p>
          </div>
        </div>
      ),
      name: "n_corrections_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_corrections_label.toString() ?? "Não definido")}`}
        >
          {getNivel(row.n_corrections_label.toString() ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Nº de Correções com feedback",
      name: "n_corrections_with_feedback",
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de Correções com feedback</p>
          </div>
        </div>
      ),
      name: "n_corrections_with_feedback_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_corrections_with_feedback_label.toString() ?? "Não definido")}`}
        >
          {getNivel(
            row.n_corrections_with_feedback_label.toString() ?? "Não definido",
          )}
        </div>
      ),
    },
    {
      label: "Nº de feedbacks em PDFs",
      name: "n_feedback_pdf",
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de feedbacks em PDFs </p>
          </div>
        </div>
      ),
      name: "n_feedback_pdf_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_feedback_pdf_label.toString() ?? "Não definido")}`}
        >
          {getNivel(row.n_feedback_pdf_label.toString() ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Nº de feedbacks textuais",
      name: "n_textual_feedback",
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de feedback textual</p>
          </div>
        </div>
      ),
      name: "n_textual_feedback_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_textual_feedback_label.toString() ?? "Não definido")}`}
        >
          {getNivel(row.n_textual_feedback_label.toString() ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Porcentagem de feedbacks",
      name: "percentage_feedback",
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice da porcentagem de feedbacks</p>
          </div>
        </div>
      ),
      name: "percentage_feedback_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.percentage_feedback_label.toString() ?? "Não definido")}`}
        >
          {getNivel(row.percentage_feedback_label.toString() ?? "Não definido")}
        </div>
      ),
    },
    detalhesColumnTutor,
  ];

  const accessColumns = [
    {
      label: "Tutor",
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de Acessos à Plataforma</p>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center w-[10%] pr-1">
            <Tooltip message={getIndicatorsInfo.accessInfo} />
          </div>
        </div>
      ),
      name: "label_access",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.label_access.toString() ?? "Não definido")}`}
        >
          {getNivel(row.label_access.toString() ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Quantidade máxima de dias inativos",
      name: "maximum_inactivity_days",
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de Quantidade de Dias Inativos</p>
          </div>
        </div>
      ),
      name: "maximum_inactivity_days_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.maximum_inactivity_days_label.toString() ?? "Não definido", true)}`}
        >
          {getNivel(
            row.maximum_inactivity_days_label.toString() ?? "Não definido",
          )}
        </div>
      ),
    },
    {
      label: "Quantidade de logins realizados",
      name: "n_login",
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de quantidade de logins realizados</p>
          </div>
        </div>
      ),
      name: "n_login_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_login_label.toString() ?? "Não definido")}`}
        >
          {getNivel(row.n_login_label.toString() ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Quantidade de logins realizados na turma",
      name: "n_login_subject",
    },
    {
      label: "Quantidade de logins semanais",
      name: "n_login_weekly",
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de quantidade de logins semanais</p>
          </div>
        </div>
      ),
      name: "n_login_weekly_label",
      cell: (row: TutorType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.n_login_weekly_label.toString() ?? "Não definido")}`}
        >
          {getNivel(row.n_login_weekly_label.toString() ?? "Não definido")}
        </div>
      ),
    },
    detalhesColumnTutor,
  ];

  const engajamentoColumns = [
    {
      label: "Aluno",
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de Interação Avaliativa</p>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center w-[10%] pt-1 pr-1">
            <Tooltip message={getIndicatorsInfo.interacaoAvaliativaInfo} />
          </div>
        </div>
      ),
      name: "posts_required_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.posts_required_label ?? "Não definido")}`}
        >
          {getNivel(row.posts_required_label ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Nº de Posts em Fóruns Avaliativos",
      name: "num_posts_required",
    },
    detalhesColumnAlunos,
  ];

  const desempenhoColumns = [
    {
      label: "Aluno",
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Desempenho</p>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center w-[10%] pr-1">
            <Tooltip message={getIndicatorsInfo.desempenhoInfo} />
          </div>
        </div>
      ),
      name: "performance_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.performance_label ?? "Não definido")}`}
        >
          {getNivel(row.performance_label ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Nota",
      name: "media_percentual",
    },
    {
      label: "Comparação com a Média da Turma",
      name: "comparative",
    },
    detalhesColumnAlunos,
  ];

  const motivacaoColumns = [
    {
      label: "Aluno",
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>
              Índice de Interação <br /> Não Avaliativa
            </p>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center w-[10%] pt-1 pr-1">
            <Tooltip message={getIndicatorsInfo.interacaoNaoAvaliativaInfo} />
          </div>
        </div>
      ),
      name: "posts_unrequired_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.posts_unrequired_label ?? "Não definido")}`}
        >
          {getNivel(row.posts_unrequired_label ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Nº de Participações em Fóruns Não Obrigatórios",
      name: "num_posts_unrequired",
    },
    detalhesColumnAlunos,
  ];

  const profCognitivaColumns = [
    {
      label: "Aluno",
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Nível Médio de Profundidade Cognitiva</p>
          </div>
          <div className="absolute inset-y-0 right-1 flex items-center w-[10%] pt-1 pr-1">
            <Tooltip message={getIndicatorsInfo.profCogInfo} />
          </div>
        </div>
      ),
      name: "label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium border text-center mx-auto ${getFlagCor(row.label ?? "Não definido")}`}
        >
          {getNivel(row.label ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Nível Médio de Profundidade Cognitiva em Fóruns",
      name: "forum_mean_level",
    },
    {
      label: "Nível Médio de Profundidade Cognitiva em Quizzes",
      name: "quiz_mean_level",
    },
    {
      label: "Nível Médio de Profundidade Cognitiva em Tarefas",
      name: "assign_mean_level",
    },
    detalhesColumnAlunos,
  ];

  // const relacaoAlunoProfColumns = [
  // 	{
  // 		label: "Aluno",
  // 		name: "full_name",
  // 		options: {
  // 			sticky: true,
  // 			headerClassName: "min-w-96",
  // 			cellClassName: "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs"
  // 		}
  // 	},
  // 	{
  // 		label: "Relação Aluno-Professor",
  // 		name: "full_name",
  // 	},
  // 	{
  // 		label: "Nº de Mensagens Trocadas com o Professor",
  // 		name: "full_name"
  // 	},
  // 	{
  // 		label: "Percentual de Participação em Fóruns Mediados pelo Docente",
  // 		name: "full_name"
  // 	},
  // 	{
  // 		label: "Frequência de Contato Aluno-Professor",
  // 		name: "full_name"
  // 	},
  // 	detalhesColumnAlunos
  // ];

  const desistenciaColumns = [
    {
      label: "Aluno",
      name: "full_name",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de Desistência</p>
          </div>
          <div className="absolute inset-y-0 right-3 flex items-center w-[10%] pt-1 pr-1">
            <Tooltip message={getIndicatorsInfo.desistenciaInfo} />
          </div>
        </div>
      ),
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
      label: "Índice de Interação Avaliativa",
      name: "engagement_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium text-center mx-auto`}
        >
          {getNivel(row.engagement_label ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Índice de Interação Não Avaliativa",
      name: "motivation_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium text-center mx-auto`}
        >
          {getNivel(row.motivation_label ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Índice de Desempenho",
      name: "performance_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium text-center mx-auto`}
        >
          {getNivel(row.performance_label ?? "Não definido")}
        </div>
      ),
    },
    {
      label: "Nível de Profundidade Cognitiva",
      name: "cognitive_label",
      cell: (row: AlunoType) => (
        <div
          className={`max-w-27 py-1 rounded-md text-xs font-medium text-center mx-auto`}
        >
          {getNivel(row.cognitive_label ?? "Não definido")}
        </div>
      ),
    },
    // {
    // 	label: "Índice de Relação Aluno-Professor",
    // 	name: "flagRelAlunoProf",
    // 	cell: (row: AlunoType) => (
    // 		<div className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(row.flagRelAlunoProf ?? 0)}`}>
    // 			{getNivel(row.flagRelAlunoProf ?? 0)}
    // 		</div>
    // 	)
    // },
    detalhesColumnAlunos,
  ];

  const allSubjectsColumns = [
    {
      label: "Disciplina",
      name: "fullname",
      options: {
        sticky: true,
        headerClassName: "min-w-96",
        cellClassName:
          "truncate overflow-hidden whitespace-nowrap font-medium text-left max-w-xs",
      },
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de Interação Avaliativa</p>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center w-[10%] pt-1 pr-1">
            <Tooltip message={getIndicatorsInfo.interacaoAvaliativaInfo} />
          </div>
        </div>
      ),
      name: "flagEngajamento",
      cell: (row: DisciplinaType) => (
        <div
          className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(row.flagMotivacao ?? "Não definido")}`}
        >
          {getNivel(row.flagMotivacao ?? "Não definido")}
        </div>
      ),
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>
              Índice de Interação <br /> Não Avaliativa
            </p>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center w-[10%] pt-1 pr-1">
            <Tooltip message={getIndicatorsInfo.interacaoNaoAvaliativaInfo} />
          </div>
        </div>
      ),
      name: "flagMotivacao",
      cell: (row: DisciplinaType) => (
        <div
          className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(row.flagEngajamento ?? "Não definido")}`}
        >
          {getNivel(row.flagEngajamento ?? "Não definido")}
        </div>
      ),
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Desempenho</p>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center w-[10%] pr-1">
            <Tooltip message={getIndicatorsInfo.desempenhoInfo} />
          </div>
        </div>
      ),
      name: "flagDesempenho",
      cell: (row: DisciplinaType) => (
        <div
          className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(row.flagDesempenho ?? "Não definido")}`}
        >
          {getNivel(row.flagDesempenho ?? "Não definido")}
        </div>
      ),
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Profundidade Cognitiva</p>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center w-[10%] pt-1 pr-1">
            <Tooltip message={getIndicatorsInfo.profCogInfo} />
          </div>
        </div>
      ),
      name: "flagProfCog",
      cell: (row: DisciplinaType) => (
        <div
          className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(row.flagProfCog ?? "Não definido")}`}
        >
          {getNivel(row.flagProfCog ?? "Não definido")}
        </div>
      ),
    },
    {
      label: (
        <div className="flex flex-row">
          <div className="w-[90%]">
            <p>Relação Aluno-Professor</p>
          </div>
          <div className="flex items-center w-[10%] pt-1 pr-1">
            <Tooltip message={getIndicatorsInfo.relacaoAlunoProfInfo} />
          </div>
        </div>
      ),
      name: "flagRelAlunoProf",
      cell: (row: DisciplinaType) => (
        <div
          className={`py-1 rounded-md text-xs font-medium border-[1.5px] ${getFlagCor(row.flagRelAlunoProf ?? "Não definido")}`}
        >
          {getNivel(row.flagRelAlunoProf ?? "Não definido")}
        </div>
      ),
    },
    {
      label: (
        <div className="flex flex-row relative">
          <div className="w-[90%]">
            <p>Índice de Desistência</p>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center w-[10%] pt-1 pr-1">
            <Tooltip message={getIndicatorsInfo.desistenciaInfo} />
          </div>
        </div>
      ),
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
      label: "Nº de Alunos Matriculados",
      name: "total_enrolled",
      cell: (row: DisciplinaType) => getMatriculados(row.total_enrolled),
    },
    // {
    //   label: "Nº de Alunos Aprovados",
    //   name: "numAlunosAprovados",
    //   cell: () => Math.floor(Math.random() * 70) + 30,
    // },
    // {
    //   label: "Nº de Alunos Reprovados",
    //   name: "numAlunosReprovados",
    //   cell: () => Math.floor(Math.random() * 20),
    // },
    {
      label: "Média de Notas da Turma",
      name: "mean_subject",
      cell: (row: DisciplinaType) => getNotaMedia(row.mean_subject),
    },
    // {
    //   label: "Curso",
    //   name: "cursoGrad",
    //   cell: () => "Graduação",
    // },
    {
      label: "Professor",
      name: "teachers",
      options: {
        headerClassName: "min-w-64",
        cellClassName: "min-w-64",
      },
      cell: (row: DisciplinaType) => getProfessores(row.teachers),
    },
    // {
    //   label: "Semestre",
    //   name: "period",
    //   cell: (row: DisciplinaType) => row.data,
    // },
    {
      label: "Detalhes",
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
    // case "Relação Aluno-Professor":
    // 	return relacaoAlunoProfColumns;
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
