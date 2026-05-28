import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import DisciplinasPageClient from './DisciplinasPageClient';

export default async function Page() {
  const t = await getTranslations('Subjects');

  return (
    <Suspense fallback={<div>{t('loadingData')}</div>}>
      <DisciplinasPageClient />
    </Suspense>
  );
}
