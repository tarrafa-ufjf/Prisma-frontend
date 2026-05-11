import { Aluno as AlunoType } from "@/types/aluno";
import { Curso } from "@/types/curso";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { api } from '@/utils/api';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#374DAA',
    ...theme.applyStyles('dark', {
      backgroundColor: '#374DAA',
    }),
  },
}));
type Props = {
  curso: Curso;
  aluno: AlunoType;
};

export default function AtividadesChart({ curso, aluno }: Props) {
  const [atividades, setAtividades] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await api.get(
          `analysis/subject/${curso.id}/student/${aluno.id}/grades`
        );

        const activities =
          response.data?.data?.student_grades?.activities || [];

        setAtividades(activities);
      } catch (error) {
        console.error('Erro ao buscar atividades:', error);
      } finally {
        setLoading(false);
      }
    }

    if (curso?.id && aluno?.id) {
      fetchData();
    }
  }, [curso, aluno]);

  if (loading) {
    return <p className="text-sm">Carregando...</p>;
  }

  if (!atividades.length) {
    return <p className="text-sm">Nenhuma atividade encontrada.</p>;
  }
  console.log("Atividades: ", atividades);
  
  
  return (
    <div className="p-3 max-w-[475px] w-full max-h-[225px] overflow-y-auto space-y-4">
      {atividades.map((a, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-row justify-between">
            <p className="text-xs font-medium">{a.activity_name}</p>
            <p className="text-xs font-medium">
              {a.grade_real != null && a.grade_max != null && a.grade_max > 0
                ? `${((a.grade_real / a.grade_max) * 100).toFixed(2)} %`
                : "n/a"}
            </p>
          </div>

          <BorderLinearProgress
            variant="determinate"
            value={
              a.grade_real != null && a.grade_max != null && a.grade_max > 0
                ? (a.grade_real / a.grade_max) * 100
                : 0
            }
          />

          <div className="flex flex-row justify-between text-xs text-gray-500">
            <p>0</p>
            <p>20</p>
            <p>40</p>
            <p>60</p>
            <p>80</p>
            <p>100</p>
          </div>
        </React.Fragment>
    ))}
    </div>
  );
}