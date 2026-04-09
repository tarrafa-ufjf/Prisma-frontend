import React from "react";
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { api } from "@/utils/api";
import { Aluno as AlunoType } from "@/types/aluno";

type CursoType = {
  id: number;
  shortname: string;
  nome: string;
  data: string;
  value: number;
  fullname: string;
  period: string;
};

type Props = {
  curso: CursoType;       
  aluno: AlunoType;       
};

type FinalGrade = {
  grade: number;
  max: number;
};

export default function GaugeChart({ curso, aluno }: Props) {
  const [finalGrade, setFinalGrade] = React.useState<FinalGrade | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await api.get(
          `analysis/subject/${curso.id}/student/${aluno.id}/grades`
        );

        console.log("RESPONSE:", response.data); 

        const data =
          response.data?.data?.student_grades?.final || null;

        setFinalGrade(data);

      } catch (error) {
        console.error("Erro ao buscar nota final:", error);
      } finally {
        setLoading(false);
      }
    }

    if (curso?.id && aluno?.id) {
      fetchData();
    }
  }, [curso?.id, aluno?.id]); 

  if (loading) {
    return <p className="text-sm">Carregando...</p>;
  }

  if (!finalGrade) {
    return <p className="text-sm">Nota final não encontrada.</p>;
  }

  const gaugeValue = (finalGrade.grade / finalGrade.max) * 100;

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      <Gauge
        width={400}
        height={175}
        value={gaugeValue}
        startAngle={-90}
        endAngle={90}
        innerRadius="80%"
        cornerRadius="30%"
        sx={{
          '& .MuiGauge-valueText': {
            fontSize: 65,
            fontWeight: 600,
            fontFamily: 'Poppins',
            transform: 'translate(0px, -30px)',
          },
          '& .MuiGauge-valueArc': {
            fill: "#374DAA",
          },
        }}
        text={({ value }) => value != null ? `${value.toFixed(1)}%` : "0%"}
      />
    </Stack>
  );
}