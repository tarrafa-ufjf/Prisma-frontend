'use client';

import DifficultyRanking from "./difficulty-ranking";
import PerformanceRanking from "./performance-ranking";

interface RankingProps {
    id: number
}

export default function Rankings({ id }: RankingProps) {
    return (
        <div className="flex flex-row space-x-5 mb-5">
            <PerformanceRanking id={id} />
            <DifficultyRanking id={id} />
        </div>
    );
};
