'use client';

import Disciplinas from '@/components/pages/Disciplinas/Disciplinas';
import Sidebar from '@/components/ui/sidebar';
import { useError } from '@/hooks/useError';
import { DisciplinaType } from '@/types/disciplina';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';

export default function DisciplinasPageClient() {
  const [disciplinas, setDisciplinas] = useState<DisciplinaType[] | null>(null);
  const error = useError();

  useEffect(() => {
  async function fetchData() {
    try {
      const response = await api.get('analysis/general/subjects/indicators');
      const indicators = response.data.data.subjects || [];

      const mapped: DisciplinaType[] = indicators.map((s: any) => ({
        id: s.id,
        fullname: s.name,

        flagEngajamento: s.label_engagement,
        flagMotivacao: s.label_motivation,
        flagDesempenho: s.label_performance,
        flagProfCog: s.label_cognitive,
        flagRelAlunoProf: s.label_relation_teacher_student,
        flagDesistencia: s.label_give_up === "alto",

        numAlunosMatriculados: s.total_enrolled ?? 0,
        mediaNotasTurma: s.mean_subject ?? 0,

        professor: s.teachers?.[0] ?? "—",
      }));

      setDisciplinas(mapped);

    } catch (err) {
      console.error(err);
      setDisciplinas([]);
    }
  }

  fetchData();
}, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <main>
          {disciplinas === null ? (
            <p>Carregando disciplinas...</p>
          ) : (
            <Disciplinas disciplinas={disciplinas} />
          )}
        </main>
      </div>
    </div>
  );
}