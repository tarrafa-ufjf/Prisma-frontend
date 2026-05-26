'use client';

import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

import { api } from "@/utils/api";

import Button from "@/components/ui/button";

export default function MoodleWarning() {

    const t = useTranslations('Admin.MoodleWarning');

    const [showWarning, setShowWarning] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function checkMoodleConfig() {

            try {

                setLoading(true);

                await api.get(
                    "/admin/moodle-config"
                );

            } catch (error: any) {

                console.error(
                    "Erro ao verificar Moodle:",
                    error
                );

                const apiError =
                    error?.response?.data?.error;

                if (
                    apiError === "moodle config not found"
                ) {
                    setShowWarning(true);
                }

            } finally {

                setLoading(false);

            }
        }

        checkMoodleConfig();

    }, []);

    if (loading || !showWarning) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-6 w-[430px] shadow-lg">

                <h2 className="text-lg font-semibold mb-2">
                    {t('title')}
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                    {t('description')}
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={() => setShowWarning(false)}
                        className="px-4 py-2 text-gray-600"
                    >
                        {t('dismiss')}
                    </button>

                    <Button href="/administrador/gerenciar/moodle">
                        {t('configure')}
                    </Button>

                </div>

            </div>

        </div>
    );
}