export const demoUser = {
  id: 999,
  email: "demo@prisma.ufjf.br",
  active: true,
  roles: ["admin"],
};

export const mockCourses = [
  {
    id: 101,
    shortname: "AED-2026",
    fullname: "Algoritmos e Estruturas de Dados",
    period: "2026.1",
    status: "Ativo",
  },
  {
    id: 102,
    shortname: "ENG-2026",
    fullname: "Engenharia de Software",
    period: "2026.1",
    status: "Ativo",
  },
  {
    id: 103,
    shortname: "BD-2026",
    fullname: "Banco de Dados",
    period: "2026.1",
    status: "Ativo",
  },
];

export const mockHomeSummary = {
  total_users: 1248,
  total_courses_offered: 36,
  total_subjects: 142,
};

export const mockHomeRankingBest = [
  {
    name: "Algoritmos e Estruturas de Dados",
    subject_id: 101,
  },
  {
    name: "Engenharia de Software",
    subject_id: 102,
  },
  {
    name: "Banco de Dados",
    subject_id: 103,
  },
  {
    name: "Programação Web",
    subject_id: 104,
  },
  {
    name: "Interação Humano-Computador",
    subject_id: 105,
  },
];

export const mockHomeRankingAtRisk = [
  {
    name: "Cálculo I",
    subject_id: 106,
  },
  {
    name: "Fundamentos de Programação",
    subject_id: 107,
  },
  {
    name: "Estatística",
    subject_id: 108,
  },
  {
    name: "Redes de Computadores",
    subject_id: 109,
  },
  {
    name: "Arquitetura de Computadores",
    subject_id: 110,
  },
];

export const mockHomeIndicators = {
  engagement: {
    good_percentage: 78,
    good_subjects: 111,
    total_subjects: 142,
  },
  motivation: {
    good_percentage: 71,
    good_subjects: 101,
    total_subjects: 142,
  },
  performance: {
    good_percentage: 84,
    good_subjects: 119,
    total_subjects: 142,
  },
  cognitive: {
    good_percentage: 67,
    good_subjects: 95,
    total_subjects: 142,
  },
  relation_teacher_student: {
    good_percentage: 73,
    good_subjects: 104,
    total_subjects: 142,
  },
  give_up: {
    good_percentage: 88,
    good_subjects: 125,
    total_subjects: 142,
  },
};
export const mockSubjects = [
  {
    id: 101,
    name: "Algoritmos e Estruturas de Dados",
    label_engagement: "alto",
    label_motivation: "alto",
    label_performance: "alto",
    label_cognitive: "médio",
    label_relation_teacher_student: "alto",
    label_give_up: "baixo",
    total_enrolled: 42,
    mean_subject: 8.4,
    teachers: [
      {
        full_name: "Mariana Oliveira",
        tutor_id: 201,
      },
      {
        full_name: "Carlos Mendes",
        tutor_id: 202,
      },
    ],
  },
  {
    id: 102,
    name: "Engenharia de Software",
    label_engagement: "alto",
    label_motivation: "alto",
    label_performance: "alto",
    label_cognitive: "alto",
    label_relation_teacher_student: "alto",
    label_give_up: "baixo",
    total_enrolled: 38,
    mean_subject: 8.7,
    teachers: [
      {
        full_name: "Fernanda Costa",
        tutor_id: 203,
      },
    ],
  },
  {
    id: 103,
    name: "Banco de Dados",
    label_engagement: "médio",
    label_motivation: "alto",
    label_performance: "alto",
    label_cognitive: "alto",
    label_relation_teacher_student: "médio",
    label_give_up: "baixo",
    total_enrolled: 45,
    mean_subject: 8.1,
    teachers: [
      {
        full_name: "Rafael Almeida",
        tutor_id: 204,
      },
    ],
  },
  {
    id: 104,
    name: "Programação Web",
    label_engagement: "alto",
    label_motivation: "médio",
    label_performance: "alto",
    label_cognitive: "médio",
    label_relation_teacher_student: "alto",
    label_give_up: "baixo",
    total_enrolled: 51,
    mean_subject: 8.3,
    teachers: [
      {
        full_name: "Juliana Martins",
        tutor_id: 205,
      },
    ],
  },
  {
    id: 105,
    name: "Interação Humano-Computador",
    label_engagement: "alto",
    label_motivation: "alto",
    label_performance: "alto",
    label_cognitive: "alto",
    label_relation_teacher_student: "alto",
    label_give_up: "baixo",
    total_enrolled: 34,
    mean_subject: 9.0,
    teachers: [
      {
        full_name: "Lucas Ferreira",
        tutor_id: 206,
      },
    ],
  },
  {
    id: 106,
    name: "Cálculo I",
    label_engagement: "baixo",
    label_motivation: "baixo",
    label_performance: "baixo",
    label_cognitive: "médio",
    label_relation_teacher_student: "médio",
    label_give_up: "alto",
    total_enrolled: 63,
    mean_subject: 5.8,
    teachers: [
      {
        full_name: "Patrícia Souza",
        tutor_id: 207,
      },
    ],
  },
  {
    id: 107,
    name: "Fundamentos de Programação",
    label_engagement: "médio",
    label_motivation: "baixo",
    label_performance: "médio",
    label_cognitive: "médio",
    label_relation_teacher_student: "médio",
    label_give_up: "alto",
    total_enrolled: 57,
    mean_subject: 6.4,
    teachers: [
      {
        full_name: "Bruno Rodrigues",
        tutor_id: 208,
      },
    ],
  },
  {
    id: 108,
    name: "Estatística",
    label_engagement: "médio",
    label_motivation: "médio",
    label_performance: "médio",
    label_cognitive: "alto",
    label_relation_teacher_student: "alto",
    label_give_up: "médio",
    total_enrolled: 49,
    mean_subject: 7.1,
    teachers: [
      {
        full_name: "Camila Santos",
        tutor_id: 209,
      },
    ],
  },
];
export const mockCourseSummary = {
  total_enrolled: 42,
  approval_rate: 86.5,
  avg_grade_all: 8.4,
};

export const mockCourseIndicators = {
  id: 101,
  good_percentage_engagement: 82,
  good_percentage_motivation: 76,
  good_percentage_pedagogical: 79,
  good_percentage_performance: 85,
  good_percentage_cognitive: 73,
  percentage_give_up: 8,
};

export const mockCourseGraphs = {
  id: 101,
  situations: [
    { qtd: 36, situacao: "Aprovado" },
    { qtd: 4, situacao: "Reprovado" },
    { qtd: 2, situacao: "Em andamento" },
  ],
  usage_by_module: [
    {
      subject_id: 101,
      modulo: "Fórum",
      pct_modulo_no_curso: 78,
      qtd: 156,
    },
    {
      subject_id: 101,
      modulo: "Questionário",
      pct_modulo_no_curso: 65,
      qtd: 98,
    },
    {
      subject_id: 101,
      modulo: "Tarefa",
      pct_modulo_no_curso: 52,
      qtd: 74,
    },
    {
      subject_id: 101,
      modulo: "Material",
      pct_modulo_no_curso: 91,
      qtd: 213,
    },
  ],
};

export const mockCourseRankingBest = [
  {
    grademax: 10,
    nota_final: 9.7,
    percentual: 97,
    situacao: "Aprovado",
    student: "Ana Carolina Silva",
    user_id: 3001,
  },
  {
    grademax: 10,
    nota_final: 9.5,
    percentual: 95,
    situacao: "Aprovado",
    student: "Lucas Almeida",
    user_id: 3002,
  },
  {
    grademax: 10,
    nota_final: 9.2,
    percentual: 92,
    situacao: "Aprovado",
    student: "Mariana Souza",
    user_id: 3003,
  },
  {
    grademax: 10,
    nota_final: 8.9,
    percentual: 89,
    situacao: "Aprovado",
    student: "Pedro Henrique",
    user_id: 3004,
  },
  {
    grademax: 10,
    nota_final: 8.7,
    percentual: 87,
    situacao: "Aprovado",
    student: "Julia Martins",
    user_id: 3005,
  },
];

export const mockCourseRankingAtRisk = [
  {
    grademax: 10,
    nota_final: 4.8,
    percentual: 48,
    situacao: "Reprovado",
    student: "Rafael Santos",
    user_id: 3010,
  },
  {
    grademax: 10,
    nota_final: 5.1,
    percentual: 51,
    situacao: "Reprovado",
    student: "Beatriz Oliveira",
    user_id: 3011,
  },
  {
    grademax: 10,
    nota_final: 5.6,
    percentual: 56,
    situacao: "Em andamento",
    student: "Gabriel Costa",
    user_id: 3012,
  },
  {
    grademax: 10,
    nota_final: 5.9,
    percentual: 59,
    situacao: "Em andamento",
    student: "Larissa Mendes",
    user_id: 3013,
  },
  {
    grademax: 10,
    nota_final: 6.1,
    percentual: 61,
    situacao: "Em andamento",
    student: "Thiago Rodrigues",
    user_id: 3014,
  },
];
export const mockStudents = [
  {
    user_id: 3001,
    full_name: "Ana Carolina Silva",
    email: "ana.silva@demo.prisma.ufjf.br",
    degree_program: "Ciência da Computação",
    city: "Juiz de Fora",
    student_groups: "Turma 2026.1",
    first_access_moodle: "05/03/2026",
    last_access_subject: "28/09/2026",

    num_posts_required: 18,
    quizzesRealiz: 92,
    tarefasEnv: 88,

    media_percentual: 92,
    comparative: 12,
    ativAbaixoMedia: "-",

    num_posts_unrequired: 7,
    nVisuCompl: "-",
    nInter: "-",

    forum_mean_level: 3.8,
    quiz_mean_level: 3.5,
    assign_mean_level: 3.7,

    cognitive_label: "alto",
    engagement_label: "alto",
    motivation_label: "alto",
    performance_label: "alto",
    give_up: false,

    subject_id: 101,
  },
  {
    user_id: 3002,
    full_name: "Lucas Almeida",
    subject_id: 101,
    engagement_label: "alto",
    motivation_label: "alto",
    performance_label: "alto",
    cognitive_label: "alto",
    give_up: false,
    num_posts_required: 16,
    quizzesRealiz: 89,
    tarefasEnv: 91,
  },
  {
    user_id: 3003,
    full_name: "Mariana Souza",
    subject_id: 101,
    engagement_label: "alto",
    motivation_label: "alto",
    performance_label: "alto",
    cognitive_label: "médio",
    give_up: false,
    num_posts_required: 15,
    quizzesRealiz: 87,
    tarefasEnv: 86,
  },
];

export const mockStudentIndicators = {
  engagement: "alto",
  motivation: "alto",
  performance: "alto",
  cognitive: "alto",
  give_up: false,
};

export const mockStudentSummary = {
  email: "ana.silva@demo.prisma.ufjf.br",
  degree_program: "Ciência da Computação",
  city: "Juiz de Fora",
  student_groups: "Turma 2026.1",
  first_access_moodle: "05/03/2026",
  last_access_subject: "28/09/2026",
};

export const mockStudentGrades = {
  final: {
    grade: 9.2,
    max: 10,
  },
  activities: [
    {
      activity_name: "Questionário 1 — Fundamentos",
      grade_real: 9.5,
      grade_max: 10,
    },
    {
      activity_name: "Fórum — Estruturas de Dados",
      grade_real: 8.8,
      grade_max: 10,
    },
    {
      activity_name: "Trabalho Prático 1",
      grade_real: 9.0,
      grade_max: 10,
    },
    {
      activity_name: "Questionário 2 — Algoritmos",
      grade_real: 9.4,
      grade_max: 10,
    },
    {
      activity_name: "Projeto Final",
      grade_real: 9.3,
      grade_max: 10,
    },
  ],
};

export const mockStudentCognitive = {
  forum_mean_level: 3.8,
  quiz_mean_level: 3.5,
  assign_mean_level: 3.7,
  label: "alto",
  subject_id: 101,
  user_id: 3001,
  full_name: "Ana Carolina Silva",
};

export const mockStudentPerformance = {
  comparative: 12,
  media_percentual: 92,
  performance_label: "alto",
  situation: "Aprovado",
  subject_id: 101,
  user_id: 3001,
  full_name: "Ana Carolina Silva",
};

export const mockStudentMotivation = {
  num_posts_unrequired: 7,
  posts_unrequired_label: "alto",
  subject_id: 101,
  user_id: 3001,
  full_name: "Ana Carolina Silva",
};
export const mockTutorsSummary = {
  total_tutors: 84,
  mean_tutors_per_subject: 2.4,
  mean_tutors_per_degree_program: 18.7,
};

export const mockTutorsIndicators = {
  access: {
    good_percentage: 81,
  },
  feedback: {
    good_percentage: 74,
  },
  forum_response: {
    good_percentage: 79,
  },
};

export const mockTutorsRankingBest = [
  {
    full_name: "Mariana Oliveira",
    tutor_id: 201,
    subjects: [101],
  },
  {
    full_name: "Carlos Mendes",
    tutor_id: 202,
    subjects: [101],
  },
  {
    full_name: "Fernanda Costa",
    tutor_id: 203,
    subjects: [102],
  },
  {
    full_name: "Rafael Almeida",
    tutor_id: 204,
    subjects: [103],
  },
  {
    full_name: "Juliana Martins",
    tutor_id: 205,
    subjects: [104],
  },
];

export const mockTutorsRankingAtRisk = [
  {
    full_name: "Patrícia Souza",
    tutor_id: 207,
    subjects: [106],
  },
  {
    full_name: "Bruno Rodrigues",
    tutor_id: 208,
    subjects: [107],
  },
  {
    full_name: "Camila Santos",
    tutor_id: 209,
    subjects: [108],
  },
  {
    full_name: "Lucas Ferreira",
    tutor_id: 206,
    subjects: [105],
  },
];
export const mockTutorCourseSummary = {
  average_logs_per_day_per_tutor: 18.6,
  students_per_tutor: 21.4,
  total_tutors: 4,
};

export const mockTutorCourseIndicators = {
  good_percentage_access: 81,
  good_percentage_feedback: 74,
  good_percentage_response_foruns: 79,
};

export const mockTutorInteractionChannels = {
  id: 101,
  message: "Dados fictícios para demonstração",
  channels: [
    {
      forum_id: "1",
      forum_name: "Fórum - Dúvidas da disciplina",
      mensagens_alunos: "86",
      mensagens_tutores: "42",
      mensagens_total: "128",
    },
    {
      forum_id: "2",
      forum_name: "Fórum - Atividades",
      mensagens_alunos: "64",
      mensagens_tutores: "31",
      mensagens_total: "95",
    },
    {
      forum_id: "3",
      forum_name: "Fórum - Discussões gerais",
      mensagens_alunos: "51",
      mensagens_tutores: "28",
      mensagens_total: "79",
    },
  ],
};

export const mockTutorCourseRankingBest = [
  {
    full_name: "Mariana Oliveira",
    subject_id: 101,
    tutor_id: 201,
  },
  {
    full_name: "Carlos Mendes",
    subject_id: 101,
    tutor_id: 202,
  },
  {
    full_name: "Fernanda Costa",
    subject_id: 101,
    tutor_id: 203,
  },
];

export const mockTutorCourseRankingAtRisk = [
  {
    full_name: "Rafael Almeida",
    subject_id: 101,
    tutor_id: 204,
  },
  {
    full_name: "Juliana Martins",
    subject_id: 101,
    tutor_id: 205,
  },
  {
    full_name: "Patrícia Souza",
    subject_id: 101,
    tutor_id: 207,
  },
];
export const mockTutorDetail = {
  id: 201,
  name: "Mariana Oliveira",
  email: "mariana.oliveira@demo.ufjf.br",
  degree_program: "Licenciatura em Computação",
  city: "Juiz de Fora",
  tutor_groups: "Grupo A",
  first_access_moodle: "2026-02-10",
  last_access_subject: "2026-09-25",
};

export const mockTutorDetailIndicators = {
  indicators: {
    access: "alto",
    feedback: "normal",
    response_foruns: "alto",
  },
  student_id: 201,
  subject_id: 101,
};

export const mockTutorDetailAccess = {
  n_login_subject: 86,
  n_login_weekly: 6.4,
};

export const mockTutorDetailForums = {
  num_response_fast_forum: 38,
  num_response_normal_forum: 9,
  num_response_late_forum: 3,
  mean_forums_response_hours: 8.7,
  median_forums_response_hours: 6.2,
};

export const mockTutorDetailFeedback = {
  n_corrections: 74,
  n_corrections_with_feedback: 61,
  percentage_feedback: 82.4,
};

export const mockTutorDetailGraphs = {
  interactions: {
    mean: 24.5,
    median: 22,
    points: [
      { tutor_id: 201, value: 31, is_current: true },
      { tutor_id: 202, value: 18, is_current: false },
      { tutor_id: 203, value: 26, is_current: false },
      { tutor_id: 204, value: 14, is_current: false },
      { tutor_id: 205, value: 29, is_current: false },
    ],
  },
  response_time_hours: {
    mean: 14.2,
    median: 10,
    points: [
      { tutor_id: 201, value: 8.7, is_current: true },
      { tutor_id: 202, value: 16.4, is_current: false },
      { tutor_id: 203, value: 11.8, is_current: false },
      { tutor_id: 204, value: 21.5, is_current: false },
      { tutor_id: 205, value: 12.3, is_current: false },
    ],
  },
};
export const mockTutorResponseForums = [
  {
    full_name: "Mariana Oliveira",
    tutor_id: 201,
    label_forums_response: "alto",
    mean_forums_response_hours: 8.7,
    mean_forums_response_hours_label: "alto",
    median_forums_response_hours: 6.2,
    median_forums_response_hours_label: "alto",
    num_response_fast_forum: 38,
    num_response_late_forum: 3,
    num_response_normal_forum: 9,
    score_access: 86,
    score_access_label: "alto",
    total_response_forum: 50,
  },
  {
    full_name: "Carlos Mendes",
    tutor_id: 202,
    label_forums_response: "normal",
    mean_forums_response_hours: 16.4,
    mean_forums_response_hours_label: "normal",
    median_forums_response_hours: 12.1,
    median_forums_response_hours_label: "normal",
    num_response_fast_forum: 24,
    num_response_late_forum: 8,
    num_response_normal_forum: 13,
    score_access: 72,
    score_access_label: "normal",
    total_response_forum: 45,
  },
  {
    full_name: "Fernanda Costa",
    tutor_id: 203,
    label_forums_response: "muito_alto",
    mean_forums_response_hours: 5.4,
    mean_forums_response_hours_label: "muito_alto",
    median_forums_response_hours: 4.1,
    median_forums_response_hours_label: "muito_alto",
    num_response_fast_forum: 47,
    num_response_late_forum: 1,
    num_response_normal_forum: 6,
    score_access: 94,
    score_access_label: "muito_alto",
    total_response_forum: 54,
  },
  {
    full_name: "Rafael Almeida",
    tutor_id: 204,
    label_forums_response: "baixo",
    mean_forums_response_hours: 29.8,
    mean_forums_response_hours_label: "baixo",
    median_forums_response_hours: 24.5,
    median_forums_response_hours_label: "baixo",
    num_response_fast_forum: 11,
    num_response_late_forum: 17,
    num_response_normal_forum: 8,
    score_access: 48,
    score_access_label: "baixo",
    total_response_forum: 36,
  },
];
export const mockTutorAccess = [
  {
    full_name: "Mariana Oliveira",
    tutor_id: 201,
    label_access: "alto",
    maximum_inactivity_days: 2,
    maximum_inactivity_days_label: "alto",
    n_login: 86,
    n_login_label: "alto",
    n_login_subject: 74,
    n_login_weekly: 6.4,
    n_login_weekly_label: "alto",
  },
  {
    full_name: "Carlos Mendes",
    tutor_id: 202,
    label_access: "normal",
    maximum_inactivity_days: 5,
    maximum_inactivity_days_label: "normal",
    n_login: 61,
    n_login_label: "normal",
    n_login_subject: 52,
    n_login_weekly: 4.3,
    n_login_weekly_label: "normal",
  },
  {
    full_name: "Fernanda Costa",
    tutor_id: 203,
    label_access: "muito_alto",
    maximum_inactivity_days: 1,
    maximum_inactivity_days_label: "muito_alto",
    n_login: 102,
    n_login_label: "muito_alto",
    n_login_subject: 91,
    n_login_weekly: 7.8,
    n_login_weekly_label: "muito_alto",
  },
  {
    full_name: "Rafael Almeida",
    tutor_id: 204,
    label_access: "baixo",
    maximum_inactivity_days: 12,
    maximum_inactivity_days_label: "baixo",
    n_login: 34,
    n_login_label: "baixo",
    n_login_subject: 27,
    n_login_weekly: 2.1,
    n_login_weekly_label: "baixo",
  },
];
export const mockTutorFeedback = [
  {
    full_name: "Mariana Oliveira",
    tutor_id: 201,
    label_feedback: "alto",
    n_corrections: 74,
    n_corrections_label: "alto",
    n_corrections_with_feedback: 61,
    n_corrections_with_feedback_label: "alto",
    n_feedback_pdf: 18,
    n_feedback_pdf_label: "alto",
    n_textual_feedback: 43,
    n_textual_feedback_label: "alto",
    percentage_feedback: 82.4,
    percentage_feedback_label: "alto",
  },
  {
    full_name: "Carlos Mendes",
    tutor_id: 202,
    label_feedback: "normal",
    n_corrections: 59,
    n_corrections_label: "normal",
    n_corrections_with_feedback: 42,
    n_corrections_with_feedback_label: "normal",
    n_feedback_pdf: 11,
    n_feedback_pdf_label: "normal",
    n_textual_feedback: 31,
    n_textual_feedback_label: "normal",
    percentage_feedback: 71.2,
    percentage_feedback_label: "normal",
  },
  {
    full_name: "Fernanda Costa",
    tutor_id: 203,
    label_feedback: "muito_alto",
    n_corrections: 88,
    n_corrections_label: "muito_alto",
    n_corrections_with_feedback: 79,
    n_corrections_with_feedback_label: "muito_alto",
    n_feedback_pdf: 26,
    n_feedback_pdf_label: "muito_alto",
    n_textual_feedback: 53,
    n_textual_feedback_label: "muito_alto",
    percentage_feedback: 89.8,
    percentage_feedback_label: "muito_alto",
  },
  {
    full_name: "Rafael Almeida",
    tutor_id: 204,
    label_feedback: "baixo",
    n_corrections: 41,
    n_corrections_label: "baixo",
    n_corrections_with_feedback: 25,
    n_corrections_with_feedback_label: "baixo",
    n_feedback_pdf: 5,
    n_feedback_pdf_label: "baixo",
    n_textual_feedback: 20,
    n_textual_feedback_label: "normal",
    percentage_feedback: 61.0,
    percentage_feedback_label: "baixo",
  },
];
export const mockAdminUsers = [
  { id: 1, email: "admin@demo.ufjf.br", active: true, roles: ["admin"] },
  { id: 2, email: "professor1@demo.ufjf.br", active: true, roles: ["teacher"] },
  { id: 3, email: "professor2@demo.ufjf.br", active: true, roles: ["teacher"] },
  { id: 4, email: "tutor1@demo.ufjf.br", active: true, roles: ["tutor"] },
  { id: 5, email: "aluno1@demo.ufjf.br", active: true, roles: ["student"] },
  { id: 6, email: "aluno2@demo.ufjf.br", active: true, roles: ["student"] },
  { id: 7, email: "aluno3@demo.ufjf.br", active: true, roles: ["student"] },
  { id: 8, email: "aluno4@demo.ufjf.br", active: true, roles: ["student"] },
];

export const mockSchedulerStatus = {
  heartbeat_timeout_seconds: 60,
  last_heartbeat_at: "2026-09-29T14:45:00",
  running: true,
  jobs: [
    {
      channel: "learning_analytics",
      id: "scheduler-001",
      last_error: null,
      last_finished_at: "2026-09-29T14:40:00",
      last_started_at: "2026-09-29T14:39:45",
      last_status: "success",
      next_run_at: "2026-09-29T15:00:00",
    },
    {
      channel: "moodle_sync",
      id: "scheduler-002",
      last_error: null,
      last_finished_at: "2026-09-29T14:30:00",
      last_started_at: "2026-09-29T14:29:50",
      last_status: "success",
      next_run_at: "2026-09-29T15:00:00",
    },
  ],
};

export const mockMoodleConfig = {
  host: "moodle-demo.ufjf.br",
  port: 5432,
  database: "moodle_demo",
  user: "moodle_demo",
};

export const mockChatbotConversations = [
  {
    id: 1,
    title: "Risco de desistência dos alunos",
    created_at: "2026-09-29T13:20:00",
    updated_at: "2026-09-29T14:10:00",
  },
];

export const mockChatbotConversation = {
  id: 1,
  title: "Risco de desistência dos alunos",
  messages: [
    {
      id: 1,
      conversation_id: 1,
      role: "user",
      content: "Quais alunos apresentam maior risco de desistência?",
      rewritten_question: null,
      sql: null,
      result_json: null,
      metadata: null,
      vega: null,
      created_at: "2026-09-29T14:05:00",
    },
    {
      id: 2,
      conversation_id: 1,
      role: "assistant",
      content: "Os alunos com maior risco de desistência são aqueles que apresentam baixa participação nas atividades e queda nos indicadores de desempenho.",
      rewritten_question: "Quais alunos apresentam maior risco de desistência?",
      sql: "SELECT student_name, dropout_risk FROM student_indicators ORDER BY dropout_risk DESC LIMIT 5;",
      result_json: {
        rows: [
          { student_name: "Ana Souza", dropout_risk: "alto" },
          { student_name: "Lucas Pereira", dropout_risk: "alto" },
          { student_name: "Marina Costa", dropout_risk: "alto" },
          { student_name: "João Almeida", dropout_risk: "médio" },
          { student_name: "Beatriz Lima", dropout_risk: "médio" },
        ],
        row_count: 5,
        truncated: false,
      },
      metadata: null,
      vega: null,
      created_at: "2026-09-29T14:05:05",
    },
  ],
  vega: {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Média de desempenho por disciplina.",
    "data": {
      "values": [
        {
          "disciplina": "Algoritmos e Estruturas de Dados",
          "media": 8.4
        },
        {
          "disciplina": "Engenharia de Software",
          "media": 7.9
        },
        {
          "disciplina": "Banco de Dados",
          "media": 7.6
        }
      ]
    },
    "mark": "bar",
    "encoding": {
      "x": {
        "field": "disciplina",
        "type": "nominal",
        "title": "Disciplina"
      },
      "y": {
        "field": "media",
        "type": "quantitative",
        "title": "Média",
        "scale": {
          "domain": [0, 10]
        }
      },
      "tooltip": [
        {
          "field": "disciplina",
          "type": "nominal",
          "title": "Disciplina"
        },
        {
          "field": "media",
          "type": "quantitative",
          "title": "Média"
        }
      ]
    }
  },
};

export const mockChatbotResponse = {
  success: true,
  conversation_id: 1,
  answer: "A disciplina com maior média de desempenho é Algoritmos e Estruturas de Dados, com média de 8,4. Em seguida aparecem Engenharia de Software, com 7,9, e Banco de Dados, com 7,6.",
  rewritten_question: "Qual disciplina apresenta a maior média de desempenho?",
  json: [
    { disciplina: "Algoritmos e Estruturas de Dados", media: 8.4 },
    { disciplina: "Engenharia de Software", media: 7.9 },
    { disciplina: "Banco de Dados", media: 7.6 },
  ],
  vega: {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Média de desempenho por disciplina.",
    "data": {
      "values": [
        {
          "disciplina": "Algoritmos e Estruturas de Dados",
          "media": 8.4
        },
        {
          "disciplina": "Engenharia de Software",
          "media": 7.9
        },
        {
          "disciplina": "Banco de Dados",
          "media": 7.6
        }
      ]
    },
    "mark": "bar",
    "encoding": {
      "x": {
        "field": "disciplina",
        "type": "nominal",
        "title": "Disciplina"
      },
      "y": {
        "field": "media",
        "type": "quantitative",
        "title": "Média",
        "scale": {
          "domain": [0, 10]
        }
      },
      "tooltip": [
        {
          "field": "disciplina",
          "type": "nominal",
          "title": "Disciplina"
        },
        {
          "field": "media",
          "type": "quantitative",
          "title": "Média"
        }
      ]
    }
  }
};
