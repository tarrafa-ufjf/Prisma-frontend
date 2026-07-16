'use client';

import GeneralData from "@/components/pages/tutores/general-data";
import Indicators from "@/components/pages/tutores/Indicator/indicators";
import HomeRanking from "@/components/pages/tutores/ranking";
import PageTemplate from "@/components/template/page-template";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations("Tutors");

    return (
        <PageTemplate
            title={t("overview")}
            subTitle={t("institution")}
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
