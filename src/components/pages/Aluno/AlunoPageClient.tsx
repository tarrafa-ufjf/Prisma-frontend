'use client';

import Aluno from '@/components/pages/Aluno/Aluno';
import { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import { useTranslations } from 'next-intl';

interface Props {
  curso: any;
  alunoId: number;
}

export default function AlunoPageClient({ curso, alunoId }: Props) {
  const t = useTranslations('Students.details');
  const [alunos, setAlunos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get(
          `analysis/subject/${curso.id}/students/engagement`
        );

        const lista = response.data.data;

        const alunosFormatados = lista.map((item: any) => ({
          ...item,
          id: item.user_id,
        }));

        setAlunos(alunosFormatados);
      } catch (err) {
        console.error("Erro ao buscar alunos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, [curso.id]);

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  return (
    <Aluno
      cursos={[curso]}
      cursoSelecionado={curso.id}
      alunos={alunos}
      alunoSelecionado={alunoId}
    />
  );
}
