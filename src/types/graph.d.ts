type GraphInfo = {
    id: number,
    situations: Situation[]
    usage_by_module: UsageByModule[]
}

type Situation = {
    qtd: number
    situacao: string
}

type UsageByModule = {
    subject_id: number
    modulo: string,
    pct_modulo_no_curso: number
    qtd: number
}