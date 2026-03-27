import { Suspense } from 'react';
import DisciplinasPageClient from './DisciplinasPageClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando dados das disciplinas...</div>}>
      <DisciplinasPageClient />
    </Suspense>
  );
}