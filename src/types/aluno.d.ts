export type Aluno = {
    id?: number;
    nome?: string;
    email?: string;
    graduacao?: string;
    cidade?: string;
    polo?: string;
    ultimoAcesso?: string;
    primeiroAcesso?: string;

    // reutilizaveis
    sentMsgs?: string;
    nAcessos?: number;
    frequenciaLogin?: string;
    detalhes?: React.ReactNode;
    full_name?: string
    user_id?: number
    
    // engajamento & desempenho
    num_posts_required?: number
    posts_required_label?: string

    // motivacao
    num_posts_unrequired?: number
    posts_unrequired_label?: string
    comparative?: number
    media_percentual?: number
    performance_label?: string
    subject_id?: number
    user_id?: number

    // profundidade cognitiva
    forum_mean_level?: number
    quiz_mean_level?: number
    assign_mean_level?: number
    // relacao aluno-professor

    // desistencia
    cognitive_label?: string,
    label?: string,
    engagement_label?: string,
    full_name?: string,
    give_up?: boolean,
    motivation_label?: string,
    performance_label?: string,

    // temporarios
    value?: number; // usado para os rankings de alunos 
}

export type Tab = 'Interação Avaliativa' | 'Interação Não Avaliativa' | 'Desempenho' | 'Profundidade Cognitiva' | 'Desistência' | 'Respostas em Fóruns' | 'Acesso à Disciplina' | 'Feedback';
