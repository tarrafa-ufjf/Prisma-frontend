export interface DisciplinaType {
    id: number;
    shortname: string;
    nome: string;
    data: string;
    value: number;
    // flags
    teachers?: {
        full_name: string;
        tutor_id: number;
    }[];
    flagEngajamento?: string;
    flagMotivacao?: string;
    flagDesempenho?: string;
    flagProfCog?: string;
    flagRelAlunoProf?: string;
    flagDesistencia?: boolean;
    total_enrolled?: number;
    mean_subject?:number;
}