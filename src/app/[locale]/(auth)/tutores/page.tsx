'use client';

import GeneralData from "@/components/pages/tutores/general-data";
import Indicators from "@/components/pages/tutores/Indicator/indicators";
import HomeRanking from "@/components/pages/tutores/ranking";
import PageTemplate from "@/components/template/page-template";

export default function Page() {
    return (
        <PageTemplate
            title="Visão Geral"
            subTitle="da Instituição"
        >
            <GeneralData />
            <Indicators />
            <div className="flex flex-row space-x-3">
                <HomeRanking type='best-performance' />
                <HomeRanking type='at-risk' />
            </div>
        </PageTemplate>
    );
};
