import { useError } from '@/hooks/useError';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import Grafico, { ItemLegenda } from './Grafico';

interface NumAbsoProps {
    situations: Situation[]
}

const situationLabelKeys = {
    aprovado: 'approved',
    reprovado: 'failed',
    ri: 'ri',
} as const

type SituationLabelKey = typeof situationLabelKeys[keyof typeof situationLabelKeys]

function normalizeSituation(situation: string) {
    return situation
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
}

export default function NumAbso({ situations }: NumAbsoProps) {
    const t = useTranslations('Courses.charts.approvalStatus')
    const error = useError()

    const legenda: ItemLegenda[] = useMemo(() => {
        const labels: Record<SituationLabelKey, string> = {
            approved: t('labels.approved'),
            failed: t('labels.failed'),
            ri: t('labels.ri'),
        }

        return situations.map(data => ({
            categoria: labels[situationLabelKeys[normalizeSituation(data.situacao) as keyof typeof situationLabelKeys]] ?? data.situacao,
            valor: data.qtd
        }))
    }, [situations, t])

    const is_valid = useMemo(() => {
        return situations.some(data => data.qtd > 0) && situations.length > 0
    }, [situations])

    useEffect(() => {
        if (!is_valid) {
            error.setError(t('empty'))
        } else {
            error.clear()
        }
    }, [is_valid, error.setError, error.clear, t])

    return (
        <div className="Box my-10">
            <div className="Boxcursopequeno">
                <div className="mt-10 ml-10 mb-5">
                    <h1 className="text-xl font-poppins font-semibold text-left">{t('title')}</h1>
                    <p style={{ color: "#9291A5" }}>{t('subtitle')}</p>
                </div>
            </div>

            <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 bg-white" />
            {error.hasError ? (
                <div className="flex w-full h-full items-center justify-center">
                    {error.renderError()}
                </div>
            ) : (
                <Grafico data={legenda} />
            )}
        </div>
    );
}
