import { useEffect, useState } from 'react';
import { useError } from '@/hooks/useError';
import { api } from '@/utils/api';
import BoxTemplate from '@/components/ui/box-template';
import Loading from '@/components/ui/loading';
import RankingItem from '@/components/ui/rank-item';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface HomeRankingProps {
    type: 'at-risk' | 'best-performance'
}

export default function HomeRanking({ type }: HomeRankingProps) {
    const t = useTranslations("Tutors.ranking");
    const [ranking, setRanking] = useState<any[]>([])
    const error = useError()

    useEffect(() => {
        const fetch = async () => {
            try {
                error.clear()
                const response = await api.get(`analysis/tutors/general/rankings?type=${type}`)
                const ranking_vector = response.data.data.ranking
                setRanking(ranking_vector)
                if (ranking_vector.length < 1)
                    error.setError(t("notEnoughTutors"))
            } catch (err) {
                error.setError(t("fetchError"))
                console.error("Erro ao buscar ranking desempenho: ", err)
            }
        }
        fetch()
    }, [type, error.clear, error.setError, t])

    return (
        <BoxTemplate
            title={t("title")}
            sub_title={type == 'best-performance' ? t("bestPerformanceSubtitle") : t("atRiskSubtitle")}
        >
            {error.hasError ? (
                error.renderError()
            ) : ranking.length <= 0 && (
                <Loading>{t("loading")}</Loading>
            )}
            {ranking.map((item, index) => (
                <RankingItem
                    key={index}
                    position={index + 1}
                    content={item.full_name}
                    link={`/tutores/curso/${item.subjects[0]}/${item.tutor_id}`}
                    icon={Search}
                />
            ))}
        </BoxTemplate>
    );
}
