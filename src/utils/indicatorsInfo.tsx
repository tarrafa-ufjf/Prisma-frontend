export const getIndicatorsInfo = {
    interacaoAvaliativaInfo: "interacaoAvaliativaInfo",

    interacaoNaoAvaliativaInfo: "interacaoNaoAvaliativaInfo",

    desempenhoInfo: "desempenhoInfo",

    profCogInfo: "profCogInfo",
    // Para mais informações, acesse: https://docs.moodle.org/501/en/Learning_analytics_indicators#Cognitive_depth
    relacaoAlunoProfInfo: "relacaoAlunoProfInfo",

    desistenciaInfo: "desistenciaInfo",

    // Tutores:

    feedbackInfo: "feedbackInfo",

    accessInfo: "accessInfo",

    responseInfo: "responseInfo"

} as const;

export const indicatorInfoKeys = new Set<string>(Object.values(getIndicatorsInfo));
