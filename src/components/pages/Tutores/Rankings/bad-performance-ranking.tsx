import BoxTemplate from "@/components/ui/box-template";
import Loading from "@/components/ui/loading";
import RankingItem from "@/components/ui/rank-item";
import { useError } from "@/hooks/useError";
import { api } from "@/utils/api";
import { UserRoundSearch } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface PerformanceRankingProps {
  id: number;
}

type TutorRankingContent = {
  full_name: string;
  subject_id: number;
  tutor_id: number;
};

export default function BadPerformanceRanking({ id }: PerformanceRankingProps) {
  const t = useTranslations("Tutors.rankings.badPerformance");
  const [ranking, setRanking] = useState<TutorRankingContent[]>([]);
  const error = useError();

  useEffect(() => {
    const fetch = async () => {
      try {
        error.clear();
        const response = await api.get(
          `analysis/tutors/subject/${id}/rankings?type=at-risk`,
        );
        const ranking_vector = response.data.data;
        setRanking(ranking_vector);
        if (ranking_vector.length < 1)
          error.setError(t("notEnoughTutors"));
      } catch (err) {
        error.setError(t("fetchError"));
        console.error("Erro ao buscar ranking de desempenho: ", err);
      }
    };
    fetch();
  }, [id, error.clear, error.setError, t]);

  return (
    <BoxTemplate title={t("title")} sub_title={t("subtitle")}>
      {error.hasError
        ? error.renderError()
        : ranking.length <= 0 && <Loading>{t("loading")}</Loading>}
      {ranking.map((item, index) => (
        <RankingItem
          key={index}
          position={index + 1}
          content={item.full_name}
          link={`/tutores/curso/${id}/${item.tutor_id}`}
          icon={UserRoundSearch}
        />
      ))}
    </BoxTemplate>
  );
}
