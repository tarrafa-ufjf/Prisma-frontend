'use client';

import AdmRow from "@/components/pages/administrador/admRow";
import PageTemplate from "@/components/template/page-template";

export default function AdministradorPage() {
    return (
        <PageTemplate
            title="Administração do Sistema"
            subTitle="Gerenciamento Geral"
        >
            <AdmRow />
        </PageTemplate>
    );
}