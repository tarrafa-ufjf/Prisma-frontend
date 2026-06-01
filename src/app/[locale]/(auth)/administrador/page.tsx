'use client';

import { useTranslations } from 'next-intl';
import AdmRow from "@/components/pages/administrador/admRow";
import PageTemplate from "@/components/template/page-template";

export default function AdministradorPage() {

    const t = useTranslations('Admin.MainPage');
    return (
        <PageTemplate
            title={t('title')}
            subTitle={t('subtitle')}
        >
            <AdmRow />
        </PageTemplate>
    );
}