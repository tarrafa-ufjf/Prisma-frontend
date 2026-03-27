'use client';

import Disciplinas from '@/components/pages/Disciplinas/Disciplinas';
import Header from '@/components/sidebar/Header/Header';
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
        error.clear();
        const response = await api.get('subjects');
        setDisciplinas(response.data.data.subjects || []);
      } catch (err) {
        error.setError("Erro ao buscar disciplinas");
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
        <Header id={1} cursos={[]} />
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