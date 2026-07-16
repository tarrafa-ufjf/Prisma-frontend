export type Curso = {
    id: number;
    shortname: string;
    fullname: string;
    period: string;
    flagEngajamento?: number,
    flagMotivacao?: number,
    flagDesempenho?: number,
    flagRelAlunoProf?: number,
    flagProfCog?: number,
    flagDesistencia?: boolean,
    status?: string
}